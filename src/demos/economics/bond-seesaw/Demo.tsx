"use client";

// Bond price and market rate. A bond pays $50 a year for 10 years, then $1,000 back.
// Price today = sum over years of payment / (1 + r)^t. At r = 5% the price is exactly $1,000.
// Key states (milestones): rate 6% (the question: about $926) and 4% (price above $1,000: about $1,081).
// Model: annual payments, no default, one constant rate. Not investment advice.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const COUPON = 50;
const FACE = 1000;
const YEARS = 10;
const Q_RATE = 6;
const LOW_RATE = 4;
const MILESTONES = ["six", "four"] as const;

const price = (r: number) => {
  let p = 0;
  for (let t = 1; t <= YEARS; t++) p += COUPON / (1 + r / 100) ** t;
  return p + FACE / (1 + r / 100) ** YEARS;
};
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const usd2 = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const slices = (r: number) => {
  const out: { from: number; to: number; face: boolean }[] = [];
  let acc = 0;
  for (let t = 1; t <= YEARS; t++) {
    const v = COUPON / (1 + r / 100) ** t;
    out.push({ from: acc, to: acc + v, face: false });
    acc += v;
  }
  out.push({ from: acc, to: acc + FACE / (1 + r / 100) ** YEARS, face: true });
  return out;
};

const PMIN = 0;
const PMAX = 1300;
const L = 12;
const W = 296;
const x = (p: number) => L + ((p - PMIN) / (PMAX - PMIN)) * W;

export default function BondSeesaw({ slug }: { slug: string }) {
  const [rate, setRate] = useState(5);
  const [moved, setMoved] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You hold a $${FACE.toLocaleString("en-US")} bond that pays $${COUPON} a year (5%) for ${YEARS} years, then $${FACE.toLocaleString("en-US")} back. New $${FACE.toLocaleString("en-US")} bonds now pay ${Q_RATE}%, $${Q_RATE * 10} a year. If you sell yours today, what is it worth?`,
        options: [`$${FACE.toLocaleString("en-US")}`, `about ${usd(price(Q_RATE))}`, "about $1,060"],
        answer: 1,
      }}
      exploreHint="Set the market rate to 6%, then to 4%, and watch the price bar."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {Q_RATE}% new bonds pay ${Q_RATE * 10} a year and yours pays ${COUPON}, so no one pays $
            {FACE.toLocaleString("en-US")} for it. Each slice of the bar is one payment, worth less for the wait; together about <strong>{usd(price(Q_RATE))}</strong>. At {LOW_RATE}% new bonds pay only ${LOW_RATE * 10}, and yours was worth about <strong>{usd(price(LOW_RATE))}</strong>.
          </p>
          <p>
            A fixed payment is worth what it would cost today to buy the same stream at the going rate, so prices and rates move opposite ways. Only at 5%, the bond's own rate, is it worth $1,000. A model, not advice.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setRate(v);
              setMoved(true);
              if (v === Q_RATE) reach("six");
              if (v === LOW_RATE) reach("four");
            };
            const p = price(rate);
            const show = !locked && moved;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: yearly payments, no default, one steady rate</p>
                <svg viewBox="0 0 320 110" className="stage-svg" role="img" aria-label={show ? `Rate ${rate}%, price ${usd(p)}` : "Price bar"}>
                  <rect x={L} y={34} width={W} height={30} rx={3} className={s.ghostFill} />
                  {show &&
                    slices(rate).map((sl, i) => (
                      <rect key={i} x={x(sl.from)} y={34} width={Math.max(0, x(sl.to) - x(sl.from))} height={30} className={sl.face ? (p >= FACE ? s.goodFill : s.badFill) : i % 2 ? s.goodFill : s.badFill} opacity={sl.face ? 1 : 0.55} stroke="var(--bg-2)" strokeWidth={1} />
                    ))}
                  <line x1={x(FACE)} x2={x(FACE)} y1={26} y2={72} stroke="var(--fg)" strokeWidth={2} />
                  <text x={x(FACE)} y={20} textAnchor="middle" className={s.axis}>
                    $1,000
                  </text>
                  <text x={L} y={90} className={s.small}>
                    $0
                  </text>
                  <text x={L + W} y={90} textAnchor="end" className={s.small}>
                    $1,300
                  </text>
                  {show && (
                    <text x={L} y={20} className={s.big}>
                      {usd2(p)}
                    </text>
                  )}
                </svg>
                <p className={s.msg}>
                  {show ? `New bonds pay $${rate * 10} a year; yours pays $${COUPON}. A $${COUPON} payment in year ${YEARS} is worth ${usd2(COUPON / (1 + rate / 100) ** YEARS)} today.` : "Slices of the bar: each payment, worth less for the wait."}
                </p>
                <Row>
                  <Readout label="Market rate" value={`${rate}%`} />
                  <Readout label="Price today" value={show ? usd(p) : "?"} />
                </Row>
                <Row>
                  {[Q_RATE, LOW_RATE].map((v) => (
                    <Control key={v} className={rate === v ? "active" : ""} disabled={locked || (moved && rate === v)} onClick={() => set(v)}>
                      Rate {v}%
                    </Control>
                  ))}
                </Row>
                <Slider label="Market rate" value={rate} min={2} max={10} step={1} format={(v) => `${v}%`} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
