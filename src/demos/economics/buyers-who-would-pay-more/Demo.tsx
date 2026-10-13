"use client";

// Consumer surplus. Five invented buyers would pay up to $10, $8, $6, $4, $2 for one cup. One picture:
// five bars (what a cup is worth to each) and a price line. The learner taps each buyer to see whether
// they buy and what they keep (worth − price); a total adds up what the checked buyers keep.
// Key state: at $5, the three buyers who buy are checked: 5 + 3 + 1 = $9.
// Model: invented values, one cup each, a buyer buys when the cup is worth at least the price.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const VALUES = [10, 8, 6, 4, 2];
const Q_PRICE = 5;
const MILESTONES = ["gains-at-5"] as const;

const buys = (v: number, p: number) => v >= p;
const gain = (v: number, p: number) => (buys(v, p) ? v - p : 0);
const BUYERS_Q = VALUES.filter((v) => buys(v, Q_PRICE));
const GAIN_Q = BUYERS_Q.reduce((a, v) => a + gain(v, Q_PRICE), 0); // 9
const PAID_Q = BUYERS_Q.length * Q_PRICE; // 15
const WORTH_Q = BUYERS_Q.reduce((a, v) => a + v, 0); // 24

// Geometry (viewBox 320 × 190): five bars, $0..$10 up.
const L = 34;
const R = 308;
const TOP = 16;
const BOT = 170;
const py = (v: number) => BOT - (v / 10) * (BOT - TOP);
const slot = (R - L) / VALUES.length;
const bx = (i: number) => L + i * slot + slot * 0.18;
const BW = slot * 0.64;

export default function BuyersWhoWouldPayMore({ slug }: { slug: string }) {
  const [price, setPrice] = useState(Q_PRICE);
  const [checked, setChecked] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Five buyers would pay up to ${VALUES.map((v) => `$${v}`).join(", ")} for a cup. The price is $${Q_PRICE}. Among those who buy, what is the total of their gains (worth minus price)?`,
        options: [`$${PAID_Q}`, `$${GAIN_Q}`, `$${WORTH_Q}`],
        answer: 1,
      }}
      exploreHint={`Tap each buyer at $${Q_PRICE} and add up what they keep.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At ${Q_PRICE}, {BUYERS_Q.length} buyers bought. They paid ${PAID_Q} in all, but the cups were worth ${WORTH_Q} to them, so
            together they kept {BUYERS_Q.map((v) => `$${gain(v, Q_PRICE)}`).join(" + ")} = <strong>${GAIN_Q}</strong>. The{" "}
            {VALUES.filter((v) => !buys(v, Q_PRICE))
              .map((v) => `$${v}`)
              .join(" and ")}{" "}
            buyers stayed out.
          </p>
          <p>
            One price for everyone means anyone who values a cup above it keeps the difference. Only the last buyer in, the ${BUYERS_Q[BUYERS_Q.length - 1]}{" "}
            one, came close to paying what it was worth. Economists call this total gain consumer surplus.
          </p>
          <p className="muted">A model: five invented buyers, one cup each.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (ch: number[], p: number) => {
              if (p === Q_PRICE && BUYERS_Q.every((v) => ch.includes(v))) reach("gains-at-5");
            };
            const tap = (v: number) => {
              const ch = checked.includes(v) ? checked : [...checked, v];
              setChecked(ch);
              check(ch, price);
            };
            const setP = (p: number) => {
              setPrice(p);
              check(checked, p);
            };
            const total = checked.reduce((a, v) => a + gain(v, price), 0);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: five invented buyers, one cup each</p>
                <svg
                  viewBox="0 0 320 190"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Five buyers and a $5 price" : `Price $${price}; checked buyers keep $${total}`}
                >
                  {[0, 5, 10].map((v) => (
                    <text key={v} x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                      ${v}
                    </text>
                  ))}
                  <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
                  {VALUES.map((v, i) => {
                    const on = !locked && checked.includes(v);
                    const b = buys(v, price);
                    return (
                      <g key={v}>
                        <rect
                          x={bx(i)}
                          y={py(v)}
                          width={BW}
                          height={BOT - py(v)}
                          rx={3}
                          className={on && !b ? s.ghostFill : s.soft}
                        />
                        {on && b && v > price && (
                          <rect x={bx(i)} y={py(v)} width={BW} height={py(price) - py(v)} className={s.goodFill} />
                        )}
                        <text x={bx(i) + BW / 2} y={py(v) - 4} textAnchor="middle" className={s.value}>
                          {on ? (b ? `+$${v - price}` : "out") : `$${v}`}
                        </text>
                      </g>
                    );
                  })}
                  <line x1={L} y1={py(price)} x2={R} y2={py(price)} stroke="var(--fg)" strokeWidth={2} />
                  <text x={R} y={py(price) + 14} textAnchor="end" className={s.value}>
                    price ${price}
                  </text>
                </svg>
                <p className={s.msg}>Gain = worth − price. Tap each buyer:</p>
                <Row>
                  {VALUES.map((v) => (
                    <Control
                      key={v}
                      className={`${s.tile} ${checked.includes(v) ? "active" : ""}`}
                      disabled={locked || checked.includes(v)}
                      aria-label={`Buyer who would pay up to $${v}`}
                      onClick={() => tap(v)}
                    >
                      ${v}
                    </Control>
                  ))}
                </Row>
                <Slider label="Price" value={price} min={1} max={10} disabled={locked} format={(v) => `$${v}`} onChange={setP} />
                <Row>
                  <Readout label="Buyers checked" value={`${checked.length} of ${VALUES.length}`} />
                  <Readout label="Total gain" value={locked ? "?" : `$${total}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
