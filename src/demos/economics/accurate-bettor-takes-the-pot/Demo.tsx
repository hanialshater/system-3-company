"use client";

// Market selection. Two bettors in one pari-mutuel pool on one horse that truly wins 60% of races.
// Each bets all their money every race, split by belief (60/40 and 50/50); winners share the whole
// pool in proportion to their stakes (no fees). One picture: the 60% bettor's share of all the money
// over races, for five seeded runs (mulberry32 seeds 2211 to 2215, consecutive, not picked; the
// brief fixed them). The selected run is bold. Key state: a run reached race 500, and a run where the
// 50% bettor led after race 50 has been looked at (runs 2 and 5).
// Draw order: one rng() per race, win if rng() < 0.6.
// v2: "1 race" steps a single race and the caption shows that race's multiply (win ×1.2 / loss ×0.8) on the money
// ratio readout; jumps show the wins and losses since the last press and their product. The low point of every run
// where the 50% bettor led after race 50 is circled and labelled with the 50% bettor's share; the reveal quotes the
// selected run's circle (or the first such run the learner opened), not a fixed race 200.
// v3 (learner r7): the quoted values also sit in a "Seen:" text row under the readouts (single race, the circle's
// run, share and race, the five finals, and the ×1.11 per five races), so they are on the stage outside the chart.
// Picking a run reports races 1–t for that run, so the caption's ratio equals the money ratio readout.
// v4 (learner r8, phone fit): shorter chart (viewBox 340 × 176); at the reveal the caption and the race-step row
// (all disabled at race 500) are hidden, so the chart with its circle sits above the reveal on a 390×844 phone.
// Run picker on one row, readouts on one row, reveal cut to 90 words.

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
const MILESTONES = ["one-race", "full-run", "luck-run"] as const;

const WINS: boolean[][] = [];
/** Share of all money held by the accurate bettor after each race (index 0 = start). */
function run(seed: number): number[] {
  const rng = mulberry32(seed);
  const share = [0.5];
  const wins = [false];
  let a = 0.5;
  for (let t = 1; t <= RACES; t++) {
    const win = rng() < TRUE_P;
    wins.push(win);
    const stakeA = (win ? BELIEF_A : 1 - BELIEF_A) * a;
    const stakeB = (win ? BELIEF_B : 1 - BELIEF_B) * (1 - a);
    a = stakeA / (stakeA + stakeB); // winners split the whole pool by stake
    share.push(a);
  }
  WINS.push(wins);
  return share;
}

const RUNS = SEEDS.map(run);
/** The 50% bettor's best moment after race LUCK_AFTER, up to race t (null if the 60% bettor stayed above half). */
const lowPoint = (r: number, t: number) => {
  let best: { race: number; v: number } | null = null;
  for (let i = LUCK_AFTER + 1; i <= t; i++) if (RUNS[r][i] < 0.5 && (!best || RUNS[r][i] < best.v)) best = { race: i, v: RUNS[r][i] };
  return best;
};
const ratio = (v: number) => v / (1 - v);
const fmtX = (v: number) => (v >= 1000 ? "1,000+" : v < 0.001 ? "<0.001" : v.toFixed(v < 10 ? 2 : 0));
/** Did the 50% bettor hold more than half at some race after LUCK_AFTER, up to race t? */
const luckLed = (r: number, t: number) => RUNS[r].some((v, i) => i > LUCK_AFTER && i <= t && v < 0.5);
const WIN_X = BELIEF_A / BELIEF_B; // 1.2
const LOSS_X = (1 - BELIEF_A) / (1 - BELIEF_B); // 0.8
const pct = (v: number) => (v > 0.9995 ? "over 99.9%" : `${(v * 100).toFixed(1)}%`);
const FINALS = RUNS.map((r) => r[RACES]);
const LOW_FINAL = Math.min(...FINALS);

