export type FunctionComplexity = 'simple' | 'moderate' | 'complex' | 'unsupported';

export interface ReplacementSuggestion {
  original: string;
  suggestion: string;
  reason?: string;
}

export interface FunctionDefinition {
  id: string;
  name: string;
  expression: string;
  complexity: FunctionComplexity;
  nfsimCompatible: boolean;
  issues: string[];
  suggestions: ReplacementSuggestion[];
}

export interface CompatibilityAnalysis {
  totalFunctions: number;
  compatibleFunctions: number;
  incompatibleFunctions: number;
  overallCompatibility: 'full' | 'partial' | 'limited' | 'incompatible';
  functionDefinitions: FunctionDefinition[];
  criticalIssues: string[];
  warnings: string[];
}

export class NFsimFunctionCompatibility {
  analyzeFunctionCompatibility(xmlContent: string): CompatibilityAnalysis {
    const functions = (xmlContent.match(/<Function[^>]*>/g) || []).map((_, idx) => ({
      id: `fn-${idx + 1}`,
      name: `Function_${idx + 1}`,
      expression: '',
      complexity: 'simple' as FunctionComplexity,
      nfsimCompatible: true,
      issues: [],
      suggestions: []
    }));

    return this.buildAnalysis(functions);
  }

  analyzeFunctions(functions: { name: string; expression: string }[]): CompatibilityAnalysis {
    const defs = functions.map((fn, idx) => ({
      id: `fn-${idx + 1}`,
      name: fn.name,
      expression: fn.expression,
      complexity: 'simple' as FunctionComplexity,
      nfsimCompatible: true,
      issues: [],
      suggestions: []
    }));
    return this.buildAnalysis(defs);
  }

  private buildAnalysis(functionDefinitions: FunctionDefinition[]): CompatibilityAnalysis {
    const totalFunctions = functionDefinitions.length;
    const incompatibleFunctions = functionDefinitions.filter((f) => !f.nfsimCompatible).length;
    const compatibleFunctions = totalFunctions - incompatibleFunctions;
    const overallCompatibility = incompatibleFunctions === 0
      ? 'full'
      : compatibleFunctions === 0
        ? 'incompatible'
        : 'partial';

    return {
      totalFunctions,
      compatibleFunctions,
      incompatibleFunctions,
      overallCompatibility,
      functionDefinitions,
      criticalIssues: [],
      warnings: []
    };
  }
}

let checker: NFsimFunctionCompatibility | null = null;

export function getFunctionCompatibilityChecker(): NFsimFunctionCompatibility {
  if (!checker) checker = new NFsimFunctionCompatibility();
  return checker;
}

export function resetFunctionCompatibilityChecker(): void {
  checker = null;
}