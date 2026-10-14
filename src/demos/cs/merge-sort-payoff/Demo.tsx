"use client";

// Exemplar lesson. Teaches the part the book's early Merge Sort demos treated as
// cleanup: merging two sorted piles is cheap, because every comparison places one
// card for good. No bars.
//
// v2: the reveal is earned. Two milestones (useMilestones): "saw-split" (the learner opens
// where the piles came from: 8 single cards, made with zero comparisons) and "merged" (the
// final merge of the two 4-card piles is complete, by taps or by "Finish for me").
// v4: "saw-split" now opens all three rounds at once (8 singles: 0, pairs: 4, piles A and B: 6), stacked,
// and the finished merge adds its count to a running total set against 28 for every pair, so the
// payoff of splitting (every round costs fewer comparisons than there are cards) is on the stage.
// v5: the merge prompt and wrong-tap line sit at the top of the stage, and the rounds stack is compact, so the
// feedback is never clipped on a phone. The finished sort is recorded (rounds + merge) and kept in a line that
// New piles does not clear; the reveal quotes that record. Reveal trimmed under 120 words.

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import css from "./styles.module.css";

const N = 8;

function step(s: number) {
  return (s * 9301 + 49297) % 233280;
}

function sortedPile(seed: number, size: number): number[] {
  // Small deterministic generator so QA and screenshots are reproducible.
  let s = seed;
  const out = new Set<number>();
  while (out.size < size) {
    s = step(s);
    out.add(1 + Math.floor((s / 233280) * 40));
  }
  return [...out].sort((a, b) => a - b);
}

