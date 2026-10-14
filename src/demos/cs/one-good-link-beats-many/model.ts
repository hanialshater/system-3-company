// Scaled PageRank on a fixed 10-page graph. Rule: each page splits S of its score equally among the
// pages it links to, and every page also gets (1 - S) / N free. Start 1/N each. Every page has an
// out-link, so the total stays 1.

export const PAGES = ["A", "B", "C", "D", "H", "Y", "P", "Q", "R", "X"] as const;
export const S = 0.85;
export const N = PAGES.length;
export const FREE = (1 - S) / N; // 0.015
export const SETTLED_ROUND = 51;

// [from, to]
export const LINKS: [string, string][] = [
  ["A", "H"], ["B", "H"], ["C", "H"], ["D", "H"],
  ["H", "Y"], ["Y", "H"],
  ["P", "X"], ["Q", "X"], ["R", "X"],
  ["X", "A"],
];

const idx = (p: string) => PAGES.indexOf(p as (typeof PAGES)[number]);
const outDeg = PAGES.map((p) => LINKS.filter(([f]) => f === p).length);

export function step(scores: number[]): number[] {
  const next = PAGES.map(() => FREE);
  for (const [f, t] of LINKS) next[idx(t)] += (S * scores[idx(f)]) / outDeg[idx(f)];
  return next;
}

export const ROUNDS: number[][] = (() => {
  const out = [PAGES.map(() => 1 / N)];
  for (let r = 1; r <= SETTLED_ROUND; r++) out.push(step(out[r - 1]));
  return out;
})();

export const score = (round: number, page: string) => ROUNDS[round][idx(page)];
export const inLinks = (page: string) => LINKS.filter(([, t]) => t === page).length;
