import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, MapPin, Building2, Sparkles, TrendingDown, Stethoscope, 
  ShieldCheck, AlertCircle, ArrowRight, Activity, HeartPulse, Play, Pause
} from 'lucide-react';
import { SlideData } from '../../types';

interface SlideLivesSavedScaleProps {
  slide: SlideData;
  onNavigateNext?: () => void;
}

type DeploymentScale = 'global' | 'regional' | 'hospital';

interface ScaleData {
  id: DeploymentScale;
  label: string;
  populationText: string;
  chartSubtext: string;
  livesSaved: string;
  stillbirthReduction: string;
  hieAverted: string;
  stillbirthBaseline: string;
  stillbirthAi: string;
  asphyxiaBaseline: string;
  asphyxiaAi: string;
  stillbirthBaselineVal: number;
  stillbirthAiVal: number;
  asphyxiaBaselineVal: number;
  asphyxiaAiVal: number;
}

const SCALE_DATA: Record<DeploymentScale, ScaleData> = {
  global: {
    id: 'global',
    label: 'Global (134M)',
    populationText: '134 Million Births / Year',
    chartSubtext: 'Global Annual Projection (134M Births)',
    livesSaved: '1,542,000',
    stillbirthReduction: '-792,000',
    hieAverted: '620,000',
    stillbirthBaseline: '900k',
    stillbirthAi: '108k',
    asphyxiaBaseline: '1,000k',
    asphyxiaAi: '250k',
    stillbirthBaselineVal: 900,
    stillbirthAiVal: 108,
    asphyxiaBaselineVal: 1000,
    asphyxiaAiVal: 250
  },
  regional: {
    id: 'regional',
    label: 'Regional / India (24M)',
    populationText: '24 Million Births / Year (High-Risk Burden Zone)',
    chartSubtext: 'Regional Projection (24M Births)',
    livesSaved: '276,000',
    stillbirthReduction: '-142,000',
    hieAverted: '111,000',
    stillbirthBaseline: '161k',
    stillbirthAi: '19k',
    asphyxiaBaseline: '180k',
    asphyxiaAi: '45k',
    stillbirthBaselineVal: 161,
    stillbirthAiVal: 19,
    asphyxiaBaselineVal: 180,
    asphyxiaAiVal: 45
  },
  hospital: {
    id: 'hospital',
    label: '1 Hospital (10k)',
    populationText: '10,000 Annual Deliveries (Tertiary Care Center)',
    chartSubtext: 'Single Hospital Projection (10,000 Deliveries)',
    livesSaved: '115',
    stillbirthReduction: '-59',
    hieAverted: '46',
    stillbirthBaseline: '67',
    stillbirthAi: '8',
    asphyxiaBaseline: '75',
    asphyxiaAi: '19',
    stillbirthBaselineVal: 67,
    stillbirthAiVal: 8,
    asphyxiaBaselineVal: 75,
    asphyxiaAiVal: 19
  }
};

