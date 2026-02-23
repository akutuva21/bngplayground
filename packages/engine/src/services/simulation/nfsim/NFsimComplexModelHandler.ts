export interface ComplexModelAnalysis {
  hasPolymerization: boolean;
  hasAggregation: boolean;
  hasCooperativeBinding: boolean;
  requiredParameters: {
    minUTL: number;
    minGML: number;
  };
}

export class NFsimComplexModelHandler {
  analyzeComplexModel(xml: string): ComplexModelAnalysis {
    const lower = xml.toLowerCase();
    const hasPolymerization = lower.includes('polymer');
    const hasAggregation = lower.includes('aggregate');
    const hasCooperativeBinding = lower.includes('cooperative');
    return {
      hasPolymerization,
      hasAggregation,
      hasCooperativeBinding,
      requiredParameters: {
        minUTL: 10,
        minGML: 1000
      }
    };
  }
}

let handler: NFsimComplexModelHandler | null = null;

export function getComplexModelHandler(): NFsimComplexModelHandler {
  if (!handler) handler = new NFsimComplexModelHandler();
  return handler;
}

export function resetComplexModelHandler(): void {
  handler = null;
}
