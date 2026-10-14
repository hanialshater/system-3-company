"use client";

// Small-world shortcuts. 100 people on a ring, each knowing the 2 people on each side. The learner
// adds 1, 5, then 20 random long links (one fixed, nested sequence from seed 1) and reads two
// numbers computed on the stage by exact all-pairs BFS: average steps between two people, and
// clustering. Steps fall by about 60%; clustering barely moves.
// Key state: chips 1, 5 and 20 each pressed once (earn-the-reveal), so the reveal's three
// states (0, 5, 20) have all been on the stage.
// Drawing follows the "texture graph" rules, design-lead NCM rulings 2026-10-14 section 2.6.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CHIPS, N, SEED, measure, ringEdges, shortcuts } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["c1", "c5", "c20"] as const;
const RANDOM_LEVEL = 0.04; // about degree / N for a random network of this size (approximation)
const CX = 170;
const CY = 150;
const R = 140;
const pos = (i: number): [number, number] => {
  const a = (2 * Math.PI * i) / N - Math.PI / 2;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)];
};
const RING = ringEdges();
const ALL = shortcuts(20);
const f1 = (x: number) => x.toFixed(1);
const f3 = (x: number) => x.toFixed(3);

function Stage({ locked, interact, count, setCount }: { locked: boolean; interact: () => void; count: number; setCount: (c: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const m = useMemo(() => measure(count), [count]);
  const extra = ALL.slice(0, count);
  const ends = new Set(extra.flat());

  const press = (c: number) => {
    setCount(c);
    if (c > 0) reach(`c${c}`);
  };

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 300" className={`stage-svg ${s.svg}`} role="img" aria-label={`100 people in a ring, ${count} shortcuts, average ${f1(m.steps)} steps, clustering ${f3(m.clustering)}`}>
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
        {Array.from({ length: N }, (_, i) => {
          const [x, y] = pos(i);
          return <circle key={i} cx={x} cy={y} r={ends.has(i) ? 4.5 : 3} className={ends.has(i) ? s.dotEnd : s.dot} />;
        })}
      </svg>
      <p className={s.legend}>Lines across the ring are shortcuts. Seed {SEED}.</p>
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
        <Readout label="Average steps" value={f1(m.steps)} />
        <Readout
          label="Clustering"
          value={
            <>
              {f3(m.clustering)}
              <span className={s.bar} aria-hidden="true">
                <span className={s.fill} style={{ width: `${(m.clustering / 0.5) * 100}%` }} />
                <span className={s.ghost} style={{ left: `${(RANDOM_LEVEL / 0.5) * 100}%` }} />
              </span>
            </>
          }
        />
        <span className={s.ghostNote}>
          <span className={s.ghostSwatch} aria-hidden="true" /> Random network {RANDOM_LEVEL.toFixed(2)}
        </span>
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
          "100 people stand in a ring; each knows the 2 people on each side (200 links). Getting from one person to another takes 12.9 steps on average. Add just 5 random long-distance links. The average becomes about:",
        options: ["12 steps", "7 steps", "3 steps"],
        answer: 1,
      }}
      exploreHint="Press 1, then 5, then 20 shortcuts. Watch both numbers."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            On your ring, 5 shortcuts took the average from {f1(a0.steps)} to <strong>{f1(a5.steps)} steps</strong>, and 20 took it to{" "}
            {f1(a20.steps)}. Clustering, the share of a person&rsquo;s contacts who know each other, slid only from {f3(a0.clustering)} to{" "}
            {f3(a20.clustering)}; a random network this size would sit near {RANDOM_LEVEL.toFixed(2)}.
          </p>
          <p>
            Each long link bridges two far-apart neighbourhoods, and every route that can use it gets shorter. Nobody had to
            rewire the local circles: a few shortcuts shrink the world and leave the neighbourhoods tight.
          </p>
          <p className="muted">
            A model, not real people: links are added to the ring (Watts and Strogatz rewired them). One ring, seed {SEED};
            other seeds differ a little.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} count={count} setCount={setCount} />}
    </Lesson>
  );
}
