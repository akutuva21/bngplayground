
/**
 * High-Precision Expression Evaluator for BioNetGen
 * 
 * This module addresses the JavaScript floating-point precision limitations
 * that cause divergence in chaotic systems with extreme parameter ratios.
 * 
 * Problem: The Repressilator model uses parameters spanning 38 orders of magnitude:
 *   - Na = 6.022e23 (Avogadro's number)
 *   - V = 1.4e-15 (Cell volume in Liters)
 *   - Expressions like c0/Na/V*tF/pF accumulate precision errors
 * 
 * Solution: Use decimal.js for arbitrary-precision arithmetic during parameter
 * evaluation, then convert back to JavaScript number for ODE solving.
 * 
 * Usage:
 *   import { evaluateExpressionHighPrecision, needsHighPrecision } from './highPrecisionEvaluator';
 *   
 *   if (needsHighPrecision(parameters)) {
 *     const rate = evaluateExpressionHighPrecision(expr, parameters);
 *   }
 */

import Decimal from 'decimal.js';

// Configure decimal.js for maximum precision
// BNG2 uses Perl's default floating-point which is typically 15-17 significant digits
// We use 34 digits to match IEEE 754 quad precision and minimize rounding differences
Decimal.set({
  precision: 34,
  rounding: Decimal.ROUND_HALF_EVEN, // Banker's rounding, matches most scientific software
  toExpNeg: -50,  // Use exponential notation below 1e-50
  toExpPos: 50,   // Use exponential notation above 1e50
});

/**
 * Detect if a parameter set contains values that span extreme ranges
 * and would benefit from high-precision evaluation.
 * 
 * Heuristic: If the ratio of max/min parameter exceeds 1e15, use high precision.
 * This threshold catches Avogadro's number scenarios while avoiding overhead
 * for simple models.
 */
export function needsHighPrecision(parameters: Map<string, number> | Record<string, number>): boolean {
  const values = parameters instanceof Map 
    ? Array.from(parameters.values())
    : Object.values(parameters);
  
  if (values.length === 0) return false;
  
  // Filter out zeros and get absolute values
  const nonZeroAbs = values
    .filter(v => v !== 0 && Number.isFinite(v))
    .map(v => Math.abs(v));
  
  if (nonZeroAbs.length < 2) return false;
  
  const max = Math.max(...nonZeroAbs);
  const min = Math.min(...nonZeroAbs);
  
  // If ratio exceeds 1e15, recommend high precision
  // This catches scenarios like Na (6e23) with V (1e-15)
  return (max / min) > 1e15;
}

/**
 * Tokenize a mathematical expression into operators, numbers, identifiers, and parentheses.
 * This is a simple lexer that handles BNGL-style expressions.
 */
function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  
  while (i < expr.length) {
    const char = expr[i];
    
    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }
    
    // Number (including scientific notation)
    if (/[0-9.]/.test(char)) {
      let num = '';
      // Integer/decimal part
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        num += expr[i++];
      }
      // Scientific notation: e or E followed by optional sign and digits
      if (i < expr.length && /[eE]/.test(expr[i])) {
        num += expr[i++];  // 'e' or 'E'
        if (i < expr.length && /[+-]/.test(expr[i])) {
          num += expr[i++];  // optional sign (critical fix for negative exponents)
        }
        while (i < expr.length && /[0-9]/.test(expr[i])) {
          num += expr[i++];  // exponent digits
        }
      }
      tokens.push(num);
      continue;
    }
    
    // Identifier (parameter name, function name)
    if (/[a-zA-Z_]/.test(char)) {
      let ident = '';
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
        ident += expr[i++];
      }
      tokens.push(ident);
      continue;
    }
    
    // Operators and parentheses
    if ('+-*/^()'.includes(char)) {
      tokens.push(char);
      i++;
      continue;
    }
    
    // Unknown character - skip
    i++;
  }
  
  return tokens;
}

/**
 * Simple recursive descent parser for mathematical expressions.
 * Supports: +, -, *, /, ^ (power), parentheses, function calls (exp, ln, sqrt, etc.)
 * 
 * Grammar:
 *   expr     -> term (('+' | '-') term)*
 *   term     -> power (('*' | '/') power)*
 *   power    -> unary ('^' unary)*
 *   unary    -> '-' unary | primary
 *   primary  -> NUMBER | IDENTIFIER | FUNCTION '(' expr ')' | '(' expr ')'
 */
class HighPrecisionParser {
  private tokens: string[];
  private pos: number = 0;
  private parameters: Map<string, Decimal>;
  
  constructor(tokens: string[], parameters: Map<string, Decimal>) {
    this.tokens = tokens;
    this.parameters = parameters;
  }
  
  private peek(): string | undefined {
    return this.tokens[this.pos];
  }
  
