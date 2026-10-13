// Two independent random walks of STEPS coin-flip steps (+1 or -1 each step). Pair i uses mulberry32(SEED0 + i),
// alternating draws for the two walks. r is Pearson's correlation between the two lines over the STEPS + 1 points.

import { mulberry32 } from "@/kit/random";

export const STEPS = 100;
export const SEED0 = 5000;
export const STRONG = 0.5;

export interface Pair {
  a: number[];
  b: number[];
  r: number;
}

export function corr(a: number[], b: number[]) {
  const n = a.length;
  const ma = a.reduce((x, y) => x + y, 0) / n;
  const mb = b.reduce((x, y) => x + y, 0) / n;
  let sab = 0;
  let saa = 0;
  let sbb = 0;
  for (let i = 0; i < n; i++) {
    sab += (a[i] - ma) * (b[i] - mb);
    saa += (a[i] - ma) ** 2;
    sbb += (b[i] - mb) ** 2;
  }
  return saa && sbb ? sab / Math.sqrt(saa * sbb) : 0;
}

export function pair(i: number, seed0 = SEED0): Pair {
  const r = mulberry32(seed0 + i);
  const a = [0];
  const b = [0];
  for (let s = 0; s < STEPS; s++) {
    a.push(a[s] + (r() < 0.5 ? 1 : -1));
    b.push(b[s] + (r() < 0.5 ? 1 : -1));
  }
  return { a, b, r: corr(a, b) };
}

const cache: Pair[] = [];
export function pairs(m: number): Pair[] {
  while (cache.length < m) cache.push(pair(cache.length));
  return cache.slice(0, m);
}

export const strongCount = (ps: Pair[]) => ps.filter((p) => Math.abs(p.r) > STRONG).length;
export function bestIndex(ps: Pair[]) {
  let b = 0;
  ps.forEach((p, i) => {
    if (Math.abs(p.r) > Math.abs(ps[b].r)) b = i;
  });
  return b;
}
/** Share of pairs with |r| > STRONG over `count` seeded pairs from seed0 (for the claim, not drawn on stage). */
export function strongShare(count: number, seed0: number) {
  let k = 0;
  for (let i = 0; i < count; i++) if (Math.abs(pair(i, seed0).r) > STRONG) k++;
  return k / count;
}
export const fmtR = (r: number) => (r >= 0 ? "+" : "-") + Math.abs(r).toFixed(2);
