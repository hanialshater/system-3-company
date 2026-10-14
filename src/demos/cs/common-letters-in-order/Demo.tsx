"use client";

// Longest common subsequence of ABCBDAB (rows) and BDCABA (columns) as an 8 x 7 grid. Row 0 and column 0 are 0
// (nothing shared with an empty string). Each inner cell asks one question: do these two letters match? If so,
// diagonal + 1; if not, the larger of up and left. The corner reads 4. Trace back from the corner: on a match take
// the letter and go diagonal, otherwise step to the larger neighbour (up on a tie), which spells BCBA.
// Fill buttons go cell, row, all (QA presses at most 16 controls once each).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const A = "ABCBDAB"; // rows
const B = "BDCABA"; // columns
const R = A.length;
const C = B.length;
const CELLS = R * C; // 42

const L: number[][] = Array.from({ length: R + 1 }, () => Array(C + 1).fill(0));
for (let i = 1; i <= R; i++)
  for (let j = 1; j <= C; j++) L[i][j] = A[i - 1] === B[j - 1] ? L[i - 1][j - 1] + 1 : Math.max(L[i - 1][j], L[i][j - 1]);
const BEST = L[R][C];

// Trace back from the corner; PATH is every cell visited, PICKS the matched cells (in forward order).
const PATH: [number, number][] = [];
const PICKS: [number, number][] = [];
{
  let i = R;
  let j = C;
  while (i > 0 && j > 0) {
    PATH.push([i, j]);
    if (A[i - 1] === B[j - 1]) {
      PICKS.unshift([i, j]);
      i--;
      j--;
    } else if (L[i - 1][j] >= L[i][j - 1]) i--;
    else j--;
  }
  PATH.push([i, j]);
}
const WORD = PICKS.map(([i]) => A[i - 1]).join("");
const pickedRow = new Set(PICKS.map(([i]) => i));
const pickedCol = new Set(PICKS.map(([, j]) => j));
const onPath = (i: number, j: number) => PATH.some(([a, b]) => a === i && b === j);
const isPick = (i: number, j: number) => PICKS.some(([a, b]) => a === i && b === j);

// Longest block of letters side by side in both strings (the misconception's answer).
let BLOCK = "";
for (let i = 0; i < R; i++)
  for (let j = 0; j < C; j++) {
    let k = 0;
    while (i + k < R && j + k < C && A[i + k] === B[j + k]) k++;
    if (k > BLOCK.length) BLOCK = A.slice(i, i + k);
  }

const pos = (k: number) => ({ i: Math.floor(k / C) + 1, j: (k % C) + 1 });

const X0 = 38;
const CW = 39;
const Y0 = 24;
const CH = 31;
const cx = (j: number) => X0 + j * CW + CW / 2;
const cy = (i: number) => Y0 + i * CH + CH / 2;

