import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EquationBalancingTask } from '../../data/experiments';
import { labAudio } from '../../utils/audio';
import { markBalancingComplete } from '../../utils/storage';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, Scale } from 'lucide-react';

interface EquationBalancerProps {
  task: EquationBalancingTask;
  activityNumber: string;
  onBalanced?: () => void;
}

export const EquationBalancer: React.FC<EquationBalancerProps> = ({
  task,
  activityNumber,
  onBalanced
}) => {
  const [reactantCoeffs, setReactantCoeffs] = useState<number[]>(
    task.reactants.map(() => 1)
  );
  const [productCoeffs, setProductCoeffs] = useState<number[]>(
    task.products.map(() => 1)
  );
  const [isBalanced, setIsBalanced] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Reset when task changes
  useEffect(() => {
    setReactantCoeffs(task.reactants.map(() => 1));
    setProductCoeffs(task.products.map(() => 1));
    setIsBalanced(false);
    setShowCelebration(false);
  }, [task]);

  // Calculate live element balance
  const elementStatus: Record<string, { left: number; right: number; matched: boolean }> = {};
  let allBalanced = true;

  Object.entries(task.elementCounts).forEach(([element, multipliers]) => {
    let leftCount = 0;
    multipliers.reactantMultiplier.forEach((m, idx) => {
      leftCount += m * (reactantCoeffs[idx] || 1);
    });

    let rightCount = 0;
    multipliers.productMultiplier.forEach((m, idx) => {
      rightCount += m * (productCoeffs[idx] || 1);
    });

    const matched = leftCount === rightCount;
    if (!matched) allBalanced = false;

    elementStatus[element] = {
      left: leftCount,
      right: rightCount,
      matched
    };
  });

  useEffect(() => {
    if (allBalanced && !isBalanced) {
      setIsBalanced(true);
      setShowCelebration(true);
      labAudio.playSuccessChime();
      markBalancingComplete(activityNumber);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Confetti fallback
      }
      if (onBalanced) onBalanced();
    } else if (!allBalanced && isBalanced) {
      setIsBalanced(false);
      setShowCelebration(false);
    }
  }, [allBalanced, isBalanced, activityNumber, onBalanced]);

  const handleReactantChange = (idx: number, delta: number) => {
    labAudio.playGlassClink();
    setReactantCoeffs(prev => {
      const next = [...prev];
      const val = next[idx] + delta;
      const min = task.reactants[idx].min || 1;
      const max = task.reactants[idx].max || 6;
      next[idx] = Math.max(min, Math.min(max, val));
      return next;
    });
  };

  const handleProductChange = (idx: number, delta: number) => {
    labAudio.playGlassClink();
    setProductCoeffs(prev => {
      const next = [...prev];
      const val = next[idx] + delta;
      const min = task.products[idx].min || 1;
      const max = task.products[idx].max || 6;
      next[idx] = Math.max(min, Math.min(max, val));
      return next;
    });
  };

  const handleReset = () => {
    labAudio.playClick();
    setReactantCoeffs(task.reactants.map(() => 1));
    setProductCoeffs(task.products.map(() => 1));
    setIsBalanced(false);
    setShowCelebration(false);
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 md:p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base md:text-lg">
              Interactive Equation Balancer
            </h3>
            <p className="text-xs text-slate-400">
              Apply Dalton&apos;s Law: Conservation of Atoms
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1.5"
          title="Reset coefficients"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Interactive Chemical Equation with Coefficient Steppers */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 md:p-5 flex flex-wrap items-center justify-center gap-2 md:gap-3 text-sm md:text-base font-mono">
        {/* Reactants */}
        {task.reactants.map((r, idx) => (
          <React.Fragment key={`r-${idx}`}>
            {idx > 0 && <span className="text-slate-500 font-bold px-1">+</span>}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg p-1 shadow-inner">
              <button
                onClick={() => handleReactantChange(idx, -1)}
                disabled={reactantCoeffs[idx] <= (r.min || 1)}
                className="w-7 h-7 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 font-bold transition-colors"
              >
                -
              </button>
              <span className={`w-7 text-center font-bold text-lg ${reactantCoeffs[idx] === r.correctCoefficient ? 'text-cyan-400' : 'text-amber-400'}`}>
                {reactantCoeffs[idx]}
              </span>
              <button
                onClick={() => handleReactantChange(idx, 1)}
                disabled={reactantCoeffs[idx] >= (r.max || 6)}
                className="w-7 h-7 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 font-bold transition-colors"
              >
                +
              </button>
              <span className="px-2 font-semibold text-slate-200">{r.formula}</span>
            </div>
          </React.Fragment>
        ))}

        {/* Reaction Arrow */}
        <span className="text-cyan-400 font-bold text-xl px-2">→</span>

        {/* Products */}
        {task.products.map((p, idx) => (
          <React.Fragment key={`p-${idx}`}>
            {idx > 0 && <span className="text-slate-500 font-bold px-1">+</span>}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg p-1 shadow-inner">
              <button
                onClick={() => handleProductChange(idx, -1)}
                disabled={productCoeffs[idx] <= (p.min || 1)}
                className="w-7 h-7 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 font-bold transition-colors"
              >
                -
              </button>
              <span className={`w-7 text-center font-bold text-lg ${productCoeffs[idx] === p.correctCoefficient ? 'text-cyan-400' : 'text-amber-400'}`}>
                {productCoeffs[idx]}
              </span>
              <button
                onClick={() => handleProductChange(idx, 1)}
                disabled={productCoeffs[idx] >= (p.max || 6)}
                className="w-7 h-7 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 font-bold transition-colors"
              >
                +
              </button>
              <span className="px-2 font-semibold text-slate-200">{p.formula}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Atom Inventory Balance Scale */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {Object.entries(elementStatus).map(([el, status]) => (
          <div
            key={el}
            className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
              status.matched
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/20 border-amber-500/30 text-amber-300'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {status.matched ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400" />
              )}
              <span className="font-bold text-sm font-mono">{el}</span>
            </div>
            <div className="font-mono text-xs font-semibold">
              <span className={status.matched ? 'text-emerald-400' : 'text-amber-400'}>
                {status.left}
              </span>
              <span className="text-slate-500 mx-1">vs</span>
              <span className={status.matched ? 'text-emerald-400' : 'text-amber-400'}>
                {status.right}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Success Notification & Explanation */}
      {isBalanced && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 to-cyan-950/70 border border-emerald-500/50 flex items-start gap-3 animate-fadeIn">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              🎉 Perfectly Balanced Equation!
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {task.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
