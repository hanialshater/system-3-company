"use client";

// Revenue sweet spot. One chart: the bakery's straight demand line (loaves = 100 − 10 × price)
// and a rectangle under it, price tall and loaves wide, whose area is the day's revenue.
// Raising the price makes it taller but narrower; the area peaks at $5 ($250).
// Key state: $5 reached, and a price above it seen. Model: straight-line demand, revenue not profit.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const P_MAX = 10;
const CHOICES = [3, 5, 8];
const START = 3;
const MILESTONES = ["best-price", "past-the-peak"] as const;

const loaves = (p: number) => Math.max(0, 100 - 10 * p);
const revenue = (p: number) => p * loaves(p);
const BEST = CHOICES.reduce((b, p) => (revenue(p) > revenue(b) ? p : b), CHOICES[0]); // 5

// Plot geometry (viewBox 320 × 200): loaves 0..100 across, price $0..$10 up.
const L = 34;
const R = 300;
const TOP = 12;
const BOT = 176;
const px = (q: number) => L + (q / 100) * (R - L);
const py = (p: number) => BOT - (p / P_MAX) * (BOT - TOP);

function Stage({ ctx, price, setPrice }: { ctx: StageContext; price: number; setPrice: (p: number) => void }) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);
  const set = (p: number) => {
    setPrice(p);
    if (p === BEST) reach("best-price");
    if (p > BEST) reach("past-the-peak");
  };
  const q = loaves(price);
  const rev = revenue(price);

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Model: straight-line demand, revenue only</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "Demand line" : `At $${price}, ${q} loaves, revenue $${rev}`}>
        {[2, 4, 6, 8, 10].map((p) => (
          <text key={p} x={L - 4} y={py(p) + 4} textAnchor="end" className={s.axis}>
            ${p}
          </text>
        ))}
        <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
        <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
        {[0, 50, 100].map((k) => (
          <text key={k} x={px(k)} y={BOT + 14} textAnchor={k === 0 ? "start" : k === 100 ? "end" : "middle"} className={s.axis}>
            {k === 100 ? "100 loaves" : k}
          </text>
        ))}
        {!locked && (
          <rect x={px(0)} y={py(price)} width={px(q) - px(0)} height={BOT - py(price)} className={s.soft} />
        )}
        <line x1={px(0)} y1={py(P_MAX)} x2={px(100)} y2={py(0)} className={s.line} />
        {!locked && (
          <>
            <circle cx={px(q)} cy={py(price)} r={5} className={s.dot} />
            {q > 0 && price > 0 && (
              <text x={(px(0) + px(q)) / 2} y={(py(price) + BOT) / 2 + 6} textAnchor="middle" className={s.big}>
                ${rev}
              </text>
            )}
          </>
        )}
      </svg>

      <Row>
        <Slider label="Price" value={price} min={0} max={P_MAX} disabled={locked} format={(v) => `$${v}`} onChange={set} />
        <Readout label="Loaves a day" value={locked ? "?" : q} />
        <Readout label="Revenue" value={locked ? "?" : `$${rev}`} />
      </Row>
      <Row>
        {CHOICES.map((p) => (
          <Control key={p} className={`${s.tile} ${price === p ? "active" : ""}`} disabled={locked || price === p} onClick={() => set(p)}>
            ${p}
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function RevenueSweetSpot({ slug }: { slug: string }) {
  const [price, setPrice] = useState(START);
  const [a, b, c] = CHOICES;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your bakery sells 100 loaves a day, minus 10 for every dollar you charge per loaf. Which price brings in the most revenue: $${a}, $${b} or $${c}?`,
        options: CHOICES.map((p) => `$${p}`),
        answer: CHOICES.indexOf(BEST),
      }}
      exploreHint={`Try $${a}, $${b} and $${c}. Watch the rectangle's area.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The rectangle was biggest at <strong>${BEST}</strong>: {loaves(BEST)} loaves for <strong>${revenue(BEST)}</strong>.
            At ${a} it was {loaves(a)} loaves for ${revenue(a)}; at ${c}, only {loaves(c)} loaves for ${revenue(c)}.
          </p>
          <p>
            Each $1 on the price earns $1 more on every loaf still sold, but loses 10 loaves. Below ${BEST} the gain wins;
            above ${BEST} the lost sales win. So revenue rises, peaks, then falls.
          </p>
          <p className="muted">A model: straight-line demand, and revenue only. Profit would also subtract the cost of each loaf.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} price={price} setPrice={setPrice} />}
    </Lesson>
  );
}
