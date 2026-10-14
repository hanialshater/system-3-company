"use client";

// One chart: reactant concentration against time, starting at 80 mmol/L. The learner waits for
// it to halve, again and again, for a second-order reaction (rate ∝ [A]², needs two A to meet)
// and for a first-order one with the same first half. Brackets under the curve show each wait:
// second order 10, 20, 40 min; first order 10, 10, 10 min.
// v3: the time axis has even ticks (no halving times before the lock), the gate needs one and
// two halvings in 2nd order (rate 1/4, then 1/16), and a stage line shows the cause per halving:
// half as much to lose, at 1/4 (2nd) or 1/2 (1st) the rate, so 2x (or the same) wait.
// v4 (r6): the two slider presses pass one halving in ~450 ms, so the single "Rate vs start"
// readout never showed 2nd-order 1/4 for long. Now a rate row per order keeps every halving
// reached (1/4 → 1/16), and the reveal quotes those rows. Title no longer says "slows down".
// v5 (r7): the reveal quoted the 2nd-order wait bars (10, 20 min) after the learner had switched
// to 1st order, so those bars were gone. Now each order has a "waits" row next to its rate row
// that keeps every wait reached, and the reveal quotes that row. Rate rows say "vs start".

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Order = 1 | 2;
const A0 = 80; // mmol/L
const T_HALF1 = 10; // min, the first halving for both
const K2 = 1 / (A0 * T_HALF1); // L/(mmol min): 1/[A] = 1/A0 + k t
const K1 = Math.LN2 / T_HALF1; // 1/min
const conc = (o: Order, t: number) => (o === 2 ? 1 / (1 / A0 + K2 * t) : A0 * Math.exp(-K1 * t));
// Time to reach A0 / 2^n
const timeTo = (o: Order, n: number) => Math.round((o === 2 ? (Math.pow(2, n) / A0 - 1 / A0) / K2 : n * T_HALF1) * 1000) / 1000;
const wait = (o: Order, n: number) => timeTo(o, n) - timeTo(o, n - 1);
const MAXN = 3;
const WAIT2 = wait(2, 2); // 20 min
const NAMES = ["second-once", "second-twice", "first-twice"] as const;

const W = 320;
const H = 210;
const L = 44;
const R = 12;
const TOP = 12;
const BASE = 150;
const TMAX = timeTo(2, MAXN); // 70 min
const X = (t: number) => L + (t / TMAX) * (W - L - R);
const Y = (c: number) => BASE - (c / A0) * (BASE - TOP);
const path = (o: Order, n: number) => {
  const end = timeTo(o, n);
  return Array.from({ length: 61 }, (_, i) => {
    const t = (i / 60) * end;
    return `${i ? "L" : "M"} ${X(t).toFixed(1)} ${Y(conc(o, t)).toFixed(1)}`;
  }).join(" ");
};
const name = (o: Order) => (o === 2 ? "2nd order" : "1st order");
const btn = (o: Order) => (o === 2 ? "Pairs must meet (2nd order)" : "Steady (1st order)");
const rate = (o: Order, n: number) => `1/${Math.pow(o === 2 ? 4 : 2, n)}`;

