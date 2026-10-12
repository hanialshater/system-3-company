// Survivorship bias, toy model. Each plane takes HITS bullets at uniformly random points on
// its silhouette. A hit on any engine brings the plane down; hits anywhere else do not.
// Only planes that come back can be inspected.

export const HITS = 3;
export const MAX_PLANES = 400;

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Silhouette (viewBox 300 x 220), top view, nose up.
export const FUSELAGE = { cx: 150, cy: 110, rx: 17, ry: 98 };
export const WING = { x: 20, y: 90, w: 260, h: 28 };
export const TAIL = { x: 104, y: 176, w: 92, h: 16 };
export const ENGINES = [62, 106, 194, 238].map((cx) => ({ cx, cy: 100, rx: 9, ry: 17 }));

const inEllipse = (x: number, y: number, e: { cx: number; cy: number; rx: number; ry: number }) =>
  ((x - e.cx) / e.rx) ** 2 + ((y - e.cy) / e.ry) ** 2 <= 1;
const inRect = (x: number, y: number, r: { x: number; y: number; w: number; h: number }) =>
  x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;

export const isEngine = (x: number, y: number) => ENGINES.some((e) => inEllipse(x, y, e));
export const onPlane = (x: number, y: number) =>
  isEngine(x, y) || inEllipse(x, y, FUSELAGE) || inRect(x, y, WING) || inRect(x, y, TAIL);

export interface Plane {
  holes: { x: number; y: number; engine: boolean }[];
  lost: boolean;
}

export function fleet(seed = 1943, n = MAX_PLANES): Plane[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, () => {
    const holes: Plane["holes"] = [];
    while (holes.length < HITS) {
      const x = 20 + rnd() * 260;
      const y = 12 + rnd() * 196;
      if (onPlane(x, y)) holes.push({ x, y, engine: isEngine(x, y) });
    }
    return { holes, lost: holes.some((h) => h.engine) };
  });
}

/** Share of the silhouette's area that is engine, estimated on a fine grid. */
export function engineShare(): number {
  let on = 0;
  let eng = 0;
  for (let x = 20; x <= 280; x += 0.25)
    for (let y = 12; y <= 208; y += 0.25)
      if (onPlane(x, y)) {
        on++;
        if (isEngine(x, y)) eng++;
      }
  return eng / on;
}
