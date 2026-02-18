/**
 * ANTLR4-based BNGL Parser Wrapper
 * 
 * Parses BNGL files using the ANTLR4 grammar and converts to ParsedBNGL type.
 * Provides BNG2.pl-compatible parsing for maximum parity.
 */
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BNGLexer } from './generated/BNGLexer.ts';
import { BNGParser } from './generated/BNGParser.ts';
import { BNGLVisitor } from './BNGLVisitor.ts';
import type { BNGLModel } from '../../types';

export interface ParseError {
  line: number;
  column: number;
  message: string;
}

export interface ParseResult {
  success: boolean;
  model?: BNGLModel;
  errors: ParseError[];
}

/**
 * Parse a BNGL file using ANTLR4 grammar
 */
export function parseBNGLWithANTLR(input: string): ParseResult {
  const errors: ParseError[] = [];

  try {
    // Create lexer and parser
    // Some published BNGL files can start with a UTF-8 BOM (U+FEFF). BNG2.pl
    // accepts this; our lexer should too.
    let sanitizedInput = input.replace(/^\uFEFF/, '');

    // Normalize legacy 'begin molecules' / 'end molecules' blocks to
    // the preferred 'begin molecule types' / 'end molecule types' form.
    // We do this as a pre-parse normalization to preserve repository files
    // but remain compatible with BNG2.pl. We skip lines that are comments.
    function normalizeLegacyBlocks(src: string): { normalized: string; warned: boolean } {
      const lines = src.split(/\r\n|\n/);
      let warned = false;
      const out = lines.map(line => {
        const trimmedStart = line.replace(/^\s*/, '');
        // Skip commented lines
        if (/^#/.test(trimmedStart)) return line;
        if (/^\s*begin\s+molecules\b/i.test(line)) {
          warned = true;
          return line.replace(/begin\s+molecules\b/i, 'begin molecule types');
        }
        if (/^\s*end\s+molecules\b/i.test(line)) {
          warned = true;
          return line.replace(/end\s+molecules\b/i, 'end molecule types');
        }
        return line;
      });
      return { normalized: out.join('\n'), warned };
    }

    function normalizeLegacySyntax(src: string): { normalized: string; warnings: string[] } {
      const warnings: string[] = [];
      let next = src;

      // Best-effort normalization for local function context syntax (e.g., %x::A()).
      // The current grammar/runtime does not fully support local-function scoping.
      // Fallback strategy:
      //   %x::Pattern      -> Pattern
      //   f(x) = expr(x)   -> f = expr
      //   f(x) in rates    -> f
      const localContextMatches = Array.from(next.matchAll(/%([A-Za-z_][A-Za-z0-9_]*)::/g));
      if (localContextMatches.length > 0) {
        const localVars = Array.from(new Set(localContextMatches.map((m) => m[1])));

        next = next.replace(/%[A-Za-z_][A-Za-z0-9_]*::/g, '');

        for (const localVar of localVars) {
          const escapedVar = localVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

          const fnDefWithArg = new RegExp(`\\b([A-Za-z_][A-Za-z0-9_]*)\\s*\\(\\s*${escapedVar}\\s*\\)\\s*=`, 'g');
          next = next.replace(fnDefWithArg, (_m, fnName) => `${fnName} =`);

          const callWithLocalArg = new RegExp(`\\b([A-Za-z_][A-Za-z0-9_]*)\\s*\\(\\s*${escapedVar}\\s*\\)`, 'g');
          next = next.replace(callWithLocalArg, (_m, symbolName) => symbolName);
        }

        warnings.push('Normalized unsupported local-function context syntax (%x::) to global-function fallback.');
      }

      // Normalize legacy compartment-before-parentheses molecule syntax used in
      // some cBNGL models: Mol@Comp(...) -> Mol(...)@Comp.
      // This keeps semantics while matching the ANTLR grammar's expected order.
      const legacyCompBeforeParen = next.replace(
        /\b([A-Za-z_][A-Za-z0-9_]*)@([A-Za-z_][A-Za-z0-9_]*)\(([^(){}]*)\)/g,
        (_m, mol, comp, args) => `${mol}(${String(args ?? '')})@${comp}`
      );
      if (legacyCompBeforeParen !== next) {
        warnings.push('Normalized legacy compartment-before-parentheses syntax (Mol@Comp(...) -> Mol(...)@Comp).');
        next = legacyCompBeforeParen;
      }

      // Normalize explicit line continuations used in legacy reaction rules by
      // folding continued lines into a single logical rule line.
      const joined = next.replace(/\\\s*\r?\n\s*/g, ' ');
      if (joined !== next) {
        warnings.push('Joined legacy line continuations (\\) for parser compatibility.');
        next = joined;
      }

      // Legacy state-inheritance labels in component patterns use "%" (e.g., c1%1).
      // The core parser/runtime does not model this syntax directly. Map to wildcard
      // state (c1~?) so rules remain applicable without introducing invalid states
      // like ~1/~2 for molecules that only define ~0/~1.
      // Keep molecule labels like ")%1" unchanged by anchoring to component starts.
      const percentInheritanceNormalized = next.replace(/([,(]\s*[A-Za-z_][A-Za-z0-9_]*)%([A-Za-z0-9_+-]+)/g, '$1~?');
      if (percentInheritanceNormalized !== next) {
        warnings.push('Normalized legacy component inheritance "%" labels to wildcard state "~?".');
        next = percentInheritanceNormalized;
      }

      // Fold standalone include/exclude_* modifier-only lines onto the previous
      // non-empty rule line instead of dropping them (semantics-preserving).
      const modifierTokenPattern = /(?:include|exclude)_(?:reactants|products)\([^)]*\)/g;
      const modifierOnlyLinePattern = /^\s*(?:(?:include|exclude)_(?:reactants|products)\([^)]*\)\s*)+$/i;
      const foldedLines = next.split(/\r\n|\n/);
      let foldedStandaloneModifierLines = false;
      for (let i = 0; i < foldedLines.length; i++) {
        const line = foldedLines[i];
        if (!modifierOnlyLinePattern.test(line)) continue;

        let prev = i - 1;
        while (prev >= 0 && foldedLines[prev].trim() === '') prev--;
        if (prev >= 0 && !/^\s*#/.test(foldedLines[prev])) {
          foldedLines[prev] = `${foldedLines[prev].replace(/\s+$/,'')} ${line.trim()}`;
          foldedLines[i] = '';
          foldedStandaloneModifierLines = true;
        }
      }
      if (foldedStandaloneModifierLines) {
        warnings.push('Folded standalone legacy include/exclude_* modifier lines onto preceding rules.');
      }
      next = foldedLines.join('\n');

      // Additional unsupported constructs are handled by worker-level best-effort
      // parsing when recoverable.

      // Some published legacy files place version()/setOption() before begin model.
      // Our grammar only parses model blocks and actions, so preserve line count by
      // replacing those directive lines with comments.
      const lines = next.split(/\r\n|\n/);
      let seenBeginModel = false;
      let rewroteTopLevelDirectives = false;
      const rewritten = lines.map(line => {
        const trimmed = line.trim();
        if (/^begin\s+model\b/i.test(trimmed)) {
          seenBeginModel = true;
          return line;
        }
        if (/^setOption\s*\(/i.test(trimmed)) {
          rewroteTopLevelDirectives = true;
          return `# [parser-normalized] ${trimmed}`;
        }
        if (!seenBeginModel) {
          if (/^version\s*\(/i.test(trimmed) || /^setOption\s*\(/i.test(trimmed)) {
            rewroteTopLevelDirectives = true;
            return `# [parser-normalized] ${trimmed}`;
          }
        }
        return line;
      });
      if (rewroteTopLevelDirectives) {
        warnings.push('Commented top-level legacy directives before begin model (version/setOption).');
      }

      return { normalized: rewritten.join('\n'), warnings };
    }

    const { normalized: legacyBlockNormalized, warned } = normalizeLegacyBlocks(sanitizedInput);
    sanitizedInput = legacyBlockNormalized;
    if (warned) {
      console.warn('[BNGL parser] Rewrote legacy "begin molecules"/"end molecules" to "begin molecule types" for parsing. Consider updating the model file.');
    }

    const { normalized: legacySyntaxNormalized, warnings: legacyWarnings } = normalizeLegacySyntax(sanitizedInput);
    sanitizedInput = legacySyntaxNormalized;
    for (const warning of legacyWarnings) {
      console.warn(`[BNGL parser] ${warning}`);
    }

    const inputStream = CharStreams.fromString(sanitizedInput);
    const lexer = new BNGLexer(inputStream);

    // Collect lexer errors
    lexer.removeErrorListeners();
    lexer.addErrorListener({
      syntaxError: (_recognizer, _offendingSymbol, line, charPositionInLine, msg) => {
        errors.push({ line, column: charPositionInLine, message: msg });
      }
    });

    const tokenStream = new CommonTokenStream(lexer);
    const parser = new BNGParser(tokenStream);

    // Collect parser errors
    parser.removeErrorListeners();
    parser.addErrorListener({
      syntaxError: (_recognizer, _offendingSymbol, line, charPositionInLine, msg) => {
        errors.push({ line, column: charPositionInLine, message: msg });
      }
    });

    // Parse the input
    // Parse the input
    const tree = parser.prog();

    // Visit the parse tree and build BNGLModel even if there are errors (best effort)
    let model: BNGLModel | undefined;
    try {
      const visitor = new BNGLVisitor();
      model = visitor.visit(tree);
    } catch (visitorError: any) {
      console.error('Visitor exception:', visitorError);
      errors.push({
        line: 0,
        column: 0,
        message: `Visitor error: ${visitorError.message}`
      });
    }

    return {
      success: errors.length === 0,
      model,
      errors
    };
  } catch (e: any) {
    console.error('Parser exception:', e);
    return {
      success: false,
      errors: [{ line: 0, column: 0, message: e.message || 'Unknown parser error' }]
    };
  }
}

/**
 * Parse BNGL and throw on error (for compatibility with existing code)
 */
export function parseBNGLStrict(input: string): BNGLModel {
  const result = parseBNGLWithANTLR(input);

  if (!result.success || !result.model) {
    const errorMsg = result.errors.map(e => `Line ${e.line}:${e.column}: ${e.message}`).join('\n');
    throw new Error(`BNGL parse error:\n${errorMsg}`);
  }

  return result.model;
}
