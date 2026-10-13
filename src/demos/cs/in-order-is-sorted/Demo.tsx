"use client";

// In-order traversal of a binary search tree. Keys 5, 3, 8, 1, 4, 9, 7 are inserted (smaller left,
// bigger right). The learner taps the node to visit next by the rule "left side, then the node, then
// the right side"; a wrong tap says why not yet. After the first correct visit, "Finish the walk"
// visits the rest by the same rule, each node getting its visit number. The visited list fills
// under the tree. Node buttons are in insertion order in the DOM, not visit order.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const INSERTS = [5, 3, 8, 1, 4, 9, 7];
type Node = { key: number; left?: number; right?: number; parent?: number; depth: number; x: number };

function build(keys: number[]) {
  const nodes = new Map<number, Node>();
  const root = keys[0];
  nodes.set(root, { key: root, depth: 0, x: 50 });
  for (const k of keys.slice(1)) {
    let cur = nodes.get(root)!;
    for (;;) {
      const side = k < cur.key ? "left" : "right";
      const next = cur[side];
      if (next === undefined) {
        const half = 50 / 2 ** (cur.depth + 1);
        nodes.set(k, { key: k, parent: cur.key, depth: cur.depth + 1, x: cur.x + (side === "left" ? -half : half) });
        cur[side] = k;
        break;
      }
      cur = nodes.get(next)!;
    }
  }
  return { nodes, root };
}
const { nodes: NODES, root: ROOT } = build(INSERTS);
function inorder(k: number | undefined): number[] {
  if (k === undefined) return [];
  const n = NODES.get(k)!;
  return [...inorder(n.left), k, ...inorder(n.right)];
}
function preorder(k: number | undefined): number[] {
  if (k === undefined) return [];
  const n = NODES.get(k)!;
  return [k, ...preorder(n.left), ...preorder(n.right)];
}
const IN = inorder(ROOT); // 1, 3, 4, 5, 7, 8, 9
const PRE = preorder(ROOT); // 5, 3, 1, 4, 8, 7, 9
const subtree = (k: number | undefined): number[] => inorder(k);
const yOf = (d: number) => 14 + d * 30; // percent of box height

/** Why tapping t is not the next visit. */
function whyNot(t: number, visited: number[]) {
  const n = NODES.get(t)!;
  if (subtree(n.left).some((k) => !visited.includes(k))) return `Not yet: ${t}'s left side comes first.`;
  let child = t;
  let p = n.parent;
  while (p !== undefined) {
    const pn = NODES.get(p)!;
    if (pn.right === child && !visited.includes(p)) return `Not yet: ${p} comes before its right side.`;
    child = p;
    p = pn.parent;
  }
  return `Not yet.`;
}

export default function InOrderIsSorted({ slug }: { slug: string }) {
  const [visited, setVisited] = useState<number[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const [byHand, setByHand] = useState(0);
  const done = visited.length === IN.length;
  const next = IN[visited.length];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Insert ${INSERTS.join(", ")} into a search tree (smaller goes left, bigger goes right). Read it: left side, then the node, then right side. What order comes out?`,
        options: [INSERTS.join(", "), PRE.join(", "), IN.join(", ")],
        answer: 2,
      }}
      exploreHint="Tap the node to visit next: left side, then the node, then right side."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You visited {byHand} {byHand === 1 ? "node" : "nodes"} by hand and the walk went on by the same rule:{" "}
            <strong>{IN.join(", ")}</strong>. Sorted, though the keys went in as {INSERTS.join(", ")}.
          </p>
          <p>
            Every key on a node&apos;s left is smaller and every key on its right is bigger. So &quot;left side, me,
            right side&quot; must list smaller keys, then the node, then bigger ones, at every node. A search tree is
            sorted data folded into a shape, and this walk (called in-order) unfolds it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-visit", "all-visited"]}>
          {(reach) => {
            const tap = (k: number) => {
              if (locked || done || visited.includes(k)) return;
              if (k !== next) {
                setNote(whyNot(k, visited));
                return;
              }
              const v = [...visited, k];
              setVisited(v);
              setByHand((b) => b + 1);
              setNote(null);
              reach("first-visit");
              if (v.length === IN.length) reach("all-visited");
            };
            const finish = () => {
              if (locked || done || visited.length === 0) return;
              setVisited(IN);
              setNote(null);
              reach("all-visited");
            };
            const reset = () => {
              if (locked || visited.length === 0) return;
              setVisited([]);
              setByHand(0);
              setNote(null);
            };
            const msg = locked
              ? "Make a prediction to start."
              : note
                ? note
                : done
                  ? "Every node visited."
                  : visited.length === 0
                    ? "Smaller keys sit left, bigger right. Tap the first node to visit."
                    : `Visited ${visited[visited.length - 1]}. Which next?`;
            return (
              <div className={s.wrap}>
                {/* First in the DOM (disabled until a visit) so a press in DOM order never undoes the walk; shown last. */}
                <Control disabled={locked || visited.length === 0} onClick={reset} className={s.reset}>Start again</Control>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.tree}>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={s.edges} aria-hidden>
                    {[...NODES.values()].filter((n) => n.parent !== undefined).map((n) => {
                      const p = NODES.get(n.parent!)!;
                      return <line key={n.key} x1={p.x} y1={yOf(p.depth)} x2={n.x} y2={yOf(n.depth)} className={s.edge} />;
                    })}
                  </svg>
                  {INSERTS.map((k) => {
                    const n = NODES.get(k)!;
                    const i = visited.indexOf(k);
                    return (
                      <Control key={k} aria-label={`Visit ${k}`} disabled={locked || done || i >= 0}
                        className={`${s.node} ${i >= 0 ? `active ${s.seen}` : ""}`}
                        style={{ left: `${n.x}%`, top: `${yOf(n.depth)}%` }} onClick={() => tap(k)}>
                        {k}
                        {i >= 0 && <span className={s.badge}>{i + 1}</span>}
                      </Control>
                    );
                  })}
                </div>
                <div className={s.list} aria-label="Visited, in order">
                  {IN.map((_, i) => (
                    <span key={i} className={`${s.slot} ${i < visited.length && !locked ? s.filled : ""}`}>
                      {i < visited.length && !locked ? visited[i] : ""}
                    </span>
                  ))}
                </div>
                <div className={s.buttons}>
                  <Control disabled={locked || done || visited.length === 0} onClick={finish}>Finish the walk</Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
