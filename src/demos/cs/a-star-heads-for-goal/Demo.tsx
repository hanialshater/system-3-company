"use client";

// A* as one change to the ranking. A 7x7 grid, start in the middle of the left edge, goal in the middle of the
// right edge. The learner settles cells one at a time (or watches the rest replayed in order), then removes the
// guess ("No guess") and sees the same grid flood. The reveal also waits for both runs with the wall on, so the
// learner sees the guided route match the flood's length where the guess (6 at S) is lower than the real route (10).
// Controls in DOM order: Settle next, Settle to goal, Wall, No guess, With guess (QA reaches all three milestones).
// Tie-break (disclosed in claim c1, used exactly here): lowest score first; equal scores, more steps taken
// first; still equal, the cell added to the frontier first. The goal counts when it is settled.
// One representation: the grid. The 2x2 table is a readout of what the learner has run.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
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
          const where = wall ? "With the wall" : "On the open grid";
          if (a && b) {
            lines.push(
              `${where}, no guess settled ${a.settled} cells and the guess ${b.settled}. Both routes were ${a.route} steps.`,
            );
          } else if (a) {
            lines.push(`${where}, your no-guess search settled ${a.settled} cells (route ${a.route}).`);
          } else if (b) {
            lines.push(`${where}, your guided search settled ${b.settled} cells (route ${b.route}).`);
          }
        }
        return (
          <>
            <p>{lines.join(" ")}</p>
            <p>
              The guess ranks cells nearer the goal first, so the search runs at it instead of flooding every
              direction. Look at the line above the grid: at S the guess said {GUESS_AT_S} steps left, and with the
              wall the route took {filled("guess", true)?.route ?? "more"}. The guess can be too low, never too high, so it
              never makes a shorter route look worse. That is why the guided route matched the flood&rsquo;s length in
              your table.
            </p>
            <p className="muted">When scores tie, the cell with more steps taken goes first.</p>
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
              reach(mode === "none" ? "plain-at-goal" : "guided-at-goal");
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
              let k = from;
              const ms = Math.max(4, Math.min(13, Math.floor(400 / (n - from))));
              timer.current = setInterval(() => {
                k += 1;
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
              const ghost = v.k > 0 ? run.order.slice(0, v.k) : v.ghost;
              const base = { mode, wall, ghost };
              if (atGoal) {
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
                  {v.mode === "guess"
                    ? `Score = steps so far + guess of steps left. Guess at S: ${GUESS_AT_S}.${done ? ` Route: ${done.route}.` : ""}`
                    : "Score = steps so far. Lowest score settles next."}
                </p>
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
                    const special = i === START || i === GOAL;
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
                        {i === START && <circle cx={x + CELL / 2} cy={y + CELL / 2} r={11} fill="var(--fg)" />}
                        {i === GOAL && <circle cx={x + CELL / 2} cy={y + CELL / 2} r={11} fill="none" stroke="var(--fg)" strokeWidth={2.5} />}
                        {special && (
                          <text
                            x={x + CELL / 2}
                            y={y + CELL / 2 + 4}
                            textAnchor="middle"
                            className={s.mark}
                            fill={i === START ? "var(--bg)" : "var(--fg)"}
                          >
                            {i === START ? "S" : "G"}
                          </text>
                        )}
                        {set && (
                          <text
                            x={special ? x + 4 : x + CELL / 2}
                            y={special ? y + 14 : y + CELL / 2 + 4}
                            textAnchor={special ? "start" : "middle"}
                            className={s.num}
                          >
                            {num(i)}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  {routeCells.length > 1 && (
                    <polyline
                      points={routeCells.map((i) => `${cx(i)},${cy(i)}`).join(" ")}
                      fill="none"
                      stroke="var(--fg)"
                      strokeWidth={4}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      opacity={0.85}
                    />
                  )}
                </svg>
                <p className={s.lab}>Numbers: settle order. Dashed: waiting to settle.</p>
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
                            {d ? `${d.settled} settled · route ${d.route}` : "?"}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <Row>
                  <Control className="tap" disabled={locked || busy || atGoal} onClick={settleNext}>
                    Settle next
                  </Control>
                  <Control className="tap" disabled={locked || busy || atGoal} onClick={settleToGoal}>
                    Settle to goal
                  </Control>
                </Row>
                <Row>
                  <Control
                    className="tap"
                    aria-pressed={v.wall}
                    disabled={locked || busy}
                    onClick={() => restart(v.mode, !v.wall)}
                  >
                    {v.wall ? "Wall: on" : "Wall: off"}
                  </Control>
                  <span className={s.lab}>Rank by</span>
                  <Control
                    className={`tap ${v.mode === "none" ? "active" : ""}`}
                    disabled={locked || busy || v.mode === "none"}
                    onClick={() => restart("none", v.wall)}
                  >
                    No guess
                  </Control>
                  <Control
                    className={`tap ${v.mode === "guess" ? "active" : ""}`}
                    disabled={locked || busy || v.mode === "guess"}
                    onClick={() => restart("guess", v.wall)}
                  >
                    With guess
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
