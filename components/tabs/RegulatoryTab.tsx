import React, { useMemo } from 'react';
import { BNGLModel } from '../../types';
import { RegulatoryGraphViewer } from '../RegulatoryGraphViewer';
import { buildRegulatoryGraph } from '../../services/visualization/regulatoryGraphBuilder';

interface RegulatoryTabProps {
  model: BNGLModel | null;
  selectedRuleId?: string | null;
  onSelectRule?: (ruleId: string) => void;
}

const getRuleId = (rule: { name?: string }, index: number): string => rule.name ?? `rule_${index + 1}`;
const getRuleLabel = (rule: { name?: string }, index: number): string => rule.name ?? `Rule ${index + 1}`;

export const RegulatoryTab: React.FC<RegulatoryTabProps> = ({ model, selectedRuleId, onSelectRule }) => {
  const regulatoryGraph = useMemo(() => {
    if (!model) {
      return { nodes: [], edges: [] };
    }
    return buildRegulatoryGraph(model.reactionRules, {
      getRuleId,
      getRuleLabel,
    });
  }, [model]);

  if (!model) {
    return <div className="text-slate-500 dark:text-slate-400">Parse a model to inspect regulatory structure.</div>;
  }

  if (model.reactionRules.length === 0) {
    return <div className="text-slate-500 dark:text-slate-400">This model has no reaction rules to analyse.</div>;
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <section className="h-full flex flex-col">
        <div className="mb-3 shrink-0">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Regulatory Graph</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Visual representation of rule influences (activation/inhibition).</p>
        </div>
        <div className="flex-1 min-h-[500px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden relative">
          {regulatoryGraph.nodes.length > 0 ? (
            <RegulatoryGraphViewer graph={regulatoryGraph} onSelectRule={onSelectRule} />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
              No regulatory graph nodes generated. Check if rules are parsed correctly.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
