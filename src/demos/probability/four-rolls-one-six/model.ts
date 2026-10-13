// At least once. 1,000 seeded players each roll a die four times. After each roll, the players who
// have not yet rolled a six are counted. Each roll removes about 1/6 of those still left, so the
// "no six yet" group shrinks by 5/6 each time: P(at least one six in 4) = 1 - (5/6)^4 = 0.5177.

import { mulberry32, randInt } from "@/kit/random";

export const PLAYERS = 1000;
export const ROLLS = 4;
export const SEED = 1654; // untuned: the first seed tried (the year of the de Mere letters)

export function players(seed = SEED, n = PLAYERS, rolls = ROLLS): number[][] {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, () => Array.from({ length: rolls }, () => randInt(rnd, 1, 6)));
}

/** Players with no six in their first r rolls, for r = 0..rolls. */
export function stillNoSix(p: number[][], rolls = ROLLS): number[] {
  return Array.from({ length: rolls + 1 }, (_, r) => p.filter((x) => !x.slice(0, r).includes(6)).length);
}

/** Exact P(no six in r rolls). */
export const exactNone = (r: number) => (5 / 6) ** r;

/** What "add 1/6 per roll" would predict for the no-six group (can go negative after 6 rolls). */
export const addingNone = (r: number, n = PLAYERS) => n * (1 - r / 6);
