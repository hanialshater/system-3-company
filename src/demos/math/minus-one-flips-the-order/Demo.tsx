"use client";

// Minus one flips the order. A number line from -10 to 10, a circle at 2 and a square at 5.
// Each chip applies one operation to the original pair (not cumulative) and moves both shapes
// along arcs to their new places; the readout writes the true sign. A negative multiplier also
// draws the mirror at 0. Every operation tried is logged, so Reset cannot erase what the reveal quotes.
// Milestones: an operation that keeps the order; the question's case, times -1.
// Brief: company/domains/briefs/math.algebra.md, Wave J, brief 4 (check A4).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const A0 = 2;
const B0 = 5;
type Op = { id: string; label: string; say: string; f: (x: number) => number; neg: boolean };
const OPS: Op[] = [
  { id: "x2", label: "× 2", say: "Times 2", f: (x) => x * 2, neg: false },
  { id: "m3", label: "− 3", say: "Minus 3", f: (x) => x - 3, neg: false },
  { id: "xm1", label: "× (−1)", say: "Times −1", f: (x) => -x, neg: true },
  { id: "xm2", label: "× (−2)", say: "Times −2", f: (x) => x * -2, neg: true },
];
const MILESTONES = ["kept", "flipped"] as const;

const num = (x: number) => (x < 0 ? `−${-x}` : String(x));
const sign = (a: number, b: number) => (a < b ? "<" : a > b ? ">" : "=");

const VW = 360;
const VH = 104;
const L = 20;
const R = 340;
const LY = 72;
const ARC = 26;
const X = (v: number) => L + ((v + 10) / 20) * (R - L);

type Seen = { kept: { say: string; a: number; b: number } | null; tried: string[] };

function useArcTween(a: number, b: number) {
  const [pos, setPos] = useState({ a, b, t: 1 });
  const from = useRef({ a, b });
  useEffect(() => {
    const start = { ...from.current };
    if (start.a === a && start.b === b) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      from.current = { a, b };
      setPos({ a, b, t: 1 });
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 320);
      const e = t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
      const cur = { a: start.a + (a - start.a) * e, b: start.b + (b - start.b) * e };
      from.current = cur;
      setPos({ ...cur, t });
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [a, b]);
  const lift = Math.sin(Math.PI * pos.t) * ARC;
  return { a: pos.a, b: pos.b, lift: pos.t >= 1 ? 0 : lift };
}

export default function MinusOneFlipsTheOrder({ slug }: { slug: string }) {
  const [op, setOp] = useState<string | null>(null);
  const seen = useRef<Seen>({ kept: null, tried: [] });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "2 < 5. Multiply both sides by −1. Which is true?",
        options: ["−2 < −5", "−2 > −5", "−2 = −5"],
        answer: 1,
      }}
      exploreHint="Try a change that keeps the order, then × (−1)."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const k = seen.current.kept ?? { say: "Times 2", a: 4, b: 10 };
        return (
          <>
            <p>
              {k.say} moved the dots to {num(k.a)} and {num(k.b)}, and the circle stayed on the left. Times −1 mirrored both
              through 0: the circle landed on −2 and the square on −5, to its left. So −2 &gt; −5.
            </p>
            <p>
              Multiplying by a negative mirrors the line, and a mirror swaps left and right, so the sign flips. Adding,
              subtracting or multiplying by a positive keeps the order.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} op={op} setOp={setOp} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({ locked, interact, op, setOp, seen }: StageContext & { op: string | null; setOp: (v: string | null) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const cur = OPS.find((o) => o.id === op) ?? null;
  const a = cur ? cur.f(A0) : A0;
  const b = cur ? cur.f(B0) : B0;
  const tw = useArcTween(a, b);

  const pick = (o: Op) => {
    setOp(o.id);
    if (!seen.tried.includes(o.id)) seen.tried.push(o.id);
    const na = o.f(A0);
    const nb = o.f(B0);
    if (na < nb) {
      if (!seen.kept) seen.kept = { say: o.say, a: na, b: nb };
      reach("kept");
    }
    if (o.id === "xm1") reach("flipped");
  };

  const log = OPS.filter((o) => seen.tried.includes(o.id)).map((o) => `${o.label}: ${num(o.f(A0))} ${sign(o.f(A0), o.f(B0))} ${num(o.f(B0))}`);

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${VW} ${VH}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`circle at ${num(a)}, square at ${num(b)}`}>
        {cur?.neg && (
          <g>
            <line x1={X(0)} y1={10} x2={X(0)} y2={LY + 8} className={s.mirror} />
            <text x={X(0) + 4} y={14} className={s.mirrorLabel}>mirror</text>
          </g>
        )}
        <line x1={L} y1={LY} x2={R} y2={LY} className={s.axis} />
        {Array.from({ length: 21 }, (_, i) => {
          const v = i - 10;
          const major = v % 5 === 0;
          return (
            <g key={v}>
              <line x1={X(v)} y1={LY - (major ? 6 : 3)} x2={X(v)} y2={LY + (major ? 6 : 3)} className={s.tick} />
              {major && (
                <text x={X(v)} y={LY + 22} textAnchor="middle" className={s.tickLabel}>
                  {num(v)}
                </text>
              )}
            </g>
          );
        })}
        <g transform={`translate(${X(tw.a)} ${LY - tw.lift})`}>
          <circle r={7} className={s.circle} />
          <text y={-13} textAnchor="middle" className={s.val}>{num(Math.round(tw.a))}</text>
        </g>
        <g transform={`translate(${X(tw.b)} ${LY - tw.lift})`}>
          <rect x={-7} y={-7} width={14} height={14} className={s.square} />
          <text y={-13} textAnchor="middle" className={s.val}>{num(Math.round(tw.b))}</text>
        </g>
      </svg>

      <p className={s.readout} aria-live="polite">
        circle {num(a)} {sign(a, b)} square {num(b)}
      </p>
      <p className={s.log}>{locked || log.length === 0 ? " " : log.join(" · ")}</p>

      <Row>
        {OPS.map((o) => (
          <Control
            key={o.id}
            disabled={locked || op === o.id}
            className={`${s.tap} ${op === o.id ? "active" : ""}`}
            aria-pressed={op === o.id}
            aria-label={`${o.say}, both sides`}
            onClick={() => pick(o)}
          >
            {o.label}
          </Control>
        ))}
        <Control disabled={locked || op === null} className={s.tap} onClick={() => setOp(null)}>
          Reset
        </Control>
      </Row>
    </div>
  );
}
