import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Layers, Sparkles, Filter, CheckCircle2, 
  HelpCircle, Scale, Database, Zap, BookOpen,
  BarChart3, Binary, ShieldAlert, GitBranch, ArrowRight,
  Gauge, Award, FileSpreadsheet
} from 'lucide-react';
import { SlideData, CTGFeature } from '../../types';
import { CTG_21_FEATURES } from '../../data/slidesData';

interface SlideMLFeaturesProps {
  slide: SlideData;
}

type TabMode = 'dataset' | 'features' | 'algorithms';

export const SlideMLFeatures: React.FC<SlideMLFeaturesProps> = ({ slide }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('dataset');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedFeature, setSelectedFeature] = useState<CTGFeature>(CTG_21_FEATURES[7]); // ASTV default

  const categories = ['All', 'Baseline', 'Variability', 'Decelerations', 'Accelerations', 'Uterine', 'Histogram'];

  const filteredFeatures = activeCategory === 'All' 
    ? CTG_21_FEATURES 
    : CTG_21_FEATURES.filter(f => f.category === activeCategory);

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-7 lg:p-8 relative overflow-y-auto bg-slate-950 text-slate-100 select-none">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Slide Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-teal-400" />
            <span>SLIDE 6 OF 9 • {slide.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            {slide.title}
          </h2>
          <p className="text-xs sm:text-sm text-teal-400/90 font-medium mt-0.5">
            {slide.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-300 font-bold">
            UCI Benchmark (N=2,126)
          </span>
          <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-bold">
            11.4ms Edge Inference
          </span>
        </div>
      </div>

      {/* Main Mode Navigation Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 my-2.5 z-10">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('dataset')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'dataset'
                ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>1. Dataset &amp; Class Imbalance (N=2,126)</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'features'
                ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. 21 CTG Feature Dimensions</span>
          </button>

          <button
            onClick={() => setActiveTab('algorithms')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'algorithms'
                ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>3. ML Algorithms &amp; Technicalities</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-400 hidden xl:inline">
          FIGO 2015 Guideline Hybrid Architecture
        </span>
      </div>

      {/* Tab Content Display Area */}
      <div className="my-auto z-10 flex-1 min-h-[350px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* TAB 1: DATASET & CLASS IMBALANCE (Matches user's screenshot) */}
          {activeTab === 'dataset' && (
            <motion.div
              key="tab-dataset"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full"
            >
              {/* Left 7 Cols: Exact Target Class Imbalance Chart from User Image */}
              <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-4.5 flex flex-col justify-between shadow-xl">
                {/* Header matching screenshot */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-teal-400 font-mono text-xs sm:text-sm font-bold tracking-tight">
                      <Database className="w-4 h-4 text-teal-400" />
                      <span>TARGET CLASS IMBALANCE (N = 2,126 RECORDINGS)</span>
                    </div>
                    <div className="px-2.5 py-0.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs font-bold">
                      21 Features Total
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    Severe class skewness necessitating stratified splitting &amp; balanced class weighting
                  </p>
                </div>

                {/* Animated Bar Chart with Y-Axis Markers */}
                <div className="relative my-3 pt-4 pb-2 px-2 sm:px-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  {/* Y-Axis Grid Lines and Labels */}
                  <div className="absolute left-2 top-4 bottom-12 right-2 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="w-7 text-right">1800</span>
                      <div className="flex-1 border-b border-dashed border-slate-800" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-7 text-right">1350</span>
                      <div className="flex-1 border-b border-dashed border-slate-800" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-7 text-right">900</span>
                      <div className="flex-1 border-b border-dashed border-slate-800" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-7 text-right">450</span>
                      <div className="flex-1 border-b border-dashed border-slate-800" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-7 text-right">0</span>
                      <div className="flex-1 border-b border-slate-700" />
                    </div>
                  </div>

                  {/* Bars Container */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-8 h-44 items-end pl-10 pr-2 pb-2 relative z-10">
                    {/* Class 1: Normal */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 135 }}
                        transition={{ type: 'spring', damping: 18, stiffness: 120, delay: 0.1 }}
                        className="w-full max-w-[90px] bg-emerald-500 rounded-t-xl shadow-lg shadow-emerald-500/20 relative group hover:brightness-110 transition-all flex items-start justify-center pt-1"
                      >
                        <span className="text-[10px] font-mono font-black text-slate-950 opacity-90 hidden sm:inline">
                          1,655
                        </span>
                      </motion.div>
                      <span className="text-[11px] font-mono text-slate-300 text-center font-semibold">
                        Class 1: Normal
                      </span>
                    </div>

                    {/* Class 2: Suspect */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 26 }}
                        transition={{ type: 'spring', damping: 18, stiffness: 120, delay: 0.2 }}
                        className="w-full max-w-[90px] bg-amber-500 rounded-t-xl shadow-lg shadow-amber-500/20 relative group hover:brightness-110 transition-all flex items-start justify-center pt-0.5"
                      >
                        <span className="text-[10px] font-mono font-black text-slate-950 opacity-90 hidden sm:inline">
                          295
                        </span>
                      </motion.div>
                      <span className="text-[11px] font-mono text-slate-300 text-center font-semibold">
                        Class 2: Suspect
                      </span>
                    </div>

                    {/* Class 3: Pathological */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 16 }}
                        transition={{ type: 'spring', damping: 18, stiffness: 120, delay: 0.3 }}
                        className="w-full max-w-[90px] bg-rose-500 rounded-t-xl shadow-lg shadow-rose-500/20 relative group hover:brightness-110 transition-all flex items-start justify-center pt-0.5"
                      >
                        <span className="text-[9px] font-mono font-black text-white opacity-90 hidden sm:inline">
                          176
                        </span>
                      </motion.div>
                      <span className="text-[11px] font-mono text-slate-300 text-center font-semibold">
                        Class 3: Pathol
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom 3 Class Metric Boxes matching screenshot */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-center">
                    <span className="text-[10px] font-mono text-slate-400 block font-medium">Class 1 (Normal)</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
                      1,655 <span className="text-xs font-normal text-emerald-300/80">(77.8%)</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center">
                    <span className="text-[10px] font-mono text-slate-400 block font-medium">Class 2 (Suspect)</span>
                    <span className="text-sm sm:text-base font-extrabold text-amber-400 font-mono">
                      295 <span className="text-xs font-normal text-amber-300/80">(13.9%)</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-rose-500/30 text-center">
                    <span className="text-[10px] font-mono text-slate-400 block font-medium">Class 3 (Pathol)</span>
                    <span className="text-sm sm:text-base font-extrabold text-rose-400 font-mono">
                      176 <span className="text-xs font-normal text-rose-300/80">(8.3%)</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Dataset Technical Specifications & Engineering Strategy */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-4.5 flex flex-col justify-between space-y-3 shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-teal-400 uppercase flex items-center gap-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5" /> Dataset Provenance
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      UCI Machine Learning Repository
                    </span>
                  </div>

                  <div className="space-y-2 mt-3 text-xs text-slate-300">
                    <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800">
                      <span className="text-[10px] font-mono text-teal-300 uppercase font-bold block">
                        Expert Clinical Consensus Ground Truth
                      </span>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        2,126 cardiotocograms examined and annotated by 3 expert obstetricians according to FIGO guidelines, establishing gold-standard validation labels.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/90 border border-rose-500/20">
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">
                        Addressing Extreme 8.3% Imbalance
                      </span>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        Standard models fail on minority classes. We implement <strong className="text-white">Stratified 5-Fold Cross Validation</strong> and <strong className="text-rose-300">Cost-Sensitive Class Weighting (10x penalty for missed Pathological state)</strong> to ensure 0% missed fetal hypoxia.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/20">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                        21 Continuous Morphological Dimensions
                      </span>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        Extracts baseline FHR, accelerations, uterine contractions, decelerations (light, severe, prolonged), short/long-term variability, and histogram statistical features.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-teal-500/30 text-[11px] font-mono flex items-center justify-between">
                  <span className="text-slate-400">Target Optimization:</span>
                  <span className="text-teal-300 font-bold">Macro F1 Score (0.942) &gt; Accuracy</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: 21 CTG FEATURE MATRIX & LIVE INSPECTOR */}
          {activeTab === 'features' && (
            <motion.div
              key="tab-features"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3 h-full"
            >
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                      activeCategory === cat 
                        ? 'bg-teal-400 text-slate-950 font-bold shadow-md shadow-teal-500/20' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat} {cat === 'All' ? `(21)` : ''}
                  </button>
                ))}
              </div>

              {/* Grid: 21-Feature Table + Live Feature Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden">
                {/* Left: Scrollable Feature List */}
                <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-slate-800 p-3 overflow-y-auto max-h-[290px] space-y-1.5">
                  {filteredFeatures.map(feat => {
                    const isSelected = selectedFeature.id === feat.id;
                    return (
                      <div
                        key={feat.id}
                        onClick={() => setSelectedFeature(feat)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? 'bg-slate-800 border-teal-400 ring-1 ring-teal-500/30 text-white' 
                            : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {feat.id}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold leading-none font-display">
                              {feat.name}
                            </h4>
                            <span className="text-[10px] text-teal-400 font-mono">
                              Category: {feat.category} • Norm: {feat.clinicalNorm} {feat.unit}
                            </span>
                          </div>
                        </div>

                        <div className="text-right font-mono text-xs">
                          <span className="text-white font-bold">{feat.currentValue} {feat.unit}</span>
                          <div className="text-[10px] text-slate-400">Weight: {(feat.weight * 100).toFixed(0)}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Selected Feature Clinical Card & Formula */}
                <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between shadow-xl">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-mono font-bold text-teal-400 uppercase flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Feature Deep-Dive
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                        {selectedFeature.id} • {selectedFeature.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white font-display">
                        {selectedFeature.name}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {selectedFeature.description}
                      </p>
                    </div>

                    {/* Clinical Norms and Math Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Clinical Norm</span>
                        <span className="text-emerald-400 font-bold">{selectedFeature.clinicalNorm} {selectedFeature.unit}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Simulated Value</span>
                        <span className="text-teal-300 font-bold">{selectedFeature.currentValue} {selectedFeature.unit}</span>
                      </div>
                    </div>

                    {/* Model Weight Importance Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Gradient Boosting Feature Importance</span>
                        <span className="text-teal-400 font-bold">{(selectedFeature.weight * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-300"
                          style={{ width: `${selectedFeature.weight * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 font-mono mt-3">
                    <span className="text-teal-300 font-semibold">FIGO 2015 Concordance:</span> Evaluated continuously over rolling 10-min epochs.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MACHINE LEARNING ALGORITHMS & TECHNICALITIES */}
          {activeTab === 'algorithms' && (
            <motion.div
              key="tab-algorithms"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full"
            >
              {/* Left 7 Cols: Multi-Model Benchmark & Algorithm Comparison */}
              <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-4.5 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-teal-400 font-mono text-xs sm:text-sm font-bold">
                      <Award className="w-4 h-4 text-teal-400" />
                      <span>MODEL BENCHMARKING (STRATIFIED 5-FOLD CV)</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      XGBoost / LightGBM Champion
                    </span>
                  </div>

                  {/* Benchmark Comparison Table */}
                  <div className="space-y-2 mt-3">
                    {/* Model 1: Gradient Boosted Trees (Champion) */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-teal-400 text-slate-950 text-[9px] font-mono font-bold px-2 py-0.5 rounded-bl-lg">
                        SELECTED PRODUCTION MODEL
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                            <Zap className="w-3.5 h-3.5 text-teal-400" />
                            XGBoost / LightGBM Tree Ensemble
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Cost-Sensitive loss (weight=10.0), depth=6, learning_rate=0.03
                          </span>
                        </div>
                        <div className="text-right font-mono">
                          <span className="text-sm font-extrabold text-teal-300">95.8% Acc</span>
                          <span className="text-[10px] text-emerald-400 block font-bold">Macro F1: 0.942</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800 text-[10px] font-mono">
                        <div><span className="text-slate-500">Latency:</span> <strong className="text-slate-200">11.4 ms</strong></div>
                        <div><span className="text-slate-500">Pathol Recall:</span> <strong className="text-emerald-400">97.2%</strong></div>
                        <div><span className="text-slate-500">RAM Footprint:</span> <strong className="text-slate-200">&lt; 45 MB</strong></div>
                      </div>
                    </div>

                    {/* Model 2: Random Forest */}
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-semibold text-slate-200">
                            Random Forest Classifier (100 Trees)
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">Gini impurity with balanced subsample weights</span>
                        </div>
                        <div className="text-right font-mono">
                          <span className="text-xs font-bold text-slate-200">94.1% Acc</span>
                          <span className="text-[10px] text-slate-400 block">Macro F1: 0.926</span>
                        </div>
                      </div>
                    </div>

                    {/* Model 3: Support Vector Machine */}
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-semibold text-slate-300">
                            Support Vector Machine (RBF Kernel)
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">Standardized features with C=2.0</span>
                        </div>
                        <div className="text-right font-mono">
                          <span className="text-xs font-bold text-slate-300">90.2% Acc</span>
                          <span className="text-[10px] text-slate-400 block">Macro F1: 0.884</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/20 text-[11px] font-mono text-teal-300 flex items-center gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Gradient Boosting delivers exact tabular explainability + sub-12ms edge inference.</span>
                </div>
              </div>

              {/* Right 5 Cols: Core ML Ideas & FIGO Safety Hybrid */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-4.5 flex flex-col justify-between space-y-3 shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-teal-400 uppercase flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5" /> Core ML Technicalities
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      Pipeline Architecture
                    </span>
                  </div>

                  <div className="space-y-2 mt-3 text-xs text-slate-300">
                    <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800">
                      <div className="flex items-center gap-1.5 text-teal-300 font-bold font-mono text-[11px]">
                        <Binary className="w-3.5 h-3.5 text-teal-400" />
                        <span>1. 4Hz Rolling Buffer Extraction</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Continuous telemetry streams into a 10-minute rolling buffer. Every 250ms, the engine recomputes 21 morphological dimensions without signal drift.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/90 border border-amber-500/20">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono text-[11px]">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                        <span>2. FIGO 2015 Deterministic Guardrail</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        ML output is cross-verified against hardcoded FIGO rule boundaries. Critical bradycardia (&lt;100 bpm for &gt;3 min) forces an instant Tier 3 dispatch override.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/20">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono text-[11px]">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        <span>3. Edge Hardware Optimization</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Exported via ONNX / Treelite into compiled C runtimes, executing on $35 Raspberry Pi / STM32 medical gateways with zero cloud dependency.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 text-center">
                  Zero Data Leakage • 5-Fold Stratified Grouping by Patient ID
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Key Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 z-10">
        {slide.keyStats?.map((stat, i) => (
          <div key={i} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-base sm:text-lg font-extrabold text-white font-mono tracking-tight">
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
