# AuraCTG: Real-Time Fetal Telemetry & Decision Support

A central ward telemetry station and clinical decision-support interface for intrapartum fetal monitoring, 21-parameter CTG morphological extraction, and risk escalation.

## Prerequisites

- Node.js (v18 or higher)
- npm or bun

## Quickstart

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment (optional):
   Copy `.env.example` to `.env` to configure port or cellular dispatch parameters. If omitted, the server defaults to port 3000 with simulated dispatch fallback.

3. Start the application:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in a web browser.

## Key Subsystems

- **Ward Overview**: Multi-bed status monitoring across normal, suspect, and pathological states.
- **Bedside CTG Monitor**: Dual-trace continuous FHR (110-160 bpm) and uterine contraction waveforms.
- **Doppler Audio Synthesizer**: Web Audio API cardiac pulse acoustic simulation and ICU alert tones.
- **Clinical Feature Inspector**: Real-time evaluation of all 21 morphological CTG parameters.
- **Escalation & Duty Roster**: Multi-tier alert notification with SMS and voice dispatch options.