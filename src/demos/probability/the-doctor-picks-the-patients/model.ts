// Random assignment model (brief 58). 40 patients, recovery chance 30% + 60% * i / 39 (i = 0..39).
// The drug does nothing: expected recoveries in a group = sum of its members' chances.
// Coin split k: Fisher-Yates shuffle of 0..39 with mulberry32(58 + k); the first 20 get the drug.
// Seeds are the brief's 58, 59, ... in order, not chosen for their result.

import { mulberry32 } from "@/kit/random";

export const N = 40;
export const chance = (i: number) => 30 + (60 * i) / 39;

/** The shuffled patient order of coin split k (the stage draws each box's dots in this order, not sorted). */
export function coinOrder(k: number): number[] {
  const rng = mulberry32(58 + k);
  const idx = Array.from({ length: N }, (_, i) => i);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

export function coinSplit(k: number): boolean[] {
  const idx = coinOrder(k);
  const drug = Array(N).fill(false);
  for (let t = 0; t < N / 2; t++) drug[idx[t]] = true;
  return drug;
}

/** Doctor: the 20 fittest (highest chance) get the drug. */
export const doctorSplit = (): boolean[] => Array.from({ length: N }, (_, i) => i >= N / 2);

export type Result = { drug: number; none: number; gap: number };
/** Expected recoveries of 20 per box (1 decimal) and the gap between them as shown (difference of the rounded
 *  values, so the three readouts always agree on the stage). */
export function result(split: boolean[]): Result {
  let a = 0;
  let b = 0;
  split.forEach((d, i) => (d ? (a += chance(i)) : (b += chance(i))));
  const r1 = (x: number) => Math.round(x * 10) / 10;
  const drug = r1(a / 100);
  const none = r1(b / 100);
  return { drug, none, gap: r1(drug - none) };
}
