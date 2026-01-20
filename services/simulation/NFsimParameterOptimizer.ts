import type { NFsimExecutionOptions } from './NFsimExecutionWrapper';

export interface OptimizationSuggestion {
  parameter: string;
  recommendedValue: number;
  reason?: string;
}

export class NFsimParameterOptimizer {
  optimize(options: NFsimExecutionOptions): OptimizationSuggestion[] {
    const suggestions: OptimizationSuggestion[] = [];
    if (options.n_steps && options.n_steps > 5000) {
      suggestions.push({
        parameter: 'n_steps',
        recommendedValue: Math.min(1000, options.n_steps),
        reason: 'Reduce step count for faster execution.'
      });
    }
    return suggestions;
  }
}