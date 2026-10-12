// Regression to the mean. Each student has a fixed skill; each test adds fresh luck of the
// same size. score = 50 + 15 * (skill + luck) / sqrt(2), so both tests have mean 50, SD 15,
// and the correlation between test 1 and test 2 is 0.5.

export const N = 1000;

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

export interface Student {
  t1: number;
  t2: number;
}

export function students(seed = 1886): Student[] {
  const rnd = mulberry32(seed);
  const normal = () => {
    const u = 1 - rnd();
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  return Array.from({ length: N }, () => {
    const skill = normal();
    const score = () => Math.max(0, Math.min(100, Math.round(50 + (15 * (skill + normal())) / Math.SQRT2)));
    const t1 = score();
    const t2 = score();
    return { t1, t2 };
  });
}

/** The top (or bottom) pct% of students by test 1, ties broken by index. */
export function group(all: Student[], pct: number, top: boolean): number[] {
  const order = all.map((_, i) => i).sort((a, b) => (top ? all[b].t1 - all[a].t1 : all[a].t1 - all[b].t1) || a - b);
  return order.slice(0, Math.round((all.length * pct) / 100));
}

export const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length);
