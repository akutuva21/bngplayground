/**
 * Comparison script to compare web simulator CSV outputs with BNG2.pl GDAT reference files
 * Usage: npx ts-node compare_outputs.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComparisonResult {
  model: string;
  status: 'match' | 'mismatch' | 'missing_reference' | 'error';
  referenceFile?: string;
  referenceInferred?: boolean;
  details: {
    webRows: number;
    refRows: number;
    webColumns: string[];
    refColumns: string[];
    columnMatch: boolean;
    missingColumns?: string[];
    extraColumns?: string[];
    timeMatch: boolean;
    timeOffset?: number;
    maxRelativeError: number;
    maxAbsoluteError: number;
    errorAtTime?: number;
    errorColumn?: string;
    samples?: { time: number; column: string; web: number; ref: number; relError: number }[];
  } | null;
  error?: string;
}

// Project layout: compare exported browser CSVs in <repo>/web_output against
// precomputed BNG2 outputs in <repo>/bng_test_output.
const PROJECT_ROOT = path.resolve(__dirname, '..');
const WEB_OUTPUT_DIR = path.join(PROJECT_ROOT, 'web_output');
const BNG_OUTPUT_DIR = path.join(PROJECT_ROOT, 'bng_test_output');

const SESSION_DIR = path.join(PROJECT_ROOT, 'artifacts', 'SESSION_2026_01_05_web_output_parity');

// Strict tolerance settings (keep tight; do not "fix" mismatches by loosening).
const ABS_TOL = 1e-6;
const REL_TOL = 1e-4;
const TIME_TOL = 1e-10;

// Some exported web filenames don't match the reference BNGL/GDAT basenames.
// This table provides explicit hints to locate the correct reference.
// Keys and values are normalized via normalizeKey().
const CSV_MODEL_ALIASES: Record<string, string> = {
  // Web example name vs reference file base
  cheemalavagu2014: 'Cheemalavagu_JAK_STAT',
  lin2019: 'Lin_ERK_2019',
  jaruszewicz2023: 'Jaruszewicz-Blonska_2023',
};

function stripDownloadSuffix(name: string): string {
  // Firefox/Chrome may save duplicates as "file(1).csv".
  return name.replace(/\(\d+\)(?=\.[^.]+$)/, '');
}

function normalizeKey(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/^results_/, '')
    .replace(/\.(csv|gdat|bngl)$/i, '')
    .replace(/\(\d+\)$/, '')
    .replace(/[^a-z0-9]+/g, '');
}

function csvModelLabel(csvFile: string): string {
  return stripDownloadSuffix(csvFile)
    .replace(/^results_/, '')
    .replace(/\.csv$/i, '');
}

function parseCSV(content: string): { headers: string[]; data: number[][] } {
  const lines = content.trim().split('\n').filter(l => l.trim() && !l.startsWith('#'));
  const headers = lines[0].split(',').map(h => h.trim());
  const data = lines.slice(1).map(line => 
    line.split(',').map(v => {
      const parsed = Number.parseFloat(v.trim());
      if (!Number.isFinite(parsed)) {
        throw new Error(`Non-numeric CSV value: "${v}"`);
      }
      return parsed;
    })
  );
  return { headers, data };
}

function parseGDAT(content: string): { headers: string[]; data: number[][] } {
  const lines = content.trim().split('\n').filter(l => l.trim());
  
  // First line is header with #
  const headerLine = lines.find(l => l.startsWith('#'));
  let headers: string[] = [];
  if (headerLine) {
    headers = headerLine.replace('#', '').trim().split(/\s+/);
  }
  
  // Data lines don't start with #
  const data = lines
    .filter(l => !l.startsWith('#') && l.trim())
    .map(line => line.trim().split(/\s+/).map(v => {
      const parsed = Number.parseFloat(v);
      if (!Number.isFinite(parsed)) {
        throw new Error(`Non-numeric GDAT value: "${v}"`);
      }
      return parsed;
    }));
  
  return { headers, data };
}

type SimCall = { method: 'ode' | 'ssa' | 'nf'; suffix?: string };

function parseSimulateCallsFromBngl(bnglContent: string): SimCall[] {
  // Drop full-line and inline comments to avoid picking up commented-out simulate calls.
  const stripped = bnglContent.replace(/#[^\n]*/g, '');
  const simulateRegex = /simulate[_a-z]*\s*\(\s*\{([^}]*)\}\s*\)/gi;
  const calls: SimCall[] = [];

  const matches = Array.from(stripped.matchAll(simulateRegex));
  for (const m of matches) {
    const full = (m[0] ?? '').toLowerCase();
    const params = m[1] ?? '';

    let method: 'ode' | 'ssa' | 'nf' = 'ode';
    if (full.includes('simulate_nf')) method = 'nf';
    else if (full.includes('simulate_ssa')) method = 'ssa';
    else {
      const methodMatch = params.match(/method\s*=>?\s*"?([^,}\s"]+)"?/i);
      const mm = (methodMatch?.[1] ?? '').toLowerCase();
      if (mm === 'ssa') method = 'ssa';
      else if (mm === 'nf' || mm === 'nfsim' || mm === 'network_free') method = 'nf';
      else method = 'ode';
    }

    const suffixMatch = params.match(/suffix\s*=>?\s*"?([^,}\s"]+)"?/i);
    const suffix = suffixMatch?.[1];
    calls.push({ method, suffix });
  }

  return calls;
}

