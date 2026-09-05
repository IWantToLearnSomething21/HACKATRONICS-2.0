import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Server, Cpu, Layers, ShieldCheck, Terminal, 
  Database, Network, Zap, CheckCircle2, Box
} from 'lucide-react';
import { SlideData } from '../../types';

interface SlideTechStackProps {
  slide: SlideData;
}

export const SlideTechStack: React.FC<SlideTechStackProps> = ({ slide }) => {
  const [activeLayer, setActiveLayer] = useState<'frontend' | 'backend' | 'ml' | 'security'>('frontend');

  const layers = {
    frontend: {
      title: 'Frontend Presentation & Motion',
      techs: ['React 19', 'Tailwind CSS v4', 'Framer Motion (Hardware Accelerated)', 'Lucide React', 'Vite 6'],
      details: 'Ultra-modern frosted glass light/dark interface rendering 60FPS dual-trace SVGs, staggered card cascades, and zero-latency UI responses.',
      badge: 'React 19 • Framer Motion'
    },
    backend: {
      title: 'Backend Execution & Telemetry Engine',
      techs: ['Node.js / Express on Bun', 'Custom WebSocket Server', 'Binary Frame Compression', 'HL7 FHIR Interoperability'],
      details: 'Executes on the Bun runtime for 4x faster startup and ultra-low memory overhead, streaming synchronized 4Hz telemetry to dozens of ward displays.',
      badge: 'Bun • 4Hz WebSocket'
    },
    ml: {
      title: 'Machine Learning & Inference Pipeline',
      techs: ['Gradient Boosting (Family B)', '10-Minute Rolling Buffer Math', 'TreeSHAP Attribution', 'FIGO Tri-Class Decision Engine'],
      details: 'Evaluates 21 continuous physiological parameters in under 15 milliseconds, generating explainable feature weights with zero cloud dependency.',
      badge: '< 15ms ML Inference'
    },
    security: {
      title: 'Security, Compliance & Hospital Integration',
      techs: ['HIPAA / HITECH Compliant', 'AES-256 Data Encryption', 'TLS 1.3 Transport Security', 'Role-Based Access Control (RBAC)'],
      details: 'Designed for strict healthcare data protection standards with full audit trails, immutable acknowledgment logs, and on-premises edge deployment.',
      badge: 'HIPAA • HL7 FHIR'
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative overflow-hidden bg-slate-900 text-slate-100">
      {/* Slide Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Server className="w-4 h-4" />
            <span>{slide.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            {slide.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-300">
            99.999% Fault-Tolerant Architecture
          </span>
        </div>
      </div>

      {/* Main Grid: Layer Selector Tabs + Interactive Architecture Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-auto z-10 flex-1 overflow-hidden">
        {/* Left: 4 Stack Layers Selector */}
        <div className="lg:col-span-6 space-y-2.5">
          {(Object.keys(layers) as Array<keyof typeof layers>).map(key => {
            const isSelected = activeLayer === key;
            const l = layers[key];
            return (
              <div
                key={key}
                onClick={() => setActiveLayer(key)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-800/90 border-teal-400 ring-1 ring-teal-500/30 shadow-xl' 
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-white font-display">
                    {l.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-teal-300 border border-slate-700">
                    {l.badge}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {l.techs.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Deep Dive of Selected Tech Layer */}
        <div className="lg:col-span-6 bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> Technical Specification
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Hospital Scale</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {layers[activeLayer].title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {layers[activeLayer].details}
              </p>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <Zap className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Zero Latency Bottlenecks: Parallel asynchronous dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <Network className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>HL7 FHIR Protocols: Direct EHR synchronization</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>On-Premise Ready: Runs securely inside hospital firewalls</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 font-mono mt-3">
            <span className="text-teal-300 font-semibold">Reliability Target:</span> Zero data loss over 10,000 continuous hours of simulated telemetry.
          </div>
        </div>
      </div>

      {/* Bottom Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-slate-800/60 z-10">
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
