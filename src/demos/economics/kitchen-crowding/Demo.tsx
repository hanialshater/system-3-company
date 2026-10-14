"use client";

// Diminishing returns in a small kitchen. One stacked bar: each block is what one more worker
// adds to pizzas per hour (10, 8, 6, 4, 2, then 0). The dashed outline is the "four workers make
// four times as much" guess (10 per worker). Key state: 4 workers, 28 an hour against the 40 outline.
// Made-up increments, labelled as a model: one oven, one counter, nothing else changes.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FIRST = 10;
const DROP = 2;
const Q_N = 4;
const N_MAX = 8;
const START = 2;
const MILESTONES = ["four-workers", "tops-out"] as const;

/** Pizzas an hour added by worker k (k = 1, 2, …). */
const adds = (k: number) => Math.max(0, FIRST - DROP * (k - 1));
const totalOf = (n: number) => Array.from({ length: n }, (_, i) => adds(i + 1)).reduce((a, b) => a + b, 0);
const PEAK = totalOf(N_MAX); // 30
const PEAK_AT = Array.from({ length: N_MAX }, (_, i) => i + 1).find((n) => totalOf(n) === PEAK)!; // 5
const ANSWER = totalOf(Q_N); // 28

// Plot geometry (viewBox 320 × 200): pizzas an hour 0..80 up.
const BOT = 186;
const TOP = 14;
const VMAX = FIRST * Q_N + 4; // the 4-worker guess fits; bigger guesses are clipped at the top
const BX = 112;
const BW = 86;
const py = (v: number) => BOT - (Math.min(v, VMAX) / VMAX) * (BOT - TOP);

function Stage({ ctx, n, setN, onSee }: { ctx: StageContext; n: number; setN: (n: number) => void; onSee: (n: number) => void }) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);
  const set = (v: number) => {
    const k = Math.max(1, Math.min(N_MAX, v));
    setN(k);
    onSee(k);
    if (k === Q_N) reach("four-workers");
    if (k > PEAK_AT) reach("tops-out");
  };
  const total = totalOf(n);
  const naive = FIRST * n;
  const last = adds(n);

  let acc = 0;
  const blocks = Array.from({ length: n }, (_, i) => {
    const a = adds(i + 1);
    const y0 = acc;
    acc += a;
    return { k: i + 1, a, y0, y1: acc };
  });

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Model: one oven, made-up numbers</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "Pizzas an hour" : `${n} workers make ${total} pizzas an hour`}>
        <line x1={60} y1={BOT} x2={270} y2={BOT} stroke="var(--line)" />
        {!locked && (
          <>
            <rect x={BX} y={py(naive)} width={BW} height={BOT - py(naive)} className={s.ghostFill} />
            <text x={BX - 6} y={py(naive) + 4} textAnchor="end" className={s.axis}>
              {n} × {FIRST} = {naive}
            </text>
            {blocks.map((b) =>
              b.a > 0 ? (
                <g key={b.k}>
                  <rect x={BX} y={py(b.y1)} width={BW} height={py(b.y0) - py(b.y1) - 1} rx={2} className={b.k === n ? s.main : s.soft} />
                  {py(b.y0) - py(b.y1) >= 14 && (
                    <text x={BX + BW / 2} y={(py(b.y0) + py(b.y1)) / 2 + 4} textAnchor="middle" className={s.value}>
                      +{b.a}
                    </text>
                  )}
                </g>
              ) : null,
            )}
            <text x={BX + BW + 8} y={py(total) + 5} className={s.big}>
              {total}
            </text>
          </>
        )}
        {locked && (
          <text x={BX + BW / 2} y={BOT - 10} textAnchor="middle" className={s.big}>
            ?
          </text>
        )}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked ? "Lock in a guess to start." : last === 0 ? `Worker ${n} adds nothing.` : `Worker ${n} adds ${last}.`}
      </p>

      <Row>
        <Slider label="Workers" value={n} min={1} max={N_MAX} disabled={locked} onChange={set} />
        <Readout label="Pizzas an hour" value={locked ? "?" : total} />
      </Row>
      <Row>
        <Control className={s.tile} disabled={locked || n >= N_MAX} onClick={() => set(N_MAX)}>
          Fill the kitchen
        </Control>
        <Control className={s.tile} disabled={locked || n >= N_MAX} onClick={() => set(n + 1)}>
          Add a worker
        </Control>
        <Control className={s.tile} disabled={locked || n <= 1} onClick={() => set(n - 1)}>
          Remove one
        </Control>
      </Row>
    </div>
  );
}

export default function KitchenCrowding({ slug }: { slug: string }) {
  const [n, setN] = useState(START);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `One worker in a small kitchen with one oven makes ${FIRST} pizzas an hour. How many pizzas an hour do ${Q_N} workers make together?`,
        options: [`${FIRST * Q_N}`, `${ANSWER}`, `${FIRST * 2}`],
        answer: 1,
      }}
      exploreHint={`Set ${Q_N} workers, then fill the kitchen.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {Q_N} workers made <strong>{ANSWER}</strong> pizzas an hour ({adds(1)} + {adds(2)} + {adds(3)} + {adds(4)}), not the{" "}
            {FIRST * Q_N} in the dashed outline. In this model each added worker adds 2 fewer than the one before.
          </p>
          <p>
            The oven and the counter stay the same size, so each new worker shares them with more people and adds less.
            {` You saw worker ${PEAK_AT + 1} add nothing: the kitchen tops out at ${PEAK} an hour.`}{" "}
            That is diminishing returns: when one input is fixed, adding more of another helps less and less.
          </p>
          <p className="muted">A model with made-up numbers. Real kitchens differ, but the fixed oven is the reason.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} n={n} setN={setN} onSee={() => {}} />}
    </Lesson>
  );
}