function note(k: number): string {
  const { i, j } = pos(k);
  const a = A[i - 1];
  const b = B[j - 1];
  if (a === b) return `${a} = ${b}: match. Diagonal ${L[i - 1][j - 1]} + 1 = ${L[i][j]}.`;
  return `${a} ≠ ${b}: larger of up (${L[i - 1][j]}) and left (${L[i][j - 1]}) = ${L[i][j]}.`;
}

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [n, setN] = useState(0);
  const [traced, setTraced] = useState(false);

  const fillTo = (m: number) => {
    if (locked) return;
    const next = Math.min(CELLS, Math.max(n, m));
    setN(next);
    if (next === CELLS) reach("filled");
  };
  const nextRow = () => fillTo((Math.floor(n / C) + 1) * C);
  const trace = () => {
    if (locked || n < CELLS || traced) return;
    setTraced(true);
    reach("traced");
  };
  const restart = () => {
    if (locked) return;
    setN(0);
    setTraced(false);
  };

  const last = n > 0 ? pos(n - 1) : null;
  const filled = (i: number, j: number) => i === 0 || j === 0 || (i - 1) * C + (j - 1) < n;

  const msg = locked
    ? "Predict first, then fill the grid."
    : traced
      ? `Picked ${WORD.split("").join(", ")}: ${BEST} letters, in order, with gaps.`
      : n === 0
        ? "Each cell: the best answer for the first letters of each string."
        : n === CELLS
          ? `The corner reads ${BEST}. Trace back to see which letters.`
          : note(n - 1);

  return (
    <div className={s.wrap}>
      <p className={`${s.msg} ${traced ? s.good : ""}`} aria-live="polite">
        {msg}
      </p>
      <svg viewBox="0 0 320 280" className="stage-svg" role="img" aria-label={`Common letters grid, ${n} of ${CELLS} cells filled`}>
        {B.split("").map((ch, j) => (
          <text key={j} x={cx(j + 1)} y={17} textAnchor="middle" className={`${s.head} ${traced && pickedCol.has(j + 1) ? s.hot : ""}`}>
            {ch}
          </text>
        ))}
        {["·", ...A.split("")].map((ch, i) => (
          <text key={i} x={X0 - 14} y={cy(i) + 5} textAnchor="middle" className={`${s.head} ${traced && pickedRow.has(i) ? s.hot : ""}`}>
            {ch}
          </text>
        ))}
        {Array.from({ length: R + 1 }, (_, i) =>
          Array.from({ length: C + 1 }, (_, j) => {
            const given = i === 0 || j === 0;
            const isLast = !!last && last.i === i && last.j === j && !traced;
            const path = traced && onPath(i, j);
            const pick = traced && isPick(i, j);
            const text = filled(i, j) ? String(L[i][j]) : i === R && j === C ? "?" : "";
            return (
              <g key={`${i}-${j}`}>
                <rect
                  x={X0 + j * CW + 2}
                  y={Y0 + i * CH + 2}
                  width={CW - 4}
                  height={CH - 4}
                  rx={4}
                  fill={pick ? "var(--good)" : path ? "var(--domain)" : isLast ? "var(--domain)" : given ? "var(--line)" : "var(--bg-2)"}
                  fillOpacity={pick ? 0.6 : path ? 0.25 : isLast ? 0.45 : given ? 0.5 : 1}
                  stroke={isLast || pick ? "var(--fg)" : "var(--line)"}
                  strokeWidth={isLast || pick ? 1.5 : 1}
                />
                {text && (
                  <text x={cx(j)} y={cy(i) + 5} textAnchor="middle" className={s.num}>
                    {text}
                  </text>
                )}
              </g>
            );
          }),
        )}
        {last && !traced && <Arrow i={last.i} j={last.j} />}
      </svg>
      <Row>
        <Control className={s.tap} disabled={locked || n >= CELLS} onClick={() => fillTo(n + 1)}>
          Next cell
        </Control>
        <Control className={s.tap} disabled={locked || n >= CELLS} onClick={nextRow}>
          Next row
        </Control>
        <Control className={s.tap} disabled={locked || n >= CELLS} onClick={() => fillTo(CELLS)}>
          Fill the rest
        </Control>
        <Control className={`${s.tap} active`} disabled={locked || n < CELLS || traced} onClick={trace}>
          Trace back from the corner
        </Control>
        <Control className={s.tap} disabled={locked || n === 0} onClick={restart}>
          Start over
        </Control>
      </Row>
      <p className={s.count}>
        Cell {n} of {CELLS}
      </p>
    </div>
  );
}

// From the newest cell to the cell its value came from: the diagonal on a match, else the larger of up and left.
function Arrow({ i, j }: { i: number; j: number }) {
  const match = A[i - 1] === B[j - 1];
  const up = L[i - 1][j] >= L[i][j - 1];
  const ti = match || up ? i - 1 : i;
  const tj = match || !up ? j - 1 : j;
  return (
    <g>
      <line x1={cx(j)} y1={cy(i)} x2={cx(tj)} y2={cy(ti)} stroke="var(--good)" strokeWidth={2.5} />
      <circle cx={cx(tj)} cy={cy(ti)} r={4.5} fill="var(--good)" />
    </g>
  );
}

export default function CommonLettersInOrder({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Two strings: ${A} and ${B}. Pick letters from each, keeping their order but allowing gaps. What is the longest sequence that can be picked from both?`,
        options: ["3 letters", "4 letters", "5 letters"],
        answer: 1,
      }}
      exploreHint="Fill the grid, then trace back from the corner."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your corner read <strong>{BEST}</strong>, and the trace picked {WORD}: B, C, B, A appear in this order in both
            strings, with gaps. The longest block side by side in both is only {BLOCK.length} letters (AB or BD). No 5-letter
            sequence is shared.
          </p>
          <p>
            Each cell asked one small question: do these two letters match? If so, extend the answer from the diagonal; if
            not, take the better of dropping a letter from either string. Diff tools that show what changed between two
            files are built on this idea.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["filled", "traced"]}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
