// Gambler's ruin with a fair coin. You hold `stake` dollars, the house holds TOTAL - stake. Each bet moves $1
// either way with probability 1/2. A game ends when one side holds all TOTAL dollars.
// Exact result for a fair game: P(you end with all of it) = stake / TOTAL.
// Game g at a given stake uses the stream mulberry32(SEED0 + stake * 1000 + g).

import { mulberry32 } from "@/kit/random";

export const TOTAL = 110;
export const SEED0 = 4000;
export const SHOWN = 30;
export const MORE = 300;
export const POINTS = 120;

export interface Game {
  won: boolean;
  steps: number;
  /** Bankroll sampled at POINTS+1 evenly spaced bets (for drawing). */
  path: number[];
}

export function play(stake: number, g: number, seed0 = SEED0): Game {
  const r = mulberry32(seed0 + stake * 1000 + g);
  let x = stake;
  const full: number[] = [x];
  while (x > 0 && x < TOTAL) {
    x += r() < 0.5 ? 1 : -1;
    full.push(x);
  }
  const steps = full.length - 1;
  const path: number[] = [];
  for (let i = 0; i <= POINTS; i++) path.push(full[Math.round((i / POINTS) * steps)]);
  return { won: x >= TOTAL, steps, path };
}

const cache = new Map<string, Game[]>();
export function games(stake: number, n: number, seed0 = SEED0): Game[] {
  const key = `${seed0}:${stake}`;
  const have = cache.get(key) ?? [];
  while (have.length < n) have.push(play(stake, have.length, seed0));
  cache.set(key, have);
  return have.slice(0, n);
}

/** Games won among the first n at this stake. */
export const wins = (stake: number, n: number, seed0 = SEED0) => games(stake, n, seed0).filter((g) => g.won).length;
/** Exact chance of taking all TOTAL dollars in a fair game. */
export const exact = (stake: number) => stake / TOTAL;
