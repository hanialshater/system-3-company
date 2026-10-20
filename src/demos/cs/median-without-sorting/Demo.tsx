"use client";

// Quickselect: find the median of 101 shuffled cards without sorting. Split the current group
// around its first card (smaller left, larger right); the pivot lands in its final position.
// Keep only the side that holds position 51; the other side fades and is never touched again.
// "Sort instead" really runs a first-card quicksort on the same 101 cards and the counter strip
// shows both totals. The shuffle is mulberry32 seed 38, chosen because both counts sit close to
// their averages over seeds 1-40 (disclose-chosen-seeds).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 101;
const START = (() => {
  const r = mulberry32(38);
  const a = Array.from({ length: N }, (_, i) => i + 1);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
})();
const MID = 50; // index of position 51
const sortCost = (g: number[]): number => {
  if (g.length < 2) return 0;
  const p = g[0];
  const rest = g.slice(1);
  return g.length - 1 + sortCost(rest.filter((x) => x < p)) + sortCost(rest.filter((x) => x > p));
};
const SORT_CMP = sortCost(START);

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
const INIT: S = { cards: START, lo: 0, hi: N - 1, pivot: null, fixed: [], cmp: 0, splits: 0, note: "" };

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
    note: found ? `${p} landed in position 51: the median.` : `${p} landed in position ${at + 1}. Which side holds position 51?`,
  };
}
function keep(st: S, side: "left" | "right"): S {
  if (st.pivot === null) return st;
  const want = MID < st.pivot ? "left" : "right";
  if (side !== want)
    return { ...st, note: `Position 51 is ${want} of the pivot (position ${st.pivot + 1}). The ${side} side cannot hold it.` };
  return side === "left"
    ? { ...st, hi: st.pivot - 1, pivot: null, note: "Kept the left side. Split it again." }
    : { ...st, lo: st.pivot + 1, pivot: null, note: "Kept the right side. Split it again." };
}

const X0 = 8.5;
const CW = 3;

export default function MedianWithoutSorting({ slug }: { slug: string }) {
  const [st, setSt] = useState<S>(INIT);
  const [sorted, setSorted] = useState(false);
  const found = st.fixed.includes(MID);
  const first = st.cards[st.lo];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You need the median card (position 51) of 101 shuffled cards. You split around a pivot, the first card: smaller ones left, bigger ones right. After each split, what do you do?",
        options: ["split both sides, as in sorting", "keep only the side holding the median", "keep the bigger side"],
        answer: 1,
      }}
      exploreHint="Find the median, then press Sort instead to see what sorting the same cards costs."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Finding the median took <strong>{st.cmp}</strong> comparisons in {st.splits} splits. Sorting the same 101
            cards the same way took <strong>{SORT_CMP}</strong>: about twice as many.
          </p>
          <p>
            Each split puts its pivot in its final place, and position 51 is on only one side, so the other side can
            go. Sorting must split both sides. The gap grows: on 1,000 shuffled cards, about 3,300 comparisons against
            about 11,000.
          </p>
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
          for (let i = 0; i < 60 && !x.fixed.includes(MID); i++) x = x.pivot === null ? split(x) : keep(x, MID < x.pivot ? "left" : "right");
          commit({ ...x, note: `${x.cards[MID]} landed in position 51: the median.` });
        };
        const doSort = () => {
          if (locked || sorted) return;
          setSorted(true);
          interact();
        };

        const msg = locked ? "Make a prediction to start." : st.note || `Split the 101 cards around the first one, ${first}.`;
        const top = SORT_CMP;

        return (
          <div className={s.wrap}>
            <p className={`${s.msg} ${found ? s.good : ""}`} aria-live="polite">
              {msg}
            </p>
            <svg viewBox="0 0 320 92" className="stage-svg" role="img" aria-label={`101 cards as bars, ${st.splits} splits done`}>
              <rect x={X0 + MID * CW - 1} y={2} width={CW + 2} height={64} rx={2} fill="none" stroke="var(--good)" strokeDasharray="3 2" />
              {st.cards.map((v, i) => {
                const inGroup = i >= st.lo && i <= st.hi;
                const isFixed = st.fixed.includes(i);
                const dropped = !inGroup && !isFixed;
                const h = (v / N) * 56;
                return (
                  <rect
                    key={v}
                    x={X0 + i * CW}
                    y={64 - h}
                    width={CW - 0.8}
                    height={h}
                    opacity={dropped ? 0.25 : 1}
                    fill={isFixed ? (i === MID ? "var(--good)" : "var(--domain)") : "var(--muted)"}
                  />
                );
              })}
              {!found && st.lo <= st.hi && (
                <path d={`M ${X0 + st.lo * CW} 74 v 5 H ${X0 + (st.hi + 1) * CW - 0.8} v -5`} stroke="var(--fg)" fill="none" strokeWidth={1.2} />
              )}
              <text x={X0} y={91} className={s.axis}>
                {found ? "position 51 found" : "bar height = value · bracket = current group · dashed = position 51"}
              </text>
            </svg>
            <div className={s.meters} aria-label="Comparisons so far">
              <span className={s.mk}>Median</span>
              <span className={s.track}>
                <span className={`${s.fill} ${s.sel}`} style={{ width: `${(st.cmp / top) * 100}%` }} />
              </span>
              <strong className={s.mv}>{st.cmp}</strong>
              <span className={s.mk}>Full sort</span>
              <span className={s.track}>
                <span className={`${s.fill} ${s.srt}`} style={{ width: `${sorted ? (SORT_CMP / top) * 100 : 0}%` }} />
              </span>
              <strong className={s.mv}>{sorted ? SORT_CMP : "–"}</strong>
            </div>
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
              <Control className={found && !sorted ? "active" : ""} disabled={locked || sorted} onClick={doSort}>
                Sort instead
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
