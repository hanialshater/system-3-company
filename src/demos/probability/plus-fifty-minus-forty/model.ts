// Multiplicative bets: each round a fair coin multiplies your money by 1.5 (heads) or 0.6 (tails).
// The average round gains 5%, but the typical player shrinks by the geometric mean, sqrt(0.9).
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export const UP = 1.5;
export const DOWN = 0.6;
export const ROUNDS = 100;
export const PLAYERS = 50;
export const START = 100;

export const meanFactor = (UP + DOWN) / 2; // 1.05
export const typicalFactor = Math.sqrt(UP * DOWN); // 0.949
/** Expected wealth after t rounds (the average over all possible players). */
export const expected = (t: number) => START * meanFactor ** t;
/** Median wealth after an even number of rounds: half heads, half tails. */
export const medianAt = (t: number) => START * (UP * DOWN) ** (t / 2);

/** Fewest heads in 100 rounds that leave you above the start. */
export function headsToGain(): number {
  for (let k = 0; k <= ROUNDS; k++) if (UP ** k * DOWN ** (ROUNDS - k) > 1) return k;
  return ROUNDS + 1;
}

/** Exact P(Bin(100, 0.5) >= k) */
export function pAtLeast(k: number) {
  let lnC = 0;
  let total = 0;
  for (let h = 0; h <= ROUNDS; h++) {
    if (h > 0) lnC += Math.log(ROUNDS - h + 1) - Math.log(h);
    if (h >= k) total += Math.exp(lnC - ROUNDS * Math.LN2);
  }
  return total;
}

/** 50 seeded players' wealth after 0..100 rounds. */
export function paths(batch = 0, seed = 1505): number[][] {
  const rnd = mulberry32(seed + batch * 7717);
  return Array.from({ length: PLAYERS }, () => {
    const p = [START];
    for (let i = 0; i < ROUNDS; i++) p.push(p[i] * (rnd() < 0.5 ? UP : DOWN));
    return p;
  });
}

export function stats(all: number[][], t: number) {
  const v = all.map((p) => p[t]).sort((a, b) => a - b);
  const mid = v.length / 2;
  const median = (v[mid - 1] + v[mid]) / 2;
  const mean = v.reduce((a, b) => a + b, 0) / v.length;
  return { median, mean, above: v.filter((x) => x > START).length };
}
