"use client";

// Knight's tour, side by side (company/design/specs/fewest-exits-first-tour.md). Two boards, one knight each,
// same corner start (0,0) = top-left, same fixed move list. Rule A takes the first legal move in that order;
// rule B (Warnsdorff) takes the legal square with the fewest onward moves to unvisited squares, ties to the
// first in the order. One shared "Move" keeps the boards in step, so the moment they part (move 2) is seen.
// 5x5: A 21 (stuck at (1,3)), B 25. 8x8: A 36, B 64 (claim c1, re-run in node by the builder).

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Rule = "A" | "B";
type Size = 5 | 8;
type Sq = [number, number]; // (column, row), row 0 at the top

// (right, down), in the fixed order shown by the glyph (1-8).
const MOVES: Sq[] = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

const legalFrom = (n: number, [c, r]: Sq, seen: Set<number>): Sq[] =>
  MOVES.map(([dc, dr]) => [c + dc, r + dr] as Sq).filter(
    ([x, y]) => x >= 0 && y >= 0 && x < n && y < n && !seen.has(y * n + x),
  );

// Onward moves from a candidate square: legal moves to unvisited squares (the current square is visited).
const onward = (n: number, sq: Sq, seen: Set<number>) => legalFrom(n, sq, seen).length;

function choose(n: number, rule: Rule, cur: Sq, seen: Set<number>): { legal: Sq[]; badges: number[]; pick: number } {
  const legal = legalFrom(n, cur, seen);
  const badges = legal.map((sq) => onward(n, sq, seen));
  let pick = legal.length ? 0 : -1;
  if (rule === "B") {
    for (let i = 1; i < legal.length; i++) if (badges[i] < badges[pick]) pick = i;
  }
  return { legal, badges, pick };
}

function tour(n: number, rule: Rule): Sq[] {
  const path: Sq[] = [[0, 0]];
  const seen = new Set([0]);
  for (;;) {
    const cur = path[path.length - 1];
    const { legal, pick } = choose(n, rule, cur, seen);
    if (pick < 0) return path;
    const nx = legal[pick];
    seen.add(nx[1] * n + nx[0]);
    path.push(nx);
  }
}

const TOURS: Record<Size, Record<Rule, Sq[]>> = {
  5: { A: tour(5, "A"), B: tour(5, "B") },
  8: { A: tour(8, "A"), B: tour(8, "B") },
};
const endOf = (n: Size, r: Rule) => TOURS[n][r].length - 1;
const lastT = (n: Size) => Math.max(endOf(n, "A"), endOf(n, "B"));

const reducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const W = 170;