function shuffle(xs: number[], seed: number): number[] {
  const a = [...xs];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = step(s);
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Two-pointer merge; returns the row and the comparisons it made. */
function merge(a: number[], b: number[]) {
  const out: number[] = [];
  let i = 0;
  let j = 0;
  let c = 0;
  while (i < a.length && j < b.length) {
    c++;
    out.push(a[i] < b[j] ? a[i++] : b[j++]);
  }
  return { out: [...out, ...a.slice(i), ...b.slice(j)], c };
}

function deal(seed: number) {
  const all = sortedPile(seed, N);
  const idx = shuffle(
    all.map((_, i) => i),
    seed,
  );
  const l = idx
    .slice(0, 4)
    .map((i) => all[i])
    .sort((a, b) => a - b);
  const r = idx
    .slice(4)
    .map((i) => all[i])
    .sort((a, b) => a - b);
  // The unsorted deck these piles came from: pile A's cards in a fixed scrambled order, then
  // pile B's. Fixed so every deal's deck is visibly unsorted and every pair needs its comparison.
  const deck = [l[2], l[0], l[3], l[1], r[3], r[1], r[0], r[2]];
  // Bottom-up rounds, computed with the same merge the learner does.
  const singles = deck.map((v) => [v]);
  const pairs: number[][] = [];
  let pairCost = 0;
  for (let k = 0; k < N; k += 2) {
    const m = merge(singles[k], singles[k + 1]);
    pairs.push(m.out);
    pairCost += m.c;
  }
  const fours: number[][] = [];
  let fourCost = 0;
  for (let k = 0; k < pairs.length; k += 2) {
    const m = merge(pairs[k], pairs[k + 1]);
    fours.push(m.out);
    fourCost += m.c;
  }
  return {
    left: fours[0],
    right: fours[1],
    pairCost,
    fourCost,
    rounds: [
      { groups: singles, label: "Split into 8 single cards: 0 comparisons" },
      { groups: pairs, label: `Merge singles into pairs: ${pairCost} comparisons` },
      { groups: fours, label: `Merge pairs into piles A and B: ${fourCost} comparisons` },
    ],
  };
}

/** Hook host: the Lesson render prop is not a component, so the milestone hook lives here. */
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

const ROW_H = 32;

function RoundsStack({ rounds }: { rounds: { groups: number[][]; label: string }[] }) {
  // One row of 8 cards per round, stacked top to bottom; a gap between groups shows which cards are
  // already one sorted pile. Each row carries its own comparison count.
  return (
    <svg
      className="stage-svg"
      viewBox={`0 0 320 ${ROW_H * rounds.length}`}
      role="img"
      aria-label={rounds.map((r) => `${r.label}: ${r.groups.map((g) => g.join(" ")).join(" | ")}`).join(". ")}
    >
      {rounds.map((round, ri) => {
        const gap = 10;
        const w = (320 - gap * (round.groups.length - 1)) / N;
        const y0 = ri * ROW_H;
        let x = 0;
        const cells: { x: number; v: number }[] = [];
        round.groups.forEach((g) => {
          g.forEach((v) => {
            cells.push({ x, v });
            x += w;
          });
          x += gap;
        });
        return (
          <g key={ri}>
            <text x={160} y={y0 + 9} textAnchor="middle" className={css.rowLabel}>
              {round.label}
            </text>
            {cells.map((c, i) => (
              <g key={i}>
                <rect x={c.x + 1} y={y0 + 12} width={w - 2} height={19} rx={4} className={css.cell} />
                <text x={c.x + w / 2} y={y0 + 26} textAnchor="middle" className={css.num}>
                  {c.v}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export default function MergeSortPayoff({ slug }: { slug: string }) {
  const [seed, setSeed] = useState(7);
  const piles = useMemo(() => deal(seed), [seed]);
  const [li, setLi] = useState(0);
  const [ri, setRi] = useState(0);
  const [out, setOut] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [miss, setMiss] = useState<"left" | "right" | null>(null);
  const [showRounds, setShowRounds] = useState(false);
  const [auto, setAuto] = useState(false);
  // The finished sort, recorded when the merge completes: it survives New piles.
  const [last, setLast] = useState<{ pair: number; four: number; merge: number } | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const leftTop = piles.left[li];
  const rightTop = piles.right[ri];
  const done = out.length === N;
  const oneSideEmpty = leftTop === undefined || rightTop === undefined;

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  useEffect(() => {
    if (done) setLast({ pair: piles.pairCost, four: piles.fourCost, merge: comparisons });
  }, [done, comparisons, piles]);

  const reset = (nextSeed: number) => {
    setSeed(nextSeed);
    setLi(0);
    setRi(0);
    setOut([]);
    setComparisons(0);
    setMiss(null);
  };
  const before = piles.pairCost + piles.fourCost; // comparisons in the rounds before the last merge

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two piles of 4 cards, each already sorted. To merge them into one sorted row of 8, what is the most comparisons you could ever need?",
        options: ["7", "16", "28"],
        answer: 0,
      }}
      exploreHint="See where the piles came from, then merge them: tap the smaller top card."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {last ? `The merge on screen took ${last.merge}. ` : ""}Each comparison looks at only the two top cards, and the
            smaller one goes into the row for good. Eight cards, so at most <strong>7</strong>; once a pile empties, the
            rest slides over free. Piles that interleave to the end need all 7.
          </p>
          <p>
            That is why Merge Sort splits: splitting compares nothing. The rounds before the last merge cost{" "}
            {last ? `${last.pair} and ${last.four}; with the last merge's ${last.merge}, the whole sort took ${last.pair + last.four + last.merge}` : `${piles.pairCost} and ${piles.fourCost}`}
            , against 28 for checking every pair. Halving 1,000 cards takes 10 rounds, each under 1,000 comparisons:
            fewer than 10,000, against 499,500 for every pair.
          </p>
          <p className="muted">The splitting is setup. The merge is the payoff.</p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={["saw-split", "merged"]}>
          {(reach) => {
            const place = (side: "left" | "right", counted: boolean) => {
              const mine = side === "left" ? piles.left[li] : piles.right[ri];
              setMiss(null);
              if (counted) setComparisons((c) => c + 1);
              setOut((o) => [...o, mine]);
              side === "left" ? setLi((i) => i + 1) : setRi((i) => i + 1);
            };

            const take = (side: "left" | "right") => {
              if (locked || done || auto) return;
              const mine = side === "left" ? leftTop : rightTop;
              const other = side === "left" ? rightTop : leftTop;
              if (mine === undefined) return;
              if (other !== undefined && mine > other) {
                // A wrong tap is not a comparison the merge makes; it is feedback.
                setMiss(side);
                return;
              }
              place(side, other !== undefined);
              if (out.length + 1 === N) reach("merged");
            };

            const slideRest = () => {
              if (locked || !oneSideEmpty || done) return;
              setOut((o) => [...o, ...piles.left.slice(li), ...piles.right.slice(ri)]);
              setLi(piles.left.length);
              setRi(piles.right.length);
              reach("merged");
            };

            const finish = () => {
              if (locked || done || auto) return;
              // Plays the rest of the merge one card at a time, the same rule as a tap.
              setAuto(true);
              setMiss(null);
              let i = li;
              let j = ri;
              let c = comparisons;
              const placed = [...out];
              const tick = () => {
                if (i < piles.left.length && j < piles.right.length) {
                  c++;
                  placed.push(piles.left[i] < piles.right[j] ? piles.left[i++] : piles.right[j++]);
                } else {
                  placed.push(...piles.left.slice(i), ...piles.right.slice(j));
                  i = piles.left.length;
                  j = piles.right.length;
                }
                setOut([...placed]);
                setLi(i);
                setRi(j);
                setComparisons(c);
                if (placed.length >= N) {
                  if (timer.current) clearInterval(timer.current);
                  timer.current = null;
                  setAuto(false);
                  reach("merged");
                }
              };
              tick();
              timer.current = setInterval(tick, 160);
            };

            const toggleRounds = () => {
              if (locked) return;
              setShowRounds((v) => !v);
              reach("saw-split");
            };

            return (
              <div className="ms">
                <p className="ms-msg" aria-live="polite">
                  {locked
                    ? "Make a prediction to start."
                    : miss
                      ? "The other top card is smaller, so it goes first. Each card placed while both piles have cards is one comparison."
                      : done
                        ? `Merged with ${comparisons} comparison${comparisons === 1 ? "" : "s"}.${
                            comparisons < 7 ? " Piles that interleave to the end need 7." : ""
                          }`
                        : oneSideEmpty
                          ? "One pile is empty. The rest needs no comparisons."
                          : "Which top card is smaller?"}
                </p>
                <div className={css.rounds}>
                  {showRounds && (
                    <>
                      <RoundsStack rounds={piles.rounds} />
                      <p className={css.roundLabel}>
                        {done
                          ? `Whole sort: 0 + ${piles.pairCost} + ${piles.fourCost} + ${comparisons} = ${before + comparisons}, against 28 for every pair.`
                          : `So far 0 + ${piles.pairCost} + ${piles.fourCost} = ${before}. The last merge adds at most 7.`}
                      </p>
                    </>
                  )}
                  {phase !== "reveal" && (
                    <Control disabled={locked} onClick={toggleRounds} className={css.roundBtn}>
                      {showRounds ? "Hide the rounds" : "Where did the piles come from?"}
                    </Control>
                  )}
                </div>

                <div className="ms-piles">
                  {(["left", "right"] as const).map((side) => {
                    const pile = side === "left" ? piles.left : piles.right;
                    const idx = side === "left" ? li : ri;
                    return (
                      <div key={side} className="ms-pile">
                        <span className="muted small">{side === "left" ? "Pile A" : "Pile B"}</span>
                        {/* once merged, collapse the empty piles so the merged row stays in view */}
                        <div className="ms-stack" style={done || showRounds ? { minHeight: 0 } : undefined}>
                          {pile.slice(idx).map((v, k) =>
                            k === 0 ? (
                              <Control
                                key={v}
                                className={`card top ${miss === side ? "shake" : ""}`}
                                disabled={locked || done || auto}
                                aria-label={`Take ${v} from ${side === "left" ? "pile A" : "pile B"}`}
                                onClick={() => take(side)}
                              >
                                {v}
                              </Control>
                            ) : (
                              <span key={v} className="card under">
                                {v}
                              </span>
                            ),
                          )}
                          {idx >= pile.length && <span className="card empty">empty</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div role="group" aria-label="Merged row">
                  <span className="muted small">Merged row</span>
                  <div className="ms-row">
                    {Array.from({ length: N }, (_, i) => (
                      <span key={i} className={`slot ${out[i] !== undefined ? "filled" : ""}`}>
                        {out[i] ?? ""}
                      </span>
                    ))}
                  </div>
                </div>


                {last && (
                  <p className={css.roundLabel}>
                    Your sort: 0 + {last.pair} + {last.four} + {last.merge} = {last.pair + last.four + last.merge}, against 28.
                  </p>
                )}
                <Row>
                  <Readout label="Comparisons" value={comparisons} />
                  <Readout label="Placed" value={`${out.length}/${N}`} />
                  {done ? (
                    <Control
                      disabled={locked}
                      onClick={() => {
                        reset(seed + 13);
                      }}
                    >
                      New piles
                    </Control>
                  ) : oneSideEmpty ? (
                    <Control disabled={locked} onClick={slideRest}>
                      Slide the rest
                    </Control>
                  ) : (
                    <Control disabled={locked || auto} onClick={finish}>
                      Finish for me
                    </Control>
                  )}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
