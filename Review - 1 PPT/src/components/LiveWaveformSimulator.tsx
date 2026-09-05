import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, AlertTriangle, ShieldCheck, Heart, Waves } from 'lucide-react';

interface WaveformProps {
  selectedClass?: number; // 1: Normal, 2: Suspect, 3: Pathological
  compact?: boolean;
}

export const LiveWaveformSimulator: React.FC<WaveformProps> = ({
  selectedClass = 1,
  compact = false
}) => {
  const [activeClass, setActiveClass] = useState<number>(selectedClass);
  const [isPlaying] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeOffsetRef = useRef<number>(0);

  useEffect(() => {
    setActiveClass(selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = compact ? 120 : 150);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = compact ? 120 : 150;
      }
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Draw Grid lines (CTG paper style with dark grid)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Dividing line between FHR (top 65%) and UC (bottom 35%)
      const splitY = height * 0.65;
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.3)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, splitY);
      ctx.lineTo(width, splitY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Section Labels
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.fillText('FHR • bpm', 10, 14);
      ctx.fillText('UC • mmHg', 10, splitY + 14);

      const t = timeOffsetRef.current;

      // 1. Draw FHR Waveform
      ctx.beginPath();
      ctx.lineWidth = 2;
      
      let strokeGradient = ctx.createLinearGradient(0, 0, width, 0);
      if (activeClass === 1) {
        strokeGradient.addColorStop(0, '#10b981');
        strokeGradient.addColorStop(1, '#34d399');
      } else if (activeClass === 2) {
        strokeGradient.addColorStop(0, '#f59e0b');
        strokeGradient.addColorStop(1, '#fbbf24');
      } else {
        strokeGradient.addColorStop(0, '#ef4444');
        strokeGradient.addColorStop(1, '#f87171');
      }
      ctx.strokeStyle = strokeGradient;

      const fhrBaselineY = splitY * 0.5;

      for (let x = 0; x < width; x++) {
        const time = (x + t) * 0.05;
        let yOffset = 0;

        if (activeClass === 1) {
          // Normal: Healthy variability + spontaneous accelerations
          const variability = Math.sin(time * 3) * 6 + Math.cos(time * 7) * 3;
          const acceleration = Math.sin(time * 0.3) > 0.7 ? -18 : 0;
          yOffset = variability + acceleration;
        } else if (activeClass === 2) {
          // Suspect: Reduced variability + minor early dip
          const variability = Math.sin(time * 2) * 2.5 + Math.cos(time * 4) * 1.5;
          const earlyDecel = Math.sin(time * 0.25) > 0.8 ? 12 : 0;
          yOffset = variability + earlyDecel;
        } else {
          // Pathological: Severe flatline + deep late prolonged decelerations
          const flatlineVariability = Math.sin(time * 8) * 0.8;
          const severeDeceleration = Math.sin(time * 0.2) > 0.5 ? 26 : 0;
          yOffset = flatlineVariability + severeDeceleration;
        }

        const y = fhrBaselineY + yOffset;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Draw UC (Uterine Contractions) Waveform
      ctx.beginPath();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#c084fc';

      const ucBaselineY = splitY + (height - splitY) * 0.7;

      for (let x = 0; x < width; x++) {
        const time = (x + t) * 0.05;
        // Periodic bell-shaped uterine contractions
        const wave = Math.max(0, Math.sin(time * 0.2));
        const contraction = Math.pow(wave, 3) * (height - splitY) * 0.65;
        const noise = Math.sin(time * 5) * 1.5;
        const y = ucBaselineY - contraction + noise;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (isPlaying) {
        timeOffsetRef.current += 1;
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };

    let animationFrameRef: { current: number | null } = { current: null };
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeClass, isPlaying, compact]);

  return (
    <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-3 sm:p-3.5 shadow-xl backdrop-blur-md">
      {/* Header controls for the waveform */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-200">
              Real-Time CTG Waveform Synthesizer
            </h4>
            <p className="text-[11px] text-slate-400">
              Synchronized FHR Baseline + Tocography Uterine Contractions
            </p>
          </div>
        </div>

        {/* State Selector Buttons */}
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveClass(1)}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              activeClass === 1
                ? 'bg-green-500/20 text-green-300 border border-green-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Class 1: Normal
          </button>
          <button
            onClick={() => setActiveClass(2)}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              activeClass === 2
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Class 2: Suspect
          </button>
          <button
            onClick={() => setActiveClass(3)}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              activeClass === 3
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Class 3: Pathological
          </button>
        </div>
      </div>

      {/* Canvas Screen */}
      <div className="relative w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 shadow-inner">
        <canvas ref={canvasRef} className="w-full block" />
        
        {/* Dynamic Telemetry Overlay */}
        <div className="absolute top-1.5 right-2 flex items-center gap-2 text-[11px] font-mono bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10">
          <div className="flex items-center gap-1">
            <Heart className={`w-3 h-3 ${activeClass === 3 ? 'text-rose-500 animate-ping' : 'text-green-400'}`} />
            <span className="text-slate-200 font-semibold">
              {activeClass === 1 ? '138 bpm' : activeClass === 2 ? '152 bpm' : '92 bpm (Bradycardia)'}
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1">
            <Waves className="w-3 h-3 text-purple-400" />
            <span className="text-slate-200">
              ASTV: <strong className="text-teal-300">{activeClass === 1 ? '24%' : activeClass === 2 ? '54%' : '82%'}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Clinical Diagnostic Footnote */}
      <div className="mt-1.5 flex items-center justify-between text-xs text-slate-300 px-1 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
          <span>FHR</span>
          <span className="w-2 h-2 rounded-full bg-purple-400 inline-block ml-1"></span>
          <span>UC</span>
        </div>
        <div className="text-teal-300 font-medium truncate max-w-[420px]">
          {activeClass === 1 && 'Morphology: High variability & reactive accelerations'}
          {activeClass === 2 && 'Morphology: Reduced variability & early decelerations'}
          {activeClass === 3 && 'Morphology: Severe flatline & late prolonged decelerations'}
        </div>
      </div>
    </div>
  );
};
