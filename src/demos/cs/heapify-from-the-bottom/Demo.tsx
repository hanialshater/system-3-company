"use client";

// Two ways to build a max-heap from cards 1..7 in order. Left: bottom up, one tap per parent sifts that card all
// the way down. Right: insert one by one, each card bubbling up. Both trees keep their own swap counter.
// The logical state updates at once; the drawn trees play the swaps back frame by frame (120 ms per level).

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 7;
const START = [1, 2, 3, 4, 5, 6, 7];
const STEP_MS = 120;

// Node centres in a 175 x 210 panel (index = level-order position).
const PX = [82, 41, 123, 20, 61, 102, 143];
const PY = [24, 94, 94, 164, 164, 164, 164];
const parentOf = (i: number) => (i - 1) >> 1;

type Cells = (number | null)[];
type Frame = { L?: Cells; R?: Cells };

/** Sift the card at i down to its place; returns the frames (one per swap) and the swap count. */
function siftDown(a: number[], i: number) {
  const frames: number[][] = [];
  let swaps = 0;
  for (;;) {
    const l = 2 * i + 1;
    const r = l + 1;
    let m = i;
    if (l < N && a[l] > a[m]) m = l;
    if (r < N && a[r] > a[m]) m = r;
    if (m === i) break;
    [a[i], a[m]] = [a[m], a[i]];
    swaps++;
    frames.push([...a]);
    i = m;
  }
  return { frames, swaps };
}

/** Put card v in the next empty slot and bubble it up. */
function insertCard(h: Cells, v: number) {
  const a = [...h];
  let i = a.findIndex((x) => x === null);
  a[i] = v;
  const frames: Cells[] = [[...a]];
  let climb = 0;
  while (i > 0 && (a[parentOf(i)] as number) < (a[i] as number)) {
    const p = parentOf(i);
    [a[p], a[i]] = [a[i], a[p]];
    climb++;
    frames.push([...a]);
    i = p;
  }
  return { heap: a, frames, climb };
}

const EMPTY: Cells = Array(N).fill(null);
const SIFT_ORDER = [2, 1, 0]; // positions 3, 2, 1 (the last parent first)
const SIFT_NAME = ["the top", "the second parent", "the third parent"];

