// Runs in 20 fair flips. Real sequence k (k = 1, 2, 3, ...) is 20 flips from mulberry32(k): seeds in
// order, not chosen. The longest run of one face is tallied into bins (2 or less, 3, ..., 8 or more).
// Exact P(longest run >= k) comes from a DP over the current run length.

import { mulberry32 } from "@/kit/random";

export const FLIPS = 20;
export const TARGET = 5;
export const BATCH = 1000;
/** Histogram bins: longest run 1-2, 3, 4, 5, 6, 7, 8+. */
export const BIN_LABELS = ["≤2", "3", "4", "5", "6", "7", "8+"];
export const binOf = (run: number) => Math.min(Math.max(run, 2), 8) - 2;

/** Real sequence k: true = heads. */
export function sequence(k: number, n = FLIPS): boolean[] {
  const r = mulberry32(k);
  return Array.from({ length: n }, () => r() < 0.5);
}

/** Longest run of one face and where it starts. */
export function longestRun(seq: readonly boolean[]): { len: number; start: number } {
  let best = 0;
  let bestStart = 0;
  let cur = 0;
  for (let i = 0; i < seq.length; i++) {
    cur = i > 0 && seq[i] === seq[i - 1] ? cur + 1 : 1;
    if (cur > best) {
      best = cur;
      bestStart = i - cur + 1;
    }
  }
  return { len: best, start: bestStart };
}

export interface Tally {
  n: number;
  /** Display bins (see BIN_LABELS). */
  bins: number[];
  /** Exact count by longest run, index 0..FLIPS, so atMost is exact past the 8+ bin. */
  runs: number[];
}
export const EMPTY: Tally = { n: 0, bins: [0, 0, 0, 0, 0, 0, 0], runs: new Array(FLIPS + 1).fill(0) };

/** Add simulated sequences t.n + 1 .. t.n + count. */
export function runMore(t: Tally, count: number): Tally {
  const bins = t.bins.slice();
  const runs = t.runs.slice();
  for (let k = t.n + 1; k <= t.n + count; k++) {
    const len = longestRun(sequence(k)).len;
    bins[binOf(len)]++;
    runs[len]++;
  }
  return { n: t.n + count, bins, runs };
}

/** Sequences in the tally with a longest run of at least `k`. */
export const atLeast = (t: Tally, k: number) => t.bins.reduce((s, c, i) => s + (i + 2 >= k ? c : 0), 0);
/** Sequences with a longest run of at most `k`, exact for every k (counted from t.runs, not the capped bins). */
export const atMost = (t: Tally, k: number) => t.runs.reduce((s, c, len) => s + (len <= k ? c : 0), 0);

/** Exact P(longest run of one face >= k) in n fair flips. */
export function exactAtLeast(k: number, n = FLIPS): number {
  // p[j] = P(no run of k yet and current run length j), j = 1..k-1
  let p = new Array(k).fill(0);
  p[1] = 1;
  for (let i = 2; i <= n; i++) {
    const q = new Array(k).fill(0);
    let total = 0;
    for (let j = 1; j < k; j++) total += p[j];
    q[1] = total / 2; // switch face
    for (let j = 1; j < k - 1; j++) q[j + 1] = p[j] / 2; // repeat face
    p = q;
  }
  return 1 - p.reduce((s, v) => s + v, 0);
}
