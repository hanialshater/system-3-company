"use client";

// Splitting money across bets. Each bet returns +20% or −10% with equal chance; money is split
// equally across n bets. One histogram of the exact outcome chances (binomial, no randomness):
// losing bars red. The average stays +5% at every n; with 2 independent bets a loss needs both to
// fall (25%). The chance of any loss does not fall at every step (4 bets: 31%), but the worst case
// shrinks: 1/2^n. Model: made-up numbers.
//
// v5 (wave E r6): independence is on stage. Two buttons switch the bets between moving
// independently and moving together; together, any split is one bet again (50% / 50%). The stage
// keeps a "seen" row of every state visited (n bets, independent or together, chance of a loss),
// and the reveal quotes that row, so the stage no longer pins itself to 2 bets at the reveal.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const UP = 20;
const DOWN = -10;
const N_MAX = 6;
const Q_N = 2;
const MILESTONES = ["two-bets", "together"] as const;
type Mode = "indep" | "together";

const choose = (n: number, k: number) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};
/** Outcomes (percent return) and their chances when split equally across n bets. */
const outcomes = (n: number, mode: Mode = "indep") =>
  mode === "together" || n === 1
    ? [
        { r: DOWN, p: 0.5 },
        { r: UP, p: 0.5 },
      ]
    : Array.from({ length: n + 1 }, (_, k) => ({ r: (k * UP + (n - k) * DOWN) / n, p: choose(n, k) / 2 ** n }));
const lossChance = (n: number, mode: Mode = "indep") => outcomes(n, mode).filter((o) => o.r < 0).reduce((a, o) => a + o.p, 0);
const average = (n: number, mode: Mode = "indep") => outcomes(n, mode).reduce((a, o) => a + o.r * o.p, 0);
const AVG = average(1); // 5
const pct = (p: number) => `${Math.round(p * 1000) / 10}%`;
const ret = (r: number) => `${r > 0 ? "+" : r < 0 ? "−" : ""}${Math.abs(Math.round(r * 10) / 10)}%`;

type Seen = { n: number; mode: Mode };
const key = (v: Seen) => `${v.mode}${v.n}`;
const seenLabel = (v: Seen) => `${v.n} bet${v.n === 1 ? "" : "s"}${v.mode === "together" && v.n > 1 ? " together" : ""}: ${pct(lossChance(v.n, v.mode))}`;

// Plot geometry (viewBox 320 × 190): return −10%..+20% across, chance 0..50% up.
const L = 26;
const R = 300;
const TOP = 26;
const BOT = 170;
const px = (r: number) => L + ((r - DOWN) / (UP - DOWN)) * (R - L);
const py = (p: number) => BOT - (p / 0.5) * (BOT - TOP);
const BW = 22;

function Stage({
  ctx,
  n,
  mode,
  seen,
  go,
}: {
  ctx: StageContext;
  n: number;
  mode: Mode;
  seen: Seen[];
  go: (v: Seen) => void;
}) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);
  const set = (v: Seen) => {
    if (locked) return;
    go(v);
    if (v.n === Q_N && v.mode === "indep") reach("two-bets");
    if (v.n > 1 && v.mode === "together") reach("together");
  };
  const os = outcomes(n, mode);
  // Ticks under every bar, plus 0% when no bar sits near it.
  const ticks = os.map((o) => o.r);
  if (!ticks.some((r) => Math.abs(r) < 4)) ticks.push(0);

  return (
    <div className={s.wrap}>
      <p className={s.chip}>{mode === "together" ? "Made-up model: bets move together. Not advice." : "Made-up model: independent bets. Not advice."}</p>
      <svg
        viewBox="0 0 320 190"
        className="stage-svg"
        role="img"
        aria-label={locked ? "Chances of each result" : `${n} bets: chance of a loss ${pct(lossChance(n, mode))}`}
      >
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
        <Slider label="Bets split across" value={n} min={1} max={N_MAX} disabled={locked} onChange={(v) => set({ n: v, mode })} />
        <Readout label="Chance of a loss" value={locked ? "?" : pct(lossChance(n, mode))} />
      </Row>
      <Row>
        <Control className={mode === "together" ? "active" : ""} disabled={locked || mode === "together"} onClick={() => set({ n, mode: "together" })}>
          Together
        </Control>
        <Control className={mode === "indep" ? "active" : ""} disabled={locked || mode === "indep"} onClick={() => set({ n, mode: "indep" })}>
          Independent
        </Control>
        <Readout label="Average" value={locked ? "?" : ret(average(n, mode))} />
      </Row>
      <p className={s.msg}>{locked ? "" : `Seen: ${seen.map(seenLabel).join(" · ")}`}</p>
    </div>
  );
}

export default function TwoBetsSplit({ slug }: { slug: string }) {
  const [n, setN] = useState(1);
  const [mode, setMode] = useState<Mode>("indep");
  const [seen, setSeen] = useState<Seen[]>([{ n: 1, mode: "indep" }]);
  const go = (v: Seen) => {
    setN(v.n);
    setMode(v.mode);
    // one bet is the same either way, so record it once
    const rec = v.n === 1 ? { n: 1, mode: "indep" as Mode } : v;
    setSeen((xs) => (xs.some((x) => key(x) === key(rec)) ? xs : [...xs, rec]));
  };
  const together = seen.filter((x) => x.mode === "together");
  const indepSeen = (k: number) => seen.some((x) => x.mode === "indep" && x.n === k);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Each of two independent bets pays +${UP}% or ${ret(DOWN)} with equal chance. You put half your money in each. What is the chance you lose money?`,
        options: ["50%", pct(lossChance(Q_N)), "0%"],
        answer: 1,
      }}
      exploreHint="Split across 2 bets, then more. Then make the bets move together."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With two independent bets you lose only if <strong>both</strong> fall: ½ × ½ = <strong>{pct(lossChance(Q_N))}</strong>, as
            in the Seen row. Half the time one rises and one falls, for {ret(outcomes(2)[1].r)}. The average stayed {ret(AVG)}.
          </p>
          <p>
            Splitting further, the bars bunched around {ret(AVG)} and the worst case, every bet falling, got rarer.
            {indepSeen(4) ? ` (A loss at 4 bets: ${pct(lossChance(4))}, so not every step helps.)` : ""}
          </p>
          {together.length > 0 && (
            <p>
              Moving together, {together.map((x) => `${x.n} bets`).join(" and ")} lost {pct(lossChance(together[0].n, "together"))} of
              the time, like one bet. Splitting only cancels risk when the bets do not fall together.
            </p>
          )}
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} n={n} mode={mode} seen={seen} go={go} />}
    </Lesson>
  );
}
