// Coincidental matches in a database search, seeded.
// Each innocent person matches by chance with probability 1 in 1,000,000, independently.
// Matches along the database are a Bernoulli process; we draw the gaps between them
// geometrically so 5,000,000 people cost a handful of random numbers.

export const RATE = 1e-6;
export const MAX_PEOPLE = 5_000_000;
export const GUILTY_AT = 417; // the person who left the trace; always in the database

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

/** Positions (0-based person index) of innocent people who match by chance. */
export function innocentMatches(seed: number, people = MAX_PEOPLE, rate = RATE): number[] {
  const rnd = mulberry32(seed);
  const out: number[] = [];
  let pos = -1;
  for (;;) {
    // geometric gap: number of trials until the next success
    const u = 1 - rnd();
    pos += Math.max(1, Math.ceil(Math.log(u) / Math.log(1 - rate)));
    if (pos >= people) break;
    if (pos !== GUILTY_AT) out.push(pos);
  }
  return out;
}

// Chosen from seeds 1..3000 so the full search shows exactly the expected 5 innocent matches, spread out.
export const SEED = 28;
