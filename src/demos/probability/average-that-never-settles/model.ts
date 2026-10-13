// Heavy tails: averages of fair die rolls settle near 3.5; averages of standard Cauchy draws
// never narrow (the mean of n Cauchy draws is itself standard Cauchy).
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export const SEED = 1853; // untuned: the first seed tried
export const RUNS = 30; // dots per row
export const CHECK = [1, 10, 100, 1000, 10000] as const;

/** Standard Cauchy draw by inverse CDF: tan(pi (u - 1/2)). */
export const cauchy = (u: number) => Math.tan(Math.PI * (u - 0.5));

export interface Dots {
  /** die[k][r]: average of the first CHECK[k] die rolls of run r */
  die: number[][];
  /** cau[k][r]: average of the first CHECK[k] Cauchy draws of run r */
  cau: number[][];
  /** biggest absolute single Cauchy draw among the first 10,000 of run r */
  big: number[];
}

let cache: Dots | null = null;

/** RUNS independent runs; each dot is a running average read off at 1, 10, 100, 1,000 and 10,000 draws. */
export function dots(seed = SEED): Dots {
  if (seed === SEED && cache) return cache;
  const die = CHECK.map(() => [] as number[]);
  const cau = CHECK.map(() => [] as number[]);
  const big: number[] = [];
  for (let r = 0; r < RUNS; r++) {
    const rnd = mulberry32(seed + r * 92821);
    let sd = 0;
    let sc = 0;
    let b = 0;
    let k = 0;
    for (let i = 1; i <= CHECK[CHECK.length - 1]; i++) {
      sd += 1 + Math.floor(rnd() * 6);
      const c = cauchy(rnd());
      sc += c;
      b = Math.max(b, Math.abs(c));
      if (i === CHECK[k]) {
        die[k].push(sd / i);
        cau[k].push(sc / i);
        k++;
      }
    }
    big.push(b);
  }
  const out = { die, cau, big };
  if (seed === SEED) cache = out;
  return out;
}

/** P(|mean of n standard Cauchy draws| > x) = 1 - (2/pi) atan(x), for every n. */
export const cauchyTail = (x: number) => 1 - (2 / Math.PI) * Math.atan(x);
