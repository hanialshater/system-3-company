"use client";

// An azimuthal equidistant map centred on a pin: distance from the pin is true in every direction.
// The learner sets a distance ring. On the map the ring keeps growing, but on the sphere its length
// is 2πR·sin(d/R), which peaks a quarter of the way round and falls to about 95 km at 20,000 km.
// The outer edge of the map is one point on the Earth: the antipode.
// Key state: the 20,000 km ring has been drawn and a pin has been moved.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM as R, geoAzimuthalEquidistant, geoCircle, geoDistance } from "@/kit/geo";
import s from "./styles.module.css";

type P = [number, number];
const W = 320;
const H = 196;
const PINS: { name: string; at: P }[] = [
  { name: "Madrid", at: [-3.7038, 40.4168] },
  { name: "Wellington", at: [174.7762, -41.2865] },
  { name: "Quito", at: [-78.4678, -0.1807] },
];
const HALF = Math.PI * R; // 20,015 km
const MW = geoDistance(PINS[0].at, PINS[1].at) * R; // Madrid to Wellington
const ringLength = (d: number) => 2 * Math.PI * R * Math.sin(d / R);
const km = (v: number) => Math.round(v).toLocaleString("en-US");
const DEG = 180 / Math.PI;

export default function FarthestPlaceFromYou({ slug }: { slug: string }) {
  const [pin, setPin] = useState(0);
  const [ring, setRing] = useState(8000);
  const at = PINS[pin].at;
  const projection = useMemo(
    () => geoAzimuthalEquidistant().rotate([-at[0], -at[1]]).fitSize([W, H], { type: "Sphere" }),
    [at],
  );
  const circle = (d: number) => geoCircle().center(at).radius((d / R) * DEG)();
  const next = PINS[(pin + 1) % PINS.length];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You plan the longest possible trip between two places on Earth, always taking the shortest way over the surface. What is the greatest distance you could have to travel?",
        options: ["About 10,000 km", "About 20,000 km", "About 40,000 km"],
        answer: 1,
      }}
      exploreHint="Draw a ring at 20,000 km, then move the pin."
      minInteractions={2}
      reveal={() => (
        <p>
          About 20,000 km. Half way round the Earth is {km(HALF)} km on a sphere, and no two places are farther apart. Only
          one place is that far from you: the point opposite you, your antipode. The edge of this map is that single point
          stretched into a circle, which is why the 20,000 km ring was only about {km(ringLength(20000))} km long. Madrid to
          Wellington is {km(MW)} km, nearly opposite.
        </p>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["far", "moved"]}>
          {(reach) => (
            <div className={s.wrap}>
              <WorldMap
                projection={projection}
                width={W}
                height={H}
                label={`Azimuthal equidistant map centred on ${PINS[pin].name}. Distance ring at ${km(ring)} km.`}
              >
                {({ projection: proj, path }) => {
                  const c = proj(at)!;
                  const cities = PINS.slice(0, 2).filter((_, i) => i !== pin);
                  return (
                    <>
                      {!locked &&
                        [5000, 10000, 15000].map((d) => <path key={d} d={path(circle(d))} className={s.ring} />)}
                      {!locked && <path d={path(circle(ring))} className={s.pick} />}
                      {cities.map((q) => {
                        const p = proj(q.at)!;
                        return (
                          <g key={q.name}>
                            <circle cx={p[0]} cy={p[1]} r={3} className={s.city} />
                            <text x={p[0]} y={p[1] - 5} textAnchor="middle" className={s.name}>
                              {q.name}
                            </text>
                          </g>
                        );
                      })}
                      <circle cx={c[0]} cy={c[1]} r={3.5} className={s.pin} />
                      <text x={c[0]} y={c[1] + 12} textAnchor="middle" className={s.name}>
                        {PINS[pin].name}
                      </text>
                    </>
                  );
                }}
              </WorldMap>
              <p className={s.note}>
                Sphere model; distances from the pin are true.{" "}
                {locked ? "Rings appear after you commit." : "Dashed rings: 5,000 km apart. Outer edge: one single point."}
              </p>
              <div className={s.chips}>
                <Control
                  disabled={locked || ring === 20000}
                  onClick={() => {
                    setRing(20000);
                    reach("far");
                  }}
                >
                  Ring at 20,000 km
                </Control>
                <Control
                  disabled={locked}
                  onClick={() => {
                    setPin((pin + 1) % PINS.length);
                    reach("moved");
                  }}
                >
                  Move pin to {next.name}
                </Control>
              </div>
              <Row>
                <Slider
                  label="Ring distance"
                  value={ring}
                  min={1000}
                  max={20000}
                  step={500}
                  disabled={locked}
                  format={(v) => `${km(v)} km`}
                  onChange={(v) => {
                    setRing(v);
                    if (v >= 20000) reach("far");
                  }}
                />
              </Row>
              <Row>
                <Readout label="Ring's real length" value={locked ? "?" : `${km(ringLength(ring))} km`} />
                <Readout label="Madrid to Wellington" value={locked ? "?" : `${km(MW)} km`} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
