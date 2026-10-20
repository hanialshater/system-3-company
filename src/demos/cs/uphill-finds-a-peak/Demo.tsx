"use client";

// Peak finding by halving, on cards in no order. Turn the middle card of the current range and
// its right neighbour, then keep the half on the bigger (uphill) side; the downhill side is
// refused. When one card is left it is a peak (not smaller than its neighbours). On this order
// the search turns 4 of 7 cards and ends on 6, a peak even though 7 is bigger.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const HIDDEN = [2, 5, 1, 4, 7, 3, 6];
const N = HIDDEN.length;

type S = { lo: number; hi: number; up: number[]; note: string };
const INIT: S = { lo: 0, hi: N - 1, up: [], note: "" };
const midOf = (st: S) => Math.floor((st.lo + st.hi) / 2);

function keep(st: S, side: "left" | "right"): S {
  const m = midOf(st);
  const uphill = HIDDEN[m] < HIDDEN[m + 1] ? "right" : "left";
  if (side !== uphill) {
    const [a, b] = [HIDDEN[m], HIDDEN[m + 1]];
    return { ...st, note: `${a} ${a < b ? "<" : ">"} ${b}: the ${side} side is downhill.` };
  }
  const next = side === "right" ? { ...st, lo: m + 1 } : { ...st, hi: m };
  return { ...next, note: next.lo === next.hi ? `Only ${HIDDEN[next.lo]} is left: a peak.` : `Kept the ${side} side: uphill.` };
}

export default function UphillFindsAPeak({ slug }: { slug: string }) {
  const [st, setSt] = useState<S>(INIT);
  const m = midOf(st);
  const done = st.lo === st.hi;
  const ready = !done && st.up.includes(m) && st.up.includes(m + 1);
  const peak = done ? st.lo : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Seven cards lie face down in no order. You want a peak: a card not smaller than its neighbours. Turn over the middle card and its right neighbour, then keep the half on the bigger side, and repeat. At most how many cards do you turn over?",
        options: ["3", "5", "7"],
        answer: 1,
      }}
      exploreHint="Turn the two middle cards, keep the uphill half, repeat."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            You found the peak <strong>6</strong> after turning {st.up.length} of 7 cards, with{" "}
            {N - st.up.length} still face down. 6 is a peak even though 7 is bigger: a peak only has to beat its
            neighbours.
          </p>
          <p>
            If the right card is bigger, walking uphill to the right must reach a peak before the edge, so the left half
            can go unseen. Over all 5,040 orders of these 7 cards this never needs more than <strong>5</strong> turns:
            about 2 per halving.
          </p>
          <p className="muted">Halving works without sorting when one look tells you which side must hold an answer.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const commit = (next: S) => {
          setSt(next);
          if (next.lo === next.hi && !done) interact();
        };
        const turn = (i: number) => {
          if (locked || st.up.includes(i)) return;
          setSt({ ...st, up: [...st.up, i], note: `Turned card ${i + 1}: ${HIDDEN[i]}.` });
        };
        const rest = () => {
          if (locked || done) return;
          let x = st;
          for (let k = 0; k < 10 && x.lo !== x.hi; k++) {
            const mm = midOf(x);
            x = { ...x, up: [...new Set([...x.up, mm, mm + 1])] };
            x = keep(x, HIDDEN[mm] < HIDDEN[mm + 1] ? "right" : "left");
          }
          commit(x);
        };

        const msg = locked
          ? "Make a prediction to start."
          : st.note
            ? st.note
            : `Turn card ${m + 1} and card ${m + 2}.`;

        return (
          <div className={s.wrap}>
            <p className={`${s.msg} ${done ? s.good : ""}`} aria-live="polite">
              {msg}
            </p>
            <div className={s.cards}>
              {HIDDEN.map((v, i) => {
                const up = st.up.includes(i);
                const inRange = i >= st.lo && i <= st.hi;
                const canTurn = !done && !up && (i === m || i === m + 1);
                return (
                  <Control
                    key={i}
                    className={`${s.card} ${up ? s.up : ""} ${inRange ? "" : s.out} ${peak === i ? s.peak : ""} ${canTurn ? s.next : ""}`}
                    disabled={locked || !canTurn}
                    aria-label={up ? `Card ${i + 1}: ${v}` : `Turn card ${i + 1}`}
                    onClick={() => turn(i)}
                  >
                    {up ? (
                      <>
                        <span className={s.bar} style={{ height: `${v * 9}px` }} />
                        <span className={s.val}>{v}</span>
                      </>
                    ) : (
                      <span className={s.back}>?</span>
                    )}
                  </Control>
                );
              })}
            </div>
            <Row>
              <Control disabled={locked || !ready} onClick={() => setSt(keep(st, "left"))}>
                Keep left half
              </Control>
              <Control disabled={locked || !ready} onClick={() => commit(keep(st, "right"))}>
                Keep right half
              </Control>
              <Control className="active" disabled={locked || done} onClick={rest}>
                Finish by the rule
              </Control>
            </Row>
            <p className={s.count}>
              Cards turned <strong>{st.up.length}</strong> of 7 · range {st.lo + 1}–{st.hi + 1}
            </p>
          </div>
        );
      }}
    </Lesson>
  );
}
