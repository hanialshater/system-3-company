"use client";

// Adverse selection. A lot of ten used cars, five good and five bad. The learner sets the buyers'
// offer; a car stays for sale only if the offer meets its owner's lowest price. One readout shows the
// average value of the cars still for sale.
// Key state: an offer of $2,000 (the average of all ten): only the five bad cars remain, average $1,000.
// Model: two kinds of car with invented values (after Akerlof 1970); buyers cannot tell them apart.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const KINDS = [
  { name: "Good", value: 3000, ask: 2500, count: 5, cls: "var(--good)" },
  { name: "Bad", value: 1000, ask: 500, count: 5, cls: "var(--bad)" },
] as const;
const Q_OFFER = (KINDS[0].value * KINDS[0].count + KINDS[1].value * KINDS[1].count) / (KINDS[0].count + KINDS[1].count); // 2,000
const START = 3000;
const MILESTONES = ["average-offer"] as const;

const forSale = (offer: number) => KINDS.map((k) => (offer >= k.ask ? k.count : 0));
const avgValue = (offer: number) => {
  const c = forSale(offer);
  const n = c[0] + c[1];
  return n ? (c[0] * KINDS[0].value + c[1] * KINDS[1].value) / n : 0;
};
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

const L = 12;
const STEP = 58;

function Car({ x, y, color, on }: { x: number; y: number; color: string; on: boolean }) {
  return (
    <g opacity={on ? 1 : 0.28} stroke={on ? "none" : "var(--muted)"} strokeDasharray={on ? undefined : "3 2"}>
      <rect x={x + 8} y={y} width={26} height={11} rx={4} fill={on ? color : "none"} stroke={on ? "none" : "var(--muted)"} />
      <rect x={x} y={y + 8} width={42} height={14} rx={4} fill={on ? color : "none"} stroke={on ? "none" : "var(--muted)"} />
      <circle cx={x + 11} cy={y + 23} r={4.5} fill="var(--fg)" stroke="none" />
      <circle cx={x + 31} cy={y + 23} r={4.5} fill="var(--fg)" stroke="none" />
    </g>
  );
}

export default function LemonMarketUnravels({ slug }: { slug: string }) {
  const [offer, setOffer] = useState(START);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You are shopping for a used car. Half of used cars are good (worth $${KINDS[0].value.toLocaleString("en-US")} to buyers; owners sell only for $${KINDS[0].ask.toLocaleString("en-US")} or more), half are bad (worth $${KINDS[1].value.toLocaleString("en-US")}; owners sell for $${KINDS[1].ask} or more). Buyers cannot tell, so they offer the average, ${usd(Q_OFFER)}. Which cars are for sale?`,
        options: ["All of them", "Only the good ones", "Only the bad ones"],
        answer: 2,
      }}
      exploreHint={`Set the offer to ${usd(Q_OFFER)} and see who stays.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {usd(START)} all ten cars were for sale, worth {usd(avgValue(START))} on average. At the average offer of{" "}
            <strong>{usd(Q_OFFER)}</strong>, the good owners wanted at least {usd(KINDS[0].ask)} and left: only the five bad cars
            remained, worth <strong>{usd(avgValue(Q_OFFER))}</strong> on average, far below the offer.
          </p>
          <p>A price that ignores quality drives out the cars worth more, so the average quality on offer falls.</p>
          <p className="muted">A model after Akerlof (1970): invented values, two kinds of car, buyers cannot tell them apart.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setOffer(v);
              if (v === Q_OFFER) reach("average-offer");
            };
            const c = forSale(offer);
            const n = c[0] + c[1];
            const avg = avgValue(offer);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: two kinds of car, invented values</p>
                <svg viewBox="0 0 320 130" className="stage-svg" role="img" aria-label={locked ? "A lot of ten cars" : `${n} of 10 cars for sale`}>
                  {KINDS.map((k, r) => {
                    const y = 22 + r * 52;
                    return (
                      <g key={k.name}>
                        <text x={L} y={y - 6} className={s.axis}>
                          {k.name}: worth ${k.value.toLocaleString("en-US")}, sold from ${k.ask.toLocaleString("en-US")}
                        </text>
                        {Array.from({ length: k.count }, (_, i) => (
                          <Car key={i} x={L + i * STEP} y={y} color={k.cls} on={locked || offer >= k.ask} />
                        ))}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Readout label="Buyers offer" value={usd(offer)} />
                  <Readout label="Cars for sale" value={locked ? "?" : `${n} of 10`} />
                  <Readout label="Their average value" value={locked ? "?" : n ? usd(avg) : "none"} />
                </Row>
                {!locked && n > 0 && avg < offer && <p className={s.msg}>Buyers pay {usd(offer)} for cars worth {usd(avg)} on average.</p>}
                <Row>
                  {[Q_OFFER, START, 1000].map((v) => (
                    <Control key={v} className={offer === v ? "active" : ""} disabled={locked || offer === v} onClick={() => set(v)}>
                      Offer {usd(v)}
                    </Control>
                  ))}
                </Row>
                <Slider label="Buyers' offer" value={offer} min={500} max={3000} step={250} format={usd} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
