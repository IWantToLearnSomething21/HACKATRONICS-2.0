export type FIGOClass = 'Normal' | 'Suspect' | 'Pathological';

export type EscalationTier = 1 | 2 | 3;

export interface CTGFeature {
  id: string;
  name: string;
  category: 'Baseline' | 'Variability' | 'Decelerations' | 'Accelerations' | 'Uterine' | 'Histogram';
  clinicalNorm: string;
  unit: string;
  currentValue: number;
  weight: number; // Importance in model
  description: string;
  shapValue: number; // Positive pushes to Pathological, negative to Normal
}

export interface BedTelemetry {
  bedId: string;
  patientName: string;
  gestationalAge: string;
  fhr: number; // Current Fetal Heart Rate bpm
  toco: number; // Current Uterine Contraction mmHg (0-100)
  baselineFHR: number;
  variabilityBpm: number;
  status: FIGOClass;
  confidence: number;
  activeAlert?: string;
  escalationTier?: EscalationTier;
  fhrHistory: number[];
  tocoHistory: number[];
  lastDecelerationType?: 'None' | 'Early' | 'Late' | 'Variable' | 'Prolonged';
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Attending Obstetrician' | 'Senior Resident' | 'Charge Midwife' | 'Neonatologist' | 'L&D Nurse';
  status: 'On Duty' | 'In OR (Surgical)' | 'On Break' | 'Standby';
  tierPriority: 1 | 2 | 3;
  pagerNumber: string;
  phone: string;
  assignedBeds: string[];
  avatarColor: string;
}

export interface SlideData {
  id: number;
  slug: string;
  category: 'Overview' | 'Problem' | 'Solution' | 'Live Demo' | 'AI & ML Logic' | 'Architecture' | 'Clinical Impact' | 'Future' | 'Executive & Governance' | 'Clinical Governance';
  title: string;
  subtitle: string;
  badge: string;
  visualConcept: string;
  speakerNotes: {
    overview: string;
    talkingPoints: string[];
    clinicalContext: string;
    stakeholderFocus: string;
    estimatedSeconds: number;
  };
  keyStats?: {
    label: string;
    value: string;
    subtext: string;
  }[];
}
