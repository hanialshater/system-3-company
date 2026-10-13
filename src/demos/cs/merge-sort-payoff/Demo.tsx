"use client";

// Exemplar lesson. Teaches the part the book's early Merge Sort demos treated as
// cleanup: merging two sorted piles is cheap, because every comparison places one
// card for good. No bars.
//
// v2: the reveal is earned. Two milestones (useMilestones): "saw-split" (the learner opens
// where the piles came from: 8 single cards, made with zero comparisons) and "merged" (the
// final merge of the two 4-card piles is complete, by taps or by "Finish for me").

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
    rounds: [
      { groups: [deck], label: "The unsorted deck" },
      { groups: singles, label: "Split into 8 single cards: 0 comparisons" },
      { groups: pairs, label: `Merge into pairs: ${pairCost} comparisons` },
      {
        groups: fours,
        label: `Merge into 4s: ${fourCost} comparisons. These are piles A and B.`,
      },
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

function RoundStrip({ groups }: { groups: number[][] }) {
  // One row of 8 cards; a gap between groups shows which cards are already one sorted pile.
  const gap = 10;
  const gaps = groups.length - 1;
  const w = (320 - gap * gaps) / N;
  let x = 0;
  const cells: { x: number; v: number; g: number }[] = [];
  groups.forEach((g, gi) => {
    g.forEach((v) => {
      cells.push({ x, v, g: gi });
      x += w;
    });
    x += gap;
  });
  return (
    <svg className="stage-svg" viewBox="0 0 320 34" role="img" aria-label={groups.map((g) => g.join(" ")).join(" | ")}>
      {cells.map((c, i) => (
        <g key={i}>
          <rect x={c.x + 1} y={2} width={w - 2} height={30} rx={5} className={css.cell} />
          <text x={c.x + w / 2} y={22} textAnchor="middle" className={css.num}>
            {c.v}
          </text>
        </g>
      ))}
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
  const [round, setRound] = useState(-1); // -1 hidden; 0..3 index into piles.rounds
  const [auto, setAuto] = useState(false);
  const [lastMerge, setLastMerge] = useState<number | null>(null);
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
    if (done) setLastMerge(comparisons);
  }, [done, comparisons]);

  const reset = (nextSeed: number) => {
    setSeed(nextSeed);
    setLi(0);
    setRi(0);
    setOut([]);
    setComparisons(0);
    setMiss(null);
    setRound((r) => (r >= 0 ? 0 : -1));
  };

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
            {lastMerge !== null ? `Your merge took ${lastMerge}. ` : ""}Each comparison looks at only the two top cards,
            and the smaller one goes into the row for good. Eight cards, so at most <strong>7</strong>; once a pile
            empties, the rest slides over for free. Piles that interleave to the end need all 7.
          </p>
          <p>
            That is why Merge Sort splits: splitting compares nothing, and one card is a sorted pile. Each round of
            merges places every card once, so it costs fewer comparisons than there are cards. Halving 1,000 cards down
            to single cards takes 10 rounds, so fewer than 10,000 comparisons. Checking every pair (28 for 8 cards)
            would take 499,500.
          </p>
          <p className="muted">The splitting is setup. The merge is the payoff.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
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

            const nextRound = () => {
              if (locked) return;
              setRound((r) => (r >= 3 ? -1 : r < 1 ? 1 : r + 1));
              reach("saw-split");
            };

            const shown = round >= 0 ? piles.rounds[round] : null;

            return (
              <div className="ms">
                <div className={css.rounds}>
                  {shown && (
                    <>
                      <RoundStrip groups={shown.groups} />
                      <p className={css.roundLabel}>{shown.label}</p>
                    </>
                  )}
                  <Control disabled={locked} onClick={nextRound} className={css.roundBtn}>
                    {round < 0 ? "Where did the piles come from?" : round >= 3 ? "Hide" : "Next round"}
                  </Control>
                </div>

                <div className="ms-piles">
                  {(["left", "right"] as const).map((side) => {
                    const pile = side === "left" ? piles.left : piles.right;
                    const idx = side === "left" ? li : ri;
                    return (
                      <div key={side} className="ms-pile">
                        <span className="muted small">{side === "left" ? "Pile A" : "Pile B"}</span>
                        {/* once merged, collapse the empty piles so the merged row stays in view */}
                        <div className="ms-stack" style={done ? { minHeight: 0 } : undefined}>
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

                <p className="ms-msg" aria-live="polite">
                  {locked
                    ? "Make a prediction to start."
                    : miss
                      ? "That one is bigger, so it stays. Only a card placed counts as a comparison."
                      : done
                        ? `Merged with ${comparisons} comparison${comparisons === 1 ? "" : "s"}.${
                            comparisons < 7 ? " Piles that interleave to the end need 7." : ""
                          }`
                        : oneSideEmpty
                          ? "One pile is empty. The rest needs no comparisons."
                          : "Which top card is smaller?"}
                </p>

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
