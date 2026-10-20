"use client";

// Markup vs margin. One bar: the selling price, split into the $60 cost and the profit on top.
// Markup = profit / cost. Margin = profit / price = markup / (1 + markup).
// Key states (milestones): 50% markup (the question) and 100% markup (profit is half the price, not all of it).
// Model: one jacket, a fixed $60 cost, no other costs.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const COST = 60;
const Q_MARKUP = 50; // percent
const FULL = 100;
const MAX_MARKUP = 200;
const MILESTONES = ["fifty", "hundred"] as const;

const profit = (m: number) => (COST * m) / 100;
const price = (m: number) => COST + profit(m);
const margin = (m: number) => (profit(m) / price(m)) * 100;
const pct = (v: number) => `${Math.round(v * 10) / 10}%`;
const whole = (v: number) => `${Math.round(v)}%`;

const L = 12;
const W = 296;
const PRICE_MAX = price(MAX_MARKUP); // 180

export default function MarkupMargin({ slug }: { slug: string }) {
  const [m, setM] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your shop buys a jacket for $${COST} and adds a ${Q_MARKUP}% markup to set the price tag. What share of that selling price is your profit?`,
        options: [`${Q_MARKUP}%`, whole(margin(Q_MARKUP)), "25%"],
        answer: 1,
      }}
      exploreHint="Set the markup to 50%, then 100%, and read the margin."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At a {Q_MARKUP}% markup the jacket sold for <strong>${price(Q_MARKUP)}</strong>. The ${profit(Q_MARKUP)} profit was {Q_MARKUP}% of the $
            {COST} cost but only <strong>{pct(margin(Q_MARKUP))}</strong> of the price.
          </p>
          <p>
            At a {FULL}% markup the profit (${profit(FULL)}) was half the ${price(FULL)} price. Markup divides by cost, margin by price, so margin is
            markup ÷ (1 + markup) and stays under 100%. Always name the base.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setM(v);
              if (v === Q_MARKUP) reach("fifty");
              if (v === FULL) reach("hundred");
            };
            const cw = (COST / PRICE_MAX) * W;
            const pw = (profit(m) / PRICE_MAX) * W;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: one jacket, $60 cost, no other costs</p>
                <p className={s.msg}>Markup = profit ÷ cost. Margin = profit ÷ price.</p>
                <svg viewBox="0 0 320 100" className="stage-svg" role="img" aria-label={locked ? "Price bar" : `Price $${price(m)}, profit $${profit(m)}`}>
                  <rect x={L} y={30} width={W} height={34} rx={3} className={s.ghostFill} />
                  <rect x={L} y={30} width={cw} height={34} className={s.main} />
                  {pw > 0 && <rect x={L + cw} y={30} width={pw} height={34} className={s.goodFill} />}
                  <text x={L + 4} y={52} className={s.small} style={{ fill: "#fff" }}>
                    cost $60
                  </text>
                  {!locked && m > 0 && (
                    <text x={L + cw + 4} y={52} className={s.small}>
                      profit ${profit(m)}
                    </text>
                  )}
                  <text x={L} y={22} className={s.axis}>
                    {locked ? "price bar" : `selling price $${price(m)}`}
                  </text>
                </svg>
                <Row>
                  <Readout label="Markup" value={locked ? "?" : `${m}%`} />
                  <Readout label="Margin" value={locked ? "?" : pct(margin(m))} />
                </Row>
                <Row>
                  {[Q_MARKUP, FULL, MAX_MARKUP].map((v) => (
                    <Control key={v} className={m === v ? "active" : ""} disabled={locked || m === v} onClick={() => set(v)}>
                      {v}% markup
                    </Control>
                  ))}
                </Row>
                <Slider label="Markup" value={m} min={0} max={MAX_MARKUP} step={10} format={(v) => `${v}%`} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
