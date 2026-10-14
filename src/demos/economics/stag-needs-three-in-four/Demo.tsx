"use client";

// Stag hunt. Stag pays 4 if both hunt it and 0 if you hunt it alone; hare pays 3 for sure.
// The learner sets how sure they are (p) that the partner hunts stag. Chart: expected payoff of
// stag (4p, a rising line) and hare (3, flat); they cross at p = 3/4. The region where stag pays
// at least as much is tinted.
// Key states: a doubtful belief (below 75%, e.g. 50%: stag worth 2 < 3) and the 75% threshold (tie).
// Model: invented payoffs, one partner, payoffs are all that matter.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const STAG = 4;
const HARE = 3;
const THRESH = (HARE / STAG) * 100; // 75
const START = 100;
const MILESTONES = ["doubt", "threshold"] as const;

const X0 = 40;
const X1 = 300;
const Y0 = 150; // payoff 0
const Y1 = 22; // payoff 4
const xp = (p: number) => X0 + (p / 100) * (X1 - X0);
const yv = (v: number) => Y0 - (v / STAG) * (Y0 - Y1);
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

export default function StagHunt({ slug }: { slug: string }) {
  const [p, setP] = useState(START);
  const stag = (STAG * p) / 100;
  const best = stag > HARE ? "stag" : stag === HARE ? "either (tie)" : "hare";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Stag: ${STAG} if both hunt it, 0 if alone. Hare: ${HARE} for sure. How sure must you be your partner hunts stag?`,
        options: ["More than 50%", "At least 75%", "100%"],
        answer: 1,
      }}
      exploreHint="Lower your confidence to 50%, then find where the lines cross."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Stag is worth {STAG} × your confidence; hare is a sure {HARE}. At 50% the stag was worth only {fmt(STAG * 0.5)}, and the
            lines crossed at <strong>{THRESH}%</strong>: below that, hare is the better bet.
          </p>
          <p>
            Both &quot;both stag&quot; and &quot;both hare&quot; are stable: each is the best reply to itself. Both hunters prefer the
            stag outcome, yet doubt alone can lock them into hare.
          </p>
          <p className="muted">Invented payoffs in a simplified model. The game is called the stag hunt, after an example of Rousseau&apos;s.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setP(v);
              if (v < THRESH) reach("doubt");
              if (v === THRESH) reach("threshold");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: invented payoffs, one partner</p>
                <svg
                  viewBox="0 0 320 186"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Expected payoff of stag and hare" : `At ${p}% sure: stag ${fmt(stag)}, hare ${HARE}`}
                >
                  {!locked && <rect x={xp(THRESH)} y={Y1} width={X1 - xp(THRESH)} height={Y0 - Y1} className={s.goodFill} opacity={0.25} />}
                  <line x1={X0} y1={Y0} x2={X1} y2={Y0} className={s.edge} />
                  <line x1={X0} y1={Y0} x2={X0} y2={Y1} className={s.edge} />
                  {[0, 1, 2, 3, 4].map((v) => (
                    <text key={v} x={X0 - 8} y={yv(v) + 4} className={s.axis} textAnchor="end">
                      {v}
                    </text>
                  ))}
                  {[0, 25, 50, 75, 100].map((v) => (
                    <text key={v} x={xp(v)} y={Y0 + 16} className={v === THRESH && !locked ? s.value : s.axis} textAnchor="middle">
                      {v}%
                    </text>
                  ))}
                  <text x={(X0 + X1) / 2} y={Y0 + 32} className={s.axis} textAnchor="middle">
                    how sure your partner hunts stag
                  </text>
                  {!locked && (
                    <g>
                      <line x1={xp(0)} y1={yv(HARE)} x2={xp(100)} y2={yv(HARE)} className={s.line2} />
                      <line x1={xp(0)} y1={yv(0)} x2={xp(100)} y2={yv(STAG)} className={s.line} />
                      <text x={X1 - 4} y={yv(HARE) + 16} className={s.small} textAnchor="end">
                        hare {HARE}
                      </text>
                      <text x={xp(30)} y={yv(1.2 + 0.3) - 6} className={s.small}>
                        stag
                      </text>
                      <line x1={xp(p)} y1={Y0} x2={xp(p)} y2={Y1} className={s.ghost} />
                      <circle cx={xp(p)} cy={yv(stag)} r={6} className={s.main} />
                      <circle cx={xp(p)} cy={yv(HARE)} r={5} className={s.mutedFill} stroke="var(--fg)" />
                    </g>
                  )}
                </svg>
                <Row>
                  <Readout label="Stag is worth" value={locked ? "?" : fmt(stag)} />
                  <Readout label="Hare is worth" value={locked ? "?" : HARE} />
                  <Readout label="Best reply" value={locked ? "?" : best} />
                </Row>
                <Row>
                  {[50, THRESH, 100].map((v) => (
                    <Control key={v} className={p === v ? "active" : ""} disabled={locked || p === v} onClick={() => set(v)}>
                      {v}% sure
                    </Control>
                  ))}
                </Row>
                <Slider label="How sure you are" value={p} min={0} max={100} step={5} format={(v) => `${v}%`} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
