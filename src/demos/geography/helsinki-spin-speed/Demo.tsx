"use client";

// How fast does Earth's spin carry you? Globe seen from above the North Pole (orthographic; rim =
// equator). The circle of the chosen latitude is drawn with an arrow whose length is the speed.
// Model: a sphere of radius 6,371.0088 km turning once per sidereal day (86,164.09 s), speed
// relative to Earth's axis: v = 2πR cos φ / T. Key state: the equator and Helsinki both visited.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { EARTH_RADIUS_KM, WorldMap, geoCircle, geoOrthographic } from "@/kit/geo";
import s from "./styles.module.css";

const W = 300;
const H = 300;
const RAD = Math.PI / 180;
const SIDEREAL_DAY_S = 86164.09;
const HELSINKI = 60.17;
const PLACES: { name: string; lat: number }[] = [
  { name: "Equator", lat: 0 },
  { name: "London", lat: 51.51 },
  { name: "Helsinki", lat: HELSINKI },
  { name: "North Pole", lat: 90 },
];
const circleKm = (lat: number) => 2 * Math.PI * EARTH_RADIUS_KM * Math.cos(lat * RAD);
const speed = (lat: number) => Math.max(0, (circleKm(lat) / SIDEREAL_DAY_S) * 3600);
const r10 = (x: number) => (Math.round(x / 10) * 10).toLocaleString("en-US");
const latName = (lat: number) => (lat === 0 ? "the equator" : `${lat.toFixed(lat % 1 ? 1 : 0)}°N`);

const projection = geoOrthographic().rotate([0, -90]).clipAngle(90).fitExtent([[24, 24], [W - 24, H - 24]], { type: "Sphere" });

export default function HelsinkiSpinSpeed({ slug }: { slug: string }) {
  const [lat, setLat] = useState(30);
  const [seen, setSeen] = useState<number[]>([]);
  const v = speed(lat);
  const sawEquator = seen.includes(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Earth's spin carries someone on the equator at about ${r10(speed(0))} km/h. How fast does it carry someone in Helsinki (60°N)?`,
        options: [`About ${r10(speed(0))} km/h`, `About ${r10(speed(HELSINKI))} km/h`, "0 km/h"],
        answer: 1,
      }}
      exploreHint="Visit the equator and Helsinki, and compare the circles."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About {r10(speed(HELSINKI))} km/h</strong>, about half the equator&rsquo;s {r10(speed(0))}. Everyone goes round once in the same
            time, 23 h 56 min, but your circle at Helsinki is only {r10(circleKm(HELSINKI))} km round
            {sawEquator ? `, against ${r10(circleKm(0))} km at the equator` : ""}.
          </p>
          <p>
            A circle of latitude shrinks with the cosine of the latitude, and cos 60° is one half. So speed falls the same
            way{seen.includes(90) ? ", down to the North Pole, where you just turn on the spot" : ""}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["equator", "helsinki"]}>
          {(reach) => {
            const go = (l: number) => {
              setLat(l);
              if (!seen.includes(l)) setSeen([...seen, l]);
              if (l === 0) reach("equator");
              if (l === HELSINKI) reach("helsinki");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Globe seen from above the North Pole. Circle of latitude at ${latName(lat)}${locked ? "" : `, carried at ${r10(v)} km/h`}.`}
                >
                  {({ path, projection: proj }) => {
                    const pole = proj([0, 90])!;
                    // Arrow: tangent at longitude 0 on the circle, pointing east; length ∝ speed.
                    const at = proj([0, lat]) ?? pole;
                    const len = (v / speed(0)) * 90;
                    const x2 = at[0] + len;
                    return (
                      <>
                        {lat < 90 && <path d={path(geoCircle().center([0, 90]).radius(90 - lat)())} className={s.circle} />}
                        <circle cx={pole[0]} cy={pole[1]} r={2.5} className={s.pole} />
                        {!locked && len > 1 && (
                          <>
                            <line x1={at[0]} y1={at[1]} x2={x2 - 4} y2={at[1]} className={s.arrow} />
                            <polygon points={`${x2},${at[1]} ${x2 - 7},${at[1] - 4} ${x2 - 7},${at[1] + 4}`} className={s.head} />
                          </>
                        )}
                        <text x={4} y={12} className={s.lab}>
                          Seen from above the North Pole. Rim: the equator.
                        </text>
                        <text x={4} y={H - 4} className={s.lab}>
                          One turn per 23 h 56 min. Arrow: your speed.
                        </text>
                      </>
                    );
                  }}
                </WorldMap>
                <Row>
                  {PLACES.map((p) => (
                    <Control key={p.name} disabled={locked} className={lat === p.lat ? "active" : ""} onClick={() => go(p.lat)}>
                      {p.name}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Slider label="Latitude" value={Math.round(lat)} min={0} max={90} disabled={locked} format={(x) => `${x}°N`} onChange={go} />
                </Row>
                <Row>
                  <Readout label="Your circle" value={locked ? "?" : `${r10(circleKm(lat))} km`} />
                  <Readout label="Speed" value={locked ? "?" : `${r10(v)} km/h`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
