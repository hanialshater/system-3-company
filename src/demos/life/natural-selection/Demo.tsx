"use client";

// Natural selection as compounding. Each generation the dark beetles leave a
// slightly larger share of the young, and the young keep their parent's colour.
// The stage is always 100 beetles standing for the whole (very large)
// population; every generation they are new beetles. No beetle changes colour.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const START = 0.01;
const MAX_GEN = 150;
const CELL = 30;

/** Share of dark beetles after g generations with relative edge e (deterministic, no drift). */
function darkShare(g: number, edgePct: number): number {
  const odds = (START / (1 - START)) * Math.pow(1 + edgePct / 100, g);
  return odds / (1 + odds);
}

// Seeded order in which grid spots turn dark, plus a little jitter so it reads as a crowd.
const SPOTS = (() => {
  let x = 424242;
  const next = () => (x = (x * 48271) % 2147483647) / 2147483647;
  const order = Array.from({ length: 100 }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const rank = Array(100).fill(0);
  order.forEach((spot, r) => (rank[spot] = r));
  return Array.from({ length: 100 }, (_, i) => ({
    x: (i % 10) * CELL + CELL / 2 + (next() - 0.5) * 6,
    y: Math.floor(i / 10) * CELL + CELL / 2 + (next() - 0.5) * 6,
    turn: Math.round((next() - 0.5) * 50),
    rank: rank[i],
  }));
})();

function Beetle({ x, y, turn, dark }: { x: number; y: number; turn: number; dark: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`} className={dark ? s.dark : s.pale}>
      <path d="M-7 -4 L-11 -7 M-7.5 1 L-12 1 M-7 5 L-11 9 M7 -4 L11 -7 M7.5 1 L12 1 M7 5 L11 9" className={s.legs} />
      <circle cx={0} cy={-10} r={4} className={s.head} />
      <ellipse cx={0} cy={1} rx={7.5} ry={10} className={s.body} />
      <line x1={0} y1={-8.5} x2={0} y2={10.5} className={s.seam} />
    </g>
  );
}

export default function NaturalSelection({ slug }: { slug: string }) {
  const [gen, setGen] = useState(0);
  const [edge, setEdge] = useState(10);
  const share = darkShare(gen, edge);
  const darkCount = Math.round(share * 100);
  const beetles = useMemo(() => SPOTS.map((b) => ({ ...b, dark: b.rank < darkCount })), [darkCount]);
  const pct = share >= 0.995 ? ">99%" : share < 0.1 ? `${(share * 100).toFixed(1)}%` : `${Math.round(share * 100)}%`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On sooty bark, dark beetles leave 10% more young than pale ones, and young keep their parent's colour. Dark starts at 1 in 100. After 100 generations, how many in 100 are dark?",
        options: ["About 2", "About 10", "About 50", "About 99"],
        answer: 3,
      }}
      exploreHint="Drag the generations to 100. Then shrink the edge and try again."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            A 10% edge looks tiny, and for 25 generations dark beetles stay under 10%. But the edge applies again every
            generation, to the population it already made. The dark-to-pale ratio grows 1.1&times; per generation:
            1.1<sup>100</sup> is about 14,000. By generation 100, about <strong>99 in 100</strong> are dark.
          </p>
          <p>
            No beetle ever changed colour. Each generation is new beetles, and more of them have dark parents. Shrink
            the edge to 1% and 100 generations only reach about 3%: selection needs time, not a big edge.
          </p>
          <p className="muted">
            Real case: near Manchester, dark peppered moths went from first recorded in 1848 to about 98% by 1895. This
            model ignores chance, which can lose a rare variant in small populations.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox="0 0 300 300" className={`stage-svg ${s.svg}`} role="img" aria-label={`Generation ${gen}: ${darkCount} of 100 beetles are dark`}>
            <rect x={0} y={0} width={300} height={300} rx={12} className={s.bark} />
            {beetles.map((b, i) => (
              <Beetle key={i} {...b} />
            ))}
          </svg>

          <p className={s.msg} aria-live="polite">
            {locked
              ? "Make a prediction to start."
              : gen === 0
                ? "Generation 0: 1 in 100 beetles is dark."
                : `Generation ${gen}: ${pct} dark. Every beetle here is new; none changed colour.`}
          </p>

          <Row>
            <Slider
              label="Generations"
              value={gen}
              min={0}
              max={MAX_GEN}
              disabled={locked}
              onChange={(v) => {
                setGen(v);
                interact();
              }}
            />
          </Row>
          <Row>
            <Slider
              label="Dark beetles' edge"
              value={edge}
              min={0}
              max={20}
              format={(v) => `+${v}% young`}
              disabled={locked}
              onChange={(v) => {
                setEdge(v);
                interact();
              }}
            />
          </Row>
          <Row>
            <Control
              disabled={locked || gen >= MAX_GEN}
              onClick={() => {
                setGen((g) => Math.min(MAX_GEN, g + 1));
                interact();
              }}
            >
              +1 gen
            </Control>
            <Control
              disabled={locked || gen >= MAX_GEN}
              onClick={() => {
                setGen((g) => Math.min(MAX_GEN, g + 10));
                interact();
              }}
            >
              +10 gens
            </Control>
            <Control
              disabled={locked || gen === 0}
              onClick={() => {
                setGen(0);
                interact();
              }}
            >
              Start over
            </Control>
            <Readout label="Dark" value={pct} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