function Board({ n, rule, t }: { n: Size; rule: Rule; t: number }) {
  const path = TOURS[n][rule];
  const steps = Math.min(t, path.length - 1);
  const seen = new Set<number>();
  const num = new Map<number, number>();
  path.slice(0, steps + 1).forEach(([c, r], i) => {
    seen.add(r * n + c);
    num.set(r * n + c, i + 1);
  });
  const cur = path[steps];
  const ended = steps === path.length - 1;
  const stuck = ended && seen.size < n * n;
  const { legal, badges, pick } = ended ? { legal: [], badges: [], pick: -1 } : choose(n, rule, cur, seen);
  const cell = W / n;
  const small = n === 8;
  const hatch = `hatch-${rule}-${n}`;
  const label = stuck
    ? `Rule ${rule}: stuck after ${seen.size} squares, ${n * n - seen.size} unvisited`
    : ended
      ? `Rule ${rule}: visited all ${seen.size} squares`
      : `Rule ${rule}: ${seen.size} squares visited`;

  return (
    <svg viewBox={`0 0 ${W} ${W}`} className={`stage-svg ${s.board}`} role="img" aria-label={label} data-visited={seen.size}>
      <defs>
        <pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="var(--bg-2)" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--muted)" strokeWidth="1.5" />
        </pattern>
      </defs>
      {Array.from({ length: n * n }, (_, i) => {
        const c = i % n;
        const r = Math.floor(i / n);
        const v = seen.has(i);
        const isCur = c === cur[0] && r === cur[1];
        return (
          <g key={i}>
            <rect
              x={c * cell + 0.5}
              y={r * cell + 0.5}
              width={cell - 1}
              height={cell - 1}
              fill={
                v
                  ? "color-mix(in srgb, var(--domain) 40%, var(--bg-2))"
                  : stuck
                    ? `url(#${hatch})`
                    : (c + r) % 2
                      ? "color-mix(in srgb, var(--line) 45%, var(--bg-2))"
                      : "var(--bg-2)"
              }
              stroke="var(--line)"
              strokeWidth={0.5}
            />
            {v && !isCur && (
              <text
                x={c * cell + cell / 2}
                y={r * cell + cell / 2 + (small ? 3.5 : 4)}
                textAnchor="middle"
                className={small ? s.numS : s.num}
              >
                {num.get(i)}
              </text>
            )}
          </g>
        );
      })}
      {legal.map(([c, r], i) => (
        <g key={`l${c}-${r}`}>
          <rect
            x={c * cell + 2}
            y={r * cell + 2}
            width={cell - 4}
            height={cell - 4}
            rx={3}
            fill="none"
            stroke={i === pick ? "var(--fg)" : "var(--muted)"}
            strokeWidth={i === pick ? 2 : 1}
            strokeDasharray={i === pick ? undefined : "3 2"}
          />
          {!small && (
            <>
              <circle cx={c * cell + cell - 9} cy={r * cell + 9} r={6.5} fill="var(--fg)" />
              <text x={c * cell + cell - 9} y={r * cell + 12} textAnchor="middle" className={s.badge}>
                {badges[i]}
              </text>
            </>
          )}
        </g>
      ))}
      <text
        x={cur[0] * cell + cell / 2}
        y={cur[1] * cell + cell / 2 + cell * 0.25}
        textAnchor="middle"
        className={s.knight}
        style={{ fontSize: `${cell * 0.72}px` }}
      >
        {"♞︎"}
      </text>
      {stuck && (
        <circle
          cx={cur[0] * cell + cell / 2}
          cy={cur[1] * cell + cell / 2}
          r={cell / 2 - 1.5}
          fill="none"
          stroke="var(--bad)"
          strokeWidth={2}
        />
      )}
    </svg>
  );
}

// The fixed order, drawn: a knight with its eight targets numbered 1-8.
function OrderGlyph() {
  const g = 7;
  return (
    <svg viewBox={`0 0 ${5 * g} ${5 * g}`} className={s.glyph} aria-label="Fixed move order, 1 to 8" role="img">
      <rect x={0} y={0} width={5 * g} height={5 * g} fill="var(--bg-2)" stroke="var(--line)" strokeWidth={0.5} />
      <text x={2.5 * g} y={2.5 * g + 2.5} textAnchor="middle" className={s.gk}>
        {"♞︎"}
      </text>
      {MOVES.map(([dc, dr], i) => (
        <text key={i} x={(2 + dc) * g + g / 2} y={(2 + dr) * g + g / 2 + 2} textAnchor="middle" className={s.gn}>
          {i + 1}
        </text>
      ))}
    </svg>
  );
}

type Table = Partial<Record<`${Size}-${Rule}`, number>>;

