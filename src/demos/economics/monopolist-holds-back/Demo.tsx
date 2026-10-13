"use client";

// Monopoly pricing. Buyers pay 100 − q for the q-th unit, so at price p they buy 100 − p units; each
// unit costs $20 to make. One picture: the demand line, the $20 cost line, and the profit box
// (price − cost) × units for the price the lone seller picks; the best box seen so far stays dashed.
// Key state: price $60 (box 40 × 40 = $1,600) after also trying a higher price.
// Model: straight-line demand, one price for every unit, no rivals (until "Rivals arrive"), no rules.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const COST = 20;
const TOPP = 100;
const BEST = 60;
const START = 40; // QA's two arrow presses: 40 → 50 → 60; then +$10 → 70
const STEP = 10;
const MILESTONES = ["at-60", "above-60"] as const;

const units = (p: number) => Math.max(0, TOPP - p);
const profit = (p: number) => (p - COST) * units(p);
const usd = (v: number) => `$${v.toLocaleString("en-US")}`;

// Geometry (viewBox 320 × 200): units 0..100 across, price $0..$100 up.
const L = 34;
const R = 300;
const TOP = 10;
const BOT = 176;
const px = (q: number) => L + (q / 100) * (R - L);
const py = (p: number) => BOT - (p / 100) * (BOT - TOP);

export default function MonopolistHoldsBack({ slug }: { slug: string }) {
  const [price, setPrice] = useState(START);
  const [rivals, setRivals] = useState(false);
  const [seen, setSeen] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Buyers pay 100 − q for the q-th unit; each unit costs $${COST} to make. One seller with no rival picks one price for every unit. Which price earns the most profit?`,
        options: [`$${COST}`, `$${BEST}`, `$${TOPP}`],
        answer: 1,
      }}
      exploreHint="Move the price both ways and watch the profit box."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const tried = seen.filter((p) => p !== BEST && p > 0).sort((a, b) => a - b);
        return (
          <>
            <p>
              At ${BEST} the profit box was biggest: (${BEST} − ${COST}) × {units(BEST)} units = <strong>{usd(profit(BEST))}</strong>.
              {tried.length > 0 && ` You also saw ${tried.map((p) => `$${p}: ${usd(profit(p))}`).join(", ")}.`}
            </p>
            <p>
              A higher price earns more on each unit but loses buyers. Below ${BEST}, raising the price adds more than it loses; above, the
              lost sales cost more. So a lone seller stops between its cost and the top of demand, and sells fewer units than buyers would
              take at cost.
              {rivals || seen.includes(-1)
                ? ` With rivals undercutting, the price fell to $${COST}: ${units(COST)} units, no profit.`
                : ""}
            </p>
            <p className="muted">A model: straight-line demand, one price, no rules. No view on any real firm.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (p: number) => {
              const v = Math.max(COST, Math.min(TOPP, p));
              setPrice(v);
              setSeen((sn) => (sn.includes(v) ? sn : [...sn, v]));
              if (v === BEST) reach("at-60");
              if (v > BEST) reach("above-60");
            };
            const toggleRivals = () => {
              setRivals((r) => !r);
              setSeen((sn) => (sn.includes(-1) ? sn : [...sn, -1]));
            };
            const p = rivals ? COST : price;
            const q = units(p);
            const best = seen.filter((v) => v > 0).reduce((b, v) => (profit(v) > profit(b) ? v : b), START);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: one seller, straight-line buyers</p>
                <svg
                  viewBox="0 0 320 200"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Demand line and $20 cost" : `Price $${p}, ${q} units, profit ${usd(profit(p))}`}
                >
                  {[0, 20, 50, 100].map((v) => (
                    <text key={v} x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                      ${v}
                    </text>
                  ))}
                  <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
                  <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
                  {[0, 50, 100].map((k) => (
                    <text key={k} x={px(k)} y={BOT + 14} textAnchor={k === 0 ? "start" : k === 100 ? "end" : "middle"} className={s.axis}>
                      {k === 100 ? "100 units" : k}
                    </text>
                  ))}
                  <line x1={px(0)} y1={py(100)} x2={px(100)} y2={py(0)} className={s.line} />
                  <text x={px(14)} y={py(90)} className={s.axis}>
                    buyers
                  </text>
                  <line x1={L} y1={py(COST)} x2={R} y2={py(COST)} stroke="var(--muted)" strokeWidth={1.5} />
                  <text x={L + 4} y={py(COST) + 14} className={s.axis}>
                    cost $20 a unit
                  </text>
                  {!locked && (rivals || best !== price) && profit(best) > 0 && (
                    <>
                      <rect
                        x={px(0)}
                        y={py(best)}
                        width={px(units(best)) - px(0)}
                        height={py(COST) - py(best)}
                        className={s.ghost}
                      />
                      {rivals && (
                        <text x={(px(0) + px(units(best))) / 2} y={(py(best) + py(COST)) / 2 - 2} textAnchor="middle" className={s.small}>
                          <tspan x={(px(0) + px(units(best))) / 2}>one seller</tspan>
                          <tspan x={(px(0) + px(units(best))) / 2} dy={12}>
                            ${best}: {usd(profit(best))}
                          </tspan>
                        </text>
                      )}
                    </>
                  )}
                  {!locked && p > COST && (
                    <>
                      <rect x={px(0)} y={py(p)} width={px(q) - px(0)} height={py(COST) - py(p)} className={s.goodFill} />
                      <text x={(px(0) + px(q)) / 2} y={(py(p) + py(COST)) / 2 + 5} textAnchor="middle" className={s.big}>
                        {usd(profit(p))}
                      </text>
                    </>
                  )}
                  {!locked && (
                    <>
                      <circle cx={px(q)} cy={py(p)} r={5} className={s.dot} />
                      <text x={q > 60 ? px(q) - 8 : px(q) + 8} y={py(p) - 8} textAnchor={q > 60 ? "end" : "start"} className={s.value}>
                        ${p}, {q} units
                      </text>
                    </>
                  )}
                </svg>
                <p className={s.msg}>Profit = (price − cost) × units sold</p>
                <Slider
                  label="Price"
                  value={price}
                  min={COST}
                  max={TOPP}
                  step={STEP}
                  disabled={locked || rivals}
                  format={(v) => `$${v}`}
                  onChange={set}
                />
                <Row>
                  <Control disabled={locked || rivals || price >= TOPP} onClick={() => set(price + STEP)} aria-label="Raise price $10">
                    +$10
                  </Control>
                  <Control disabled={locked || rivals || price <= COST} onClick={() => set(price - STEP)} aria-label="Lower price $10">
                    −$10
                  </Control>
                  <Control className={rivals ? "active" : ""} disabled={locked} aria-pressed={rivals} onClick={toggleRivals}>
                    {rivals ? "Back to one seller" : "Rivals arrive"}
                  </Control>
                </Row>
                <Row>
                  <Readout label="Units" value={locked ? "?" : q} />
                  <Readout label="Profit" value={locked ? "?" : usd(profit(p))} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
