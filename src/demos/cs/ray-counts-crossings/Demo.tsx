"use client";

// Point in polygon by ray casting. A ray from the point to the right crosses the boundary; each
// crossing flips inside/outside, and far right is outside, so an odd count means inside.
// U-shaped polygon (0,0) (6,0) (6,6) (4,6) (4,2) (2,2) (2,6) (0,6). From (3,4) in the notch the ray
// crosses x = 4 and x = 6: 2, outside. (1,4): 3, inside. (5,4): 1. (3,1): 1. (7,4): 0.
// Edge test is the half-open rule (an edge counts if exactly one end is above the ray's height), and
// the stage keeps the point off the boundary and off corner heights (y = 0, 2, 6), so no ties arise.
// v3 (wave G r7): the two points the reveal quotes (first gap point, first odd point) sit in their own
// "Seen" line that never drops them; the "Tried" trace keeps the last five (all presets fit).

import { useRef, useState, type PointerEvent } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Pt = [number, number];
const POLY: Pt[] = [
  [0, 0],
  [6, 0],
  [6, 6],
  [4, 6],
  [4, 2],
  [2, 2],
  [2, 6],
  [0, 6],
];
const XMIN = -0.5;
const XMAX = 8.5;
const YMIN = -0.5;
const YMAX = 6.5;

function crossings(px: number, py: number) {
  const hits: { edge: number; x: number }[] = [];
  for (let i = 0; i < POLY.length; i++) {
    const [x1, y1] = POLY[i];
    const [x2, y2] = POLY[(i + 1) % POLY.length];
    if (y1 > py !== y2 > py) {
      const xi = x1 + ((py - y1) * (x2 - x1)) / (y2 - y1);
      if (xi > px) hits.push({ edge: i, x: xi });
    }
  }
  return hits.sort((a, b) => a.x - b.x);
}
const onBoundary = (px: number, py: number) =>
  POLY.some(([x1, y1], i) => {
    const [x2, y2] = POLY[(i + 1) % POLY.length];
    return x1 === x2
      ? px === x1 && py >= Math.min(y1, y2) && py <= Math.max(y1, y2)
      : py === y1 && px >= Math.min(x1, x2) && px <= Math.max(x1, x2);
  });
const CORNER_Y = new Set(POLY.map(([, y]) => y));
// snap a dragged point to the half-unit grid, off corner heights and off the boundary
function snap(x: number, y: number): Pt {
  let sx = Math.min(XMAX, Math.max(XMIN, Math.round(x * 2) / 2));
  let sy = Math.min(YMAX, Math.max(YMIN, Math.round(y * 2) / 2));
  if (CORNER_Y.has(sy)) sy += 0.5;
  if (onBoundary(sx, sy)) sx += 0.5;
  return [sx, sy];
}
const inNotch = (x: number, y: number) => x > 2 && x < 4 && y > 2 && y < 6;

const PRESETS: { p: Pt; label: string }[] = [
  { p: [1, 4], label: "(1, 4)" },
  { p: [3, 4], label: "(3, 4)" },
  { p: [5, 4], label: "(5, 4)" },
  { p: [3, 1], label: "(3, 1)" },
  { p: [7, 4], label: "(7, 4)" },
];
type Seen = { p: Pt; n: number };

// drawing
const S = 30;
const X = (x: number) => 25 + (x - XMIN) * S;
const Y = (y: number) => 12 + (YMAX - y) * S;
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

