"use client";

// Production possibilities. One picture: the farm's frontier corn = 100 − wheat², with a staircase
// from 0 wheat to the current point. Each step right is one more ton of wheat; the drop under it is the
// corn given up for that ton (1, 3, 5, … 19). The drops get longer: increasing opportunity cost.
// Key state: wheat pushed to 10 tons (corn 0), where the last ton costs 19 corn.
// Model: the curve is invented to show the shape; it is not data.
// v2: the cause is on the stage. A strip of 10 fields under the wheat axis, one per ton, sorted worst to
// best for corn. Field k grew 2k − 1 tons of corn (tinted darker for better corn land); pushing wheat turns
// fields to wheat in that order, so each drop on the staircase is the corn that field used to grow.
// The formula is gone from the question and the chip, and the locked strip is plain (no tint, no numbers).
// v3 (r6): the dashed frontier is no longer drawn while locked (a curve-reader could read 19 off it). After the
// commit the curve and staircase are drawn only as far as the learner has pushed (the furthest point stays as a
// faint trace when they step back). Wheat starts at 0; "All 10 fields" is a step button that reaches the key state.
// Wheat fields are crossed out instead of relying on a colour word.
// v4 (W-265, phone fit): the reveal is trimmed to 88 words (was 119) so the chart top stays on screen at 390x844
// when the reveal opens: the drop list is "1, 3, 5, ... 19" and the repeated "first ton cost 1" is gone.
// v5 (build 6 phone fit, W-287 10px floor): measured crop 145px. The stage is compacted: the chart is 102 units tall
// (was 154; viewBox 320x188, was 320x256), "wheat (tons)" sits on the tick row, the "Made-up farm" chip moved into the
// picture's top line, and +1/-1 joined the readout row so the slider and "All 10 fields" fit on one line.
// The model line is shorter ("The curve is made up, not real farm data.").

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const W_MAX = 10;
const START = 0;
const CORN_MAX = 100;
const MILESTONES = ["last-ton"] as const;

const corn = (w: number) => CORN_MAX - w * w;
const stepCost = (w: number) => corn(w - 1) - corn(w); // corn lost for the w-th ton
const FIRST = stepCost(1); // 1
const LAST = stepCost(W_MAX); // 19

// Geometry (viewBox 320 × 188): chart, then the field strip.
const L = 40;
const R = 286;
const TOP = 22;
const BOT = 124;
const px = (w: number) => L + (w / W_MAX) * (R - L);
const py = (c: number) => BOT - (c / CORN_MAX) * (BOT - TOP);
// The frontier from 0 to wheat `to`.
const curve = (to: number) =>
  Array.from({ length: Math.round(to * 10) + 1 }, (_, i) => i / 10)
    .map((w, i) => `${i ? "L" : "M"}${px(w).toFixed(1)},${py(corn(w)).toFixed(1)}`)
    .join(" ");

