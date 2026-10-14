"use client";

// Clustering illusion. 40 dots land at random on a 10 x 10 grid; cells holding 3 or more are ringed. The learner
// drops batches (1, then 10 more, then 100 more) and a tally counts batches with at least one ringed cell.
// Key state: one batch seen and at least 11 batches tallied (about half have a crowded cell).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CROWD, DOTS, SIDE, batch, pCrowded, tally } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["one-batch", "many-batches"] as const;
const SZ = 200;
const CELL = SZ / SIDE;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const EXACT = pCrowded();

function Stage({ locked, reach, m, setM }: { locked: boolean; reach: (n: string) => void; m: number; setM: (m: number) => void }) {
  const cur = useMemo(() => (m > 0 ? batch(m - 1) : null), [m]);
  const k = useMemo(() => tally(m), [m]);
  const add = (d: number) => {
    const next = m + d;
    setM(next);
    reach("one-batch");
    if (next >= 11) reach("many-batches");
  };
  const ringed = cur ? cur.counts.map((c, i) => (c >= CROWD ? i : -1)).filter((i) => i >= 0) : [];

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `${DOTS} random dots, 100 squares. Ringed = ${CROWD} or more dots. Tally: batches with a ringed square.`}
      </p>
      <svg viewBox={`0 0 ${SZ} ${SZ}`} className={`stage-svg ${s.svg}`} role="img" aria-label={cur ? `Batch ${m}: ${ringed.length} crowded squares` : "Empty grid"}>
        {Array.from({ length: SIDE * SIDE }, (_, i) => (
          <rect key={i} x={(i % SIDE) * CELL} y={Math.floor(i / SIDE) * CELL} width={CELL} height={CELL} className={s.cell} />
        ))}
        {ringed.map((i) => (
          <rect key={`r${i}`} x={(i % SIDE) * CELL + 1} y={Math.floor(i / SIDE) * CELL + 1} width={CELL - 2} height={CELL - 2} className={s.ring} />
        ))}
        {cur?.dots.map((d, i) => {
          // Display only: keep each dot inside its own square, off the grid lines.
          const nudge = (u: number) => {
            const c = Math.min(SIDE - 1, Math.floor(u * SIDE));
            return c * CELL + Math.max(3, Math.min(CELL - 3, (u * SIDE - c) * CELL));
          };
          return <circle key={i} cx={nudge(d.x)} cy={nudge(d.y)} r={2.2} className={s.dot} />;
        })}
        {cur &&
          ringed.map((i) => (
            <text key={`n${i}`} x={(i % SIDE) * CELL + CELL - 3} y={Math.floor(i / SIDE) * CELL + 9} textAnchor="end" className={s.cnt}>
              {cur.counts[i]}
            </text>
          ))}
      </svg>
      <Row>
        <Control disabled={locked} onClick={() => add(1)}>Drop {DOTS} dots</Control>
        <Control disabled={locked} onClick={() => add(10)}>Drop 10 more batches</Control>
        <Control disabled={locked} onClick={() => add(100)}>Drop 100 more</Control>
      </Row>
      <Row>
        <Readout label="Ringed now" value={locked || !cur ? "?" : ringed.length} />
        <Readout label="Batches ringed" value={locked || m === 0 ? "?" : `${k} of ${m}`} />
      </Row>
    </div>
  );
}

export default function RandomDotsCluster({ slug }: { slug: string }) {
  const [m, setM] = useState(0);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${DOTS} dots land at random on a 10 x 10 grid of squares. How likely is it that some square holds ${CROWD} or more dots?`,
        options: ["about 15%", `about ${pct(EXACT)}`, "about 95%"],
        answer: 1,
      }}
      exploreHint="Drop one batch, then many more, and watch the tally."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You tallied {tally(m)} of {m} batches with a ringed square; the exact figure is{" "}
            {(EXACT * 100).toFixed(1)}%, so about half of all random scatters have a crowded square.
          </p>
          <p>
            A scatter with no crowded square ({((1 - EXACT) * 100).toFixed(1)}% of batches) is about as common as one with a
            crowded square, so lumps are an ordinary part of random scatter. A lump on its own is weak evidence that
            something attracts the dots.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} m={m} setM={setM} />}
        </Milestones>
      )}
    </Lesson>
  );
}
