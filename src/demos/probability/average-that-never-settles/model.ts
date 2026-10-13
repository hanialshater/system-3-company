// Heavy tails: running averages of fair die rolls settle near 3.5; running averages of
// standard Cauchy draws never settle (the mean of n Cauchy draws is itself standard Cauchy).
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export const MAX = 20_000;
export const EVERY = 50; // running average sampled every 50 draws for drawing

/** Standard Cauchy draw by inverse CDF: tan(pi (u - 1/2)). */
export const cauchy = (u: number) => Math.tan(Math.PI * (u - 0.5));

/** Running averages (every EVERY draws) of die rolls and Cauchy draws for one seeded batch. */
export function runs(batch = 0, seed = 1853) {
  const rnd = mulberry32(seed + batch * 92821);
  const die: number[] = [];
  const cau: number[] = [];
  let sd = 0;
  let sc = 0;
  let biggest = 0;
  for (let i = 1; i <= MAX; i++) {
    sd += 1 + Math.floor(rnd() * 6);
    const c = cauchy(rnd());
    sc += c;
    biggest = Math.max(biggest, Math.abs(c));
    if (i % EVERY === 0) {
      die.push(sd / i);
      cau.push(sc / i);
    }
  }
  return { die, cau, biggest };
}

export const PER_BATCH = 5;

/** Five independent runs per batch, so one calm run never stands alone. */
export const batchRuns = (batch = 0, seed = 1853) =>
  Array.from({ length: PER_BATCH }, (_, i) => runs(batch * PER_BATCH + i, seed));

/** running average after n draws (n a multiple of EVERY) */
export const at = (series: number[], n: number) => series[n / EVERY - 1];

/** P(|mean of n standard Cauchy draws| > x) = 1 - (2/pi) atan(x), for every n. */
export const cauchyTail = (x: number) => 1 - (2 / Math.PI) * Math.atan(x);
