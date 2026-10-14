"use client";

// Bucket sort as a before / after toggle on the hand (company/design/specs/one-crowded-bucket.md).
// Ten buckets of ten values (1-10, 11-20, ... 91-100). "Drop into buckets" drops the hand in arrival order;
// "Sort buckets" insertion-sorts every bucket, left to right, flashing each compared pair. A comparison is
// one test of the moving number against a number already in the bucket, including the test that stops
// the slide (spread hand: 1, in 61-70; clumped hand: 30, in 41-50; claim c1).
// One representation: the bucket row. The readouts only count what the learner ran.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Hand = "spread" | "clumped";
const HANDS: Record<Hand, number[]> = {
  spread: [95, 12, 37, 64, 28, 81, 3, 46, 59, 70],
  clumped: [47, 43, 50, 41, 45, 49, 42, 48, 44, 46],
};
const bucketOf = (v: number) => Math.floor((v - 1) / 10);

type Cmp = { b: number; pair: [number, number]; after: number[] };
type Plan = { dropped: number[][]; events: Cmp[]; frames: number[][][] };

// Insertion sort inside each bucket, recording every comparison and the bucket after it.
function plan(hand: number[]): Plan {
  const dropped: number[][] = Array.from({ length: 10 }, () => []);
  for (const v of hand) dropped[bucketOf(v)].push(v);
  const events: Cmp[] = [];
  dropped.forEach((orig, b) => {
    const a = orig.slice();
    for (let i = 1; i < a.length; i++) {
      let j = i;
      while (j > 0) {
        const moving = a[j];
        const other = a[j - 1];
        const bigger = other > moving;
        if (bigger) {
          a[j - 1] = moving;
          a[j] = other;
        }
        events.push({ b, pair: [moving, other], after: a.slice() });
        if (!bigger) break;
        j -= 1;
      }
    }
  });
  const frames: number[][][] = [dropped.map((x) => x.slice())];
  for (const e of events) {
    const next = frames[frames.length - 1].map((x) => x.slice());
    next[e.b] = e.after;
    frames.push(next);
  }
  return { dropped, events, frames };
}
const PLANS: Record<Hand, Plan> = { spread: plan(HANDS.spread), clumped: plan(HANDS.clumped) };

type View = { hand: Hand; k: number; step: number; sorted: boolean; flash: boolean };
const START: View = { hand: "spread", k: 0, step: 0, sorted: false, flash: false };

const reducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Layout (viewBox 340 x 330).
const TILE = 30;
const COL = 32;
const GAP = 2;
const TOP = 44;
const DEPTH = 230;
const BOTTOM = TOP + DEPTH;
const STACK = 22;
const colX = (b: number) => 1 + b * (COL + GAP);

