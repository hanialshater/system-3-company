"use client";

// Naive recursion as a tree the learner opens call by call. The payoff is not the
// recurrence (procedure) but the repeats: fib(2) is worked out three times, fib(3)
// twice, and "remember answers" folds the 15-call tree down to 6 real computations.
// One representation: the call tree.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const ROOT_N = 5;
const W = 320;
const ROW = 54;
const H = ROW * 4 + 40;

type Node = { id: string; n: number; depth: number; x: number; y: number; kids: string[] };

function buildTree() {
  const nodes = new Map<string, Node>();
  let leaf = 0;
  const leaves = 8; // fib(5) with fib(0) = fib(1) = 1 has 8 leaves
  const slot = W / leaves;
  const walk = (id: string, n: number, depth: number): number => {
    const y = 22 + depth * ROW;
    if (n < 2) {
      const x = slot * leaf + slot / 2;
      leaf += 1;
      nodes.set(id, { id, n, depth, x, y, kids: [] });
      return x;
    }
    // Left child is fib(n-1), evaluated first; right child is fib(n-2).
    const xl = walk(id + "L", n - 1, depth + 1);
    const xr = walk(id + "R", n - 2, depth + 1);
    const x = (xl + xr) / 2;
    nodes.set(id, { id, n, depth, x, y, kids: [id + "L", id + "R"] });
    return x;
  };
  walk("", ROOT_N, 0);
  return nodes;
}

// With remembered answers, evaluation goes down the left edge; every right child is a lookup.
const MEMO_COMPUTED = new Set(["", "L", "LL", "LLL", "LLLL", "LLLR"]);
const MEMO_LOOKUP = new Set(["R", "LR", "LLR"]);

export default function FibCallExplosion({ slug }: { slug: string }) {
  const tree = useMemo(buildTree, []);
  const internal = useMemo(() => [...tree.values()].filter((t) => t.kids.length).map((t) => t.id), [tree]);
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [memo, setMemo] = useState(false);
  const [sawFull, setSawFull] = useState(false);

  const visible = useMemo(() => {
    if (memo) return [...tree.values()].filter((t) => MEMO_COMPUTED.has(t.id) || MEMO_LOOKUP.has(t.id));
    const out: Node[] = [];
    const go = (id: string) => {
      const t = tree.get(id)!;
      out.push(t);
      if (open.has(id)) t.kids.forEach(go);
    };
    go("");
    return out;
  }, [tree, open, memo]);

  const full = !memo && open.size === internal.length;
  const countBy = new Map<number, number>();
  for (const v of visible) countBy.set(v.n, (countBy.get(v.n) ?? 0) + 1);
  const repeats = [4, 3, 2].filter((n) => (countBy.get(n) ?? 0) > 1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "fib(n) = fib(n-1) + fib(n-2), and fib(1), fib(0) just return 1. Every use of fib counts as one call. How many calls does fib(5) make in total?",
        options: ["5", "9", "15"],
        answer: 2,
      }}
      exploreHint="Tap calls to open them. Watch for the same call twice."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Opened all the way, fib(5) makes <strong>15</strong> calls. Most of them are repeats: fib(3) is worked out
            twice and fib(2) three times, each time from scratch.
          </p>
          <p>
            Remembering each answer the first time removes the repeats. fib(5) then computes just 6 values, fib(0) to
            fib(5), and the other 3 calls are instant lookups. The gap explodes as n grows: fib(30) makes 2,692,537
            calls the naive way, but only 31 values need computing.
          </p>
          <p className="muted">Recursion repeats itself. Memoization means never solving the same piece twice.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const markFull = (next: Set<string>) => {
          if (next.size === internal.length && !sawFull) {
            setSawFull(true);
            interact();
          }
        };
        const tap = (id: string) => {
          if (locked || memo) return;
          const next = new Set(open);
          if (next.has(id)) {
            for (const k of [...next]) if (k.startsWith(id)) next.delete(k);
          } else next.add(id);
          setOpen(next);
          markFull(next);
        };
        const openAll = () => {
          if (locked) return;
          const next = full ? new Set<string>() : new Set(internal);
          setMemo(false);
          setOpen(next);
          markFull(next);
        };
        const toggleMemo = () => {
          if (locked || !sawFull) return;
          if (!memo) interact();
          setMemo((m) => !m);
        };

        const msg = locked
          ? "Make a prediction to start."
          : memo
            ? "Remembering: 6 computed, 3 looked up."
            : visible.length === 1
              ? "Each circle is one call. Tap fib(5)."
              : repeats.length
                ? `Repeats: ${repeats.map((n) => `fib(${n}) ×${countBy.get(n)}`).join(", ")}`
                : "Keep opening calls.";

        return (
          <div className={s.wrap}>
            <Row>
              <Control disabled={locked} onClick={openAll}>
                {full ? "Close all" : "Open every call"}
              </Control>
              <Control className={memo ? "active" : ""} disabled={locked || !sawFull} aria-pressed={memo} onClick={toggleMemo}>
                {memo ? "Forget answers" : "Remember answers"}
              </Control>
              <Readout label={memo ? "Computed" : "Calls"} value={memo ? 6 : visible.length} />
            </Row>

            <p className={s.msg} aria-live="polite">
              {msg}
            </p>

            <div className={s.tree} style={{ aspectRatio: `${W} / ${H}` }}>
              <svg viewBox={`0 0 ${W} ${H}`} className={s.lines} aria-hidden="true">
                {visible.map((v) =>
                  v.depth === 0 ? null : (
                    <line
                      key={v.id}
                      x1={tree.get(v.id.slice(0, -1))!.x}
                      y1={tree.get(v.id.slice(0, -1))!.y}
                      x2={v.x}
                      y2={v.y}
                      stroke="var(--muted)"
                      strokeWidth={1.5}
                      strokeDasharray={memo && MEMO_LOOKUP.has(v.id) ? "3 3" : undefined}
                    />
                  ),
                )}
              </svg>
              {visible.map((v) => {
                const style = { left: `${(v.x / W) * 100}%`, top: `${(v.y / H) * 100}%` };
                const rep = !memo && (countBy.get(v.n) ?? 0) > 1 && v.n >= 2;
                const cls = `${s.node} ${s[`n${v.n}`] ?? ""} ${rep ? s.rep : ""} ${memo && MEMO_LOOKUP.has(v.id) ? s.lookup : ""}`;
                const label = v.depth === 0 ? "fib(5)" : String(v.n);
                return v.kids.length && !memo ? (
                  <Control
                    key={v.id}
                    className={`${cls} ${open.has(v.id) ? s.opened : s.closed}`}
                    style={style}
                    disabled={locked}
                    aria-label={`Call fib(${v.n}), ${open.has(v.id) ? "open: tap to close" : "tap to open"}`}
                    onClick={() => tap(v.id)}
                  >
                    {label}
                  </Control>
                ) : (
                  <span key={v.id} className={cls} style={style} aria-label={`fib(${v.n})${memo && MEMO_LOOKUP.has(v.id) ? ", looked up" : ""}`}>
                    {label}
                  </span>
                );
              })}
            </div>
            <p className="muted small" style={{ margin: 0, textAlign: "center" }}>
              {memo ? "Dashed = answer already remembered" : "Same number = same work, done again"}
            </p>
          </div>
        );
      }}
    </Lesson>
  );
}
