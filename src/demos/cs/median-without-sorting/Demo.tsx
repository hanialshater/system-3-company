"use client";

// Quickselect: find the median of 9 cards without sorting. Split the current group around its
// first card (smaller left, larger right); the pivot lands in its final position. Keep only the
// side that holds position 5; the other side fades and is never touched again. With first-card
// pivots this takes 4 splits and 17 comparisons; a full quicksort with the same rule takes 18.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const START = [7, 2, 9, 4, 1, 8, 5, 3, 6];
const MID = 4; // index of position 5
const SORT_CMP = 18;

type S = {
  cards: number[];
  lo: number; // current group [lo, hi]
  hi: number;
  pivot: number | null; // index where the last pivot landed (awaiting a keep choice)
  fixed: number[]; // indices of pivots in their final place
  cmp: number;
  splits: number;
  note: string;
};
const INIT: S = { cards: START, lo: 0, hi: 8, pivot: null, fixed: [], cmp: 0, splits: 0, note: "" };

function split(st: S): S {
  const g = st.cards.slice(st.lo, st.hi + 1);
  const p = g[0];
  const small = g.slice(1).filter((x) => x < p);
  const big = g.slice(1).filter((x) => x > p);
  const cards = [...st.cards.slice(0, st.lo), ...small, p, ...big, ...st.cards.slice(st.hi + 1)];
  const at = st.lo + small.length;
  const found = at === MID;
  return {
    ...st,
    cards,
    pivot: found ? null : at,
    fixed: [...st.fixed, at],
    cmp: st.cmp + g.length - 1,
    splits: st.splits + 1,
    lo: found ? at : st.lo,
    hi: found ? at : st.hi,
    note: found ? `${p} landed in position 5: the median.` : `${p} landed in position ${at + 1}. Keep the side with position 5.`,
  };
}
function keep(st: S, side: "left" | "right"): S {
  if (st.pivot === null) return st;
  const want = MID < st.pivot ? "left" : "right";
  if (side !== want)
    return { ...st, note: `Position 5 is ${want} of the pivot (position ${st.pivot + 1}). The ${side} side cannot hold it.` };
  return side === "left"
    ? { ...st, hi: st.pivot - 1, pivot: null, note: "Kept the left side. Split it again." }
    : { ...st, lo: st.pivot + 1, pivot: null, note: "Kept the right side. Split it again." };
}

const X0 = 7;
const CW = 34.5;

export default function MedianWithoutSorting({ slug }: { slug: string }) {
  const [st, setSt] = useState<S>(INIT);
  const found = st.fixed.includes(MID);
  const untouched = START.filter((v) => {
    const i = st.cards.indexOf(v);
    return st.splits > 0 && (i < st.lo || i > st.hi) && !st.fixed.includes(i);
  });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Find the median of 9 cards 7 2 9 4 1 8 5 3 6 by splitting around a pivot (the first card: smaller ones left, bigger ones right). After each split you:",
        options: ["split both sides, as in sorting", "keep only the side holding the median", "keep the bigger side"],
        answer: 1,
      }}
      exploreHint="Split, then keep only the side that holds position 5."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            You found <strong>5</strong> after {st.splits} splits and {st.cmp} comparisons. The 8 and 9 were dropped
            after the first split and never looked at again.
          </p>
          <p>
            Each split puts its pivot in its final place, and position 5 is on only one side, so the other side can go.
            Sorting must split both sides: {SORT_CMP} comparisons here with the same rule. The gap grows: on 1,000
            shuffled cards, about 3,300 comparisons against about 11,000.
          </p>
          <p className="muted">To find one position you only need the side it is on.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const commit = (next: S) => {
          setSt(next);
          if (next.fixed.includes(MID) && !found) interact();
        };
        const doSplit = () => {
          if (locked || found || st.pivot !== null) return;
          commit(split(st));
        };
        const doKeep = (side: "left" | "right") => {
          if (locked || st.pivot === null) return;
          setSt(keep(st, side));
        };
        const rest = () => {
          if (locked || found) return;
          let x = st;
          for (let i = 0; i < 20 && !x.fixed.includes(MID); i++) x = x.pivot === null ? split(x) : keep(x, MID < x.pivot ? "left" : "right");
          commit({ ...x, note: `${x.cards[MID]} landed in position 5: the median.` });
        };

        const msg = locked ? "Make a prediction to start." : st.note || "Split the 9 cards around the first one, 7.";

        return (
          <div className={s.wrap}>
            <p className={`${s.msg} ${found ? s.good : ""}`} aria-live="polite">
              {msg}
            </p>
            <svg viewBox="0 0 320 112" className="stage-svg" role="img" aria-label={`Cards in order: ${st.cards.join(" ")}`}>
              <rect x={X0 + MID * CW + 1} y={4} width={CW - 2} height={78} rx={6} fill="none" stroke="var(--good)" strokeDasharray="4 3" />
              {st.cards.map((v, i) => {
                const inGroup = i >= st.lo && i <= st.hi;
                const isFixed = st.fixed.includes(i);
                const dropped = !inGroup && !isFixed;
                return (
                  <g key={v} opacity={dropped ? 0.25 : 1}>
                    <rect
                      x={X0 + i * CW + 4}
                      y={14}
                      width={CW - 8}
                      height={46}
                      rx={5}
                      fill={isFixed ? (i === MID ? "var(--good)" : "var(--domain)") : "var(--bg-2)"}
                      stroke={inGroup && !isFixed ? "var(--fg)" : "var(--line)"}
                      strokeWidth={1.5}
                    />
                    <text x={X0 + i * CW + CW / 2} y={43} textAnchor="middle" className={s.card}>
                      {v}
                    </text>
                  </g>
                );
              })}
              {st.cards.map((_, i) => (
                <text key={i} x={X0 + i * CW + CW / 2} y={76} textAnchor="middle" className={`${s.axis} ${i === MID ? s.mid : ""}`}>
                  {i + 1}
                </text>
              ))}
              {!found && st.lo <= st.hi && (
                <path
                  d={`M ${X0 + st.lo * CW + 4} 92 v 5 H ${X0 + (st.hi + 1) * CW - 4} v -5`}
                  stroke="var(--fg)"
                  fill="none"
                  strokeWidth={1.2}
                />
              )}
              <text x={X0} y={110} className={s.axis}>
                {found ? "position 5 found" : "bracket = current group · dashed = position 5 (the median)"}
              </text>
            </svg>
            <Row>
              <Control className={found ? "" : "active"} disabled={locked || found || st.pivot !== null} onClick={doSplit}>
                Split
              </Control>
              <Control disabled={locked || st.pivot === null} onClick={() => doKeep("left")}>
                Keep left side
              </Control>
              <Control disabled={locked || st.pivot === null} onClick={() => doKeep("right")}>
                Keep right side
              </Control>
              <Control disabled={locked || found} onClick={rest}>
                Do the rest
              </Control>
            </Row>
            <p className={s.count}>
              Splits {st.splits} · comparisons <strong>{st.cmp}</strong>
              {untouched.length ? ` · dropped: ${untouched.join(", ")}` : ""}
            </p>
          </div>
        );
      }}
    </Lesson>
  );
}
