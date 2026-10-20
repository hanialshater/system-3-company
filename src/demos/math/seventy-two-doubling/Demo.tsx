"use client";

// Rule of 72. Bars: 100 growing at r% a year, compounded yearly: 100 (1 + r)^t.
// Dashed line: simple interest, 100 (1 + r t), which is the "100 / r years" intuition.
// The exact doubling time is ln 2 / ln(1 + r); 72 / r lands close to it for everyday rates.
//   r = 8%: exact 9.006 years (1.08^9 = 1.999), 72/8 = 9, simple interest 12.5 years.
// The reveal waits until the learner has looked at 8% and then at one other rate, so the shortcut is
// seen working at a rate it was not picked for. The slider starts at 7% (QA's two arrow presses
// land on 8 and then 9).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const W = 320;
const H = 196;
const X0 = 34;
const X1 = 312;
const Y0 = 170; // balance 0
const Y1 = 14; // balance TOP
const MAX_YEARS = 36;
const TOP = 230;

const yOf = (v: number) => Y0 - (Math.min(v, TOP) / TOP) * (Y0 - Y1);
const exactT = (r: number) => Math.log(2) / Math.log(1 + r / 100);
const ASK = 8;
const START = 7;
const MILESTONES = ["at-ask", "other-rate"] as const;

export default function SeventyTwoDoubling({ slug }: { slug: string }) {
  const [rate, setRate] = useState(START);
  const [other, setOther] = useState<number | null>(null); // the last rate other than 8 seen after 8

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Your savings grow 8% a year, compounded (each year's growth also grows). About how long until your money doubles?",
        options: ["12.5 years", "9 years", "6 years"],
        answer: 1,
      }}
      exploreHint="Set 8% and see where the bars cross the doubled line. Then try another rate and compare the shortcut."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            About <strong>9 years</strong>: 1.08 multiplied by itself 9 times is 1.999. The 12.5-year answer is simple
            interest, the dashed line, where only the first 100 earns. With compounding the interest earns interest, so
            the bars pull away and hit 200 sooner.
          </p>
          <p>
            The shortcut: 72 divided by the rate. At 8% that is 9.
            {other !== null
              ? ` At ${other}%, which you tried next, it gave ${(72 / other).toFixed(1)} against the exact ${exactT(other).toFixed(1)} years on the chart.`
              : ""}{" "}
            From 5% to 20% it stays within about 0.2 years of the exact answer, and 72 divides evenly by many rates (2, 3,
            4, 6, 8, 9, 12).
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} rate={rate} setRate={setRate} setOther={setOther} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  rate,
  setRate,
  setOther,
}: StageContext & { rate: number; setRate: (v: number) => void; setOther: (v: number) => void }) {
  const { reach, reached } = useMilestones(interact, MILESTONES);
  const change = (v: number) => {
    setRate(v);
    if (v === ASK) reach("at-ask");
    else if (reached("at-ask")) {
      setOther(v);
      reach("other-rate");
    }
  };

  const r = rate / 100;
  const T = exactT(rate);
  const simpleT = 100 / rate;
  // Time axis fits the picture: long enough for the simple-interest answer, never cramped.
  const YEARS = Math.min(MAX_YEARS, Math.max(10, Math.ceil(simpleT * 1.15)));
  const xOf = (t: number) => X0 + (t / YEARS) * (X1 - X0);
  const flip = xOf(T) > W - 100;
  const bw = ((X1 - X0) / YEARS) * 0.72;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Balance growing at ${rate}% a year`}>
        {[100, 200].map((v) => (
          <g key={v}>
            <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} className={v === 200 ? s.double : s.grid} />
            <text x={X0 - 4} y={yOf(v) + 3} textAnchor="end" className={v === 200 ? s.doubleLabel : s.axis}>
              {v}
            </text>
          </g>
        ))}
        {[0, 10, 20, 30].filter((t) => t <= YEARS).map((t) => (
          <text key={t} x={xOf(t)} y={Y0 + 13} textAnchor="middle" className={s.axis}>
            {t === 0 ? "0 yrs" : t}
          </text>
        ))}
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} className={s.base} />

        {/* bars stop at the first year that reaches 200: the question is when, not how high */}
        {!locked && Array.from({ length: Math.min(YEARS, Math.ceil(T - 1e-9)) + 1 }, (_, t) => {
          const v = 100 * (1 + r) ** t;
          return (
            <rect
              key={t}
              x={xOf(t) - bw / 2}
              y={yOf(v)}
              width={bw}
              height={Y0 - yOf(v)}
              className={v >= 200 ? s.barDone : s.bar}
            />
          );
        })}
        {/* simple interest */}
        {!locked && <line x1={xOf(0)} y1={yOf(100)} x2={xOf(Math.min(YEARS, simpleT))} y2={yOf(100 * (1 + r * Math.min(YEARS, simpleT)))} className={s.simple} />}

        {!locked && (
          <>
            <line x1={xOf(T)} y1={yOf(200) - 10} x2={xOf(T)} y2={Y0} className={s.mark} />
            <circle cx={xOf(T)} cy={yOf(200)} r={3.5} className={s.dot} />
            <rect x={flip ? xOf(T) - 95 : xOf(T) + 3} y={yOf(200) - 26} width={92} height={15} rx={4} className={s.labelBg} />
            <text x={flip ? xOf(T) - 91 : xOf(T) + 7} y={yOf(200) - 15} className={s.markLabel}>
              doubled: {T.toFixed(1)} yrs
            </text>
            {simpleT <= YEARS && <circle cx={xOf(simpleT)} cy={yOf(200)} r={3} className={s.simpleDot} />}
            {simpleT <= YEARS && (
              <text x={xOf(simpleT)} y={yOf(200) + 13} textAnchor={xOf(simpleT) > W - 50 ? "end" : "middle"} className={s.axis}>
                simple: {simpleT.toFixed(1)}
              </text>
            )}
          </>
        )}
      </svg>

      <p className={s.caption}>
        {locked ? "Make a prediction to start." : "Bars: compounded. Dashed: simple interest, where only the first 100 earns."}
      </p>

      <Slider label="Growth per year" value={rate} min={2} max={20} disabled={locked} format={(v) => `${v}%`} onChange={change} />
      <Row>
        <Readout label="Doubles in" value={locked ? "?" : `${T.toFixed(1)} yrs`} />
        <Readout label={locked ? "Shortcut" : "Shortcut 72 ÷ rate"} value={locked ? "?" : `${(72 / rate).toFixed(1)}`} />
        <Readout label="Simple" value={locked ? "?" : `${simpleT.toFixed(1)} yrs`} />
      </Row>
    </div>
  );
}
