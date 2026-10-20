"use client";

// Demand shift. Ice cream model: buyers want 100 + x − 10p, sellers supply 10p − 20. One graph: the
// buyers' line slides right by x cones at every price (old line dashed) and the crossing dot moves
// along the sellers' line. Key state: x = 30: price $7.50, 55 cones (was $6, 40).
// Model: straight lines, one market.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Q_EXTRA = 30;
const MAX_EXTRA = 60;
const STEP = 15; // QA's two arrow presses land on +30
const MILESTONES = ["plus-30"] as const;

const demand = (p: number, x: number) => 100 + x - 10 * p;
const supply = (p: number) => 10 * p - 20;
/** Where 100 + x − 10p = 10p − 20. */
const eqPrice = (x: number) => (120 + x) / 20;
const P0 = eqPrice(0); // 6
const Q0 = demand(P0, 0); // 40
const P1 = eqPrice(Q_EXTRA); // 7.5
const Q1 = demand(P1, Q_EXTRA); // 55
const WRONG = P0 + Q_EXTRA / 10; // $9: the old crossing lifted straight up

const dollars = (p: number) => `$${p % 1 === 0 ? p.toFixed(0) : p.toFixed(2)}`;

// Geometry (viewBox 320 × 200): cones 0..100 across, price $0..$10 up.
const L = 34;
const R = 308;
const TOP = 10;
const BOT = 176;
const QMAX = 100;
const px = (q: number) => L + (q / QMAX) * (R - L);
const py = (p: number) => BOT - (p / 10) * (BOT - TOP);
/** Buyers' line for shift x, clipped to the plot: from price $10 down to the right edge or $0. */
const demandLine = (x: number) => {
  const qTop = demand(10, x);
  const pEnd = Math.max(0, (100 + x - QMAX) / 10);
  return { x1: px(qTop), y1: py(10), x2: px(demand(pEnd, x)), y2: py(pEnd) };
};

export default function HeatWaveDemand({ slug }: { slug: string }) {
  const [x, setX] = useState(0);
  const [seen, setSeen] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In the ice cream model, buyers want 100 − 10p cones and sellers supply 10p − 20; the lines cross at ${dollars(P0)} and ${Q0} cones. A heat wave hits, and buyers want ${Q_EXTRA} more at every price. What does a cone cost now?`,
        options: [dollars(P0), dollars(P1), dollars(WRONG)],
        answer: 1,
      }}
      exploreHint={`Add ${Q_EXTRA} cones of demand and follow the crossing.`}
      minInteractions={MILESTONES.length}
      reveal={() => {
        const others = seen.filter((v) => v !== 0 && v !== Q_EXTRA).sort((a, b) => a - b);
        return (
          <>
            <p>
              With buyers wanting {Q_EXTRA} more at every price, the crossing slid up the sellers&apos; line to{" "}
              <strong>{dollars(P1)}</strong> and <strong>{Q1} cones</strong> (was {dollars(P0)} and {Q0}). Price and amount both rose.
              {others.length > 0 && ` You also tried ${others.map((v) => `+${v} (${dollars(eqPrice(v))})`).join(", ")}.`}
            </p>
            <p>
              Why not {dollars(WRONG)}? There sellers would bring {supply(WRONG)} cones but buyers would want only{" "}
              {demand(WRONG, Q_EXTRA)}: cones left over, so the price falls back. Sellers bring more only at a higher price, so the
              extra demand is met partly by more cones and partly by a higher price.
            </p>
            <p className="muted">A model: straight lines, one market. Real shifts are messier.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setX(v);
              setSeen((sn) => (sn.includes(v) ? sn : [...sn, v]));
              if (v === Q_EXTRA) reach("plus-30");
            };
            const p = eqPrice(x);
            const q = demand(p, x);
            const old = demandLine(0);
            const now = demandLine(x);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Toy ice cream market: straight lines</p>
                <svg
                  viewBox="0 0 320 200"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Lines cross at $6, 40 cones" : `Lines cross at ${dollars(p)}, ${q} cones`}
                >
                  {[2, 4, 6, 8, 10].map((v) => (
                    <text key={v} x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                      ${v}
                    </text>
                  ))}
                  <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
                  <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
                  {[0, 50, 100].map((k) => (
                    <text key={k} x={px(k)} y={BOT + 14} textAnchor={k === 0 ? "start" : k === 100 ? "end" : "middle"} className={s.axis}>
                      {k === 100 ? "100 cones" : k}
                    </text>
                  ))}
                  {/* sellers */}
                  <line x1={px(0)} y1={py(2)} x2={px(80)} y2={py(10)} className={s.line2} />
                  <text x={px(80) - 6} y={py(10) + 4} textAnchor="end" className={s.axis}>
                    sellers
                  </text>
                  {/* buyers, before and after */}
                  <line {...old} className={!locked && x > 0 ? s.ghost : s.line} />
                  {!locked && x > 0 && <line {...now} className={s.line} />}
                  <text x={(!locked && x > 0 ? now : old).x2} y={(!locked && x > 0 ? now : old).y2 + 14 > BOT - 4 ? (!locked && x > 0 ? now : old).y2 - 10 : (!locked && x > 0 ? now : old).y2 + 14} textAnchor="end" className={s.axis}>
                    buyers{!locked && x > 0 ? ` +${x}` : ""}
                  </text>
                  {!locked && x > 0 && (
                    <text x={L + 6} y={BOT - 6} className={s.axis}>
                      dashed = before
                    </text>
                  )}
                  <circle cx={px(Q0)} cy={py(P0)} r={4} fill="var(--muted)" />
                  {!locked && (
                    <>
                      <line x1={L} y1={py(p)} x2={px(q)} y2={py(p)} stroke="var(--muted)" strokeDasharray="3 3" />
                      <circle cx={px(q)} cy={py(p)} r={6} className={s.dot} />
                      <text x={px(q) - 10} y={py(p) - 10} textAnchor="end" className={s.value}>
                        {dollars(p)}, {q} cones
                      </text>
                    </>
                  )}
                </svg>

                <Slider
                  label="Extra cones wanted at every price"
                  value={x}
                  min={0}
                  max={MAX_EXTRA}
                  step={STEP}
                  disabled={locked}
                  format={(v) => `+${v}`}
                  onChange={set}
                />
                <Row>
                  <Readout label="Price" value={locked ? "?" : dollars(p)} />
                  <Readout label="Cones sold" value={locked ? "?" : q} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
