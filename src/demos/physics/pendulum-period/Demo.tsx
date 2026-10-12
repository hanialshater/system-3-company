"use client";

// A pendulum's period ignores its mass. The learner's pendulum swings over a
// dashed "ghost" (1 m, 100 g). Change the mass: it stays locked to the ghost.
// Change the length: it drifts out of step.
//
// Physics: both pendulums integrate the full equation theta'' = -(g/L) sin(theta)
// with RK4 at a fixed 1/600 s step (deterministic, no small-angle shortcut).
// Mass does not appear in the equation; the mass slider only changes the bob size.
// The period readout is the exact period, T = 2 pi sqrt(L/g) / AGM(1, cos(theta0/2)).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const G = 9.81; // m/s^2
const THETA0 = (20 * Math.PI) / 180; // release angle, rad
const GHOST_L = 1; // m
const GHOST_M = 0.1; // kg
const DT = 1 / 600; // s, integration step

const W = 300;
const H = 268;
const PIVOT = { x: W / 2, y: 16 };
const PX_PER_M = 110;

interface Swing {
  theta: number;
  omega: number;
}

function deriv(L: number, th: number, om: number) {
  return [om, -(G / L) * Math.sin(th)] as const;
}

function rk4(L: number, st: Swing, dt: number): Swing {
  const [a1, b1] = deriv(L, st.theta, st.omega);
  const [a2, b2] = deriv(L, st.theta + (a1 * dt) / 2, st.omega + (b1 * dt) / 2);
  const [a3, b3] = deriv(L, st.theta + (a2 * dt) / 2, st.omega + (b2 * dt) / 2);
  const [a4, b4] = deriv(L, st.theta + a3 * dt, st.omega + b3 * dt);
  return {
    theta: st.theta + (dt / 6) * (a1 + 2 * a2 + 2 * a3 + a4),
    omega: st.omega + (dt / 6) * (b1 + 2 * b2 + 2 * b3 + b4),
  };
}

function agm(a: number, b: number) {
  for (let i = 0; i < 20; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)];
  return a;
}

/** Exact period of a pendulum of length L released from THETA0. */
function period(L: number) {
  return (2 * Math.PI * Math.sqrt(L / G)) / agm(1, Math.cos(THETA0 / 2));
}

const bobRadius = (kg: number) => 7 * Math.cbrt(kg / GHOST_M);
const rest = (): Swing => ({ theta: THETA0, omega: 0 });