function chooseReferenceFromBngl(baseName: string, bnglPath: string, gdatFiles: string[]): string | null {
  const content = fs.readFileSync(bnglPath, 'utf8');
  const calls = parseSimulateCallsFromBngl(content);
  if (calls.length === 0) return null;

  // Prefer the first ODE simulate call.
  // The web UI/batch behavior selects the first matching simulate() (not the last),
  // so choosing the last here can incorrectly compare against a different phase/suffix.
  const odeCalls = calls.filter(c => c.method === 'ode');
  const chosen = (odeCalls.length > 0 ? odeCalls[0] : calls[0]);
  const expectedName = chosen.suffix ? `${baseName}_${chosen.suffix}.gdat` : `${baseName}.gdat`;
  const expectedPath = path.join(BNG_OUTPUT_DIR, expectedName);
  if (fs.existsSync(expectedPath)) return expectedPath;

  // Fallback: try to find by normalized key.
  const expectedKey = normalizeKey(expectedName);
  for (const gf of gdatFiles) {
    if (normalizeKey(gf) === expectedKey) return path.join(BNG_OUTPUT_DIR, gf);
  }
  return null;
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of values) {
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  return out;
}

function isClearlyNonOdeGdat(filePathOrName: string): boolean {
  const base = path.basename(filePathOrName).toLowerCase();
  // Conservative filters: only drop variants that explicitly advertise non-ODE method.
  // This prevents accidentally excluding normal ODE outputs whose basenames contain
  // these tokens as part of another word.
  return (
    /(^|_)ssa(\d+)?\./.test(base) ||
    /(^|_)ssa(\d+)?_/.test(base) ||
    /(^|_)nfsim\./.test(base) ||
    /(^|_)nfsim_/.test(base) ||
    /(^|_)nf\./.test(base) ||
    /(^|_)nf_/.test(base)
  );
}

function findBestBnglForCsv(csvFile: string, bnglFiles: string[]): string | null {
  const raw = csvModelLabel(csvFile);
  const tokens = raw.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const modelKey = normalizeKey(raw);

  // Avoid misleading fuzzy matches for very short/ambiguous labels like "toggle".
  if (modelKey.length <= 8 && tokens.length <= 1) {
    const exact = bnglFiles.find((bf) => normalizeKey(bf) === modelKey);
    return exact ? path.join(BNG_OUTPUT_DIR, exact) : null;
  }

  let best: { file: string; score: number } | null = null;
  for (const bf of bnglFiles) {
    const base = bf.replace(/\.bngl$/i, '');
    const baseLower = base.toLowerCase();
    const bKey = normalizeKey(base);

    let score = 0;
    if (bKey === modelKey) score += 1000;
    if (bKey.includes(modelKey) || modelKey.includes(bKey)) score += 400;

    for (const t of tokens) {
      if (t.length < 3) continue;
      if (baseLower.includes(t)) score += 20;
    }

    // Small preference for shorter names when tied.
    score -= Math.abs(bKey.length - modelKey.length);

    if (!best || score > best.score) best = { file: bf, score };
  }

  if (!best || best.score < 30) return null;
  return path.join(BNG_OUTPUT_DIR, best.file);
}

