// Truly large numbers: a 1-in-a-million chance per person per day, across a whole city.
// Daily counts are seeded Poisson draws with mean population x chance (the binomial
// Bin(N, 1e-6) is Poisson to within rounding at these sizes). Pure, so node can re-run it.

import { mulberry32 } from "@/kit/random";

export const CHANCE = 1e-6; // per person per day
export const POPS = [10_000, 100_000, 1_000_000, 8_000_000] as const;
export const CITY = 8_000_000;
export const DOTS = 1000; // the field always has 1,000 dots; each dot is POP / 1,000 people
export const YEAR = 365;

export const expectedPerDay = (pop: number) => pop * CHANCE;
/** P(no event on a given day) = (1 - p)^N, about e^(-N p) */
export const pNone = (pop: number) => Math.exp(pop * Math.log1p(-CHANCE));

function poisson(rnd: () => number, mean: number) {
  // Knuth's method; fine for means up to ~30
  const L = Math.exp(-mean);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= rnd();
  } while (p > L);
  return k - 1;
}

export interface Day {
  count: number;
  dots: number[]; // which of the 1,000 dots light up
}

/** A seeded year of days for one population. */
export function year(pop: number, seed = 808): Day[] {
  const rnd = mulberry32(seed + pop / 1000);
  return Array.from({ length: YEAR }, () => {
    const count = poisson(rnd, expectedPerDay(pop));
    const dots = Array.from({ length: count }, () => Math.floor(rnd() * DOTS));
    return { count, dots };
  });
}

export function summary(days: Day[]) {
  const total = days.reduce((a, d) => a + d.count, 0);
  const none = days.filter((d) => d.count === 0).length;
  return { days: days.length, total, mean: days.length ? total / days.length : 0, none };
}