  private consume(): string {
    return this.tokens[this.pos++];
  }
  
  private expect(token: string): void {
    const actual = this.consume();
    if (actual !== token) {
      throw new Error(`Expected '${token}' but got '${actual}'`);
    }
  }
  
  parse(): Decimal {
    const result = this.parseExpr();
    if (this.pos < this.tokens.length) {
      throw new Error(`Unexpected token: ${this.peek()}`);
    }
    return result;
  }
  
  private parseExpr(): Decimal {
    let left = this.parseTerm();
    
    while (this.peek() === '+' || this.peek() === '-') {
      const op = this.consume();
      const right = this.parseTerm();
      if (op === '+') {
        left = left.plus(right);
      } else {
        left = left.minus(right);
      }
    }
    
    return left;
  }
  
  private parseTerm(): Decimal {
    let left = this.parsePower();
    
    while (this.peek() === '*' || this.peek() === '/') {
      const op = this.consume();
      const right = this.parsePower();
      if (op === '*') {
        left = left.times(right);
      } else {
        left = left.dividedBy(right);
      }
    }
    
    return left;
  }
  
  private parsePower(): Decimal {
    let base = this.parseUnary();
    
    // Right-associative: a^b^c = a^(b^c)
    if (this.peek() === '^') {
      this.consume();
      const exponent = this.parsePower();
      return base.pow(exponent);
    }
    
    return base;
  }
  
  private parseUnary(): Decimal {
    if (this.peek() === '-') {
      this.consume();
      return this.parseUnary().negated();
    }
    if (this.peek() === '+') {
      this.consume();
      return this.parseUnary();
    }
    return this.parsePrimary();
  }
  
  private parsePrimary(): Decimal {
    const token = this.peek();
    
    if (!token) {
      throw new Error('Unexpected end of expression');
    }
    
    // Parenthesized expression
    if (token === '(') {
      this.consume();
      const result = this.parseExpr();
      this.expect(')');
      return result;
    }
    
    // Check for function call: identifier followed by '('
    if (/^[a-zA-Z_]/.test(token) && this.tokens[this.pos + 1] === '(') {
      return this.parseFunctionCall();
    }
    
    // Number literal (including scientific notation)
    if (/^[0-9]/.test(token) || (token.startsWith('.') && /^[0-9]/.test(token[1] || ''))) {
      this.consume();
      return new Decimal(token);
    }
    
    // Identifier (parameter name or constant)
    if (/^[a-zA-Z_]/.test(token)) {
      this.consume();
      
      // Built-in constants
      if (token === '_pi' || token === 'pi') {
        return Decimal.acos(-1); // High-precision pi
      }
      if (token === '_e' || token === 'e') {
        return new Decimal(1).exp(); // High-precision e
      }
      
      // Parameter lookup
      if (this.parameters.has(token)) {
        return this.parameters.get(token)!;
      }
      
      throw new Error(`Unknown identifier: ${token}`);
    }
    
    throw new Error(`Unexpected token: ${token}`);
  }
  
  private parseFunctionCall(): Decimal {
    const funcName = this.consume();
    this.expect('(');
    const arg = this.parseExpr();
    this.expect(')');
    
    // BNGL math functions
    switch (funcName.toLowerCase()) {
      case 'exp':
        return arg.exp();
      case 'ln':
      case 'log':
        return arg.ln();
      case 'log10':
        return arg.log(10);
      case 'sqrt':
        return arg.sqrt();
      case 'abs':
        return arg.abs();
      case 'sin':
        return arg.sin();
      case 'cos':
        return arg.cos();
      case 'tan':
        return arg.tan();
      case 'asin':
        return arg.asin();
      case 'acos':
        return arg.acos();
      case 'atan':
        return arg.atan();
      case 'sinh':
        return arg.sinh();
      case 'cosh':
        return arg.cosh();
      case 'tanh':
        return arg.tanh();
      case 'floor':
        return arg.floor();
      case 'ceil':
        return arg.ceil();
      default:
        throw new Error(`Unknown function: ${funcName}`);
    }
  }
}

/**
 * Evaluate a mathematical expression using high-precision arithmetic.
 * 
 * This function takes a BNGL-style expression string and a map of parameter
 * values, evaluates the expression using decimal.js for maximum precision,
 * and returns the result as a JavaScript number.
 * 
 * @param expr - The expression to evaluate (e.g., "c0/Na/V*tF/pF")
 * @param parameters - Map of parameter names to their numeric values
 * @returns The evaluated result as a JavaScript number
 * 
 * @example
 * const params = new Map([
 *   ['Na', 6.022e23],
 *   ['V', 1.4e-15],
 *   ['c0', 1e9],
 *   ['tF', 1e-4],
 *   ['pF', 1000]
 * ]);
 * const rate = evaluateExpressionHighPrecision('c0/Na/V*tF/pF', params);
 * // Returns: 1.1861270574e-7 (matching BNG2's precision)
 */
