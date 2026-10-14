"use client";

// Steeper is not taller. Two ramps on one square grid, from the same foot: A rises 3 over 12,
// B rises 2 over 4. A ends higher; B is steeper. An "across" slider moves one upright line
// over both ramps and reads off how far each has climbed over the same distance across
// (B continues dashed past its end, labelled as "if it kept going").
// Key state: the line at B's full run (4 across), where A has climbed 1 and B 2.
// v3: while locked only the grid, the ground and the shared foot are drawn; the ramps appear after the
// prediction, so the question is answered from the numbers, not read off a to-scale picture.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const A = { rise: 3, run: 12 };
const B = { rise: 2, run: 4 };
const MAXX = Math.max(A.run, B.run);
const MAXY = (B.rise / B.run) * MAXX; // B extended to A's run
const MILESTONES = ["same-run", "kept-going"] as const;

const W = 320;
const U = 23;
const L = 22;
const H = MAXY * U + 34;
const BASE = H - 20;
const px = (x: number) => L + x * U;
const py = (y: number) => BASE - y * U;
const num = (v: number) => String(Math.round(v * 100) / 100);
const slopeA = A.rise / A.run;
const slopeB = B.rise / B.run;

export default function SteeperIsNotTaller({ slug }: { slug: string }) {
  const [x, setX] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Ramp A rises ${A.rise} over a run of ${A.run}. Ramp B rises ${B.rise} over a run of ${B.run}. Which is steeper?`,
        options: ["A", "B", "Same"],
        answer: 1,
      }}
      exploreHint={`Put the line at ${B.run} across, then at ${A.run}, and compare the climbs.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>B.</strong> Over the same {B.run} across, B climbed {num(slopeB * B.run)} and A only{" "}
            {num(slopeA * B.run)}. B&apos;s slope is {B.rise} ÷ {B.run} = {num(slopeB)}; A&apos;s is {A.rise} ÷ {A.run} ={" "}
            {num(slopeA)}, half as steep.
          </p>
          <p>
            A ends higher only because it is longer. Steepness is rise per step across, a ratio, not the height you
            reach. Kept going for {A.run} across, B would have climbed {num(slopeB * A.run)}.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} x={x} setX={setX} />}
    </Lesson>
  );
}

function Stage({ locked, interact, x, setX }: StageContext & { x: number; setX: (v: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const ya = slopeA * x;
  const yb = slopeB * x;
  const past = x > B.run;

  const move = (v: number) => {
    setX(v);
    if (v === B.run) reach("same-run");
    if (v === A.run) reach("kept-going");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={locked ? "Empty grid; both ramps start at the same foot" : `Ramps A and B; line at ${x} across`}>
        {Array.from({ length: MAXX + 1 }, (_, i) => (
          <line key={`v${i}`} x1={px(i)} y1={py(0)} x2={px(i)} y2={py(MAXY)} className={s.grid} />
        ))}
        {Array.from({ length: MAXY + 1 }, (_, j) => (
          <line key={`h${j}`} x1={px(0)} y1={py(j)} x2={px(MAXX)} y2={py(j)} className={s.grid} />
        ))}
        <line x1={px(0)} y1={py(0)} x2={px(MAXX)} y2={py(0)} className={s.ground} />

        {!locked && (
          <>
            <line x1={px(B.run)} y1={py(B.rise)} x2={px(MAXX)} y2={py(MAXY)} className={s.ext} />
            <text x={px(MAXX) - 12} y={py(MAXY) - 4} textAnchor="end" className={s.extLabel}>
              B, if it kept going
            </text>
          </>
        )}
        {locked ? (
          <>
            <circle cx={px(0)} cy={py(0)} r={4} className={s.dotA} />
            <text x={px(0) + 8} y={py(0) - 6} className={s.labA}>
              both ramps start here
            </text>
          </>
        ) : (
          <>
            <line x1={px(0)} y1={py(0)} x2={px(A.run)} y2={py(A.rise)} className={s.rampA} />
            <line x1={px(0)} y1={py(0)} x2={px(B.run)} y2={py(B.rise)} className={s.rampB} />
            <text x={px(A.run) - 4} y={py(A.rise) - 7} textAnchor="end" className={s.labA}>
              A: up {A.rise} over {A.run}
            </text>
            <text x={px(B.run) - 6} y={py(B.rise) - 8} textAnchor="end" className={s.labB}>
              B: up {B.rise} over {B.run}
            </text>
          </>
        )}

        {!locked && (
          <g>
            <line x1={px(x)} y1={py(0) + 6} x2={px(x)} y2={py(MAXY)} className={s.probe} />
            <circle cx={px(x)} cy={py(ya)} r={5} className={s.dotA} />
            <circle cx={px(x)} cy={py(yb)} r={5} className={past ? s.dotGhost : s.dotB} />
          </g>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : x === 0
            ? "Slide the line across. Compare how far each ramp climbs."
            : x === B.run
              ? `Same ${x} across: A climbs ${num(ya)}, B climbs ${num(yb)}.`
              : past
                ? `${x} across: A climbs ${num(ya)}; B, kept going, would climb ${num(yb)}.`
                : `${x} across: A climbs ${num(ya)}, B climbs ${num(yb)}.`}
      </p>

      <Row>
        <Control disabled={locked} onClick={() => move(B.run)}>
          Line at {B.run} across
        </Control>
        <Control disabled={locked} onClick={() => move(A.run)}>
          Line at {A.run} across
        </Control>
      </Row>
      <Slider label="Across" value={x} min={0} max={MAXX} step={2} disabled={locked} onChange={move} />
      <Row>
        <Readout label="A climbs" value={locked ? "?" : num(ya)} />
        <Readout label={past ? "B (kept going)" : "B climbs"} value={locked ? "?" : num(yb)} />
      </Row>
    </div>
  );
}
