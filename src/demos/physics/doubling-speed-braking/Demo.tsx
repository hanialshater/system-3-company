"use client";

// Doubling speed, braking distance. A car brakes hard at a steady 5 m/s^2. The
// road strip shows its braking distance as a row of blocks, each block one
// 30 km/h stop (6.9 m). At 60 km/h the row is 4 blocks; at 90 km/h, 9.
//
// Physics: constant deceleration a = 5 m/s^2 (about mu = 0.5 on a dry road),
// d = v^2 / (2 a). Braking distance only: the reaction distance is left out.
// The reveal unlocks once the learner has reached 60 km/h (<Milestones>; the QA path's two
// slider steps from 30 km/h land on 60).
// v2: readouts compare speed x, movement energy x (speed squared) and road x (blocks) side by
// side, so the "because" is on the stage; blocks are numbered; reveal quotes computed values.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
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
  const d = dist(speed);
  const blocks = d / UNIT;
  const carX = X0 + d * K;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "At 30 km/h, braking hard stops your car in about 7 m. On the same road with the same brakes at 60 km/h, how far does it take to stop?",
        options: ["about 14 m", "about 21 m", "about 28 m"],
        answer: 2,
      }}
      exploreHint="Raise the speed to 60 km/h. Compare the three readouts, then go faster."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            At 60 km/h the car needed <strong>{dist(60).toFixed(1)} m</strong>: {Math.round(dist(60) / UNIT)} of the 30
            km/h stops, not two.
            {speed > 60
              ? ` At ${speed} km/h you saw ${(dist(speed) / UNIT).toFixed(speed % 30 === 0 ? 0 : 2)} blocks.`
              : " At 90 km/h it is nine; at 120 km/h, sixteen."}{" "}
            Braking distance grows with the square of the speed.
          </p>
          <p>
            Why: the readouts showed Speed 2× but Energy 4×. A car&apos;s movement energy grows with speed times speed.
            The same brakes remove the same energy for each metre, so four times the energy takes four times the road.
          </p>
          <p className="muted">Braking only, same brakes on the same road.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["sixty"]}>
          {(reach) => {
        const caption = locked
          ? "Make a prediction to start."
          : "Each block: the 6.9 m of road the brakes need to remove a 30 km/h car's movement energy.";
        const ratio = speed / 30;
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
              {Array.from({ length: Math.floor(blocks + 1e-9) }, (_, i) => {
                const x = X0 + (i + 0.5) * UNIT * K;
                return (
                  <text key={`n${i}`} x={x} y={ROAD_Y + ROAD_H / 2 + 3} textAnchor="middle" className={s.blockNum}>
                    {i + 1}
                  </text>
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
                if (v === 60) reach("sixty");
              }}
            />
            <Row>
              <Readout label="Speed vs 30" value={`${ratio.toFixed(1)}×`} />
              <Readout label="Energy vs 30" value={locked ? "?" : `${Number.isInteger(ratio * ratio) ? ratio * ratio : (ratio * ratio).toFixed(2)}×`} />
              <Readout label="Road" value={locked ? "?" : `${d.toFixed(1)} m`} />
            </Row>
          </div>
        );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
