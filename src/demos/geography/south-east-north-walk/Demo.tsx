"use client";

// The puzzle: walk 1 km south, 1 km east, 1 km north and end where you started. The North Pole
// works; so does any start near the South Pole from which the east leg goes round a small circle a
// whole number of times. Plan view of the ice around the South Pole, seen from above (distances to
// scale; at this size the curvature of the Earth is negligible, but the walk is computed on the
// sphere R = 6,371.0088 km). Key state: two different working starts found (1 lap and 2 laps).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { EARTH_RADIUS_KM, geoDistance } from "@/kit/geo";
import s from "./styles.module.css";

const W = 300;
const H = 280;
const CX = W / 2;
const CY = H / 2 + 8;
const PX_PER_KM = 105;
const LEG_KM = 1;
const R = EARTH_RADIUS_KM;

/** Start distance from the South Pole (km, over the surface) at which the east leg makes k laps. */
const startForLaps = (k: number) => LEG_KM + R * Math.asin(LEG_KM / (2 * Math.PI * k * R));
const PRESETS = [1, 2, 3].map((k) => ({ k, d: startForLaps(k) }));

/** The walk from `d` km north of the South Pole: laps of the east leg, and the gap at the end (km). */
function walk(d: number) {
  const inner = d - LEG_KM; // distance from the pole after the south leg
  const circle = 2 * Math.PI * R * Math.sin(inner / R);
  const laps = LEG_KM / circle;
  const turn = laps * 360; // degrees of longitude swept by the east leg
  const lat = -90 + (d / R) * (180 / Math.PI);
  const gap = geoDistance([0, lat], [turn, lat]) * R;
  return { inner, circle, laps, turn, gap };
}

const fmtKm3 = (x: number) => `${x.toFixed(3)} km`;
const fmtGap = (km: number) => (km < 0.0005 ? "back at the start" : km < 1 ? `off by ${Math.round(km * 1000)} m` : `off by ${km.toFixed(2)} km`);

export default function SouthEastNorthWalk({ slug }: { slug: string }) {
  const [d, setD] = useState(1.5);
  const [found, setFound] = useState<number[]>([]);
  const w = walk(d);

  // Screen geometry: the start is straight "up" from the pole; east turns clockwise seen from above the South Pole.
  const at = (dist: number, deg: number): [number, number] => {
    const a = (deg * Math.PI) / 180;
    return [CX + dist * PX_PER_KM * Math.sin(a), CY - dist * PX_PER_KM * Math.cos(a)];
  };
  const start = at(d, 0);
  const turnDeg = w.turn % 360;
  const corner1 = at(w.inner, 0);
  const corner2 = at(w.inner, turnDeg);
  const end = at(d, turnDeg);
  const rIn = w.inner * PX_PER_KM;
  const fullLaps = Math.floor(w.laps + 1e-9);
  const arcEnd = corner2;
  const large = turnDeg > 180 ? 1 : 0;
  const closes = w.gap < 0.0005;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "From the North Pole, walking 1 km south, then 1 km east, then 1 km north brings you back to the start. How many other places on Earth do the same?",
        options: ["None: only the North Pole", "Exactly one more", "Infinitely many"],
        answer: 2,
      }}
      exploreHint="Try a start that fails, then the 1-lap and 2-lap starts near the South Pole."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>Infinitely many.</strong> Start {fmtKm3(PRESETS[0].d)} from the South Pole: the south leg leaves you on a circle 1 km
            round, the east leg goes once round it, and the north leg retraces your steps. From {fmtKm3(PRESETS[1].d)} the east leg laps
            twice{found.includes(3) ? `; from ${fmtKm3(PRESETS[2].d)}, three times` : ""}.
          </p>
          <p>
            Every whole number of laps works, and each gives a whole ring of starting points around the pole: infinitely many rings.
            All are on the Antarctic ice, if you could walk it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ring-1", "ring-2"]}>
          {(reach) => {
            const go = (nd: number) => {
              setD(nd);
              const res = walk(nd);
              if (res.gap < 0.0005) {
                const k = Math.round(res.laps);
                if (!found.includes(k)) setFound([...found, k]);
                if (k === 1) reach("ring-1");
                if (k === 2) reach("ring-2");
              }
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`Plan of the ice around the South Pole. Start ${fmtKm3(d)} from the pole; the east leg makes ${w.laps.toFixed(2)} laps; ${fmtGap(w.gap)}.`}>
                  <rect x={0} y={0} width={W} height={H} className={s.ice} />
                  <circle cx={CX} cy={CY} r={2.5} className={s.pole} />
                  <text x={CX + 4} y={CY + 12} className={s.lab}>
                    South Pole
                  </text>
                  {!locked && (
                    <>
                      <line x1={start[0]} y1={start[1]} x2={corner1[0]} y2={corner1[1]} className={s.leg} />
                      {fullLaps >= 1 && <circle cx={CX} cy={CY} r={rIn} className={s.east} strokeWidth={2 + fullLaps} />}
                      {turnDeg > 1e-6 && (
                        <path
                          d={`M ${corner1[0]} ${corner1[1]} A ${rIn} ${rIn} 0 ${large} 1 ${arcEnd[0]} ${arcEnd[1]}`}
                          className={s.east}
                        />
                      )}
                      <line x1={corner2[0]} y1={corner2[1]} x2={end[0]} y2={end[1]} className={s.leg} />
                      {!closes && <line x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} className={s.gap} />}
                      <circle cx={end[0]} cy={end[1]} r={4} className={s.endpin} />
                      <text x={CX - rIn - 4} y={CY + 4} textAnchor="end" className={s.lab}>
                        east leg on a {w.circle.toFixed(2)} km circle
                      </text>
                    </>
                  )}
                  <circle cx={start[0]} cy={start[1]} r={5} className={s.pin} />
                  <text x={start[0] + 7} y={start[1] + 3} className={s.lab}>
                    start
                  </text>
                  <text x={4} y={12} className={s.lab}>
                    Ice around the South Pole, seen from above. To scale.
                  </text>
                  <line x1={8} y1={H - 10} x2={8 + 0.5 * PX_PER_KM} y2={H - 10} className={s.leg} />
                  <text x={8} y={H - 14} className={s.lab}>
                    0.5 km
                  </text>
                </svg>
                <Row>
                  {PRESETS.map((p) => (
                    <Control key={p.k} disabled={locked} className={Math.abs(d - p.d) < 1e-9 ? "active" : ""} onClick={() => go(p.d)}>
                      Start {p.d.toFixed(3)} km out
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Slider label="Start from the South Pole" value={Math.round(d * 1000) / 1000} min={1.02} max={1.6} step={0.001} disabled={locked} format={(v) => `${v.toFixed(3)} km`} onChange={go} />
                </Row>
                <Row>
                  <Readout label="East leg" value={locked ? "?" : `${w.laps.toFixed(2)} laps`} />
                  <Readout label="Result" value={locked ? "?" : fmtGap(w.gap)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
