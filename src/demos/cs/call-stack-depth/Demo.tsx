"use client";

// factorial(3) as a stack of boxes. Each call is a box with its own n, waiting for the call
// above it. The learner calls down to the base case factorial(0) (4 boxes open at once) and
// then returns the answers back up: 1, 1, 2, 6. One picture: the stack.
//
// Every button exists from the start, in the order a learner would press them, placed into
// the box it belongs to by CSS grid rows; buttons that do not apply yet are hidden.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const TOP = 3;
const fact = (n: number): number => (n === 0 ? 1 : n * fact(n - 1));
const MAX_DEPTH = TOP + 1; // calls for 3, 2, 1, 0

// Events in order: call 2, call 1, call 0, return from 0, 1, 2, 3.
type St = { open: number[]; returned: { n: number; v: number }[] };
const START: St = { open: [TOP], returned: [] };

export default function CallStackDepth({ slug }: { slug: string }) {
  const [st, setSt] = useState<St>(START);
  const [maxSeen, setMaxSeen] = useState(1);

  const top = st.open[st.open.length - 1];
  const done = st.open.length === 0;
  const valueOf = (n: number) => st.returned.find((r) => r.n === n)?.v;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `factorial(n) = n × factorial(n − 1), and factorial(0) = 1. At the deepest moment of factorial(${TOP}), how many calls are open (waiting or running)?`,
        options: ["1", String(TOP), String(MAX_DEPTH)],
        answer: 2,
      }}
      exploreHint="Call down until the base case, then send the answers back up."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You had {maxSeen} calls open at once: {Array.from({ length: maxSeen }, (_, i) => `factorial(${TOP - i})`).join(", ")}. A
            new call does not replace the old one: each box keeps its own n and waits for the box above it.
            {st.returned.length ? ` Then the answers came back: ${st.returned.map((r) => r.v).join(", ")}.` : ""}
          </p>
          <p>
            factorial(0) = 1 is the base case: the one call that answers without calling again. It is what lets the answers
            climb back up, {Array.from({ length: TOP + 1 }, (_, n) => fact(n)).join(", ")}. Without it the calls never stop,
            the stack of waiting boxes runs out of room, and the program crashes with a stack overflow.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["base-case", "first-return"]}>
          {(reach) => {
            const call = (n: number) => {
              if (locked || top !== n || n === 0) return;
              const open = [...st.open, n - 1];
              setSt({ ...st, open });
              setMaxSeen((m) => Math.max(m, open.length));
              if (n - 1 === 0) reach("base-case");
            };
            const ret = (n: number) => {
              if (locked || top !== n) return;
              const below = n === 0 ? 1 : n * (valueOf(n - 1) ?? 1);
              setSt({ open: st.open.slice(0, -1), returned: [...st.returned, { n, v: below }] });
              reach("first-return");
            };
            const restart = () => {
              if (locked) return;
              setSt(START);
            };

            // grid row for call n: factorial(0) on top, factorial(3) at the bottom
            const rowOf = (n: number) => ({ gridRow: n + 1 });
            const isOpen = (n: number) => st.open.includes(n);
            const waiting = (n: number) => isOpen(n) && top !== n;
            const ready = (n: number) => top === n && (n === 0 || valueOf(n - 1) !== undefined);

            return (
              <div className={s.wrap}>
                <Row>
                  <Control style={{ display: done ? undefined : "none" }} disabled={locked} onClick={restart}>
                    Start again
                  </Control>
                  <Readout label="Calls open" value={st.open.length} />
                  <Readout label="Most at once" value={maxSeen} />
                  {done ? <Readout label="Answer" value={`factorial(${TOP}) = ${valueOf(TOP)}`} /> : null}
                </Row>
                <div className={s.stack}>
                  {Array.from({ length: TOP + 1 }, (_, i) => TOP - i).map((n) => (
                    <div
                      key={`box${n}`}
                      style={rowOf(n)}
                      className={`${s.box} ${isOpen(n) ? (top === n ? s.running : s.waiting) : s.empty}`}
                    >
                      {isOpen(n) ? (
                        <>
                          <b>factorial({n})</b>
                          <span>
                            n = {n} ·{" "}
                            {n === 0
                              ? "base case: 1"
                              : waiting(n)
                                ? `waits for factorial(${n - 1})`
                                : valueOf(n - 1) !== undefined
                                  ? `${n} × ${valueOf(n - 1)} = ${n * (valueOf(n - 1) ?? 1)}`
                                  : "running"}
                          </span>
                        </>
                      ) : valueOf(n) !== undefined ? (
                        <span className={s.gone}>factorial({n}) returned {valueOf(n)}</span>
                      ) : null}
                    </div>
                  ))}
                  {/* controls, in the order they are used */}
                  {[TOP, TOP - 1, TOP - 2].map((n) => (
                    <Control
                      key={`call${n}`}
                      style={{ ...rowOf(n), display: top === n && valueOf(n - 1) === undefined ? undefined : "none" }}
                      className={s.btn}
                      disabled={locked}
                      onClick={() => call(n)}
                    >
                      Call factorial({n - 1})
                    </Control>
                  ))}
                  {Array.from({ length: TOP + 1 }, (_, n) => n).map((n) => (
                    <Control
                      key={`ret${n}`}
                      style={{ ...rowOf(n), display: ready(n) ? undefined : "none" }}
                      className={`${s.btn} active`}
                      disabled={locked}
                      onClick={() => ret(n)}
                    >
                      Return {n === 0 ? 1 : n * (valueOf(n - 1) ?? 1)}
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
