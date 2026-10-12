"use client";

// Loan term vs total cost. One horizontal bar: the $20,000 borrowed plus all the interest
// paid over the term. The monthly payment is printed above it. The dashed outline marks the
// 5-year total, so stretching the term shows the extra interest growing as the payment falls.
// Model: fixed 6% a year (0.5% a month), level monthly payments, no fees. Rate illustrative.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const P = 20000;
const R_M = 0.06 / 12;
const BASE_YEARS = 5;
const XMAX = 26000;

const payment = (years: number) => (P * R_M) / (1 - (1 + R_M) ** -(years * 12));
const totalPaid = (years: number) => payment(years) * years * 12;

// Bar geometry (viewBox 320 × 150).
const L = 14;
const R = 306;
const BAR_Y = 62;
const BAR_H = 42;
const px = (v: number) => L + (v / XMAX) * (R - L);

const money = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

export default function LongerLoanCost({ slug }: { slug: string }) {
  const [years, setYears] = useState(BASE_YEARS);

  const pay = payment(years);
  const total = totalPaid(years);
  const interest = total - P;
  const baseTotal = totalPaid(BASE_YEARS);
  const extra = total - baseTotal;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A $20,000 loan at 6% a year. Stretching it from 5 years to 7 cuts the payment by about $95 a month. How much more interest do you pay overall?",
        options: ["About $200", "About $1,300", "About $5,000"],
        answer: 1,
      }}
      exploreHint="Stretch the loan from 5 years to 7. Watch the interest block."
      reveal={() => (
        <>
          <p>
            Over 5 years you pay $386.66 a month, <strong>$3,199</strong> in interest. Over 7 years the payment drops to
            $292.17, but interest grows to <strong>$4,542</strong>: about <strong>$1,343 more</strong>.
          </p>
          <p>
            Interest is the price of time. A longer loan pays the $20,000 back more slowly, so more of it stays owed
            each month and keeps being charged 0.5%. A smaller payment mostly buys you more months of interest.
          </p>
          <p className="muted">A model: a fixed, illustrative 6% rate, level payments, no fees. Not a current market rate.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const set = (v: number) => {
          const y = Math.max(2, Math.min(8, Math.round(v)));
          setYears(y);
          if (y === 7) interact(); // the reveal is earned at the brief's 7-year term
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label="Total paid on the loan: amount borrowed plus interest">
              <text x={160} y={24} textAnchor="middle" className={s.big} fill="var(--fg)">
                {locked ? "Lock in a guess" : `$${pay.toFixed(2)} a month`}
              </text>
              <text x={160} y={42} textAnchor="middle" className={s.axis}>
                {locked ? "" : `for ${years * 12} months (5 years: $${payment(BASE_YEARS).toFixed(2)})`}
              </text>

              <rect x={px(0)} y={BAR_Y} width={px(P) - px(0)} height={BAR_H} rx={4} className={s.principal} />
              <text x={px(P / 2)} y={BAR_Y + BAR_H / 2 + 4} textAnchor="middle" className={s.value} fill="var(--fg)">
                $20,000 borrowed
              </text>
              {!locked && (
                <>
                  <rect x={px(P)} y={BAR_Y} width={px(total) - px(P)} height={BAR_H} className={s.interest} />
                  {extra > 0 && (
                    <rect x={px(baseTotal)} y={BAR_Y} width={px(total) - px(baseTotal)} height={BAR_H} className={s.extra} />
                  )}
                  <rect x={px(0)} y={BAR_Y - 5} width={px(baseTotal) - px(0)} height={BAR_H + 10} rx={5} className={s.outline} />
                  <text x={px(baseTotal)} y={BAR_Y - 9} textAnchor="end" className={s.axis}>
                    5-year total
                  </text>
                  <text x={Math.min(px(total), R)} y={BAR_Y + BAR_H + 20} textAnchor="end" className={s.value} fill="var(--bad)">
                    interest {money(interest)}
                  </text>
                </>
              )}
              <line x1={L} y1={BAR_Y + BAR_H + 30} x2={R} y2={BAR_Y + BAR_H + 30} stroke="var(--line)" />
              {[0, 10000, 20000].map((v) => (
                <text key={v} x={px(v)} y={BAR_Y + BAR_H + 43} textAnchor={v === 0 ? "start" : "middle"} className={s.axis}>
                  {v === 0 ? "$0" : `$${v / 1000}k`}
                </text>
              ))}
            </svg>

            <Row>
              <Readout label="Total interest" value={locked ? "?" : money(interest)} />
              <Readout label="vs 5 years" value={locked ? "?" : `${extra >= 0 ? "+" : "−"}${money(Math.abs(extra))}`} />
            </Row>
            <Slider label="Loan length" value={years} min={2} max={8} disabled={locked} format={(v) => `${v} years`} onChange={set} />
          </div>
        );
      }}
    </Lesson>
  );
}
