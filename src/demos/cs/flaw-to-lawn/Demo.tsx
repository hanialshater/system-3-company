"use client";

// Edit distance FLAW -> LAWN as a 5 x 5 grid. Row 0 and column 0 are given (turning a word into nothing, or nothing
// into a word). The learner fills the 16 inner cells; each is the cheapest of three neighbours plus one, or the
// diagonal free when the letters match. Row buttons fill a row at a time (QA presses at most 16 controls).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const A = "FLAW"; // rows
const B = "LAWN"; // columns
const R = A.length;
const C = B.length;
const CELLS = R * C; // 16

// D[i][j] = fewest edits from the first i letters of A to the first j letters of B.
type From = "diag" | "up" | "left" | "match";
const D: number[][] = Array.from({ length: R + 1 }, (_, i) => Array.from({ length: C + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
const FROM: From[][] = Array.from({ length: R + 1 }, () => Array.from({ length: C + 1 }, () => "diag" as From));
for (let i = 1; i <= R; i++)
  for (let j = 1; j <= C; j++) {
    if (A[i - 1] === B[j - 1]) {
      D[i][j] = D[i - 1][j - 1];
      FROM[i][j] = "match";
    } else {
      const d = D[i - 1][j - 1];
      const u = D[i - 1][j];
      const l = D[i][j - 1];
      const m = Math.min(d, u, l);
      D[i][j] = m + 1;
      FROM[i][j] = d === m ? "diag" : u === m ? "up" : "left";
    }
  }

// Cell k (0..15) in reading order -> grid position.
const pos = (k: number) => ({ i: Math.floor(k / C) + 1, j: (k % C) + 1 });

// The traced path from the corner back to (0, 0), and the edits along it (reading forward).
const PATH: [number, number][] = [];
const STEPS: string[] = [];
{
  let i = R;
  let j = C;
  PATH.push([i, j]);
  while (i > 0 || j > 0) {
    const f: From = i === 0 ? "left" : j === 0 ? "up" : FROM[i][j];
    if (f === "match") {
      STEPS.unshift(`keep ${A[i - 1]}`);
      i--;
      j--;
    } else if (f === "diag") {
      STEPS.unshift(`${A[i - 1]}→${B[j - 1]}`);
      i--;
      j--;
    } else if (f === "up") {
      STEPS.unshift(`delete ${A[i - 1]}`);
      i--;
    } else {
      STEPS.unshift(`insert ${B[j - 1]}`);
      j--;
    }
    PATH.push([i, j]);
  }
}
// "delete F, keep L A W, insert N": consecutive keeps merged.
const EDIT_TEXT = STEPS.reduce<string[]>((out, st) => {
  const prev = out[out.length - 1];
  if (st.startsWith("keep ") && prev && prev.startsWith("keep ")) out[out.length - 1] = `${prev} ${st.slice(5)}`;
  else out.push(st);
  return out;
}, []).join(", ");
const onPath = (i: number, j: number) => PATH.some(([a, b]) => a === i && b === j);

const X0 = 40;
const CW = 54;
const Y0 = 30;
const CH = 38;
const cx = (j: number) => X0 + j * CW + CW / 2;
const cy = (i: number) => Y0 + i * CH + CH / 2;

// A cell's number is the edits from one beginning of FLAW to one beginning of LAWN; the caption names both and
// the smaller pair it was built from. "·" is the empty beginning, as on the grid's edge.
const pre = (w: string, n: number) => (n === 0 ? "·" : w.slice(0, n));
function caption(i: number, j: number): string {
  const a = A[i - 1];
  const b = B[j - 1];
  const v = D[i][j];
  const f = FROM[i][j];
  const [pi, pj] = f === "up" ? [i - 1, j] : f === "left" ? [i, j - 1] : [i - 1, j - 1];
  const after = `after ${pre(A, pi)} → ${pre(B, pj)} (${D[pi][pj]})`;
  if (f === "match") return `${pre(A, i)} → ${pre(B, j)} = ${v}: ${a} = ${b}, keep it free (+0), ${after}.`;
  const edit = f === "diag" ? `replace ${a} with ${b}` : f === "up" ? `delete ${a}` : `insert ${b}`;
  return `${pre(A, i)} → ${pre(B, j)} = ${v}: ${edit} (+1), ${after}.`;
}
const CORNER = caption(R, C).replace(/\.$/, "");
const note = (k: number) => {
  const { i, j } = pos(k);
  return caption(i, j);
};

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [n, setN] = useState(0); // cells filled
  const [traced, setTraced] = useState(false);

  const fillTo = (m: number) => {
    if (locked) return;
    const next = Math.min(CELLS, Math.max(n, m));
    setN(next);
    if (next === CELLS) reach("filled");
  };
  const trace = () => {
    if (locked || n < CELLS || traced) return;
    setTraced(true);
    reach("traced");
  };

  const last = n > 0 ? pos(n - 1) : null;
  const filled = (i: number, j: number) => i === 0 || j === 0 || (i - 1) * C + (j - 1) < n;
  const corner = n === CELLS;

  const msg = locked
    ? "Predict first, then fill the grid."
    : traced
      ? `Edits: ${EDIT_TEXT} = ${D[R][C]}`
      : n === 0
        ? "Fill cells in order. Each takes the cheapest neighbour plus one."
        : note(n - 1);

  return (
    <div className={s.wrap}>
      <p className={`${s.msg} ${traced ? s.good : ""}`} aria-live="polite">
        {msg}
      </p>
      <svg viewBox="0 0 320 250" className="stage-svg" role="img" aria-label={`Edit distance grid, ${n} of ${CELLS} cells filled`}>
        {B.split("").map((ch, j) => (
          <text key={j} x={cx(j + 1)} y={21} textAnchor="middle" className={s.head}>
            {ch}
          </text>
        ))}
        {["·", ...A.split("")].map((ch, i) => (
          <text key={i} x={X0 - 12} y={cy(i) + 5} textAnchor="middle" className={s.head}>
            {ch}
          </text>
        ))}
        {Array.from({ length: R + 1 }, (_, i) =>
          Array.from({ length: C + 1 }, (_, j) => {
            const given = i === 0 || j === 0;
            const isLast = !!last && last.i === i && last.j === j;
            const hot = traced && onPath(i, j);
            const isCorner = i === R && j === C;
            const text = given || filled(i, j) ? String(D[i][j]) : isCorner ? "?" : "";
            return (
              <g key={`${i}-${j}`}>
                <rect
                  x={X0 + j * CW + 2}
                  y={Y0 + i * CH + 2}
                  width={CW - 4}
                  height={CH - 4}
                  rx={5}
                  fill={hot ? "var(--good)" : isLast ? "var(--domain)" : given ? "var(--line)" : "var(--bg-2)"}
                  fillOpacity={hot || isLast ? 0.45 : given ? 0.5 : 1}
                  stroke={isLast || hot ? "var(--fg)" : "var(--line)"}
                  strokeWidth={isLast || hot ? 1.5 : 1}
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
        {last && !traced && <Arrow from={last} kind={FROM[last.i][last.j]} />}
        <text x={175} y={243} textAnchor="middle" className={s.edge}>
          ↓ delete · → insert · ↘ replace (free if letters match)
        </text>
      </svg>
      <Row>
        <Control className={s.tap} disabled={locked || n >= CELLS} onClick={() => fillTo(n + 1)}>
          Next cell
        </Control>
        {A.split("").map((ch, r) => (
          <Control key={r} className={s.tap} disabled={locked || n >= (r + 1) * C} onClick={() => fillTo((r + 1) * C)}>
            Row {ch}
          </Control>
        ))}
        <Control className={`${s.tap} ${locked || n < CELLS || traced ? "" : "active"}`} disabled={locked || n < CELLS || traced} onClick={trace}>
          Trace back from the corner
        </Control>
      </Row>
      <p className={s.count}>
        Cell {n} of {CELLS}
        {corner && !traced ? ` · corner reads ${D[R][C]}` : ""}
      </p>
    </div>
  );
}

// A line from the newest cell to the neighbour it copied from, ending in a dot on that neighbour.
function Arrow({ from, kind }: { from: { i: number; j: number }; kind: From }) {
  const di = kind === "left" ? 0 : -1;
  const dj = kind === "up" ? 0 : -1;
  const x1 = cx(from.j);
  const y1 = cy(from.i);
  const x2 = cx(from.j + dj);
  const y2 = cy(from.i + di);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--good)" strokeWidth={2.5} />
      <circle cx={x2} cy={y2} r={5} fill="var(--good)" />
    </g>
  );
}

export default function FlawToLawn({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "FLAW and LAWN differ at all 4 positions. Using insert, delete or replace one letter at a time, how few edits turn FLAW into LAWN?",
        options: ["4", "2", "1"],
        answer: 1,
      }}
      exploreHint="Fill the grid row by row, then trace back from the corner."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your corner read <strong>2</strong>: {EDIT_TEXT}. Counting spot
            by spot gives 4, because it never lets letters slide; one delete shifts LAW into line.
          </p>
          <p>
            Every cell compared two beginnings. The corner said &ldquo;{CORNER}&rdquo;: the whole-word distance was built from a
            beginning you had already filled, as every cell was, by the cheapest of three neighbours. A small grid
            replaces trying every sequence of edits.
          </p>
          <p className="muted">Spell checkers and DNA alignment fill this grid.</p>
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