export default function BendingFrontier({ slug }: { slug: string }) {
  const [w, setW] = useState(START);
  const [far, setFar] = useState(START); // furthest wheat reached

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A farm has ${W_MAX} fields; each can grow 1 ton of wheat or some corn. Switching the first field to wheat costs ${FIRST} ton of corn. What does switching the last one, from ${W_MAX - 1} to ${W_MAX} tons of wheat, cost?`,
        options: [String(FIRST), String(W_MAX), String(LAST)],
        answer: 2,
      }}
      exploreHint={`Push wheat all the way to ${W_MAX} tons and watch the drops.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {W_MAX} tons of wheat, corn hit 0, and the last ton cost <strong>{LAST} tons of corn</strong>.
            The drops grew by 2 every step: {FIRST}, {stepCost(2)}, {stepCost(3)}, … {LAST}.
          </p>
          <p>
            The fields under the chart are not alike: the first wheat went on the field worst for corn,
            which grew only {FIRST}; the last took the best, which grew {LAST}. Each drop is the corn its field used to
            grow: that is why the frontier bends.
          </p>
          <p className="muted">The curve is made up, not real farm data.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              const k = Math.max(0, Math.min(W_MAX, v));
              setW(k);
              setFar((f) => Math.max(f, k));
              if (k === W_MAX) reach("last-ton");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox="0 0 320 188"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Corn and wheat frontier" : `${w} tons wheat, ${corn(w)} tons corn`}
                >
                  {[0, 50, 100].map((c) => (
                    <text key={c} x={L - 6} y={py(c) + 4} textAnchor="end" className={s.axis}>
                      {c}
                    </text>
                  ))}
                  {[0, 5, 10].map((k) => (
                    <text key={k} x={px(k)} y={BOT + 14} textAnchor="middle" className={s.axis}>
                      {k}
                    </text>
                  ))}
                  <text x={L} y={12} textAnchor="middle" className={s.axis}>
                    corn
                  </text>
                  <text x={316} y={12} textAnchor="end" className={s.axis}>
                    Made-up farm: 10 fields, worst to best for corn
                  </text>
                  <text x={(px(5) + px(10)) / 2} y={BOT + 14} textAnchor="middle" className={s.axis}>
                    wheat (tons)
                  </text>
                  <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
                  <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
                  {!locked && far > 0 && <path d={curve(far)} className={s.ghost} />}
                  {!locked &&
                    Array.from({ length: far }, (_, i) => i + 1).map((k) => (
                      <g key={k} opacity={k <= w ? 1 : 0.3}>
                        <line x1={px(k - 1)} y1={py(corn(k - 1))} x2={px(k)} y2={py(corn(k - 1))} stroke="var(--muted)" strokeWidth={1.5} />
                        <line x1={px(k)} y1={py(corn(k - 1))} x2={px(k)} y2={py(corn(k))} stroke="var(--bad)" strokeWidth={k === w ? 4 : 2.5} />
                      </g>
                    ))}
                  {!locked && w > 0 && (
                    <text x={px(w) + 7} y={(py(corn(w - 1)) + py(corn(w))) / 2 + 4} textAnchor="start" className={s.value} fill="var(--bad)">
                      −{stepCost(w)}
                    </text>
                  )}
                  {!locked && <circle cx={px(w)} cy={py(corn(w))} r={6} className={s.dot} />}
                  {Array.from({ length: W_MAX }, (_, i) => i + 1).map((k) => {
                    const wheat = !locked && k <= w;
                    const pct = Math.round(15 + (70 * (stepCost(k) - FIRST)) / (LAST - FIRST));
                    return (
                      <g key={`f${k}`}>
                        <rect
                          x={px(k - 1) + 1}
                          y={BOT + 22}
                          width={px(k) - px(k - 1) - 2}
                          height={22}
                          rx={3}
                          fill={locked || wheat ? "var(--bg-2)" : `color-mix(in srgb, var(--good) ${pct}%, var(--bg-2))`}
                          stroke={locked ? "var(--line)" : k === w ? "var(--fg)" : wheat ? "var(--muted)" : "none"}
                          strokeWidth={2}
                          strokeDasharray={wheat && k !== w ? "3 2" : undefined}
                        />
                        {!locked && (
                          <text x={(px(k - 1) + px(k)) / 2} y={BOT + 37} textAnchor="middle" className={s.small} opacity={wheat ? 0.6 : 1}>
                            {stepCost(k)}
                          </text>
                        )}
                        {wheat && (
                          <line x1={px(k - 1) + 5} y1={BOT + 40} x2={px(k) - 5} y2={BOT + 26} stroke="var(--fg)" strokeWidth={1.5} />
                        )}
                      </g>
                    );
                  })}
                  <text x={10} y={BOT + 58} className={s.axis}>
                    {locked ? "the 10 fields" : "number = corn the field grew · crossed out = now wheat"}
                  </text>
                </svg>

                <Row>
                  <Readout label="Corn" value={locked ? "?" : corn(w)} />
                  <Readout label="Last ton cost" value={locked ? "?" : w > 0 ? `${stepCost(w)} corn` : "—"} />
                  <Control disabled={locked || w >= W_MAX} onClick={() => set(w + 1)} aria-label="One more ton of wheat">
                    +1
                  </Control>
                  <Control disabled={locked || w <= 0} onClick={() => set(w - 1)} aria-label="One less ton of wheat">
                    −1
                  </Control>
                </Row>
                <Row>
                  <Slider label="Wheat (tons)" value={w} min={0} max={W_MAX} disabled={locked} onChange={set} />
                  <Control disabled={locked || w >= W_MAX} onClick={() => set(W_MAX)}>
                    All {W_MAX} fields
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
