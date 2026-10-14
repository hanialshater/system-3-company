"use client";

// A 3 x 3 game with invented payoffs (row player's first, column player's second). No move is best against every
// reply, for either player. Tapping a cell shows each player's best reply to the other's move: Row's best cell in
// that column (solid outline) and Column's best cell in that row (dashed). A cell where both are already best is
// stable (a pure Nash equilibrium). Key states: one cell where someone switches, and the stable cell (M, L).
// Mixed equilibria are not discussed; uniqueness is claimed for pure ones only.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const ROWS = ["U", "M", "D"] as const;
const COLS = ["L", "C", "R"] as const;
// G[row][col] = [row player's payoff, column player's payoff]
const G: [number, number][][] = [
  [
    [3, 1],
    [0, 3],
    [2, 0],
  ],
  [
    [4, 2],
    [1, 0],
    [0, 1],
  ],
  [
    [2, 0],
    [2, 1],
    [1, 3],
  ],
];
const IDX = [0, 1, 2] as const;
// Best replies are unique in this table.
const rowBest = (j: number) => IDX.reduce((a, i) => (G[i][j][0] > G[a][j][0] ? i : a), 0);
const colBest = (i: number) => IDX.reduce((a, j) => (G[i][j][1] > G[i][a][1] ? j : a), 0);
const stable = (i: number, j: number) => rowBest(j) === i && colBest(i) === j;
const STABLE = IDX.flatMap((i) => IDX.filter((j) => stable(i, j)).map((j) => [i, j] as const)); // [[1, 0]] = (M, L)
const [SI, SJ] = STABLE[0];
const MILESTONES = ["someone-switches", "found-stable"] as const;

function verdict(i: number, j: number) {
  const bi = rowBest(j);
  const bj = colBest(i);
  if (bi === i && bj === j)
    return `Nobody switches: ${G[i][j][0]} is Row's best in ${COLS[j]}, ${G[i][j][1]} is Column's best in ${ROWS[i]}.`;
  const parts: string[] = [];
  if (bi !== i) parts.push(`Row switches to ${ROWS[bi]} (${G[bi][j][0]} > ${G[i][j][0]})`);
  if (bj !== j) parts.push(`Column switches to ${COLS[bj]} (${G[i][bj][1]} > ${G[i][j][1]})`);
  return `${parts.join(". ")}.`;
}

export default function NoBestMoveOneStablePair({ slug }: { slug: string }) {
  const [sel, setSel] = useState<[number, number] | null>(null);
  const [checked, setChecked] = useState<string[]>([]);

  const unstableSeen = checked.filter((k) => k !== `${SI}${SJ}`).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In this 3×3 game no move is best against every reply. Which cell is the only one where neither player wants to switch?",
        options: ["Middle-left (M, L)", "Top-middle (U, C)", "Bottom-right (D, R)"],
        answer: 0,
      }}
      exploreHint="Tap cells. Find one where neither player wants to switch."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At <strong>
              ({ROWS[SI]}, {COLS[SJ]})
            </strong>{" "}
            Row&apos;s {G[SI][SJ][0]} is the best in column {COLS[SJ]}, and Column&apos;s {G[SI][SJ][1]} is the best in row{" "}
            {ROWS[SI]}. Each move is a best reply to the other. In the {unstableSeen} other {unstableSeen === 1 ? "cell" : "cells"}{" "}
            you checked, someone gained by switching; that holds for all 8.
          </p>
          <p>
            Neither player has a move that is best whatever the other does, yet this pair still pins down the outcome. A pair of
            moves that are best replies to each other is a Nash equilibrium; here it is the only pure one.
          </p>
          <p className="muted">Invented payoffs, one round. Mixed (random) strategies are left out.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const tap = (i: number, j: number) => {
              setSel([i, j]);
              setChecked((c) => (c.includes(`${i}${j}`) ? c : [...c, `${i}${j}`]));
              reach(stable(i, j) ? "found-stable" : "someone-switches");
            };
            const showRowBest = sel ? rowBest(sel[1]) : -1;
            const showColBest = sel ? colBest(sel[0]) : -1;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Payoffs: (Row, Column) · invented</p>
                <div className={s.grid} role="group" aria-label="Payoff table">
                  <span />
                  {COLS.map((c) => (
                    <span key={c} className={s.head}>
                      {c}
                    </span>
                  ))}
                  {ROWS.map((r, i) => (
                    <div key={r} style={{ display: "contents" }}>
                      <span className={s.head}>{r}</span>
                      {COLS.map((c, j) => {
                        const isSel = !!sel && sel[0] === i && sel[1] === j;
                        const k = `${i}${j}`;
                        const cls = [
                          s.cell,
                          isSel ? s.sel : "",
                          sel && i === showRowBest && j === sel[1] ? s.rowBest : "",
                          sel && j === showColBest && i === sel[0] ? s.colBest : "",
                        ].join(" ");
                        return (
                          <Control
                            key={c}
                            className={cls}
                            disabled={locked || isSel}
                            aria-label={`${r}, ${c}: Row ${G[i][j][0]}, Column ${G[i][j][1]}`}
                            onClick={() => tap(i, j)}
                          >
                            <span className={s.rowPay}>{G[i][j][0]}</span>, <span className={s.colPay}>{G[i][j][1]}</span>
                            {checked.includes(k) && (
                              <span className={`${s.mark} ${stable(i, j) ? s.ok : s.no}`}>{stable(i, j) ? "✓" : "✗"}</span>
                            )}
                          </Control>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <p className={s.legend}>Solid: Row&apos;s best reply · dashed: Column&apos;s best reply</p>
                <p className={s.msg} aria-live="polite">
                  {sel ? verdict(sel[0], sel[1]) : "Tap a cell to see who would switch."}
                </p>
                <Row>
                  <Readout label="Cells checked" value={`${checked.length} of 9`} />
                  <Readout label="Stable found" value={checked.includes(`${SI}${SJ}`) ? 1 : 0} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
