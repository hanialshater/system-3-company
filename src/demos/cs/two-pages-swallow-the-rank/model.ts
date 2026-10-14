// Six pages. A -> B -> C -> A is a loop, C also links to D, D -> E, and E and F link only to each other.
// Basic rule: every round each page splits its whole score equally among its links.
// With jumps (s = 0.85): each page passes 85% along its links and 15% is spread evenly over all 6 pages.

export const PAGES = ["A", "B", "C", "D", "E", "F"] as const;
export type Page = (typeof PAGES)[number];
export const LINKS: Record<Page, Page[]> = { A: ["B"], B: ["C"], C: ["A", "D"], D: ["E"], E: ["F"], F: ["E"] };
export const JUMP = 0.15;

export function scores(rounds: number, jumps: boolean): Record<Page, number> {
  const s = jumps ? 1 - JUMP : 1;
  let v = Object.fromEntries(PAGES.map((p) => [p, 1 / PAGES.length])) as Record<Page, number>;
  for (let r = 0; r < rounds; r++) {
    const w = Object.fromEntries(PAGES.map((p) => [p, (1 - s) / PAGES.length])) as Record<Page, number>;
    for (const p of PAGES) for (const q of LINKS[p]) w[q] += (s * v[p]) / LINKS[p].length;
    v = w;
  }
  return v;
}

export const sinkShare = (rounds: number, jumps: boolean) => {
  const v = scores(rounds, jumps);
  return v.E + v.F;
};
export const pct = (x: number) => `${(x * 100).toFixed(1)}%`;
