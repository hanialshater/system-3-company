"use client";

// Thales corner. A circle with a diameter AB through the centre O. P sits on the circle at one of
// 17 places (10, 20, ... 170 degrees round from B). The angle APB is measured from the drawn
// coordinates (angleAt) and always comes out 90. "Draw the radius OP" splits the triangle into two
// triangles with two radii each, and labels their equal angles x, x and y, y (also measured).
// Key states: P has been in three different places; the radius OP has been drawn.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const R = 110;
const CX = 150;
const CY = 140;
const W = 300;
const H = 160;
const PLACES = 17;
const START = 3;
const NEED = 3;
const MILESTONES = ["three-places", "radius-drawn"] as const;

type Pt = { x: number; y: number };
const A: Pt = { x: CX - R, y: CY };
const B: Pt = { x: CX + R, y: CY };
const O: Pt = { x: CX, y: CY };
const P = (v: number): Pt => {
  const t = (v * 10 * Math.PI) / 180;
  return { x: CX + R * Math.cos(t), y: CY - R * Math.sin(t) };
};
/** Angle at vertex V between rays to U and W, in degrees, from the coordinates. */
function angleAt(V: Pt, U: Pt, Wp: Pt) {
  const a = Math.atan2(U.y - V.y, U.x - V.x);
  const b = Math.atan2(Wp.y - V.y, Wp.x - V.x);
  let d = Math.abs(a - b) * (180 / Math.PI);
  if (d > 180) d = 360 - d;
  return d;
}
const fmt = (d: number) => `${Math.round(d)}°`;

