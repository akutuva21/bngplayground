const fs = require('fs');
const src = 'published-models/tutorials/polymer.bngl';
const dst = 'temp_poly_debug/polymer_cvode.bngl';
let s = fs.readFileSync(src, 'utf8');
// Replace simulate_nf({...}) with simulate({method=>"cvode", t_end=>1.0, n_steps=>20})
s = s.replace(/simulate_nf\([^)]*\)/g, 'simulate({method=>"cvode", t_end=>1.0, n_steps=>20})');
fs.writeFileSync(dst, s, 'utf8');
console.log('Wrote', dst);
