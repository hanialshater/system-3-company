// Lottery odds in human time. One ticket a week at jackpot odds of 1 in 292,201,338 (Powerball since
// 2015: C(69,5) x 26). The expected wait for a first win is 292,201,338 weeks = 5.6 million years.
// The stage steps through spans of time; for each it shows tickets bought, the exact chance of at
// least one win by then, and whether this seeded run has won yet (first-win week drawn once from the
// geometric distribution by inversion).

import { mulberry32 } from "@/kit/random";

export const ODDS = 292_201_338;
export const P = 1 / ODDS;
export const WEEKS_PER_YEAR = 365.25 / 7; // 52.18
export const LIFETIME = 80;
export const SEED = 1969; // untuned: the first seed tried
/** Expected wait in years: ODDS weeks. */
export const EXPECTED_YEARS = ODDS / WEEKS_PER_YEAR;
/** Spans the learner steps through (years). The last is the expected wait. */
export const SPANS: readonly number[] = [1, 10, LIFETIME, 1_000, 100_000, EXPECTED_YEARS];

export const tickets = (years: number) => Math.round(years * WEEKS_PER_YEAR);
/** Exact chance of at least one jackpot in t weekly tickets. */
export const chanceBy = (t: number) => -Math.expm1(t * Math.log1p(-P));

/** Week of this run's first win (1-based), from one seeded uniform draw. */
export function firstWinWeek(seed = SEED): number {
  const u = mulberry32(seed)();
  return Math.ceil(Math.log(1 - u) / Math.log1p(-P));
}
