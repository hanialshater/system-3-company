// Engine for schelling-on-new-york. Pure, no React, no imports, so it runs in plain node
// (`node check.mjs`, Node >= 22.18) as well as in the lesson.
//
// The rule is the one in src/demos/economics/mild-preferences-sharp-divides/abm.ts and in the
// brief's check script company/domains/briefs/checks/schelling-nyc-check.mjs, with one addition:
// cells outside the city mask are walls (not agents, not empty, not neighbours).
//   - N x N grid, no wrap. Land cells come from MASK_HEX.
//   - 10% of land cells empty (rounded); the rest split equally into groups 1 and 2, placed by a
//     seeded Fisher-Yates shuffle (mulberry32, copied verbatim from abm.ts).
//   - Neighbours: the 8 surrounding cells that hold an agent. An agent would move if
//     like * 100 < pct * occupied; an agent with no neighbours stays.
//   - Each tick: list every agent that would move at the start of the tick, shuffle that list
//     (same RNG), move each in turn to a uniformly random empty land cell (the cell it leaves
//     becomes empty after it has chosen). Stop when nobody would move, or at CAP ticks.
// check.mjs (next to this file) shows: with an all-land mask the frames equal abm.ts run(); on
// the real mask the frames equal the brief's check script for seeds 1 to 50.

export const N = 40;
export const EMPTY = 0.1;
export const CAP = 60;
export const WALL = 3;

/** City mask, 40 x 40, row-major, 1 bit per cell, most significant bit first in each hex digit.
 * Rasterised from NYC Department of City Planning, Borough Boundaries (BYTES of the BIG APPLE 16A,
 * 2016) by company/domains/briefs/checks/nyc-mask-rasterise.mjs; see nyc-mask-40.md there.
 * Shape only: no region labels are carried into the lesson. 576 land cells. */
export const MASK_HEX =
  "00000040000000007400000000fe00000000ffc0000001ffc0000001ff80000003ff40000003ff00000003ff00000007ff80000007f20000000fa5a000001fc7e000001fd7e800003ff3fe00003fffff000037ffff000037ffff000037fffc000077fffc00005ffffc00007ffffc00007ffffc00001ffffc00007ffffc00087fddf80ff8fff6780ff9ffc1000ffcffd3c00ffeff05380ffc3fe2f80ff83fa1001ff8380c001ff000a0007fe00180007f000000007e800000007c00000000e0000000008000000000";

/** 1 = land, 0 = outside the city. */
export function maskFromHex(hex: string, n = N): Uint8Array {
  const m = new Uint8Array(n * n);
  for (let i = 0; i < n * n; i++) {
    const nib = parseInt(hex[i >> 2], 16);
    m[i] = (nib >> (3 - (i & 3))) & 1;
  }
  return m;
}

export const MASK = maskFromHex(MASK_HEX);

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(a: T[], r: () => number) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/** cells[i]: 0 empty land, 1 or 2 group, WALL outside the city. Row-major, i = y * n + x. */
export type Cells = Uint8Array;

const isAgent = (v: number) => v === 1 || v === 2;

/** Like and occupied neighbour counts of cell i (8 around, no wrap, walls ignored). */
export function neighbours(c: Cells, n: number, i: number): [number, number] {
  const x = i % n;
  const y = (i - x) / n;
  let like = 0;
  let occ = 0;
  for (let dy = -1; dy <= 1; dy++) {
    const yy = y + dy;
    if (yy < 0 || yy >= n) continue;
    for (let dx = -1; dx <= 1; dx++) {
      const xx = x + dx;
      if ((dx === 0 && dy === 0) || xx < 0 || xx >= n) continue;
      const v = c[yy * n + xx];
      if (isAgent(v)) {
        occ++;
        if (v === c[i]) like++;
      }
    }
  }
  return [like, occ];
}

/** Agents that would move: like * 100 < pct * occupied (integer percent, no float edge cases). */
export function wouldMove(c: Cells, n: number, pct: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < c.length; i++) {
    if (!isAgent(c[i])) continue;
    const [like, occ] = neighbours(c, n, i);
    if (occ > 0 && like * 100 < pct * occ) out.push(i);
  }
  return out;
}

/** Mean like share over agents with at least one neighbour (0..1). */
export function likeShare(c: Cells, n: number): number {
  let sum = 0;
  let k = 0;
  for (let i = 0; i < c.length; i++) {
    if (!isAgent(c[i])) continue;
    const [like, occ] = neighbours(c, n, i);
    if (occ > 0) {
      sum += like / occ;
      k++;
    }
  }
  return k ? sum / k : 0;
}

