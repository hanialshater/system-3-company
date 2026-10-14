"use client";

// Mean vs median. Five salaries (thousands): 30, 35, 40, 45 and a boss who starts at 50.
// Bars are the salaries; one line is the mean, the other the median (the middle bar).
// Raising the boss drags the mean up: (150 + boss) / 5. The median stays on the middle
// bar, 40, because it only cares about order. Boss 500: mean 130, median 40.
// The reveal unlocks once the mean has passed four of the five salaries (boss >= 100).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const OTHERS = [30, 35, 40, 45];
const W = 300;
const H = 210;
const X0 = 40;
const X1 = 292;
const Y0 = 180; // salary 0
const Y1 = 14; // salary 500
const yOf = (v: number) => Y0 - (v / 500) * (Y0 - Y1);

export default function OneBossMovesTheMean({ slug }: { slug: string }) {
  const [boss, setBoss] = useState(50);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Five salaries, in thousands: 30, 35, 40, 45, 50. The mean is the total ÷ 5; the median is the middle one in order. The top salary jumps to 500. What changes?",
        options: ["Both the mean and the median", "Only the mean", "Only the median"],
        answer: 1,
      }}
      exploreHint="Raise the boss's salary and watch both lines."
      reveal={() => (
        <>
          <p>
            <strong>Only the mean.</strong> At 500 the mean is (30 + 35 + 40 + 45 + 500) ÷ 5 = 130, more than four of the
            five people earn. The median stayed at 40, the middle bar, the whole time you dragged.
          </p>
          <p>
            The mean adds up sizes, so one huge value pulls it along. The median only asks who is in the middle when
            you line people up, and the boss was already last in line. When a few values are extreme, the median is
            closer to a typical person.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} boss={boss} setBoss={setBoss} />}
    </Lesson>
  );
}

function Stage({ locked, interact, boss, setBoss }: StageContext & { boss: number; setBoss: (v: number) => void }) {
  const vals = [...OTHERS, boss];
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const median = [...vals].sort((a, b) => a - b)[2];
  const aboveFour = mean > 45;

  const fired = useRef(false);
  useEffect(() => {
    if (!locked && aboveFour && !fired.current) {
      fired.current = true;
      interact();
    }
  }, [locked, aboveFour, interact]);

  const slot = (X1 - X0) / 5;
  const bw = slot * 0.62;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Salaries with mean ${mean} and median ${median}`}>
        {[0, 100, 200, 300, 400, 500].map((v) => (
          <g key={v}>
            <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} className={s.grid} />
            <text x={X0 - 5} y={yOf(v) + 3} textAnchor="end" className={s.axis}>
              {v}
            </text>
          </g>
        ))}
        {vals.map((v, i) => {
          const x = X0 + slot * i + (slot - bw) / 2;
          return (
            <g key={i}>
              <rect x={x} y={yOf(v)} width={bw} height={Y0 - yOf(v)} rx={2} className={i === 4 ? s.boss : i === 2 ? s.middle : s.bar} />
              <text x={x + bw / 2} y={Y0 + 14} textAnchor="middle" className={i === 4 ? s.valBoss : s.val}>
                {v}
              </text>
            </g>
          );
        })}
        <line x1={X0} y1={yOf(median)} x2={X1} y2={yOf(median)} className={s.median} />
        <line x1={X0} y1={yOf(mean)} x2={X1} y2={yOf(mean)} className={s.mean} />
        <text x={X0 + slot * 3.5} y={yOf(mean) - 5} textAnchor="middle" className={s.meanLabel}>
          mean {mean}
        </text>
        <text x={X0 + 2} y={yOf(median) + 12} className={s.medianLabel}>
          median {median}
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : aboveFour
            ? "The mean is now above four of the five salaries. The median has not moved."
            : "Drag the boss's salary up."}
      </p>

      <Slider label="Boss's salary" value={boss} min={50} max={500} step={50} disabled={locked} format={(v) => `${v}k`} onChange={setBoss} />
      <Row>
        <Readout label="Mean" value={mean} />
        <Readout label="Median" value={median} />
      </Row>
    </div>
  );
}
