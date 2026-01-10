
import type { SimulationPhase, BNGLModel } from '../../types';

export interface MultiPhaseResult {
    /** Concatenated time points with cumulative offsets */
    timePoints: number[];
    /** Observable values for each time point */
    observables: Record<string, number[]>;
    /** Number of phases executed */
    phaseCount: number;
    /** Per-phase metadata for debugging */
    phaseInfo: Array<{
        t_end: number;
        n_steps: number;
        continue: boolean;
        rowsOutput: number;
        timeOffset: number;
    }>;
}

/**
 * Determines which phases to include in output based on BNG2 semantics.
 * 
 * BNG2 only outputs phases that are part of a continuous chain ending at
 * the last simulate() call. If there's a phase without continue=>1, it
 * starts a new output series.
 */
export function identifyOutputChain(phases: SimulationPhase[]): {
    startIndex: number;
    phases: SimulationPhase[];
} {
    if (phases.length === 0) {
        return { startIndex: 0, phases: [] };
    }

    // Work backwards from the last phase to find where the output chain starts
    let chainStartIdx = phases.length - 1;
    while (chainStartIdx > 0 && phases[chainStartIdx].continue) {
        chainStartIdx--;
    }

    return {
        startIndex: chainStartIdx,
        phases: phases.slice(chainStartIdx)
    };
}

/**
 * Configuration for running multi-phase simulation.
 */
export interface MultiPhaseConfig {
    /** All simulation phases from the model */
    phases: SimulationPhase[];
    /** Function to run a single phase and return results */
    runPhase: (
        phase: SimulationPhase,
        initialState: Float64Array | null,
        timeOffset: number,
        phaseIdx: number
    ) => Promise<{
        timePoints: number[];
        observables: Record<string, number[]>;
        finalState: Float64Array;
    }>;
}

/**
 * Check if a model has multi-phase simulation.
 */
export function isMultiPhaseModel(model: BNGLModel): boolean {
    const phases = model.simulationPhases ?? [];
    const odePhases = phases.filter(p => p.method === 'ode');
    return odePhases.length > 1;
}

/**
 * Get expected row count for multi-phase model.
 * Used for validation and debugging.
 */
export function getExpectedRowCount(phases: SimulationPhase[]): number {
    const { phases: outputPhases } = identifyOutputChain(phases);

    if (outputPhases.length === 0) return 0;

    // First phase: n_steps + 1 (including t=0)
    // Subsequent phases: n_steps (t=0 is skipped as duplicate)
    let totalRows = (outputPhases[0].n_steps ?? 100) + 1;
    for (let i = 1; i < outputPhases.length; i++) {
        totalRows += outputPhases[i].n_steps ?? 100;
    }

    return totalRows;
}
