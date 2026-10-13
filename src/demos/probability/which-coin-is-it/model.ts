// Bayesian updating with two coins in a bag: one fair, one two-headed.
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export const MAX_FLIPS = 8;
export const PRIOR = 0.5; // one of two coins, pulled at random

/** P(two-headed | flips). Any tails proves the coin is fair. true = heads. */
export function belief(flips: boolean[]): number {
  if (flips.some((f) => !f)) return 0;
  const k = flips.length;
  const like2 = 1; // two-headed coin: heads every time
  const likeFair = 0.5 ** k;
  return (PRIOR * like2) / (PRIOR * like2 + (1 - PRIOR) * likeFair);
}

/** belief after k heads in a row: 2^k / (2^k + 1) */
export const afterHeads = (k: number) => belief(Array(k).fill(true));

export interface Coin {
  twoHeaded: boolean;
  flips: boolean[];
}

/** A seeded sequence of pulls from the bag, each flipped MAX_FLIPS times. */
export function pulls(seed = 9, n = 60): Coin[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, () => {
    const twoHeaded = rnd() < PRIOR;
    const flips = Array.from({ length: MAX_FLIPS }, () => (twoHeaded ? true : rnd() < 0.5));
    return { twoHeaded, flips };
  });
}

/** Pull n coins, flip each k times; among pulls showing k heads, how many were two-headed. */
export function test(n = 1000, k = 3, seed = 2024) {
  const rnd = mulberry32(seed);
  let allHeads = 0;
  let twoHeaded = 0;
  for (let i = 0; i < n; i++) {
    const th = rnd() < PRIOR;
    let heads = true;
    for (let j = 0; j < k; j++) if (!th && rnd() >= 0.5) heads = false;
    if (heads) {
      allHeads++;
      if (th) twoHeaded++;
    }
  }
  return { n, allHeads, twoHeaded };
}
