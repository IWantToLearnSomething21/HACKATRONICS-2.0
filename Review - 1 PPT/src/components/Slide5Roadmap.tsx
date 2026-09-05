import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Hourglass, 
  Clock, 
  FolderTree, 
  Cpu, 
  ArrowRight,
  Terminal,
  Activity
} from 'lucide-react';
import { MILESTONES, MODEL_FAMILIES_DATA } from '../data/presentationData';

interface Slide5Props {
  onRestart: () => void;
}

export const Slide5Roadmap: React.FC<Slide5Props> = ({ onRestart }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'models' | 'repo'>('roadmap');
  const [selectedMilestone, setSelectedMilestone] = useState<number>(4); // Milestone 4 is NEXT (Milestones 1, 2 & 3 Completed)

  return (
    <div className="relative h-full max-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-7 overflow-hidden rounded-3xl bg-[#080808] border border-white/10 shadow-2xl">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-mono uppercase bg-white/5 text-teal-400 border border-white/10 font-bold">
              Slide 5 of 5 • Solution Roadmap &amp; Architecture
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-mono">Pre-2:00 PM Review Deliverables</span>
          </div>

          {/* Navigation View Switcher */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'bg-teal-500 text-black font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              1. Milestones Table
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'models'
                  ? 'bg-teal-500 text-black font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              2. Two Model Families
            </button>
            <button
              onClick={() => setActiveTab('repo')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'repo'
                  ? 'bg-teal-500 text-black font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              3. Repository &amp; SHAP
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          Solution Roadmap &amp; Modeling Architecture Strategy
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto py-2 min-h-0">
        {/* TAB 1: EXACT MATCH OF USER'S MILESTONE TABLE */}
        {activeTab === 'roadmap' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Table Container */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/40 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-xs font-mono text-teal-400 uppercase tracking-wider">
                      <th className="py-2.5 px-4 sm:px-5 w-[26%]">Milestone</th>
                      <th className="py-2.5 px-4 sm:px-5 w-[16%]">Status</th>
                      <th className="py-2.5 px-4 sm:px-5 w-[58%]">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs sm:text-sm font-sans">
                    {MILESTONES.map((m) => {
                      const isSelected = selectedMilestone === m.id;
                      return (
                        <tr
                          key={m.id}
                          onClick={() => setSelectedMilestone(m.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-teal-500/15 ring-1 ring-teal-500/40' 
                              : 'hover:bg-white/5 bg-transparent'
                          }`}
                        >
                          {/* Milestone Name */}
                          <td className="py-2.5 px-4 sm:px-5 font-bold text-white text-sm sm:text-base font-['Outfit']">
                            {m.name}
                          </td>

                          {/* Status Badge */}
                          <td className="py-2.5 px-4 sm:px-5">
                            {m.status === 'Done' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-green-500/20 text-green-300 border border-green-500/40 font-mono text-xs font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                Done
                              </span>
                            )}
                            {m.status === 'NEXT' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-extrabold animate-pulse">
                                <Hourglass className="w-3.5 h-3.5 text-amber-400" />
                                NEXT
                              </span>
                            )}
                            {m.status === 'Pending' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10 font-mono text-xs font-medium">
                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                Pending
                              </span>
                            )}
                          </td>

                          {/* Description with high-tech code highlights */}
                          <td className="py-2.5 px-4 sm:px-5 text-slate-200">
                            {m.id === 1 && (
                              <span>Workspace, folders, and strategy established.</span>
                            )}
                            {m.id === 2 && (
                              <span>
                                <code className="px-1.5 py-0.5 rounded bg-white/5 text-teal-300 font-mono text-xs border border-white/10">
                                  data/raw/CTG.xls
                                </code>{' '}
                                verified &amp;{' '}
                                <code className="px-1.5 py-0.5 rounded bg-white/5 text-teal-300 font-mono text-xs border border-white/10">
                                  EXPLAINABILITY.md
                                </code>{' '}
                                created.
                              </span>
                            )}
                            {m.id === 3 && (
                              <span>
                                Metadata cleaned, outliers resolved, RobustScaler applied, and stratified zero-leakage splits generated{' '}
                                <code className="px-1.5 py-0.5 rounded bg-white/5 text-teal-300 font-mono text-xs border border-white/10">
                                  (src/preprocessing.py)
                                </code>
                                .
                              </span>
                            )}
                            {m.id === 4 && (
                              <span>
                                Family A (Linear ElasticNet GLM) vs Family B (Gradient-Boosted Trees XGBoost/LightGBM){' '}
                                <code className="px-1.5 py-0.5 rounded bg-white/5 text-amber-300 font-mono text-xs border border-amber-500/30">
                                  (src/models.py)
                                </code>
                                .
                              </span>
                            )}
                            {m.id === 5 && (
                              <span>
                                Macro F1, $3 \times 3$ Confusion Matrix, and SHAP visual plots.
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Milestone Deep-Dive Box */}
            {selectedMilestone && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <div>
                  <span className="font-mono text-teal-400 font-bold uppercase tracking-wider block">
                    Milestone {selectedMilestone} Deep Dive &amp; Deliverable:
                  </span>
                  <p className="text-slate-200 mt-0.5 max-w-2xl">
                    {MILESTONES[selectedMilestone - 1]?.details}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 font-mono text-teal-300 text-xs font-bold">
                  Artifact: {MILESTONES[selectedMilestone - 1]?.deliverable}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TWO DISTINCT MODEL FAMILIES BENCHMARK */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in duration-200">
            {MODEL_FAMILIES_DATA.map((fam, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 p-4 sm:p-5 shadow-xl bg-white/5 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/5 text-teal-400 border border-white/10">
                      {fam.tag}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-slate-300 font-semibold">
                      Target Macro F1: <span className="text-white font-bold">{fam.expectedMacroF1}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-white font-['Outfit']">
                    {fam.family}
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {fam.models.map((m, mIdx) => (
                      <span key={mIdx} className="px-2 py-0.5 rounded bg-black/40 text-slate-200 font-mono text-xs border border-white/5 font-semibold">
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5 text-xs sm:text-sm">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase font-bold">Primary Role:</span>
                    <p className="text-slate-200">{fam.purpose}</p>
                  </div>

                  <div className="space-y-1 pt-0.5">
                    <span className="text-xs font-mono text-slate-300 uppercase font-semibold block">
                      Architectural Advantages:
                    </span>
                    {fam.strengths.map((str, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-400" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-mono">
                  <span className="text-slate-400">Interpretability:</span>
                  <span className="text-teal-300 font-bold">
                    {fam.interpretabilityMechanism}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: REPOSITORY ARCHITECTURE & SHAP EXPLAINABILITY */}
        {activeTab === 'repo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-in fade-in duration-200">
            {/* Repo Tree */}
            <div className="lg:col-span-6 bg-black/40 rounded-2xl border border-white/10 p-3.5 sm:p-4 shadow-xl font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
                <span className="text-teal-400 font-bold flex items-center gap-1.5 uppercase">
                  <Terminal className="w-4 h-4 text-teal-400" />
                  Repository Hierarchy (Zero-Leakage Layout)
                </span>
                <span className="text-xs text-slate-400">git clean</span>
              </div>

              <div className="space-y-1 text-slate-200 pl-2">
                <div className="text-teal-300 font-bold">.</div>
                <div className="pl-4">├── <span className="text-white font-semibold">README.md</span> <span className="text-slate-500"># Strategy doc</span></div>
                <div className="pl-4">├── <span className="text-white font-semibold">requirements.txt</span> <span className="text-slate-500"># Manifest</span></div>
                <div className="pl-4">├── <span className="text-amber-300 font-bold">data/</span> <span className="text-slate-500"># CTG datasets</span></div>
                <div className="pl-8">├── raw/CTG.xls</div>
                <div className="pl-8">└── processed/ [train/test.parquet]</div>
                <div className="pl-4">├── <span className="text-teal-300 font-bold">src/</span> <span className="text-slate-500"># Production ML code</span></div>
                <div className="pl-8">├── ingestion.py</div>
                <div className="pl-8">├── preprocessing.py</div>
                <div className="pl-8">├── models.py</div>
                <div className="pl-8">└── evaluation.py</div>
                <div className="pl-4">├── <span className="text-purple-300 font-bold">visualizations/</span> <span className="text-slate-500"># SHAP plots</span></div>
                <div className="pl-4">└── <span className="text-slate-300 font-bold">models/</span> <span className="text-slate-500"># Serialized artifacts</span></div>
              </div>
            </div>

            {/* SHAP Explainability Framework */}
            <div className="lg:col-span-6 bg-white/5 rounded-2xl border border-white/10 p-3.5 sm:p-4 shadow-xl space-y-2.5">
              <div className="flex items-center gap-2 text-teal-400 font-mono font-bold text-xs sm:text-sm uppercase">
                <Activity className="w-4 h-4 text-teal-400" />
                Explainability &amp; Clinical Trust (SHAP)
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Black-box predictions are unacceptable in healthcare. We implement full 
                <strong> TreeSHAP &amp; Multi-Class Decision Plots</strong> to explain why each case is categorized.
              </p>

              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                  <span className="font-bold text-teal-300 block mb-0.5">1. Global Feature Attribution:</span>
                  <span className="text-slate-200">
                    Quantifies overall reliance on ASTV, ALTV, Prolonged Decelerations &amp; Baseline mean across the cohort.
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                  <span className="font-bold text-purple-300 block mb-0.5">2. Local Instance Waterfall Explanations:</span>
                  <span className="text-slate-200">
                    For every laboring patient, computes exact + / - contribution of each signal shift towards Pathological classification.
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                  <span className="font-bold text-green-300 block mb-0.5">3. FIGO Guidelines Alignment:</span>
                  <span className="text-slate-200">
                    Validates that learned boundaries mirror FIGO/ACOG obstetrical standards for physiological safety.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-300">
          <span className="px-2.5 py-1 rounded bg-white/5 text-teal-400 border border-white/10 font-bold">
            Team Cube X
          </span>
          <span>Ready for First Review Evaluation</span>
        </div>

        <button
          id="btn-restart-presentation"
          onClick={onRestart}
          className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Return to Intro (Slide 1)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
