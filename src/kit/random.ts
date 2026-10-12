// Seeded randomness for lessons (deterministic so QA and screenshots reproduce).
// If you pick a seed because it shows the expected result, say so in the claim's source:
// a chosen seed is an illustration, not evidence (see company/knowledge/patterns/disclose-chosen-seeds.md).

/** mulberry32: a small, fast 32-bit PRNG. Returns a function producing floats in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Integer in [lo, hi] inclusive. */
export const randInt = (rng: () => number, lo: number, hi: number) => lo + Math.floor(rng() * (hi - lo + 1));
