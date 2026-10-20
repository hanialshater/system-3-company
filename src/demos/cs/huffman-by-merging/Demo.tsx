"use client";

// Huffman coding by merging. Each merge puts one more bit on the code of every symbol
// beneath it, so it costs the merged weight in bits. The payoff: merge the rarest first
// and the common symbol stays near the top with a short code: 14 bits, not 16.
// One representation: the growing code tree, codes written under its leaves.
// "Try 10-bit codes" writes A 0, B 1, C 00, D 01 under the same leaves (tree hidden) and shows why
// they fail: A's 0 starts C's 00, so "00" reads as C or as A A. The reveal waits for that and the tree.
// QA press order: Try 10-bit codes, Join the two rarest, (CD), B -> both milestones.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

type Tree = { id: string; w: number; sym?: string; l?: Tree; r?: Tree };
const LEAVES: Tree[] = [
  { id: "C", w: 1, sym: "C" },
  { id: "D", w: 1, sym: "D" },
  { id: "B", w: 2, sym: "B" },
  { id: "A", w: 4, sym: "A" },
];
const FIXED = 16;
/** The too-short code set from the 10-bit option: cheaper, but codes start one another. */
const SHORT: Record<string, string> = { A: "0", B: "1", C: "00", D: "01" };
const SHORT_BITS = LEAVES.reduce((a, t) => a + t.w * SHORT[t.sym!].length, 0); // 10

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
const H = 268;

