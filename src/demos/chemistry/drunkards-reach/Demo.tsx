"use client";

// A seeded cloud of 40 random walkers, all starting at the centre. Every step is one unit in a
// random direction. The solid ring is the cloud's typical (root-mean-square) distance; dashed
// rings stay behind at each step count visited. 25 → 100 steps (4 times as many) only doubles it.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const WALKERS = 40;
const MAX = 225;
const A = 25;
const B = 100;
const SEED = 1; // untuned: the first seed tried

// tracks[w][n] = position of walker w after n steps
const tracks: [number, number][][] = (() => {
  const rng = mulberry32(SEED);
  const t: [number, number][][] = Array.from({ length: WALKERS }, () => [[0, 0]]);
  for (let n = 1; n <= MAX; n++) {
    for (const w of t) {
      const th = rng() * 2 * Math.PI;
      const [x, y] = w[n - 1];
      w.push([x + Math.cos(th), y + Math.sin(th)]);
    }
  }
  return t;
})();
const rms = (n: number) => Math.sqrt(tracks.reduce((m, w) => m + w[n][0] ** 2 + w[n][1] ** 2, 0) / WALKERS);
const RA = rms(A);
const RB = rms(B);

const W = 320;
const H = 240;
const CX = W / 2;
const CY = H / 2;
const SC = 5; // px per step length

export default function DrunkardsReach({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [seen, setSeen] = useState<number[]>([]);
  const ix = useRef(() => {});
  const { reach, reached } = useMilestones(() => ix.current(), ["at-25", "at-100"]);

  const go = (k: number) => {
    const next = Math.min(MAX, n + k);
    setN(next);
    const v = seen.includes(next) ? seen : [...seen, next];
    setSeen(v);
    if (v.includes(A)) reach("at-25");
    if (v.includes(A) && v.includes(B)) reach("at-100");
  };

  const r = rms(n);
  const path = tracks[0].slice(0, n + 1).map(([x, y], i) => `${i ? "L" : "M"} ${(CX + x * SC).toFixed(1)} ${(CY + y * SC).toFixed(1)}`).join(" ");
  const sawBoth = reached("at-100");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Under a microscope, you watch a particle jitter in random steps. If it takes 4 times as many steps, about how many times farther from its start does it typically end up?",
        options: ["4 times", "2 times", "The same"],
        answer: 1,
      }}
      exploreHint={`Walk to ${A} steps, then to ${B}. Compare the rings.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {sawBoth ? "You saw" : "Walk them and you see"} the typical distance go from about{" "}
            <strong>{RA.toFixed(1)}</strong> step lengths at {A} steps to about <strong>{RB.toFixed(1)}</strong> at {B}:
            about {(RB / RA).toFixed(1)} times as far for 4 times the steps.
          </p>
          <p>
            Random steps partly cancel. The typical distance grows as the square root of the number of steps:
            √{B} ÷ √{A} = 10 ÷ 5 = 2. So spreading by random motion is quick at first and then slows down: to go twice as
            far takes four times as long. That is how molecules diffuse.
          </p>
          <p className="muted">One seeded cloud of {WALKERS}; other clouds land a little above or below 2.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`After ${n} steps the typical distance is ${r.toFixed(1)} steps`}>
              <defs>
                <clipPath id="dr-clip">
                  <rect x={0} y={0} width={W} height={H} />
                </clipPath>
              </defs>
              <g clipPath="url(#dr-clip)">
                {seen
                  .filter((k) => k !== n && k > 0)
                  .map((k) => (
                    <g key={k}>
                      <circle cx={CX} cy={CY} r={rms(k) * SC} className={s.old} />
                      <text x={CX + rms(k) * SC * 0.71 + 3} y={CY - rms(k) * SC * 0.71 - 3} className={s.small}>
                        {k}
                      </text>
                    </g>
                  ))}
                {n > 0 && <path d={path} className={s.path} />}
                {tracks.map((w, i) => (
                  <circle key={i} cx={CX + w[n][0] * SC} cy={CY + w[n][1] * SC} r={3} className={i === 0 ? s.one : s.dot} />
                ))}
                {n > 0 && <circle cx={CX} cy={CY} r={r * SC} className={s.ring} />}
                <circle cx={CX} cy={CY} r={2} className={s.start} />
              </g>
              <text x={6} y={14} className={s.small}>
                each step: 1 unit, random direction
              </text>
            </svg>
            <Row>
              <Control onClick={() => go(A)} disabled={locked || n + A > MAX}>
                +{A} steps
              </Control>
              <Control onClick={() => go(B - A)} disabled={locked || n + (B - A) > MAX}>
                +{B - A} steps
              </Control>
              <Control
                onClick={() => {
                  setN(0);
                  setSeen([]);
                }}
                disabled={locked || n === 0}
              >
                Start over
              </Control>
            </Row>
            <Row>
              <Readout label="Steps" value={n} />
              <Readout label="Typical distance" value={`${r.toFixed(1)} steps`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
