// Coupon collector with a fair die: roll until every face has appeared.
// Expected rolls for the k-th new face = 6 / (7 - k): 1, 1.2, 1.5, 2, 3, 6; total 14.7.
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export const FACES = 6;
export const expectedWaits = Array.from({ length: FACES }, (_, i) => FACES / (FACES - i));
export const expectedTotal = expectedWaits.reduce((a, b) => a + b, 0); // 14.7

/** One seeded collection: the rolls (1-6) until all six faces have shown. */
export function collection(index: number, seed = 600): number[] {
  const rnd = mulberry32(seed + index * 2654435761);
  const seen = new Set<number>();
  const rolls: number[] = [];
  while (seen.size < FACES) {
    const r = 1 + Math.floor(rnd() * FACES);
    rolls.push(r);
    seen.add(r);
  }
  return rolls;
}

/** Rolls each new face took (the gaps between first sightings), for the first `upTo` rolls. */
export function waits(rolls: number[], upTo = rolls.length): number[] {
  const seen = new Set<number>();
  const out: number[] = [];
  let since = 0;
  for (const r of rolls.slice(0, upTo)) {
    since++;
    if (!seen.has(r)) {
      seen.add(r);
      out.push(since);
      since = 0;
    }
  }
  return out;
}

/** n seeded collections: average total rolls and average wait for each new face. */
export function many(n = 1000, seed = 6000) {
  const sums = Array(FACES).fill(0);
  const totals: number[] = [];
  for (let i = 0; i < n; i++) {
    const rolls = collection(i, seed);
    waits(rolls).forEach((w, k) => (sums[k] += w));
    totals.push(rolls.length);
  }
  const sorted = [...totals].sort((a, b) => a - b);
  return {
    n,
    mean: totals.reduce((a, b) => a + b, 0) / n,
    waits: sums.map((x) => x / n),
    median: sorted[n / 2],
    min: sorted[0],
    max: sorted[n - 1],
    within6: totals.filter((t) => t <= 6).length,
  };
}
