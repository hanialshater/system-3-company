"use client";

// Random walk. 30 seeded walkers each step 1 m left or right on a coin flip. The stage stacks
// their end positions on a fixed number line. Going from 10 to 100 to 1,000 steps, the pile
// widens only about 3x each time (10x the steps): distance grows like the square root.
// Key state: 100 steps, then 1,000 steps.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { STEPS, WALKERS, exactMeanDist, spread, walkers } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["n100", "n1000"] as const;
const Q_STEPS = 100;
const Q_DIST = Math.round(exactMeanDist(Q_STEPS)); // 8
const ALL = walkers(0); // seed 1921, untuned; one fixed batch so the reveal quotes what the stage drew
const fmt = (n: number) => n.toLocaleString("en-US");

const W = 340;
const L = 14;
const R = 14;
const SPAN = 90;
const BASE = 150;
const BIN = 6;
const sx = (x: number) => L + ((x + SPAN) / (2 * SPAN)) * (W - L - R);

function Stage({ locked, interact, n, setN }: {
  locked: boolean;
  interact: () => void;
  n: number;
  setN: (n: number) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const all = ALL;
  const sp = spread(all, n);
  const base = spread(all, STEPS[0]).meanDist;
  const dots = useMemo(() => {
    const h: Record<number, number> = {};
    // bins [6k, 6k+6) hold the even positions 6k, 6k+2, 6k+4; draw at their middle, 6k+2
    const placed = all.map((p) => {
      const b = Math.floor(p[n] / BIN) * BIN + 2;
      return { x: p[n], b, level: (h[b] = (h[b] ?? 0) + 1) - 1 };
    });
    const tallest = Math.max(...Object.values(h));
    const gap = Math.min(9.5, 118 / Math.max(1, tallest - 1)); // a tall pile squeezes to fit
    return placed.map((d) => ({ x: d.x, cx: sx(d.b), cy: BASE - 6 - d.level * gap }));
  }, [n]);

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} 178`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${WALKERS} walkers after ${n} steps; average distance ${sp.meanDist.toFixed(1)} m`}>
        <text x={4} y={12} className={s.label}>
          Where {WALKERS} walkers end after {fmt(n)} steps
        </text>
        <line x1={L} x2={W - R} y1={BASE} y2={BASE} className={s.axis} />
        {[-80, -40, 0, 40, 80].map((t) => (
          <g key={t}>
            <line x1={sx(t)} x2={sx(t)} y1={BASE} y2={BASE + 5} className={s.axis} />
            <text x={sx(t)} y={BASE + 17} textAnchor="middle" className={s.tick}>
              {t === 0 ? "start" : `${t} m`}
            </text>
          </g>
        ))}
        {!locked && (
          <g>
            <rect x={sx(-sp.meanDist)} y={BASE + 22} width={sx(sp.meanDist) - sx(-sp.meanDist)} height={4} rx={2} className={s.band} />
          </g>
        )}
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={4.4} className={s.dot} />
        ))}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked ? "Make a prediction to start." : "Bar: average distance from the start, either direction."}
      </p>
      <Row>
        {STEPS.map((k) => (
          <Control
            key={k}
            className={k === n ? "active" : ""}
            aria-pressed={k === n}
            disabled={locked || k === n}
            onClick={() => {
              setN(k);
              if (k === 100) reach("n100");
              if (k === 1000) reach("n1000");
            }}
          >
            {fmt(k)} steps
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Average distance" value={locked ? "?" : `${sp.meanDist.toFixed(1)} m`} />
        <Readout label="Farthest" value={locked ? "?" : `${sp.max} m`} />
        <Readout label="vs 10 steps" value={locked ? "?" : `${n / STEPS[0]}x steps, ${(sp.meanDist / base).toFixed(1)}x distance`} />
      </Row>
    </div>
  );
}

export default function DrunkWalk({ slug }: { slug: string }) {
  const [n, setN] = useState(10);
  const sp = spread(ALL, Q_STEPS);
  const sp1k = spread(ALL, 1000);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A walker steps 1 metre left or right on each coin flip. After ${Q_STEPS} steps, how far from the start will they be, on average?`,
        options: ["About 1 m", `About ${Q_DIST} m`, "About 50 m"],
        answer: 1,
      }}
      exploreHint="Try 100 steps, then 1,000. Watch how much wider the pile gets."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            After {Q_STEPS} steps your walkers were on average <strong>{sp.meanDist.toFixed(1)} m</strong> from the start
            (exactly {exactMeanDist(Q_STEPS).toFixed(1)} m over all possible walks). Not 1 m, because the steps rarely cancel
            perfectly; not 50 m, because they mostly do.
          </p>
          <p>
            At 1,000 steps they averaged {sp1k.meanDist.toFixed(1)} m: ten times the steps, only about three times the
            distance. Spread grows like the square root of the steps, so 100 times the steps gives 10 times the distance.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} n={n} setN={setN} />}
    </Lesson>
  );
}
