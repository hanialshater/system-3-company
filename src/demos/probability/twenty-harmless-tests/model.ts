// Multiple comparisons. A batch is 20 independent tests of things with no real effect;
// each test raises a false alarm ("significant") with probability 0.05.

export const TESTS = 20;
export const ALPHA = 0.05;

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

// Seed 4 picked from seeds 1-8: its first batch has 2 false alarms (a typical batch) and its first 1,000 batches give 63.8%.
export const SEED = 4;

/** Which of batch b's 20 tests come out "significant" by chance. */
export function batch(b: number, seed = SEED): boolean[] {
  const rnd = mulberry32(seed * 100003 + b * 7919);
  return Array.from({ length: TESTS }, () => rnd() < ALPHA);
}

/** Batches start..start+count-1: how many had at least one false alarm, and total alarms. */
export function many(start: number, count: number, seed = SEED) {
  let anyAlarm = 0;
  let alarms = 0;
  for (let b = start; b < start + count; b++) {
    const r = batch(b, seed);
    const k = r.filter(Boolean).length;
    alarms += k;
    if (k > 0) anyAlarm++;
  }
  return { anyAlarm, alarms };
}
