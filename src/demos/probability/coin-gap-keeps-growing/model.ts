// Law of large numbers: 20 seeded runs of 10,000 fair coin flips.
// gap[r][n] = heads - tails after n flips of run r.

export const RUNS = 20;
export const FLIPS = 10000;

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

export function runs(seed = 1713): Int16Array[] {
  return Array.from({ length: RUNS }, (_, r) => {
    const rnd = mulberry32(seed + r * 7919);
    const g = new Int16Array(FLIPS + 1);
    for (let n = 1; n <= FLIPS; n++) g[n] = g[n - 1] + (rnd() < 0.5 ? 1 : -1);
    return g;
  });
}

export const meanAbsGap = (all: Int16Array[], n: number) => all.reduce((a, g) => a + Math.abs(g[n]), 0) / all.length;

/** heads share after n flips: (n + gap) / 2n */
export const share = (g: Int16Array, n: number) => (n + g[n]) / (2 * n);
