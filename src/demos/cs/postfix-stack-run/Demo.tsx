"use client";

// Evaluating 5 1 2 + 4 × + 3 − with a stack. Nine token buttons in a row; only the next one is
// enabled, so the learner (and QA, in DOM order) reads the expression left to right. A number goes
// on top of the pile; an operator takes the top two off and puts back the result. The pile is drawn
// as boxes, and each operation stays in a log under it, so the reveal quotes only what is on stage.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Tok = number | "+" | "×" | "−";
const TOKENS: Tok[] = [5, 1, 2, "+", 4, "×", "+", 3, "−"];
const apply = (op: Tok, a: number, b: number) => (op === "+" ? a + b : op === "×" ? a * b : a - b);

type State = { stack: number[]; log: string[]; tallest: number };
function run(n: number): State {
  let stack: number[] = [];
  const log: string[] = [];
  let tallest = 0;
  for (const t of TOKENS.slice(0, n)) {
    if (typeof t === "number") stack = [...stack, t];
    else {
      const b = stack[stack.length - 1];
      const a = stack[stack.length - 2];
      const r = apply(t, a, b);
      log.push(`${a} ${t} ${b} = ${r}`);
      stack = [...stack.slice(0, -2), r];
    }
    tallest = Math.max(tallest, stack.length);
  }
  return { stack, log, tallest };
}
const FINAL = run(TOKENS.length);
const RESULT = FINAL.stack[0]; // 14
const EXPR = TOKENS.join(" ");
const SLOTS = 4;

export default function PostfixStackRun({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const st = run(n);
  const done = n === TOKENS.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Read ${EXPR} left to right. A number goes on top of a pile; an operator takes the top two off and puts back their result. What is left?`,
        options: [String(RESULT), "12", "20"],
        answer: 0,
      }}
      exploreHint="Tap the tokens in order and watch the pile."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You read {EXPR} and the pile did the rest: {FINAL.log.join(", ")}. One number was left:{" "}
            <strong>{RESULT}</strong>. The pile was never taller than {FINAL.tallest}.
          </p>
          <p>
            Nothing told you to add 1 + 2 before multiplying by 4: the order of the tokens already said so. With
            brackets it is 5 + (1 + 2) × 4 − 3. This bracket-free way of writing is called postfix, and a pile (a stack)
            is all it needs.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-op", "done"]}>
          {(reach) => {
            const step = (i: number) => {
              if (locked || i !== n) return;
              setN(i + 1);
              if (typeof TOKENS[i] !== "number") reach("first-op");
              if (i + 1 === TOKENS.length) reach("done");
            };
            const reset = () => {
              if (locked || n === 0) return;
              setN(0);
            };
            const last = n > 0 ? TOKENS[n - 1] : null;
            const msg = locked
              ? "Make a prediction to start."
              : last === null
                ? "Tap the first token."
                : typeof last === "number"
                  ? `${last} goes on top.`
                  : `Top two off: ${st.log[st.log.length - 1]} goes back on.`;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.tape}>
                  <Control className={s.reset} disabled={locked || n === 0} onClick={reset} aria-label="Start again">
                    ↺
                  </Control>
                  {TOKENS.map((t, i) => (
                    <Control key={i} aria-label={`Token ${i + 1}: ${t}`} disabled={locked || i !== n}
                      className={`${s.tok} ${typeof t === "number" ? "" : s.op} ${i < n ? `active ${s.used}` : ""}`}
                      onClick={() => step(i)}>
                      {t}
                    </Control>
                  ))}
                </div>
                <p className={s.rule}>Number: put it on top. Operator: take the top two off, put the result back.</p>
                <div className={s.middle}>
                  <div className={s.pile} aria-label={`Pile, bottom to top: ${st.stack.join(", ") || "empty"}`}>
                    {Array.from({ length: SLOTS }, (_, k) => SLOTS - 1 - k).map((k) => (
                      <div key={k} className={`${s.slot} ${k < st.stack.length ? s.full : ""} ${k === st.stack.length - 1 ? s.top : ""}`}>
                        {k < st.stack.length ? st.stack[k] : ""}
                      </div>
                    ))}
                    <span className={s.pileLab}>pile</span>
                  </div>
                  <ol className={s.log}>
                    {st.log.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ol>
                </div>
                <Row>
                  <Readout label="Tokens read" value={locked ? "–" : `${n} of ${TOKENS.length}`} />
                  <Readout label="Left on pile" value={locked || !done ? "–" : st.stack.join(", ")} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
