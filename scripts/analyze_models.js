const fs = require('fs');
const path = require('path');

const MODELS_DIR = 'public/models';
const VALIDATION_FILE = 'validation_models.ts';
const CONSTANTS_FILE = 'constants.ts';

// 1. Get all model files
const files = fs.readdirSync(MODELS_DIR)
    .filter(f => f.endsWith('.bngl'))
    .map(f => f.slice(0, -5)); // remove .bngl

// 2. Get Validated models
const valContent = fs.readFileSync(VALIDATION_FILE, 'utf8');
const valMatches = valContent.matchAll(/'([^']+)'/g);
const validated = new Set([...valMatches].map(m => m[1]));

// 3. Get Excluded models
const constContent = fs.readFileSync(CONSTANTS_FILE, 'utf8');
// Extract the set content
const excludedMatch = constContent.match(/const BNG2_EXCLUDED_MODELS = new Set\(\[([\s\S]*?)\]\);/);
let excluded = new Set();
if (excludedMatch) {
    const rawList = excludedMatch[1];
    const matches = rawList.matchAll(/'([^']+)'/g);
    excluded = new Set([...matches].map(m => m[1]));
}

// 4. Analyze each model
const results = files.map(name => {
    const filePath = path.join(MODELS_DIR, `${name}.bngl`);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    let hasOde = false;
    let hasSimulate = false;
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        
        // Check for simulate commands
        // Matches: simulate_ode
        // Matches: simulate({method=>"ode"}) or simulate({method=>'ode'})
        // Matches: simulate({..., method=>"ode", ...})
        
        if (trimmed.includes('simulate')) {
            hasSimulate = true;
            
            // Check for ODE specifically
            // Simple check: 'simulate_ode' as a word
            if (/\bsimulate_ode\b/.test(trimmed)) {
                hasOde = true;
                break;
            }
            
            // Check for method=>"ode" or method=>'ode'
            // Be careful not to match inside string literals if possible, but basic check is usually enough for BNGL
            // We want to ensure it's "active" (not commented), which we filtered above
            if (/simulate\s*\(\{/.test(trimmed)) {
                if (/method\s*=>\s*["']ode["']/.test(trimmed)) {
                    hasOde = true;
                    break; 
                }
            }
        }
    }
    
    let status = 'Other';
    if (validated.has(name)) status = 'Passed';
    else if (excluded.has(name)) status = 'Excluded';
    
    return { name, status, hasOde, hasSimulate };
});

// 5. Group and Print
const passed = results.filter(r => r.status === 'Passed');
const excluded_list = results.filter(r => r.status === 'Excluded');
const others = results.filter(r => r.status === 'Other');

const untestedOde = others.filter(r => r.hasOde);
const noOde = others.filter(r => !r.hasOde);

console.log(JSON.stringify({
    stats: {
        total: results.length,
        passed: passed.length,
        excluded: excluded_list.length,
        other: others.length,
        untestedOde: untestedOde.length,
        otherNoOde: noOde.length
    },
    passed: passed.map(r => r.name),
    excluded: excluded_list.map(r => ({name: r.name, hasOde: r.hasOde})),
    untestedOde: untestedOde.map(r => r.name),
    noOde: noOde.map(r => ({name: r.name, hasSimulate: r.hasSimulate}))
}, null, 2));
