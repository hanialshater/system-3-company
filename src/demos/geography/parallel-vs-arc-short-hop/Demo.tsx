"use client";

// A Mercator map with two points on one parallel. The red line follows the parallel (a constant
// due-east heading); the blue line is the great circle between the same two points. The learner sets
// the distance along the parallel and the latitude; the readout is the saving, computed with d3-geo on a
// sphere of radius 6,371.0088 km, the same function that places the endpoints and draws both lines.
// Key states: 1,000 km at 40°N (the question), 5,000 km at 40°N, and 5,000 km at 60°N.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM as R, geoDistance, geoInterpolate, geoMercator } from "@/kit/geo";
import s from "./styles.module.css";

type P = [number, number];
const W = 320;
const H = 176;
const CENTRE_LON = 10;
const LATS = [40, 60, 20];
const rad = Math.PI / 180;

/** Endpoints, parallel length and great-circle length for a distance d (km) along latitude lat. */
function hop(lat: number, d: number) {
  const dl = d / (R * Math.cos(lat * rad)) / rad; // degrees of longitude spanned
  const a: P = [CENTRE_LON - dl / 2, lat];
  const b: P = [CENTRE_LON + dl / 2, lat];
  const gc = geoDistance(a, b) * R;
  return { a, b, dl, gc, saving: d - gc };
}
const fmtSave = (v: number) => (v < 10 ? v.toFixed(1) : Math.round(v).toLocaleString("en-US"));
const km = (v: number) => Math.round(v).toLocaleString("en-US");

export default function ParallelVsArcShortHop({ slug }: { slug: string }) {
  const [lat, setLat] = useState(40);
  const [dist, setDist] = useState(3000);
  const projection = useMemo(
    () => geoMercator().scale(W / (2 * Math.PI)).translate([W / 2, 142]).clipExtent([[0, 0], [W, H]]),
    [],
  );
  const h = hop(lat, dist);
  const nextLat = LATS[(LATS.indexOf(lat) + 1) % LATS.length];

  const s1000 = hop(40, 1000).saving;
  const s5000 = hop(40, 5000).saving;
  const s5000n = hop(60, 5000).saving;

  const line = (pts: P[]) => ({ type: "LineString" as const, coordinates: pts });
  const parallel: P[] = [];
  for (let i = 0; i <= 60; i++) parallel.push([h.a[0] + ((h.b[0] - h.a[0]) * i) / 60, lat]);
  const interp = geoInterpolate(h.a, h.b);
  const circle: P[] = [];
  for (let i = 0; i <= 60; i++) circle.push(interp(i / 60) as P);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two places 1,000 km apart, east-west along the 40°N parallel. How much shorter is the great-circle route than following the parallel?",
        options: ["About 0.7 km", "About 7 km", "About 70 km"],
        answer: 0,
      }}
      exploreHint="Try 1,000 km, then 5,000 km, then change the latitude."
      minInteractions={3}
      reveal={() => (
        <p>
          About {s1000.toFixed(1)} km: at 1,000 km the two lines are almost the same. At 5,000 km along 40°N the saving is{" "}
          {km(s5000)} km: five times the distance, over {Math.floor(s5000 / s1000 / 10) * 10} times the saving. At 60°N the same
          5,000 km saves {km(s5000n)} km. The parallel curves away from the shortest path more the longer it is and the
          nearer the pole, so short hops gain almost nothing. Sphere model, not a flight time.
        </p>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["short", "long", "high"]}>
          {(reach) => {
            const check = (la: number, d: number) => {
              if (la === 40 && d === 1000) reach("short");
              if (la === 40 && d >= 5000) reach("long");
              if (la === 60 && d >= 5000) reach("high");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Mercator map. Two points ${km(dist)} km apart along ${lat} degrees north. The great circle is ${fmtSave(h.saving)} km shorter than the parallel.`}
                >
                  {({ path, projection: proj }) => {
                    const a = proj(h.a)!;
                    const b = proj(h.b)!;
                    return (
                      <>
                        <path d={path(line(parallel))} className={s.par} />
                        <path d={path(line(circle))} className={s.gc} />
                        <circle cx={a[0]} cy={a[1]} r={3} className={s.end} />
                        <circle cx={b[0]} cy={b[1]} r={3} className={s.end} />
                        <text x={4} y={proj([0, lat])![1] - 4} className={s.name}>
                          {lat}°N
                        </text>
                      </>
                    );
                  }}
                </WorldMap>
                <p className={s.note}>Mercator map. Red: due east along the parallel. Blue: shortest route.</p>
                <div className={s.chips}>
                  <Control
                    disabled={locked || dist === 1000}
                    onClick={() => {
                      setDist(1000);
                      check(lat, 1000);
                    }}
                  >
                    1,000 km
                  </Control>
                  <Control
                    disabled={locked || dist === 5000}
                    onClick={() => {
                      setDist(5000);
                      check(lat, 5000);
                    }}
                  >
                    5,000 km
                  </Control>
                  <Control
                    disabled={locked}
                    onClick={() => {
                      setLat(nextLat);
                      check(nextLat, dist);
                    }}
                  >
                    Latitude {lat}°N: try {nextLat}°N
                  </Control>
                </div>
                <Row>
                  <Slider
                    label="Distance along the parallel"
                    value={dist}
                    min={500}
                    max={8000}
                    step={250}
                    disabled={locked}
                    format={(v) => `${km(v)} km`}
                    onChange={(v) => {
                      setDist(v);
                      check(lat, v);
                    }}
                  />
                </Row>
                <Row>
                  <Readout label="Great circle saves" value={locked ? "?" : `${fmtSave(h.saving)} km`} />
                  <Readout label="As a share" value={locked ? "?" : `${((h.saving / dist) * 100).toFixed(2)}%`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
