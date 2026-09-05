export type SlideId = 'slide-1' | 'slide-2' | 'slide-3' | 'slide-4' | 'slide-5';

export interface Milestone {
  id: number;
  name: string;
  status: 'Done' | 'NEXT' | 'Pending';
  description: string;
  details?: string;
  deliverable?: string;
}

export interface ClassDistribution {
  name: string;
  classId: number;
  count: number;
  percentage: number;
  color: string;
  badgeColor: string;
  clinicalMeaning: string;
  clinicalAction: string;
  riskLevel: 'Low' | 'Moderate' | 'Critical';
}

export interface CTGFeature {
  code: string;
  name: string;
  unit: string;
  description: string;
  normalRange: string;
  pathologicalRange: string;
  clinicalSignificance: string;
  category: 'Baseline' | 'Variability' | 'Accelerations/Decelerations' | 'Histogram';
  importanceRank: number;
}

export interface ModelFamily {
  family: 'Family A: Linear / Regularized Parametric' | 'Family B: Non-Linear Gradient-Boosted Trees';
  models: string[];
  strengths: string[];
  purpose: string;
  handlingImbalance: string;
  interpretabilityMechanism: string;
  expectedMacroF1: string;
  expectedPathRecall: string;
  tag: string;
}
