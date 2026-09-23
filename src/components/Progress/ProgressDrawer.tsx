import React from 'react';
import { getStoredProgress, UserProgress } from '../../utils/storage';
import { NCERT_EXPERIMENTS } from '../../data/experiments';
import { labAudio } from '../../utils/audio';
import { X, Award, CheckCircle2, Circle, Flame, BookCheck } from 'lucide-react';

interface ProgressDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectActivity: (activityNumber: string) => void;
}

export const ProgressDrawer: React.FC<ProgressDrawerProps> = ({
  isOpen,
  onClose,
  onSelectActivity
}) => {
  if (!isOpen) return null;

  const progress: UserProgress = getStoredProgress();
  const completedCount = progress.completedExperiments.length;
  const balancingCount = progress.completedBalancing.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">
                NCERT Chemistry Lab Mastery
              </h3>
              <p className="text-xs text-slate-400">
                Chapter 1 Progress & Achievements
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              labAudio.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <div className="text-2xl font-bold font-mono text-cyan-400">
              {completedCount} / 11
            </div>
            <div className="text-xs text-slate-400 mt-1">Experiments Completed</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {balancingCount} / 11
            </div>
            <div className="text-xs text-slate-400 mt-1">Equations Balanced</div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <div className="text-2xl font-bold font-mono text-amber-400">
              {Object.keys(progress.quizScores).length}
            </div>
            <div className="text-xs text-slate-400 mt-1">Quizzes Taken</div>
          </div>
        </div>

        {/* NCERT Activities Checklist */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <BookCheck className="w-4 h-4 text-cyan-400" />
            <span>Chapter 1 Activities Track:</span>
          </h4>

          <div className="space-y-2">
            {NCERT_EXPERIMENTS.map(exp => {
              const isDone = progress.completedExperiments.includes(exp.activityNumber);
              const isBalDone = progress.completedBalancing.includes(exp.activityNumber);
              const quizResult = progress.quizScores[exp.activityNumber];

              return (
                <div
                  key={exp.activityNumber}
                  onClick={() => {
                    labAudio.playClick();
                    onSelectActivity(exp.activityNumber);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <div>
                      <span className="font-mono font-bold text-cyan-400 mr-2">
                        {exp.activityNumber}
                      </span>
                      <span className="text-slate-200 font-medium">
                        {exp.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                    {isBalDone && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                        ⚖️ Balanced
                      </span>
                    )}
                    {quizResult && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/30">
                        Quiz: {quizResult.score}/{quizResult.total}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Earned */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Chemistry Badges:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
              progress.completedExperiments.length >= 1
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-50'
            }`}>
              <span className="text-lg">🧪</span>
              <div>
                <strong className="block text-slate-200">First Step</strong>
                Perform 1 experiment
              </div>
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
              balancingCount >= 5
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-50'
            }`}>
              <span className="text-lg">⚖️</span>
              <div>
                <strong className="block text-slate-200">Stoichiometry Scholar</strong>
                Balance 5 equations
              </div>
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
              completedCount === 11
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-50'
            }`}>
              <span className="text-lg">👑</span>
              <div>
                <strong className="block text-slate-200">Master of Reactions</strong>
                Complete all 11 activities
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
