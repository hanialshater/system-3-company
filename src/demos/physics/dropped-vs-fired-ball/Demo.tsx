"use client";

// Dropped vs fired. Two balls leave a 20 m cliff edge at the same instant: one is
// let go, one is fired sideways. Freeze-frame dots every 0.25 s sit on shared
// horizontal lines, so the learner sees the two heights match at every instant.
//
// Physics: no air drag, g = 9.81 m/s^2, flat ground 20 m below the launch point.
//   dropped: x = 0,      y = h - g t^2 / 2
//   fired:   x = v t,    y = h - g t^2 / 2
//   both land at t = sqrt(2 h / g) = 2.02 s; the fired ball lands v * 2.02 m out.
// Both axes share one scale so the arc has its true shape.
// The reveal unlocks when a run lands (milestone 'landed' at touchdown), so the
// landing itself has to be seen.
// v2: a "Jump to landing" step button reaches touchdown at once (the QA path waits only
// ~450 ms per press, the flight takes 2.02 s); a legend names the balls, the rings and the
// dashed lines; a clock runs during flight; the reveal quotes the speeds the learner fired.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const G = 9.81; // m/s^2
const H_M = 20; // cliff height, m
const T_LAND = Math.sqrt((2 * H_M) / G); // 2.019 s
const FRAME = 0.25; // s between freeze-frame dots
const SLOWMO = 0.5; // flight plays at half speed (4 s on screen); the clock shows real flight time

const W = 330;
const H = 156;
const K = 5.7; // px per metre, both axes: the 25 m/s landing (50.5 m) fits
const X0 = 22; // cliff edge, px
const TOP = 18; // launch height, px
const GY = TOP + H_M * K; // ground, px

const height = (t: number) => Math.max(0, H_M - (G * t * t) / 2);
const px = (xm: number, ym: number) => ({ x: X0 + xm * K, y: GY - ym * K });

interface Landing {
  v: number;
  range: number;
}

