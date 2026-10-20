"use client";

// Runs in 20 flips. The learner fakes 20 flips with H and T; simulated sequences (seeds 1, 2, 3, ... in
// order, see model.ts) are run 1,000 at a time or stepped one at a time. The latest real sequence is
// drawn above the learner's taps, each with its longest run bracketed, and a histogram of longest runs
// builds below with the 5+ bars shaded. Key state: 1,000+ simulated sequences tallied and one stepped.
// Clearing taps never touches the real tally, so the reveal's numbers survive it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { BATCH, BIN_LABELS, EMPTY, FLIPS, TARGET, atLeast, atMost, exactAtLeast, longestRun, runMore, sequence, type Tally } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["thousand", "stepped"] as const;
const EXACT = exactAtLeast(TARGET);
const fmt = (v: number) => v.toLocaleString("en-US");
const pct1 = (p: number) => `${(p * 100).toFixed(1)}%`;
const X0 = 10;
const PITCH = 16;
const CELL = 15;
const HX0 = 14;
const BW = 36;
const BGAP = 10;
const BASE = 168;
const BH = 66;

function Cells({ seq, y, ghost }: { seq: readonly boolean[]; y: number; ghost?: boolean }) {
  const run = seq.length > 0 ? longestRun(seq) : null;
  return (
    <g>
      {Array.from({ length: FLIPS }, (_, i) => {
        const v = seq[i];
        const x = X0 + i * PITCH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={CELL} height={CELL} rx={2} className={v === undefined ? s.slot : v ? s.heads : s.tails} />
            {v !== undefined && (
              <text x={x + CELL / 2} y={y + 11} textAnchor="middle" className={v ? s.hText : s.tText}>
                {v ? "H" : "T"}
              </text>
            )}
          </g>
        );
      })}
      {run && !ghost && (
        <path
          d={`M${X0 + run.start * PITCH},${y - 2} v-4 h${run.len * PITCH - (PITCH - CELL)} v4`}
          className={run.len >= TARGET ? s.bracketHot : s.bracket}
        />
      )}
    </g>
  );
}

function Stage({ locked, reach, tally, setTally, taps, setTaps }: {
  locked: boolean;
  reach: (n: string) => void;
  tally: Tally;
  setTally: (t: Tally) => void;
  taps: boolean[];
  setTaps: (t: boolean[]) => void;
}) {
  const real = tally.n > 0 ? sequence(tally.n) : [];
  const realRun = tally.n > 0 ? longestRun(real).len : 0;
  const myRun = taps.length > 0 ? longestRun(taps).len : 0;
  const ymax = Math.max(10, ...tally.bins);
  const hot = atLeast(tally, TARGET);

  const run = (count: number) => {
    const next = runMore(tally, count);
    setTally(next);
    if (next.n >= BATCH) reach("thousand");
    if (count === 1) reach("stepped");
  };
  const tap = (h: boolean) => setTaps([...taps, h]);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "Make up 20 flips with H and T. Then simulate a fair coin."}</p>
      <svg viewBox="0 0 340 192" className={`stage-svg ${s.svg}`} role="img" aria-label={`${tally.n} simulated sequences; ${hot} with a run of ${TARGET} or more`}>
        <text x={X0} y={11} className={s.label}>
          {tally.n > 0 ? `Simulation #${fmt(tally.n)}: longest run ${realRun}` : "No simulated sequence yet"}
        </text>
        <Cells seq={real} y={22} />
        <text x={X0} y={53} className={s.label}>
          {taps.length > 0 ? `Your taps: longest run ${myRun}` : "Your taps: none yet"}
        </text>
        <Cells seq={taps} y={64} />
        <line x1={HX0 - 4} y1={BASE} x2={HX0 + 7 * (BW + BGAP) - BGAP + 4} y2={BASE} className={s.axis} />
        {tally.bins.map((c, i) => {
          const h = (c / ymax) * BH;
          const x = HX0 + i * (BW + BGAP);
          return (
            <g key={i}>
              <rect x={x} y={BASE - h} width={BW} height={h} rx={2} className={i + 2 >= TARGET ? s.barHot : s.bar} />
              {tally.n > 0 && (
                <text x={x + BW / 2} y={BASE - h - 3} textAnchor="middle" className={s.count}>
                  {fmt(c)}
                </text>
              )}
              <text x={x + BW / 2} y={BASE + 12} textAnchor="middle" className={s.tick}>
                {BIN_LABELS[i]}
              </text>
            </g>
          );
        })}
        <text x={170} y={190} textAnchor="middle" className={s.tick}>
          longest run in 20 flips (simulated sequences)
        </text>
      </svg>
      <Row>
        <Control disabled={locked} onClick={() => run(BATCH)}>Simulate {fmt(BATCH)}</Control>
        <Control disabled={locked} onClick={() => run(1)}>Simulate one</Control>
      </Row>
      <Row>
        <Control disabled={locked || taps.length >= FLIPS} onClick={() => tap(true)}>H</Control>
        <Control disabled={locked || taps.length >= FLIPS} onClick={() => tap(false)}>T</Control>
        <Control disabled={locked || taps.length === 0} onClick={() => setTaps([])}>Clear taps</Control>
      </Row>
      <Row>
        <Readout label="Sequences" value={fmt(tally.n)} />
        <Readout label={`Run of ${TARGET} or more`} value={tally.n > 0 ? `${fmt(hot)} (${pct1(hot / tally.n)})` : "-"} />
      </Row>
    </div>
  );
}

export default function TwentyFlipsRunOfFive({ slug }: { slug: string }) {
  const [tally, setTally] = useState<Tally>(EMPTY);
  const [taps, setTaps] = useState<boolean[]>([]);
  const hot = atLeast(tally, TARGET);
  let mode = 0;
  tally.bins.forEach((c, i) => {
    if (c > tally.bins[mode]) mode = i;
  });
  const realRun = tally.n > 0 ? longestRun(sequence(tally.n)).len : 0;
  const myRun = taps.length === FLIPS ? longestRun(taps).len : 0;
  const tame = myRun >= 2 ? atMost(tally, myRun) : 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A friend flips a fair coin ${FLIPS} times and bets you there will be a run of ${TARGET} or more of the same face somewhere. How likely is that?`,
        options: ["About 5%", "About 20%", "About 45%"],
        answer: 2,
      }}
      exploreHint="Make up 20 flips if you like, then press Simulate 1,000 and Simulate one."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your {fmt(tally.n)} simulated sequences, {pct1(hot / Math.max(1, tally.n))} had a run of {TARGET} or more of the same
            face; the exact chance is <strong>{pct1(EXACT)}</strong>. The tallest bar is a longest run of {BIN_LABELS[mode]}, and
            simulation #{fmt(tally.n)} has a run of {realRun}.
          </p>
          <p>
            Each flip repeats the last face half the time, because the coin has no memory, so long runs pile up.
            {myRun > 0 &&
              ` Your 20 taps ran at most ${myRun} in a row; ${pct1(tame / Math.max(1, tally.n))} of simulated sequences stayed that short.`}
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} tally={tally} setTally={setTally} taps={taps} setTaps={setTaps} />}
        </Milestones>
      )}
    </Lesson>
  );
}
