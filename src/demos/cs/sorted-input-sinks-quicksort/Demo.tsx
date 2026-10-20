"use client";

// Toy quicksort (first card is the pivot) on two hands: shuffled 3 4 1 6 2 5 and sorted 1 2 3 4 5 6.
// One ladder on screen at a time; each split adds a row (the group, its pivot, the cards that went
// smaller / bigger, and one small square per comparison). Each hand keeps its own progress, so the
// toggle compares like for like and never resets. The answer is never drawn before the learner has
// predicted: counts are "?" while locked and no scale end is marked.

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

type HandId = "shuffled" | "sorted";
const HANDS: Record<HandId, number[]> = {
  shuffled: [3, 4, 1, 6, 2, 5],
  sorted: [1, 2, 3, 4, 5, 6],
};

type Split = {
  group: number[];
  pivot: number;
  smaller: number[];
  bigger: number[];
  cost: number;
  /** Groups of 2+ cards still waiting after this split. */
  waiting: number[][];
};

/** Every split in the order "Split next group" makes them: first waiting group of 2+ cards; smaller side queued before bigger. */
function plan(hand: number[]): Split[] {
  const out: Split[] = [];
  let queue: number[][] = [hand];
  while (queue.length) {
    const group = queue[0];
    const [pivot, ...rest] = group;
    const smaller = rest.filter((x) => x < pivot);
    const bigger = rest.filter((x) => x > pivot);
    queue = [smaller, bigger, ...queue.slice(1)].filter((g) => g.length >= 2);
    out.push({ group, pivot, smaller, bigger, cost: rest.length, waiting: queue });
    // order: the smaller side is split before anything that was already waiting
  }
  return out;
}
const PLANS: Record<HandId, Split[]> = { shuffled: plan(HANDS.shuffled), sorted: plan(HANDS.sorted) };
const TOTAL: Record<HandId, number> = { shuffled: PLANS.shuffled.length, sorted: PLANS.sorted.length };
const sumCost = (h: HandId, k: number) => PLANS[h].slice(0, k).reduce((a, r) => a + r.cost, 0);
const waitingAfter = (h: HandId, k: number): number[][] => (k === 0 ? [HANDS[h]] : PLANS[h][k - 1].waiting);

const ROW_H = 44;
const ROWS = 6;

function Ladder({ hand, k }: { hand: HandId; k: number }) {
  const rows = Math.max(1, k);
  const sp = PLANS[hand].slice(0, k);
  return (
    <svg
      viewBox={`0 0 340 ${ROWS * ROW_H + 6}`}
      className="stage-svg"
      role="img"
      aria-label={`Split ladder for the ${hand} hand, ${k} splits done`}
    >
      {Array.from({ length: rows }, (_, r) => {
        const y = r * ROW_H + 4;
        const row = sp[r];
        const group = row ? row.group : HANDS[hand];
        return (
          <g
            key={r}
            aria-label={
              row
                ? `Split ${r + 1}: pivot ${row.pivot}, ${row.smaller.length} smaller, ${row.bigger.length} bigger, ${row.cost} comparisons`
                : "The hand"
            }
          >
            {group.map((v, c) => {
              const isPivot = !!row && c === 0;
              return (
                <g key={c}>
                  <rect
                    x={6 + c * 23}
                    y={y + 4}
                    width={21}
                    height={24}
                    rx={4}
                    fill="var(--bg-2)"
                    stroke={isPivot ? "var(--fg)" : "var(--line)"}
                    strokeWidth={isPivot ? 2.5 : 1}
                  />
                  <text x={6 + c * 23 + 10.5} y={y + 20} textAnchor="middle" className={s.card}>
                    {v}
                  </text>
                  {isPivot && (
                    <text x={6 + 10.5} y={y + 39} className={s.small} textAnchor="start" dx={-2}>
                      ▲ pivot
                    </text>
                  )}
                </g>
              );
            })}
            {row &&
              Array.from({ length: row.cost }, (_, q) => (
                <rect key={q} x={150 + q * 14} y={y + 10} width={12} height={12} fill="var(--domain)" stroke="var(--fg)" strokeWidth={1} />
              ))}
            {row &&
              (
                [
                  ["smaller", row.smaller],
                  ["bigger", row.bigger],
                ] as const
              ).map(([name, cards], q) => (
                <g key={name}>
                  <rect
                    x={226}
                    y={y + 2 + q * 20}
                    width={108}
                    height={18}
                    rx={4}
                    fill="none"
                    stroke="var(--line)"
                    strokeDasharray={cards.length ? undefined : "3 3"}
                  />
                  <text x={231} y={y + 14.5 + q * 20} className={s.slot}>
                    {name}: {cards.length ? cards.join(" ") : "0 cards"}
                  </text>
                </g>
              ))}
          </g>
        );
      })}
    </svg>
  );
}

