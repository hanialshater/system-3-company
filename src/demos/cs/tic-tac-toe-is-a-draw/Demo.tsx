"use client";

// One endgame (X to move, 3 empty squares) drawn as a tree: top board, three boards after X's move,
// six finished games. The learner scores the three middle boards (O picks the worst result for X), then
// the top board (X picks the best). A second row bridges to the question: the empty board and X's three
// kinds of first move (corner, edge, centre). Tapping a first move scores it with the same two rules,
// run here by a full minimax search; tapping the empty board then lets X pick the best: a draw.
// The reveal is gated on that empty-board score. Everything is computed, nothing is random.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
];
// X O X / O O . / . X .   X to move; empty: 5, 6, 8
const START = "XOXOO..X.";

const put = (b: string, i: number, c: string) => b.slice(0, i) + c + b.slice(i + 1);
const winLine = (b: string) => LINES.find((l) => b[l[0]] !== "." && b[l[0]] === b[l[1]] && b[l[1]] === b[l[2]]) ?? null;
const result = (b: string): 1 | 0 | -1 => {
  const l = winLine(b);
  return l ? (b[l[0]] === "X" ? 1 : -1) : 0;
};
const WORD = { 1: "X wins", 0: "Draw", [-1]: "O wins" } as const;
const TONE = { 1: "good", 0: "even", [-1]: "bad" } as const;

type Leaf = { board: string; forced: number | null; value: 1 | 0 | -1 };
type Mid = { move: number; label: string; board: string; leaves: Leaf[]; value: 1 | 0 | -1; pick: number };

const EMPTY = [5, 6, 8];
const NAMES: Record<number, string> = { 5: "right middle", 6: "bottom left", 8: "bottom right" };
const MIDS: Mid[] = EMPTY.map((m) => {
  const board = put(START, m, "X");
  const leaves: Leaf[] = EMPTY.filter((x) => x !== m).map((o) => {
    const afterO = put(board, o, "O");
    if (winLine(afterO)) return { board: afterO, forced: null, value: result(afterO) };
    const last = EMPTY.find((x) => x !== m && x !== o)!; // X's last move is forced
    const end = put(afterO, last, "X");
    return { board: end, forced: last, value: result(end) };
  });
  const value = Math.min(...leaves.map((l) => l.value)) as 1 | 0 | -1;
  return { move: m, label: NAMES[m], board, leaves, value, pick: leaves.findIndex((l) => l.value === value) };
});
const TOP_VALUE = Math.max(...MIDS.map((m) => m.value)) as 1 | 0 | -1;
const TOP_PICK = MIDS.findIndex((m) => m.value === TOP_VALUE);

// Full search for the bridge row: X maximises, O minimises, win +1, draw 0, loss -1 (the same two rules).
const MEMO = new Map<string, 1 | 0 | -1>();
function solve(b: string, toMove: "X" | "O"): 1 | 0 | -1 {
  const key = b + toMove;
  const hit = MEMO.get(key);
  if (hit !== undefined) return hit;
  let v: 1 | 0 | -1;
  if (winLine(b)) v = result(b);
  else if (!b.includes(".")) v = 0;
  else {
    const vals: number[] = [];
    for (let i = 0; i < 9; i++) if (b[i] === ".") vals.push(solve(put(b, i, toMove), toMove === "X" ? "O" : "X"));
    v = (toMove === "X" ? Math.max(...vals) : Math.min(...vals)) as 1 | 0 | -1;
  }
  MEMO.set(key, v);
  return v;
}
// The other six first moves are mirror or rotated copies of these three.
const FIRSTS = [
  { at: 0, label: "corner" },
  { at: 1, label: "edge" },
  { at: 4, label: "centre" },
].map((f) => ({ ...f, board: put(".........", f.at, "X"), value: solve(put(".........", f.at, "X"), "O") }));
const EMPTY_VALUE = Math.max(...FIRSTS.map((f) => f.value)) as 1 | 0 | -1;
const W2 = 360;
const H2 = 118;
const FCOLS = [168, 246, 324];

const COLS = [60, 180, 300];
const W = 360;
const H = 338;

