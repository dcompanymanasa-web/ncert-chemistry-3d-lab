import React from 'react';
import { NCERTExperiment } from '../../data/experiments';
import { labAudio } from '../../utils/audio';
import { ChevronRight, ChevronLeft, Play, RotateCcw, AlertTriangle, Lightbulb } from 'lucide-react';

interface ProcedureGuideProps {
  experiment: NCERTExperiment;
  currentStep: number;
  totalSteps: number;
  isReacting: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  onReset: () => void;
  onTriggerReaction: () => void;
  onOpenSafety: () => void;
}

export const ProcedureGuide: React.FC<ProcedureGuideProps> = ({
  experiment,
  currentStep,
  totalSteps,
  isReacting,
  onNextStep,
  onPrevStep,
  onReset,
  onTriggerReaction,
  onOpenSafety
}) => {
  const currentSimStep = experiment.simulationSteps[currentStep - 1] || experiment.simulationSteps[0];

  const handleAction = () => {
    labAudio.playClick();
    onTriggerReaction();
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col justify-between">
      {/* Top Bar with Step Progress and Safety Trigger */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              NCERT Lab Procedure
            </span>
          </div>
          <button
            onClick={() => {
              labAudio.playClick();
              onOpenSafety();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Safety First</span>
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Current Step Instruction */}
        <div className="mb-4">
          <h4 className="text-slate-100 font-bold text-base md:text-lg mb-1 leading-snug">
            {currentSimStep.instruction}
          </h4>
          <p className="text-xs md:text-sm text-cyan-300/90 font-medium">
            🎯 {currentSimStep.actionPrompt}
          </p>
        </div>

        {/* Pedagogical Hint */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4 flex items-start gap-2.5 text-xs text-slate-300">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong className="text-slate-200">NCERT Insight:</strong> {currentSimStep.hint}
          </span>
        </div>
      </div>

      {/* Action and Navigation Controls */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              labAudio.playClick();
              onPrevStep();
            }}
            disabled={currentStep <= 1 || isReacting}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors"
            title="Previous Step"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              labAudio.playClick();
              onReset();
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Interactive Action Button */}
        <button
          onClick={handleAction}
          disabled={isReacting}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
            isReacting
              ? 'bg-cyan-600/50 text-cyan-200 cursor-wait'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20'
          }`}
        >
          <Play className={`w-4 h-4 ${isReacting ? 'animate-spin' : ''}`} />
          <span>{isReacting ? 'Reaction in Progress...' : currentSimStep.actionPrompt.split('.')[0]}</span>
        </button>

        <button
          onClick={() => {
            labAudio.playClick();
            onNextStep();
          }}
          disabled={currentStep >= totalSteps || isReacting}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors"
          title="Next Step"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
