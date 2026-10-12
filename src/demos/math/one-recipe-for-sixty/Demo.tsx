"use client";

// One recipe for 60. The learner picks the first split of 60 (2x30, 3x20, 4x15, 5x12 or
// 6x10); the tree then keeps splitting every non-prime until only primes are left, one
// level at a time. Each finished tree goes on a shelf with its primes in order. Different
// starts grow different trees, and every shelf entry reads 2 2 3 5: the fundamental
// theorem of arithmetic. Lower splits use the factor pair closest to the square root
// (30 -> 5x6, 20 -> 4x5, 15 -> 3x5, 12 -> 3x4, 10 -> 2x5, 6 -> 2x3, 4 -> 2x2), so the trees
// look as different as possible. The reveal waits for three different starts.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const STARTS: [number, number][] = [
  [2, 30],
  [3, 20],
  [4, 15],
  [5, 12],
  [6, 10],
];

type Node = { v: number; kids?: [Node, Node] };

const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};

function grow(v: number): Node {
  if (isPrime(v)) return { v };
  let a = Math.floor(Math.sqrt(v));
  while (v % a !== 0) a--;
  return { v, kids: [grow(a), grow(v / a)] };
}

function leaves(n: Node): number[] {
  return n.kids ? [...leaves(n.kids[0]), ...leaves(n.kids[1])] : [n.v];
}

const W = 320;
const H = 176;
const LEVEL = 46;

type Placed = { v: number; x: number; y: number; depth: number; prime: boolean; px?: number; py?: number };

function layout(root: Node): Placed[] {
  const out: Placed[] = [];
  const total = leaves(root).length;
  let leafIdx = 0;
  const gapX = (W - 40) / Math.max(total, 1);
  const walk = (n: Node, depth: number, parent?: Placed): Placed => {
    const y = 22 + depth * LEVEL;
    let x: number;
    const me: Placed = { v: n.v, x: 0, y, depth, prime: !n.kids, px: parent?.x, py: parent?.y };
    out.push(me);
    if (n.kids) {
      const before = out.length;
      const a = walk(n.kids[0], depth + 1, me);
      const b = walk(n.kids[1], depth + 1, me);
      x = (a.x + b.x) / 2;
      me.x = x;
      // children were placed before the parent's x was known: fix their parent link
      for (let i = before; i < out.length; i++) if (out[i] === a || out[i] === b) out[i].px = x;
    } else {
      me.x = 20 + gapX * (leafIdx + 0.5);
      leafIdx++;
    }
    return me;
  };
  walk(root, 0);
  return out;
}

const primeClass = (v: number) => (v === 2 ? s.p2 : v === 3 ? s.p3 : s.p5);

export default function OneRecipeForSixty({ slug }: { slug: string }) {
  const [start, setStart] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Break 60 into primes by splitting it into factors, then splitting those, and so on. How many different prime recipes can you get (order ignored)?",
        options: ["1", "2", "3"],
        answer: 0,
      }}
      exploreHint="Start 60 three different ways and compare the primes at the bottom."
      reveal={() => (
        <>
          <p>
            <strong>Just one.</strong> Different starts grow different trees: 6 × 10 splits into 2 · 3 and 2 · 5,
            4 × 15 into 2 · 2 and 3 · 5. But every entry on your shelf read 2 · 2 · 3 · 5.
          </p>
          <p>
            That is no accident with 60. Every whole number above 1 breaks into primes in exactly one way, apart from
            order. Primes are the atoms of multiplication, and each number has one recipe.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} start={start} setStart={setStart} tried={tried} setTried={setTried} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  start,
  setStart,
  tried,
  setTried,
}: StageContext & {
  start: number | null;
  setStart: (v: number) => void;
  tried: number[];
  setTried: (v: number[]) => void;
}) {
  const [replay, setReplay] = useState(0);
  const fired = useRef(false);
  useEffect(() => {
    if (!locked && tried.length >= 3 && !fired.current) {
      fired.current = true;
      interact();
    }
  }, [locked, tried, interact]);

  const root: Node = start === null ? { v: 60 } : { v: 60, kids: [grow(STARTS[start][0]), grow(STARTS[start][1])] };
  const nodes = layout(root);
  const bottom = start === null ? [] : leaves(root).sort((a, b) => a - b);

  const pick = (i: number) => {
    setStart(i);
    setReplay((r) => r + 1);
    if (!tried.includes(i)) setTried([...tried, i]);
  };

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={start === null ? "60, not yet split" : `60 split as ${STARTS[start].join(" times ")}`}>
        <g key={replay}>
          {nodes.map((n, i) =>
            n.px !== undefined && n.py !== undefined ? (
              <line key={`l${i}`} x1={n.px} y1={n.py + 12} x2={n.x} y2={n.y - 12} className={s.edge} style={{ animationDelay: `${(n.depth - 1) * 0.35}s` }} />
            ) : null,
          )}
          {nodes.map((n, i) => (
            <g key={`n${i}`} className={n.depth > 0 ? s.grow : undefined} style={{ animationDelay: `${(n.depth - 1) * 0.35}s` }}>
              <circle cx={n.x} cy={n.y} r={13} className={n.prime && n.depth > 0 ? primeClass(n.v) : s.comp} />
              <text x={n.x} y={n.y + 4.5} textAnchor="middle" className={s.num}>
                {n.v}
              </text>
            </g>
          ))}
        </g>
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : start === null
            ? "Pick a first split for 60. Branches stop at primes (coloured)."
            : tried.length < 3
              ? `Primes, in order: ${bottom.join(" · ")}. Try another start.`
              : `Every start ends in ${bottom.join(" · ")}.`}
      </p>

      {tried.length > 0 && (
        <ul className={s.shelf} aria-label="Trees you have grown">
          {tried.map((i) => (
            <li key={i}>
              <span className={s.from}>{STARTS[i].join("×")}</span>
              {[...leaves({ v: 60, kids: [grow(STARTS[i][0]), grow(STARTS[i][1])] })]
                .sort((a, b) => a - b)
                .map((p, j) => (
                  <span key={j} className={`${s.chip} ${primeClass(p)}`}>
                    {p}
                  </span>
                ))}
            </li>
          ))}
        </ul>
      )}

      <Row>
        {STARTS.map(([a, b], i) => (
          <Control key={i} disabled={locked} onClick={() => pick(i)} className={start === i ? "active" : ""} aria-pressed={start === i} aria-label={`Split 60 as ${a} times ${b}`}>
            {a} × {b}
          </Control>
        ))}
      </Row>
    </div>
  );
}
