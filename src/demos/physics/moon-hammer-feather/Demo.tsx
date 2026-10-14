"use client";

// Hammer and feather on the Moon. Released together from 1.5 m with no air, they
// stay level all the way down and land together at 1.36 s, whatever the hammer's
// mass. Add air (imagined: Earth-like air on the Moon) and the feather lags.
//
// Physics: g = 1.62 m/s^2 (Moon). Each object obeys m y'' = -m g + drag, with
// quadratic drag F = k v^2 when air is on (k = 1/2 rho C_d A). Integrated with
// RK4 at 1/600 s. Drag is illustrative: the feather is given a terminal speed of
// 1 m/s in Earth air and Earth gravity (k/m = 9.81 per metre); the hammer has
// C_d A = 0.01 m^2 in air of density 1.2 kg/m^3.
// v2: air button says what it does ("Add air"), readouts say "lands at", objects are labelled, the reveal quotes any
// air drop the learner ran.
// The reveal unlocks when an airless drop has landed.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useEffect, useMemo, useRef, useState } from "react";
import s from "./styles.module.css";

const G_MOON = 1.62; // m/s^2
const H0 = 1.5; // m
const DT = 1 / 600;
const RHO = 1.2; // kg/m^3
const FEATHER_K_PER_M = 9.81; // 1/m: terminal speed 1 m/s in Earth air at 9.81 m/s^2
const HAMMER_CDA = 0.01; // m^2
const FRAME = 0.2; // s

const W = 260;
const H = 206;
const TOP = 34; // release height (the objects' lowest points), px
const PX = 100; // px per metre
const FLOOR = TOP + H0 * PX;
const XH = 88;
const XF = 176;

