// Relative versus absolute risk. 1,000 people; a baseline risk of b in 1,000 means b of them get the
// condition. A pill that halves the risk leaves b/2 cases, so it spares b/2 people. The counts are exact
// arithmetic; the seed only decides where on the grid the affected people sit.

import { mulberry32 } from "@/kit/random";

export const PEOPLE = 1000;
export const COLS = 40;
export const BASELINES = [2, 20, 200] as const; // cases per 1,000 without the pill
export const LAYOUT_SEED = 2024; // layout only, untuned

/** Cases among PEOPLE at a risk of `perThousand` per 1,000, with or without the halving pill. */
export function cases(perThousand: number, pill: boolean) {
  const base = (PEOPLE * perThousand) / 1000;
  return pill ? base / 2 : base;
}

export function spared(perThousand: number) {
  return cases(perThousand, false) - cases(perThousand, true);
}

/** Order in which grid cells are picked to be affected (a seeded shuffle of 0..999). */
export function order(seed = LAYOUT_SEED): number[] {
  const rnd = mulberry32(seed);
  const a = Array.from({ length: PEOPLE }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type Fate = "fine" | "case" | "spared";

/** Fate of every person: the first `base` in the order would get it; with the pill the first half of those are spared. */
export function fates(perThousand: number, pill: boolean, ord = order()): Fate[] {
  const f: Fate[] = new Array(PEOPLE).fill("fine");
  const base = cases(perThousand, false);
  const sp = pill ? spared(perThousand) : 0;
  for (let k = 0; k < base; k++) f[ord[k]] = k < sp ? "spared" : "case";
  return f;
}
