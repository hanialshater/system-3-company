"use client";

// Tear the corners. Three preset triangles (tall, flat, lopsided) are built from whole-degree
// corner angles, so the caption's sum is exact, not a rounded measurement. "Tear off the corners"
// turns the two base corners half a turn about the midpoints of the sides they share with the
// top corner. That point reflection lands each one at the top corner, against the line through
// the top parallel to the base (alternate angles), so the three corners fill that line.
// Key state: the corners lined up on two different shapes.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Shape = { name: string; a: number; b: number };
const SHAPES: Shape[] = [
  { name: "Tall", a: 70, b: 65 },
  { name: "Flat", a: 25, b: 30 },
  { name: "Lopsided", a: 40, b: 110 },
];
const MILESTONES = ["lined-up", "lined-up-again"] as const;

const W = 320;
const H = 200;
const PAD = 18;
const R = 34;

type P = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;

/** Base A-B on the bottom, apex C; scaled to fit the stage. */
function place(sh: Shape): { A: P; B: P; C: P } {
  const A0 = { x: 0, y: 0 };
  const B0 = { x: 1, y: 0 };
  const c = 180 - sh.a - sh.b;
  const ac = Math.sin(rad(sh.b)) / Math.sin(rad(c)); // law of sines, base = 1
  const C0 = { x: ac * Math.cos(rad(sh.a)), y: ac * Math.sin(rad(sh.a)) };
  const minX = Math.min(0, C0.x);
  const maxX = Math.max(1, C0.x);
  const k = Math.min((W - 2 * PAD) / (maxX - minX), (H - 2 * PAD - 14) / C0.y);
  const ox = (W - (maxX - minX) * k) / 2 - minX * k;
  const base = H - PAD;
  const to = (p: P) => ({ x: ox + p.x * k, y: base - p.y * k });
  return { A: to(A0), B: to(B0), C: to(C0) };
}

function sector(v: P, p1: P, p2: P, r: number) {
  const a1 = Math.atan2(p1.y - v.y, p1.x - v.x);
  const a2 = Math.atan2(p2.y - v.y, p2.x - v.x);
  let d = a2 - a1;
  while (d <= -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  const x1 = v.x + r * Math.cos(a1);
  const y1 = v.y + r * Math.sin(a1);
  const x2 = v.x + r * Math.cos(a2);
  const y2 = v.y + r * Math.sin(a2);
  return `M${v.x.toFixed(1)},${v.y.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 ${d > 0 ? 1 : 0} ${x2.toFixed(1)},${y2.toFixed(1)} Z`;
}

export default function TearTheCorners({ slug }: { slug: string }) {
  const [shape, setShape] = useState(0);
  const [torn, setTorn] = useState(false);
  const [seen, setSeen] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You cut out any paper triangle, tear off its three corners and fit them together at one point. Whatever the triangle, they make…",
        options: ["a right angle", "a straight line", "it depends on the triangle"],
        answer: 1,
      }}
      exploreHint="Tear off the corners, then change the triangle's shape."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>A straight line, every time.</strong> You lined the corners up on {seen.length} shape
            {seen.length === 1 ? "" : "s"} ({seen.map((i) => SHAPES[i].name.toLowerCase()).join(", ")}), and they always
            filled the dashed line: 180°.
          </p>
          <p>
            Why: the dashed line runs through the top corner, parallel to the base. Each bottom corner, moved up as you
            saw, fits exactly in the gap between that line and a side, so the three corners fill it with nothing over.
            A straight line is two right angles, not one.
          </p>
          <p>A fatter triangle does not gain turn: when one corner grows, the others shrink to pay for it.</p>
        </>
      )}
    >
      {(ctx) => (
        <Stage {...ctx} shape={shape} setShape={setShape} torn={torn} setTorn={setTorn} seen={seen} setSeen={setSeen} />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  shape,
  setShape,
  torn,
  setTorn,
  seen,
  setSeen,
}: StageContext & {
  shape: number;
  setShape: (v: number) => void;
  torn: boolean;
  setTorn: (v: boolean) => void;
  seen: number[];
  setSeen: (v: number[]) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const sh = SHAPES[shape];
  const c = 180 - sh.a - sh.b;
  const { A, B, C } = place(sh);

  const note = (i: number, isTorn: boolean) => {
    if (!isTorn) return;
    const next = seen.includes(i) ? seen : [...seen, i];
    if (next !== seen) setSeen(next);
    if (next.length >= 1) reach("lined-up");
    if (next.length >= 2) reach("lined-up-again");
  };

  const toggle = () => {
    setTorn(!torn);
    note(shape, !torn);
  };
  const pick = (i: number) => {
    setShape(i);
    note(i, torn);
  };

  const mA = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
  const mB = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
  const flip = (m: P) => ({
    transform: torn ? "rotate(180deg)" : "rotate(0deg)",
    transformOrigin: `${m.x}px ${m.y}px`,
    transformBox: "view-box" as const,
  });

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${sh.name} triangle, corners ${torn ? "lined up at the top" : "in place"}`}>
        {torn && <line x1={4} y1={C.y} x2={W - 4} y2={C.y} className={s.parallel} />}
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} className={s.tri} />
        <path d={sector(C, A, B, R)} className={s.wc} />
        <g className={s.move} style={flip(mA)} data-torn={torn ? "1" : "0"}>
          <path d={sector(A, B, C, R)} className={s.wa} />
        </g>
        <g className={s.move} style={flip(mB)} data-torn={torn ? "1" : "0"}>
          <path d={sector(B, A, C, R)} className={s.wb} />
        </g>
        {!locked && !torn && (
          <>
            <text x={A.x + (C.x < A.x ? 4 : 36)} y={A.y - 5} className={s.lab}>{sh.a}°</text>
            <text x={B.x - 36} y={B.y - 5} className={s.lab}>{sh.b}°</text>
            <text x={C.x} y={C.y + 30} textAnchor="middle" className={s.lab}>{c}°</text>
          </>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : torn
            ? `${sh.a}° + ${sh.b}° + ${c}° = 180°: the corners fill a straight line.`
            : `${sh.name} triangle. Its three corners are coloured.`}
      </p>

      <Row>
        <Control disabled={locked} onClick={toggle} className={torn ? "active" : ""} aria-pressed={torn}>
          {torn ? "Put corners back" : "Tear off the corners"}
        </Control>
      </Row>
      <Row>
        {SHAPES.map((x, i) => (
          <Control key={x.name} disabled={locked || i === shape} className={i === shape ? "active" : ""} aria-pressed={i === shape} onClick={() => pick(i)}>
            {x.name}
          </Control>
        ))}
      </Row>
    </div>
  );
}
