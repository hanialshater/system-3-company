// Variance and risk: two games with the same average payoff (+$1 a play) and different spread.
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export interface Game {
  id: "X" | "Y";
  p: number; // chance of a win
  win: number;
  lose: number; // amount lost (positive)
  rule: string;
}

export const GAMES: Game[] = [
  { id: "X", p: 0.5, win: 10, lose: 8, rule: "50%: win $10, else lose $8" },
  { id: "Y", p: 0.1, win: 55, lose: 5, rule: "10%: win $55, else lose $5" },
];
export const PLAYS = 100;
export const SHOWN = 20;

export const ev = (g: Game) => g.p * g.win - (1 - g.p) * g.lose;

/** 20 seeded players, each path = wealth after 0..100 plays. batch shifts the seed. */
export function players(g: Game, batch = 0, n = SHOWN, seed = 4242): number[][] {
  const rnd = mulberry32(seed + batch * 1009 + (g.id === "Y" ? 500_000 : 0));
  return Array.from({ length: n }, () => {
    const path = [0];
    for (let i = 0; i < PLAYS; i++) path.push(path[i] + (rnd() < g.p ? g.win : -g.lose));
    return path;
  });
}

/** Share of n seeded players who end below $0 after 100 plays, and their average ending. */
export function crowd(g: Game, n = 1000, seed = 77) {
  const rnd = mulberry32(seed + (g.id === "Y" ? 1 : 0));
  let behind = 0;
  let sum = 0;
  for (let k = 0; k < n; k++) {
    let w = 0;
    for (let i = 0; i < PLAYS; i++) w += rnd() < g.p ? g.win : -g.lose;
    if (w < 0) behind++;
    sum += w;
  }
  return { n, behind, mean: sum / n };
}

/** Exact P(end below $0) from the binomial distribution of wins. */
export function exactBehind(g: Game) {
  let lnC = 0;
  let total = 0;
  for (let w = 0; w <= PLAYS; w++) {
    if (w > 0) lnC += Math.log(PLAYS - w + 1) - Math.log(w);
    const end = w * g.win - (PLAYS - w) * g.lose;
    if (end < 0) total += Math.exp(lnC + w * Math.log(g.p) + (PLAYS - w) * Math.log(1 - g.p));
  }
  return total;
}
