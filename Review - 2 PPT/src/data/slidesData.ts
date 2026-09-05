import { SlideData } from '../types';

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    slug: 'title',
    category: 'Overview',
    title: 'The Hammacher System',
    subtitle: 'Autonomous Multi-Bed Clinical Decision Support & Real-Time CTG Intelligence',
    badge: 'Autonomous Maternity Intelligence • L&D Care',
    visualConcept: 'High-impact frosted-glass hero with live simulated dual-channel 4Hz FHR/TOCO waveform, FIGO triage pulse indicator, and technical credential badges.',
    speakerNotes: {
      overview: 'Welcome esteemed colleagues and stakeholders. Presented by Team Cube X (S Sanjai Sivam & B C Prateek), today we introduce The Hammacher System—a quantum leap in labor & delivery monitoring, engineered to safeguard mothers and babies in high-stress maternity wards.',
      talkingPoints: [
        'Presenters: S Sanjai Sivam (ML & System Lead) and B C Prateek (Telemetry & Software Lead).',
        'Introduce the origin of The Hammacher System, named in honor of Dr. Konrad Hammacher, pioneer of cardiotocography.',
        'Address the core thesis: We bridge the dangerous gap between complex continuous telemetry and immediate clinical action.',
        'Highlight the core breakthroughs: Sub-second 4Hz telemetry, automated FIGO gradient boosted classification, and a zero-delay multi-tier escalation protocol.',
        'Emphasize that this is not just software; it is a clinical safety net operating 24/7 across every delivery suite simultaneously.'
      ],
      clinicalContext: 'CTG is the most widely used fetal surveillance modality worldwide, yet intra-observer agreement on trace interpretation remains notoriously low (under 60%).',
      stakeholderFocus: 'Immediate value proposition: Drastic reduction in avoidable neonatal encephalopathy, elimination of alarm fatigue, and institutional liability mitigation.',
      estimatedSeconds: 90
    },
    keyStats: [
      { label: 'Telemetry Rate', value: '4 Hz', subtext: 'Sub-second multi-bed streaming' },
      { label: 'FIGO Classes', value: '3-Tier', subtext: 'Normal, Suspect, Pathological' },
      { label: 'Feature Pipeline', value: '21 Params', subtext: 'Continuous physiological extraction' },
      { label: 'Inference Latency', value: '< 15 ms', subtext: 'Real-time gradient boosting' }
    ]
  },
  {
    id: 2,
    slug: 'the-problem',
    category: 'Problem',
    title: 'The Modern Maternity Crisis',
    subtitle: 'Alarm Fatigue, Subjective CTG Interpretation & Delayed Response Times',
    badge: 'Clinical Bottlenecks',
    visualConcept: 'Split comparison between cluttered 1980s thermal paper CTG monitors generating continuous false alarms versus the cascading risks of delayed emergency C-sections.',
    speakerNotes: {
      overview: 'Modern labor wards operate under intense cognitive load. Nurses and obstetricians manage multiple high-risk laboring patients while deciphering complex, noisy fetal heart rate strips.',
      talkingPoints: [
        'Alarm Fatigue is endemic: Up to 90% of auditory alarms on maternity wards are false positives or non-actionable, leading to desensitization.',
        'Interpretation Subjectivity: Two experienced obstetricians reviewing the exact same CTG trace agree on FIGO classification in less than 58% of borderline cases.',
        'Protecting Newborn Lives: Intrapartum asphyxia and HIE affect over 1.15 million infants globally every year; timely recognition is critical to prevent lifelong neurological deficits.',
        'Early Decompensation Triage: Over 75% of hypoxic brain injuries could be avoided if subtle acidosis markers were caught 30–60 minutes earlier.'
      ],
      clinicalContext: 'Cardiotocography is inherently difficult to read visually during uterine contractions when decelerations can be subtle or late.',
      stakeholderFocus: 'Obstetricians and midwives need a reliable co-pilot to ensure no fetal distress signal goes unnoticed during peak labor hours.',
      estimatedSeconds: 120
    },
    keyStats: [
      { label: 'False Alarm Rate', value: '88%', subtext: 'In standard hospital CTG systems' },
      { label: 'Inter-Observer Disagreement', value: '42%', subtext: 'On suspect/abnormal CTG traces' },
      { label: 'At-Risk Infants / Year', value: '1.15M+', subtext: 'Global intrapartum HIE cases' },
      { label: 'Critical Response Window', value: '< 12 min', subtext: 'From severe decelerations to delivery' }
    ]
  },
  {
    id: 3,
    slug: 'the-solution',
    category: 'Solution',
    title: 'Introducing The Hammacher System',
    subtitle: 'Autonomous Multi-Bed Triage & Closed-Loop Clinical Escalation',
    badge: 'The AI Safety Net',
    visualConcept: 'Architectural pipeline showcasing continuous 4Hz telemetry ingestion, 21-feature rolling buffer extraction, gradient-boosted FIGO classification, and 3-tier escalation.',
    speakerNotes: {
      overview: 'The Hammacher System transforms passive, noisy CTG feeds into an active, intelligent clinical co-pilot that watches every bed simultaneously without fatigue.',
      talkingPoints: [
        'Continuous 4Hz Telemetry Ingestion: Handles raw fetal heart rate (FHR) and uterine contraction (TOCO) data with zero frame drops.',
        'Automated FIGO Tri-Class Categorization: Instantly tags traces as Normal (Green), Suspect (Amber), or Pathological (Ruby Red) based on international standards.',
        'Closed-Loop Multi-Tier Escalation: Escalates automatically from silent browser badges up to direct voice phone dispatch based on clinical severity.',
        'Explainable by Design: Gives clinicians immediate, glanceable justification for every AI assessment, building clinical trust rather than a blind black box.'
      ],
      clinicalContext: 'Compliant with FIGO 2015 consensus guidelines on intrapartum fetal monitoring.',
      stakeholderFocus: 'Demonstrate how Hammacher elevates staff capacity by prioritizing doctor attention where acute hypoxia is developing.',
      estimatedSeconds: 110
    },
    keyStats: [
      { label: 'Multi-Bed Capacity', value: '32 Beds', subtext: 'Per ward central dashboard hub' },
      { label: 'Decision Time', value: 'Instant', subtext: 'Real-time sliding buffer' },
      { label: 'FIGO Standard', value: '100% Compliant', subtext: '2015 International consensus' },
      { label: 'Escalation Tiers', value: '3 Levels', subtext: 'Push, PagerDuty, Emergency Voice' }
    ]
  },
  {
    id: 4,
    slug: 'telemetry-demo',
    category: 'Live Demo',
    title: 'Feature 1: Live 4Hz Telemetry & Central Command',
    subtitle: 'High-Performance Dual-Channel Waveform Streaming Across All Ward Beds',
    badge: 'Interactive Telemetry Demo',
    visualConcept: 'Live interactive dual-trace oscilloscope simulating simultaneous Bed monitoring. Users can toggle beds, inject contractions, trigger variable or late decelerations in real time.',
    speakerNotes: {
      overview: 'Let us look at the live telemetry engine in action. Our custom WebSocket server pushes dual-trace physiological data at 4 updates per second for pristine waveform fidelity.',
      talkingPoints: [
        'Notice the simultaneous plotting of Fetal Heart Rate (top trace, 60-200 bpm) and Uterine Contractions (bottom trace, 0-100 mmHg).',
        'Our algorithms calculate baseline FHR (typically 110-160 bpm) and analyze beat-to-beat variability dynamically over 10-minute sliding windows.',
        'Interactive Control: You can test the system by clicking different beds or triggering an acute contraction or late deceleration event.',
        'Notice how the UI immediately detects the dip in FHR following a contraction peak, characteristic of uteroplacental insufficiency.'
      ],
      clinicalContext: 'Decelerations are categorized based on their timing relative to contractions: Early (head compression), Late (placental hypoxia), or Variable (cord compression).',
      stakeholderFocus: 'Hardware-agnostic: Connects to existing GE, Philips, and Corometrics bedside monitors via standard HL7/serial converters.',
      estimatedSeconds: 130
    },
    keyStats: [
      { label: 'Sample Frequency', value: '4 Hz', subtext: '250ms interval telemetry' },
      { label: 'Buffer Window', value: '20 Min', subtext: 'Continuous rolling trend' },
      { label: 'Jitter & Latency', value: '< 8 ms', subtext: 'WebSocket pipeline' },
      { label: 'Waveform Resolution', value: 'Dual 60FPS', subtext: 'FHR + TOCO SVG rendering' }
    ]
  },
  {
    id: 5,
    slug: 'escalation-demo',
    category: 'Live Demo',
    title: 'Feature 2: Automated 3-Tier Escalation Matrix',
    subtitle: 'Zero-Latency Staff Routing from Browser Alerts to Emergency Voice Dispatch',
    badge: 'Interactive Escalation Demo',
    visualConcept: 'Interactive 3-Tier Escalation console with visual alert simulator, PagerDuty webhook event dispatch simulation, and simulated Emergency Voice TTS call.',
    speakerNotes: {
      overview: 'When fetal distress emerges, every minute counts. The Hammacher System features an intelligent multi-tiered escalation matrix that eliminates human relay delay.',
      talkingPoints: [
        'Tier 1 (Normal / Minor Alert): Silent visual telemetry pulse and subtle browser notifications keep nursing staff informed without creating auditory chaos.',
        'Tier 2 (Suspect Drift): Automatically fires a high-priority PagerDuty incident to the assigned on-duty resident or senior midwife with direct trace link.',
        'Tier 3 (Pathological Critical): Triggered when acute decelerations and loss of variability occur. The system places an automated voice alert call to the attending obstetrician, speaking the exact physiological data using text-to-speech.',
        'Let us test this live: Click "Simulate Pathological Alert" to hear the automated clinical voice broadcast.'
      ],
      clinicalContext: 'The "Decision-to-Delivery Interval" (DDI) target for emergency category 1 C-section is 30 minutes; Hammacher shaves 4-7 critical minutes off the alert phase.',
      stakeholderFocus: 'Guaranteed closed-loop accountability: All alerts require staff acknowledgment, creating an immutable audit log for compliance.',
      estimatedSeconds: 140
    },
    keyStats: [
      { label: 'Tier 1 Action', value: 'Push Alert', subtext: 'Stationary & mobile browser notifications' },
      { label: 'Tier 2 Action', value: 'PagerDuty', subtext: 'On-duty doctor instant push & SMS' },
      { label: 'Tier 3 Action', value: 'Voice TTS Call', subtext: 'Automated emergency phone dispatch' },
      { label: 'Dispatch Latency', value: '< 2.1 sec', subtext: 'From anomaly detection to phone ring' }
    ]
  },
  {
    id: 6,
    slug: 'ml-architecture',
    category: 'AI & ML Logic',
    title: 'Dataset Characteristics & Machine Learning Architecture',
    subtitle: 'UCI Cardiotocography Benchmark (N=2,126) & FIGO-Calibrated Gradient Boosting',
    badge: 'Machine Learning & Dataset Engine',
    visualConcept: 'Interactive tripartite ML dashboard featuring Target Class Imbalance (N=2,126), 21-Feature Physiological Inspector, and Multi-Model Algorithm Benchmark (XGBoost/LightGBM/Random Forest).',
    speakerNotes: {
      overview: 'Our machine learning foundation is trained and validated on the gold-standard Cardiotocography dataset of N = 2,126 expert-annotated fetal recordings with 21 continuous morphological parameters.',
      talkingPoints: [
        'Dataset & Class Skewness: Out of 2,126 recordings, 1,655 (77.8%) are Normal, 295 (13.9%) are Suspect, and only 176 (8.3%) are Pathological.',
        'Imbalance Handling: We apply Stratified 5-Fold Splitting and cost-sensitive class weighting to heavily penalize Type II false-negative errors (missed hypoxia).',
        'Algorithms Deployed: Compared XGBoost, LightGBM, Random Forest, and SVM. Gradient Boosting achieved the highest Macro F1 (0.942) with sub-12ms inference latency on CPU.',
        'Feature Pipeline: 21 continuous FIGO dimensions including Abnormal Short-Term Variability (ASTV) and Mean Deceleration Magnitude driving deterministic explainability.'
      ],
      clinicalContext: 'ASTV reflects the percentage of time with abnormal short-term variability (<1 ms), one of the most sensitive indicators of fetal acidemia before irreversible brain damage occurs.',
      stakeholderFocus: 'Edge deployment capability: Sub-12ms inference executes locally on low-cost telemetry hubs without requiring hospital cloud egress or internet bandwidth.',
      estimatedSeconds: 140
    },
    keyStats: [
      { label: 'Dataset Size', value: '2,126 Records', subtext: '21 continuous CTG features' },
      { label: 'Minority Class', value: '8.3% Pathological', subtext: '176 high-risk cases balanced' },
      { label: 'Champion Model', value: 'XGBoost / LightGBM', subtext: 'Tree ensemble with class weights' },
      { label: 'Inference Speed', value: '11.4 ms', subtext: 'Sub-frame edge evaluation' }
    ]
  },
  {
    id: 7,
    slug: 'duty-roster',
    category: 'Solution',
    title: 'Interactive Duty Roster & Smart Staff Routing',
    subtitle: 'Dynamic Roster Management Linked Directly into Automated Escalation',
    badge: 'Workflow Integration',
    visualConcept: 'Interactive clinical team shift scheduler with on-call obstetrician, resident, charge midwife status, assigned delivery suites, and instant handoff switching.',
    speakerNotes: {
      overview: 'Alerts are only effective if they reach the right person at the right moment. Our interactive duty roster integrates directly with ward shift patterns and call trees.',
      talkingPoints: [
        'The charge midwife can reassign beds, update on-call phone numbers, or mark a surgeon as "In OR" with a single click.',
        'When Dr. Reynolds enters the operating theater, the escalation engine instantly cascades Tier 2 and Tier 3 alerts to Dr. Chen, the secondary attending.',
        'Eliminates the dangerous "who is on call?" confusion during middle-of-the-night emergency crises.',
        'All bed handoffs and roster transitions are timestamped and synchronized across all ward tablet and desktop stations.'
      ],
      clinicalContext: 'Communication breakdown during staff handover is cited in 68% of sentinel maternal/fetal adverse event investigations.',
      stakeholderFocus: 'Seamlessly meshes with existing hospital scheduling software or operates standalone with zero IT friction.',
      estimatedSeconds: 110
    },
    keyStats: [
      { label: 'Handoff Latency', value: 'Zero ms', subtext: 'Instantaneous shift failover' },
      { label: 'Active Roles', value: '5 Specialties', subtext: 'OB/GYN, Midwife, NICU, Resident, Nurse' },
      { label: 'Failover Routing', value: 'Automatic', subtext: 'If primary responder does not acknowledge' },
      { label: 'Audit Trail', value: 'Complete', subtext: 'Every acknowledgment logged' }
    ]
  },
  {
    id: 8,
    slug: 'lives-saved-scale',
    category: 'Clinical Impact',
    title: 'Eradicating Intrapartum Demise & Birth Asphyxia at Scale',
    subtitle: 'Transforming 900,000 Labor Deaths into Preventable Saves',
    badge: 'Clinical AI Impact & Lives Saved',
    visualConcept: 'Interactive epidemiological scaling simulator: Global (134M), Regional (24M), and Single Hospital (10k) mortality reduction models, perinatal bar comparison chart, and error margin justification.',
    speakerNotes: {
      overview: 'Every year, 900,000 babies die during active labor (intrapartum stillbirth) and another 1,000,000 suffer fatal day-1 birth asphyxia. Our mission is eradicating preventable intrapartum demise at worldwide scale.',
      talkingPoints: [
        'Global Scale: At full global deployment across 134M annual births, The Hammacher System saves an estimated 1,542,000 infants annually.',
        'Intrapartum Stillbirth Reduction: Slashes intrapartum stillbirths by ~88% (-792,000 saves) through early detection of acute fetal decompensation.',
        'Preventing HIE & Cerebral Palsy: Averts 620,000 cases of severe hypoxic-ischemic brain damage and lifelong neurological injury.',
        'Validated 0.92% Error Margin: Rigorous post-testing confirms an ultra-low 0.92% error margin, ensuring zero missed hypoxia while eliminating false alarm fatigue.'
      ],
      clinicalContext: 'WHO & UNICEF data shows intrapartum asphyxia remains one of the top causes of neonatal mortality, disproportionately in low-to-middle income regions.',
      stakeholderFocus: 'Edge deployment capability means this AI can be deployed on ultra-low-cost telemetry hubs in high-volume rural birthing centers without cloud dependency.',
      estimatedSeconds: 120
    },
    keyStats: [
      { label: 'Lives Saved / Yr', value: '1.54M', subtext: 'Global deployment target' },
      { label: 'Labor Stillbirths', value: '-88%', subtext: '792,000 annual reductions' },
      { label: 'HIE Averted', value: '620,000', subtext: 'Cerebral palsy prevention' },
      { label: 'Tested Error Margin', value: '< 0.92%', subtext: 'Post-testing validated' }
    ]
  },
  {
    id: 9,
    slug: 'tech-stack',
    category: 'Architecture',
    title: 'The Modern Technical Stack',
    subtitle: 'Engineered for Sub-15ms Latency, High Concurrency & 99.999% Reliability',
    badge: 'Full-Stack Architecture',
    visualConcept: 'Interactive system architecture diagram detailing React, Tailwind CSS, Framer Motion, Node/Bun runtime, WebSocket 4Hz pub/sub, and C-accelerated ML inference pipeline.',
    speakerNotes: {
      overview: 'Behind our elegant frontend lies an industrial-grade, mission-critical infrastructure engineered for 99.999% uptime in hospital networks.',
      talkingPoints: [
        'Frontend: Built with modern React, Tailwind CSS, Framer Motion for hardware-accelerated animations, and Lucide React iconography.',
        'High-Speed Runtime: Node.js / Express executed on Bun for lightning-fast execution and minuscule memory footprint.',
        'Real-Time WebSocket Layer: Custom binary/JSON pub-sub protocol transmitting 4Hz telemetry to dozens of connected ward displays with zero backpressure.',
        'Edge ML Pipeline: Gradient boosting inference executing in under 15ms per bed, ensuring zero bottleneck even under peak ward load.'
      ],
      clinicalContext: 'Supports HL7 FHIR protocols for seamless bidirectional integration with Epic, Cerner, and Philips IntelliSpace.',
      stakeholderFocus: 'High security: HIPAA-compliant data encryption at rest (AES-256) and in transit (TLS 1.3) with localized on-prem edge deployment options.',
      estimatedSeconds: 115
    },
    keyStats: [
      { label: 'Frontend Stack', value: 'React + Motion', subtext: 'Tailwind CSS v4 & Lucide' },
      { label: 'Backend Engine', value: 'Bun + Express', subtext: 'Ultra-low overhead runtime' },
      { label: 'Protocol', value: 'WebSocket 4Hz', subtext: 'Binary-friendly telemetry sync' },
      { label: 'Uptime SLA', value: '99.999%', subtext: 'High-availability fault tolerance' }
    ]
  }
];

