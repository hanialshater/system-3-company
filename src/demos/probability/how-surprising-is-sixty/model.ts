// p-values by counting. A batch is 100 flips of a fair coin; the stage fills a histogram of head
// counts from seeded batches and shades the batches at or past a marker. The shaded share estimates
// P(X >= marker) for X ~ Binomial(100, 1/2), which is exactly computable.

import { mulberry32 } from "@/kit/random";

export const FLIPS = 100;
export const STEP = 250; // batches per press
export const MAX_BATCHES = 1000;
export const MARK = 60; // the question's threshold
export const SEED = 100; // untuned: the first seed tried

/** Head counts of `count` seeded 100-flip batches (the same prefix whatever count is asked for). */
export function batches(seed = SEED, count = MAX_BATCHES): number[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, () => {
    let h = 0;
    for (let i = 0; i < FLIPS; i++) if (rnd() < 0.5) h++;
    return h;
  });
}

export function tail(heads: readonly number[], n: number, mark: number) {
  let k = 0;
  for (let i = 0; i < n; i++) if (heads[i] >= mark) k++;
  return k;
}

function choose(n: number, k: number) {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
}

/** Exact P(X >= mark), X ~ Binomial(FLIPS, 1/2). */
export function exactTail(mark: number, n = FLIPS) {
  let t = 0;
  for (let k = mark; k <= n; k++) t += choose(n, k) / 2 ** n;
  return t;
}
