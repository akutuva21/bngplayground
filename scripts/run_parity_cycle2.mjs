import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const webOutputDir = path.join(root, 'web_output');
const reportPath = path.join('artifacts', 'parity_layer_report.cycle2_full.json');

function removeMatchingFiles(dirPath, exts) {
  if (!fs.existsSync(dirPath)) return;
  for (const entry of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, entry);
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) continue;
    if (!exts.some((ext) => entry.toLowerCase().endsWith(ext))) continue;
    fs.unlinkSync(fullPath);
  }
}

function runStep(label, cmd, args) {
  console.log(`[parity-cycle2] ${label}`);
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: true,
  });

  return typeof result.status === 'number' ? result.status : 1;
}

console.log('[parity-cycle2] Cleaning stale web NET outputs...');
removeMatchingFiles(webOutputDir, ['.net']);

const parityExit = runStep(
  'Running full layered parity check',
  'npx',
  ['-y', 'tsx', 'scripts/layered_parity_check.ts', '--all', '--out', reportPath, '--no-generate-web-cdat']
);

const summaryExit = runStep(
  'Summarizing deterministic failures',
  'node',
  ['artifacts/summarize_post_fix_deterministic.cjs', reportPath]
);

if (summaryExit !== 0) {
  process.exit(summaryExit);
}

// layered_parity_check exits non-zero when there are failing models; preserve that signal.
process.exit(parityExit);
