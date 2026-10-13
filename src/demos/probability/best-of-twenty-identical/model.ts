// Winner's curse. 20 identical fair coins are each flipped 20 times; the coin with the most heads
// "wins" (first one on ties). Its count is inflated by luck: E[max of 20 Bin(20, 1/2)] = 14.1, while
// flipping the winner again gives 10 on average.

import { mulberry32 } from "@/kit/random";

export const COINS = 20;
export const FLIPS = 20;
export const MORE = 100;
export const SEED = 314; // untuned: the first seed tried

export interface Contest {
  counts: number[];
  winner: number;
  again: number;
}

const count = (rnd: () => number) => {
  let h = 0;
  for (let i = 0; i < FLIPS; i++) if (rnd() < 0.5) h++;
  return h;
};

/** 1 + MORE seeded contests; each with the winner's re-flip. */
export function contests(seed = SEED, k = 1 + MORE): Contest[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: k }, () => {
    const counts = Array.from({ length: COINS }, () => count(rnd));
    const winner = counts.indexOf(Math.max(...counts));
    return { counts, winner, again: count(rnd) };
  });
}

export const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

/** Exact E[max of COINS independent Bin(FLIPS, 1/2)]. */
export function exactMax(): number {
  const pmf = Array.from({ length: FLIPS + 1 }, (_, k) => {
    let c = 1;
    for (let i = 1; i <= k; i++) c = (c * (FLIPS - k + i)) / i;
    return c / 2 ** FLIPS;
  });
  let cdf = 0;
  let prev = 0;
  let e = 0;
  for (let k = 0; k <= FLIPS; k++) {
    cdf += pmf[k];
    const now = cdf ** COINS;
    e += k * (now - prev);
    prev = now;
  }
  return e;
}
