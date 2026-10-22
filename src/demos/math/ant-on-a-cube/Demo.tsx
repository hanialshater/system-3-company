"use client";

// Ant on a cube. A 1 m cube in a fixed oblique view; the ant starts at the front-bottom-left corner and
// walks to the far corner (back-top-right). "Along the edges" and "Diagonal then edge" draw those routes
// with their lengths, computed from the 3D route. "Unfold two faces" swings the right face out about the
// front-right edge (a hinge) until it lies flat beside the front face: a 2 by 1 rectangle, and the walk is
// one straight line. "Fold back up" swings it back: the same line is the bent path on the cube, crossing the
// shared edge at its midpoint. Each tried chip keeps a trace (✓ and its length), so Reset cannot erase what
// the reveal quotes. Brief: company/domains/briefs/math.geometry.md, Wave J, brief 4 (check G4).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const MILESTONES = ["route", "flat", "folded"] as const;

type V3 = [number, number, number];
type Route = "edges" | "diag" | "bent" | null;
type View = "cube" | "flat";
type State = { view: View; route: Route };
const START: State = { view: "cube", route: null };

// Oblique (cabinet) view: depth z drawn up and to the right at half scale.
const K = 0.5;
const A = (35 * Math.PI) / 180;
const KX = K * Math.cos(A);
const KY = K * Math.sin(A);
const S = 120; // px per metre
const W = 320;
const H = 212;
const CX = W / 2;
const Y0 = 186; // the cube's bottom edge

const START_PT: V3 = [0, 0, 0];
const MID: V3 = [1, 0.5, 0]; // midpoint of the shared (front-right) edge
const ROUTES: Record<Exclude<Route, null>, V3[]> = {
  edges: [START_PT, [1, 0, 0], [1, 1, 0], [1, 1, 1]],
  diag: [START_PT, [1, 1, 0], [1, 1, 1]],
  bent: [START_PT, MID, [1, 1, 1]],
};

/** Length of a route on the folded cube (metres). */
function lengthOf(pts: V3[]) {
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1], pts[i][2] - pts[i - 1][2]);
  return L;
}
const LEN = { edges: lengthOf(ROUTES.edges), diag: lengthOf(ROUTES.diag), bent: lengthOf(ROUTES.bent) };
// The unfolded net: front face [0,1]×[0,1] and the right face laid flat beside it, [1,2]×[0,1].
const NET_W = 2;
const NET_H = 1;
const LEN_FLAT = Math.hypot(NET_W, NET_H);
const f2 = (v: number) => v.toFixed(2);

/** A point of the right face (x = 1) after swinging it out by t (0 = on the cube, 1 = flat). */
function swing(p: V3, t: number): V3 {
  if (p[0] !== 1) return p;
  const phi = (t * Math.PI) / 2;
  return [1 + p[2] * Math.sin(phi), p[1], p[2] * Math.cos(phi)];
}

/** Screen position; the drawing recentres as the net widens. */
function proj(p: V3, t: number): [number, number] {
  const centre = (1 + KX) / 2 + ((NET_W - (1 + KX)) / 2) * t;
  return [CX + S * (p[0] + KX * p[2] - centre), Y0 - S * (p[1] + KY * p[2])];
}
const pts = (ps: V3[], t: number) => ps.map((p) => proj(p, t).join(",")).join(" ");

type Seen = { edges: number | null; diag: number | null; flat: number | null; folded: number | null };

