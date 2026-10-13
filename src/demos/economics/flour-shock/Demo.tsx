"use client";

// Flour shock. The bread model from supply-demand: buyers want 100 − 10p, bakers bake
// 10(p − c) − 20 when flour adds $c to each loaf's cost. One graph: the whole supply line shifts up
// by $c, the crossing slides up the demand line, and the price rises by c/2, not c.
// Key state: c = $2 (bakers bake 10p − 40): price $7, 30 loaves. Model: straight lines, one market.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Q_COST = 2;
const C_MAX = 4;
const MILESTONES = ["two-dollar-flour"] as const;

const demand = (p: number) => 100 - 10 * p;
const supply = (p: number, c: number) => 10 * (p - c) - 20;
/** Where buyers' and bakers' lines cross: 100 − 10p = 10(p − c) − 20. */
const eqPrice = (c: number) => (120 + 10 * c) / 20;
const P0 = eqPrice(0); // 6
const Q0 = demand(P0); // 40
const P1 = eqPrice(Q_COST); // 7
const Q1 = demand(P1); // 30

// Plot geometry (viewBox 320 × 200): loaves 0..90 across, price $0..$10 up.
const L = 34;
const R = 308;
const TOP = 10;
const BOT = 176;
const QMAX = 90;
const px = (q: number) => L + (q / QMAX) * (R - L);
const py = (p: number) => BOT - (p / 10) * (BOT - TOP);
// Supply line as price for a quantity: p = (q + 20)/10 + c, drawn while p ≤ 10.
const supplyLine = (c: number) => {
  const qTop = 10 * (10 - c) - 20;
  return { x1: px(0), y1: py(2 + c), x2: px(qTop), y2: py(10) };
};
const dollars = (p: number) => `$${p % 1 === 0 ? p.toFixed(0) : p.toFixed(2)}`;

function Stage({ ctx, c, setC }: { ctx: StageContext; c: number; setC: (c: number) => void }) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);
  const set = (v: number) => {
    setC(v);
    if (v === Q_COST) reach("two-dollar-flour");
  };
  const p = eqPrice(c);
  const q = demand(p);
  const old = supplyLine(0);
  const now = supplyLine(c);

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Toy bread market: straight lines</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "Bread market at $6" : `Price ${dollars(p)}, ${q} loaves`}>
        {[2, 4, 6, 8, 10].map((v) => (
          <text key={v} x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
            ${v}
          </text>
        ))}
        <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
        <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
        {[0, 30, 60, 90].map((k) => (
          <text key={k} x={px(k)} y={BOT + 14} textAnchor={k === 0 ? "start" : k === 90 ? "end" : "middle"} className={s.axis}>
            {k === 90 ? "90 loaves" : k}
          </text>
        ))}
        {/* buyers */}
        <line x1={px(0)} y1={py(10)} x2={px(QMAX)} y2={py(1)} className={s.line} />
        <text x={px(80)} y={py(2) + 20} textAnchor="middle" className={s.axis}>
          buyers
        </text>
        {/* bakers, before and after */}
        <line {...old} className={c === 0 || locked ? s.line2 : s.ghost} />
        {!locked && c > 0 && <line {...now} className={s.line2} />}
        <text x={(locked ? old : now).x2 - 8} y={py(10) + 4} textAnchor="end" className={s.axis}>
          bakers
        </text>
        {/* the crossing */}
        <circle cx={px(Q0)} cy={py(P0)} r={4} fill="var(--muted)" />
        {!locked && (
          <>
            <line x1={L} y1={py(p)} x2={px(q)} y2={py(p)} stroke="var(--muted)" strokeDasharray="3 3" />
            <circle cx={px(q)} cy={py(p)} r={6} className={s.dot} />
            <text x={px(q) + 10} y={py(p) + 4} className={s.value}>
              {dollars(p)}, {q} loaves
            </text>
          </>
        )}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked ? "Lock in a guess to start." : c === 0 ? "Was $6 and 40 loaves." : `Cost +${dollars(c)} a loaf, price +${dollars(p - P0)}.`}
      </p>

      <Row>
        <Slider label="Flour adds per loaf" value={c} min={0} max={C_MAX} disabled={locked} format={(v) => dollars(v)} onChange={set} />
        <Readout label="Price" value={locked ? "?" : dollars(p)} />
        <Readout label="Loaves" value={locked ? "?" : q} />
      </Row>
    </div>
  );
}

export default function FlourShock({ slug }: { slug: string }) {
  const [c, setC] = useState(0);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Bread model: buyers want 100 − 10p loaves, bakers bake 10p − 20, price $${P0}. Flour adds $${Q_COST} to each loaf's cost, so bakers now bake 10p − 40. New price?`,
        options: [`$${P0}`, `$${P1}`, `$${P0 + Q_COST}`],
        answer: 1,
      }}
      exploreHint={`Raise the flour cost to $${Q_COST} a loaf and watch where the lines cross.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With flour adding ${Q_COST} a loaf, the bakers' whole line moved up by ${Q_COST} and the crossing slid to{" "}
            <strong>${P1}</strong> and <strong>{Q1} loaves</strong> (was ${P0} and {Q0}). The price rose ${P1 - P0}, not ${Q_COST}.
          </p>
          <p>
            At ${P0 + Q_COST} buyers would want only {demand(P0 + Q_COST)} loaves while bakers would bake{" "}
            {supply(P0 + Q_COST, Q_COST)}, so loaves would go unsold and the price would fall back. Buyers cut back, and the
            cost is shared: buyers pay ${P1 - P0} more, bakers keep ${P1 - Q_COST} a loaf after the extra flour cost, instead of ${P0}.
          </p>
          <p className="muted">A model: straight lines, one market. Here the lines are equally steep, so the cost splits evenly.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} c={c} setC={setC} />}
    </Lesson>
  );
}
