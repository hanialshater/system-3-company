"use client";

// Digits are logarithms. 2^n written out as a strip of digit cells, one cell per digit.
// Under the strip, a tick marks the length the strip had after 10, 20, 30, ... doublings.
// Because 2^10 = 1024 is about 1000, every 10 doublings add about 3 digits, so the ticks
// fall almost evenly: the strip's length (the digit count) grows in a straight line
// while the number explodes. 2^100 = 1267650600228229401496703205376 has 31 digits.
// Exact arithmetic with BigInt. The reveal waits until the learner reaches 2^100.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const MAX = 100;
const W = 320;
const H = 96;
const CELL = 9.8;
const X0 = 8;

const pow2 = (n: number) => (BigInt(1) << BigInt(n)).toString();
const digitsAt = (n: number) => pow2(n).length;
const DECADES = Array.from({ length: MAX / 10 }, (_, i) => (i + 1) * 10);

export default function DigitsAreLogs({ slug }: { slug: string }) {
  const [n, setN] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "2 doubled again and again: 2, 4, 8, 16, … (ten doublings give 1024). After 100 doublings you reach 2¹⁰⁰. How many digits does it have?",
        options: ["21", "31", "100"],
        answer: 1,
      }}
      exploreHint="Double your way to 100 and watch the ticks under the strip."
      reveal={() => (
        <>
          <p>
            <strong>31 digits</strong>: 2¹⁰⁰ = 1,267,650,600,228,229,401,496,703,205,376. Each 10
            doublings multiply by 1024, about 1000, and on your strip each round added exactly 3 digits. Start at 1 (one
            digit), add 3 ten times: 31.
          </p>
          <p>
            The number exploded, but its digit count climbed in a straight line. That count is what a logarithm
            measures: log₁₀(2¹⁰⁰) = 100 × 0.301 ≈ 30.1, and the digit count is the whole part plus one.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} n={n} setN={setN} />}
    </Lesson>
  );
}

function Stage({ locked, interact, n, setN }: StageContext & { n: number; setN: (v: number | ((p: number) => number)) => void }) {
  const [running, setRunning] = useState(false);
  const fired = useRef(false);
  useEffect(() => {
    if (!locked && n === MAX && !fired.current) {
      fired.current = true;
      interact();
    }
  }, [locked, n, interact]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setN((p) => {
        if (p >= MAX) return p;
        return p + 1;
      });
    }, 28);
    return () => window.clearInterval(id);
  }, [running, setN]);
  useEffect(() => {
    if (n >= MAX && running) setRunning(false);
  }, [n, running]);

  const str = pow2(n);
  const len = str.length;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`2 to the ${n} has ${len} digits`}>
        <text x={X0} y={20} className={s.title}>
          2<tspan dy={-7} className={s.sup}>{n}</tspan>
          <tspan dy={7}> has {len} digit{len === 1 ? "" : "s"}</tspan>
        </text>
        {str.split("").map((ch, i) => (
          <g key={i}>
            <rect x={X0 + i * CELL} y={32} width={CELL - 0.8} height={20} rx={2} className={s.cell} />
            <text x={X0 + i * CELL + CELL / 2 - 0.4} y={46} textAnchor="middle" className={s.digit}>
              {ch}
            </text>
          </g>
        ))}
        {/* where the strip had reached after each 10 doublings */}
        {DECADES.filter((d) => d <= n).map((d) => {
          const x = X0 + digitsAt(d) * CELL - 0.4;
          return (
            <g key={d}>
              <line x1={x} y1={54} x2={x} y2={64} className={s.tick} />
              <text x={x} y={75} textAnchor="middle" className={s.tickLabel}>
                {d}
              </text>
              <text x={x - ((digitsAt(d) - digitsAt(d - 10)) * CELL) / 2} y={63} textAnchor="middle" className={s.plus}>
                +{digitsAt(d) - digitsAt(d - 10)}
              </text>
            </g>
          );
        })}
        {n >= 10 && (
          <text x={X0} y={91} className={s.axis}>
            ticks mark the strip's length after 10, 20, 30 … doublings
          </text>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : n < 10
            ? "Each doubling is ×2. Ten of them are ×1024, about ×1000."
            : "Every 10 doublings: ×1024, about ×1000. Times 1000 adds three zeros, so 3 more digits."}
      </p>

      <Slider label="Doublings" value={n} min={0} max={MAX} disabled={locked} onChange={(v) => { setRunning(false); setN(v); }} />
      <Row>
        <Control disabled={locked || n >= MAX} onClick={() => { setRunning(false); setN(Math.min(MAX, n + 10)); }}>
          +10 doublings
        </Control>
        <Control disabled={locked || n >= MAX || running} onClick={() => setRunning(true)}>
          {running ? "Doubling…" : "Run to 100"}
        </Control>
        <Readout label="Digits" value={len} />
      </Row>
    </div>
  );
}
