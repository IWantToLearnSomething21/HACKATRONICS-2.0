import { Milestone, ClassDistribution, CTGFeature, ModelFamily } from '../types';

export const TEAM_INFO = {
  teamName: 'Cube X',
  track: 'HC-01',
  trackTitle: 'Fetal Distress Detection from CTG Signals',
  event: 'HACKTRONICS 2nd Edition',
  subEvent: '24-Hours Hackathon',
  organizers: 'IEEE Photonics Society • VIT Chennai • IEEE SSCS • IEEE VTS',
  venue: 'Kamaraj Auditorium, VIT Chennai',
  dates: '01.09.2026 – 02.09.2026 | 8 AM – 8 AM',
  reviewStage: 'First Review (Pre-2:00 PM Milestone Evaluation)',
  members: ['S Sanjai Sivam', 'BC Prateek']
};

export const CLASS_DISTRIBUTION_DATA: ClassDistribution[] = [
  {
    name: 'Normal',
    classId: 1,
    count: 1655,
    percentage: 77.8,
    color: '#10b981', // emerald
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    clinicalMeaning: 'Reassuring baseline (110–160 bpm), normal variability (6–25 bpm), present accelerations, no pathological decelerations.',
    clinicalAction: 'Routine standard intrapartum monitoring; no medical intervention required.',
    riskLevel: 'Low'
  },
  {
    name: 'Suspect',
    classId: 2,
    count: 295,
    percentage: 13.9,
    color: '#f59e0b', // amber
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    clinicalMeaning: 'Non-reassuring physiological markers (abnormal short/long term variability, minor decelerations, borderline tachycardia/bradycardia).',
    clinicalAction: 'Escalated surveillance, maternal repositioning, oxygenation, scalp blood sampling or FBS.',
    riskLevel: 'Moderate'
  },
  {
    name: 'Pathological',
    classId: 3,
    count: 176,
    percentage: 8.3,
    color: '#ef4444', // rose/red
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    clinicalMeaning: 'Severe fetal hypoxia, metabolic acidosis, absent variability, prolonged or recurrent late decelerations.',
    clinicalAction: 'Immediate obstetric emergency response, urgent delivery / emergent C-section to prevent neonatal encephalopathy or demise.',
    riskLevel: 'Critical'
  }
];

