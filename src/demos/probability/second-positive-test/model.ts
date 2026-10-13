// Repeat testing. 1,000 people, 1% have the condition. The test flags 90% of the sick and 9% of the
// healthy. The stage uses expected counts rounded to whole people (no sampling noise), so its numbers
// are fixed: 10 sick / 990 healthy -> flagged 9 / 89 -> flagged again 8 / 8.
// The seed only decides where on the grid each person sits.

import { mulberry32 } from "@/kit/random";

export const PEOPLE = 1000;
export const COLS = 40;
export const PREVALENCE = 0.01;
export const SENSITIVITY = 0.9; // share of sick people the test flags
export const FALSE_POS = 0.09; // share of healthy people the test wrongly flags
export const LAYOUT_SEED = 9; // layout only, untuned

export type Counts = { sick: number; healthy: number };

/** Who is still flagged after `round` tests (round 0 = everyone, untested). */
export function counts(round: number): Counts {
  let c = { sick: Math.round(PEOPLE * PREVALENCE), healthy: PEOPLE - Math.round(PEOPLE * PREVALENCE) };
  for (let r = 0; r < round; r++) c = { sick: Math.round(c.sick * SENSITIVITY), healthy: Math.round(c.healthy * FALSE_POS) };
  return c;
}

export const shareSick = (c: Counts) => c.sick / (c.sick + c.healthy);

/** Exact chance of being sick after `k` independent positives (Bayes' rule). */
export function exactAfter(k: number) {
  const a = PREVALENCE * SENSITIVITY ** k;
  const b = (1 - PREVALENCE) * FALSE_POS ** k;
  return a / (a + b);
}

/** Each test multiplies the sick-to-healthy ratio by this. */
export const FACTOR = SENSITIVITY / FALSE_POS;

export type Person = { sick: boolean; flaggedThrough: number }; // flaggedThrough = last round still flagged

/** Seeded grid layout: who is sick and how many rounds each person stays flagged. */
export function people(seed = LAYOUT_SEED, rounds = 2): Person[] {
  const rnd = mulberry32(seed);
  const idx = Array.from({ length: PEOPLE }, (_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const out: Person[] = Array.from({ length: PEOPLE }, () => ({ sick: false, flaggedThrough: 0 }));
  const c0 = counts(0);
  const sick = idx.slice(0, c0.sick);
  const healthy = idx.slice(c0.sick);
  for (const i of sick) out[i].sick = true;
  for (let r = 1; r <= rounds; r++) {
    const c = counts(r);
    sick.slice(0, c.sick).forEach((i) => (out[i].flaggedThrough = r));
    healthy.slice(0, c.healthy).forEach((i) => (out[i].flaggedThrough = r));
  }
  return out;
}
