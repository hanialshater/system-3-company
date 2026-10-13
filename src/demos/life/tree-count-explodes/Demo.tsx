"use client";

// Counting rooted, branching (binary) family trees on labelled species. A tree with k species has
// 2k - 1 branches (counting the stub above the root), and the next species can join on any of them,
// so trees(k + 1) = trees(k) x (2k - 1): 1, 3, 15, 105 ... trees(10) = 17!! = 34,459,425.
// Which branch each added species joins is chosen with mulberry32(5) for the picture only; the
// count does not depend on it. Computed in artifacts/scratch/w5life/trees.mjs.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const MAXK = 10;
const LETTERS = "ABCDEFGHIJ";
const places = (k: number) => 2 * k - 1;
const trees = (k: number) => {
  let t = 1;
  for (let j = 2; j < k; j++) t *= places(j);
  return t;
};
const fmt = (n: number) => n.toLocaleString("en-US");

interface Node { parent: number; kids: number[]; leaf: number } // leaf: species index or -1
function buildAll(): Node[][] {
  const rng = mulberry32(5);
  let nodes: Node[] = [
    { parent: -1, kids: [1, 2], leaf: -1 },
    { parent: 0, kids: [], leaf: 0 },
    { parent: 0, kids: [], leaf: 1 },
  ];
  const out: Node[][] = [[], [], nodes];
  for (let k = 2; k < MAXK; k++) {
    const x = Math.floor(rng() * nodes.length); // any branch (every node owns the branch above it)
    const next = nodes.map((n) => ({ ...n, kids: [...n.kids] }));
    const n = next.length;
    const p = next[x].parent;
    next.push({ parent: p, kids: [x, n + 1], leaf: -1 }); // new internal node n
    next.push({ parent: n, kids: [], leaf: k }); // new leaf n + 1
    next[x].parent = n;
    if (p >= 0) next[p].kids = next[p].kids.map((c) => (c === x ? n : c));
    nodes = next;
    out.push(nodes);
  }
  return out;
}

const W = 320, H = 170, L = 26, R = 22, T = 8, B = 8;

function layout(nodes: Node[]) {
  const root = nodes.findIndex((n) => n.parent === -1);
  const height: number[] = Array(nodes.length).fill(0);
  const y: number[] = Array(nodes.length).fill(0);
  let leafNo = 0;
  const leaves = nodes.filter((n) => n.leaf >= 0).length;
  const walk = (i: number) => {
    const n = nodes[i];
    if (n.kids.length === 0) { y[i] = leafNo++; return; }
    n.kids.forEach(walk);
    height[i] = 1 + Math.max(...n.kids.map((c) => height[c]));
    y[i] = n.kids.reduce((a, c) => a + y[c], 0) / n.kids.length;
  };
  walk(root);
  const hmax = height[root] + 0.7;
  const X = (i: number) => L + ((W - L - R) * (hmax - height[i])) / hmax;
  const Y = (i: number) => T + ((H - T - B) * (y[i] + 0.5)) / leaves;
  return { root, X, Y };
}

function Stage({ locked, k, setK}: { locked: boolean; k: number; setK: (k: number) => void }) {
  const all = useMemo(buildAll, []);
  const nodes = all[k];
  const { root, X, Y } = layout(nodes);
  const msg = locked
    ? "Toy: rooted, branching trees. Every new species joins the tree on any branch."
    : `${k} species: ${fmt(trees(k))} possible tree${trees(k) > 1 ? "s" : ""}. A new species could join in ${places(k)} places.`;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {nodes.map((n, i) => {
          const x1 = n.parent < 0 ? X(i) - 16 : X(n.parent);
          const y1 = n.parent < 0 ? Y(i) : Y(n.parent);
          return (
            <g key={i}>
              <path d={`M${x1},${y1} V${Y(i)} H${X(i)}`} className={s.branch} />
              <circle cx={(x1 + X(i)) / 2} cy={Y(i)} r={3.2} className={s.spot} />
              {n.leaf >= 0 && <text x={X(i) + 5} y={Y(i) + 3.5} className={s.lab}>{LETTERS[n.leaf]}</text>}
            </g>
          );
        })}
        <circle cx={X(root)} cy={Y(root)} r={2} className={s.node} />
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <p className={s.tag}>Dots: where the next species could join.</p>
      <Row>
        <Control disabled={locked || k >= MAXK} onClick={() => { setK(k + 1); }}>Add 1 species</Control>
        <Control disabled={locked || k >= MAXK} onClick={() => setK(Math.min(MAXK, k + 3))}>Add 3</Control>
        <Control disabled={locked || k >= MAXK} onClick={() => setK(MAXK)}>Add up to {MAXK}</Control>
        <Control disabled={locked || k === 2} onClick={() => setK(2)}>Start over</Control>
      </Row>
    </div>
  );
}

export default function TreeCountExplodes({ slug }: { slug: string }) {
  const [k, setK] = useState(2);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `How many different rooted, branching family trees can connect ${MAXK} named species?`,
        options: ["About 1,000", "About 100,000", "About 34 million"],
        answer: 2,
      }}
      exploreHint={`Add species one at a time up to ${MAXK} and watch the count.`}
      minInteractions={1}
      reveal={() => {
        const terms = Array.from({ length: MAXK - 2 }, (_, i) => places(i + 2));
        return (
          <>
            <p>
              Your tree reached {MAXK} species: <strong>{fmt(trees(MAXK))}</strong> possible trees.
            </p>
            <p>
              Species 3 can join in {terms[0]} places, species 4 in {terms[1]}, and so on up to {terms[terms.length - 1]} places for species {MAXK}. Each choice multiplies: {terms.join(" × ")} = {fmt(trees(MAXK))}. Counting trees multiplies, so checking them all stops being possible. Only branching trees with two branches at each fork are counted.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ten-species"]}>
          {(reach) => (
            <Stage
              locked={locked}
              k={k}
              setK={(v) => { setK(v); if (v === MAXK) reach("ten-species"); }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
