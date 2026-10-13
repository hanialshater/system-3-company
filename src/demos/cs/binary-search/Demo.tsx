"use client";

// Binary search as the higher-or-lower game. The payoff is not "guess the middle"
// (the procedure) but how fast the possibilities collapse: 1,000 -> 1 in ten halvings.
// One representation: the number line, with what is still possible lit up.
//
// v2: the reveal is earned. Milestone "found": the learner has finished one search (found my
// number).  plays the rest with middle guesses, one guess at a time, so the
// QA path (each control pressed once) finishes a search and a learner can watch the halving.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
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

type Step = { guess: number; verdict: "higher" | "lower" | "hit"; ruledOut: boolean; before: number; after: number };
type Range = { lo: number; hi: number };

const X0 = 12;
const X1 = 308;
const xOf = (n: number) => X0 + ((n - 1) / (N - 1)) * (X1 - X0);
const fmt = (n: number) => n.toLocaleString("en-US");

/** One guess against the secret: the new range and the record of the step. */
function judge(g: number, secret: number, r: Range): { range: Range; step: Step } {
  const before = r.hi - r.lo + 1;
  const ruledOut = g < r.lo || g > r.hi;
  if (g === secret) return { range: { lo: g, hi: g }, step: { guess: g, verdict: "hit", ruledOut, before, after: 1 } };
  const verdict = g < secret ? "higher" : "lower";
  const range =
    verdict === "higher" ? { lo: Math.max(r.lo, g + 1), hi: r.hi } : { lo: r.lo, hi: Math.min(r.hi, g - 1) };
  return { range, step: { guess: g, verdict, ruledOut, before, after: range.hi - range.lo + 1 } };
}

function Milestones({
  interact,
  names,
  children,
}: {
  interact: () => void;
  names: readonly string[];
  children: (reach: (name: string) => void) => ReactNode;
}) {
  const { reach } = useMilestones(interact, names);
  return <>{children(reach)}</>;
}

function ReachWatcher({ hit, onReach }: { hit: boolean; onReach: () => void }) {
  useEffect(() => {
    if (hit) onReach();
  }, [hit, onReach]);
  return null;
}

export default function BinarySearch({ slug }: { slug: string }) {
  const [round, setRound] = useState(3);
  const [range, setRange] = useState<Range>({ lo: 1, hi: N });
  const [guess, setGuess] = useState(250);
  const [steps, setSteps] = useState<Step[]>([]);
  const [solved, setSolved] = useState<Step[] | null>(null); // the last finished search, for the reveal
  const playing = false;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const { lo, hi } = range;
  const secret = secretFor(round);
  const done = steps.some((st) => st.verdict === "hit");
  const mid = Math.floor((lo + hi) / 2);
  const left = hi - lo + 1;
  const last = steps[steps.length - 1];

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (done) setSolved(steps);
  }, [done, steps]);

  const chain = (ss: Step[]) => [fmt(N), ...ss.map((st) => fmt(st.after))].join(" → ");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `I pick a number from 1 to ${fmt(N)}. After each guess you hear only "higher" or "lower". Playing smart, what is the most guesses you could need?`,
        options: ["10", "50", "100", "500"],
        answer: 0,
      }}
      exploreHint="Find my number. Watch how many numbers are still possible after each guess."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {solved
              ? `You found my number in ${solved.length} guess${solved.length === 1 ? "" : "es"}: ${chain(solved)}. `
              : ""}
            A guess in the middle of what is still possible rules out at least half of it, whichever way the answer
            goes. At worst what is left goes 1,000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1 (sometimes one fewer:
            "lower than 500" leaves 499). Nine wrong guesses, so the <strong>tenth</strong> must be right.
          </p>
          <p>
            Size barely matters. Doubling the range adds one guess: a million numbers need at most 20, a billion at most
            30.
          </p>
          <p className="muted">Each guess halves the haystack. That is the whole trick.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["found"]}>
          {(reach) => {
            const apply = (g: number, r: Range, prev: Step[]) => {
              const res = judge(g, secret, r);
              const next = [...prev, res.step];
              setRange(res.range);
              setSteps(next);
              return { range: res.range, steps: next };
            };

            const makeGuess = () => {
              if (locked || done || playing) return;
              apply(guess, range, steps);
            };

            const playOut = () => {
              if (locked || done || playing) return;
              // Middle guesses from wherever the learner is, all at once (the chain shows every step).
              let r = range;
              let ss = steps;
              let g = Math.floor((r.lo + r.hi) / 2);
              for (let i = 0; i < 20; i++) {
                g = Math.floor((r.lo + r.hi) / 2);
                const res = apply(g, r, ss);
                r = res.range;
                ss = res.steps;
                if (g === secret) break;
              }
              setGuess(g);
            };

            const newNumber = () => {
              if (locked || playing) return;
              setRound((r) => r + 1);
              setRange({ lo: 1, hi: N });
              setGuess(250);
              setSteps([]);
            };

            const msg = locked
              ? "Make a prediction to start."
              : done
                ? `Got it: ${secret}, in ${steps.length} guess${steps.length === 1 ? "" : "es"}. Left: ${chain(steps)}.`
                : !last
                  ? "Pick a guess, then tap Guess."
                  : last.ruledOut
                    ? `${last.guess} was already ruled out. A wasted guess.`
                    : `${last.verdict === "higher" ? "Higher" : "Lower"} than ${last.guess}: ${fmt(
                        last.before - last.after,
                      )} ruled out, ${fmt(last.after)} left.`;

            const segW = Math.max(3, xOf(hi) - xOf(lo));
            const segX = Math.min(xOf(lo), X1 - segW);
            const gx = xOf(guess);

            return (
              <div className={s.wrap}>
                <ReachWatcher hit={done} onReach={() => reach("found")} />
                <div className={s.left}>
                  <span className={s.leftNum}>{fmt(left)}</span>
                  <span className="muted small">{left === 1 ? "number still possible" : "numbers still possible"}</span>
                </div>

                <svg
                  viewBox="0 0 320 96"
                  className="stage-svg"
                  role="img"
                  aria-label={`Number line from 1 to 1000. Still possible: ${lo} to ${hi}. Your guess: ${guess}.`}
                >
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
                  {Array.from({ length: steps.length }, (_, i) => (
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
                  disabled={locked || done || playing}
                  onChange={(v) => setGuess(v)}
                />
                <Row>
                  <Control disabled={locked || done || playing || guess === mid} onClick={() => setGuess(mid)}>
                    Pick the middle
                  </Control>
                  <Control className="active" disabled={locked || done || playing} onClick={makeGuess}>
                    Guess {guess}
                  </Control>
                </Row>
                <Row>
                  <Control disabled={locked || done || playing} onClick={playOut}>
                    Middles to the end
                  </Control>
                  <Control disabled={locked || playing || steps.length === 0} onClick={newNumber}>
                    New number
                  </Control>
                  <Readout label="Guesses" value={steps.length} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
