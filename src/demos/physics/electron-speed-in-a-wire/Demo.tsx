"use client";

// Electron speed in a wire. A 12 V lamp draws a steady 1 A through 1 mm² copper wire. Copper has
// n = 8.5e28 free electrons per m³, so the drift speed is v = I / (n A e) = 7.34e-5 m/s = 0.073 mm/s:
// 0.07 mm in 1 s, 4.4 mm in 1 min, 26 cm in 1 h, and 7.6 h for the 2 m from switch to bulb. The push
// (the field) crosses the 2 m in about 10 ns (2e8 m/s, illustrative), so the lamp lights at once.
// Brief: company/domains/briefs/physics.md round 4, #61; numbers from
// artifacts/scratch/cm-physics-r4/check.mjs (main checkout), block 56.
//
// One picture: the circuit loop full of faint dots (the free electrons, the cause), one tinted
// electron at the switch, and under it a ruler of the wire's first 30 cm. Every dot shifts by the
// same distance as the tinted one. Earned reveal: milestones "switch-on", "one-minute", "one-hour"
// (the question's case: the trip time). Values are recorded in the Seen row when each fires and are
// never cleared. Animations run 380 ms; milestones fire on the press.
// QA path (DOM order): Switch on, Wait 1 s, Wait 1 min, Wait 1 h.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const E = 1.602e-19; // C
const N_CU = 8.5e28; // free electrons per m³ (8960 / 0.06355 × 6.022e23 = 8.49e28)
const AREA = 1e-6; // m² (1 mm²)
const I = 1; // A
const V_DRIFT = I / (N_CU * AREA * E); // 7.34e-5 m/s
const ROUTE = 2; // m, switch to bulb
const TRIP_H = ROUTE / V_DRIFT / 3600; // 7.57 h
const SIGNAL_NS = (ROUTE / 2e8) * 1e9; // 10 ns, illustrative
const MILESTONES = ["switch-on", "one-minute", "one-hour"] as const;

type Wait = 0 | 1 | 60 | 3600;
const WAITS: { t: Wait; label: string }[] = [
  { t: 1, label: "Wait 1 s" },
  { t: 60, label: "Wait 1 min" },
  { t: 3600, label: "Wait 1 h" },
];

// distance in the stage's rounding
const fmtDist = (m: number) => {
  const mm = m * 1000;
  if (mm < 1) return `${mm.toFixed(2)} mm`;
  if (mm < 100) return `${mm.toFixed(1)} mm`;
  return `${Math.round(mm / 10)} cm`;
};

// ---- geometry (viewBox 320 × 176) ----
const W = 320;
const H = 176;
const L = 26; // loop left (battery side)
const R = 294; // loop right
const T = 30; // top wire
const B = 96; // bottom wire
const SW_X = 62; // switch (right contact)
const BULB_X = SW_X + 200; // 262: 2 m of wire after the switch
const PX_M = (BULB_X - SW_X) / ROUTE; // 100 px per m on the circuit
const RL = 22; // ruler left (0 cm)
const RR = 302; // ruler right (30 cm)
const RX_CM = (RR - RL) / 30; // 9.33 px per cm
const RY = 140;

// the loop as a clockwise path from the battery's top (negative) terminal
const PERIM = 2 * (R - L) + 2 * (B - T);
function onLoop(d: number): [number, number] {
  let u = ((d % PERIM) + PERIM) % PERIM;
  const top = R - L;
  const side = B - T;
  if (u < side / 2) return [L, (T + B) / 2 - u]; // up the left side from the battery to the corner
  u -= side / 2;
  if (u < top) return [L + u, T];
  u -= top;
  if (u < side) return [R, T + u];
  u -= side;
  if (u < top) return [R - u, B];
  u -= top;
  return [L, B - u];
}
const SW_D = (B - T) / 2 + (SW_X - L); // loop distance of the switch contact
const DOTS = Array.from({ length: 44 }, (_, i) => (i * PERIM) / 44 + 3);

function useTween(target: number) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    let raf = 0;
    const start = from.current;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 380);
      const x = start + (target - start) * (1 - (1 - k) * (1 - k));
      from.current = x;
      setV(x);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

