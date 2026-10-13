"use client";

// Work = force x distance along the force. A 10 kg box is carried 20 m at a steady speed,
// so the arms push straight up with m g = 98.1 N and nothing sideways. Three paths:
// straight up, up a 30 deg ramp, level floor. Work = 98.1 N x height gained:
// 1962 J, 981 J, 0 J. Side view at one scale (6 px per m); the box is not to scale.
//
// Earned reveal: milestones "lift" (a path that rises, chosen by the learner) and "level".
// The starting path is the ramp (its button disabled). QA path in DOM order: Straight up,
// then the ramp (enabled by then), then Level, so the last screen is the question's state.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const MASS = 10; // kg
const F = MASS * G; // 98.1 N, arms push up
const D = 20; // m along the path
const PATHS = [
  { name: "Straight up", deg: 90 },
  { name: "Up a 30° ramp", deg: 30 },
  { name: "Level floor", deg: 0 },
];
const RAMP = 1;
const LEVEL = 2;
const rise = (deg: number) => D * Math.sin((deg * Math.PI) / 180);
const work = (deg: number) => F * rise(deg);
const J = (w: number) => `${Math.round(w)} J`;

const W = 320;
const H = 196;
const K = 6; // px per m
const X0 = 70;
const Y0 = 182;

export default function CarryBoxLevel({ slug }: { slug: string }) {
  const [path, setPath] = useState(RAMP);
  const [tried, setTried] = useState<number[]>([RAMP]);
  const p = PATHS[path];
  const r = rise(p.deg);
  const ex = X0 + D * K * Math.cos((p.deg * Math.PI) / 180);
  const ey = Y0 - r * K;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You carry a 10 kg box 20 m along a level floor at a steady speed. The work your arms do on the box is…",
        options: ["0 J", "98 J", "1962 J"],
        answer: 0,
      }}
      exploreHint="Try each path and watch which part of the motion counts."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Along the level floor your arms pushed up {F.toFixed(1)} N the whole 20 m, but the box rose 0 m:{" "}
            <strong>{J(work(0))}</strong>.
            {tried.includes(RAMP) ? ` Up the ramp it rose ${rise(30).toFixed(0)} m: ${J(work(30))}.` : ""}
            {tried.includes(0) ? ` Straight up 20 m: ${J(work(90))}.` : ""}
          </p>
          <p>
            Work counts only the distance moved along the push. Arms that just hold a box up push at right angles to a level
            walk, so they do no work on it. You still tire: muscles burn energy just holding a load.
          </p>
          <p className="muted">Steady speed; starting and stopping ignored.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["lift", "level"]}>
          {(reach) => {
            const go = (i: number) => {
              if (locked || i === path) return;
              setPath(i);
              setTried((xs) => (xs.includes(i) ? xs : [...xs, i]));
              reach(i === LEVEL ? "level" : "lift");
            };
            const caption = locked
              ? "Work = force × distance moved along the force, in joules (J). Steady speed: arms just hold the box up."
              : `Moved 20 m, ${r.toFixed(0)} m of it upward: ${F.toFixed(1)} N × ${r.toFixed(0)} m = ${J(work(p.deg))}.`;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${p.name}: the box rises ${r.toFixed(0)} m`}>
                  <line x1={0} y1={Y0} x2={W} y2={Y0} className={s.ground} />
                  {/* the path */}
                  <line x1={X0} y1={Y0} x2={ex} y2={ey} className={s.path} />
                  <rect x={X0 - 9} y={Y0 - 18} width={18} height={18} rx={2} className={s.ghostBox} />
                  {/* height gained */}
                  {r > 0.01 && (
                    <>
                      <line x1={ex + 16} y1={Y0} x2={ex + 16} y2={ey} className={s.rise} />
                      <text x={ex + 20} y={(Y0 + ey) / 2} className={s.riseText}>
                        up {r.toFixed(0)} m
                      </text>
                    </>
                  )}
                  {r <= 0.01 && (
                    <text x={(X0 + ex) / 2} y={Y0 + 13} textAnchor="middle" className={s.riseText}>
                      up 0 m
                    </text>
                  )}
                  <text x={(X0 + ex) / 2 - 8 * Math.sin((p.deg * Math.PI) / 180) - 6} y={(Y0 + ey) / 2 - 6} textAnchor="end" className={s.label}>
                    20 m
                  </text>
                  {/* box and arms' force */}
                  <rect x={ex - 9} y={ey - 18} width={18} height={18} rx={2} className={s.box} />
                  <text x={ex} y={ey - 6} textAnchor="middle" className={s.boxText}>
                    10 kg
                  </text>
                  <line x1={ex} y1={ey - 20} x2={ex} y2={ey - 40} className={s.force} />
                  <path d={`M ${ex - 4} ${ey - 34} L ${ex} ${ey - 42} L ${ex + 4} ${ey - 34} Z`} className={s.forceHead} />
                  <text x={ex + 6} y={ey - 32} className={s.forceText}>
                    arms: {F.toFixed(1)} N up
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  {PATHS.map((q, i) => (
                    <Control key={q.name} className={i === path ? "active" : ""} disabled={locked || i === path} aria-pressed={i === path} onClick={() => go(i)}>
                      {q.name}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Work by arms on box" value={locked ? "?" : J(work(p.deg))} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
