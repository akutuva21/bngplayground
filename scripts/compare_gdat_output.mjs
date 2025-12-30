/**
 * Compare BNG2.pl gdat output against web simulator gdat output
 * 
 * This script:
 * 1. Runs BNG2.pl to generate reference .gdat files
 * 2. Runs the web simulator's NetworkGenerator + ODESolver to generate web .gdat files
 * 3. Compares the observable values at each time point
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');

const BNG2_PATH = 'c:\\Users\\Achyudhan\\anaconda3\\envs\\Research\\Lib\\site-packages\\bionetgen\\bng-win\\BNG2.pl';
const TEST_DIR = path.join(PROJECT_ROOT, 'gdat_comparison_output');
const REPORT_FILE = path.join(PROJECT_ROOT, 'gdat_comparison_report.json');

// Tolerance for comparing floating point values
const RELATIVE_TOLERANCE = 0.05; // 5% relative error allowed
const ABSOLUTE_TOLERANCE = 1e-10; // For values very close to zero

// Parse .gdat file into structured data
function parseGdatFile(content) {
  if (!content) return null;

  const lines = content.trim().split('\n');
  if (lines.length < 2) return null;

  // First line is header with observable names
  const headerLine = lines[0].replace(/^#\s*/, '').trim();
  const header = headerLine.split(/\s+/);

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;

    const values = line.split(/\s+/).map(v => parseFloat(v));
    if (values.length > 0 && !isNaN(values[0])) {
      const row = {};
      for (let j = 0; j < header.length && j < values.length; j++) {
        row[header[j]] = values[j];
      }
      data.push(row);
    }
  }

  return { header, data };
}

// Compare two values with tolerance
function valuesMatch(a, b) {
  if (isNaN(a) && isNaN(b)) return true;
  if (isNaN(a) || isNaN(b)) return false;

  const diff = Math.abs(a - b);

  // Check absolute tolerance for very small values
  if (diff < ABSOLUTE_TOLERANCE) return true;

  // Check relative tolerance
  const maxAbs = Math.max(Math.abs(a), Math.abs(b));
  if (maxAbs < ABSOLUTE_TOLERANCE) return true;

  return (diff / maxAbs) <= RELATIVE_TOLERANCE;
}

// Compare two gdat datasets
function compareGdatData(bngData, webData) {
  const report = {
    headerMatch: false,
    rowCountMatch: false,
    missingObservables: [],
    extraObservables: [],
    mismatchedValues: [],
    maxRelativeError: 0,
    bngRowCount: bngData.data.length,
    webRowCount: webData.data.length,
  };

  // Compare headers (observable names)
  const bngObs = new Set(bngData.header.filter(h => h !== 'time'));
  const webObs = new Set(webData.header.filter(h => h !== 'time'));

  report.missingObservables = [...bngObs].filter(o => !webObs.has(o));
  report.extraObservables = [...webObs].filter(o => !bngObs.has(o));
  report.headerMatch = report.missingObservables.length === 0 && report.extraObservables.length === 0;

  // Compare row counts
  report.rowCountMatch = bngData.data.length === webData.data.length;

  // Compare values at each time point
  // Create a map of time -> values for web data
  const webByTime = new Map();
  for (const row of webData.data) {
    const time = row.time;
    if (time !== undefined) {
      webByTime.set(time.toFixed(6), row);
    }
  }

  for (let i = 0; i < bngData.data.length; i++) {
    const bngRow = bngData.data[i];
    const time = bngRow.time;

    // Find matching web row by time
    const webRow = webByTime.get(time?.toFixed(6)) || webData.data[i];

    if (!webRow) {
      report.mismatchedValues.push({
        timeIndex: i,
        time,
        issue: 'Missing row in web output'
      });
      continue;
    }

    // Compare each observable
    for (const obs of bngObs) {
      if (!webObs.has(obs)) continue;

      const bngVal = bngRow[obs];
      const webVal = webRow[obs];

      if (!valuesMatch(bngVal, webVal)) {
        const relError = Math.abs(bngVal - webVal) / Math.max(Math.abs(bngVal), Math.abs(webVal), ABSOLUTE_TOLERANCE);
        report.maxRelativeError = Math.max(report.maxRelativeError, relError);

        // Only record first few mismatches to keep report readable
        if (report.mismatchedValues.length < 10) {
          report.mismatchedValues.push({
            timeIndex: i,
            time,
            observable: obs,
            bngValue: bngVal,
            webValue: webVal,
            relativeError: relError
          });
        }
      }
    }
  }

  report.passed = report.headerMatch &&
    report.mismatchedValues.length === 0;

  return report;
}

