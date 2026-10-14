"use client";

// Lifeguard's fastest path. The lifeguard stands 40 m up the beach; the swimmer is 20 m
// out and 60 m along the shore. She runs at 7 m/s and swims at 1.5 m/s. The learner
// picks where she enters the water (every 8 m); the clock shows run + swim time:
// t(x) = sqrt(40^2 + x^2) / 7 + sqrt(20^2 + (60 - x)^2) / 1.5.
// Straight line crosses the shore at 40 m (26.9 s); the best entry is 56.45 m
// (23.43 s), where sin(a1) / 7 = sin(a2) / 1.5 (Snell's law form).
// v2: no marker for the true best (it was a giveaway): a triangle marks the best spot the learner has tried so far;
// speeds are printed on the map; the reveal quotes the 56 m entry, which the gate requires.
// Flat beach, constant speeds, drawn to scale. The reveal unlocks at the 56 m entry.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const UP = 40; // m from shore, lifeguard
const OUT = 20; // m into water, swimmer
const ALONG = 60; // m along shore
const RUN = 7; // m/s
const SWIM = 1.5; // m/s
const runT = (x: number) => Math.hypot(UP, x) / RUN;
const swimT = (x: number) => Math.hypot(OUT, ALONG - x) / SWIM;
const total = (x: number) => runT(x) + swimT(x);
const BEST = (() => {
  // ternary search: total(x) is convex on [0, ALONG]
  let a = 0;
  let b = ALONG;
  for (let i = 0; i < 200; i++) {
    const m1 = a + (b - a) / 3;
    const m2 = b - (b - a) / 3;
    if (total(m1) < total(m2)) b = m2;
    else a = m1;
  }
  return a;
})(); // 56.45 m
const STRAIGHT = (UP / (UP + OUT)) * ALONG; // 40 m

const W = 320;
const H = 232;
const K = 3.2; // px per m
const X0 = 46;
const SHORE = 32 + UP * K;
const px = (x: number) => X0 + x * K;
const py = (y: number) => SHORE + y * K; // y > 0 is water

export default function LifeguardFastestPath({ slug }: { slug: string }) {
  const [x, setX] = useState(40);
  const [tried, setTried] = useState<number[]>([40]);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["found-best"]);
  const bestTried = tried.reduce((a, b) => (total(b) < total(a) ? b : a), tried[0]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Lifeguard 40 m up the beach; swimmer 20 m out, 60 m along. She runs 7 m/s, swims 1.5 m/s. Where should she enter the water?",
        options: ["40 m, on the straight line", "about 56 m", "24 m"],
        answer: 1,
      }}
      exploreHint="Move her entry point along the shore. Watch the total time."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            The straight line took <strong>{total(STRAIGHT).toFixed(1)} s</strong>. Entering at 56 m took{" "}
            <strong>{total(56).toFixed(1)} s</strong>, the fastest of the spots you could pick (the true best is{" "}
            {BEST.toFixed(1)} m). She runs further on sand, where she is fast, to swim less in water, where she is slow.
          </p>
          <p>
            The quickest path bends at the shoreline. Light does this too. It takes the quickest path, and light travels
            slower in water than in air, so its path bends where it enters the water. That bend is called refraction.
          </p>
          <p className="muted">Flat beach, steady speeds. At the best point, sin(angle)/speed matches on both sides.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : tried.length >= 2
            ? `Best so far: enter at ${bestTried} m, ${total(bestTried).toFixed(1)} s. Try other spots.`
            : "Move her entry point along the shore and watch the total time.";
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Entering at ${x} m takes ${total(x).toFixed(1)} s`}>
              <rect x={0} y={0} width={W} height={SHORE} className={s.sand} />
              <rect x={0} y={SHORE} width={W} height={H - SHORE} className={s.water} />
              <line x1={0} y1={SHORE} x2={W} y2={SHORE} className={s.shore} />
              {/* straight line, for comparison */}
              <line x1={px(0)} y1={py(-UP)} x2={px(ALONG)} y2={py(OUT)} className={s.straight} />
              {/* her path */}
              <line x1={px(0)} y1={py(-UP)} x2={px(x)} y2={py(0)} className={s.run} />
              <line x1={px(x)} y1={py(0)} x2={px(ALONG)} y2={py(OUT)} className={s.swim} />
              {!locked && tried.length >= 2 && <path d={`M ${px(bestTried)} ${py(0) + 6} l -5 8 l 10 0 z`} className={s.best} />}
              <circle cx={px(x)} cy={py(0)} r={3.5} className={s.entry} />
              <circle cx={px(0)} cy={py(-UP)} r={5} className={s.guard} />
              <circle cx={px(ALONG)} cy={py(OUT)} r={5} className={s.swimmer} />
              <text x={px(0) + 8} y={py(-UP) + 3} className={s.small}>
                lifeguard
              </text>
              <text x={px(ALONG) + 8} y={py(OUT) + 3} className={s.small}>
                swimmer
              </text>
              <text x={4} y={12} className={s.small}>
                Runs 7 m/s on sand, swims 1.5 m/s. To scale.
              </text>
              {[0, 20, 40, 60].map((m) => (
                <g key={m}>
                  <line x1={px(m)} y1={SHORE - 3} x2={px(m)} y2={SHORE + 3} className={s.tick} />
                  <text x={px(m)} y={SHORE - 6} textAnchor="middle" className={s.small}>
                    {m} m
                  </text>
                </g>
              ))}
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Enter the water at"
              value={x}
              min={0}
              max={64}
              step={8}
              disabled={locked}
              format={(v) => `${v} m`}
              onChange={(v) => {
                setX(v);
                setTried((t) => (t.includes(v) ? t : [...t, v]));
                if (v === 56) reach("found-best");
              }}
            />
            <Row>
              <Readout label="Run" value={locked ? "?" : `${runT(x).toFixed(1)} s`} />
              <Readout label="Swim" value={locked ? "?" : `${swimT(x).toFixed(1)} s`} />
              <Readout label="Total" value={locked ? "?" : `${total(x).toFixed(1)} s`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