export default function AntOnACube({ slug }: { slug: string }) {
  const [state, setState] = useState<State>(START);
  const seen = useRef<Seen>({ edges: null, diag: null, flat: null, folded: null });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You watch an ant on the outside of a 1 m cube. It walks from one bottom corner to the top corner farthest from it, never leaving the surface. Its shortest walk is about…",
        options: ["2.2 m", "2.4 m", "3.0 m"],
        answer: 0,
      }}
      exploreHint="Try both routes on the cube, then unfold two faces and fold them back up."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const sn = seen.current;
        const first =
          sn.edges !== null && sn.diag !== null
            ? `Along the edges was ${f2(sn.edges)} m and the face diagonal plus an edge ${f2(sn.diag)} m.`
            : sn.edges !== null
              ? `Along the edges was ${f2(sn.edges)} m.`
              : `The face diagonal plus an edge was ${f2(sn.diag ?? LEN.diag)} m.`;
        const flat = f2(sn.flat ?? LEN_FLAT);
        return (
          <>
            <p>{first}</p>
            <p>
              Unfolding the front and right faces into a flat 1 by 2 rectangle turned the walk into one straight line, √(1² + 2²) = √5,
              about {flat} m. Folded back up, it bends across the shared edge at its midpoint, and no route over other
              faces is shorter.
            </p>
            <p>On a flat sheet a straight line is shortest, so the best walk over a box is found by unfolding it.</p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} state={state} setState={setState} seen={seen.current} />}
    </Lesson>
  );
}