export default function RayCountsCrossings({ slug }: { slug: string }) {
  const [ptLive, setPt] = useState<Pt>([7, 4]);
  // v5 (learner r8): when the reveal opens, the stage draws the recorded odd point's ray again (labelled as a
  // replay), so the numbered crossings the reveal points at are on screen. Any tap or drag after that wins.
  const [movedInReveal, setMovedInReveal] = useState(false);
  // What the learner has seen: the last few points tried, and the first notch point and first odd point.
  const [log, setLog] = useState<Seen[]>([]);
  const [notch, setNotch] = useState<Seen | null>(null);
  const [odd, setOdd] = useState<Seen | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A U-shaped polygon has corners (0,0) (6,0) (6,6) (4,6) (4,2) (2,2) (2,6) (0,6). The point (3,4) sits in the gap between the arms. Shoot a ray from it to the right. Is the point inside?",
        options: ["Inside", "Outside", "Cannot tell without the area"],
        answer: 1,
      }}
      exploreHint="Tap each position, or drag the point. Watch where the ray turns solid or dashed."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {notch
              ? `In the gap, from (${fmt(notch.p[0])}, ${fmt(notch.p[1])}), the ray crossed ${notch.n} edges: into the right arm at x = 4, and out again at x = 6. `
              : ""}
            {odd ? `From (${fmt(odd.p[0])}, ${fmt(odd.p[1])}) it crossed ${odd.n}: odd, inside.` : ""}
          </p>
          <p>
            Look at the ray{odd ? ` from (${fmt(odd.p[0])}, ${fmt(odd.p[1])}), drawn again above` : ""}: at each numbered
            crossing it switches between solid (inside) and dashed (outside), and past the last crossing it is always
            outside. So odd means inside and even means outside, however central the point looks, with any number of
            notches.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={["inside-odd", "notch"]}>
          {(reach) => {
            const replay = phase === "reveal" && !movedInReveal && odd !== null;
            const pt: Pt = replay ? odd.p : ptLive;
            const hits = crossings(pt[0], pt[1]);
            const n = hits.length;
            const inside = n % 2 === 1;
            const go = (p: Pt) => {
              if (locked) return;
              if (phase === "reveal") setMovedInReveal(true);
              setPt(p);
              const k = crossings(p[0], p[1]).length;
              const seen = { p, n: k };
              setLog((l) => {
                const last = l[l.length - 1];
                if (last && last.p[0] === p[0] && last.p[1] === p[1]) return l;
                return [...l.filter((x) => x.p[0] !== p[0] || x.p[1] !== p[1]), seen].slice(-5);
              });
              if (k % 2 === 1) {
                setOdd((o) => o ?? seen);
                reach("inside-odd");
              }
              if (inNotch(p[0], p[1])) {
                setNotch((o) => o ?? seen);
                reach("notch");
              }
            };
            const toLocal = (e: PointerEvent<SVGSVGElement>): Pt | null => {
              const svg = svgRef.current;
              const m = svg?.getScreenCTM();
              if (!svg || !m) return null;
              const q = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
              return snap(XMIN + (q.x - 25) / S, YMAX - (q.y - 12) / S);
            };
            const down = (e: PointerEvent<SVGSVGElement>) => {
              if (locked) return;
              dragging.current = true;
              e.currentTarget.setPointerCapture?.(e.pointerId);
              const p = toLocal(e);
              if (p) go(p);
            };
            const move = (e: PointerEvent<SVGSVGElement>) => {
              if (locked || !dragging.current) return;
              const p = toLocal(e);
              if (p && (p[0] !== pt[0] || p[1] !== pt[1])) go(p);
            };
            const up = () => {
              dragging.current = false;
            };

            const poly = POLY.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ");
            // The ray as stretches between crossings. Past the last crossing it is outside; each crossing flips it.
            const stops = [pt[0], ...hits.map((h) => h.x), XMAX + 6 / S];
            const stretches = stops.slice(0, -1).map((x0, i) => ({
              x0,
              x1: stops[i + 1],
              in: (hits.length - i) % 2 === 1,
            }));
            return (
              <div className={`${s.wrap} ${phase === "reveal" ? s.compact : ""}`}>
                {/* v5: at the reveal the note's words are in the readouts (Point, Crossings, Verdict), so it steps aside. */}
                {phase !== "reveal" && <p className={s.note}>
                  {locked
                    ? "Ray to the right from the point. Count the edges it crosses."
                    : `${replay ? "Again: " : ""}(${fmt(pt[0])}, ${fmt(pt[1])}): ${n} crossing${n === 1 ? "" : "s"}, ${n % 2 ? "odd" : "even"}, so ${inside ? "inside" : "outside"}.`}
                </p>}
                <svg
                  ref={svgRef}
                  viewBox="0 0 320 240"
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={`Point at ${fmt(pt[0])}, ${fmt(pt[1])}; ray crosses ${n} edge${n === 1 ? "" : "s"}`}
                  onPointerDown={down}
                  onPointerMove={move}
                  onPointerUp={up}
                  onPointerCancel={up}
                >
                  {Array.from({ length: 9 }, (_, i) => i).map((g) => (
                    <line key={`gx${g}`} x1={X(g)} y1={Y(YMIN)} x2={X(g)} y2={Y(YMAX)} stroke="var(--line)" strokeWidth={0.5} />
                  ))}
                  {Array.from({ length: 7 }, (_, i) => i).map((g) => (
                    <line key={`gy${g}`} x1={X(XMIN)} y1={Y(g)} x2={X(XMAX)} y2={Y(g)} stroke="var(--line)" strokeWidth={0.5} />
                  ))}
                  {[0, 2, 4, 6, 8].map((g) => (
                    <text key={`lx${g}`} x={X(g)} y={236} textAnchor="middle" className={s.ax}>
                      {g}
                    </text>
                  ))}
                  {[0, 2, 4, 6].map((g) => (
                    <text key={`ly${g}`} x={8} y={Y(g) + 3} className={s.ax}>
                      {g}
                    </text>
                  ))}
                  <polygon
                    points={poly}
                    fill={locked ? "none" : "var(--domain)"}
                    fillOpacity={0.16}
                    stroke="var(--fg)"
                    strokeWidth={2}
                    strokeLinejoin="round"
                  />
                  {hits.map((h) => {
                    const [x1, y1] = POLY[h.edge];
                    const [x2, y2] = POLY[(h.edge + 1) % POLY.length];
                    return <line key={`e${h.edge}`} x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke="var(--domain)" strokeWidth={5} strokeLinecap="round" />;
                  })}
                  {locked ? (
                    <line x1={X(pt[0])} y1={Y(pt[1])} x2={X(XMAX) + 6} y2={Y(pt[1])} stroke="var(--muted)" strokeWidth={1.5} strokeDasharray="5 3" />
                  ) : (
                    stretches.map((st, i) => (
                      <g key={`r${i}`}>
                        <line
                          x1={X(st.x0)}
                          y1={Y(pt[1])}
                          x2={X(st.x1)}
                          y2={Y(pt[1])}
                          stroke={st.in ? "var(--good)" : "var(--muted)"}
                          strokeWidth={st.in ? 4 : 1.5}
                          strokeDasharray={st.in ? undefined : "5 3"}
                        />
                        {X(st.x1) - X(st.x0) > 26 && (
                          <text x={(X(st.x0) + X(st.x1)) / 2} y={Y(pt[1]) - 6} textAnchor="middle" className={s.ax}>
                            {st.in ? "in" : "out"}
                          </text>
                        )}
                      </g>
                    ))
                  )}
                  {hits.map((h, i) => (
                    <g key={`h${h.edge}`}>
                      <circle cx={X(h.x)} cy={Y(pt[1])} r={8} fill="var(--bg-2)" stroke="var(--domain)" strokeWidth={2} />
                      <text x={X(h.x)} y={Y(pt[1]) + 4} textAnchor="middle" className={s.hit}>
                        {i + 1}
                      </text>
                    </g>
                  ))}
                  <circle cx={X(pt[0])} cy={Y(pt[1])} r={9} fill={locked ? "var(--fg)" : inside ? "var(--good)" : "var(--bad)"} stroke="var(--fg)" strokeWidth={2} className={s.dot} />
                </svg>
                {/* Fold opt-in (W-330): no Readout here; the reveal quotes the Seen line, not these buttons, and the
                    point they set is drawn in the picture. */}
                <Row foldAtReveal>
                  {PRESETS.map(({ p, label }) => (
                    <Control
                      key={label}
                      className={`${s.preset} ${pt[0] === p[0] && pt[1] === p[1] ? "active" : ""}`}
                      disabled={locked || (pt[0] === p[0] && pt[1] === p[1])}
                      onClick={() => go(p)}
                    >
                      {label}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label={replay ? "Point (again)" : "Point"} value={`(${fmt(pt[0])}, ${fmt(pt[1])})`} />
                  <Readout label="Crossings" value={locked ? "?" : n} />
                  <Readout label="Verdict" value={locked ? "?" : inside ? "inside" : "outside"} />
                </Row>
                {(notch || odd) && (
                  <p className={s.log} data-testid="seen">
                    Seen:{" "}
                    {[notch, odd]
                      .filter((x): x is Seen => x !== null)
                      .map((x) => `(${fmt(x.p[0])}, ${fmt(x.p[1])}) ${x.n} crossing${x.n === 1 ? "" : "s"}, ${x.n % 2 ? "in" : "out"}`)
                      .join(" · ")}
                  </p>
                )}
                {/* v5: the Tried trace is not quoted by the reveal (the Seen line is); it steps aside at the reveal. */}
                {phase !== "reveal" && <p className={s.log} data-testid="tried">
                  {log.length
                    ? `Tried: ${log.map((x) => `(${fmt(x.p[0])}, ${fmt(x.p[1])}) ${x.n} ${x.n % 2 ? "in" : "out"}`).join(" · ")}`
                    : "Tried: none yet"}
                </p>}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
