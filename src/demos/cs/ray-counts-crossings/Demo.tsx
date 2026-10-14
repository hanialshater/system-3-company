"use client";

// Point in polygon by ray casting. A ray from the point to the right crosses the boundary; each
// crossing flips inside/outside, and far right is outside, so an odd count means inside.
// U-shaped polygon (0,0) (6,0) (6,6) (4,6) (4,2) (2,2) (2,6) (0,6). From (3,4) in the notch the ray
// crosses x = 4 and x = 6: 2, outside. (1,4): 3, inside. (5,4): 1. (3,1): 1. (7,4): 0.
// Edge test is the half-open rule (an edge counts if exactly one end is above the ray's height), and
// the stage keeps the point off the boundary and off corner heights (y = 0, 2, 6), so no ties arise.

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
const NOTCH_COUNT = crossings(3, 4).length; // 2
const LEFT_COUNT = crossings(1, 4).length; // 3

// drawing
const S = 30;
const X = (x: number) => 25 + (x - XMIN) * S;
const Y = (y: number) => 12 + (YMAX - y) * S;
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

export default function RayCountsCrossings({ slug }: { slug: string }) {
  const [pt, setPt] = useState<Pt>([7, 4]);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const hits = crossings(pt[0], pt[1]);
  const n = hits.length;
  const inside = n % 2 === 1;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A U-shaped polygon has corners (0,0) (6,0) (6,6) (4,6) (4,2) (2,2) (2,6) (0,6). The point (3,4) sits in the gap between the arms. Shoot a ray from it to the right. Is the point inside?",
        options: ["Inside: it is 1 crossing", "Outside: it crosses an even number of edges", "Cannot tell without the area"],
        answer: 1,
      }}
      exploreHint="Drag the point, or tap a position. Count the edges the ray crosses."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In the gap the ray crossed {NOTCH_COUNT} edges: into the right arm at x = 4, and out again at x = 6. From (1, 4) it crossed{" "}
            {LEFT_COUNT}: odd, inside.
          </p>
          <p>
            Far to the right is always outside, and every crossing flips inside and outside. So counting backwards from the far end,
            an odd count means inside and an even count means outside, however central the point looks. The shape can have any
            number of notches. A ray through a corner exactly needs a tie rule; this stage keeps the point off corner heights.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["inside-odd", "notch"]}>
          {(reach) => {
            const go = (p: Pt) => {
              if (locked) return;
              setPt(p);
              const k = crossings(p[0], p[1]).length;
              if (k % 2 === 1) reach("inside-odd");
              if (inNotch(p[0], p[1])) reach("notch");
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
            return (
              <div className={s.wrap}>
                <p className={s.note}>
                  ({fmt(pt[0])}, {fmt(pt[1])}): {n} crossing{n === 1 ? "" : "s"}, {n % 2 ? "odd" : "even"}, so {inside ? "inside" : "outside"}.
                </p>
                <svg
                  ref={svgRef}
                  viewBox="0 0 320 240"
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={`Point at ${fmt(pt[0])}, ${fmt(pt[1])}; ray crosses ${n} edges`}
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
                  <polygon points={poly} fill="var(--domain)" fillOpacity={0.16} stroke="var(--fg)" strokeWidth={2} strokeLinejoin="round" />
                  {hits.map((h) => {
                    const [x1, y1] = POLY[h.edge];
                    const [x2, y2] = POLY[(h.edge + 1) % POLY.length];
                    return <line key={`e${h.edge}`} x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke="var(--domain)" strokeWidth={5} strokeLinecap="round" />;
                  })}
                  <line x1={X(pt[0])} y1={Y(pt[1])} x2={X(XMAX) + 6} y2={Y(pt[1])} stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="5 3" />
                  {hits.map((h, i) => (
                    <g key={`h${h.edge}`}>
                      <circle cx={X(h.x)} cy={Y(pt[1])} r={8} fill="var(--bg-2)" stroke="var(--domain)" strokeWidth={2} />
                      <text x={X(h.x)} y={Y(pt[1]) + 4} textAnchor="middle" className={s.hit}>
                        {i + 1}
                      </text>
                    </g>
                  ))}
                  <circle cx={X(pt[0])} cy={Y(pt[1])} r={9} fill={inside ? "var(--good)" : "var(--bad)"} stroke="var(--fg)" strokeWidth={2} className={s.dot} />
                </svg>
                <Row>
                  {PRESETS.map(({ p, label }) => (
                    <Control
                      key={label}
                      className={pt[0] === p[0] && pt[1] === p[1] ? "active" : ""}
                      disabled={locked || (pt[0] === p[0] && pt[1] === p[1])}
                      onClick={() => go(p)}
                    >
                      {label}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Crossings" value={n} />
                  <Readout label="Verdict" value={inside ? "inside" : "outside"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
