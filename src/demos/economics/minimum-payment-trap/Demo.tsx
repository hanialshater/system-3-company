"use client";

// Minimum-payment trap. One chart: a $3,000 card balance month by month at 20% a year
// (1.667% a month), with a fixed monthly payment. The dashed line is the no-interest
// guess (balance ÷ payment). Interest is charged first, so only the part of the payment
// above it shrinks the debt: at $50 nothing moves, at $90 it takes 50 months, not 33.
// Model: fixed APR, interest added monthly on the remaining balance, no fees, no new purchases.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const START = 3000;
const RATE = 0.2 / 12;
const MAXM = 60;

/** Balance after each month (index 0 = start), stopping when paid off or at MAXM. */
function schedule(pay: number) {
  const bal = [START];
  let b = START;
  let interest = 0;
  let m = 0;
  while (b > 0.005 && m < MAXM) {
    const i = b * RATE;
    interest += i;
    b = Math.max(0, b + i - pay);
    m++;
    bal.push(b);
  }
  return { bal, months: b <= 0.005 ? m : null, interest };
}

// Plot geometry (viewBox 320 × 200).
const L = 40;
const R = 306;
const TOP = 14;
const BOT = 172;
const px = (m: number) => L + (Math.min(m, MAXM) / MAXM) * (R - L);
const py = (v: number) => BOT - (v / START) * (BOT - TOP);

const money = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

export default function MinimumPaymentTrap({ slug }: { slug: string }) {
  const [pay, setPay] = useState(150);

  const { bal, months, interest } = schedule(pay);
  const naive = START / pay;
  const area = `M${px(0)},${BOT} ${bal.map((b, m) => `L${px(m).toFixed(1)},${py(b).toFixed(1)}`).join(" ")} L${px(bal.length - 1).toFixed(1)},${BOT} Z`;
  const firstInterest = START * RATE;
  const firstPrincipal = Math.max(0, pay - firstInterest);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A $3,000 card balance charges 20% a year (1.667% a month). You pay $90 every month and buy nothing new. How long until it is paid off?",
        options: ["About 33 months", "About 50 months", "Never"],
        answer: 1,
      }}
      exploreHint="Set the payment to $90. Then try $50."
      reveal={() => (
        <>
          <p>
            At $90 a month the card is paid off on the <strong>50th</strong> payment, not the 33rd. You pay about{" "}
            <strong>$1,415</strong> in interest on top of the $3,000.
          </p>
          <p>
            Interest is charged first. In month one it is $50, so only $40 of your $90 shrinks the debt. As the balance
            falls, interest falls and more of each payment counts, which is why the curve bends. At $50 a month the
            payment only covers the interest and the balance never moves.
          </p>
          <p className="muted">A model: a fixed 20% rate, no fees, nothing new bought. Real cards calculate interest in different ways.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const set = (v: number) => {
          const p = Math.max(50, Math.min(300, Math.round(v / 10) * 10));
          setPay(p);
          if (p === 90) interact(); // the reveal is earned at the brief's $90
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="Card balance month by month">
              {[1000, 2000, 3000].map((v) => (
                <g key={v}>
                  <line x1={L} y1={py(v)} x2={R} y2={py(v)} stroke="var(--line)" strokeDasharray="2 4" />
                  <text x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                    ${v / 1000}k
                  </text>
                </g>
              ))}
              <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
              {[0, 12, 24, 36, 48, 60].map((m) => (
                <text key={m} x={px(m)} y={BOT + 14} textAnchor={m === 0 ? "start" : m === 60 ? "end" : "middle"} className={s.axis}>
                  {m === 60 ? "60 mo" : m}
                </text>
              ))}

              {!locked && (
                <>
                  <path d={area} className={s.debt} />
                  <line x1={px(0)} y1={py(START)} x2={px(naive)} y2={BOT} className={s.ghost} />
                  {naive <= MAXM && (
                    <text x={px(naive / 2) + 8} y={py(START / 2) - 4} className={s.value} fill="var(--muted)">
                      no interest: {Math.round(naive)} mo
                    </text>
                  )}
                  {months !== null ? (
                    <circle cx={px(months)} cy={BOT} r={5} fill="var(--good)" />
                  ) : (
                    <text x={R - 4} y={py(bal[bal.length - 1]) - 8} textAnchor="end" className={s.value} fill="var(--bad)">
                      still owed after 5 years
                    </text>
                  )}
                </>
              )}
              {locked && <rect x={px(0)} y={py(START)} width={6} height={BOT - py(START)} className={s.debt} />}
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked
                ? "Lock in a guess to start."
                : `Month 1: $${firstInterest.toFixed(0)} interest, $${firstPrincipal.toFixed(0)} off the debt.`}
            </p>

            <Row>
              <Readout label="Paid off in" value={locked ? "?" : months === null ? <span className={s.bad}>never</span> : `${months} months`} />
              <Readout label="Interest paid" value={locked ? "?" : months === null ? "$50 a month, forever" : money(interest)} />
            </Row>
            <Row>
              <Slider label="Monthly payment" value={pay} min={50} max={300} step={10} disabled={locked} format={(v) => `$${v}`} onChange={set} />
              <Control disabled={locked || pay === 90} onClick={() => set(90)}>
                $90
              </Control>
              <Control disabled={locked || pay === 50} onClick={() => set(50)}>
                $50
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
