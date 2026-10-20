"use client";

// Debt payoff order. Two card debts, $1,000 at 6% and $4,000 at 24% a year, and $300 a month,
// all on one debt until it is gone, then the other. One graph: interest paid so far, month by month,
// for the order the learner picks; the other order, once run, stays ghosted beside it.
// Key state: both orders run: $793 (24% first) vs $1,095 ($1,000 first).
// Model: monthly rate = APR / 12, interest added before the payment, no minimums, no new spending.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PAY = 300;
const DEBTS = [
  { name: "$1,000 at 6%", balance: 1000, apr: 0.06 },
  { name: "$4,000 at 24%", balance: 4000, apr: 0.24 },
];
type Order = "high" | "low";
const MILESTONES = ["high-first", "low-first"] as const;

/** Month by month: add each debt's interest, then pay $300 to the chosen debt first (any leftover to the other). */
function run(order: Order) {
  const b = DEBTS.map((d) => d.balance);
  const seq = order === "high" ? [1, 0] : [0, 1];
  const cum = [0];
  let interest = 0;
  while (b[0] > 1e-9 || b[1] > 1e-9) {
    DEBTS.forEach((d, k) => {
      const i = b[k] * (d.apr / 12);
      interest += i;
      b[k] += i;
    });
    let cash = PAY;
    for (const k of seq) {
      const p = Math.min(cash, b[k]);
      b[k] -= p;
      cash -= p;
    }
    cum.push(interest);
  }
  return { cum, months: cum.length - 1, interest };
}
const RUNS: Record<Order, ReturnType<typeof run>> = { high: run("high"), low: run("low") };
const HI = Math.round(RUNS.high.interest); // 793
const LO = Math.round(RUNS.low.interest); // 1,095
const DIFF = LO - HI; // 302 from the rounded totals the stage shows (exact 301.37)

const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

// Geometry (viewBox 320 × 180): months 0..22 across, interest $0..$1,200 up.
const L = 40;
const R = 300;
const TOP = 14;
const BOT = 150;
const MMAX = 22;
const YMAX = 1200;
const px = (m: number) => L + (m / MMAX) * (R - L);
const py = (v: number) => BOT - (v / YMAX) * (BOT - TOP);
const pts = (cum: number[]) => cum.map((v, m) => `${px(m).toFixed(1)},${py(v).toFixed(1)}`).join(" ");

export default function WhichDebtFirst({ slug }: { slug: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [ran, setRan] = useState<Order[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your two cards owe $1,000 at 6% a year and $4,000 at 24% a year. You pay $${PAY} a month, all on one debt until it is gone, then the other. How much less interest if you clear the 24% debt first?`,
        options: ["about $30", "about $300", "nothing"],
        answer: 1,
      }}
      exploreHint="Run both orders and compare the interest lines."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            24% debt first: <strong>{usd(HI)}</strong> of interest, debt-free in {RUNS.high.months} months. $1,000 debt first:{" "}
            <strong>{usd(LO)}</strong> and {RUNS.low.months} months. Same ${PAY} a month, {usd(DIFF)} more interest.
          </p>
          <p>
            Each month the 24% balance adds 2% of itself, the 6% balance only 0.5%. A dollar that clears the 24% debt stops four
            times as much interest as a dollar that clears the 6% one, so the order changes the cost.
          </p>
          <p className="muted">
            A model: fixed rates charged monthly (APR / 12), no minimum payments, no new spending. Arithmetic about this model, not
            advice to anyone.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (o: Order) => {
              setOrder(o);
              setRan((r) => (r.includes(o) ? r : [...r, o]));
              reach(o === "high" ? "high-first" : "low-first");
            };
            const other: Order | null = order === "high" ? "low" : order === "low" ? "high" : null;
            const showGhost = other !== null && ran.includes(other);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: fixed rates, no minimums, no new spending</p>
                <svg
                  viewBox="0 0 320 180"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    order === null || locked ? "Interest paid so far: nothing run yet" : `Interest ${usd(RUNS[order].interest)}`
                  }
                >
                  {[0, 400, 800, 1200].map((v) => (
                    <text key={v} x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                      ${v}
                    </text>
                  ))}
                  <text x={L + 6} y={TOP} className={s.axis}>
                    interest paid so far
                  </text>
                  <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
                  <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
                  {[0, 6, 12, 18].map((m) => (
                    <text key={m} x={px(m)} y={BOT + 14} textAnchor={m === 0 ? "start" : "middle"} className={s.axis}>
                      {m === 18 ? "18 months" : m}
                    </text>
                  ))}
                  {!locked && showGhost && other && (
                    <>
                      <polyline points={pts(RUNS[other].cum)} className={s.ghost} />
                      <text x={px(RUNS[other].months)} y={py(RUNS[other].interest) - 8} textAnchor="end" className={s.axis}>
                        {usd(RUNS[other].interest)}
                      </text>
                    </>
                  )}
                  {!locked && order && (
                    <>
                      <polyline points={pts(RUNS[order].cum)} className={order === "high" ? s.line2 : s.line} />
                      <circle cx={px(RUNS[order].months)} cy={py(RUNS[order].interest)} r={5} className={s.dot} />
                      <text
                        x={px(RUNS[order].months)}
                        y={py(RUNS[order].interest) + (order === "high" && showGhost ? 20 : -10)}
                        textAnchor="end"
                        className={s.value}
                      >
                        {usd(RUNS[order].interest)}
                      </text>
                    </>
                  )}
                </svg>

                <Row>
                  <span className={s.rowLabel}>${PAY} a month goes first to</span>
                </Row>
                <Row>
                  {(["high", "low"] as const).map((o) => (
                    <Control
                      key={o}
                      className={`${s.tile} ${order === o ? "active" : ""}`}
                      disabled={locked || order === o}
                      aria-pressed={order === o}
                      onClick={() => pick(o)}
                    >
                      {o === "high" ? DEBTS[1].name : DEBTS[0].name}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="24% first" value={!locked && ran.includes("high") ? usd(HI) : "?"} />
                  <Readout label="$1,000 first" value={!locked && ran.includes("low") ? usd(LO) : "?"} />
                  <Readout label="Months" value={!locked && order ? RUNS[order].months : "?"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
