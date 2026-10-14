"use client";

// No push needed. Four lanes, four amounts of friction. Each puck is given 2 m/s
// at the start and then nobody touches it. Ghost dots mark where it was at every
// whole second, so even spacing means constant speed. On the no-friction lane the
// dots stay 2 m apart for the whole 10 s: constant speed with no push at all.
//
// Physics: dry kinetic friction, deceleration mu g while moving (g = 9.81 m/s^2),
// exact solution x(t) = v0 t - mu g t^2 / 2 until the puck stops at v0 / (mu g).
// mu = 0.10, 0.03, 0.01, 0 (illustrative values). 10 s of motion plays in 2.5 s.
// v2: one control starts all four pucks together (a fair race: a puck on a low-friction lane could
// look ahead of the frictionless one when started at a different moment); lane names are labels, not
// buttons. The reveal unlocks when the race has finished.

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const G = 9.81; // m/s^2
const V0 = 2; // m/s
const T_END = 10; // s of sliding per run
const PLAY = 4; // playback speed-up

const LANES = [
  { name: "High", mu: 0.1 },
  { name: "Medium", mu: 0.03 },
  { name: "Low", mu: 0.01 },
  { name: "None", mu: 0 },
];
const NONE = 3;

const W = 250;
const LH = 30;
const X0 = 8;
const K = 11.6; // px per metre: 20 m fits

function position(mu: number, t: number) {
  if (mu === 0) return V0 * t;
  const tStop = V0 / (mu * G);
  const tt = Math.min(t, tStop);
  return V0 * tt - (mu * G * tt * tt) / 2;
}

export default function PuckOnIce({ slug }: { slug: string }) {
  const [times, setTimes] = useState<number[]>(LANES.map(() => 0));
  const [active, setActive] = useState<boolean[]>(LANES.map(() => false));
  const [done, setDone] = useState<boolean[]>(LANES.map(() => false));
  const interactRef = useRef<() => void>(() => {});
  const earned = useRef(false);
  const anyActive = active.some(Boolean);

  useEffect(() => {
    if (!anyActive) return;
    let raf = 0;
    let last: number | null = null;
    const tick = (now: number) => {
      const dt = last === null ? 0 : Math.min(0.05, (now - last) / 1000) * PLAY;
      last = now;
      setTimes((ts) => ts.map((t, i) => (active[i] ? Math.min(T_END, t + dt) : t)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [anyActive, active]);

  // finish runs that reached 10 s
  useEffect(() => {
    const finished = active.map((a, i) => a && times[i] >= T_END);
    if (!finished.some(Boolean)) return;
    setActive((as) => as.map((a, i) => a && !finished[i]));
    const nextDone = done.map((d, i) => d || finished[i]);
    setDone(nextDone);
    if (!earned.current && nextDone.every(Boolean)) {
      earned.current = true;
      interactRef.current();
    }
  }, [times, active, done]);

  const start = () => {
    setTimes(LANES.map(() => 0));
    setDone(LANES.map(() => false));
    setActive(LANES.map(() => true));
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A puck glides at 2 m/s on perfectly frictionless ice. What push keeps it moving at 2 m/s?",
        options: ["A steady push forward", "No push at all", "A push that grows over time"],
        answer: 1,
      }}
      exploreHint="Start all four pucks together. Watch the dots: equal gaps mean steady speed."
      reveal={() => (
        <>
          <p>
            On the no-friction lane the dots stayed <strong>2 m apart</strong> every second: still 2 m/s after 10 s, 20
            m in all, and nothing pushed it. So the answer is no push.
          </p>
          <p>
            With friction, the same start died away: high friction stopped the puck in 2.0 m, and even low friction
            closed up its dots as it slowed. A force changes motion; without one, motion just carries on. Friction is the
            force that stops things in daily life.
          </p>
          <p className="muted">This is Newton&rsquo;s first law.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const raceOver = done.every(Boolean);
        const caption = locked
          ? "Four ice lanes, from lots of friction to none. Predict first."
          : raceOver
            ? "Equal gaps between dots mean steady speed. Bottom lane: 2 m every second."
            : anyActive
              ? "All four pucks left at 2 m/s together. Dots mark each second."
              : "Each puck gets one 2 m/s start. Press the button, then watch the dots.";

        return (
          <div className={s.wrap}>
            <p className={s.head}>
              <span>Friction on the lane</span>
              <span>Dot: once a second</span>
            </p>
            {LANES.map((lane, i) => {
              const t = times[i];
              const x = position(lane.mu, t);
              const dots = [];
              for (let k = 1; k <= Math.floor(t + 1e-9); k++) dots.push(position(lane.mu, k));
              const finished = done[i];
              return (
                <div key={lane.name} className={s.lane}>
                  <span className={s.go}>{lane.name}</span>
                  <svg viewBox={`0 0 ${W} ${i === NONE ? LH + 11 : LH}`} className={`stage-svg ${s.track}`} role="img" aria-label={`${lane.name} friction lane, puck at ${x.toFixed(1)} m`}>
                    <rect x={0} y={4} width={W} height={LH - 8} rx={6} className={i === NONE ? s.iceNone : s.ice} />
                    {[0, 5, 10, 15, 20].map((m) => (
                      <line key={m} x1={X0 + m * K} y1={4} x2={X0 + m * K} y2={LH - 4} className={s.grid} />
                    ))}
                    {dots.map((d, k) => (
                      <circle key={k} cx={X0 + d * K} cy={LH / 2} r={3} className={s.dot} />
                    ))}
                    <circle cx={X0 + x * K} cy={LH / 2} r={6} className={s.puck} />
                    {i === NONE &&
                      [0, 10, 20].map((m) => (
                        <text key={m} x={X0 + m * K} y={LH + 8} textAnchor={m === 0 ? "start" : m === 20 ? "end" : "middle"} className={s.tickLabel}>
                          {m === 0 ? "0" : `${m} m`}
                        </text>
                      ))}
                    {finished && (
                      <text
                        x={X0 + x * K + (X0 + x * K + 40 > W ? -10 : 10)}
                        y={LH / 2 + 4}
                        textAnchor={X0 + x * K + 40 > W ? "end" : "start"}
                        className={s.dist}
                      >
                        {x.toFixed(1)} m
                      </text>
                    )}
                  </svg>
                </div>
              );
            })}
            <p className={s.caption} aria-live="polite">
              {caption}
            </p>
            <Control disabled={locked || anyActive} onClick={start}>
              {done.some(Boolean) ? "Slide all four again" : "Slide all four pucks"}
            </Control>
          </div>
        );
      }}
    </Lesson>
  );
}
