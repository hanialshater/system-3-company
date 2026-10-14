"use client";

// Test-set reuse toy. m models (1, 5, 20 or 100) that only guess: each question right with chance 0.5.
// All are scored on the same 100 test questions; the leaderboard winner is the best score.
// "Fresh test" re-scores only the winner on 1,000 new questions (the brief had 100; 1,000 keeps the
// fresh score near 50% so one run shows the point; brief departure recorded in build.md).
// Exact expected winner (sum over k of 1 - F(k)^m, F = Binomial(100, 0.5) cdf): 50.00, 55.81, 59.31, 62.48.
// Seeds: mulberry32(seed) for the shared test, mulberry32(seed + 100000) for the fresh test; seed 1, 2, 3, ...
// in press order, untuned (seed 1, 20 models: winner 56, fresh 49.7%).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const Q = 100;
const FRESH_Q = 1000;
const MODELS = [1, 5, 20, 100] as const;
const QUESTION_M = 20;
function board(seed: number, m: number): number[] {
  const r = mulberry32(seed);
  const out: number[] = [];
  for (let k = 0; k < m; k++) {
    let c = 0;
    for (let q = 0; q < Q; q++) if (r() < 0.5) c++;
    out.push(c);
  }
  return out;
}
/** The winner's share right on FRESH_Q new questions, in percent (one decimal). */
function fresh(seed: number): number {
  const r = mulberry32(seed + 100000);
  let c = 0;
  for (let q = 0; q < FRESH_Q; q++) if (r() < 0.5) c++;
  return (100 * c) / FRESH_Q;
}
// MODEL END

const MILESTONES = ["question-run", "fresh-scored", "crowd-seen"] as const;
const LO = 30;
const HI = 70;
const XL = 22;
const XR = 322;
const BASE = 100;
const FRESH_Y = 140;
const sx = (v: number) => XL + ((Math.min(HI, Math.max(LO, v)) - LO) / (HI - LO)) * (XR - XL);
const f1 = (v: number) => `${v.toFixed(1)}%`;

/** Stack dots so none overlap: each goes to the lowest free level at its x. */
function place(scores: number[], r: number) {
  const placed: { x: number; y: number; i: number }[] = [];
  const order = scores.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v || a.i - b.i);
  for (const { v, i } of order) {
    const x = sx(v);
    let level = 0;
    while (placed.some((p) => Math.abs(p.x - x) < 2 * r && Math.abs(p.y - (BASE - r - level * (2 * r + 1))) < 2 * r)) level++;
    placed.push({ x, y: BASE - r - level * (2 * r + 1), i });
  }
  return placed;
}

type Rec = { seed: number; w: number; f: number } | null;
type Crowd = { m: number; w: number } | null;

