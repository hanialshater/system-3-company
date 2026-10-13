"use client";

// A 1-nearest-neighbour border is built from the data. Class A is one training point at
// (ax, ay), class B one point at (4, 0). Every spot on the plane takes the class of the nearer
// point, so the border is the set of spots equally far from both: the perpendicular bisector.
// With A at (0, 0) it crosses the axis at x = 2; with A at (-2, 0), at x = 1 (midpoint).
// Moving A by 2 moves the border by 1. Moving A up tilts the border.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type P = [number, number];
const B: P = [4, 0];
/** Where the border crosses the horizontal axis: (x - ax)^2 + ay^2 = (x - 4)^2. */
const axisCrossing = (a: P) => (B[0] ** 2 - a[0] ** 2 - a[1] ** 2) / (2 * (B[0] - a[0]));
// MODEL END

// Plane x in [-5, 6], y in [-3, 3] -> box 10..310 x 24..188 (same scale: 27.3 px per unit).
const K = 300 / 11;
const X = (x: number) => 10 + (x + 5) * K;
const Y = (y: number) => 106 - y * K;
const RECT: P[] = [
  [-5, -3],
  [6, -3],
  [6, 3],
  [-5, 3],
];

/** Clip the plane rectangle to the side nearer A (Sutherland-Hodgman, one edge). */
function sideOfA(a: P, sign = 1): P[] {
  // nearer A  <=>  (B - A) . q < (|B|^2 - |A|^2) / 2
  const n: P = [B[0] - a[0], B[1] - a[1]];
  const c = (B[0] ** 2 + B[1] ** 2 - a[0] ** 2 - a[1] ** 2) / 2;
  const f = (q: P) => sign * (c - (n[0] * q[0] + n[1] * q[1]));
  const out: P[] = [];
  for (let i = 0; i < RECT.length; i++) {
    const p = RECT[i];
    const q = RECT[(i + 1) % RECT.length];
    const fp = f(p);
    const fq = f(q);
    if (fp >= 0) out.push(p);
    if (fp >= 0 !== fq >= 0) {
      const t = fp / (fp - fq);
      out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]);
    }
  }
  return out;
}

const fmt = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(2));

export default function BorderFollowsPoint({ slug }: { slug: string }) {
  const [ax, setAx] = useState(0);
  const [ay, setAy] = useState(0);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["a-at-minus-2"]);
  const a: P = [ax, ay];
  const poly = sideOfA(a);
  const cross = axisCrossing(a);
  const mid: P = [(ax + B[0]) / 2, (ay + B[1]) / 2];

  const move = (nx: number, ny: number) => {
    setAx(nx);
    setAy(ny);
    if (nx === -2 && ny === 0) reach("a-at-minus-2");
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "One-nearest-neighbour: every spot takes the class of the closest training point. Class A sits at x = 0 and class B at x = 4, so the border is at x = 2. Move A to x = -2. The border moves to:",
        options: ["It stays at 2", "x = 1", "x = -2"],
        answer: 1,
      }}
      exploreHint="Slide A left to -2. Then lift A up and watch the border."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            With A at -2 the border sits at <strong>x = {fmt(axisCrossing([-2, 0]))}</strong>, halfway between -2 and 4. A moved 2;
            the border moved 1. No one drew that border: it is wherever the two points are equally far away, so it goes where the
            data goes.
          </p>
          <p>
            Lift A off the axis and the border tilts, staying at right angles to the line joining the two points, through their
            midpoint. With many points, a nearest-neighbour border is stitched from such pieces, and moving any training point near
            it moves the decision for every spot around it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 212" className="stage-svg" role="img" aria-label={`A at (${ax}, ${ay}); border crosses the axis at ${fmt(cross)}`}>
              <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                Each spot takes the class of the nearer point
              </text>
              <polygon points={sideOfA(a, -1).map((q) => `${X(q[0])},${Y(q[1])}`).join(" ")} fill="#f59e0b" opacity={0.22} />
              <polygon points={poly.map((q) => `${X(q[0])},${Y(q[1])}`).join(" ")} fill="#3b82f6" opacity={0.22} />
              <line x1={X(-5)} y1={Y(0)} x2={X(6)} y2={Y(0)} stroke="var(--line)" />
              {[-4, -2, 0, 2, 4, 6].map((v) => (
                <text key={v} x={X(v)} y={Y(-3) + 14} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                  {v}
                </text>
              ))}
              <line x1={X(a[0])} y1={Y(a[1])} x2={X(B[0])} y2={Y(B[1])} stroke="var(--muted)" strokeDasharray="3 3" />
              <circle cx={X(mid[0])} cy={Y(mid[1])} r={3} fill="var(--muted)" />
              {/* the border: the edge of A's region inside the box */}
              {(() => {
                const pts = poly.filter((q) => !RECT.some((r) => r[0] === q[0] && r[1] === q[1]));
                return pts.length === 2 ? (
                  <line x1={X(pts[0][0])} y1={Y(pts[0][1])} x2={X(pts[1][0])} y2={Y(pts[1][1])} stroke="var(--fg)" strokeWidth={3} />
                ) : null;
              })()}
              <circle cx={X(cross)} cy={Y(0)} r={5} fill="var(--fg)" />
              <circle cx={X(a[0])} cy={Y(a[1])} r={10} fill="#3b82f6" stroke="var(--fg)" strokeWidth={2} />
              <text x={X(a[0])} y={Y(a[1]) + 4} textAnchor="middle" className={s.label} fill="#0d0f14">
                A
              </text>
              <circle cx={X(B[0])} cy={Y(B[1])} r={10} fill="#f59e0b" stroke="var(--fg)" strokeWidth={2} />
              <text x={X(B[0])} y={Y(B[1]) + 4} textAnchor="middle" className={s.label} fill="#0d0f14">
                B
              </text>
            </svg>
            <Row>
              <Slider label="A across (x)" value={ax} min={-4} max={0} disabled={locked} onChange={(v) => move(v, ay)} />
              <Slider label="A up (y)" value={ay} min={-2} max={2} disabled={locked} onChange={(v) => move(ax, v)} />
            </Row>
            <Row>
              <Readout label="A at" value={`(${ax}, ${ay})`} />
              <Readout label="Border crosses the axis at" value={`x = ${fmt(cross)}`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
