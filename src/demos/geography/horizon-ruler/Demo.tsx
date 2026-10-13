"use client";

// Not a map: a cross-section of the Earth's surface with an observer and the line of sight that
// just grazes the curve (the tangent). Distances along the ground are drawn true to a km scale;
// the curve and the height are both stretched by the same factor so the tangent geometry stays
// exact. Horizon distance d = sqrt(2 R h), no refraction.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { EARTH_RADIUS_KM } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const H = 228;
const X0 = 30; // observer
const Y0 = 124; // ground under the observer
const RD = 300; // drawn radius of the curve, px
const K = 2.2; // px per km along the ground
const EXAG = (EARTH_RADIUS_KM * K) / RD; // curve and heights stretched by this
const STOPS = [
  { label: "Your eyes, 1.7 m", m: 1.7, key: "eyes" },
  { label: "100× higher, 170 m", m: 170, key: "hundred" },
  { label: "Burj Khalifa, 828 m", m: 828, key: "" },
];
const START_M = 30;
const LOG_MAX = 3; // slider covers 1 m to 1,000 m

const horizonKm = (m: number) => Math.sqrt(2 * EARTH_RADIUS_KM * (m / 1000));
const fmtKm = (km: number) => (km < 10 ? km.toFixed(1) : Math.round(km).toString());
const fmtM = (m: number) => (m < 10 ? `${m.toFixed(1)} m` : `${Math.round(m)} m`);
const toSlider = (m: number) => Math.round((Math.log10(m) / LOG_MAX) * 100);
const fromSlider = (v: number) => Math.pow(10, (v / 100) * LOG_MAX);

export default function HorizonRuler({ slug }: { slug: string }) {
  const [m, setM] = useState(START_M);
  const d = horizonKm(m);
  const hd = (K * K * EARTH_RADIUS_KM * (m / 1000)) / RD; // drawn height, px
  const cy = Y0 + RD;
  const cosA = RD / (RD + hd);
  const sinA = Math.sqrt(1 - cosA * cosA);
  const tx = X0 + RD * sinA;
  const ty = cy - RD * cosA;
  const ex = X0;
  const ey = Y0 - hd;
  // Extend the sight line beyond the tangent point.
  const ux = (tx - ex) / Math.hypot(tx - ex, ty - ey);
  const uy = (ty - ey) / Math.hypot(tx - ex, ty - ey);
  const ground = Array.from({ length: 41 }, (_, i) => {
    const a = (-0.05 + (i / 40) * 1.1) * 1.05;
    return `${(X0 + RD * Math.sin(a)).toFixed(1)},${(cy - RD * Math.cos(a)).toFixed(1)}`;
  }).join(" ");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Standing on a beach with your eyes 1.7 m above the sea, how far away is the horizon?",
        options: ["1.5 km", "4.7 km", "15 km"],
        answer: 1,
      }}
      exploreHint="Try your own eye height, then go 100 times higher."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About {fmtKm(horizonKm(1.7))} km.</strong> Your line of sight grazes the curved sea and then leaves it;
            the horizon is that grazing point, not the limit of your eyes. By Pythagoras on the tangent, the distance is
            the square root of 2 × Earth&rsquo;s radius × your height.
          </p>
          <p>
            Square root means slow growth: 170 m is 100 times higher but sees only {Math.round(horizonKm(170) / horizonKm(1.7))}{" "}
            times farther, {fmtKm(horizonKm(170))} km. From the top of an 828 m tower it is about{" "}
            {fmtKm(horizonKm(828))} km. Air bends light a little, so real horizons are a few per cent farther.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["eyes", "hundred"]}>
          {(reach) => {
            const set = (v: number) => {
              setM(v);
              const stop = STOPS.find((st) => Math.abs(st.m - v) < 1e-9);
              if (stop?.key) reach(stop.key);
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`Cross-section: eyes ${fmtM(m)} above the sea; the sight line grazes the curve${locked ? "" : ` ${fmtKm(d)} km away`}.`}>
                  <polygon points={`0,${H} 0,${Y0 + 1} ${ground} ${W},${H}`} className={s.sea} />
                  <line x1={ex} y1={ey} x2={tx + ux * 60} y2={ty + uy * 60} className={s.sightFar} />
                  <line x1={ex} y1={ey} x2={tx} y2={ty} className={s.sight} />
                  <line x1={X0} y1={Y0} x2={ex} y2={ey} className={s.tower} />
                  <circle cx={ex} cy={ey} r={3} className={s.eye} />
                  <circle cx={tx} cy={ty} r={3} className={s.tangent} />
                  {!locked && (
                    <text x={(ex + tx) / 2} y={(ey + ty) / 2 - 6} className={s.dist} textAnchor="middle">
                      {fmtKm(d)} km
                    </text>
                  )}
                  <text x={tx} y={ty + 14} className={s.small} textAnchor="middle">
                    horizon
                  </text>
                  <line x1={W - 12 - 50 * K} y1={18} x2={W - 12} y2={18} className={s.bar} />
                  <text x={W - 12 - 25 * K} y={13} className={s.small} textAnchor="middle">
                    50 km
                  </text>
                  <text x={6} y={H - 6} className={s.smallOnSea}>
                    Distances true. Curve and height stretched {Math.round(EXAG)}×. No refraction.
                  </text>
                </svg>
                <div className={s.chips} role="group" aria-label="Eye height">
                  {STOPS.map((st) => (
                    <Control key={st.label} disabled={locked || m === st.m} className={m === st.m ? "active" : ""} onClick={() => set(st.m)}>
                      {st.label}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Slider label="Eye height" value={toSlider(m)} min={0} max={100} disabled={locked} format={() => fmtM(m)} onChange={(v) => set(fromSlider(v))} />
                </Row>
                <Row>
                  <Readout label="Horizon" value={locked ? "?" : `${fmtKm(d)} km`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
