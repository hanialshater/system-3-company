"use client";

// Market selection. Two bettors in one pari-mutuel pool on one horse that truly wins 60% of races.
// Each bets all their money every race, split by belief (60/40 and 50/50); winners share the whole
// pool in proportion to their stakes (no fees). One picture: the 60% bettor's share of all the money
// over races, for five seeded runs (mulberry32 seeds 2211 to 2215, consecutive, not picked; the
// brief fixed them). The selected run is bold. Key state: a run reached race 500, and a run where the
// 50% bettor led after race 50 has been looked at (runs 2 and 5).
// Draw order: one rng() per race, win if rng() < 0.6.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const TRUE_P = 0.6;
const BELIEF_A = 0.6; // accurate bettor
const BELIEF_B = 0.5;
const RACES = 500;
const STEP = 50;
const SEEDS = [2211, 2212, 2213, 2214, 2215];
const LUCK_AFTER = 50;
const MILESTONES = ["full-run", "luck-run"] as const;

/** Share of all money held by the accurate bettor after each race (index 0 = start). */
function run(seed: number): number[] {
  const rng = mulberry32(seed);
  const share = [0.5];
  let a = 0.5;
  for (let t = 1; t <= RACES; t++) {
    const win = rng() < TRUE_P;
    const stakeA = (win ? BELIEF_A : 1 - BELIEF_A) * a;
    const stakeB = (win ? BELIEF_B : 1 - BELIEF_B) * (1 - a);
    a = stakeA / (stakeA + stakeB); // winners split the whole pool by stake
    share.push(a);
  }
  return share;
}

const RUNS = SEEDS.map(run);
/** Did the 50% bettor hold more than half at some race after LUCK_AFTER, up to race t? */
const luckLed = (r: number, t: number) => RUNS[r].some((v, i) => i > LUCK_AFTER && i <= t && v < 0.5);
const WIN_X = BELIEF_A / BELIEF_B; // 1.2
const LOSS_X = (1 - BELIEF_A) / (1 - BELIEF_B); // 0.8
const pct = (v: number) => (v > 0.9995 ? "over 99.9%" : `${(v * 100).toFixed(1)}%`);
const FINALS = RUNS.map((r) => r[RACES]);
const LOW_FINAL = Math.min(...FINALS);
const QUOTE_RUN = 1; // run 2 (seed 2212): the reveal quotes race 200
const QUOTE_T = 200;

// Chart geometry (viewBox 340 × 196).
const X0 = 38;
const X1 = 330;
const Y0 = 10;
const Y1 = 170;
const x = (t: number) => X0 + (t / RACES) * (X1 - X0);
const y = (v: number) => Y1 - v * (Y1 - Y0);
const pts = (r: number[], t: number) =>
  r
    .slice(0, t + 1)
    .map((v, i) => (i % 5 === 0 || i === t ? `${x(i).toFixed(1)},${y(v).toFixed(1)}` : ""))
    .filter(Boolean)
    .join(" ");

export default function AccurateBettorTakesThePot({ slug }: { slug: string }) {
  const [t, setT] = useState(0);
  const [sel, setSel] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A horse truly wins ${TRUE_P * 100}% of races. One bettor believes ${BELIEF_A * 100}%, another ${BELIEF_B * 100}%; equal money. After ${RACES} races, who holds most of it?`,
        options: ["About equal", `The ${BELIEF_A * 100}% bettor`, `The ${BELIEF_B * 100}% bettor`],
        answer: 1,
      }}
      exploreHint={`Run the races to ${RACES}, then look at a run that dipped below the dashed line.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In all five runs the {BELIEF_A * 100}% bettor ended with at least <strong>{pct(LOW_FINAL)}</strong> of the money. But luck
            can lead for a long time: in run {QUOTE_RUN + 1} the {BELIEF_B * 100}% bettor held {pct(1 - RUNS[QUOTE_RUN][QUOTE_T])} at
            race {QUOTE_T}.
          </p>
          <p>
            Each win multiplied the ratio of their money by {WIN_X.toFixed(1)}, each loss by {LOSS_X.toFixed(1)}. Three wins and two
            losses, the true mix, multiply it by {(WIN_X ** 3 * LOSS_X ** 2).toFixed(2)}: a small edge that compounds. As money moves to
            the better belief, the pool&apos;s odds move toward the true {TRUE_P * 100}%.
          </p>
          <p className="muted">A simplified model: two bettors, no fees, everyone bets everything each race.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (nt: number, ns: number) => {
              if (nt >= RACES) reach("full-run");
              if (luckLed(ns, nt)) reach("luck-run");
            };
            const go = (nt: number) => {
              setT(nt);
              check(nt, sel);
            };
            const pick = (r: number) => {
              setSel(r);
              check(t, r);
            };
            const now = locked ? 0 : t;
            const share = RUNS[sel][now];
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: each bets everything, split by belief · 5 seeded runs</p>
                <p className={s.msg}>
                  {locked ? "Predict first." : `Win: money ratio ×${WIN_X.toFixed(1)}. Loss: ×${LOSS_X.toFixed(1)}.`}
                </p>
                <svg viewBox="0 0 340 196" className="stage-svg" role="img" aria-label={`Share of the money held by the ${BELIEF_A * 100}% bettor over ${now} races`}>
                  {[0, 0.5, 1].map((v) => (
                    <g key={v}>
                      <line x1={X0} y1={y(v)} x2={X1} y2={y(v)} className={v === 0.5 ? s.half : s.grid} />
                      <text x={X0 - 4} y={y(v) + 4} textAnchor="end" className={s.label}>
                        {v * 100}%
                      </text>
                    </g>
                  ))}
                  <text x={X0} y={188} className={s.label}>
                    race 0
                  </text>
                  <text x={X1} y={188} textAnchor="end" className={s.label}>
                    race {RACES}
                  </text>
                  <text x={(X0 + X1) / 2} y={188} textAnchor="middle" className={s.label}>
                    line: {BELIEF_A * 100}% bettor&apos;s share
                  </text>
                  {now > 0 && RUNS.map((r, i) => (i === sel ? null : <polyline key={i} points={pts(r, now)} className={s.run} />))}
                  {now > 0 && <polyline points={pts(RUNS[sel], now)} className={s.runOn} />}
                  <circle cx={x(now)} cy={y(share)} r={4.5} className={s.dot} />
                </svg>
                <Row>
                  <Control disabled={locked || t >= RACES} onClick={() => go(Math.min(RACES, t + STEP))}>
                    +{STEP} races
                  </Control>
                  <Control disabled={locked || t >= RACES} onClick={() => go(RACES)}>
                    Run to {RACES}
                  </Control>
                </Row>
                <Row>
                  {SEEDS.map((seed, i) => (
                    <Control
                      key={seed}
                      className={sel === i ? "active" : ""}
                      disabled={locked || sel === i}
                      aria-pressed={sel === i}
                      aria-label={`Run ${i + 1}, seed ${seed}`}
                      onClick={() => pick(i)}
                    >
                      Run {i + 1}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Race" value={locked ? "?" : now} />
                  <Readout label={`${BELIEF_A * 100}% bettor holds`} value={locked ? "?" : pct(share)} />
                  <Readout label="Pool's win odds" value={locked ? "?" : `${((BELIEF_A * share + BELIEF_B * (1 - share)) * 100).toFixed(1)}%`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