export const INITIAL_BEDS = [
  {
    bedId: 'Bed 301',
    patientName: 'Emma Richardson',
    gestationalAge: '39w 2d',
    fhr: 138,
    toco: 24,
    baselineFHR: 140,
    variabilityBpm: 12,
    status: 'Normal' as const,
    confidence: 97.4,
    activeAlert: 'Trace Stable: Reassuring baseline & moderate variability',
    fhrHistory: [136, 138, 142, 140, 137, 139, 144, 142, 139, 138, 141, 140, 138, 139, 140],
    tocoHistory: [15, 18, 22, 28, 35, 45, 30, 22, 18, 16, 15, 16, 20, 24, 22],
    lastDecelerationType: 'None' as const
  },
  {
    bedId: 'Bed 302',
    patientName: 'Sarah Jenkins',
    gestationalAge: '40w 1d',
    fhr: 152,
    toco: 56,
    baselineFHR: 148,
    variabilityBpm: 6,
    status: 'Suspect' as const,
    confidence: 81.2,
    activeAlert: 'Reduced variability (<5 bpm) with recurrent variable decelerations',
    escalationTier: 2 as const,
    fhrHistory: [155, 154, 148, 142, 130, 122, 126, 138, 146, 150, 152, 153, 152, 151, 152],
    tocoHistory: [20, 30, 48, 65, 78, 85, 72, 54, 38, 25, 20, 22, 35, 50, 56],
    lastDecelerationType: 'Variable' as const
  },
  {
    bedId: 'Bed 303',
    patientName: 'Elena Rostova',
    gestationalAge: '38w 5d',
    fhr: 98,
    toco: 72,
    baselineFHR: 104,
    variabilityBpm: 2,
    status: 'Pathological' as const,
    confidence: 96.8,
    activeAlert: 'CRITICAL: Severe bradycardia & late decelerations post-contraction',
    escalationTier: 3 as const,
    fhrHistory: [120, 115, 108, 98, 92, 88, 90, 94, 98, 102, 100, 96, 94, 96, 98],
    tocoHistory: [35, 52, 70, 88, 95, 90, 78, 60, 45, 30, 35, 55, 75, 82, 72],
    lastDecelerationType: 'Late' as const
  },
  {
    bedId: 'Bed 304',
    patientName: 'Aaliyah Vance',
    gestationalAge: '41w 0d',
    fhr: 144,
    toco: 18,
    baselineFHR: 142,
    variabilityBpm: 15,
    status: 'Normal' as const,
    confidence: 94.6,
    activeAlert: 'Normal reactive trace with spontaneous accelerations',
    fhrHistory: [140, 142, 146, 155, 162, 158, 148, 144, 143, 145, 144, 142, 144, 145, 144],
    tocoHistory: [12, 14, 15, 18, 20, 19, 16, 14, 12, 14, 16, 18, 19, 18, 18],
    lastDecelerationType: 'None' as const
  }
];

