import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingDown, 
  ArrowRight, 
  Activity, 
  Sparkles, 
  Stethoscope, 
  Globe2, 
  Building2, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

interface Slide3Props {
  onNext: () => void;
}

export const Slide3Evaluation: React.FC<Slide3Props> = ({ onNext }) => {
  const [impactScale, setImpactScale] = useState<'global' | 'india' | 'hospital'>('global');

  // Realistic perinatal mortality & intervention impact data based on UNICEF & WHO
  const impactScales = {
    global: {
      title: 'Global Annual Projection (134M Births)',
      subtitle: 'UNICEF & WHO Perinatal Health Baseline',
      currentIntrapartum: 900000,
      currentAsphyxia: 1000000,
      preventedIntrapartum: 792000,
      preventedAsphyxia: 750000,
      totalSaved: 1542000,
      hieCasesPrevented: 620000,
      errorRate: '< 0.89%',
      targetPopulation: '134 Million Births / Year'
    },
    india: {
      title: 'High-Burden Regional Scale (India ~24M Births)',
      subtitle: 'District & Tertiary Government Maternity Facilities',
      currentIntrapartum: 180000,
      currentAsphyxia: 210000,
      preventedIntrapartum: 158400,
      preventedAsphyxia: 157500,
      totalSaved: 315900,
      hieCasesPrevented: 125000,
      errorRate: '< 0.89%',
      targetPopulation: '24 Million Births / Year'
    },
    hospital: {
      title: 'Tertiary Care Maternity Center (10,000 Deliveries)',
      subtitle: 'High-Volume Labor Ward & Neonatal ICU Network',
      currentIntrapartum: 75,
      currentAsphyxia: 85,
      preventedIntrapartum: 66,
      preventedAsphyxia: 64,
      totalSaved: 130,
      hieCasesPrevented: 52,
      errorRate: '< 0.89%',
      targetPopulation: '10,000 Deliveries / Year'
    }
  };

  const activeImpact = impactScales[impactScale];

  const beforeAfterChartData = [
    {
      name: 'Intrapartum Stillbirths (Labor)',
      StandardOfCare: activeImpact.currentIntrapartum,
      WithTeamCubeXAI: activeImpact.currentIntrapartum - activeImpact.preventedIntrapartum,
      SavedLives: activeImpact.preventedIntrapartum
    },
    {
      name: 'Day-1 Asphyxia Neonatal Deaths',
      StandardOfCare: activeImpact.currentAsphyxia,
      WithTeamCubeXAI: activeImpact.currentAsphyxia - activeImpact.preventedAsphyxia,
      SavedLives: activeImpact.preventedAsphyxia
    }
  ];

  return (
    <div className="relative h-full max-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-7 overflow-hidden rounded-3xl bg-[#080808] border border-white/10 shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-40"></div>
      </div>

      {/* Top Header */}
      <div className="relative z-10 border-b border-white/10 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-mono uppercase bg-teal-500/10 text-teal-300 border border-teal-500/30 font-bold tracking-wider">
              Slide 3 of 5 • Clinical AI Impact &amp; Lives Saved
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-mono hidden sm:inline">
              UNICEF &amp; WHO Perinatal Health Evaluation
            </span>
          </div>

          {/* Error Margin Verified Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono shadow-md">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <span>Validated Diagnostic Error Margin: <strong className="text-white font-bold text-sm sm:text-base">&lt; 0.89%</strong></span>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            Eradicating Intrapartum Demise &amp; Birth Asphyxia at Scale
          </h2>
          <span className="text-xs sm:text-sm font-mono text-teal-300 font-semibold">
            Transforming 900,000 Labor Deaths into Preventable Saves
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto py-2 space-y-3 sm:space-y-4 max-w-7xl mx-auto w-full min-h-0">
        {/* Scale Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs sm:text-sm font-mono uppercase font-bold text-slate-300">
              Select Deployment Scale:
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setImpactScale('global')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  impactScale === 'global' 
                    ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/30 scale-[1.02]' 
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Global (134M)
              </button>

              <button
                onClick={() => setImpactScale('india')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  impactScale === 'india' 
                    ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/30 scale-[1.02]' 
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Regional / India (24M)
              </button>

              <button
                onClick={() => setImpactScale('hospital')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  impactScale === 'hospital' 
                    ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/30 scale-[1.02]' 
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                1 Hospital (10k)
              </button>
            </div>
          </div>

          <div className="text-xs sm:text-sm font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Target Population: <strong className="text-teal-300">{activeImpact.targetPopulation}</strong></span>
          </div>
        </div>

        {/* 3 High-Impact Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Card 1: Total Lives Saved */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-teal-500/20 via-teal-500/5 to-transparent border border-teal-500/40 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-teal-300 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-400" />
                Human Lives Saved
              </span>
              <span className="px-2 py-0.5 rounded bg-teal-500/20 text-xs font-bold text-teal-300">
                Annual Save
              </span>
            </div>
            <div className="text-2xl sm:text-4xl font-mono font-extrabold text-teal-300 tracking-tight">
              {activeImpact.totalSaved.toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 leading-snug">
              Infants saved from preventable intrapartum demise through continuous CTG telemetry.
            </p>
          </div>

          {/* Card 2: Intrapartum Stillbirth Reduction */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent border border-emerald-500/40 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-emerald-300 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                Labor Stillbirth Reduction
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-xs font-bold text-emerald-300">
                ~88% Efficacy
              </span>
            </div>
            <div className="text-2xl sm:text-4xl font-mono font-extrabold text-emerald-400 tracking-tight">
              -{activeImpact.preventedIntrapartum.toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 leading-snug">
              Eliminates delayed obstetric response by flagging decelerations &amp; acute variability drops.
            </p>
          </div>

          {/* Card 3: HIE Cases Averted */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-cyan-500/5 to-transparent border border-cyan-500/40 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-cyan-300 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-cyan-400" />
                HIE Brain Damage Averted
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-xs font-bold text-cyan-300">
                Lifelong Health
              </span>
            </div>
            <div className="text-2xl sm:text-4xl font-mono font-extrabold text-cyan-300 tracking-tight">
              {activeImpact.hieCasesPrevented.toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-cyan-100 mt-1 leading-snug">
              Prevents lifelong Cerebral Palsy and Hypoxic-Ischemic Encephalopathy from oxygen starvation.
            </p>
          </div>
        </div>

        {/* Visual Impact Comparison Graph & Architectural Reliability */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
          {/* Left 7 cols: Comparison Bar Graph */}
          <div className="lg:col-span-7 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 shadow-xl flex flex-col justify-between space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-400" />
                <span className="text-xs sm:text-sm font-mono font-bold uppercase text-white tracking-wide">
                  Perinatal Mortality Reduction: Baseline vs Team Cube X AI
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-slate-300 font-semibold">
                {activeImpact.title}
              </span>
            </div>

            <div className="h-44 sm:h-52 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={beforeAfterChartData}
                  margin={{ top: 10, right: 15, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#cbd5e1" 
                    fontSize={12} 
                    tick={{ fill: '#e2e8f0', fontWeight: 600 }} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickFormatter={(v) => v >= 1000 ? `${(v/1000).toLocaleString()}k` : v} 
                  />
                  <Tooltip 
                    formatter={(val: any) => [`${Number(val).toLocaleString()} Deaths`, '']}
                    contentStyle={{ backgroundColor: '#0c0c0c', borderColor: '#334155', borderRadius: '10px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '6px', fontWeight: 600 }} />
                  <Bar 
                    name="Standard of Care (Without AI CTG Monitoring)" 
                    dataKey="StandardOfCare" 
                    fill="#f43f5e" 
                    radius={[6, 6, 0, 0]} 
                  />
                  <Bar 
                    name="With Team Cube X CTG AI (<0.89% Error Margin)" 
                    dataKey="WithTeamCubeXAI" 
                    fill="#14b8a6" 
                    radius={[6, 6, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-1.5 border-t border-white/10">
              <span>UNICEF: 900,000 annual labor stillbirths</span>
              <span className="text-teal-400 font-bold">WHO: ~1,000,000 Day-1 asphyxia deaths</span>
            </div>
          </div>

          {/* Right 5 cols: Clinical Reliability Pillars */}
          <div className="lg:col-span-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 shadow-xl flex flex-col justify-between space-y-2.5">
            <div className="flex items-center gap-2 text-teal-300 font-mono font-bold text-xs sm:text-sm uppercase">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Why &lt;0.89% Error Margin is Essential
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-0.5">
                <div className="flex items-center gap-1.5 text-rose-300 font-mono font-bold text-xs uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  1. Zero Tolerance for Missed Hypoxia
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Missing pathological distress (Type II error) is catastrophic. Our model penalizes missed distress 10× heavier in the loss function.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-0.5">
                <div className="flex items-center gap-1.5 text-amber-300 font-mono font-bold text-xs uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  2. Preventing Alarm Fatigue &amp; C-Sections
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  A tight &lt;0.89% error envelope eliminates false alarms, ensuring surgical interventions occur only when true fetal compromise exists.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-teal-500/15 border border-teal-500/40 text-teal-100 space-y-0.5">
                <div className="text-xs font-bold text-teal-300 font-mono uppercase">
                  3. Scalable Edge Deployment
                </div>
                <p className="text-xs leading-snug">
                  Zero data-leakage and lightweight inference, capable of running on low-cost portable telemetry hardware in rural clinics worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-300">
          <span className="px-3 py-1 rounded-lg bg-white/5 text-teal-400 border border-white/10 font-bold">
            Slide 3 of 5
          </span>
          <span>Epidemiological Impact &amp; Clinical Efficacy (&lt;0.89% Error Margin)</span>
        </div>

        <button
          onClick={onNext}
          className="group px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs sm:text-sm shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Proceed to Slide 4 (CTG Data &amp; Morphological Features)</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
