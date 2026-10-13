"use client";

// Reward hacking, toy race. 100 steps. A buoy respawns every 4 steps in a loop: +10 each time.
// The finish is 20 steps from the loop: +100, and the race ends there. The only choice is the
// step L at which the boat leaves the loop. Score(L) = 10 * floor(L / 4) + (L + 20 <= 100 ? 100 : 0).
// Finish at once: 100. Never leave: 250. Best: leave at 80, finish at step 100: 200 + 100 = 300.
// Deterministic, no randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const RACE = 100;
const BUOY_EVERY = 4;
const BUOY_PTS = 10;
const FINISH_PTS = 100;
const FINISH_DIST = 20;

const buoys = (leave: number) => Math.floor(leave / BUOY_EVERY);
const finishes = (leave: number) => leave + FINISH_DIST <= RACE;
const score = (leave: number) => buoys(leave) * BUOY_PTS + (finishes(leave) ? FINISH_PTS : 0);
function best() {
  let b = { leave: 0, score: score(0) };
  for (let l = 0; l <= RACE; l++) if (score(l) > b.score) b = { leave: l, score: score(l) };
  return b;
}
// MODEL END

const PRESETS = [0, 40, 80, RACE] as const;
const BEST = best();
const X = (step: number) => 16 + step * 2.88;

export default function LoopholeLapFarming({ slug }: { slug: string }) {
  const [leave, setLeave] = useState(0);
  const [top, setTop] = useState<{ leave: number; score: number } | null>(null);

  const sc = score(leave);
  const fin = finishes(leave);
  const end = Math.min(RACE, leave + FINISH_DIST);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A boat gets ${BUOY_PTS} points per buoy (one every ${BUOY_EVERY} steps, looping) and ${FINISH_PTS} for the finish, which ends the race. The race lasts ${RACE} steps; the finish is ${FINISH_DIST} steps away. Best total score?`,
        options: [String(score(0)), String(score(RACE)), String(BEST.score)],
        answer: 2,
      }}
      exploreHint="Choose when the boat leaves the loop. Chase the highest score."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {top ? (
              <>
                Your best: <strong>{top.score} points</strong>, leaving at step {top.leave}.{" "}
              </>
            ) : null}
            Heading straight for the finish scored {score(0)}. Circling forever scored {score(RACE)}. The top is {BEST.score}: loop
            until step {BEST.leave} ({buoys(BEST.leave)} buoys, {buoys(BEST.leave) * BUOY_PTS}), then sail {FINISH_DIST} steps and
            cross the line on the last step.
          </p>
          <p>
            The finish pays once; the buoy pays forever. A score-maximiser treats the race as a buoy farm and finishes only
            because the last {FINISH_DIST} steps cannot buy more than {FINISH_PTS}.
          </p>
          <p>
            We meant &quot;win the race&quot;; we paid for &quot;points&quot;. A learning agent chases what is paid. Game-playing
            agents have found real loops like this.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["saw-best", "saw-loop-only"]}>
          {(reach) => {
            const go = (l: number) => {
              setLeave(l);
              const v = score(l);
              setTop((t) => (t === null || v > t.score ? { leave: l, score: v } : t));
              if (v === BEST.score) reach("saw-best");
              if (!finishes(l) && buoys(l) > 0) reach("saw-loop-only");
            };
            const ticks = Array.from({ length: buoys(leave) }, (_, i) => (i + 1) * BUOY_EVERY);
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy race · invented scoring</span>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`Leave the loop at step ${leave}`}>
                  <text x={160} y={16} textAnchor="middle" className={s.small} fill="var(--muted)">
                    Buoy +{BUOY_PTS} every {BUOY_EVERY} steps · finish +{FINISH_PTS}, race over
                  </text>
                  {/* timeline */}
                  <line x1={X(0)} y1={80} x2={X(RACE)} y2={80} stroke="var(--line)" strokeWidth={10} strokeLinecap="round" />
                  {!locked && leave > 0 && (
                    <line x1={X(0)} y1={80} x2={X(leave)} y2={80} stroke="#3b82f6" strokeWidth={10} strokeLinecap="round" />
                  )}
                  {!locked && end > leave && (
                    <line x1={X(leave)} y1={80} x2={X(end)} y2={80} stroke="#f59e0b" strokeWidth={10} strokeLinecap="round" />
                  )}
                  {!locked &&
                    ticks.map((t) => <circle key={t} cx={X(t)} cy={80} r={2.6} fill="var(--fg)" />)}
                  {[0, 20, 40, 60, 80, 100].map((t) => (
                    <text key={t} x={X(t)} y={104} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                      {t}
                    </text>
                  ))}
                  <text x={160} y={118} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                    step
                  </text>
                  {!locked && (
                    <>
                      <text x={X(leave / 2)} y={64} textAnchor="middle" className={s.tiny} fill="#3b82f6">
                        {leave > 8 ? `loop: ${buoys(leave)} buoys` : ""}
                      </text>
                      {fin ? (
                        <g>
                          <line x1={X(end)} y1={58} x2={X(end)} y2={92} stroke="var(--good)" strokeWidth={2} />
                          <text x={X(end)} y={52} textAnchor={end > 85 ? "end" : "middle"} className={s.small} fill="var(--good)">
                            finish +{FINISH_PTS}
                          </text>
                        </g>
                      ) : (
                        <text x={X(RACE)} y={52} textAnchor="end" className={s.small} fill="var(--bad)">
                          time up, no finish
                        </text>
                      )}
                      <text x={160} y={142} textAnchor="middle" className={s.big} fill="var(--fg)">
                        {sc} points
                      </text>
                    </>
                  )}
                </svg>
                <Row>
                  {PRESETS.map((p) => (
                    <Control key={p} className={leave === p ? "active" : ""} disabled={locked || leave === p} onClick={() => go(p)}>
                      {p === 0 ? "Finish now" : p === RACE ? "Never leave" : `Leave at ${p}`}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Slider
                    label="Leave the loop at step"
                    value={leave}
                    min={0}
                    max={RACE}
                    step={BUOY_EVERY}
                    disabled={locked}
                    onChange={go}
                  />
                  <Readout label="Best so far" value={locked || !top ? "–" : `${top.score}`} />
                  <Readout label="Buoys" value={locked ? "–" : `${buoys(leave)} × ${BUOY_PTS}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