export default function TheSlowingHalfLife({ slug }: { slug: string }) {
  const [order, setOrder] = useState<Order>(2);
  const [n, setN] = useState(0);
  const [seen, setSeen] = useState<Record<Order, number>>({ 1: 0, 2: 0 });

  const other: Order = order === 2 ? 1 : 2;
  // v4: a trace of the rate (vs start) after each halving the learner has reached, per order.
  // The reveal quotes this trace, so every rate it names is still on the stage.
  const rateRow = (o: Order) =>
    seen[o] > 0 ? Array.from({ length: seen[o] }, (_, i) => rate(o, i + 1)).join(" → ") : "—";
  const waitRow = (o: Order) =>
    seen[o] > 0 ? `${Array.from({ length: seen[o] }, (_, i) => wait(o, i + 1)).join(", ")} min` : "—";
  const brackets = Array.from({ length: n }, (_, i) => i + 1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Half-life is the time for the amount to halve. In a second-order reaction (molecules must meet in pairs) it takes ${wait(2, 1)} min to go from ${A0} to ${A0 / 2} mmol/L. From ${A0 / 2} to ${A0 / 4} mmol/L it takes about…`,
        options: [`${wait(2, 1) / 2} min`, `${wait(2, 1)} min`, `${WAIT2} min`],
        answer: 2,
      }}
      exploreHint="In 2nd order, step to one halving, then two. Then switch to 1st order. Watch the rate."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Your 2nd-order waits row reads <strong>{waitRow(2)}</strong>: each half takes twice as long as the
            last. Your 1st-order waits row reads <strong>{waitRow(1)}</strong>: the same {T_HALF1} min every time.
          </p>
          <p>
            A second-order reaction needs two reactant molecules to meet, so halving the crowd makes meetings four
            times rarer: your 2nd-order rate row (vs the start) reads <strong>{rate(2, 1)}</strong> after one halving and{" "}
            <strong>{rate(2, 2)}</strong> after two. As the line under it said, each halving leaves half as much to lose at a quarter of the rate, so the
            wait doubles. In 1st order the rate only halved ({rateRow(1)}), so the wait stayed the same. Radioactive decay is first
            order: one fixed half-life.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const check = (o: Order, k: number) => {
              setSeen((p) => ({ ...p, [o]: Math.max(p[o], k) }));
              if (o === 2 && k === 1) reach("second-once");
              if (k >= 2) reach(o === 2 ? "second-twice" : "first-twice");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`${name(order)}: after ${n} halvings, ${timeTo(order, n)} minutes`}
                >
                  {[0, 20, 40, 80].map((c) => (
                    <g key={c}>
                      <line x1={L} x2={W - R} y1={Y(c)} y2={Y(c)} className={s.grid} />
                      <text x={L - 4} y={Y(c) + 3} textAnchor="end" className={s.small}>
                        {c}
                      </text>
                    </g>
                  ))}
                  <text x={L - 4} y={TOP + 15} textAnchor="end" className={s.small}>
                    mmol/L
                  </text>
                  {[0, 20, 40, 60].map((t) => (
                    <text key={t} x={X(t)} y={BASE + 13} textAnchor="middle" className={s.small}>
                      {t}
                    </text>
                  ))}
                  <text x={W - R} y={BASE + 26} textAnchor="end" className={s.small}>
                    time, min
                  </text>
                  {seen[other] > 0 && <path d={path(other, seen[other])} className={s.ghost} />}
                  {n > 0 && <path d={path(order, n)} className={s.curve} />}
                  {brackets.map((k) => {
                    const x0 = X(timeTo(order, k - 1));
                    const x1 = X(timeTo(order, k));
                    const y = BASE + 40;
                    return (
                      <g key={k}>
                        <line x1={x0 + 5} x2={x1 - 5} y1={y} y2={y} className={k % 2 ? s.bar : s.bar2} />
                        <line x1={x1} x2={x1} y1={Y(conc(order, timeTo(order, k)))} y2={y} className={s.tick} />
                        <text x={(x0 + x1) / 2} y={y + 13} textAnchor="middle" className={s.label}>
                          {wait(order, k)}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx={X(timeTo(order, n))} cy={Y(A0 / Math.pow(2, n))} r={5} className={s.dot} />
                  <text x={W - R} y={TOP + 12} textAnchor="end" className={s.label}>
                    {name(order)}
                  </text>
                </svg>
                <Slider
                  label="Halvings waited"
                  value={n}
                  min={0}
                  max={MAXN}
                  disabled={locked}
                  format={(v) => `${v} (${A0 / Math.pow(2, v)} mmol/L)`}
                  onChange={(v) => {
                    setN(v);
                    check(order, v);
                  }}
                />
                <Row>
                  {([2, 1] as Order[]).map((o) => (
                    <Control
                      key={o}
                      className={order === o ? "active" : ""}
                      disabled={locked || order === o}
                      onClick={() => {
                        setOrder(o);
                        check(o, n);
                      }}
                    >
                      {btn(o)}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="2nd-order waits" value={waitRow(2)} />
                  <Readout label="2nd-order rate vs start" value={rateRow(2)} />
                </Row>
                <Row>
                  <Readout label="1st-order waits" value={waitRow(1)} />
                  <Readout label="1st-order rate vs start" value={rateRow(1)} />
                </Row>
                <p className={s.why} aria-live="polite">
                  {locked
                    ? " "
                    : n === 0
                      ? "Step to a halving to compare waits."
                      : order === 2
                        ? "Each halving: ½ as much left to lose, at ¼ the rate → 2× the wait."
                        : "Each halving: ½ as much left to lose, at ½ the rate → same wait."}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
