"use client";

// Rabbit ratio. Pick the first two numbers; each next term is the sum of the last two. The chart
// plots each ratio (term / previous term) as a dot: across is the ratio on a 0-4 line, down is the
// step, so the dots zigzag in as you read down. Earlier starts stay as faint trails. The steps
// slider shows fewer or more ratios. Every dot and number comes from run().
// Key state: two different starts run far enough (8+ ratios) to land in the same place.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const STARTS: [number, number][] = [
  [1, 1],
  [1, 3],
  [3, 1],
];
const MAX_STEPS = 12;
const ENOUGH = 8;
const MILESTONES = ["first-start", "second-start"] as const;
const PHI = (1 + Math.sqrt(5)) / 2;

/** Terms a, b, a+b, ... and the ratios term[k+1] / term[k]. */
function run([a, b]: [number, number], steps: number) {
  const t = [a, b];
  while (t.length < steps + 1) t.push(t[t.length - 1] + t[t.length - 2]);
  return { terms: t, ratios: t.slice(1).map((x, i) => x / t[i]) };
}

const W = 320;
const TOP = 26;
const ROW = 15;
const H = TOP + MAX_STEPS * ROW + 10;
const L = 16;
const R = W - 16;
const XMAX = 4;
const xr = (v: number) => L + (Math.min(v, XMAX) / XMAX) * (R - L);

export default function RabbitRatio({ slug }: { slug: string }) {
  const [start, setStart] = useState<number | null>(null);
  const [steps, setSteps] = useState(MAX_STEPS);
  const [tried, setTried] = useState<number[]>([]);

  const finals = tried.map((i) => run(STARTS[i], MAX_STEPS).ratios.at(-1)!);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In your notebook you write 1, 1, 2, 3, 5, 8, 13, …, each term the sum of the last two. Divide each term by the one before it. Where do the ratios head?",
        options: ["1.5", PHI.toFixed(3), "2"],
        answer: 1,
      }}
      exploreHint="Pick a start, read the dots downwards, then pick a different start."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>To {PHI.toFixed(3)}.</strong> You ran{" "}
            {tried.map((i, k) => `${STARTS[i].join(", ")} (last ratio ${finals[k].toFixed(4)})`).join(" and ")}: different starts, the same
            landing place.
          </p>
          <p>
            Each ratio overshoots, then undershoots, and after the first step or two the gap shrinks each time. If the ratio settles at x, then next ÷ this = 1 + previous ÷
            this, so x = 1 + 1/x. Its positive solution is (1 + √5) ÷ 2 = {PHI.toFixed(4)}.
          </p>
          <p>The rule, not the start, sets the ratio: any two positive starting numbers end up there.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const note = (i: number | null, st: number) => {
              if (i === null || st < ENOUGH) return;
              const t = tried.includes(i) ? tried : [...tried, i];
              if (t !== tried) setTried(t);
              if (t.length >= 1) reach("first-start");
              if (t.length >= 2) reach("second-start");
            };
            return (
              <Stage
                locked={locked}
                start={start}
                steps={steps}
                tried={tried}
                onStart={(i) => {
                  setStart(i);
                  note(i, steps);
                }}
                onSteps={(v) => {
                  setSteps(v);
                  note(start, v);
                }}
              />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  start,
  steps,
  tried,
  onStart,
  onSteps,
}: {
  locked: boolean;
  start: number | null;
  steps: number;
  tried: number[];
  onStart: (i: number) => void;
  onSteps: (v: number) => void;
}) {
  const cur = start === null ? null : run(STARTS[start], steps);
  const ghosts = tried.filter((i) => i !== start);
  const caption = locked
    ? "Make a prediction to start."
    : cur
      ? `${cur.terms.slice(0, 7).join(", ")}${cur.terms.length > 7 ? ", … " + cur.terms.at(-1) : ""}`
      : "Pick two starting numbers.";

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label="Ratios of each term to the one before">
        <line x1={L} y1={TOP - 8} x2={R} y2={TOP - 8} className={s.axis} />
        {[0, 1, 2, 3, 4].map((v) => (
          <g key={v}>
            <line x1={xr(v)} y1={TOP - 12} x2={xr(v)} y2={TOP - 4} className={s.axis} />
            <text x={xr(v)} y={TOP - 16} className={s.tick}>
              {v}
            </text>
            <line x1={xr(v)} y1={TOP} x2={xr(v)} y2={H - 6} className={s.grid} />
          </g>
        ))}
        {ghosts.map((g) =>
          run(STARTS[g], MAX_STEPS).ratios.map((r, k) => <circle key={`${g}-${k}`} cx={xr(r)} cy={TOP + k * ROW + 6} r={3.5} className={s.ghost} />),
        )}
        {cur && (
          <>
            <polyline points={cur.ratios.map((r, k) => `${xr(r).toFixed(1)},${TOP + k * ROW + 6}`).join(" ")} className={s.path} />
            {cur.ratios.map((r, k) => (
              <circle key={k} cx={xr(r)} cy={TOP + k * ROW + 6} r={k === cur.ratios.length - 1 ? 6 : 4.5} className={k === cur.ratios.length - 1 ? s.last : s.dot} />
            ))}
          </>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Row>
        {STARTS.map((st, i) => (
          <Control key={i} disabled={locked || i === start} className={i === start ? "active" : ""} aria-pressed={i === start} onClick={() => onStart(i)}>
            Start {st.join(", ")}
          </Control>
        ))}
      </Row>
      <Row>
        <Slider label="Ratios shown" value={steps} min={1} max={MAX_STEPS} onChange={onSteps} disabled={locked || start === null} />
        <Readout label="Latest ratio" value={locked || !cur ? "?" : cur.ratios.at(-1)!.toFixed(4)} />
      </Row>
    </div>
  );
}
