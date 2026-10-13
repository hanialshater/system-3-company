// Friendship paradox on a five-person star: one hub friends with four people who know only the hub.
// Pick a random person, then one of their friends at random: how many friends does that friend have?
// Pure functions so the numbers in meta.json can be re-run in node.

import { mulberry32 } from "@/kit/random";

export const PEOPLE = ["Hub", "Ana", "Ben", "Cy", "Dee"];
export const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
];

export const friendsOf = (i: number) => EDGES.filter((e) => e.includes(i)).map(([a, b]) => (a === i ? b : a));
export const degree = (i: number) => friendsOf(i).length;

/** Average number of friends over everyone: 8 / 5 = 1.6 */
export const meanDegree = () => PEOPLE.reduce((a, _, i) => a + degree(i), 0) / PEOPLE.length;

/** Exact expected friend count of a random friend of a random person: 0.2 x 1 + 0.8 x 4 = 3.4 */
export const meanFriendDegree = () =>
  PEOPLE.reduce((a, _, i) => a + friendsOf(i).reduce((b, f) => b + degree(f), 0) / degree(i), 0) / PEOPLE.length;

export interface Pick {
  person: number;
  friend: number;
}

/** A seeded sequence of (person, friend) picks. */
export function picks(n = 1000, seed = 1991): Pick[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, () => {
    const person = Math.floor(rnd() * PEOPLE.length);
    const fs = friendsOf(person);
    return { person, friend: fs[Math.floor(rnd() * fs.length)] };
  });
}

export function average(ps: Pick[]) {
  return ps.length ? ps.reduce((a, p) => a + degree(p.friend), 0) / ps.length : 0;
}
