// Series length and upsets. An underdog wins each game with probability 0.4, independently. In a
// best-of-n series (n odd) it wins if it takes more than n/2 games. 1,000 seeded series per length.
// Exact: best-of-1 0.4, best-of-3 0.352, best-of-7 0.2898, best-of-21 0.1744, best-of-101 0.0209.

import { mulberry32 } from "@/kit/random";

export const P = 0.4;
export const SERIES = 1000;
export const SEED = 4000; // untuned: the first seed tried (one stream per length: SEED + n)
export const LENGTHS: readonly number[] = [1, 3, 7, 21, 101];
export const SEVEN = 7;

/** For each of SERIES series: did the underdog win? */
export function series(n: number, seed = SEED + n): boolean[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: SERIES }, () => {
    let w = 0;
    for (let g = 0; g < n; g++) if (rnd() < P) w++;
    return w > n / 2;
  });
}

/** Exact P(underdog wins a best-of-n). */
export function exact(n: number): number {
  let total = 0;
  for (let k = Math.floor(n / 2) + 1; k <= n; k++) {
    let c = 1;
    for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i;
    total += c * P ** k * (1 - P) ** (n - k);
  }
  return total;
}

export const wins = (xs: boolean[]) => xs.filter(Boolean).length;
