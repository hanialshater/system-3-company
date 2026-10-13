// Drawing without replacement. A 52-card deck, 26 red and 26 black. The setup forces the first 10 dealt
// cards to be red (a conditional "suppose this happened", not a claim about how often it happens).
// Without putting cards back, 16 reds remain among 42 cards: P(next red) = 16/42 = 38.1%.
// Putting each card back restores 26 of 52 = 50%.

export const RED = 26;
export const BLACK = 26;
export const DECK = RED + BLACK;
export const FORCED = 10;

/** Cards left in the deck after `dealt` reds, with or without putting them back. */
export function left(dealt: number, putBack: boolean) {
  const red = putBack ? RED : RED - dealt;
  const total = putBack ? DECK : DECK - dealt;
  return { red, black: BLACK, total, pRed: red / total };
}

/** C(n, k) as a float. */
export function choose(n: number, k: number): number {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
}

/** Chance that the first `k` cards of a shuffled deck are all red (for the claim, not shown on stage). */
export const allRedFirst = (k = FORCED) => choose(RED, k) / choose(DECK, k);
