"use client";

// Toy model of a falling daily count. Today there are 1,000 new cases; each later day has a
// fixed share fewer than the day before (10% unless the learner moves the slider). The stage
// stacks the cases reported from tomorrow on: each dot is 100 cases (running total, rounded).
// The top row shows today's 1,000 for comparison. Deterministic: no randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const TODAY = 1000;
const FALL_Q = 10; // % fewer each day, the question's setting
const MAX_DAY = 90;
const PER_DOT = 100;
const COLS = 20;
const ROWS = 10; // 200 dots = 20,000 cases, enough for the 5% fall
const GAP = 14;
const MILESTONES = ["ten-days", "long-tail"] as const;

const newOn = (day: number, fall: number) => TODAY * (1 - fall / 100) ** day;
const totalTo = (day: number, fall: number) => {
  let t = 0;
  for (let d = 1; d <= day; d++) t += newOn(d, fall);
  return t;
};
/** Everything from tomorrow on, if the fall never changes: a r / (1 - r). */
const forever = (fall: number) => (TODAY * (1 - fall / 100)) / (fall / 100);
const fmt = (x: number) => Math.round(x).toLocaleString("en-US");
const ANSWER = forever(FALL_Q); // 9,000

function Stage({
  locked,
  day,
  fall,
  go,
}: {
  locked: boolean;
  day: number;
  fall: number;
  go: (d: number, f: number) => void;
}) {
  const total = totalTo(day, fall);
  const lit = Math.round(total / PER_DOT);
  const prevLit = Math.round(totalTo(Math.max(0, day - 1), fall) / PER_DOT);
  const top = GAP * 1.6;
  const W = COLS * GAP;
  const msg = locked
    ? `Make a prediction to start. Toy: ${fmt(TODAY)} new cases today, then a steady daily fall.`
    : day === 0
      ? `Today: ${fmt(TODAY)} new cases (top row). Each dot below is 100 cases from tomorrow on.`
      : `Day ${day}: ${fmt(newOn(day, fall))} new. Total since today: ${fmt(total)}, ${(total / TODAY).toFixed(1)} times today's.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`-2 -2 ${W + 4} ${top + ROWS * GAP + 4}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {Array.from({ length: TODAY / PER_DOT }, (_, i) => (
          <circle key={`t${i}`} cx={i * GAP + GAP / 2} cy={GAP / 2} r={5} className={s.today} />
        ))}
        <text x={(TODAY / PER_DOT) * GAP + 4} y={GAP / 2 + 4} className={s.lab}>today</text>
        <line x1={0} x2={W} y1={top - 3} y2={top - 3} className={s.rule} />
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const on = !locked && i < lit;
          const fresh = on && i >= prevLit;
          return (
            <circle
              key={i}
              cx={(i % COLS) * GAP + GAP / 2}
              cy={top + Math.floor(i / COLS) * GAP + GAP / 2}
              r={on ? 5 : 1.6}
              className={fresh ? s.fresh : on ? s.on : s.off}
            />
          );
        })}
      </svg>

      <p className={s.msg} aria-live="polite">{msg}</p>

      <Row>
        <Control disabled={locked || day >= MAX_DAY} onClick={() => go(Math.min(MAX_DAY, day + 10), fall)}>+10 days</Control>
        <Control disabled={locked || day === MAX_DAY} onClick={() => go(MAX_DAY, fall)}>To day {MAX_DAY}</Control>
        <Control disabled={locked || day >= MAX_DAY} onClick={() => go(day + 1, fall)}>+1 day</Control>
        <Control disabled={locked || day === 0} onClick={() => go(0, fall)}>Restart</Control>
      </Row>
      <Slider label="Daily fall" value={fall} min={5} max={30} disabled={locked} format={(v) => `${v}% fewer each day`} onChange={(f) => go(day, f)} />
    </div>
  );
}

export default function FallingYetAdding({ slug }: { slug: string }) {
  const [day, setDay] = useState(0);
  const [fall, setFall] = useState(FALL_Q);
  const [far, setFar] = useState(0); // furthest day reached at the question's fall
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy outbreak: ${fmt(TODAY)} new cases today; each day ${FALL_Q}% fewer than the day before. If that continues, how many more cases from tomorrow on?`,
        options: [`About ${fmt(TODAY)}`, "About 4,000", `About ${fmt(ANSWER)}`],
        answer: 2,
      }}
      exploreHint={`Add days at ${FALL_Q}% and watch the total, not the daily number.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Every day was smaller, yet by day {far} the total from tomorrow on was {fmt(totalTo(far, FALL_Q))}. The days add{" "}
            {fmt(newOn(1, FALL_Q))} + {fmt(newOn(2, FALL_Q))} + {fmt(newOn(3, FALL_Q))} + &hellip; and the whole tail sums to{" "}
            {fmt(newOn(1, FALL_Q))} / {FALL_Q / 100} = <strong>{fmt(ANSWER)}</strong>, nine times today&rsquo;s count.
          </p>
          <p>
            Falling is not the same as finished. The slower the fall, the heavier the tail: at 5% a day it sums to{" "}
            {fmt(forever(5))}; at 30% a day, {fmt(forever(30))}.
          </p>
          <p className="muted">Toy model: a made-up outbreak whose daily fall never changes. Real curves do not fall this steadily.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              day={day}
              fall={fall}
              go={(d, f) => {
                setDay(d);
                setFall(f);
                if (f === FALL_Q) {
                  setFar((x) => Math.max(x, d));
                  if (d >= 10) reach("ten-days");
                  if (d >= MAX_DAY) reach("long-tail");
                }
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
