# AuraCTG: Next-Generation Fetal Distress Intelligence & Telemetry Central Station

[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](run_pipeline.py)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](Aura/src/App.tsx)
[![FastAPI](https://img.shields.io/badge/FastAPI-v2.0-009688?style=for-the-badge&logo=fastapi&logoColor=white)](src/app.py)
[![FIGO 2015 Aligned](https://img.shields.io/badge/Obstetric_Standard-FIGO_%2F_ACOG-10B981?style=for-the-badge)](CLINICAL_GUIDELINE_ALIGNMENT.md)
[![Test Macro F1](https://img.shields.io/badge/Test_Macro_F1-0.9414-0055FF?style=for-the-badge)](visualizations/phase1_model_benchmark_results.csv)
[![Pathological Recall](https://img.shields.io/badge/Pathological_Recall-94.29%25-EF4444?style=for-the-badge)](visualizations/confusion_matrix_family_b_gradient_boosted_trees.png)

> **Hackathon Executive Pitch**: Cardiotocography (CTG) is the clinical gold standard for monitoring fetal wellbeing during labor. Yet, visual CTG interpretation suffers from **high inter-observer variability (>30%)** and **severe alarm fatigue**, while standard ML models fail because of extreme class imbalance. 
> 
> **AuraCTG** bridges this gap: a closed-loop clinical intelligence platform that pairs **gradient-boosted tree ensembles (0.9414 Macro F1, 94.29% Pathological Recall)** with **100% FIGO-aligned TreeSHAP explainability**, **real-time Web Audio acoustic Doppler telemetry**, and **automated cellular dispatch via Twilio** to turn ambiguous waveform squiggles into timely, life-saving obstetric decisions.

---

## Executive Summary for Hackathon Judges

| Evaluation Dimension | What AuraCTG Delivers |
| :--- | :--- |
| **The Clinical Problem** | Intrapartum hypoxia and acidosis cause preventable neonatal death and cerebral palsy. The dataset is heavily imbalanced (**77.8% Normal**, **13.9% Suspect**, **8.3% Pathological**); naive accuracy-based models miss life-threatening hypoxia. |
| **Algorithmic Rigor** | Benchmarked **2 distinct model families** with 5-fold stratified cross-validation and zero-leakage pipeline. Gradient Boosted Trees achieved **0.9414 Macro F1** and **94.29% Pathological Sensitivity** (raw accuracy is strictly banned). |
| **Model Explainability & Interpretability (XAI)** | TreeSHAP and Permutation importance validate that the top 5 model drivers (`ASTV`, `DP`, `MSTV`, `ALTV`, `AC`) map **1-to-1 with international FIGO & ACOG clinical guidelines**. Transparent feature attribution. |
| **Bedside Experience** | A continuous central ward station featuring dual-trace CTG grids (FHR + Tocography), interactive trajectory simulation, and **Web Audio API Doppler heart sounds** with alarm tones. |
| **Closed-Loop Action** | Automated two-tier escalation: in-dashboard Category II guidance and **autonomous Twilio SMS & Voice cellular dispatch** to on-call obstetricians for Category III emergencies. |
| **Ready to Evaluate** | Zero-setup offline HTML prototypes for instant judging ([proto-01.html](proto-01.html)), plus a production full-stack React 19 + TypeScript + FastAPI suite. |

---

## Core App Features & Capabilities

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 AURACTG SYSTEM ARCHITECTURE                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  [ CTG Sensors / Simulator ] ──> 21 Morphological Features ──> Gradient Boosting ML    │
│            │                                                         │                 │
│            ▼                                                         ▼                 │
│  [ Acoustic Doppler Web Audio ]                              [ TreeSHAP Engine ]       │
│  • Realistic FHR Bpm Thumps                                  • FIGO Guideline Concord  │
│  • ICU Category II/III Alarms                                • Feature Contribution    │
│            │                                                         │                 │
│            ▼                                                         ▼                 │
│  [ Central Ward Dashboard ] ─────────── 7-Bed Triage ──────> [ Clinical Alert Modal ]  │
│  • Dual-Trace FHR (110-160 bpm)                              • Category I/II/III Triage│
│  • Real-Time Trajectory Control                              • Tier-2 Twilio Dispatch  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Multi-Bed Central Ward Station
- **Multi-Patient Live Triage**: Simultaneously tracks 7 patient beds with color-coded severity cards (**Normal = Mint**, **Suspect = Amber**, **Pathological = Rose/Red**).
- **Dynamic Physiological Trajectories**: Switch any patient between *Stable*, *Drifting (Suspect)*, or *Acute Distress (Pathological)* to stress-test clinician response.
- **Instant Bed Selection & Triage Filtering**: High-contrast, glanceable status tags for rapid triage during busy labor & delivery shifts.

### 2. Live Bedside CTG Monitor (Dual-Trace)
- **Clinical-Grade Continuous Grid**: Renders real-time Fetal Heart Rate (FHR in bpm) and Uterine Contractions (UC in mmHg / relative units) at 0.5Hz–10Hz sampling.
- **FIGO Baseline Boundaries**: Visual guideline band highlighting the safe 110–160 bpm baseline zone, making bradycardia (<110 bpm) and tachycardia (>160 bpm) immediately apparent.
- **Real-Time Rolling Statistics**: Live readout of instantaneous FHR, variability, contraction frequency, and real-time model risk probabilities ($P(\text{Normal}), P(\text{Suspect}), P(\text{Pathological})$).

### 3. Acoustic Doppler Audio Telemetry (Web Audio API)
- **Realistic Heartbeat Doppler**: Synthesizes authentic acoustic fetal cardiac thumps synchronized dynamically to the patient's exact instantaneous heart rate.
- **Harmonic Medical Alarm Tones**: Generates standard ICU auditory alarm patterns for non-reassuring traces (intermittent amber alert) and emergency pathological status (rapid high-priority red alert) with mute/volume controls.

### 4. 21-Feature Real-Time Morphological Extractor
Extracts the full battery of 21 clinical CTG parameters directly from rolling telemetry buffers:
- **Baseline & Reactivity**: Baseline FHR (`LB`), Accelerations (`AC`), Fetal Movement (`FM`), Uterine Contractions (`UC`).
- **Deceleration Complex**: Light (`DL`), Severe (`DS`), and Prolonged Decelerations (`DP`).
- **Autonomic Variability**: Abnormal Short-Term (`ASTV`), Mean Short-Term (`MSTV`), Abnormal Long-Term (`ALTV`), and Mean Long-Term Variability (`MLTV`).
- **Signal Distribution**: Histogram width, min, max, peak counts, zero counts, mode, mean, median, variance, and tendency.

### 5. TreeSHAP Clinical Explainability & Feature Inspector
- **Zero Black-Box Guesswork**: Drill down into each patient’s predictions to inspect feature values against reference physiological baselines.
- **Directional Force Analysis**: Explains exactly *why* a trace was flagged (e.g., $ASTV = 73\%$ and $DP = 0.012$ elevating pathological risk by $+4.5$).
- **FIGO Guideline Cross-Check**: Direct correlation with international obstetric consensus standards.

### 6. Autonomous Two-Tier Emergency Escalation (Twilio Integration)
- **Tier 1 (Category II / Suspect)**: Non-disruptive bedside advisory recommending conservative measures (lateral maternal positioning, oxygen, 30-minute re-evaluation).
- **Tier 2 (Category III / Pathological)**: Instant emergency escalation:
  - Immediate visual/audio warning in the central station.
  - **Twilio SMS Broadcast**: Dispatches high-priority cellular SMS to the on-call physician with bed ID, patient name, and key morphological trigger.
  - **Twilio Automated Voice Telephony**: Initiates an automated emergency phone call with synthesized text-to-speech audio via AWS Polly.
  - **Offline Hackathon Mode**: Includes a built-in simulation drawer with realistic delivery receipts when live API credentials are omitted.

### 7. Duty Roster & Physician Allocation
- Manage on-call obstetricians, perinatologists, and charge nurses with shift hours, active bed assignments, and emergency contact details.

---

## Model Benchmark & Empirical Validation

Raw classification accuracy is clinically dangerous in imbalanced medical datasets. We formulated our evaluation around **Macro-Averaged F1** and **Pathological Sensitivity (Recall)** across 5-fold stratified cross-validation and a held-out test split (2,126 recordings, UCI ID #193):

| Model Family | Algorithm | 5-Fold CV Macro F1 | Test Macro F1 | Pathological Recall (Class 3) | Test Weighted F1 | Primary Clinical Strength |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Family A** | **Multinomial Logistic Regression (L2 Balanced)** | **0.7776** (±0.035) | **0.7932** | **94.29%** | **0.8883** | Calibrated parametric baseline, instantaneous inference |
| **Family B (1)** | **Balanced Random Forest (200 Trees)** | **0.8884** (±0.016) | **0.9169** | **94.29%** | **0.9509** | Bagged ensemble stability, noise resilience |
| **Family B (2)** | **Gradient Boosted Decision Trees** | **0.9070** (±0.003) | **0.9414** | **94.29%** | **0.9692** | **Production Champion**: Non-linear threshold splits |

> **Key Takeaway**: Our Gradient Boosted champion captured **94.29% of Pathological distress events** while achieving a remarkable **0.9414 Macro F1**, ensuring both high clinical safety and minimal false alarms.

### Clinical Guideline Alignment (FIGO 2015 / ACOG)

Our TreeSHAP feature importances validate that the model bases decisions on physiological reality:

| Rank | Metric | Feature | Importance | FIGO Category | Clinical Rationale |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **#1** | **Abnormal Short-Term Variability** | `ASTV` | **0.1245** | Category III | Autonomic nervous depression from hypoxia |
| **#2** | **Prolonged Decelerations** | `DP` | **0.1237** | Category III | Acute cord compression / uteroplacental compromise |
| **#3** | **Mean Short-Term Variability** | `MSTV` | **0.1013** | Category II/III | Depressed micro-variability magnitude |
| **#4** | **Abnormal Long-Term Variability** | `ALTV` | **0.0869** | Category III | Persistent flat baseline predicting metabolic acidosis |
| **#5** | **Accelerations** | `AC` | **0.0782** | Category I | Hallmark of reactive, reassuring oxygenation |

---

## Repository Architecture

```
.
├── Aura/                           # Production Full-Stack Application
│   ├── src/
│   │   ├── components/             # WardOverview, LiveMonitor, DutyRoster, FeatureInspection, Alerts
│   │   ├── lib/                    # audioTelemetry, simulator, featureExtractor, inference, notifications
│   │   ├── App.tsx                 # Central state machine & 0.5Hz telemetry loop
│   │   └── types.ts                # TypeScript domain models (Patient, Trajectory, Prediction)
│   ├── server.ts                   # Express API + WebSocket Telemetry Stream + Twilio Proxy
│   └── package.json                # React 19, TailwindCSS, Motion, Vite
├── src/                            # Machine Learning Core Pipeline
│   ├── ingestion.py                # UCI CTG (ID: 193) automated fetch & integrity checks
│   ├── preprocessing.py            # Zero-leakage stratified scaling & feature alignment
│   ├── models.py                   # Family A & Family B model architectures
│   ├── evaluation.py               # Macro F1, 3x3 confusion matrix & ROC-AUC curves
│   ├── explainability.py           # TreeSHAP & Permutation feature importance
│   ├── train_benchmark.py          # 5-fold cross-validation suite
│   └── app.py                      # FastAPI microservice with /predict & /ws/monitor
├── data/                           # Raw and partitioned CTG datasets
├── models/                         # Serialized model artifacts (.joblib)
├── visualizations/                 # Confusion matrices, SHAP plots, and benchmark tables
├── run_pipeline.py                 # 1-Click Master ML Training & Evaluation Script
├── proto-01.html                   # Zero-dependency interactive browser prototype
├── hackathon-demo.html             # Standalone bedside monitor demo
├── CLINICAL_GUIDELINE_ALIGNMENT.md # Obstetric literature mapping document
└── EXPLAINABILITY.md               # 21-feature clinical dictionary & target breakdown
```

---

## Quickstart: How to Demo & Run for Judges

We offer **three flexible ways** to evaluate AuraCTG:

### Option 1: Instant 10-Second Demo (No Installation Needed)
Double-click or open either of these standalone HTML prototypes directly in Google Chrome, Safari, or Edge:
- **[proto-01.html](proto-01.html)**: Interactive Fetal Health Triage bedside application with real-time sliders, instant inference, and FIGO recommendations.
- **[hackathon-demo.html](hackathon-demo.html)**: Live dual-trace CTG monitor with waveform canvas and sound effects.

### Option 2: Run the Full-Stack Production Aura Dashboard
Experience the full React 19 + TypeScript + Web Audio + Twilio application:

```bash
# 1. Navigate to the Aura directory
cd Aura

# 2. Install dependencies (Node.js 18+ required)
npm install

# 3. Launch the unified development server (Express + Vite)
npm run dev
```
> Open your browser to **`http://localhost:3000`**. Unmute audio in the top bar to hear real-time acoustic Doppler telemetry!

### Option 3: Run the ML Training & Benchmark Pipeline
Retrain the model families, verify cross-validation metrics, and generate evaluation artifacts:

```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Execute the end-to-end ML pipeline
python run_pipeline.py

# 3. Optional: Start the FastAPI inference backend
uvicorn src.app:app --reload --port 8000
```
All confusion matrices and SHAP summaries will be exported to the `visualizations/` folder.

---

## Technology Stack

- **Machine Learning & Data**: Python 3.10+, Scikit-Learn, XGBoost, LightGBM, TreeSHAP, Pandas, NumPy, Joblib, `ucimlrepo`.
- **Frontend Architecture**: React 19, TypeScript, Vite, TailwindCSS v4, Framer Motion, Lucide Icons.
- **Audio Synthesis**: Web Audio API (Doppler dual-oscillator acoustic modeling & harmonic alarm synthesizer).
- **Backend & Real-Time**: Node.js, Express, WebSocket (`ws`), FastAPI, Uvicorn, AsyncIO.
- **Telephony & Dispatch**: Twilio REST API (SMS Messaging + Voice Telephony via AWS Polly Matthew).

---

## Hackathon Judge Scorecard Summary

- **Clinical Relevance & Safety**: Directly targets intrapartum hypoxia; prioritizes 94.29% Pathological Recall over raw accuracy.
- **Algorithmic Soundness**: Rigorous comparison of two distinct model families across 5-fold stratified CV with zero data leakage.
- **Explainability & Transparency**: 100% concordance between TreeSHAP importance and FIGO/ACOG clinical guidelines.
- **Usability & Aesthetic Finish**: Polished, human-centered UI designed for low cognitive load in high-stress delivery rooms.
- **Operational Feasibility**: Automated cellular failover ensures critical alerts reach clinicians wherever they are.

---

*Built for obstetricians, midwives, and healthy newborns.*
