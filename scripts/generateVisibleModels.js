const fs = require('fs');
const path = require('path');
const reportPath = path.join(__dirname, '..', 'temp_bng_output', 'bng2_verify_published_ode_outputs_report.json');
if (!fs.existsSync(reportPath)) {
  console.error('Report not found:', reportPath);
  process.exit(2);
}
const rep = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const visible = rep.results.filter(r => r.status === 'PASS' && (r.hasGdat || r.hasCdat)).map(r => r.rel.replace(/\\\\/g, '/').replace(/\\.bngl$/i, ''));
const out = { generated: new Date().toISOString(), count: visible.length, models: visible };
const outPath = path.join(__dirname, '..', 'public', 'visible-models.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log('Wrote', outPath, 'with', visible.length, 'models');
