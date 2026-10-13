"use client";

// Stack of cubes. k³ is drawn flat as k squares of k × k. Each chip lays the next cube's k squares
// as an L-shaped band around what is already there, growing the square from side T(k-1) to
// T(k) = 1 + 2 + ... + k. For even k one square is split into two halves (same colour, dashed).
// Only the next chip is enabled. Grid lines appear only inside the placed square, so the 10 × 10
// answer is not visible while locked. Key state: all four cubes placed, a 10 × 10 square, nothing left.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const N = 4;
const KS = Array.from({ length: N }, (_, i) => i + 1);
const T = (k: number) => (k * (k + 1)) / 2;
const cube = (k: number) => k ** 3;
const total = (n: number) => KS.slice(0, n).reduce((a, k) => a + cube(k), 0);
const SQSUM = KS.reduce((a, k) => a + k * k, 0); // 30, the sum of squares
const SUP: Record<number, string> = { 1: "¹", 2: "²", 3: "³", 4: "⁴" };
const MILESTONES = ["filled"] as const;
const WORD = ["", "one", "two", "three", "four"];

type Piece = { x: number; y: number; w: number; h: number; half: boolean };
/** The k squares of side k for layer k, as an L-band from side T(k-1) to T(k) (y measured up). */
function layer(k: number): Piece[] {
  const a = T(k - 1);
  const b = T(k);
  const out: Piece[] = [];
  let y = 0;
  while (y + k <= b) { out.push({ x: a, y, w: k, h: k, half: false }); y += k; }
  if (y < b) out.push({ x: a, y, w: k, h: b - y, half: true });
  let x = 0;
  while (x + k <= a) { out.push({ x, y: a, w: k, h: k, half: false }); x += k; }
  if (x < a) out.push({ x, y: a, w: a - x, h: k, half: true });
  return out;
}

const SIDE = T(N);
const U = 26;
const PAD = 10;
const W = SIDE * U + PAD * 2;
const sx = (x: number) => PAD + x * U;
const sy = (y: number) => PAD + (SIDE - y) * U;

export default function StackOfCubes({ slug }: { slug: string }) {
  const [placed, setPlaced] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `What is ${KS.map((k) => `${k}³`).join(" + ")}?`,
        options: [`${total(N)}`, `${cube(N)}`, `${SQSUM}`],
        answer: 0,
      }}
      exploreHint="Lay each cube flat into the corner, one at a time."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You placed {KS.map(cube).join(" + ")} = {total(N)} cells, and they filled a {SIDE} × {SIDE} square with nothing left
            over. After each cube the side was {KS.map(T).join(", ")}: that is {KS.map((k) => KS.slice(0, k).join(" + ")).join(", ")}.
          </p>
          <p>
            So {KS.map((k) => `${k}³`).join(" + ")} = ({KS.join(" + ")})² = {total(N)}. {cube(N)} is only the last cube; {SQSUM} is{" "}
            {KS.map((k) => `${k}²`).join(" + ")}. The pattern holds for every n (it can be proved by induction); this picture shows
            n = {N}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              placed={placed}
              onPlace={() => {
                const next = placed + 1;
                setPlaced(next);
                if (next === N) reach("filled");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, placed, onPlace }: { locked: boolean; placed: number; onPlace: () => void }) {
  const side = T(placed);
  const k = placed;
  const caption = locked
    ? "Make a prediction to start."
    : placed === 0
      ? "2³ = 2 × 2 × 2 = 8: two squares of 2 × 2. Lay each cube flat."
      : `${k}³ = ${WORD[k]} square${k > 1 ? "s" : ""} of ${k} × ${k} = ${cube(k)}${k % 2 === 0 ? " (one cut in half, dashed)" : ""}. Total ${total(k)} = ${side} × ${side}.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${W}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <rect x={sx(0)} y={sy(SIDE)} width={SIDE * U} height={SIDE * U} className={s.floor} />
        {KS.slice(0, locked ? 0 : placed).map((kk) =>
          layer(kk).map((p, i) => (
            <rect
              key={`${kk}-${i}`}
              x={sx(p.x)}
              y={sy(p.y + p.h)}
              width={p.w * U}
              height={p.h * U}
              className={`${s[`k${kk}`]} ${p.half ? s.half : s.whole}`}
            />
          )),
        )}
        {!locked &&
          Array.from({ length: side + 1 }, (_, i) => (
            <g key={i}>
              <line x1={sx(i)} y1={sy(0)} x2={sx(i)} y2={sy(side)} className={s.grid} />
              <line x1={sx(0)} y1={sy(i)} x2={sx(side)} y2={sy(i)} className={s.grid} />
            </g>
          ))}
        {!locked && placed > 0 && (
          <rect x={sx(0)} y={sy(side)} width={side * U} height={side * U} className={s.outline} />
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Place the cubes">
        {KS.map((kk, i) => (
          <Control
            key={kk}
            disabled={locked || i !== placed}
            className={i < placed ? "active" : ""}
            aria-label={`Place ${kk} cubed: ${WORD[kk]} square${kk > 1 ? "s" : ""} of ${kk} by ${kk}`}
            onClick={onPlace}
          >
            + {kk}
            {SUP[3]}
          </Control>
        ))}
      </div>
      <Row>
        <Readout label="Cells" value={locked ? "?" : total(placed)} />
        <Readout label="Square side" value={locked || placed === 0 ? "?" : side} />
      </Row>
    </div>
  );
}
