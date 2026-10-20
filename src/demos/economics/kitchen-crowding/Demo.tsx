"use client";

// Diminishing returns in a small kitchen. One stacked bar: each block is what one more worker
// adds to pizzas per hour. The dashed outline is the "four workers make four times as much" guess
// (10 per worker). The oven (the fixed input) is drawn beside the bar with the cooks crowding it.
// Made-up model: the k-th cook at an oven adds 10, 8, 6, 4, 2, then 0 (2 fewer each, because they
// share that oven with one more person). A second oven splits the cooks between two ovens.
// Key states: 4 workers with one oven (28 against the 40 outline); past 5 workers (adds nothing);
// a second oven (more per worker again, because fewer share each oven).

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
const MILESTONES = ["four-workers", "tops-out", "second-oven"] as const;

/** Pizzas an hour added by worker k (k = 1, 2, …), with cooks split evenly across the ovens. */
const adds = (k: number, ovens = 1) => Math.max(0, FIRST - DROP * (Math.ceil(k / ovens) - 1));
const totalOf = (n: number, ovens = 1) => Array.from({ length: n }, (_, i) => adds(i + 1, ovens)).reduce((a, b) => a + b, 0);
const PEAK = totalOf(N_MAX); // 30
const PEAK_AT = Array.from({ length: N_MAX }, (_, i) => i + 1).find((n) => totalOf(n) === PEAK)!; // 5
const ANSWER = totalOf(Q_N); // 28

// Plot geometry (viewBox 320 × 200).
const BOT = 186;
const TOP = 14;
const VMAX = 60; // fits two ovens and 8 cooks (56); the 80 guess is clipped at the top
const BX = 92;
const BW = 80;
const py = (v: number) => BOT - (Math.min(v, VMAX) / VMAX) * (BOT - TOP);
// Oven area, right of the bar.
const OX = 236;
const OW = 36;

type Seen = { zero: number; two: { n: number; total: number } | null };

