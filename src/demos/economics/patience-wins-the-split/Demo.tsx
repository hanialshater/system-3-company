"use client";

// Alternating offers (Rubinstein). Two players alternate offers on $1; each rejected round shrinks
// the pie by the chosen share. One picture: bars for games with a deadline after 1, 2, 3 … rounds,
// each bar the first proposer's share, solved by backward induction (share(1) = 1,
// share(n) = 1 − δ · share(n − 1), δ = 1 − shrink). The learner adds rounds at the front, one or ten at
// a time or straight to 400; the bars zigzag toward the dashed no-deadline share 1 / (1 + δ).
// Key state (v2, r6): a long game at the question's 10% shrink, and a long game at another shrink. Each long game
// is recorded (shrink, rounds, share, first-round offer) in a row that "1 round" does not clear; the reveal quotes
// the records. The dashed line is drawn only at a shrink with a recorded long game, at that recorded share (no
// pre-drawn limit). Round buttons come first in the DOM so the QA path runs 400 rounds at 10% before switching.
// v4 (learner r7): the 10% first-round step is kept in a "Seen" row under the records, so the reveal quotes a line that
// is still on the stage; the step line names its second factor (the responder's share if they propose next).
// v5 (learner r8, phone fit): reveal cut to <= 90 words; the model caveat moved onto the chart as its caption; the
// readouts row is gone (the step line says what the proposer keeps, the chart footer says the rounds); the shrink
// buttons read "Shrink 10%", "30%", "50%" so they fit one row; the "1 round" button is folded into the "400 rounds"
// button, which reads "Back to 1" once the game has 400 rounds (bar 1 of the chart always shows the one-round 100%);
// the chart is 48 units shorter.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SHRINKS = [0.1, 0.3, 0.5];
const START_SHRINK = 0.1;
const LONG = 400;
const LONG_ENOUGH = 50;
const SHOW = 20; // bars drawn
const MILESTONES = ["long-10", "long-other"] as const;
type Rec = { shrink: number; n: number; keep: number };

/** First proposer's share with a deadline after n rounds, by backward induction. */
function share(shrink: number, n: number): number {
  const d = 1 - shrink;
  let x = 1; // last round: the proposer takes everything
  for (let k = 2; k <= n; k++) x = 1 - d * x;
  return x;
}
const limit = (shrink: number) => 1 / (1 + (1 - shrink));
const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
const whole = (v: number) => `${Math.round(v * 100)}%`;
/** The first-round step for a game of nn rounds, in the stage's wording. */
const stepText = (sh: number, nn: number) =>
  `offer ${(1 - sh).toFixed(1)} × ${pct(share(sh, nn - 1))} = ${pct((1 - sh) * share(sh, nn - 1))}; keep ${pct(share(sh, nn))}`;

// Geometry (viewBox 340 × 148).
const X0 = 40;
const X1 = 332;
const Y0 = 24;
const Y1 = 126;
const SLOT = (X1 - X0) / SHOW;
const y = (v: number) => Y1 - v * (Y1 - Y0);

