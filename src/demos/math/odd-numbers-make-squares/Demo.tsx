"use client";

// Odd numbers build squares. The payoff is the L: each odd number is exactly the
// row-plus-column that wraps an n-by-n square into the next one. The learner adds
// the odd numbers one at a time and sees each one snap around the square.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useState } from "react";
import s from "./styles.module.css";

const MAX = 10;
const CELL = 28;
const PAD = 14;
const SIZE = PAD * 2 + CELL * MAX;

export default function OddNumbersMakeSquares({ slug }: { slug: string }) {
  // n = how many odd numbers have been added (1 means just "1").
  const [n, setN] = useState(1);

  const terms = Array.from({ length: n }, (_, i) => 2 * i + 1);
  const sum = n * n;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "1 + 3 = 4 = 2 × 2 and 1 + 3 + 5 = 9 = 3 × 3. Keep adding the next odd number, up to 19. The totals…",
        options: ["stay perfect squares every time", "are squares only sometimes", "stop being squares as they grow"],
        answer: 0,
      }}
      exploreHint="Add the odd numbers one at a time and watch where each one goes."
      reveal={() => (
        <>
          <p>
            Every odd number you added landed as an <strong>L</strong>: one row and one column sharing a corner. Wrapping a
            3 × 3 square needs 3 + 3 + 1 = 7 dots, and 7 is the next odd number. A 9 × 9 square needs 19.
          </p>
          <p>
            So the totals cannot miss: each odd number is exactly the L that turns one square into the next. Ten odd
            numbers make 10 × 10 = 100. The first 100 odd numbers add up to 10,000, no adding required.
          </p>
          <p className="muted">The sum was never a pile. It was a square all along.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const add = () => {
          if (locked || n >= MAX) return;
          interact();
          setN(n + 1);
        };
        const undo = () => {
          if (locked || n <= 1) return;
          interact();
          setN(n - 1);
        };

        const dots = [];
        for (let r = 0; r < MAX; r++) {
          for (let c = 0; c < MAX; c++) {
            const layer = Math.max(r, c) + 1; // which odd number this dot belongs to
            const on = layer <= n;
            const newest = on && layer === n && n > 1;
            dots.push(
              <circle
                key={`${r}-${c}`}
                cx={PAD + CELL * c + CELL / 2}
                // Grow from the bottom-left corner so the L sits on top and right.
                cy={SIZE - PAD - CELL * r - CELL / 2}
                r={on ? 10 : 3}
                className={on ? (newest ? s.newest : layer % 2 ? s.odd : s.even) : s.empty}
              />,
            );
          }
        }

        const nextOdd = 2 * n + 1;
        return (
          <div className={s.wrap}>
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
              {terms.map((t, i) => (
                <span key={t}>
                  {i > 0 && " + "}
                  <span className={i === n - 1 && n > 1 ? s.termNew : undefined}>{t}</span>
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
                  : `The ${2 * n - 1} new dots wrap ${n - 1} × ${n - 1} into ${n} × ${n}.`}
            </p>

            <Row>
              <Control disabled={locked || n >= MAX} onClick={add} aria-label={`Add ${nextOdd}`}>
                {n >= MAX ? "Up to 19" : `+ ${nextOdd}`}
              </Control>
              <Control disabled={locked || n <= 1} onClick={undo} aria-label="Take the last one away">
                Undo
              </Control>
              <Readout label="Odd numbers" value={n} />
              <Readout label="Total" value={sum} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
