// Conditional probability as a smaller list. The 36 equally likely outcomes of two dice; a clue
// about the total keeps only the cells it allows, and the chance of "a six" is the share of what is left.
// No randomness: every number is an enumeration.

export type Clue = "none" | "eight" | "seven" | "tenUp";
export const CLUES: Clue[] = ["eight", "seven", "tenUp", "none"];
export const CLUE_LABEL: Record<Clue, string> = {
  none: "No clue",
  eight: "Total is 8",
  seven: "Total is 7",
  tenUp: "Total at least 10",
};

export const keeps: Record<Clue, (a: number, b: number) => boolean> = {
  none: () => true,
  eight: (a, b) => a + b === 8,
  seven: (a, b) => a + b === 7,
  tenUp: (a, b) => a + b >= 10,
};

export const hasSix = (a: number, b: number) => a === 6 || b === 6;

export const CELLS: [number, number][] = Array.from({ length: 36 }, (_, i) => [Math.floor(i / 6) + 1, (i % 6) + 1]);

export function share(clue: Clue) {
  const left = CELLS.filter(([a, b]) => keeps[clue](a, b));
  return { six: left.filter(([a, b]) => hasSix(a, b)).length, left: left.length };
}
