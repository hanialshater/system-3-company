"use client";

// Small-world shortcuts. 100 people on a ring, each knowing the 2 people on each side. The learner
// adds 1, 5, then 20 random long links (one fixed, nested sequence from seed 1) and watches two
// numbers computed on the stage by exact BFS: the steps of one traced route (person A to person B,
// drawn as a thick line) and the average steps between two people over all pairs.
// Clustering is not on the stage (it had no prediction); the reveal defines it in one sentence.
// Key state: chips 1, 5 and 20 each pressed once (earn-the-reveal), so the reveal's three
// states (0, 5, 20) have all been on the stage.
// Drawing follows the "texture graph" rules, design-lead NCM rulings 2026-10-14 section 2.6.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CHIPS, N, SEED, measure, ringEdges, route, shortcuts } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["c1", "c5", "c20"] as const;
const RANDOM_LEVEL = 0.04; // about degree / N for a random network of this size (approximation)
const A = 3; // the traced pair: far apart on the ring (24 steps with no shortcuts)
const B = 50;
const CX = 170;
const CY = 150;
const R = 130;
const pos = (i: number, r = R): [number, number] => {
  const a = (2 * Math.PI * i) / N - Math.PI / 2;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};
const RING = ringEdges();
const ALL = shortcuts(20);
const f1 = (x: number) => x.toFixed(1);
const f3 = (x: number) => x.toFixed(3);
const hopsAt = (c: number) => route(c, A, B).length - 1;

function Stage({ locked, interact, count, setCount }: { locked: boolean; interact: () => void; count: number; setCount: (c: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const m = useMemo(() => measure(count), [count]);
  const path = useMemo(() => route(count, A, B), [count]);
  const hops = path.length - 1;
  const extra = ALL.slice(0, count);
  const ends = new Set(extra.flat());

  const press = (c: number) => {
    setCount(c);
    if (c > 0) reach(`c${c}`);
  };

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 300" className={`stage-svg ${s.svg}`} role="img" aria-label={`100 people in a ring, ${count} shortcuts, route from A to B ${hops} steps, average ${f1(m.steps)} steps`}>
        {RING.map(([a, b]) => {
          const [x1, y1] = pos(a);
          const [x2, y2] = pos(b);
          return <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} className={s.ringEdge} />;
        })}
        {extra.map(([a, b]) => {
          const [x1, y1] = pos(a);
          const [x2, y2] = pos(b);
          return <line key={`s${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} className={s.shortcut} />;
        })}
        {path.slice(1).map((v, i) => {
          const [x1, y1] = pos(path[i]);
          const [x2, y2] = pos(v);
          return <line key={`r${i}-${path[i]}-${v}`} x1={x1} y1={y1} x2={x2} y2={y2} className={s.route} />;
        })}
        {Array.from({ length: N }, (_, i) => {
          const [x, y] = pos(i);
          return <circle key={i} cx={x} cy={y} r={ends.has(i) ? 4.5 : 3} className={ends.has(i) ? s.dotEnd : s.dot} />;
        })}
        {path.map((v) => {
          const [x, y] = pos(v);
          return <circle key={`p${v}`} cx={x} cy={y} r={5} className={s.routeDot} />;
        })}
        {[A, B].map((v, i) => {
          const [x, y] = pos(v, R + 14);
          return (
            <text key={v} x={x} y={y} textAnchor="middle" dominantBaseline="central" className={s.tag}>
              {i === 0 ? "A" : "B"}
            </text>
          );
        })}
      </svg>
      <p className={s.legend}>Thick line and big dots: the shortest route from A to B, one step per line between dots. Coloured lines are shortcuts.</p>
      <Row>
        <span className={s.chipLabel}>Shortcuts</span>
        {CHIPS.map((c) => (
          <Control
            key={c}
            disabled={locked || count === c}
            className={`${s.chip} ${count === c ? "active" : ""}`}
            aria-pressed={count === c}
            onClick={() => press(c)}
          >
            {c}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Route A to B" value={`${hops} steps`} />
        <Readout label="Average steps, any two" value={f1(m.steps)} />
      </Row>
    </div>
  );
}

export default function FewShortcutsShrinkTheWorld({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);
  const a0 = measure(0);
  const a5 = measure(5);
  const a20 = measure(20);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In a village of 100 people living in a ring, each knows the 2 people on each side (200 links). A note passed hand to hand takes 12.9 steps on average. Add 5 random long-distance links. Now about:",
        options: ["12 steps", "3 steps", "7 steps"],
        answer: 2,
      }}
      exploreHint="Press 1, then 5, then 20 shortcuts. Watch the thick route from A to B, and the average."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Follow A to B: {hopsAt(0)} steps around the ring, {hopsAt(5)} with 5 shortcuts, {hopsAt(20)} with 20. The average over all pairs
            went from {f1(a0.steps)} to <strong>{f1(a5.steps)} steps</strong> with 5 shortcuts, and to {f1(a20.steps)} with 20.
          </p>
          <p>
            Each shortcut joins two far-apart neighbourhoods, and every pair it helps gets a shorter route. Nobody had to rewire the
            local circles. They stay tight: the share of a person&rsquo;s contacts who know each other (clustering) slid only from{" "}
            {f3(a0.clustering)} to {f3(a20.clustering)}; a random network this size would sit near {RANDOM_LEVEL.toFixed(2)}.
          </p>
          <p className="muted">
            A model, not real people: links are added to the ring (Watts and Strogatz rewired them). One ring, seed {SEED}; shortcut
            ends are random, so they can bunch up, and other seeds differ a little.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} count={count} setCount={setCount} />}
    </Lesson>
  );
}
