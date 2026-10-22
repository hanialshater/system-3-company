"use client";

// Slice a corner off. A cube is drawn as a wireframe (hidden edges dashed). "Slice a corner" cuts off
// its front top right corner, "Slice another" its front top left corner, "Square pyramid" swaps in a
// square pyramid and "Slice its tip" cuts off its apex. Every count on the stage is recounted from the
// drawn solid (vertices, edges from the faces, faces), not typed in; each slice cuts every edge at the
// corner 30 % (cube) or 35 % (pyramid) of the way along, so the new face is a triangle or a square.
// Milestones: a cube corner sliced (the question's case), the pyramid's tip sliced. Each records its
// change, kept as a trace on its chip, so Reset cannot erase what the reveal quotes.
// Brief: company/domains/briefs/math.geometry.md, Wave J, brief 5 (check G5).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

type V3 = [number, number, number];
type Face = { v: number[]; cut: number }; // cut: 0 original face, n = made by the n-th slice
type Solid = { verts: V3[]; faces: Face[]; slices: number };

const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const mean = (ps: V3[]): V3 => mul(ps.reduce(add, [0, 0, 0] as V3), 1 / ps.length);

/** Newell normal of a polygon. */
function normal(ps: V3[]): V3 {
  const n: V3 = [0, 0, 0];
  ps.forEach((p, i) => {
    const q = ps[(i + 1) % ps.length];
    n[0] += (p[1] - q[1]) * (p[2] + q[2]);
    n[1] += (p[2] - q[2]) * (p[0] + q[0]);
    n[2] += (p[0] - q[0]) * (p[1] + q[1]);
  });
  return n;
}

/** Drop unused vertices and turn every face to face outwards. */
function tidy(verts: V3[], faces: Face[], slices: number): Solid {
  const used = [...new Set(faces.flatMap((f) => f.v))].sort((a, b) => a - b);
  const map = new Map(used.map((old, i) => [old, i]));
  const nv = used.map((i) => verts[i]);
  const c = mean(nv);
  const nf = faces.map((f) => {
    const v = f.v.map((i) => map.get(i)!);
    const ps = v.map((i) => nv[i]);
    return { v: dot(normal(ps), sub(mean(ps), c)) < 0 ? [...v].reverse() : v, cut: f.cut };
  });
  return { verts: nv, faces: nf, slices };
}

function edges(solid: Solid): [number, number][] {
  const seen = new Map<string, [number, number]>();
  for (const f of solid.faces)
    f.v.forEach((a, i) => {
      const b = f.v[(i + 1) % f.v.length];
      const k = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (!seen.has(k)) seen.set(k, a < b ? [a, b] : [b, a]);
    });
  return [...seen.values()];
}

/** Cut off the corner nearest `at`: each edge there is cut a fraction t of the way along. */
function slice(solid: Solid, at: V3, t: number): Solid {
  const vi = solid.verts.reduce((best, p, i) => (dot(sub(p, at), sub(p, at)) < dot(sub(solid.verts[best], at), sub(solid.verts[best], at)) ? i : best), 0);
  const v = solid.verts[vi];
  const verts = [...solid.verts];
  const made = new Map<number, number>();
  const cutPoint = (n: number) => {
    if (!made.has(n)) {
      made.set(n, verts.length);
      verts.push(add(v, mul(sub(solid.verts[n], v), t)));
    }
    return made.get(n)!;
  };
  const faces: Face[] = solid.faces.map((f) => {
    const j = f.v.indexOf(vi);
    if (j < 0) return f;
    const prev = f.v[(j - 1 + f.v.length) % f.v.length];
    const next = f.v[(j + 1) % f.v.length];
    return { v: [...f.v.slice(0, j), cutPoint(prev), cutPoint(next), ...f.v.slice(j + 1)], cut: f.cut };
  });
  // The new face: the cut points, in order round the corner's axis.
  const ring = [...made.values()];
  const c = mean(ring.map((i) => verts[i]));
  const axis = sub(v, mean(solid.verts));
  const u0 = sub(verts[ring[0]], c);
  const w0 = cross(axis, u0);
  ring.sort((a, b) => {
    const pa = sub(verts[a], c);
    const pb = sub(verts[b], c);
    return Math.atan2(dot(pa, w0), dot(pa, u0)) - Math.atan2(dot(pb, w0), dot(pb, u0));
  });
  faces.push({ v: ring, cut: solid.slices + 1 });
  return tidy(verts, faces, solid.slices + 1);
}

