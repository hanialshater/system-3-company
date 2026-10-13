"use client";

// Minibatch noise toy. True slope = 1. Each example's gradient = 1 + N(0, 1) noise. A step uses the
// mean of the first b example-gradients from its own seeded stream of 64 (mulberry32 + Box-Muller),
// so the same 30 steps are shown at every batch size (the dots contract as b grows).
// Seed 11 was the first seed tried, not tuned; the reveal gives the spread over 2000 seeds.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const TRUE_SLOPE = 1;
const STEPS = 30;
const MAXB = 64;
const BATCHES = [1, 4, 16, 64];
const SEED = 11;
function draws(): number[][] {
  const r = mulberry32(SEED);
  const g = () => {
    const u = 1 - r();
    const v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  return Array.from({ length: STEPS }, () => Array.from({ length: MAXB }, g));
}
const stepsAt = (d: number[][], b: number) => d.map((row) => TRUE_SLOPE + row.slice(0, b).reduce((a, c) => a + c, 0) / b);
const sdOf = (xs: number[]) => {
  const m = xs.reduce((a, b) => a + b, 0) / xs.length;
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / (xs.length - 1));
};
// MODEL END

const f2 = (v: number) => v.toFixed(2);
const LO = -2.5;
const HI = 4.5;
const X0 = 20;
const X1 = 300;
const X = (v: number) => X0 + ((Math.max(LO, Math.min(HI, v)) - LO) / (HI - LO)) * (X1 - X0);

export default function NoisyCompass({ slug }: { slug: string }) {
  const data = useMemo(draws, []);
  const sds = useMemo(() => Object.fromEntries(BATCHES.map((b) => [b, sdOf(stepsAt(data, b))])) as Record<number, number>, [data]);
  const [batch, setBatch] = useState(1);
  const pts = stepsAt(data, batch);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Each example's gradient has noise with spread (sd) 1 around the true slope. A step that averages a batch of 16 examples has noise sd:",
        options: ["1", "0.25", "0.0625"],
        answer: 1,
      }}
      exploreHint="Step through the batch sizes and watch the 30 dots."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In this toy the 30 steps spread with sd {f2(sds[1])} at batch 1, {f2(sds[16])} at batch 16 and {f2(sds[64])} at batch
            64. Theory says 1 divided by the square root of the batch size: 1, 0.25, 0.125.
          </p>
          <p>
            Another seed would differ: across 2000 seeds the batch-16 spread of 30 steps ran from 0.20 to 0.30 (5th to 95th
            percentile).
          </p>
          <p>So 16 times the work buys 4 times the steadiness.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["batch-16", "batch-64"]}>
          {(reach) => {
            const pick = (b: number) => {
              setBatch(b);
              if (b === 16) reach("batch-16");
              if (b === 64) reach("batch-64");
            };
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy: noise sd 1 per example</span>
                <p className={s.caption}>30 steps per batch size. Each dot is one step&apos;s slope estimate; the line is the true slope.</p>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={`30 step estimates at batch size ${batch}`}>
                  <line x1={X0} y1={140} x2={X1} y2={140} stroke="var(--line)" strokeWidth={1.5} />
                  {[-2, -1, 0, 1, 2, 3, 4].map((t) => (
                    <text key={t} x={X(t)} y={156} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                      {t}
                    </text>
                  ))}
                  <line x1={X(TRUE_SLOPE)} y1={14} x2={X(TRUE_SLOPE)} y2={140} stroke="var(--good)" strokeWidth={2.5} />
                  <text x={X(TRUE_SLOPE) + 4} y={12} className={s.tiny} fill="var(--good)">
                    true slope 1
                  </text>
                  {pts.map((v, i) => (
                    <circle key={i} cx={X(v)} cy={26 + ((i * 7) % 30) * 3.6} r={5} fill="var(--domain)" opacity={0.8} />
                  ))}
                </svg>
                <Row>
                  {BATCHES.map((b) => (
                    <Control key={b} className={batch === b ? "active" : ""} disabled={locked || batch === b} onClick={() => pick(b)}>
                      Batch {b}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Batch size" value={batch} />
                  <Readout label="Spread (sd) of the 30 steps" value={locked ? "–" : f2(sds[batch])} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