// Run BNG2.pl on a model
function runBNG2(modelPath, modelName) {
  const safeModelName = modelName.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
  const bnglFile = path.join(TEST_DIR, `${safeModelName}.bngl`);

  // Copy the model to test directory
  fs.copyFileSync(modelPath, bnglFile);

  try {
    execSync(`perl "${BNG2_PATH}" "${bnglFile}"`, {
      cwd: TEST_DIR,
      timeout: 120000,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const gdatFile = path.join(TEST_DIR, `${safeModelName}.gdat`);
    if (fs.existsSync(gdatFile)) {
      return {
        success: true,
        gdatContent: fs.readFileSync(gdatFile, 'utf-8'),
        safeModelName
      };
    }
    return { success: false, error: 'No gdat file generated' };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stderr: error.stderr?.toString() || ''
    };
  }
}

// Import web simulator modules
async function loadWebSimulator() {
  // Import the compiled JS modules
  const distPath = path.join(PROJECT_ROOT, 'dist');

  // Check if dist exists
  if (!fs.existsSync(distPath)) {
    console.log('Building project...');
    execSync('npm run build', { cwd: PROJECT_ROOT, stdio: 'inherit' });
  }

  // For now, we'll use Node to run the comparison manually
  // This requires compiling the TypeScript to CommonJS or using dynamic import
  return null;
}

// Find all BNGL models in published-models
function findAllModels() {
  const modelsDir = path.join(PROJECT_ROOT, 'published-models');
  const models = [];

  function scanDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanDir(fullPath);
      } else if (item.name.endsWith('.bngl')) {
        // Skip visualization/test files if needed, but user requested all visible models
        // We will try all of them.
        models.push({
          model: path.basename(item.name, '.bngl'),
          path: fullPath
        });
      }
    }
  }

  scanDir(modelsDir);
  return models;
}

// Main comparison function
async function runComparison() {
  console.log('='.repeat(80));
  console.log('BNG2.pl Reference GDAT Generation');
  console.log('='.repeat(80));
  console.log();

  // Create test directory
  if (!fs.existsSync(TEST_DIR)) {
    fs.mkdirSync(TEST_DIR, { recursive: true });
  }

  // Find all models
  const allModels = findAllModels();
  console.log(`Found ${allModels.length} BNGL models in published-models\n`);

  const results = {
    summary: {
      total: allModels.length,
      withGdat: 0,
      passedBng2: 0,
    },
    models: []
  };

  for (const model of allModels) {
    const displayName = model.model.substring(0, 50);
    process.stdout.write(`Generating reference for: ${displayName.padEnd(52)} `);

    // Run BNG2.pl to get reference gdat
    const bng2Result = runBNG2(model.path, model.model);

    if (!bng2Result.success) {
      console.log(`[FAILED: ${bng2Result.error}]`);
      results.models.push({
        model: model.model,
        path: model.path,
        status: 'bng2_failed',
        error: bng2Result.error
      });
      continue;
    }

    // Parse the gdat just to verify it's valid
    const bngData = parseGdatFile(bng2Result.gdatContent);
    if (!bngData) {
      console.log('[PARSE FAILED]');
      results.models.push({
        model: model.model,
        status: 'parse_failed'
      });
      continue;
    }

    results.summary.withGdat++;
    results.summary.passedBng2++;

    // Save the BNG2 gdat
    const gdatPath = path.join(TEST_DIR, `${bng2Result.safeModelName}_bng2.gdat`);
    fs.writeFileSync(gdatPath, bng2Result.gdatContent);

    console.log(`[OK] ${bngData.header.length} observables`);
    results.models.push({
      model: model.model,
      path: model.path,
      status: 'bng2_ok',
      hasGdat: true,
      observables: bngData.header.filter(h => h !== 'time'),
      gdatFile: gdatPath
    });
  }

  // Save results report which acts as the new "bng2_test_report.json" source
  // We'll save it to a new file to avoid confusion but compare_gdat_full.mjs will need to read this
  const newReportPath = path.join(PROJECT_ROOT, 'bng2_reference_report.json');
  fs.writeFileSync(newReportPath, JSON.stringify({ passed: results.models }, null, 2));

  console.log('\n' + '='.repeat(80));
  console.log('Summary:');
  console.log(`  Models scanned: ${results.summary.total}`);
  console.log(`  Gdat generated: ${results.summary.withGdat}`);
  console.log();
  console.log(`Reference generation report saved to: ${newReportPath}`);
  console.log(`BNG2 gdat files saved to: ${TEST_DIR}`);
}

// Run if executed directly
runComparison().catch(console.error);