export default function OneCrowdedBucket({ slug }: { slug: string }) {
  const [v, setV] = useState<View>(START);
  const [results, setResults] = useState<Partial<Record<Hand, number>>>({});
  const [busy, setBusy] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Ten numbers from 1 to 100 go into ten buckets (1-10, 11-20, ...), then each bucket is insertion-sorted. The spread hand 95 12 37 64 28 81 3 46 59 70 needs 1 comparison inside buckets. The hand 47 43 50 41 45 49 42 48 44 46: how many?",
        options: ["About 1, as before", "About 10", "30"],
        answer: 2,
      }}
      exploreHint="Drop and sort the spread hand, then switch to the clumped one."
      minInteractions={2}
      reveal={() => {
        const sp = results.spread ?? 1;
        const cl = results.clumped ?? 30;
        return (
          <>
            <p>
              Spread out, the ten numbers landed in nine buckets. Only 64 and 70 shared one, so sorting took {sp}{" "}
              comparison{sp === 1 ? "" : "s"}. Clumped, all ten fell into 41-50, and the &ldquo;tiny&rdquo; sorts became
              one insertion sort of ten numbers: {cl} comparisons.
            </p>
            <p>
              Bucket sort only splits the work when the values spread evenly over the buckets. When the data clump, it
              is as slow as the sort inside the one crowded bucket.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["spread-sorted", "clumped-sorted"]}>
          {(reach) => {
            const p = PLANS[v.hand];
            const total = p.events.length;
            const hand = HANDS[v.hand];

            const finishSort = (h: Hand) => {
              const n = PLANS[h].events.length;
              setResults((r) => ({ ...r, [h]: n }));
              reach(h === "spread" ? "spread-sorted" : "clumped-sorted");
            };

            // Play a list of views, each after its delay. Instant under reduced motion.
            const play = (frames: { view: View; ms: number }[], onDone?: () => void) => {
              clearTimers();
              if (reducedMotion() || frames.length === 0) {
                if (frames.length) setV(frames[frames.length - 1].view);
                onDone?.();
                return;
              }
              setBusy(true);
              let at = 0;
              frames.forEach((f, i) => {
                at += f.ms;
                timers.current.push(
                  setTimeout(() => {
                    setV(f.view);
                    if (i === frames.length - 1) {
                      setBusy(false);
                      onDone?.();
                    }
                  }, at),
                );
              });
            };

            const dropFrames = (h: Hand, ms: number) =>
              Array.from({ length: 10 }, (_, i) => ({
                view: { hand: h, k: i + 1, step: 0, sorted: false, flash: false },
                ms,
              }));
            const sortFrames = (h: Hand, ms: number) => {
              const n = PLANS[h].events.length;
              const f = Array.from({ length: n }, (_, i) => ({
                view: { hand: h, k: 10, step: i + 1, sorted: false, flash: true },
                ms,
              }));
              f.push({ view: { hand: h, k: 10, step: n, sorted: true, flash: false }, ms });
              return f;
            };

            const drop = () => {
              if (locked || busy || v.k >= 10) return;
              play(dropFrames(v.hand, 35));
            };
            const sortAll = () => {
              if (locked || busy || v.k < 10 || v.sorted) return;
              const ms = Math.min(120, Math.floor(360 / Math.max(1, total)));
              const h = v.hand;
              play(sortFrames(h, ms), () => finishSort(h));
            };
            const switchHand = (h: Hand) => {
              if (locked || busy || h === v.hand) return;
              if (v.sorted) {
                const n = PLANS[h].events.length;
                const ms = Math.min(8, Math.floor(240 / Math.max(1, n)));
                setV({ hand: h, k: 0, step: 0, sorted: false, flash: false });
                play([...dropFrames(h, 12), ...sortFrames(h, Math.max(4, ms))], () => finishSort(h));
              } else {
                clearTimers();
                setV({ hand: h, k: 0, step: 0, sorted: false, flash: false });
              }
            };

            // What the buckets hold now.
            const dropped = new Set(hand.slice(0, v.k));
            const buckets: number[][] =
              v.k < 10
                ? Array.from({ length: 10 }, (_, b) => p.dropped[b].filter((x) => dropped.has(x)))
                : p.frames[v.step];
            const flashPair = v.flash && v.step > 0 ? p.events[v.step - 1].pair : null;
            const perBucket = Array.from({ length: 10 }, (_, b) =>
              p.events.slice(0, v.step).filter((e) => e.b === b).length,
            );
            const sortedAny = v.step > 0;
            const comps = v.step;
            const full = buckets.findIndex((x) => x.length === 10);
            const label =
              v.k < 10
                ? `${v.hand === "spread" ? "Spread" : "Clumped"} hand: ${v.k} of 10 numbers dropped`
                : full >= 0
                  ? `${v.hand === "spread" ? "Spread" : "Clumped"} hand: all 10 numbers in bucket ${full * 10 + 1} to ${full * 10 + 10}, ${comps} comparisons`
                  : `${v.hand === "spread" ? "Spread" : "Clumped"} hand: ${buckets.filter((x) => x.length).length} buckets used, ${comps} comparison${comps === 1 ? "" : "s"}`;

            return (
              <div className={s.wrap}>
                <p className={s.rule}>
                  Drop each number in its bucket of ten, then insertion-sort inside each bucket. Count comparisons.
                </p>
                <svg viewBox="0 0 340 330" className={`stage-svg ${s.svg}`} role="img" aria-label={label}>
                  {hand.map((x, i) => {
                    const gone = i < v.k;
                    return (
                      <g key={`h${i}`}>
                        <rect
                          x={2 + i * (TILE + 4)}
                          y={1}
                          width={TILE}
                          height={TILE}
                          rx={5}
                          fill={gone ? "none" : "var(--bg-2)"}
                          stroke={gone ? "var(--line)" : "var(--fg)"}
                          strokeDasharray={gone ? "3 3" : undefined}
                          strokeWidth={1}
                        />
                        <text
                          x={2 + i * (TILE + 4) + TILE / 2}
                          y={20}
                          textAnchor="middle"
                          className={s.hnum}
                          fill={gone ? "var(--muted)" : "var(--fg)"}
                        >
                          {x}
                        </text>
                      </g>
                    );
                  })}
                  {buckets.map((col, b) => {
                    const x = colX(b);
                    return (
                      <g key={`b${b}`}>
                        <path
                          d={`M${x} ${TOP} V${BOTTOM} H${x + COL} V${TOP}`}
                          fill="none"
                          stroke={col.length ? "var(--muted)" : "var(--line)"}
                          strokeWidth={1.5}
                        />
                        {col.map((val, i) => {
                          const y = BOTTOM - (i + 1) * STACK + 1;
                          const hot = flashPair !== null && (val === flashPair[0] || val === flashPair[1]);
                          return (
                            <g key={val}>
                              <rect
                                x={x + 2}
                                y={y}
                                width={COL - 4}
                                height={STACK - 2}
                                rx={3}
                                fill="var(--bg-2)"
                                stroke={hot ? "var(--fg)" : "color-mix(in srgb, var(--domain) 60%, var(--line))"}
                                strokeWidth={hot ? 2 : 1}
                              />
                              <text x={x + COL / 2} y={y + 14} textAnchor="middle" className={s.bnum}>
                                {val}
                              </text>
                            </g>
                          );
                        })}
                        <text x={x + COL / 2} y={BOTTOM + 14} textAnchor="middle" className={s.lo}>
                          {b * 10 + 1}
                        </text>
                        {sortedAny && perBucket[b] > 0 && (
                          <text x={x + COL / 2} y={BOTTOM + 31} textAnchor="middle" className={s.count}>
                            {perBucket[b]}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  <text x={170} y={324} textAnchor="middle" className={s.cap}>
                    each bucket holds ten values
                  </text>
                </svg>
                <Row>
                  <Readout label="Comparisons" value={comps} />
                  <Readout label="Spread" value={results.spread ?? "?"} />
                  <Readout label="Clumped" value={results.clumped ?? "?"} />
                </Row>
                <Row>
                  <Control className="tap" disabled={locked || busy || v.k >= 10} onClick={drop}>
                    Drop into buckets
                  </Control>
                  <Control className="tap" disabled={locked || busy || v.k < 10 || v.sorted} onClick={sortAll}>
                    Sort buckets
                  </Control>
                </Row>
                <Row>
                  <span className={s.lab} id="hand-label">
                    Hand
                  </span>
                  <span role="group" aria-labelledby="hand-label" className={s.chips}>
                    {(["spread", "clumped"] as const).map((h) => (
                      <Control
                        key={h}
                        className={`tap ${v.hand === h ? "active" : ""}`}
                        aria-pressed={v.hand === h}
                        disabled={locked || busy || v.hand === h}
                        onClick={() => switchHand(h)}
                      >
                        {h === "spread" ? "Spread" : "Clumped"}
                      </Control>
                    ))}
                  </span>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
