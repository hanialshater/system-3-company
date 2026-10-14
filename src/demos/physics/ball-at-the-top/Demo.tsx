"use client";

// Ball at the top. A ball is thrown straight up at 14.7 m/s with no air. The learner
// scrubs time; the ball sits at y(t) = v0 t - g t^2 / 2 with a velocity arrow
// v(t) = v0 - g t (length proportional to speed, flips at the top) and an acceleration
// arrow that is always 9.81 m/s^2 down. Peak at t = v0 / g = 1.50 s, 11.0 m up.
// One representation: the ball on its vertical path, with both arrows.
//
// Earned reveal (v2): milestones "saw-up" (a move lands on a time with an upward velocity) and
// "saw-down" (a move lands on a downward one), so both sides of the top are seen. A record line keeps
// every time visited with its velocity and shows the steady drop of 0.98 m/s per 0.1 s, which is what
// "acceleration = rate of change of velocity" looks like. The step buttons come first in the DOM so
// QA's presses visit 1.3 s and 1.4 s (up) before the slider's two arrows reach 1.5 s and 1.6 s.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const V0 = 14.7; // m/s
const T_PEAK = V0 / G; // 1.4985 s
const T_END = 2.9; // s (lands at 2.997 s)
const vel = (t: number) => V0 - G * t;
const ht = (t: number) => Math.max(0, V0 * t - (G * t * t) / 2);
const signed = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(2)} m/s`;
const round1 = (t: number) => Math.round(t * 10) / 10;

const W = 320;
const H = 262;
const GY = 182;
const KY = 14.5; // px per m
const BX = 160;
const KV = 7.5; // px per m/s, velocity arrow
const KA = 4.5; // px per m/s^2, acceleration arrow
const DV = G * 0.1; // velocity change per 0.1 s: 0.98 m/s

export default function BallAtTheTop({ slug }: { slug: string }) {
  const [t, setT] = useState(1.4);
  const [visited, setVisited] = useState<number[]>([]); // times landed on after the prediction

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A ball thrown straight up is momentarily at rest at the top. Its acceleration at that instant is…",
        options: ["Zero", "9.81 m/s² downward", "9.81 m/s² upward"],
        answer: 1,
      }}
      exploreHint="Step to a time before the top and one after. Watch both arrows."
      minInteractions={2}
      reveal={() => {
        const ups = visited.filter((x) => vel(x) > 0.05);
        const downs = visited.filter((x) => vel(x) < -0.05);
        const a = ups.length ? Math.max(...ups) : 1.4;
        const b = downs.length ? Math.min(...downs) : 1.6;
        return (
          <>
            <p>
              You saw {signed(vel(a))} at {a.toFixed(1)} s and {signed(vel(b))} at {b.toFixed(1)} s: the velocity arrow
              shrank to about zero at the top ({T_PEAK.toFixed(2)} s, {ht(T_PEAK).toFixed(1)} m up) and flipped. The
              acceleration arrow never changed: <strong>9.81 m/s² down</strong>.
            </p>
            <p>
              Acceleration is how fast the velocity changes, not how fast the ball goes. Your record shows it: every 0.1 s
              the velocity dropped by {DV.toFixed(2)} m/s, before the top, through it and after. That is 9.81 m/s every
              second. If the acceleration were zero at the top, the ball would stay hanging in the air.
            </p>
            <p className="muted">No air resistance; with air, the pull at the top would still be 9.81 m/s² down.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["saw-up", "saw-down"]}>
          {(reach) => {
            const go = (nt: number) => {
              const n = Math.min(T_END, Math.max(0, round1(nt)));
              setT(n);
              setVisited((vs) => (vs.includes(n) ? vs : [...vs, n]));
              if (vel(n) > 0.05) reach("saw-up");
              if (vel(n) < -0.05) reach("saw-down");
            };
            // Record: the times visited, in time order, with their velocities (the last five).
            const rec = [...visited].sort((x, y) => x - y).slice(-5);
            const v = vel(t);
            const by = GY - ht(t) * KY;
            const vLen = v * KV;
            const aLen = G * KA;
            const ghosts = [];
            for (let k = 0; k <= 28; k += 2) ghosts.push(k / 10);
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`t = ${t.toFixed(1)} s, velocity ${signed(v)}`}>
                  <defs>
                    <marker id="topArrowV" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" className={s.headV} />
                    </marker>
                    <marker id="topArrowA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" className={s.headA} />
                    </marker>
                  </defs>
                  <line x1={20} y1={GY} x2={W - 20} y2={GY} className={s.ground} />
                  <line x1={BX} y1={GY} x2={BX} y2={GY - ht(T_PEAK) * KY} className={s.path} />
                  {ghosts.map((g) => (
                    <circle key={g} cx={BX} cy={GY - ht(g) * KY} r={1.6} className={s.ghost} />
                  ))}
                  <line x1={BX - 30} y1={GY - ht(T_PEAK) * KY} x2={BX + 58} y2={GY - ht(T_PEAK) * KY} className={s.peak} />
                  <text x={BX + 62} y={GY - ht(T_PEAK) * KY + 3} className={s.small}>
                    top
                  </text>
                  {/* velocity arrow, right of the ball */}
                  {!locked && Math.abs(vLen) > 1 && (
                    <line x1={BX + 14} y1={by} x2={BX + 14} y2={by - vLen} className={s.vArrow} markerEnd="url(#topArrowV)" />
                  )}
                  {!locked && (
                    <text x={BX + 20} y={by - vLen / 2 + 3} className={s.vLabel}>
                      v
                    </text>
                  )}
                  {/* acceleration arrow, left of the ball */}
                  {!locked && (
                    <>
                      <line x1={BX - 14} y1={by} x2={BX - 14} y2={by + aLen} className={s.aArrow} markerEnd="url(#topArrowA)" />
                      <text x={BX - 26} y={by + aLen / 2 + 3} className={s.aLabel}>
                        a
                      </text>
                    </>
                  )}
                  <circle cx={BX} cy={by} r={7} className={s.ball} />
                  <text x={8} y={14} className={s.chip}>
                    No air. Thrown up at 14.7 m/s.
                  </text>
                </svg>

                <Row>
                  <Control disabled={locked || t <= 0} onClick={() => go(t - 0.1)}>
                    −0.1 s
                  </Control>
                  <Control disabled={locked || t >= T_END} onClick={() => go(t + 0.1)}>
                    +0.1 s
                  </Control>
                </Row>
                <Slider label="Time" value={t} min={0} max={T_END} step={0.1} disabled={locked} format={(x) => `${x.toFixed(1)} s`} onChange={go} />
                <p className={s.record} aria-live="polite">
                  {locked || rec.length === 0
                    ? "\u00a0"
                    : `Seen: ${rec.map((x) => `${x.toFixed(1)} s ${signed(vel(x)).replace(" m/s", "")}`).join(" · ")}${
                        rec.length > 1 ? ` (m/s; −${DV.toFixed(2)} each 0.1 s)` : " m/s"
                      }`}
                </p>
                <Row>
                  <Readout label="Velocity" value={locked ? "?" : `${signed(v)} ${Math.abs(v) < 0.05 ? "" : v > 0 ? "up" : "down"}`} />
                  <Readout label="Acceleration" value={locked ? "?" : "9.81 m/s² down"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
