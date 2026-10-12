"use client";

// Binary search as the higher-or-lower game. The payoff is not "guess the middle"
// (the procedure) but how fast the possibilities collapse: 1,000 -> 1 in ten halvings.
// One representation: the number line, with what is still possible lit up.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const N = 1000;
const BUDGET = 10;

function secretFor(round: number) {
  // Deterministic: the same rounds give the same secrets in every QA run.
  let x = (round * 2654435761 + 12345) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  x ^= x >>> 13;
  return 1 + ((x >>> 0) % N);
}

type Step = { guess: number; verdict: "higher" | "lower" | "hit"; ruledOut: boolean };

const X0 = 12;
const X1 = 308;
const xOf = (n: number) => X0 + ((n - 1) / (N - 1)) * (X1 - X0);

export default function BinarySearch({ slug }: { slug: string }) {
  const [round, setRound] = useState(3);
  const [lo, setLo] = useState(1);
  const [hi, setHi] = useState(N);
  const [guess, setGuess] = useState(250);
  const [steps, setSteps] = useState<Step[]>([]);
  const [wins, setWins] = useState<number[]>([]); // guesses used in each solved game
  const secret = secretFor(round);
  const done = steps.some((st) => st.verdict === "hit");
  const mid = Math.floor((lo + hi) / 2);
  const left = hi - lo + 1;

  const last = steps[steps.length - 1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "I pick a number from 1 to 1,000. After each guess you hear only \"higher\" or \"lower\". Playing smart, what is the most guesses you could need?",
        options: ["10", "About 50", "About 100", "About 500"],
        answer: 0,
      }}
      exploreHint="Find my number. Watch how many numbers are still possible after each guess."
      reveal={() => (
        <>
          <p>
            {wins.length
              ? `You found ${wins.length === 1 ? "my number" : "my numbers"} in ${wins.join(", ")} guesses. `
              : `After ${steps.length} guess${steps.length === 1 ? "" : "es"} you had ${left.toLocaleString("en-US")} numbers left. `}
            A guess in the middle of what is still possible rules out half of it, whichever way the answer goes. In the
            worst case what is left goes 1,000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1. Nine wrong guesses, so
            the <strong>tenth</strong> must be right.
          </p>
          <p>
            Size barely matters. Doubling the range adds one guess: a million numbers need at most 20, a billion at
            most 30.
          </p>
          <p className="muted">Each guess halves the haystack. That is the whole trick.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const makeGuess = () => {
          if (locked || done) return;
          interact();
          const g = guess;
          const ruledOut = g < lo || g > hi;
          if (g === secret) {
            setSteps((p) => [...p, { guess: g, verdict: "hit", ruledOut }]);
            setWins((w) => [...w, steps.length + 1]);
            setLo(g);
            setHi(g);
            return;
          }
          const verdict = g < secret ? "higher" : "lower";
          setSteps((p) => [...p, { guess: g, verdict, ruledOut }]);
          if (verdict === "higher") setLo((l) => Math.max(l, g + 1));
          else setHi((h) => Math.min(h, g - 1));
        };

        const newNumber = () => {
          if (locked) return;
          interact();
          setRound((r) => r + 1);
          setLo(1);
          setHi(N);
          setGuess(250);
          setSteps([]);
        };

        const msg = locked
          ? "Make a prediction to start."
          : done
            ? `Got it: ${secret}, in ${steps.length} guess${steps.length === 1 ? "" : "es"}.`
            : !last
              ? "Pick a guess, then tap Guess."
              : last.ruledOut
                ? `${last.guess} was already ruled out. A wasted guess.`
                : `${last.verdict === "higher" ? "Higher" : "Lower"} than ${last.guess}.`;

        const segW = Math.max(3, xOf(hi) - xOf(lo));
        const segX = Math.min(xOf(lo), X1 - segW);
        const gx = xOf(guess);

        return (
          <div className={s.wrap}>
            <div className={s.left}>
              <span className={s.leftNum}>{left.toLocaleString("en-US")}</span>
              <span className="muted small">{left === 1 ? "number still possible" : "numbers still possible"}</span>
            </div>

            <svg viewBox="0 0 320 96" className="stage-svg" role="img" aria-label={`Number line from 1 to 1000. Still possible: ${lo} to ${hi}. Your guess: ${guess}.`}>
              {/* the whole range */}
              <rect x={X0} y={44} width={X1 - X0} height={16} rx={4} fill="var(--line)" />
              {/* what is still possible */}
              <rect x={segX} y={44} width={segW} height={16} rx={3} fill={done ? "var(--good)" : "var(--domain)"} />
              {/* past guesses */}
              {steps.map((st, i) => (
                <line
                  key={i}
                  x1={xOf(st.guess)}
                  x2={xOf(st.guess)}
                  y1={40}
                  y2={64}
                  stroke={st.verdict === "hit" ? "var(--good)" : "var(--fg)"}
                  strokeWidth={1.5}
                  opacity={i === steps.length - 1 ? 1 : 0.45}
                />
              ))}
              {/* current guess marker */}
              {!done && (
                <g>
                  <path d={`M ${gx - 6} 26 L ${gx + 6} 26 L ${gx} 36 Z`} fill="var(--fg)" />
                  <text x={Math.min(Math.max(gx, 22), 298)} y={20} textAnchor="middle" className={s.guessLabel}>
                    {guess}
                  </text>
                </g>
              )}
              <text x={X0} y={80} className={s.axis}>
                1
              </text>
              <text x={X1} y={80} textAnchor="end" className={s.axis}>
                1,000
              </text>
              <text x={160} y={80} textAnchor="middle" className={s.range}>
                {lo === hi ? `${lo}` : `${lo}–${hi}`}
              </text>
            </svg>

            <div className={s.dots} aria-label={`${steps.length} guesses used`}>
              {Array.from({ length: Math.max(BUDGET, steps.length) }, (_, i) => (
                <span
                  key={i}
                  className={`${s.dot} ${i < steps.length ? (i >= BUDGET ? s.over : s.used) : ""} ${
                    steps[i]?.verdict === "hit" ? s.hit : ""
                  }`}
                />
              ))}
            </div>

            <p className={s.msg} aria-live="polite">
              {msg}
            </p>

            <Slider
              label="Your guess"
              value={guess}
              min={1}
              max={N}
              disabled={locked || done}
              onChange={(v) => {
                setGuess(v);
                interact();
              }}
            />
            <Row>
              <Control
                disabled={locked || done || guess === mid}
                onClick={() => {
                  interact();
                  setGuess(mid);
                }}
              >
                Pick the middle
              </Control>
              <Control className="active" disabled={locked || done} onClick={makeGuess}>
                Guess {guess}
              </Control>
              <Control disabled={locked || steps.length === 0} onClick={newNumber}>
                New number
              </Control>
              <Readout label="Guesses" value={steps.length} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