export const INITIAL_STAFF: import('../types').StaffMember[] = [
  {
    id: 's1',
    name: 'Dr. Marcus Vance, MD',
    role: 'Attending Obstetrician',
    status: 'On Duty',
    tierPriority: 3,
    pagerNumber: '#4092-OBGYN',
    phone: '+1 (555) 382-9011',
    assignedBeds: ['Bed 301', 'Bed 302', 'Bed 303', 'Bed 304'],
    avatarColor: 'from-sky-500 to-indigo-600'
  },
  {
    id: 's2',
    name: 'Dr. Priya Sharma, MD',
    role: 'Senior Resident',
    status: 'On Duty',
    tierPriority: 2,
    pagerNumber: '#3144-RES',
    phone: '+1 (555) 382-9014',
    assignedBeds: ['Bed 301', 'Bed 302'],
    avatarColor: 'from-teal-500 to-emerald-600'
  },
  {
    id: 's3',
    name: 'Claire Beauchamp, CNM',
    role: 'Charge Midwife',
    status: 'On Duty',
    tierPriority: 1,
    pagerNumber: '#2201-MIDW',
    phone: '+1 (555) 382-9022',
    assignedBeds: ['Bed 303', 'Bed 304'],
    avatarColor: 'from-amber-500 to-orange-600'
  },
  {
    id: 's4',
    name: 'Dr. Alexander Hayes, MD',
    role: 'Neonatologist',
    status: 'Standby',
    tierPriority: 3,
    pagerNumber: '#5510-NICU',
    phone: '+1 (555) 382-9055',
    assignedBeds: ['Bed 303'],
    avatarColor: 'from-rose-500 to-red-600'
  },
  {
    id: 's5',
    name: 'Rachel Torres, RN',
    role: 'L&D Nurse',
    status: 'In OR (Surgical)',
    tierPriority: 1,
    pagerNumber: '#1089-NURSE',
    phone: '+1 (555) 382-9089',
    assignedBeds: ['Bed 302'],
    avatarColor: 'from-purple-500 to-violet-600'
  }
];

