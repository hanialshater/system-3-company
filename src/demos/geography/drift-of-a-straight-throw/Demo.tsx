"use client";

// Toy, labelled on the stage: a flat frictionless platform spinning like the Earth's surface at one
// latitude (an "f-plane"). An unsteered puck launched due north at 100 m/s, seen from the ground,
// curves to the right on an inertial circle: f = 2 Ω sin(lat), x = (v/f)(1 - cos ft), y = (v/f) sin ft.
// This is the exact solution for the toy, not the small-deflection formula.
// v2: every run is drawn at ONE fixed scale (1,000 km tall), so a 10 km run is visibly a dot next to the
// 1,000 km curl; runs already sent stay drawn; the readout lists every run sent; an equator button.
// Key state: a 1,000 km run, a 10 km run (both at 45°N) and the equator.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const W = 320;
const H = 236;
const X0 = 70;
const Y0 = 214;
const SPAN = 186; // px for 1,000 km
const FULL_KM = 1000;
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
const scale = SPAN / FULL_KM; // px per km, the same for every run

export default function DriftOfAStraightThrow({ slug }: { slug: string }) {
  const [sent, setSent] = useState<number[]>([]);
  const [run, setRun] = useState<number | null>(null);
  const [lat, setLat] = useState(KEY_LAT);
  const [seen45, setSeen45] = useState<number[]>([]);
  const shown = run === null ? 1000 : run;
  const end = drift(shown, lat);
  const line = (km: number) =>
    Array.from({ length: 61 }, (_, i) => {
      const p = drift(km, lat, i / 60);
      return `${(X0 + p.east * scale).toFixed(1)},${(Y0 - p.north * scale).toFixed(1)}`;
    }).join(" ");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A puck slides due north at 100 m/s (360 km/h) over a frictionless platform that spins like the Earth at ${KEY_LAT}°N. Nothing steers it. 1,000 km takes about 3 hours. How far east of the straight-line aim does it end up?`,
        options: ["About 5 km", "About 50 km", "About 500 km"],
        answer: 2,
      }}
      exploreHint="Send it 1,000 km, then 10 km, then try the equator. Compare the drifts."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            <strong>About {Math.round(drift(1000, KEY_LAT).east / 10) * 10} km</strong> on this model. Over
            10 km the same push gave only {fmtKm(drift(10, KEY_LAT).east)}
            {seen45.includes(100) ? `, and over 100 km ${fmtKm(drift(100, KEY_LAT).east)}` : ""}. While the puck slides, the ground under it turns. 1,000 km is 100 times farther than 10 km, yet it drifted {(Math.round(drift(1000, KEY_LAT).east / drift(10, KEY_LAT).east / 1000) * 1000).toLocaleString("en-US")} times as much: the drift grows with the square of the time, a bit under 100² because the long path starts to curl.
          </p>
          <p>
            That sideways drift from the turning ground is the <strong>Coriolis effect</strong>. At the equator you saw none, and it grows toward the poles. Over hundreds of kilometres it shapes winds and ocean currents. This model cannot show whether it steers a draining sink.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["far", "near", "equator"]}>
          {(reach) => {
            const go = (nextRun: number | null, nextLat: number) => {
              setRun(nextRun);
              setLat(nextLat);
              if (nextRun !== null && !sent.includes(nextRun)) setSent([...sent, nextRun]);
              if (nextLat === KEY_LAT && nextRun !== null) {
                const r = RUNS.find((x) => x.km === nextRun);
                if (r?.key) reach(r.key);
                if (!seen45.includes(nextRun)) setSeen45([...seen45, nextRun]);
              }
              if (nextLat === 0 && nextRun !== null) reach("equator");
            };
            const equator = () => go(run ?? 1000, 0);
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="stage-svg"
                  role="img"
                  aria-label={`Top view of the spinning platform at ${lat}°N, all runs drawn to the same scale.${run === null ? " Nothing sent yet." : ` Sent ${run} km north; it drifted ${fmtKm(end.east)} east.`}`}
                >
                  <rect x={1} y={1} width={W - 2} height={H - 2} rx={8} className={s.platform} />
                  <line x1={X0} y1={Y0} x2={X0} y2={Y0 - SPAN} className={s.aim} />
                  <text x={X0 - 4} y={Y0 - SPAN + 12} className={s.small} textAnchor="end">
                    aim
                  </text>
                  <text x={X0 - 4} y={Y0 + 4} className={s.small} textAnchor="end">
                    start
                  </text>
                  {!locked &&
                    sent
                      .filter((k) => k !== run)
                      .map((k) => <polyline key={k} points={line(k)} className={s.old} />)}
                  {run !== null && !locked && (
                    <>
                      <polyline points={line(run)} className={s.path} />
                      <circle cx={X0 + end.east * scale} cy={Y0 - end.north * scale} r={4} className={s.end} />
                      <text x={X0 + end.east * scale + 8} y={Y0 - end.north * scale + 4} className={s.label}>
                        {fmtKm(end.east)} east
                      </text>
                    </>
                  )}
                  <circle cx={X0} cy={Y0} r={4} className={s.start} />
                  <line x1={W - 14 - 200 * scale} y1={Y0} x2={W - 14} y2={Y0} className={s.bar} />
                  <text x={W - 14 - 100 * scale} y={Y0 - 5} className={s.small} textAnchor="middle">
                    200 km
                  </text>
                  <text x={W - 12} y={16} className={s.small} textAnchor="end">
                    N ↑
                  </text>
                  <text x={8} y={H - 6} className={s.small}>
                    Toy platform spinning like the Earth at {lat}°N. Same scale for every run.
                  </text>
                </svg>
                <div className={s.chips}>
                  {RUNS.map((r) => (
                    <Control key={r.km} disabled={locked || (run === r.km && lat === KEY_LAT)} className={run === r.km ? "active" : ""} onClick={() => go(r.km, KEY_LAT)}>
                      Send it {r.km.toLocaleString("en-US")} km
                    </Control>
                  ))}
                  <Control disabled={locked || lat === 0} className={lat === 0 ? "active" : ""} onClick={equator}>
                    Try the equator
                  </Control>
                </div>
                <Row>
                  <Slider label="Latitude" value={lat} min={0} max={90} step={15} disabled={locked} format={(v) => `${v}°N`} onChange={(v) => go(run, v)} />
                </Row>
                {!locked && <Row>
                  <Readout
                    label="Drift east of the aim"
                    value={locked || sent.length === 0 ? "?" : sent.map((k) => `${k.toLocaleString("en-US")} km: ${fmtKm(drift(k, lat).east)}`).join(" · ")}
                  />
                </Row>}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
