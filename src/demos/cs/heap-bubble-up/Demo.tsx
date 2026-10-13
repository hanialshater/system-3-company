"use client";

// Inserting into a min-heap: put the new item at the end of the array (the next leaf), then swap
// it with its parent while it is smaller. [2, 5, 3, 9, 6] + 1 -> 1 swaps with 3, then with 2:
// [1, 5, 2, 9, 6, 3]. The tree is the array drawn by index (parent of i is floor((i-1)/2)).
// One representation: the tree, with each node's array index under it and the array read off below.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const HEAP = [2, 5, 3, 9, 6];
const NEW = 1;
const parent = (i: number) => Math.floor((i - 1) / 2);
const show = (a: number[]) => `[${a.join(", ")}]`;

function bubble(a: number[], i: number) {
  const b = [...a];
  const p = parent(i);
  [b[i], b[p]] = [b[p], b[i]];
  return { arr: b, at: p };
}
// final answer, from the same swap rule the stage uses
const FINAL = (() => {
  let arr = [...HEAP, NEW];
  let at = arr.length - 1;
  while (at > 0 && arr[at] < arr[parent(at)]) ({ arr, at } = bubble(arr, at));
  return arr;
})();
const HEIGHT = Math.floor(Math.log2(HEAP.length + 1));
const MILLION_HEIGHT = Math.floor(Math.log2(1_000_000));

// node positions by index (3 levels)
const POS = [
  [160, 26],
  [90, 90],
  [230, 90],
  [50, 154],
  [130, 154],
  [190, 154],
];

export default function HeapBubbleUp({ slug }: { slug: string }) {
  const [arr, setArr] = useState<number[]>(HEAP);
  const [at, setAt] = useState<number | null>(null); // index of the new item
  const [path, setPath] = useState<string[]>([]); // swaps the learner made, e.g. "1 ↔ 3"

  const canSwap = at !== null && at > 0 && arr[at] < arr[parent(at)];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A min-heap holds ${show(HEAP)} (parent of index i is (i−1)/2 rounded down). You insert ${NEW} at the end and swap it up while it is smaller than its parent. What is the final array?`,
        options: [show(FINAL), "[1, 2, 3, 9, 6, 5]", show([...HEAP, NEW])],
        answer: 0,
      }}
      exploreHint={`Add ${NEW} at the end, then swap it up one parent at a time.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {path.length ? `You swapped ${path.join(", then ")}. ` : ""}
            {NEW} climbed from index {HEAP.length} to {parent(HEAP.length)} to 0: {show(FINAL)}. Only the path from the new leaf
            to the top changed; the other items never moved, and the smallest is on top again.
          </p>
          <p>
            Each swap climbs one level, so an insert costs at most the tree&apos;s height, about log2 n swaps: {HEIGHT} for these{" "}
            {HEAP.length + 1} items, and at most {MILLION_HEIGHT} for a million. No re-sorting needed: a heap only promises that
            every parent is smaller than its children, and one climb restores that.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["one-swap", "at-root"]}>
          {(reach) => {
            const add = () => {
              if (locked || at !== null) return;
              setArr([...arr, NEW]);
              setAt(arr.length);
            };
            const swapOnce = (a: number[], i: number) => {
              const r = bubble(a, i);
              setPath((p) => [...p, `${a[i]} ↔ ${a[parent(i)]}`]);
              return r;
            };
            const step = () => {
              if (locked || at === null || !canSwap) return;
              const r = swapOnce(arr, at);
              setArr(r.arr);
              setAt(r.at);
              reach("one-swap");
              if (r.at === 0) reach("at-root");
            };
            const toTop = () => {
              if (locked || at === null || !canSwap) return;
              let cur = { arr, at };
              while (cur.at > 0 && cur.arr[cur.at] < cur.arr[parent(cur.at)]) cur = swapOnce(cur.arr, cur.at);
              setArr(cur.arr);
              setAt(cur.at);
              reach("one-swap");
              if (cur.at === 0) reach("at-root");
            };
            const restart = () => {
              if (locked) return;
              setArr(HEAP);
              setAt(null);
              setPath([]);
            };

            const p = at !== null && at > 0 ? parent(at) : null;
            const note =
              at === null
                ? "Every parent is smaller than its children."
                : canSwap && p !== null
                  ? `${arr[at]} < parent ${arr[p]}: swap`
                  : at === 0
                    ? `${arr[at]} is at the top: stop`
                    : `${arr[at]} > parent ${arr[p!]}: stop`;

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 196" className="stage-svg" role="img" aria-label={`Heap ${show(arr)}`}>
                  {arr.map((_, i) =>
                    i === 0 ? null : (
                      <line
                        key={`e${i}`}
                        x1={POS[parent(i)][0]}
                        y1={POS[parent(i)][1]}
                        x2={POS[i][0]}
                        y2={POS[i][1]}
                        stroke={at !== null && i === at && canSwap ? "var(--domain)" : "var(--line)"}
                        strokeWidth={at !== null && i === at && canSwap ? 3 : 1.5}
                      />
                    ),
                  )}
                  {arr.map((v, i) => (
                    <g key={`n${i}`}>
                      <circle
                        cx={POS[i][0]}
                        cy={POS[i][1]}
                        r={19}
                        fill={i === at ? "var(--domain)" : "var(--bg-2)"}
                        stroke={i === at ? "var(--domain)" : "var(--fg)"}
                        strokeWidth={1.5}
                      />
                      <text x={POS[i][0]} y={POS[i][1] + 6} textAnchor="middle" className={`${s.v} ${i === at ? s.vNew : ""}`}>
                        {v}
                      </text>
                      <text x={POS[i][0]} y={POS[i][1] + 33} textAnchor="middle" className={s.idx}>
                        i={i}
                      </text>
                    </g>
                  ))}
                </svg>
                <p className={s.arr}>array {show(arr)}</p>
                <Row>
                  <Control disabled={locked || at === null} onClick={restart}>
                    Start over
                  </Control>
                  <Control className="active" disabled={locked || at !== null} onClick={add}>
                    Add {NEW} at the end
                  </Control>
                  <Control disabled={locked || !canSwap} onClick={step}>
                    Swap with parent
                  </Control>
                  <Control disabled={locked || !canSwap} onClick={toTop}>
                    Swap until it stops
                  </Control>
                </Row>
                <Row>
                  <Readout label="Swaps" value={path.length} />
                  <Readout label="Tree height" value={Math.floor(Math.log2(arr.length))} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
