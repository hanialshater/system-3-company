"use client";

// A pendulum's period ignores its mass. The learner's pendulum swings over a
// dashed "ghost" (1 m, 100 g). Change the mass: it stays locked to the ghost.
// Change the length: it drifts out of step.
//
// Physics: both pendulums integrate the full equation theta'' = -(g/L) sin(theta)
// with RK4 at a fixed 1/600 s step (deterministic, no small-angle shortcut).
// Mass does not appear in the equation; the mass slider only changes the bob size.
// The period readout is the exact period, T = 2 pi sqrt(L/g) / AGM(1, cos(theta0/2)).
//
// v3: per-swing readouts wait for one swing to complete; the mass-cancels caption and reveal use the learner's own
// weight; the ghost is labelled; the model tag glosses 'ideal'.
// v2: the reveal is earned. Milestone "heavy-kept-up": a changed weight on the 1 m string has
// swung one full back-and-forth beside the ghost. Sliders change one variable at a time.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useRef, useState, type ReactNode } from "react";
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

const fmtMass = (kg: number) => (kg < 1 ? `${Math.round(kg * 1000)} g` : `${kg.toFixed(1)} kg`);
const isGhostMass = (kg: number) => Math.abs(kg - GHOST_M) < 1e-9;
const isGhostLength = (L: number) => Math.abs(L - GHOST_L) < 1e-9;

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

function ReachWatcher({ hit, onReach }: { hit: boolean; onReach: () => void }) {
  useEffect(() => {
    if (hit) onReach();
  }, [hit, onReach]);
  return null;
}

