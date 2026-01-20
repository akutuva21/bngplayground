import React, { useMemo } from 'react';
import { BNGLModel } from '../../types';
import { ContactMapViewer } from '../ContactMapViewer';
import { buildContactMap } from '../../services/visualization/contactMapBuilder';

interface ContactMapTabProps {
    model: BNGLModel | null;
    onSelectRule?: (ruleId: string) => void;
}

const getRuleId = (rule: { name?: string }, index: number): string => rule.name ?? `rule_${index + 1}`;
const getRuleLabel = (rule: { name?: string }, index: number): string => rule.name ?? `Rule ${index + 1}`;

export const ContactMapTab: React.FC<ContactMapTabProps> = ({ model, onSelectRule }) => {
    const contactMap = useMemo(() => {
        if (!model) {
            return { nodes: [], edges: [] };
        }
        return buildContactMap(model.reactionRules, model.moleculeTypes, {
            getRuleId,
            getRuleLabel,
        });
    }, [model]);

    if (!model) {
        return <div className="text-slate-500 dark:text-slate-400">Parse a model to view the contact map.</div>;
    }

    return (
        <div className="flex h-full flex-col gap-6">
            <section className="h-full flex flex-col">
                <div className="flex-1 min-h-[500px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden relative">
                    <ContactMapViewer contactMap={contactMap} onSelectRule={onSelectRule} />
                </div>
            </section>
        </div>
    );
};
