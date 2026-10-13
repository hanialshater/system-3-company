// What "95%" belongs to. True support is exactly 50%. Each pollster asks n = 1,000 random people and
// reports the usual 95% interval: share +/- 1.96 x sqrt(share x (1 - share) / n). Over many polls about
// 5% of the intervals miss 50%; the exact miss chance is a binomial sum.

import { mulberry32 } from "@/kit/random";

export const N = 1000;
export const TRUTH = 0.5;
export const PER_BATCH = 100;
export const MAX_BATCHES = 10;
export const SEED = 1937; // untuned: the first seed tried (Neyman's confidence-interval paper)

export type Interval = { share: number; lo: number; hi: number; miss: boolean };

export function interval(yes: number, n = N): Interval {
  const p = yes / n;
  const half = 1.96 * Math.sqrt((p * (1 - p)) / n);
  const lo = p - half;
  const hi = p + half;
  return { share: p, lo, hi, miss: TRUTH < lo || TRUTH > hi };
}

/** All seeded intervals, batch after batch. */
export function intervals(seed = SEED, count = PER_BATCH * MAX_BATCHES, n = N): Interval[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, () => {
    let yes = 0;
    for (let i = 0; i < n; i++) if (rnd() < TRUTH) yes++;
    return interval(yes, n);
  });
}

function logChoose(n: number, k: number) {
  let s = 0;
  for (let i = 1; i <= k; i++) s += Math.log(n - k + i) - Math.log(i);
  return s;
}

/** Exact chance that one interval misses the truth: sum of Bin(n, 1/2) over counts whose interval misses. */
export function exactMiss(n = N) {
  let t = 0;
  for (let k = 0; k <= n; k++) if (interval(k, n).miss) t += Math.exp(logChoose(n, k) - n * Math.LN2);
  return t;
}
