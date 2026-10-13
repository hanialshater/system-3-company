// Central limit. A lopsided die: five faces show 1, one face shows 6 (mean 11/6 = 1.83, SD 1.863).
// For each group size n, 2,000 seeded groups of n rolls are averaged. The average of n rolls is
// 1 + 5S/n where S = number of sixes, so the histogram has n + 1 possible bars. At n = 1 it is two
// spikes; by n = 30 it is a hump around 1.83 (still slightly lopsided).

import { mulberry32, randInt } from "@/kit/random";

export const GROUPS = 2000;
export const SIZES: readonly number[] = [1, 2, 5, 10, 30];
export const SEED = 1833; // untuned: the first seed tried (one stream per size: SEED + n)
export const MEAN = 11 / 6;
export const SD = Math.sqrt(1 / 6 * 25 * 5 / 6); // sqrt(p(1-p)) x 5 = 1.863

/** Histogram over S = 0..n sixes for GROUPS groups of n rolls; also the group averages. */
export function run(n: number, seed = SEED + n) {
  const rnd = mulberry32(seed);
  const counts = Array.from({ length: n + 1 }, () => 0);
  const avgs: number[] = [];
  for (let g = 0; g < GROUPS; g++) {
    let sixes = 0;
    for (let r = 0; r < n; r++) if (randInt(rnd, 1, 6) === 6) sixes++;
    counts[sixes]++;
    avgs.push(1 + (5 * sixes) / n);
  }
  return { counts, avgs };
}

export const valueOf = (n: number, sixes: number) => 1 + (5 * sixes) / n;
export const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
export function skew(xs: number[]): number {
  const m = mean(xs);
  const v = mean(xs.map((x) => (x - m) ** 2));
  return mean(xs.map((x) => (x - m) ** 3)) / v ** 1.5;
}
