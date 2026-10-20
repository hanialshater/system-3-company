"use client";

// False discovery rate. 1,000 tested ideas on a 40 x 25 grid (filled column by column, true ideas first).
// The test catches 80% of true ideas and passes 5% of duds by fluke (stage settings, stated on the card).
// tp = 1,000 x prior x 0.8; fp = 1,000 x (1 - prior) x 0.05, drawn rounded (49.5 -> 50 at 1%).
//   50% true: 400 real, 25 flukes, 6%.   1% true: 8 real, 50 flukes, 86%.   10% true: 80 real, 45 flukes, 36%.
// Presets in DOM order: 50%, 1%, 10% (the question's case last). Milestones: p1, p10. Each preset seen leaves
// its share in the trace line, so every share the reveal quotes is on the stage when it opens.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const N = 1000;
const ROWS = 25;
const COLS = 40;
const PITCH = 8;
const R = 2.3;
const CATCH = 0.8;
const FLUKE = 0.05;
const PRIORS = [50, 1, 10] as const;
const MILESTONES = ["p1", "p10"] as const;

type Counts = { trues: number; tp: number; fp: number; share: number };
function counts(prior: number): Counts {
  const trues = Math.round((N * prior) / 100);
  const tp = Math.round(trues * CATCH);
  const fp = Math.round((N - trues) * FLUKE);
  return { trues, tp, fp, share: Math.round((100 * fp) / (tp + fp)) };
}
/** Spread k marks evenly over n items: item j is marked when the running quota steps up. */
const marked = (j: number, k: number, n: number) => Math.floor(((j + 1) * k) / n) > Math.floor((j * k) / n);

const xy = (i: number) => [PITCH / 2 + Math.floor(i / ROWS) * PITCH, PITCH / 2 + (i % ROWS) * PITCH];
const circ = (x: number, y: number, r: number) => `M${x - r},${y}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0`;

function paths(prior: number | null) {
  const p = { trueIdle: "", truePass: "", dud: "", fluke: "", cross: "", ring: "" };
  if (prior === null) {
    for (let i = 0; i < N; i++) {
      const [x, y] = xy(i);
      p.dud += circ(x, y, R);
    }
    return p;
  }
  const c = counts(prior);
  for (let i = 0; i < N; i++) {
    const [x, y] = xy(i);
    if (i < c.trues) {
      const pass = marked(i, c.tp, c.trues);
      if (pass) {
        p.truePass += circ(x, y, R);
        p.ring += circ(x, y, R + 1.4);
      } else p.trueIdle += circ(x, y, R);
    } else {
      const j = i - c.trues;
      if (marked(j, c.fp, N - c.trues)) {
        p.fluke += circ(x, y, R);
        p.ring += circ(x, y, R + 1.4);
        const d = 1.6;
        p.cross += `M${x - d},${y - d}L${x + d},${y + d}M${x - d},${y + d}L${x + d},${y - d}`;
      } else p.dud += circ(x, y, R);
    }
  }
  return p;
}

type Seen = Partial<Record<number, Counts>>;

function Stage({ locked, reach, prior, setPrior, seen, setSeen }: {
  locked: boolean;
  reach: (n: string) => void;
  prior: number | null;
  setPrior: (v: number) => void;
  seen: Seen;
  setSeen: (v: Seen) => void;
}) {
  const shown = locked ? null : prior;
  const p = paths(shown);
  const c = shown === null ? null : counts(shown);
  const pick = (v: number) => {
    if (locked || v === prior) return;
    setPrior(v);
    setSeen({ ...seen, [v]: counts(v) });
    if (v === 1) reach("p1");
    if (v === 10) reach("p10");
  };
  const trace = PRIORS.filter((v) => seen[v] && v !== shown).map((v) => `${v}% true: ${seen[v]!.share}%`);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : "Dot = tested idea. Filled: works. Ring: passed. Red ×: fluke. Tests catch 80%; 5% of duds pass."}
      </p>
      <svg
        viewBox={`0 0 ${COLS * PITCH} ${ROWS * PITCH}`}
        className={`stage-svg ${s.svg}`}
        role="img"
        aria-label={c ? `${c.trues} true ideas of 1,000; passed: ${c.tp} real, ${c.fp} flukes` : "1,000 tested ideas, not yet sorted"}
      >
        <path d={p.dud} className={s.dud} />
        <path d={p.trueIdle} className={s.trueIdle} />
        <path d={p.truePass} className={s.truePass} />
        <path d={p.fluke} className={s.fluke} />
        <path d={p.cross} className={s.cross} />
        <path d={p.ring} className={s.ring} />
      </svg>
      <Row>
        {PRIORS.map((v) => (
          <Control key={v} disabled={locked} className={!locked && prior === v ? "active" : ""} aria-pressed={!locked && prior === v} onClick={() => pick(v)}>
            {v}% true
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Passed" value={c ? `${c.tp} real, ${c.fp} flukes` : "-"} />
        <Readout label="Flukes among passes" value={c ? `${c.share}%` : "-"} />
      </Row>
      {trace.length > 0 && <p className={s.trace}>Earlier: {trace.join(" · ")}</p>}
    </div>
  );
}

export default function SignificantButFalse({ slug }: { slug: string }) {
  const [prior, setPrior] = useState<number | null>(null);
  const [seen, setSeen] = useState<Seen>({});
  const q = seen[10] ?? counts(10);
  const one = seen[1] ?? counts(1);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "1,000 ideas tested; 10% work. Tests catch 80% of real effects; 5% of duds pass by fluke. What share of passing ideas are flukes?",
        options: ["About 5%", "About 20%", "About 35%"],
        answer: 2,
      }}
      exploreHint="Try each share of true ideas, ending on 10%."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With 10% of ideas true, the tests passed {q.tp} real effects and {q.fp} flukes: {q.share}% of the passes are false,
            not 5%. The 5% is the fluke rate among duds, and here 900 of the 1,000 ideas are duds.
          </p>
          <p>
            At 1% true, flukes swamped real finds: {one.share}%. How far to trust a significant result depends on how many of
            the tested ideas were likely to be true.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} prior={prior} setPrior={setPrior} seen={seen} setSeen={setSeen} />}
        </Milestones>
      )}
    </Lesson>
  );
}