export default function PendulumPeriod({ slug }: { slug: string }) {
  const [mass, setMass] = useState(GHOST_M);
  const [length, setLength] = useState(GHOST_L);
  const [running, setRunning] = useState(false);
  const [, setFrame] = useState(0);
  // What the learner actually saw, for the reveal.
  const [heavySeen, setHeavySeen] = useState<number | null>(null);
  const [lengthSeen, setLengthSeen] = useState<number | null>(null);
  const [reset, setReset] = useState<string | null>(null);

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
  const sameLength = isGhostLength(length);
  const heavy = !isGhostMass(mass);
  // The key state: a changed weight on the ghost's own string, swung for one full back-and-forth.
  const sawHeavyKeepUp = sameLength && heavy && t >= T0;
  const sawLengthDrift = !sameLength && t >= T0;

  useEffect(() => {
    if (sawHeavyKeepUp) setHeavySeen(mass);
  }, [sawHeavyKeepUp, mass]);
  useEffect(() => {
    if (sawLengthDrift) setLengthSeen(length);
  }, [sawLengthDrift, length]);

  const pos = (L: number, th: number) => ({
    x: PIVOT.x + L * PX_PER_M * Math.sin(th),
    y: PIVOT.y + L * PX_PER_M * Math.cos(th),
  });
  const bob = pos(length, me.theta);
  const gb = pos(GHOST_L, ghost.theta);
  const r = bobRadius(mass);
  const ratio = Math.round(mass / GHOST_M);
  const kRatio = Math.round((heavySeen ?? 2) / GHOST_M);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "An ideal 1 m pendulum with a 100 g weight takes about 2 seconds per back-and-forth. Hang a 2 kg weight on the same string instead. Each back-and-forth now takes…",
        options: ["longer", "the same time", "less time"],
        answer: 1,
      }}
      exploreHint="Change only the weight, press Release and let it swing. Then change only the string (try 0.25 m) and release again."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {heavySeen !== null
              ? `Your ${fmtMass(heavySeen)} weight on the 1 m string stayed locked to the 100 g ghost: `
              : "On the 1 m string, a heavier weight stays locked to the 100 g ghost: "}
            <strong>{T0.toFixed(2)} s</strong> per back-and-forth. Gravity pulls {kRatio} times harder on{" "}
            {fmtMass(heavySeen ?? 2)} than on 100 g, but it is also {kRatio} times harder to speed up. The two cancel
            exactly, so mass drops out.
          </p>
          <p>
            Length is what sets the beat.{" "}
            {lengthSeen !== null
              ? `Your ${lengthSeen.toFixed(2)} m string drifted out of step (${period(lengthSeen).toFixed(2)} s against ${T0.toFixed(2)} s). ${
                  lengthSeen === 0.25 ? "A quarter of the length, half the time." : ""
                }`
              : "You did not try the string, so try it now on the stage: a different length drifts out of step with the ghost."}{" "}
            Galileo reported the same with lead and cork pendulums.
          </p>
          <p className="muted">
            This is an ideal pendulum (point weight, no air), where mass cancels in the equation itself. Real bobs
            differ slightly through air drag. The weight decides how hard it pulls, not how fast it swings.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["heavy-kept-up"]}>
          {(reach) => {
            const caption = locked
              ? "Make a prediction to start. Dashed ghost: 1 m, 100 g."
              : reset && t < 0.6
                ? reset
                : !running && t === 0
                  ? "Dashed ghost: 1 m string, 100 g. Times are per back-and-forth."
                  : t < 0.3
                    ? "Released together. Does yours keep up with the ghost?"
                    : sameLength
                      ? heavy
                        ? gapDeg < 1
                          ? `${fmtMass(mass)}: gravity pulls ${ratio}× harder, but it is also ${ratio}× harder to get moving. Still in step.`
                          : "In step with the ghost."
                        : "Same pendulum as the ghost. Change one thing."
                      : `Different string: ${gapDeg < 2 ? "slipping" : "out of step"} with the ghost.`;

            return (
              <div className={s.wrap}>
                <ReachWatcher hit={sawHeavyKeepUp} onReach={() => reach("heavy-kept-up")} />
                <span className={`tag ${s.model}`}>Ideal pendulum: no air, weightless string, released at 20°</span>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label="A pendulum swinging over a dashed ghost pendulum"
                >
                  <line x1={PIVOT.x - 50} y1={PIVOT.y} x2={PIVOT.x + 50} y2={PIVOT.y} className={s.beam} />
                  {/* the learner's pendulum */}
                  <line x1={PIVOT.x} y1={PIVOT.y} x2={bob.x} y2={bob.y} className={s.string} />
                  <circle cx={bob.x} cy={bob.y} r={r} className={s.bob} />
                  <text x={bob.x} y={bob.y + r + 14} textAnchor="middle" className={s.bobLabel}>
                    {fmtMass(mass)}
                  </text>
                  {/* ghost on top, so it shows through a big bob */}
                  <line x1={PIVOT.x} y1={PIVOT.y} x2={gb.x} y2={gb.y} className={s.ghostString} />
                  <circle cx={gb.x} cy={gb.y} r={bobRadius(GHOST_M) + 2} className={s.ghostBob} />
                  <text x={gb.x + (gb.x >= PIVOT.x ? 14 : -14)} y={gb.y + 3} textAnchor={gb.x >= PIVOT.x ? "start" : "end"} className={s.bobLabel}>
                    ghost
                  </text>
                  <circle cx={PIVOT.x} cy={PIVOT.y} r={3} className={s.pivot} />
                  <text x={8} y={H - 8} className={s.clock}>
                    t = {t.toFixed(1)} s
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                {/* One variable at a time: changing one slider puts the other back to the ghost's value.
                    String comes first in reading order so that the QA path (each control once) ends
                    on a changed weight at 1 m, the key state. */}
                <Row>
                  <Slider
                    label="String"
                    value={length}
                    min={0.25}
                    max={2}
                    step={0.25}
                    disabled={locked}
                    format={(v) => `${v.toFixed(2)} m`}
                    onChange={(v) => {
                      setLength(v);
                      lengthRef.current = v;
                      if (heavy) {
                        setMass(GHOST_M);
                        setReset("Only the string changed: weight back to 100 g.");
                      } else setReset(null);
                      restart();
                    }}
                  />
                  <Slider
                    label="Weight"
                    value={mass}
                    min={0.1}
                    max={2}
                    step={0.1}
                    disabled={locked}
                    format={fmtMass}
                    onChange={(v) => {
                      setMass(Math.round(v * 10) / 10);
                      if (!sameLength) {
                        setLength(GHOST_L);
                        lengthRef.current = GHOST_L;
                        setReset("Only the weight changed: string back to 1 m.");
                      } else setReset(null);
                      restart();
                    }}
                  />
                </Row>
                <Row>
                  <Control className={running ? "active" : ""} disabled={locked} onClick={() => setRunning((x) => !x)}>
                    {running ? "Pause" : t === 0 ? "Release" : "Resume"}
                  </Control>
                  <Control disabled={locked || running} aria-label="Step 0.1 seconds" onClick={() => advance(0.1)}>
                    Step 0.1 s
                  </Control>
                  <Readout label="Yours, per swing" value={t >= T0 ? `${T.toFixed(2)} s` : t > 0 ? "swinging…" : "not yet"} />
                  <Readout label="Ghost, per swing" value={t >= T0 ? `${T0.toFixed(2)} s` : t > 0 ? "swinging…" : "not yet"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