function Board({ x, y, size, b, ring, dashed }: { x: number; y: number; size: number; b: string; ring?: number | null; dashed?: number | null }) {
  const c = size / 3;
  const wl = winLine(b);
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} fill="var(--bg-2)" />
      {wl?.map((i) => (
        <rect key={i} x={x + (i % 3) * c} y={y + Math.floor(i / 3) * c} width={c} height={c} fill={b[i] === "X" ? "var(--good)" : "var(--bad)"} opacity={0.28} />
      ))}
      {[1, 2].map((k) => (
        <g key={k}>
          <line x1={x + k * c} x2={x + k * c} y1={y} y2={y + size} stroke="var(--muted)" strokeWidth="1" />
          <line x1={x} x2={x + size} y1={y + k * c} y2={y + k * c} stroke="var(--muted)" strokeWidth="1" />
        </g>
      ))}
      {[...b].map((ch, i) =>
        ch === "." ? null : (
          <text key={i} x={x + (i % 3) * c + c / 2} y={y + Math.floor(i / 3) * c + c / 2 + c * 0.28} textAnchor="middle" fontSize={c * 0.8} fontWeight={800} fill="var(--fg)">
            {ch}
          </text>
        ),
      )}
      {ring != null && (
        <rect x={x + (ring % 3) * c + 1} y={y + Math.floor(ring / 3) * c + 1} width={c - 2} height={c - 2} rx={3} fill="none" stroke="var(--domain)" strokeWidth="2.5" />
      )}
      {dashed != null && (
        <rect x={x + (dashed % 3) * c + 1} y={y + Math.floor(dashed / 3) * c + 1} width={c - 2} height={c - 2} rx={2} fill="none" stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="3 2" />
      )}
      <rect x={x} y={y} width={size} height={size} fill="none" stroke="var(--fg)" strokeWidth="1.5" />
    </g>
  );
}

function Badge({ x, y, w, v }: { x: number; y: number; w: number; v: 1 | 0 | -1 | null }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={22} rx={6} fill="var(--bg-2)" stroke="var(--line)" />
      <text x={x + w / 2} y={y + 15} textAnchor="middle" className={v === null ? s.q : s[TONE[v]]}>
        {v === null ? "?" : WORD[v]}
      </text>
    </g>
  );
}

