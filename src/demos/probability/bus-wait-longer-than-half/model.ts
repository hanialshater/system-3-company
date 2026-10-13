// The waiting-time paradox. Buses arrive at random (a Poisson process: exponential gaps, mean 10 min)
// over 8 hours. Riders turn up at uniformly random moments and wait for the next bus. Long gaps cover
// more of the clock, so riders land in them more often: the mean wait is E[gap^2] / (2 E[gap]) = 10 min,
// not 5. With perfectly regular buses every 10 minutes the mean wait is 5.

import { mulberry32 } from "@/kit/random";

export const MEAN_GAP = 10;
export const SPAN = 480; // minutes (8 hours)
export const SEED = 1010; // untuned: the first seed tried
export const RIDER_STEPS: readonly number[] = [1, 10, 200];

/** Random bus times from 0 until past SPAN (the last one is after SPAN so every rider has a bus). */
export function randomBuses(seed = SEED): number[] {
  const rnd = mulberry32(seed);
  const out: number[] = [];
  let t = 0;
  while (t <= SPAN) {
    t += -MEAN_GAP * Math.log(1 - rnd());
    out.push(t);
  }
  return out;
}

export const regularBuses = (): number[] => Array.from({ length: SPAN / MEAN_GAP + 1 }, (_, i) => (i + 1) * MEAN_GAP - MEAN_GAP / 2);

/** Rider arrival times, uniform on [0, SPAN), from their own seeded stream. */
export function riders(k: number, seed = SEED + 1): number[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: k }, () => rnd() * SPAN);
}

export const waitFor = (t: number, buses: number[]) => (buses.find((b) => b >= t) ?? t) - t;
export const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

/** Average gap between consecutive buses within the span (from time 0). */
export function meanGap(buses: number[]): number {
  const inSpan = buses.filter((b) => b <= SPAN);
  return inSpan[inSpan.length - 1] / inSpan.length;
}
