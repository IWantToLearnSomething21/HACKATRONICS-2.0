import { ClinicalAlert, EscalationLogEntry, Patient, TwilioDispatchRecord } from '../types';
import { dutyRosterService } from './dutyRoster';
import { audioTelemetry } from './audioTelemetry';

export class NotificationDeliveryService {
  private alerts: ClinicalAlert[] = [];
  private twilioDispatches: TwilioDispatchRecord[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.startEscalationTicker();
  }

  public subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public getAlerts(): ClinicalAlert[] {
    return [...this.alerts];
  }

  public getTwilioDispatches(): TwilioDispatchRecord[] {
    return [...this.twilioDispatches];
  }

  public getActiveAlertCount(): { suspect: number; pathological: number } {
    const unack = this.alerts.filter(a => !a.acknowledged);
    return {
      suspect: unack.filter(a => a.severity === 'suspect').length,
      pathological: unack.filter(a => a.severity === 'pathological').length,
    };
  }

  /**
   * Fires a PagerDuty Events v2 trigger or resolve via the backend.
   * dedup_key is the alertId so PD can correctly correlate resolve to its incident.
   */
  private async sendPagerDutyEvent(
    eventAction: 'trigger' | 'resolve',
    dedupKey: string,
    summary: string,
    details?: Record<string, string>
  ) {
    try {
      await fetch('/api/notify/pagerduty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventAction, dedupKey, summary, details })
      });
    } catch (e) {
      console.error('PagerDuty dispatch failed', e);
    }
  }

  /**
   * Triggers an in-app alert for Pathological cases.
   * PagerDuty is NOT fired here — it fires only when a nurse explicitly acknowledges a suspect case.
   */
  public triggerDirectDoctorDispatch(patient: Patient) {
    const existing = this.alerts.find(a => a.patientId === patient.id && a.severity === 'pathological');
    if (existing) return; // Already alerted

    const alertId = `direct-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newAlert: ClinicalAlert = {
      id: alertId,
      patientId: patient.id,
      patientName: patient.name,
      bedNumber: patient.bedNumber,
      severity: 'pathological',
      title: `EMERGENCY: Pathological CTG on Bed ${patient.bedNumber}`,
      message: `Pathological FHR pattern detected for ${patient.name}. Immediate bedside assessment required.`,
      morphology: patient.latestPrediction?.morphologyDescription || '',
      timestamp: Date.now(),
      acknowledged: false,
      escalationLevel: 1,
      escalationTimer: 120,
      escalationLogs: []
    };

    audioTelemetry.setAlarm('pathological');
    this.sendBrowserPush(newAlert.title, newAlert.message);

    this.alerts.unshift(newAlert);
    this.notify();
  }

  /**
   * Triggers or updates a clinical alert for a patient.
   */
  public triggerAlert(patient: Patient, severity: 'suspect' | 'pathological'): ClinicalAlert {
    const existing = this.alerts.find(a => a.patientId === patient.id && !a.acknowledged);
    
    // If already active with same or higher severity, do not duplicate
    if (existing) {
      if (existing.severity === 'suspect' && severity === 'pathological') {
        // Escalate existing alert
        existing.severity = 'pathological';
        existing.title = `CRITICAL: Pathological CTG on Bed ${patient.bedNumber}`;
        existing.message = `Profound FHR abnormality detected for ${patient.name} (${patient.gestationalAge}). Immediate bedside evaluation required.`;
        existing.morphology = patient.latestPrediction.morphologyDescription;
        this.dispatchEscalation(existing, 2);
        this.notify();
      }
      return existing;
    }

    const { primary } = dutyRosterService.getOnDutyTeam();
    const alertId = `alt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newAlert: ClinicalAlert = {
      id: alertId,
      patientId: patient.id,
      patientName: patient.name,
      bedNumber: patient.bedNumber,
      severity,
      title: severity === 'pathological' 
        ? `EMERGENCY: Pathological CTG on Bed ${patient.bedNumber}` 
        : `ATTENTION: Suspect Tracing on Bed ${patient.bedNumber}`,
      message: severity === 'pathological'
        ? `Pathological deceleration & loss of variability detected for ${patient.name}. Automated on-call escalation engaged.`
        : `Suspect FHR pattern detected for ${patient.name}. Review trending baseline and contraction timing.`,
      morphology: patient.latestPrediction.morphologyDescription,
      timestamp: Date.now(),
      acknowledged: false,
      escalationLevel: severity === 'pathological' ? 2 : 1,
      escalationTimer: severity === 'pathological' ? 45 : 120, // countdown seconds
      escalationLogs: []
    };

    // All alerts go in-app (Tier 1) only. PD fires only when nurse acknowledges a suspect.
    audioTelemetry.setAlarm(severity);
    this.dispatchEscalation(newAlert, 1);

    this.alerts.unshift(newAlert);
    this.notify();
    return newAlert;
  }

  private dispatchEscalation(alert: ClinicalAlert, level: 1 | 2 | 3) {
    const { primary, backup } = dutyRosterService.getOnDutyTeam();
    const targetDoc = level <= 2 ? primary : backup;

    const logEntry: EscalationLogEntry = {
      level,
      levelName: level === 1 ? 'Tier 1: On-Duty In-App Push' : level === 2 ? 'Tier 2: PagerDuty Incident + Phone' : 'Tier 3: Backup Registrar PagerDuty Escalation',
      timestamp: Date.now(),
      targetDoctorName: targetDoc.name,
      targetDoctorRole: targetDoc.role,
      phoneNumber: targetDoc.phone,
      channel: level === 1 ? 'push' : 'voice',
      status: 'sent'
    };

    alert.escalationLevel = level;
    alert.escalationLogs.push(logEntry);

    // 1. In-app browser push
    this.sendBrowserPush(alert.title, alert.message);

    // 2. PagerDuty incident for Tier 2 / 3 — fires a real phone alert to on-call doctor
    if (level >= 2) {
      this.sendPagerDutyEvent(
        'trigger',
        alert.id,
        `[AuraCTG] ${alert.title}`,
        {
          bed: alert.bedNumber,
          patient: alert.patientName,
          morphology: alert.morphology,
          escalation_tier: String(level),
          doctor: targetDoc.name,
        }
      );

      // Keep a dispatch record for the UI log
      const pdDispatch: TwilioDispatchRecord = {
        id: `pd-${Date.now()}-${Math.floor(Math.random() * 100)}`,
        alertId: alert.id,
        patientName: alert.patientName,
        bedNumber: alert.bedNumber,
        severity: alert.severity,
        type: 'VOICE',
        toNumber: targetDoc.phone,
        recipientName: targetDoc.name,
        recipientRole: targetDoc.role,
        content: `PagerDuty incident triggered → ${targetDoc.name} (${targetDoc.phone})`,
        timestamp: Date.now(),
        status: 'completed',
        simulated: false,
        audioTranscript: alert.message
      };
      this.twilioDispatches.unshift(pdDispatch);
    }
  }

  public speakVoiceAlert(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  private sendBrowserPush(title: string, body: string) {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification(title, {
            body,
            icon: '/icon.png',
            tag: 'aura-ctg-alert'
          });
        } catch (e) {}
      }
    }
  }

  public requestBrowserNotificationPermission(): Promise<NotificationPermission> {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.requestPermission();
    }
    return Promise.resolve('denied');
  }

  public acknowledgeAlert(alertId: string, doctorName: string, actionNote: string) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (!alert) return;

    alert.acknowledged = true;
    alert.acknowledgedBy = doctorName;
    alert.acknowledgedAt = Date.now();
    alert.clinicalAction = actionNote;

    // Nurse approved a SUSPECT case → escalate to on-call doctor via PagerDuty
    if (alert.severity === 'suspect') {
      this.sendPagerDutyEvent(
        'trigger',
        alertId,
        `[AuraCTG] Nurse Escalation — Suspect CTG on Bed ${alert.bedNumber}`,
        {
          bed: alert.bedNumber,
          patient: alert.patientName,
          morphology: alert.morphology,
          escalating_clinician: doctorName,
          action_taken: actionNote,
        }
      );
    }
    // Pathological cases are handled at bedside — no PD call on acknowledge

    // Silence alarm if no more unacknowledged alerts
    const remainingPath = this.alerts.some(a => !a.acknowledged && a.severity === 'pathological');
    const remainingSuspect = this.alerts.some(a => !a.acknowledged && a.severity === 'suspect');

    if (!remainingPath && !remainingSuspect) {
      audioTelemetry.setAlarm('none');
    } else if (!remainingPath && remainingSuspect) {
      audioTelemetry.setAlarm('suspect');
    }

    this.notify();
  }

  /**
   * Fire a manual PagerDuty test ping from the dashboard.
   */
  public sendTestPing() {
    this.sendPagerDutyEvent(
      'trigger',
      `test-ping-${Date.now()}`,
      '[AuraCTG TEST PING] Dashboard connectivity check',
      { source: 'Manual test from Hammacher System dashboard', time: new Date().toISOString() }
    );
  }

  public clearAllAlerts() {
    this.alerts = [];
    audioTelemetry.setAlarm('none');
    this.notify();
  }

  private startEscalationTicker() {
    if (typeof window === 'undefined') return;
    setInterval(() => {
      let changed = false;

      for (const alert of this.alerts) {
        if (!alert.acknowledged && alert.severity === 'pathological') {
          if (alert.escalationTimer > 0) {
            alert.escalationTimer -= 1;
            changed = true;
          }
          // Auto-tier-3 PD escalation removed — PD fires only on nurse suspect approval
        }
      }

      if (changed) this.notify();
    }, 1000);
  }
}

export const notificationService = new NotificationDeliveryService();
