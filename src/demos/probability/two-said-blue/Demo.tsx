"use client";

// Information cascade. 100 people each get a private clue (right with probability ACC) and see earlier picks;
// a lead of 2+ is copied, else they follow their own clue. The stage draws the latest sequence (20 x 5 grid, read
// left to right) with a ring where the lead first reached 2. The learner runs 1, 100, 10,000 sequences (seeds
// 1..n, per accuracy), can swap the picks for a plain vote of the same clues, and changes clue accuracy.
// Key state: at least 100 sequences run and the pooled view seen. All from model.ts (seeded, computed instantly).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { ACCS, EMPTY, N, exactWrong, pct, runMore, sequence, type Tally } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["ran", "hundred", "pooled"] as const;
const ORDER = [0, 2, 1]; // chips: 60%, 80%, then the default 2 in 3 last, so the click path ends on the lesson's main run
const COLS = 20;
const PITCH = 16;
const W = COLS * PITCH;
const GRID_H = (N / COLS) * PITCH;
const accLabel = (a: number) => `${Math.round(a * 100)}%`;
const fmt = (n: number) => n.toLocaleString("en-US");

function Stage({ locked, reach, tallies, setTallies, ai, setAi }: {
  locked: boolean;
  reach: (n: string) => void;
  tallies: Tally[];
  setTallies: (t: Tally[]) => void;
  ai: number;
  setAi: (i: number) => void;
}) {
  const [pool, setPool] = useState(false);
  const acc = ACCS[ai];
  const t = tallies[ai];
  const seq = t.n > 0 ? sequence(t.n, acc) : null;

  const run = (count: number) => {
    const next = tallies.slice();
    next[ai] = runMore(t, count, acc);
    setTallies(next);
    reach("ran");
    if (t.n + count >= 100) reach("hundred");
  };
  const togglePool = () => {
    setPool(!pool);
    reach("pooled");
  };

  const shown = seq ? (pool ? seq.clues : seq.picks) : null;
  const ring = seq && !pool && seq.start >= 0 ? seq.start : -1;
  const cx = (i: number) => PITCH / 2 + (i % COLS) * PITCH;
  const cy = (i: number) => PITCH / 2 + Math.floor(i / COLS) * PITCH;
  const ready = !locked && t.n > 0;
  const label = seq
    ? `${pool ? "Clues" : "Picks"} of run ${t.n}: ${(pool ? seq.poolBlue : seq.picks.filter(Boolean).length)} blue of ${N}`
    : "No run yet";

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "The urn is blue. Copy a lead of 2 or more; otherwise follow your own clue."}</p>
      <svg viewBox={`0 0 ${W} ${GRID_H + 14}`} className={`stage-svg ${s.svg}`} role="img" aria-label={label}>
        {Array.from({ length: N }, (_, i) => {
          if (!shown) return <circle key={i} cx={cx(i)} cy={cy(i)} r={3} className={s.empty} />;
          return shown[i] ? (
            <circle key={i} cx={cx(i)} cy={cy(i)} r={5} className={s.blue} />
          ) : (
            <rect key={i} x={cx(i) - 4.5} y={cy(i) - 4.5} width={9} height={9} className={s.red} />
          );
        })}
        {ring >= 0 && <circle cx={cx(ring)} cy={cy(ring)} r={8} className={s.ring} />}
        <text x={0} y={GRID_H + 11} className={s.legend}>
          {pool ? "Each person's clue, counted as a vote." : "● blue pick  ■ red pick  ◯ lead of 2 first seen"}
        </text>
      </svg>
      <Row>
        {ORDER.map((i) => { const a = ACCS[i]; return (
          <Control key={a} className={i === ai ? "active" : ""} disabled={locked} aria-pressed={i === ai} onClick={() => { setAi(i); setPool(false); }}>
            Clue right {i === 1 ? "2 in 3" : accLabel(a)}
          </Control>
        ); })}
      </Row>
      <Row>
        <Control disabled={locked} onClick={() => run(1)}>Run 1</Control>
        <Control disabled={locked} onClick={() => run(100)}>Run 100</Control>
        <Control disabled={locked} onClick={() => run(10000)}>Run 10,000</Control>
        <Control className={pool ? "active" : ""} disabled={locked || !seq} onClick={togglePool}>
          {pool ? "Show the crowd" : "Pool the clues"}
        </Control>
      </Row>
      <Row>
        <Readout label="Clues right" value={locked ? "?" : ai === 1 ? "2 in 3" : accLabel(acc)} />
        <Readout label="Runs (seeds 1 to n)" value={ready ? fmt(t.n) : "-"} />
        <Readout label="Crowd wrong" value={ready ? `${fmt(t.wrong)} (${pct(t.wrong / t.n)})` : "-"} />
        <Readout label="Pooled wrong" value={ready ? `${fmt(t.poolWrong)} (${pct(t.poolWrong / t.n, 2)})` : "-"} />
      </Row>
    </div>
  );
}

export default function TwoSaidBlue({ slug }: { slug: string }) {
  const [tallies, setTallies] = useState<Tally[]>([EMPTY, EMPTY, EMPTY]);
  const [ai, setAi] = useState(1);
  let q = 1;
  for (let i = 0; i < tallies.length; i++) if (tallies[i].n > tallies[q].n) q = i;
  const t = tallies[q];
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A hidden urn is mostly blue or mostly red. 100 people each get a private clue, right 2 times in 3, see everyone's earlier picks, and choose a colour. How often does the crowd lock onto the wrong colour?",
        options: ["Almost never (under 1 time in 100)", "About 1 time in 5", "About half the time"],
        answer: 1,
      }}
      exploreHint="Run 1, then 100, then 10,000 crowds, and pool the clues."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your {fmt(t.n)} crowds (seeds 1 to {fmt(t.n)}, clue right {accLabel(ACCS[q])}), {fmt(t.wrong)} locked onto the wrong colour ({pct(t.wrong / Math.max(t.n, 1))}); exact: {pct(exactWrong(ACCS[q]))}. A plain vote of the same clues was wrong in {fmt(t.poolWrong)}.
          </p>
          <p>
            Once two picks lead, one clue can no longer change the next pick, so the crowd adds no new information. If the first two clues are both wrong (1 in 9), that start sticks.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} tallies={tallies} setTallies={setTallies} ai={ai} setAi={setAi} />}
        </Milestones>
      )}
    </Lesson>
  );
}
