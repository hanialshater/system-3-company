"use client";

// Truck hits car. A time slider scrubs through a head-on crash; thick arrows are
// the push each vehicle feels, thin arrows are their velocities. The pushes stay
// equal at every instant whatever the truck's mass; the car's velocity changes
// ten times as much as a 10,000 kg truck's.
//
// Physics: 1D head-on crash, truck +10 m/s, car (1000 kg) -10 m/s. The crumpling
// fronts are modelled as one spring-damper contact, F = max(0, k d + c d'), with
// k = 5e5 N/m and damping set for a restitution of about 0.2 (illustrative).
// The same contact force F acts on both (Newton's third law); each vehicle obeys
// m a = F. Integrated with RK4 at 1e-5 s. Momentum is conserved to rounding.
// The reveal unlocks once the learner has moved into the crash (t > 0).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useMemo, useState } from "react";
import s from "./styles.module.css";

const V0 = 10; // m/s each, towards each other
const M_CAR = 1000; // kg
const K_C = 5e5; // N/m
const E = 0.2; // target restitution
const DT = 1e-5; // s
const T_MAX_MS = 120;

interface Sample {
  F: number;
  vt: number;
  vc: number;
}

/** One sample per millisecond, 0..T_MAX_MS. */
function crash(mTruck: number): Sample[] {
  const mu = (mTruck * M_CAR) / (mTruck + M_CAR);
  const ln = Math.log(E);
  const zeta = -ln / Math.sqrt(Math.PI ** 2 + ln * ln);
  const c = 2 * zeta * Math.sqrt(K_C * mu);
  const force = (st: number[]) => {
    const d = st[0] - st[2];
    const dd = st[1] - st[3];
    return d > 0 || (d >= 0 && dd > 0) ? Math.max(0, K_C * d + c * dd) : 0;
  };
  const deriv = (st: number[]) => {
    const f = force(st);
    return [st[1], -f / mTruck, st[3], f / M_CAR];
  };
  let st = [0, V0, 0, -V0]; // truck x, v; car x, v (overlap d = xt - xc)
  const out: Sample[] = [];
  const per = Math.round(1e-3 / DT);
  for (let i = 0; i <= T_MAX_MS * per; i++) {
    if (i % per === 0) out.push({ F: force(st), vt: st[1], vc: st[3] });
    const k1 = deriv(st);
    const k2 = deriv(st.map((v, j) => v + (k1[j] * DT) / 2));
    const k3 = deriv(st.map((v, j) => v + (k2[j] * DT) / 2));
    const k4 = deriv(st.map((v, j) => v + k3[j] * DT));
    st = st.map((v, j) => v + (DT / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
  }
  return out;
}

const W = 320;
const H = 150;
const CX = 196; // contact point, px
const GROUND = 122;
const F_PX = 95 / 420e3; // px per newton
const V_PX = 4; // px per m/s

function Arrow({ x, y, dx, className, head = 7 }: { x: number; y: number; dx: number; className: string; head?: number }) {
  if (Math.abs(dx) < 1) return <circle cx={x} cy={y} r={1.5} className={className} />;
  const dir = Math.sign(dx);
  const tip = x + dx;
  const h = Math.min(head, Math.abs(dx));
  return (
    <g className={className}>
      <line x1={x} y1={y} x2={tip - dir * h * 0.8} y2={y} />
      <path d={`M ${tip} ${y} L ${tip - dir * h} ${y - h * 0.6} L ${tip - dir * h} ${y + h * 0.6} Z`} />
    </g>
  );
}

export default function TruckHitsCar({ slug }: { slug: string }) {
  const [truckKg, setTruckKg] = useState(10000);
  const [ms, setMs] = useState(0);
  const run = useMemo(() => crash(truckKg), [truckKg]);
  const now = run[ms];
  const kN = Math.round(now.F / 1000);
  const end = run[T_MAX_MS];
  const dvTruck = (r: Sample) => Math.abs(r.vt - V0);
  const dvCar = (r: Sample) => Math.abs(r.vc + V0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A 10,000 kg truck and a 1,000 kg car collide head-on. During the impact, which pushes harder on the other?",
        options: ["The truck pushes harder", "The car pushes harder", "They push equally hard"],
        answer: 2,
      }}
      exploreHint="Slide into the crash, then play it to the end and compare the speed changes."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At every instant the two pushes were <strong>equal</strong>: the truck pushed the car exactly as hard as the
            car pushed the truck, whatever the truck&rsquo;s mass. A push is always between two things, so each feels
            the same force, in opposite directions.
          </p>
          <p>
            What differed was the effect. By the end the car&rsquo;s speed had changed by{" "}
            <strong>{dvCar(end).toFixed(1)} m/s</strong> and the truck&rsquo;s by <strong>{dvTruck(end).toFixed(1)} m/s</strong>: the
            same push changes the lighter vehicle much more. That is why the car comes off worse.
          </p>
          <p className="muted">Newton&rsquo;s third law, with a = F / m for each vehicle. 1 kN is about the weight of a 100 kg person.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["into-crash", "crash-over"]}>
          {(reach) => {
        const truckW = 74 + 46 * Math.cbrt(truckKg / 20000);
        const truckH = 30 + 26 * Math.cbrt(truckKg / 20000);
        const go = (v: number) => {
          setMs(v);
          if (v > 0) reach("into-crash");
          if (v > 0 && run[v].F === 0) reach("crash-over");
        };
        const showForces = !locked && ms > 0;
        const caption = locked
          ? "Make a prediction to start."
          : ms === 0
            ? "Just touching. Slide into the crash."
            : `Thick arrows: pushes. Thin: velocities. Car ${now.vc > 0 ? "now moving away" : "still moving in"}.`;

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Crash at ${ms} milliseconds: each vehicle feels ${kN} kilonewtons`}>
              <line x1={0} y1={GROUND} x2={W} y2={GROUND} className={s.ground} />
              {/* truck: cab at the front (right) */}
              <rect x={CX - truckW} y={GROUND - truckH - 6} width={truckW - 26} height={truckH} rx={3} className={s.truck} />
              <rect x={CX - 26} y={GROUND - 32} width={26} height={26} rx={4} className={s.truck} />
              <circle cx={CX - truckW + 16} cy={GROUND - 6} r={7} className={s.wheel} />
              <circle cx={CX - 14} cy={GROUND - 6} r={7} className={s.wheel} />
              {/* car */}
              <rect x={CX} y={GROUND - 24} width={64} height={18} rx={4} className={s.car} />
              <path d={`M ${CX + 14} ${GROUND - 24} L ${CX + 22} ${GROUND - 36} L ${CX + 46} ${GROUND - 36} L ${CX + 54} ${GROUND - 24} Z`} className={s.car} />
              <circle cx={CX + 13} cy={GROUND - 5} r={5} className={s.wheel} />
              <circle cx={CX + 51} cy={GROUND - 5} r={5} className={s.wheel} />
              <text x={CX + 32} y={GROUND - 12} textAnchor="middle" className={s.carText}>
                1,000 kg
              </text>

              {/* velocities (thin) */}
              {!locked && (
                <>
                  <Arrow x={CX - truckW / 2} y={GROUND - truckH - 16} dx={now.vt * V_PX} className={s.vel} head={5} />
                  <Arrow x={CX + 32} y={GROUND - 48} dx={now.vc * V_PX} className={s.vel} head={5} />
                </>
              )}

              {/* pushes (thick): truck on car points right, car on truck points left */}
              {showForces && (
                <>
                  <Arrow x={CX + 2} y={GROUND - 98} dx={now.F * F_PX} className={s.force} head={9} />
                  <Arrow x={CX - 2} y={GROUND - 98} dx={-now.F * F_PX} className={s.force} head={9} />
                  <text x={CX + 6} y={GROUND - 108} className={s.forceLabel}>
                    {kN} kN
                  </text>
                  <text x={CX - 6} y={GROUND - 108} textAnchor="end" className={s.forceLabel}>
                    {kN} kN
                  </text>
                </>
              )}
              <line x1={CX} y1={GROUND - 112} x2={CX} y2={GROUND} className={s.contact} />
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              <Readout label="Truck speed change" value={locked ? "?" : `${dvTruck(now).toFixed(1)} m/s`} />
              <Readout label="Car speed change" value={locked ? "?" : `${dvCar(now).toFixed(1)} m/s`} />
            </Row>
            <Row>
              <Control disabled={locked || ms === T_MAX_MS} onClick={() => go(T_MAX_MS)}>
                Play to the end
              </Control>
            </Row>
            <Row>
              <Slider
                label="Into the crash"
                value={ms}
                min={0}
                max={T_MAX_MS}
                step={10}
                disabled={locked}
                format={(v) => `${v} ms`}
                onChange={go}
              />
              <Slider
                label="Truck mass"
                value={truckKg}
                min={1000}
                max={20000}
                step={1000}
                disabled={locked}
                format={(v) => `${v.toLocaleString("en-US")} kg`}
                onChange={(v) => setTruckKg(v)}
              />
            </Row>
          </div>
        );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
