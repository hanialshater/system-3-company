"use client";

// Two threads each run three steps on a shared counter: read it, add 1, write it back. The learner
// chooses the order the six steps run in (two presets, or "Step A" / "Step B" one at a time).
// The counter, the registers and both outcomes come from the same `run` function the stage draws.

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

const ONE = run(BOTH_READ_FIRST).counter; // 1
const TWO = run(ONE_AT_A_TIME).counter; // 2

export default function TwoWritersOneCounter({ slug }: { slug: string }) {
  const [seq, setSeq] = useState<T[]>([]);
  const st = run(seq);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A counter is 0. Two threads, A and B, each read it, add 1 and write it back. A reads, B reads, then A adds and writes, then B adds and writes. What is the counter?`,
        options: [String(TWO), String(ONE), "0"],
        answer: 1,
      }}
      exploreHint="Run both orders, then try stepping the threads yourself."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            A reads, B reads, A adds and writes, B adds and writes: both read 0, both wrote 1, so the counter is{" "}
            <strong>{ONE}</strong>. One thread at a time gives <strong>{TWO}</strong>.
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
              if (r.finished) reach(r.counter === ONE ? "one" : "two");
            };
            const step = (t: T) => st.done[t] < 3 && play([...seq, t]);
            const msg = locked
              ? "Make a prediction to start."
              : seq.length === 0
                ? "Run the steps in any order. Each thread keeps its own copy of what it read."
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
                <div className={s.lanes}>
                  {(["A", "B"] as T[]).map((t) => (
                    <div key={t} className={s.lane}>
                      <span className={s.name}>{t}</span>
                      {STEPS.map((label, i) => (
                        <span key={i} className={`${s.cell} ${i < st.done[t] ? s.on : ""}`}>{label}</span>
                      ))}
                      <span className={s.reg}>holds {locked || st.done[t] === 0 ? "–" : st.reg[t]}</span>
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