export default function TicTacToeIsADraw({ slug }: { slug: string }) {
  // 0-2 middle boards, 3 top board, 4-6 first moves, 7 empty board
  const [scored, setScored] = useState<boolean[]>(Array(8).fill(false));
  const n = scored.filter(Boolean).length;
  const midsDone = scored[0] && scored[1] && scored[2];
  const firstsDone = scored[4] && scored[5] && scored[6];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "If both players play perfectly from an empty board, who wins?",
        options: ["X, who moves first", "O", "Nobody, it is a draw"],
        answer: 2,
      }}
      exploreHint="Score the endgame tree, then the empty board below it."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            In your endgame, X had two moves with a win underneath (struck out), but in each O&rsquo;s best reply took it
            away. That board came out a <strong>draw</strong>.
          </p>
          <p>
            The bottom row is the same two rules, run by computer from the empty board. Corner, edge and centre each scored a
            draw, so X&rsquo;s best first move is a <strong>draw</strong>: perfect players always draw.
          </p>
          <p className="muted">That search covers all 255,168 possible games. Chess has far too many games to finish this way.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["o-scored", "top-scored", "empty-scored"]}>
          {(reach) => {
            const score = (i: number) => {
              if (locked || scored[i]) return;
              if (i === 3 && !midsDone) return;
              if (i >= 4 && i <= 6 && !scored[3]) return;
              if (i === 7 && !firstsDone) return;
              setScored(scored.map((v, k) => (k === i ? true : v)));
              reach(i === 7 ? "empty-scored" : i === 3 ? "top-scored" : i < 3 ? "o-scored" : "first-move");
            };
            const rect2 = (cx: number, y: number, w: number, h: number) => ({
              left: `${((cx - w / 2) / W2) * 100}%`,
              top: `${(y / H2) * 100}%`,
              width: `${(w / W2) * 100}%`,
              height: `${(h / H2) * 100}%`,
            });
            const midValue = (i: number) => (scored[i] ? MIDS[i].value : null);
            const rect = (cx: number, y: number, w: number, h: number) => ({
              left: `${((cx - w / 2) / W) * 100}%`,
              top: `${(y / H) * 100}%`,
              width: `${(w / W) * 100}%`,
              height: `${(h / H) * 100}%`,
            });
            return (
              <div className={s.wrap}>
                <p className={s.rule}>Tap a dashed board: O picks the worst result for X; X picks the best.</p>
                <div className={s.tree}>
                  <svg
                    viewBox={`0 0 ${W} ${H}`}
                    className="stage-svg"
                    role="img"
                    aria-label={`Top: X to move, value ${scored[3] ? WORD[TOP_VALUE] : "not scored"}`}
                  >
                    {/* lines first, so boards sit on top */}
                    {MIDS.map((m, i) => (
                      <g key={m.move}>
                        <line
                          x1={180}
                          y1={78}
                          x2={COLS[i]}
                          y2={114}
                          stroke={scored[3] && TOP_PICK === i ? "var(--fg)" : "var(--line)"}
                          strokeWidth={scored[3] && TOP_PICK === i ? 3.5 : 1.5}
                        />
                        {m.leaves.map((_, k) => (
                          <line
                            key={k}
                            x1={COLS[i]}
                            y1={222}
                            x2={COLS[i] + (k === 0 ? -30 : 30)}
                            y2={256}
                            stroke={scored[i] && m.pick === k ? "var(--fg)" : "var(--line)"}
                            strokeWidth={scored[i] && m.pick === k ? 3.5 : 1.5}
                          />
                        ))}
                      </g>
                    ))}
                    <text x={136} y={46} textAnchor="end" className={s.lab}>
                      X to move
                    </text>
                    <Board x={144} y={6} size={72} b={START} />
                    <Badge x={224} y={29} w={78} v={scored[3] ? TOP_VALUE : null} />
                    {MIDS.map((m, i) => (
                      <g key={m.move}>
                        <text x={COLS[i]} y={127} textAnchor="middle" className={s.lab}>
                          O to move
                        </text>
                        <Board x={COLS[i] - 32} y={132} size={64} b={m.board} ring={m.move} />
                        <Badge x={COLS[i] - 32} y={200} w={64} v={midValue(i)} />
                        {m.leaves.map((lf, k) => {
                          const cx = COLS[i] + (k === 0 ? -30 : 30);
                          return (
                            <g key={k}>
                              <Board x={cx - 26} y={258} size={52} b={lf.board} dashed={lf.forced} />
                              <text x={cx} y={326} textAnchor="middle" className={`${s.res} ${s[TONE[lf.value]]}`}>
                                {WORD[lf.value]}
                              </text>
                              {scored[i] && k !== m.pick && lf.value > m.value && (
                                <line x1={cx - 24} x2={cx + 24} y1={322} y2={322} stroke="var(--fg)" strokeWidth="2" />
                              )}
                            </g>
                          );
                        })}
                      </g>
                    ))}
                  </svg>
                  {MIDS.map((m, i) => (
                    <Control
                      key={m.move}
                      className={`${s.node} ${scored[i] ? "active" : ""}`}
                      style={rect(COLS[i], 126, 72, 98)}
                      aria-label={`After X plays ${m.label}: O picks`}
                      disabled={locked || scored[i]}
                      onClick={() => score(i)}
                    >
                      {""}
                    </Control>
                  ))}
                  <Control
                    className={`${s.node} ${scored[3] ? "active" : ""}`}
                    style={rect(180, 2, 84, 80)}
                    aria-label="X to move: X picks"
                    disabled={locked || scored[3] || !midsDone}
                    onClick={() => score(3)}
                  >
                    {""}
                  </Control>
                </div>
                <div className={s.tree}>
                  <svg
                    viewBox={`0 0 ${W2} ${H2}`}
                    className={`stage-svg ${s.bridge}`}
                    role="img"
                    aria-label={`Empty board, X to move: value ${scored[7] ? WORD[EMPTY_VALUE] : "not scored"}`}
                  >
                    <text x={W2 / 2} y={10} textAnchor="middle" className={s.lab}>
                      Empty board · same rules, run by computer
                    </text>
                    {FIRSTS.map((f, i) => {
                      const best = scored[7] && f.value === EMPTY_VALUE;
                      return (
                        <line
                          key={f.at}
                          x1={74}
                          y1={58}
                          x2={FCOLS[i] - 24}
                          y2={56}
                          stroke={best ? "var(--fg)" : "var(--line)"}
                          strokeWidth={best ? 3.5 : 1.5}
                        />
                      );
                    })}
                    <text x={42} y={26} textAnchor="middle" className={s.lab}>
                      X to move
                    </text>
                    <Board x={14} y={30} size={56} b="........." />
                    <Badge x={10} y={92} w={64} v={scored[7] ? EMPTY_VALUE : null} />
                    {FIRSTS.map((f, i) => (
                      <g key={f.at}>
                        <text x={FCOLS[i]} y={26} textAnchor="middle" className={s.lab}>
                          {f.label}
                        </text>
                        <Board x={FCOLS[i] - 24} y={32} size={48} b={f.board} ring={f.at} />
                        <Badge x={FCOLS[i] - 32} y={86} w={64} v={scored[4 + i] ? f.value : null} />
                      </g>
                    ))}
                  </svg>
                  {FIRSTS.map((f, i) => (
                    <Control
                      key={f.at}
                      className={`${s.node} ${scored[4 + i] ? "active" : ""}`}
                      style={rect2(FCOLS[i], 16, 64, 98)}
                      aria-label={`X starts in the ${f.label}: score it`}
                      disabled={locked || scored[4 + i] || !scored[3]}
                      onClick={() => score(4 + i)}
                    >
                      {""}
                    </Control>
                  ))}
                  <Control
                    className={`${s.node} ${scored[7] ? "active" : ""}`}
                    style={rect2(42, 16, 72, 100)}
                    aria-label="Empty board: X picks"
                    disabled={locked || scored[7] || !firstsDone}
                    onClick={() => score(7)}
                  >
                    {""}
                  </Control>
                </div>
                <p className={s.count} aria-live="polite">
                  Scored {n} of 8
                  {n === 3 && !scored[3] ? " · now X picks" : n === 4 ? " · now the first moves" : n === 7 ? " · now X picks" : ""}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
