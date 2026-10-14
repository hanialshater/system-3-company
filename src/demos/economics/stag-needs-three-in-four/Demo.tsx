"use client";

// Stag hunt. Stag pays 4 if both hunt it and 0 if you hunt it alone; hare pays 3 for sure.
// The learner sets how sure they are (p) that the partner hunts stag. Chart: expected payoff of
// stag (4p, a rising line) and hare (3, flat); they cross at p = 3/4. The region where stag pays
// at least as much is tinted.
// v2: presets 0 / 50 / 75 / 100%. Each preset visited leaves a mark on the stag line with its value, so the reveal's
// numbers stay on stage. Two outcome boxes under the chart stand for the two-player picture: with a partner who is
// just as sure of you, 0% gives "both hare" (each one's best reply to the other's hare) and 100% gives "both stag";
// each box is ticked once its case has been set. Milestones: hare-stable (0%), half (50%), threshold (75%),
// stag-stable (100%). The stage opens at 60% so every preset is pressable.
// v3 (r7): the preset row is not rendered while locked (its 75% label matched the answer); options are four
// "at least" thresholds so 75 is not the only non-anchor number.
// Model: invented payoffs, one partner, payoffs are all that matter.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const STAG = 4;
const HARE = 3;
const THRESH = (HARE / STAG) * 100; // 75
const START = 60;
const PRESETS = [0, 50, THRESH, 100];
const MILESTONES = ["hare-stable", "half", "threshold", "stag-stable"] as const;
const MS: Record<number, (typeof MILESTONES)[number]> = { 0: "hare-stable", 50: "half", [THRESH]: "threshold", 100: "stag-stable" };

const X0 = 40;
const X1 = 300;
const Y0 = 150; // payoff 0
const Y1 = 22; // payoff 4
const xp = (p: number) => X0 + (p / 100) * (X1 - X0);
const yv = (v: number) => Y0 - (v / STAG) * (Y0 - Y1);
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));
const bestAt = (p: number) => {
  const st = (STAG * p) / 100;
  return st > HARE ? "stag" : st === HARE ? "either (tie)" : "hare";
};

export default function StagHunt({ slug }: { slug: string }) {
  const [p, setP] = useState(START);
  const [seen, setSeen] = useState<number[]>([]); // presets visited, kept as marks on the chart
  const stag = (STAG * p) / 100;
  const best = bestAt(p);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Stag: ${STAG} if both hunt it, 0 if alone. Hare: ${HARE} for sure. How sure must you be your partner hunts stag?`,
        options: ["At least 50%", "At least 75%", "At least 90%", "Fully sure: 100%"],
        answer: 1,
      }}
      exploreHint="Try each preset, and watch the two boxes under the chart."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Stag is worth {STAG} × your confidence; hare is a sure {HARE}. At 50% the stag was worth only {fmt(STAG * 0.5)}, and the
            lines crossed at <strong>{THRESH}%</strong>: below that, hare is the better bet.
          </p>
          <p>
            At 0% hare was the best reply for you both: {HARE} each. At 100%, both stag, {STAG} each. Both boxes are ticked:
            each is the best reply to itself. Both prefer the stag, yet doubt alone can lock them into hare.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setP(v);
              if (MS[v] !== undefined) {
                setSeen((xs) => (xs.includes(v) ? xs : [...xs, v]));
                reach(MS[v]);
              }
            };
            const box = (x: number, label: string, pay: number, at: number) => {
              const on = !locked && seen.includes(at);
              const now = !locked && bestAt(p) === (at === 0 ? "hare" : "stag");
              return (
                <g>
                  <rect x={x} y={190} width={140} height={24} rx={6} className={now ? s.boxOn : s.box} />
                  <text x={x + 70} y={207} textAnchor="middle" className={s.small}>
                    {on ? "✓ " : ""}
                    {label}: {pay} each
                  </text>
                </g>
              );
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: invented payoffs; your partner is as sure of you as you are of them</p>
                <svg
                  viewBox="0 0 320 220"
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
                      {seen.map((v) => (
                        <g key={`m${v}`}>
                          <circle cx={xp(v)} cy={yv((STAG * v) / 100)} r={4} className={s.ghost} />
                          <text x={xp(v) + (v === 100 ? -8 : 8)} y={yv((STAG * v) / 100) + (v === 0 ? -6 : 14)} textAnchor={v === 100 ? "end" : "start"} className={s.small}>
                            {fmt((STAG * v) / 100)}
                          </text>
                        </g>
                      ))}
                      <line x1={xp(p)} y1={Y0} x2={xp(p)} y2={Y1} className={s.ghost} />
                      <circle cx={xp(p)} cy={yv(stag)} r={6} className={s.main} />
                      <circle cx={xp(p)} cy={yv(HARE)} r={5} className={s.mutedFill} stroke="var(--fg)" />
                    </g>
                  )}
                  {box(14, "both hare", HARE, 0)}
                  {box(166, "both stag", STAG, 100)}
                </svg>
                <Row>
                  <Readout label="Stag worth" value={locked ? "?" : fmt(stag)} />
                  <Readout label="Hare worth" value={locked ? "?" : HARE} />
                  <Readout label="Best reply" value={locked ? "?" : best} />
                </Row>
                {/* The presets name 75%, so they appear only after the commit (no answer before the commit). At the reveal they
                    give way to the reveal text (v4, phone fit); the slider stays, and the marks keep what they recorded. */}
                {!locked && phase !== "reveal" && (
                <Row>
                  {PRESETS.map((v) => (
                    <Control key={v} className={p === v ? "active" : ""} disabled={locked || p === v} onClick={() => set(v)}>
                      {v}%
                    </Control>
                  ))}
                </Row>
                )}
                <Slider label="How sure you are" value={p} min={0} max={100} step={5} format={(v) => `${v}%`} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
