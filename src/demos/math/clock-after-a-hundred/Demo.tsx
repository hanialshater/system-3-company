"use client";

// Clock after a hundred. A 12-hour clock starts at 9. A row of step chips adds time in the order
// 100 = 8 × 12 + 4: eight "+12" laps (the hand spins once and lands on 9 again), then four "+1"
// hours (10, 11, 12, 1). Only the next chip is enabled, so the QA path reaches 96 h and then 100 h.
// Key states: eight full laps done (hand still on 9), and all 100 hours added (hand on 1).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const START = 9;
const TOTAL = 100;
const LAP = 12;
const LAPS = Math.floor(TOTAL / LAP); // 8
const LEFT = TOTAL % LAP; // 4
const STEPS = [...Array(LAPS).fill(LAP), ...Array(LEFT).fill(1)] as number[];
const MILESTONES = ["eight-laps", "hundred"] as const;
const clock = (h: number) => ((START + h - 1) % 12) + 1;
const END = clock(TOTAL);

const CX = 100;
const CY = 100;
const R = 84;

export default function ClockAfterAHundred({ slug }: { slug: string }) {
  const [done, setDone] = useState(0);
  const hours = STEPS.slice(0, done).reduce((a, b) => a + b, 0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `It is ${START} o'clock. What time will it be ${TOTAL} hours later?`,
        options: [`${END} o'clock`, `${LEFT} o'clock`, `${START} o'clock`],
        answer: 0,
      }}
      exploreHint="Add the hours: whole laps first, then the rest."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your {LAPS} laps took {LAPS * LAP} hours and left the hand on {START}, exactly where it began. Only the last {LEFT}{" "}
            hours moved it: {Array.from({ length: LEFT }, (_, i) => clock(LAPS * LAP + i + 1)).join(", ")}.
          </p>
          <p>
            So {TOTAL} = {LAPS} × {LAP} + {LEFT}, and only the leftover {LEFT} matters: {START} + {LEFT} = {START + LEFT}, which a
            12-hour clock shows as {END}. Answering {LEFT} o&apos;clock mistakes the leftover for the time. On a clock, full laps
            change nothing; only the remainder moves the hand.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              done={done}
              hours={hours}
              onStep={() => {
                const next = done + 1;
                setDone(next);
                if (next >= LAPS) reach("eight-laps");
                if (next === STEPS.length) reach("hundred");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, done, hours, onStep }: { locked: boolean; done: number; hours: number; onStep: () => void }) {
  const laps = Math.min(done, LAPS);
  const extra = Math.max(0, done - LAPS);
  const deg = (START + hours) * 30; // cumulative, so a lap spins the hand once
  const caption = locked
    ? "Make a prediction to start."
    : done === 0
      ? `+${LAP} is one full lap of the hand. +1 moves it one hour.`
      : extra === 0
        ? `${hours} hours = ${laps} full lap${laps > 1 ? "s" : ""}. The hand is back on ${START}.`
        : `${LAPS * LAP} + ${extra} = ${hours} hours. The hand is ${extra} past ${START}: ${clock(hours)} o'clock.`;

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 200 200" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <circle cx={CX} cy={CY} r={R + 8} className={s.face} />
        {Array.from({ length: 12 }, (_, i) => {
          const n = i + 1;
          const a = (n * 30 * Math.PI) / 180;
          return (
            <text
              key={n}
              x={CX + Math.sin(a) * (R - 10)}
              y={CY - Math.cos(a) * (R - 10) + 6}
              className={n === clock(hours) && !locked ? s.numOn : s.num}
            >
              {n}
            </text>
          );
        })}
        {Array.from({ length: LAPS }, (_, i) => (
          <circle key={i} cx={CX - 35 + i * 10} cy={CY + 34} r={3.5} className={i < laps ? s.lapOn : s.lap} />
        ))}
        <g className={s.hand} style={{ transform: `rotate(${deg}deg)`, transformOrigin: `${CX}px ${CY}px` }}>
          <line x1={CX} y1={CY + 8} x2={CX} y2={CY - 52} />
          <circle cx={CX} cy={CY - 52} r={4} />
        </g>
        <circle cx={CX} cy={CY} r={5} className={s.hub} />
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Add hours">
        {STEPS.map((h, k) => (
          <Control
            key={k}
            disabled={locked || k !== done}
            className={k < done ? "active" : ""}
            aria-label={h === LAP ? `Add lap ${k + 1}: ${LAP} hours` : `Add 1 hour`}
            onClick={onStep}
          >
            +{h}
          </Control>
        ))}
      </div>
      <Row>
        <Readout label="Hours added" value={`${hours} of ${TOTAL}`} />
        <Readout label="Laps" value={laps} />
        <Readout label="Time" value={`${clock(hours)} o'clock`} />
      </Row>
    </div>
  );
}
