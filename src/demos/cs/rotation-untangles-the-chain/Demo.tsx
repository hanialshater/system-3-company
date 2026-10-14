"use client";

// AVL rotation as a before / after toggle (company/design/specs/rotation-untangles-the-chain.md).
// Keys 1..7 arrive in order. "Plain" is an ordinary search tree (a chain); "Rotating" rebalances whenever one
// side of a node is two levels deeper than the other (AVL). Height is counted in levels (one node = 1).
// Each key has its own column (in-order position), so a rotation moves keys up and down, never sideways:
// the in-order rule is visible. Rotating: 4 single left rotations (at 1, 3, 2, 5), height 3, root 4 (claim c1).
// v2: the stage opens with keys 1 and 2 placed, so the first "Insert next key" inserts 3 and the learner watches the
// first rotation (2 lifted above 1 and 3) as a step. "Insert the rest" stays disabled until that step. The ghost
// shows only the keys that moved, with an arrow up the lifted key's column. The reveal quotes the recorded first
// rotation and the recorded results, so switching trees cannot change them.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Mode = "plain" | "rotating";
type Node = { k: number; l: Node | null; r: Node | null; h: number };
type Depths = Record<number, number>;
type Edge = [number, number];
type Rot = { at: number; up: number; ghost: Depths; ghostEdges: Edge[] };
type Snap = { depth: Depths; edges: Edge[]; pre: Depths; preEdges: Edge[]; height: number; rots: number; rot?: Rot };
type Result = { height: number; rots: number };

const START = 2; // keys 1 and 2 are already placed when the stage unlocks
const lv = (n: number) => `${n} level${n === 1 ? "" : "s"}`;

const KEYS = [1, 2, 3, 4, 5, 6, 7];
const ht = (n: Node | null) => (n ? n.h : 0);
const fix = (n: Node) => {
  n.h = 1 + Math.max(ht(n.l), ht(n.r));
  return n;
};
const clone = (n: Node | null): Node | null => (n ? { k: n.k, h: n.h, l: clone(n.l), r: clone(n.r) } : null);
const rotRight = (y: Node) => {
  const x = y.l!;
  y.l = x.r;
  x.r = y;
  fix(y);
  return fix(x);
};
const rotLeft = (x: Node) => {
  const y = x.r!;
  x.r = y.l;
  y.l = x;
  fix(x);
  return fix(y);
};
function layout(root: Node | null, base = 0): { depth: Depths; edges: Edge[] } {
  const depth: Depths = {};
  const edges: Edge[] = [];
  const walk = (n: Node | null, d: number) => {
    if (!n) return;
    depth[n.k] = d;
    for (const c of [n.l, n.r]) {
      if (c) {
        edges.push([n.k, c.k]);
        walk(c, d + 1);
      }
    }
  };
  walk(root, base);
  return { depth, edges };
}
function plainInsert(n: Node | null, k: number): Node {
  if (!n) return { k, l: null, r: null, h: 1 };
  if (k < n.k) n.l = plainInsert(n.l, k);
  else n.r = plainInsert(n.r, k);
  return fix(n);
}

function snapshots(mode: Mode): Snap[] {
  const out: Snap[] = [{ depth: {}, edges: [], pre: {}, preEdges: [], height: 0, rots: 0 }];
  let root: Node | null = null;
  let rots = 0;
  for (const key of KEYS) {
    const before = layout(plainInsert(clone(root), key));
    let rot: Rot | undefined;
    const ins = (n: Node | null, k: number, d: number): Node => {
      if (!n) return { k, l: null, r: null, h: 1 };
      if (k < n.k) n.l = ins(n.l, k, d + 1);
      else n.r = ins(n.r, k, d + 1);
      fix(n);
      if (mode === "plain") return n;
      const bal = ht(n.l) - ht(n.r);
      if (bal > 1 || bal < -1) {
        const g = layout(clone(n), d);
        let top: Node;
        if (bal > 1) {
          if (k > n.l!.k) n.l = rotLeft(n.l!);
          top = rotRight(n);
        } else {
          if (k < n.r!.k) n.r = rotRight(n.r!);
          top = rotLeft(n);
        }
        rots += 1;
        if (!rot) rot = { at: n.k, up: top.k, ghost: g.depth, ghostEdges: g.edges };
        return top;
      }
      return n;
    };
    root = ins(root, key, 0);
    const now = layout(root);
    out.push({
      depth: now.depth,
      edges: now.edges,
      pre: rot ? before.depth : now.depth,
      preEdges: rot ? before.edges : now.edges,
      height: ht(root),
      rots,
      rot,
    });
  }
  return out;
}
const SNAPS: Record<Mode, Snap[]> = { plain: snapshots("plain"), rotating: snapshots("rotating") };
/** Levels the picture needs for each tree: every depth drawn in any of its frames (tree, pre-rotation shape, ghosts). */
const LEVELS: Record<Mode, number> = {
  plain: 0,
  rotating: 0,
};
for (const m of ["plain", "rotating"] as const) {
  for (const sn of SNAPS[m]) {
    const ds = [...Object.values(sn.depth), ...Object.values(sn.pre), ...Object.values(sn.rot?.ghost ?? {})];
    LEVELS[m] = Math.max(LEVELS[m], 1 + Math.max(0, ...ds));
  }
}

const reducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const COLX = (k: number) => 33 + (k - 1) * 46;
const LEVY = (d: number) => 22 + d * 40;
const R = 16;

// The tree, with a tween from the pre-rotation shape to the rotated one.
function Tree({ mode, i, dur }: { mode: Mode; i: number; dur: number }) {
  const snap = SNAPS[mode][i];
  const [p, setP] = useState(1);
  const raf = useRef<number | null>(null);
  useLayoutEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (!snap.rot || dur <= 0) {
      setP(1);
      return;
    }
    setP(0);
    const t0 = performance.now();
    const tick = (now: number) => {
      const q = Math.min(1, (now - t0) / dur);
      setP(q);
      if (q < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mode, i, dur, snap]);

  const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const keys = Object.keys(snap.depth).map(Number);
  const d = (k: number) => snap.pre[k] + (snap.depth[k] - snap.pre[k]) * ease;
  const edges = p < 0.4 ? snap.preEdges : snap.edges;
  const label =
    i === 0
      ? `${mode === "rotating" ? "Rotating" : "Plain"} tree: empty`
      : `${mode === "rotating" ? "Rotating" : "Plain"} tree: root ${keys.find((k) => snap.depth[k] === 0)}, height ${lv(snap.height)}, ${snap.rots} rotation${snap.rots === 1 ? "" : "s"}`;

  // The key row sits under the deepest level this tree ever uses, so the rotating tree (4 levels) is drawn
  // shorter than the plain chain (7 levels).
  const rowY = LEVY(LEVELS[mode] - 1) + 26;
  return (
    <svg viewBox={`0 0 342 ${rowY + 36}`} className={`stage-svg ${s.svg}`} role="img" aria-label={label} data-keys={i}>
      {snap.rot && (
        <g aria-hidden="true">
          {Object.entries(snap.rot.ghost)
            .filter(([k, dd]) => snap.depth[Number(k)] !== dd)
            .map(([k, dd]) => (
            <g key={`g${k}`}>
              <circle
                cx={COLX(Number(k))}
                cy={LEVY(dd)}
                r={R - 1}
                fill="none"
                stroke="var(--domain)"
                strokeDasharray="3 3"
              />
              <text x={COLX(Number(k))} y={LEVY(dd) + 4} textAnchor="middle" className={s.ghostKey}>
                {k}
              </text>
            </g>
          ))}
          {p >= 1 && (
            <g>
              <line
                x1={COLX(snap.rot.up) + R + 4}
                y1={LEVY(snap.rot.ghost[snap.rot.up]) - 2}
                x2={COLX(snap.rot.up) + R + 4}
                y2={LEVY(snap.depth[snap.rot.up]) + 6}
                stroke="var(--domain)"
                strokeWidth={2.5}
              />
              <text
                x={COLX(snap.rot.up) + R + 4}
                y={LEVY(snap.depth[snap.rot.up]) + 4}
                textAnchor="middle"
                className={s.up}
              >
                ▲
              </text>
            </g>
          )}
        </g>
      )}
      {edges.map(([a, b]) => (
        <line
          key={`e${a}-${b}`}
          x1={COLX(a)}
          y1={LEVY(d(a))}
          x2={COLX(b)}
          y2={LEVY(d(b))}
          stroke="var(--fg)"
          strokeWidth={1.5}
        />
      ))}
      {keys.map((k) => (
        <g key={`n${k}`}>
          <circle
            cx={COLX(k)}
            cy={LEVY(d(k))}
            r={R}
            fill="color-mix(in srgb, var(--domain) 45%, var(--bg-2))"
            stroke="var(--fg)"
          />
          <text x={COLX(k)} y={LEVY(d(k)) + 4.5} textAnchor="middle" className={s.key}>
            {k}
          </text>
        </g>
      ))}
      <line x1={10} y1={rowY + 12} x2={332} y2={rowY + 12} stroke="var(--line)" />
      {KEYS.map((k) => {
        const inserted = k <= i;
        return (
          <g key={`row${k}`}>
            <rect
              x={COLX(k) - 12}
              y={rowY}
              width={24}
              height={24}
              rx={4}
              fill={inserted ? "var(--bg-2)" : "none"}
              stroke={inserted ? "var(--fg)" : "var(--line)"}
              strokeDasharray={inserted ? undefined : "3 2"}
            />
            <text x={COLX(k)} y={rowY + 16.5} textAnchor="middle" className={inserted ? s.rowKey : s.rowWait}>
              {k}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function RotationUntanglesTheChain({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("rotating");
  const [i, setI] = useState(START);
  const [dur, setDur] = useState(300);
  const [results, setResults] = useState<Partial<Record<Mode, Result>>>({});
  // The first rotation the learner stepped through (recorded when the milestone fires).
  const [first, setFirst] = useState<{ key: number; up: number; below: number[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const snap = SNAPS[mode][i];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Keys 1 to 7 arrive in order. A plain search tree becomes a chain 7 levels tall. A tree that rotates whenever one side is two levels deeper than the other: how many levels?",
        options: ["7 levels", "5 levels", "3 levels"],
        answer: 2,
      }}
      exploreHint="Insert key 3 and watch which key moves up."
      minInteractions={2}
      reveal={() => {
        const rt = results.rotating ?? SNAPS.rotating[7];
        return (
          <>
            <p>
              Your tree took 1 to 7 in order and stayed {lv(rt.height)} tall
              {results.plain ? `; the plain tree was a chain of ${results.plain.height}` : ""}. Each time one side got two
              levels deeper, a rotation lifted the middle key
              {first ? `: at key ${first.key}, you saw ${first.up} rise above ${first.below.join(" and ")}` : ""}.
            </p>
            <p>
              No key ever left its column, so the left-to-right order, and every search, stayed valid. {rt.rots} rotations
              in all. Doing this at every insert keeps the height close to log₂ of the number of keys.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-rotation", "seven-rotating"]}>
          {(reach) => {
            const arrive = (m: Mode, k: number) => {
              if (k >= 7) {
                setResults((r) => ({ ...r, [m]: { height: SNAPS[m][7].height, rots: SNAPS[m][7].rots } }));
                if (m === "rotating") reach("seven-rotating");
              }
            };

            const replay = (m: Mode, from: number) => {
              if (timer.current) clearInterval(timer.current);
              if (reducedMotion() || from >= 7) {
                setDur(0);
                setI(7);
                arrive(m, 7);
                return;
              }
              setBusy(true);
              setDur(40);
              let k = from;
              timer.current = setInterval(() => {
                k += 1;
                setI(k);
                arrive(m, k);
                if (k >= 7) {
                  if (timer.current) clearInterval(timer.current);
                  setBusy(false);
                }
              }, 50);
            };

            const insertNext = () => {
              if (locked || busy || i >= 7) return;
              setDur(reducedMotion() ? 0 : 300);
              setI(i + 1);
              arrive(mode, i + 1);
              const rot = SNAPS[mode][i + 1].rot;
              if (mode === "rotating" && rot && !first) {
                const nxt = SNAPS.rotating[i + 1];
                setFirst({ key: i + 1, up: rot.up, below: nxt.edges.filter(([a]) => a === rot.up).map(([, b]) => b) });
                reach("first-rotation");
              }
            };
            const insertRest = () => {
              if (locked || busy || i >= 7) return;
              replay(mode, i);
            };
            const switchMode = (m: Mode) => {
              if (locked || busy || m === mode) return;
              // A full tree replays the new tree to full, except the rotating tree before its first rotation has
              // been stepped: then it starts again from keys 1 and 2, so "Insert next key" can show that rotation
              // (otherwise Plain-first, filled, then Rotating would lock the first-rotation milestone out).
              const full = i >= 7 && !(m === "rotating" && !first);
              setMode(m);
              setI(full ? 0 : START);
              if (full) replay(m, 0);
              else if (timer.current) clearInterval(timer.current);
            };

            return (
              <div className={s.wrap}>
                <p className={s.rule}>
                  {mode === "rotating"
                    ? "If one side gets two levels deeper, rotate: lift the middle key up."
                    : "Smaller keys go left, bigger go right. No rotations."}
                </p>
                <Tree mode={mode} i={i} dur={dur} />
                <p className={s.note} aria-live="polite">
                  {snap.rot ? `Key ${i} made ${snap.rot.at}'s side too deep: ${snap.rot.up} lifted up` : " "}
                </p>
                <Row>
                  <Readout label="Height" value={lv(snap.height)} />
                  <Readout label="Rotations" value={snap.rots} />
                </Row>
                <Row>
                  <Readout label="Plain" value={results.plain ? lv(results.plain.height) : "?"} />
                  <Readout
                    label="Rotating"
                    value={results.rotating ? `${lv(results.rotating.height)}, ${results.rotating.rots} rot.` : "?"}
                  />
                </Row>
                <div className={s.controls}>
                  <Control className="tap" disabled={locked || busy || i >= 7} onClick={insertNext}>
                    Insert next key
                  </Control>
                  <Control className="tap" disabled={locked || busy || i >= 7 || !first} onClick={insertRest}>
                    Insert the rest
                  </Control>
                  <span role="group" aria-label="Tree" className={s.chips}>
                    {(["plain", "rotating"] as const).map((m) => (
                      <Control
                        key={m}
                        className={`tap ${mode === m ? "active" : ""}`}
                        aria-pressed={mode === m}
                        disabled={locked || busy || mode === m}
                        onClick={() => switchMode(m)}
                      >
                        {m === "plain" ? "Plain" : "Rotating"}
                      </Control>
                    ))}
                  </span>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
