
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { SettingsIcon } from './icons/SettingsIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { SimulationOptions } from '../types';

interface SimulationControlsProps {
  onRun: (options: SimulationOptions) => void;
  isSimulating: boolean;
  modelExists: boolean;
  defaultMethod?: 'ode' | 'ssa' | 'default';
  simulationMethod?: 'ode' | 'ssa' | 'default';
  onMethodChange?: (method: 'ode' | 'ssa' | 'default') => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  onRun,
  isSimulating,
  modelExists,
  defaultMethod = 'default',
  simulationMethod: initialMethod,
  onMethodChange
}) => {
  const [showOptions, setShowOptions] = useState(false);
  // Local state if not controlled
  const [localMethod, setLocalMethod] = useState<'default' | 'ode' | 'ssa'>(defaultMethod);

  const method = initialMethod !== undefined ? initialMethod : localMethod;
  const setMethod = (m: 'default' | 'ode' | 'ssa') => {
    setLocalMethod(m);
    onMethodChange?.(m);
  };

  const [solver, setSolver] = useState('auto');
  const [atol, setAtol] = useState('');
  const [rtol, setRtol] = useState('');
  const [tEnd, setTEnd] = useState('100');
  const [nSteps, setNSteps] = useState('100');

  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRun = () => {
    onRun({
      method: method,
      solver: method === 'ode' ? (solver as any) : undefined,
      atol: atol ? parseFloat(atol) : undefined,
      rtol: rtol ? parseFloat(rtol) : undefined,
      t_end: parseFloat(tEnd),
      n_steps: parseFloat(nSteps),
    });
  };

  // Summary text showing current config
  const configSummary = method === 'default'
    ? 'Auto'
    : `${method.toUpperCase()}${method === 'ode' && solver !== 'auto' ? ` • ${solver}` : ''}`;

  return (
    <div className="flex items-center gap-2">
      {/* Primary action button */}
      <Button
        onClick={handleRun}
        disabled={!modelExists || isSimulating}
        variant="primary"
        className="min-w-[100px]"
      >
        {isSimulating ? (
          <>
            <LoadingSpinner className="w-4 h-4 mr-2" />
            Running...
          </>
        ) : (
          <>▶ Run</>
        )}
      </Button>

      {/* Options button with current config summary */}
      <div className="relative" ref={optionsRef}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          title="Configure simulation options"
          className="flex items-center gap-1 px-2 py-1.5 text-xs text-slate-600 
                     hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200
                     hover:bg-slate-100 dark:hover:bg-slate-700 rounded border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all"
        >
          <SettingsIcon className="w-3.5 h-3.5" />
          <span className="font-medium">{configSummary}</span>
          <ChevronDownIcon className={`w-3 h-3 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
        </button>

        {/* Options popover */}
        {showOptions && (
          <div className="absolute bottom-full right-0 mb-1 w-72 p-4 bg-white dark:bg-slate-800 
                          border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Simulation Options
              </h4>
            </div>

            {/* Method selection */}
            <div className="mb-4">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
                Simulation Method
              </label>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-md">
                {['default', 'ode', 'ssa'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMethod(m as typeof method)}
                    className={`flex-1 px-2 py-1.5 text-xs font-medium rounded transition-all ${method === m
                        ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                  >
                    {m === 'default' ? 'Auto' : m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">T End</label>
                <input
                  type="number"
                  value={tEnd}
                  onChange={e => setTEnd(e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">Steps</label>
                <input
                  type="number"
                  value={nSteps}
                  onChange={e => setNSteps(e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                />
              </div>
            </div>

            {/* ODE-specific options */}
            {method === 'ode' && (
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
                    Solver Algorithm
                  </label>
                  <select
                    value={solver}
                    onChange={e => setSolver(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                  >
                    <option value="auto">Auto (recommended)</option>
                    <option value="cvode">CVODE (Stiff)</option>
                    <option value="rosenbrock23">Rosenbrock23 (Stiff)</option>
                    <option value="rk45">RK45 (Non-stiff)</option>
                    <option value="cvode_sparse">CVODE Sparse</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">atol</label>
                    <input
                      type="text"
                      value={atol}
                      onChange={e => setAtol(e.target.value)}
                      placeholder="1e-6"
                      className="w-full px-2 py-1 text-xs border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">rtol</label>
                    <input
                      type="text"
                      value={rtol}
                      onChange={e => setRtol(e.target.value)}
                      placeholder="1e-3"
                      className="w-full px-2 py-1 text-xs border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
