"use client";

// Bottleneck toy model. A jar holds 1,000 gene copies; 10 (1%) are a rare variant.
// A crash keeps 10 survivors = 20 copies drawn at random without replacement.
// The population regrows to 1,000 copies by copying the survivors (50 copies each),
// so a variant missing from the 20 is gone for good. No selection, mutation or migration.
// Jar n is drawn with mulberry32(n): seeds are the jar numbers 1, 2, 3 ..., not chosen.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const COPIES = 1000;
const RARE = 10; // 1%
const KEPT = 20; // 10 survivors x 2 copies
const COLS = 40;
const GAP = 7;
const ROWS = COPIES / COLS;
const BATCH = 20;
const MILESTONES = ["one-jar", "many-jars"] as const;

/** Chance that none of KEPT copies drawn without replacement is rare (the stage's model). */
const P_LOST = (() => {
  let p = 1;
  for (let k = 0; k < KEPT; k++) p *= (COPIES - RARE - k) / (COPIES - k);
  return p;
})();
const P_LOST_PCT = Math.round(100 * P_LOST); // 82
const P_REPL = (1 - RARE / COPIES) ** KEPT; // 0.818, with replacement
const RARE_PCT = Math.round((100 * RARE) / COPIES); // 1

/** Rare copies among the KEPT survivors of jar n (partial Fisher-Yates, seed n). */
function squeeze(n: number): number {
  const rng = mulberry32(n);
  const pool = Array.from({ length: COPIES }, (_, k) => k);
  let rare = 0;
  for (let k = 0; k < KEPT; k++) {
    const j = k + Math.floor(rng() * (COPIES - k));
    [pool[k], pool[j]] = [pool[j], pool[k]];
    if (pool[k] < RARE) rare++;
  }
  return rare;
}

// Where the red dots sit in the jar: a fixed scatter (layout only, not part of the draw).
const ORDER = (() => {
  const rng = mulberry32(2026);
  const idx = Array.from({ length: COPIES }, (_, i) => i);
  for (let i = COPIES - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx; // ORDER[r] = position of the r-th red slot
})();
const RANK = (() => {
  const r = Array(COPIES).fill(0);
  ORDER.forEach((pos, i) => (r[pos] = i));
  return r;
})();

interface Tally {
  jars: number;
  lost: number;
  last: number; // rare copies kept in the last jar
}

function Stage({ locked, reach, t, setT }: { locked: boolean; reach: (n: string) => void; t: Tally; setT: (t: Tally) => void }) {

  const run = (k: number) => {
    let { jars, lost, last } = t;
    for (let i = 0; i < k; i++) {
      jars += 1;
      last = squeeze(jars);
      if (last === 0) lost += 1;
    }
    setT({ jars, lost, last });
    if (jars >= 1) reach("one-jar");
    if (jars >= BATCH) reach("many-jars");
  };

  const fresh = t.jars === 0;
  const redCount = fresh ? RARE : t.last * (COPIES / KEPT);
  const W = COLS * GAP;
  const top = 26; // room for the survivor row

  const msg = locked
    ? `Make a prediction to start. Toy jar: 1,000 gene copies, ${RARE} red (${RARE_PCT}%).`
    : fresh
      ? `1,000 copies, ${RARE} red. A squeeze keeps 10 survivors: 20 copies (top row).`
      : `Jar ${t.jars}: ${t.last} red of 20 kept. Red lost in ${t.lost} of ${t.jars} jars.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`-4 -4 ${W + 8} ${top + ROWS * GAP + 8}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {/* the 20 surviving copies */}
        {Array.from({ length: KEPT }, (_, i) => {
          const on = !fresh && !locked;
          const red = on && i < t.last;
          return (
            <circle
              key={`k${i}`}
              cx={W / 2 + (i - (KEPT - 1) / 2) * 13}
              cy={9}
              r={5}
              className={!on ? s.slot : red ? s.red : s.common}
            />
          );
        })}
        <rect x={-2} y={top - 4} width={W + 4} height={ROWS * GAP + 6} rx={8} className={s.jar} />
        {Array.from({ length: COPIES }, (_, i) => (
          <circle
            key={i}
            cx={(i % COLS) * GAP + GAP / 2}
            cy={top + Math.floor(i / COLS) * GAP + GAP / 2}
            r={2.5}
            className={RANK[i] < redCount ? s.red : s.common}
          />
        ))}
      </svg>

      <p className={s.msg} aria-live="polite">{msg}</p>

      <Row>
        <Control disabled={locked} onClick={() => run(1)}>Squeeze 1 jar</Control>
        <Control disabled={locked} onClick={() => run(BATCH)}>Squeeze {BATCH} jars</Control>
        <Control disabled={locked || fresh} onClick={() => setT({ jars: 0, lost: 0, last: 0 })}>Start over</Control>
      </Row>
    </div>
  );
}

export default function FewSurvivors({ slug }: { slug: string }) {
  const [t, setT] = useState<Tally>({ jars: 0, lost: 0, last: 0 });
  // The reveal quotes the largest tally the learner reached (kept if they start over).
  const [best, setBest] = useState<Tally>({ jars: 0, lost: 0, last: 0 });
  const update = (n: Tally) => {
    setT(n);
    if (n.jars > best.jars) setBest(n);
  };
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy model: a species crashes to 10 survivors, so 20 gene copies drawn at random. A variant on ${RARE_PCT}% of copies: how often is it lost?`,
        options: ["About 10% of crashes", "About 50% of crashes", `About ${P_LOST_PCT}% of crashes`],
        answer: 2,
      }}
      exploreHint={`Squeeze one jar and look at the regrown jar. Then squeeze ${BATCH} more.`}
      minInteractions={MILESTONES.length}
      reveal={() => <Reveal best={best} />}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} t={t} setT={update} />}
        </Milestones>
      )}
    </Lesson>
  );
}

function Reveal({ best }: { best: Tally }) {
  return (
    <>
      <p>
        Your {best.jars} jars lost red in <strong>{best.lost}</strong> ({Math.round((100 * best.lost) / Math.max(1, best.jars))}%).
      </p>
      <p>
        Each surviving copy has a {100 - RARE_PCT}% chance of not being red, and all 20 have to miss:
        0.99<sup>20</sup> &asymp; {Math.round(100 * P_REPL)}% ({(100 * P_LOST).toFixed(1)}% drawing from this jar of 1,000).
        So the variant is lost in <strong>about {P_LOST_PCT}%</strong> of crashes; a short tally wobbles around that.
      </p>
      <p>
        Regrowing only copies the survivors. The jar fills back to 1,000, but a variant missing from the 20 cannot return
        without new mutation or migrants. When red did survive, it came back at 5% or 10%, not 1%: chance, not fitness.
      </p>
      <p className="muted">Toy model: survivors random, no selection, mutation or migration. Jar n uses seed n, not chosen.</p>
    </>
  );
}