export default function PatienceWinsTheSplit({ slug }: { slug: string }) {
  const [shrink, setShrink] = useState(START_SHRINK);
  const [n, setN] = useState(1);
  const [recs, setRecs] = useState<Rec[]>([]);
  const q = recs.find((r) => r.shrink === START_SHRINK);
  const other = recs.filter((r) => r.shrink !== START_SHRINK).slice(-1)[0];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Two people alternate offers on $1; each rejected round shrinks it ${whole(START_SHRINK)}. With no end date, what does the first proposer get?`,
        options: ["About 90%", `About ${whole(limit(START_SHRINK))}`, `About ${whole(1 - limit(START_SHRINK))}`, "Exactly 50%"],
        answer: 1,
      }}
      exploreHint="Add rounds in front of the deadline and watch the first proposer's share settle."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With one round the proposer kept 100%. Each extra round lets the responder refuse and propose next, worth{" "}
            {(1 - START_SHRINK).toFixed(1)} of a proposer&apos;s share, so the proposer must offer that: your Seen row reads &quot;
            {stepText(START_SHRINK, q?.n ?? LONG)}.&quot;
          </p>
          <p>
            At {whole(START_SHRINK)}, your {q?.n ?? LONG} rounds left the first proposer <strong>{pct(q?.keep ?? limit(START_SHRINK))}</strong>,
            close to 1 ÷ (1 + {(1 - START_SHRINK).toFixed(1)}): a small edge when waiting is cheap.
            {other ? ` At ${whole(other.shrink)} shrink you saw ${pct(other.keep)}: costlier delay, bigger edge.` : ""}
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (sh: number, nn: number) => {
              setShrink(sh);
              setN(nn);
              if (nn >= LONG_ENOUGH) {
                const r: Rec = { shrink: sh, n: nn, keep: share(sh, nn) };
                setRecs((rs) => {
                  const old = rs.find((x) => x.shrink === sh);
                  if (old && old.n >= nn) return rs;
                  return [...rs.filter((x) => x.shrink !== sh), r].sort((a, b) => a.shrink - b.shrink);
                });
                reach(sh === START_SHRINK ? "long-10" : "long-other");
              }
            };
            const mine = recs.find((r) => r.shrink === shrink);
            const d = 1 - shrink;
            const cur = share(shrink, n);
            const prev = n > 1 ? share(shrink, n - 1) : null;
            const bars = Math.min(n, SHOW);
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {locked
                    ? "Predict first."
                    : prev === null
                      ? "One round: the proposer offers nothing and keeps 100%."
                      : `First round: offer ${d.toFixed(1)} × ${pct(prev)} (their share proposing next) = ${pct(d * prev)}; keep ${pct(cur)}.`}
                </p>
                <svg viewBox="0 0 340 148" className="stage-svg" role="img" aria-label={`First proposer's share for games of 1 to ${bars} rounds`}>
                  <text x={X0} y={11} className={s.label}>
                    Model: both rational, both know the shrink
                  </text>
                  {[0, 0.5, 1].map((v) => (
                    <g key={v}>
                      <line x1={X0} y1={y(v)} x2={X1} y2={y(v)} className={s.grid} />
                      <text x={X0 - 4} y={y(v) + 4} textAnchor="end" className={s.label}>
                        {v * 100}%
                      </text>
                    </g>
                  ))}
                  {!locked &&
                    Array.from({ length: bars }, (_, i) => {
                      const v = share(shrink, i + 1);
                      const on = i + 1 === n;
                      return <rect key={i} x={X0 + i * SLOT + 1.5} y={y(v)} width={SLOT - 3} height={Y1 - y(v)} className={on ? s.barOn : s.bar} />;
                    })}
                  {!locked && mine && (
                    <>
                      <line x1={X0} y1={y(mine.keep)} x2={X1} y2={y(mine.keep)} className={s.limit} />
                      <text x={X1} y={y(mine.keep) - 5} textAnchor="end" className={s.value}>
                        your {mine.n} rounds: {pct(mine.keep)}
                      </text>
                    </>
                  )}
                  <text x={X0} y={142} className={s.label}>
                    1 round
                  </text>
                  <text x={X1} y={142} textAnchor="end" className={s.label}>
                    {locked ? `${SHOW} rounds` : n > SHOW ? `bars 1–${SHOW} of ${n} · dark = this game` : `this game: ${n} round${n > 1 ? "s" : ""}, dark`}
                  </text>
                </svg>
                <Row>
                  <Control disabled={locked || n >= LONG} onClick={() => set(shrink, n + 1)}>
                    +1 round
                  </Control>
                  <Control disabled={locked || n >= LONG} onClick={() => set(shrink, Math.min(LONG, n + 10))}>
                    +10 rounds
                  </Control>
                  <Control disabled={locked} onClick={() => set(shrink, n >= LONG ? 1 : LONG)}>
                    {n >= LONG ? "Back to 1" : `${LONG} rounds`}
                  </Control>
                </Row>
                <Row>
                  {SHRINKS.map((sh) => (
                    <Control
                      key={sh}
                      className={shrink === sh ? "active" : ""}
                      disabled={locked || shrink === sh}
                      aria-pressed={shrink === sh}
                      aria-label={`Shrink ${whole(sh)}`}
                      onClick={() => set(sh, n)}
                    >
                      {sh === SHRINKS[0] ? `Shrink ${whole(sh)}` : whole(sh)}
                    </Control>
                  ))}
                </Row>
                <p className={s.msg}>
                  {locked || recs.length === 0
                    ? ""
                    : `Long games (stand-in for no deadline): ${recs.map((r, i) => `${i ? "" : "shrink "}${whole(r.shrink)} → ${pct(r.keep)}`).join(" · ")}`}
                </p>
                <p className={s.msg} data-testid="seen">
                  {locked || !q ? "" : `Seen at ${whole(START_SHRINK)}, ${q.n} rounds: ${stepText(START_SHRINK, q.n)}.`}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
