"use client";

// Not a map: a cross-section of the Earth's surface with an observer and the line of sight that
// just grazes the curve (the tangent). Distances along the ground are drawn true to a km scale;
// the curve and the height are both stretched by the same factor so the tangent geometry stays
// exact. Horizon distance d = sqrt(2 R h), no refraction.
// v3 (W-250): "tower" was not a registered milestone, so with minInteractions 3 the reveal could never open.
// Milestone names and minInteractions are now both derived from STOPS.
// v4 (wave H r8): the radius stub and its label are drawn at every height (the reveal names the radius); labels
// are 10px; chips are one row; the Horizon readout tile is gone (the picture labels the distance on the sight
// line); the reveal is <= 90 words so the stage top fits with it on a phone.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row, Slider } from "@/kit/controls";
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
  { label: "You: 1.7 m", m: 1.7, key: "eyes" },
  { label: "100×: 170 m", m: 170, key: "hundred" },
  { label: "Tower: 828 m", m: 828, key: "tower" },
];
// Every stop is a milestone (the reveal quotes all three), so names and minInteractions both come from STOPS.
const MILESTONES = STOPS.map((st) => st.key);
const START_M = 30;
const LOG_MAX = 3; // slider covers 1 m to 1,000 m

const horizonKm = (m: number) => Math.sqrt(2 * EARTH_RADIUS_KM * (m / 1000));
const fmtKm = (km: number) => (km < 10 ? km.toFixed(1) : Math.round(km).toString());
const fmtM = (m: number) => (m < 10 ? `${m.toFixed(1)} m` : `${Math.round(m)} m`);
const toSlider = (m: number) => Math.round((Math.log10(m) / LOG_MAX) * 100);
const fromSlider = (v: number) => Math.pow(10, (v / 100) * LOG_MAX);
// What the stage showed for a stop, at the stage's rounding (the same text the readout printed).
const stopText = (m: number) => `${fmtM(m)} → ${fmtKm(horizonKm(m))} km`;

export default function HorizonRuler({ slug }: { slug: string }) {
  const [m, setM] = useState(START_M);
  // Stops recorded when their milestone fires; kept on the stage's Seen line and quoted by the reveal.
  const [seen, setSeen] = useState<string[]>([]);
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
  // Unit vector from the tangent point toward the Earth's centre.
  const rx = (X0 - tx) / RD;
  const ry = (cy - ty) / RD;
  // Radius stub toward the centre: at least 14 px, at most 34, kept above the bottom edge where it can be.
  const stub = Math.max(14, Math.min(34, (H - 8 - ty) / ry));
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
      exploreHint="Try your own eye height, then 100 times higher, then the tower."
      minInteractions={STOPS.length}
      reveal={() => (
        <>
          <p>
            <strong>{fmtKm(horizonKm(1.7))} km.</strong> Your Seen line: {stopText(1.7)}. Your sight line grazes the curved
            sea at the horizon and meets the radius there at a right angle (the tick), so by Pythagoras the distance is the
            square root of 2 × Earth&rsquo;s radius × your height.
          </p>
          <p>
            Square root means slow growth: you saw {stopText(170)}, 100 times higher but only{" "}
            {Math.round(horizonKm(170) / horizonKm(1.7))} times farther, and {stopText(828)} from the tower. Air bends
            light, so real horizons are a little farther.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setM(v);
              const stop = STOPS.find((st) => Math.abs(st.m - v) < 1e-9);
              const key = stop?.key;
              if (key) {
                setSeen((a) => (a.includes(key) ? a : [...a, key]));
                reach(key);
              }
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`Cross-section: eyes ${fmtM(m)} above the sea; the sight line grazes the curve${locked ? "" : ` ${fmtKm(d)} km away`}.`}>
                  <polygon points={`0,${H} 0,${Y0 + 1} ${ground} ${W},${H}`} className={s.sea} />
                  <line x1={ex} y1={ey} x2={tx + ux * 60} y2={ty + uy * 60} className={s.sightFar} />
                  <line x1={ex} y1={ey} x2={tx} y2={ty} className={s.sight} />
                  <line x1={X0} y1={Y0} x2={ex} y2={ey} className={s.tower} />
                  <circle cx={ex} cy={ey} r={3} className={s.eye} />
                  {/* A stub of the radius to the centre (far below) and the right angle it makes with the sight line. */}
                  <line x1={tx} y1={ty} x2={tx + rx * stub} y2={ty + ry * stub} className={s.radius} />
                  <polyline
                    points={`${tx + ux * 7},${ty + uy * 7} ${tx + ux * 7 + rx * 7},${ty + uy * 7 + ry * 7} ${tx + rx * 7},${ty + ry * 7}`}
                    className={s.rightAngle}
                  />
                  <text x={tx + rx * stub - 4} y={ty + ry * stub + 4} className={s.smallOnSea} textAnchor="end">
                    radius
                  </text>
                  <circle cx={tx} cy={ty} r={3} className={s.tangent} />
                  {!locked && (
                    <text x={(ex + tx) / 2 + uy * 12} y={(ey + ty) / 2 - ux * 12} className={s.dist} textAnchor="middle">
                      {fmtKm(d)} km
                    </text>
                  )}
                  <text x={tx + 6} y={ty - 7} className={s.small} textAnchor="start">
                    horizon
                  </text>
                  <line x1={W - 12 - 50 * K} y1={18} x2={W - 12} y2={18} className={s.bar} />
                  <text x={W - 12 - 25 * K} y={13} className={s.small} textAnchor="middle">
                    50 km
                  </text>
                  {/* Caption in two short lines at the bottom left, clear of the tangent point at every height. */}
                  <text x={6} y={H - 18} className={s.smallOnSea}>
                    Distances true. Curve and height
                  </text>
                  <text x={6} y={H - 6} className={s.smallOnSea}>
                    stretched {Math.round(EXAG)}×. No refraction.
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
                <p className="tiny" data-testid="seen">
                  Seen:{" "}
                  {seen.length
                    ? STOPS.filter((st) => seen.includes(st.key)).map((st) => stopText(st.m)).join(" · ")
                    : "nothing yet"}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
