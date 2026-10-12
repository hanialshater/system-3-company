"use client";

// Rule of 72. One chart: $100 compounding yearly at the chosen rate until it reaches $200.
// The dot is the exact doubling time, ln 2 / ln(1 + r). The triangle on the axis is the
// shortcut 72 ÷ rate. The dashed line is growth without compounding (doubles at 100 ÷ rate).
// The learner slides the rate and sees the shortcut hug the exact answer, drifting at the ends.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const XMAX = 25;

const exact = (r: number) => Math.log(2) / Math.log(1 + r / 100);

// Plot geometry (viewBox 320 × 200): years across, $100..$200 up.
const L = 40;
const R = 306;
const TOP = 16;
const BOT = 166;
const px = (t: number) => L + (Math.min(t, XMAX) / XMAX) * (R - L);
const py = (v: number) => BOT - ((v - 100) / 100) * (BOT - TOP);

export default function RuleOf72({ slug }: { slug: string }) {
  const [rate, setRate] = useState(4);

  const T = exact(rate);
  const est = 72 / rate;
  const simple = 100 / rate;
  const steps = 60;
  const curve = Array.from({ length: steps + 1 }, (_, i) => {
    const t = (T * i) / steps;
    return `${px(t).toFixed(1)},${py(100 * (1 + rate / 100) ** t).toFixed(1)}`;
  }).join(" ");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Money grows 9% a year, compounding. About how long until it doubles?",
        options: ["About 8 years", "About 11 years", "About 16 years"],
        answer: 0,
      }}
      exploreHint="Set the rate to 9%. Compare the dot with the triangle."
      reveal={() => (
        <>
          <p>
            At 9% the money doubles in about <strong>8 years</strong> (exactly 8.04). 72 ÷ 9 = 8: the shortcut lands
            almost on the dot. 100 ÷ 9 = 11 years is the dashed line, growth with no interest on interest.
          </p>
          <p>
            Divide 72 by the yearly rate to estimate the doubling time. You saw it is closest around 6% to 10% and
            drifts at the ends: at 3% it says 24 years (exact 23.4); at 20% it says 3.6 (exact 3.8). Close enough for
            mental arithmetic.
          </p>
          <p className="muted">A shortcut for steady yearly compounding, not a forecast of any return.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const set = (v: number) => {
          const r = Math.max(3, Math.min(20, Math.round(v)));
          setRate(r);
          if (r === 9) interact(); // the reveal is earned at the brief's 9%
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="$100 growing to $200 at the chosen rate">
              {[100, 150, 200].map((v) => (
                <g key={v}>
                  <line x1={L} y1={py(v)} x2={R} y2={py(v)} stroke="var(--line)" strokeDasharray={v === 100 ? undefined : "2 4"} />
                  <text x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                    ${v}
                  </text>
                </g>
              ))}
              {[0, 5, 10, 15, 20, 25].map((t) => (
                <text key={t} x={px(t)} y={BOT + 30} textAnchor={t === 0 ? "start" : t === 25 ? "end" : "middle"} className={s.axis}>
                  {t === 25 ? "25 yrs" : t}
                </text>
              ))}
              {!locked && (
                <>
                  <line x1={px(0)} y1={py(100)} x2={px(simple)} y2={py(simple <= XMAX ? 200 : 100 + rate * XMAX)} className={s.ghost} />
                  {simple <= XMAX && (
                    <text x={Math.min(px(simple) + 4, R - 70)} y={py(200) + (simple <= XMAX - 6 ? 14 : 24)} className={s.axis}>
                      no compounding: {simple.toFixed(1)}
                    </text>
                  )}
                  <polyline points={curve} className={s.net} />
                  <line x1={px(T)} y1={py(200)} x2={px(T)} y2={BOT} stroke="var(--fg)" strokeWidth={1} strokeDasharray="2 3" />
                  <circle cx={px(T)} cy={py(200)} r={5} fill="var(--fg)" />
                  <text x={Math.max(px(T), L + 20)} y={py(200) - 8} textAnchor="middle" className={s.value} fill="var(--fg)">
                    {T.toFixed(1)} yrs
                  </text>
                  <path d={`M${px(est)},${BOT + 2} l-6,12 h12 Z`} fill="var(--domain)" />
                </>
              )}
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked ? "Lock in a guess to start." : `Dot: exact. Triangle: 72 ÷ ${rate} = ${est.toFixed(1)} yrs.`}
            </p>

            <Row>
              <Readout label="Exact" value={locked ? "?" : `${T.toFixed(2)} yrs`} />
              <Readout label="72 ÷ rate" value={locked ? "?" : `${est.toFixed(2)} yrs`} />
              <Readout label="Off by" value={locked ? "?" : `${Math.abs(est - T).toFixed(2)} yrs`} />
            </Row>
            <Row>
              <Slider label="Yearly rate" value={rate} min={3} max={20} disabled={locked} format={(v) => `${v}%`} onChange={set} />
              <Control disabled={locked || rate === 9} onClick={() => set(9)}>
                9%
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
