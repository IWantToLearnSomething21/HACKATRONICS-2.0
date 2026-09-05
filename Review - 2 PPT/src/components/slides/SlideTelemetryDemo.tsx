import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, Play, Pause, RotateCcw, AlertTriangle, 
  HeartPulse, ShieldCheck, ShieldAlert, Sparkles, Sliders, Radio, Zap
} from 'lucide-react';
import { SlideData, BedTelemetry, FIGOClass } from '../../types';
import { INITIAL_BEDS } from '../../data/slidesData';

interface SlideTelemetryDemoProps {
  slide: SlideData;
}

export const SlideTelemetryDemo: React.FC<SlideTelemetryDemoProps> = ({ slide }) => {
  const [beds, setBeds] = useState<BedTelemetry[]>(INITIAL_BEDS);
  const [activeBedId, setActiveBedId] = useState<string>('Bed 301');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [injectedEvent, setInjectedEvent] = useState<string | null>(null);

  const currentBed = beds.find(b => b.bedId === activeBedId) || beds[0];

  // 4Hz Simulated Telemetry Tick (every 250ms / speed)
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setBeds(prevBeds => 
        prevBeds.map(bed => {
          let nextFHR = bed.fhr;
          let nextTOCO = bed.toco;

          if (bed.status === 'Normal') {
            // Reassuring oscillation around 138-142 bpm
            const noise = (Math.random() - 0.5) * 4;
            nextFHR = Math.min(160, Math.max(120, Math.round(bed.baselineFHR + noise)));
            nextTOCO = Math.max(10, Math.min(30, Math.round(bed.toco + (Math.random() - 0.5) * 2)));
          } else if (bed.status === 'Suspect') {
            // Variable deceleration dip or fluctuating baseline
            const noise = (Math.random() - 0.5) * 8;
            nextFHR = Math.min(165, Math.max(115, Math.round(bed.fhr + noise)));
            nextTOCO = Math.max(15, Math.min(85, Math.round(bed.toco + (Math.random() - 0.4) * 5)));
          } else {
            // Pathological: severe bradycardia / profound late decels
            const noise = (Math.random() - 0.5) * 2;
            nextFHR = Math.min(110, Math.max(85, Math.round(bed.fhr + noise)));
            nextTOCO = Math.max(30, Math.min(95, Math.round(bed.toco + (Math.random() - 0.3) * 6)));
          }

          const newFhrHistory = [...bed.fhrHistory.slice(1), nextFHR];
          const newTocoHistory = [...bed.tocoHistory.slice(1), nextTOCO];

          return {
            ...bed,
            fhr: nextFHR,
            toco: nextTOCO,
            fhrHistory: newFhrHistory,
            tocoHistory: newTocoHistory
          };
        })
      );
    }, 250 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isRunning, simulationSpeed]);

  // Anomaly Injection Helpers
  const injectContraction = () => {
    setInjectedEvent('Acute Uterine Contraction Spike (TOCO 88 mmHg)');
    setBeds(prev => prev.map(b => b.bedId === activeBedId ? {
      ...b,
      toco: 88,
      tocoHistory: [...b.tocoHistory.slice(1), 88]
    } : b));
    setTimeout(() => setInjectedEvent(null), 4000);
  };

  const induceLateDecel = () => {
    setInjectedEvent('Profound Late Deceleration (Nadir 92 bpm)');
    setBeds(prev => prev.map(b => b.bedId === activeBedId ? {
      ...b,
      status: 'Pathological',
      confidence: 97.2,
      fhr: 92,
      baselineFHR: 100,
      variabilityBpm: 2,
      activeAlert: 'CRITICAL: Severe late deceleration following contraction peak',
      lastDecelerationType: 'Late',
      fhrHistory: [...b.fhrHistory.slice(1), 92]
    } : b));
    setTimeout(() => setInjectedEvent(null), 5000);
  };

  const induceVariableDecel = () => {
    setInjectedEvent('Recurrent Variable Deceleration (Cord Compression)');
    setBeds(prev => prev.map(b => b.bedId === activeBedId ? {
      ...b,
      status: 'Suspect',
      confidence: 84.5,
      fhr: 124,
      variabilityBpm: 5,
      activeAlert: 'Rapid drop and recovery in FHR (<30s to nadir)',
      lastDecelerationType: 'Variable'
    } : b));
    setTimeout(() => setInjectedEvent(null), 4000);
  };

  const resetToNormal = () => {
    setInjectedEvent('Restored Reassuring Baseline (140 bpm, Mod Variability)');
    setBeds(prev => prev.map(b => b.bedId === activeBedId ? {
      ...b,
      status: 'Normal',
      confidence: 98.1,
      fhr: 140,
      baselineFHR: 140,
      toco: 20,
      variabilityBpm: 14,
      activeAlert: 'Trace Stable: Reassuring baseline & moderate variability',
      lastDecelerationType: 'None'
    } : b));
    setTimeout(() => setInjectedEvent(null), 3000);
  };

  const getStatusBadge = (status: FIGOClass) => {
    switch (status) {
      case 'Normal':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> FIGO: NORMAL ({currentBed.confidence}%)
          </span>
        );
      case 'Suspect':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" /> FIGO: SUSPECT ({currentBed.confidence}%)
          </span>
        );
      case 'Pathological':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/40 text-xs font-semibold animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" /> FIGO: PATHOLOGICAL ({currentBed.confidence}%)
          </span>
        );
    }
  };

  // Convert array of numbers into SVG polyline points
  const generateFhrPoints = (data: number[]) => {
    const width = 600;
    const height = 120;
    const minFHR = 60;
    const maxFHR = 200;
    const step = width / (data.length - 1);

    return data
      .map((val, i) => {
        const x = i * step;
        const normalized = (val - minFHR) / (maxFHR - minFHR);
        const y = height - normalized * height;
        return `${x},${y}`;
      })
      .join(' ');
  };

  const generateTocoPoints = (data: number[]) => {
    const width = 600;
    const height = 70;
    const maxToco = 100;
    const step = width / (data.length - 1);

    return data
      .map((val, i) => {
        const x = i * step;
        const normalized = val / maxToco;
        const y = height - normalized * height;
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative overflow-hidden bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>{slide.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            {slide.title}
          </h2>
        </div>

        {/* Global Simulator Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isRunning ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-teal-500 text-slate-950 font-bold'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause 4Hz' : 'Resume 4Hz'}</span>
          </button>

          <div className="flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700 text-xs">
            <span className="text-[10px] text-slate-400 px-2 font-mono">Speed:</span>
            {[1, 2, 4].map(s => (
              <button
                key={s}
                onClick={() => setSimulationSpeed(s)}
                className={`px-2 py-0.5 rounded font-mono text-xs ${
                  simulationSpeed === s ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bed Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 z-10">
        {beds.map(b => (
          <button
            key={b.bedId}
            onClick={() => setActiveBedId(b.bedId)}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeBedId === b.bedId
                ? 'bg-slate-800 border-teal-400 ring-2 ring-teal-500/20 shadow-lg'
                : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-100 font-mono">{b.bedId}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${
                b.status === 'Normal' ? 'bg-emerald-400' : b.status === 'Suspect' ? 'bg-amber-400' : 'bg-rose-500 animate-ping'
              }`} />
            </div>
            <p className="text-xs text-slate-300 truncate mt-0.5">{b.patientName}</p>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>{b.fhr} bpm</span>
              <span>{b.toco} mmHg</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Interactive Oscilloscope & Control Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 z-10 flex-1 my-auto">
        {/* Left: Dual Channel Screen */}
        <div className="lg:col-span-8 bg-slate-950/90 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 font-mono">
                <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                <span>{currentBed.bedId} — {currentBed.patientName} ({currentBed.gestationalAge})</span>
              </div>
            </div>
            {getStatusBadge(currentBed.status)}
          </div>

          {/* Dynamic Alert Banner */}
          {injectedEvent && (
            <div className="px-3 py-1.5 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-200 text-xs font-mono flex items-center gap-2 mb-2 animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Injected Event: {injectedEvent}</span>
            </div>
          )}

          {/* Trace 1: FHR (Fetal Heart Rate) */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-teal-400 font-semibold flex items-center gap-1">
                <HeartPulse className="w-3.5 h-3.5" /> Fetal Heart Rate (FHR)
              </span>
              <div className="flex items-center gap-3 text-slate-300">
                <span>Baseline: <strong className="text-white">{currentBed.baselineFHR} bpm</strong></span>
                <span>Variability: <strong className="text-white">{currentBed.variabilityBpm} bpm</strong></span>
                <span className="text-teal-300 font-bold bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800">
                  {currentBed.fhr} BPM
                </span>
              </div>
            </div>

            <div className="h-28 w-full bg-slate-900/90 rounded-xl p-2 relative overflow-hidden border border-slate-800 bg-grid-medical">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 120">
                {/* 110-160 Normal FIGO baseline band */}
                <rect x="0" y="30" width="600" height="45" fill="rgba(16, 185, 129, 0.05)" />
                <polyline
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={generateFhrPoints(currentBed.fhrHistory)}
                />
              </svg>
              <div className="absolute right-3 top-2 text-[10px] font-mono text-emerald-400/80">FIGO Norm: 110-160 bpm</div>
            </div>
          </div>

          {/* Trace 2: TOCO (Uterine Contraction) */}
          <div className="space-y-1 mt-2">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-sky-400 font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Uterine Activity (TOCO)
              </span>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-sky-300 font-bold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800">
                  {currentBed.toco} mmHg
                </span>
              </div>
            </div>

            <div className="h-16 w-full bg-slate-900/90 rounded-xl p-2 relative overflow-hidden border border-slate-800 bg-grid-medical">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 70">
                <polyline
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={generateTocoPoints(currentBed.tocoHistory)}
                />
              </svg>
            </div>
          </div>

          {/* Active Alert Readout */}
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
            <span className="truncate max-w-lg text-[11px]">
              <strong className="text-teal-400 font-mono">Clinical Readout:</strong> {currentBed.activeAlert}
            </span>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">4 updates/sec</span>
          </div>
        </div>

        {/* Right: Anomaly Injection & Live Experimentation Panel */}
        <div className="lg:col-span-4 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 font-mono uppercase pb-2 border-b border-slate-800">
              <Sliders className="w-4 h-4 text-teal-400" />
              <span>Interactive Telemetry Testbench</span>
            </div>
            <p className="text-[11px] text-slate-400 my-2">
              Simulate acute physiological anomalies to test real-time FIGO classification and waveform response:
            </p>

            {/* Testbench Action Buttons */}
            <div className="space-y-2 mt-3">
              <button
                id="inject-contraction-btn"
                onClick={injectContraction}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-sky-400" />
                  <span>1. Inject Contraction Spike (TOCO 88)</span>
                </div>
                <Zap className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                id="induce-late-decel-btn"
                onClick={induceLateDecel}
                className="w-full p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/60 text-rose-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>2. Induce Severe Late Decel (FHR 92)</span>
                </div>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              </button>

              <button
                id="induce-variable-decel-btn"
                onClick={induceVariableDecel}
                className="w-full p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 text-amber-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>3. Induce Variable Decels (Cord)</span>
                </div>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                id="reset-normal-btn"
                onClick={resetToNormal}
                className="w-full p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 text-emerald-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4. Restore Normal Baseline (140)</span>
                </div>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Latency info card */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mt-4 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Streaming Protocol:</span>
              <span className="text-teal-400">WebSocket (4Hz Pub/Sub)</span>
            </div>
            <div className="flex justify-between">
              <span>Rolling Buffer:</span>
              <span className="text-slate-200">20-Minute Epoch</span>
            </div>
            <div className="flex justify-between">
              <span>Inference Frequency:</span>
              <span className="text-emerald-400">Continuous Sub-15ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/60 z-10">
        {slide.keyStats?.map((stat, i) => (
          <div key={i} className="space-y-0.5">
            <span className="text-lg sm:text-xl font-extrabold text-white font-mono tracking-tight">
              {stat.value}
            </span>
            <p className="text-xs font-semibold text-teal-400">{stat.label}</p>
            <p className="text-[10px] text-slate-400 truncate">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
