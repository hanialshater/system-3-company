"use client";

// Waiting-time paradox. Eight hours of seeded random buses drawn as ticks on four 2-hour rows; gaps
// over 15 minutes are shaded. Riders arrive at random (dots); the first 11 show their wait as a line
// to the next bus. "Regular buses" swaps in a bus every 10 minutes for the same riders.
// Key state: 211 riders dropped and the regular schedule seen. Buttons in DOM order, each enabling the next.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { MEAN_GAP, RIDER_STEPS, SPAN, mean, meanGap, randomBuses, regularBuses, riders, waitFor } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["many", "regular"] as const;
const RANDOM = randomBuses();
const REGULAR = regularBuses();
const CUM = RIDER_STEPS.map((_, i) => RIDER_STEPS.slice(0, i + 1).reduce((a, b) => a + b, 0)); // 1, 11, 211
const ALL_RIDERS = riders(CUM[CUM.length - 1]);
const LONG = 15;
const ROW = 120;
const ROWS = SPAN / ROW;
const X0 = 10;
const X1 = 330;
const x = (t: number) => X0 + ((t % ROW) / ROW) * (X1 - X0);
const rowY = (t: number) => 22 + Math.floor(Math.min(t, SPAN - 0.001) / ROW) * 40;
const one = (v: number) => v.toFixed(1);
const avgWait = (k: number, buses: number[]) => mean(ALL_RIDERS.slice(0, k).map((t) => waitFor(t, buses)));
const GAP = meanGap(RANDOM);

/** Split [a, b] into per-row pieces. */
function pieces(a: number, b: number): [number, number][] {
  const out: [number, number][] = [];
  let t = a;
  while (t < b && t < SPAN) {
    const end = Math.min(b, (Math.floor(t / ROW) + 1) * ROW, SPAN);
    out.push([t, end]);
    t = end;
  }
  return out;
}

function Stage({
  locked,
  interact,
  step,
  setStep,
  regular,
  setRegular,
}: {
  locked: boolean;
  interact: () => void;
  step: number;
  setStep: (n: number) => void;
  regular: boolean;
  setRegular: (b: boolean) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const buses = regular ? REGULAR : RANDOM;
  const k = step === 0 ? 0 : CUM[step - 1];
  const rs = ALL_RIDERS.slice(0, k);
  const gaps = buses.map((b, i) => [i ? buses[i - 1] : 0, b] as const).filter(([a, b]) => b - a > LONG);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `Ticks: ${regular ? "regular" : "random"} buses over 8 hours. Dots: riders arriving at random. Shaded: gaps over ${LONG} minutes.`}
      </p>
      <svg viewBox="0 0 340 176" className={`stage-svg ${s.svg}`} role="img" aria-label={`${k} riders, ${regular ? "regular" : "random"} buses`}>
        {Array.from({ length: ROWS }, (_, r) => (
          <g key={r}>
            <line x1={X0} y1={22 + r * 40} x2={X1} y2={22 + r * 40} className={s.axis} />
            <text x={X0} y={36 + r * 40} className={s.tick}>
              hour {r * 2}–{r * 2 + 2}
            </text>
          </g>
        ))}
        {gaps.flatMap(([a, b], i) =>
          pieces(a, b).map(([p, q], j) => <rect key={`${i}-${j}`} x={x(p)} y={rowY(p) - 9} width={Math.max(0, x(q - 0.001) - x(p))} height={9} className={s.long} />),
        )}
        {buses
          .filter((b) => b < SPAN)
          .map((b, i) => (
            <line key={i} x1={x(b)} y1={rowY(b) - 12} x2={x(b)} y2={rowY(b) + 3} className={s.bus} />
          ))}
        {rs.slice(0, CUM[1]).flatMap((t, i) =>
          pieces(t, t + waitFor(t, buses)).map(([p, q], j) => <line key={`w${i}-${j}`} x1={x(p)} y1={rowY(p) - 4} x2={x(q - 0.001)} y2={rowY(p) - 4} className={s.wait} />),
        )}
        {rs.map((t, i) => (
          <circle key={i} cx={x(t)} cy={rowY(t) - 4} r={i < CUM[1] ? 2.6 : 1.6} className={s.rider} />
        ))}
      </svg>
      <Row>
        {RIDER_STEPS.map((n, i) => (
          <Control
            key={n}
            className={step > i ? "active" : ""}
            disabled={locked || step !== i}
            onClick={() => {
              setStep(i + 1);
              if (i + 1 === RIDER_STEPS.length) reach("many");
            }}
          >
            {i === 0 ? "Drop 1 rider" : `Drop ${n} more`}
          </Control>
        ))}
        <Control
          className={regular ? "active" : ""}
          disabled={locked || step < RIDER_STEPS.length}
          onClick={() => {
            setRegular(!regular);
            if (!regular) reach("regular");
          }}
        >
          {regular ? "Random buses" : "Regular buses"}
        </Control>
      </Row>
      <Row>
        <Readout label="Riders" value={k} />
        <Readout label="Average wait" value={locked || k === 0 ? "?" : `${one(avgWait(k, buses))} min`} />
        <Readout label="Average gap" value={`${one(regular ? MEAN_GAP : GAP)} min`} />
      </Row>
    </div>
  );
}

export default function BusWait({ slug }: { slug: string }) {
  const [step, setStep] = useState(0);
  const [regular, setRegular] = useState(false);
  const K = CUM[CUM.length - 1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You're at a bus stop. Buses come every ${MEAN_GAP} minutes on average, but at random times. You turn up at a random moment. About how long do you wait, on average?`,
        options: [`${MEAN_GAP / 2} minutes`, `${MEAN_GAP} minutes`, `${MEAN_GAP * 2} minutes`],
        answer: 1,
      }}
      exploreHint="Drop riders, then compare with regular buses."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your {K} riders waited <strong>{one(avgWait(K, RANDOM))} minutes</strong> on average for random buses, about the whole{" "}
            {one(GAP)}-minute average gap of this run, not half of it. With regular buses every {MEAN_GAP} minutes the same riders waited{" "}
            {one(avgWait(K, REGULAR))}.
          </p>
          <p>
            Random buses leave some long gaps, and long gaps cover more of the clock, so a random arrival is likelier to land in one. If
            buses really ran at random, the average wait equals the average gap.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} step={step} setStep={setStep} regular={regular} setRegular={setRegular} />
      )}
    </Lesson>
  );
}
