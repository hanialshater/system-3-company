// Independence on a 6 x 6 grid. Rows are the first die, columns the second. A target total marks its
// cells; a clue about the first die keeps one row. The target is independent of the clue when the
// share in that row equals the share in the whole grid. No randomness: every number is an enumeration.

export const TARGETS = [7, 8] as const;
export type Target = (typeof TARGETS)[number];
export const FACES = [1, 2, 3, 4, 5, 6] as const;

/** Chance of the total before any clue: cells / 36. */
export function before(t: number) {
  let k = 0;
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === t) k++;
  return { k, of: 36 };
}

/** Chance of the total once the first die is known: cells in that row / 6. */
export function after(t: number, first: number) {
  let k = 0;
  for (let b = 1; b <= 6; b++) if (first + b === t) k++;
  return { k, of: 6 };
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/** "6/36 = 1/6" style, or "5/36" when it does not reduce. */
export function show({ k, of }: { k: number; of: number }) {
  if (k === 0) return `0/${of}`;
  const g = gcd(k, of);
  return g === 1 ? `${k}/${of}` : `${k}/${of} = ${k / g}/${of / g}`;
}

export const same = (x: { k: number; of: number }, y: { k: number; of: number }) => x.k * y.of === y.k * x.of;
