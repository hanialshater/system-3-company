// Made-up island, 40 x 24 squares, 1 square = 5 km (port of section `watershed` in
// company/domains/briefs/checks/geography-wave-j.mjs). A north-south ridge near the WEST coast
// (x = 7 +/- 1.5) plus seeded noise (mulberry32 seed 7, chosen before running). The west sea is
// column -1, the east sea column 40; the north and south edges are cliffs (no outflow).
// Priority-flood pit filling (Barnes, Lehman and Mulla 2014), then D8 steepest descent
// (O'Callaghan and Mark 1984). Every square ends in exactly one sea.

export const W = 40;
export const H = 24;
export const KM = 5;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const D8: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
export const ridge = (y: number) => 7 + Math.round(1.5 * Math.sin(y / 3.5));

function build() {
  const rnd = mulberry32(7);
  const noise = Array.from({ length: H }, () => Array.from({ length: W }, () => rnd()));
  const h = Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x) => {
      const r = ridge(y);
      const base = x <= r ? (100 * (x + 1)) / (r + 1) : (100 * (W - x)) / (W - r);
      return base + 6 * noise[y][x];
    }),
  );
  const filled = h.map((r) => r.slice());
  const done = h.map((r) => r.map(() => false));
  const pq: [number, number, number][] = [];
  for (let y = 0; y < H; y++) {
    pq.push([filled[y][0], 0, y]);
    pq.push([filled[y][W - 1], W - 1, y]);
    done[y][0] = done[y][W - 1] = true;
  }
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [z, x, y] = pq.shift()!;
    for (const [dx, dy] of D8) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H || done[ny][nx]) continue;
      done[ny][nx] = true;
      filled[ny][nx] = Math.max(filled[ny][nx], z + 1e-3);
      pq.push([filled[ny][nx], nx, ny]);
    }
  }
  return filled;
}

export const filled = build();
const at = (x: number, y: number) => (y >= 0 && y < H && x >= 0 && x < W ? filled[y][x] : Infinity);

export type Sea = "west" | "east";
/** The squares a drop visits, start included, and the sea it ends in. */
export function trace(x0: number, y0: number): { path: [number, number][]; sea: Sea } {
  let x = x0, y = y0;
  const path: [number, number][] = [[x, y]];
  for (;;) {
    if (x === 0 && filled[y][x] <= Math.min(...[[1, 0], [0, 1], [0, -1], [1, 1], [1, -1]].map(([dx, dy]) => at(x + dx, y + dy)))) return { path, sea: "west" };
    if (x === W - 1 && filled[y][x] <= Math.min(...[[-1, 0], [0, 1], [0, -1], [-1, 1], [-1, -1]].map(([dx, dy]) => at(x + dx, y + dy)))) return { path, sea: "east" };
    let best: [number, number, number] | null = null;
    for (const [dx, dy] of D8) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const s = (filled[y][x] - filled[ny][nx]) / Math.hypot(dx, dy);
      if (s > 0 && (!best || s > best[0])) best = [s, nx, ny];
    }
    if (!best) return { path, sea: x < W / 2 ? "west" : "east" };
    x = best[1];
    y = best[2];
    path.push([x, y]);
  }
}

/** Which sea each square drains to. */
export const outlet: Sea[][] = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_, x) => trace(x, y).sea));
export const eastCount = outlet.flat().filter((o) => o === "east").length;
export const nearerWestButEast = outlet.flat().filter((o, i) => {
  const x = i % W;
  return x + 1 < W - x && o === "east";
}).length;

export const DOT: [number, number] = [10, 12];
export const WEST_DROP: [number, number] = [5, 12];

let lo = Infinity, hi = -Infinity;
for (const r of filled) for (const v of r) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
export const LO = lo;
export const HI = hi;
