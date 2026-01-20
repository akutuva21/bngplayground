import React, { useState, useRef, useEffect } from 'react';
import { BNGLModel, SimulationOptions, SimulationResults } from '../types';
import { ResultsChart } from './ResultsChart';
import { ContactMapTab } from './tabs/ContactMapTab';
import { SteadyStateTab } from './tabs/SteadyStateTab';
import { FIMTab } from './tabs/FIMTab';
import { CartoonTab } from './tabs/CartoonTab';
import { RegulatoryTab } from './tabs/RegulatoryTab';
import { RulesTab } from './tabs/RulesTab';
import { VerificationTab } from './tabs/VerificationTab';
import { ParameterScanTab } from './tabs/ParameterScanTab';
import { ParameterEstimationTab } from './tabs/ParameterEstimationTab';
import { FluxAnalysisTab } from './tabs/FluxAnalysisTab';
import { ModelExplorerTab } from './tabs/ModelExplorerTab';
import { TrajectoryExplorerTab } from './tabs/TrajectoryExplorerTab';
import { ExpressionInputPanel, CustomExpression } from './ExpressionInputPanel';
import { ComparisonPanel } from './ComparisonPanel';
import { DynamicsViewer } from './DynamicsViewer';
import { Dropdown, DropdownItem } from './ui/Dropdown';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { EmptyState } from './ui/EmptyState';


