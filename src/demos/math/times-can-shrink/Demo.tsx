"use client";

// Times can shrink. A 2-by-2 grid with the unit square outlined and, inside it, the 0.6-wide strip
// (0.6 × 1). The shaded rectangle is 0.6 wide and h tall (h from 0 to 2 in tenths); its area is 0.6 × h.
// Below 1 it sits inside the strip, at 1 it fills it, above 1 it overflows. Milestones: "seven" (h = 0.7,
// the question's case), "one" (h = 1), "above" (h > 1, the largest such h is recorded). Each milestone
// leaves a dashed trace with its product, so the reveal's numbers stay on the stage after the learner moves
// on. QA path (DOM order): slider (0 → 0.2), "1.5", "1", "0.7". Every number comes from area(tenths).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const A10 = 6; // the fixed width, in tenths (0.6)
const MAX10 = 20; // h up to 2
const KEY10 = 7; // the question's 0.7
const MILESTONES = ["seven", "one", "above"] as const;
const U = 80; // px per unit
const X0 = 44;
const Y0 = 182; // bottom edge
const W = 320;
const H = 196;

/** Work in tenths so 0.6 × 0.7 prints 0.42, not 0.41999… */
const area = (h10: number) => (A10 * h10) / 100;
const num = (v: number) => String(Number(v.toFixed(2)));
const tenth = (h10: number) => num(h10 / 10);

/** Trace labels in height order, pushed apart so two near heights (1 and 1.1) do not overprint. */
function labelled(traces: { h: number; tag: string }[], y: (u10: number) => number) {
  let prev = Infinity;
  return [...traces]
    .sort((a, b) => a.h - b.h)
    .map((t) => {
      const ly = Math.min(y(t.h) + 4, prev - 13);
      prev = ly;
      return { ...t, ly };
    });
}

export default function TimesCanShrink({ slug }: { slug: string }) {
  const [h10, setH10] = useState(0);
  const [seen7, setSeen7] = useState(false);
  const [seen1, setSeen1] = useState(false);
  const [above, setAbove] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Checking your homework without a calculator, you multiply 0.6 by 0.7. Where does the answer land?",
        options: ["Above 0.7", "Between 0.6 and 0.7", "Below 0.6"],
        answer: 2,
      }}
      exploreHint="Set the height to 0.7, then to 1, then above 1."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You set the height to {tenth(KEY10)}, and the shaded area read <strong>{num(area(KEY10))}</strong>: smaller than{" "}
            {tenth(A10)} and smaller than {tenth(KEY10)}. Multiplying by {tenth(KEY10)} keeps seven tenths of the {tenth(A10)}{" "}
            strip, so it shrinks it.
          </p>
          <p>
            At height 1 the area stayed {num(area(10))}; only above 1, at {tenth(above ?? 10)}, did it grow, to{" "}
            {num(area(above ?? 10))}. Times makes bigger only when the other number is bigger than 1.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (v: number) => {
              const next = Math.min(MAX10, Math.max(0, Math.round(v)));
              setH10(next);
              if (next === KEY10) {
                setSeen7(true);
                reach("seven");
              }
              if (next === 10) {
                setSeen1(true);
                reach("one");
              }
              if (next > 10) {
                setAbove((a) => (a === null ? next : Math.max(a, next)));
                reach("above");
              }
            };
            const y = (u10: number) => Y0 - (u10 / 10) * U;
            const xw = X0 + (A10 / 10) * U;
            const traces: { h: number; tag: string }[] = [];
            if (seen7) traces.push({ h: KEY10, tag: "seven" });
            if (seen1) traces.push({ h: 10, tag: "one" });
            if (above !== null) traces.push({ h: above, tag: "above" });
            const caption = locked
              ? "The shaded part will be 0.6 wide. Make a prediction to start."
              : "Shaded: 0.6 wide, your height tall. Dashed: the 1-by-1 square.";
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  {/* grid 2 by 2 */}
                  {[0, 1, 2].map((i) => (
                    <g key={i}>
                      <line x1={X0} y1={Y0 - i * U} x2={X0 + 2 * U} y2={Y0 - i * U} className={s.grid} />
                      <line x1={X0 + i * U} y1={Y0} x2={X0 + i * U} y2={Y0 - 2 * U} className={s.grid} />
                      <text x={X0 - 6} y={Y0 - i * U + 4} className={s.axis} textAnchor="end">
                        {i}
                      </text>
                    </g>
                  ))}
                  <text x={X0 - 6} y={Y0 - 0.5 * U + 4} className={s.axisSmall} textAnchor="end">
                    h
                  </text>

                  {/* the product */}
                  {h10 > 0 && <rect x={X0} y={y(h10)} width={xw - X0} height={(h10 / 10) * U} className={s.shade} />}

                  {/* the unit square and the 0.6 strip inside it */}
                  <rect x={X0} y={Y0 - U} width={U} height={U} className={s.unit} />
                  <rect x={X0} y={Y0 - U} width={xw - X0} height={U} className={s.strip} />

                  {/* traces of the milestones */}
                  {labelled(traces, y).map((t) => (
                    <g key={t.tag}>
                      <line x1={X0} y1={y(t.h)} x2={xw + 6} y2={y(t.h)} className={s.trace} />
                      <text x={X0 + 2 * U + 8} y={t.ly} className={s.traceLab}>
                        0.6 × {tenth(t.h)} = {num(area(t.h))}
                      </text>
                    </g>
                  ))}

                  {h10 > 0 && (
                    <text x={(X0 + xw) / 2} y={y(h10) + Math.min(18, ((h10 / 10) * U) / 2 + 5)} className={s.areaLab} textAnchor="middle">
                      {num(area(h10))}
                    </text>
                  )}
                  <text x={xw} y={Y0 + 13} className={s.axis} textAnchor="middle">
                    0.6
                  </text>
                  <text x={X0 + U} y={Y0 + 13} className={s.axisSmall} textAnchor="middle">
                    1
                  </text>
                  <text x={X0 + 2 * U} y={Y0 + 13} className={s.axisSmall} textAnchor="middle">
                    2
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Slider label="Height h" value={h10} min={0} max={MAX10} step={1} disabled={locked} format={tenth} onChange={go} />
                <Row>
                  {[15, 10, KEY10].map((v) => (
                    <Control key={v} disabled={locked || h10 === v} onClick={() => go(v)} aria-label={`Set height ${tenth(v)}`}>
                      h = {tenth(v)}
                    </Control>
                  ))}
                  <Readout label="Area" value={locked ? "?" : `0.6 × ${tenth(h10)} = ${num(area(h10))}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
