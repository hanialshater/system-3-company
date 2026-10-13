"use client";

// Currency spread. One bar: the amount you hold, in dollars, then euros, then dollars again, with
// the starting $1,000 as a dashed outline. The slider sets the booth's dollar price for 1 euro
// on the way back.
// Key state: $1,000 -> EUR 900 -> $945 at a return price of $1.05.
// Model: one booth, two invented rates, no fees, no market move.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = 1000;
const OUT_RATE = 0.9; // euros per dollar
const Q_PRICE = 1.05; // dollars per euro on the way back
const MILESTONES = ["round-trip"] as const;

const euros = START * OUT_RATE;
const back = (price: number) => euros * price;
const BREAK_EVEN = 1 / OUT_RATE; // price that returns exactly START
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const eur = (v: number) => `€${Math.round(v).toLocaleString("en-US")}`;
const price2 = (v: number) => `$${v.toFixed(2)}`;

const L = 12;
const W = 296;
const MAX = 1200;

export default function ExchangeRoundTrip({ slug }: { slug: string }) {
  const [leg, setLeg] = useState(0); // 0 dollars, 1 euros, 2 dollars again
  const [price, setPrice] = useState(Q_PRICE);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A booth gives ${OUT_RATE.toFixed(2)} euro per dollar and sells dollars at ${price2(Q_PRICE)} per euro. You change ${usd(START)} into euros, then straight back, with no market move. How much do you hold?`,
        options: [usd(START), usd(back(Q_PRICE)), usd(START * OUT_RATE)],
        answer: 1,
      }}
      exploreHint="Change the money to euros and back."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your {usd(START)} became <strong>{eur(euros)}</strong> and came back as <strong>{usd(back(Q_PRICE))}</strong> at{" "}
            {price2(Q_PRICE)} per euro: {usd(START - back(Q_PRICE))} gone, with no market move at all.
          </p>
          <p>
            The booth buys and sells at different rates, so each round trip pays that gap. Getting your {usd(START)} back would take 1 / {OUT_RATE.toFixed(2)} = {BREAK_EVEN.toFixed(4)} dollars per euro, which is no gap at all.
          </p>
          <p className="muted">A model: one booth, invented rates, no fees. Not advice on where to change money.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const amount = leg === 0 ? START : leg === 1 ? euros : back(price);
            const bar = (Math.min(amount, MAX) / MAX) * W;
            const startW = (START / MAX) * W;
            const caption =
              leg === 0
                ? `Start: ${usd(START)}`
                : leg === 1
                  ? `${usd(START)} x ${OUT_RATE.toFixed(2)} = ${eur(euros)}`
                  : `${eur(euros)} x ${price2(price)} = ${usd(back(price))}`;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: one booth, invented rates, no fees</p>
                <svg viewBox="0 0 320 120" className="stage-svg" role="img" aria-label={`You hold ${leg === 1 ? eur(amount) : usd(amount)}`}>
                  <text x={L} y={18} className={s.big}>
                    {leg === 1 ? eur(amount) : usd(amount)}
                  </text>
                  <rect x={L} y={30} width={startW} height={34} rx={3} className={s.ghost} />
                  <rect x={L} y={30} width={bar} height={34} rx={3} className={leg === 1 ? s.soft : s.main} />
                  <text x={L + startW} y={78} textAnchor="end" className={s.axis}>
                    start {usd(START)}
                  </text>
                  <text x={L} y={104} className={s.value}>
                    {caption}
                  </text>
                </svg>
                <Row>
                  <Readout label="Holding" value={leg === 1 ? eur(amount) : usd(amount)} />
                  <Readout label="Lost" value={locked || leg !== 2 ? "?" : usd(START - back(price))} />
                </Row>
                {leg === 2 && price !== Q_PRICE && <p className={s.msg}>The question used {price2(Q_PRICE)} per euro.</p>}
                <Row>
                  <Control disabled={locked || leg !== 0} onClick={() => setLeg(1)}>
                    To euros
                  </Control>
                  <Control
                    disabled={locked || leg !== 1}
                    onClick={() => {
                      setLeg(2);
                      if (price === Q_PRICE) reach("round-trip");
                    }}
                  >
                    Back to dollars
                  </Control>
                  <Control disabled={locked || leg === 0} onClick={() => setLeg(0)}>
                    Start over
                  </Control>
                </Row>
                <Slider
                  label="Booth price of 1 euro on the way back"
                  value={price}
                  min={1}
                  max={1.11}
                  step={0.01}
                  format={price2}
                  disabled={locked}
                  onChange={(v) => {
                    const p = Math.round(v * 100) / 100;
                    setPrice(p);
                    if (leg === 2 && p === Q_PRICE) reach("round-trip");
                  }}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
