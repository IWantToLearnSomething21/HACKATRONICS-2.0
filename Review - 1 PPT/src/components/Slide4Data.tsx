import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { 
  Database, 
  BarChart3, 
  PieChart as PieIcon, 
  ArrowRight, 
  Sliders
} from 'lucide-react';
import { CLASS_DISTRIBUTION_DATA, CTG_FEATURES } from '../data/presentationData';

interface Slide4Props {
  onNext: () => void;
}

export const Slide4Data: React.FC<Slide4Props> = ({ onNext }) => {
  const [selectedFeature, setSelectedFeature] = useState<string>('ASTV');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewType, setViewType] = useState<'bar' | 'pie'>('bar');

  const filteredFeatures = activeCategory === 'All' 
    ? CTG_FEATURES 
    : CTG_FEATURES.filter(f => f.category === activeCategory);

  const activeFeatureObj = CTG_FEATURES.find(f => f.code === selectedFeature) || CTG_FEATURES[0];

  const barChartData = CLASS_DISTRIBUTION_DATA.map(d => ({
    name: `Class ${d.classId}: ${d.name}`,
    count: d.count,
    percentage: d.percentage,
    color: d.color,
    risk: d.riskLevel
  }));

  const pieChartData = CLASS_DISTRIBUTION_DATA.map(d => ({
    name: `${d.name} (Class ${d.classId})`,
    value: d.count,
    percentage: d.percentage,
    color: d.color
  }));

  return (
    <div className="relative h-full max-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-7 overflow-hidden rounded-3xl bg-[#080808] border border-white/10 shadow-2xl">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 left-1/3 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-mono uppercase bg-white/5 text-teal-400 border border-white/10 font-bold">
              Slide 4 of 5 • Dataset &amp; Features
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-mono">UCI ML Cardiotocography Dataset (N = 2,126)</span>
          </div>

          {/* Toggle Bar vs Pie Chart */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => setViewType('bar')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewType === 'bar' ? 'bg-teal-500 text-black font-bold shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Bar Graph
            </button>
            <button
              onClick={() => setViewType('pie')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewType === 'pie' ? 'bg-teal-500 text-black font-bold shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" />
              Proportions
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          Dataset Distribution &amp; Morphological Feature Dictionary
        </h2>
      </div>

      {/* Main Content: Chart (Left) + Feature Explorer (Right) */}
      <div className="relative z-10 my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch min-h-0">
        {/* Left 6 cols: Visual Representation of Data */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-3.5 sm:p-4 shadow-xl flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-mono uppercase font-bold text-teal-400 flex items-center gap-2">
                  <Database className="w-4 h-4 text-teal-400" />
                  Target Class Imbalance (N = 2,126 Recordings)
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Severe class skewness necessitating stratified splitting &amp; balanced class weighting
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 text-teal-300 border border-white/10 font-bold">
                21 Features Total
              </span>
            </div>

            {/* Interactive Chart Container */}
            <div className="h-44 sm:h-52 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                {viewType === 'bar' ? (
                  <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#cbd5e1', fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 600 }} 
                      axisLine={{ stroke: '#333' }}
                    />
                    <YAxis 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                      axisLine={{ stroke: '#333' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0a0a0a', 
                        borderColor: 'rgba(255,255,255,0.15)', 
                        borderRadius: '12px',
                        color: '#f8fafc',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '12px'
                      }}
                      formatter={(val: number, name: string, item: any) => [
                        `${val} samples (${item.payload.percentage}%)`, 
                        'Count'
                      ]}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {barChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`pie-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0a0a0a', 
                        borderColor: 'rgba(255,255,255,0.15)', 
                        borderRadius: '12px',
                        color: '#f8fafc',
                        fontFamily: 'JetBrains Mono'
                      }} 
                    />
                    <Legend 
                      formatter={(val) => <span className="text-xs font-mono text-slate-300 font-bold">{val}</span>} 
                    />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/10 text-center font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block font-bold">Class 1 (Normal)</span>
                <span className="text-sm sm:text-base font-extrabold text-green-400">1,655 (77.8%)</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block font-bold">Class 2 (Suspect)</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-400">295 (13.9%)</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block font-bold">Class 3 (Pathol)</span>
                <span className="text-sm sm:text-base font-extrabold text-rose-400">176 (8.3%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Feature Dictionary & Signal Importance */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-3.5 sm:p-4 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-mono uppercase font-bold text-teal-400 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-teal-400" />
                  Key CTG Morphological Markers
                </span>
                
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-mono">
                  {['All', 'Variability', 'Histogram', 'Accelerations/Decelerations'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-teal-500 text-black font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white bg-white/5'
                      }`}
                    >
                      {cat === 'Accelerations/Decelerations' ? 'Acc/Dec' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Horizontal Selector Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
                {filteredFeatures.map((feat) => (
                  <button
                    key={feat.code}
                    onClick={() => setSelectedFeature(feat.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shrink-0 transition-all cursor-pointer ${
                      selectedFeature === feat.code
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                        : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    #{feat.importanceRank} {feat.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Feature Deep Dive Box */}
            <div className="mt-2 p-3 sm:p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <div>
                  <span className="font-mono text-teal-300 font-bold text-sm sm:text-base">
                    {activeFeatureObj.code} — {activeFeatureObj.name}
                  </span>
                  <span className="block text-xs text-slate-300">{activeFeatureObj.description}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-white/5 text-teal-300 font-mono text-xs border border-white/10 font-bold">
                  Rank #{activeFeatureObj.importanceRank} SHAP
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-black/50 border border-emerald-500/30">
                  <span className="text-emerald-400 block text-[10px] font-bold">Normal Range</span>
                  <span className="text-slate-100 font-bold">{activeFeatureObj.normalRange}</span>
                </div>
                <div className="p-2 rounded bg-black/50 border border-rose-500/30">
                  <span className="text-rose-400 block text-[10px] font-bold">Pathological Range</span>
                  <span className="text-slate-100 font-bold">{activeFeatureObj.pathologicalRange}</span>
                </div>
              </div>

              <div className="p-2 rounded bg-white/5 border border-white/10 text-xs text-slate-200">
                <strong className="text-teal-300 font-bold">Clinical Mechanism:</strong> {activeFeatureObj.clinicalSignificance}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
        <span className="text-xs sm:text-sm font-mono text-slate-300">
          Next: Slide 5 – Solution Architecture, 2 Model Families &amp; Hackathon Roadmap
        </span>

        <button
          id="btn-slide4-next"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Roadmap &amp; Architecture</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