export default function HuffmanByMerging({ slug }: { slug: string }) {
  const [forest, setForest] = useState<Tree[]>(LEAVES);
  const [sel, setSel] = useState<number | null>(null);
  const [bits, setBits] = useState(0);
  const [built, setBuilt] = useState<number[]>([]); // totals of finished trees
  const [joins, setJoins] = useState<number[]>([]); // cost of each join so far
  const [short, setShort] = useState(false);

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
          "A message has 4 A's, 2 B's, 1 C and 1 D. Giving every letter a 2-digit code (00, 01, 10, 11) costs 16 bits, where a bit is one 0 or 1. If common letters may get shorter codes, how few bits can the message take?",
        options: ["16", "14", "10"],
        answer: 1,
      }}
      exploreHint="Tap two circles to join them. Each join puts one more digit on every letter below it."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {done && bits < FIXED
              ? `Your tree costs ${bits} bits, against 16. `
              : built.length
                ? `Your trees cost ${built.join(" and ")} bits. `
                : ""}
            Each join puts one more digit on every letter inside it, so a join costs the group's total count. Joining
            the rarest first costs 2 + 4 + 8 = <strong>14</strong>, the sum on the Bits readout.
          </p>
          <p>
            The {SHORT_BITS}-bit codes you tried failed: A&rsquo;s 0 starts C&rsquo;s 00, so &ldquo;00&rdquo; could be C or
            A A. {done && bits < FIXED
              ? `Your tree's codes: ${Object.entries(code).sort().map(([k, v]) => `${k} ${v}`).join(", ")}. `
              : "The best tree gives A 1, B 01, C 000, D 001. "}
            No code starts another (nothing else begins with A's 1), so the message decodes with no gaps. Joining the two rarest first gives a minimum-length binary prefix code for these symbol counts.
          </p>
          <p className="muted">Common letters get short codes, rare ones long codes.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
      <Milestones interact={interact} names={["short-fails", "best-tree"]}>
        {(reach) => {
        const join = (a: number, b: number, f: Tree[], total: number) => {
          let next = f.filter((_, i) => i !== a && i !== b);
          const m = merge(f[a], f[b]);
          next.splice(Math.min(a, b), 0, m);
          total += m.w;
          const costs = [...(f.length === 4 ? [] : joins), m.w];
          // With two groups left there is only one join possible: make it.
          if (next.length === 2) {
            const last = merge(next[0], next[1]);
            total += last.w;
            costs.push(last.w);
            next = [last];
          }
          setForest(next);
          setBits(total);
          setJoins(costs);
          setShort(false);
          setSel(null);
          if (next.length === 1) {
            setBuilt((x) => [...x, total]);
            if (total < FIXED) reach("best-tree");
          }
        };
        const tap = (i: number) => {
          if (locked || done || short) return;
          if (sel === null) setSel(i);
          else if (sel === i) setSel(null);
          else join(sel, i, forest, bits);
        };
        const lightest = () => {
          if (locked || done) return;
          const idx = forest.map((t, i) => ({ w: t.w, i })).sort((x, y) => x.w - y.w || y.i - x.i);
          const [lo, hi] = [idx[0].i, idx[1].i].sort((x, y) => x - y);
          join(lo, hi, forest, bits);
        };
        const reset = () => {
          if (locked) return;
          setForest(LEAVES);
          setSel(null);
          setBits(0);
          setJoins([]);
        };
        const toggleShort = () => {
          if (locked) return;
          setSel(null);
          setShort((v) => !v);
          if (!short) reach("short-fails");
        };
        const bitsText = short
          ? `${SHORT_BITS}?`
          : joins.length
            ? `${joins.join(" + ")}${done ? ` = ${bits}` : ""}`
            : "0";

        const msg = locked
          ? "Make a prediction to start."
          : short
            ? `${SHORT_BITS} bits, but is “00” C, or A then A? A's 0 starts C's 00.`
          : done
            ? bits >= FIXED
              ? `Done: ${bits} bits, no better than fixed. Start over and join the two rarest first.`
              : `Done: ${bits} bits, versus ${FIXED} fixed.`
            : sel !== null
              ? "Now tap another circle to join them."
              : forest.length === 4
                ? "The number is how many times the letter appears."
                : "Join two of these. The last two then join on their own.";

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>
            <Row>
              <Control className={short ? "active" : ""} aria-pressed={short} disabled={locked} onClick={toggleShort}>
                {short ? "Back to the tree" : `Try ${SHORT_BITS}-bit codes`}
              </Control>
              <Control disabled={locked || done} onClick={lightest}>
                Join the two rarest
              </Control>
              <Readout label="Bits" value={bitsText} />
            </Row>

            <div className={s.tree} style={{ aspectRatio: `${W} / ${H}` }}>
              <svg viewBox={`0 0 ${W} ${H}`} className={s.lines} aria-hidden="true">
                {all
                  .filter((t) => !short && t.l && t.r)
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
                  const c = short ? SHORT[leaf.sym!] : code[leaf.sym!];
                  // In the 10-bit view, mark A's 0 and the codes it starts (C 00, D 01).
                  const clash = short && leaf.sym !== "B";
                  return (
                    <g key={leaf.id}>
                      <text
                        x={p.x}
                        y={BOTTOM + 38}
                        textAnchor="middle"
                        className={s.code}
                        style={clash ? { fill: "var(--bad)" } : undefined}
                      >
                        {c || "–"}
                      </text>
                      <text x={p.x} y={BOTTOM + 56} textAnchor="middle" className={s.cost}>
                        {c ? `${leaf.w}×${c.length}=${leaf.w * c.length}` : ""}
                      </text>
                    </g>
                  );
                })}
              </svg>
              {all.filter((t) => !short || t.sym).map((t) => {
                const p = pos.get(t.id)!;
                const rootIdx = forest.indexOf(t);
                const style = { left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` };
                const label = t.sym ? `${t.sym} ${t.w}` : String(t.w);
                return rootIdx >= 0 && !done && !short ? (
                  <Control
                    key={t.id}
                    className={`${s.node} ${t.sym ? s.leaf : ""} ${sel === rootIdx ? s.sel : ""}`}
                    style={style}
                    disabled={locked}
                    aria-pressed={sel === rootIdx}
                    aria-label={t.sym ? `${t.sym}, appears ${t.w} times` : `Group made of letters that appear ${t.w} times in all`}
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
      </Milestones>
      )}
    </Lesson>
  );
}
