"use client";

// Prisoner's dilemma. One picture: the 2 × 2 payoff table (your payoff big, theirs small).
// Picking what the other player does lights up that column and marks which of your rows pays more in it.
// Key state: both columns seen, Defect ahead in each (5 > 3, 1 > 0).
// Model: invented payoffs, one round, no communication. The brief's ten-round tit-for-tat replay was
// dropped to keep one representation.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Move = 0 | 1; // 0 cooperate, 1 defect
const NAMES = ["cooperate", "defect"] as const;
// PAY[you][them] = [your payoff, their payoff]
const PAY: [number, number][][] = [
  [
    [3, 3],
    [0, 5],
  ],
  [
    [5, 0],
    [1, 1],
  ],
];
const MILESTONES = ["they-cooperate", "they-defect"] as const;

const best = (them: Move): Move => (PAY[1][them][0] > PAY[0][them][0] ? 1 : 0); // no ties in this table
const DOMINANT = best(0) === best(1) ? best(0) : null; // 1 (defect)
const gain = (them: Move) => Math.abs(PAY[1][them][0] - PAY[0][them][0]);

// Geometry (viewBox 320 × 214).
const GX = 96;
const GY = 40;
const CW = 108;
const CH = 80;

export default function TwoSuspectsPayoff({ slug }: { slug: string }) {
  const [them, setThem] = useState<Move | null>(null);
  const [you, setYou] = useState<Move | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Payoffs (you, other): both Cooperate ${PAY[0][0].join(", ")}. You Defect, they Cooperate ${PAY[1][0].join(", ")}. You Cooperate, they Defect ${PAY[0][1].join(", ")}. Both Defect ${PAY[1][1].join(", ")}. Whatever the other does, what is better for you?`,
        options: ["Cooperate", "Defect", "It depends on what they do"],
        answer: DOMINANT === null ? 2 : DOMINANT,
      }}
      exploreHint="Pick what they do, both ways, and compare your two rows."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            When they cooperated, defecting gave you <strong>{PAY[1][0][0]}</strong> instead of {PAY[0][0][0]}. When they defected,
            defecting gave you <strong>{PAY[1][1][0]}</strong> instead of {PAY[0][1][0]}. Defect came out ahead in both columns.
          </p>
          <p>
            The other player reads the same table and reaches the same answer. So both defect and each gets {PAY[1][1][0]}, though
            both cooperating would give each {PAY[0][0][0]}. A move can be best for each player and still leave both worse off.
          </p>
          <p className="muted">
            A model: invented payoffs, one round, no talking. When the same two players meet again and again, cooperation can last.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pickThem = (m: Move) => {
              setThem(m);
              reach(m === 0 ? "they-cooperate" : "they-defect");
            };
            const better = them === null || locked ? null : best(them);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Invented payoffs · one round · no talking</p>
                <svg viewBox="0 0 320 214" className="stage-svg" role="img" aria-label="Payoff table: your payoff large, theirs small">
                  {NAMES.map((n, c) => (
                    <text key={n} x={GX + c * CW + CW / 2} y={GY - 10} textAnchor="middle" className={them === c && !locked ? s.value : s.axis}>
                      they {n}
                    </text>
                  ))}
                  {NAMES.map((n, r) => (
                    <g key={n}>
                      <text x={GX - 8} y={GY + r * CH + CH / 2 - 2} textAnchor="end" className={you === r && !locked ? s.value : s.axis}>
                        you
                      </text>
                      <text x={GX - 8} y={GY + r * CH + CH / 2 + 12} textAnchor="end" className={you === r && !locked ? s.value : s.axis}>
                        {n}
                      </text>
                    </g>
                  ))}
                  {PAY.map((row, r) =>
                    row.map(([mine, theirs], c) => {
                      const x = GX + c * CW;
                      const y = GY + r * CH;
                      const inCol = !locked && them === c;
                      const chosen = !locked && them === c && you === r;
                      return (
                        <g key={`${r}${c}`} opacity={!locked && them !== null && !inCol ? 0.45 : 1}>
                          <rect x={x + 2} y={y + 2} width={CW - 4} height={CH - 4} rx={8} className={chosen ? s.cellOn : s.cell} />
                          {inCol && better === r && (
                            <rect x={x + 2} y={y + 2} width={CW - 4} height={CH - 4} rx={8} fill="none" stroke="var(--good)" strokeWidth={3.5} />
                          )}
                          <text x={x + CW / 2} y={y + CH / 2 + 4} textAnchor="middle" className={s.big}>
                            {mine}
                          </text>
                          <text x={x + CW / 2} y={y + CH / 2 + 22} textAnchor="middle" className={s.axis}>
                            them {theirs}
                          </text>
                          {inCol && better === r && (
                            <text x={x + CW - 10} y={y + 18} textAnchor="end" className={s.value} fill="var(--good)">
                              +{gain(c as Move)}
                            </text>
                          )}
                        </g>
                      );
                    }),
                  )}
                </svg>

                <Row>
                  {NAMES.map((n, m) => (
                    <Control
                      key={n}
                      className={them === m ? "active" : ""}
                      disabled={locked || them === m}
                      aria-pressed={them === m}
                      onClick={() => pickThem(m as Move)}
                    >
                      They {n}
                    </Control>
                  ))}
                </Row>
                <Row>
                  {NAMES.map((n, m) => (
                    <Control
                      key={n}
                      className={you === m ? "active" : ""}
                      disabled={locked || you === m}
                      aria-pressed={you === m}
                      onClick={() => setYou(m as Move)}
                    >
                      You {n}
                    </Control>
                  ))}
                  <Readout label="You get" value={locked || you === null || them === null ? "?" : PAY[you][them][0]} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
