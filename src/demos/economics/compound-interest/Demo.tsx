"use client";

// Compound interest as three stacked layers of one balance: the deposit, plain interest
// on the deposit, and interest earned on earlier interest. The axis is fixed, so the
// first decade looks flat and the last one looks steep: that is the idea.
// Model: fixed 7% a year, compounded yearly, nothing withdrawn, no fees, tax or inflation.
// v2: readouts are all running totals from year 0 (one meaning); the decades are lined up
// in their own row; a dashed straight-line extension is drawn; the model is labelled on the
// stage; decade buttons replace "+10 yrs", and the reveal is gated on reaching 40 years.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DEPOSIT = 1000;
const RATE = 0.07;
const YEARS = 40;
const YMAX = 16000;
const MILESTONES = ["forty-years"] as const;
const DECADES = [10, 20, 30, 40];

const balance = (t: number) => DEPOSIT * (1 + RATE) ** t;
const simple = (t: number) => DEPOSIT * (1 + RATE * t);
const FIRST_DECADE = balance(10) - DEPOSIT; // $967
const straight = (t: number) => DEPOSIT + (FIRST_DECADE / 10) * t; // the first decade's pace, kept forever
const decadeGain = (end: number) => balance(end) - balance(end - 10);

// Plot geometry (viewBox 320 × 200).
const L = 34;
const R = 308;
const TOP = 12;
const BOT = 170;
const px = (t: number) => L + (t / YEARS) * (R - L);
const LOCKED_MAX = 2500; // before the prediction the axis fits only the year-10 balance, so it cannot show the answer
const py = (v: number, m = YMAX) => BOT - (Math.min(v, m) / m) * (BOT - TOP);

const money = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const hundreds = (v: number) => `$${(Math.round(v / 100) * 100).toLocaleString("en-US")}`;

/** Closed area between a lower and an upper curve, from year 0 to year t. */
function band(t: number, lower: (y: number) => number, upper: (y: number) => number, m: number) {
  const ys = Array.from({ length: t + 1 }, (_, i) => i);
  const top = ys.map((y) => `${px(y).toFixed(1)},${py(upper(y), m).toFixed(1)}`);
  const bottom = ys.reverse().map((y) => `${px(y).toFixed(1)},${py(lower(y), m).toFixed(1)}`);
  return `M${top.join(" L")} L${bottom.join(" L")} Z`;
}

export default function CompoundInterest({ slug }: { slug: string }) {
  const [years, setYears] = useState(10);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), MILESTONES);

  const b = balance(years);
  const ioi = b - simple(years);
  const labelX = Math.min(Math.max(px(years), L + 30), R - 30);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "$1,000 earns 7% a year, and the interest stays in. After 10 years the balance is $1,967. After 40 years, about how big is the balance?",
        options: ["About $3,800", "About $4,900", "About $15,000"],
        answer: 2,
      }}
      exploreHint="Go to 40 years. Watch which layer grows, and what each decade adds."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            After 40 years the balance is <strong>{money(balance(40))}</strong>. Years 31 to 40 alone add{" "}
            <strong>{money(decadeGain(40))}</strong>, about {(decadeGain(40) / FIRST_DECADE).toFixed(1)} times the first
            decade&apos;s {money(FIRST_DECADE)}: each decade added about twice the one before.
          </p>
          <p>
            Plain 7% of $1,000 a year gives {money(simple(40))} (the plain-7% readout); keeping the first decade&apos;s pace (dashed line) ends near {hundreds(straight(40))}. The other{" "}
            <strong>{money(balance(40) - simple(40))}</strong> is interest earned on earlier interest, the top layer. The balance roughly doubles every ten years, and doubling is not a straight line.
          </p>
          <p className="muted">A model: a steady 7% with no fees, taxes or inflation. Real returns wobble.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const m = locked ? LOCKED_MAX : YMAX;
        const labelY = Math.max(py(b, m) - 8, TOP + 22);
        const setT = (t: number) => {
          const next = Math.max(0, Math.min(YEARS, t));
          setYears(next);
          if (next === YEARS) reach("forty-years");
        };
        return (
          <div className={s.ci}>
            <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="Balance over 40 years in three layers">
              {!locked && [5000, 10000, 15000].map((v) => (
                <g key={v}>
                  <line x1={L} y1={py(v, m)} x2={R} y2={py(v, m)} stroke="var(--line)" strokeDasharray="2 4" />
                  <text x={L - 4} y={py(v, m) + 4} textAnchor="end" className={s.axis} fill="var(--muted)">
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
              <text x={L + 4} y={TOP + 2} className={s.model} fill="var(--muted)">
                Model: steady 7%, no fees or tax
              </text>

              {years > 0 && (
                <>
                  <path d={band(years, () => 0, () => DEPOSIT, m)} className={s.deposit} />
                  <path d={band(years, () => DEPOSIT, simple, m)} className={s.simple} />
                  <path d={band(years, simple, balance, m)} className={s.compound} />
                  <line
                    x1={px(0)}
                    y1={py(DEPOSIT, m)}
                    x2={px(years)}
                    y2={py(straight(years), m)}
                    stroke="var(--fg)"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                  />
                </>
              )}
              <line x1={px(years)} y1={BOT} x2={px(years)} y2={py(b, m)} stroke="var(--fg)" strokeWidth={1.5} />
              <circle cx={px(years)} cy={py(b, m)} r={4} fill="var(--fg)" />
              {!locked && years === YEARS && (
                <text x={px(YEARS) - 4} y={py(straight(YEARS), m) - 6} textAnchor="end" className={s.axis} fill="var(--fg)">
                  first-decade pace: {hundreds(straight(YEARS))}
                </text>
              )}
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
                <i className={s.swCompound} /> interest on past interest
              </span>
              <span>
                <i className={s.swStraight} /> first decade&apos;s pace
              </span>
            </div>

            <div className={s.decades} aria-label="What each decade added">
              {DECADES.map((end) => (
                <div key={end} className={s.decade}>
                  <span className={s.decadeLabel}>
                    yrs {end - 9}–{end}
                  </span>
                  <span className={s.decadeValue}>{!locked && years >= end ? `+${money(decadeGain(end))}` : "?"}</span>
                </div>
              ))}
            </div>

            <Row>
              <Readout label={`Balance, ${years} yrs`} value={money(b)} />
              <Readout label="Plain 7% only" value={money(simple(years))} />
              <Readout label="Interest on past interest" value={money(ioi)} />
            </Row>
            <Slider label="Years" value={years} min={0} max={YEARS} disabled={locked} onChange={setT} />
            <Row>
              <span className="muted small">Jump to (yrs)</span>
              {DECADES.map((t) => (
                <Control
                  key={t}
                  className={years === t ? "active" : ""}
                  disabled={locked || years === t}
                  onClick={() => setT(t)}
                  aria-label={`Jump to ${t} years`}
                >
                  {t}
                </Control>
              ))}
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