export default function ElectronSpeedInAWire({ slug }: { slug: string }) {
  const [on, setOn] = useState(false);
  const [wait, setWait] = useState<Wait>(0);
  const [seen, setSeen] = useState<{ lit?: number; min?: number; hour?: number; trip?: number }>({});
  const dist = on ? V_DRIFT * wait : 0; // m moved by every electron
  const shown = useTween(dist);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A lamp's wire runs 2 m from switch to bulb. How long does one electron at the switch take to reach the bulb?",
        options: ["Under a millionth of a second", "About one second", "Several hours"],
        answer: 2,
      }}
      exploreHint="Switch the lamp on, then wait and watch the tinted electron."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your bulb lit about <strong>{seen.lit !== undefined ? `${seen.lit} ns` : "?"}</strong> (10 billionths of a second)
            after the switch. Your tinted electron crept only {seen.min !== undefined ? fmtDist(seen.min) : "?"} in a minute and{" "}
            {seen.hour !== undefined ? fmtDist(seen.hour) : "?"} in an hour: the 2 m trip takes{" "}
            <strong>{seen.trip !== undefined ? `${seen.trip.toFixed(1)} h` : "?"}</strong>.
          </p>
          <p>
            The faint dots are the wire&apos;s free electrons, there all along. Closing the switch pushed on all of them at once,
            so the ones in the bulb moved straight away. Each only drifts, about {(V_DRIFT * 1000).toFixed(2)} mm a second.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const switchOn = () => {
              setOn(true);
              setSeen((x) => ({ ...x, lit: x.lit ?? Math.round(SIGNAL_NS) }));
              reach("switch-on");
            };
            const doWait = (t: Wait) => {
              setWait(t);
              if (t === 60) {
                setSeen((x) => ({ ...x, min: x.min ?? V_DRIFT * 60 }));
                reach("one-minute");
              }
              if (t === 3600) {
                setSeen((x) => ({ ...x, hour: x.hour ?? V_DRIFT * 3600, trip: x.trip ?? TRIP_H }));
                reach("one-hour");
              }
            };
            const live = on && !locked;
            const lit = live;
            const shiftPx = shown * PX_M;
            const [ex, ey] = onLoop(SW_D + shiftPx);
            const markerX = RL + shown * 100 * RX_CM;
            const seenText = [
              `lit: ${seen.lit !== undefined ? `~${seen.lit} ns` : "–"}`,
              `1 min: ${seen.min !== undefined ? fmtDist(seen.min) : "–"}`,
              `1 h: ${seen.hour !== undefined ? fmtDist(seen.hour) : "–"}`,
              `trip: ${seen.trip !== undefined ? `${seen.trip.toFixed(1)} h` : "–"}`,
            ].join(" · ");
            const status = !live
              ? null
              : wait === 0
                ? `lit after ~${Math.round(SIGNAL_NS)} ns`
                : wait === 3600
                  ? `2 m trip: ${TRIP_H.toFixed(1)} h`
                  : null;
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={
                    locked
                      ? "A battery, an open switch and a bulb on a wire loop full of electrons, with a ruler under the wire"
                      : `Circuit ${lit ? "on, bulb lit" : "off"}. The tinted electron has moved ${fmtDist(dist)}.`
                  }
                >
                  {/* the loop: left side (battery) is drawn with gaps for the battery and switch */}
                  <path d={`M${L},${(T + B) / 2 - 8} V${T} H${SW_X - 22}`} className={s.wire} />
                  <path d={`M${SW_X},${T} H${BULB_X - 9}`} className={s.wire} />
                  <path d={`M${BULB_X + 9},${T} H${R} V${B} H${L} V${(T + B) / 2 + 8}`} className={s.wire} />
                  {/* the first 30 cm after the switch, shown magnified as the ruler below */}
                  <line x1={SW_X} y1={T} x2={SW_X + 0.3 * PX_M} y2={T} className={s.seg} />
                  {/* battery: short plate (negative) on top, long plate (positive) below */}
                  <line x1={L - 6} y1={(T + B) / 2 - 8} x2={L + 6} y2={(T + B) / 2 - 8} className={s.plateShort} />
                  <line x1={L - 12} y1={(T + B) / 2 + 8} x2={L + 12} y2={(T + B) / 2 + 8} className={s.plateLong} />
                  <text x={L + 16} y={(T + B) / 2 + 4} className={s.lab}>
                    battery
                  </text>
                  {/* switch */}
                  <circle cx={SW_X - 22} cy={T} r={2.5} className={s.contact} />
                  <circle cx={SW_X} cy={T} r={2.5} className={s.contact} />
                  <line
                    x1={SW_X - 22}
                    y1={T}
                    x2={live ? SW_X : SW_X - 4}
                    y2={live ? T : T - 14}
                    className={s.lever}
                  />
                  <text x={SW_X - 11} y={T - 16} textAnchor="middle" className={s.lab}>
                    switch
                  </text>
                  {/* 2 m dimension, switch to bulb */}
                  <line x1={SW_X} y1={T + 14} x2={BULB_X} y2={T + 14} className={s.dim} />
                  <text x={(SW_X + BULB_X) / 2} y={T + 26} textAnchor="middle" className={s.lab}>
                    2 m
                  </text>
                  {/* free electrons: every dot shifts by the same distance */}
                  {DOTS.map((d, i) => {
                    const [x, y] = onLoop(d + shiftPx);
                    if (x === L && Math.abs(y - (T + B) / 2) < 10) return null; // inside the battery
                    if (y === T && x > SW_X - 24 && x < SW_X + 2) return null; // inside the switch gap
                    return <circle key={i} cx={x} cy={y} r={1.8} className={s.dot} />;
                  })}
                  {/* the tinted electron */}
                  <circle cx={ex} cy={ey} r={4} className={s.electron} />
                  {/* bulb */}
                  {lit && <circle cx={BULB_X} cy={T} r={16} className={s.glow} />}
                  <circle cx={BULB_X} cy={T} r={9} className={lit ? s.bulbOn : s.bulb} />
                  <path d={`M${BULB_X - 5},${T + 3} l2.5,-6 l2.5,6 l2.5,-6 l2.5,6`} className={s.filament} />
                  <text x={BULB_X} y={T - 14} textAnchor="middle" className={s.lab}>
                    bulb
                  </text>
                  {status && (
                    <text x={(SW_X + BULB_X) / 2} y={B - 10} textAnchor="middle" className={s.labD}>
                      {status}
                    </text>
                  )}

                  {/* ruler: the wire's first 30 cm after the switch, magnified (zoom lines from the wire) */}
                  <line x1={RL} y1={RY} x2={RR} y2={RY} className={s.seg} />
                  {[0, 10, 20, 30].map((cm) => (
                    <g key={cm}>
                      <line x1={RL + cm * RX_CM} y1={RY + 4} x2={RL + cm * RX_CM} y2={RY + 12} className={s.tick} />
                      <text x={RL + cm * RX_CM} y={RY + 24} textAnchor="middle" className={s.lab}>
                        {cm === 30 ? "30 cm" : cm}
                      </text>
                    </g>
                  ))}
                  {Array.from({ length: 31 }, (_, cm) => (
                    <line key={cm} x1={RL + cm * RX_CM} y1={RY + 4} x2={RL + cm * RX_CM} y2={RY + 7} className={s.tick} />
                  ))}
                  <circle cx={markerX} cy={RY} r={4} className={s.electron} />
                  {live && wait > 0 && (
                    <text
                      x={Math.min(markerX, RR - 30)}
                      y={RY - 9}
                      textAnchor={markerX > 60 ? "middle" : "start"}
                      className={s.labD}
                    >
                      +{fmtDist(dist)}
                    </text>
                  )}
                </svg>

                <p className={s.caption}>1 A in 1 mm² copper wire. Tinted dot: one electron.</p>
                <p className={s.seen}>Seen: {seenText}</p>

                <Row>
                  <Control className={on ? "active" : ""} disabled={locked || on} onClick={switchOn}>
                    {on ? "Switched on" : "Switch on"}
                  </Control>
                  {WAITS.map((w) => (
                    <Control
                      key={w.t}
                      className={on && wait === w.t ? "active" : ""}
                      disabled={locked || !on || wait === w.t}
                      onClick={() => doWait(w.t)}
                    >
                      {w.label}
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
