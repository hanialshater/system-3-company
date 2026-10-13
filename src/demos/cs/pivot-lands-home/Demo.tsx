"use client";

// One partition puts the pivot in its final place. The learner taps each card; smaller
// cards fill the row from the left, larger from the right, and the pivot drops into the gap,
// at the position equal to the number of smaller cards. Then "Partition each pile" repeats
// the same move on both sides until every card is home. One representation: the row.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const CARDS = [5, 2, 8, 1, 9, 3, 7];
const PIVOT = CARDS[0];
const N = CARDS.length;
const SMALLER = CARDS.filter((c) => c < PIVOT).length;

type Seg = { lo: number; hi: number }; // inclusive range of the row still unsorted

/** Partition row[lo..hi] around row[lo]: smaller left in order, larger right from the end. */
function partition(row: number[], seg: Seg) {
  const p = row[seg.lo];
  const rest = row.slice(seg.lo + 1, seg.hi + 1);
  const out = [...row];
  let l = seg.lo;
  let r = seg.hi;
  for (const c of rest) {
    if (c < p) out[l++] = c;
    else out[r--] = c;
  }
  out[l] = p;
  return { row: out, at: l };
}

export default function PivotLandsHome({ slug }: { slug: string }) {
  const [slots, setSlots] = useState<(number | null)[]>(Array(N).fill(null));
  const [used, setUsed] = useState<number[]>([]); // cards already tapped, by value
  const [ends, setEnds] = useState({ l: 0, r: N - 1 });
  const [home, setHome] = useState<number[]>([]); // positions fixed for good
  const [segs, setSegs] = useState<Seg[]>([]); // piles still to partition
  const [passes, setPasses] = useState(0);
  const [note, setNote] = useState("");
  const [landedAt, setLandedAt] = useState<number | null>(null);

  const firstDone = used.length === N - 1;
  const sorted = home.length === N;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Partition [${CARDS.join(", ")}] around pivot ${PIVOT} (smaller values left, larger right). At which position (counting from 0) does ${PIVOT} end up?`,
        options: [String(SMALLER - 1), String(SMALLER), String(SMALLER + 1)],
        answer: 1,
      }}
      exploreHint="Tap every card to send it left or right of the pivot. Then partition the piles."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {landedAt !== null ? `Your ${PIVOT} landed at position ${landedAt}` : `${PIVOT} lands at position ${SMALLER}`}
            {sorted ? `, and ${passes} pass${passes === 1 ? "" : "es"} sorted the whole row. ` : ". "}
            Exactly {SMALLER} cards are smaller than {PIVOT}, so in the sorted row it must sit after exactly {SMALLER}{" "}
            cards: position <strong>{SMALLER}</strong>. One pass over the cards put it there for good, before anything else
            was in order.
          </p>
          <p>
            Each pile is now a smaller, separate problem: nothing in the left pile ever needs to cross the pivot. Repeating
            the move on each pile is quicksort. A pivot that splits the piles evenly makes it fast; on already sorted input,
            always picking the first card as pivot leaves one pile empty every time, and it slows to about n²/2 comparisons.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["pivot-home", "recursed"]}>
          {(reach) => {
            const tap = (c: number) => {
              if (locked || used.includes(c)) return;
              const next = [...slots];
              const e = { ...ends };
              if (c < PIVOT) next[e.l++] = c;
              else next[e.r--] = c;
              const u = [...used, c];
              setUsed(u);
              if (u.length === N - 1) {
                next[e.l] = PIVOT;
                const piles = [
                  { lo: 0, hi: e.l - 1 },
                  { lo: e.l + 1, hi: N - 1 },
                ].filter((sg) => sg.hi >= sg.lo);
                setHome([e.l, ...piles.filter((sg) => sg.lo === sg.hi).map((sg) => sg.lo)]);
                setLandedAt(e.l);
                setSegs(piles.filter((sg) => sg.hi > sg.lo));
                setNote(`${PIVOT} drops in at position ${e.l}. It is home.`);
                setPasses(1);
                reach("pivot-home");
              } else {
                setNote(`${c} ${c < PIVOT ? "<" : ">"} ${PIVOT}: ${c < PIVOT ? "left" : "right"} pile.`);
              }
              setSlots(next);
              setEnds(e);
            };
            const recurse = () => {
              if (locked || !firstDone || sorted) return;
              let row = slots as number[];
              const h = [...home];
              const nextSegs: Seg[] = [];
              const fixed: number[] = [];
              for (const sg of segs) {
                const res = partition(row, sg);
                row = res.row;
                h.push(res.at);
                fixed.push(row[res.at]);
                for (const sub of [{ lo: sg.lo, hi: res.at - 1 }, { lo: res.at + 1, hi: sg.hi }]) {
                  if (sub.hi < sub.lo) continue;
                  if (sub.lo === sub.hi) h.push(sub.lo); // a pile of one is already home
                  else nextSegs.push(sub);
                }
              }
              setSlots(row);
              setHome(h);
              setSegs(nextSegs);
              setPasses(passes + 1);
              setNote(`${fixed.join(" and ")} land${fixed.length === 1 ? "s" : ""} home.`);
              reach("recursed");
            };
            const restart = () => {
              if (locked) return;
              setSlots(Array(N).fill(null));
              setUsed([]);
              setEnds({ l: 0, r: N - 1 });
              setHome([]);
              setSegs([]);
              setPasses(0);
              setNote("");
            };

            const msg = locked
              ? "Make a prediction to start."
              : sorted
                ? `Sorted in ${passes} passes.`
                : note || `Tap each card. Pivot is ${PIVOT}.`;

            const segOf = (i: number) => segs.findIndex((sg) => i >= sg.lo && i <= sg.hi);

            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {msg}
                </p>

                <div className={s.top}>
                  <span className={`${s.card} ${s.pivot} ${firstDone ? s.gone : ""}`} aria-label={`Pivot ${PIVOT}`}>
                    {PIVOT}
                  </span>
                  {CARDS.slice(1).map((c) => (
                    <Control
                      key={c}
                      className={`${s.card} ${used.includes(c) ? s.gone : ""}`}
                      disabled={locked || used.includes(c)}
                      onClick={() => tap(c)}
                      aria-label={used.includes(c) ? `${c} placed` : `Place ${c}`}
                    >
                      {used.includes(c) ? "" : c}
                    </Control>
                  ))}
                </div>

                <div className={s.row} aria-label={`Row: ${slots.map((x) => x ?? "empty").join(", ")}`}>
                  {slots.map((x, i) => {
                    const isHome = home.includes(i);
                    const sg = segOf(i);
                    return (
                      <div key={i} className={s.cell}>
                        <span
                          className={`${s.slot} ${isHome ? s.home : x !== null ? s.filled : ""} ${sg === 1 ? s.alt : ""}`}
                          data-home={isHome ? "yes" : "no"}
                        >
                          {x ?? ""}
                        </span>
                        <span className={s.idx}>{i}</span>
                      </div>
                    );
                  })}
                </div>

                <Row>
                  <Control className="active" disabled={locked || !firstDone || sorted} onClick={recurse}>
                    Partition each pile
                  </Control>
                  <Control disabled={locked || used.length === 0} onClick={restart}>
                    Start over
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
