"use client";

// Inflation as a shrinking basket. 100 squares = what $100 buys today. Drag the years and
// the squares empty: each one is $1 of today's goods your cash can no longer buy. The
// "lost this year" readout shrinks over time because each year's 3% applies to a smaller
// value: that is compounding, not a straight line.
// Model: a constant inflation rate (2%, 3% or 5%), illustrative, not a forecast.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const CASH = 100;
const MAXY = 40;
const RATES = [2, 3, 5];

const worth = (t: number, rate: number) => CASH / (1 + rate / 100) ** t;

// Grid geometry (viewBox 320 × 230): 10 × 10 squares.
const CELL = 20;
const GAP = 3;
const X0 = (320 - (10 * CELL + 9 * GAP)) / 2;
const Y0 = 6;

export default function InflationHalvesCash({ slug }: { slug: string }) {
  const [years, setYears] = useState(0);
  const [rate, setRate] = useState(3);

  const v = worth(years, rate);
  const lostThisYear = years > 0 ? worth(years - 1, rate) - v : 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Prices rise 3% every year. About how much will $100 of cash buy, in today's money, after 24 years?",
        options: ["About $28", "About $49", "About $72"],
        answer: 1,
      }}
      exploreHint="Drag the years to 24 at 3%. Watch how much each year takes."
      reveal={() => (
        <>
          <p>
            After 24 years at 3%, $100 buys what <strong>$49</strong> buys today: about half. Not $28: that would mean
            losing $3 every year, but you saw the yearly loss shrink, from about $2.91 in year one to about $1.48 in year 24.
          </p>
          <p>
            Each year's 3% is taken from a value that is already smaller. Inflation compounds like interest, in
            reverse, so a modest rate roughly halves what cash buys in a generation. A rough shortcut: 72 ÷ 3 = 24
            years to halve.
          </p>
          <p className="muted">A model: a constant rate, which real inflation is not. Illustrative, not a forecast.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (t: number, r: number) => {
          const y = Math.max(0, Math.min(MAXY, Math.round(t)));
          setYears(y);
          setRate(r);
          if (r === 3 && y >= 24) interact(); // the reveal is earned at the brief's 24 years, 3%
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 236" className="stage-svg" role="img" aria-label={`$100 of cash buys ${v.toFixed(0)} of 100 squares of today's goods`}>
              {Array.from({ length: 100 }, (_, i) => {
                const x = X0 + (i % 10) * (CELL + GAP);
                const y = Y0 + Math.floor(i / 10) * (CELL + GAP);
                const fill = Math.max(0, Math.min(1, v - i));
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={CELL} height={CELL} rx={3} className={s.empty} />
                    {fill > 0 && <rect x={x} y={y} width={CELL * fill} height={CELL} rx={3} className={s.full} />}
                  </g>
                );
              })}
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked ? "Lock in a guess to start." : "Each square is $1 of today's goods."}
            </p>

            <Row>
              <Readout label={`$100 buys, year ${years}`} value={locked ? "?" : `$${v.toFixed(2)}`} />
              <Readout label="Lost this year" value={locked ? "?" : years === 0 ? "–" : `$${lostThisYear.toFixed(2)}`} />
            </Row>
            <Row>
              <Slider label="Years" value={years} min={0} max={MAXY} disabled={locked} format={(y) => `${y} yrs`} onChange={(y) => go(y, rate)} />
              <Control disabled={locked || years === 24} onClick={() => go(24, rate)}>
                24 yrs
              </Control>
            </Row>
            <Row>
              <span className={s.rateLabel}>Prices rise</span>
              {RATES.map((r) => (
                <Control
                  key={r}
                  className={r === rate ? `active ${s.rateOn}` : ""}
                  disabled={locked || r === rate}
                  onClick={() => go(years, r)}
                  aria-label={`Prices rise ${r}% a year`}
                >
                  {r}%
                </Control>
              ))}
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
