"use client";

// Area scales with the square. A 6-inch pizza sits in a 6-inch box. Scale every length by
// k: the box becomes k x k small boxes, and a circle fills the same share of its box at any
// size (pi/4), so the big pizza has the area of k^2 small pizzas. 12-inch = 4 six-inch.
// The small box keeps its size on screen, so the learner sees the big pizza grow.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const U = 50; // one 6-inch box, px
const PAD = 12;
const SIZE = 4 * U + 2 * PAD;
const TOPPAD = 16; // room for the width label above the box

export default function DoubleTheSize({ slug }: { slug: string }) {
  const [k, setK] = useState(1);
  const [seen, setSeen] = useState<number[]>([1]);
  const setSize = (v: number) => {
    setK(v);
    setSeen((a) => (a.includes(v) ? a : [...a, v]));
  };
  const todo = [3, 4].filter((v) => !seen.includes(v));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Ordering pizza, you compare a 12-inch round pizza with 6-inch ones. How many 6-inch pizzas have the same area as one 12-inch?",
        options: ["2", "4", "3"],
        answer: 1,
      }}
      exploreHint="Grow the pizza to 12 inches and count the 6-inch boxes."
      reveal={() => (
        <>
          <p>
            <strong>Four.</strong> Doubling the width also doubles the height, so the 12-inch box holds 2 × 2 = 4 of the
            6-inch boxes, each the size of one 6-inch pizza's box. A pizza fills the same share of its box at any size, so the big pizza is 4 small ones.
          </p>
          <p>
            Scale every length by k and the area grows by k × k: three times as wide is 9 times the pizza, four times is
            16.{todo.length ? ` Slide to ${todo.map((v) => 6 * v).join(" and ")} inches to see ${todo.map((v) => v * v).join(" and ")} boxes.` : ""}
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} k={k} setK={setSize} seen={seen} />}
    </Lesson>
  );
}

function Stage({ locked, interact, k, setK, seen }: StageContext & { k: number; setK: (v: number) => void; seen: number[] }) {
  const fired = useRef(false);
  useEffect(() => {
    if (!locked && k === 2 && !fired.current) {
      fired.current = true;
      interact();
    }
  }, [locked, k, interact]);

  const [asSmall, setAsSmall] = useState(false);
  const side = k * U;
  const x0 = PAD;
  const y0 = SIZE + TOPPAD - PAD - side;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE + TOPPAD}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`A ${6 * k}-inch pizza in a box of ${k * k} small boxes`}>
        <rect x={x0} y={y0} width={side} height={side} className={s.box} />
        <circle cx={x0 + side / 2} cy={y0 + side / 2} r={side / 2 - 1} className={asSmall ? s.outline : s.pizza} />
        {Array.from({ length: k * k }, (_, i) => {
          const c = i % k;
          const r = Math.floor(i / k);
          return (
            <g key={i}>
              <rect x={x0 + c * U} y={y0 + r * U} width={U} height={U} className={s.cell} />
              {asSmall && <circle cx={x0 + c * U + U / 2} cy={y0 + r * U + U / 2} r={U / 2 - 1} className={s.pizza} />}
            </g>
          );
        })}
        <text x={x0 + side / 2} y={y0 - 5} textAnchor="middle" className={s.label}>
          {6 * k} in
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : k === 1
            ? "One 6-inch pizza in its box, one box of area. Make it wider: try 12 inches."
            : asSmall
              ? `${k * k} six-inch pizzas, each leaving the same corners empty, hold as much pizza as one ${6 * k}-inch.`
              : `${k}× as wide and ${k}× as tall: ${k} × ${k} = ${k * k} six-inch boxes.`}
      </p>

      {!locked && (
        <p className={s.caption}>
          Seen: {[...seen].sort((a, b) => a - b).map((v) => `${6 * v} in = ${v * v} box${v === 1 ? "" : "es"}`).join(" · ")}
        </p>
      )}

      <Slider label="Pizza width" value={k} min={1} max={4} disabled={locked} format={(v) => `${6 * v} inches`} onChange={setK} />
      <Row>
        <Control disabled={locked} onClick={() => setAsSmall(!asSmall)} className={asSmall ? "active" : ""} aria-pressed={asSmall}>
          {asSmall ? "Show one big pizza" : "Fill with 6-inch pizzas"}
        </Control>
        <Readout label="6-inch boxes" value={locked ? "?" : k * k} />
      </Row>
    </div>
  );
}