function Stage({ ctx, onSeen }: { ctx: StageContext; onSeen: (f: (s: Seen) => Seen) => void }) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);
  const [n, setN] = useState(START);
  const [ovens, setOvens] = useState(1);
  const look = (k: number, o: number) => {
    setN(k);
    setOvens(o);
    if (o === 1 && k === Q_N) reach("four-workers");
    if (o === 1 && k > PEAK_AT) {
      onSeen((x) => ({ ...x, zero: Math.max(x.zero, k) })); // highest such worker set
      reach("tops-out");
    }
    if (o === 2) {
      // Quote a two-oven state only when the second oven actually helps (2 or more workers).
      if (totalOf(k, 2) > totalOf(k, 1)) onSeen((x) => ({ ...x, two: { n: k, total: totalOf(k, 2) } }));
      reach("second-oven");
    }
  };
  const set = (v: number) => look(Math.max(1, Math.min(N_MAX, v)), ovens);
  const total = totalOf(n, ovens);
  const naive = FIRST * n;
  const last = adds(n, ovens);
  const share = Math.ceil(n / ovens);

  let acc = 0;
  const blocks = Array.from({ length: n }, (_, i) => {
    const a = adds(i + 1, ovens);
    const y0 = acc;
    acc += a;
    return { k: i + 1, a, y0, y1: acc };
  });

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Model: made-up numbers</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "Pizzas an hour" : `${n} workers, ${ovens} oven${ovens > 1 ? "s" : ""}: ${total} pizzas an hour`}>
        <line x1={40} y1={BOT} x2={316} y2={BOT} stroke="var(--line)" />
        {!locked && (
          <>
            <rect x={BX} y={py(naive)} width={BW} height={BOT - py(naive)} className={s.ghostFill} />
            <text x={BX - 6} y={py(naive) + 4} textAnchor="end" className={s.axis}>
              {n} × {FIRST} = {naive}
            </text>
            {blocks.map((b) => {
              if (b.a === 0) return null;
              const h = py(b.y0) - py(b.y1);
              return (
                <g key={b.k}>
                  <rect x={BX} y={py(b.y1)} width={BW} height={h - 1} rx={2} className={b.k === n ? s.main : s.soft} />
                  <text
                    x={h >= 14 ? BX + BW / 2 : BX - 6}
                    y={h >= 14 ? (py(b.y0) + py(b.y1)) / 2 + 4 : (py(b.y0) + py(b.y1)) / 2 + 4}
                    textAnchor={h >= 14 ? "middle" : "end"}
                    className={h >= 14 ? s.value : s.axis}
                  >
                    +{b.a}
                  </text>
                </g>
              );
            })}
            <text x={BX + BW + 6} y={py(total) + 5} className={s.big}>
              {total}
            </text>
          </>
        )}
        {locked && (
          <text x={BX + BW / 2} y={BOT - 10} textAnchor="middle" className={s.big}>
            ?
          </text>
        )}
        {/* The fixed input: the oven(s), with the cooks who share each one. */}
        {Array.from({ length: ovens }, (_, o) => {
          const x = OX + o * (OW + 6) - (ovens - 1) * 21;
          const cooks = locked ? 1 : Array.from({ length: n }, (_, i) => i).filter((i) => i % ovens === o).length;
          return (
            <g key={o}>
              <rect x={x} y={BOT - 30} width={OW} height={30} rx={3} className={s.oven} />
              <rect x={x + 6} y={BOT - 22} width={OW - 12} height={14} rx={2} className={s.ovenDoor} />
              <text x={x + OW / 2} y={BOT - 34} textAnchor="middle" className={s.axis}>
                oven
              </text>
              {Array.from({ length: cooks }, (_, c) => (
                <circle key={c} cx={x + 5 + (c % 4) * 8.5} cy={BOT - 50 - Math.floor(c / 4) * 10} r={3.6} className={c === cooks - 1 && !locked && (n - 1) % ovens === o ? s.cookNew : s.cook} />
              ))}
            </g>
          );
        })}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked
          ? "Lock in a guess to start."
          : `Worker ${n} adds ${last === 0 ? "nothing" : last}: ${share} cook${share > 1 ? "s" : ""} share ${ovens === 1 ? "the" : "each"} oven.`}
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
      <Row>
        <Control className={s.tile} disabled={locked} onClick={() => look(n, ovens === 1 ? 2 : 1)}>
          {ovens === 1 ? "Add a second oven" : "Back to one oven"}
        </Control>
      </Row>
    </div>
  );
}

export default function KitchenCrowding({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<Seen>({ zero: 0, two: null });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In your small pizza kitchen with one oven, one worker makes ${FIRST} pizzas an hour. If ${Q_N} workers share the kitchen, how many pizzas an hour do they make together?`,
        options: [`${FIRST * Q_N}`, `Fewer than ${FIRST * Q_N}`, `More than ${FIRST * Q_N}`],
        answer: 1,
      }}
      exploreHint={`Set ${Q_N} workers, fill the kitchen, then add a second oven.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {Q_N} workers made <strong>{ANSWER}</strong> pizzas an hour ({adds(1)} + {adds(2)} + {adds(3)} + {adds(4)}), not the{" "}
            {FIRST * Q_N} in the dashed outline.
            {seen.zero ? ` You saw worker ${seen.zero} add nothing: with one oven the kitchen tops out at ${PEAK} an hour.` : ""}
          </p>
          <p>
            Each new cook crowds the same oven, so in this model each adds 2 fewer than the one before.
            {seen.two && seen.two.total > totalOf(seen.two.n, 1)
              ? ` When you added a second oven, ${seen.two.n} workers made ${seen.two.total} (one oven: ${totalOf(seen.two.n, 1)}): fewer cooks per oven, so each added more.`
              : ""}{" "}
            That is diminishing returns: when one input is fixed, adding more of another helps less and less.
          </p>
          <p className="muted">A model with made-up numbers. Real kitchens differ, but the fixed oven is the reason.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} onSeen={setSeen} />}
    </Lesson>
  );
}
