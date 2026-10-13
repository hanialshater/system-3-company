// Statistical power for a coin that is secretly 60% heads, tested against a fair coin at the 5% level.
// Rule: declare "biased" only if heads >= bar(n), where bar(n) is the smallest count c with
// P(Bin(n, 0.5) >= c) <= 0.05. For n = 50 that is 32; for n = 200 it is 113.
// Experiment i flips the coin n times with the stream mulberry32(SEED0 + i); the 200-flip run extends the 50-flip run.

import { mulberry32 } from "@/kit/random";

export const P_TRUE = 0.6;
export const SHORT = 50;
export const LONG = 200;
export const RUNS = 100;
export const SEED0 = 7000;

const LG: number[] = [0, 0];
for (let i = 2; i <= 400; i++) LG[i] = LG[i - 1] + Math.log(i);
const lg = (n: number) => LG[n];
const pmf = (n: number, k: number, p: number) => Math.exp(lg(n) - lg(k) - lg(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
export const tail = (n: number, c: number, p: number) => {
  let s = 0;
  for (let k = c; k <= n; k++) s += pmf(n, k, p);
  return s;
};

/** Smallest head count that a fair coin reaches at most 5% of the time. */
const barCache = new Map<number, number>();
export function bar(n: number) {
  const hit = barCache.get(n);
  if (hit !== undefined) return hit;
  let c = 0;
  while (tail(n, c, 0.5) > 0.05) c++;
  barCache.set(n, c);
  return c;
}
/** Exact chance the biased coin reaches the bar (the test's power). */
export const power = (n: number) => tail(n, bar(n), P_TRUE);
/** Exact chance a fair coin reaches the bar (false alarm rate). */
export const falseAlarm = (n: number) => tail(n, bar(n), 0.5);

/** Head counts of the first `runs` experiments with n flips each. */
export function experiments(n: number, runs = RUNS, seed0 = SEED0): number[] {
  const out: number[] = [];
  for (let i = 0; i < runs; i++) {
    const r = mulberry32(seed0 + i);
    let h = 0;
    for (let f = 0; f < n; f++) if (r() < P_TRUE) h++;
    out.push(h);
  }
  return out;
}
export const caught = (counts: number[], n: number) => counts.filter((h) => h >= bar(n)).length;
