"use client";

// A* as one change to the ranking. A 7x7 grid, start in the middle of the left edge, goal in the middle of the
// right edge. The learner settles cells one at a time (or watches the rest replayed in order), then removes the
// guess ("No guess") and sees the same grid flood. The reveal also waits for both runs with the wall on, so the
// learner sees the guided route match the flood's length where the guess (6 at S) is lower than the real route (10).
// Controls in DOM order: Settle next, Settle to goal, Wall, Guess (QA reaches all three milestones).
// Tie-break (disclosed in claim c1, used exactly here): lowest score first; equal scores, more steps taken
// first; still equal, the cell added to the frontier first. The goal counts when it is settled.
// One representation: the grid. The 2x2 table is a readout of what the learner has run.
// v5 (W-267, phone fit at 390x844): compact stage. The five controls sit in one three-column grid of two rows
// (DOM order unchanged), the tie-break moved from the reveal onto the rule line, table cells read "46 cells ·
// route 10" so they stay on one line, gaps are tighter, and the reveal is 89 words (was 113). The grid, the table and the
// line under the table (all three named by the reveal) stay.
// v6 (W-282, fact-check pass 30 c1): milestone guided-at-goal is reached only by the guided run with the wall off,
// so the open-grid case the prediction asks about is always run before the reveal. Reveal at most 84 words (all four
// table cells filled): the approved cm-cs fallback cut (W-277) removed its last sentence.
// v7 (phone fit, build 6 measured crop 165 px): the controls stand in a column beside the grid, No guess / With guess
// are one toggle "Guess: on/off", the tie-break moved from the rule line to the legend, and grid labels are 16 units
// so the card can fit the grid down to the 10 px label floor. Measured crop 0 at 390x844; reveal unchanged.
// Wall and Guess stay enabled during a replay: pressed mid-run they finish it at once, then switch. Replays are
// paced by elapsed time, so they end within 400 ms on a slow device too.
// v8 (W-448, design review 2026-10-14): the route is drawn under the settle numbers, which carry a --bg-2 halo, so the
// line never strikes through them; S and G sit low in their cells with their numbers (1 and the last count) above
// them, and the route ends on the markers. Pressed toggles (Wall: on, Guess: on) take the kit's active style. The grid
// is a fixed 234 px in every phase (lesson CSS), so the kit's reveal rule no longer grows it past the stage. Text unchanged.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 7;
const CELL = 44;
const START = 3 * N + 0; // col 0, row 3
const GOAL = 3 * N + 6; // col 6, row 3
const WALL = new Set([2 * N + 3, 3 * N + 3, 4 * N + 3]); // col 3, rows 2-4

type Mode = "none" | "guess";
type Result = {
  order: number[]; // cells in the order they are settled (the goal is last)
  settleIdx: Map<number, number>;
  disc: Map<number, number>; // settled count at which a cell joined the frontier
  route: number[]; // cells from start to goal
};
type Done = { settled: number; route: number };

const cache = new Map<string, Result>();

function search(mode: Mode, wall: boolean): Result {
  const id = `${mode}-${wall}`;
  const hit = cache.get(id);
  if (hit) return hit;
  const gc = GOAL % N;
  const gr = Math.floor(GOAL / N);
  const h = (c: number) => (mode === "guess" ? Math.abs((c % N) - gc) + Math.abs(Math.floor(c / N) - gr) : 0);
  const g = new Map<number, number>([[START, 0]]);
  const par = new Map<number, number>();
  const seq = new Map<number, number>([[START, 0]]);
  const disc = new Map<number, number>([[START, 0]]);
  const settleIdx = new Map<number, number>();
  const order: number[] = [];
  let added = 1;
  let frontier = [START];
  while (frontier.length) {
    frontier.sort(
      (a, b) => g.get(a)! + h(a) - (g.get(b)! + h(b)) || g.get(b)! - g.get(a)! || seq.get(a)! - seq.get(b)!,
    );
    const cur = frontier.shift()!;
    settleIdx.set(cur, order.length);
    order.push(cur);
    if (cur === GOAL) break;
    const c = cur % N;
    const r = Math.floor(cur / N);
    for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nc = c + dc;
      const nr = r + dr;
      if (nc < 0 || nr < 0 || nc >= N || nr >= N) continue;
      const nx = nr * N + nc;
      if ((wall && WALL.has(nx)) || settleIdx.has(nx)) continue;
      const ng = g.get(cur)! + 1;
      if (!g.has(nx) || ng < g.get(nx)!) {
        g.set(nx, ng);
        par.set(nx, cur);
        if (!frontier.includes(nx)) {
          seq.set(nx, added++);
          disc.set(nx, order.length);
          frontier.push(nx);
        }
      }
    }
  }
  const route = [GOAL];
  while (par.has(route[0])) route.unshift(par.get(route[0])!);
  const res = { order, settleIdx, disc, route };
  cache.set(id, res);
  return res;
}

