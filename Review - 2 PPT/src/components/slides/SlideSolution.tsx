import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Activity, Cpu, ShieldCheck, PhoneCall, 
  ArrowRight, CheckCircle2, Zap, Layers, Bell, Check
} from 'lucide-react';
import { SlideData } from '../../types';

interface SlideSolutionProps {
  slide: SlideData;
}

export const SlideSolution: React.FC<SlideSolutionProps> = ({ slide }) => {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const stages = [
    {
      step: '01',
      title: '4Hz Ingestion Engine',
      subtitle: 'Sub-second Continuous Telemetry',
      icon: Activity,
      color: 'teal',
      details: 'Pulls synchronized Fetal Heart Rate (bpm) and Tocodynamometer Uterine Contractions (mmHg) at 4 updates per second via WebSocket pub/sub across up to 32 delivery suites.',
      metrics: '4 Hz • Sub-8ms Jitter • Zero Frame Drops'
    },
    {
      step: '02',
      title: '21-Feature Extraction Buffer',
      subtitle: 'Continuous Physiological Math',
      icon: Layers,
      color: 'cyan',
      details: 'Calculates rolling Baseline FHR, Abnormal Short-Term Variability (ASTV), Abnormal Long-Term Variability (ALTV), Acceleration intervals, Deceleration morphology, and Histogram distribution moments.',
      metrics: '21 FIGO Parameters • 10-Min Sliding Buffer'
    },
    {
      step: '03',
      title: 'Gradient Boosting (Family B)',
      subtitle: 'Tri-Class FIGO Inference',
      icon: Cpu,
      color: 'emerald',
      details: 'Evaluates feature vectors against thousands of validated CTG traces, outputting instant calibrated probabilities for Normal (Green), Suspect (Amber), and Pathological (Ruby Red).',
      metrics: '< 15ms Inference • TreeSHAP Explainability'
    },
    {
      step: '04',
      title: '3-Tier Escalation Matrix',
      subtitle: 'Closed-Loop Response Protocol',
      icon: PhoneCall,
      color: 'rose',
      details: 'Autonomous multi-tier dispatch: Tier 1 browser telemetry pulses, Tier 2 PagerDuty doctor alerts for suspect drift, and Tier 3 automated voice calls with TTS reading exact physiological values.',
      metrics: 'Push • PagerDuty API • Voice TTS Call'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative overflow-hidden bg-slate-900 text-slate-100">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Slide Header */}
      <div className="space-y-1 z-10">
        <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>{slide.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
          {slide.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl">
          {slide.subtitle}
        </p>
      </div>

      {/* Interactive 4-Stage Architectural Pipeline */}
      <div className="my-auto space-y-6 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedStage(idx)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-slate-800/90 border-teal-400 ring-2 ring-teal-500/30 shadow-xl shadow-teal-500/10 -translate-y-1' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-500/10">
                      STAGE {stage.step}
                    </span>
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 font-display mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {stage.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{isSelected ? 'Active Step' : 'Click to inspect'}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-teal-400" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Card for Selected Pipeline Stage */}
        <motion.div 
          key={selectedStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-teal-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-teal-400">
                Detailed Architecture • {stages[selectedStage].title}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {stages[selectedStage].details}
            </p>
          </div>

          <div className="px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 font-mono text-xs text-teal-300 shrink-0">
            <span className="text-[10px] text-slate-400 block font-sans">Pipeline Specification:</span>
            <span className="font-bold">{stages[selectedStage].metrics}</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800/60 z-10">
        {slide.keyStats?.map((stat, i) => (
          <div key={i} className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
              {stat.value}
            </span>
            <p className="text-xs font-semibold text-teal-400">{stat.label}</p>
            <p className="text-[11px] text-slate-400 truncate">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
