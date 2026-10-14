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

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const W_MAX = 10;
const START = 8;
const CORN_MAX = 100;
const MILESTONES = ["last-ton"] as const;

const corn = (w: number) => CORN_MAX - w * w;
const stepCost = (w: number) => corn(w - 1) - corn(w); // corn lost for the w-th ton
const FIRST = stepCost(1); // 1
const LAST = stepCost(W_MAX); // 19

// Geometry (viewBox 320 × 256): chart, then the field strip.
const L = 40;
const R = 286;
const TOP = 26;
const BOT = 180;
const px = (w: number) => L + (w / W_MAX) * (R - L);
const py = (c: number) => BOT - (c / CORN_MAX) * (BOT - TOP);
const curve = Array.from({ length: 101 }, (_, i) => i / 10)
  .map((w, i) => `${i ? "L" : "M"}${px(w).toFixed(1)},${py(corn(w)).toFixed(1)}`)
  .join(" ");

export default function BendingFrontier({ slug }: { slug: string }) {
  const [w, setW] = useState(START);

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
            When you reached {W_MAX} tons of wheat, corn hit 0, and that last ton cost <strong>{LAST} tons of corn</strong>: from {corn(W_MAX - 1)} down
            to {corn(W_MAX)}. The first ton cost {FIRST}. The drops grew by 2 every step: {Array.from({ length: W_MAX }, (_, i) => stepCost(i + 1)).join(", ")}.
          </p>
          <p>
            Look at the fields under the chart: they are not all alike. The first wheat went on the field worst for corn,
            which grew only {FIRST}; the last took the best corn field, which grew {LAST}. Each drop on the staircase is
            the corn its field used to grow, and that is why the frontier bends.
          </p>
          <p className="muted">A model: the curve is made up to show the shape, not data from a real farm.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              const k = Math.max(0, Math.min(W_MAX, v));
              setW(k);
              if (k === W_MAX) reach("last-ton");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Made-up farm: 10 fields, worst to best for corn</p>
                <svg
                  viewBox="0 0 320 256"
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
                  <text x={R + 30} y={BOT + 28} textAnchor="end" className={s.axis}>
                    wheat (tons)
                  </text>
                  <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
                  <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
                  <path d={curve} className={s.ghost} />
                  {!locked &&
                    Array.from({ length: w }, (_, i) => i + 1).map((k) => (
                      <g key={k}>
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
                          y={BOT + 34}
                          width={px(k) - px(k - 1) - 2}
                          height={22}
                          rx={3}
                          fill={locked ? "var(--bg-2)" : wheat ? "var(--warn)" : `color-mix(in srgb, var(--good) ${pct}%, var(--bg-2))`}
                          stroke={locked ? "var(--line)" : k === w ? "var(--fg)" : "none"}
                          strokeWidth={2}
                        />
                        {!locked && (
                          <text x={(px(k - 1) + px(k)) / 2} y={BOT + 49} textAnchor="middle" className={s.small}>
                            {stepCost(k)}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  <text x={10} y={BOT + 70} className={s.axis}>
                    {locked ? "the 10 fields" : "number = corn the field grew · yellow = wheat"}
                  </text>
                </svg>

                <Row>
                  <Readout label="Corn" value={locked ? "?" : corn(w)} />
                  <Readout label="Last ton cost" value={locked ? "?" : w > 0 ? `${stepCost(w)} corn` : "—"} />
                </Row>
                <Row>
                  <Slider label="Wheat (tons)" value={w} min={0} max={W_MAX} disabled={locked} onChange={set} />
                  <Control disabled={locked || w >= W_MAX} onClick={() => set(w + 1)} aria-label="One more ton of wheat">
                    +1
                  </Control>
                  <Control disabled={locked || w <= 0} onClick={() => set(w - 1)} aria-label="One less ton of wheat">
                    −1
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
