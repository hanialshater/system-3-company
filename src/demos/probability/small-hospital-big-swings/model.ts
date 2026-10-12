// A seeded year of births: each day, n babies, each a boy with probability 1/2.

export const DAYS = 365;

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

/** Boys born each day for a hospital with n births a day. */
export function year(n: number, seed = 1974): number[] {
  const rnd = mulberry32(seed * 1000 + n);
  return Array.from({ length: DAYS }, () => {
    let boys = 0;
    for (let i = 0; i < n; i++) if (rnd() < 0.5) boys++;
    return boys;
  });
}

/** "More than 60% boys", strictly. */
export const over60 = (boys: number, n: number) => boys * 10 > n * 6;

/** Exact P(more than 60% boys on a day) for n births, p = 1/2. */
export function exactOver60(n: number): number {
  let total = 0;
  let c = 1; // C(n, k)
  for (let k = 0; k <= n; k++) {
    if (k > 0) c = (c * (n - k + 1)) / k;
    if (over60(k, n)) total += c;
  }
  return total / 2 ** n;
}
