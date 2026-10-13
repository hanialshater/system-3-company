// Geometric waiting. 1,000 seeded players each roll a fair die until their first six. The mean wait
// is 1/p = 6 rolls, but the histogram is tall on the left with a long right tail: P(more than 6 rolls)
// = (5/6)^6 = 33.5%, and half the players are done by roll 4 (P(within 4) = 1 - (5/6)^4 = 51.8%).

import { mulberry32, randInt } from "@/kit/random";

export const PLAYERS = 1000;
export const SEED = 6; // untuned: the first seed tried
export const MEAN = 6;
export const CAP = 25; // histogram shows 1..25; longer waits are pooled in the last bar

export function waits(seed = SEED, n = PLAYERS): number[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, () => {
    let k = 1;
    while (randInt(rnd, 1, 6) !== 6) k++;
    return k;
  });
}

export const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
export const moreThan = (xs: number[], k: number) => xs.filter((x) => x > k).length;
/** Exact P(more than k rolls). */
export const exactMoreThan = (k: number) => (5 / 6) ** k;
/** Smallest k by which at least half the players are done. */
export function halfDoneBy(xs: number[]): number {
  for (let k = 1; ; k++) if (xs.length - moreThan(xs, k) >= xs.length / 2) return k;
}
export function histogram(xs: number[]): number[] {
  const h = Array.from({ length: CAP }, () => 0);
  for (const x of xs) h[Math.min(x, CAP) - 1]++;
  return h;
}
