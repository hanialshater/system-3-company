// Doubling after every loss (the martingale) on a fair, even-money coin. A round: bet $1; after each
// loss double the bet; stop at the first win (+$1 for the round) or after 6 losses in a row
// ($1+2+4+8+16+32 = $63 lost). P(bust) = (1/2)^6 = 1/64, so the average per round is
// 63/64 x $1 - 1/64 x $63 = $0 exactly.

import { mulberry32 } from "@/kit/random";

export const MAX_LOSSES = 6;
export const BUST = 2 ** MAX_LOSSES - 1; // 63
export const P_BUST = 1 / 2 ** MAX_LOSSES; // 1/64
export const SEED = 777; // untuned: the first seed tried
export const ROUNDS = 5000;

/** Seeded results of ROUNDS rounds: +1 or -63. */
export function rounds(seed = SEED, k = ROUNDS): number[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: k }, () => {
    for (let i = 0; i < MAX_LOSSES; i++) if (rnd() < 0.5) return 1;
    return -BUST;
  });
}

/** Exact average profit per round. */
export const expected = () => (1 - P_BUST) * 1 - P_BUST * BUST;

/** Index (count of rounds) after the next bust at or after `from`. */
export function nextBust(rs: number[], from: number): number {
  for (let i = from; i < rs.length; i++) if (rs[i] < 0) return i + 1;
  return rs.length;
}
