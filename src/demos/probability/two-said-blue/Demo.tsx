"use client";

// Information cascade. 100 people each get a private clue (right with probability ACC) and see earlier picks;
// a lead of 2+ is copied, else they follow their own clue. The stage draws the latest sequence (20 x 5 grid, read
// left to right) with a ring where the lead first reached 2. The learner runs 1, 100, 10,000 sequences (seeds
// 1..n, per accuracy; not shown to the learner), can swap the picks for a plain vote of the same clues, and changes clue accuracy.
// Key state: at least 100 sequences run and the pooled view seen. All from model.ts (seeded, computed instantly).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { ACCS, EMPTY, N, exactWrong, pct, pctSmall, plainWrong, runMore, sequence, type Tally } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["ran", "hundred", "pooled"] as const;
const ORDER = [0, 2, 1]; // chips: 60%, 80%, then the default 2 in 3 last, so the click path ends on the lesson's main run
const COLS = 20;
const PITCH = 16;
const W = COLS * PITCH;
const GRID_H = (N / COLS) * PITCH;
const accLabel = (a: number) => `${Math.round(a * 100)}%`;
const fmt = (n: number) => n.toLocaleString("en-US");

function Stage({ locked, reach, tallies, setTallies, ai, setAi, pool, setPool }: {
  locked: boolean;
  reach: (n: string) => void;
  tallies: Tally[];
  setTallies: (t: Tally[]) => void;
  ai: number;
  setAi: (i: number) => void;
  pool: boolean;
  setPool: (p: boolean) => void;
}) {
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
      <p className={s.msg}>{locked ? "Make a prediction to start." : "The urn is blue."}</p>
      <svg viewBox={`0 0 ${W} ${GRID_H + 24}`} className={`stage-svg ${s.svg} ${locked ? s.lockedSvg : ""}`} role="img" aria-label={label}>
        {Array.from({ length: N }, (_, i) => {
          if (!shown) return <circle key={i} cx={cx(i)} cy={cy(i)} r={3} className={s.empty} />;
          return shown[i] ? (
            <circle key={i} cx={cx(i)} cy={cy(i)} r={5} className={s.blue} />
          ) : (
            <rect key={i} x={cx(i) - 4.5} y={cy(i) - 4.5} width={9} height={9} className={s.red} />
          );
        })}
        {shown && !pool && seq && Array.from({ length: N }, (_, i) => seq.picks[i] !== seq.clues[i] ? (
          seq.picks[i] ? <circle key={`o${i}`} cx={cx(i)} cy={cy(i)} r={6.5} className={s.over} /> : <rect key={`o${i}`} x={cx(i) - 6} y={cy(i) - 6} width={12} height={12} className={s.over} />
        ) : null)}
        {ring >= 0 && <circle cx={cx(ring)} cy={cy(ring)} r={8} className={s.ring} />}
        <text x={0} y={GRID_H + 11} className={s.legend}>
          {pool ? "Each person's clue, counted as a vote." : "● blue pick  ■ red pick  ◯ lead of 2 first seen"}
        </text>
        {!pool && !locked && <text x={0} y={GRID_H + 22} className={s.legend}>outlined = pick against own clue</text>}
      </svg>
      <Row>
        {ORDER.map((i) => { const a = ACCS[i]; return (
          <Control key={a} className={i === ai ? "active" : ""} disabled={locked} aria-pressed={i === ai} onClick={() => { setAi(i); setPool(false); }}>
            {i === 1 ? "2 in 3" : accLabel(a)} right
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
        <Readout label="Crowds run" value={ready ? fmt(t.n) : "-"} />
        <Readout label="Crowd wrong" value={ready ? `${fmt(t.wrong)} (${pct(t.wrong / t.n)})` : "-"} />
        <Readout label="Pooled wrong (ties excluded)" value={ready ? `${fmt(t.poolWrong)} (${pct(t.poolWrong / t.n, 2)})` : "-"} />
      </Row>
    </div>
  );
}

export default function TwoSaidBlue({ slug }: { slug: string }) {
  const [tallies, setTallies] = useState<Tally[]>([EMPTY, EMPTY, EMPTY]);
  const [ai, setAi] = useState(1);
  const [pool, setPool] = useState(false);
  let q = 1;
  for (let i = 0; i < tallies.length; i++) if (tallies[i].n > tallies[q].n) q = i;
  const t = tallies[q];
  const v = ai; // the accuracy the stage is showing
  const last = tallies[v].n > 0 ? sequence(tallies[v].n, ACCS[v]) : null; // null when the stage is empty: no pointer to it
  const over = last ? last.picks.filter((p, i) => p !== last.clues[i]).length : 0;
  const nPick = last ? last.picks.filter(Boolean).length : 0;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "100 students guess if a hidden urn is mostly blue or mostly red, each seeing earlier picks and holding a clue right 2 times in 3. They copy any lead of 2, else follow their clue. How often is the crowd wrong?",
        options: ["About 1 time in 5", "Almost never (under 1 time in 100)", "About half the time"],
        answer: 0,
      }}
      exploreHint="Run 1, then 100, then 10,000 crowds, and pool the clues."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your {fmt(t.n)} crowds (clue right {q === 1 ? "2 in 3" : accLabel(ACCS[q])}), {fmt(t.wrong)} ended on the wrong colour ({pct(t.wrong / Math.max(t.n, 1))}); the exact chance is {pct(exactWrong(ACCS[q]))}. A plain vote of the same clues had a red majority in {fmt(t.poolWrong)} (ties not counted).
          </p>
          <p>
            Alone, one person is wrong {pct(1 - ACCS[q])} of the time, so the crowd does beat one person, but a plain vote of 100 such clues is wrong only {pctSmall(plainWrong(ACCS[q]))} of the time (ties not counted).
          </p>
          {last && (
            <p>
              Look at crowd {fmt(tallies[v].n)} on the stage (clue right {v === 1 ? "2 in 3" : accLabel(ACCS[v])}). {pool
                ? `The stage now shows the clues: ${last.poolBlue} of ${N} were blue, while the picks were ${nPick} blue out of ${N}. Tap Show the crowd to see the ring (where the picks first led by 2; after it no clue changed a pick) and the ${over} people who picked against their own clue (outlined).`
                : `The ring marks where the picks first led by 2, and after it no clue changed a pick. ${over} people picked against their own clue (outlined). Tap Pool the clues: ${last.poolBlue} of ${N} clues were blue, while the picks were ${nPick} blue out of ${N}.`}
            </p>
          )}
          <p>
            Two wrong clues at the start ({pct((1 - ACCS[q]) ** 2)}) is only the quickest way in. Red can also reach a lead of 2 after a split start, so the total is higher.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} tallies={tallies} setTallies={setTallies} ai={ai} setAi={setAi} pool={pool} setPool={setPool} />}
        </Milestones>
      )}
    </Lesson>
  );
}