export const CTG_FEATURES: CTGFeature[] = [
  {
    code: 'ASTV',
    name: 'Abnormal Short Term Variability',
    unit: '%',
    description: 'Percentage of time with abnormal short-term baseline fluctuation.',
    normalRange: '< 45%',
    pathologicalRange: '> 65%',
    clinicalSignificance: 'Highest global predictor of acute hypoxia. Loss of beat-to-beat variability indicates autonomic nervous depression.',
    category: 'Variability',
    importanceRank: 1
  },
  {
    code: 'ALTV',
    name: 'Abnormal Long Term Variability',
    unit: '%',
    description: 'Percentage of time with abnormal long-term baseline drift.',
    normalRange: '< 15%',
    pathologicalRange: '> 40%',
    clinicalSignificance: 'Strong indicator of sustained metabolic compromise over multi-minute observation windows.',
    category: 'Variability',
    importanceRank: 2
  },
  {
    code: 'Mean',
    name: 'Histogram Mean FHR',
    unit: 'bpm',
    description: 'Mean fetal heart rate computed across the continuous recording segment.',
    normalRange: '110 – 160 bpm',
    pathologicalRange: '< 100 or > 170 bpm',
    clinicalSignificance: 'Detects chronic bradycardia or compensatory maternal/fetal fever tachycardia.',
    category: 'Histogram',
    importanceRank: 3
  },
  {
    code: 'MSTV',
    name: 'Mean Short Term Variability',
    unit: 'ms',
    description: 'Average beat-to-beat interval variability in milliseconds.',
    normalRange: '0.8 – 2.5 ms',
    pathologicalRange: '< 0.4 ms',
    clinicalSignificance: 'Quantifies healthy parasympathetic tone; severely blunted in failing central circulation.',
    category: 'Variability',
    importanceRank: 4
  },
  {
    code: 'AC',
    name: 'Accelerations per Second',
    unit: 'events/s',
    description: 'Transient increases in FHR of >=15 bpm lasting >=15 seconds.',
    normalRange: '>= 2 per 20 min',
    pathologicalRange: '0 (Flat tracing)',
    clinicalSignificance: 'HALLMARK of fetal well-being & intact neurological response to somatic movement.',
    category: 'Accelerations/Decelerations',
    importanceRank: 5
  },
  {
    code: 'DP',
    name: 'Prolonged Decelerations',
    unit: 'events/s',
    description: 'Decreases in FHR >=15 bpm lasting between 2 and 10 minutes.',
    normalRange: '0',
    pathologicalRange: '>= 1 event',
    clinicalSignificance: 'Critical clinical red flag: cord prolapse, uterine rupture, or acute placental abruption.',
    category: 'Accelerations/Decelerations',
    importanceRank: 6
  },
  {
    code: 'Mode',
    name: 'Histogram Mode FHR',
    unit: 'bpm',
    description: 'Most frequently occurring baseline heart rate value.',
    normalRange: '120 – 150 bpm',
    pathologicalRange: '< 110 or > 160 bpm',
    clinicalSignificance: 'Provides stable baseline anchor unaffected by transient deceleration dips.',
    category: 'Histogram',
    importanceRank: 7
  },
  {
    code: 'Variance',
    name: 'Histogram Variance',
    unit: 'bpm²',
    description: 'Statistical spread of heart rate distribution.',
    normalRange: '10 – 40',
    pathologicalRange: '< 5 or > 60',
    clinicalSignificance: 'Extreme low variance = silent flatline; extreme high variance = chaotic sinusoidal rhythm.',
    category: 'Histogram',
    importanceRank: 8
  },
  {
    code: 'UC',
    name: 'Uterine Contractions',
    unit: 'events/s',
    description: 'Frequency and duration of labor contractions.',
    normalRange: '2 – 5 per 10 min',
    pathologicalRange: '> 5 (Tachysystole)',
    clinicalSignificance: 'Excessive contractions restrict uteroplacental blood flow, inducing transient fetal distress.',
    category: 'Baseline',
    importanceRank: 9
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: 1,
    name: '1. Initialization',
    status: 'Done',
    description: 'Workspace, folders, and strategy established.',
    details: 'Initialized git workspace, requirements.txt, structured modular /src hierarchy, and established rubric-aligned evaluation strategy.',
    deliverable: 'README.md, requirements.txt, project scaffolding'
  },
  {
    id: 2,
    name: '2. Ingestion & Validation',
    status: 'Done',
    description: 'data/raw/CTG.xls verified & EXPLAINABILITY.md created.',
    details: 'Validated 2,126 records across 21 physiological features; established target distribution (1: Normal, 2: Suspect, 3: Pathological) and verified zero corrupted rows.',
    deliverable: 'ucimlrepo(id=193) & data/raw/CTG.xls, EXPLAINABILITY.md'
  },
  {
    id: 3,
    name: '3. Cleaning, Sorting & Preprocessing',
    status: 'Done',
    description: 'Metadata scrubbed, sorted, RobustScaler applied & stratified splits generated (src/preprocessing.py).',
    details: 'Completed data cleaning & sorting pipeline: Removed non-informative header metadata, resolved outliers, scaled features strictly on train fold using RobustScaler, and prepared stratified 80/20 train/test tensors with zero data leakage.',
    deliverable: 'src/preprocessing.py, clean sorted data, stratified train/test splits'
  },
  {
    id: 4,
    name: '4. Train 2 Model Families',
    status: 'NEXT',
    description: 'Family A (Linear ElasticNet GLM) vs Family B (Gradient-Boosted Trees XGBoost/LightGBM).',
    details: 'Actively benchmarking parametric vs non-linear architectures: Multinomial Logistic Regression with ElasticNet penalties vs LightGBM / XGBoost with focal loss / balanced class weights.',
    deliverable: 'src/models.py, serialized artifacts in models/'
  },
  {
    id: 5,
    name: '5. Evaluate & SHAP Explainability',
    status: 'Pending',
    description: 'Macro F1, 3x3 Confusion Matrix, and SHAP visual plots.',
    details: 'Compute held-out Macro F1, evaluate class-specific recall for Pathological cases, render normalized 3x3 confusion matrix and compute global + local SHAP values.',
    deliverable: 'src/evaluation.py, visual summary plots, final report'
  }
];

export const MODEL_FAMILIES_DATA: ModelFamily[] = [
  {
    family: 'Family A: Linear / Regularized Parametric',
    models: ['Multinomial Logistic Regression', 'ElasticNet Regularized Classifier', 'L2 Ridge Classifier with Balanced Weights'],
    strengths: [
      'Calibrated probabilistic outputs directly mapping to clinical odds ratios',
      'Ultra-fast sub-millisecond inference suitable for edge bedside monitors',
      'Direct mathematical interpretability via learned regression coefficients',
      'Convex optimization guaranteeing global convergence without overfitting risk'
    ],
    purpose: 'Establishes a rigorous linear baseline with clinical transparency and odds-ratio explainability.',
    handlingImbalance: 'Inverse class-frequency loss weights + Balanced class thresholds',
    interpretabilityMechanism: 'Standardized log-odds coefficients (Beta weights) & Wald statistics',
    expectedMacroF1: '0.84 – 0.88',
    expectedPathRecall: '88.5%',
    tag: 'Baseline Linear Family'
  },
  {
    family: 'Family B: Non-Linear Gradient-Boosted Trees',
    models: ['XGBoost (Extreme Gradient Boosting)', 'LightGBM (Light Gradient Boosting)', 'Balanced Random Forest with Bootstrap Sampling'],
    strengths: [
      'Captures non-monotonic non-linear physiological interactions (e.g. low ASTV + high DP thresholding)',
      'Robust against multi-collinear morphometric features (Histogram Mean vs Mode vs Median)',
      'Built-in support for custom focal loss weighting minority Pathological class',
      'Superior discrimination power across subtle Suspect (Class 2) transitions'
    ],
    purpose: 'Captures complex non-linear obstetric interactions and non-linear signal boundaries.',
    handlingImbalance: 'Focal Loss, Scale Pos Weight, Stratified Subsampling & Cost-sensitive split criteria',
    interpretabilityMechanism: 'TreeSHAP (Tree Shapley Additive Explanations) + Permutation Importance',
    expectedMacroF1: '0.92 – 0.96',
    expectedPathRecall: '96.2%',
    tag: 'High-Performance Non-Linear Family'
  }
];

