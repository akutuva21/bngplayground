import { bnglService } from '../../services/bnglService';
import { MODEL_CATEGORIES, BNG2_EXCLUDED_MODELS } from '../../constants';
import { BNGLModel, SimulationResults, SimulationPhase, SimulationOptions } from '../../types';
import { getSimulationOptionsFromParsedModel } from './simulationOptions';
import { downloadCsv } from './download';

function normalizeFilterNames(names?: string[]) {
    if (!names || names.length === 0) return null;
    const normalized = names
        .map(n => String(n ?? '').trim())
        .filter(Boolean)
        .map(n => n.toLowerCase());
    return normalized.length ? normalized : null;
}

function safeModelName(name: string) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

/**
 * Execute multi-phase simulations sequentially with proper state management.
 * BioNetGen models can have multiple simulate() actions that need to be run
 * in sequence, with concentration/parameter changes applied between phases.
 * 
 * @param model - Parsed BNGL model with potential multiple simulation phases
 * @returns Concatenated simulation results with monotonic time
 */
async function executeMultiPhaseSimulation(model: BNGLModel): Promise<SimulationResults> {
    const phases = model.simulationPhases || [];

    // If single phase or no phases, use standard execution
    if (phases.length <= 1) {
        const options = getSimulationOptionsFromParsedModel(model, 'ode', { solver: 'cvode' });
        return await bnglService.simulate(model, options, { description: 'Single Phase' });
    }

    // Multi-phase execution: run each phase sequentially
    console.log(`Executing ${phases.length} simulation phases sequentially`);

    let cumulativeTime = 0;
    let allData: Record<string, number>[] = [];
    let headers: string[] = [];
    let finalState: number[] | undefined;
    let previousEndTime = 0; // Track absolute end time of previous phase
    let combinedExpandedReactions: any[] | undefined;
    let combinedExpandedSpecies: any[] | undefined;

    for (let i = 0; i < phases.length; i++) {
        const phase = phases[i];
        const phaseNum = i + 1;

        console.log(`Phase ${phaseNum}/${phases.length}: t_end=${phase.t_end}, n_steps=${phase.n_steps}, continue=${phase.continue}`);

        // For continuation phases, BNG2 typically treats t_end as ABSOLUTE time.
        // However, some models (like bistable-toggle-switch) specify 't_end' as a DURATION relative to the start of the phase.
        // HEURISTIC: If phase.t_end > previousEndTime, assume Absolute Time.
        //            If phase.t_end <= previousEndTime, assume Duration.
        const isFirstPhase = i === 0;
        const effectiveDuration = phase.continue && !isFirstPhase
            ? ((phase.t_end || 0) > previousEndTime ? (phase.t_end || 0) - previousEndTime : (phase.t_end || 100))
            : (phase.t_end || 100);

        // Build options for this phase
        const phaseOptions: SimulationOptions = {
            method: (phase.method as any) || 'ode',
            t_end: effectiveDuration,
            n_steps: phase.n_steps || 100,
            solver: 'cvode',
            ...(phase.atol !== undefined ? { atol: phase.atol } : {}),
            ...(phase.rtol !== undefined ? { rtol: phase.rtol } : {}),
        };

        console.log(`[Multi-phase] Phase ${i + 1} simulating for duration=${effectiveDuration} (continue=${phase.continue}, previousEndTime=${previousEndTime})`);

        // Create a modified model with only THIS phase
        // This prevents aggregateOdePhases from combining all phases
        // For continuation phases, adjust t_end to be the effective duration and clear t_start
        const adjustedPhase: SimulationPhase = phase.continue && !isFirstPhase
            ? { ...phase, t_start: 0, t_end: effectiveDuration }
            : phase;

        const singlePhaseModel: BNGLModel = {
            ...model,
            simulationPhases: [adjustedPhase], // Only this phase, with adjusted t_end!
        };

        // If this is a continuation (phase > 1), we need to set initial conditions from previous phase
        if (i > 0 && finalState) {
            // Update species initialConcentration with final state from previous phase
            // This simulates the "continue=>1" behavior
            singlePhaseModel.species = model.species.map((sp, j) => ({
                ...sp,
                initialConcentration: finalState![j] || 0,
            }));
            console.log(`[Multi-phase] Phase ${i + 1} initialized from finalState. First species: ${singlePhaseModel.species[0].name} = ${singlePhaseModel.species[0].initialConcentration}, NFkB_Inactive = ${singlePhaseModel.species.find(s => s.name.includes('NFkB'))?.initialConcentration}`);
        }

        // Apply concentration changes that occur after the previous phase
        const concentrationChanges = (model.concentrationChanges || [])
            .filter(c => c.afterPhaseIndex === i - 1);

        // Map these changes to apply BEFORE phase 0 of the single-phase worker run
        singlePhaseModel.concentrationChanges = concentrationChanges.map(c => ({
            ...c,
            afterPhaseIndex: -1
        }));

        // Apply parameter changes that occur after the previous phase
        const parameterChanges = (model.parameterChanges || [])
            .filter(p => p.afterPhaseIndex === i - 1);

        singlePhaseModel.parameterChanges = parameterChanges.map(p => ({
            ...p,
            afterPhaseIndex: -1
        }));

        // For all other phases, clear changes to prevent double-application or stale resets
        // (Worker will only see the current phase's changes)

        // Helper to normalize a species name for matching (sort components alphabetically)
        const normalizeSpeciesName = (name: string): string => {
            // Support optional compartment prefix: @cell:LPS(MD2,TLR4,CD14)
            const match = name.match(/^(@[A-Za-z0-9_]+:)?(\$?[A-Za-z_][A-Za-z0-9_]*)\(([^)]*)\)$/);
            if (!match) return name.toLowerCase().replace(/\s/g, '');
            const prefix = match[1] ? match[1].toLowerCase() : '';
            const molName = match[2].toLowerCase();
            const components = match[3].split(',').map(s => s.trim().toLowerCase()).sort().join(',');
            return `${prefix}${molName}(${components})`;
        };

        for (const change of concentrationChanges) {
            const changeNormalized = normalizeSpeciesName(change.species);
            console.log(`[Multi-phase] Looking for species: "${change.species}" (normalized: ${changeNormalized}) in ${model.species.length} species`);
            // First try exact match, then normalized match
            let speciesIndex = singlePhaseModel.species.findIndex(sp => sp.name === change.species);
            if (speciesIndex < 0) {
                speciesIndex = singlePhaseModel.species.findIndex(sp => normalizeSpeciesName(sp.name) === changeNormalized);
            }
            if (speciesIndex >= 0) {
                console.log(`[Multi-phase] Found at index: ${speciesIndex} with raw value: ${change.value}`);
                let newValue: number;
                if (typeof change.value === 'number') {
                    newValue = change.value;
                } else {
                    // Evaluate expression string with parameters for initial JS state
                    try {
                        let expr = String(change.value);
                        for (const [paramName, paramValue] of Object.entries(model.parameters)) {
                            expr = expr.replace(new RegExp(`\\b${paramName}\\b`, 'g'), String(paramValue));
                        }
                        newValue = eval(expr);
                    } catch (e) {
                        newValue = NaN;
                    }
                }
                if (!isNaN(newValue)) {
                    singlePhaseModel.species[speciesIndex].initialConcentration = newValue;
                    console.log(`[Multi-phase] Applied setConcentration for initial state: ${change.species} = ${newValue}`);
                }
            }
        }

        // Also update parameters in the singlePhaseModel for the manual setParameter calls
        for (const pChange of parameterChanges) {
            if (typeof pChange.value === 'number') {
                singlePhaseModel.parameters[pChange.parameter] = pChange.value;
            }
        }

        // Run this phase
        const phaseResults = await bnglService.simulate(singlePhaseModel, phaseOptions, {
            description: `Phase ${phaseNum}`
        });

        headers = phaseResults.headers || [];

        // Capture network structure from the first phase (assumed static across phases)
        if (i === 0) {
            combinedExpandedReactions = phaseResults.expandedReactions;
            combinedExpandedSpecies = phaseResults.expandedSpecies;
        }



        console.log(`[Multi-phase] Phase ${i + 1} raw data: ${phaseResults.data.length} rows, first=${phaseResults.data[0]?.time}, second=${phaseResults.data[1]?.time}, last=${phaseResults.data[phaseResults.data.length - 1]?.time}`);
        console.log(`[Multi-phase] Phase ${i + 1} speciesData: ${phaseResults.speciesData?.length ?? 0} rows, first time=${phaseResults.speciesData?.[0]?.time}, last time=${phaseResults.speciesData?.[phaseResults.speciesData.length - 1]?.time}`);

        // Skip adding data from equilibration phases (n_steps=1) and steady_state phases
        // BioNetGen doesn't output these phases in the GDAT file
        // Also skip ONLY the very first phase if it has no concentration/parameter change before it
        // and is followed by a phase with continue=>0 (which indicates a restart)
        const allChangeIndices = [
            ...(model.concentrationChanges?.map(c => c.afterPhaseIndex) ?? []),
            ...(model.parameterChanges?.map(c => c.afterPhaseIndex) ?? [])
        ].filter(idx => idx !== undefined && idx >= -1);

        const hasChangeBeforeFirstPhase = allChangeIndices.some(idx => idx === -1);
        const nextPhaseIsRestart = i < phases.length - 1 && phases[i + 1].continue === false;
        const isInitialEquilibrationPhase = i === 0 && phases.length > 1 && !hasChangeBeforeFirstPhase && nextPhaseIsRestart;

        const shouldIncludeOutput = (phase.n_steps ?? 100) > 1
            && !phase.steady_state
            && !isInitialEquilibrationPhase;

        if (shouldIncludeOutput) {
            // Reset cumulative time for first output phase
            if (allData.length === 0) {
                cumulativeTime = 0;
            }

            // Determine if we should skip the first row (continuation phases)
            // BioNetGen skips the t=0 row of continuation phases to avoid duplicates
            const skipFirstRow = phase.continue && allData.length > 0;
            const startIndex = skipFirstRow ? 1 : 0;

            // Determine time offset:
            // - If continue=>1, use previousEndTime (continuation from last phase)
            // - Else if t_start is provided, use it (absolute time restart)
            // - Else use cumulativeTime (regular sequential phases)
            const timeOffset = phase.continue && !isFirstPhase
                ? previousEndTime
                : (phase.t_start !== undefined ? phase.t_start : cumulativeTime);

            // Add rows to output
            for (let j = startIndex; j < phaseResults.data.length; j++) {
                const row = phaseResults.data[j];
                const adjustedRow = { ...row };
                adjustedRow.time = timeOffset + (row.time || 0);
                allData.push(adjustedRow);
            }
            console.log(`[Multi-phase] Phase ${i + 1} adjusted first row time:`, allData[allData.length - (phaseResults.data.length - startIndex)]?.time);
            console.log(`[Multi-phase] Phase ${i + 1} adjusted last row time:`, allData[allData.length - 1]?.time);
            if (skipFirstRow) {
                console.log(`[Multi-phase] Phase ${i + 1} skipped first row (continue=>1)`);
            }

            // Update cumulative time for next phase
            if (!phase.continue) {
                cumulativeTime += effectiveDuration;
            }
            // Update absolute end time for next phase check (and heuristic)
            // Always accumulate using the effective duration of this phase
            previousEndTime = (phase.continue && !isFirstPhase) ? (previousEndTime + effectiveDuration) : cumulativeTime;
        } else {
            console.log(`[Multi-phase] Phase ${i + 1} skipped (equilibration with n_steps=${phase.n_steps})`);
            // Still track absolute end time for skipped phases
            previousEndTime += effectiveDuration;
        }

        // Save final state for next phase initialization
        // CRITICAL FIX: Use speciesData (which contains actual species concentrations) instead of data (observables)
        // Observables do not map 1:1 to species, leading to corrupted state in multi-phase sims.
        if (phaseResults.speciesData && phaseResults.speciesData.length > 0) {
            const lastRow = phaseResults.speciesData[phaseResults.speciesData.length - 1];
            // Map each species in the model to its final value from the simulation
            // SimulationLoop returns speciesData keys matching the species names
            finalState = model.species.map(sp => lastRow[sp.name] ?? 0);
            console.log(`[Multi-phase] Captured final state. Species count: ${finalState.length}. First: ${finalState[0]}, Last: ${finalState[finalState.length - 1]}`);
        } else if (phaseResults.data.length > 0) {
            // Fallback (unsafe but better than crash) - though strictly speaking this path is what caused the bug
            console.warn('[Multi-phase] speciesData missing! SimulationLoop might not be returning it. Falling back to observables (this is likely wrong).');
            const lastRow = phaseResults.data[phaseResults.data.length - 1];
            finalState = headers.filter(h => h !== 'time').map(h => lastRow[h] || 0);
        }
    }

    console.log(`[Multi-phase] Returning ${allData.length} rows, first time=${allData[0]?.time}, last time=${allData[allData.length - 1]?.time}`);
    return {
        data: allData,
        headers,
        expandedReactions: combinedExpandedReactions,
        expandedSpecies: combinedExpandedSpecies
    };
}

