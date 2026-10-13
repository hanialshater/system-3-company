// Poll margin of error. A poll of n random people from a population split exactly 50/50 reports the
// share who say yes. The 95% margin of error is 1.96 x sqrt(0.25 / n), in percentage points.
// The stage draws 100 seeded polls per sample size and counts how many land inside the margin.

import { mulberry32 } from "@/kit/random";

export const SIZES = [250, 500, 1000, 2000, 4000, 8000] as const;
export const START = 2; // index of 1,000
export const POLLS = 100;
export const SEED = 1936; // untuned: the first seed tried

/** 95% margin of error in percentage points at p = 0.5. */
export const margin = (n: number) => 1.96 * Math.sqrt(0.25 / n) * 100;

/** POLLS seeded poll results (percent saying yes) for sample size n. Each size has its own stream. */
export function polls(n: number, seed = SEED): number[] {
  const rnd = mulberry32(seed * 100003 + n);
  return Array.from({ length: POLLS }, () => {
    let yes = 0;
    for (let i = 0; i < n; i++) if (rnd() < 0.5) yes++;
    return (yes / n) * 100;
  });
}

export const inside = (res: number[], n: number) => res.filter((r) => Math.abs(r - 50) <= margin(n)).length;