interface VisualizationPanelProps {
  model: BNGLModel | null;
  results: SimulationResults | null;
  onSimulate: (options: SimulationOptions) => void;
  isSimulating: boolean;
  onCancelSimulation: () => void;
  activeTabIndex?: number;
  onActiveTabIndexChange?: (idx: number) => void;

}

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap py-2 px-3 border-b-2 font-medium text-sm transition-colors ${active
      ? 'border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400'
      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
      }`}
  >
    {children}
  </button>
);

export const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  model,
  results,
  onSimulate,
  isSimulating,
  onCancelSimulation,
  activeTabIndex,
  onActiveTabIndexChange,

}) => {
  const [visibleSpecies, setVisibleSpecies] = useState<Set<string>>(new Set());
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const [expressions, setExpressions] = useState<CustomExpression[]>([]);

  // Local active tab state if not controlled
  const [localActiveTab, setLocalActiveTab] = useState(0);
  const activeTab = activeTabIndex ?? localActiveTab;
  const setActiveTab = (idx: number) => {
    setLocalActiveTab(idx);
    onActiveTabIndexChange?.(idx);
  };

  const [networkViewMode, setNetworkViewMode] = useState<'regulatory' | 'rules' | 'contact' | 'dynamics'>('regulatory');

  React.useEffect(() => {
    if (model) {
      setVisibleSpecies(new Set(model.observables.map((o) => o.name)));
    } else {
      setVisibleSpecies(new Set());
    }
  }, [model]);

  // Wrapper to sync expression names with visibleSpecies for legend toggle
  const handleExpressionsChange = React.useCallback((newExpressions: CustomExpression[]) => {
    // Find newly added expressions and add them to visibleSpecies
    const newNames = newExpressions.map(e => e.name);
    const oldNames = expressions.map(e => e.name);

    setVisibleSpecies(prev => {
      const updated = new Set(prev);
      // Add new expression names
      newNames.forEach(name => {
        if (!oldNames.includes(name)) {
          updated.add(name);
        }
      });
      // Remove deleted expression names
      oldNames.forEach(name => {
        if (!newNames.includes(name)) {
          updated.delete(name);
        }
      });
      return updated;
    });

    setExpressions(newExpressions);
  }, [expressions]);

  React.useEffect(() => {
    if (!model || model.reactionRules.length === 0) {
      setSelectedRuleId(null);
      return;
    }

    setSelectedRuleId((prev) => {
      if (!prev) {
        return model.reactionRules[0].name ?? 'rule_1';
      }

      const hasRule = model.reactionRules.some((rule, index) => {
        const ruleId = rule.name ?? `rule_${index + 1}`;
        return ruleId === prev;
      });

      return hasRule ? prev : model.reactionRules[0].name ?? 'rule_1';
    });
  }, [model]);

  // Tab definitions:
  // 0: Time Courses
  // 1: Network (Regulatory / Contact / Dynamics)
  // Analysis Group:
  // 2: Parameter Scan
  // 3: Steady State
  // 4: Identifiability (FIM)
  // 5: Parameter Estimation
  // 6: Flux Analysis
  // 7: Verification
  // 8: What-If Compare
  // 9: Rule Cartoons
  // 10: Model Explorer
  // 11: Trajectory Explorer

  // Map activeTab to a group for UI highlighting
  const isAnalysisTab = activeTab >= 2 && activeTab <= 11;

  return (
    <div className="flex h-full min-h-0 flex-col gap-0 border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm relative">
      {/* Header / Tabs */}
      <div className="flex items-center justify-between px-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shrink-0 rounded-t-lg">
        <nav className="flex space-x-1" aria-label="Tabs">
          <TabButton active={activeTab === 0} onClick={() => setActiveTab(0)}>
            📈 Time Courses
          </TabButton>

          <TabButton active={activeTab === 1} onClick={() => setActiveTab(1)}>
            🔗 Network
          </TabButton>


          {/* Analysis Dropdown */}
          <div className="relative flex items-center">
            <Dropdown
              trigger={
                <button className={`flex items-center gap-1 py-2 px-3 border-b-2 font-medium text-sm transition-colors ${isAnalysisTab || activeTab === 10
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
                  }`}>
                  📊 Analysis
                  <ChevronDownIcon className="w-3 h-3" />
                </button>
              }
            >
              <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">Parameter Analysis</div>
              <DropdownItem onClick={() => setActiveTab(2)}>🔍 Parameter Scan</DropdownItem>
              <DropdownItem onClick={() => setActiveTab(3)}>⚖️ Steady State</DropdownItem>
              <DropdownItem onClick={() => setActiveTab(4)}>🎯 Sensitivity (FIM)</DropdownItem>
              <DropdownItem onClick={() => setActiveTab(5)}>🧬 Parameter Estimation</DropdownItem>

              <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
              <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">Model Analysis</div>
              <DropdownItem onClick={() => setActiveTab(11)}>☄️ Trajectory Explorer</DropdownItem>
              <DropdownItem onClick={() => setActiveTab(6)}>🌊 Flux Analysis</DropdownItem>
              <DropdownItem onClick={() => setActiveTab(9)}>🎨 Rule Cartoons</DropdownItem>
              <DropdownItem onClick={() => setActiveTab(8)}>🤔 What-If Compare</DropdownItem>
              <DropdownItem onClick={() => setActiveTab(7)}>✅ Verification</DropdownItem>
              <div className="border-t border-slate-50 dark:border-slate-800/50 my-0.5" />
              <DropdownItem onClick={() => setActiveTab(10)}>🌎 Model Explorer</DropdownItem>
            </Dropdown>
          </div>

        </nav>

        {/* Network View Toggle - only visible on Network tab */}
        {activeTab === 1 && (
          <div className="flex bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-0.5 ml-auto my-1">
            <button
              onClick={() => setNetworkViewMode('regulatory')}
              className={`px-2 py-0.5 text-xs font-medium rounded ${networkViewMode === 'regulatory'
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              Regulatory
            </button>
            <button
              onClick={() => setNetworkViewMode('contact')}
              className={`px-2 py-0.5 text-xs font-medium rounded ${networkViewMode === 'contact'
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              Contact Map
            </button>
            <button
              onClick={() => setNetworkViewMode('dynamics')}
              className={`px-2 py-0.5 text-xs font-medium rounded ${networkViewMode === 'dynamics'
                ? 'bg-slate-100 dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              ⚡ Dynamics
            </button>
            <button
              onClick={() => setNetworkViewMode('rules')}
              className={`px-2 py-0.5 text-xs font-medium rounded ${networkViewMode === 'rules'
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              Rules
            </button>
          </div>
        )}
      </div>


      {/* Content Panels */}
      <div className={`flex-1 min-h-0 overflow-y-auto ${activeTab === 10 ? '' : 'p-4'}`}>
        {activeTab === 0 && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400 shrink-0">
              Time Courses – plot observables vs time
            </div>
            <div className="flex-1 min-h-0">
              <ResultsChart
                results={results}
                model={model}
                visibleSpecies={visibleSpecies}
                onVisibleSpeciesChange={setVisibleSpecies}
                expressions={expressions}
              />
            </div>
            <div className="mt-4 shrink-0">
              <ExpressionInputPanel
                expressions={expressions}
                onExpressionsChange={handleExpressionsChange}
                observableNames={model?.observables?.map((o) => o.name) ?? []}
                hasSpeciesData={!!results?.speciesData && results.speciesData.length > 0}
              />
            </div>
          </div>
        )}

        {activeTab === 1 && networkViewMode === 'regulatory' && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Regulatory Graph – visual representation of rule influences
            </div>
            <RegulatoryTab
              model={model}
              selectedRuleId={selectedRuleId}
              onSelectRule={setSelectedRuleId}
            />
          </div>
        )}

        {activeTab === 1 && networkViewMode === 'contact' && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Contact Map – visualization of molecule interactions
            </div>
            <ContactMapTab model={model} onSelectRule={setSelectedRuleId} />
          </div>
        )}

        {activeTab === 1 && networkViewMode === 'dynamics' && (
          <div className="h-full flex flex-col">
            <div className="mb-3 shrink-0">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Dynamics Graph</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Dynamic causal network from SSA simulation events. Nodes pulse when rules fire.</p>
            </div>
            <div className="min-h-[800px] h-[70vh] relative border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900">
              {results?.ssaInfluence ? (
                <DynamicsViewer influenceData={results.ssaInfluence} />
              ) : (
                <div className="h-full flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 border-dashed">
                  <EmptyState
                    title="Dynamics Visualization Required SSA"
                    description="The Dynamic Influence Network visualizes causal chains between rules. This data is only generated by Stochastic Simulation Algorithm (SSA)."
                    icon={
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    }
                    action={{
                      label: isSimulating ? 'Running...' : 'Run SSA Simulation',
                      onClick: () => onSimulate({
                        method: 'ssa',
                        t_end: 100, // Default sensible values
                        n_steps: 100
                      }),
                      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 1 && networkViewMode === 'rules' && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Rules Inspector - browse rules and their atomic impacts
            </div>
            <RulesTab
              model={model}
              results={results}
              selectedRuleId={selectedRuleId}
              onSelectRule={setSelectedRuleId}
            />
          </div>
        )}

        {activeTab === 2 && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Parameter Scan – explore how observables change with parameter values
            </div>
            <ParameterScanTab model={model} />
          </div>
        )}

        {activeTab === 3 && (
          <div className="h-full flex flex-col">
            <SteadyStateTab
              model={model}
              results={results}
              onSimulate={onSimulate}
              onCancelSimulation={onCancelSimulation}
              isSimulating={isSimulating}
            />
          </div>
        )}

        {activeTab === 4 && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Identifiability (FIM) – parameter sensitivity analysis
            </div>
            <FIMTab model={model} />
          </div>
        )}

        {activeTab === 5 && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Parameter Estimation – fit parameters to experimental data
            </div>
            <ParameterEstimationTab model={model} />
          </div>
        )}

        {activeTab === 6 && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Flux Analysis – visualize reaction flux contributions
            </div>
            <FluxAnalysisTab model={model} results={results} />
          </div>
        )}

        {activeTab === 7 && (
          <div className="h-full flex flex-col">
            <VerificationTab model={model} results={results} />
          </div>
        )}

        {activeTab === 8 && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              What-If Compare – see how parameter changes affect simulation results
            </div>
            <ComparisonPanel model={model} baseResults={results} />
          </div>
        )}

        {activeTab === 9 && (
          <div className="h-full flex flex-col">
            <div className="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Rule Cartoons – compact visualization of rules and their effects
            </div>
            <CartoonTab model={model} selectedRuleId={selectedRuleId} onSelectRule={setSelectedRuleId} />
          </div>
        )}

        {activeTab === 10 && (
          <div className="h-full flex flex-col">
            <ModelExplorerTab onLoadModel={(code, name, id) => {
              console.log("Model Explorer: request to load model", { name, id });
              // TODO: Implement model loading via custom event or prop callback
            }} />
          </div>
        )}

        {activeTab === 11 && (
          <div className="h-full flex flex-col">
            <TrajectoryExplorerTab model={model} />
          </div>
        )}


      </div>
    </div>
  );
};