/** Height-vs-time samples (every DT) until the object reaches the floor. */
function fall(kPerM: number): number[] {
  const ys = [H0];
  let y = H0;
  let v = 0; // downward speed
  const acc = (vv: number) => G_MOON - kPerM * vv * vv;
  while (y > 0 && ys.length < 600 * 20) {
    const k1v = acc(v), k1y = v;
    const k2v = acc(v + (k1v * DT) / 2), k2y = v + (k1v * DT) / 2;
    const k3v = acc(v + (k2v * DT) / 2), k3y = v + (k2v * DT) / 2;
    const k4v = acc(v + k3v * DT), k4y = v + k3v * DT;
    v += (DT / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
    y -= (DT / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
    ys.push(y); // last sample may dip below 0; landTime interpolates it
  }
  return ys;
}

function landTime(ys: number[]) {
  // interpolate the last step to the floor
  const n = ys.length - 1;
  const a = ys[n - 1], b = ys[n];
  return (n - 1 + a / (a - b || 1)) * DT;
}

const at = (ys: number[], t: number) => Math.max(0, ys[Math.min(ys.length - 1, Math.round(t / DT))]);

export default function MoonHammerFeather({ slug }: { slug: string }) {
  const [air, setAir] = useState(false);
  const [mass, setMass] = useState(1.5);
  const [t, setT] = useState(0);
  const [dropping, setDropping] = useState(false);
  const [dropAir, setDropAir] = useState(false);
  const interactRef = useRef<() => void>(() => {});
  const earned = useRef(false);
  const [airSeen, setAirSeen] = useState<{ h: number; f: number } | null>(null); // last drop with air, once it has landed

  const hammer = useMemo(() => fall(dropAir ? (0.5 * RHO * HAMMER_CDA) / mass : 0), [dropAir, mass]);
  const feather = useMemo(() => fall(dropAir ? FEATHER_K_PER_M : 0), [dropAir]);
  const tH = landTime(hammer);
  const tF = landTime(feather);
  const tEnd = Math.max(tH, tF);

  useEffect(() => {
    if (!dropping) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const tt = Math.min(tEnd, (now - start) / 1000);
      setT(tt);
      if (tt >= tEnd) {
        setDropping(false);
        if (dropAir) setAirSeen({ h: tH, f: tF });
        if (!dropAir && !earned.current) {
          earned.current = true;
          interactRef.current();
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dropping, tEnd, dropAir, tH, tF]);

  const started = dropping || t > 0;
  const hY = started ? at(hammer, t) : H0;
  const fY = started ? at(feather, t) : H0;
  const frames: number[] = [];
  for (let k = 1; k * FRAME <= t + 1e-9; k++) frames.push(k * FRAME);
  const hLanded = started && t >= tH;
  const fLanded = started && t >= tF;
  const hs = 0.85 + 0.25 * Math.cbrt(mass / 1.5);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "On the Moon there is no air. A hammer and a feather are released together from 1.5 m. Which lands first?",
        options: ["The hammer", "The feather", "They land together"],
        answer: 2,
      }}
      exploreHint="Drop them with no air. Then add air and drop again. The slider changes the hammer's mass."
      reveal={() => (
        <>
          <p>
            With no air they stayed level all the way down and landed together, <strong>1.36 s</strong> after release.
            A heavier hammer is pulled harder, but it is just as much harder to speed up, so every mass falls the same
            way.
          </p>
          {airSeen && (
            <p>
              With air added, the feather lagged: it landed at <strong>{airSeen.f.toFixed(2)} s</strong>, the hammer at{" "}
              {airSeen.h.toFixed(2)} s.
            </p>
          )}
          <p>
            Air is what makes a feather lag: it pushes back hard on something light and wide. On the Moon in 1971,
            astronaut David Scott dropped a hammer and a feather, and they landed together.
          </p>
          <p className="muted">Gravity speeds everything up equally; air does not.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const drop = () => {
          if (locked || dropping) return;
          setDropAir(air);
          setT(0);
          setDropping(true);
        };
        const caption = locked
          ? "Moon: no air. Hammer and feather start level at 1.5 m. Predict first."
          : !started
            ? air
              ? "Imagine the Moon with Earth's air."
              : "Moon: no air. Release both together. \"Add air\" imagines Earth's air."
            : dropping
              ? "Watch the two heights."
              : Math.abs(tH - tF) < 0.01
                ? "They landed together."
                : "With air, the feather lags.";

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label="A hammer and a feather falling side by side">
              {dropAir && started && <rect x={0} y={0} width={W} height={FLOOR} className={s.air} />}
              <line x1={6} y1={TOP} x2={W - 10} y2={TOP} className={s.release} />
              <line x1={0} y1={FLOOR} x2={W} y2={FLOOR} className={s.floor} />
              <text x={6} y={TOP - 4} className={s.dim}>
                1.5 m
              </text>
              <text x={6} y={FLOOR - 4} className={s.dim}>
                0
              </text>

              {frames.map((ft) => {
                const a = TOP + (H0 - at(hammer, ft)) * PX;
                const b = TOP + (H0 - at(feather, ft)) * PX;
                return (
                  <g key={ft}>
                    <line x1={XH} y1={a} x2={XF} y2={b} className={s.level} />
                    <circle cx={XH} cy={a} r={2.5} className={s.mark} />
                    <circle cx={XF} cy={b} r={2.5} className={s.mark} />
                  </g>
                );
              })}

              {/* hammer */}
              <g transform={`translate(${XH} ${TOP + (H0 - hY) * PX - 18 * hs}) scale(${hs})`}>
                <rect x={-2.5} y={-4} width={5} height={22} rx={2} className={s.handle} />
                <rect x={-12} y={-10} width={24} height={9} rx={2} className={s.head} />
              </g>
              <text x={XH} y={FLOOR + 14} textAnchor="middle" className={s.dim}>
                hammer
              </text>
              <text x={XF} y={FLOOR + 14} textAnchor="middle" className={s.dim}>
                feather
              </text>
              {/* feather */}
              <g transform={`translate(${XF} ${TOP + (H0 - fY) * PX - 24})`}>
                <path d="M 0 22 C -9 12 -9 -2 0 -10 C 9 -2 9 12 0 22 Z" className={s.vane} />
                <line x1={0} y1={24} x2={0} y2={-8} className={s.quill} />
              </g>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              <Control disabled={locked || dropping} onClick={drop}>
                {started && !dropping ? "Drop again" : "Drop"}
              </Control>
              <Control
                className={air ? "active" : ""}
                disabled={locked || dropping}
                onClick={() => {
                  setAir((a) => !a);
                  setT(0);
                }}
              >
                {air ? "Take air away" : "Add air"}
              </Control>
              <Readout label="Hammer lands at" value={hLanded ? `${tH.toFixed(2)} s` : "not yet"} />
              <Readout label="Feather lands at" value={fLanded ? `${tF.toFixed(2)} s` : "not yet"} />
            </Row>
            <Slider
              label="Hammer mass"
              value={mass}
              min={0.5}
              max={5}
              step={0.5}
              disabled={locked || dropping}
              format={(v) => `${v.toFixed(1)} kg`}
              onChange={(v) => {
                setMass(v);
                setT(0);
              }}
            />
          </div>
        );
      }}
    </Lesson>
  );
}
