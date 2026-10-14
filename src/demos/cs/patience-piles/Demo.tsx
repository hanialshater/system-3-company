"use client";

// Patience sorting finds the longest rising run with skips. Deal 3 1 4 1 5 9 2 6 one at a time
// onto the leftmost pile whose top is not smaller; open a new pile when none fits. The number of
// piles (4) is the length of the longest rising run. Each card remembers the top of the pile to
// its left when it landed, so tapping a pile traces a longest run back.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const CARDS = [3, 1, 4, 1, 5, 9, 2, 6];
type Placed = { i: number; v: number; prev: number | null }; // prev = index of the card it points back to

function target(piles: Placed[][], v: number) {
  const k = piles.findIndex((p) => p[p.length - 1].v >= v);
  return k < 0 ? piles.length : k;
}
function place(piles: Placed[][], i: number): Placed[][] {
  const v = CARDS[i];
  const k = target(piles, v);
  const prev = k > 0 ? piles[k - 1][piles[k - 1].length - 1].i : null;
  const next = piles.map((p) => [...p]);
  if (k === piles.length) next.push([{ i, v, prev }]);
  else next[k].push({ i, v, prev });
  return next;
}

export default function PatiencePiles({ slug }: { slug: string }) {
  const [piles, setPiles] = useState<Placed[][]>([]);
  const [note, setNote] = useState("");
  const [trace, setTrace] = useState<number[]>([]); // card indices of a traced run

  const dealt = piles.reduce((a, p) => a + p.length, 0);
  const next = dealt < CARDS.length ? CARDS[dealt] : null;
  const all = piles.flat();
  const byIndex = (i: number) => all.find((c) => c.i === i)!;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Cards 3 1 4 1 5 9 2 6. Pick cards left to right, skipping any, so each is bigger than the last. What is the longest possible?",
        options: ["3", "4", "5"],
        answer: 1,
      }}
      exploreHint="Deal each card onto the leftmost pile whose top is not smaller."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            All 8 cards made <strong>4</strong> piles, and the longest rising run has 4 cards
            {trace.length === 4 ? `: you traced ${trace.map((i) => CARDS[i]).join(" ")}` : ", such as 1 4 5 6"}. 3 4 5 9 works
            too, so a longest run need not start at the smallest card.
          </p>
          <p>
            A rising run can use at most one card from each pile, since each pile goes downward. And every card on pile k
            points back to a smaller, earlier card on pile k − 1, so a run as long as the number of piles always exists.
          </p>
          <p className="muted">One pass of a card game measures the longest rising run.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const commit = (np: Placed[][]) => {
          setPiles(np);
          setTrace([]);
          if (np.reduce((a, p) => a + p.length, 0) === CARDS.length) interact();
        };
        const dealOne = () => {
          if (locked || next === null) return;
          const k = target(piles, next);
          setNote(`${next} → ${k === piles.length ? "a new pile" : `pile ${k + 1}`}.`);
          commit(place(piles, dealt));
        };
        const dealAll = () => {
          if (locked || next === null) return;
          let p = piles;
          for (let i = dealt; i < CARDS.length; i++) p = place(p, i);
          setNote("Every card dealt by the rule.");
          commit(p);
        };
        const tapPile = (k: number) => {
          if (locked) return;
          if (next === null) {
            if (k >= piles.length) return;
            // Trace back from the top of pile k.
            const run: number[] = [];
            let cur: number | null = piles[k][piles[k].length - 1].i;
            while (cur !== null) {
              run.unshift(cur);
              cur = byIndex(cur).prev;
            }
            setTrace(run);
            setNote(`Traced back from pile ${k + 1}: ${run.map((i) => CARDS[i]).join(" ")}.`);
            return;
          }
          const want = target(piles, next);
          if (k === want) {
            setNote(`${next} → ${k === piles.length ? "a new pile" : `pile ${k + 1}`}.`);
            commit(place(piles, dealt));
          } else if (k < piles.length && piles[k][piles[k].length - 1].v < next) {
            setNote(`${next} cannot go on ${piles[k][piles[k].length - 1].v}: the top must not be smaller.`);
          } else {
            setNote(`Card ${next} (${dealt + 1} of 8): the leftmost pile that fits is ${want === piles.length ? "a new one" : `pile ${want + 1}`}.`);
          }
        };

        const msg = locked
          ? "Make a prediction to start."
          : note || `Next card: ${next}. Tap the pile it goes on.`;
        const slots = next === null ? piles.length : piles.length + 1;

        return (
          <div className={s.wrap}>
            <div className={s.hand} aria-label="Cards to deal">
              {CARDS.map((v, i) => (
                <span key={i} className={`${s.card} ${i < dealt ? s.gone : ""} ${i === dealt ? s.next : ""} ${trace.includes(i) ? s.traced : ""}`}>
                  {v}
                </span>
              ))}
            </div>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>
            <Row>
              <Control className="active" disabled={locked || next === null} onClick={dealOne}>
                Deal one by the rule
              </Control>
              <Control disabled={locked || next === null} onClick={dealAll}>
                Deal the rest
              </Control>
            </Row>
            <div className={s.piles}>
              {Array.from({ length: slots }, (_, k) => {
                const p = piles[k];
                return (
                  <Control
                    key={k}
                    className={`${s.pile} ${p ? "" : s.empty}`}
                    disabled={locked}
                    aria-label={p ? (next === null ? `Trace back from pile ${k + 1}` : `Put ${next} on pile ${k + 1}`) : `Put ${next} on a new pile`}
                    onClick={() => tapPile(k)}
                  >
                    <span className={s.pileName}>{p ? `pile ${k + 1} · top` : "new"}</span>
                    {p ? (
                      [...p].reverse().map((c) => (
                        <span key={c.i} className={`${s.pcard} ${trace.includes(c.i) ? s.traced : ""}`}>
                          {c.v}
                        </span>
                      ))
                    ) : (
                      <span className={s.plus}>+</span>
                    )}
                  </Control>
                );
              })}
            </div>
            <p className={s.count}>
              Dealt {dealt} of 8 · piles <strong>{piles.length}</strong>
            </p>
          </div>
        );
      }}
    </Lesson>
  );
}
