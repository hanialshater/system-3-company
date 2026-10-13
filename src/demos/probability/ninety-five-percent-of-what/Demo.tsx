"use client";

// Confidence intervals. Each press shows 100 seeded pollsters' 95% intervals (n = 1,000, true support
// exactly 50%) as stacked horizontal bars; bars that miss the 50% line turn red. A running tally counts
// misses across batches. Key state: the first batch drawn, with some red bars.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { MAX_BATCHES, N, PER_BATCH, exactMiss, intervals } from "./model";
import s from "./styles.module.css";

const ALL = intervals();
const MILESTONES = ["first-batch"] as const;
const EXACT = exactMiss();
const misses = (from: number, to: number) => ALL.slice(from, to).filter((x) => x.miss).length;
const pct1 = (p: number) => `${(p * 100).toFixed(1)}%`;
const n = (v: number) => v.toLocaleString("en-US");
const LO = 0.4;
const HI = 0.6;
const X0 = 16;
const W = 328;
const x = (p: number) => X0 + ((Math.max(LO, Math.min(HI, p)) - LO) / (HI - LO)) * W;
const ROW = 2.3;
const Y0 = 6;

function Stage({ locked, interact, batches, setBatches }: { locked: boolean; interact: () => void; batches: number; setBatches: (b: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const from = (batches - 1) * PER_BATCH;
  const shown = batches === 0 ? [] : ALL.slice(from, from + PER_BATCH);
  const thisMiss = shown.filter((v) => v.miss).length;
  const total = misses(0, batches * PER_BATCH);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : "Each bar: one pollster's 95% interval. Line: the true 50%, known because this is a simulation. Red: missed it."}
      </p>
      <svg viewBox="0 0 360 260" className={`stage-svg ${s.svg}`} role="img" aria-label={`${thisMiss} of ${shown.length} intervals miss 50%`}>
        {shown.map((v, i) => (
          <line key={i} x1={x(v.lo)} x2={x(v.hi)} y1={Y0 + i * ROW} y2={Y0 + i * ROW} className={v.miss ? s.miss : s.hit} />
        ))}
        <line x1={x(0.5)} y1={2} x2={x(0.5)} y2={Y0 + PER_BATCH * ROW + 2} className={s.truth} />
        {[0.4, 0.45, 0.5, 0.55, 0.6].map((t) => (
          <text key={t} x={x(t)} y={Y0 + PER_BATCH * ROW + 16} textAnchor="middle" className={s.tick}>
            {Math.round(t * 100)}%
          </text>
        ))}
      </svg>
      <Row>
        <Control
          disabled={locked || batches >= MAX_BATCHES}
          onClick={() => {
            const b = batches + 1;
            setBatches(b);
            if (misses((b - 1) * PER_BATCH, b * PER_BATCH) > 0) reach("first-batch");
          }}
        >
          {batches === 0 ? `Ask ${PER_BATCH} pollsters` : batches >= MAX_BATCHES ? "No more pollsters" : `${PER_BATCH} new pollsters`}
        </Control>
      </Row>
      <Row>
        <Readout label="This batch: missed" value={batches === 0 ? "-" : `${thisMiss} of ${PER_BATCH}`} />
        <Readout label="All batches" value={batches === 0 ? "-" : `${total} of ${n(batches * PER_BATCH)} (${pct1(total / (batches * PER_BATCH))})`} />
      </Row>
    </div>
  );
}

export default function NinetyFivePercentOfWhat({ slug }: { slug: string }) {
  const [batches, setBatches] = useState(0);
  const first = misses(0, PER_BATCH);
  const total = misses(0, batches * PER_BATCH);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `The true support is exactly 50%. ${PER_BATCH} pollsters each ask ${n(N)} random people and report 95% intervals. About how many intervals miss 50%?`,
        options: ["0", `about ${Math.round(EXACT * PER_BATCH)}`, "about 25"],
        answer: 1,
      }}
      exploreHint="Ask the pollsters and count the red bars."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your first batch, {first} of {PER_BATCH} intervals missed 50%.
            {batches > 1 ? ` Over your ${batches} batches, ${total} of ${n(batches * PER_BATCH)} missed (${pct1(total / (batches * PER_BATCH))}).` : ""}{" "}
            The exact chance that one of these intervals misses is <strong>{pct1(EXACT)}</strong>: about {Math.round(EXACT * PER_BATCH)} in{" "}
            {PER_BATCH}.
          </p>
          <p>
            The 95% belongs to the method, not to one interval: across many polls about 1 in 20 intervals misses. A red bar looks just
            like the others to the pollster, who never sees the true line.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} batches={batches} setBatches={setBatches} />}
    </Lesson>
  );
}
