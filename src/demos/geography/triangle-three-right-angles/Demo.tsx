"use client";

// A triangle drawn on the globe: North Pole, (0°, 0°) and a third corner on the equator that the
// learner slides east. Its sides are a meridian, the equator and another meridian, all great circles.
// Corner angles come from the 3-D tangent vectors at each corner; the area from d3-geo geoArea on
// a sphere of radius EARTH_RADIUS_KM. Both readouts use the same corners the globe draws.
// Key state: the third corner at 90°E, where all three angles are right angles.
// v3: the slider starts at 30°E in steps of 30°, and the reveal waits for three sizes (30, 60, 90 on the
// QA path: two arrow presses). A record line keeps each size seen with its sum and share of Earth, so
// "the extra over 180° tracks the area" is seen across sizes. No radians: 1° over 180° = 1/720 of Earth.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM, geoArea, geoCentroid, geoInterpolate, geoOrthographic } from "@/kit/geo";
import s from "./styles.module.css";

type P = [number, number];
const W = 320;
const H = 252;
const RAD = Math.PI / 180;
const START = 30;
const KEY = 90;
const POLE: P = [0, 90];
const ORIGIN: P = [0, 0];
const SPHERE_KM2 = 4 * Math.PI * EARTH_RADIUS_KM * EARTH_RADIUS_KM;

const vec = ([lo, la]: P) => [Math.cos(la * RAD) * Math.cos(lo * RAD), Math.cos(la * RAD) * Math.sin(lo * RAD), Math.sin(la * RAD)];
const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
/** Angle at corner A between the great-circle sides toward B and toward C, in degrees. */
function cornerAngle(A: P, B: P, C: P) {
  const a = vec(A);
  const b = vec(B);
  const c = vec(C);
  const tb = b.map((x, i) => x - dot(a, b) * a[i]);
  const tc = c.map((x, i) => x - dot(a, c) * a[i]);
  return Math.acos(Math.max(-1, Math.min(1, dot(tb, tc) / Math.sqrt(dot(tb, tb) * dot(tc, tc))))) / RAD;
}

function triangle(lon: number) {
  const third: P = [lon, 0];
  const corners: P[] = [POLE, ORIGIN, third];
  const polygon = { type: "Polygon" as const, coordinates: [[POLE, third, ORIGIN, POLE]] };
  const angles = [cornerAngle(POLE, ORIGIN, third), cornerAngle(ORIGIN, third, POLE), cornerAngle(third, POLE, ORIGIN)];
  const sum = angles[0] + angles[1] + angles[2];
  const areaKm2 = geoArea(polygon) * EARTH_RADIUS_KM * EARTH_RADIUS_KM;
  const excessKm2 = (sum - 180) * RAD * EARTH_RADIUS_KM * EARTH_RADIUS_KM;
  return { corners, polygon, angles, sum, areaKm2, excessKm2 };
}

const mkm = (km2: number) => `${(km2 / 1e6).toFixed(1)} M km²`;
const pct = (km2: number) => `${((km2 / SPHERE_KM2) * 100).toFixed(1)}%`;
const projection = geoOrthographic().rotate([-55, -30]).translate([W / 2, 128]).scale(118).clipAngle(90);

export default function TriangleThreeRightAngles({ slug }: { slug: string }) {
  const [lon, setLon] = useState(START);
  const [seen, setSeen] = useState<number[]>([START]); // slider positions seen, in order
  const key = triangle(KEY);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "With a marker on a globe, you draw a triangle with corners at the North Pole, where the equator meets 0° longitude, and where it meets 90° east. What do its three angles add up to?",
        options: ["180°", "210°", `${Math.round(key.sum)}°`, "360°"],
        answer: 2,
      }}
      exploreHint="Slide the third corner east and watch the angle sum and the area."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            <strong>{Math.round(key.sum)}°.</strong> With the corner at 90°E all three corners are right angles: the walk turns 90° three
            times and is home. 180° holds only on a flat sheet. On a ball the sides bulge outward, and the angles add up to more.
          </p>
          <p>
            The extra over 180° is the <strong>excess</strong>, and it measures the area. Look at your record: {START}° over gave{" "}
            {pct(triangle(START).areaKm2)} of the Earth and 90° over gave {pct(key.areaKm2)}. Each degree over 180° is 1/720 of the
            Earth&rsquo;s surface, so at 90°E the triangle covers {mkm(key.areaKm2)}, one-eighth of the Earth&rsquo;s{" "}
            {Math.round(SPHERE_KM2 / 1e6)} M km². Tiny triangles have almost no excess, which is why your school ruler never noticed.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const shown = locked ? KEY : lon;
        const t = triangle(shown);
        return (
        <Milestones interact={interact} names={["moved", "octant", "three-sizes"]}>
          {(reach) => (
            <div className={s.wrap}>
              <WorldMap
                projection={projection}
                width={W}
                height={H}
                label={`Globe. Triangle from the North Pole to 0°,0° to ${shown}°E on the equator.${locked ? "" : ` Angles add to ${Math.round(t.sum)}°.`}`}
              >
                {({ path }) => {
                  const centre = geoCentroid(t.polygon) as P;
                  return (
                    <>
                      {!locked && <path d={path(t.polygon)} className={s.tri} />}
                      {t.corners.map((c, i) => {
                        const at = projection(c)!;
                        const inner = projection(geoInterpolate(c, centre)(shown < 40 ? 0.42 : 0.28) as P)!;
                        const name = i === 0 ? "North Pole" : i === 1 ? "0°, 0°" : `${shown}°E, 0°`;
                        return (
                          <g key={i}>
                            <circle cx={at[0]} cy={at[1]} r={3.5} className={s.corner} />
                            <text x={at[0] + (i === 2 ? 5 : i === 1 ? -5 : 6)} y={at[1] + (i === 0 ? -5 : 13)} className={s.name} textAnchor={i === 1 ? "end" : "start"}>
                              {name}
                            </text>
                            {!locked && (
                              <text x={inner[0]} y={inner[1] + 4} className={s.angle} textAnchor="middle">
                                {Math.round(t.angles[i])}°
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </>
                  );
                }}
              </WorldMap>
              <Row>
                <Slider
                  label="Third corner"
                  value={lon}
                  min={30}
                  max={150}
                  step={30}
                  disabled={locked}
                  format={(v) => `${v}°E`}
                  onChange={(v) => {
                    setLon(v);
                    const next = seen.includes(v) ? seen : [...seen, v];
                    setSeen(next);
                    if (v !== START) reach("moved");
                    if (v === KEY) reach("octant");
                    if (next.length >= 3 && next.includes(KEY)) reach("three-sizes");
                  }}
                />
              </Row>
              <p className={s.record} aria-live="polite">
                {locked
                  ? " "
                  : `Seen: ${[...seen]
                      .sort((x, y) => x - y)
                      .map((v) => `${v}°E ${Math.round(triangle(v).sum)}°, ${pct(triangle(v).areaKm2)} of Earth`)
                      .join(" · ")}`}
              </p>
              <Row>
                <Readout label="Angle sum" value={locked ? "?" : `${Math.round(t.sum)}°`} />
                <Readout label="Over 180°" value={locked ? "?" : `${Math.round(t.sum - 180)}°`} />
                <Readout label="Area" value={locked ? "?" : `${mkm(t.areaKm2)} · ${pct(t.areaKm2)} of Earth`} />
              </Row>
            </div>
          )}
        </Milestones>
        );
      }}
    </Lesson>
  );
}
