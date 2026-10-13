// Capped doubling game. Flip a fair coin until the first tails, at most MAXF flips. If the first tails is on flip k
// you win $2^k; if all MAXF flips are heads you win nothing.
// Each k = 1..MAXF contributes 2^k * (1/2)^k = $1 to the average, so the exact fair price is $MAXF = $20.
// Game g uses the stream mulberry32(SEED0 + g).

import { mulberry32 } from "@/kit/random";

export const MAXF = 20;
export const SEED0 = 2500;
export const PRICES = [2, 10, 20] as const;

export function payout(g: number, seed0 = SEED0): number {
  const r = mulberry32(seed0 + g);
  for (let k = 1; k <= MAXF; k++) if (r() < 0.5) return 2 ** k;
  return 0;
}

/** Exact average payout, summing 2^k (1/2)^k over k = 1..MAXF. */
export function fairPrice() {
  let ev = 0;
  for (let k = 1; k <= MAXF; k++) ev += 2 ** k * 0.5 ** k;
  return ev;
}
/** Exact chance a play pays $4 or less (first tails on flip 1 or 2). */
export const pSmall = () => 0.5 + 0.25;

const cache: number[] = [];
export function payouts(n: number): number[] {
  while (cache.length < n) cache.push(payout(cache.length));
  return cache.slice(0, n);
}

export interface Summary {
  avg: number;
  median: number;
  biggest: number;
  total: number;
}
export function summary(n: number, p = payouts(n)): Summary {
  const total = p.reduce((a, b) => a + b, 0);
  const sorted = [...p].sort((a, b) => a - b);
  return { avg: n ? total / n : 0, median: n ? sorted[Math.floor(n / 2)] : 0, biggest: n ? Math.max(...p) : 0, total };
}
/** Running average after each game, for the chart. */
export function running(p: number[]): number[] {
  const out: number[] = [];
  let t = 0;
  p.forEach((v, i) => {
    t += v;
    out.push(t / (i + 1));
  });
  return out;
}