export default function ThalesCorner({ slug }: { slug: string }) {
  const [v, setV] = useState(START);
  const [radius, setRadius] = useState(false);
  const visited = useRef(new Set<number>([START])); // counted places: each at least GAP apart
  const GAP = 4;
  const [readings, setReadings] = useState<string[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You pick any point P on a circle and join it to both ends of a line across the circle through its centre. The angle at P is...",
        options: ["60°", "90°", "It depends where P is"],
        answer: 1,
      }}
      exploreHint={`Put P near A, at the top and near B, then draw the radius OP.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>90°, wherever P is.</strong>{" "}
            {readings.length >= NEED
              ? `You checked ${readings.length} well-separated places and the angle read ${readings.join(", ")}.`
              : "Every place P can go gives the same reading."}
          </p>
          <p>
            The radius OP cuts the big triangle into two triangles with two equal sides (radii), so each has two equal angles:
            x and x, y and y. The big triangle&apos;s angles add up to 180°, so 2x + 2y = 180° and x + y = 90°. And x + y is the
            angle at P.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              v={v}
              radius={radius}
              onMove={(nv) => {
                setV(nv);
                if ([...visited.current].every((c) => Math.abs(c - nv) >= GAP)) visited.current.add(nv);
                const list = [...visited.current].sort((a, b) => a - b);
                setReadings(list.map((x) => fmt(angleAt(P(x), A, B))));
                if (visited.current.size >= NEED) reach("three-places");
              }}
              seen={readings.length ? readings : [fmt(angleAt(P(START), A, B))]}
              onRadius={() => {
                setRadius(!radius);
                reach("radius-drawn");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  v,
  radius,
  onMove,
  onRadius,
  seen,
}: {
  locked: boolean;
  v: number;
  radius: boolean;
  onMove: (v: number) => void;
  onRadius: () => void;
  seen: string[];
}) {
  const p = P(v);
  const angP = angleAt(p, A, B);
  const x = angleAt(p, A, O); // the part of P's angle on A's side (equals the angle at A)
  const y = angleAt(p, O, B); // the part on B's side (equals the angle at B)
  // right-angle mark at P: unit vectors toward A and B
  const ua = { x: (A.x - p.x) / Math.hypot(A.x - p.x, A.y - p.y), y: (A.y - p.y) / Math.hypot(A.x - p.x, A.y - p.y) };
  const ub = { x: (B.x - p.x) / Math.hypot(B.x - p.x, B.y - p.y), y: (B.y - p.y) / Math.hypot(B.x - p.x, B.y - p.y) };
  const m = 13;
  const mark = `M${p.x + ua.x * m},${p.y + ua.y * m} L${p.x + (ua.x + ub.x) * m},${p.y + (ua.y + ub.y) * m} L${p.x + ub.x * m},${p.y + ub.y * m}`;
  const lab = (V: Pt, toward: Pt, d = 24) => {
    const L = Math.hypot(toward.x - V.x, toward.y - V.y);
    return { x: V.x + ((toward.x - V.x) / L) * d, y: V.y + ((toward.y - V.y) / L) * d };
  };
  // labels for x, y at A, B (toward the middle of the opposite side) and at P (toward A or B side of OP)
  const lA = lab(A, { x: (p.x + B.x) / 2, y: (p.y + B.y) / 2 }, 30);
  const lB = lab(B, { x: (p.x + A.x) / 2, y: (p.y + A.y) / 2 }, 30);
  const lPA = lab(p, { x: (A.x + O.x) / 2, y: (A.y + O.y) / 2 }, 30);
  const lPB = lab(p, { x: (B.x + O.x) / 2, y: (B.y + O.y) / 2 }, 30);

  const caption = locked
    ? "Make a prediction to start."
    : radius
      ? "OA, OP, OB are all radii: two triangles, each with two equal sides and two equal angles."
      : "AB goes through the centre O. Move P round the circle.";

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <path d={`M${A.x},${A.y} A${R},${R} 0 0 1 ${B.x},${B.y}`} className={s.circle} />
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} className={s.diam} />
        <polygon points={`${A.x},${A.y} ${p.x},${p.y} ${B.x},${B.y}`} className={s.tri} />
        {radius && <line x1={O.x} y1={O.y} x2={p.x} y2={p.y} className={s.radius} />}
        {!locked && <path d={mark} className={s.mark} />}
        {radius && (
          <>
            <text x={lA.x} y={lA.y} className={s.x}>x</text>
            <text x={lPA.x} y={lPA.y} className={s.x}>x</text>
            <text x={lB.x} y={lB.y} className={s.y}>y</text>
            <text x={lPB.x} y={lPB.y} className={s.y}>y</text>
          </>
        )}
        <circle cx={O.x} cy={O.y} r={3.5} className={s.dot} />
        <circle cx={p.x} cy={p.y} r={7} className={s.p} />
        <text x={A.x - 4} y={A.y + 14} className={s.lbl}>A</text>
        <text x={B.x + 4} y={B.y + 14} className={s.lbl}>B</text>
        <text x={O.x} y={O.y + 15} className={s.lbl}>O</text>
        <text x={p.x + (p.x - CX) * 0.12} y={p.y + (p.y - CY) * 0.12 - 4} className={s.lbl}>P</text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Row>
        <Control disabled={locked} onClick={() => onMove(15)}>
          P near A
        </Control>
        <Control disabled={locked} onClick={() => onMove(9)}>
          P at the top
        </Control>
        <Control disabled={locked} onClick={() => onMove(3)}>
          P near B
        </Control>
      </Row>
      <Slider label="Where P is" value={v} min={1} max={PLACES} disabled={locked} format={(n) => `place ${n} of ${PLACES}`} onChange={onMove} />
      {!locked && <p className={s.caption}>Angle at P in places checked: {seen.join(", ")}</p>}
      <Row>
        <Control disabled={locked} className={radius ? "active" : ""} aria-pressed={radius} onClick={onRadius}>
          {radius ? "Hide the radius OP" : "Draw the radius OP"}
        </Control>
        <Readout label="Angle at P" value={locked ? "?" : radius ? `x = ${fmt(x)}, y = ${fmt(y)}: ${fmt(angP)}` : fmt(angP)} />
      </Row>
    </div>
  );
}
