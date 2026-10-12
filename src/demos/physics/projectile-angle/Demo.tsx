"use client";

// Projectile range and launch angle. Same speed, two angles that add to 90 degrees,
// same landing spot. The learner aims (live dashed preview) and launches (the arc
// stays, with its landing distance), so 30 and 60 end up side by side.
//
// Physics: launch from ground level, no air drag, g = 9.81 m/s^2, v = 20 m/s.
//   x(t) = v cos(a) t,  y(t) = v sin(a) t - g t^2 / 2
//   air time = 2 v sin(a) / g,  peak = (v sin a)^2 / (2 g),  range = v^2 sin(2a) / g
// Both axes use the same scale, so the arcs have their true shape.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81; // m/s^2
const V = 20; // m/s
const W = 320;
const H = 190;
const X0 = 18; // launch point, px
const GY = 168; // ground line, px
const K = 6.5; // px per metre, both axes
const MAX_PINS = 4;

const rad = (deg: number) => (deg * Math.PI) / 180;
const airTime = (deg: number) => (2 * V * Math.sin(rad(deg))) / G;
const peak = (deg: number) => (V * Math.sin(rad(deg))) ** 2 / (2 * G);
const range = (deg: number) => (V * V * Math.sin(rad(2 * deg))) / G;

function arcPath(deg: number) {
  const T = airTime(deg);
  const vx = V * Math.cos(rad(deg));
  const vy = V * Math.sin(rad(deg));
  const pts: string[] = [];
  const N = 48;
  for (let i = 0; i <= N; i++) {
    const t = (T * i) / N;
    const x = vx * t;
    const y = vy * t - (G * t * t) / 2;
    pts.push(`${(X0 + x * K).toFixed(1)} ${(GY - Math.max(0, y) * K).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

export default function ProjectileAngle({ slug }: { slug: string }) {
  const [angle, setAngle] = useState(20);
  const [pins, setPins] = useState<number[]>([]);

  // Group pinned throws by landing spot (to 0.1 m) so equal landings share one label.
  const landings = new Map<string, number[]>();
  for (const a of pins) {
    const key = range(a).toFixed(1);
    landings.set(key, [...(landings.get(key) ?? []), a]);
  }
  const shared = [...landings.values()].find((as) => as.length > 1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Same throwing speed, 20 m/s, no wind. Ball A leaves the ground at 30°, ball B at 60°. Which lands farther away?",
        options: ["A, the flatter 30° throw", "B, the steeper 60° throw", "They land at the same spot"],
        answer: 2,
      }}
      exploreHint="Launch at 30°, then at 60°. Compare where they land."
      reveal={() => (
        <>
          <p>
            30° and 60° land at the same spot, <strong>35.3 m</strong> away. The 60° ball climbs to 15.3 m and stays up
            3.5 s, but drifts sideways slowly. The 30° ball races sideways but is down in 2.0 s.
          </p>
          <p>
            Time in the air times sideways speed comes out equal for any two angles that add to 90°: 20° and 70°, 40° and
            50°. The balance point, 45°, goes farthest: 40.8 m.
          </p>
          <p className="muted">This is without air drag. Real air steals more from the long, steep flight.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const launch = () => {
          if (locked || justLaunched) return;
          interact();
          setPins((p) => [...p.filter((a) => a !== angle), angle].slice(-MAX_PINS));
        };

        const aimLen = 34;
        const justLaunched = pins[pins.length - 1] === angle;
        const caption = locked
          ? "Make a prediction to start."
          : shared
            ? `${shared.map((a) => `${a}°`).join(" and ")}: different arcs, same landing spot.`
            : pins.length === 0
              ? "Aim with the slider, then launch."
              : "Launch another angle and compare landings.";

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Ball trajectories; aiming at ${angle} degrees`}>
              {/* distance ticks every 10 m */}
              {[10, 20, 30, 40].map((m) => (
                <g key={m}>
                  <line x1={X0 + m * K} y1={GY} x2={X0 + m * K} y2={GY + 5} className={s.tick} />
                  <text x={X0 + m * K} y={GY + 16} textAnchor="middle" className={s.tickLabel}>
                    {m} m
                  </text>
                </g>
              ))}
              <line x1={0} y1={GY} x2={W} y2={GY} className={s.ground} />

              {/* pinned throws */}
              {pins.map((a, i) => {
                const latest = i === pins.length - 1;
                const apexX = X0 + (range(a) / 2) * K;
                const apexY = GY - peak(a) * K;
                return (
                  <g key={a} className={latest ? s.latest : s.older}>
                    <path d={arcPath(a)} pathLength={1} className={s.arc} />
                    <text x={apexX} y={apexY - 5} textAnchor="middle" className={s.arcLabel}>
                      {a}°
                    </text>
                  </g>
                );
              })}
              {[...landings.entries()].map(([key, as], i) => {
                const x = X0 + Number(key) * K;
                return (
                  <g key={key}>
                    <circle cx={x} cy={GY} r={4} className={as.length > 1 ? s.landShared : s.land} />
                    <text
                      x={x > W - 40 ? x - 6 : x + 6}
                      y={GY - 6 - (i % 2) * 12}
                      textAnchor={x > W - 40 ? "end" : "start"}
                      className={s.landLabel}
                    >
                      {key} m
                    </text>
                  </g>
                );
              })}

              {/* live aim */}
              <path d={arcPath(angle)} className={s.preview} />
              <line
                x1={X0}
                y1={GY}
                x2={X0 + aimLen * Math.cos(rad(angle))}
                y2={GY - aimLen * Math.sin(rad(angle))}
                className={s.aim}
              />
              <circle cx={X0} cy={GY} r={5} className={s.ball} />
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Launch angle"
              value={angle}
              min={5}
              max={85}
              step={5}
              disabled={locked}
              format={(v) => `${v}°`}
              onChange={(v) => {
                interact();
                setAngle(v);
              }}
            />
            <Row>
              <Control disabled={locked || justLaunched} onClick={launch} aria-label={`Launch at ${angle} degrees`}>
                {justLaunched ? "Landed" : "Launch"}
              </Control>
              <Readout label="Lands" value={`${range(angle).toFixed(1)} m`} />
              <Readout label="Peak" value={`${peak(angle).toFixed(1)} m`} />
              <Readout label="Air" value={`${airTime(angle).toFixed(1)} s`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
