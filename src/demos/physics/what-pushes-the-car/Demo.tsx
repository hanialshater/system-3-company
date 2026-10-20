"use client";

// What pushes the car. A 1,200 kg all-wheel-drive car asks for 2 m/s²: that needs F = m a = 2,400 N,
// and the only outside force that can supply it is the road's grip on the tyres (static friction).
// The most the road can give is μ m g: dry (μ 0.8) 9,418 N, so it holds; ice (μ 0.1) 1,177 N, so the
// wheels slip and the car gains only 0.98 m/s²; frictionless 0 N, the wheels spin and the car stays put.
// Brief: company/domains/briefs/physics.md round 4, #63; numbers from
// artifacts/scratch/cm-physics-r4/check.mjs (main checkout), block 63.
//
// One picture: a side view of the car on one road strip. At each tyre's contact patch a forward arrow
// "road on tyre" (the cause) and a backward arrow "tyre on road", drawn in proportion. The engine's
// turning of the wheels is a curved arrow on each wheel, the same on every surface. The car is drawn
// where it would be 2 s after pulling away, with a dashed outline where it started. The stage starts
// parked, a state no preset produces. Earned reveal: milestones "dry", "ice", "frictionless"; values
// are recorded in the Seen row when each fires and never cleared. 380 ms animation; milestones fire on
// the press. QA path (DOM order): Dry road, Ice, Frictionless.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const M = 1200; // kg
const A_ASK = 2; // m/s² asked for
const F_ASK = M * A_ASK; // 2,400 N
const MU = { dry: 0.8, ice: 0.1, frictionless: 0 } as const;
type Surface = keyof typeof MU;
const MILESTONES = ["dry", "ice", "frictionless"] as const;
const T_SHOW = 2; // s: the car is drawn where it is 2 s after pulling away
const PXM = 12; // px per m along the road
const FPX = 1 / 40; // px per N, per axle

function physics(sf: Surface) {
  const grip = MU[sf] * M * G;
  const force = Math.min(F_ASK, grip);
  const a = force / M;
  return { grip, force, a, slips: grip < F_ASK, dist: 0.5 * a * T_SHOW * T_SHOW };
}
const fmtN = (f: number) => `${Math.round(f).toLocaleString("en-US")} N`;
const fmtA = (a: number) => (a === 0 ? "0" : a >= 1.995 ? a.toFixed(1) : a.toFixed(2));

// ---- geometry (viewBox 320 × 164) ----
const W = 320;
const H = 164;
const ROAD = 112;
const X0 = 46; // car body left at the start
const WR = 13; // wheel radius
const WHEELS = [26, 88]; // wheel centres from the body's left