export async function runModels(modelNames?: string[]) {
    const filter = normalizeFilterNames(modelNames);
    const allModels = MODEL_CATEGORIES.flatMap(c => c.models);
    const modelsToProcess = filter
        ? allModels.filter(m => {
            const n = m.name.toLowerCase();
            const safe = safeModelName(m.name);
            const id = m.id ? m.id.toLowerCase() : '';
            return filter.includes(n) || filter.includes(safe) || (id && filter.includes(id));
        })
        : allModels;

    console.group('🚀 Batch Model Runner');
    console.log(`Found ${modelsToProcess.length} models to process.`);
    if (filter) console.log('Model filter:', filter);

    let successCount = 0;
    let failCount = 0;

    for (const modelDef of modelsToProcess) {
        console.group(`Processing: ${modelDef.name}`);
        try {
            // 1. Parse
            console.time('Parse');
            const model: BNGLModel = await bnglService.parse(modelDef.code, { description: `Batch Parse: ${modelDef.name}` });
            console.timeEnd('Parse');

            // 1b. Network Generation (Fix for rule-based models)
            const actions = model.actions || [];
            const needsNetGen = actions.some(a =>
                a.type === 'generate_network' ||
                a.type === 'simulate_ode' ||
                (a.type === 'simulate' && a.args?.method === 'ode')
            );

            if (needsNetGen) {
                console.time('NetGen');
                console.log('Generating network...');
                // Updating model with expanded network
                const expanded = await bnglService.generateNetwork(model, { maxSpecies: 2000, maxReactions: 5000 });
                // Force update just in case Object.assign is flaky with getters/setters (unlikely but possible)
                if (expanded.reactions) model.reactions = expanded.reactions;
                if (expanded.species) model.species = expanded.species;

                console.timeEnd('NetGen');
            }

            // 2. Simulate (with multi-phase support)
            console.time('Simulate');
            // Auto-inject simulate action if none exist (for models that only define network)
            if (model.simulationPhases.length === 0) {
                console.log(`[Batch] Auto-injecting default simulate action for ${model.name}`);
                model.simulationPhases.push({ method: 'ode', t_end: 100, n_steps: 100 });
            }
            const results: SimulationResults = await executeMultiPhaseSimulation(model);
            console.timeEnd('Simulate');

            if (modelDef.id === 'Lang_2024' || modelDef.name.includes('Lang')) {
                console.log(`[Lang_2024 Debug] Model Loaded: ${model.name}`);
                console.log(`[Lang_2024 Debug] Seed Species Count: ${model.species.length}`);
                console.log(`[Lang_2024 Debug] Rules Count: ${model.reactionRules.length}`);
                if (model.reactionRules.length > 0) {
                    console.log(`[Lang_2024 Debug] First 5 rules: ${model.reactionRules.slice(0, 5).map(r => r.name).join(', ')}`);
                }

                if (results.expandedReactions) {
                    console.log(`[Lang_2024 Debug] Total Generated Reactions: ${results.expandedReactions.length}`);

                    // Look for CCNE degradation reactions
                    // Note: In generated reactions, reactants/products are just indices or names if expanded
                    // We need to inspect them carefully.
                    const ccneReactions = results.expandedReactions.filter(r => {
                        return r.reactants.some(s => s.includes('CCNE')) || r.products.some(s => s.includes('CCNE'));
                    });
                    console.log(`[Lang_2024 Debug] Found ${ccneReactions.length} reactions involving CCNE:`);
                    ccneReactions.forEach((r, i) => {
                        console.log(`  CCNE Rxn ${i}: ${r.reactants.join(' + ')} -> ${r.products.join(' + ')} (k=${r.rateConstant}, expr=${r.rateExpression})`);
                    });
                } else {
                    console.log('[Lang_2024 Debug] No expanded reactions found in results.');
                }
            }

            // 4. Export
            const headers = results.headers || [];
            const safeName = safeModelName(modelDef.name);
            downloadCsv(results.data, headers, `results_${safeName}.csv`);

            console.log('✅ Exported CSV');
            successCount++;
        } catch (e: any) {
            console.error('❌ Failed:', e);
            failCount++;
            // If the worker crashed or was terminated, we MUST restart it to continue processing subsequent models
            if (e.message?.includes('terminated') || e.message?.includes('Worker')) {
                console.warn('⚠️ Worker terminated/crashed. Restarting service for next model...');
                bnglService.restart();
            }
        }
        console.groupEnd();

        // Slight delay to allow browser to breathe/download
        await new Promise(r => setTimeout(r, 500));
    }

    console.log(`Batch Run Complete. Success: ${successCount}, Failed: ${failCount}`);
    console.groupEnd();
    return { success: successCount, failed: failCount };
}

export function getModelNames() {
    return MODEL_CATEGORIES.flatMap(c => c.models)
        .filter(m => !BNG2_EXCLUDED_MODELS.has(m.id) && !BNG2_EXCLUDED_MODELS.has(m.name))
        .map(m => m.name);
}

export async function runAllModels() {
    return runModels();
}

// Expose on window for Playwright
if (typeof window !== 'undefined') {
    (window as any).runModels = runModels;
    (window as any).runAllModels = runAllModels;
    (window as any).getModelNames = getModelNames;
}
