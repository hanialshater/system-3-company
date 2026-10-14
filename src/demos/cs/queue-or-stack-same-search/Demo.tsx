"use client";

// One search, run twice on the same six-place graph. The only difference: the left panel takes the
// next place from the front of its to-do strip (a queue), the right panel from the top (a stack).
// One shared button drives both panels, so the moment they part (take 2) is on screen, not remembered.
// Both runs are computed up front by the same function; `takes` is how many places each has taken.

import { useEffect, useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const ADJ: Record<string, string> = { A: "BC", B: "ADE", C: "AF", D: "B", E: "BF", F: "CE" };
const POS: Record<string, [number, number]> = {
  A: [89, 30],
  B: [50, 92],
  C: [128, 92],
  D: [26, 154],
  E: [80, 154],
  F: [140, 154],
};
const EDGES = ["AB", "AC", "BD", "BE", "CF", "EF"];
const LETTERS = "ABCDEF";

type Snap = { took: string; todo: string; hops: Record<string, number>; from: Record<string, string> };

// The same loop for both runs; `fromTop` is the single difference.
function run(fromTop: boolean): Snap[] {
  const todo = ["A"];
  const seen = new Set(["A"]);
  const hops: Record<string, number> = { A: 0 };
  const from: Record<string, string> = {};
  const out: Snap[] = [];
  let took = "";
  while (todo.length) {
    const v = fromTop ? todo.pop()! : todo.shift()!;
    took += v;
    for (const w of ADJ[v]) {
      if (!seen.has(w)) {
        seen.add(w);
        todo.push(w);
        hops[w] = hops[v] + 1;
        from[w] = v;
      }
    }
    out.push({ took, todo: todo.join(""), hops: { ...hops }, from: { ...from } });
  }
  return out;
}

function Panel({ title, snap, edge, explore }: { title: string; snap: Snap; edge: "front" | "top"; explore: boolean }) {
  const { took, todo, hops, from } = snap;
  const visited = new Set(took.split(""));
  const next = edge === "front" ? 0 : todo.length - 1;
  const label = `${title}: took ${took.split("").join(" ")}, to-do ${todo ? todo.split("").join(" ") : "empty"}`;
  return (
    <svg viewBox="0 0 178 264" className={`stage-svg ${s.panel}`} role="img" aria-label={label}>
      <text x={89} y={11} textAnchor="middle" className={s.title}>
        {title}
      </text>
      {EDGES.map((e) => {
        const [a, b] = e.split("");
        const thick = (from[b] === a && visited.has(b)) || (from[a] === b && visited.has(a));
        return (
          <line
            key={e}
            x1={POS[a][0]}
            y1={POS[a][1]}
            x2={POS[b][0]}
            y2={POS[b][1]}
            stroke={thick ? "var(--fg)" : "var(--line)"}
            strokeWidth={thick ? 3.5 : 1.5}
          />
        );
      })}
      {LETTERS.split("").map((v) => {
        const [x, y] = POS[v];
        const on = visited.has(v);
        const h = hops[v];
        const side = v === "B" ? "L" : v === "C" || v === "A" ? "R" : "D";
        return (
          <g key={v}>
            <circle cx={x} cy={y} r={15} fill={on ? "var(--domain)" : "var(--bg-2)"} stroke={on ? "var(--domain)" : "var(--line)"} strokeWidth={2} />
            <text x={x} y={y + 4} textAnchor="middle" className={on ? s.numOn : s.letter}>
              {on ? took.indexOf(v) + 1 : v}
            </text>
            {on && (
              <text
                x={side === "L" ? x - 19 : side === "R" ? x + 19 : x}
                y={side === "D" ? y + 28 : y + 3}
                textAnchor={side === "L" ? "end" : side === "R" ? "start" : "middle"}
                className={s.hops}
              >
                {h} {h === 1 ? "hop" : "hops"}
              </text>
            )}
          </g>
        );
      })}
      <text x={4} y={197} className={s.small}>
        to do:
      </text>
      {todo.length === 0 && (
        <text x={46} y={197} className={s.small}>
          empty
        </text>
      )}
      {todo.split("").map((v, i) => {
        const isNext = explore && i === next;
        return (
          <g key={v}>
            <rect x={6 + i * 29} y={203} width={25} height={25} rx={5} fill="var(--bg-2)" stroke={isNext ? "var(--fg)" : "var(--line)"} strokeWidth={isNext ? 3 : 1.5} />
            <text x={18.5 + i * 29} y={220} textAnchor="middle" className={s.tile}>
              {v}
            </text>
          </g>
        );
      })}
      {todo.length > 0 && (
        <text x={18.5 + (edge === "front" ? 0 : todo.length - 1) * 29} y={240} textAnchor="middle" className={s.small}>
          ↑ {edge}
        </text>
      )}
      <text x={6} y={258} className={s.order}>
        Order: {took.split("").join(" ")}
        {took.length < 6 ? " …" : ""}
      </text>
    </svg>
  );
}

function Stage({ locked, explore, interact }: { locked: boolean; explore: boolean; interact: () => void }) {
  const queue = useMemo(() => run(false), []);
  const stack = useMemo(() => run(true), []);
  const [takes, setTakes] = useState(1); // places each run has taken; A is taken before the learner begins
  const [playing, setPlaying] = useState(false);
  const { reach } = useMilestones(interact, ["split", "both-done"]);

  useEffect(() => {
    if (takes >= 2) reach("split");
    if (takes >= 6) reach("both-done");
  });

  useEffect(() => {
    if (!playing) return;
    if (takes >= 6) {
      setPlaying(false);
      return;
    }
    const quick = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setTakes((t) => t + 1), quick ? 0 : 70);
    return () => clearTimeout(id);
  }, [playing, takes]);

  const done = takes >= 6;
  const busy = locked || done || playing;

  return (
    <div className={s.wrap}>
      <p className={s.rule}>Take a place, add its unseen neighbours. One difference: take from the front, or the top.</p>
      <div className={s.panels}>
        <Panel title="Queue" snap={queue[takes - 1]} edge="front" explore={explore && !done} />
        <Panel title="Stack" snap={stack[takes - 1]} edge="top" explore={explore && !done} />
      </div>
      <Row>
        <button
          type="button"
          data-qa="control"
          className={`control ${s.tap}`}
          disabled={busy}
          onClick={() => !busy && setTakes((t) => t + 1)}
        >
          Take next
        </button>
        <button
          type="button"
          data-qa="control"
          className={`control ${s.tap}`}
          disabled={busy || takes < 2}
          onClick={() => !busy && takes >= 2 && setPlaying(true)}
        >
          Take the rest
        </button>
      </Row>
    </div>
  );
}

export default function QueueOrStackSameSearch({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A search keeps a to-do list of places to visit. You swap the list from a queue (first in, first out) to a stack (last in, first out). What changes?",
        options: ["Nothing", "The order places are visited", "It no longer reaches every place"],
        answer: 1,
      }}
      exploreHint="Take places one at a time and watch both lists."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Both lists reached all six places. The queue took <strong>A B C D E F</strong>, ring by ring. The stack took{" "}
            <strong>A C F E B D</strong>, going deep first.
          </p>
          <p>
            Same steps; only which waiting place came next changed. Look at E: the queue found it 2 hops from A, the stack 3
            (through C and F).
          </p>
          <p className="muted">Taking ring by ring is why a queue finds routes with the fewest hops.</p>
        </>
      )}
    >
      {({ phase, locked, interact }) => <Stage locked={locked} explore={phase === "explore"} interact={interact} />}
    </Lesson>
  );
}