export default function FewestExitsFirstTour({ slug }: { slug: string }) {
  const [n, setN] = useState<Size>(5);
  const [t, setT] = useState(0);
  const [table, setTable] = useState<Table>({});
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const end = lastT(n);
  const allEnded = t >= end;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You set a knight in the corner of a 5×5 board to visit every square once. Rule A: take the first legal move in a fixed order. Rule B: go to the square with the fewest onward moves. How many squares does each visit before getting stuck?",
        options: ["A 25 and B 25", "A 21 and B 25", "A 25 and B 21"],
        answer: 1,
      }}
      exploreHint="Move both knights and watch where the rules part."
      minInteractions={1}
      reveal={() => {
        const a5 = table["5-A"] ?? 21;
        const b5 = table["5-B"] ?? 25;
        const a8 = table["8-A"];
        const b8 = table["8-B"];
        return (
          <>
            <p>
              Rule A got stuck after {a5} squares. It left the bottom-left corner for last, and by then no move reached
              it. Rule B always stepped to the square with the fewest ways on, so awkward squares were used while they
              could still be reached, and it visited all {b5}.
              {a8 !== undefined && b8 !== undefined ? ` On 8×8: A ${a8}, B ${b8}.` : ""}
            </p>
            <p>
              The rule is a rule of thumb, not a guarantee: it can fail on some boards and starts.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["both-ended-5x5"]}>
          {(reach) => {
            const record = (size: Size, time: number) => {
              setTable((tb) => {
                const next = { ...tb };
                (["A", "B"] as const).forEach((r) => {
                  if (time >= endOf(size, r)) next[`${size}-${r}`] = TOURS[size][r].length;
                });
                return next;
              });
              if (size === 5 && time >= lastT(5)) reach("both-ended-5x5");
            };

            const replay = (size: Size, from: number) => {
              if (timer.current) clearInterval(timer.current);
              const to = lastT(size);
              if (reducedMotion() || from >= to) {
                setT(to);
                record(size, to);
                return;
              }
              setBusy(true);
              const ms = Math.max(4, Math.min(16, Math.floor(380 / (to - from))));
              let k = from;
              timer.current = setInterval(() => {
                k += 1;
                setT(k);
                record(size, k);
                if (k >= to) {
                  if (timer.current) clearInterval(timer.current);
                  setBusy(false);
                }
              }, ms);
            };

            const move = () => {
              if (locked || busy || allEnded) return;
              const k = t + 1;
              setT(k);
              record(n, k);
            };
            const moveAll = () => {
              if (locked || busy || allEnded) return;
              replay(n, t);
            };
            const toggle = () => {
              if (locked || busy) return;
              const next: Size = n === 5 ? 8 : 5;
              setN(next);
              if (allEnded) {
                setT(0);
                replay(next, 0);
              } else {
                if (timer.current) clearInterval(timer.current);
                setT(0);
              }
            };

            const lane = (rule: Rule) => {
              const path = TOURS[n][rule];
              const steps = Math.min(t, path.length - 1);
              const visited = steps + 1;
              const stuck = steps === path.length - 1 && path.length < n * n;
              return (
                <div className={s.lane}>
                  <div className={s.title}>
                    <span className={s.rule}>
                      {rule === "A" ? "A: first legal move in the fixed order" : "B: fewest onward moves"}
                    </span>
                    {rule === "A" && <OrderGlyph />}
                  </div>
                  <Board n={n} rule={rule} t={t} />
                  <p className={s.visited}>
                    Visited: <strong>{visited}</strong>
                    {stuck && <span className={s.stuck}> · stuck at {visited}</span>}
                  </p>
                </div>
              );
            };

            return (
              <div className={s.wrap}>
                <div className={s.boards}>
                  {lane("A")}
                  {lane("B")}
                </div>
                <div className={s.table} role="group" aria-label="Squares visited in each finished run">
                  <span />
                  <span className={s.th}>A</span>
                  <span className={s.th}>B</span>
                  {([5, 8] as const).map((size) => (
                    <div key={size} className={s.tr}>
                      <span className={s.th}>
                        {size}×{size}
                      </span>
                      {(["A", "B"] as const).map((r) => {
                        const d = table[`${size}-${r}`];
                        return (
                          <span key={r} className={`${s.td} ${d !== undefined ? s.on : ""}`}>
                            {d ?? "?"}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <Row>
                  <Control className="tap" disabled={locked || busy || allEnded} onClick={move}>
                    Move
                  </Control>
                  <Control className="tap" disabled={locked || busy || allEnded} onClick={moveAll}>
                    Move until stuck
                  </Control>
                  <Control className="tap" aria-pressed={n === 8} disabled={locked || busy} onClick={toggle}>
                    {n === 5 ? "Board: 5×5" : "Board: 8×8"}
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
