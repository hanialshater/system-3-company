"use client";

// Bubble sort's turtles and rabbits. Two lanes run in lockstep under one control: every press is one sweep
// (left to right, swap out-of-order neighbours) in each lane that is not done. A lane is done after a sweep
// with no swap. Each sweep appends a row, so each lane becomes a ladder; a thick line follows the 1 in X and
// the 6 in Y from row to row. X = 2 3 4 5 6 1 needs 5 swapping sweeps; Y = 6 1 2 3 4 5 needs 1.
// One representation: the two ladders (the side-by-side format, spec company/design/specs/small-values-crawl-left.md).

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Lane = {
  name: string;
  start: number[];
  track: number; // the value whose path is drawn thick
  rows: number[][]; // row 0 = start, then one row per sweep, the last one is the no-swap sweep
  moved: Set<number>[]; // per row, the positions whose card changed in that sweep
  swapping: number; // sweeps that made at least one swap
};

function ladder(name: string, start: number[], track: number): Lane {
  const a = [...start];
  const rows = [[...a]];
  const moved: Set<number>[] = [new Set()];
  let swapping = 0;
  for (;;) {
    let swapped = false;
    const before = [...a];
    for (let i = 0; i < a.length - 1; i++) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
      }
    }
    rows.push([...a]);
    moved.push(new Set(a.map((v, i) => (v !== before[i] ? i : -1)).filter((i) => i >= 0)));
    if (!swapped) break;
    swapping += 1;
  }
  return { name, start, track, rows, moved, swapping };
}

const X = ladder("X", [2, 3, 4, 5, 6, 1], 1);
const Y = ladder("Y", [6, 1, 2, 3, 4, 5], 6);
const LANES = [X, Y];
const END = Math.max(X.rows.length, Y.rows.length) - 1; // sweeps until both lanes are done (6)

const CARD_W = 26;
const CARD_H = 20;
const GAP = 3;
const PITCH = 30;
const TOP = 24;
const LANE_X = [6, 183];
const cx = (lane: number, pos: number) => LANE_X[lane] + pos * (CARD_W + GAP) + CARD_W / 2;
const rowY = (r: number) => TOP + r * PITCH;
const show = (a: number[]) => a.join(" ");

const shownRows = (l: Lane, k: number) => Math.min(k, l.rows.length - 1) + 1;
const isDone = (l: Lane, k: number) => k >= l.rows.length - 1;
const swapsSoFar = (l: Lane, k: number) => Math.min(k, l.swapping);

