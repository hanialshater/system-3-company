"use client";

// Two fingers on a sorted list, looking for a pair that adds to 24 (the run takes all 7 sums). The list runs across the
// top; under it, the 28 possible pairs as a triangle grid (row = left number, column = right
// number). Each sum that is too small rules out a whole row at once; too big, a whole column.
// One representation: the list is the grid's top edge.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const LIST = [1, 3, 4, 6, 8, 11, 13, 15];
const N = LIST.length;
const TARGET = 24; // takes all 7 sums on this list: 11 + 13 is found last
const PAIRS = (N * (N - 1)) / 2;

const X0 = 34;
const CW = 35;
const Y_CARDS = 4;
const Y_GRID = 56;
const RH = 25;

type State = { i: number; j: number; checks: number; note: string };
const START: State = { i: 0, j: N - 1, checks: 1, note: "" };

export default function TwoPointersMeet({ slug }: { slug: string }) {
  const [st, setSt] = useState<State>(START);
  const { i, j, checks } = st;
  const sum = LIST[i] + LIST[j];
  const found = sum === TARGET;

  // Pairs already ruled out: every row above i, every column right of j.
  const ruled = (r: number, c: number) => r < i || c > j;
  const ruledCount = Array.from({ length: N }, (_, r) => r)
    .flatMap((r) => Array.from({ length: N }, (_, c) => [r, c]))
    .filter(([r, c]) => r < c && ruled(r, c)).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Sorted list: 1 3 4 6 8 11 13 15. You look for two that add to 24, one finger at each end, moving the left finger right if the sum is too small and the right finger left if too big. At most how many sums could this ever take on 8 numbers?",
        options: ["28", "7", "3"],
        answer: 1,
      }}
      exploreHint="Move the fingers by the rule until the sum is 24."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            You found {LIST[i]} + {LIST[j]} = 24 in <strong>{checks}</strong> sums. Each too-small sum ruled out a whole
            row of the grid, each too-big sum a whole column: {ruledCount} of the 28 pairs are grey, and{" "}
            {ruledCount - (checks - 1)} of them were never looked at.
          </p>
          <p>
            Because the list is sorted, 1 + 15 being too small means 1 is too small with every partner. Each sum moves a
            finger one step inward, so 8 numbers need at most <strong>7</strong> sums, not 28. This search used all 7.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (ni: number, nj: number, note: string) => {
          const next = { i: ni, j: nj, checks: checks + 1, note };
          setSt(next);
          if (LIST[ni] + LIST[nj] === TARGET) interact();
        };
        const moveLeft = () => {
          if (locked || found || i + 1 >= j) return;
          if (sum > TARGET) {
            setSt({ ...st, note: `${sum} is too big: a bigger left number only makes it bigger.` });
            return;
          }
          go(i + 1, j, `${sum} was too small: row ${LIST[i]} ruled out.`);
        };
        const moveRight = () => {
          if (locked || found || j - 1 <= i) return;
          if (sum < TARGET) {
            setSt({ ...st, note: `${sum} is too small: a smaller right number only makes it smaller.` });
            return;
          }
          go(i, j - 1, `${sum} was too big: column ${LIST[j]} ruled out.`);
        };
        const finish = () => {
          if (locked || found) return;
          let a = i;
          let b = j;
          let c = checks;
          while (a < b && LIST[a] + LIST[b] !== TARGET) {
            if (LIST[a] + LIST[b] < TARGET) a++;
            else b--;
            c++;
          }
          setSt({ i: a, j: b, checks: c, note: "The rule did the rest." });
          if (LIST[a] + LIST[b] === TARGET) interact();
        };

        const msg = locked
          ? "Make a prediction to start."
          : found
            ? `${LIST[i]} + ${LIST[j]} = 24. Found in ${checks} sums.`
            : st.note || `${LIST[i]} + ${LIST[j]} = ${sum}: ${sum < TARGET ? "too small" : "too big"}.`;

        return (
          <div className={s.wrap}>
            <p className={`${s.msg} ${found ? s.good : ""}`} aria-live="polite">
              {msg}
            </p>
            <svg viewBox="0 0 320 250" className="stage-svg" role="img" aria-label={`Left finger on ${LIST[i]}, right finger on ${LIST[j]}`}>
              {LIST.map((v, c) => {
                const on = c === i || c === j;
                return (
                  <g key={v}>
                    <rect
                      x={X0 + c * CW + 3}
                      y={Y_CARDS}
                      width={CW - 6}
                      height={28}
                      rx={5}
                      fill={on ? (found ? "var(--good)" : "var(--domain)") : "var(--bg-2)"}
                      stroke="var(--line)"
                      opacity={c < i || c > j ? 0.4 : 1}
                    />
                    <text x={X0 + c * CW + CW / 2} y={Y_CARDS + 19} textAnchor="middle" className={s.card}>
                      {v}
                    </text>
                  </g>
                );
              })}
              <text x={X0 + i * CW + CW / 2} y={Y_CARDS + 44} textAnchor="middle" className={s.finger}>
                ▲ L
              </text>
              <text x={X0 + j * CW + CW / 2} y={Y_CARDS + 44} textAnchor="middle" className={s.finger}>
                ▲ R
              </text>
              {Array.from({ length: N - 1 }, (_, r) => (
                <g key={r}>
                  <text x={X0 - 6} y={Y_GRID + r * RH + 16} textAnchor="end" className={s.axis}>
                    {LIST[r]}
                  </text>
                  {Array.from({ length: N }, (_, c) => {
                    if (c <= r) return null;
                    const cur = r === i && c === j;
                    const out = ruled(r, c);
                    return (
                      <rect
                        key={c}
                        x={X0 + c * CW + 3}
                        y={Y_GRID + r * RH + 2}
                        width={CW - 6}
                        height={RH - 4}
                        rx={3}
                        fill={cur ? (found ? "var(--good)" : "var(--domain)") : out ? "var(--line)" : "var(--bg-2)"}
                        stroke={cur ? "var(--fg)" : "var(--line)"}
                        strokeWidth={cur ? 1.5 : 1}
                        opacity={out && !cur ? 0.55 : 1}
                      />
                    );
                  })}
                </g>
              ))}
              <text x={X0} y={Y_GRID + (N - 1) * RH + 12} className={s.axis}>
                28 pairs · grey = ruled out ({ruledCount})
              </text>
            </svg>
            <Row>
              <Control disabled={locked || found} onClick={moveLeft}>
                Left finger →
              </Control>
              <Control disabled={locked || found} onClick={moveRight}>
                ← Right finger
              </Control>
              <Control className="active" disabled={locked || found} onClick={finish}>
                Follow the rule
              </Control>
            </Row>
            <p className={s.count}>
              Sums checked: {checks} · pairs: {PAIRS}
            </p>
          </div>
        );
      }}
    </Lesson>
  );
}
