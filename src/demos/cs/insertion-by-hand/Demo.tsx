"use client";

// Insertion sort by hand. The payoff is not the procedure ("slide left until it fits")
// but what the slide counter says about the input: a reversed hand costs every pair,
// a sorted hand costs nothing. Same five cards, wildly different work.
// One representation: the hand of cards, with a slide count under each card.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const STARTS: number[][] = [
  [5, 4, 3, 2, 1],
  [3, 1, 4, 5, 2],
  [1, 2, 3, 5, 4],
  [1, 2, 3, 4, 5],
];
const N = 5;

type Hand = { arr: number[]; i: number; pos: number; slides: number; per: Record<number, number> };

// Place cards that already fit; stop at the first card that needs to slide.
function settle(h: Hand): Hand {
  let { i, pos } = h;
  while (i < N && (pos === 0 || h.arr[pos - 1] < h.arr[pos])) {
    i += 1;
    pos = i;
  }
  return { ...h, i, pos };
}

function fresh(start: number[]): Hand {
  return settle({ arr: [...start], i: 1, pos: 1, slides: 0, per: {} });
}

function slide(h: Hand): Hand {
  if (h.i >= N) return h;
  const arr = [...h.arr];
  const v = arr[h.pos];
  [arr[h.pos - 1], arr[h.pos]] = [arr[h.pos], arr[h.pos - 1]];
  return settle({ ...h, arr, pos: h.pos - 1, slides: h.slides + 1, per: { ...h.per, [v]: (h.per[v] ?? 0) + 1 } });
}

/** Pairs of cards that are in the wrong order. */
const pairsOut = (a: number[]) => {
  let n = 0;
  for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > a[j]) n++;
  return n;
};

export default function InsertionByHand({ slug }: { slug: string }) {
  const [start, setStart] = useState(0);
  const [hand, setHand] = useState<Hand>(() => fresh(STARTS[0]));
  const [results, setResults] = useState<Record<number, number>>({}); // start index -> slides when finished

  // "Finish this hand" plays the remaining slides one at a time, so the Slides and Pairs counters are seen moving
  // in lockstep. The result is recorded at the press (the hand-button log shows it at once).
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  };
  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const done = hand.i >= N;
  const moving = done ? null : hand.arr[hand.pos];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You sort 5 cards that arrive in reverse order (5, 4, 3, 2, 1) by sliding each new card left, one place at a time, until it fits. How many one-place slides in total?",
        options: ["4", "10", "15"],
        answer: 1,
      }}
      exploreHint="Slide the glowing card once, then let Finish play the rest. Watch both counters. Finish two different hands."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {Object.keys(results).length
              ? `You finished ${Object.entries(results)
                  .map(([k, v]) => `${STARTS[Number(k)].join("")} in ${v}`)
                  .join(", ")}. `
              : ""}
            Reversed, each new card must slide past every card before it: 1 + 2 + 3 + 4 = <strong>10</strong>. Already in
            order, nothing slides at all.
          </p>
          <p>
            Each slide fixes exactly one pair of cards that were in the wrong order, as the pair counter fell by one with
            every slide. So the work is the number of out-of-order pairs: a reversed hand has all 10. A nearly sorted
            hand like 12354 has just 1. Scaled up, 100 reversed cards cost 4,950 slides and sorted cost none.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const finish = (h: Hand) => {
          setHand(h);
          if (h.i >= N && results[start] === undefined) {
            setResults((r) => ({ ...r, [start]: h.slides }));
            interact();
          }
        };
        const step = () => {
          if (locked || done || playing) return;
          finish(slide(hand));
        };
        const runAll = () => {
          if (locked || done || playing) return;
          const frames: Hand[] = [];
          let h = hand;
          while (h.i < N) {
            h = slide(h);
            frames.push(h);
          }
          if (results[start] === undefined) {
            setResults((r) => ({ ...r, [start]: h.slides }));
            interact();
          }
          setHand(frames[0]);
          if (frames.length === 1) return;
          let k = 1;
          setPlaying(true);
          timer.current = setInterval(() => {
            setHand(frames[k]);
            k += 1;
            if (k >= frames.length) stop();
          }, 380);
        };
        const pick = (k: number) => {
          if (locked) return;
          stop();
          const h = fresh(STARTS[k]);
          setStart(k);
          setHand(h);
          if (h.i >= N && results[k] === undefined) {
            setResults((r) => ({ ...r, [k]: 0 }));
            interact();
          }
        };

        const msg = locked
          ? "Make a prediction to start."
          : done
            ? `Sorted, in ${hand.slides} slide${hand.slides === 1 ? "" : "s"}. It began with ${pairsOut(STARTS[start])} pair${pairsOut(STARTS[start]) === 1 ? "" : "s"} out of order.`
            : `Card ${moving} is out of place.`;

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>

            <div className={s.hand} aria-label={`Cards: ${hand.arr.join(", ")}`}>
              {hand.arr.map((v, idx) => {
                const state = done ? s.sorted : idx === hand.pos ? s.moving : idx <= hand.i ? s.sorted : s.waiting;
                return (
                  <div key={v} className={s.slot} style={{ left: `${idx * 20}%` }}>
                    <span className={`${s.card} ${state}`}>{v}</span>
                    <span className={s.badge}>{hand.per[v] ? `slid ${hand.per[v]}` : ""}</span>
                  </div>
                );
              })}
            </div>

            <Row>
              <Control className="active" disabled={locked || done || playing} onClick={step} aria-label="Slide the glowing card one place left">
                ◀ Slide
              </Control>
              <Control disabled={locked || done || playing} onClick={runAll}>
                Finish this hand
              </Control>
              <Readout label="Slides" value={locked ? "?" : hand.slides} />
              <Readout label="Pairs out of order" value={locked ? "?" : pairsOut(hand.arr)} />
            </Row>

            <div className={s.starts}>
              <span className="muted small">{Object.keys(results).length ? "Hands (→ slides):" : "New hand:"}</span>
              {STARTS.map((st, k) => (
                <Control
                  key={k}
                  className={`${s.start} ${k === start ? "active" : ""}`}
                  disabled={locked || (k === start && hand.slides === 0)}
                  aria-label={`Start with ${st.join(", ")}`}
                  onClick={() => pick(k)}
                >
                  {st.join("")}
                  {results[k] !== undefined ? <span className={s.result}> → {results[k]}</span> : null}
                </Control>
              ))}
            </div>
          </div>
        );
      }}
    </Lesson>
  );
}
