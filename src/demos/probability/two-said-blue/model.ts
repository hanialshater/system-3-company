// Information cascade (urn model). The urn is blue. Person i gets a private clue that is blue with probability
// ACC. Each person sees all earlier picks. Rule: if one colour leads the earlier picks by 2 or more, pick it;
// otherwise (lead 0 or 1, including a tie) pick your own clue. Sequence k uses mulberry32(k), k = 1, 2, 3...

import { mulberry32 } from "@/kit/random";

export const N = 100;
export const ACCS = [0.6, 2 / 3, 0.8] as const;

export interface Seq {
  clues: boolean[]; // true = blue clue
  picks: boolean[]; // true = blue pick
  start: number; // index of the first person who saw a lead of 2+ (-1 if none)
  wrong: boolean; // crowd ended on red
  poolBlue: number; // blue clues among the N
}

export function sequence(seed: number, acc: number): Seq {
  const rng = mulberry32(seed);
  const clues: boolean[] = [];
  const picks: boolean[] = [];
  let lead = 0; // blue picks minus red picks so far
  let start = -1;
  for (let i = 0; i < N; i++) {
    const clue = rng() < acc;
    clues.push(clue);
    let pick = clue;
    if (lead >= 2) pick = true;
    else if (lead <= -2) pick = false;
    if (Math.abs(lead) >= 2 && start < 0) start = i;
    picks.push(pick);
    lead += pick ? 1 : -1;
  }
  return { clues, picks, start, wrong: !picks[N - 1], poolBlue: clues.filter(Boolean).length };
}

export interface Tally {
  n: number; // sequences run (seeds 1..n)
  wrong: number; // crowd locked on red
  poolWrong: number; // plain vote of the same clues is red
  poolTie: number; // exactly 50-50
  badStart: number; // first two clues both red
}

export const EMPTY: Tally = { n: 0, wrong: 0, poolWrong: 0, poolTie: 0, badStart: 0 };

export function runMore(t: Tally, count: number, acc: number): Tally {
  const o = { ...t };
  for (let k = t.n + 1; k <= t.n + count; k++) {
    const s = sequence(k, acc);
    if (s.wrong) o.wrong++;
    if (s.poolBlue < N / 2) o.poolWrong++;
    if (s.poolBlue === N / 2) o.poolTie++;
    if (!s.clues[0] && !s.clues[1]) o.badStart++;
  }
  o.n = t.n + count;
  return o;
}

export const exactWrong = (acc: number) => (1 - acc) ** 2 / ((1 - acc) ** 2 + acc ** 2);

export const pct = (x: number, d = 1) => `${(x * 100).toFixed(d)}%`;

// Chance a plain vote of N independent clues has a red majority (ties excluded): exact binomial, P(blue clues < N/2).
export function plainWrong(acc: number): number {
  let total = 0;
  for (let k = 0; k < N / 2; k++) {
    let lg = 0; // log C(N, k)
    for (let i = 1; i <= k; i++) lg += Math.log((N - k + i) / i);
    total += Math.exp(lg + k * Math.log(acc) + (N - k) * Math.log(1 - acc));
  }
  return total;
}

export const pctSmall = (x: number) => (x < 0.0001 ? "under 0.01%" : pct(x, x < 0.01 ? 3 : 1));
