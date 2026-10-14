// Step-count model from CLRS 3e exercise 1.2-2: insertion sort 8·n², merge sort 64·n·log2 n.
// Chosen constants, not timings of real code. Merge sort is rounded to whole steps.
export const insertion = (n: number) => 8 * n * n;
export const merge = (n: number) => Math.round(64 * n * Math.log2(n));
export const winner = (n: number) => (insertion(n) < merge(n) ? "insertion" : "merge");
export const SIZES = [20, 43, 44, 100] as const;
export const fmt = (x: number) => x.toLocaleString("en-US");
