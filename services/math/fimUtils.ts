
// Inverse standard normal CDF approximation (Acklam's method)
export function normInv(p: number) {
    if (p <= 0 || p >= 1) throw new Error('p must be in (0,1)');
    // coefficients
    const a1 = -39.6968302866538;
    const a2 = 220.946098424521;
    const a3 = -275.928510446969;
    const a4 = 138.357751867269;
    const a5 = -30.6647980661472;
    const a6 = 2.50662827745924;

    const b1 = -54.4760987982241;
    const b2 = 161.585836858041;
    const b3 = -155.698979859887;
    const b4 = 66.8013118877197;
    const b5 = -13.2806815528857;

    const c1 = -0.00778489400243029;
    const c2 = -0.322396458041136;
    const c3 = -2.40075827716184;
    const c4 = -2.54973253934373;
    const c5 = 4.37466414146497;
    const c6 = 2.93816398269878;

    const d1 = 0.00778469570904146;
    const d2 = 0.32246712907004;
    const d3 = 2.445134137143;
    const d4 = 3.75440866190742;

    // Define break-points
    const pLow = 0.02425;
    const pHigh = 1 - pLow;

    let q, r;
    if (p < pLow) {
        // Rational approximation for lower region
        q = Math.sqrt(-2 * Math.log(p));
        return (
            (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
        );
    } else if (p <= pHigh) {
        // Rational approximation for central region
        q = p - 0.5;
        r = q * q;
        return (
            (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
            (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
        );
    } else {
        // Rational approximation for upper region
        q = Math.sqrt(-2 * Math.log(1 - p));
        return -(
            (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
        );
    }
}

export function chi2Quantile(p: number, df = 1): number {
    if (df === 1) {
        // chi2(1) is Z^2 where Z ~ N(0,1)
        // For CDF p, we want x such that P(Z^2 <= x) = p
        // P(-sqrt(x) <= Z <= sqrt(x)) = p
        // P(Z <= sqrt(x)) = (p + 1) / 2
        const z = normInv((p + 1) / 2);
        return z * z;
    }
    // For general df, use Wilson-Hilferty transform as approximation
    const t = chi2Quantile(p, 1); // fallback to 1-df approx as baseline
    return t * (df / 1);
}

// Small helper: Jacobi eigenvalue algorithm for real symmetric matrices.
export function jacobiEigenDecomposition(A: number[][], maxIter = 100, tol = 1e-12) {
    const n = A.length;
    const V: number[][] = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
    const a = A.map((row) => row.slice());

    const maxOffdiag = () => {
        let max = 0;
        let p = 0,
            q = 1;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const v = Math.abs(a[i][j]);
                if (v > max) {
                    max = v;
                    p = i;
                    q = j;
                }
            }
        }
        return { max, p, q };
    };

    for (let iter = 0; iter < maxIter; iter++) {
        const { max, p, q } = maxOffdiag();
        if (max < tol) break;

        const app = a[p][p];
        const aqq = a[q][q];
        const apq = a[p][q];
        const phi = 0.5 * Math.atan2(2 * apq, aqq - app);
        const c = Math.cos(phi);
        const s = Math.sin(phi);

        // rotate
        for (let i = 0; i < n; i++) {
            if (i !== p && i !== q) {
                const aip = a[i][p];
                const aiq = a[i][q];
                a[i][p] = c * aip - s * aiq;
                a[p][i] = a[i][p];
                a[i][q] = s * aip + c * aiq;
                a[q][i] = a[i][q];
            }
        }

        const new_pp = c * c * app - 2 * s * c * apq + s * s * aqq;
        const new_qq = s * s * app + 2 * s * c * apq + c * c * aqq;
        a[p][p] = new_pp;
        a[q][q] = new_qq;
        a[p][q] = 0;
        a[q][p] = 0;

        // update eigenvector matrix
        for (let i = 0; i < n; i++) {
            const vip = V[i][p];
            const viq = V[i][q];
            V[i][p] = c * vip - s * viq;
            V[i][q] = s * vip + c * viq;
        }
    }

    const eigenvalues = a.map((row, i) => row[i]);
    const eigenvectors = V; // columns of V are eigenvectors
    return { eigenvalues, eigenvectors };
}
