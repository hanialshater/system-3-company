"use client";

// Seesaw mean. Four equal weights sit on a plank at 1, 2, 3 and 10. The learner moves the pivot
// (slider, 0.5 steps, starts at 3 so two arrow presses reach 4). The plank tilts by the total of
// (position - pivot): positive means the right side is heavier. Level only when that total is 0.
// Key states: level (pivot at the mean, 4) and at least one tipped position tried.
// Numbers on stage stay hidden until level. Every number comes from WEIGHTS.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const WEIGHTS = [1, 2, 3, 10];
const MEAN = WEIGHTS.reduce((a, b) => a + b, 0) / WEIGHTS.length;
const MEDIAN = (WEIGHTS[1] + WEIGHTS[2]) / 2;
const MIDRANGE = (WEIGHTS[0] + WEIGHTS[WEIGHTS.length - 1]) / 2;
const START = 3;
const MILESTONES = ["tipped", "level"] as const;
const W = 320;
const X0 = 32;
const UNIT = 23;
const PLANK_Y = 104;
const xOf = (p: number) => X0 + p * UNIT;
const torque = (pivot: number) => WEIGHTS.reduce((a, w) => a + (w - pivot), 0);
const tilt = (pivot: number) => Math.max(-14, Math.min(14, torque(pivot) * 3));
const dirOf = (pivot: number) => (torque(pivot) > 0 ? "right" : "left");

export default function SeesawMean({ slug }: { slug: string }) {
  const [pivot, setPivot] = useState(START);
  const [lastTipped, setLastTipped] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In your workshop, you set equal weights at ${WEIGHTS.slice(0, -1).join(", ")} and ${WEIGHTS[WEIGHTS.length - 1]} along a plank. Where must the pivot go so the plank balances?`,
        options: [String(MEDIAN), String(MEAN), String(MIDRANGE)],
        answer: 1,
      }}
      exploreHint="Slide the pivot, or try a position, until the plank sits level."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The plank sat level with the pivot at <strong>{MEAN}</strong>. {WEIGHTS.map((w) => w - MEAN).join(", ")} are the weights' distances from the pivot: they add to {torque(MEAN)}, so the pulls cancel.
          </p>
          <p>
            That is the mean: ({WEIGHTS.join(" + ")}) ÷ {WEIGHTS.length} = {MEAN}. {lastTipped !== null ? `At ${lastTipped} the plank tipped ${dirOf(lastTipped)}. ` : ""}
            The middle number, {MEDIAN}, counts the weights; the mean balances how far they sit.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const level = torque(pivot) === 0;
            const set = (p: number) => {
              setPivot(p);
              if (torque(p) === 0) reach("level");
              else {
                setLastTipped(p);
                reach("tipped");
              }
            };
            const caption = locked
              ? "Equal weights on a plank. Make a prediction to start."
              : level
                ? `Level. The plank balances with the pivot at ${pivot}.`
                : `Tips ${dirOf(pivot)}. The pivot is not at the balance point.`;
            const ang = tilt(pivot);
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} 170`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <polygon points={`${xOf(pivot)},${PLANK_Y + 7} ${xOf(pivot) - 18},${PLANK_Y + 50} ${xOf(pivot) + 18},${PLANK_Y + 50}`} className={s.pivot} />
                  <g transform={`rotate(${ang} ${xOf(pivot)} ${PLANK_Y + 7})`}>
                    <rect x={X0 - 14} y={PLANK_Y} width={11 * UNIT + 28} height={14} rx={3} className={level && !locked ? s.plankLevel : s.plank} />
                    {Array.from({ length: 12 }, (_, i) => (
                      <text key={i} x={xOf(i)} y={PLANK_Y + 10.5} className={s.tick}>
                        {i}
                      </text>
                    ))}
                    {WEIGHTS.map((w) => (
                      <rect key={w} x={xOf(w) - 11} y={PLANK_Y - 22} width={22} height={22} rx={3} className={s.weight} />
                    ))}
                  </g>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Slider
                  label="Pivot position"
                  value={pivot}
                  min={0.5}
                  max={10.5}
                  step={0.5}
                  disabled={locked}
                  format={() => ""}
                  onChange={set}
                />
                <Row>
                  <Control disabled={locked || pivot === MEDIAN} onClick={() => set(MEDIAN)}>
                    Try {MEDIAN}
                  </Control>
                  <Control disabled={locked || pivot === MIDRANGE} onClick={() => set(MIDRANGE)}>
                    Try {MIDRANGE}
                  </Control>
                </Row>
                <Row>
                  <Readout label="Plank" value={locked ? "?" : level ? "Level" : `Tips ${dirOf(pivot)}`} />
                  <Readout label="Pivot at" value={locked || !level ? "?" : pivot} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