/** Equal groups on the land cells, the rest empty, by one seeded shuffle. */
export function place(r: () => number, mask: Uint8Array, empty = EMPTY): Cells {
  const land: number[] = [];
  for (let i = 0; i < mask.length; i++) if (mask[i]) land.push(i);
  const n = land.length;
  const e = Math.round(n * empty);
  const occ = n - e;
  const n1 = Math.round(occ * 0.5);
  const a: number[] = [];
  for (let i = 0; i < n; i++) a.push(i < n1 ? 1 : i < occ ? 2 : 0);
  shuffle(a, r);
  const c = new Uint8Array(mask.length).fill(WALL);
  land.forEach((ci, k) => (c[ci] = a[k]));
  return c;
}

/** One tick in place; returns how many agents moved. */
export function tick(c: Cells, n: number, pct: number, r: () => number): number {
  const movers = shuffle(wouldMove(c, n, pct), r);
  const empties: number[] = [];
  for (let i = 0; i < c.length; i++) if (c[i] === 0) empties.push(i);
  for (const from of movers) {
    const k = Math.floor(r() * empties.length);
    const to = empties[k];
    c[to] = c[from];
    c[from] = 0;
    empties[k] = from;
  }
  return movers.length;
}

/** Index of dissimilarity on aligned k x k blocks: 0.5 * sum |a_i/A - b_i/B|. Walls and empty
 * cells are ignored, so a block counts only the agents in it. */
export function dissimilarity(c: Cells, n: number, k: number): number {
  const nb = Math.ceil(n / k);
  const A = new Float64Array(nb * nb);
  const B = new Float64Array(nb * nb);
  let a = 0;
  let b = 0;
  for (let i = 0; i < c.length; i++) {
    const v = c[i];
    if (!isAgent(v)) continue;
    const x = i % n;
    const y = (i - x) / n;
    const q = Math.floor(y / k) * nb + Math.floor(x / k);
    if (v === 1) {
      A[q]++;
      a++;
    } else {
      B[q]++;
      b++;
    }
  }
  let s = 0;
  for (let q = 0; q < A.length; q++) s += Math.abs(A[q] / a - B[q] / b);
  return s / 2;
}

/** Aligned k x k boxes that hold at least one agent (`held`), and the indices of those that hold
 * only one group (`one`, row-major over ceil(n / k) boxes per side). A box with one agent counts
 * as one-group. Used by the stage's one-group outlines and readout and by check.mjs (c17). */
export function oneGroupBoxes(c: Cells, n: number, k: number): { one: number[]; held: number; nb: number } {
  const nb = Math.ceil(n / k);
  const A = new Int32Array(nb * nb);
  const B = new Int32Array(nb * nb);
  for (let i = 0; i < c.length; i++) {
    const v = c[i];
    if (!isAgent(v)) continue;
    const x = i % n;
    const q = Math.floor((i - x) / n / k) * nb + Math.floor(x / k);
    if (v === 1) A[q]++;
    else B[q]++;
  }
  const one: number[] = [];
  let held = 0;
  for (let q = 0; q < A.length; q++) {
    if (A[q] + B[q] === 0) continue;
    held++;
    if (A[q] === 0 || B[q] === 0) one.push(q);
  }
  return { one, held, nb };
}

export interface Run {
  seed: number;
  pct: number;
  /** frames[t] is the world after t ticks; frames[0] is the random start. */
  frames: Cells[];
  /** movers[t]: agents that would move at frames[t] */
  movers: number[];
  agents: number;
  settled: boolean;
}

/** Run one seeded world until nobody would move, or to `cap` ticks. Same seed = same start. */
export function run(seed: number, pct: number, mask: Uint8Array = MASK, n = N, cap = CAP, empty = EMPTY): Run {
  const r = mulberry32(seed);
  const c = place(r, mask, empty);
  const frames = [c.slice()];
  const movers = [wouldMove(c, n, pct).length];
  while (movers[movers.length - 1] > 0 && frames.length <= cap) {
    tick(c, n, pct, r);
    frames.push(c.slice());
    movers.push(wouldMove(c, n, pct).length);
  }
  let agents = 0;
  for (const v of c) if (isAgent(v)) agents++;
  return { seed, pct, frames, movers, agents, settled: movers[movers.length - 1] === 0 };
}