/** Eases the swing t towards its target (0 on the cube, 1 flat) in about 350 ms; instant with reduced motion. */
function useSwing(target: number) {
  const [t, setT] = useState(target);
  const tRef = useRef(target);
  useEffect(() => {
    const from = tRef.current;
    if (from === target) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      tRef.current = target;
      setT(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / 350);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const v = from + (target - from) * e;
      tRef.current = v;
      setT(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return t;
}

function Stage({
  locked,
  interact,
  state,
  setState,
  seen,
}: StageContext & { state: State; setState: (v: State) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const t = useSwing(state.view === "flat" ? 1 : 0);
  const fade = 1 - t;

  const go = (next: State) => {
    setState(next);
    if (next.view === "flat") {
      if (seen.flat === null) seen.flat = LEN_FLAT;
      reach("flat");
    } else if (next.route === "edges") {
      if (seen.edges === null) seen.edges = LEN.edges;
      reach("route");
    } else if (next.route === "diag") {
      if (seen.diag === null) seen.diag = LEN.diag;
      reach("route");
    } else if (next.route === "bent" && seen.flat !== null) {
      if (seen.folded === null) seen.folded = LEN.bent;
      reach("folded");
    }
  };

  // Faces (the right face swings with t; the top face fades as it opens).
  const front: V3[] = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]];
  const top: V3[] = [[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]];
  const right: V3[] = ([[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]] as V3[]).map((p) => swing(p, t));
  const end = proj(swing([1, 1, 1], t), t);
  const start = proj(START_PT, t);
  const mid = proj(MID, t);

  const showLine = state.view === "flat" || state.route === "bent";
  // After Reset the folded path stays as a faint trace, so the bent path the reveal names is still on the stage.
  const ghost = !showLine && state.view === "cube" && state.route === null && seen.folded !== null && t < 0.01;
  const route = state.view === "cube" && state.route && state.route !== "bent" ? ROUTES[state.route] : null;
  const readout =
    state.view === "flat" ? `length ${f2(LEN_FLAT)} m` : state.route ? `length ${f2(LEN[state.route])} m` : "";
  const isFlat = t > 0.999;
  const bx0 = proj([0, 0, 0], t)[0];

  const chips: { label: string; next: State; on: boolean; trace: string | null }[] = [
    { label: "Along the edges", next: { view: "cube", route: "edges" }, on: state.view === "cube" && state.route === "edges", trace: seen.edges !== null ? `✓ ${f2(seen.edges)} m` : null },
    { label: "Diagonal then edge", next: { view: "cube", route: "diag" }, on: state.view === "cube" && state.route === "diag", trace: seen.diag !== null ? `✓ ${f2(seen.diag)} m` : null },
    { label: "Unfold two faces", next: { view: "flat", route: null }, on: state.view === "flat", trace: seen.flat !== null ? `✓ ${f2(seen.flat)} m` : null },
    { label: "Fold back up", next: { view: "cube", route: "bent" }, on: state.view === "cube" && state.route === "bent", trace: seen.folded !== null ? `✓ ${f2(seen.folded)} m` : null },
  ];
  const atStart = state.view === START.view && state.route === START.route;

  const aria =
    state.view === "flat"
      ? `Two faces unfolded into a 2 by 1 rectangle; a straight line from corner to corner, ${f2(LEN_FLAT)} m`
      : `A 1 m cube, the ant at one bottom corner and the far top corner marked${readout ? `; ${readout}` : ""}`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={aria}>
        {/* the top face fades as the net opens (only the front and right faces are unfolded) */}
        {fade > 0.01 && <polygon points={pts(top, t)} className={s.top} opacity={fade} />}
        <polygon points={pts(right, t)} className={s.right} />
        <polygon points={pts(front, t)} className={s.front} />

        {/* the shared edge, dashed once the faces lie flat */}
        {t > 0.01 && (
          <line
            x1={proj([1, 0, 0], t)[0]}
            y1={proj([1, 0, 0], t)[1]}
            x2={proj([1, 1, 0], t)[0]}
            y2={proj([1, 1, 0], t)[1]}
            className={s.shared}
            opacity={t}
          />
        )}

        {/* the routes on the cube */}
        {route && t < 0.01 && <polyline points={pts(route, 0)} className={s.route} />}
        {showLine && <polyline points={[start, mid, end].map((p) => p.join(",")).join(" ")} className={s.best} />}
        {ghost && <polyline points={pts(ROUTES.bent, 0)} className={s.ghost} />}
        {showLine && <circle cx={mid[0]} cy={mid[1]} r={4.5} className={s.midDot} />}

        {/* sizes */}
        {isFlat ? (
          <>
            <text x={(bx0 + proj([2, 0, 0], t)[0]) / 2} y={Y0 + 20} textAnchor="middle" className={s.label}>
              2 m
            </text>
            <text x={bx0 - 8} y={Y0 - S / 2 + 5} textAnchor="end" className={s.label}>
              1 m
            </text>
            <text x={CX} y={Y0 - S * NET_H - 14} textAnchor="middle" className={`${s.label} ${s.halo}`}>
              √(1² + 2²) = {f2(LEN_FLAT)} m
            </text>
          </>
        ) : (
          t < 0.01 && (
            <text x={(bx0 + proj([1, 0, 0], t)[0]) / 2} y={Y0 + 20} textAnchor="middle" className={s.label}>
              1 m
            </text>
          )
        )}

        {/* the ant (start) and the far corner (end) */}
        <g aria-hidden="true" transform={`translate(${start[0]},${start[1]})`}>
          <circle r={10} className={s.startDot} />
          <ellipse cx={-4.6} cy={0} rx={3.4} ry={2.6} className={s.ant} />
          <ellipse cx={0.4} cy={0} rx={2.2} ry={1.9} className={s.ant} />
          <ellipse cx={5} cy={0} rx={3} ry={2.4} className={s.ant} />
          <path d="M-1 -2 L-3 -6 M1 -2 L1 -6.5 M2 -2 L4 -6 M-1 2 L-3 6 M1 2 L1 6.5 M2 2 L4 6" className={s.legs} />
        </g>
        <circle cx={end[0]} cy={end[1]} r={7} className={s.endRing} />
        <circle cx={end[0]} cy={end[1]} r={2.5} className={s.endDot} />

        {readout && (
          <text x={W / 2} y={18} textAnchor="middle" className={s.readout}>
            {readout}
          </text>
        )}
      </svg>

      <Row>
        {chips.map((c) => (
          <Control
            key={c.label}
            disabled={locked || c.on}
            className={`${s.tap} ${c.on ? "active" : ""}`}
            aria-pressed={c.on}
            onClick={() => go(c.next)}
          >
            <span>{c.label}</span>
            {c.trace && <span className={s.trace}>{c.trace}</span>}
          </Control>
        ))}
        <Control disabled={locked || atStart} className={s.tap} onClick={() => setState(START)}>
          Reset
        </Control>
      </Row>
    </div>
  );
}
