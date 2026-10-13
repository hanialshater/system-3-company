// The stake that grows money fastest (Kelly). A coin lands heads 60% of the time and pays even money.
// Each round a player stakes a fixed share f of their money. 31 seeded players share the same coin
// outcomes for every f (only the stake changes). After 100 rounds a player with H heads holds
// (1+f)^H (1-f)^(100-H) times their start, so the middle player (16th of 31 by heads) is the same
// person at every stake. Typical growth per round g(f) = 0.6 ln(1+f) + 0.4 ln(1-f) peaks at f = 0.2.

import { mulberry32 } from "@/kit/random";

export const P_HEADS = 0.6;
export const ROUNDS = 100;
export const PLAYERS = 31;
export const SEED = 2; // CHOSEN: the first seed whose middle player has 60 heads (the median over seeds); seed 60, tried first, gave 57
export const STAKES: readonly number[] = [0.05, 0.1, 0.2, 0.4, 0.6];
export const BEST = Math.round((2 * P_HEADS - 1) * 100) / 100; // 0.2 (rounded: 2 x 0.6 - 1 is 0.19999999999999996 in floats)

/** Seeded coin outcomes: PLAYERS rows of ROUNDS booleans (true = heads). */
export function flips(seed = SEED): boolean[][] {
  const rnd = mulberry32(seed);
  return Array.from({ length: PLAYERS }, () => Array.from({ length: ROUNDS }, () => rnd() < P_HEADS));
}

/** Money path (multiple of the start) for one player at stake f. */
export function path(row: boolean[], f: number): number[] {
  const out = [1];
  for (const h of row) out.push(out[out.length - 1] * (h ? 1 + f : 1 - f));
  return out;
}

export const heads = (row: boolean[]) => row.filter(Boolean).length;

/** Index of the middle player by heads count (ties broken by index). */
export function middle(fs: boolean[][]): number {
  const order = fs.map((r, i) => [heads(r), i] as const).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return order[(PLAYERS - 1) / 2][1];
}

/** Exact typical growth per round and typical multiple after ROUNDS. */
export const growth = (f: number) => P_HEADS * Math.log(1 + f) + (1 - P_HEADS) * Math.log(1 - f);
export const typical = (f: number) => Math.exp(ROUNDS * growth(f));
