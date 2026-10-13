// Peeking at a fair coin. Experiment i flips a fair coin FLIPS = 100 times (stream mulberry32(SEED0 + i)). After
// flip n the z-score is z_n = (heads - tails) / sqrt(n). "Looks biased" means |z_n| > 1.96 (the 5% level, using the
// normal approximation). Peeking = testing after every flip from flip 10 to 100 and stopping the first time it looks
// biased. Exact chance for a fair coin by dynamic programme over the walk: 0.2854 (peeking), 0.0569 (one look at 100).

import { mulberry32 } from "@/kit/random";

export const FLIPS = 100;
export const FIRST_LOOK = 10;
export const BAND = 1.96;
export const SEED0 = 6000;
export const SHOWN = 20;
export const TOTAL = 100;

export interface Walk {
  z: number[]; // z[n] for n = 0..FLIPS (z[0] = 0)
  firstCross: number; // first n >= FIRST_LOOK with |z| > BAND, or 0 if none
  endFlag: boolean;
}

export function walk(i: number, seed0 = SEED0): Walk {
  const r = mulberry32(seed0 + i);
  let d = 0;
  const z = [0];
  let firstCross = 0;
  for (let n = 1; n <= FLIPS; n++) {
    d += r() < 0.5 ? 1 : -1;
    const v = d / Math.sqrt(n);
    z.push(v);
    if (!firstCross && n >= FIRST_LOOK && Math.abs(v) > BAND) firstCross = n;
  }
  return { z, firstCross, endFlag: Math.abs(z[FLIPS]) > BAND };
}

const cache: Walk[] = [];
export function walks(n: number): Walk[] {
  while (cache.length < n) cache.push(walk(cache.length));
  return cache.slice(0, n);
}
export const countEvery = (ws: Walk[]) => ws.filter((w) => w.firstCross > 0).length;
export const countEnd = (ws: Walk[]) => ws.filter((w) => w.endFlag).length;

/** Exact false-alarm chances for a fair coin: [peeking from flip 10 to 100, single look at flip 100]. */
export function exact(): { peek: number; end: number } {
  let dist = new Map<number, number>([[0, 1]]);
  let hit = 0;
  for (let n = 1; n <= FLIPS; n++) {
    const next = new Map<number, number>();
    for (const [d, p] of dist) for (const s of [-1, 1]) next.set(d + s, (next.get(d + s) ?? 0) + p / 2);
    dist = next;
    if (n >= FIRST_LOOK) {
      for (const [d, p] of [...dist]) {
        if (Math.abs(d) / Math.sqrt(n) > BAND) {
          hit += p;
          dist.delete(d);
        }
      }
    }
  }
  let end = 0;
  let dd = new Map<number, number>([[0, 1]]);
  for (let n = 1; n <= FLIPS; n++) {
    const next = new Map<number, number>();
    for (const [d, p] of dd) for (const s of [-1, 1]) next.set(d + s, (next.get(d + s) ?? 0) + p / 2);
    dd = next;
  }
  for (const [d, p] of dd) if (Math.abs(d) / Math.sqrt(FLIPS) > BAND) end += p;
  return { peek: hit, end };
}
