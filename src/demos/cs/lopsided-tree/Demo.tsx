"use client";

// A search tree's shape is set by the order keys arrive. The learner taps the keys 1-7 in
// any order; each tap inserts that key (smaller goes left, larger goes right). Tapped in
// order 1..7 the tree is a 7-level chain; 4 2 6 1 3 5 7 gives 3 levels. One representation:
// the tree, drawn with each key at its own column (x = key, y = level).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const KEYS = [1, 2, 3, 4, 5, 6, 7];
const BALANCED = [4, 2, 6, 1, 3, 5, 7];

type Node = { key: number; level: number; parent: number | null };

/** Insert keys in order into an empty binary search tree. Returns each node's level (0 = root). */
function build(order: number[]): Node[] {
  const nodes: Node[] = [];
  const left = new Map<number, number>();
  const right = new Map<number, number>();
  for (const k of order) {
    if (!nodes.length) {
      nodes.push({ key: k, level: 0, parent: null });
      continue;
    }
    let cur = nodes[0].key;
    let level = 1;
    for (;;) {
      const side = k < cur ? left : right;
      const next = side.get(cur);
      if (next === undefined) {
        side.set(cur, k);
        nodes.push({ key: k, level, parent: cur });
        break;
      }
      cur = next;
      level++;
    }
  }
  return nodes;
}
const levels = (order: number[]) => (order.length ? Math.max(...build(order).map((n) => n.level)) + 1 : 0);

const X = (k: number) => 36 + (k - 1) * 44;
const Y = (lv: number) => 20 + lv * 33;

export default function LopsidedTree({ slug }: { slug: string }) {
  const [order, setOrder] = useState<number[]>([]);
  const [built, setBuilt] = useState<{ order: number[]; levels: number }[]>([]); // full trees the learner made
  const [note, setNote] = useState("");

  const nodes = build(order);
  const depth = levels(order);
  const node7 = nodes.find((n) => n.key === 7);
  const pathTo7 = new Set<number>();
  for (let n = node7; n; n = nodes.find((m) => m.key === n!.parent)) pathTo7.add(n.key);
  const sortedLevels = levels(KEYS);
  const balancedLevels = levels(BALANCED);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Insert 1, 2, 3, 4, 5, 6, 7 into an empty binary search tree in that order. How many levels deep is it?",
        options: ["3", "4", "7"],
        answer: 2,
      }}
      exploreHint="Tap the keys in order 1 to 7. Then clear and try another order."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {built.length
              ? `You built ${built.slice(-3).map((b) => `${b.order.join(" ")} (${b.levels} levels)`).join(", ")}. `
              : ""}
            Each new key walks down from the top: smaller goes left, larger goes right. Insert 1 to 7 in order and every key
            is larger than all before it, so each hangs to the right of the last: a chain of <strong>{sortedLevels}</strong>{" "}
            levels.
          </p>
          <p>
            The same keys in the order {BALANCED.join(" ")} make a tree {balancedLevels} levels deep: any key is at most{" "}
            {balancedLevels} steps away, not {sortedLevels}. A search tree is only as shallow as its insertion order. That is
            why libraries use self-balancing trees.
          </p>
          <p className="muted">Sorted input turns a tree into a list.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["chain", "other-shape"]}>
          {(reach) => {
            const finish = (next: number[]) => {
              if (next.length < KEYS.length) return;
              const lv = levels(next);
              setBuilt((b) => [...b, { order: next, levels: lv }]);
              reach(lv === KEYS.length ? "chain" : "other-shape");
            };
            const insert = (k: number) => {
              if (locked || order.includes(k)) return;
              const next = [...order, k];
              const n = build(next).find((m) => m.key === k)!;
              setOrder(next);
              setNote(n.parent === null ? `${k} is the root.` : `${k} goes ${k < n.parent ? "left" : "right"} of ${n.parent}.`);
              finish(next);
            };
            const preset = () => {
              if (locked) return;
              setOrder(BALANCED);
              setNote(`Inserted ${BALANCED.join(" ")}.`);
              finish(BALANCED);
            };
            const clear = () => {
              if (locked) return;
              setOrder([]);
              setNote("Empty tree. Pick an order.");
            };

            const msg = locked
              ? "Make a prediction to start."
              : note || "Tap keys to insert them, in any order.";

            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {msg}
                </p>
                <svg
                  viewBox="0 0 320 250"
                  className="stage-svg"
                  role="img"
                  aria-label={order.length ? `Tree from ${order.join(", ")}: ${depth} levels` : "Empty tree"}
                >
                  {Array.from({ length: 7 }, (_, lv) => (
                    <g key={lv}>
                      <line x1={18} x2={314} y1={Y(lv)} y2={Y(lv)} stroke="var(--line)" strokeDasharray="2 5" />
                      <text x={4} y={Y(lv) - 4} className={s.lv}>
                        {lv + 1}
                      </text>
                    </g>
                  ))}
                  {nodes
                    .filter((n) => n.parent !== null)
                    .map((n) => {
                      const p = nodes.find((m) => m.key === n.parent)!;
                      return (
                        <line
                          key={`e${n.key}`}
                          x1={X(p.key)}
                          y1={Y(p.level)}
                          x2={X(n.key)}
                          y2={Y(n.level)}
                          stroke={pathTo7.has(n.key) ? "var(--domain)" : "var(--muted)"}
                          strokeWidth={pathTo7.has(n.key) ? 3 : 2}
                        />
                      );
                    })}
                  {nodes.map((n) => (
                    <g key={n.key}>
                      <circle
                        cx={X(n.key)}
                        cy={Y(n.level)}
                        r={13}
                        fill={n.key === order[order.length - 1] ? "var(--domain)" : "var(--bg-2)"}
                        stroke={pathTo7.has(n.key) ? "var(--domain)" : "var(--fg)"}
                        strokeWidth={2}
                      />
                      <text x={X(n.key)} y={Y(n.level) + 5} textAnchor="middle" className={s.key}>
                        {n.key}
                      </text>
                    </g>
                  ))}
                </svg>

                <Row>
                  {KEYS.map((k) => (
                    <Control
                      key={k}
                      className={`${s.tok} ${order.includes(k) ? "active" : ""}`}
                      disabled={locked || order.includes(k)}
                      onClick={() => insert(k)}
                      aria-label={`Insert ${k}`}
                    >
                      {k}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Levels" value={depth || "–"} />
                  <Readout label="Steps to find 7" value={node7 ? node7.level + 1 : "–"} />
                  <Control disabled={locked || order.length === 0} onClick={clear}>
                    Clear
                  </Control>
                  <Control disabled={locked || order.join() === BALANCED.join()} onClick={preset}>
                    Try {BALANCED.join(" ")}
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