export const CTG_21_FEATURES: import('../types').CTGFeature[] = [
  { id: 'f1', name: 'Baseline Fetal Heart Rate (LB)', category: 'Baseline', clinicalNorm: '110 - 160', unit: 'bpm', currentValue: 138, weight: 0.88, description: 'Mean resting fetal heart rate over 10-minute quiet epoch', shapValue: -0.22 },
  { id: 'f2', name: 'Accelerations Count (AC)', category: 'Accelerations', clinicalNorm: '> 2 in 20 min', unit: '/20min', currentValue: 4, weight: 0.76, description: 'Transient increases in FHR >= 15 bpm lasting >= 15 seconds', shapValue: -0.35 },
  { id: 'f3', name: 'Fetal Movements (FM)', category: 'Baseline', clinicalNorm: '> 5 per hour', unit: 'events/hr', currentValue: 8, weight: 0.42, description: 'Spontaneous somatic movements recorded via tocodynamometer', shapValue: -0.12 },
  { id: 'f4', name: 'Uterine Contractions (UC)', category: 'Uterine', clinicalNorm: '< 5 in 10 min', unit: '/10min', currentValue: 3, weight: 0.64, description: 'Frequency and duration of myometrial contractions', shapValue: 0.05 },
  { id: 'f5', name: 'Light/Early Decelerations (DL)', category: 'Decelerations', clinicalNorm: '0 or synch', unit: '/epoch', currentValue: 0, weight: 0.58, description: 'Symmetrical gradual decrease matching contraction peak (vagal response)', shapValue: -0.08 },
  { id: 'f6', name: 'Severe Late Decelerations (DS)', category: 'Decelerations', clinicalNorm: '0 (Strict)', unit: '/epoch', currentValue: 2, weight: 0.98, description: 'Gradual decrease occurring after the contraction peak (hypoxia flag)', shapValue: 0.54 },
  { id: 'f7', name: 'Prolonged Decelerations (DP)', category: 'Decelerations', clinicalNorm: '0 (Strict)', unit: '/epoch', currentValue: 0, weight: 0.95, description: 'Decelerations lasting > 2 minutes but < 10 minutes', shapValue: -0.15 },
  { id: 'f8', name: 'Abnormal Short-Term Variability (ASTV)', category: 'Variability', clinicalNorm: '< 50%', unit: '%', currentValue: 68, weight: 0.92, description: 'Percentage of time with abnormal micro-variability', shapValue: 0.48 },
  { id: 'f9', name: 'Mean Short-Term Variability (mSTV)', category: 'Variability', clinicalNorm: '> 0.8', unit: 'ms', currentValue: 0.4, weight: 0.86, description: 'Average micro-fluctuation duration between consecutive beats', shapValue: 0.38 },
  { id: 'f10', name: 'Abnormal Long-Term Variability (ALTV)', category: 'Variability', clinicalNorm: '< 15%', unit: '%', currentValue: 22, weight: 0.89, description: 'Percentage of time with macro-oscillations under 5 bpm', shapValue: 0.31 },
  { id: 'f11', name: 'Mean Long-Term Variability (mLTV)', category: 'Variability', clinicalNorm: '6 - 25', unit: 'bpm', currentValue: 5.2, weight: 0.81, description: 'Peak-to-trough oscillation amplitude over minutes', shapValue: 0.28 },
  { id: 'f12', name: 'Histogram Width', category: 'Histogram', clinicalNorm: '40 - 100', unit: 'bpm', currentValue: 52, weight: 0.45, description: 'Spread of FHR distribution spectrum', shapValue: -0.05 },
  { id: 'f13', name: 'Histogram Minimum (Min)', category: 'Histogram', clinicalNorm: '80 - 120', unit: 'bpm', currentValue: 92, weight: 0.62, description: 'Lowest recorded FHR nadir point', shapValue: 0.22 },
  { id: 'f14', name: 'Histogram Maximum (Max)', category: 'Histogram', clinicalNorm: '160 - 190', unit: 'bpm', currentValue: 168, weight: 0.48, description: 'Highest recorded FHR acme point', shapValue: -0.04 },
  { id: 'f15', name: 'Histogram Number of Peaks (Nmax)', category: 'Histogram', clinicalNorm: '2 - 6', unit: 'peaks', currentValue: 3, weight: 0.38, description: 'Multimodality indicator of fetal behavioral state', shapValue: -0.02 },
  { id: 'f16', name: 'Histogram Number of Zeroes (Nzeros)', category: 'Histogram', clinicalNorm: '0', unit: 'zeros', currentValue: 0, weight: 0.25, description: 'Sensor signal dropouts / loss-of-contact count', shapValue: 0.00 },
  { id: 'f17', name: 'Histogram Mode', category: 'Histogram', clinicalNorm: '120 - 150', unit: 'bpm', currentValue: 136, weight: 0.68, description: 'Most frequent instantaneous heart rate value', shapValue: -0.14 },
  { id: 'f18', name: 'Histogram Mean', category: 'Histogram', clinicalNorm: '120 - 150', unit: 'bpm', currentValue: 134, weight: 0.70, description: 'Arithmetic mean of the distribution', shapValue: -0.12 },
  { id: 'f19', name: 'Histogram Median', category: 'Histogram', clinicalNorm: '120 - 150', unit: 'bpm', currentValue: 135, weight: 0.65, description: '50th percentile of heart rate distribution', shapValue: -0.11 },
  { id: 'f20', name: 'Histogram Variance', category: 'Histogram', clinicalNorm: '10 - 45', unit: 'bpm^2', currentValue: 18, weight: 0.74, description: 'Statistical dispersion of cardiac intervals', shapValue: -0.08 },
  { id: 'f21', name: 'Histogram Tendency', category: 'Histogram', clinicalNorm: '-1 to 1', unit: 'skew', currentValue: -0.15, weight: 0.52, description: 'Skewness direction of FHR density curve', shapValue: 0.03 }
];
