// A tiny agent-based engine for a Schelling-style grid world. Pure, no React, no imports, so it
// runs in plain node (`node abm.ts`, Node >= 22.18) and can be lifted to src/kit/abm after the
// second ABM lesson (rule of two, design-lead decisions 2026-10-13 §1.10).
//
// The rule (identical on the card, in meta.json and in the fact-check):
// SIZE x SIZE grid, no wrap; EMPTY share of cells empty; the rest split equally into groups 1 and 2,
// placed by a seeded Fisher-Yates shuffle (mulberry32). Neighbours: the 8 surrounding cells that
// hold an agent. An agent is unhappy if (like / occupied) < threshold; an agent with no neighbours
// is happy. Each tick: list every unhappy agent at the start of the tick, shuffle that list (same
// RNG), and move each in turn to a uniformly random empty cell (the cell it leaves becomes empty
// after it has chosen). Metric: like share = mean over agents with >= 1 neighbour of like/occupied.
// A run settles when nobody is unhappy; it stops at CAP ticks otherwise.
//
// Cascade bookkeeping (does not touch the RNG, so runs are unchanged): an agent that is unhappy
// after a tick and did not move in it was happy before the tick (every unhappy agent moves), so a
// move by someone else unsettled it. run() lists those cells per frame and counts the distinct
// agents that were happy at tick 0 and became unhappy later.

export const SIZE = 40;
export const EMPTY = 0.1;
export const CAP = 60;

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

/** cells[i] is 0 (empty), 1 or 2 (group). Row-major, i = y * size + x. */
export type Cells = Uint8Array;

/** Like and occupied neighbour counts of cell i (8 around, no wrap). */
export function neighbours(c: Cells, size: number, i: number): [number, number] {
  const x = i % size;
  const y = (i - x) / size;
  let like = 0;
  let occ = 0;
  for (let dy = -1; dy <= 1; dy++) {
    const yy = y + dy;
    if (yy < 0 || yy >= size) continue;
    for (let dx = -1; dx <= 1; dx++) {
      const xx = x + dx;
      if ((dx === 0 && dy === 0) || xx < 0 || xx >= size) continue;
      const v = c[yy * size + xx];
      if (v) {
        occ++;
        if (v === c[i]) like++;
      }
    }
  }
  return [like, occ];
}

/** Integer percent threshold avoids float edge cases: unhappy iff like * 100 < pct * occupied. */
export function unhappy(c: Cells, size: number, pct: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < c.length; i++) {
    if (!c[i]) continue;
    const [like, occ] = neighbours(c, size, i);
    if (occ > 0 && like * 100 < pct * occ) out.push(i);
  }
  return out;
}

/** Share of agents with >= 1 neighbour whose occupied neighbours are all like them (0..1). */
export function allLikeShare(c: Cells, size: number): number {
  let all = 0;
  let n = 0;
  for (let i = 0; i < c.length; i++) {
    if (!c[i]) continue;
    const [like, occ] = neighbours(c, size, i);
    if (occ > 0) {
      n++;
      if (like === occ) all++;
    }
  }
  return n ? all / n : 0;
}

/** Mean like share over agents with at least one neighbour (0..1). */
export function likeShare(c: Cells, size: number): number {
  let sum = 0;
  let n = 0;
  for (let i = 0; i < c.length; i++) {
    if (!c[i]) continue;
    const [like, occ] = neighbours(c, size, i);
    if (occ > 0) {
      sum += like / occ;
      n++;
    }
  }
  return n ? sum / n : 0;
}

export function place(r: () => number, size = SIZE, empty = EMPTY): Cells {
  const n = size * size;
  const e = Math.round(n * empty);
  const half = (n - e) / 2;
  const a: number[] = [];
  for (let i = 0; i < n; i++) a.push(i < half ? 1 : i < 2 * half ? 2 : 0);
  return Uint8Array.from(shuffle(a, r));
}

/** One tick in place; returns how many agents moved. Optional `ids` (agent id per cell, 0 = empty)
 * move with their agents; optional `landed` collects the cells movers arrived in. */
export function tick(c: Cells, size: number, pct: number, r: () => number, ids?: Int32Array, landed?: number[]): number {
  const movers = shuffle(unhappy(c, size, pct), r);
  const empties: number[] = [];
  for (let i = 0; i < c.length; i++) if (!c[i]) empties.push(i);
  for (const from of movers) {
    const k = Math.floor(r() * empties.length);
    const to = empties[k];
    c[to] = c[from];
    c[from] = 0;
    empties[k] = from;
    if (ids) {
      ids[to] = ids[from];
      ids[from] = 0;
    }
    landed?.push(to);
  }
  return movers.length;
}

export interface Run {
  seed: number;
  pct: number;
  /** frames[t] is the world after t ticks; frames[0] is the starting mix. */
  frames: Cells[];
  /** like[t], 0..1 */
  like: number[];
  /** unhappy agents at frames[t] */
  sad: number[];
  /** allLike[t]: share of agents whose neighbours are all like them, 0..1 */
  allLike: number[];
  /** unsettled[t]: cells of agents unhappy at frames[t] that did not move in tick t (happy before it) */
  unsettled: number[][];
  /** distinct agents happy at tick 0 that became unhappy at some later frame */
  cascade: number;
  agents: number;
  settled: boolean;
}

/** Run one seeded world to settle (nobody unhappy) or to `cap` ticks. Same seed = same start mix. */
export function run(seed: number, pct: number, cap = CAP, size = SIZE, empty = EMPTY): Run {
  const r = mulberry32(seed);
  const c = place(r, size, empty);
  const frames = [c.slice()];
  const like = [likeShare(c, size)];
  const ids = Int32Array.from(c, (v, i) => (v ? i + 1 : 0));
  const sad0 = unhappy(c, size, pct);
  const sad = [sad0.length];
  const allLike = [allLikeShare(c, size)];
  const unsettled: number[][] = [[]];
  const content0 = new Set<number>();
  for (let i = 0; i < c.length; i++) if (c[i]) content0.add(ids[i]);
  for (const i of sad0) content0.delete(ids[i]);
  const hit = new Set<number>();
  while (sad[sad.length - 1] > 0 && frames.length <= cap) {
    const landed: number[] = [];
    tick(c, size, pct, r, ids, landed);
    const arrived = new Set(landed);
    const now = unhappy(c, size, pct);
    frames.push(c.slice());
    like.push(likeShare(c, size));
    sad.push(now.length);
    allLike.push(allLikeShare(c, size));
    unsettled.push(now.filter((i) => !arrived.has(i)));
    for (const i of now) if (content0.has(ids[i])) hit.add(ids[i]);
  }
  return {
    seed, pct, frames, like, sad, allLike, unsettled,
    cascade: hit.size,
    agents: ids.filter((v) => v > 0).length,
    settled: sad[sad.length - 1] === 0,
  };
}
