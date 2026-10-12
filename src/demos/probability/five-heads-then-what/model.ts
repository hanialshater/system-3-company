// Seeded fair coin flips and the "what came after five heads" tally.
// Pure functions so meta.json numbers can be re-run with node --experimental-strip-types.

export const MAX_FLIPS = 20000;

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** true = heads. Every flip is an independent 50/50 draw. */
export function makeFlips(seed = 5150, n = MAX_FLIPS): boolean[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, () => rnd() < 0.5);
}

/** Indices i whose previous five flips (i-5 .. i-1) were all heads. Overlapping runs count again. */
export function streakCases(flips: boolean[]): number[] {
  const out: number[] = [];
  let run = 0;
  for (let i = 0; i < flips.length; i++) {
    if (run >= 5) out.push(i);
    run = flips[i] ? run + 1 : 0;
  }
  return out;
}

/** Tally of what came next, among the cases whose flip i is already shown (i < count). */
export function tally(flips: boolean[], cases: number[], count: number) {
  let heads = 0;
  let total = 0;
  for (const i of cases) {
    if (i >= count) break;
    total++;
    if (flips[i]) heads++;
  }
  return { heads, tails: total - heads, total };
}
