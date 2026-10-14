// Ring of N people, each linked to the 2 people on each side; shortcuts are extra random pairs
// (added, not rewired). Pure functions, seeded with mulberry32, shared by the stage and by the
// node check recorded in meta.json.
import { mulberry32, randInt } from "@/kit/random";

export const N = 100;
export const REACH = 2;
export const SEED = 1;
export const CHIPS = [0, 1, 5, 20] as const;

const key = (a: number, b: number) => (a < b ? a * N + b : b * N + a);

export function ringEdges(): [number, number][] {
  const e: [number, number][] = [];
  for (let i = 0; i < N; i++) for (let d = 1; d <= REACH; d++) e.push([i, (i + d) % N]);
  return e;
}

/** First `count` shortcuts of one fixed sequence, so chip 5 contains chip 1's link (nested). */
export function shortcuts(count: number, seed = SEED): [number, number][] {
  const rng = mulberry32(seed);
  const used = new Set(ringEdges().map(([a, b]) => key(a, b)));
  const out: [number, number][] = [];
  while (out.length < count) {
    const a = randInt(rng, 0, N - 1);
    const b = randInt(rng, 0, N - 1);
    if (a === b || used.has(key(a, b))) continue;
    used.add(key(a, b));
    out.push([a, b]);
  }
  return out;
}

export function adjacency(extra: [number, number][]): number[][] {
  const adj: number[][] = Array.from({ length: N }, () => []);
  for (const [a, b] of [...ringEdges(), ...extra]) {
    adj[a].push(b);
    adj[b].push(a);
  }
  return adj;
}

/** Average steps over all pairs of different people (exact all-pairs BFS). */
export function averageSteps(adj: number[][]): number {
  let total = 0;
  for (let s = 0; s < N; s++) {
    const dist = new Array(N).fill(-1);
    dist[s] = 0;
    const q = [s];
    for (let h = 0; h < q.length; h++) {
      for (const v of adj[q[h]]) if (dist[v] < 0) { dist[v] = dist[q[h]] + 1; q.push(v); }
    }
    for (let t = 0; t < N; t++) total += dist[t];
  }
  return total / (N * (N - 1));
}

/** Share of a person's contacts who know each other, averaged over people. */
export function clustering(adj: number[][]): number {
  const sets = adj.map((l) => new Set(l));
  let sum = 0;
  for (let i = 0; i < N; i++) {
    const nb = adj[i];
    const k = nb.length;
    let links = 0;
    for (let x = 0; x < k; x++) for (let y = x + 1; y < k; y++) if (sets[nb[x]].has(nb[y])) links++;
    sum += links / ((k * (k - 1)) / 2);
  }
  return sum / N;
}

/** One shortest route (list of people) from `from` to `to`, by BFS in fixed neighbour order. */
export function route(count: number, from: number, to: number, seed = SEED): number[] {
  const adj = adjacency(shortcuts(count, seed));
  const prev = new Array(N).fill(-1);
  prev[from] = from;
  const q = [from];
  for (let h = 0; h < q.length; h++) {
    for (const v of adj[q[h]]) if (prev[v] < 0) { prev[v] = q[h]; q.push(v); }
  }
  const out = [to];
  while (out[0] !== from) out.unshift(prev[out[0]]);
  return out;
}

export const measure =(count: number, seed = SEED) => {
  const adj = adjacency(shortcuts(count, seed));
  return { steps: averageSteps(adj), clustering: clustering(adj) };
};
