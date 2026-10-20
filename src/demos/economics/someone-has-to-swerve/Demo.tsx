"use client";

// Chicken (hawk-dove). One picture: the 2 × 2 payoff table (your payoff big, theirs small).
// Tapping an outcome draws best-reply arrows: a vertical arrow if you would gain by switching,
// a horizontal one if they would. No arrow out of a cell = stable (a pure Nash equilibrium).
// Invented payoffs: both straight −10 each; swerver 0 vs straight 3; both swerve 1 each.
// Key state: both "same" cells and a "one of each" cell checked.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Move = 0 | 1; // 0 swerve, 1 straight
const NAMES = ["swerve", "straight"] as const;
// PAY[you][them] = [your payoff, their payoff]
const PAY: [number, number][][] = [
  [
    [1, 1],
    [0, 3],
  ],
  [
    [3, 0],
    [-10, -10],
  ],
];
const other = (m: Move): Move => (m === 0 ? 1 : 0);
/** How much you gain by switching your move (row), given theirs. Positive = you would switch. */
const yourGain = (y: Move, t: Move) => PAY[other(y)][t][0] - PAY[y][t][0];
const theirGain = (y: Move, t: Move) => PAY[y][other(t)][1] - PAY[y][t][1];
const stable = (y: Move, t: Move) => yourGain(y, t) <= 0 && theirGain(y, t) <= 0;
const CELLS: [Move, Move][] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];
const STABLE = CELLS.filter(([y, t]) => stable(y, t)); // (swerve, straight) and (straight, swerve)
const ANSWER = STABLE.length === 2 && STABLE.every(([y, t]) => y !== t) ? 2 : STABLE.length === 1 && STABLE[0][0] === 0 ? 0 : 1;
const MILESTONES = ["both-swerve", "both-straight", "one-each"] as const;
const LABEL = ["Both swerve", "You swerve, they don't", "You go straight, they swerve", "Both straight"];

// Geometry (viewBox 320 × 214).
const GX = 96;
const GY = 40;
const CW = 108;
const CH = 80;
const cx = (t: Move) => GX + t * CW + CW / 2;
const cy = (y: Move) => GY + y * CH + CH / 2;

function Arrow({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 9;
  const p1 = `${x2},${y2}`;
  const p2 = `${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)}`;
  const p3 = `${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}`;
  const vertical = Math.abs(x2 - x1) < 1;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--bad)" strokeWidth={3} />
      <polygon points={`${p1} ${p2} ${p3}`} fill="var(--bad)" />
      <text
        x={(x1 + x2) / 2 + (vertical ? 8 : 0)}
        y={(y1 + y2) / 2 + (vertical ? 4 : -7)}
        textAnchor={vertical ? "start" : "middle"}
        className={s.value}
        fill="var(--bad)"
      >
        {label}
      </text>
    </g>
  );
}

export default function SomeoneHasToSwerve({ slug }: { slug: string }) {
  const [cell, setCell] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Two drivers head straight at each other. Both stay straight: they crash (−10 each). One swerves: the swerver gets 0, the other 3. Both swerve: 1 each. Which outcomes are stable?",
        options: ["Both swerve", "Both straight", "One of each"],
        answer: ANSWER,
      }}
      exploreHint="Tap each outcome. An arrow means someone would rather switch."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At &ldquo;both swerve&rdquo; an arrow pointed out: going straight instead raises your {PAY[0][0][0]} to {PAY[1][0][0]}, and the same
            holds for them. At &ldquo;both straight&rdquo; arrows pointed out too: swerving lifts {PAY[1][1][0]} to {PAY[0][1][0]}.
          </p>
          <p>
            Only the two &ldquo;one of each&rdquo; cells had no arrow out. There, the one going straight gets {PAY[1][0][0]} and would not swap
            for {PAY[0][0][0]}; the one swerving gets {PAY[0][1][0]} and would not swap for {PAY[1][1][0]}. Identical players, an identical game,
            and the stable outcomes are the ones where they act differently.
          </p>
          <p className="muted">Invented payoffs, one round, chosen at the same moment.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (i: number) => {
              setCell(i);
              const [y, t] = CELLS[i];
              reach(y === t ? (y === 0 ? "both-swerve" : "both-straight") : "one-each");
            };
            const sel = locked || cell === null ? null : CELLS[cell];
            const msg = !sel
              ? locked
                ? ""
                : "Tap an outcome below."
              : stable(sel[0], sel[1])
                ? "Stable: neither wants to switch."
                : "Not stable: someone would switch.";
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Invented payoffs · one round · same moment</p>
                <svg viewBox="0 0 320 214" className="stage-svg" role="img" aria-label="Payoff table with best-reply arrows">
                  {NAMES.map((n, c) => (
                    <text key={n} x={cx(c as Move)} y={GY - 10} textAnchor="middle" className={s.axis}>
                      they {n}
                    </text>
                  ))}
                  {NAMES.map((n, r) => (
                    <g key={n}>
                      <text x={GX - 8} y={cy(r as Move) - 2} textAnchor="end" className={s.axis}>
                        you
                      </text>
                      <text x={GX - 8} y={cy(r as Move) + 12} textAnchor="end" className={s.axis}>
                        {n}
                      </text>
                    </g>
                  ))}
                  {CELLS.map(([y, t], i) => {
                    const x = GX + t * CW;
                    const yy = GY + y * CH;
                    const on = sel !== null && sel[0] === y && sel[1] === t;
                    return (
                      <g key={i}>
                        <rect x={x + 2} y={yy + 2} width={CW - 4} height={CH - 4} rx={8} className={on ? s.cellOn : s.cell} />
                        {on && stable(y, t) && (
                          <rect x={x + 2} y={yy + 2} width={CW - 4} height={CH - 4} rx={8} fill="none" stroke="var(--good)" strokeWidth={3.5} />
                        )}
                        <text x={x + CW / 2} y={yy + CH / 2 + 4} textAnchor="middle" className={s.big}>
                          {PAY[y][t][0]}
                        </text>
                        <text x={x + CW / 2} y={yy + CH / 2 + 22} textAnchor="middle" className={s.small}>
                          them {PAY[y][t][1]}
                        </text>
                      </g>
                    );
                  })}
                  {sel && yourGain(sel[0], sel[1]) > 0 && (
                    <Arrow
                      x1={cx(sel[1]) - 30}
                      y1={cy(sel[0]) + (sel[0] === 0 ? 20 : -20)}
                      x2={cx(sel[1]) - 30}
                      y2={cy(other(sel[0])) + (sel[0] === 0 ? -20 : 20)}
                      label={`you +${yourGain(sel[0], sel[1])}`}
                    />
                  )}
                  {sel && theirGain(sel[0], sel[1]) > 0 && (
                    <Arrow
                      x1={cx(sel[1]) + (sel[1] === 0 ? 30 : -30)}
                      y1={cy(sel[0]) - 18}
                      x2={cx(other(sel[1])) + (sel[1] === 0 ? -30 : 30)}
                      y2={cy(sel[0]) - 18}
                      label={`them +${theirGain(sel[0], sel[1])}`}
                    />
                  )}
                  <text x={160} y={208} textAnchor="middle" className={s.value} fill={sel ? (stable(sel[0], sel[1]) ? "var(--good)" : "var(--bad)") : "var(--muted)"}>
                    {msg}
                  </text>
                </svg>

                <div className={s.grid}>
                  {LABEL.map((l, i) => (
                    <Control key={l} className={cell === i ? "active" : ""} disabled={locked || cell === i} aria-pressed={cell === i} onClick={() => pick(i)}>
                      {l}
                    </Control>
                  ))}
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
