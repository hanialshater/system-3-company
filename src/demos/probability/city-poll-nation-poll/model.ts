// Sample vs population. A poll of 1,000 people drawn at random, without replacement, from a population
// that is exactly 50% "yes". The 95% margin of error is 1.96 x sqrt(0.25 / n) x sqrt((N - n) / (N - 1)):
// the population size N enters only through the finite-population factor, which is ~1 until the sample is
// a large share of the population.

import { mulberry32 } from "@/kit/random";

export const SAMPLE = 1000;
export const POLLS = 40;
export const SEED = 2026; // untuned: the first seed tried
export const POPS: readonly number[] = [300_000_000, 1_000_000, 100_000, 10_000, 2_000];
export const CITY = 100_000;
export const NATION = 300_000_000;

/** Finite-population correction factor. */
export const fpc = (N: number, n = SAMPLE) => Math.sqrt((N - n) / (N - 1));
/** 95% margin of error in percentage points for a 50/50 question. */
export const margin = (N: number, n = SAMPLE) => 1.96 * Math.sqrt(0.25 / n) * fpc(N, n) * 100;

/** POLLS seeded polls of SAMPLE people from a population of N, half "yes". Returns % yes in each poll. */
export function polls(N: number, seed = SEED, k = POLLS, n = SAMPLE): number[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: k }, () => {
    let yesLeft = N / 2;
    let left = N;
    let yes = 0;
    for (let i = 0; i < n; i++) {
      if (rnd() < yesLeft / left) {
        yes++;
        yesLeft--;
      }
      left--;
    }
    return (yes / n) * 100;
  });
}

/** How many polls land within the margin of the true 50%. */
export const inside = (N: number, ps: number[]) => ps.filter((p) => Math.abs(p - 50) <= margin(N)).length;
