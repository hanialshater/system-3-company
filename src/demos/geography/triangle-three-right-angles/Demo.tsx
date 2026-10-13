"use client";

// A triangle drawn on the globe: North Pole, (0°, 0°) and a third corner on the equator that the
// learner slides east. Its sides are a meridian, the equator and another meridian, all great circles.
// Corner angles come from the 3-D tangent vectors at each corner; the area from d3-geo geoArea on
// a sphere of radius EARTH_RADIUS_KM. Both readouts use the same corners the globe draws.
// Key state: the third corner at 90°E, where all three angles are right angles.

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
const START = 60;
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
const projection = geoOrthographic().rotate([-55, -30]).translate([W / 2, 128]).scale(118).clipAngle(90);

export default function TriangleThreeRightAngles({ slug }: { slug: string }) {
  const [lon, setLon] = useState(START);
  const t = useMemo(() => triangle(lon), [lon]);
  const key = triangle(KEY);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "From the North Pole, walk south along the 0° line of longitude to the equator, turn and walk east along the equator to 90°E, then north back to the Pole. What do the triangle's three angles add up to?",
        options: ["180°", `${Math.round(key.sum)}°`, "360°"],
        answer: 1,
      }}
      exploreHint="Slide the third corner east along the equator to 90°E."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>{Math.round(key.sum)}°.</strong> With the corner at 90°E all three corners are right angles: the walk turns 90° three
            times and is home. 180° holds only on a flat sheet. On a ball the sides bulge outward, and the angles add up to more.
          </p>
          <p>
            The extra over 180° is the <strong>excess</strong>, and it measures the area: excess in radians × R² is exactly the area. At
            90°E that is π/2 × R² = {mkm(key.areaKm2)}, one-eighth ({((key.areaKm2 / SPHERE_KM2) * 100).toFixed(1)}%) of the Earth&rsquo;s {Math.round(SPHERE_KM2 / 1e6)} M km². Tiny triangles
            have almost no excess, which is why your school ruler never noticed.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["moved", "octant"]}>
          {(reach) => (
            <div className={s.wrap}>
              <WorldMap
                projection={projection}
                width={W}
                height={H}
                label={`Globe. Triangle from the North Pole to 0°,0° to ${lon}°E on the equator.${locked ? "" : ` Angles add to ${Math.round(t.sum)}°.`}`}
              >
                {({ path }) => {
                  const centre = geoCentroid(t.polygon) as P;
                  return (
                    <>
                      <path d={path(t.polygon)} className={s.tri} />
                      {t.corners.map((c, i) => {
                        const at = projection(c)!;
                        const inner = projection(geoInterpolate(c, centre)(lon < 40 ? 0.42 : 0.28) as P)!;
                        const name = i === 0 ? "North Pole" : i === 1 ? "0°, 0°" : `${lon}°E, 0°`;
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
                      <text x={6} y={H - 6} className={s.small}>
                        Excess: how far the angle sum is above 180°.
                      </text>
                    </>
                  );
                }}
              </WorldMap>
              <Row>
                <Slider
                  label="Third corner"
                  value={lon}
                  min={15}
                  max={135}
                  step={15}
                  disabled={locked}
                  format={(v) => `${v}°E`}
                  onChange={(v) => {
                    setLon(v);
                    if (v !== START) reach("moved");
                    if (v === KEY) reach("octant");
                  }}
                />
              </Row>
              <Row>
                <Readout label="Angle sum" value={locked ? "?" : `${Math.round(t.sum)}°`} />
                <Readout label="Area" value={`${mkm(t.areaKm2)} · ${((t.areaKm2 / SPHERE_KM2) * 100).toFixed(1)}% of Earth`} />
                <Readout label="Excess (rad) × R²" value={locked ? "?" : mkm(t.excessKm2)} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
