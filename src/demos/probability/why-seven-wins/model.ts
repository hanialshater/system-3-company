// Two fair dice: the 36 equally likely (first, second) pairs and the totals they make.
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export const TOTALS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const PAIRS: [number, number][] = [];
for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) PAIRS.push([a, b]);

/** number of the 36 pairs that make total t */
export const ways = (t: number) => PAIRS.filter(([a, b]) => a + b === t).length;

/** n seeded rolls of two dice, counted by total */
export function rolls(n = 1000, seed = 36): Record<number, number> {
  const rnd = mulberry32(seed);
  const c: Record<number, number> = {};
  for (const t of TOTALS) c[t] = 0;
  for (let i = 0; i < n; i++) c[1 + Math.floor(rnd() * 6) + 1 + Math.floor(rnd() * 6)]++;
  return c;
}