function findGdatCandidates(csvFile: string): { gdatPaths: string[]; bnglPath?: string; inferred?: boolean } {
  if (!fs.existsSync(BNG_OUTPUT_DIR)) return { gdatPaths: [] };

  const gdatFiles = fs.readdirSync(BNG_OUTPUT_DIR).filter(f => f.toLowerCase().endsWith('.gdat'));
  const bnglFiles = fs.readdirSync(BNG_OUTPUT_DIR).filter(f => f.toLowerCase().endsWith('.bngl'));

  const rawLabel = csvModelLabel(csvFile);
  const baseKey = normalizeKey(rawLabel);
  const alias = CSV_MODEL_ALIASES[baseKey];
  const candidateKeys = [baseKey, alias ? normalizeKey(alias) : null].filter(Boolean) as string[];

  const directMatches: string[] = [];

  // 1) Direct match by normalized key.
  for (const gf of gdatFiles) {
    const gKey = normalizeKey(gf);
    if (candidateKeys.includes(gKey)) {
      directMatches.push(path.join(BNG_OUTPUT_DIR, gf));
    }
  }

  if (directMatches.length > 0) {
    return { gdatPaths: uniqueStrings(directMatches), inferred: false };
  }

  // 2) Try infer from matching BNGL and its last simulate() call.
  // 2) Try infer from matching BNGL and its last simulate() call.
  // If a CSV alias exists, try that first.
  const bnglPath = alias
    ? ((): string | null => {
      const exact = bnglFiles.find((bf) => normalizeKey(bf) === normalizeKey(alias + '.bngl'));
      return exact ? path.join(BNG_OUTPUT_DIR, exact) : findBestBnglForCsv(csvFile, bnglFiles);
    })()
    : findBestBnglForCsv(csvFile, bnglFiles);
  if (!bnglPath) return { gdatPaths: [] };

  const baseName = path.basename(bnglPath).replace(/\.bngl$/i, '');

  // Primary inferred candidate based on simulate() suffix.
  const inferredGdat = chooseReferenceFromBngl(baseName, bnglPath, gdatFiles);

  // Also consider all available GDAT variants for this BNGL base name.
  // Many models have multiple simulate phases (and thus multiple GDAT files).
  // The web batch runner may correspond to a different phase than a simple
  // "first/last" heuristic, so we try all variants and pick the best match.
  const baseNameLower = baseName.toLowerCase();
  const byPrefix = gdatFiles
    .filter((gf) => {
      const lower = gf.toLowerCase();
      return lower === `${baseNameLower}.gdat` || lower.startsWith(`${baseNameLower}_`);
    })
    .map((gf) => path.join(BNG_OUTPUT_DIR, gf));

  const candidates = uniqueStrings([...(inferredGdat ? [inferredGdat] : []), ...byPrefix]);
  // Prefer comparing against ODE references; drop explicit SSA/NF variants.
  const odeCandidates = candidates.filter((p) => !isClearlyNonOdeGdat(p));
  return { gdatPaths: odeCandidates.length > 0 ? odeCandidates : candidates, bnglPath, inferred: true };
}

function betterCandidate(a: ComparisonResult, b: ComparisonResult): boolean {
  const ad = a.details;
  const bd = b.details;
  if (!ad) return false;
  if (!bd) return true;

  const aStrict = a.status === 'match';
  const bStrict = b.status === 'match';
  if (aStrict !== bStrict) return aStrict;

  if (ad.columnMatch !== bd.columnMatch) return ad.columnMatch;
  if (ad.timeMatch !== bd.timeMatch) return ad.timeMatch;

  const aRowDelta = Math.abs(ad.webRows - ad.refRows);
  const bRowDelta = Math.abs(bd.webRows - bd.refRows);
  if (aRowDelta !== bRowDelta) return aRowDelta < bRowDelta;

  const aSamples = ad.samples?.length ?? 0;
  const bSamples = bd.samples?.length ?? 0;
  if (aSamples !== bSamples) return aSamples < bSamples;

  if (ad.maxRelativeError !== bd.maxRelativeError) return ad.maxRelativeError < bd.maxRelativeError;
  return ad.maxAbsoluteError < bd.maxAbsoluteError;
}

