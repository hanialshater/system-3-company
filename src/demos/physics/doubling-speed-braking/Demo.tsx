"use client";

// Doubling speed, braking distance. A car brakes hard at a steady 5 m/s^2. The
// road strip shows its braking distance as a row of blocks, each block one
// 30 km/h stop (6.9 m). At 60 km/h the row is 4 blocks; at 90 km/h, 9.
//
// Physics: constant deceleration a = 5 m/s^2 (about mu = 0.5 on a dry road),
// d = v^2 / (2 a). Braking distance only: the reaction distance is left out.
// The reveal unlocks once the learner has reached 60 km/h.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useState } from "react";
import s from "./styles.module.css";

const A = 5; // m/s^2
const kmh = (v: number) => v / 3.6;
const dist = (speedKmh: number) => kmh(speedKmh) ** 2 / (2 * A);
const UNIT = dist(30); // 6.94 m

const W = 320;
const H = 120;
const X0 = 10;
const MAX_M = 115;
const K = (W - 2 * X0) / MAX_M; // px per metre
const ROAD_Y = 44;
const ROAD_H = 34;

export default function DoublingSpeedBraking({ slug }: { slug: string }) {
  const [speed, setSpeed] = useState(30);
  const [seen60, setSeen60] = useState(false);
  const d = dist(speed);
  const blocks = d / UNIT;
  const carX = X0 + d * K;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "At 30 km/h, hard braking stops a car in about 7 m. With the same brakes at 60 km/h, it takes…",
        options: ["about 14 m", "about 21 m", "about 28 m"],
        answer: 2,
      }}
      exploreHint="Raise the speed to 60 km/h. Count the blocks, then go faster."
      reveal={() => (
        <>
          <p>
            At 60 km/h the car needed <strong>27.8 m</strong>: four of the 30 km/h stops, not two. At 90 km/h it is
            nine; at 120 km/h, sixteen. Braking distance grows with the square of the speed.
          </p>
          <p>
            Why: twice the speed carries four times the movement energy (it goes as speed squared), and the same
            brakes remove the same energy per metre. So twice the speed needs four times the road.
          </p>
          <p className="muted">This is braking only. Reaction time adds more road on top, growing with speed.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const caption = locked
          ? "Make a prediction to start."
          : "Each block is one 30 km/h stop (6.9 m). Braking only, same brakes.";
        const nice = Math.abs(blocks - Math.round(blocks)) < 0.01 ? String(Math.round(blocks)) : blocks.toFixed(2);
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Braking from ${speed} km/h takes ${d.toFixed(1)} metres`}>
              <rect x={0} y={ROAD_Y} width={W} height={ROAD_H} className={s.road} />
              <line x1={X0} y1={ROAD_Y - 4} x2={X0} y2={ROAD_Y + ROAD_H + 4} className={s.start} />
              {/* blocks: one per 30 km/h stopping distance */}
              {Array.from({ length: Math.ceil(blocks - 1e-9) }, (_, i) => {
                const x = X0 + i * UNIT * K;
                const w = Math.min(UNIT, d - i * UNIT) * K;
                return (
                  <rect
                    key={i}
                    x={x + 0.5}
                    y={ROAD_Y + 6}
                    width={Math.max(0, w - 1)}
                    height={ROAD_H - 12}
                    rx={2}
                    className={i % 2 ? s.blockB : s.blockA}
                  />
                );
              })}
              {/* car at its stopping point */}
              <g transform={`translate(${Math.min(carX, W - 4)} ${ROAD_Y - 2})`}>
                <rect x={-20} y={-14} width={20} height={11} rx={3} className={s.car} />
                <circle cx={-15} cy={-2} r={2.6} className={s.wheel} />
                <circle cx={-5} cy={-2} r={2.6} className={s.wheel} />
              </g>
              {[0, 25, 50, 75, 100].map((m) => (
                <g key={m}>
                  <line x1={X0 + m * K} y1={ROAD_Y + ROAD_H} x2={X0 + m * K} y2={ROAD_Y + ROAD_H + 5} className={s.tick} />
                  <text x={X0 + m * K} y={ROAD_Y + ROAD_H + 16} textAnchor={m === 0 ? "start" : "middle"} className={s.tickLabel}>
                    {m} m
                  </text>
                </g>
              ))}
              {!locked && (
                <text x={X0 + 2} y={ROAD_Y - 22} className={s.count}>
                  {nice} blocks
                </text>
              )}
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Speed"
              value={speed}
              min={15}
              max={120}
              step={15}
              disabled={locked}
              format={(v) => `${v} km/h`}
              onChange={(v) => {
                setSpeed(v);
                if (seen60 || v === 60) {
                  setSeen60(true);
                  interact();
                }
              }}
            />
            <Row>
              <Readout label="Braking distance" value={`${d.toFixed(1)} m`} />
              <Readout label="Speed vs 30 km/h" value={`${(speed / 30).toFixed(1)}×`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
