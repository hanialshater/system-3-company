// Three cards: red/red, red/blue, blue/blue. A card is drawn at random and laid down with a random
// side up. Given a red face is up, the hidden side is red 2/3 of the time, because two of the three
// red faces belong to the red/red card. Pure functions so meta.json numbers can be re-run in node.

import { mulberry32, randInt } from "@/kit/random";

export type Color = "red" | "blue";
export const CARDS: [Color, Color][] = [
  ["red", "red"],
  ["red", "blue"],
  ["blue", "blue"],
];
export const DRAW_STEP = 60;
export const MAX_DRAWS = 600;
export const SEED = 1889; // untuned: the first seed tried

export type Face = { card: number; side: 0 | 1; up: Color; back: Color };

export const FACES: Face[] = CARDS.flatMap((c, card) =>
  ([0, 1] as const).map((side) => ({ card, side, up: c[side], back: c[1 - side] })),
);

/** Exact: among equally likely faces showing red, the share whose back is red. */
export function exact() {
  const red = FACES.filter((f) => f.up === "red");
  return { redBacks: red.filter((f) => f.back === "red").length, redFaces: red.length };
}

/** Seeded draws: a random card, a random side up. */
export function draws(seed = SEED, n = MAX_DRAWS): Face[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, () => {
    const card = randInt(rnd, 0, 2);
    const side = randInt(rnd, 0, 1) as 0 | 1;
    return FACES[card * 2 + side];
  });
}

export function tally(d: Face[], n: number) {
  let red = 0;
  let redBack = 0;
  for (let i = 0; i < n; i++) {
    if (d[i].up === "red") {
      red++;
      if (d[i].back === "red") redBack++;
    }
  }
  return { red, redBack };
}
