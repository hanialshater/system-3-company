"use client";

// Projectile range and launch angle. Same speed, two angles that add to 90 degrees,
// same landing spot. The learner aims (live dashed preview) and launches (the arc
// stays, with its landing distance), so 30 and 60 end up side by side.
//
// Physics: launch from ground level, no air drag, g = 9.81 m/s^2, v = 20 m/s.
//   x(t) = v cos(a) t,  y(t) = v sin(a) t - g t^2 / 2
//   air time = 2 v sin(a) / g,  peak = (v sin a)^2 / (2 g),  range = v^2 sin(2a) / g
// Both axes use the same scale, so the arcs have their true shape.
//
// v3: Launch and Partner come before the slider in the DOM so the QA path (each control once) launches 30 and 60 first.
// v3: starts at 30 degrees (the question's throw); the same-landing caption follows the latest throw; a Sideways speed
// readout backs the 'moves sideways slower' sentence; Partner is defined in the caption.
// v2: the reveal is earned. Milestones "launched-30" and "launched-60": both throws the question
// names are on the stage. "Partner" launches 90 minus the current angle, so any pair can be tried.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState, type ReactNode } from "react";
import s from "./styles.module.css";

const G = 9.81; // m/s^2
const V = 20; // m/s
const W = 320;
const H = 190;
const X0 = 18; // launch point, px
const GY = 168; // ground line, px
const K = 6.5; // px per metre, both axes
const MAX_PINS = 4;
const ASK_A = 30;
const ASK_B = 60;

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


function Milestones({
  interact,
  names,
  children,
}: {
  interact: () => void;
  names: readonly string[];
  children: (reach: (name: string) => void) => ReactNode;
}) {
  const { reach } = useMilestones(interact, names);
  return <>{children(reach)}</>;
}

export default function ProjectileAngle({ slug }: { slug: string }) {
  const [angle, setAngle] = useState(ASK_A);
  const [pins, setPins] = useState<number[]>([]);
  const [everLaunched, setEverLaunched] = useState<number[]>([]);

  // Group pinned throws by landing spot (to 0.1 m) so equal landings share one label.
  const landings = new Map<string, number[]>();
  for (const a of pins) {
    const key = range(a).toFixed(1);
    landings.set(key, [...(landings.get(key) ?? []), a]);
  }
  const lastPin = pins[pins.length - 1];
  // the pair that includes the throw just made (so the caption is never about an older pair)
  const shared = lastPin === undefined ? undefined : [...landings.values()].find((as) => as.length > 1 && as.includes(lastPin));
  const otherPairs = [...landings.values()]
    .filter((as) => as.length > 1 && !as.includes(ASK_A))
    .map((as) =>
      as
        .sort((x, y) => x - y)
        .map((a) => `${a}°`)
        .join(" and "),
    );
  const tried45 = everLaunched.includes(45);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `At the park you throw two balls at the same speed, ${V} m/s, with no air resistance. Ball A leaves the ground at ${ASK_A}°, ball B at ${ASK_B}°. Which lands farther away?`,
        options: [`A, the flatter ${ASK_A}° throw`, `B, the steeper ${ASK_B}° throw`, "They land at the same spot"],
        answer: 2,
      }}
      exploreHint={`Launch at ${ASK_A}°, then its partner, ${ASK_B}°. Compare where they land.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your {ASK_A}° and {ASK_B}° balls landed at the same spot, <strong>{range(ASK_A).toFixed(1)} m</strong> away.
            The {ASK_B}° ball climbs to {peak(ASK_B).toFixed(1)} m and stays up {airTime(ASK_B).toFixed(1)} s, but
            drifts sideways slowly. The {ASK_A}° ball races sideways but is down in {airTime(ASK_A).toFixed(1)} s.
          </p>
          <p>
            Time in the air times sideways speed comes out equal for any two angles that add to 90°:
            {otherPairs.length ? ` you also saw ${otherPairs.join(", ")}.` : " other pairs work the same way, so try the slider and Partner on the stage."}{" "}
            {tried45
              ? `Your 45° throw, the balance point with no partner, went farthest: ${range(45).toFixed(1)} m.`
              : "Which single angle goes farthest? Aim the slider at 45° and launch to find out."}
          </p>
          <p className="muted">
            This is without air drag. Real air takes more metres from the long, steep flight, so the flatter throw wins.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["launched-30", "launched-60"]}>
          {(reach) => {
            const fire = (a: number) => {
              setPins((p) => [...p.filter((x) => x !== a), a].slice(-MAX_PINS));
              setEverLaunched((e) => (e.includes(a) ? e : [...e, a]));
              if (a === ASK_A) reach("launched-30");
              if (a === ASK_B) reach("launched-60");
            };
            const launch = () => {
              if (locked || justLaunched) return;
              fire(angle);
            };
            const partner = 90 - angle;
            const launchPartner = () => {
              if (locked || partner === angle) return;
              setAngle(partner);
              fire(partner);
            };

            const aimLen = 34;
            const justLaunched = pins[pins.length - 1] === angle;
            const caption = locked
              ? "Make a prediction to start."
              : shared
                ? `${shared.map((a) => `${a}°`).join(" and ")}: same landing spot. The steep one stays up longer but moves sideways slower (see Sideways).`
                : pins.length === 0
                  ? "Launch, then press Partner: the angle that adds up to 90°. The slider tries other angles."
                  : justLaunched ? "Landed. Move the slider to launch another angle, or press Partner." : "Launch another angle, or its partner, and compare landings.";

            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>No air drag · from the ground · {V} m/s</span>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`Ball trajectories; aiming at ${angle} degrees`}
                >
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
                  {[...landings.entries()]
                    .sort((p, q) => Number(p[0]) - Number(q[0]))
                    .map(([key, as], i) => {
                      const x = X0 + Number(key) * K;
                      const right = x > W - 60;
                      return (
                        <g key={key}>
                          <circle cx={x} cy={GY} r={4} className={as.length > 1 ? s.landShared : s.land} />
                          <text
                            x={right ? x - 6 : x + 6}
                            y={GY - 6 - (i % 3) * 12}
                            textAnchor={right ? "end" : "start"}
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

                <Row>
                  <Control disabled={locked || justLaunched} onClick={launch} aria-label={`Launch at ${angle} degrees`}>
                    {justLaunched ? "Landed" : "Launch"}
                  </Control>
                  <Control
                    disabled={locked || partner === angle}
                    onClick={launchPartner}
                    aria-label={`Launch the partner angle, ${partner} degrees`}
                  >
                    {partner === angle ? "45° has no partner" : `Partner ${partner}°`}
                  </Control>
                </Row>
                <Slider
                  label="Launch angle"
                  value={angle}
                  min={5}
                  max={85}
                  step={5}
                  disabled={locked}
                  format={(v) => `${v}°`}
                  onChange={(v) => setAngle(v)}
                />
                <Row>
                  <Readout label="Lands" value={locked ? "?" : `${range(angle).toFixed(1)} m`} />
                  <Readout label="Peak" value={`${peak(angle).toFixed(1)} m`} />
                  <Readout label="Air" value={`${airTime(angle).toFixed(1)} s`} />
                  <Readout label="Sideways" value={`${(V * Math.cos(rad(angle))).toFixed(1)} m/s`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
