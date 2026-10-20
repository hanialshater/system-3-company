"use client";

// Fence for the biggest pen. 20 m of fence makes a w by (10 - w) rectangle on a 1 m grid. One chip
// per width 1..9; the pen redraws and its area is counted in 1 m² squares. The start (3 × 7) is not
// a question option. Key states: the 5 × 5 square, and widths on both sides of 5 (through the peak).
// Every number comes from FENCE and area(w).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const FENCE = 20;
const HALF = FENCE / 2; // w + h
const WIDTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const START = 3;
const SQUARE = HALF / 2;
const MILESTONES = ["square", "both-sides"] as const;
const area = (w: number) => w * (HALF - w);
const shape = (w: number) => `${w} × ${HALF - w}`;

const U = 24;
const PAD = 26;
const SIDE = HALF * U;
const W = SIDE + PAD * 2;
const H = SIDE + PAD * 2;

export default function FenceForBiggestPen({ slug }: { slug: string }) {
  const [w, setW] = useState(START);
  const [seen, setSeen] = useState<number[]>([]);

  const reveal = () => {
    const tried = [...seen].sort((a, b) => area(a) - area(b));
    const low = tried[0];
    const others = seen.filter((x) => x !== SQUARE);
    const near = others.sort((a, b) => Math.abs(a - SQUARE) - Math.abs(b - SQUARE))[0];
    const d = Math.abs(near - SQUARE);
    return (
      <>
        <p>
          Every pen used the same {FENCE} m of fence, yet the ones you built held from {area(low)} m² ({shape(low)}) up to{" "}
          {area(SQUARE)} m² at {shape(SQUARE)}.
        </p>
        <p>
          Width plus height is always {HALF}. Moving {d} m away from the square costs {d * d} m²: {shape(near)} = {area(SQUARE)}{" "}
          − {d * d} = {area(near)}. The area is {area(SQUARE)} minus the square of the distance from {SQUARE}, so for a fixed
          fence the square pen holds the most.
        </p>
      </>
    );
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You have ${FENCE} m of fence to make a rectangular pen for your chickens. Which shape gives them the most area?`,
        options: [`${shape(1)} m`, `${shape(5)} m`, `${shape(4)} m`],
        answer: 1,
      }}
      exploreHint="Try widths on both sides of 5 and watch the area count."
      minInteractions={MILESTONES.length}
      reveal={reveal}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              w={w}
              onPick={(x) => {
                const next = seen.includes(x) ? seen : [...seen, x];
                setW(x);
                setSeen(next);
                if (x === SQUARE) reach("square");
                if (next.some((v) => v < SQUARE) && next.some((v) => v > SQUARE)) reach("both-sides");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, w, onPick }: { locked: boolean; w: number; onPick: (w: number) => void }) {
  const h = HALF - w;
  const x0 = PAD;
  const y0 = PAD + SIDE - h * U;
  const caption = locked
    ? "Make a prediction to start."
    : `Fence: ${w} + ${h} + ${w} + ${h} = ${FENCE} m. Each small square is 1\u00a0m².`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {Array.from({ length: HALF + 1 }, (_, i) => (
          <g key={i}>
            <line x1={PAD + i * U} y1={PAD} x2={PAD + i * U} y2={PAD + SIDE} className={s.grid} />
            <line x1={PAD} y1={PAD + i * U} x2={PAD + SIDE} y2={PAD + i * U} className={s.grid} />
          </g>
        ))}
        <rect x={x0} y={y0} width={w * U} height={h * U} className={w === SQUARE && !locked ? s.best : s.pen} />
        {Array.from({ length: w + 1 }, (_, i) => (
          <line key={`v${i}`} x1={x0 + i * U} y1={y0} x2={x0 + i * U} y2={y0 + h * U} className={s.cell} />
        ))}
        {Array.from({ length: h + 1 }, (_, i) => (
          <line key={`h${i}`} x1={x0} y1={y0 + i * U} x2={x0 + w * U} y2={y0 + i * U} className={s.cell} />
        ))}
        <rect x={x0} y={y0} width={w * U} height={h * U} className={s.fence} />
        <text x={x0 + (w * U) / 2} y={PAD + SIDE + 18} className={s.dim}>
          {w} m
        </text>
        <text x={x0 + w * U + 8} y={y0 + (h * U) / 2 + 5} className={s.dimL}>
          {h} m
        </text>
        <text x={x0 + (w * U) / 2} y={y0 + (h * U) / 2 + 6} className={s.inside}>
          {locked ? "?" : `${area(w)} m²`}
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Pick the width">
        {WIDTHS.map((x) => (
          <Control
            key={x}
            disabled={locked || x === w}
            className={x === w ? "active" : ""}
            aria-label={`Make the pen ${shape(x)} metres`}
            onClick={() => onPick(x)}
          >
            {shape(x)}
          </Control>
        ))}
      </div>
      <Row>
        <Readout label="Fence" value={`${FENCE} m`} />
        <Readout label="Area" value={locked ? "?" : `${area(w)} m²`} />
      </Row>
    </div>
  );
}
