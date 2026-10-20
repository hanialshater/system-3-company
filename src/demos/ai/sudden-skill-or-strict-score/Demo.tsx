"use client";

// Emergence as a metric artifact. Six model sizes get a share p of answer tokens right:
// 50, 60, 70, 80, 90, 95%. Toy assumption: each token is right independently, so a 10-token answer is
// fully right with probability p^10: 0.098%, 0.60%, 2.8%, 10.7%, 34.9%, 59.9% (stage: one decimal).
// Scored per token the same models read 50..95%. With 1-token answers the two scores are equal (p).
// Deterministic; no randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const P = [0.5, 0.6, 0.7, 0.8, 0.9, 0.95];
/** Exact-match score: every one of `len` tokens right, independently. */
const exact = (p: number, len: number) => p ** len;
const WHOLE = P.map((p) => exact(p, 10));
const ONE = P.map((p) => exact(p, 1));
// MODEL END

type Mode = "whole" | "token" | "one";
const MILESTONES = ["whole-scored", "per-token-scored"] as const;
const pct = (f: number) => `${Number((f * 100).toFixed(1))}%`;
const X0 = 36;
const CW = 40;
const GAP = 11;
const TOP = 22;
const H = 150;
const y = (f: number) => TOP + (1 - f) * H;
const cx = (i: number) => X0 + i * (CW + GAP);

const BUTTONS: { mode: Mode; label: string }[] = [
  { mode: "whole", label: "Score whole answers" },
  { mode: "token", label: "Score each token" },
  { mode: "one", label: "Answers 1 token long" },
];

export default function SuddenSkillOrStrictScore({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [seenWhole, setSeenWhole] = useState<number[] | null>(null);
  const [seenToken, setSeenToken] = useState<number[] | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your benchmark grades six model sizes that get 50, 60, 70, 80, 90 and 95% of answer tokens right. Answers are 10 tokens; only fully right answers count. How do the scores move?",
        options: ["Climb steadily", "Stay near zero, then shoot up", "Shoot up, then level off"],
        answer: 1,
      }}
      exploreHint="Score whole answers, then score each token, and compare the columns."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const w = seenWhole ?? WHOLE;
        const t = seenToken ?? P;
        return (
          <>
            <p>
              Scored on whole answers, the four smaller models sat near zero, from {pct(w[0])} to {pct(w[3])}, then the score
              shot to <strong>{pct(w[5])}</strong>: it looks like a skill switching on. Scored token by token, the same models
              climbed steadily from {pct(t[0])} to {pct(t[5])}.
            </p>
            <p>
              Nothing sudden happened inside them; ten tokens all right is p to the tenth power, which stays tiny until p is near
              1. Before calling an ability emergent, check whether a smoother score shows it growing all along.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (m: Mode | null) => {
              setMode(m);
              if (m === "whole") {
                setSeenWhole(WHOLE);
                reach("whole-scored");
              }
              if (m === "token") {
                setSeenToken(P);
                reach("per-token-scored");
              }
            };
            // The filled set is the current score; recorded 10-token whole-answer scores stay as dashed outlines.
            const filled = locked || !mode ? null : mode === "whole" ? WHOLE : mode === "token" ? P : ONE;
            const trace = !locked && seenWhole && mode !== "whole" ? seenWhole : null;
            const tokenTrace = !locked && seenToken && !mode ? seenToken : null;
            const legend = locked
              ? "Score of each model size"
              : mode === "one"
                ? "1-token answers: whole score = token score"
                : mode === "token"
                  ? "Filled: each token · dashed: whole answers"
                  : mode === "whole"
                    ? "Filled: whole 10-token answers"
                    : "Dashed: scores you saw";
            const xl = 4;
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 340 208" className={`stage-svg ${s.svg}`} role="img" aria-label={legend}>
                  <text x={X0} y={12} className={s.small} fill="var(--muted)">
                    {legend}
                  </text>
                  {[0, 0.25, 0.5, 0.75, 1].map((g) => (
                    <g key={g}>
                      <line x1={X0 - 4} x2={cx(5) + CW} y1={y(g)} y2={y(g)} className={s.grid} />
                      <text x={X0 - 6} y={y(g) + 4} textAnchor="end" className={s.small} fill="var(--muted)">
                        {g * 100}%
                      </text>
                    </g>
                  ))}
                  {SIZES.map((name, i) => (
                    <g key={name}>
                      {filled && <rect x={cx(i)} y={y(filled[i])} width={CW} height={H * filled[i]} className={s.colOn} />}
                      {tokenTrace && <rect x={cx(i)} y={y(tokenTrace[i])} width={CW} height={H * tokenTrace[i]} className={s.colTrace} opacity={0.5} />}
                      {trace && <rect x={cx(i)} y={y(trace[i])} width={CW} height={H * trace[i]} className={s.colTrace} />}
                      {filled && (
                        <text x={cx(i) + CW / 2} y={y(filled[i]) - 4} textAnchor="middle" className={s.value} fill="var(--fg)">
                          {pct(filled[i])}
                        </text>
                      )}
                      {trace && (
                        <text
                          x={cx(i) + CW / 2}
                          y={y(trace[i]) - 4}
                          textAnchor="middle"
                          className={s.value}
                          fill={filled ? "var(--fg)" : "var(--muted)"}
                        >
                          {pct(trace[i])}
                        </text>
                      )}
                      {tokenTrace && (
                        <text x={cx(i) + CW / 2} y={y(tokenTrace[i]) - 4} textAnchor="middle" className={s.value} fill="var(--muted)">
                          {pct(tokenTrace[i])}
                        </text>
                      )}
                      <text x={cx(i) + CW / 2} y={TOP + H + 16} textAnchor="middle" className={s.label} fill="var(--fg)">
                        {name}
                      </text>
                    </g>
                  ))}
                  <line x1={X0 - 4} x2={cx(5) + CW} y1={TOP + H} y2={TOP + H} stroke="var(--fg)" strokeWidth={1} />
                  <text x={170} y={TOP + H + 32} textAnchor="middle" className={s.small} fill="var(--muted)">
                    Toy: each token right or wrong independently
                  </text>
                </svg>
                <p className={s.msg} data-testid="readout">
                  {locked
                    ? "XL: –"
                    : mode === "one"
                      ? `XL, 1-token answers: ${pct(ONE[xl])} whole · ${pct(P[xl])} tokens`
                      : `XL: ${seenWhole ? pct(seenWhole[xl]) : "–"} whole answers · ${seenToken ? pct(seenToken[xl]) : "–"} tokens`}
                </p>
                <Row foldAtReveal>
                  {BUTTONS.map((b) => (
                    <Control
                      key={b.mode}
                      className={mode === b.mode ? "active" : ""}
                      aria-pressed={mode === b.mode}
                      disabled={locked || mode === b.mode}
                      onClick={() => pick(b.mode)}
                    >
                      {b.label}
                    </Control>
                  ))}
                  <Control disabled={locked || !mode} onClick={() => pick(null)}>
                    Reset
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
