"use client";

// Toy, labelled on the stage: a flat frictionless platform spinning like the Earth's surface at one
// latitude (an "f-plane"). An unsteered object launched due north at 100 m/s, seen from the ground,
// curves to the right on an inertial circle: f = 2 Ω sin(lat), x = (v/f)(1 - cos ft), y = (v/f) sin ft.
// This is the exact solution for the toy, not the small-deflection formula. Each run is drawn at its
// own scale (with a scale bar), so a short run looks straight and a long one visibly curls.
// Key state: a 1,000 km run and a 10 km run, both at 45°N.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const W = 320;
const H = 236;
const X0 = 70;
const Y0 = 214;
const SPAN = 186; // px for the run's length
const OMEGA = 7.2921e-5; // rad/s, Earth's spin
const V = 100; // m/s
const KEY_LAT = 45;
const RUNS = [
  { km: 1000, key: "far" },
  { km: 100, key: "" },
  { km: 10, key: "near" },
];

/** Position after travelling `km` (km), in km east and north of the start. */
function drift(km: number, lat: number, frac = 1) {
  const f = 2 * OMEGA * Math.sin((lat * Math.PI) / 180);
  const t = ((km * 1000) / V) * frac;
  if (f === 0) return { east: 0, north: (V * t) / 1000 };
  return { east: ((V / f) * (1 - Math.cos(f * t))) / 1000, north: ((V / f) * Math.sin(f * t)) / 1000 };
}
const fmtKm = (km: number) => (km >= 100 ? `${Math.round(km)} km` : km >= 1 ? `${km.toFixed(1)} km` : km >= 0.001 ? `${Math.round(km * 1000)} m` : "0 m");
const niceBar = (km: number) => [1, 2, 5, 10, 20, 50, 100, 200, 500].reduce((b, c) => (c <= km / 2 ? c : b), 1);

export default function DriftOfAStraightThrow({ slug }: { slug: string }) {
  const [run, setRun] = useState<number | null>(null);
  const [lat, setLat] = useState(KEY_LAT);
  const [seen45, setSeen45] = useState<number[]>([]);
  const km = run ?? 1000;
  const scale = SPAN / km; // px per km
  const end = drift(km, lat);
  const pts = Array.from({ length: 61 }, (_, i) => {
    const p = drift(km, lat, i / 60);
    return `${(X0 + p.east * scale).toFixed(1)},${(Y0 - p.north * scale).toFixed(1)}`;
  }).join(" ");
  const bar = niceBar(km);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a frictionless spinning platform like the Earth at ${KEY_LAT}°N, an unsteered object slides due north at 100 m/s (360 km/h) for 1,000 km. How far east of its straight-line aim does it end up?`,
        options: ["About 5 km", "About 50 km", "About 500 km"],
        answer: 2,
      }}
      exploreHint="Send it 1,000 km, then 10 km, and compare the drift."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About {Math.round(drift(1000, KEY_LAT).east / 10) * 10} km</strong> on this toy. Over
            10 km the same push gave only {fmtKm(drift(10, KEY_LAT).east)}
            {seen45.includes(100) ? `, and over 100 km ${fmtKm(drift(100, KEY_LAT).east)}` : ""}. While the object slides, the ground under it turns, and the drift grows with the square of the time: 1,000 km is 100 times farther than 10 km and drifted {(Math.round(drift(1000, KEY_LAT).east / drift(10, KEY_LAT).east / 1000) * 1000).toLocaleString("en-US")} times as much (a bit under 100², because the long path starts to curl).
          </p>
          <p>
            That is the <strong>Coriolis effect</strong>. It is zero at the equator and strongest at the poles, and it shapes winds and ocean currents over hundreds of kilometres. This toy cannot show whether it steers a draining sink.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["far", "near"]}>
          {(reach) => {
            const go = (nextRun: number | null, nextLat: number) => {
              setRun(nextRun);
              setLat(nextLat);
              if (nextLat === KEY_LAT && nextRun !== null) {
                const r = RUNS.find((x) => x.km === nextRun);
                if (r?.key) reach(r.key);
                if (!seen45.includes(nextRun)) setSeen45([...seen45, nextRun]);
              }
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="stage-svg"
                  role="img"
                  aria-label={`Top view of the spinning platform at ${lat}°N.${run === null ? " Nothing sent yet." : ` Sent ${run} km north; it drifted ${fmtKm(end.east)} east.`}`}
                >
                  <rect x={1} y={1} width={W - 2} height={H - 2} rx={8} className={s.platform} />
                  <line x1={X0} y1={Y0} x2={X0} y2={Y0 - SPAN} className={s.aim} />
                  <text x={X0 - 4} y={Y0 - SPAN + 12} className={s.small} textAnchor="end">
                    aim
                  </text>
                  <text x={X0 - 4} y={Y0 + 4} className={s.small} textAnchor="end">
                    start
                  </text>
                  {run !== null && !locked && (
                    <>
                      <polyline points={pts} className={s.path} />
                      <circle cx={X0 + end.east * scale} cy={Y0 - end.north * scale} r={4} className={s.end} />
                      <line x1={X0} y1={Y0 - end.north * scale} x2={X0 + end.east * scale} y2={Y0 - end.north * scale} className={s.gap} />
                      <text x={X0 + end.east * scale + 8} y={Y0 - end.north * scale + 4} className={s.label}>
                        {fmtKm(end.east)}
                      </text>
                    </>
                  )}
                  <circle cx={X0} cy={Y0} r={4} className={s.start} />
                  <line x1={W - 14 - bar * scale} y1={Y0} x2={W - 14} y2={Y0} className={s.bar} />
                  <text x={W - 14 - (bar * scale) / 2} y={Y0 - 5} className={s.small} textAnchor="middle">
                    {bar} km
                  </text>
                  <text x={W - 12} y={16} className={s.small} textAnchor="end">
                    N ↑
                  </text>
                  <text x={8} y={H - 6} className={s.small}>
                    Toy: frictionless platform spinning like the Earth at {lat}°N. 100 m/s.
                  </text>
                </svg>
                <div className={s.chips}>
                  {RUNS.map((r) => (
                    <Control key={r.km} disabled={locked || run === r.km} className={run === r.km ? "active" : ""} onClick={() => go(r.km, lat)}>
                      Send it {r.km.toLocaleString("en-US")} km
                    </Control>
                  ))}
                </div>
                <Row>
                  <Slider label="Latitude" value={lat} min={0} max={90} step={15} disabled={locked} format={(v) => `${v}°N`} onChange={(v) => go(run, v)} />
                </Row>
                <Row>
                  <Readout label="Drift east of the aim" value={locked || run === null ? "?" : fmtKm(end.east)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