export default function PendulumPeriod({ slug }: { slug: string }) {
  const [mass, setMass] = useState(GHOST_M);
  const [length, setLength] = useState(GHOST_L);
  const [running, setRunning] = useState(false);
  const [, setFrame] = useState(0);

  const sim = useRef({ t: 0, me: rest(), ghost: rest(), carry: 0 });
  const lengthRef = useRef(length);
  lengthRef.current = length;

  const advance = (seconds: number) => {
    const st = sim.current;
    st.carry += seconds;
    while (st.carry >= DT) {
      st.me = rk4(lengthRef.current, st.me, DT);
      st.ghost = rk4(GHOST_L, st.ghost, DT);
      st.t += DT;
      st.carry -= DT;
    }
    setFrame((f) => f + 1);
  };

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last: number | null = null;
    const tick = (now: number) => {
      if (last !== null) advance(Math.min(0.05, (now - last) / 1000));
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const restart = () => {
    sim.current = { t: 0, me: rest(), ghost: rest(), carry: 0 };
    setFrame((f) => f + 1);
  };

  const { me, ghost, t } = sim.current;
  const T = period(length);
  const T0 = period(GHOST_L);
  const gapDeg = (Math.abs(me.theta - ghost.theta) * 180) / Math.PI;
  const sameLength = Math.abs(length - GHOST_L) < 1e-9;

  const pos = (L: number, th: number) => ({
    x: PIVOT.x + L * PX_PER_M * Math.sin(th),
    y: PIVOT.y + L * PX_PER_M * Math.cos(th),
  });
  const bob = pos(length, me.theta);
  const gb = pos(GHOST_L, ghost.theta);
  const r = bobRadius(mass);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A 1 m pendulum with a 100 g weight takes about 2 seconds per back-and-forth. Hang a 2 kg weight on the same string instead. Each swing now takes…",
        options: ["longer", "the same time", "less time"],
        answer: 1,
      }}
      exploreHint="Release it, then change the weight. Then change the string."
      reveal={() => (
        <>
          <p>
            On the same 1 m string, every weight stayed locked to the 100 g ghost: <strong>{T0.toFixed(2)} s</strong> per
            swing. Gravity pulls 20 times harder on 2 kg than on 100 g, but 2 kg is also 20 times harder to speed up. The
            two cancel exactly, so mass drops out.
          </p>
          <p>
            Length is what sets the beat. The longer string drifted out of step: four times the length doubles the
            period, from about 1 s at 0.25 m to about 2 s at 1 m. Galileo saw the same with lead and cork.
          </p>
          <p className="muted">The weight decides how hard it pulls, not how fast it swings.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const caption = locked
          ? "Make a prediction to start. Dashed ghost: 1 m, 100 g."
          : !running && t === 0
            ? "Dashed ghost: 1 m string, 100 g. Release them together."
            : t < 0.3
              ? "Released together. Watch whether yours keeps up with the ghost."
              : sameLength
                ? gapDeg < 1
                  ? `${mass === GHOST_M ? "Same pendulum." : `${mass} kg vs 100 g:`} still in step with the ghost.`
                  : "In step with the ghost."
                : `Different string: ${gapDeg < 2 ? "slipping" : "out of step"} with the ghost.`;

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label="A pendulum swinging over a dashed ghost pendulum">
              <line x1={PIVOT.x - 50} y1={PIVOT.y} x2={PIVOT.x + 50} y2={PIVOT.y} className={s.beam} />
              {/* the learner's pendulum */}
              <line x1={PIVOT.x} y1={PIVOT.y} x2={bob.x} y2={bob.y} className={s.string} />
              <circle cx={bob.x} cy={bob.y} r={r} className={s.bob} />
              <text x={bob.x} y={bob.y + r + 13} textAnchor="middle" className={s.bobLabel}>
                {mass < 1 ? `${Math.round(mass * 1000)} g` : `${mass} kg`}
              </text>
              {/* ghost on top, so it shows through a big bob */}
              <line x1={PIVOT.x} y1={PIVOT.y} x2={gb.x} y2={gb.y} className={s.ghostString} />
              <circle cx={gb.x} cy={gb.y} r={bobRadius(GHOST_M)} className={s.ghostBob} />
              <circle cx={PIVOT.x} cy={PIVOT.y} r={3} className={s.pivot} />
              <text x={8} y={H - 8} className={s.clock}>
                t = {t.toFixed(1)} s
              </text>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              <Slider
                label="Weight"
                value={mass}
                min={0.1}
                max={2}
                step={0.1}
                disabled={locked}
                format={(v) => (v < 1 ? `${Math.round(v * 1000)} g` : `${v.toFixed(1)} kg`)}
                onChange={(v) => {
                  interact();
                  setMass(Math.round(v * 10) / 10);
                  restart();
                }}
              />
              <Slider
                label="String"
                value={length}
                min={0.25}
                max={2}
                step={0.25}
                disabled={locked}
                format={(v) => `${v.toFixed(2)} m`}
                onChange={(v) => {
                  interact();
                  setLength(v);
                  lengthRef.current = v;
                  restart();
                }}
              />
            </Row>
            <Row>
              <Control
                className={running ? "active" : ""}
                disabled={locked}
                onClick={() => {
                  interact();
                  setRunning((x) => !x);
                }}
              >
                {running ? "Pause" : t === 0 ? "Release" : "Resume"}
              </Control>
              <Control
                disabled={locked || running}
                aria-label="Step 0.1 seconds"
                onClick={() => {
                  interact();
                  advance(0.1);
                }}
              >
                Step 0.1 s
              </Control>
              <Readout label="Yours" value={`${T.toFixed(2)} s`} />
              <Readout label="Ghost" value={`${T0.toFixed(2)} s`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
