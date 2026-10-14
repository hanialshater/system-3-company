"use client";

// Pairwise ranking toy. Spam scores 0.9, 0.8, 0.7, 0.5, 0.3; real-mail scores 0.6, 0.4, 0.3, 0.2, 0.1.
// A pair is a win if the spam scores higher, half a win on a tie. Wins / pairs = AUC.
// Deterministic; no randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const SPAM = [0.9, 0.8, 0.7, 0.5, 0.3];
const REAL = [0.6, 0.4, 0.3, 0.2, 0.1];
const PAIRS = SPAM.length * REAL.length;
/** 1 = spam higher, 0.5 = tie, 0 = real higher */
const score = (sp: number, re: number) => (sp > re ? 1 : sp === re ? 0.5 : 0);
const rowWins = (r: number) => REAL.reduce((t, re) => t + score(SPAM[r], re), 0);
const WINS = SPAM.reduce((t, _, r) => t + rowWins(r), 0);
const AUC = WINS / PAIRS;
// MODEL END

const fmtWins = (w: number) => (Number.isInteger(w) ? String(w) : w.toFixed(1));
const CELL = 38;
const GX = 66;
const GY = 40;

export default function RankThePairs({ slug }: { slug: string }) {
  const [rows, setRows] = useState(0);

  const wins = SPAM.slice(0, rows).reduce((t, _, r) => t + rowWins(r), 0);
  const checked = rows * REAL.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Spam scores ${SPAM.join(", ")}; real mail scores ${REAL.join(", ")}. Pick one spam and one real email at random. The chance the spam scores higher (a tie counts half):`,
        options: ["64%", "75%", "86%", "94%"],
        answer: 2,
      }}
      exploreHint="Check the spam rows and count the wins."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In this toy the spam scored higher in {fmtWins(wins)} of {checked} pairs checked
            {rows === SPAM.length ? `, which is ${Math.round((wins / checked) * 100)}%` : ""}. The 0.3 against 0.3 tie counts half; the 0.5
            spam loses to the real 0.6 and the 0.3 spam to 0.4.
          </p>
          <p>
            That share of correctly ordered pairs is called AUC, the area under the ROC curve. It needs no cutoff: every spam-real
            pair is compared directly, so you could count it without choosing a threshold.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-row", "all-pairs"]}>
          {(reach) => {
            const check = (to: number) => {
              const next = Math.min(SPAM.length, to);
              setRows(next);
              reach("first-row");
              if (next === SPAM.length) reach("all-pairs");
            };
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy scores</span>
                <p className={s.caption}>Row: a spam score. Column: a real-mail score. Tick when the spam scores higher.</p>
                <svg viewBox="0 0 320 250" className="stage-svg" role="img" aria-label={`${checked} of ${PAIRS} pairs checked`}>
                  <text x={GX + (REAL.length * CELL) / 2} y={14} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                    real mail score
                  </text>
                  <text x={6} y={GY - 6} className={s.tiny} fill="var(--muted)">
                    spam score
                  </text>
                  {REAL.map((v, c) => (
                    <text key={c} x={GX + c * CELL + CELL / 2} y={GY - 8 + 0} textAnchor="middle" className={s.small} fill="var(--fg)">
                      {v}
                    </text>
                  ))}
                  {SPAM.map((sp, r) => (
                    <g key={r}>
                      <text x={GX - 10} y={GY + r * CELL + CELL / 2 + 4} textAnchor="end" className={s.small} fill="var(--fg)">
                        {sp}
                      </text>
                      {REAL.map((re, c) => {
                        const done = !locked && r < rows;
                        const v = score(sp, re);
                        const fill = !done ? "var(--bg-2)" : v === 1 ? "var(--good)" : v === 0 ? "var(--bad)" : "var(--muted)";
                        return (
                          <g key={c}>
                            <rect x={GX + c * CELL + 2} y={GY + r * CELL + 2} width={CELL - 4} height={CELL - 4} rx={6} fill={fill} opacity={done ? 0.55 : 1} stroke="var(--line)" strokeWidth={1} />
                            {done && (
                              <text x={GX + c * CELL + CELL / 2} y={GY + r * CELL + CELL / 2 + 5} textAnchor="middle" className={s.label} fill="var(--fg)">
                                {v === 1 ? "✓" : v === 0 ? "✗" : "½"}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  ))}
                </svg>
                <Row>
                  <Control disabled={locked} onClick={() => check(rows + 1)}>
                    Check next spam row
                  </Control>
                  <Control disabled={locked} onClick={() => check(SPAM.length)}>
                    Check all pairs
                  </Control>
                </Row>
                <Row>
                  <Readout label="Pairs checked" value={locked ? "–" : `${checked} of ${PAIRS}`} />
                  <Readout label="Spam higher" value={locked ? "–" : fmtWins(wins)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