export function evaluateExpressionHighPrecision(
  expr: string,
  parameters: Map<string, number> | Record<string, number>
): number {
  try {
    // Convert parameters to Decimal objects
    const decimalParams = new Map<string, Decimal>();
    
    if (parameters instanceof Map) {
      for (const [key, value] of parameters) {
        decimalParams.set(key, new Decimal(value));
      }
    } else {
      for (const [key, value] of Object.entries(parameters)) {
        decimalParams.set(key, new Decimal(value));
      }
    }
    
    // Tokenize the expression
    const tokens = tokenize(expr);
    
    if (tokens.length === 0) {
      return NaN;
    }
    
    // Parse and evaluate
    const parser = new HighPrecisionParser(tokens, decimalParams);
    const result = parser.parse();
    
    // Convert back to JavaScript number
    return result.toNumber();
  } catch (e) {
    console.error(`[evaluateExpressionHighPrecision] Failed to evaluate: "${expr}"`, e);
    return NaN;
  }
}

/**
 * Evaluate all parameters in a model using high-precision arithmetic.
 * 
 * BNGL allows parameters to reference other parameters (e.g., k2 = k1 * 2).
 * This function resolves all such dependencies using topological sort and
 * evaluates each parameter expression with high precision.
 * 
 * @param rawParameters - Map of parameter names to their expressions (as strings or numbers)
 * @returns Map of parameter names to their evaluated numeric values
 */
export function evaluateAllParametersHighPrecision(
  rawParameters: Map<string, string | number> | Record<string, string | number>
): Map<string, number> {
  const entries = rawParameters instanceof Map
    ? Array.from(rawParameters.entries())
    : Object.entries(rawParameters);
  
  // First pass: identify which parameters are simple numbers vs expressions
  const numeric = new Map<string, number>();
  const expressions = new Map<string, string>();
  
  for (const [name, value] of entries) {
    if (typeof value === 'number') {
      numeric.set(name, value);
    } else {
      const parsed = parseFloat(value);
      if (!isNaN(parsed) && /^-?[0-9.e+-]+$/i.test(value.trim())) {
        numeric.set(name, parsed);
      } else {
        expressions.set(name, value);
      }
    }
  }
  
  // Iteratively resolve expressions until no more can be resolved
  // This handles dependency chains like: k3 depends on k2, k2 depends on k1
  const resolved = new Map<string, number>(numeric);
  let changed = true;
  let iterations = 0;
  const maxIterations = expressions.size + 1;
  
  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;
    
    for (const [name, expr] of expressions) {
      if (resolved.has(name)) continue;
      
      try {
        const value = evaluateExpressionHighPrecision(expr, resolved);
        if (!isNaN(value)) {
          resolved.set(name, value);
          changed = true;
        }
      } catch {
        // Expression has unresolved dependencies, try again next iteration
      }
    }
  }
  
  // Check for unresolved parameters (circular dependencies or missing refs)
  for (const [name, expr] of expressions) {
    if (!resolved.has(name)) {
      console.warn(`[evaluateAllParametersHighPrecision] Could not resolve: ${name} = ${expr}`);
      resolved.set(name, NaN);
    }
  }
  
  return resolved;
}

/**
 * Compare precision between standard JavaScript evaluation and high-precision evaluation.
 * Useful for debugging and identifying problematic expressions.
 * 
 * @param expr - Expression to evaluate
 * @param parameters - Parameter map
 * @returns Object with both values and their relative difference
 */
export function comparePrecision(
  expr: string,
  parameters: Map<string, number>
): { standard: number; highPrecision: number; relativeError: number } {
  // Standard JavaScript evaluation
  let standardExpr = expr;
  const sortedParams = Array.from(parameters.entries()).sort((a, b) => b[0].length - a[0].length);
  for (const [name, value] of sortedParams) {
    const regex = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    standardExpr = standardExpr.replace(regex, value.toString());
  }
  standardExpr = standardExpr.replace(/\^/g, '**');
  const standard = new Function(`return ${standardExpr}`)() as number;
  
  // High-precision evaluation
  const highPrecision = evaluateExpressionHighPrecision(expr, parameters);
  
  // Relative error
  const denom = Math.max(Math.abs(standard), Math.abs(highPrecision), 1e-300);
  const relativeError = Math.abs(standard - highPrecision) / denom;
  
  return { standard, highPrecision, relativeError };
}

export default {
  needsHighPrecision,
  evaluateExpressionHighPrecision,
  evaluateAllParametersHighPrecision,
  comparePrecision,
};
