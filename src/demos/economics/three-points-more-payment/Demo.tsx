"use client";

// Loan rate sensitivity. One bar: the monthly payment on a $300,000, 30-year loan at the chosen yearly
// rate, with the 4% payment as a dashed line. Readouts compare the rise in the rate with the rise in
// the payment.
// Key state: 7% (from 4%): payment $1,995.91, up 39%, while the rate itself is up 75% in ratio.
// Model: fixed rate, fixed 30-year term, level payments, illustrative rates, not a forecast.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LOAN = 300000;
const N = 360;
const BASE = 4;
const Q_RATE = 7;
const MILESTONES = ["seven-percent"] as const;

const payment = (ratePct: number) => {
  const r = ratePct / 100 / 12;
  return (LOAN * r) / (1 - (1 + r) ** -N);
};
const PAY_BASE = payment(BASE);
const rise = (rate: number) => payment(rate) / PAY_BASE - 1;
const RISE_Q = rise(Q_RATE);
const RATE_RATIO = Q_RATE / BASE - 1;
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const usd2 = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct = (v: number) => `${v >= 0 ? "+" : ""}${Math.round(v * 100)}%`;

const L = 12;
const W = 296;
const MAX = 2800;

export default function ThreePointsMorePayment({ slug }: { slug: string }) {
  const [rate, setRate] = useState(BASE);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${usd(LOAN)} loan over 30 years. The payment is ${usd(PAY_BASE)} a month at ${BASE}%. At ${Q_RATE}%, by how much does the payment rise?`,
        options: [`about ${Q_RATE - BASE}%`, `about ${Math.round(RISE_Q * 100)}%`, `about ${Math.round(RATE_RATIO * 100)}%`],
        answer: 1,
      }}
      exploreHint={`Move the rate to ${Q_RATE}% and compare the bar with the ${BASE}% line.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {Q_RATE}% the payment was <strong>{usd2(payment(Q_RATE))}</strong>, against {usd2(PAY_BASE)} at {BASE}%:{" "}
            <strong>{Math.round(RISE_Q * 100)}% more</strong>. The rate itself rose by {Math.round(RATE_RATIO * 100)}% as a ratio ({Q_RATE} / {BASE}),
            but the payment rose less than that, and far more than 3%.
          </p>
          <p>
            Interest is charged on every dollar still owed, month after month for decades. In month one it is{" "}
            {usd((LOAN * BASE) / 1200)} at {BASE}% and {usd((LOAN * Q_RATE) / 1200)} at {Q_RATE}%.
          </p>
          <p className="muted">A model: fixed rate, 30-year level payments, illustrative rates, not a forecast.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setRate(v);
              if (v === Q_RATE) reach("seven-percent");
            };
            const p = payment(rate);
            const baseX = L + (PAY_BASE / MAX) * W;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: {usd(LOAN)}, 30 years, fixed rate</p>
                <svg viewBox="0 0 320 110" className="stage-svg" role="img" aria-label={`Payment ${usd2(p)} at ${rate}%`}>
                  <text x={L} y={18} className={s.big}>
                    {usd2(p)} a month
                  </text>
                  <rect x={L} y={28} width={W} height={32} rx={3} className={s.ghostFill} />
                  <rect x={L} y={28} width={(p / MAX) * W} height={32} className={p > PAY_BASE + 0.5 ? s.badFill : s.main} />
                  <line x1={baseX} y1={22} x2={baseX} y2={66} stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="3 3" />
                  <text x={baseX} y={80} textAnchor="middle" className={s.axis}>
                    {BASE}% payment {usd(PAY_BASE)}
                  </text>
                  <text x={L} y={100} className={s.axis}>
                    rate {rate}%
                  </text>
                </svg>
                <Row>
                  <Readout label="Rate" value={`${rate}%`} />
                  <Readout label="Rate up (ratio)" value={locked ? "?" : pct(rate / BASE - 1)} />
                  <Readout label="Payment up" value={locked ? "?" : pct(rise(rate))} />
                </Row>
                <Row>
                  {[Q_RATE, BASE, 10].map((v) => (
                    <Control key={v} className={rate === v ? "active" : ""} disabled={locked || rate === v} onClick={() => set(v)}>
                      Rate {v}%
                    </Control>
                  ))}
                </Row>
                <Slider label="Yearly rate" value={rate} min={1} max={10} step={0.5} format={(v) => `${v}%`} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
