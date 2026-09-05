import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, ShieldCheck, Zap, Sparkles, HeartPulse, 
  ArrowRight, Radio, Server, CheckCircle2, ChevronRight,
  UserCheck
} from 'lucide-react';
import { SlideData } from '../../types';

interface SlideTitleProps {
  slide: SlideData;
  onNavigateToDemo: () => void;
}

export const SlideTitle: React.FC<SlideTitleProps> = ({ slide, onNavigateToDemo }) => {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % 100);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-slate-100">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Meta Badges */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center gap-3 z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span>{slide.badge}</span>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs">
          <Radio className="w-3.5 h-3.5 text-teal-400" />
          <span>Live 4Hz Telemetry Streaming</span>
        </div>
        <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>FIGO 2015 Compliant</span>
        </div>
      </motion.div>

      {/* Main Title & Hero Presentation */}
      <div className="my-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7 space-y-5"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-widest">
              <span>HC-01 • Clinical Decision Support Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display">
              The Hammacher <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-sky-400">
                System
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed pt-1">
              Autonomous multi-bed cardiotocography triage & sub-second clinical escalation for modern labor and delivery maternity wards.
            </p>
          </div>

          {/* Team Members Featured Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-850/80 to-slate-900/90 border border-teal-500/30 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-teal-400" />
                Engineering &amp; Research Team • Cube X
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                Hacktronics 2nd Edition
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2.5">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center font-bold text-teal-300 text-xs font-mono">
                  SS
                </div>
                <div>
                  <span className="text-xs font-bold text-white block leading-tight font-display">
                    S Sanjai Sivam
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center font-bold text-cyan-300 text-xs font-mono">
                  BP
                </div>
                <div>
                  <span className="text-xs font-bold text-white block leading-tight font-display">
                    B C Prateek
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Value Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-base sm:text-lg font-mono">
                <Activity className="w-4 h-4 text-teal-400" />
                <span>4 Hz</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Real-Time Telemetry</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base sm:text-lg font-mono">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>3 Tiers</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Automated Escalation</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base sm:text-lg font-mono">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>21 Biomarkers</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">FIGO Feature Extraction</p>
            </div>
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-4">
            <button
              id="title-explore-live-demo-btn"
              onClick={onNavigateToDemo}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-500/25 transition-all duration-200 cursor-pointer"
            >
              <span>Explore Live Telemetry Demo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-slate-400 font-sans">
              Named in honor of Dr. Konrad Hammacher, pioneer of Cardiotocography
            </span>
          </div>
        </motion.div>

        {/* Right Animated Oscilloscope Widget */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl bg-slate-950/80 border border-teal-500/30 p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Window header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-semibold text-slate-200">
                  Ward Central Telemetry • Bed 301
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                FIGO: NORMAL (98.2%)
              </span>
            </div>

            {/* FHR Trace Display */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-teal-400 flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5" /> Fetal Heart Rate (FHR)
                </span>
                <span className="text-slate-300 font-bold">142 bpm (Baseline: 140)</span>
              </div>

              {/* Dynamic SVG Waveform */}
              <div className="h-24 w-full bg-slate-900/90 rounded-lg p-2 relative overflow-hidden border border-slate-800 bg-grid-medical">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 80">
                  <defs>
                    <linearGradient id="fhr-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,40 Q 25,32 50,42 T 100,38 T 150,45 T 200,30 T 250,42 T 300,36"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0,40 Q 25,32 50,42 T 100,38 T 150,45 T 200,30 T 250,42 T 300,36 L 300,80 L 0,80 Z"
                    fill="url(#fhr-grad)"
                  />
                </svg>
                {/* Real-time scanning vertical line */}
                <div className="absolute inset-y-0 right-1/4 w-0.5 bg-cyan-400/80 shadow-lg shadow-cyan-400" />
              </div>
            </div>

            {/* TOCO Trace Display */}
            <div className="space-y-1 mt-3">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-sky-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> Uterine Contraction (TOCO)
                </span>
                <span className="text-slate-300 font-bold">22 mmHg (Resting)</span>
              </div>

              <div className="h-16 w-full bg-slate-900/90 rounded-lg p-2 relative overflow-hidden border border-slate-800 bg-grid-medical">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 50">
                  <path
                    d="M 0,40 Q 60,38 120,39 T 180,22 T 240,38 T 300,40"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Live Model Inference Status Footer */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <Server className="w-3 h-3 text-teal-400" />
                Inference: 11.2ms
              </span>
              <span className="text-teal-300">ASTV: 34% • ALTV: 4%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Key Metric Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800/60 z-10"
      >
        {slide.keyStats?.map((stat, i) => (
          <div key={i} className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
              {stat.value}
            </span>
            <p className="text-xs font-semibold text-teal-400">{stat.label}</p>
            <p className="text-[11px] text-slate-400 truncate">{stat.subtext}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