type View = { mode: Mode; wall: boolean; k: number; ghost: number[] };
const START_VIEW: View = { mode: "guess", wall: false, k: 0, ghost: [] };
const key = (mode: Mode, wall: boolean) => `${mode}-${wall ? "wall" : "open"}`;
const cx = (i: number) => (i % N) * CELL + CELL / 2;
const cy = (i: number) => Math.floor(i / N) * CELL + CELL / 2;
/** S and G markers sit low in their cell, so the settle number fits above them. */
const MARK_Y = 29;
const markY = (i: number) => Math.floor(i / N) * CELL + MARK_Y;
/** The guess at S: columns plus rows to the goal. */
const GUESS_AT_S = Math.abs((START % N) - (GOAL % N)) + Math.abs(Math.floor(START / N) - Math.floor(GOAL / N));

export default function AStarHeadsForGoal({ slug }: { slug: string }) {
  const [v, setV] = useState<View>(START_VIEW);
  const [table, setTable] = useState<Record<string, Done>>({});
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const finished = useRef(new Set<string>());

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const run = search(v.mode, v.wall);
  const total = run.order.length;
  const atGoal = v.k >= total;
  const filled = (mode: Mode, wall: boolean) => table[key(mode, wall)];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Open 7 x 7 grid. Start in the middle of the left edge, goal in the middle of the right edge, no diagonal moves. Cells are settled lowest score first, where score = steps so far + steps left. How many cells get settled, goal included?",
        options: ["7", "25", "49"],
        answer: 0,
      }}
      exploreHint="Settle to the goal. Then turn the wall on and run it with and without the guess."
      minInteractions={3}
      reveal={() => {
        const lines: string[] = [];
        for (const wall of [false, true]) {
          const a = filled("none", wall);
          const b = filled("guess", wall);
          const where = wall ? "Wall" : "Open grid";
          if (a && b) {
            lines.push(
              `${where}: no guess settled ${a.settled} cells, the guess ${b.settled}; both routes ${a.route} steps.`,
            );
          } else if (a) {
            lines.push(`${where}: no guess settled ${a.settled} cells (route ${a.route}).`);
          } else if (b) {
            lines.push(`${where}: the guess settled ${b.settled} cells (route ${b.route}).`);
          }
        }
        return (
          <>
            <p>{lines.join(" ")}</p>
            <p>
              The guess ranks cells nearer the goal first, so the search runs at it instead of flooding every
              direction. Look at the line under the table: at S the guess said {GUESS_AT_S} steps left; the wall
              route took {filled("guess", true)?.route ?? "more"}. The guess can be too low, never too high, so it
              never makes a shorter route look worse.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["plain-at-goal", "guided-at-goal", "wall-both"]}>
          {(reach) => {
            const finish = (mode: Mode, wall: boolean) => {
              const r = search(mode, wall);
              setTable((t) => ({ ...t, [key(mode, wall)]: { settled: r.order.length, route: r.route.length - 1 } }));
              if (mode === "none") reach("plain-at-goal");
              else if (!wall) reach("guided-at-goal");
              finished.current.add(key(mode, wall));
              if (finished.current.has(key("none", true)) && finished.current.has(key("guess", true))) reach("wall-both");
            };

            // Replay every settle in order from cell number `from`, <= 13 ms each and <= 400 ms in all.
            const replay = (mode: Mode, wall: boolean, from: number, base: Omit<View, "k">) => {
              if (timer.current) clearInterval(timer.current);
              const n = search(mode, wall).order.length;
              const reduced =
                typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
              if (reduced || from >= n) {
                setV({ ...base, k: n });
                finish(mode, wall);
                return;
              }
              setBusy(true);
              const ms = Math.max(4, Math.min(13, Math.floor(400 / (n - from))));
              // Paced by the clock, not by tick count, so a slow device still ends the replay on time (<= 400 ms).
              const t0 = performance.now();
              timer.current = setInterval(() => {
                const k = Math.min(n, from + Math.max(1, Math.floor((performance.now() - t0) / ms)));
                setV({ ...base, k });
                if (k >= n) {
                  if (timer.current) clearInterval(timer.current);
                  setBusy(false);
                  finish(mode, wall);
                }
              }, ms);
            };

            const settleNext = () => {
              if (locked || busy || atGoal) return;
              const k = v.k + 1;
              setV({ ...v, k });
              if (k >= total) finish(v.mode, v.wall);
            };
            const settleToGoal = () => {
              if (locked || busy || atGoal) return;
              replay(v.mode, v.wall, v.k, { mode: v.mode, wall: v.wall, ghost: v.ghost });
            };
            const restart = (mode: Mode, wall: boolean) => {
              // Pressed during a replay: finish that run at once (its table cell fills), then switch.
              const cut = busy;
              if (cut) {
                if (timer.current) clearInterval(timer.current);
                setBusy(false);
                finish(v.mode, v.wall);
              }
              const ended = atGoal || cut;
              const ghost = ended ? run.order : v.k > 0 ? run.order.slice(0, v.k) : v.ghost;
              const base = { mode, wall, ghost };
              if (ended) {
                setV({ ...base, k: 0 });
                replay(mode, wall, 0, base);
              } else {
                if (timer.current) clearInterval(timer.current);
                setV({ ...base, k: 0 });
              }
            };

            const settledNow = new Set(run.order.slice(0, v.k));
            const num = (i: number) => (run.settleIdx.get(i) ?? 0) + 1;
            const isFrontier = (i: number) =>
              v.k > 0 &&
              !settledNow.has(i) &&
              run.disc.has(i) &&
              (run.disc.get(i) as number) <= v.k;
            const routeCells = atGoal ? run.route : [];
            const done = filled(v.mode, v.wall);
            const label = done
              ? `${v.mode === "guess" ? "With guess" : "No guess"}: ${done.settled} cells settled, route ${done.route} steps`
              : `${v.mode === "guess" ? "With guess" : "No guess"}: ${v.k} cells settled`;

            return (
              <div className={s.wrap}>
                <p className={s.rule}>
                  {v.mode === "guess" ? "Score = steps so far + guess of steps left." : "Score = steps so far."}
                </p>
                <div className={s.top}>
                <svg
                  viewBox={`0 0 ${N * CELL} ${N * CELL}`}
                  className={`stage-svg ${s.grid}`}
                  role="img"
                  aria-label={label}
                  data-settled={v.k}
                >
                  <defs>
                    <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="8" height="8" fill="var(--fg)" />
                      <line x1="0" y1="0" x2="0" y2="8" stroke="var(--bg-2)" strokeWidth="2" />
                    </pattern>
                  </defs>
                  {Array.from({ length: N * N }, (_, i) => {
                    const x = (i % N) * CELL;
                    const y = Math.floor(i / N) * CELL;
                    const wallOn = v.wall && WALL.has(i);
                    const set = settledNow.has(i);
                    const fr = isFrontier(i);
                    return (
                      <g key={i}>
                        <rect
                          x={x + 1}
                          y={y + 1}
                          width={CELL - 2}
                          height={CELL - 2}
                          rx={4}
                          fill={
                            wallOn
                              ? "url(#hatch)"
                              : set
                                ? "color-mix(in srgb, var(--domain) 45%, var(--bg-2))"
                                : "var(--bg-2)"
                          }
                          stroke={fr ? "var(--fg)" : "var(--line)"}
                          strokeDasharray={fr ? "4 3" : undefined}
                          strokeWidth={fr ? 1.5 : 1}
                        />
                      </g>
                    );
                  })}
                  {routeCells.length > 1 && (
                    <polyline
                      points={routeCells.map((i) => `${cx(i)},${i === START || i === GOAL ? markY(i) : cy(i)}`).join(" ")}
                      fill="none"
                      stroke="var(--fg)"
                      strokeWidth={4}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      opacity={0.85}
                    />
                  )}
                  {/* S and G markers over the route's ends */}
                  {[START, GOAL].map((i) => (
                    <g key={`m${i}`}>
                      <circle
                        cx={cx(i)}
                        cy={markY(i)}
                        r={10}
                        fill={i === START ? "var(--fg)" : "var(--bg-2)"}
                        stroke="var(--fg)"
                        strokeWidth={i === START ? 0 : 2.5}
                      />
                      <text x={cx(i)} y={markY(i) + 5} textAnchor="middle" className={s.mark} fill={i === START ? "var(--bg)" : "var(--fg)"}>
                        {i === START ? "S" : "G"}
                      </text>
                    </g>
                  ))}
                  {/* Settle numbers on top of the route, each with a halo, so the line never strikes through them.
                      On S and G the number sits above the marker, which is drawn lower in its cell. */}
                  {run.order.slice(0, v.k).map((i) => {
                    const special = i === START || i === GOAL;
                    return (
                      <text
                        key={`n${i}`}
                        x={cx(i)}
                        y={special ? Math.floor(i / N) * CELL + 15 : cy(i) + 5}
                        textAnchor="middle"
                        className={s.num}
                      >
                        {num(i)}
                      </text>
                    );
                  })}
                </svg>
                <div className={s.controls}>
                  <Control className="tap" disabled={locked || busy || atGoal} onClick={settleNext}>
                    Settle next
                  </Control>
                  <Control className="tap" disabled={locked || busy || atGoal} onClick={settleToGoal}>
                    Settle to goal
                  </Control>
                  <Control
                    className={`tap ${v.wall ? "active" : ""}`}
                    aria-pressed={v.wall}
                    disabled={locked}
                    onClick={() => restart(v.mode, !v.wall)}
                  >
                    {v.wall ? "Wall: on" : "Wall: off"}
                  </Control>
                  <Control
                    className={`tap ${v.mode === "guess" ? "active" : ""}`}
                    aria-pressed={v.mode === "guess"}
                    disabled={locked}
                    onClick={() => restart(v.mode === "guess" ? "none" : "guess", v.wall)}
                  >
                    {v.mode === "guess" ? "Guess: on" : "Guess: off"}
                  </Control>
                </div>
                </div>
                <p className={s.lab}>Numbers: settle order. Dashed: waiting. Ties: more steps taken first.</p>
                <div className={s.table} role="group" aria-label="Cells settled in each run">
                  <span />
                  <span className={s.th}>Open</span>
                  <span className={s.th}>Wall</span>
                  {(["none", "guess"] as const).map((m) => (
                    <div key={m} className={s.tr}>
                      <span className={s.th}>{m === "none" ? "No guess" : "With guess"}</span>
                      {[false, true].map((w) => {
                        const d = filled(m, w);
                        return (
                          <span key={String(w)} className={`${s.td} ${d ? s.on : ""}`}>
                            {d ? `${d.settled} cells · route ${d.route}` : "?"}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <p className={s.guess} data-testid="guess-vs-route">
                  {filled("guess", true)
                    ? `Guess at S: ${GUESS_AT_S}. Real route with the wall: ${filled("guess", true)!.route}.`
                    : `Guess at S: ${GUESS_AT_S}. Real route with the wall: ?`}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
