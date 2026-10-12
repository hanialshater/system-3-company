// A simulated town where temperature is the only link between ice-cream sales and sunburns.
// sales = temperature + noise, sunburn = temperature + noise, with independent noise.
// Neither variable appears in the other's formula, so any link between them comes from temperature.

export const DAYS = 365;
export const T_MIN = 5;
export const T_MAX = 35;
export const NOISE_SD = Math.sqrt(15);
export const BAND = 3; // degrees: "the same temperature" means within a 3-degree band

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

export interface Day {
  temp: number;
  sales: number;
  sunburn: number;
}

export function town(seed = 2024): Day[] {
  const rnd = mulberry32(seed);
  const normal = () => {
    const u = 1 - rnd();
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  return Array.from({ length: DAYS }, () => {
    const temp = T_MIN + (T_MAX - T_MIN) * rnd();
    return { temp, sales: temp + NOISE_SD * normal(), sunburn: temp + NOISE_SD * normal() };
  });
}

export function correlation(days: Day[]): number {
  const n = days.length;
  if (n < 3) return 0;
  const mx = days.reduce((a, d) => a + d.sales, 0) / n;
  const my = days.reduce((a, d) => a + d.sunburn, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (const d of days) {
    sxy += (d.sales - mx) * (d.sunburn - my);
    sxx += (d.sales - mx) ** 2;
    syy += (d.sunburn - my) ** 2;
  }
  return sxy / Math.sqrt(sxx * syy);
}

/** Least-squares line sunburn = a + b * sales. */
export function fit(days: Day[]): { a: number; b: number } {
  const n = days.length;
  const mx = days.reduce((a, d) => a + d.sales, 0) / n;
  const my = days.reduce((a, d) => a + d.sunburn, 0) / n;
  let sxy = 0;
  let sxx = 0;
  for (const d of days) {
    sxy += (d.sales - mx) * (d.sunburn - my);
    sxx += (d.sales - mx) ** 2;
  }
  const b = sxx ? sxy / sxx : 0;
  return { a: my - b * mx, b };
}

/** Bands start at 5, 6, ..., 32 degrees and are BAND wide. */
export const BAND_STARTS = Array.from({ length: T_MAX - BAND - T_MIN + 1 }, (_, i) => T_MIN + i);
export const inBand = (d: Day, start: number) => d.temp >= start && d.temp < start + BAND;

// Seed not tuned: a typical draw (overall r 0.83; band r from -0.19 to 0.30, mean 0.05; theory 0.05).
export const SEED = 2024;
