
const Na = 6.022e23;
const V = 1.4e-15;
const c0 = 1e9;
const tF = 1e-4;
const pF = 1000;

// Expression from BNGL: c0/Na/V*tF/pF

// 1. JS Default (Left-to-Right)
// ((c0 / Na) / V) * tF / pF
const order1 = c0 / Na / V * tF / pF;

// 2. Grouped Denominators (Algebraically equivalent, maybe more precise)
// (c0 * tF) / (Na * V * pF)
const order2 = (c0 * tF) / (Na * V * pF);

// 3. Manual Step-by-Step (Simulation of parser accumulator)
let acc = c0;
acc = acc / Na;
acc = acc / V;
acc = acc * tF;
acc = acc / pF;
const order3 = acc;

// 4. BNG2 Reference (Approx)
// 1.186127e-7
const ref = 1.186127057456e-7;

console.log("Order 1 (Default):", order1.toPrecision(20));
console.log("Order 2 (Grouped):", order2.toPrecision(20));
console.log("Order 3 (Manual): ", order3.toPrecision(20));
console.log("Reference:        ", ref.toPrecision(20));

console.log("\nDiff 1 vs Ref:", order1 - ref);
console.log("Diff 2 vs Ref:", order2 - ref);
console.log("Diff 1 vs 2:  ", order1 - order2);

if (Math.abs(order1 - order2) > 1e-15) {
    console.log("SIGNIFICANT PRECISION DIFFERENCE DETECTED");
} else {
    console.log("No significant difference detected in JS double precision");
}