export default function DroppedVsFired({ slug }: { slug: string }) {
  const [speed, setSpeed] = useState(15);
  const [t, setT] = useState(0);
  const [flying, setFlying] = useState(false);
  const [landings, setLandings] = useState<Landing[]>([]);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["landed"]);
  const reachRef = useRef(reach);
  reachRef.current = reach;
  const land = (v: number) => {
    setLandings((ls) => [...ls.filter((l) => l.v !== v), { v, range: v * T_LAND }].slice(-3));
    reachRef.current("landed"); // the reveal is earned by seeing the touchdown
  };
  const landRef = useRef(land);
  landRef.current = land;
  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    if (!flying) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const tt = Math.min(T_LAND, (SLOWMO * (now - start)) / 1000);
      setT(tt);
      if (tt >= T_LAND) {
        setFlying(false);
        landRef.current(speedRef.current);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [flying]);

  const landed = !flying && t >= T_LAND;
  const frames: number[] = [];
  for (let k = 1; k * FRAME < t + 1e-9 && k * FRAME < T_LAND; k++) frames.push(k * FRAME);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "From a 20 m cliff, one ball is dropped. At the same instant another is fired sideways at 15 m/s. Which hits the ground first?",
        options: ["The dropped ball", "The fired ball", "Both together"],
        answer: 2,
      }}
      exploreHint="Fire both and watch them land. Try other speeds if you like."
      minInteractions={1}
      reveal={() => {
        const shots = landings.length ? landings : [{ v: 15, range: 15 * T_LAND }];
        const where = shots.map((l) => `${l.range.toFixed(1)} m out at ${l.v} m/s`).join(", ");
        return (
        <>
          <p>
            They landed together, <strong>{T_LAND.toFixed(2)} s</strong> after release
            {shots.length > 1 ? ", at every speed you tried" : ""}. The rings show why: at each moment the two balls sat on
            the same dashed line, at the same height.
          </p>
          <p>
            Gravity pulls only downwards, so the fall is the same for both: 20 m takes {T_LAND.toFixed(2)} s whatever
            the sideways speed. Going sideways changed where the ball landed ({where}), never when.
          </p>
          <p className="muted">This ignores air drag, which would slow the fast ball a little.</p>
        </>
        );
      }}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const fire = () => {
          if (locked || flying) return;
          setT(0);
          setFlying(true);
        };
        const jump = () => {
          if (locked) return;
          setFlying(false);
          setT(T_LAND);
          land(speed);
        };
        const fall = height(t);
        const dropped = px(0, fall);
        const fired = px(speed * t, fall);
        const caption = locked
          ? "Make a prediction to start."
          : flying || (t > 0 && !landed)
            ? "Rings: both balls every 0.25 s. Dashed line: same height."
            : landed
              ? `Both landed at ${T_LAND.toFixed(2)} s.`
              : "Both leave the edge at the same instant.";

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label="Side view of a cliff with a dropped ball and a ball fired sideways">
              <rect x={0} y={TOP} width={X0} height={GY - TOP} className={s.cliff} />
              <line x1={0} y1={GY} x2={W} y2={GY} className={s.ground} />
              <text x={X0 / 2} y={(TOP + GY) / 2} textAnchor="middle" dominantBaseline="middle" className={s.dim} transform={`rotate(-90 ${X0 / 2} ${(TOP + GY) / 2})`}>
                20 m
              </text>
              {[10, 20, 30, 40, 50].map((m) => (
                <g key={m}>
                  <line x1={X0 + m * K} y1={GY} x2={X0 + m * K} y2={GY + 4} className={s.tick} />
                  <text x={X0 + m * K} y={GY + 14} textAnchor="middle" className={s.tickLabel}>
                    {m} m
                  </text>
                </g>
              ))}

              {/* freeze frames: one shared height line per moment */}
              {frames.map((ft) => {
                const y = height(ft);
                const a = px(0, y);
                const b = px(speed * ft, y);
                return (
                  <g key={ft}>
                    <line x1={a.x} y1={a.y} x2={Math.max(b.x, a.x + 4)} y2={b.y} className={s.level} />
                    <circle cx={a.x} cy={a.y} r={3} className={s.dropDot} />
                    <circle cx={b.x} cy={b.y} r={3} className={s.fireDot} />
                  </g>
                );
              })}

              {landings.map((l) => (
                <g key={l.v}>
                  <circle cx={X0 + l.range * K} cy={GY} r={3.5} className={s.mark} />
                  <text x={X0 + l.range * K} y={GY - 7} textAnchor="middle" className={s.markLabel}>
                    {l.range.toFixed(1)} m
                  </text>
                </g>
              ))}

              {/* legend and clock */}
              <circle cx={W - 118} cy={8} r={4} className={s.dropBall} />
              <text x={W - 111} y={11} className={s.tickLabel}>dropped</text>
              <circle cx={W - 64} cy={8} r={4} className={s.fireBall} />
              <text x={W - 57} y={11} className={s.tickLabel}>fired</text>
              {!locked && (
                <text x={W - 6} y={28} textAnchor="end" className={s.clock}>
                  t = {t.toFixed(2)} s{flying ? " (slow-mo)" : ""}
                </text>
              )}
              <circle cx={dropped.x} cy={dropped.y} r={5.5} className={s.dropBall} />
              <circle cx={fired.x} cy={fired.y} r={5.5} className={s.fireBall} />
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Sideways speed"
              value={speed}
              min={0}
              max={25}
              step={5}
              disabled={locked || flying}
              format={(v) => `${v} m/s`}
              onChange={(v) => {
                setSpeed(v);
                setT(0);
              }}
            />
            <Row>
              <Control disabled={locked || flying} onClick={fire}>
                {landed ? "Fire again" : "Fire both"}
              </Control>
              <Control disabled={locked || landed} onClick={jump}>
                Jump to landing
              </Control>
            </Row>
            <Row>
              <Readout label="Dropped landed at" value={landed ? `${T_LAND.toFixed(2)} s` : "?"} />
              <Readout label="Fired landed at" value={landed ? `${T_LAND.toFixed(2)} s` : "?"} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
