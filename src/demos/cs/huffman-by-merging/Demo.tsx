"use client";

// Huffman coding by merging. Each merge puts one more bit on the code of every symbol
// beneath it, so it costs the merged weight in bits. The payoff: merge the rarest first
// and the common symbol stays near the top with a short code: 14 bits, not 16.
// One representation: the growing code tree, codes written under its leaves.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

type Tree = { id: string; w: number; sym?: string; l?: Tree; r?: Tree };
const LEAVES: Tree[] = [
  { id: "A", w: 4, sym: "A" },
  { id: "B", w: 2, sym: "B" },
  { id: "C", w: 1, sym: "C" },
  { id: "D", w: 1, sym: "D" },
];
const FIXED = 16;

const height = (t: Tree): number => (t.l && t.r ? 1 + Math.max(height(t.l), height(t.r)) : 0);
const leavesOf = (t: Tree): Tree[] => (t.l && t.r ? [...leavesOf(t.l), ...leavesOf(t.r)] : [t]);
function codes(t: Tree, prefix = "", out: Record<string, string> = {}) {
  if (t.sym) out[t.sym] = prefix;
  else if (t.l && t.r) {
    codes(t.l, prefix + "0", out);
    codes(t.r, prefix + "1", out);
  }
  return out;
}
function merge(a: Tree, b: Tree): Tree {
  return { id: `(${a.id}${b.id})`, w: a.w + b.w, l: a, r: b };
}

const W = 320;
const BOTTOM = 190;
const LEVEL = 52;

