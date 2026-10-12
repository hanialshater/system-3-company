"use client";

// Exemplar lesson. Teaches the part the book's early Merge Sort demos treated as
// cleanup: merging two sorted piles is cheap, because every comparison places one
// card for good. No bars.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";

function sortedPile(seed: number, size: number): number[] {
  // Small deterministic generator so QA and screenshots are reproducible.
  let s = seed;
  const out = new Set<number>();
  while (out.size < size) {
    s = (s * 9301 + 49297) % 233280;
    out.add(1 + Math.floor((s / 233280) * 40));
  }
  return [...out].sort((a, b) => a - b);
}

function deal(seed: number) {
  const all = sortedPile(seed, 8);
  // Deterministic shuffle of positions; the first four go to pile A.
  const idx = all.map((_, i) => i);
  let s = seed;
  for (let i = idx.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const left = idx.slice(0, 4).map((i) => all[i]);
  const right = idx.slice(4).map((i) => all[i]);
  return { left: left.sort((a, b) => a - b), right: right.sort((a, b) => a - b) };
}

export default function MergeSortPayoff({ slug }: { slug: string }) {
  const [seed, setSeed] = useState(7);
  const piles = useMemo(() => deal(seed), [seed]);
  const [li, setLi] = useState(0);
  const [ri, setRi] = useState(0);
  const [out, setOut] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [miss, setMiss] = useState<"left" | "right" | null>(null);

  const leftTop = piles.left[li];
  const rightTop = piles.right[ri];
  const done = out.length === 8;
  const oneSideEmpty = leftTop === undefined || rightTop === undefined;

  const reset = (nextSeed: number) => {
    setSeed(nextSeed);
    setLi(0);
    setRi(0);
    setOut([]);
    setComparisons(0);
    setMiss(null);
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
      exploreHint="Merge the piles: tap whichever top card is smaller."
      reveal={() => (
        <>
          <p>
            Each comparison looks at only the two top cards, and the smaller one goes into the row for good. Eight
            cards, so at most <strong>7</strong> comparisons; once a pile empties, the rest just slides over for free.
          </p>
          <p>
            That is why Merge Sort splits. Single cards are already sorted piles. Merge them into 2s, then 4s, then 8s.
            For 1,000 cards that takes fewer than 10,000 comparisons. Comparing every card with every other card would take
            499,500.
          </p>
          <p className="muted">The splitting is setup. The merge is the payoff.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const take = (side: "left" | "right") => {
          if (locked || done) return;
          const mine = side === "left" ? leftTop : rightTop;
          const other = side === "left" ? rightTop : leftTop;
          if (mine === undefined) return;
          interact();
          if (other !== undefined) {
            // A wrong tap is not a comparison the algorithm makes; it is feedback.
            if (mine > other) {
              setMiss(side);
              return;
            }
            setComparisons((c) => c + 1);
          }
          setMiss(null);
          setOut((o) => [...o, mine]);
          side === "left" ? setLi((i) => i + 1) : setRi((i) => i + 1);
        };

        const slideRest = () => {
          if (locked || !oneSideEmpty || done) return;
          interact();
          setOut((o) => [...o, ...piles.left.slice(li), ...piles.right.slice(ri)]);
          setLi(piles.left.length);
          setRi(piles.right.length);
        };

        return (
          <div className="ms">
            <div className="ms-piles">
              {(["left", "right"] as const).map((side) => {
                const pile = side === "left" ? piles.left : piles.right;
                const idx = side === "left" ? li : ri;
                return (
                  <div key={side} className="ms-pile">
                    <span className="muted small">{side === "left" ? "Pile A" : "Pile B"}</span>
                    <div className="ms-stack">
                      {pile.slice(idx).map((v, k) =>
                        k === 0 ? (
                          <Control
                            key={v}
                            className={`card top ${miss === side ? "shake" : ""}`}
                            disabled={locked || done}
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

            <div className="ms-row" aria-label="Merged row">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} className={`slot ${out[i] !== undefined ? "filled" : ""}`}>
                  {out[i] ?? ""}
                </span>
              ))}
            </div>

            <p className="ms-msg" aria-live="polite">
              {locked
                ? "Make a prediction to start."
                : miss
                  ? "That one is bigger. Compare the two tops again."
                  : done
                    ? `Merged with ${comparisons} comparison${comparisons === 1 ? "" : "s"}.`
                    : oneSideEmpty
                      ? "One pile is empty. The rest needs no comparisons."
                      : "Which top card is smaller?"}
            </p>

            <Row>
              <Readout label="Comparisons" value={comparisons} />
              <Readout label="Placed" value={`${out.length}/8`} />
              {oneSideEmpty && !done ? (
                <Control disabled={locked} onClick={slideRest}>
                  Slide the rest
                </Control>
              ) : (
                <Control
                  disabled={locked}
                  onClick={() => {
                    interact();
                    reset(seed + 13);
                  }}
                >
                  New piles
                </Control>
              )}
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
