// Two-children problem. 1,000 seeded two-child families, each child a boy or girl with chance 1/2,
// sorted into a 2 x 2 grid by (older, younger). A clue removes whole cells, not one child.
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export type Kid = "B" | "G";
export type Cell = "BB" | "BG" | "GB" | "GG"; // older first
export const CELLS: Cell[] = ["BB", "BG", "GB", "GG"];
export const FAMILIES = 1000;

export type Clue = "none" | "atLeastOne" | "olderBoy";
export const keeps: Record<Clue, (c: Cell) => boolean> = {
  none: () => true,
  atLeastOne: (c) => c.includes("B"),
  olderBoy: (c) => c[0] === "B",
};

/** Exact answer by enumerating the four equally likely families. */
export function exact(clue: Clue) {
  const left = CELLS.filter(keeps[clue]);
  return { both: left.includes("BB") ? 1 : 0, of: left.length };
}

export function families(seed = 1959, n = FAMILIES): Cell[] {
  const rnd = mulberry32(seed);
  const kid = (): Kid => (rnd() < 0.5 ? "B" : "G");
  return Array.from({ length: n }, () => `${kid()}${kid()}` as Cell);
}

export function count(fams: Cell[]) {
  const c: Record<Cell, number> = { BB: 0, BG: 0, GB: 0, GG: 0 };
  for (const f of fams) c[f]++;
  return c;
}

export function share(c: Record<Cell, number>, clue: Clue) {
  const left = CELLS.filter(keeps[clue]).reduce((a, k) => a + c[k], 0);
  return { both: c.BB, left, p: c.BB / left };
}