export default function HeapifyFromTheBottom({ slug }: { slug: string }) {
  const [left, setLeft] = useState<number[]>(START);
  const [done, setDone] = useState<boolean[]>([false, false, false]); // by position index 0..2
  const [sank, setSank] = useState<number[]>([0, 0, 0]);
  const [leftSwaps, setLeftSwaps] = useState<number | null>(null);
  const [right, setRight] = useState<Cells>(EMPTY);
  const [climbs, setClimbs] = useState<number[]>([]);
  const [shown, setShown] = useState<{ L: Cells; R: Cells }>({ L: START, R: EMPTY });

  // Playback of swap frames.
  const queue = useRef<Frame[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepMs = useRef(STEP_MS);
  const play = () => {
    if (timer.current) return;
    const tick = () => {
      const f = queue.current.shift();
      if (!f) {
        timer.current = null;
        return;
      }
      setShown((sh) => ({ ...sh, ...f }));
      timer.current = setTimeout(tick, stepMs.current);
    };
    tick();
  };
  const enqueue = (fs: Frame[], ms: number) => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || fs.length === 0) {
      if (fs.length) setShown((sh) => ({ ...sh, ...Object.assign({}, ...fs) }));
      return;
    }
    stepMs.current = ms;
    queue.current.push(...fs);
    play();
  };
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const nextCard = right.filter((x) => x !== null).length + 1; // 1..7, or 8 when full
  const queueFull = nextCard > N;
  const swapsRight = climbs.reduce((x, y) => x + y, 0);
  const lowerDone = done[1] && done[2];
  const built = done[0];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Cards 1 to 7 sit in a tree in increasing order, 1 on top. Turn them into a heap with the biggest on top: sift each parent down, last parent first, each time swapping with its bigger child until it fits. How many swaps?",
        options: ["4", "7", "10"],
        answer: 0,
      }}
      exploreHint="Tap the parents, last one first. Then build the other tree by inserting."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Bottom up took <strong>4 swaps</strong>: 3 and 2 sank one level each, then 1 sank two from the top. The four
            bottom spots have no children, so no sift started there. One by one took <strong>10</strong>: every new card
            was the biggest so far and climbed as high as the tree allowed.
          </p>
          <p>
            In any heap about half the spots are leaves and a quarter sit one level up, so building from the bottom stays
            under 2n swaps.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["heap-built", "inserted-all"]}>
          {(reach) => {
            const sift = (pos: number) => {
              if (locked || done[pos] || (pos === 0 && !lowerDone)) return;
              const a = [...left];
              const { frames, swaps } = siftDown(a, pos);
              setLeft(a);
              setDone(done.map((d, i) => d || i === pos));
              setSank(sank.map((x, i) => (i === pos ? swaps : x)));
              setLeftSwaps((leftSwaps ?? 0) + swaps);
              enqueue(
                frames.map((L) => ({ L })),
                STEP_MS,
              );
              if (pos === 0) reach("heap-built");
            };
            const insertOne = () => {
              if (locked || queueFull) return;
              const { heap, frames, climb } = insertCard(right, nextCard);
              setRight(heap);
              setClimbs([...climbs, climb]);
              enqueue(
                frames.map((R) => ({ R })),
                STEP_MS,
              );
              if (nextCard === N) reach("inserted-all");
            };
            const insertRest = () => {
              if (locked || queueFull) return;
              let h = right;
              const cl = [...climbs];
              const fs: Frame[] = [];
              for (let v = nextCard; v <= N; v++) {
                const r = insertCard(h, v);
                h = r.heap;
                cl.push(r.climb);
                fs.push(...r.frames.map((R) => ({ R })));
              }
              setRight(h);
              setClimbs(cl);
              enqueue(fs, Math.max(10, Math.floor(400 / fs.length)));
              reach("inserted-all");
            };

            const note = built
              ? "No work started at a leaf."
              : lowerDone
                ? "Top unlocks: its children are fixed."
                : "Parents: 3, then 2, then 1.";
            const rightLine = climbs.length
              ? `Climbs: ${climbs.map((c) => `+${c}`).join(" ")}`
              : "Next: 1 2 3 4 5 6 7";

            return (
              <div className={s.wrap}>
                <p className={s.rule}>Cards 1-7; the biggest must sit on top. Tap a parent to sift it down.</p>
                <div className={s.panels}>
                  <section className={s.panel} aria-label="Bottom up">
                    <h3 className={s.title}>Bottom up</h3>
                    <div className={s.tree}>
                      <Edges />
                      {PX.map((x, i) => {
                        const v = shown.L[i];
                        const parent = i < 3;
                        const style = { left: x - (parent ? 22 : 16), top: PY[i] - (parent ? 22 : 16) };
                        return parent ? null : (
                          <span key={i} className={s.leaf} style={style}>
                            {v}
                          </span>
                        );
                      })}
                      {SIFT_ORDER.map((pos) => {
                        const x = PX[pos];
                        const isDone = done[pos];
                        const blocked = pos === 0 && !lowerDone;
                        return (
                          <span key={pos}>
                            <Control
                              className={`${s.node} ${isDone ? s.done : ""} ${blocked ? s.blocked : ""}`}
                              style={{ left: x - 22, top: PY[pos] - 22 }}
                              aria-label={`Sift down ${SIFT_NAME[pos]}`}
                              disabled={locked || isDone || blocked}
                              onClick={() => sift(pos)}
                            >
                              {shown.L[pos]}
                            </Control>
                            {isDone && (
                              <span
                                className={s.badge}
                                style={{ left: pos === 1 ? x - 40 : x + 24, top: PY[pos] - 8 }}
                              >
                                ↓{sank[pos]}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                    <p className={s.swaps}>Swaps: {leftSwaps ?? "?"}</p>
                    <p className={s.note}>{note}</p>
                  </section>
                  <section className={s.panel} aria-label="One by one">
                    <h3 className={s.title}>One by one</h3>
                    <div className={s.tree}>
                      <Edges />
                      {PX.map((x, i) => {
                        const v = shown.R[i];
                        const big = i < 3;
                        const r = big ? 22 : 16;
                        return (
                          <span
                            key={i}
                            className={`${s.leaf} ${v === null ? s.ghost : ""} ${big ? s.bigcell : ""}`}
                            style={{ left: x - r, top: PY[i] - r }}
                          >
                            {v}
                          </span>
                        );
                      })}
                    </div>
                    <p className={s.swaps}>Swaps: {climbs.length ? swapsRight : "?"}</p>
                    <p className={s.note}>{rightLine}</p>
                    <Control className={s.tap} disabled={locked || queueFull} onClick={insertOne}>
                      Insert next
                    </Control>
                    <Control className={s.tap} disabled={locked || queueFull} onClick={insertRest}>
                      Insert the rest
                    </Control>
                  </section>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function Edges() {
  return (
    <svg viewBox="0 0 165 210" className={s.edges} aria-hidden="true">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1={PX[parentOf(i)]} y1={PY[parentOf(i)]} x2={PX[i]} y2={PY[i]} stroke="var(--line)" strokeWidth={2} />
      ))}
    </svg>
  );
}
