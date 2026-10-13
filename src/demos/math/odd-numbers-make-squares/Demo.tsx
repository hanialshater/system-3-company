"use client";

// Odd numbers build squares. The payoff is the L: each odd number is exactly the
// row-plus-column that wraps an n-by-n square into the next one. The learner adds
// the odd numbers one at a time and sees each one snap around the square.
//
// v2: the reveal is earned. Milestone "five-by-five": the learner has built at least 5 x 5
// (five L's, the last one 9 = 4 + 4 + 1 dots). "+ next" steps one L; "Keep going" plays one L
// at a time so a learner (and the QA path, which presses each control once) can get there.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./styles.module.css";

const MAX = 10;
const GOAL = 5;
const CELL = 28;
const PAD = 14;
const SIZE = PAD * 2 + CELL * MAX;
const TICK_MS = 600;

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

/** Calls onReach once n reaches the goal (n can change by a tap or by the player). */
function ReachWatcher({ n, onReach }: { n: number; onReach: () => void }) {
  useEffect(() => {
    if (n >= GOAL) onReach();
  }, [n, onReach]);
  return null;
}

export default function OddNumbersMakeSquares({ slug }: { slug: string }) {
  // n = how many odd numbers have been added (1 means just "1").
  const [n, setN] = useState(1);
  const [maxN, setMaxN] = useState(1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (next: number) => {
    setN(next);
    setMaxN((m) => Math.max(m, next));
  };

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  };

  useEffect(() => () => stop(), []);

  const terms = Array.from({ length: n }, (_, i) => 2 * i + 1);
  const sum = n * n;
  const last = 2 * MAX - 1;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Add the odd numbers in order: 1 + 3 + 5 + 7 + … up to ${last}. What do the running totals do?`,
        options: [
          "No pattern: you have to add them up",
          "Every total is a perfect square",
          "Every total is an odd number",
        ],
        answer: 1,
      }}
      exploreHint={`Build up to at least ${GOAL} × ${GOAL}: add the odd numbers and watch where each one goes.`}
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            You built up to {maxN} × {maxN}. Every odd number you added landed as an <strong>L</strong>: one row and one
            column sharing a corner. Wrapping a 3 × 3 square takes 3 + 3 + 1 = 7 dots, and 7 is the next odd number.
            Wrapping a 9 × 9 square takes 9 + 9 + 1 = 19 and makes 10 × 10.
          </p>
          <p>
            So the totals cannot miss: each odd number is exactly the L that turns one square into the next. Ten odd
            numbers make 10 × 10 = 100. The same L's, a hundred of them, make 100 × 100: the first 100 odd numbers add
            up to 10,000.
          </p>
          <p className="muted">The sum was never a pile. It was a square all along.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["five-by-five"]}>
          {(reach) => {
            const add = () => {
              if (locked || n >= MAX || playing) return;
              go(n + 1);
            };
            const undo = () => {
              if (locked || n <= 1 || playing) return;
              go(n - 1);
            };
            const play = () => {
              if (locked) return;
              if (playing) return stop();
              let k = n >= MAX ? 1 : n;
              setPlaying(true);
              const tick = () => {
                k += 1;
                go(k);
                if (k >= MAX) stop();
              };
              if (n >= MAX) go(1);
              timer.current = setInterval(tick, TICK_MS);
            };

            const dots = [];
            for (let r = 0; r < MAX; r++) {
              for (let c = 0; c < MAX; c++) {
                const layer = Math.max(r, c) + 1; // which odd number this dot belongs to
                const on = layer <= n;
                const newest = on && layer === n && n > 1;
                const corner = newest && r === c;
                dots.push(
                  <circle
                    key={`${r}-${c}`}
                    cx={PAD + CELL * c + CELL / 2}
                    // Grow from the bottom-left corner so the L sits on top and right.
                    cy={SIZE - PAD - CELL * r - CELL / 2}
                    r={on ? 10 : 3}
                    className={on ? (corner ? s.corner : newest ? s.newest : layer % 2 ? s.odd : s.even) : s.empty}
                  />,
                );
              }
            }

            const nextOdd = 2 * n + 1;
            // Keep the sum on one line on a phone: 1 + 3 + … + 17 + 19 once it gets long.
            const shown: (number | "…")[] = n > 6 ? [1, 3, "…", terms[n - 2], terms[n - 1]] : terms;
            return (
              <div className={s.wrap}>
                <ReachWatcher n={n} onReach={() => reach("five-by-five")} />
                <svg
                  viewBox={`0 0 ${SIZE} ${SIZE}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`${sum} dots arranged as a ${n} by ${n} square`}
                >
                  {/* the square before the newest L, so the L is seen wrapping it */}
                  {n > 1 && (
                    <rect
                      x={PAD - 3}
                      y={SIZE - PAD - CELL * (n - 1) - 3}
                      width={CELL * (n - 1) + 6}
                      height={CELL * (n - 1) + 6}
                      rx={8}
                      className={s.frame}
                    />
                  )}
                  {dots}
                </svg>

                <p className={s.eq} aria-live="polite">
                  {shown.map((t, i) => (
                    <span key={i}>
                      {i > 0 && " + "}
                      <span className={i === shown.length - 1 && n > 1 ? s.termNew : undefined}>{t}</span>
                    </span>
                  ))}
                  {" = "}
                  <strong>{sum}</strong>
                  <span className={s.square}>
                    {" "}
                    = {n} × {n}
                  </span>
                </p>
                <p className={s.caption}>
                  {locked
                    ? "Make a prediction to start."
                    : n === 1
                      ? "Start with 1 dot. Add the next odd number."
                      : `The ${2 * n - 1} new dots = ${n - 1} + ${n - 1} + 1 (corner) wrap ${n - 1} × ${n - 1} into ${n} × ${n}.`}
                </p>

                <Row>
                  <Control
                    disabled={locked || n >= MAX || playing}
                    onClick={add}
                    aria-label={n >= MAX ? `Up to ${last}` : `Add ${nextOdd}`}
                  >
                    {n >= MAX ? `Up to ${last}` : `+ ${nextOdd}`}
                  </Control>
                  <Control
                    disabled={locked}
                    onClick={play}
                    aria-label={playing ? "Pause" : "Keep going, one L at a time"}
                  >
                    {playing ? "Pause" : n >= MAX ? "Again" : "Keep going"}
                  </Control>
                  <Control disabled={locked || n <= 1 || playing} onClick={undo} aria-label="Take the last one away">
                    Undo
                  </Control>
                  <Readout label="Total" value={sum} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
