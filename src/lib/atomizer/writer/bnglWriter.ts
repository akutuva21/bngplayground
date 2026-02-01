/**
 * BNGL Writer Module
 * Complete TypeScript port of bnglWriter.py
 * 
 * Generates BNGL model files from parsed SBML data
 */

import { Species, Molecule, Component, Rule, Action, Databases } from '../core/structures';
import {
  SBMLModel,
  SBMLReaction,
  SBMLParameter,
  SBMLCompartment,
  SBMLSpecies,
  SBMLFunctionDefinition,
  AtomizerOptions,
} from '../config/types';
import {
  standardizeName,
  convertMathFunction,
  cleanParameterValue,
  logger,
  TranslationException,
} from '../utils/helpers';
import { SCTEntry, SpeciesCompositionTable } from '../config/types';

// =============================================================================
// Math Expression Conversion
// =============================================================================

/**
 * Parse and convert a math expression to BNGL format
 */
/**
 * Parse and convert a math expression to BNGL format
 */
export function bnglFunction(
  rule: string,
  functionTitle: string,
  reactants: string[],
  compartments: string[] = [],
  parameterDict: Map<string, number> = new Map(),
  reactionDict: Map<string, string> = new Map(),
  assignmentRuleVariables: Set<string> = new Set(),
  observableIds: Set<string> = new Set()
): string {
  let result = rule;

  // Replace species IDs (observables)
  for (const obsId of observableIds) {
    const regex = new RegExp(`\\b${obsId}\\b`, 'g');
    result = result.replace(regex, standardizeName(obsId));
  }

  // Convert comparison operators
  result = convertComparisonOperators(result);

  // Convert mathematical functions
  result = convertMathFunctions(result);

  // Handle piecewise functions
  result = convertPiecewise(result);

  // Handle lambda functions
  result = convertLambda(result);

  // Replace compartment references
  for (const comp of compartments) {
    const regex = new RegExp(`\\b${comp}\\b`, 'g');
    result = result.replace(regex, `__compartment_${comp}__`);
  }

  // Replace reaction references
  for (const [rxnId, rxnName] of reactionDict) {
    const regex = new RegExp(`\\b${rxnId}\\b`, 'g');
    result = result.replace(regex, `netflux_${rxnName}`);
  }

  // Handle assignment rule variables (treat as functions)
  for (const variable of assignmentRuleVariables) {
    const regex = new RegExp(`\\b${variable}\\b`, 'g');
    // Ensure we don't double-replace if it already has parens (simple check)
    // Note: This regex might need refinement if nested, but simpler approaches are safer for now
    result = result.replace(regex, `${variable}()`);
  }

  // Clean up infinity and special values
  result = cleanParameterValue(result);

  return result;
}

/**
 * Convert comparison operators (gt, lt, geq, leq, eq, neq)
 */
function convertComparisonOperators(expr: string): string {
  const operators: Record<string, string> = {
    'gt': '>',
    'lt': '<',
    'geq': '>=',
    'leq': '<=',
    'eq': '==',
    'neq': '!=',
    'and': '&&',
    'or': '||',
  };

  let result = expr;
  for (const [func, op] of Object.entries(operators)) {
    // Match func(a, b)
    result = replaceNestedFunc(result, func, (args) => {
      if (args.length === 2) {
        return `(${args[0]} ${op} ${args[1]})`;
      }
      return `${func}(${args.join(',')})`;
    });
  }

  // Handle 'not(a)'
  result = replaceNestedFunc(result, 'not', (args) => {
    if (args.length === 1) {
      return `(!${args[0]})`;
    }
    return `not(${args.join(',')})`;
  });

  return result;
}

/**
 * Helper to replace nested functions correctly
 */
