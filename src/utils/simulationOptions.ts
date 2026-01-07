import type { BNGLModel, SimulationOptions, SimulationPhase } from '../../types';

const DEFAULT_TIMECOURSE = { t_end: 100, n_steps: 100 };

function pickPhase(model: BNGLModel, method: SimulationOptions['method']): SimulationPhase | undefined {
  const phases = model.simulationPhases ?? [];
  if (phases.length === 0) return undefined;

  if (method === 'ode' || method === 'ssa') {
    const exact = phases.find((p) => p.method === method);
    return exact ?? phases[0];
  }

  // method === 'default': pick the first authored phase (BNG interprets phases in order).
  return phases[0];
}

export function getSimulationOptionsFromParsedModel(
  model: BNGLModel,
  method: SimulationOptions['method'],
  overrides?: Partial<SimulationOptions>
): SimulationOptions {
  const phase = pickPhase(model, method);

  const fallbackFromModelOptions = model.simulationOptions ?? {};
  const t_end =
    overrides?.t_end ??
    phase?.t_end ??
    (typeof fallbackFromModelOptions.t_end === 'number' ? fallbackFromModelOptions.t_end : undefined) ??
    DEFAULT_TIMECOURSE.t_end;

  const n_steps =
    overrides?.n_steps ??
    phase?.n_steps ??
    (typeof fallbackFromModelOptions.n_steps === 'number' ? fallbackFromModelOptions.n_steps : undefined) ??
    DEFAULT_TIMECOURSE.n_steps;

  const atol = overrides?.atol ?? phase?.atol ?? (typeof fallbackFromModelOptions.atol === 'number' ? fallbackFromModelOptions.atol : undefined);
  const rtol = overrides?.rtol ?? phase?.rtol ?? (typeof fallbackFromModelOptions.rtol === 'number' ? fallbackFromModelOptions.rtol : undefined);

  const options: SimulationOptions = {
    method,
    t_end,
    n_steps,
    ...(atol !== undefined ? { atol } : {}),
    ...(rtol !== undefined ? { rtol } : {}),
    ...(overrides?.solver ? { solver: overrides.solver } : {}),
    ...(overrides?.maxSteps ? { maxSteps: overrides.maxSteps } : {}),
    ...(overrides?.steadyState ? { steadyState: overrides.steadyState } : {}),
    ...(overrides?.steadyStateTolerance ? { steadyStateTolerance: overrides.steadyStateTolerance } : {}),
    ...(overrides?.steadyStateWindow ? { steadyStateWindow: overrides.steadyStateWindow } : {}),
  };

  return options;
}
