"use client";

// Amortisation. One figure: this month's $1,199.10 payment split into interest and the part that
// repays the loan, above the $200,000 loan bar with the part paid off so far. A dashed marker shows
// where an even pace (1/360 of the loan a month) would be.
// Key state: 60 payments made (5 years): $13,891 paid off, $186,109 still owed.
// Model: fixed 6% a year (0.5% a month), 360 level payments, no fees.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LOAN = 200000;
const RATE = 0.005; // per month
const N = 360;
const Q_K = 60; // the question's 5 years
const MILESTONES = ["five-years"] as const;

const PAYMENT = (LOAN * RATE) / (1 - (1 + RATE) ** -N); // 1,199.10

/** Balance after k payments, stepping the same rule the stage draws. */
const balanceAfter = (k: number) => {
  let b = LOAN;
  for (let m = 0; m < k; m++) b = b * (1 + RATE) - PAYMENT;
  return Math.max(0, b);
};
/** Payment m (1-based): interest on the balance before it, and the rest. */
const split = (m: number) => {
  const interest = balanceAfter(m - 1) * RATE;
  return { interest, toLoan: PAYMENT - interest };
};

const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const usd2 = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const BAL60 = balanceAfter(Q_K);
const PAID60 = LOAN - BAL60;
const EVEN60 = (LOAN * Q_K) / N;
const S1 = split(1);
const S60 = split(Q_K);
// First payment where the loan part is bigger than the interest part (223).
const CROSS = (() => {
  for (let m = 1; m <= N; m++) if (split(m).toLoan > split(m).interest) return m;
  return N;
})();

// Geometry (viewBox 320 × 150).
const L = 12;
const R = 308;
const W = R - L;

export default function FirstPaymentMostlyInterest({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [maxK, setMaxK] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${usd(LOAN)} loan at 6% over 30 years has a payment of ${usd2(PAYMENT)}. After 5 years of payments, how much of the ${usd(LOAN)} have you paid off?`,
        options: [
          `about ${usd(Math.round(EVEN60 / 1000) * 1000)}`,
          `about ${usd(Math.round(PAID60 / 1000) * 1000)}`,
          `about ${usd(Math.round((PAYMENT * Q_K) / 1000) * 1000)}`,
        ],
        answer: 1,
      }}
      exploreHint="Make 5 years of payments and watch the loan bar."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            After {Q_K} payments you had paid in <strong>{usd(PAYMENT * Q_K)}</strong> but paid off only{" "}
            <strong>{usd(PAID60)}</strong>: {usd(BAL60)} was still owed. An even pace would have paid off {usd(EVEN60)}.
          </p>
          <p>
            Each month&apos;s interest is 0.5% of what is still owed. Payment 1 was {usd(S1.interest)} of interest and only{" "}
            {usd(S1.toLoan)} toward the loan; payment {Q_K} was still {usd(S60.interest)} of interest. Interest is charged on a
            big balance first, so early payments barely shrink it.
            {maxK >= CROSS && ` You saw the split tip at payment ${CROSS}, more than 18 years in.`}
          </p>
          <p className="muted">A model: a fixed, illustrative 6%, level payments, no fees. Not advice.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (next: number) => {
              const v = Math.max(0, Math.min(N, next));
              setK(v);
              setMaxK((m) => Math.max(m, v));
              if (v === Q_K) reach("five-years");
            };
            const m = Math.max(k, 1);
            const sp = split(m);
            const bal = balanceAfter(k);
            const paidOff = LOAN - bal;
            const iw = (sp.interest / PAYMENT) * W;
            const evenX = L + (k / N) * W;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: fixed 6%, 30 years, no fees</p>
                <svg
                  viewBox="0 0 320 150"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Payment and loan bars" : `Payment ${m}: ${usd(sp.interest)} interest. ${usd(paidOff)} paid off.`}
                >
                  <text x={L} y={16} className={s.value}>
                    Payment {m}: {usd2(PAYMENT)}
                  </text>
                  {locked ? (
                    <rect x={L} y={24} width={W} height={20} rx={3} className={s.ghostFill} />
                  ) : (
                    <>
                      <rect x={L} y={24} width={iw} height={20} className={s.badFill} />
                      <rect x={L + iw} y={24} width={W - iw} height={20} className={s.main} />
                      <text x={L} y={58} className={s.axis}>
                        interest {usd(sp.interest)}
                      </text>
                      <text x={R} y={58} textAnchor="end" className={s.axis}>
                        to loan {usd(sp.toLoan)}
                      </text>
                    </>
                  )}

                  <text x={L} y={84} className={s.value}>
                    Loan {usd(LOAN)}
                  </text>
                  <rect x={L} y={92} width={W} height={26} rx={3} className={s.ghostFill} />
                  {!locked && paidOff > 0 && (
                    <rect x={L} y={92} width={(paidOff / LOAN) * W} height={26} className={s.goodFill} />
                  )}
                  {!locked && k > 0 && (
                    <>
                      <line x1={evenX} y1={88} x2={evenX} y2={122} stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="3 3" />
                      <text x={Math.min(evenX, R - 40)} y={136} textAnchor="middle" className={s.axis}>
                        even pace
                      </text>
                    </>
                  )}
                </svg>

                <Row>
                  <Readout label="Payments" value={`${k} (${(k / 12).toFixed(k % 12 ? 1 : 0)} yr)`} />
                  <Readout label="Paid in" value={locked ? "?" : usd(PAYMENT * k)} />
                  <Readout label="Paid off" value={locked ? "?" : usd(paidOff)} />
                </Row>
                <Row>
                  <Control disabled={locked || k === 0} onClick={() => go(0)} aria-label="Start over">
                    Back to 0
                  </Control>
                  <Control disabled={locked || k >= N} onClick={() => go((Math.floor(k / 60) + 1) * 60)} aria-label="Next 5 years">
                    +5 yr
                  </Control>
                  <Control disabled={locked || k >= N} onClick={() => go((Math.floor(k / 12) + 1) * 12)} aria-label="Next year">
                    +1 yr
                  </Control>
                  <Control disabled={locked || k >= N} onClick={() => go(k + 1)} aria-label="One more payment">
                    +1 month
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