// Chart geometry (viewBox 340 × 176; v4 shorter so the chart and the reveal fit a phone together).
const X0 = 38;
const X1 = 330;
const Y0 = 10;
const Y1 = 150;
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
  const [from, setFrom] = useState(0); // race before the latest press
  const [sel, setSel] = useState(0);
  const [luck, setLuck] = useState<number | null>(null); // first run with a 50% lead the learner opened
  const [single, setSingle] = useState<{ race: number; win: boolean } | null>(null); // the first one-race step
  // The run whose low point is labelled and quoted: the selected run if it dipped, else the first one opened.
  const quoteRun = luck !== null && lowPoint(sel, t) === null ? luck : sel;
  const q = lowPoint(quoteRun, t);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A horse truly wins ${TRUE_P * 100}% of races. One bettor believes ${BELIEF_A * 100}%, another ${BELIEF_B * 100}%; equal money. After ${RACES} races, who holds most of it?`,
        options: ["About equal", `The ${BELIEF_A * 100}% bettor`, `The ${BELIEF_B * 100}% bettor`],
        answer: 1,
      }}
      exploreHint={`Run one race, then the rest to ${RACES}; then open a run that dipped below the dashed line.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In all five runs the {BELIEF_A * 100}% bettor ended with at least <strong>{pct(LOW_FINAL)}</strong> of the money, but
            the less accurate bettor can lead for many races
            {q ? `: in run ${quoteRun + 1} the ${BELIEF_B * 100}% bettor held ${pct(1 - q.v)} at race ${q.race} (the circle).` : "."}
          </p>
          <p>
            Each race multiplied the money ratio by {WIN_X.toFixed(1)} on a win, {LOSS_X.toFixed(1)} on a loss
            {single ? ` (your race ${single.race}: a ${single.win ? "win" : "loss"}, ×${(single.win ? WIN_X : LOSS_X).toFixed(1)})` : ""}
            . Three wins and two losses, the true mix, give ×{(WIN_X ** 3 * LOSS_X ** 2).toFixed(2)}: an edge that
            compounds. As money moves to the better belief, the pool&apos;s odds drift to {TRUE_P * 100}%.
          </p>
          <p className="muted">Model: two bettors, no fees, all-in every race.</p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (nt: number, ns: number) => {
              if (nt >= RACES) reach("full-run");
              if (luckLed(ns, nt)) {
                if (luck === null) setLuck(ns);
                reach("luck-run");
              }
            };
            const go = (nt: number) => {
              if (nt === t + 1 && !single) {
                setSingle({ race: nt, win: WINS[sel][nt] });
                reach("one-race");
              }
              setFrom(t);
              setT(nt);
              check(nt, sel);
            };
            const pick = (r: number) => {
              setSel(r);
              setFrom(0); // report this run from race 1, so the caption matches its money ratio
              check(t, r);
            };
            const now = locked ? 0 : t;
            const share = RUNS[sel][now];
            const seg = WINS[sel].slice(from + 1, now + 1);
            const w = seg.filter(Boolean).length;
            const l = seg.length - w;
            const seenParts: string[] = [];
            if (single) seenParts.push(`race ${single.race} ${single.win ? "win" : "loss"} ×${(single.win ? WIN_X : LOSS_X).toFixed(1)}`);
            if (t >= RACES) seenParts.push(`3 wins + 2 losses ×${(WIN_X ** 3 * LOSS_X ** 2).toFixed(2)}`);
            if (q) seenParts.push(`run ${quoteRun + 1}: 50% bettor ${pct(1 - q.v)}, race ${q.race}`);
            const atReveal = phase === "reveal";
            const msg = locked
              ? "Predict first."
              : now === 0
                ? "Run one race: watch the money ratio."
                : seg.length === 1
                  ? `Race ${now}: ${w ? "win" : "loss"}, money ratio ×${(w ? WIN_X : LOSS_X).toFixed(1)}.`
                  : `Races ${from + 1}–${now}: ${w} wins ×${WIN_X.toFixed(1)}, ${l} losses ×${LOSS_X.toFixed(1)}: ratio ×${fmtX(WIN_X ** w * LOSS_X ** l)}.`;
            return (
              <div className={s.wrap}>
                {!atReveal && <p className={s.msg}>{msg}</p>}
                <svg viewBox="0 0 340 176" className="stage-svg" role="img" aria-label={`Share of the money held by the ${BELIEF_A * 100}% bettor over ${now} races`}>
                  {[0, 0.5, 1].map((v) => (
                    <g key={v}>
                      <line x1={X0} y1={y(v)} x2={X1} y2={y(v)} className={v === 0.5 ? s.half : s.grid} />
                      <text x={X0 - 4} y={y(v) + 4} textAnchor="end" className={s.label}>
                        {v * 100}%
                      </text>
                    </g>
                  ))}
                  <text x={X0} y={168} className={s.label}>
                    race 0
                  </text>
                  <text x={X1} y={168} textAnchor="end" className={s.label}>
                    race {RACES}
                  </text>
                  <text x={(X0 + X1) / 2} y={168} textAnchor="middle" className={s.label}>
                    line: {BELIEF_A * 100}% bettor&apos;s share
                  </text>
                  {now > 0 && RUNS.map((r, i) => (i === sel ? null : <polyline key={i} points={pts(r, now)} className={s.run} />))}
                  {now > 0 && <polyline points={pts(RUNS[sel], now)} className={s.runOn} />}
                  {now > 0 &&
                    RUNS.map((_, i) => {
                      const lp = lowPoint(i, now);
                      if (!lp) return null;
                      const labelled = i === quoteRun;
                      const right = x(lp.race) > 260;
                      return (
                        <g key={`low${i}`}>
                          <circle cx={x(lp.race)} cy={y(lp.v)} r={6} className={s.low} />
                          {labelled && (
                            <text
                              x={x(lp.race) + (right ? -9 : 9)}
                              y={y(lp.v) - 8}
                              textAnchor={right ? "end" : "start"}
                              className={s.lowOn}
                            >
                              Run {i + 1}: 50% bettor {pct(1 - lp.v)}, race {lp.race}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  <circle cx={x(now)} cy={y(share)} r={4.5} className={s.dot} />
                  {now >= RACES && (
                    <text x={X1} y={y(1) + 14} textAnchor="end" className={s.lowOn}>
                      Five runs end at {pct(LOW_FINAL)} to {pct(Math.max(...FINALS))}
                    </text>
                  )}
                </svg>
                {!atReveal && (
                <Row>
                  <Control disabled={locked || t >= RACES} onClick={() => go(t + 1)}>
                    1 race
                  </Control>
                  <Control disabled={locked || t >= RACES} onClick={() => go(Math.min(RACES, t + STEP))}>
                    +{STEP} races
                  </Control>
                  <Control disabled={locked || t >= RACES} onClick={() => go(RACES)}>
                    Run to {RACES}
                  </Control>
                </Row>
                )}
                <Row>
                  <span className={s.runLabel}>Run</span>
                  {SEEDS.map((seed, i) => (
                    <Control
                      key={seed}
                      className={sel === i ? "active" : ""}
                      disabled={locked || sel === i}
                      aria-pressed={sel === i}
                      aria-label={`Run ${i + 1}, seed ${seed}`}
                      onClick={() => pick(i)}
                    >
                      {i + 1}
                    </Control>
                  ))}
                </Row>
                <div className={s.readouts}>
                  <Readout label={`${BELIEF_A * 100}% bettor`} value={locked ? "?" : pct(share)} />
                  <Readout label="Ratio 60:50" value={locked ? "?" : fmtX(ratio(share))} />
                  <Readout label="Pool odds" value={locked ? "?" : `${((BELIEF_A * share + BELIEF_B * (1 - share)) * 100).toFixed(1)}%`} />
                </div>
                <p className={s.seen} data-testid="seen">
                  {seenParts.length ? `Seen: ${seenParts.join(" · ")}` : "Seen: nothing yet"}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
