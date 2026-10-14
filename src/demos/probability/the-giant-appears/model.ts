// Random-link world: G(n, m). N people, links added one at a time between random pairs that are
// not yet linked (mulberry32, seed 1). The first m links are the world with m links, so adding
// links never redraws anything. The biggest group is found with union-find.
import { mulberry32 } from "@/kit/random";

export const N = 200;
export const SEED = 1;
export const MAX_LINKS = 300;
/** Average friends each; links = friends x N / 2. */
export const CHIPS = [0.5, 1, 1.5, 2, 3] as const;
export const linksFor = (friends: number) => (friends * N) / 2;

export const LINKS: [number, number][] = (() => {
  const rng = mulberry32(SEED);
  const seen = new Set<number>();
  const out: [number, number][] = [];
  while (out.length < MAX_LINKS) {
    const a = Math.floor(rng() * N);
    const b = Math.floor(rng() * N);
    if (a === b) continue;
    const key = a < b ? a * N + b : b * N + a;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push([a, b]);
  }
  return out;
})();

/** Fixed dot positions: a jittered 20 x 10 grid (own seed, so the layout never depends on links). */
export const POS: [number, number][] = (() => {
  const rng = mulberry32(77);
  const cells = Array.from({ length: N }, (_, i) => i);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const pos: [number, number][] = new Array(N);
  cells.forEach((cell, person) => {
    const c = cell % 20;
    const r = Math.floor(cell / 20);
    pos[person] = [12 + c * 16.3 + (rng() - 0.5) * 6, 12 + r * 15.5 + (rng() - 0.5) * 5];
  });
  return pos;
})();

/** Biggest connected group after the first m links (ties: the group holding the lowest-numbered person). */
export function biggest(m: number) {
  const p = Array.from({ length: N }, (_, i) => i);
  const find = (x: number): number => {
    while (p[x] !== x) {
      p[x] = p[p[x]];
      x = p[x];
    }
    return x;
  };
  for (let i = 0; i < m; i++) p[find(LINKS[i][0])] = find(LINKS[i][1]);
  const size = new Map<number, number>();
  for (let i = 0; i < N; i++) size.set(find(i), (size.get(find(i)) ?? 0) + 1);
  let best = -1;
  let bestSize = 0;
  for (let i = 0; i < N; i++) {
    const sz = size.get(find(i))!;
    if (sz > bestSize) {
      bestSize = sz;
      best = find(i);
    }
  }
  const inGiant = Array.from({ length: N }, (_, i) => find(i) === best);
  return { size: bestSize, inGiant };
}