export default function BestOfTwentyOnOneTest({ slug }: { slug: string }) {
  const [m, setM] = useState<number>(QUESTION_M);
  const [seed, setSeed] = useState<number | null>(null);
  const [nextSeed, setNextSeed] = useState(1);
  const [freshOn, setFreshOn] = useState(false);
  const [rec, setRec] = useState<Rec>(null);
  const [crowd, setCrowd] = useState<Crowd>(null);

  const scores = seed === null ? [] : board(seed, m);
  const best = scores.length ? Math.max(...scores) : 0;
  const winner = scores.indexOf(best);
  const fr = seed === null ? 0 : fresh(seed);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "20 teams' models each just guess (50% chance per question). All are scored on the same 100 test questions. The best scores about:",
        options: ["About 50%", "About 60%", "About 75%"],
        answer: 1,
      }}
      exploreHint="Run the leaderboard, test the winner on fresh questions, then change how many compete."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const r = rec ?? { seed: 1, w: 0, f: 0 };
        const fell = r.f < r.w;
        let crowdLine = "On average, more competitors make a luckier winner.";
        if (crowd && crowd.m > QUESTION_M && crowd.w >= r.w) crowdLine = `Your best of ${crowd.m} reached ${crowd.w}: more competitors, a luckier winner.`;
        if (crowd && crowd.m < QUESTION_M && crowd.w <= r.w) crowdLine = `Your best of ${crowd.m} scored ${crowd.w}: fewer competitors, a less lucky winner.`;
        return (
          <>
            <p>
              No model knew anything, yet your winner scored {r.w} of {Q}. With {QUESTION_M} guessers, someone gets lucky on these{" "}
              {Q} questions, and picking the best picks the luckiest. On fresh questions it {fell ? "fell to" : "scored"} {f1(r.f)}
              {fell ? ": the lead was noise." : ", a rare run where luck held."} {crowdLine}
            </p>
            <p>
              Using one test set to choose among many models quietly trains on it. Keep a final test set that is used once, after the
              choice.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const show = (sd: number, mm: number) => {
              setSeed(sd);
              setM(mm);
              setFreshOn(false);
              const w = Math.max(...board(sd, mm));
              if (mm === QUESTION_M) reach("question-run");
              else {
                setCrowd({ m: mm, w });
                reach("crowd-seen");
              }
            };
            const run = () => {
              show(nextSeed, m);
              setNextSeed(nextSeed + 1);
            };
            const pickM = (mm: number) => {
              if (seed === null) {
                show(nextSeed, mm);
                setNextSeed(nextSeed + 1);
              } else show(seed, mm);
            };
            const r = m === 100 ? 3 : 5;
            const dots = place(scores, r);
            const msg = locked
              ? "Make a prediction to start."
              : rec
                ? `Seen: seed ${rec.seed}, 20 models: winner ${rec.w}, fresh ${f1(rec.f)}.`
                : "Each dot is one model's score. No model has any skill.";
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy models that only guess</span>
                <p className={s.msg}>{msg}</p>
                <svg
                  viewBox="0 0 340 160"
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={seed === null ? "Empty leaderboard" : `${m} models, winner ${best}${freshOn ? `, fresh ${f1(fr)}` : ""}`}
                >
                  <line x1={XL} y1={BASE} x2={XR} y2={BASE} stroke="var(--line)" />
                  {!locked &&
                    [30, 40, 50, 60, 70].map((t) => (
                      <g key={t}>
                        <line x1={sx(t)} y1={BASE} x2={sx(t)} y2={BASE + 4} stroke="var(--muted)" />
                        <text x={sx(t)} y={BASE + 15} textAnchor="middle" className={s.small} fill="var(--muted)">
                          {t}%
                        </text>
                      </g>
                    ))}
                  <text x={XL} y={126} className={s.small} fill="var(--muted)">
                    Shared test ({Q} questions){seed !== null ? `, ${m} model${m > 1 ? "s" : ""}` : ""}
                  </text>
                  {dots.map((d) => (
                    <circle key={d.i} cx={d.x} cy={d.y} r={r} className={d.i === winner ? s.win : s.dot} />
                  ))}
                  {seed !== null &&
                    dots
                      .filter((d) => d.i === winner)
                      .map((d) => (
                        <g key="w">
                          <circle cx={d.x} cy={d.y} r={r + 3} fill="none" className={s.ring} />
                          <text
                            x={d.x > 270 ? d.x - r - 5 : d.x + r + 5}
                            y={d.y + 4}
                            textAnchor={d.x > 270 ? "end" : "start"}
                            className={s.label}
                            fill="var(--domain)"
                          >
                            winner {best}
                          </text>
                        </g>
                      ))}
                  <line x1={XL} y1={FRESH_Y} x2={XR} y2={FRESH_Y} stroke="var(--line)" strokeDasharray="3 3" />
                  <text x={XL} y={FRESH_Y + 15} className={s.small} fill="var(--muted)">
                    Fresh test ({FRESH_Q.toLocaleString("en-US")} new questions), winner only
                  </text>
                  {freshOn && seed !== null && (
                    <g>
                      <line x1={sx(best)} y1={BASE + 4} x2={sx(fr)} y2={FRESH_Y - 6} stroke="var(--domain)" strokeDasharray="2 2" />
                      <circle cx={sx(fr)} cy={FRESH_Y} r={5.5} className={s.win} />
                      <text x={sx(fr) + 9} y={FRESH_Y - 4} className={s.label} fill="var(--domain)">
                        {f1(fr)}
                      </text>
                    </g>
                  )}
                </svg>
                <Row>
                  <Control disabled={locked} onClick={run}>
                    Run leaderboard
                  </Control>
                  <Control
                    disabled={locked || seed === null || freshOn}
                    className={freshOn ? "active" : ""}
                    onClick={() => {
                      setFreshOn(true);
                      if (seed !== null && m === QUESTION_M) {
                        setRec({ seed, w: best, f: fr });
                        reach("fresh-scored");
                      }
                    }}
                  >
                    Fresh test
                  </Control>
                </Row>
                <Row>
                  <span className={s.rowLabel}>Models</span>
                  {MODELS.map((mm) => (
                    <Control key={mm} aria-label={`${mm} model${mm > 1 ? "s" : ""}`} className={m === mm ? "active" : ""} disabled={locked || m === mm} onClick={() => pickM(mm)}>
                      {mm}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Winner, shared test" value={locked || seed === null ? "–" : `${best} of ${Q}`} />
                  <Readout label="Winner, fresh test" value={locked || !freshOn ? "–" : f1(fr)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
