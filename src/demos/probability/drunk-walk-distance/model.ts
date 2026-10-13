// Random walk: each step is 1 m left or right on a fair coin. 30 seeded walkers.
// Spread grows like sqrt(steps): SD = sqrt(n), mean distance about sqrt(2n / pi).
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export const WALKERS = 30;
export const MAX_STEPS = 1000;
export const STEPS = [10, 100, 1000];

/** pos[w][n] = position of walker w after n steps */
export function walkers(batch = 0, seed = 1921): Int16Array[] {
  const rnd = mulberry32(seed + batch * 104729);
  return Array.from({ length: WALKERS }, () => {
    const p = new Int16Array(MAX_STEPS + 1);
    for (let i = 1; i <= MAX_STEPS; i++) p[i] = p[i - 1] + (rnd() < 0.5 ? 1 : -1);
    return p;
  });
}

export function spread(all: Int16Array[], n: number) {
  const d = all.map((p) => Math.abs(p[n]));
  return {
    meanDist: d.reduce((a, b) => a + b, 0) / d.length,
    rms: Math.sqrt(d.reduce((a, b) => a + b * b, 0) / d.length),
    max: Math.max(...d),
  };
}

/** Exact E|S_n| for a simple random walk, from the binomial distribution. */
export function exactMeanDist(n: number) {
  let lnC = 0;
  let total = 0;
  for (let k = 0; k <= n; k++) {
    if (k > 0) lnC += Math.log(n - k + 1) - Math.log(k);
    total += Math.exp(lnC - n * Math.LN2) * Math.abs(2 * k - n);
  }
  return total;
}