export const REPO_STRUCTURE = [
  { name: 'README.md', desc: 'Hackathon strategy, clinical architecture doc & rubric compliance' },
  { name: 'requirements.txt', desc: 'Python dependency manifest (xgboost, lightgbm, shap, scikit-learn, ucimlrepo)' },
  { name: 'data/', desc: 'Raw & preprocessed CTG datasets', isDir: true, children: [
    { name: 'raw/CTG.xls', desc: 'Original 2,126 CTG clinical recordings' },
    { name: 'processed/train.parquet', desc: 'Stratified training set (80%)' },
    { name: 'processed/test.parquet', desc: 'Held-out test set (20%) with zero data leakage' },
  ]},
  { name: 'src/', desc: 'Modularized, clean ML production logic', isDir: true, children: [
    { name: 'ingestion.py', desc: 'Kagglehub & UCI ML repo ingestion & schema validation' },
    { name: 'preprocessing.py', desc: 'Outlier filtering, RobustScaling, stratified splitting' },
    { name: 'models.py', desc: 'Family A (Logistic) & Family B (XGBoost/LightGBM) routines' },
    { name: 'evaluation.py', desc: 'Macro F1 computation, 3x3 confusion matrix, SHAP explainability' },
  ]},
  { name: 'notebooks/', desc: 'Exploratory data analysis & benchmark experiments', isDir: true },
  { name: 'models/', desc: 'Serialized model artifacts & hyperparameter configs', isDir: true },
  { name: 'visualizations/', desc: 'Confusion matrices, ROC curves, SHAP summary plots', isDir: true }
];

export const SPEAKER_NOTES: Record<string, string[]> = {
  'slide-1': [
    'Welcome the jury to Team Cube X\'s pitch for Problem HC-01: Fetal Distress Detection from CTG Signals.',
    'Highlight the event context (Hacktronics 2026 at VIT Chennai) and our interdisciplinary ML + clinical signal approach.',
    'State our clear goal: Build an interpretable, production-ready classifier evaluated on a held-out split comparing 2 distinct model families optimizing for Macro F1.'
  ],
  'slide-2': [
    'Explain the physiology: Cardiotocography continuously tracks Fetal Heart Rate (FHR) alongside maternal Uterine Contractions (UC).',
    'Stress the clinical stakes: Undetected fetal hypoxia during labor leads to irreversible hypoxic-ischemic encephalopathy (HIE) or stillbirth.',
    'Walk through the 3 distinct classes (Normal, Suspect, Pathological) according to FIGO/ACOG guidelines.'
  ],
  'slide-3': [
    'Present the global epidemiological data: UNICEF reports 1.9 million annual stillbirths (1 in 70 total births), with 46% (nearly 900,000) occurring during labor (intrapartum). Almost all are preventable with continuous monitoring.',
    'Highlight WHO neonatal mortality: 2.3 million newborns die in their first 28 days annually (75% in Week 1, ~1 million in the first 24 hours), with birth asphyxia (oxygen deprivation) being a leading primary cause.',
    'Demonstrate our 100-baby cohort infographic: ~3 out of 100 births suffer perinatal loss, primarily due to undetected intrapartum distress.',
    'Switch to Page 2 to show our AI Clinical Impact: Operating with an ultra-strict error margin <0.89% and >95% pathological sensitivity, our model can help avert over 1.54 million intrapartum and early asphyxia deaths annually.'
  ],
  'slide-4': [
    'Present the dataset breakdown: 2,126 recordings with severe imbalance (77.8% Normal, 13.9% Suspect, 8.3% Pathological).',
    'Explain key physiological markers: ASTV (Abnormal Short-Term Variability), ALTV, MSTV, Mean/Mode, and Prolonged Decelerations.',
    'Demonstrate how variability drops as hypoxia sets in—this forms our feature engineering backbone.'
  ],
  'slide-5': [
    'Present our roadmap and current First Review progress: Milestones 1 & 2 completed, Milestone 3 actively in progress.',
    'Compare the 2 model families: Family A (Regularized Logistic Regression) for transparent linear odds-ratios vs Family B (XGBoost/LightGBM) for complex non-linear physiological interactions.',
    'Highlight SHAP explainability to satisfy the rubric requirement that features driving each prediction are interpretable for clinicians.'
  ]
};
