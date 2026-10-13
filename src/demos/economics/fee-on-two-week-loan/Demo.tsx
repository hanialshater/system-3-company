"use client";

// Short-loan annualised rate. One bar: a 364-day year cut into loans of the chosen length, each
// stamped with the same $15 fee per $100. The count of stamps and their total are the yearly rate.
// Key state: 14-day loans: 26 fees of $15 = $390 per $100 a year (390%).
// Model: simple annualisation (no compounding), fee only, no rollover, a 364-day year.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FEE = 15; // dollars per $100 lent, per loan
const YEAR = 364; // 26 two-week periods
const Q_DAYS = 14;
const MILESTONES = ["two-weeks"] as const;

const periods = (days: number) => YEAR / days;
const yearly = (days: number) => FEE * periods(days); // dollars per $100 per year = percent
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : (Math.round(v * 10) / 10).toString());
const pct = (v: number) => `${Math.round(v).toLocaleString("en-US")}%`;

const L = 12;
const W = 296;

export default function FeeOnTwoWeekLoan({ slug }: { slug: string }) {
  const [days, setDays] = useState(28);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A lender charges $${FEE} to lend $100 for two weeks. Counting ${periods(Q_DAYS)} two-week periods in a year, what is the simple yearly rate?`,
        options: [`${FEE}%`, pct(yearly(Q_DAYS)), "100%"],
        answer: 1,
      }}
      exploreHint="Set the loan to 2 weeks and count the fees in a year."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            A two-week loan repeats <strong>{periods(Q_DAYS)}</strong> times in a year. Each time the $15 fee is charged again:{" "}
            <strong>${yearly(Q_DAYS)}</strong> on every $100, a simple yearly rate of <strong>{pct(yearly(Q_DAYS))}</strong>. The{" "}
            {FEE}% is the rate for two weeks only.
          </p>
          <p>The fee did not change as you moved the length; the number of times it repeats did. Compare rates over the same time.</p>
          <p className="muted">A model: simple annualising, fee only, no rollover, no view on any lender.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (d: number) => {
              setDays(d);
              if (d === Q_DAYS) reach("two-weeks");
            };
            const n = periods(days);
            const whole = Math.floor(n);
            const bw = (days / YEAR) * W;
            const stamps = Array.from({ length: Math.ceil(n) }, (_, i) => i);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: simple yearly rate, fee only</p>
                <svg viewBox="0 0 320 120" className="stage-svg" role="img" aria-label={locked ? "A year bar" : `${fmt(n)} loans in a year`}>
                  <text x={L} y={16} className={s.value}>
                    One year, loans of {days} days, ${FEE} fee per $100
                  </text>
                  <rect x={L} y={26} width={W} height={34} rx={3} className={s.ghostFill} />
                  {!locked &&
                    stamps.map((i) => {
                      const w = Math.min(bw, W - i * bw);
                      return <rect key={i} x={L + i * bw + 0.5} y={26} width={Math.max(w - 1, 0.5)} height={34} className={s.badFill} />;
                    })}
                  {!locked && (
                    <text x={L} y={86} className={s.big}>
                      {fmt(n)} loans x ${FEE} = ${fmt(yearly(days))}
                    </text>
                  )}
                  {!locked && (
                    <text x={L} y={106} className={s.axis}>
                      per $100 lent, in a year ({whole < n ? "last loan part-way" : "whole loans"})
                    </text>
                  )}
                </svg>
                <Row>
                  <Readout label="Loan length" value={`${days} days`} />
                  <Readout label="Yearly rate" value={locked ? "?" : pct(yearly(days))} />
                </Row>
                <Row>
                  {[7, 14, 28, 91].map((d) => (
                    <Control key={d} className={days === d ? "active" : ""} disabled={locked || days === d} onClick={() => set(d)}>
                      {d} days
                    </Control>
                  ))}
                </Row>
                <Slider label="Loan length" value={days} min={7} max={91} step={7} format={(v) => `${v} days`} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