const counts = (solid: Solid) => {
  const V = solid.verts.length;
  const E = edges(solid).length;
  const F = solid.faces.length;
  return { V, E, F, chi: V - E + F };
};

const CUBE = tidy(
  [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]],
  [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]].map((v) => ({ v, cut: 0 })),
  0,
);
const PYR = tidy(
  [[-1.2, -0.9, -1.2], [1.2, -0.9, -1.2], [1.2, -0.9, 1.2], [-1.2, -0.9, 1.2], [0, 1.4, 0]],
  [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]].map((v) => ({ v, cut: 0 })),
  0,
);

type Key = "cube" | "cube1" | "cube2" | "pyr" | "pyr1";
const SOLIDS: Record<Key, Solid> = (() => {
  const cube1 = slice(CUBE, [1, 1, 1], 0.3);
  return {
    cube: CUBE,
    cube1,
    cube2: slice(cube1, [-1, 1, 1], 0.3),
    pyr: PYR,
    pyr1: slice(PYR, [0, 1.4, 0], 0.35),
  };
})();
const BEFORE: Partial<Record<Key, Key>> = { cube1: "cube", cube2: "cube1", pyr1: "pyr" };

/** The change a slice made: corners, edges, faces. */
function change(key: Key) {
  const b = BEFORE[key];
  if (!b) return null;
  const a = counts(SOLIDS[key]);
  const p = counts(SOLIDS[b]);
  return { dV: a.V - p.V, dE: a.E - p.E, dF: a.F - p.F, chi: a.chi };
}
type Change = NonNullable<ReturnType<typeof change>>;
const sumText = (c: Change) => `+${c.dV} − ${c.dE} + ${c.dF} = ${c.dV - c.dE + c.dF}`;

const MILESTONES = ["cubeSliced", "tipSliced"] as const;

// View: turn 30° about the vertical, tip 22° towards the viewer (who looks along −z).
const YAW = (-30 * Math.PI) / 180;
const PITCH = (22 * Math.PI) / 180;
function rot([x, y, z]: V3): V3 {
  const x1 = x * Math.cos(YAW) + z * Math.sin(YAW);
  const z1 = -x * Math.sin(YAW) + z * Math.cos(YAW);
  return [x1, y * Math.cos(PITCH) - z1 * Math.sin(PITCH), y * Math.sin(PITCH) + z1 * Math.cos(PITCH)];
}
const W = 340;
const H = 236;
const SC = 52;
const CX = 170;
const CY = 146;

type Seen = { cube: Change | null; tip: Change | null };

