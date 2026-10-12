"use client";

// Pythagoras by rearrangement. A 7 x 7 frame holds four copies of the 3-4-c right
// triangle. In the "corners" layout the empty space is one tilted square, c x c. Slide
// three of the triangles (pure translations, no turning) and the empty space becomes a
// 3 x 3 and a 4 x 4 square. Nothing was added or removed, so c x c = 9 + 16 = 25.
//
// Geometry, units, y down. Frame [0,7] x [0,7].
//   T1 (0,0) (3,0) (0,4)   slides +(0,3)
//   T2 (7,0) (7,3) (3,0)   stays
//   T3 (7,7) (4,7) (7,3)   slides +(-4,0)
//   T4 (0,7) (0,4) (4,7)   slides +(3,-4)
// Empty area either way: 7^2 - 4 x (3 x 4 / 2) = 49 - 24 = 25.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const U = 30; // px per unit
const O = 15; // frame offset, px
const SIZE = 7 * U + 2 * O;

type Pt = [number, number];
const TRI: { pts: Pt[]; move: Pt; at: number }[] = [
  { pts: [[0, 0], [3, 0], [0, 4]], move: [0, 3], at: 2 },
  { pts: [[7, 0], [7, 3], [3, 0]], move: [0, 0], at: 0 },
  { pts: [[7, 7], [4, 7], [7, 3]], move: [-4, 0], at: 2 },
  { pts: [[0, 7], [0, 4], [4, 7]], move: [3, -4], at: 1 },
];

const px = (v: number) => O + v * U;
const poly = (pts: Pt[]) => pts.map(([x, y]) => `${px(x)},${px(y)}`).join(" ");

export default function TwoSquaresBecomeOne({ slug }: { slug: string }) {
  const [step, setStep] = useState(0);
  const [sawSquares, setSawSquares] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A right triangle has short sides 3 and 4. How long is its long side?",
        options: ["5", "7", "3.5"],
        answer: 0,
      }}
      exploreHint="Slide the triangles all the way, then back."
      reveal={() => (
        <>
          <p>
            The long side is <strong>5</strong>. You moved three triangles without turning them, so the empty space kept
            its size. As one tilted square it is c × c; as two squares it is 3 × 3 + 4 × 4 = 9 + 16 = 25. So c × c = 25
            and c = 5.
          </p>
          <p>
            Nothing here used 3 and 4 in particular. Any right triangle with short sides a and b packs the same way, so
            a² + b² = c². That is Pythagoras, and now you have seen why it holds.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} step={step} setStep={setStep} sawSquares={sawSquares} setSawSquares={setSawSquares} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  step,
  setStep,
  sawSquares,
  setSawSquares,
}: StageContext & {
  step: number;
  setStep: (n: number) => void;
  sawSquares: boolean;
  setSawSquares: (b: boolean) => void;
}) {
  // The reveal is earned by reaching the two-squares layout, not by touching the slider.
  const fired = useRef(false);
  useEffect(() => {
    if (!locked && step === 2 && !fired.current) {
      fired.current = true;
      setSawSquares(true);
      interact();
    }
  }, [locked, step, interact, setSawSquares]);

  const caption = locked
    ? "Make a prediction to start."
    : step === 0
      ? sawSquares
        ? "The same empty space: c × c = 25, so c = 5."
        : "The empty space is one tilted square, c × c. Slide the triangles."
      : step === 1
        ? "Nothing turns, nothing is added or cut. Keep sliding."
        : "Same empty space, now two squares: 9 + 16 = 25.";

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={`stage-svg ${s.fit}`} role="img" aria-label="Four right triangles in a square frame">
        <rect x={px(0)} y={px(0)} width={7 * U} height={7 * U} className={s.empty} />
        {!locked &&
          Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <line x1={px(i + 1)} y1={px(0)} x2={px(i + 1)} y2={px(7)} className={s.grid} />
              <line x1={px(0)} y1={px(i + 1)} x2={px(7)} y2={px(i + 1)} className={s.grid} />
            </g>
          ))}

        {/* empty-space labels sit under the triangles */}
        {step === 0 && (
          <text x={px(3.5)} y={px(3.5)} textAnchor="middle" dominantBaseline="middle" className={sawSquares ? s.areaKnown : s.area}>
            {sawSquares ? "25" : "c × c = ?"}
          </text>
        )}
        {step === 2 && (
          <>
            <rect x={px(0)} y={px(0)} width={3 * U} height={3 * U} className={s.sq} />
            <rect x={px(3)} y={px(3)} width={4 * U} height={4 * U} className={s.sq} />
            <text x={px(1.5)} y={px(1.5)} textAnchor="middle" dominantBaseline="middle" className={s.areaKnown}>
              9
            </text>
            <text x={px(5)} y={px(5)} textAnchor="middle" dominantBaseline="middle" className={s.areaKnown}>
              16
            </text>
          </>
        )}

        {TRI.map((t, i) => {
          const moved = t.at > 0 && step >= t.at;
          const dx = moved ? t.move[0] * U : 0;
          const dy = moved ? t.move[1] * U : 0;
          return (
            <g key={i} className={s.tri} style={{ transform: `translate(${dx}px, ${dy}px)` }}>
              <polygon points={poly(t.pts)} className={i % 2 ? s.triB : s.triA} />
            </g>
          );
        })}

        {/* side labels on the first triangle (it only ever slides) */}
        <g className={s.tri} style={{ transform: `translate(0px, ${step >= 2 ? 3 * U : 0}px)` }}>
          <text x={px(1.5)} y={px(0) + 13} textAnchor="middle" className={s.side}>
            3
          </text>
          <text x={px(0) + 8} y={px(2)} textAnchor="middle" dominantBaseline="middle" className={s.side}>
            4
          </text>
          <text x={px(1.75)} y={px(2.25)} textAnchor="middle" dominantBaseline="middle" className={s.sideC}>
            c
          </text>
        </g>
        <rect x={px(0)} y={px(0)} width={7 * U} height={7 * U} className={s.frame} />
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Slider
        label="Slide the triangles"
        value={step}
        min={0}
        max={2}
        step={1}
        disabled={locked}
        format={(v) => ["corners", "halfway", "pairs"][v]}
        onChange={setStep}
      />
    </div>
  );
}
