// 40 dots land uniformly at random on a 10 x 10 grid of cells. A cell is "crowded" when it holds 3 or more dots.
// Batch i uses the stream mulberry32(SEED0 + i). Exact chance that a batch has a crowded cell comes from counting
// placements where every cell holds at most 2 dots (coefficient extraction, no simulation).

import { mulberry32 } from "@/kit/random";

export const DOTS = 40;
export const SIDE = 10;
export const CELLS = SIDE * SIDE;
export const CROWD = 3;
export const SEED0 = 9000;

export interface Batch {
  dots: { x: number; y: number }[];
  counts: number[];
  crowded: number;
}

export function batch(i: number, seed0 = SEED0): Batch {
  const r = mulberry32(seed0 + i);
  const dots: { x: number; y: number }[] = [];
  const counts = new Array(CELLS).fill(0);
  for (let d = 0; d < DOTS; d++) {
    const x = r();
    const y = r();
    dots.push({ x, y });
    counts[Math.floor(y * SIDE) * SIDE + Math.floor(x * SIDE)]++;
  }
  return { dots, counts, crowded: counts.filter((c) => c >= CROWD).length };
}

/** How many of the first m batches have at least one crowded cell. */
export function tally(m: number, seed0 = SEED0) {
  let k = 0;
  for (let i = 0; i < m; i++) if (batch(i, seed0).crowded > 0) k++;
  return k;
}

/** Exact P(some cell holds >= 3 of n dots) over `cells` cells. */
export function pCrowded(n = DOTS, cells = CELLS) {
  let lg = 0;
  for (let i = 2; i <= n; i++) lg += Math.log(i);
  let p = [1];
  for (let c = 0; c < cells; c++) {
    const q = new Array(Math.min(p.length + 2, n + 1)).fill(0);
    for (let i = 0; i < p.length; i++) {
      q[i] += p[i];
      if (i + 1 <= n) q[i + 1] += p[i];
      if (i + 2 <= n) q[i + 2] += p[i] / 2;
    }
    p = q;
  }
  return 1 - Math.exp(lg + Math.log(p[n]) - n * Math.log(cells));
}
