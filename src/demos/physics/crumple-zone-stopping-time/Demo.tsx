"use client";

// Crumple zone. A 1000 kg car hits a wall at 15 m/s and stops. Whatever the car is
// made of, the wall must remove the same momentum, 15,000 kg m/s. The average force
// is that momentum divided by the stopping time: 150 kN in 0.10 s, 75 kN in 0.20 s.
//
// Drawn as a force-versus-time rectangle whose area (impulse) stays 15,000 N s.
// Constant (average) force assumed; real crash forces peak and vary. At constant force,
// stopping in t from 15 m/s crushes d = v t / 2 (0.75 m at 0.10 s, 1.5 m at 0.20 s).
// Values are illustrative. The reveal unlocks once the stop takes 0.20 s.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const M = 1000; // kg
const V = 15; // m/s
const P = M * V; // 15,000 kg m/s
const force = (ms: number) => P / (ms / 1000); // N
const kN = (n: number) => `${Math.round(n / 1000)} kN`;

const W = 320;
const H = 184;
const GX0 = 40;
const GX1 = 306;
const GY0 = 158;
const GY1 = 14;
const T_MAX = 320; // ms
const F_MAX = 320_000; // N
const xOf = (ms: number) => GX0 + (ms / T_MAX) * (GX1 - GX0);
const yOf = (n: number) => GY0 - (n / F_MAX) * (GY0 - GY1);

export default function CrumpleZone({ slug }: { slug: string }) {
  const [ms, setMs] = useState(100);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["doubled-time"]);
  const F = force(ms);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A 1000 kg car hits a wall at 15 m/s and stops in 0.10 s. With a crumple zone it takes 0.20 s. The average force on it is…",
        options: ["the same", "half as big", "twice as big"],
        answer: 1,
      }}
      exploreHint="Stretch the stopping time to 0.20 s. Watch the force bar's height and width."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            In 0.10 s the wall pushed with <strong>{kN(force(100))}</strong>; in 0.20 s, <strong>{kN(force(200))}</strong>
            , half as much. The bar got twice as wide and half as tall, and its area stayed {P.toLocaleString("en-US")}{" "}
            N·s.
          </p>
          <p>
            That area is the car&apos;s momentum, mass times speed: 1000 kg × 15 m/s. Stopping the car means removing all
            of it, however long it takes. Spread the stop over more time and the force needed at each moment shrinks.
          </p>
          <p className="muted">
            A crumple zone is not weakness: by crushing (about 1.5 m for a steady 0.20 s stop here) it buys time. Average
            force, illustrative numbers.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : `1000 kg car, 15 m/s into a wall. Bar area = momentum removed.`;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Stopping in ${ms / 1000} s takes an average force of ${kN(F)}`}>
              {[0, 100, 200, 300].map((f) => (
                <g key={f}>
                  <line x1={GX0} y1={yOf(f * 1000)} x2={GX1} y2={yOf(f * 1000)} className={s.grid} />
                  <text x={GX0 - 4} y={yOf(f * 1000) + 3} textAnchor="end" className={s.small}>
                    {f}
                  </text>
                </g>
              ))}
              <text x={GX0 - 4} y={GY1 - 4} textAnchor="end" className={s.small}>
                kN
              </text>
              {[0, 100, 200, 300].map((t) => (
                <text key={t} x={xOf(t)} y={GY0 + 12} textAnchor="middle" className={s.small}>
                  {t / 1000} s
                </text>
              ))}
              {/* the stiff 0.10 s stop, for comparison */}
              {ms !== 100 && (
                <rect x={xOf(0)} y={yOf(force(100))} width={xOf(100) - xOf(0)} height={GY0 - yOf(force(100))} className={s.ghost} />
              )}
              <rect x={xOf(0)} y={yOf(F)} width={xOf(ms) - xOf(0)} height={GY0 - yOf(F)} className={s.bar} />
              {!locked && (
                <text x={xOf(ms) + 5} y={yOf(F) + 12} className={s.label}>
                  {kN(F)}
                </text>
              )}
              <text x={xOf(ms / 2)} y={GY0 - 6} textAnchor="middle" className={s.area}>
                15,000 N·s
              </text>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Stopping time"
              value={ms}
              min={50}
              max={300}
              step={50}
              disabled={locked}
              format={(v) => `${(v / 1000).toFixed(2)} s`}
              onChange={(v) => {
                setMs(v);
                if (v === 200) reach("doubled-time");
              }}
            />
            <Row>
              <Readout label="Average force" value={locked ? "?" : kN(F)} />
              <Readout label="Momentum removed" value="15,000 kg·m/s" />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
