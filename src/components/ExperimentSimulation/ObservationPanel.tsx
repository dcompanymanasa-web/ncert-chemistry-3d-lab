import React from 'react';
import { NCERTExperiment } from '../../data/experiments';
import { Thermometer, Eye, BookOpen, Layers } from 'lucide-react';

interface ObservationPanelProps {
  experiment: NCERTExperiment;
  reactionProgress: number; // 0.0 to 1.0
  isReacting: boolean;
}

export const ObservationPanel: React.FC<ObservationPanelProps> = ({
  experiment,
  reactionProgress,
  isReacting
}) => {
  // Calculate simulated temperature in Celsius
  const baseTemp = 25; // standard room temperature
  const deltaTemp = experiment.realLabHighlights.temperatureDeltaCelsius;
  const currentTemp = Math.round(baseTemp + deltaTemp * reactionProgress);

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
      {/* Header with Telemetry & Reaction Type Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base md:text-lg">
              Scientific Observations
            </h3>
            <p className="text-xs text-slate-400">
              Verified NCERT Class 10 Data
            </p>
          </div>
        </div>

        {/* Reaction Type Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {experiment.reactionTypes.map((type, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Thermometer & Visual State Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Live Temperature Gauge */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${currentTemp > 45 ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Temperature</div>
              <div className="text-lg font-bold font-mono text-slate-100">
                {currentTemp}°C
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
              deltaTemp > 10 ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-slate-800 text-slate-400'
            }`}>
              {deltaTemp > 10 ? 'Exothermic ΔT+' : deltaTemp < 0 ? 'Endothermic ΔT-' : 'Isothermal'}
            </span>
          </div>
        </div>

        {/* Reaction Status */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Reaction State</div>
              <div className="text-sm font-bold text-slate-200">
                {isReacting ? 'Vigorous Reaction...' : reactionProgress >= 1 ? 'Reaction Complete' : 'Reactants Prepared'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${
              isReacting ? 'bg-amber-400 animate-ping' : reactionProgress >= 1 ? 'bg-emerald-400' : 'bg-slate-500'
            }`} />
          </div>
        </div>
      </div>

      {/* Official Observations list */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Experimental Observations:
        </h4>
        <ul className="space-y-1.5">
          {experiment.observations.map((obs, idx) => (
            <li
              key={idx}
              className="text-xs md:text-sm text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-2 leading-relaxed"
            >
              <span className="text-cyan-400 font-bold mt-0.5">•</span>
              <span>{obs}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chemical Equations Box */}
      <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 font-mono space-y-2">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Chemical Equation:
          </span>
          <span className="text-xs md:text-sm text-slate-200 font-bold break-all">
            {experiment.chemicalEquation}
          </span>
        </div>
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
            Balanced Equation:
          </span>
          <span className="text-xs md:text-sm text-emerald-300 font-bold break-all">
            {experiment.balancedEquation}
          </span>
        </div>
      </div>

      {/* Theoretical Explanation */}
      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5">
        <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-slate-100 font-semibold block mb-0.5">
            NCERT Explanation:
          </strong>
          {experiment.relevantExplanation}
        </div>
      </div>
    </div>
  );
};
