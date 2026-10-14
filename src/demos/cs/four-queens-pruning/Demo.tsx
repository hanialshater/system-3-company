"use client";

// Backtracking on 4 queens. One queen per row; only safe squares can be tapped, and tapping a
// queen backs up to that row. Step continues a depth-first search from the board as it stands,
// so hand play and the search share one board. "Run from empty" clears the board and animates
// the real search, one step every 150 ms: it makes 16 placements and finds both solutions, out
// of 256 one-per-row boards.
// v3: solutions appear only when the search reaches them; the reveal waits until a search from
// an empty board has finished (the counter shows 16); the counter is called "Tries".
// v4: "Finish the run" (enabled only while the run animates) completes the same search at once, so each control
// pressed once reaches the reveal. The finished run is kept in a line under the board that Start over does not
// clear. Options are ranges, so the right one is not the board's 16 squares.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const N = 4;
const safe = (qs: number[], r: number, c: number) => qs.slice(0, r).every((qc, qr) => qc !== c && Math.abs(qc - c) !== r - qr);

// clean: no hand moves since the empty board, so the count is the search's own.
type S = { qs: number[]; count: number; sols: string[]; done: boolean; firstAt: number | null; note: string; clean: boolean };
const EMPTY: S = { qs: [], count: 0, sols: [], done: false, firstAt: null, note: "", clean: true };

function record(st: S, qs: number[], count: number): S {
  const key = qs.join("");
  if (qs.length === N && !st.sols.includes(key))
    return { ...st, qs, count, sols: [...st.sols, key], firstAt: st.firstAt ?? count, note: `Solution found at try ${count}.` };
  return { ...st, qs, count };
}
const finish = (x: S): S => ({
  ...x,
  qs: [],
  done: true,
  note: x.clean
    ? `Search done: ${x.count} tries (first solution at ${x.firstAt}).`
    : `Search done: ${x.count} tries, counting your hand moves.`,
});
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
  return finish(st);
}

export default function FourQueensPruning({ slug }: { slug: string }) {
  const [st, setSt] = useState<S>(EMPTY);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ count: number; firstAt: number | null; found: number } | null>(null);
  const interactRef = useRef<() => void>(() => {});

  // A finished search from an empty board is the state the reveal explains.
  const settle = (next: S) => {
    setSt(next);
    if (!next.done) return;
    setRunning(false);
    if (next.clean && !result) {
      setResult({ count: next.count, firstAt: next.firstAt, found: next.sols.length });
      interactRef.current();
    }
  };
  // Run: one real search step every 150 ms, so solutions appear only when the search reaches them.
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => settle(step(st)), 150);
    return () => clearTimeout(id);
  });

  const { qs, count, sols, done } = st;
  const r = qs.length;
  const stuck = r < N && !Array.from({ length: N }, (_, c) => c).some((c) => safe(qs, r, c));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "4 queens, one per row, none attacking. A blind check tries 256 boards. Placing only on safe squares and backing up at dead ends, how many tries find every solution?",
        options: ["Under 30", "30 to 150", "Over 150"],
        answer: 0,
      }}
      exploreHint="Place queens by hand, then run the search from empty to the end."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Your search from an empty board made <strong>{result?.count ?? 16}</strong> tries and found {result?.found ?? 2} solutions;
            the first came at try {result?.firstAt ?? 8}. A blind check would look at all 256 one-per-row boards.
          </p>
          <p>
            Placing only on safe squares notices a clash the moment it happens (the × marks), so every board that
            starts that way is skipped at once. The saving grows fast: 8 queens have 16,777,216 one-per-row boards, but
            backtracking makes 2,056 placements to find all 92 solutions.
          </p>
          <p className="muted">Pruning early is what makes search possible.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const busy = locked || running;
        const run = () => {
          if (busy) return;
          setSt(EMPTY);
          setRunning(true);
        };
        const finishRun = () => {
          if (locked || !running) return;
          let x = st;
          while (!x.done) x = step(x);
          settle(x);
        };
        const doStep = () => {
          if (busy || done) return;
          settle(step(st));
        };
        const startOver = () => {
          if (busy) return;
          setSt(EMPTY);
        };
        const tap = (row: number, c: number) => {
          const sq = st.qs;
          const sr = sq.length;
          if (busy || row > sr) return;
          if (row < sr && sq[row] === c) {
            setSt({ ...st, qs: sq.slice(0, row), done: false, clean: false, note: `Backed up to row ${row + 1}.` });
            return;
          }
          if (!safe(sq, row, c)) return;
          setSt(record({ ...st, done: false, clean: false, note: "" }, [...sq.slice(0, row), c], st.count + 1));
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
              <Control disabled={busy} onClick={run}>
                Run from empty
              </Control>
              <Control disabled={locked || !running} onClick={finishRun}>
                Finish the run
              </Control>
              <Control disabled={busy || done} onClick={doStep}>
                Step
              </Control>
              <Control disabled={busy || (count === 0 && r === 0)} onClick={startOver}>
                Start over
              </Control>
            </Row>
            <div className={s.board} role="grid" aria-label="4 by 4 board">
              {Array.from({ length: N }, (_, row) =>
                Array.from({ length: N }, (_, c) => {
                  const queen = qs[row] === c && row < r;
                  const attacked = row >= r && !safe(qs, row, c);
                  const open = !locked && row === r && !attacked;
                  return (
                    <Control
                      key={`${row}-${c}`}
                      className={`${s.sq} ${(row + c) % 2 ? s.dark : ""} ${attacked ? s.attacked : ""} ${queen ? s.queen : ""} ${open ? s.open : ""}`}
                      disabled={busy || !(queen || open || (row < r && safe(qs, row, c)))}
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
                Tries <strong>{count}</strong> (blind: 256 boards)
              </span>
              <span>
                Solutions <strong>{sols.length}</strong> of 2
              </span>
            </div>
            {result && (
              <p className={s.msg}>
                Your run from empty: {result.count} tries, {result.found} solutions, the first at try {result.firstAt}.
              </p>
            )}
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
