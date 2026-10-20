"use client";

// A shuffle that looks fair and is not. "Swap each position with any of the 3" has 27 equally
// likely runs, and 27 cannot split evenly over 6 orders: three orders get 5 runs, three get 4.
// "Swap only with a card not yet placed" (Fisher-Yates) has 3 x 2 x 1 = 6 runs, one per order.
// No randomness: the stage steps through every run in order. One chart: share of runs per order,
// both methods side by side, against the fair 1-in-6 line.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import s from "./styles.module.css";

const ORDERS = ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"];
type Run = { picks: number[]; order: string };

function apply(picks: number[]) {
  const x = ["A", "B", "C"];
  picks.forEach((p, i) => {
    [x[i], x[p]] = [x[p], x[i]];
  });
  return x.join("");
}
// Every equally likely run of each method, in counting order.
const ANY: Run[] = [];
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) ANY.push({ picks: [a, b, c], order: apply([a, b, c]) });
const FAIR: Run[] = [];
for (let a = 0; a < 3; a++) for (let b = 1; b < 3; b++) FAIR.push({ picks: [a, b, 2], order: apply([a, b, 2]) });

const METHODS = {
  any: { runs: ANY, name: "Swap with any position", color: "var(--bad)" },
  fair: { runs: FAIR, name: "Swap only with an unplaced card", color: "var(--good)" },
} as const;
type M = keyof typeof METHODS;

const X0 = 30;
const GW = 48;
const BASE = 118;
const SCALE = 420; // px per 1.0 share

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

export default function FairShuffleTrap({ slug }: { slug: string }) {
  const [done, setDone] = useState<Record<M, number>>({ any: 0, fair: 0 });
  const [last, setLast] = useState<{ m: M; k: number } | null>(null);

  const tally = (m: M) => ORDERS.map((o) => METHODS[m].runs.slice(0, done[m]).filter((r) => r.order === o).length);
  const ta = tally("any");
  const tf = tally("fair");
  const lastRun = last ? METHODS[last.m].runs[last.k] : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your card app shuffles A B C: for each position, it swaps that card with any of the 3 positions. That is 27 equally likely runs. Is every order equally likely?",
        options: ["Yes", "No, some orders come up more", "Only if you repeat it"],
        answer: 1,
      }}
      exploreHint="Run all 27 runs of the first shuffle, then all runs of the second."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In the 27 runs, ACB, BAC and BCA each came up <strong>5</strong> times; ABC, CAB and CBA only 4. Those three
            orders are 25% more likely than the others.
          </p>
          <p>
            It could not have been fair: 27 runs cannot split evenly over 6 orders, because 27 is not a multiple of 6.
            Swapping only with a card not yet placed has 3 × 2 × 1 = 6 runs, exactly one per order. That is the
            Fisher–Yates shuffle.
          </p>
          <p className="muted">A fair shuffle needs a number of equally likely runs that the orders divide evenly.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const step = (m: M) => {
          if (locked) return;
          const total = METHODS[m].runs.length;
          if (done[m] >= total) return;
          const k = done[m];
          setDone({ ...done, [m]: k + 1 });
          setLast({ m, k });
          if (k + 1 === total) interact();
        };
        const all = (m: M) => {
          if (locked) return;
          const total = METHODS[m].runs.length;
          if (done[m] >= total) return;
          setDone({ ...done, [m]: total });
          setLast({ m, k: total - 1 });
          interact();
        };

        const msg = locked
          ? "Make a prediction to start."
          : lastRun && last
            ? `Run ${last.k + 1} of ${METHODS[last.m].runs.length}: swaps ${lastRun.picks.map((p, i) => `${i + 1}↔${p + 1}`).join(", ")} → ${lastRun.order}`
            : "Each run swaps position 1, then 2, then 3.";

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>
            <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label="Share of runs giving each order, for both methods">
              <line x1={X0 - 4} x2={316} y1={BASE - SCALE / 6} y2={BASE - SCALE / 6} stroke="var(--fg)" strokeDasharray="4 3" strokeWidth={1} />
              {ORDERS.map((o, i) => {
                const ha = done.any ? (ta[i] / ANY.length) * SCALE : 0;
                const hf = done.fair ? (tf[i] / FAIR.length) * SCALE : 0;
                const x = X0 + i * GW;
                return (
                  <g key={o}>
                    <rect x={x + 4} y={BASE - ha} width={18} height={ha} rx={2} fill={METHODS.any.color} />
                    <rect x={x + 24} y={BASE - hf} width={18} height={hf} rx={2} fill={METHODS.fair.color} />
                    {done.any > 0 && (
                      <text x={x + 13} y={BASE - 5} textAnchor="middle" className={s.num}>
                        {ta[i]}
                      </text>
                    )}
                    {done.fair > 0 && (
                      <text x={x + 33} y={BASE - 5} textAnchor="middle" className={s.num}>
                        {tf[i]}
                      </text>
                    )}
                    <text x={x + 23} y={BASE + 14} textAnchor="middle" className={`${s.order} ${lastRun?.order === o ? s.hot : ""}`}>
                      {o}
                    </text>
                  </g>
                );
              })}
              <line x1={X0 - 4} x2={316} y1={BASE} y2={BASE} stroke="var(--line)" />
              <text x={X0 - 6} y={BASE - SCALE / 6 - 2} textAnchor="end" className={s.axis}>
                fair
              </text>
              <text x={X0 - 6} y={BASE - SCALE / 6 + 8} textAnchor="end" className={s.axis}>
                1 in 6
              </text>
              <text x={X0} y={BASE + 30} className={s.axis}>
                share of runs ending in each order (number = runs)
              </text>
            </svg>
            {(["any", "fair"] as const).map((m) => (
              <div key={m} className={s.method}>
                <span className={s.swatch} style={{ background: METHODS[m].color }} />
                <span className={s.name}>
                  {METHODS[m].name}
                  <span className="muted small">
                    {" "}
                    {done[m]} of {METHODS[m].runs.length} runs
                    {done[m] === METHODS[m].runs.length ? ` · ${pct(Math.max(...tally(m)) / METHODS[m].runs.length)} top` : ""}
                  </span>
                </span>
                <Control disabled={locked || done[m] >= METHODS[m].runs.length} aria-label={`One run: ${METHODS[m].name}`} onClick={() => step(m)}>
                  1 run
                </Control>
                <Control className="active" disabled={locked || done[m] >= METHODS[m].runs.length} aria-label={`All runs: ${METHODS[m].name}`} onClick={() => all(m)}>
                  All {METHODS[m].runs.length}
                </Control>
              </div>
            ))}
          </div>
        );
      }}
    </Lesson>
  );
}
