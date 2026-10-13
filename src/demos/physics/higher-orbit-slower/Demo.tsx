"use client";

// Orbit speed vs radius. Circular orbits about a point-mass Earth: v = sqrt(GM / r),
// T = 2 pi r / v, GM = 3.986e14 m^3/s^2, r from Earth's centre. Top view drawn to scale
// (geostationary radius 88 px, so the ISS orbit hugs the Earth). The satellite laps at
// 2000x real time and carries a velocity arrow whose length is proportional to v.
//
// The radius slider steps through fixed stops (200 km up, ISS, 20,000 km, geostationary).
// It starts at the ISS; QA's two presses reach geostationary, the question's state and the
// milestone "geo".

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const GM = 3.986e14; // m^3/s^2
const R_EARTH = 6371; // km
const STOPS = [
  { r: 6571, name: "200 km up" },
  { r: 6771, name: "ISS" },
  { r: 20000, name: "20,000 km" },
  { r: 42164, name: "geostationary" },
];
const ISS = 1;
const GEO = 3;
const SPEEDUP = 2000;

const orbit = (rKm: number) => {
  const v = Math.sqrt(GM / (rKm * 1e3)); // m/s
  const T = (2 * Math.PI * rKm * 1e3) / v; // s
  return { v, T };
};
const kms = (v: number) => `${(v / 1000).toFixed(2)} km/s`;
const lap = (T: number) => (T < 3 * 3600 ? `${Math.round(T / 60)} min` : `${(T / 3600).toFixed(1)} h`);
const km = (r: number) => `${r.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km`;

const W = 320;
const H = 200;
const CX = 150;
const CY = 100;
const K = 88 / 42164; // px per km
const ARROW = 6; // px per km/s

export default function HigherOrbitSlower({ slug }: { slug: string }) {
  const [idx, setIdx] = useState(ISS);
  const st = STOPS[idx];
  const { v, T } = orbit(st.r);
  const iss = orbit(STOPS[ISS].r);
  const geo = orbit(STOPS[GEO].r);
  const rp = st.r * K;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A satellite is moved from the ISS's circular orbit (6,771 km from Earth's centre) to geostationary orbit (42,164 km). Its speed becomes…",
        options: ["Faster", "The same", "Slower"],
        answer: 2,
      }}
      exploreHint="Move the satellite outward and watch its speed and lap time."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            At the ISS the satellite moved at <strong>{kms(iss.v)}</strong>, one lap in {lap(iss.T)}. Out at geostationary radius
            it moved at <strong>{kms(geo.v)}</strong>, one lap in {lap(geo.T)}.
          </p>
          <p>
            Gravity weakens with distance: out there it is about {Math.round(1000 * (STOPS[ISS].r / STOPS[GEO].r) ** 2) / 10}% as
            strong. A weaker pull bends the path less, so a circular orbit there needs less speed. Getting there still costs
            energy: the satellite gains more height energy than the speed energy it loses.
          </p>
          <p className="muted">Circular orbits, point-mass Earth, no air.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["geo"]}>
          {(reach) => (
            <div className={s.wrap}>
              <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Satellite at ${st.name}`}>
                <text x={4} y={H - 6} className={s.chip}>
                  To scale, top view. Time sped up {SPEEDUP.toLocaleString("en-US")}×.
                </text>
                <circle cx={CX} cy={CY} r={STOPS[GEO].r * K} className={s.ref} />
                <circle cx={CX} cy={CY} r={rp} className={s.orbit} />
                <circle cx={CX} cy={CY} r={R_EARTH * K} className={s.earth} />
                <g key={idx} className={locked ? undefined : s.spin} style={{ animationDuration: `${T / SPEEDUP}s`, transformOrigin: `${CX}px ${CY}px` }}>
                  <line x1={CX + rp} y1={CY} x2={CX + rp} y2={CY - (v / 1000) * ARROW} className={s.vel} />
                  <path d={`M ${CX + rp - 3} ${CY - (v / 1000) * ARROW + 4} L ${CX + rp} ${CY - (v / 1000) * ARROW - 1} L ${CX + rp + 3} ${CY - (v / 1000) * ARROW + 4} Z`} className={s.head} />
                  <circle cx={CX + rp} cy={CY} r={3.5} className={s.sat} />
                </g>
                <text x={CX + STOPS[GEO].r * K + 6} y={CY + 3} className={s.chip}>
                  geostationary
                </text>
                <text x={CX} y={CY + 26} textAnchor="middle" className={s.chip}>
                  Earth
                </text>
                <text x={W - 4} y={H - 6} textAnchor="end" className={s.chip}>
                  arrow: speed
                </text>
              </svg>

              <p className={s.caption} aria-live="polite">
                {locked ? "Radius: distance from Earth's centre. Predict first." : `${st.name}: ${km(st.r)} from Earth's centre.`}
              </p>

              <Row>
                <Slider
                  label="Orbit radius"
                  value={idx}
                  min={0}
                  max={STOPS.length - 1}
                  step={1}
                  format={(i) => km(STOPS[i].r)}
                  disabled={locked}
                  onChange={(i) => {
                    setIdx(i);
                    if (i === GEO) reach("geo");
                  }}
                />
              </Row>
              <Row>
                <Readout label="Speed" value={locked ? "?" : kms(v)} />
                <Readout label="One lap" value={locked ? "?" : lap(T)} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
