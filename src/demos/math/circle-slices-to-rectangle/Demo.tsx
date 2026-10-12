"use client";

// Circle area by unrolling. A circle of radius 10 sits in a 20 x 20 square (four 10 x 10
// boxes). Cut it into N equal wedges and lay them alternately point-up and point-down: they
// form a bumpy strip r tall and half the rim (pi r) long. The four boxes slide into a row
// under it, so the learner sees the circle cover 3.14 of 4 boxes: about 78.5% of the square.
//
// Wedge k (half-angle a = pi/N), drawn with its point at the local origin, opening down.
//   in the circle: translate(centre) rotate(k * 360/N)
//   unrolled, k even: point up at   (X + (k + 1) r sin a, top)                rotate 0
//   unrolled, k odd:  point down at (X + (k + 1) r sin a, top + r cos a)      rotate 180
// Neighbouring straight edges then coincide, so the wedges tile the strip without overlap.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const COUNTS = [4, 8, 16, 32, 64];
const K = 6.5; // px per unit
const R = 10 * K; // radius, px
const W = 300;
const H = 150;
const CX = 150;
const CY = 75;
const SX = 20; // strip left, px
const SY = 42; // strip top, px

// The square's four 10 x 10 boxes: position in the square, and in the row.
const BOXES = [
  { from: [CX - R, CY - R], to: [SX, SY] },
  { from: [CX - R, CY], to: [SX + R, SY] },
  { from: [CX, CY - R], to: [SX + 2 * R, SY] },
  { from: [CX, CY], to: [SX + 3 * R, SY] },
];

function wedgePath(a: number) {
  const x = R * Math.sin(a);
  const y = R * Math.cos(a);
  return `M0 0 L${(-x).toFixed(2)} ${y.toFixed(2)} A${R} ${R} 0 0 0 ${x.toFixed(2)} ${y.toFixed(2)} Z`;
}

export default function CircleSlicesToRectangle({ slug }: { slug: string }) {
  const [idx, setIdx] = useState(1);
  const [flat, setFlat] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A circle of radius 10 sits snugly in a 20 × 20 square (area 400). About how much of the square does it fill?",
        options: ["25%", "78%", "95%"],
        answer: 1,
      }}
      exploreHint="Cut 16 or more slices, then unroll the circle."
      reveal={() => (
        <>
          <p>
            About <strong>78%</strong>. Unrolled, the slices make a strip as tall as the radius, 10, and as long as half
            the rim, π × 10 ≈ 31.4. That covers 31.4 × 10 ≈ 314 of the 400, or 3.14 of the four 10 × 10 boxes.
          </p>
          <p>
            More slices only straighten the bumps; the strip's size stays the same. So any circle's area is half the
            rim times the radius: π r × r = π r². Its square holds 4 r², so a circle always fills π ÷ 4 ≈ 78.5% of it.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} idx={idx} setIdx={setIdx} flat={flat} setFlat={setFlat} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  idx,
  setIdx,
  flat,
  setFlat,
}: StageContext & { idx: number; setIdx: (v: number) => void; flat: boolean; setFlat: (v: boolean) => void }) {
  const n = COUNTS[idx];
  const fired = useRef(false);
  useEffect(() => {
    if (!locked && flat && n >= 16 && !fired.current) {
      fired.current = true;
      interact();
    }
  }, [locked, flat, n, interact]);

  const a = Math.PI / n;
  const d = wedgePath(a);
  const stripW = n * R * Math.sin(a); // centre-line length, -> pi r

  const wedges = Array.from({ length: n }, (_, k) => {
    const phi = (k * 360) / n;
    let x: number;
    let y: number;
    let rot: number;
    if (!flat) {
      x = CX;
      y = CY;
      rot = phi;
    } else {
      const base = k % 2 === 0 ? 0 : 180;
      rot = base + 360 * Math.round((phi - base) / 360); // turn the short way
      x = SX + (k + 1) * R * Math.sin(a);
      y = k % 2 === 0 ? SY : SY + R * Math.cos(a);
    }
    return (
      <path
        key={`${n}-${k}`}
        d={d}
        className={`${s.wedge} ${k % 2 === 0 ? s.wA : s.wB}`}
        style={{ transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${rot}deg)` }}
      />
    );
  });

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={flat ? `${n} slices laid in a strip` : `A circle cut into ${n} slices`}>
        {BOXES.map((b, i) => {
          const [x, y] = flat ? b.to : b.from;
          return <rect key={i} x={0} y={0} width={R} height={R} className={s.box} style={{ transform: `translate(${x}px, ${y}px)` }} />;
        })}
        {wedges}
        {/* box outlines drawn over the slices, so the four boxes stay countable */}
        {BOXES.map((b, i) => {
          const [x, y] = flat ? b.to : b.from;
          return <rect key={`o${i}`} x={0} y={0} width={R} height={R} className={s.boxLine} style={{ transform: `translate(${x}px, ${y}px)` }} />;
        })}
        {!flat && (
          <>
            <line x1={CX} y1={CY} x2={CX + R} y2={CY} className={s.radius} />
            <text x={CX + R / 2} y={CY - 4} textAnchor="middle" className={s.label}>
              10
            </text>
            <text x={CX + R + 6} y={CY + R - 4} className={s.muted}>
              20 × 20
            </text>
          </>
        )}
        {flat && !locked && (
          <>
            <line x1={SX + R * Math.sin(a)} y1={SY - 9} x2={SX + R * Math.sin(a) + stripW} y2={SY - 9} className={s.measure} />
            <text x={SX + R * Math.sin(a) + stripW / 2} y={SY - 13} textAnchor="middle" className={s.label}>
              half the rim ≈ 31.4
            </text>
            <text x={SX + 4 * R + 2} y={SY + R / 2 + 4} className={s.label}>
              10
            </text>
            <text x={SX + 3.5 * R} y={SY + R + 20} textAnchor="middle" className={s.muted}>
              4 boxes = 400
            </text>
          </>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : flat
            ? n >= 16
              ? "The circle covers about 3.14 of the 4 boxes: roughly 78%."
              : "Bumpy. Cut more slices to straighten the edges."
            : `${n} slices. Unroll them into a strip.`}
      </p>

      <Row>
        <Slider label="Slices" value={idx} min={0} max={COUNTS.length - 1} disabled={locked} format={(v) => String(COUNTS[v])} onChange={setIdx} />
        <Control disabled={locked} onClick={() => setFlat(!flat)} className={flat ? "active" : ""} aria-pressed={flat}>
          {flat ? "Roll back up" : "Unroll"}
        </Control>
      </Row>
    </div>
  );
}
