
const Na = 6.022e23;
const V = 1.4e-15;
const c0 = 1e9;
const tF = 1e-4;
const pF = 1000;

// Ref: 1.186127057456e-7 (from BNG2 / Wolfram)
// Let's use high precision string or wolfram alpha value if known.
// 1e9 / (6.022e23 * 1.4e-15) * 1e-4 / 1000
// = 1e9 / 8.4308e8 * 1e-7
// = 1.186127057930445509... e-7 ?

// Re-calculate "Exact" manually:
// 1e9 / (6.022 * 1.4 * 10^(23-15)) * 1e-7
// 1e9 / (8.4308 * 10^8) * 1e-7
// (1/8.4308) * 10^(9-8-7) = (1/8.4308) * 10^-6
// 1/8.4308 = 0.11861270579304455
// * 10^-6 = 1.18612705793... e-7

// Wait.
// Order 1 (JS default): 1.18612705793044556 e-7
// BNG2 Ref: 1.18612705745600004 e-7
// The difference is in the 10th digit.
// 0.118612705793 vs 0.118612705745
// Difference: 0.000000000048

// Why did BNG2 get ...745?
// Maybe Na is 6.02214076e23?
// Parameter Na 6.022e23 in file.
// Maybe BNG2 uses different float type?
// Or maybe "c0/Na" is evaluated first?
// 1e9 / 6.022e23 = 1.6605778811026237e-15
// / 1.4e-15 = 1.1861270579304455

// Let's try Order 2:
// (c0 * tF) / (Na * V * pF)
const order2 = (c0 * tF) / (Na * V * pF);
console.log("Order 2:", order2);

const ref = 1.18612705745600004e-7; // The value from previous log (BNG2 matching?)

if (Math.abs(order2 - ref) < Math.abs(1.18612705793044556e-7 - ref)) {
    console.log("Order 2 is closer to Ref!");
} else {
    console.log("Order 2 is NOT closer. Order 1 is closer?");
}

console.log("Ref:", ref);
console.log("Order 1:", 1.18612705793044556e-7);
console.log("Order 2:", order2);