function useAnim(key: string) {
  const [p, setP] = useState(1);
  useEffect(() => {
    if (key === "") return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 380);
      setP(k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    setP(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key]);
  return p;
}

const carPath = (x: number) =>
  `M${x},${ROAD - WR - 6} v-20 q0,-6 6,-6 h24 l14,-16 h40 l16,16 h6 q6,0 6,6 v20 z`;

function Arrow({ x1, x2, y, cls, head }: { x1: number; x2: number; y: number; cls: string; head: string }) {
  if (Math.abs(x2 - x1) < 2) return null;
  return <line x1={x1} y1={y} x2={x2} y2={y} className={cls} markerEnd={`url(#${head})`} />;
}

export default function WhatPushesTheCar({ slug }: { slug: string }) {
  const [sf, setSf] = useState<Surface | null>(null);
  const [runs, setRuns] = useState(0);
  const [seen, setSeen] = useState<{ dryN?: number; dryA?: number; iceN?: number; frN?: number }>({});
  const p = useAnim(sf === null ? "" : `${sf}-${runs}`);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You press the pedal and your car speeds up along a flat road. What actually pushes the car forward?",
        options: ["Its engine", "The road", "The air behind it"],
        answer: 1,
      }}
      exploreHint="Pull away on each road surface and watch the arrows at the tyres."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            On the dry road your car gained speed at {seen.dryA !== undefined ? fmtA(seen.dryA) : "?"} m/s², pushed by the
            road&apos;s <strong>{seen.dryN !== undefined ? fmtN(seen.dryN) : "?"}</strong> grip on the tyres. On ice the road
            could give only {seen.iceN !== undefined ? fmtN(seen.iceN) : "?"} and the wheels slipped. On a frictionless road the
            engine spun the wheels just as hard and the car went nowhere.
          </p>
          <p>
            The engine turns the wheels and the tyres push back on the road; the road pushing forward on the tyres is what moves
            the car.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (k: Surface) => {
              const r = physics(k);
              setSf(k);
              setRuns((n) => n + 1);
              if (k === "dry") setSeen((x) => ({ ...x, dryN: x.dryN ?? r.force, dryA: x.dryA ?? r.a }));
              if (k === "ice") setSeen((x) => ({ ...x, iceN: x.iceN ?? r.force }));
              if (k === "frictionless") setSeen((x) => ({ ...x, frN: x.frN ?? r.force }));
              reach(k);
            };
            const live = sf !== null && !locked;
            const r = live ? physics(sf) : null;
            const carX = X0 + (r ? r.dist * PXM * p : 0);
            // the engine turns the wheels by the same amount on every surface (as on the dry road)
            const spin = live ? ((physics("dry").dist / (WR / PXM)) * p * 180) / Math.PI : 0;
            const perAxle = r ? (r.force / 2) * FPX : 0;
            const readout = !r
              ? null
              : sf === "dry"
                ? `${fmtN(r.force)} forward · ${fmtA(r.a)} m/s²`
                : sf === "ice"
                  ? `${fmtN(r.grip)} max · ${fmtA(r.a)} m/s² · slipping`
                  : `0 N forward · 0 m/s² · wheels spin`;
            // Seen row: forces only (cm-physics R1 cut P1, 2026-10-16); the acceleration stays in the readout and reveal
            const seenText = [
              `dry: ${seen.dryN !== undefined ? fmtN(seen.dryN) : "–"}`,
              `ice: ${seen.iceN !== undefined ? fmtN(seen.iceN) : "–"}`,
              `frictionless: ${seen.frN !== undefined ? fmtN(seen.frN) : "–"}`,
            ].join(" · ");
            const roadCls = !live ? s.road : sf === "dry" ? s.road : sf === "ice" ? s.ice : s.glass;
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={locked || !r ? "A parked car on a flat road" : `Car on the ${sf} road. ${readout}.`}
                >
                  <defs>
                    {[
                      ["wp-f", s.headF],
                      ["wp-b", s.headB],
                      ["wp-s", s.headS],
                    ].map(([id, cls]) => (
                      <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" className={cls} />
                      </marker>
                    ))}
                  </defs>

                  {readout && (
                    <text x={W / 2} y={16} textAnchor="middle" className={s.labD}>
                      {readout}
                    </text>
                  )}

                  {/* road */}
                  <rect x={0} y={ROAD} width={W} height={12} className={roadCls} />
                  <line x1={0} y1={ROAD} x2={W} y2={ROAD} className={s.surface} />

                  {/* where it started */}
                  {r && r.dist > 0 && (
                    <path d={carPath(X0)} className={s.ghost} />
                  )}

                  {/* car */}
                  <g>
                    <path d={carPath(carX)} className={s.body} />
                    <path d={`M${carX + 34},${ROAD - WR - 34} l10,-12 h16 v12 z M${carX + 64},${ROAD - WR - 34} v-12 h14 l12,12 z`} className={s.window} />
                    {WHEELS.map((wx) => {
                      const cx = carX + wx;
                      const cy = ROAD - WR;
                      return (
                        <g key={wx}>
                          <circle cx={cx} cy={cy} r={WR} className={s.tyre} />
                          <g transform={`rotate(${spin} ${cx} ${cy})`}>
                            <line x1={cx - WR + 4} y1={cy} x2={cx + WR - 4} y2={cy} className={s.spoke} />
                            <line x1={cx} y1={cy - WR + 4} x2={cx} y2={cy + WR - 4} className={s.spoke} />
                          </g>
                          {live && (
                            <path
                              d={`M${cx - 9},${cy - 13} A16,16 0 0 1 ${cx + 12},${cy - 11}`}
                              className={s.turn}
                              markerEnd="url(#wp-s)"
                            />
                          )}
                          {r && r.slips && (
                            <path d={`M${cx - 20},${ROAD - 3} q4,-5 8,0 q4,5 8,0`} className={s.slip} />
                          )}
                          {r && (
                            <>
                              <Arrow x1={cx} x2={cx + perAxle} y={ROAD - 2} cls={s.fwd} head="wp-f" />
                              <Arrow x1={cx} x2={cx - perAxle} y={ROAD + 7} cls={s.back} head="wp-b" />
                            </>
                          )}
                        </g>
                      );
                    })}
                  </g>

                  {/* arrow labels: forward by the front tyre, backward by the rear tyre */}
                  {r && perAxle > 0 && (
                    <>
                      <text x={carX + WHEELS[1] + 4} y={ROAD + 26} className={s.labD}>
                        road on tyre →
                      </text>
                      <text x={Math.max(2, carX + WHEELS[0] - 4)} y={ROAD + 42} className={s.labB}>
                        ← tyre on road
                      </text>
                    </>
                  )}
                </svg>

                <p className={s.caption}>1,200 kg car, all-wheel drive, no air drag.</p>
                <p className={s.seen}>Seen: {seenText}</p>

                <Row>
                  {(
                    [
                      ["dry", "Dry road: accelerate"],
                      ["ice", "Ice: accelerate"],
                      ["frictionless", "Frictionless: accelerate"],
                    ] as const
                  ).map(([k, label]) => (
                    <Control key={k} className={sf === k ? "active" : ""} disabled={locked || sf === k} onClick={() => go(k)}>
                      {label}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
