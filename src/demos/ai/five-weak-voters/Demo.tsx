"use client";

// Majority vote of n toy models, each right with chance 0.6 on a yes/no question.
// Independent: P(majority of 5 right) = P(at least 3 of 5) = 0.6826; 21 voters: 0.8256.
// "Same mistakes": every voter copies voter 1's answer, so the vote is right exactly when one is (0.6).
// Batch b of 200 questions: mulberry32(b) draws 21 outcomes per question (voters 1..n use the first n).
// Batches 1, 2, 3, ... in order, untuned. Batch 1: 1 voter 121/200, 5 voters 138, 21 voters 158.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const P = 0.6;
const QN = 200;
const MAXV = 21;
const COUNTS = [1, 5, 21] as const;
function binom(n: number, k: number) {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
}
/** Exact chance that a strict majority of n independent voters is right. */
function majority(n: number, p = P) {
  let s = 0;
  for (let k = Math.floor(n / 2) + 1; k <= n; k++) s += binom(n, k) * p ** k * (1 - p) ** (n - k);
  return s;
}
function batch(b: number) {
  const r = mulberry32(b);
  return Array.from({ length: QN }, () => Array.from({ length: MAXV }, () => r() < P));
}
/** Which of the 200 questions the vote got right. */
function voteRight(b: number, n: number, same: boolean) {
  return batch(b).map((q) => {
    const votes = same ? Array<boolean>(n).fill(q[0]) : q.slice(0, n);
    return votes.filter(Boolean).length * 2 > n;
  });
}
const Q_N = 5;
const Q_EXACT = majority(Q_N); // 0.6826
// MODEL END

const pct = (v: number, d = 0) => `${(v * 100).toFixed(d)}%`;
type Key = "one" | "five" | "many" | "same";

export default function FiveWeakVoters({ slug }: { slug: string }) {
  const [n, setN] = useState<number>(1);
  const [same, setSame] = useState(false);
  const [b, setB] = useState(1);
  const [seen, setSeen] = useState<Partial<Record<Key, { c: number; b: number }>>>({ one: { c: voteRight(1, 1, false).filter(Boolean).length, b: 1 } });

  const right = voteRight(b, n, same);
  const count = right.filter(Boolean).length;
  const longRun = same || n === 1 ? P : majority(n);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${Q_N} independent models are each right ${pct(P)} of the time on a yes/no question. Their majority vote is right:`,
        options: [pct(P), `About ${pct(Q_EXACT)}`, "About 90%"],
        answer: 1,
      }}
      exploreHint="Add voters and watch the grid. Then make them share their mistakes."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {(() => {
              const one = seen.one ?? { c: 0, b: 1 };
              const tag = (v: { b: number }) => (v.b !== one.b ? ` (batch ${v.b})` : "");
              return [
                `On batch ${one.b} one model got ${one.c} of ${QN} right.`,
                seen.five ? `Five voting got ${seen.five.c}${tag(seen.five)}; over the long run a vote of five is right ${pct(Q_EXACT, 1)} of the time.` : "",
                seen.many ? `Twenty-one got ${seen.many.c}${tag(seen.many)} (long run ${pct(majority(21), 1)}).` : "",
                seen.same ? `Sharing mistakes, the vote got ${seen.same.c}${tag(seen.same)}: exactly what one model got on that batch.` : "",
              ].join(" ");
            })()}
          </p>
          <p>
            Five voters are wrong only when at least three are wrong on the same question. If their mistakes are
            independent, that is rarer than one being wrong. If they copy each other, it is exactly as common.
          </p>
          <p>A vote of weak models beats each one only as far as they are wrong in different places.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["five", "same-mistakes"]}>
          {(reach) => {
            const show = (nn: number, ss: boolean, bb: number) => {
              setN(nn);
              setSame(ss);
              setB(bb);
              const c = voteRight(bb, nn, ss).filter(Boolean).length;
              const key: Key = nn === 1 ? "one" : ss ? "same" : nn === 5 ? "five" : "many";
              setSeen((x) => ({ ...x, [key]: { c, b: bb } }));
              if (nn === Q_N && !ss) reach("five");
              if (nn > 1 && ss) reach("same-mistakes");
            };
            const cols = 20;
            const cell = 14.5;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy models · batch {b}</span>
                <svg viewBox="0 0 300 150" className="stage-svg" role="img" aria-label={locked ? "200 questions" : `${count} of 200 right`}>
                  {right.map((ok, i) => (
                    <rect
                      key={i}
                      x={2 + (i % cols) * (cell + 0.4)}
                      y={2 + Math.floor(i / cols) * (cell + 0.4)}
                      width={cell - 1.5}
                      height={cell - 1.5}
                      rx={2}
                      fill={locked ? "var(--bg-2)" : ok ? "var(--good)" : "var(--bad)"}
                      opacity={locked ? 1 : ok ? 0.85 : 0.6}
                    />
                  ))}
                </svg>
                <p className={s.caption}>{locked ? "200 yes/no questions" : `Green: the ${n === 1 ? "model" : "vote"} was right`}</p>
                <Row>
                  {COUNTS.map((c) => (
                    <Control key={c} className={n === c ? "active" : ""} disabled={locked || n === c} onClick={() => show(c, c === 1 ? false : same, b)}>
                      {c} {c === 1 ? "model" : "voters"}
                    </Control>
                  ))}
                  <Control className={same ? "active" : ""} aria-pressed={same} disabled={locked || n === 1} onClick={() => show(n, !same, b)}>
                    {same ? "✓ Same mistakes" : "Same mistakes"}
                  </Control>
                  <Control disabled={locked} onClick={() => show(n, same, b + 1)}>
                    New batch
                  </Control>
                </Row>
                <Row>
                  <Readout label="This batch" value={locked ? "–" : `${count}/${QN}`} />
                  <Readout label="Long run" value={locked ? "–" : pct(longRun, 1)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
