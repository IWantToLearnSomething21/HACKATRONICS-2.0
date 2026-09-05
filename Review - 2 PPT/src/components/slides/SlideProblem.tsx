import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, VolumeX, EyeOff, Baby, Clock, 
  TrendingDown, CheckCircle, FileText, Siren, HeartCrack, ShieldCheck, HeartPulse
} from 'lucide-react';
import { SlideData } from '../../types';

interface SlideProblemProps {
  slide: SlideData;
}

export const SlideProblem: React.FC<SlideProblemProps> = ({ slide }) => {
  const [activeTab, setActiveTab] = useState<'alarm' | 'subjective' | 'lives'>('alarm');

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative overflow-hidden bg-slate-900 text-slate-100">
      {/* Background ambient red/amber tint for clinical crisis tone */}
      <div className="absolute top-1/3 -right-20 w-[450px] h-[350px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Slide Header */}
      <div className="space-y-1 z-10">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>{slide.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
          {slide.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl">
          {slide.subtitle}
        </p>
      </div>

      {/* Main Grid: Three Core Pillars of the Crisis */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 z-10">
        {/* Left Column: Interactive Crisis Tabs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('alarm')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'alarm' 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>1. Alarm Fatigue</span>
            </button>
            <button
              onClick={() => setActiveTab('subjective')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'subjective' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>2. Visual Bias</span>
            </button>
            <button
              onClick={() => setActiveTab('lives')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'lives' 
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Baby className="w-3.5 h-3.5" />
              <span>3. Lives & Brain Safety</span>
            </button>
          </div>

          {/* Dynamic Narrative Card based on Tab */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-xl space-y-4 min-h-[220px]">
            {activeTab === 'alarm' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Siren className="w-4 h-4 animate-bounce" />
                  <span>88% of Bedside CTG Alarms Are Clinically Non-Actionable</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Delivery suites are constantly assaulted by high-frequency acoustic beeps caused by sensor displacement or maternal movement. Clinicians involuntarily develop desensitization—meaning when real acute bradycardia or profound late decelerations strike, the alarm is often muted or tuned out.
                </p>
                <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-xl flex items-center justify-between text-xs text-rose-200">
                  <span>Average alarms per labor shift: <strong>240+ events</strong></span>
                  <span className="font-mono text-rose-400">Desensitization Rate: 72%</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'subjective' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <EyeOff className="w-4 h-4" />
                  <span>Low Inter-Observer Agreement on Borderline FIGO Traces</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Visual interpretation of analog CTG strips is notoriously subjective. Studies reveal that two experienced board-certified obstetricians examining the exact same trace disagree on classification in over 42% of cases, leading to either unnecessary emergency C-sections or delayed intervention.
                </p>
                <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded-xl flex items-center justify-between text-xs text-amber-200">
                  <span>FIGO Disagreement Rate: <strong>42.4%</strong></span>
                  <span className="font-mono text-amber-400">Intra-observer shift: 31%</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'lives' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                  <HeartPulse className="w-4 h-4 text-teal-400" />
                  <span>Preventing Neonatal Brain Hypoxia & Intrapartum Asphyxia (HIE)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Over 1.15 million newborns worldwide suffer from intrapartum hypoxic-ischemic encephalopathy (HIE) and birth asphyxia annually. In over 70% of adverse cases, subtle indicators of fetal metabolic decompensation were present on the trace 30–60 minutes prior, but went unnoticed during labor peaks—leading to preventable cerebral palsy or stillbirth.
                </p>
                <div className="p-3 bg-teal-950/30 border border-teal-800/50 rounded-xl flex items-center justify-between text-xs text-teal-200">
                  <span>Global Annual HIE Cases: <strong>1.15 Million</strong></span>
                  <span className="font-mono text-teal-300">Preventable With Early Triage: 75%+</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column: Comparison Card (Legacy vs Reality) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-semibold text-slate-300 uppercase">
                The Legacy Workflow Failure
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                UNPROTECTED
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <Clock className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Delayed Anomaly Detection</span>
                  <span className="text-slate-400 text-[11px]">Nurses check monitors intermittently while multitasking across 3-4 rooms.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Manual Escalation Overhead</span>
                  <span className="text-slate-400 text-[11px]">Midwife must manually page doctor, wait for call-back, and describe trace over phone.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <HeartCrack className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Fetal Acidosis Progression</span>
                  <span className="text-slate-400 text-[11px]">Cord pH falls rapidly (0.01 pH per 2-3 minutes) during continuous uncorrected hypoxia.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-center">
              <span className="text-[11px] font-medium text-teal-300">
                The Hammacher System automates this entire chain in sub-second intervals.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800/60 z-10">
        {slide.keyStats?.map((stat, i) => (
          <div key={i} className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-extrabold text-rose-400 font-mono tracking-tight">
              {stat.value}
            </span>
            <p className="text-xs font-semibold text-slate-200">{stat.label}</p>
            <p className="text-[11px] text-slate-400 truncate">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