export default function HuffmanByMerging({ slug }: { slug: string }) {
  const [forest, setForest] = useState<Tree[]>(LEAVES);
  const [sel, setSel] = useState<number | null>(null);
  const [bits, setBits] = useState(0);
  const [built, setBuilt] = useState<number[]>([]); // totals of finished trees

  const done = forest.length === 1;
  const code: Record<string, string> = {};
  for (const t of forest) codes(t, "", code);

  // Layout: leaves left to right in forest order; parents sit above their children.
  const order = forest.flatMap(leavesOf);
  const slot = W / order.length;
  const pos = new Map<string, { x: number; y: number }>();
  const place = (t: Tree): number => {
    let x: number;
    if (t.l && t.r) x = (place(t.l) + place(t.r)) / 2;
    else x = slot * order.indexOf(t) + slot / 2;
    pos.set(t.id, { x, y: BOTTOM - height(t) * LEVEL });
    return x;
  };
  forest.forEach(place);
  const all: Tree[] = [];
  const walk = (t: Tree) => {
    all.push(t);
    if (t.l && t.r) {
      walk(t.l);
      walk(t.r);
    }
  };
  forest.forEach(walk);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A message has 4 A's, 2 B's, 1 C and 1 D. Fixed 2-bit codes (00, 01, 10, 11) cost 16 bits. Codes can differ in length if none is the start of another. How few bits can it take?",
        options: ["16", "14", "10"],
        answer: 1,
      }}
      exploreHint="Tap two circles to join them. Each join adds a bit to everything below it."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {built.length ? `Your tree${built.length > 1 ? "s" : ""} cost ${built.join(" and ")} bits. ` : ""}
            Joining two groups puts one more bit on every symbol inside them, so a join costs its weight. Join the two
            rarest first (C + D = 2, then with B = 4, then with A = 8) and the total is 2 + 4 + 8 = <strong>14</strong>.
          </p>
          <p>
            No code is the start of another (
            {done
              ? Object.entries(code)
                  .sort()
                  .map(([k, v]) => `${k} ${v}`)
                  .join(", ")
              : "A 0, B 10, C 110, D 111"}
            ), so the message decodes without gaps. Always joining the two lightest gives the fewest bits possible:
            Huffman coding.
          </p>
          <p className="muted">Short codes for common symbols, long codes for rare ones.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const join = (a: number, b: number, f: Tree[], total: number) => {
          let next = f.filter((_, i) => i !== a && i !== b);
          const m = merge(f[a], f[b]);
          next.splice(Math.min(a, b), 0, m);
          total += m.w;
          // With two groups left there is only one join possible: make it.
          if (next.length === 2) {
            const last = merge(next[0], next[1]);
            total += last.w;
            next = [last];
          }
          setForest(next);
          setBits(total);
          setSel(null);
          if (next.length === 1) {
            setBuilt((x) => [...x, total]);
            interact();
          }
        };
        const tap = (i: number) => {
          if (locked || done) return;
          if (sel === null) setSel(i);
          else if (sel === i) setSel(null);
          else join(sel, i, forest, bits);
        };
        const lightest = () => {
          if (locked || done) return;
          const idx = forest.map((t, i) => ({ w: t.w, i })).sort((x, y) => x.w - y.w || y.i - x.i);
          join(idx[0].i, idx[1].i, forest, bits);
        };
        const reset = () => {
          if (locked) return;
          setForest(LEAVES);
          setSel(null);
          setBits(0);
        };

        const msg = locked
          ? "Make a prediction to start."
          : done
            ? bits >= FIXED
              ? `Done: ${bits} bits, no better than fixed. Start over?`
              : `Done: ${bits} bits, versus ${FIXED} fixed.`
            : sel !== null
              ? "Now tap another circle to join them."
              : forest.length === 4
                ? "Each circle shows how often it appears."
                : "When two are left, they join automatically.";

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>
            <Row>
              <Control disabled={locked || done} onClick={lightest}>
                Join the two lightest
              </Control>
              <Readout label="Bits" value={bits} />
            </Row>

            <div className={s.tree} style={{ aspectRatio: `${W} / 250` }}>
              <svg viewBox={`0 0 ${W} 250`} className={s.lines} aria-hidden="true">
                {all
                  .filter((t) => t.l && t.r)
                  .flatMap((t) =>
                    [t.l!, t.r!].map((c, k) => {
                      const p = pos.get(t.id)!;
                      const q = pos.get(c.id)!;
                      return (
                        <g key={c.id}>
                          <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="var(--muted)" strokeWidth={1.5} />
                          <text x={(p.x + q.x) / 2 + (k ? 7 : -7)} y={(p.y + q.y) / 2} textAnchor="middle" className={s.bit}>
                            {k}
                          </text>
                        </g>
                      );
                    }),
                  )}
                {order.map((leaf) => {
                  const p = pos.get(leaf.id)!;
                  return (
                    <text key={leaf.id} x={p.x} y={BOTTOM + 40} textAnchor="middle" className={s.code}>
                      {code[leaf.sym!] || "–"}
                    </text>
                  );
                })}
              </svg>
              {all.map((t) => {
                const p = pos.get(t.id)!;
                const rootIdx = forest.indexOf(t);
                const style = { left: `${(p.x / W) * 100}%`, top: `${(p.y / 250) * 100}%` };
                const label = t.sym ? `${t.sym}×${t.w}` : String(t.w);
                return rootIdx >= 0 && !done ? (
                  <Control
                    key={t.id}
                    className={`${s.node} ${t.sym ? s.leaf : ""} ${sel === rootIdx ? s.sel : ""}`}
                    style={style}
                    disabled={locked}
                    aria-pressed={sel === rootIdx}
                    aria-label={t.sym ? `${t.sym}, appears ${t.w} times` : `Group of weight ${t.w}`}
                    onClick={() => tap(rootIdx)}
                  >
                    {label}
                  </Control>
                ) : (
                  <span key={t.id} className={`${s.node} ${t.sym ? s.leaf : ""} ${s.fixed}`} style={style}>
                    {label}
                  </span>
                );
              })}
            </div>

            <Row>
              <span className="muted small">Codes under each letter.</span>
              <Control disabled={locked || forest.length === 4} onClick={reset}>
                Start over
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
