// Pure geometry for left-or-right (spec company/design/specs/left-or-right.md, B2). No kit import here:
// Demo.tsx passes in the kit's drawings, and card.test.mjs passes in the same drawings, so the unit test
// runs exactly the code the lesson runs (node --test strips the types).
//
// The four rest states (spec "Rest states", PE-C4). Each says which face is on show and whether the
// screen reflects that face's drawing left to right, in the 0..100 drawing box:
//   front           front face, draw(pd)                                    x -> x
//   turned          card 180 deg, back face = draw(mirror(pd)) authored inside
//                   translate(100 0) scale(-1 1) (PE-C1)                    x -> 100 - x
//   mirrored        mirror wrapper scaleX(-1) round the front face           x -> 100 - x
//   mirroredTurned  wrapper reflection and back-face reflection cancel       x -> x
// The readout is the logical diagram (PE-C2): signs of pd, turnOver(pd), mirror(pd), turnOver(mirror(pd)).

export type Face = "front" | "back";
export type StateName = "front" | "turned" | "mirrored" | "mirroredTurned";
export type RestState = { name: StateName; turned: boolean; mirrored: boolean; face: Face; reflect: boolean };

export const STATES: readonly RestState[] = [
  { name: "front", turned: false, mirrored: false, face: "front", reflect: false },
  { name: "turned", turned: true, mirrored: false, face: "back", reflect: true },
  { name: "mirrored", turned: false, mirrored: true, face: "front", reflect: true },
  { name: "mirroredTurned", turned: true, mirrored: true, face: "back", reflect: false },
];

export function stateOf(turned: boolean, mirrored: boolean): RestState {
  return STATES.find((s) => s.turned === turned && s.mirrored === mirrored)!;
}

/** The kit's Drawing, the fields this module reads. */
export type DrawingLike = {
  size: number;
  edges: { from: number; to: number; d: string }[];
  crossings: { i: number; x: number; y: number; sign: number }[];
};

/** The logical diagram whose signs the readout shows (PE-C2). turnOver is for numbers only, never drawn. */
export function logicalPd<P>(st: RestState, pd: P, ops: { mirror: (p: P) => P; turnOver: (p: P) => P }): P {
  const q = st.mirrored ? ops.mirror(pd) : pd;
  return st.turned ? ops.turnOver(q) : q;
}

/** Screen x (view-box units) of a drawing-box x on this rest state. Reflections are about x = 50. */
export const screenX = (st: RestState, x: number): number => (st.reflect ? 100 - x : x);

type Pt = [number, number];
const nums = (d: string): number[] => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);

/** The four control points of an edge (draw() emits one cubic per edge: "Mx yCx1 y1 x2 y2 x y"). */
export function cubic(d: string): Pt[] {
  const n = nums(d);
  if (n.length !== 8) throw new Error(`edge is not a single cubic: ${d}`);
  return [
    [n[0], n[1]],
    [n[2], n[3]],
    [n[4], n[5]],
    [n[6], n[7]],
  ];
}

/** Every edge sampled at `per` + 1 points, reflected if the state reflects. */
export function strandPoints(D: DrawingLike, reflect: boolean, per = 200): Pt[] {
  const out: Pt[] = [];
  for (const e of D.edges) {
    const [p0, p1, p2, p3] = cubic(e.d);
    for (let k = 0; k <= per; k++) {
      const t = k / per;
      const u = 1 - t;
      const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
      const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
      out.push([reflect ? 100 - x : x, y]);
    }
  }
  return out;
}

/**
 * Crossing signs read from the drawn geometry as it appears on screen (the principal engineer's geoSigns,
 * company/engineering/reviews/2026-10-16-W-1567-flip-probe.mjs). At crossing i the incoming over edge ends
 * at the centre and the incoming under edge is cut short; the sign is the cross product of their end
 * directions. Raw values are in the screen's y-down frame: multiply by `calibrate(front)` to get the kit's
 * sign convention.
 */
export function geoSigns(D: DrawingLike, reflect: boolean): number[] {
  const X = (p: Pt): Pt => (reflect ? [100 - p[0], p[1]] : p);
  return D.crossings.map(({ i, x, y }) => {
    const C = X([x, y]);
    const inc = D.edges.filter((e) => e.to === i).map((e) => cubic(e.d).map(X));
    if (inc.length !== 2) throw new Error(`crossing ${i} has ${inc.length} incoming edges`);
    inc.sort((a, b) => Math.hypot(a[3][0] - C[0], a[3][1] - C[1]) - Math.hypot(b[3][0] - C[0], b[3][1] - C[1]));
    const [over, under] = inc;
    const dir = (b: Pt[]): Pt => [b[3][0] - b[2][0], b[3][1] - b[2][1]];
    const o = dir(over);
    const u = dir(under);
    return Math.sign(u[0] * o[1] - u[1] * o[0]);
  });
}

/** The one constant k with geoSigns(D, false)[i] * k = D.crossings[i].sign for every crossing (or null). */
export function calibrate(D: DrawingLike): number | null {
  const g = geoSigns(D, false);
  const ks = g.map((s, i) => s * D.crossings[i].sign);
  return ks.every((k) => k === ks[0]) && Math.abs(ks[0]) === 1 ? ks[0] : null;
}

// Marks (spec "Marks", L-1). View-box units; 1 unit = 2.5 px at 290 px.
export const BADGE_R = 4.6;
export const BADGE_RING = 0.5; // ring stroke width; half of it sits outside the disc
export const STROKE = 2; // S2
export const RING_R = 13; // L-1

export type Badge = { i: number; cx: number; cy: number; x: number; y: number; clear: number; gap: number };

/**
 * One badge per crossing, on a ring of radius 13 round the crossing's on-screen position: 32 angles
 * a*pi/16 from +x, y down; centres outside -3..103 skipped; the angle whose centre is farthest from every
 * strand centre line wins; ties go to the lowest angle. `gap` = badge edge to strand edge.
 */
export function placeBadges(D: DrawingLike, reflect: boolean, ringR = RING_R): Badge[] {
  const strand = strandPoints(D, reflect, 200);
  return D.crossings.map(({ i, x, y }) => {
    const X = reflect ? 100 - x : x;
    let best: { bx: number; by: number; clear: number } | null = null;
    for (let a = 0; a < 32; a++) {
      const bx = X + ringR * Math.cos((a * Math.PI) / 16);
      const by = y + ringR * Math.sin((a * Math.PI) / 16);
      if (bx < -3 || bx > 103 || by < -3 || by > 103) continue;
      let clear = Infinity;
      for (const [sx, sy] of strand) clear = Math.min(clear, Math.hypot(sx - bx, sy - by));
      if (!best || clear > best.clear) best = { bx, by, clear };
    }
    if (!best) throw new Error(`no badge angle fits crossing ${i}`);
    return { i, cx: X, cy: y, x: best.bx, y: best.by, clear: best.clear, gap: best.clear - BADGE_R - BADGE_RING / 2 - STROKE / 2 };
  });
}