function compareData(
  webData: { headers: string[]; data: number[][] },
  refData: { headers: string[]; data: number[][] }
): ComparisonResult['details'] {
  // Normalize headers (lowercase, remove spaces)
  const normalizeHeader = (h: string) => h.toLowerCase().replace(/\s+/g, '_');
  const webHeadersNorm = webData.headers.map(normalizeHeader);
  const refHeadersNorm = refData.headers.map(normalizeHeader);
  
  // Check column match (excluding 'time')
  const webCols = new Set(webHeadersNorm.filter(h => h !== 'time'));
  const refCols = new Set(refHeadersNorm.filter(h => h !== 'time'));
  const columnMatch = [...webCols].every(c => refCols.has(c)) && [...refCols].every(c => webCols.has(c));

  const missingColumns = [...refCols].filter(c => !webCols.has(c)).sort();
  const extraColumns = [...webCols].filter(c => !refCols.has(c)).sort();
  
  let maxRelativeError = 0;
  let maxAbsoluteError = 0;
  let errorAtTime: number | undefined;
  let errorColumn: string | undefined;
  const samples: { time: number; column: string; web: number; ref: number; relError: number }[] = [];
  
  const webTimeIdx = webHeadersNorm.indexOf('time');
  const refTimeIdx = refHeadersNorm.indexOf('time');
  
  if (webTimeIdx === -1 || refTimeIdx === -1) {
    return {
      webRows: webData.data.length,
      refRows: refData.data.length,
      webColumns: webData.headers,
      refColumns: refData.headers,
      columnMatch: false,
      timeMatch: false,
      maxRelativeError: -1,
      maxAbsoluteError: -1,
    };
  }

  // Strict row count + aligned time grid comparison.
  const minRows = Math.min(webData.data.length, refData.data.length);
  let timeMatch = webData.data.length === refData.data.length;
  let timeOffset: number | undefined;
  if (minRows > 0) {
    timeOffset = webData.data[0][webTimeIdx] - refData.data[0][refTimeIdx];
  }

  for (let i = 0; i < minRows; i++) {
    const wt = webData.data[i][webTimeIdx];
    const rt = refData.data[i][refTimeIdx];
    if (Math.abs(wt - rt) > TIME_TOL) {
      timeMatch = false;
      break;
    }
  }

  // Compare all rows/cols (by index once headers are mapped).
  const refColIndexByNorm = new Map<string, number>();
  for (let i = 0; i < refHeadersNorm.length; i++) refColIndexByNorm.set(refHeadersNorm[i], i);

  for (let rowIdx = 0; rowIdx < minRows; rowIdx++) {
    const webRow = webData.data[rowIdx];
    const refRow = refData.data[rowIdx];
    const webTime = webRow[webTimeIdx];

    for (let ci = 0; ci < webData.headers.length; ci++) {
      const colName = webData.headers[ci];
      const colNameNorm = normalizeHeader(colName);
      if (colNameNorm === 'time') continue;

      const refColIdx = refColIndexByNorm.get(colNameNorm);
      if (refColIdx === undefined) continue;

      const webVal = webRow[ci];
      const refVal = refRow[refColIdx];
      const absError = Math.abs(webVal - refVal);
      const denom = Math.max(Math.abs(refVal), Math.abs(webVal), 1e-30);
      const relError = absError / denom;

      if (absError > maxAbsoluteError) maxAbsoluteError = absError;
      if (relError > maxRelativeError) {
        maxRelativeError = relError;
        errorAtTime = webTime;
        errorColumn = colName;
      }

      // Sample some points above tolerance.
      const tolerance = ABS_TOL + REL_TOL * Math.max(Math.abs(refVal), Math.abs(webVal));
      if (samples.length < 10 && absError > tolerance) {
        samples.push({ time: webTime, column: colName, web: webVal, ref: refVal, relError });
      }
    }
  }
  
  return {
    webRows: webData.data.length,
    refRows: refData.data.length,
    webColumns: webData.headers,
    refColumns: refData.headers,
    columnMatch,
    missingColumns,
    extraColumns,
    timeMatch,
    timeOffset,
    maxRelativeError,
    maxAbsoluteError,
    errorAtTime,
    errorColumn,
    samples,
  };
}

