import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  AlertCircle, 
  ArrowRight
} from 'lucide-react';
import { LiveWaveformSimulator } from './LiveWaveformSimulator';
import { CLASS_DISTRIBUTION_DATA } from '../data/presentationData';

interface Slide2Props {
  onNext: () => void;
}

export const Slide2Problem: React.FC<Slide2Props> = ({ onNext }) => {
  const [selectedClassIndex, setSelectedClassIndex] = useState<number>(0);

  return (
    <div className="relative h-full max-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-7 overflow-hidden rounded-3xl bg-[#080808] border border-white/10 shadow-2xl">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-1 rounded text-xs font-mono uppercase bg-white/5 text-teal-400 border border-white/10 font-bold">
            Slide 2 of 5 • Problem Formulation
          </span>
          <span className="text-xs sm:text-sm text-slate-300 font-mono">Clinical Background &amp; Pathophysiology</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          The Problem: Fetal Distress &amp; Cardiotocography (CTG)
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch min-h-0">
        {/* Left 6 cols: What is CTG and why is it vital */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
          {/* Card 1: What is CTG */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-3.5 sm:p-4 shadow-lg">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-teal-400 flex items-center gap-2 mb-1.5">
              <Activity className="w-4 h-4 text-teal-400" />
              01. What is Cardiotocography (CTG)?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Cardiotocography (CTG) is a continuous electronic recording tool standard in modern obstetrics, capturing two simultaneous physiological channels:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-teal-300 font-bold text-xs sm:text-sm font-mono mb-0.5">
                  <Heart className="w-3.5 h-3.5 text-teal-400" />
                  1. Fetal Heart Rate (FHR)
                </div>
                <p className="text-slate-300 text-xs leading-normal">
                  Recorded in bpm. Reflects autonomic tone, cardiac pacemaking, and reactivity.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-purple-300 font-bold text-xs sm:text-sm font-mono mb-0.5">
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  2. Uterine Contractions (UC)
                </div>
                <p className="text-slate-300 text-xs leading-normal">
                  Recorded via toco. Contractions compress uteroplacental vessels, stressing fetal reserve.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Pathophysiology */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-3.5 sm:p-4 shadow-lg">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-rose-400 flex items-center gap-2 mb-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              02. Clinical Urgency: Hypoxia &amp; Acidosis
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Oxygen deprivation during labor progresses into <strong className="text-white">tissue hypoxia, anaerobic metabolism, and severe metabolic acidosis (pH &lt; 7.00)</strong>.
            </p>
            <div className="mt-2 p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs sm:text-sm text-rose-200">
              <span className="font-bold text-rose-400 font-mono uppercase text-[11px]">Goal:</span>
              <span>Enable automated AI triage to detect pre-acidotic signals hours before irreversible brain injury.</span>
            </div>
          </div>

          {/* 3 Diagnostic Ground-Truth Categories */}
          <div className="space-y-1.5">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-teal-400 font-bold block">
              03. The 3 Diagnostic Ground-Truth Categories:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {CLASS_DISTRIBUTION_DATA.map((cls, idx) => (
                <button
                  key={cls.classId}
                  onClick={() => setSelectedClassIndex(idx)}
                  className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedClassIndex === idx 
                      ? 'bg-teal-500/15 border-teal-400 shadow-md ring-1 ring-teal-400/40' 
                      : 'bg-white/5 border-white/10 opacity-80 hover:opacity-100 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-white">Class {cls.classId}</span>
                    <span className={`text-[10px] sm:text-xs px-1.5 py-0.2 rounded font-mono font-bold ${cls.badgeColor}`}>
                      {cls.name}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-300 font-mono mt-0.5">
                    {cls.count} cases ({cls.percentage}%)
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 6 cols: Waveform Simulator & Selected Class Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
          <LiveWaveformSimulator selectedClass={CLASS_DISTRIBUTION_DATA[selectedClassIndex].classId} />

          {/* Deep-dive card on selected class */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-3.5 sm:p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3.5 h-3.5 rounded-full" 
                  style={{ backgroundColor: CLASS_DISTRIBUTION_DATA[selectedClassIndex].color }}
                />
                <h4 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                  Class {CLASS_DISTRIBUTION_DATA[selectedClassIndex].classId}: {CLASS_DISTRIBUTION_DATA[selectedClassIndex].name} State
                </h4>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold ${CLASS_DISTRIBUTION_DATA[selectedClassIndex].badgeColor}`}>
                Risk: {CLASS_DISTRIBUTION_DATA[selectedClassIndex].riskLevel}
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="bg-black/40 p-2.5 sm:p-3 rounded-xl border border-white/5">
                <span className="font-mono text-teal-400 font-bold block mb-0.5">Clinical Definition:</span>
                <p className="text-slate-300 leading-relaxed">
                  {CLASS_DISTRIBUTION_DATA[selectedClassIndex].clinicalMeaning}
                </p>
              </div>

              <div className="bg-black/40 p-2.5 sm:p-3 rounded-xl border border-white/5">
                <span className="font-mono text-amber-400 font-bold block mb-0.5">Required Clinical Response:</span>
                <p className="text-slate-300 leading-relaxed">
                  {CLASS_DISTRIBUTION_DATA[selectedClassIndex].clinicalAction}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
        <span className="text-xs sm:text-sm font-mono text-slate-300">
          Next: Slide 3 – Global Perinatal Crisis &amp; AI Clinical Impact (&lt;0.89% Error Margin)
        </span>

        <button
          id="btn-slide2-next"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Global Crisis &amp; AI Impact</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
