"use client";

// Split the sum. A 13 by 7 rectangle on a 1-unit grid with one movable cut (a slider, 1..12). The
// two pieces' areas are a x 7 and b x 7 and always add to 13 x 7 = 91. Key states: the cut at 10
// (70 and 21 side by side) and "any other cut still adds to the same total". The slider starts at 8
// so two arrow presses (the QA path) pass 9 and land on 10. Every number comes from LEN, ROWS, TEN.
// v3: a cut only counts as read when the learner stops on it (a −1/+1 press, or the slider resting
// for 300 ms). The reveal waits for a stop at 10 and a stop elsewhere, and quotes the last other stop.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const LEN = 13;
const ROWS = 7;
const TEN = 10;
const START = 8;
const MILESTONES = ["ten", "elsewhere"] as const;
const total = LEN * ROWS;
const U = 21;
const PAD_X = (320 - LEN * U) / 2;
const PAD_Y = 34;
const W = 320;
const H = PAD_Y + ROWS * U + 14;

export default function SplitTheSum({ slug }: { slug: string }) {
  const [cut, setCut] = useState(START);
  const [other, setOther] = useState<number | null>(null);
  const rest = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (rest.current) clearTimeout(rest.current);
  }, []);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You cut a ${LEN} × ${ROWS} rectangle of grid paper into two pieces and add the two areas. Which cuts give the true ${LEN} × ${ROWS}?`,
        options: [`Only a cut at ${TEN}`, "Any cut", "Only a cut near the middle"],
        answer: 1,
      }}
      exploreHint={`Stop the cut at ${TEN} and read the areas. Then stop at another column and read them again.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Cut at {TEN}, the rectangle splits into {TEN} × {ROWS} = <strong>{TEN * ROWS}</strong> and {LEN - TEN} × {ROWS} ={" "}
            <strong>{(LEN - TEN) * ROWS}</strong>. Together {TEN * ROWS} + {(LEN - TEN) * ROWS} = <strong>{total}</strong>, which is{" "}
            {LEN} × {ROWS}.
          </p>
          <p>
            {other !== null
              ? `You also stopped at ${other}: ${other * ROWS} + ${(LEN - other) * ROWS} = ${total}, the same total. `
              : ""}
            The pieces always fill the same rectangle, so any cut works. Pick the one that makes easy products: times {TEN} is
            easy.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const a = cut;
            const b = LEN - cut;
            // A stop: the learner has settled on this cut, so its areas were on screen to read.
            const stop = (v: number) => {
              if (v === TEN) reach("ten");
              else {
                setOther(v);
                reach("elsewhere");
              }
            };
            const move = (v: number, settled: boolean) => {
              const k = Math.max(1, Math.min(LEN - 1, v));
              setCut(k);
              if (rest.current) clearTimeout(rest.current);
              if (settled) stop(k);
              else rest.current = setTimeout(() => stop(k), 300);
            };
            const caption = locked
              ? "Make a prediction to start."
              : `The ${LEN} × ${ROWS} rectangle is cut in two. A piece's area is its width × ${ROWS}.`;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <rect x={PAD_X} y={PAD_Y} width={a * U} height={ROWS * U} className={s.left} />
                  <rect x={PAD_X + a * U} y={PAD_Y} width={b * U} height={ROWS * U} className={s.right} />
                  {Array.from({ length: LEN + 1 }, (_, i) => (
                    <line key={`v${i}`} x1={PAD_X + i * U} y1={PAD_Y} x2={PAD_X + i * U} y2={PAD_Y + ROWS * U} className={s.cell} />
                  ))}
                  {Array.from({ length: ROWS + 1 }, (_, i) => (
                    <line key={`h${i}`} x1={PAD_X} y1={PAD_Y + i * U} x2={PAD_X + LEN * U} y2={PAD_Y + i * U} className={s.cell} />
                  ))}
                  <line x1={PAD_X + a * U} y1={PAD_Y - 8} x2={PAD_X + a * U} y2={PAD_Y + ROWS * U + 8} className={s.cutline} />
                  <text x={PAD_X + (a * U) / 2} y={PAD_Y - 12} className={s.dim}>
                    {a}
                  </text>
                  <text x={PAD_X + a * U + (b * U) / 2} y={PAD_Y - 12} className={s.dim}>
                    {b}
                  </text>
                  <text x={PAD_X + LEN * U + 3} y={PAD_Y + (ROWS * U) / 2 + 4} className={s.dimL}>
                    {ROWS}
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Slider
                  label="Cut after column"
                  value={cut}
                  min={1}
                  max={LEN - 1}
                  disabled={locked}
                  onChange={(v) => move(v, false)}
                />
                <Row>
                  <Control disabled={locked || cut <= 1} onClick={() => move(cut - 1, true)} aria-label="Move the cut one column left">
                    −1 column
                  </Control>
                  <Control disabled={locked || cut >= LEN - 1} onClick={() => move(cut + 1, true)} aria-label="Move the cut one column right">
                    +1 column
                  </Control>
                </Row>
                <Row>
                  <Readout label="Left piece" value={locked ? "?" : `${a}×${ROWS}=${a * ROWS}`} />
                  <Readout label="Right piece" value={locked ? "?" : `${b}×${ROWS}=${b * ROWS}`} />
                  <Readout label="Together" value={locked ? "?" : a * ROWS + b * ROWS} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
