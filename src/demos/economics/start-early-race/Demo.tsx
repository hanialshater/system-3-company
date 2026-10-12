"use client";

// Start early. One chart, two savers over 40 years at 7%. Ana saves $2,400 a year for the
// first 10 years, then stops. Ben waits some years, then saves $2,400 a year until year 40.
// The learner slides how long Ben waits and finds where Ana's early $24,000 beats Ben's
// much larger total. Model: fixed 7%, deposits at the end of each year, no fees, taxes or inflation.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const PMT = 2400;
const RATE = 0.07;
const YEARS = 40;
const ANA_YEARS = 10;
const YMAX = 500000;

const annuity = (n: number) => (n <= 0 ? 0 : (PMT * ((1 + RATE) ** n - 1)) / RATE);
const ana = (t: number) => (t <= ANA_YEARS ? annuity(t) : annuity(ANA_YEARS) * (1 + RATE) ** (t - ANA_YEARS));
const ben = (t: number, wait: number) => annuity(t - wait);

// Plot geometry (viewBox 320 × 200).
const L = 40;
const R = 282;
const TOP = 14;
const BOT = 172;
const px = (t: number) => L + (t / YEARS) * (R - L);
const py = (v: number) => BOT - (Math.min(v, YMAX) / YMAX) * (BOT - TOP);
const ys = Array.from({ length: YEARS + 1 }, (_, i) => i);
const line = (f: (t: number) => number) => ys.map((t) => `${px(t).toFixed(1)},${py(f(t)).toFixed(1)}`).join(" ");

const money = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const k = (v: number) => `$${Math.round(v / 1000)}k`;

export default function StartEarlyRace({ slug }: { slug: string }) {
  const [wait, setWait] = useState(0);

  const aEnd = ana(YEARS);
  const bEnd = ben(YEARS, wait);
  const benIn = PMT * (YEARS - wait);
  const anaAhead = aEnd > bEnd;
  const aY = py(aEnd);
  const bY = py(bEnd);
  // Keep the two end labels apart.
  const [aLab, bLab] = Math.abs(aY - bY) < 14 ? (anaAhead ? [aY - 4, aY + 12] : [bY + 12, bY - 4]) : [aY + 4, bY + 4];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Ana saves $2,400 a year for 10 years, then stops. Ben waits 10 years, then saves $2,400 a year for 30 years. Both earn 7% a year. After 40 years, who has more?",
        options: ["Ana", "Ben", "About equal"],
        answer: 0,
      }}
      exploreHint="Slide how long Ben waits up to 10 years. Who ends ahead?"
      reveal={() => (
        <>
          <p>
            After 40 years Ana has about <strong>$252,000</strong> from $24,000 of her own money. Ben, waiting 10 years,
            has about <strong>$227,000</strong> from $72,000. Ben falls behind once he waits 9 years, even though he still
            puts in three times as much.
          </p>
          <p>
            Ana's money had 30 extra years to compound. At 7% that multiplies each dollar about 7.6 times. Ben's later
            deposits never get that time, so in this model when you start can outweigh how much you add.
          </p>
          <p className="muted">A model: a fixed 7%, no fees, taxes or inflation. Not a forecast of returns, and not advice.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const set = (v: number) => {
          const w = Math.max(0, Math.min(20, Math.round(v)));
          setWait(w);
          if (w >= 9) interact(); // the reveal is earned once Ben has fallen behind
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 210" className="stage-svg" role="img" aria-label="Ana's and Ben's savings over 40 years">
              {[100000, 200000, 300000, 400000, 500000].map((v) => (
                <g key={v}>
                  <line x1={L} y1={py(v)} x2={R} y2={py(v)} stroke="var(--line)" strokeDasharray="2 4" />
                  <text x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                    {k(v)}
                  </text>
                </g>
              ))}
              <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
              {[0, 10, 20, 30, 40].map((t) => (
                <text key={t} x={px(t)} y={BOT + 18} textAnchor={t === 0 ? "start" : "middle"} className={s.axis}>
                  {t === 40 ? "40 yrs" : t}
                </text>
              ))}
              {!locked && (
                <>
                  <line x1={px(ANA_YEARS)} y1={py(ana(ANA_YEARS)) - 6} x2={px(ANA_YEARS)} y2={py(ana(ANA_YEARS)) - 20} stroke="var(--domain)" />
                  <text x={px(ANA_YEARS)} y={py(ana(ANA_YEARS)) - 24} textAnchor="middle" className={s.axis}>
                    Ana stops
                  </text>
                  {wait > 0 && (
                    <text x={px(wait)} y={BOT + 32} textAnchor="middle" className={s.axis} fill="var(--warn)">
                      Ben starts
                    </text>
                  )}
                  {wait > 0 && <line x1={px(wait)} y1={BOT} x2={px(wait)} y2={BOT + 6} stroke="var(--warn)" strokeWidth={3} />}
                  <polyline points={line(ana)} className={s.ana} />
                  <polyline points={line((t) => ben(t, wait))} className={s.ben} />
                  <text x={R + 2} y={aLab} className={s.value} fill="var(--domain)">
                    Ana
                  </text>
                  <text x={R + 2} y={bLab} className={s.value} fill="var(--warn)">
                    Ben
                  </text>
                </>
              )}
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked ? "Lock in a guess to start." : `${anaAhead ? "Ana" : "Ben"} ahead by ${money(Math.abs(aEnd - bEnd))}.`}
            </p>

            <Row>
              <Readout label="Ana: in → end" value={locked ? "?" : `${k(24000)} → ${k(aEnd)}`} />
              <Readout label="Ben: in → end" value={locked ? "?" : `${k(benIn)} → ${k(bEnd)}`} />
            </Row>
            <Row>
              <Slider label="Ben waits" value={wait} min={0} max={20} disabled={locked} format={(v) => `${v} yrs`} onChange={set} />
              <Control disabled={locked || wait === 10} onClick={() => set(10)}>
                Wait 10 yrs
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
