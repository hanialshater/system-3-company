"use client";

// Shoelace area of the rectangle (0,0) (4,0) (4,3) (0,3), in whatever order the learner taps the corners.
// Signed area = half the sum of x_i*y_(i+1) - x_(i+1)*y_i round the closed path. The stage draws the same sum edge by
// edge as signed slivers: the strip between each edge and the x-axis, (x_i - x_(i+1)) * (y_i + y_(i+1)) / 2, which
// adds up to the same total (the extra terms telescope away). Leftward edges add, rightward edges subtract.
// In order: 12. Reversed: -12. (0,0) (4,3) (4,0) (0,3): a bow-tie, two slivers of +6 and -6, total 0.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type P = [number, number];
const RECT: P[] = [
  [0, 0],
  [4, 0],
  [4, 3],
  [0, 3],
];
const BOW: P[] = [RECT[0], RECT[2], RECT[1], RECT[3]]; // the question's second order; also the button order
const fmt = (p: P) => `(${p[0]},${p[1]})`;

function shoelace(path: P[]): number {
  let sum = 0;
  for (let i = 0; i < path.length; i++) {
    const [x1, y1] = path[i];
    const [x2, y2] = path[(i + 1) % path.length];
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
}
const sliver = (a: P, b: P) => ((a[0] - b[0]) * (a[1] + b[1])) / 2;
const IN_ORDER = shoelace(RECT); // 12
const REVERSED = shoelace([...RECT].reverse()); // -12
const BOW_AREA = shoelace(BOW); // 0

const U = 50;
const OX = 60;
const OY = 178;
const sx = (x: number) => OX + x * U;
const sy = (y: number) => OY - y * U;

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [path, setPath] = useState<P[]>([]);
  const closed = path.length === RECT.length;
  const edges: [P, P][] = path.slice(1).map((p, i) => [path[i], p]);
  if (closed) edges.push([path[path.length - 1], path[0]]);
  const total = edges.reduce((a, [p, q]) => a + sliver(p, q), 0);
  const area = closed ? shoelace(path) : null;

  const tap = (p: P) => {
    if (locked || path.includes(p)) return;
    const next = [...path, p];
    setPath(next);
    if (next.length === RECT.length && shoelace(next) === 0) reach("zero");
  };
  const reset = () => {
    if (locked) return;
    setPath([]);
  };

  const msg = locked
    ? "Predict first, then tap the corners in an order."
    : path.length === 0
      ? "Tap the four corners in any order. The path closes itself."
      : !closed
        ? "Each edge adds the strip under it: + going left, − going right."
        : area === 0
          ? "The path crosses itself: the + and − strips cancel to 0."
          : `Closed path, signed area ${area}: ${area! > 0 ? "anticlockwise, +" : "clockwise, −"}.`;

  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">
        {msg}
      </p>
      <svg viewBox="0 0 320 206" className="stage-svg" role="img" aria-label={`Path ${path.map(fmt).join(" ")}, sum ${total}`}>
        {Array.from({ length: 5 }, (_, x) => (
          <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={sy(0)} y2={sy(3)} stroke="var(--line)" strokeWidth={0.75} />
        ))}
        {Array.from({ length: 4 }, (_, y) => (
          <line key={`gy${y}`} x1={sx(0)} x2={sx(4)} y1={sy(y)} y2={sy(y)} stroke="var(--line)" strokeWidth={0.75} />
        ))}
        <line x1={sx(0) - 10} x2={sx(4) + 14} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" strokeWidth={1.5} />
        {edges.map(([p, q], k) => {
          const v = sliver(p, q);
          if (v === 0) return null;
          return (
            <g key={`s${k}`}>
              <polygon
                points={`${sx(p[0])},${sy(p[1])} ${sx(q[0])},${sy(q[1])} ${sx(q[0])},${sy(0)} ${sx(p[0])},${sy(0)}`}
                fill={v > 0 ? "var(--good)" : "var(--bad)"}
                fillOpacity={0.28}
                stroke={v > 0 ? "var(--good)" : "var(--bad)"}
                strokeDasharray="4 3"
              />
              <text
                x={(sx(p[0]) + sx(q[0])) / 2}
                y={sy(Math.min(p[1], q[1]) / 2) + 5 + (v > 0 ? -12 : 12)}
                textAnchor="middle"
                className={`${s.sl} ${v > 0 ? s.plus : s.minus}`}
              >
                {v > 0 ? `+${v}` : `−${-v}`}
              </text>
            </g>
          );
        })}
        {edges.map(([p, q], k) => {
          const mx = (sx(p[0]) + sx(q[0])) / 2;
          const my = (sy(p[1]) + sy(q[1])) / 2;
          const ang = (Math.atan2(sy(q[1]) - sy(p[1]), sx(q[0]) - sx(p[0])) * 180) / Math.PI;
          return (
            <g key={`e${k}`}>
              <line x1={sx(p[0])} y1={sy(p[1])} x2={sx(q[0])} y2={sy(q[1])} stroke="var(--domain)" strokeWidth={3} />
              <polygon points="-7,-6 7,0 -7,6" fill="var(--domain)" transform={`translate(${mx} ${my}) rotate(${ang})`} />
            </g>
          );
        })}
        {RECT.map((p) => {
          const k = path.indexOf(p);
          const right = p[0] > 0;
          const top = p[1] > 0;
          return (
            <g key={fmt(p)}>
              <circle cx={sx(p[0])} cy={sy(p[1])} r={8} fill={k >= 0 ? "var(--domain)" : "var(--bg-2)"} stroke="var(--fg)" strokeWidth={1.5} />
              <text x={sx(p[0]) + (right ? 14 : -14)} y={sy(p[1]) + (top ? -8 : 16)} textAnchor={right ? "start" : "end"} className={s.lab}>
                {fmt(p)}
              </text>
              {k >= 0 && (
                <text x={sx(p[0])} y={sy(p[1]) + 4} textAnchor="middle" className={s.ord}>
                  {k + 1}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <Row>
        {BOW.map((p) => (
          <Control key={fmt(p)} className={s.tap} disabled={locked || path.includes(p)} onClick={() => tap(p)}>
            {fmt(p)}
          </Control>
        ))}
        <Control className={s.tap} disabled={locked || path.length === 0} onClick={reset}>
          Reset order
        </Control>
      </Row>
      <Row>
        <Readout label="Corners" value={`${path.length} of ${RECT.length}`} />
        <Readout label={closed ? "Signed area" : "Sum so far"} value={closed ? area : total} />
      </Row>
    </div>
  );
}

export default function ShoelaceOrderMatters({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A rectangle with corners ${RECT.map(fmt).join(" ")}, listed in order, has shoelace area ${IN_ORDER}. List the same corners as ${BOW.map(fmt).join(" ")}. What does the formula give?`,
        options: [`${IN_ORDER}, the same corners`, String(BOW_AREA), String(2 * IN_ORDER)],
        answer: 1,
      }}
      exploreHint="Tap the corners in the question's second order, then try your own."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            The question's order gave <strong>{BOW_AREA}</strong>. The formula adds a signed strip under each edge: the
            edge from (0,0) to (4,3) gave −6 and the edge from (4,0) to (0,3) gave +6. They cancelled, though the bow-tie
            you drew encloses two triangles of area 3, one traced each way round.
          </p>
          <p>
            Area from corners depends on the order: listed round the boundary, the same four corners give {IN_ORDER}; the
            other way round, {REVERSED}. The sign tells you the direction, positive when the corners go anticlockwise. A path
            that crosses itself makes some parts count positive and some negative.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["zero"]}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
