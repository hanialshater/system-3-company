"use client";

// Compound interest as three stacked layers of one balance: the deposit, plain interest
// on the deposit, and interest earned on earlier interest. The axis is fixed, so the
// first decade looks flat and the last one looks steep: that is the idea.
// Model: fixed 7% a year, compounded yearly, nothing withdrawn, no fees, tax or inflation.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const DEPOSIT = 1000;
const RATE = 0.07;
const YEARS = 40;
const YMAX = 16000;

const balance = (t: number) => DEPOSIT * (1 + RATE) ** t;
const simple = (t: number) => DEPOSIT * (1 + RATE * t);

// Plot geometry (viewBox 320 × 200).
const L = 34;
const R = 308;
const TOP = 12;
const BOT = 170;
const px = (t: number) => L + (t / YEARS) * (R - L);
const py = (v: number) => BOT - (Math.min(v, YMAX) / YMAX) * (BOT - TOP);

const money = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

/** Closed area between a lower and an upper curve, from year 0 to year t. */
function band(t: number, lower: (y: number) => number, upper: (y: number) => number) {
  const ys = Array.from({ length: t + 1 }, (_, i) => i);
  const top = ys.map((y) => `${px(y).toFixed(1)},${py(upper(y)).toFixed(1)}`);
  const bottom = ys.reverse().map((y) => `${px(y).toFixed(1)},${py(lower(y)).toFixed(1)}`);
  return `M${top.join(" L")} L${bottom.join(" L")} Z`;
}

export default function CompoundInterest({ slug }: { slug: string }) {
  const [years, setYears] = useState(10);

  const b = balance(years);
  const ioi = b - simple(years);
  const decadeStart = Math.max(0, years - 10);
  const lastTen = b - balance(decadeStart);
  const labelX = Math.min(Math.max(px(years), L + 30), R - 30);
  const labelY = Math.max(py(b) - 8, TOP + 10);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "$1,000 earns 7% a year, and the interest stays in. After 10 years: $1,967. After 40 years, about how much?",
        options: ["About $3,800", "About $4,900", "About $15,000"],
        answer: 2,
      }}
      exploreHint="Drag the years to 40. Watch which layer grows."
      reveal={() => (
        <>
          <p>
            After 40 years the balance is <strong>$14,974</strong>. Years 31 to 40 alone add <strong>$7,362</strong>,
            about 7.6 times what the first ten years earned.
          </p>
          <p>
            A straight line ($967 per decade) would give about $4,900. Plain 7% of $1,000 a year gives $3,800. The rest,
            about <strong>$11,174</strong>, is interest earned on earlier interest: the top layer. At 7% the balance
            roughly doubles every ten years, and doubling is not a straight line.
          </p>
          <p className="muted">A model: a steady 7% with no fees, taxes or inflation. Real returns wobble.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const setT = (t: number) => {
          setYears(Math.max(0, Math.min(YEARS, t)));
          interact();
        };
        return (
          <div className={s.ci}>
            <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="Balance over 40 years in three layers">
              {[5000, 10000].map((v) => (
                <g key={v}>
                  <line x1={L} y1={py(v)} x2={R} y2={py(v)} stroke="var(--line)" strokeDasharray="2 4" />
                  <text x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis} fill="var(--muted)">
                    ${v / 1000}k
                  </text>
                </g>
              ))}
              <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
              {[0, 10, 20, 30, 40].map((t) => (
                <text
                  key={t}
                  x={px(t)}
                  y={BOT + 14}
                  textAnchor={t === 0 ? "start" : t === 40 ? "end" : "middle"}
                  className={s.axis}
                  fill="var(--muted)"
                >
                  {t === 40 ? "40 yrs" : t}
                </text>
              ))}

              {years > 0 && (
                <>
                  <path d={band(years, () => 0, () => DEPOSIT)} className={s.deposit} />
                  <path d={band(years, () => DEPOSIT, simple)} className={s.simple} />
                  <path d={band(years, simple, balance)} className={s.compound} />
                </>
              )}
              <line x1={px(years)} y1={BOT} x2={px(years)} y2={py(b)} stroke="var(--fg)" strokeWidth={1.5} />
              <circle cx={px(years)} cy={py(b)} r={4} fill="var(--fg)" />
              <text x={labelX} y={labelY} textAnchor="middle" className={s.value} fill="var(--fg)">
                {money(b)}
              </text>
            </svg>

            <div className={s.legend} aria-hidden="true">
              <span>
                <i className={s.swDeposit} /> your $1,000
              </span>
              <span>
                <i className={s.swSimple} /> 7% of $1,000
              </span>
              <span>
                <i className={s.swCompound} /> interest on interest
              </span>
            </div>

            <Row>
              <Readout label={years >= 10 ? `Years ${decadeStart + 1}–${years} added` : "Added so far"} value={money(lastTen)} />
              <Readout label="Interest on interest" value={money(ioi)} />
            </Row>
            <Row>
              <Slider label="Years" value={years} min={0} max={YEARS} disabled={locked} onChange={setT} />
              <Control disabled={locked || years >= YEARS} onClick={() => setT(years + 10)} aria-label="Add ten years">
                +10 yrs
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