export default function SmallValuesCrawlLeft({ slug }: { slug: string }) {
  const [k, setK] = useState(0); // sweeps pressed so far (shared by both lanes)
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const bothDone = k >= END;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You bubble-sort six cards. Bubble sort sweeps left to right, swapping neighbours that are out of order, and repeats until a sweep makes no swap. List X is ${show(X.start)}; list Y is ${show(Y.start)}. Which needs more sweeps that make at least one swap?`,
        options: ["X (the 1 at the end)", "Y (the 6 at the start)", "The same"],
        answer: 0,
      }}
      exploreHint="Sweep both lanes and watch where the 1 and the 6 go."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            X took {X.swapping} sweeps that swapped; Y took {Y.swapping}. In Y, one sweep carried the 6 past every card:
            its line crosses the lane in a single rung. In X, the 1 could only move one place per sweep, so its line is a
            slow diagonal.
          </p>
          <p>
            A sweep carries a large value all the way right but moves a small value left only one place. Small values near
            the end (turtles) set the cost; large ones near the start (rabbits) are cheap. Comb sort fixes this by first
            comparing items far apart, with a gap that shrinks.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["x-done", "y-done"]}>
          {(reach) => {
            const mark = (kk: number) => {
              if (isDone(X, kk)) reach("x-done");
              if (isDone(Y, kk)) reach("y-done");
            };
            const sweep = () => {
              if (locked || busy || bothDone) return;
              const kk = k + 1;
              setK(kk);
              mark(kk);
            };
            const toEnd = () => {
              if (locked || busy || bothDone) return;
              const reduced =
                typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
              if (reduced) {
                setK(END);
                mark(END);
                return;
              }
              // replay every remaining sweep in order, one row per 50 ms (<= 300 ms)
              setBusy(true);
              let kk = k;
              timer.current = setInterval(() => {
                kk += 1;
                setK(kk);
                mark(kk);
                if (kk >= END) {
                  if (timer.current) clearInterval(timer.current);
                  timer.current = null;
                  setBusy(false);
                }
              }, 50);
            };

            const rows = Math.max(...LANES.map((l) => shownRows(l, k)));
            const height = rowY(rows) + 2;

            return (
              <div className={s.wrap}>
                <p className={s.rule}>
                  One sweep: left to right, swap neighbours that are out of order. Stop after a sweep with no swap.
                </p>
                <svg
                  viewBox={`0 0 360 ${height}`}
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={LANES.map(
                    (l) =>
                      `${l.name}: ${swapsSoFar(l, k)} swapping sweeps${isDone(l, k) ? ", done" : ""}, the ${l.track} is at place ${
                        l.rows[shownRows(l, k) - 1].indexOf(l.track) + 1
                      }`,
                  ).join("; ")}
                  data-sweeps={k}
                >
                  {LANES.map((l, li) => {
                    const n = shownRows(l, k);
                    const done = isDone(l, k);
                    const pathOf = (v: number) =>
                      l.rows.slice(0, n).map((row, r) => ({ x: cx(li, row.indexOf(v)), r }));
                    const segs = (v: number) =>
                      pathOf(v)
                        .slice(1)
                        .map((p, i) => {
                          const q = pathOf(v)[i];
                          return `M${q.x},${rowY(q.r) + CARD_H} L${p.x},${rowY(p.r)}`;
                        })
                        .join(" ");
                    return (
                      <g key={l.name}>
                        <text x={LANE_X[li] + 85} y={14} textAnchor="middle" className={s.head}>
                          {l.name}
                        </text>
                        {l.rows.slice(0, n).map((row, r) => {
                          const noSwap = done && r === l.rows.length - 1;
                          return (
                            <g key={r} opacity={noSwap ? 0.45 : 1}>
                              {row.map((v, i) => {
                                const hit = l.moved[r].has(i);
                                const tracked = v === l.track;
                                return (
                                  <g key={i}>
                                    <rect
                                      x={cx(li, i) - CARD_W / 2}
                                      y={rowY(r)}
                                      width={CARD_W}
                                      height={CARD_H}
                                      rx={4}
                                      fill="var(--bg-2)"
                                      stroke={hit ? "var(--domain)" : "var(--line)"}
                                      strokeWidth={hit ? 2.5 : 1}
                                    />
                                    <text
                                      x={cx(li, i)}
                                      y={rowY(r) + 15}
                                      textAnchor="middle"
                                      className={`${s.v} ${tracked ? s.vTrack : ""} ${noSwap ? s.vMuted : ""}`}
                                    >
                                      {v}
                                    </text>
                                  </g>
                                );
                              })}
                            </g>
                          );
                        })}
                        {l.start
                          .filter((v) => v !== l.track)
                          .map((v) => (
                            <path key={`f${v}`} d={segs(v)} fill="none" stroke="var(--line)" strokeWidth={1} />
                          ))}
                        <path d={segs(l.track)} fill="none" stroke="var(--fg)" strokeWidth={3} strokeLinecap="round" />
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Readout label="X swapping sweeps" value={`${swapsSoFar(X, k)}${isDone(X, k) ? " · done" : ""}`} />
                  <Readout label="Y swapping sweeps" value={`${swapsSoFar(Y, k)}${isDone(Y, k) ? " · done" : ""}`} />
                </Row>
                <Row>
                  <Control className="tap" disabled={locked || busy || bothDone} onClick={sweep}>
                    Sweep both
                  </Control>
                  <Control className="tap" disabled={locked || busy || bothDone} onClick={toEnd}>
                    Sweep to the end
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