async function main() {
  console.log('='.repeat(80));
  console.log('BioNetGen Web Simulator Output Comparison');
  console.log('='.repeat(80));
  console.log();
  
  if (!fs.existsSync(WEB_OUTPUT_DIR)) {
    console.error(`Web output directory not found: ${WEB_OUTPUT_DIR}`);
    return;
  }
  
  if (!fs.existsSync(BNG_OUTPUT_DIR)) {
    console.error(`BNG output directory not found: ${BNG_OUTPUT_DIR}`);
    return;
  }
  
  const allCsvFiles = fs.readdirSync(WEB_OUTPUT_DIR).filter(f => f.toLowerCase().endsWith('.csv'));
  // If the browser downloaded duplicates (e.g., file.csv + file(1).csv),
  // only compare one copy.
  const seen = new Set<string>();
  const csvFiles: string[] = [];
  for (const f of allCsvFiles) {
    const key = stripDownloadSuffix(f).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    csvFiles.push(f);
  }
  console.log(`Found ${csvFiles.length} web output CSV files (deduped from ${allCsvFiles.length})\n`);
  
  const results: ComparisonResult[] = [];
  
  for (const csvFile of csvFiles) {
    const ref = findGdatCandidates(csvFile);
    const modelName = csvModelLabel(csvFile);

    if (!ref.gdatPaths || ref.gdatPaths.length === 0) {
      results.push({
        model: modelName,
        status: 'missing_reference',
        referenceFile: undefined,
        referenceInferred: ref.inferred,
        details: null,
      });
      continue;
    }
    
    try {
      const csvContent = fs.readFileSync(path.join(WEB_OUTPUT_DIR, csvFile), 'utf8');
      const webData = parseCSV(csvContent);

      let best: ComparisonResult | null = null;
      for (const candidatePath of ref.gdatPaths) {
        const gdatContent = fs.readFileSync(candidatePath, 'utf8');
        const refData = parseGDAT(gdatContent);
        const comparison = compareData(webData, refData);

        const strictOk =
          comparison.columnMatch &&
          comparison.timeMatch &&
          comparison.webRows === comparison.refRows &&
          (comparison.samples?.length ?? 0) === 0;
        const status: ComparisonResult['status'] = strictOk ? 'match' : 'mismatch';

        const candidate: ComparisonResult = {
          model: modelName,
          status,
          referenceFile: path.basename(candidatePath),
          referenceInferred: ref.inferred,
          details: comparison,
        };

        if (!best || betterCandidate(candidate, best)) {
          best = candidate;
          if (candidate.status === 'match') break;
        }
      }

      results.push(
        best ?? {
          model: modelName,
          status: 'error',
          referenceFile: undefined,
          referenceInferred: ref.inferred,
          details: null,
          error: 'No viable GDAT candidates could be compared',
        }
      );
    } catch (error) {
      results.push({
        model: modelName,
        status: 'error',
        referenceFile: undefined,
        referenceInferred: ref.inferred,
        details: null,
        error: String(error),
      });
    }
  }

  // Persist a JSON snapshot for artifacts/debugging.
  try {
    if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR, { recursive: true });
    const outPath = path.join(SESSION_DIR, 'compare_results.after_refs.json');
    fs.writeFileSync(
      outPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          absTol: ABS_TOL,
          relTol: REL_TOL,
          timeTol: TIME_TOL,
          webOutputDir: path.relative(PROJECT_ROOT, WEB_OUTPUT_DIR).replace(/\\/g, '/'),
          bngOutputDir: path.relative(PROJECT_ROOT, BNG_OUTPUT_DIR).replace(/\\/g, '/'),
          summary: {
            total: results.length,
            matching: results.filter(r => r.status === 'match').length,
            mismatches: results.filter(r => r.status === 'mismatch').length,
            missingReference: results.filter(r => r.status === 'missing_reference').length,
            errors: results.filter(r => r.status === 'error').length,
          },
          results,
        },
        null,
        2
      ),
      'utf8'
    );
    console.log(`Wrote JSON results: ${path.relative(PROJECT_ROOT, outPath).replace(/\\/g, '/')}`);
    console.log();
  } catch (e) {
    console.warn('Warning: failed to write JSON results:', String(e));
  }
  
  // Print summary
  console.log('Summary of Comparisons:');
  console.log('-'.repeat(80));
  
  const matches = results.filter(r => r.status === 'match');
  const mismatches = results.filter(r => r.status === 'mismatch');
  const missing = results.filter(r => r.status === 'missing_reference');
  const errors = results.filter(r => r.status === 'error');
  
  console.log(`Matching:      ${matches.length}`);
  console.log(`Mismatches:    ${mismatches.length}`);
  console.log(`No reference:  ${missing.length}`);
  console.log(`Errors:        ${errors.length}`);
  console.log();
  
  // Print match details
  if (matches.length > 0) {
    console.log(`Matching Models (ABS_TOL=${ABS_TOL}, REL_TOL=${REL_TOL}):`);
    for (const r of matches) {
      const err = r.details?.maxRelativeError ?? 0;
      const refLabel = r.referenceFile ? ` (ref=${r.referenceFile})` : '';
      console.log(`  OK ${r.model}${refLabel}: max rel error = ${(err * 100).toFixed(6)}%`);
    }
    console.log();
  }
  
  // Print mismatch details
  if (mismatches.length > 0) {
    console.log('Mismatched Models:');
    for (const r of mismatches) {
      const refLabel = r.referenceFile ? ` (ref=${r.referenceFile})` : '';
      console.log(`  FAIL ${r.model}${refLabel}:`);
      if (r.details) {
        console.log(`     Rows: web=${r.details.webRows}, ref=${r.details.refRows}`);
        console.log(`     Columns match: ${r.details.columnMatch}`);
        if (!r.details.columnMatch) {
          if ((r.details.missingColumns?.length ?? 0) > 0) {
            console.log(`     Missing columns (in web): ${r.details.missingColumns!.slice(0, 10).join(', ')}${r.details.missingColumns!.length > 10 ? ' ...' : ''}`);
          }
          if ((r.details.extraColumns?.length ?? 0) > 0) {
            console.log(`     Extra columns (in web): ${r.details.extraColumns!.slice(0, 10).join(', ')}${r.details.extraColumns!.length > 10 ? ' ...' : ''}`);
          }
        }
        console.log(`     Time grid match: ${r.details.timeMatch}`);
        if (r.details.timeMatch === false && typeof r.details.timeOffset === 'number') {
          console.log(`     Time offset (web[0]-ref[0]): ${r.details.timeOffset}`);
        }

        console.log(`     Max absolute error: ${r.details.maxAbsoluteError.toExponential(6)}`);
        console.log(`     Max relative error: ${(r.details.maxRelativeError * 100).toFixed(6)}%`);
        console.log(`     Worst at t=${r.details.errorAtTime}, col=${r.details.errorColumn}`);
        if (r.details.samples && r.details.samples.length > 0) {
          console.log(`     Sample discrepancies:`);
          for (const s of r.details.samples.slice(0, 3)) {
            console.log(`       t=${s.time}: ${s.column} web=${s.web.toExponential(4)} ref=${s.ref.toExponential(4)} (${(s.relError * 100).toFixed(2)}%)`);
          }
        }
      }
    }
    console.log();
  }
  
  // Print missing references
  if (missing.length > 0) {
    console.log('Models without reference GDAT files:');
    for (const r of missing) {
      console.log(`  NOREF ${r.model}`);
    }
    console.log();
  }
  
  // Print errors
  if (errors.length > 0) {
    console.log('Models with errors:');
    for (const r of errors) {
      console.log(`  ERROR ${r.model}: ${r.error}`);
    }
    console.log();
  }
  
  console.log('='.repeat(80));
  console.log(`Total: ${results.length} models compared`);
}

main().catch(console.error);
