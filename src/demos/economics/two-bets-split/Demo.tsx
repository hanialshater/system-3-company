"use client";

// Splitting money across independent bets. Each bet returns +20% or −10% with equal chance;
// money is split equally across n bets. One histogram of the exact outcome chances (binomial,
// no randomness): losing bars red. The average stays +5% at every n; with 2 bets a loss needs
// both to fall (25%). Key state: n = 2. The chance of any loss does not fall at every step
// (4 bets: 31%), but the worst case shrinks: 1/2^n. Model: independent bets, made-up numbers.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const UP = 20;
const DOWN = -10;
const N_MAX = 6;
const Q_N = 2;
const MILESTONES = ["two-bets"] as const;

const choose = (n: number, k: number) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};
/** Outcomes (percent return) and their chances when split equally across n independent bets. */
const outcomes = (n: number) =>
  Array.from({ length: n + 1 }, (_, k) => ({ r: (k * UP + (n - k) * DOWN) / n, p: choose(n, k) / 2 ** n }));
const lossChance = (n: number) => outcomes(n).filter((o) => o.r < 0).reduce((a, o) => a + o.p, 0);
const average = (n: number) => outcomes(n).reduce((a, o) => a + o.r * o.p, 0);
const AVG = average(1); // 5
const pct = (p: number) => `${Math.round(p * 1000) / 10}%`;
const ret = (r: number) => `${r > 0 ? "+" : r < 0 ? "−" : ""}${Math.abs(Math.round(r * 10) / 10)}%`;

// Plot geometry (viewBox 320 × 200): return −10%..+20% across, chance 0..50% up.
const L = 26;
const R = 300;
const TOP = 26;
const BOT = 170;
const px = (r: number) => L + ((r - DOWN) / (UP - DOWN)) * (R - L);
const py = (p: number) => BOT - (p / 0.5) * (BOT - TOP);
const BW = 22;

function Stage({ ctx, n: chosen, setN }: { ctx: StageContext; n: number; setN: (n: number) => void }) {
  const { locked, interact, phase } = ctx;
  // At the reveal the stage pins the 2-bet chart, the state the reveal explains, so its 25% is on screen.
  const pinned = phase === "reveal";
  const n = pinned ? Q_N : chosen;
  const { reach } = useMilestones(interact, MILESTONES);
  const set = (v: number) => {
    setN(v);
    if (v === Q_N) reach("two-bets");
  };
  const os = outcomes(n);
  // Ticks under every bar, plus 0% when no bar sits near it.
  const ticks = os.map((o) => o.r);
  if (!ticks.some((r) => Math.abs(r) < 4)) ticks.push(0);

  return (
    <div className={s.wrap}>
      <p className={s.chip}>{pinned ? "Showing 2 bets, as the answer explains" : "Model: independent coin-flip bets"}</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "Chances of each result" : `${n} bets: chance of a loss ${pct(lossChance(n))}`}>
        <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
        {ticks.map((r) => (
          <text key={r} x={px(r)} y={BOT + 14} textAnchor="middle" className={s.axis}>
            {ret(r)}
          </text>
        ))}
        <line x1={px(0)} y1={TOP - 6} x2={px(0)} y2={BOT} stroke="var(--line)" />
        {!locked &&
          os.map((o) => (
            <g key={o.r}>
              <rect
                x={px(o.r) - BW / 2}
                y={py(o.p)}
                width={BW}
                height={BOT - py(o.p)}
                rx={2}
                className={o.r < 0 ? s.badFill : o.r === 0 ? s.ghostFill : s.main}
              />
              <text x={px(o.r)} y={py(o.p) - 4} textAnchor="middle" className={s.value}>
                {pct(o.p)}
              </text>
              {o.r === 0 && (
                <text x={px(o.r)} y={py(o.p) - 17} textAnchor="middle" className={s.axis}>
                  break even
                </text>
              )}
            </g>
          ))}
        <line x1={px(AVG)} y1={TOP - 14} x2={px(AVG)} y2={BOT} className={s.ghost} />
        <text x={px(AVG) + 4} y={TOP - 16} className={s.axis}>
          average {ret(AVG)}
        </text>
      </svg>

      <Row>
        <Slider label="Bets the money is split across" value={n} min={1} max={N_MAX} disabled={locked || pinned} onChange={set} />
      </Row>
      <Row>
        <Readout label="Chance of a loss" value={locked ? "?" : pct(lossChance(n))} />
        <Readout label="Average" value={locked ? "?" : ret(average(n))} />
        <Readout label="Worst result" value={locked ? "?" : ret(DOWN)} />
        <Readout label="Chance of it" value={locked ? "?" : pct(0.5 ** n)} />
      </Row>
    </div>
  );
}

export default function TwoBetsSplit({ slug }: { slug: string }) {
  const [n, setN] = useState(1);
  const [seen, setSeen] = useState<number[]>([]);
  const visit = (v: number) => {
    setN(v);
    setSeen((x) => (x.includes(v) ? x : [...x, v]));
  };
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Each of two independent bets pays +${UP}% or ${ret(DOWN)} with equal chance. You put half your money in each. What is the chance you lose money?`,
        options: ["50%", pct(lossChance(Q_N)), "0%"],
        answer: 1,
      }}
      exploreHint="Split across 2 bets. Then keep adding bets and watch the red."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            On the stage now, two bets: you lose only if <strong>both</strong> fall: ½ × ½ = <strong>{pct(lossChance(Q_N))}</strong>.
            Half the time one rises and one falls, for {ret(outcomes(2)[1].r)}. The average stayed {ret(AVG)}, as with one bet.
          </p>
          <p>
            Independent bets partly cancel. As you split further, the bars bunch around {ret(AVG)} and the worst case,
            every bet falling, gets rarer: 50%, 25%, 12.5%… The chance of some loss does not fall at every step
            {seen.includes(4)
              ? ` (with 4 bets it is ${pct(lossChance(4))})`
              : " (try 4 bets: it goes back up)"}
            , but the worst case, every bet falling, gets rarer at every step.
          </p>
          <p className="muted">A model: truly independent bets, made-up numbers. Real investments often fall together. Not advice.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} n={n} setN={visit} />}
    </Lesson>
  );
}