export const SlideLivesSavedScale: React.FC<SlideLivesSavedScaleProps> = ({ slide, onNavigateNext }) => {
  const [selectedScale, setSelectedScale] = useState<DeploymentScale>('global');
  const [isLiveTelemetryActive, setIsLiveTelemetryActive] = useState<boolean>(true);
  const [pulseTick, setPulseTick] = useState<number>(0);

  const current = SCALE_DATA[selectedScale];

  // Dynamic subtle live telemetry micro-oscillation
  useEffect(() => {
    if (!isLiveTelemetryActive) return;
    const interval = setInterval(() => {
      setPulseTick(prev => (prev + 1) % 100);
    }, 1200);
    return () => clearInterval(interval);
  }, [isLiveTelemetryActive]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-7 lg:p-8 relative overflow-y-auto bg-slate-950 text-slate-100 select-none">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Header Tags */}
      <div className="space-y-2 z-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] font-mono">
          <div className="px-3 py-1 rounded-lg bg-teal-950/80 border border-teal-500/40 text-teal-300 font-bold tracking-wide flex items-center gap-1.5">
            <span className="text-teal-400">SLIDE 8 OF 11 • CLINICAL AI IMPACT &amp; LIVES SAVED</span>
            <span className="text-teal-600">|</span>
            <span className="text-slate-300 font-normal">UNICEF &amp; WHO Perinatal Health Evaluation</span>
          </div>

          <div className="px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1.5 shadow-sm shadow-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Validated Diagnostic Error Margin: &lt; 0.92% (Tested)</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
            Eradicating Intrapartum Demise &amp; Birth Asphyxia at Scale
          </h1>
          <p className="text-xs sm:text-sm text-teal-400/90 font-medium mt-0.5">
            Transforming 900,000 Labor Deaths into Preventable Saves with &lt;0.92% Diagnostic Precision
          </p>
        </div>
      </div>

      {/* Interactive Scale Selector Bar */}
      <div className="my-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider pr-1">
            SELECT DEPLOYMENT SCALE:
          </span>

          <button
            onClick={() => setSelectedScale('global')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedScale === 'global'
                ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-500/30 font-extrabold'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Global (134M)</span>
          </button>

          <button
            onClick={() => setSelectedScale('regional')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedScale === 'regional'
                ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-500/30 font-extrabold'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Regional / India (24M)</span>
          </button>

          <button
            onClick={() => setSelectedScale('hospital')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedScale === 'hospital'
                ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-500/30 font-extrabold'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>1 Hospital (10k)</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveTelemetryActive(!isLiveTelemetryActive)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-colors cursor-pointer ${
              isLiveTelemetryActive 
                ? 'bg-teal-950/90 text-teal-300 border-teal-500/40 shadow-sm shadow-teal-500/20' 
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
            title="Toggle Live Telemetry Animation"
          >
            {isLiveTelemetryActive ? <Pause className="w-3 h-3 text-teal-400" /> : <Play className="w-3 h-3" />}
            <span>{isLiveTelemetryActive ? 'Live Telemetry Active' : 'Animation Paused'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>Target: <strong className="text-teal-300">{current.populationText}</strong></span>
          </div>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 z-10">
        {/* Card 1: Human Lives Saved */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-teal-500/30 hover:border-teal-400/50 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-teal-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Human Lives Saved</span>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Annual Save
            </span>
          </div>

          <div className="my-2">
            <motion.div 
              key={current.livesSaved + selectedScale}
              initial={{ opacity: 0, scale: 0.94, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 180 }}
              className="text-3xl sm:text-4xl font-extrabold text-teal-400 font-mono tracking-tight"
            >
              {current.livesSaved}
            </motion.div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Infants saved from preventable intrapartum demise through continuous CTG telemetry.
          </p>
        </div>

        {/* Card 2: Labor Stillbirth Reduction */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>Labor Stillbirth Reduction</span>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ~88% Efficacy
            </span>
          </div>

          <div className="my-2">
            <motion.div 
              key={current.stillbirthReduction + selectedScale}
              initial={{ opacity: 0, scale: 0.94, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 180 }}
              className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight"
            >
              {current.stillbirthReduction}
            </motion.div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Eliminates delayed obstetric response by flagging decelerations &amp; acute variability drops.
          </p>
        </div>

        {/* Card 3: HIE Brain Damage Averted */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold">
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              <span>HIE Brain Damage Averted</span>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Lifelong Health
            </span>
          </div>

          <div className="my-2">
            <motion.div 
              key={current.hieAverted + selectedScale}
              initial={{ opacity: 0, scale: 0.94, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 180 }}
              className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tracking-tight"
            >
              {current.hieAverted}
            </motion.div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Prevents lifelong Cerebral Palsy and Hypoxic-Ischemic Encephalopathy from oxygen starvation.
          </p>
        </div>
      </div>

      {/* Bottom 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 my-3.5 z-10 flex-1">
        {/* Left Column: Fully Animated Bar Chart Comparison */}
        <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          {/* Animated Sweeping Telemetry Line Overlay */}
          {isLiveTelemetryActive && (
            <motion.div 
              className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-teal-400/10 to-transparent pointer-events-none z-0"
              animate={{ x: ['-100%', '800%'] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
            />
          )}

          <div className="flex items-center justify-between z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-300 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                <span>PERINATAL MORTALITY REDUCTION: BASELINE VS THE HAMMACHER SYSTEM</span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                {current.chartSubtext}
              </p>
            </div>

            <div className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[10px] font-mono text-teal-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>Real-Time Efficacy</span>
            </div>
          </div>

          {/* Animated Graph Stage with SVG Trendlines & Dynamic Motion Bars */}
          <div className="my-2 py-2 border-b border-t border-slate-800/80 relative z-10">
            {/* Background Grid Lines */}
            <div className="absolute inset-x-0 top-3 bottom-8 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-dashed border-slate-500 w-full" />
              <div className="border-b border-dashed border-slate-500 w-full" />
              <div className="border-b border-dashed border-slate-500 w-full" />
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 h-40 items-end pt-6 px-3 sm:px-8 relative">
              {/* Group 1: Intrapartum Stillbirths */}
              <div className="flex flex-col items-center gap-2 h-full justify-end relative">
                {/* Reduction Arrow Pill */}
                <motion.div 
                  key={`stillbirth-pill-${selectedScale}`}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-0 right-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shadow-sm"
                >
                  <TrendingDown className="w-3 h-3 text-emerald-400" />
                  <span>-88.0% Drop</span>
                </motion.div>

                <div className="flex items-end justify-center gap-4 sm:gap-6 w-full h-28 pt-2">
                  {/* Baseline Bar */}
                  <div className="flex flex-col items-center gap-1.5">
                    {/* Top Value Label */}
                    <span className="text-[11px] font-mono font-bold text-rose-300">
                      {current.stillbirthBaseline}
                    </span>
                    <motion.div 
                      key={`sb-base-${selectedScale}`}
                      initial={{ height: 0 }}
                      animate={{ height: 86 }}
                      transition={{ type: 'spring', damping: 18, stiffness: 120 }}
                      className="w-10 sm:w-14 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-lg shadow-lg shadow-rose-500/20 relative group cursor-default border-t border-rose-300"
                    />
                    <span className="text-[10px] font-mono text-rose-400/90 font-medium">Standard</span>
                  </div>

                  {/* AI Save Bar - Offset slightly right */}
                  <div className="flex flex-col items-center gap-1.5 translate-x-1 sm:translate-x-1.5">
                    {/* Top Value Label with Live Indicator */}
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-mono font-black text-teal-300">
                        {current.stillbirthAi}
                      </span>
                      {isLiveTelemetryActive && (
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-sm shadow-teal-400" />
                      )}
                    </div>
                    <motion.div 
                      key={`sb-ai-${selectedScale}`}
                      initial={{ height: 0 }}
                      animate={{ height: 22 }}
                      transition={{ type: 'spring', damping: 18, stiffness: 120, delay: 0.12 }}
                      className="w-10 sm:w-14 min-h-[18px] bg-gradient-to-t from-teal-500 to-teal-300 rounded-t-lg shadow-lg shadow-teal-400/30 relative group cursor-default ring-1 ring-teal-200 border-t border-teal-100"
                    />
                    <span className="text-[10px] font-mono text-teal-300 font-bold">Hammacher</span>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-300 text-center font-medium">
                  Intrapartum Stillbirths (Labor)
                </span>
              </div>

              {/* Group 2: Day-1 Asphyxia Neonatal Deaths */}
              <div className="flex flex-col items-center gap-2 h-full justify-end relative">
                {/* Reduction Arrow Pill */}
                <motion.div 
                  key={`asphyxia-pill-${selectedScale}`}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-0 right-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shadow-sm"
                >
                  <TrendingDown className="w-3 h-3 text-emerald-400" />
                  <span>-75.0% Drop</span>
                </motion.div>

                <div className="flex items-end justify-center gap-4 sm:gap-6 w-full h-28 pt-2">
                  {/* Baseline Bar */}
                  <div className="flex flex-col items-center gap-1.5">
                    {/* Top Value Label */}
                    <span className="text-[11px] font-mono font-bold text-rose-300">
                      {current.asphyxiaBaseline}
                    </span>
                    <motion.div 
                      key={`asph-base-${selectedScale}`}
                      initial={{ height: 0 }}
                      animate={{ height: 90 }}
                      transition={{ type: 'spring', damping: 18, stiffness: 120 }}
                      className="w-10 sm:w-14 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-lg shadow-lg shadow-rose-500/20 relative group cursor-default border-t border-rose-300"
                    />
                    <span className="text-[10px] font-mono text-rose-400/90 font-medium">Standard</span>
                  </div>

                  {/* AI Save Bar - Offset slightly right */}
                  <div className="flex flex-col items-center gap-1.5 translate-x-1 sm:translate-x-1.5">
                    {/* Top Value Label with Live Indicator */}
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-mono font-black text-teal-300">
                        {current.asphyxiaAi}
                      </span>
                      {isLiveTelemetryActive && (
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-sm shadow-teal-400" />
                      )}
                    </div>
                    <motion.div 
                      key={`asph-ai-${selectedScale}`}
                      initial={{ height: 0 }}
                      animate={{ height: 28 }}
                      transition={{ type: 'spring', damping: 18, stiffness: 120, delay: 0.12 }}
                      className="w-10 sm:w-14 min-h-[20px] bg-gradient-to-t from-teal-500 to-teal-300 rounded-t-lg shadow-lg shadow-teal-400/30 relative group cursor-default ring-1 ring-teal-200 border-t border-teal-100"
                    />
                    <span className="text-[10px] font-mono text-teal-300 font-bold">Hammacher</span>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-300 text-center font-medium">
                  Day-1 Asphyxia Neonatal Deaths
                </span>
              </div>
            </div>

            {/* Legend & Active Indicator */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-rose-500" />
                <span className="text-slate-300">Standard of Care (No Telemetry AI)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-teal-400" />
                <span className="text-teal-300 font-bold">The Hammacher System (&lt;0.92% Tested Error)</span>
              </div>
            </div>
          </div>

          {/* Footnotes */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 z-10">
            <span>UNICEF: 900,000 annual labor stillbirths</span>
            <span>WHO: ~1,000,000 Day-1 asphyxia deaths</span>
          </div>
        </div>

        {/* Right Column: Why <0.92% Error Margin is Essential */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>WHY &lt;0.92% TESTED ERROR MARGIN IS ESSENTIAL</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Tested Rigor
            </span>
          </div>

          <div className="space-y-2 flex-1 justify-around flex flex-col">
            {/* Reason 1 */}
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>1. ZERO TOLERANCE FOR MISSED HYPOXIA</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Missing pathological distress (Type II error) is catastrophic. Our model penalizes missed distress 10x heavier in the loss function to protect fetal viability.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold font-mono">
                <HeartPulse className="w-3.5 h-3.5" />
                <span>2. PREVENTING ALARM FATIGUE &amp; UNNECESSARY C-SECTIONS</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                The validated &lt;0.92% error envelope eliminates false alarms, ensuring surgical interventions occur only when true fetal compromise exists.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-teal-500/20 hover:border-teal-500/40 transition-colors">
              <div className="flex items-center gap-1.5 text-teal-300 text-xs font-bold font-mono">
                <Activity className="w-3.5 h-3.5" />
                <span>3. SCALABLE EDGE DEPLOYMENT</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Zero data-leakage and lightweight inference, capable of running on low-cost portable telemetry hardware in rural clinics worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Bottom Action Bar */}
      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10 mt-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-teal-950/90 border border-teal-500/40 text-teal-300 text-xs font-mono font-bold">
            Slide 8 of 9
          </span>
          <span className="text-xs font-mono text-slate-300 hidden sm:inline">
            Epidemiological Impact &amp; Clinical Efficacy (&lt;0.92% Tested Error Margin)
          </span>
        </div>

        {onNavigateNext && (
          <button
            onClick={onNavigateNext}
            className="px-4 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
          >
            <span>Proceed to Slide 9 (Tech Stack)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
