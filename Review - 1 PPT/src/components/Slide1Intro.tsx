import React from 'react';
import { 
  HeartPulse, 
  ArrowRight, 
  Flame, 
  Calendar, 
  MapPin, 
  User, 
  ShieldCheck, 
  Activity, 
  Sparkles 
} from 'lucide-react';
import { TEAM_INFO } from '../data/presentationData';

interface Slide1Props {
  onNext: () => void;
}

export const Slide1Intro: React.FC<Slide1Props> = ({ onNext }) => {
  return (
    <div className="relative h-full max-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 overflow-hidden rounded-3xl bg-[#080808] border border-white/10 shadow-2xl">
      {/* Dynamic Ambient Background with Subtle Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-teal-500/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute top-1/2 -right-32 w-[650px] h-[650px] bg-emerald-500/5 rounded-full blur-[180px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-40"></div>

        {/* Animated Background Rhythm Line */}
        <div className="absolute top-1/3 left-0 right-0 h-32 opacity-15 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1400 100" preserveAspectRatio="none">
            <path
              d="M0,50 L350,50 L370,40 L390,65 L410,10 L430,90 L450,45 L470,55 L490,50 L950,50 L970,40 L990,65 L1010,10 L1030,90 L1050,45 L1070,55 L1090,50 L1400,50"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="2"
              strokeDasharray="1400"
              strokeDashoffset="1400"
              className="animate-[dash_6s_linear_infinite]"
            />
          </svg>
        </div>
      </div>

      {/* Top Banner: Institutional Affiliations & Event Meta */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 sm:pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping"></span>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-teal-300 font-bold">
              IEEE PHOTONICS • VIT CHENNAI • IEEE SSCS • IEEE VTS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-300">
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <MapPin className="w-4 h-4 text-teal-400" />
            {TEAM_INFO.venue}
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <Calendar className="w-4 h-4 text-teal-400" />
            {TEAM_INFO.dates}
          </span>
        </div>
      </div>

      {/* Main Full-Page Hero Content */}
      <div className="relative z-10 my-auto py-2 sm:py-4 max-w-5xl mx-auto w-full space-y-4 sm:space-y-6">
        {/* Track Tag & Milestone Review Stage */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-mono font-bold tracking-wider">
            <Flame className="w-4 h-4 text-teal-400 animate-pulse" />
            HACKTRONICS 2nd EDITION • 24-HOURS HACKATHON
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 text-xs sm:text-sm font-mono font-semibold">
              Track ID: <strong className="text-teal-400 font-bold">HC-01 (Healthcare AI)</strong>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono font-bold">
              First Review Ready
            </span>
          </div>
        </div>

        {/* Team Cube X & Main Project Title */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight font-['Outfit'] text-slate-300">
              Team
            </span>
            <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Outfit'] text-teal-400 drop-shadow-[0_0_40px_rgba(20,184,166,0.4)]">
              Cube X
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Fetal Distress Detection from Cardiotocography (CTG) Signals
          </h1>
        </div>

        {/* Presentable High-Impact Clinical AI One-Liner */}
        <div className="relative p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-transparent border border-teal-500/40 shadow-xl shadow-teal-500/5 backdrop-blur-xl overflow-hidden group">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-teal-500 text-black shrink-0 mt-1 shadow-lg shadow-teal-500/30">
              <HeartPulse className="w-7 h-7 animate-pulse" />
            </div>
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-teal-300 font-bold block">
                Clinical AI Core Value Proposition
              </span>
              <p className="text-base sm:text-xl lg:text-2xl font-bold text-white leading-snug">
                "A zero-leakage, clinically interpretable multi-class machine learning system transforming 21 high-dimensional CTG physiological telemetry signals into real-time, obstetric-grade hypoxia risk stratification."
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm font-mono text-slate-300">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> FIGO Consensus Aligned
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-teal-300 font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Cost-Asymmetric Loss Optimization
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> SHAP Feature Attribution
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section - Only Names */}
        <div className="space-y-2.5 pt-1">
          <span className="text-xs sm:text-sm font-mono uppercase text-slate-300 tracking-wider flex items-center gap-2 font-bold">
            <User className="w-4 h-4 text-teal-400" />
            Team Members
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEAM_INFO.members.map((memberName, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-white/[0.08] transition-all duration-200 shadow-md group"
              >
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-950 border border-teal-500/40 text-teal-300 font-mono font-extrabold text-lg shadow-inner group-hover:scale-105 transition-transform">
                  {memberName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#080808]"></span>
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold text-lg sm:text-xl text-white group-hover:text-teal-300 transition-colors">
                    {memberName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation & Call to Action Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-white/10">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-300">
          <span className="px-3 py-1 rounded-lg bg-white/5 text-teal-400 border border-white/10 font-bold">
            Slide 1 of 5
          </span>
          <span>Team Cube X • S Sanjai Sivam &amp; BC Prateek</span>
        </div>

        <button
          id="btn-slide1-continue"
          onClick={onNext}
          className="group px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-sm sm:text-base shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
        >
          <span>Proceed to Slide 2 (Problem Formulation)</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
