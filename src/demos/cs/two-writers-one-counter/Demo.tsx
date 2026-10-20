"use client";

// Two threads each run three steps on a shared counter: read it, add 1, write it back. The learner
// chooses the order the six steps run in (two presets, or "Step A" / "Step B" one at a time).
// The counter, the registers and both outcomes come from the same `run` function the stage draws.
// v3: the "Order run" line is now a step-by-step trace (each step: A's copy, B's copy, the counter). A copy whose
// read value no longer matches the counter is marked stale in red, so "B still held 0 after A wrote 1" is on
// the stage after the "Both read first" run. Milestone "one" is reached only by a run with a stale write.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type T = "A" | "B";
const STEPS = ["read", "add 1", "write"];
const BOTH_READ_FIRST: T[] = ["A", "B", "A", "A", "B", "B"]; // A reads, B reads, A adds+writes, B adds+writes
const ONE_AT_A_TIME: T[] = ["A", "A", "A", "B", "B", "B"];

// Execute a (partial) order of steps. Each thread has a private register.
function run(seq: T[]) {
  let counter = 0;
  const reg: Record<T, number> = { A: 0, B: 0 };
  const done: Record<T, number> = { A: 0, B: 0 };
  for (const t of seq) {
    const step = done[t]++;
    if (step === 0) reg[t] = counter;
    else if (step === 1) reg[t] += 1;
    else counter = reg[t];
  }
  return { counter, reg, done, finished: seq.length === 6 };
}

// One column per step run: what it was, each thread's copy, the counter, and which copies are stale
// (read before the counter last changed, and not yet written back).
type Col = { label: string; copy: Record<T, number | null>; counter: number; stale: Record<T, boolean>; lost: boolean };
function trace(seq: T[]): Col[] {
  let counter = 0;
  const reg: Record<T, number | null> = { A: null, B: null };
  const readAs: Record<T, number> = { A: 0, B: 0 };
  const done: Record<T, number> = { A: 0, B: 0 };
  return seq.map((t) => {
    const step = done[t]++;
    let lost = false;
    if (step === 0) {
      reg[t] = counter;
      readAs[t] = counter;
    } else if (step === 1) reg[t] = (reg[t] ?? 0) + 1;
    else {
      lost = readAs[t] !== counter; // writing over a change it never saw
      counter = reg[t] ?? 0;
    }
    const stale = { A: false, B: false };
    for (const u of ["A", "B"] as T[]) stale[u] = done[u] >= 1 && done[u] < 3 && readAs[u] !== counter;
    return { label: `${t} ${["reads", "adds", "writes"][step]}`, copy: { ...reg }, counter, stale, lost };
  });
}
const hasLostWrite = (seq: T[]) => trace(seq).some((c) => c.lost);

const ONE = run(BOTH_READ_FIRST).counter; // 1
const TWO = run(ONE_AT_A_TIME).counter; // 2

export default function TwoWritersOneCounter({ slug }: { slug: string }) {
  const [seq, setSeq] = useState<T[]>([]);
  const st = run(seq);
  const tr = trace(seq);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your visit counter reads 0. Two threads (jobs running at once in one program), A and B, each read it, add 1 and write it back. A reads, B reads, then A adds and writes, then B adds and writes. What does it show?`,
        options: [String(TWO), String(ONE), "0"],
        answer: 1,
      }}
      exploreHint="Run both orders and read the trace step by step. Then try stepping the threads yourself."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Look at the trace of &quot;Both read first&quot;: both copies read 0. After A wrote 1, B&apos;s copy still held that 0
            (marked stale). B added 1 to it and wrote 1 over A&apos;s 1, so the counter is <strong>{ONE}</strong>. One thread at a
            time gives <strong>{TWO}</strong>.
          </p>
          <p>
            Adding 1 is three steps, not one, so the order the steps interleave decides the answer. A lock keeps
            another thread from stepping in the middle, which is why locks exist.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["one", "two"]}>
          {(reach) => {
            const play = (next: T[]) => {
              if (locked) return;
              setSeq(next);
              const r = run(next);
              if (r.finished) {
                if (hasLostWrite(next)) reach("one");
                else reach("two");
              }
            };
            const step = (t: T) => st.done[t] < 3 && play([...seq, t]);
            const msg = locked
              ? "Make a prediction to start."
              : seq.length === 0
                ? "Run the steps in any order."
                : st.finished
                  ? `Done: the counter is ${st.counter}.`
                  : `${seq.length} of 6 steps run.`;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.presets}>
                  <Control aria-label="Run: both read before either writes" disabled={locked} onClick={() => play(BOTH_READ_FIRST)}>
                    Both read first
                  </Control>
                  <Control aria-label="Run: one thread at a time" disabled={locked} onClick={() => play(ONE_AT_A_TIME)}>
                    One at a time
                  </Control>
                </div>
                <p className={s.order}>Each thread works on its own copy of what it read. Red: a stale copy.</p>
                <div className={s.lanes}>
                  {(["A", "B"] as T[]).map((t) => (
                    <div key={t} className={s.lane}>
                      <span className={s.name}>{t}</span>
                      {STEPS.map((label, i) => (
                        <span key={i} className={`${s.cell} ${i < st.done[t] ? s.on : ""}`}>{label}</span>
                      ))}
                      <span className={s.reg}>copy {locked || st.done[t] === 0 ? "–" : st.reg[t]}</span>
                    </div>
                  ))}
                </div>
                <div className={s.counter} aria-label="Shared counter">
                  <span className={s.cl}>Counter</span>
                  <span className={s.cv}>{locked ? "–" : st.counter}</span>
                </div>
                <div className={s.presets}>
                  <Control aria-label="Step thread A" disabled={locked || st.done.A >= 3} onClick={() => step("A")}>
                    Step A
                  </Control>
                  <Control aria-label="Step thread B" disabled={locked || st.done.B >= 3} onClick={() => step("B")}>
                    Step B
                  </Control>
                  <Control aria-label="Start over" disabled={locked || seq.length === 0} onClick={() => play([])}>
                    Start over
                  </Control>
                </div>
                <div className={s.trace} role="table" aria-label="Trace of the steps run">
                  {(["step", "A copy", "B copy", "counter"] as const).map((rowName) => (
                    <div key={rowName} className={s.trow} role="row">
                      <span className={s.th} role="rowheader">{rowName}</span>
                      {Array.from({ length: 6 }, (_, k) => {
                        const c = locked ? undefined : tr[k];
                        if (!c) return <span key={k} className={s.td} role="cell">·</span>;
                        if (rowName === "step") return <span key={k} className={s.td} role="cell">{c.label}</span>;
                        if (rowName === "counter") return <span key={k} className={`${s.td} ${c.lost ? s.stale : ""}`} role="cell">{c.counter}</span>;
                        const t: T = rowName === "A copy" ? "A" : "B";
                        return (
                          <span key={k} className={`${s.td} ${c.stale[t] ? s.stale : ""}`} role="cell">
                            {c.copy[t] === null ? "–" : `${c.copy[t]}${c.stale[t] ? " stale" : ""}`}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <Row>
                  <Readout label="Steps run" value={locked ? "–" : `${seq.length} of 6`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

