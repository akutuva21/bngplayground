/**
 * services/parity/ParityService.ts
 * 
 * Handles BNG2.pl parity logic for floating point formatting, time quantization,
 * and string representations.
 */

// Custom scientific notation formatter to match BNG2.pl's printf("%.12e") output
// Rationale: BNG2 uses glibc's printf with specific rounding behavior for tie-breaking
// (0.5 fractional case rounds DOWN for positive numbers). This function replicates that
// behavior to ensure GDAT parity. The 1e-9 threshold is empirically chosen to handle
// floating-point precision limits in JavaScript vs. C.
// Note: This is intentionally "fragile" - it exists solely for output parity, not correctness.
export const toBngScientific12 = (x: number): string => {
    if (!Number.isFinite(x) || x === 0) {
        return x.toExponential(12);
    }

    const sign = x < 0 ? '-' : '';
    const absX = Math.abs(x);

    // Get exponent: floor(log10(absX))
    const exp = Math.floor(Math.log10(absX));

    // Normalized mantissa: absX / 10^exp should be in [1, 10)
    const scale = Math.pow(10, exp);
    const mantissa = absX / scale;

    // We need 13 significant digits total (1 before decimal + 12 after)
    // Multiply by 10^12 to get all significant digits as an integer
    const shifted = mantissa * 1e12;

    // Custom rounding: for tie-breaker cases, round DOWN (floor)
    // Check if we're at a tie (value ends in exactly .5 after shifting)
    const floored = Math.floor(shifted);
    const fraction = shifted - floored;

    // Tie condition: fraction is exactly 0.5 (or very close due to FP errors)
    // If tie, round DOWN. Otherwise, use normal rounding.
    let rounded: number;
    if (Math.abs(fraction - 0.5) < 1e-9) {
        // Tie-breaker: round DOWN (toward zero) for positive numbers
        rounded = floored;
    } else {
        // Normal rounding
        rounded = Math.round(shifted);
    }

    // Handle overflow case (e.g., 9.9999... rounds to 10.0)
    if (rounded >= 1e13) {
        rounded = Math.round(rounded / 10);
        const newExp = exp + 1;
        const mantStr = (rounded / 1e12).toFixed(12);
        const expSign = newExp >= 0 ? '+' : '-';
        const expAbs = Math.abs(newExp);
        const expPadded = expAbs < 100 ? String(expAbs).padStart(2, '0') : String(expAbs);
        return `${sign}${mantStr}e${expSign}${expPadded}`;
    }

    // Format mantissa with exactly 12 decimal places
    const mantStr = (rounded / 1e12).toFixed(12);
    const expSign = exp >= 0 ? '+' : '-';
    const expAbs = Math.abs(exp);
    const expPadded = expAbs < 100 ? String(expAbs).padStart(2, '0') : String(expAbs);

    return `${sign}${mantStr}e${expSign}${expPadded}`;
};

export const quantizeBngPrintedTime = (t: number): number => {
    if (!Number.isFinite(t)) return t;

    // Use custom BNG2-compatible formatting
    const formatted = toBngScientific12(t);
    const parsed = Number(formatted);

    // Preserve exact-integer timestamps
    if (Number.isInteger(parsed)) return parsed;
    return parsed;
};

// Legacy function for backward compatibility
export const toBngGridTime = (
    phaseStart: number,
    phaseDuration: number,
    phaseSteps: number,
    outIdx: number
): number => {
    // For outIdx 0, return phase start
    if (outIdx === 0) {
        return quantizeBngPrintedTime(phaseStart);
    }
    // Use accumulation for non-zero indices
    const dtOut = phaseDuration / phaseSteps;
    let t_accum = phaseStart;
    for (let i = 0; i < outIdx; i++) {
        t_accum += dtOut;
    }
    return quantizeBngPrintedTime(t_accum);
};

export const formatSpeciesList = (list: string[]) => (list.length > 0 ? list.join(' + ') : '0');