export default function SliceACornerOff({ slug }: { slug: string }) {
  const [key, setKey] = useState<Key>("cube");
  const seen = useRef<Seen>({ cube: null, tip: null });
  const start = counts(CUBE);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You hold a wooden cube: ${start.V} corners − ${start.E} edges + ${start.F} faces = ${start.chi}. You slice one corner off with a knife. Now what is corners − edges + faces?`,
        options: ["Less than 2", "Still 2", "More than 2"],
        answer: 1,
      }}
      exploreHint="Slice a corner, then another, then try the pyramid's tip."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const c = seen.current.cube ?? change("cube1")!;
        const t = seen.current.tip ?? change("pyr1")!;
        return (
          <>
            <p>
              Slicing a corner off your cube lost 1 corner and made {c.dV + 1}, so +{c.dV} corners, +{c.dE} edges and +
              {c.dF} face: {c.dV} − {c.dE} + {c.dF} = 0, and the total stayed {c.chi}. The pyramid&apos;s tip, where{" "}
              {t.dE} edges meet, gave +{t.dV} − {t.dE} + {t.dF} = 0 too.
            </p>
            <p>
              A slice through a corner where k edges meet always adds k − 1 corners, k edges and 1 face. For every convex
              solid the total is 2: Euler&apos;s formula.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} k={key} setKey={setKey} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({ locked, interact, k, setKey, seen }: StageContext & { k: Key; setKey: (v: Key) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const solid = SOLIDS[k];
  const n = counts(solid);
  const ch = change(k);

  const go = (next: Key) => {
    setKey(next);
    if (next === "cube1") {
      if (seen.cube === null) seen.cube = change("cube1");
      reach("cubeSliced");
    }
    if (next === "pyr1") {
      if (seen.tip === null) seen.tip = change("pyr1");
      reach("tipSliced");
    }
  };

  const P = solid.verts.map(rot);
  const scr = (i: number) => [CX + P[i][0] * SC, CY - P[i][1] * SC] as const;
  const front = solid.faces.map((f) => normal(f.v.map((i) => P[i]))[2] > 0);
  const faceOf = (a: number, b: number) =>
    solid.faces.flatMap((f, fi) => (f.v.some((x, i) => (x === a && f.v[(i + 1) % f.v.length] === b) || (x === b && f.v[(i + 1) % f.v.length] === a)) ? [fi] : []));
  const es = edges(solid).map(([a, b]) => ({ a, b, shown: faceOf(a, b).some((fi) => front[fi]) }));
  const vShown = solid.verts.map((_, i) => solid.faces.some((f, fi) => front[fi] && f.v.includes(i)));
  const poly = (v: number[]) => v.map((i) => scr(i).join(",")).join(" ");

  const chips: { label: string; next: Key; on: boolean; enabled: boolean; trace: string | null }[] = [
    { label: "Slice a corner", next: "cube1", on: k === "cube1", enabled: k === "cube" || k === "pyr" || k === "pyr1", trace: seen.cube ? `✓ ${sumText(seen.cube)}` : null },
    { label: "Slice another", next: "cube2", on: k === "cube2", enabled: k === "cube1", trace: null },
    { label: "Square pyramid", next: "pyr", on: k === "pyr", enabled: k !== "pyr", trace: null },
    { label: "Slice its tip", next: "pyr1", on: k === "pyr1", enabled: k === "pyr", trace: seen.tip ? `✓ ${sumText(seen.tip)}` : null },
  ];

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`${n.V} corners, ${n.E} edges, ${n.F} faces: ${n.V} − ${n.E} + ${n.F} = ${n.chi}`}
      >
        <text x={W / 2} y={16} textAnchor="middle" className={s.key}>
          corners − edges + faces
        </text>
        <text x={W / 2} y={38} textAnchor="middle" className={s.readout}>
          {n.V} − {n.E} + {n.F} = {n.chi}
        </text>
        {ch && (
          <text x={W / 2} y={58} textAnchor="middle" className={s.change}>
            +{ch.dV} corners, +{ch.dE} edges, +{ch.dF} face
          </text>
        )}

        {solid.faces.map((f, fi) =>
          front[fi] && f.cut > 0 ? (
            <polygon key={fi} points={poly(f.v)} className={f.cut === solid.slices && ch ? s.newFace : s.oldFace} />
          ) : null,
        )}
        {es.filter((e) => !e.shown).map((e) => (
          <line key={`h${e.a}-${e.b}`} x1={scr(e.a)[0]} y1={scr(e.a)[1]} x2={scr(e.b)[0]} y2={scr(e.b)[1]} className={s.hidden} />
        ))}
        {es.filter((e) => e.shown).map((e) => (
          <line key={`e${e.a}-${e.b}`} x1={scr(e.a)[0]} y1={scr(e.a)[1]} x2={scr(e.b)[0]} y2={scr(e.b)[1]} className={s.edge} />
        ))}
        {solid.verts.map((_, i) => (
          <circle key={i} cx={scr(i)[0]} cy={scr(i)[1]} r={vShown[i] ? 3.2 : 2.4} className={vShown[i] ? s.corner : s.cornerHidden} />
        ))}
      </svg>

      <Row>
        {chips.map((c) => (
          <Control
            key={c.label}
            disabled={locked || c.on || !c.enabled}
            className={`${s.tap} ${c.on ? "active" : ""}`}
            aria-pressed={c.on}
            onClick={() => go(c.next)}
          >
            <span>{c.label}</span>
            {c.trace && <span className={s.trace}>{c.trace}</span>}
          </Control>
        ))}
        <Control disabled={locked || k === "cube"} className={s.tap} onClick={() => setKey("cube")}>
          Reset
        </Control>
      </Row>
    </div>
  );
}
