"use client";

// Backtracking on 4 queens. One queen per row; only safe squares can be tapped, and tapping a
// queen backs up to that row. Step / Run continue a depth-first search from the board as it
// stands, so hand play and the search share one board. From an empty board the full search
// makes 16 placements and finds both solutions, out of 256 one-per-row boards.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const N = 4;
const safe = (qs: number[], r: number, c: number) => qs.slice(0, r).every((qc, qr) => qc !== c && Math.abs(qc - c) !== r - qr);

type S = { qs: number[]; count: number; sols: string[]; done: boolean; firstAt: number | null; note: string };
const EMPTY: S = { qs: [], count: 0, sols: [], done: false, firstAt: null, note: "" };

function record(st: S, qs: number[], count: number): S {
  const key = qs.join("");
  if (qs.length === N && !st.sols.includes(key))
    return { ...st, qs, count, sols: [...st.sols, key], firstAt: st.firstAt ?? count, note: `Solution found after ${count} placements.` };
  return { ...st, qs, count };
}
// One depth-first search action: place on the first safe square of the next row, or back up.
function step(st: S): S {
  if (st.done) return st;
  let qs = [...st.qs];
  if (qs.length < N) {
    const r = qs.length;
    for (let c = 0; c < N; c++) if (safe(qs, r, c)) return record({ ...st, note: "" }, [...qs, c], st.count + 1);
  }
  // Back up: move the last queen to its next safe square, popping rows that have none.
  while (qs.length) {
    const r = qs.length - 1;
    const from = qs[r];
    qs = qs.slice(0, r);
    for (let c = from + 1; c < N; c++) if (safe(qs, r, c)) return record({ ...st, note: "" }, [...qs, c], st.count + 1);
  }
  return { ...st, qs: [], done: true, note: "" };
}

export default function FourQueensPruning({ slug }: { slug: string }) {
  const [st, setSt] = useState<S>(EMPTY);
  const { qs, count, sols, done } = st;
  const r = qs.length;
  const stuck = r < N && !Array.from({ length: N }, (_, c) => c).some((c) => safe(qs, r, c));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Place 4 queens, one per row, so none attack. There are 256 one-per-row boards. Placing a queen only on a safe square and backing up when a row has none, how many placements does finding every solution take?",
        options: ["16", "64", "256"],
        answer: 0,
      }}
      exploreHint="Place queens by hand, or let the search run. Find both solutions."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            A full search from an empty board makes <strong>16</strong> safe placements and finds both solutions; the
            first comes after 8. A blind check would look at all 256 one-per-row boards.
          </p>
          <p>
            Placing only on safe squares notices a clash the moment it happens, so every board that starts that way is
            skipped at once. The saving grows fast: 8 queens have 16,777,216 one-per-row boards, but backtracking makes
            2,056 placements to find all 92 solutions.
          </p>
          <p className="muted">Pruning early is what makes search possible.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const commit = (next: S) => {
          setSt(next);
          if (next.sols.length === 2 && sols.length < 2) interact();
        };
        const doStep = () => {
          if (locked || done) return;
          commit(step(st));
        };
        const run = () => {
          if (locked || done) return;
          let x = st;
          for (let i = 0; i < 200 && !x.done; i++) x = step(x);
          commit({ ...x, note: `Search done: ${x.count} placements${x.firstAt ? ` (first solution at ${x.firstAt})` : ""}.` });
        };
        const startOver = () => {
          if (locked) return;
          setSt({ ...EMPTY, sols });
        };
        const tap = (row: number, c: number) => {
          if (locked || row > r) return;
          if (row < r && qs[row] === c) {
            setSt({ ...st, qs: qs.slice(0, row), done: false, note: `Backed up to row ${row + 1}.` });
            return;
          }
          if (!safe(qs, row, c)) return;
          commit(record({ ...st, done: false, note: "" }, [...qs.slice(0, row), c], count + 1));
        };

        const msg = locked
          ? "Make a prediction to start."
          : st.note
            ? st.note
            : r === N
              ? "All four placed: a solution."
              : stuck
                ? `Row ${r + 1} has no safe square. Back up.`
                : `Place a queen in row ${r + 1}.`;

        return (
          <div className={s.wrap}>
            <p className={`${s.msg} ${stuck ? s.bad : ""}`} aria-live="polite">
              {msg}
            </p>
            <Row>
              <Control className="active" disabled={locked || done} onClick={run}>
                Run the search
              </Control>
              <Control disabled={locked || done} onClick={doStep}>
                Step
              </Control>
              <Control disabled={locked || (count === 0 && r === 0)} onClick={startOver}>
                Start over
              </Control>
            </Row>
            <div className={s.board} role="grid" aria-label="4 by 4 board">
              {Array.from({ length: N }, (_, row) =>
                Array.from({ length: N }, (_, c) => {
                  const queen = qs[row] === c && row < r;
                  const attacked = row >= r && !safe(qs, row, c);
                  const open = row === r && !attacked;
                  return (
                    <Control
                      key={`${row}-${c}`}
                      className={`${s.sq} ${(row + c) % 2 ? s.dark : ""} ${attacked ? s.attacked : ""} ${queen ? s.queen : ""} ${open ? s.open : ""}`}
                      disabled={locked || !(queen || open || (row < r && safe(qs, row, c)))}
                      aria-label={queen ? `Queen in row ${row + 1}, column ${c + 1}: back up` : `Row ${row + 1}, column ${c + 1}`}
                      onClick={() => tap(row, c)}
                    >
                      {queen ? "♛" : attacked ? "×" : ""}
                    </Control>
                  );
                }),
              )}
            </div>
            <div className={s.readouts}>
              <span>
                Placements <strong>{count}</strong>
              </span>
              <span>
                Solutions <strong>{sols.length}</strong> of 2
              </span>
            </div>
            <div className={s.sols}>
              {sols.map((k) => (
                <svg key={k} viewBox="0 0 40 40" className={s.mini} role="img" aria-label={`Solution: columns ${k.split("").map((x) => Number(x) + 1).join(", ")}`}>
                  {Array.from({ length: 16 }, (_, i) => (
                    <rect key={i} x={(i % 4) * 10} y={Math.floor(i / 4) * 10} width={10} height={10} fill={((i % 4) + Math.floor(i / 4)) % 2 ? "var(--line)" : "var(--bg-2)"} />
                  ))}
                  {k.split("").map((c, row) => (
                    <circle key={row} cx={Number(c) * 10 + 5} cy={row * 10 + 5} r={3.5} fill="var(--good)" />
                  ))}
                </svg>
              ))}
            </div>
          </div>
        );
      }}
    </Lesson>
  );
}