function Stage({ locked, phase, interact }: { locked: boolean; phase: string; interact: () => void }) {
  const [view, setView] = useState<HandId>("shuffled");
  const [k, setK] = useState<Record<HandId, number>>({ shuffled: 0, sorted: 0 });
  const [running, setRunning] = useState(false);
  const { reach } = useMilestones(interact, ["sorted-done", "shuffled-done"]);

  const done = (h: HandId) => k[h] >= TOTAL[h];
  const bothDone = done("shuffled") && done("sorted");

  useEffect(() => {
    if (k.sorted >= TOTAL.sorted) reach("sorted-done");
    if (k.shuffled >= TOTAL.shuffled) reach("shuffled-done");
  });

  // The reveal describes the sorted hand: show it, with nothing cleared.
  useEffect(() => {
    if (phase === "reveal") setView("sorted");
  }, [phase]);

  // "Finish both hands": the same rows "Split next group" would add, one per tick.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setK((p) => ({ shuffled: Math.min(TOTAL.shuffled, p.shuffled + 1), sorted: Math.min(TOTAL.sorted, p.sorted + 1) }));
    }, 70);
    return () => clearInterval(id);
  }, [running]);
  useEffect(() => {
    if (running && bothDone) setRunning(false);
  }, [running, bothDone]);

  const splitNext = () => {
    if (locked || running || done(view)) return;
    setK((p) => ({ ...p, [view]: p[view] + 1 }));
  };
  const toggle = () => {
    if (locked || running) return;
    setView(view === "sorted" ? "shuffled" : "sorted");
  };
  const finish = () => {
    if (locked || running || bothDone) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setK({ shuffled: TOTAL.shuffled, sorted: TOTAL.sorted });
    else setRunning(true);
  };

  const count = (h: HandId) => sumCost(h, k[h]);
  const tallyOf = (h: HandId) => (locked || k[h] === 0 ? "?" : `${count(h)}${done(h) ? " ✓" : "…"}`);
  const waiting = waitingAfter(view, k[view]);

  return (
    <div className={s.wrap}>
      <p className={s.model}>Toy quicksort: the first card is the pivot. Each card checked against it counts 1.</p>
      <p className={s.tally}>
        Shuffled: {tallyOf("shuffled")} · Sorted: {tallyOf("sorted")}
      </p>
      <Ladder hand={view} k={k[view]} />
      <p className={s.waiting} aria-live="polite">
        {locked || done(view) ? "" : `To split: ${waiting.map((g) => `[${g.join(" ")}]`).join(" ")}`}
      </p>
      <p className={s.readout}>
        {view === "sorted" ? "Sorted" : "Shuffled"} comparisons: {locked ? "?" : count(view)}
      </p>
      <Row>
        <Control className={s.tap} disabled={locked || running || done(view)} onClick={splitNext}>
          Split next group
        </Control>
        <Control className={s.tap} aria-pressed={view === "sorted"} disabled={locked || running} onClick={toggle}>
          {view === "sorted" ? "Back to the shuffled hand" : "Give it the sorted hand"}
        </Control>
        <Control className={`${s.tap} active`} disabled={locked || running || bothDone} onClick={finish}>
          Finish both hands
        </Control>
      </Row>
    </div>
  );
}

export default function SortedInputSinksQuicksort({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your quicksort always takes the first card as its pivot. You hand it 6 cards already in order, 1 2 3 4 5 6. Compared with a shuffled hand like 3 4 1 6 2 5, how much work does it do?",
        options: ["Less work", "About the same work", "The most work possible"],
        answer: 2,
      }}
      exploreHint="Split the shuffled hand once, hand over the sorted one, then finish both."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your sorted hand took <strong>15</strong> comparisons; the shuffled one took <strong>9</strong>. Every sorted
            split left 0 cards on one side, so each split peeled off only its pivot: 5 + 4 + 3 + 2 + 1.
          </p>
          <p>
            No split can be more lopsided than that, so no order of 6 cards costs more (checked over all 720). For n cards
            that is n(n − 1)/2.
          </p>
          <p className="muted">Picking the pivot at random makes this bad case very unlikely on long hands.</p>
        </>
      )}
    >
      {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact} />}
    </Lesson>
  );
}
