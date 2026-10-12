"use client";

// Fluent, not factual. A next-word model trained on three true sentences, with a memory of
// the last 1, 2 or 5 words. Prompted "Rome is the capital of", with 1 or 2 words of memory
// it sees only "...of" or "capital of", which were followed by France, Italy and Spain once
// each: 2 completions in 3 are false, all equally fluent. Only with all 5 words does the
// context pin down "Italy", and then it can only repeat its training text.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

// MODEL START
const CORPUS = ["Paris is the capital of France", "Rome is the capital of Italy", "Madrid is the capital of Spain"];
const PROMPT = ["Rome", "is", "the", "capital", "of"];
const TRUE_ANSWER = "Italy";
const MEMORIES = [1, 2, 5];

/** Words that followed the last k prompt words in the training text, with counts. */
function nextWords(k: number) {
  const ctx = PROMPT.slice(-k).join(" ");
  const m: Record<string, number> = {};
  for (const line of CORPUS) {
    const w = line.split(" ");
    for (let i = k; i < w.length; i++) {
      if (w.slice(i - k, i).join(" ") === ctx) m[w[i]] = (m[w[i]] ?? 0) + 1;
    }
  }
  return Object.entries(m);
}

function rng(seed: number) {
  let v = seed >>> 0;
  return () => {
    v = (Math.imul(v, 1664525) + 1013904223) >>> 0;
    return v / 4294967296;
  };
}

function ask30(options: [string, number][], r: () => number) {
  const total = options.reduce((a, [, c]) => a + c, 0);
  return Array.from({ length: 30 }, () => {
    let x = r() * total;
    for (const [w, c] of options) {
      x -= c;
      if (x < 0) return w;
    }
    return options[options.length - 1][0];
  });
}

// MODEL END

const COLS = 10;
const CELL = 30;

export default function TrueTextFalseClaims({ slug }: { slug: string }) {
  const [k, setK] = useState(1);
  const [answers, setAnswers] = useState<string[] | null>(null);
  const rand = useRef(rng(2024));
  const options = nextWords(k);
  const falseCount = answers ? answers.filter((a) => a !== TRUE_ANSWER).length : 0;
  const lastWrong = answers?.find((a) => a !== TRUE_ANSWER);

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (!answers) return "Ask it to finish the sentence.";
    if (lastWrong) return `“Rome is the capital of ${lastWrong}.” Fluent. False.`;
    return "Always Italy: it can only repeat a training sentence.";
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Trained on three true sentences (Paris is the capital of France. Rome is the capital of Italy. Madrid is the capital of Spain.) with one word of memory, the model starts “Rome is the capital of” and picks the next word. How often is it false?",
        options: ["Never", "About 1 time in 3", "About 2 times in 3"],
        answer: 2,
      }}
      exploreHint="Ask 30 times. Then give it more memory and ask again."
      reveal={() => (
        <>
          <p>
            With one word of memory the model sees only “of”. In training, “of” was followed by France, Italy and
            Spain once each, so it picks each a third of the time: <strong>2 times in 3 it is false</strong>. Two words
            (“capital of”) changes nothing. Every sentence it wrote was equally fluent.
          </p>
          <p>
            Only with all five words does “Rome” stay in view, and then it always says Italy, by repeating a training
            sentence word for word. The model picks plausible next words, not true ones; truth survives only when the
            context pins it down.
          </p>
          <p className="muted">
            Real language models also produce fluent false statements, called hallucinations.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <p className={s.prompt}>
            {PROMPT.map((w, i) => (
              <span key={i} className={!locked && i >= PROMPT.length - k ? s.mem : s.out}>
                {w}
              </span>
            ))}
            <span className={s.blank}>…</span>
          </p>
          <p className={s.options}>
            {locked
              ? " "
              : options.map(([w, c]) => (
                  <span key={w} className={w === TRUE_ANSWER ? s.true : s.false}>
                    {w} ×{c}
                  </span>
                ))}
          </p>
          <svg viewBox={`0 0 ${COLS * CELL} ${3 * CELL}`} className="stage-svg" role="img" aria-label={answers ? `${falseCount} of 30 answers false` : "No answers yet"}>
            {Array.from({ length: 30 }, (_, i) => {
              const a = answers?.[i];
              return (
                <rect
                  key={i}
                  x={(i % COLS) * CELL + 3}
                  y={Math.floor(i / COLS) * CELL + 3}
                  width={CELL - 6}
                  height={CELL - 6}
                  rx={5}
                  fill={!a ? "var(--bg-2)" : a === TRUE_ANSWER ? "var(--good)" : "var(--bad)"}
                  stroke="var(--line)"
                />
              );
            })}
          </svg>
          <p className={s.msg} aria-live="polite">
            {message(locked)}
          </p>
          <Row>
            <Control
              disabled={locked}
              onClick={() => {
                setAnswers(ask30(options, rand.current));
                if (k < PROMPT.length) interact(); // the reveal waits for answers with a short memory
              }}
            >
              Ask 30 times
            </Control>
            <Readout label="False" value={answers ? `${falseCount} of 30` : "–"} />
          </Row>
          <Row>
            <span className={s.small}>Memory:</span>
            {MEMORIES.map((m) => (
              <Control
                key={m}
                className={k === m ? "active" : ""}
                aria-pressed={k === m}
                disabled={locked || k === m}
                onClick={() => {
                  setK(m);
                  setAnswers(null);
                }}
              >
                {m} word{m === 1 ? "" : "s"}
              </Control>
            ))}
          </Row>
        </div>
      )}
    </Lesson>
  );
}
