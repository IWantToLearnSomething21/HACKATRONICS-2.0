import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PhoneCall, Bell, Smartphone, ShieldAlert, AlertTriangle, 
  CheckCircle2, Volume2, VolumeX, Send, UserCheck, Phone, PhoneOff, Radio
} from 'lucide-react';
import { SlideData } from '../../types';

interface SlideEscalationDemoProps {
  slide: SlideData;
}

export const SlideEscalationDemo: React.FC<SlideEscalationDemoProps> = ({ slide }) => {
  const [activeSimulation, setActiveSimulation] = useState<1 | 2 | 3 | null>(null);
  const [isPhoneCallActive, setIsPhoneCallActive] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Trigger Tier 1 Simulation
  const triggerTier1 = () => {
    setActiveSimulation(1);
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('Hammacher Tier 1 Alert', {
          body: 'Bed 301: Transient acceleration noted. Trace remains FIGO Normal.',
          icon: '/favicon.ico'
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Trigger Tier 2 Simulation
  const triggerTier2 = () => {
    setActiveSimulation(2);
  };

  // Trigger Tier 3 Voice Call Simulation with Speech Synthesis
  const triggerTier3 = () => {
    setActiveSimulation(3);
    setIsPhoneCallActive(true);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const spokenText = "Emergency Clinical Alert. Bed 303. Elena Rostova. FIGO Pathological classification detected. Fetal heart rate is 98 beats per minute with severe late decelerations and loss of beat to beat variability. Attending obstetrician Dr. Marcus Vance dispatch required immediately.";
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 1.0;
      utterance.pitch = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const endPhoneCall = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPhoneCallActive(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative overflow-hidden bg-slate-900 text-slate-100">
      {/* Background ambient red/amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Slide Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>{slide.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
            {slide.title}
          </h2>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
          Zero Human Relay Delay
        </div>
      </div>

      {/* Three Escalation Tiers Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto z-10">
        {/* Tier 1 Card */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
          activeSimulation === 1 
            ? 'bg-slate-800/95 border-teal-400 ring-2 ring-teal-500/40 shadow-xl shadow-teal-500/10 scale-[1.02]' 
            : 'bg-slate-950/70 border-slate-800'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-bold text-teal-400 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/30">
                TIER 1 • MINOR
              </span>
              <Bell className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-display">
              Browser Push & Pulse
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Silent visual badges and localized desktop push notifications for normal status changes and mild physiological deviations without auditory alarm fatigue.
            </p>
            <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
              <div><strong>Target:</strong> Midwives & Floor Nurses</div>
              <div><strong>Trigger:</strong> Reassuring variations</div>
              <div><strong>Latency:</strong> &lt; 50 ms</div>
            </div>
          </div>

          <button
            id="test-tier1-btn"
            onClick={triggerTier1}
            className="mt-4 w-full py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Test Tier 1 Push Alert</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tier 2 Card */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
          activeSimulation === 2 
            ? 'bg-slate-800/95 border-amber-400 ring-2 ring-amber-500/40 shadow-xl shadow-amber-500/10 scale-[1.02]' 
            : 'bg-slate-950/70 border-slate-800'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-bold text-amber-400 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30">
                TIER 2 • SUSPECT
              </span>
              <Smartphone className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-display">
              PagerDuty Doctor Dispatch
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Instantaneous high-urgency incident payload routed via PagerDuty API directly to the assigned senior resident with deep-link to live waveform.
            </p>
            <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
              <div><strong>Target:</strong> On-Duty Senior Resident</div>
              <div><strong>Trigger:</strong> FIGO Suspect Drift (ASTV&gt;60%)</div>
              <div><strong>Latency:</strong> &lt; 850 ms</div>
            </div>
          </div>

          <button
            id="test-tier2-btn"
            onClick={triggerTier2}
            className="mt-4 w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Test Tier 2 PagerDuty Dispatch</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tier 3 Card */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
          activeSimulation === 3 
            ? 'bg-rose-950/60 border-rose-400 ring-2 ring-rose-500/50 shadow-xl shadow-rose-500/20 scale-[1.02]' 
            : 'bg-slate-950/70 border-slate-800'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-bold text-rose-400 px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 animate-pulse">
                TIER 3 • PATHOLOGICAL
              </span>
              <PhoneCall className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-display">
              Automated Voice TTS Call
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Automated emergency phone call with speech synthesis dynamically broadcasting exact physiological numbers to the attending OB/GYN.
            </p>
            <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
              <div><strong>Target:</strong> Attending Obstetrician & NICU</div>
              <div><strong>Trigger:</strong> Severe Decel / Bradycardia</div>
              <div><strong>Latency:</strong> &lt; 2.1 sec (Direct Call)</div>
            </div>
          </div>

          <button
            id="test-tier3-btn"
            onClick={triggerTier3}
            className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>Simulate Voice TTS Alert Call</span>
          </button>
        </div>
      </div>

      {/* Simulated Live PagerDuty Alert Banner for Tier 2 */}
      {activeSimulation === 2 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-amber-950/40 border border-amber-500/50 rounded-xl flex items-center justify-between text-xs text-amber-200 z-10"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>
              <strong>[PagerDuty #PD-8921 Fired]:</strong> Bed 302 Sarah Jenkins — Suspect FHR deceleration. Paged Dr. Priya Sharma, MD (+1-555-382-9014).
            </span>
          </div>
          <span className="font-mono text-[10px] text-amber-400 font-semibold">200 OK • ACK Pending</span>
        </motion.div>
      )}

      {/* Live Phone Call Modal for Tier 3 TTS */}
      <AnimatePresence>
        {isPhoneCallActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-slate-900 border border-rose-500/50 rounded-3xl p-6 shadow-2xl space-y-6 text-center">
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40 animate-pulse">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  Emergency Automated Dispatch Call
                </h3>
                <p className="text-xs text-rose-300 font-mono">
                  Calling Attending OB: Dr. Marcus Vance, MD (+1 555-382-9011)
                </p>
              </div>

              {/* Spoken Telemetry Waveform */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-rose-400">
                    <Radio className="w-3 h-3 animate-ping" /> Live TTS Audio Stream
                  </span>
                  <span>{isSpeaking ? 'Speaking...' : 'Call Completed'}</span>
                </div>
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "Emergency Clinical Alert. Bed 303. Elena Rostova. FIGO Pathological classification detected. Fetal heart rate is 98 beats per minute with severe late decelerations and loss of variability. Obstetrician dispatch required immediately."
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  id="hangup-phone-call-btn"
                  onClick={endPhoneCall}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-rose-600/30"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Acknowledge & End Call</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/60 z-10">
        {slide.keyStats?.map((stat, i) => (
          <div key={i} className="space-y-0.5">
            <span className="text-lg sm:text-xl font-extrabold text-white font-mono tracking-tight">
              {stat.value}
            </span>
            <p className="text-xs font-semibold text-rose-400">{stat.label}</p>
            <p className="text-[10px] text-slate-400 truncate">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