function replaceNestedFunc(expr: string, funcName: string, replacer: (args: string[]) => string): string {
  let result = expr;
  let startIndex = result.indexOf(funcName + '(');
  while (startIndex !== -1) {
    let parenCount = 1;
    let i = startIndex + funcName.length + 1;
    while (parenCount > 0 && i < result.length) {
      if (result[i] === '(') parenCount++;
      else if (result[i] === ')') parenCount--;
      i++;
    }

    if (parenCount === 0) {
      const inner = result.substring(startIndex + funcName.length + 1, i - 1);
      const args = splitArguments(inner);
      const replacement = replacer(args);
      result = result.substring(0, startIndex) + replacement + result.substring(i);
      startIndex = result.indexOf(funcName + '(', startIndex + replacement.length);
    } else {
      break;
    }
  }
  return result;
}

function splitArguments(inner: string): string[] {
  const args: string[] = [];
  let current = '';
  let parenCount = 0;
  for (let i = 0; i < inner.length; i++) {
    const char = inner[i];
    if (char === '(') parenCount++;
    else if (char === ')') parenCount--;

    if (char === ',' && parenCount === 0) {
      args.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  args.push(current.trim());
  return args;
}

/**
 * Convert mathematical functions (pow, sqrt, exp, log, etc.)
 */
function convertMathFunctions(expr: string): string {
  let result = expr;

  // Power function: pow(a, b) -> (a)^(b)
  result = replaceNestedFunc(result, 'pow', (args) => `((${args[0]})^(${args[1]}))`);

  // Square root: sqrt(x) -> (x)^(1/2)
  result = replaceNestedFunc(result, 'sqrt', (args) => `((${args[0]})^(1/2))`);

  // Square: sqr(x) -> (x)^2
  result = replaceNestedFunc(result, 'sqr', (args) => `((${args[0]})^2)`);

  // Exponential: exp(x) -> e^(x)
  result = replaceNestedFunc(result, 'exp', (args) => `(2.71828182845905^(${args[0]}))`);

  // Absolute value: abs(x) -> if(x>=0,x,-x)
  result = replaceNestedFunc(result, 'abs', (args) => `if(${args[0]}>=0,${args[0]},-(${args[0]}))`);

  // Logarithm: log(x) -> ln(x)
  result = result.replace(/\blog\s*\(/g, 'ln(');

  // Log base 10: log10(x) -> (ln(x)/ln(10))
  result = replaceNestedFunc(result, 'log10', (args) => `(ln(${args[0]})/2.302585093)`);

  // Special constants
  result = result.replace(/\bpi\b/g, '3.14159265358979');
  result = result.replace(/\bexponentiale\b/gi, '2.71828182845905');

  return result;
}

/**
 * Convert piecewise functions to nested if statements
 */
function convertPiecewise(expr: string): string {
  return replaceNestedFunc(expr, 'piecewise', (args) => {
    if (args.length === 1) return args[0];
    if (args.length === 2) return `if(${args[1]}, ${args[0]}, 0)`; // Default otherwise to 0
    
    let result = args[args.length - 1]; // Start with the "otherwise" value
    // If odd number of args, the last one is 'otherwise'
    // piecewise(v1, c1, v2, c2, ..., otherwise)
    if (args.length % 2 === 1) {
      for (let i = args.length - 3; i >= 0; i -= 2) {
        result = `if(${args[i+1]}, ${args[i]}, ${result})`;
      }
    } else {
      // piecewise(v1, c1, v2, c2, ...) -> assume 0 for final otherwise
      result = '0';
      for (let i = args.length - 2; i >= 0; i -= 2) {
        result = `if(${args[i+1]}, ${args[i]}, ${result})`;
      }
    }
    return result;
  });
}

/**
 * Convert lambda functions
 */
function convertLambda(expr: string): string {
  // Lambda functions in SBML are typically used in function definitions
  // They need special handling based on context
  return expr;
}

/**
 * Extend a function by substituting parameters
 */
export function extendFunction(
  functionStr: string,
  parameterDict: Map<string, number | string>,
  functionDefinitions: Map<string, SBMLFunctionDefinition>
): string {
  let result = functionStr;

  // Substitute function calls with their definitions
  for (const [funcId, funcDef] of functionDefinitions) {
    const args = funcDef.arguments;
    const body = funcDef.math;

    // Create regex to match function call
    const argPattern = args.map(() => '([^,)]+)').join('\\s*,\\s*');
    const regex = new RegExp(`\\b${funcId}\\s*\\(\\s*${argPattern}\\s*\\)`, 'g');

    result = result.replace(regex, (...matches) => {
      let expandedBody = body;
      for (let i = 0; i < args.length; i++) {
        const argRegex = new RegExp(`\\b${args[i]}\\b`, 'g');
        expandedBody = expandedBody.replace(argRegex, `(${matches[i + 1]})`);
      }
      return `(${expandedBody})`;
    });
  }

  // Substitute parameter values
  for (const [paramId, value] of parameterDict) {
    const regex = new RegExp(`\\b${paramId}\\b`, 'g');
    result = result.replace(regex, String(value));
  }

  return result;
}

/**
 * Clean parameters by removing problematic values
 */
export function curateParameters(
  parameters: Map<string, SBMLParameter>
): Map<string, string> {
  const curated = new Map<string, string>();

  for (const [id, param] of parameters) {
    let value = String(param.value);

    // Handle infinity
    if (/inf/i.test(value)) {
      value = value.replace(/inf/gi, '1e20');
    }

    // Handle NaN
    if (/nan/i.test(value)) {
      logger.warning('BNW001', `Parameter ${id} has NaN value, setting to 0`);
      value = '0';
    }

    // Standardize name
    const name = standardizeName(id);
    curated.set(name, value);
  }

  return curated;
}

// =============================================================================
// BNGL Section Writers
// =============================================================================

/**
 * Generate a BNGL section with proper formatting
 */
function sectionTemplate(
  sectionName: string,
  content: string[],
  annotations: Map<string, string> = new Map()
): string {
  const lines: string[] = [];

  lines.push(`begin ${sectionName}`);

  for (const line of content) {
    if (annotations.has(line)) {
      lines.push(`  ${line}  # ${annotations.get(line)}`);
    } else {
      lines.push(`  ${line}`);
    }
  }

  lines.push(`end ${sectionName}`);
  lines.push('');

  return lines.join('\n');
}

/**
 * Generate parameters section
 */
export function writeParameters(
  parameters: Map<string, SBMLParameter>,
  compartments: Map<string, SBMLCompartment>,
  assignmentRuleVariables: Set<string> = new Set()
): string {
  const lines: string[] = [];

  // Add compartment sizes as parameters
  for (const [id, comp] of compartments) {
    // bnglFunction renames usage to __compartment_${id}__, so we must match that
    const name = standardizeName(id);
    lines.push(`__compartment_${name}__ ${comp.size}`);
  }

  // Add model parameters
  for (const [id, param] of parameters) {
    if (param.scope === 'global') {
      const name = standardizeName(id);

      // Skip parameters that are targets of assignment rules (they become functions)
      if (assignmentRuleVariables.has(name)) {
        continue;
      }

      let value = String(param.value);
      value = cleanParameterValue(value);
      lines.push(`${name} ${value}`);
    }
  }

  return sectionTemplate('parameters', lines);
}

/**
 * Generate compartments section
 */
export function writeCompartments(
  compartments: Map<string, SBMLCompartment>
): string {
  if (compartments.size === 0) {
    return '';
  }

  const lines: string[] = [];

  for (const [id, comp] of compartments) {
    const name = standardizeName(id);
    const dim = comp.spatialDimensions;
    const size = comp.size;

    if (comp.outside) {
      const outside = standardizeName(comp.outside);
      lines.push(`${name} ${dim} ${size} ${outside}`);
    } else {
      lines.push(`${name} ${dim} ${size}`);
    }
  }

  return sectionTemplate('compartments', lines);
}

/**
 * Generate molecule types section
 */
export function writeMoleculeTypes(
  moleculeTypes: Molecule[],
  annotations: Map<string, string> = new Map()
): string {
  const lines: string[] = [];

  for (const mol of moleculeTypes) {
    lines.push(mol.str2());
  }

  // Sort for consistent output
  lines.sort();

  return sectionTemplate('molecule types', lines, annotations);
}

/**
 * Generate seed species section
 */
export function writeSeedSpecies(
  seedSpecies: Array<{ species: Species; concentration: string; compartment: string }>,
  compartments: Map<string, SBMLCompartment>
): string {
  const lines: string[] = [];
  const useCompartments = compartments.size > 1;

  for (const { species, concentration, compartment } of seedSpecies) {
    let speciesStr = species.toString();

    if (useCompartments && compartment) {
      speciesStr += `@${standardizeName(compartment)}`;
    }

    lines.push(`${speciesStr} ${concentration}`);
  }

  return sectionTemplate('seed species', lines);
}

/**
 * Generate observables section
 */
export function writeObservables(
  sbmlSpecies: Map<string, SBMLSpecies>,
  sct: SpeciesCompositionTable,
  assignmentRules: Array<{ variable: string; math: string }> = []
): string {
  const lines: string[] = [];

  for (const [id, sp] of sbmlSpecies) {
    const entry = sct.entries.get(id);
    if (entry && entry.structure) {
      const name = standardizeName(id);
      const pattern = entry.structure.toString();
      lines.push(`Molecules ${name} ${pattern}`);
    }
  }

  // Handle assignment rules mapping back to observables
  for (const rule of assignmentRules) {
    const name = standardizeName(rule.variable);

    // Only map to observables if it's a simple sum (observable-compatible)
    if (/[*/^()]/.test(rule.math)) continue;

    // Find all species identifiers (S1, S2, etc.) in the math expression
    const speciesMatches = rule.math.match(/\bS\d+\b/g);

    if (speciesMatches) {
      const patterns: string[] = [];
      const seenPatterns = new Set<string>();

      for (const spId of speciesMatches) {
        const entry = sct.entries.get(spId);
        const pattern = entry && entry.structure
          ? entry.structure.toString()
          : `${spId}()`;

        if (!seenPatterns.has(pattern)) {
          patterns.push(pattern);
          seenPatterns.add(pattern);
        }
      }

      if (patterns.length > 0) {
        lines.push(`Molecules ${name} ${patterns.join(' ')}`);
      }
    }
  }

  return sectionTemplate('observables', lines);
}

/**
 * Generate functions section
 */
export function writeFunctions(
  functions: Map<string, SBMLFunctionDefinition>,
  assignmentRules: Array<{ variable: string; math: string }> = [],
  parameterDict: Map<string, number | string>
): string {
  if (functions.size === 0 && assignmentRules.length === 0) {
    return '';
  }

  const lines: string[] = [];

  // Write Function Definitions
  for (const [id, func] of functions) {
    const name = standardizeName(id);
    const args = func.arguments.map(a => standardizeName(a)).join(', ');
    let body = func.math;

    body = convertMathFunctions(body);
    body = convertComparisonOperators(body);
    body = convertPiecewise(body);

    lines.push(`${name}(${args}) = ${body}`);
  }

  // Write Assignment Rules as Functions (variable() = math)
  // We skip rules that were already written as observables
  for (const rule of assignmentRules) {
    if (!rule.variable) continue;
    const name = standardizeName(rule.variable);

    // If it's observable-compatible, it was already handled in writeObservables
    // and BioNetGen doesn't allow it to be both.
    if (!/[*/^()]/.test(rule.math) && /\bS\d+\b/.test(rule.math)) continue;

    let body = rule.math;
    body = convertMathFunctions(body);
    body = convertComparisonOperators(body);
    body = convertPiecewise(body);
    lines.push(`${name}() = ${body}`);
  }

  return sectionTemplate('functions', lines);
}

/**
 * Generate reaction rules section (flat translation - no atomization)
 */
export function writeReactionRulesFlat(
  reactions: Map<string, SBMLReaction>,
  sbmlSpecies: Map<string, SBMLSpecies>,
  compartments: Map<string, SBMLCompartment>,
  parameterDict: Map<string, number | string>,
  functionDefinitions: Map<string, SBMLFunctionDefinition>,
  options: AtomizerOptions
): string {
  const lines: string[] = [];
  const useCompartments = compartments.size > 1;

  for (const [rxnId, rxn] of reactions) {
    const reactantStrs: string[] = [];
    const productStrs: string[] = [];

    // Build reactants
    for (const ref of rxn.reactants) {
      if (ref.species === 'EmptySet') continue;
      const sp = sbmlSpecies.get(ref.species);
      const name = options.useId ? standardizeName(ref.species) : standardizeName(sp?.name || ref.species);
      let speciesStr = `${name}()`;

      if (useCompartments && sp?.compartment) {
        speciesStr += `@${standardizeName(sp.compartment)}`;
      }

      for (let i = 0; i < (ref.stoichiometry || 1); i++) {
        reactantStrs.push(speciesStr);
      }
    }

    // Build products
    for (const ref of rxn.products) {
      if (ref.species === 'EmptySet') continue;
      const sp = sbmlSpecies.get(ref.species);
      const name = options.useId ? standardizeName(ref.species) : standardizeName(sp?.name || ref.species);
      let speciesStr = `${name}()`;

      if (useCompartments && sp?.compartment) {
        speciesStr += `@${standardizeName(sp.compartment)}`;
      }

      for (let i = 0; i < (ref.stoichiometry || 1); i++) {
        productStrs.push(speciesStr);
      }
    }

    // Get rate law
    let rate = '0';
    if (rxn.kineticLaw) {
      rate = rxn.kineticLaw.math;

      // Substitute local parameters
      for (const localParam of rxn.kineticLaw.localParameters) {
        const regex = new RegExp(`\\b${localParam.id}\\b`, 'g');
        if (options.replaceLocParams) {
          rate = rate.replace(regex, String(localParam.value));
        } else {
          rate = rate.replace(regex, standardizeName(`${rxnId}_${localParam.id}`));
        }
      }

      // Convert math functions
      rate = bnglFunction(
        rate,
        rxnId,
        rxn.reactants.map(r => r.species),
        Array.from(compartments.keys()),
        new Map(Array.from(parameterDict.entries()).map(([k, v]) => [k, Number(v)])),
        new Map(),
        options.assignmentRuleVariables,
        new Set(sbmlSpecies.keys())
      );
    }

    // Build divisor for absolute rate laws to achieve parity with SBML KineticLaw
    const reactantCounts = new Map<string, number>();
    for (const ref of rxn.reactants) {
      if (ref.species === 'EmptySet') continue;
      reactantCounts.set(ref.species, (reactantCounts.get(ref.species) || 0) + (ref.stoichiometry || 1));
    }
    const divisorParts: string[] = [];
    for (const [spId, totalStoich] of reactantCounts) {
      const name = standardizeName(spId);
      if (totalStoich === 1) {
        divisorParts.push(name);
      } else {
        divisorParts.push(`((${name}^${totalStoich})/${getFactorial(totalStoich)})`);
      }
    }
    const divisor = divisorParts.length > 0 ? divisorParts.join('*') : '1';
    const finalRate = rate === '0' ? '0' : `((${rate})/(${divisor}+1e-60))`;

    const reactants = reactantStrs.length > 0 ? reactantStrs.join(' + ') : '0';
    const products = productStrs.length > 0 ? productStrs.join(' + ') : '0';
    const arrow = rxn.reversible ? '<->' : '->';

    const ruleName = standardizeName(rxn.name || rxnId);
    lines.push(`${ruleName}: ${reactants} ${arrow} ${products} ${finalRate}`);
  }

  return sectionTemplate('reaction rules', lines);
}

/**
 * Generate reaction rules section (with atomization)
 */
export function writeReactionRulesAtomized(
  reactions: Map<string, SBMLReaction>,
  sct: SpeciesCompositionTable,
  translator: Map<string, Species>,
  compartments: Map<string, SBMLCompartment>,
  parameterDict: Map<string, number | string>,
  functionDefinitions: Map<string, SBMLFunctionDefinition>,
  options: AtomizerOptions
): string {
  const lines: string[] = [];
  const useCompartments = compartments.size > 1;

  for (const [rxnId, rxn] of reactions) {
    const reactantStrs: string[] = [];
    const productStrs: string[] = [];

    // Build reactants using translated structures
    for (const ref of rxn.reactants) {
      if (ref.species === 'EmptySet') continue;

      const translated = translator.get(ref.species);
      if (translated) {
        let speciesStr = translated.toString();

        if (useCompartments) {
          const entry = sct.entries.get(ref.species);
          // Add compartment if needed
        }

        for (let i = 0; i < (ref.stoichiometry || 1); i++) {
          reactantStrs.push(speciesStr);
        }
      } else {
        // Fall back to flat species
        const entry = sct.entries.get(ref.species);
        if (entry && entry.structure) {
          for (let i = 0; i < (ref.stoichiometry || 1); i++) {
            reactantStrs.push(entry.structure.toString());
          }
        }
      }
    }

    // Build products using translated structures
    for (const ref of rxn.products) {
      if (ref.species === 'EmptySet') continue;

      const translated = translator.get(ref.species);
      if (translated) {
        let speciesStr = translated.toString();

        for (let i = 0; i < (ref.stoichiometry || 1); i++) {
          productStrs.push(speciesStr);
        }
      } else {
        const entry = sct.entries.get(ref.species);
        if (entry && entry.structure) {
          for (let i = 0; i < (ref.stoichiometry || 1); i++) {
            productStrs.push(entry.structure.toString());
          }
        }
      }
    }

    // Get rate law
    let rate = '0';
    if (rxn.kineticLaw) {
      rate = rxn.kineticLaw.math;

      for (const localParam of rxn.kineticLaw.localParameters) {
        const regex = new RegExp(`\\b${localParam.id}\\b`, 'g');
        if (options.replaceLocParams) {
          rate = rate.replace(regex, String(localParam.value));
        } else {
          rate = rate.replace(regex, standardizeName(`${rxnId}_${localParam.id}`));
        }
      }

      rate = bnglFunction(
        rate,
        rxnId,
        rxn.reactants.map(r => r.species),
        Array.from(compartments.keys()),
        new Map(Array.from(parameterDict.entries()).map(([k, v]) => [k, Number(v)])),
        new Map(),
        options.assignmentRuleVariables,
        new Set(sct.entries.keys())
      );
    }

    // Build divisor for absolute rate laws to achieve parity with SBML KineticLaw
    const reactantCounts = new Map<string, number>();
    for (const ref of rxn.reactants) {
      if (ref.species === 'EmptySet') continue;
      reactantCounts.set(ref.species, (reactantCounts.get(ref.species) || 0) + (ref.stoichiometry || 1));
    }
    const divisorParts: string[] = [];
    for (const [spId, totalStoich] of reactantCounts) {
      const name = standardizeName(spId);
      if (totalStoich === 1) {
        divisorParts.push(name);
      } else {
        divisorParts.push(`((${name}^${totalStoich})/${getFactorial(totalStoich)})`);
      }
    }
    const divisor = divisorParts.length > 0 ? divisorParts.join('*') : '1';
    const finalRate = rate === '0' ? '0' : `((${rate})/(${divisor}+1e-60))`;

    const reactants = reactantStrs.length > 0 ? reactantStrs.join(' + ') : '0';
    const products = productStrs.length > 0 ? productStrs.join(' + ') : '0';
    const arrow = rxn.reversible ? '<->' : '->';

    const ruleName = standardizeName(rxn.name || rxnId);
    lines.push(`${ruleName}: ${reactants} ${arrow} ${products} ${finalRate}`);
  }

  return sectionTemplate('reaction rules', lines);
}

// =============================================================================
// Main BNGL Generation
// =============================================================================

export interface BNGLGenerationResult {
  bngl: string;
  observableMap: Map<string, string>;
  warnings: string[];
}

/**
 * Generate complete BNGL model from SBML model and SCT
 */
export function generateBNGL(
  model: SBMLModel,
  sct: SpeciesCompositionTable,
  moleculeTypes: Molecule[],
  seedSpecies: Array<{ species: Species; concentration: string; compartment: string }>,
  options: AtomizerOptions
): BNGLGenerationResult {
  const warnings: string[] = [];
  const observableMap = new Map<string, string>();

  const sections: string[] = [];

  // Collect assignment rules for processing
  const assignmentRules: Array<{ variable: string; math: string }> = [];
  const assignmentRuleVariables = new Set<string>();

  if (model.rules) {
    for (const rule of model.rules) {
      if (rule.type === 'assignment' && rule.variable) {
        assignmentRules.push({ variable: rule.variable, math: rule.math });
        assignmentRuleVariables.add(standardizeName(rule.variable));
      }
    }
  }

  // Handle Initial Assignments
  if (model.initialAssignments) {
    for (const ia of model.initialAssignments) {
      const name = standardizeName(ia.symbol);
      // Promote non-species initial assignments to functions/rules if they have math
      if (!model.species.has(ia.symbol) && !assignmentRuleVariables.has(name)) {
        assignmentRules.push({ variable: ia.symbol, math: ia.math });
        assignmentRuleVariables.add(name);
      }
    }
  }

  // Add assignment variables to options for lower-level writers to use
  options = { ...options, assignmentRuleVariables };

  // Header comment
  sections.push(`# BNGL model generated from SBML`);
  sections.push(`# Model: ${model.name}`);
  sections.push(`# Species: ${model.species.size}, Reactions: ${model.reactions.size}`);
  sections.push('');
  sections.push('begin model');
  sections.push('');

  // Parameters
  sections.push(writeParameters(model.parameters, model.compartments, assignmentRuleVariables));

  // Compartments (if more than one)
  if (model.compartments.size > 1) {
    sections.push(writeCompartments(model.compartments));
  }

  // Molecule types
  const molTypeAnnotations = new Map<string, string>();
  for (const mol of moleculeTypes) {
    const entry = Array.from(sct.entries.values()).find(
      e => e.isElemental && e.structure.molecules[0]?.name === mol.name
    );
    if (entry) {
      molTypeAnnotations.set(mol.str2(), entry.sbmlId);
    }
  }
  sections.push(writeMoleculeTypes(moleculeTypes, molTypeAnnotations));

  // Seed species
  sections.push(writeSeedSpecies(seedSpecies, model.compartments));

  // Observables
  sections.push(writeObservables(model.species, sct, assignmentRules));

  for (const [id, sp] of model.species) {
    const name = standardizeName(id);
    observableMap.set(id, name);
  }


  // Functions (and Assignment Rules)
  if (model.functionDefinitions.size > 0 || assignmentRules.length > 0) {
    const paramDict = new Map<string, number | string>();
    for (const [id, param] of model.parameters) {
      paramDict.set(id, param.value);
    }

    sections.push(writeFunctions(model.functionDefinitions, assignmentRules, paramDict));
  }

  // Reaction rules
  const paramDict = new Map<string, number | string>();
  for (const [id, param] of model.parameters) {
    paramDict.set(id, param.value);
  }

  if (options.atomize) {
    // Use atomized translation
    const translator = new Map<string, Species>();
    for (const [id, entry] of sct.entries) {
      translator.set(id, entry.structure);
    }
    sections.push(writeReactionRulesAtomized(
      model.reactions,
      sct,
      translator,
      model.compartments,
      paramDict,
      model.functionDefinitions,
      options
    ));
  } else {
    // Flat translation
    sections.push(writeReactionRulesFlat(
      model.reactions,
      model.species,
      model.compartments,
      paramDict,
      model.functionDefinitions,
      options
    ));
  }

  sections.push('end model');
  sections.push('');

  // Add simulation commands
  sections.push('# Simulation commands');
  if (options.actions) {
    let actions = options.actions.trim();

    // Translate species references in actions to standardized BNGL names
    // This handles cases where simulation commands (e.g., setConcentration)
    // refer to original names like "Epi(r)" that were renamed to "S1()".
    const translationMap = new Map<string, string>();
    for (const [id, sp] of model.species) {
      const bnglName = standardizeName(id);
      translationMap.set(id, bnglName);
      if (sp.name && sp.name !== id) {
        translationMap.set(sp.name, bnglName);
      }
    }

    // Sort keys by length descending to prioritize longer matches (e.g., "RTK_P" over "RTK")
    const sortedKeys = Array.from(translationMap.keys()).sort((a, b) => b.length - a.length);

    for (const key of sortedKeys) {
      const bnglName = translationMap.get(key)!;
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Use boundary check only if key ends with a word character
      const endBoundary = /\w$/.test(key) ? '\\b' : '';
      // Allow for optional parens/states only if key doesn't already have them
      const optionalPattern = key.includes('(') ? '' : '(?:\\([^)]*\\))?';
      const regex = new RegExp(`\\b${escaped}${endBoundary}${optionalPattern}`, 'g');
      actions = actions.replace(regex, `${bnglName}()`);
    }

    if (actions.startsWith('begin actions')) {
      sections.push(actions);
    } else {
      sections.push('begin actions');
      sections.push(actions);
      sections.push('end actions');
    }
  } else {
    sections.push('generate_network({overwrite=>1})');
    const tEnd = options.tEnd ?? 10;
    const nSteps = options.nSteps ?? 100;
    sections.push(`simulate({method=>"ode",t_end=>${tEnd},n_steps=>${nSteps}})`);
  }

  const bngl = sections.join('\n');

  return { bngl, observableMap, warnings };
}

/**
 * Print a reaction in BNGL format
 */
export function bnglReaction(
  reactants: Array<[string, number, string]>,
  products: Array<[string, number, string]>,
  rate: string,
  tags: Map<string, string>,
  translator: Map<string, Species> = new Map(),
  isCompartments: boolean = false,
  reversible: boolean = true,
  comment: string = '',
  reactionName?: string
): string {
  let finalString = '';

  // Reactants
  if (reactants.length === 0 || (reactants.length === 1 && reactants[0][1] === 0)) {
    finalString += '0 ';
  } else {
    const reactantStrs: string[] = [];
    for (const [species, stoich, compartment] of reactants) {
      const tag = isCompartments && tags.has(compartment) ? tags.get(compartment)! : '';
      const translated = printTranslate([species, stoich, compartment], tag, translator);
      reactantStrs.push(translated);
    }
    finalString += reactantStrs.join(' + ');
  }

  // Arrow
  finalString += reversible ? ' <-> ' : ' -> ';

  // Products
  if (products.length === 0) {
    finalString += '0 ';
  } else {
    const productStrs: string[] = [];
    for (const [species, stoich, compartment] of products) {
      const tag = isCompartments && tags.has(compartment) ? tags.get(compartment)! : '';
      const translated = printTranslate([species, stoich, compartment], tag, translator);
      productStrs.push(translated);
    }
    finalString += productStrs.join(' + ');
  }

  // Rate
  finalString += ' ' + rate;

  // Comment
  if (comment) {
    finalString += ' ' + comment;
  }

  // Clean up
  finalString = finalString.replace(/(\W|^)0\(\)/g, '0');

  // Add reaction name
  if (reactionName) {
    finalString = `${reactionName}: ${finalString}`;
  }

  return finalString;
}

/**
 * Translate a chemical species for BNGL output
 */
function printTranslate(
  chemical: [string, number, string],
  tags: string,
  translator: Map<string, Species>
): string {
  const [species, stoich, compartment] = chemical;
  const tmp: string[] = [];

  let app: string;
  if (!translator.has(species)) {
    app = `${species}()${tags}`;
  } else {
    const sp = translator.get(species)!;
    sp.addCompartment(tags);
    app = sp.toString();
  }

  const intStoich = Math.floor(stoich);
  if (intStoich === stoich) {
    for (let i = 0; i < intStoich; i++) {
      tmp.push(app);
    }
  } else {
    logger.error('BNW002', `Non-integer stoichiometry: ${stoich} * ${species}`);
    tmp.push(app);
  }

  return tmp.join(' + ');
}

/**
 * Combinatorial factor (factorial) for rate law correction
 */
function getFactorial(n: number): number {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
