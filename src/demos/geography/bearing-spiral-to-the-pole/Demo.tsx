"use client";

// Hold one compass heading from the equator: the path (a rhumb line, or loxodrome) spirals into the
// North Pole. Globe seen from above the pole (orthographic; the rim is the equator). Model: a
// sphere of radius 6,371.0088 km. The path obeys λ = tan(α)·ψ(φ), where ψ = ln tan(45° + φ/2) is
// the Mercator ordinate, so its length to the pole is R·(π/2)/cos α and its turns are endless.
// Key state: heading 80° (the question's) chosen, with the length and turns shown, and the pole zoomed.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { EARTH_RADIUS_KM, WorldMap, geoOrthographic } from "@/kit/geo";
import s from "./styles.module.css";

const W = 300;
const H = 300;
const RAD = Math.PI / 180;
const KEY = 80;
const HEADINGS = [10, 45, KEY];
const psi = (latDeg: number) => Math.log(Math.tan(Math.PI / 4 + (latDeg * RAD) / 2));

/** Length from the equator to the pole along a constant heading, km. */
const lengthKm = (h: number) => (EARTH_RADIUS_KM * (Math.PI / 2)) / Math.cos(h * RAD);
/** Turns around the pole made by the time the path reaches `lat`. */
const turnsBy = (h: number, lat: number) => (Math.tan(h * RAD) * psi(lat)) / (2 * Math.PI);
const POLE_KM = (EARTH_RADIUS_KM * Math.PI) / 2;

const LEVELS = [89, 89.9, 89.99, 90]; // how close to the pole the learner follows the path; 90 = all the way
/** Distance travelled by the time the path reaches `lat`, km (each km gains cos(heading) km of northing). */
const lengthTo = (h: number, lat: number) => (EARTH_RADIUS_KM * lat * RAD) / Math.cos(h * RAD);
const levelName = (lat: number) => (lat >= 90 ? "the pole" : `${lat}°N`);

function spiral(h: number, upTo = 90) {
  const t = Math.tan(h * RAD);
  const endLon = t * psi(Math.min(upTo, 89.99)) / RAD; // degrees of longitude travelled
  const pts: [number, number][] = [];
  const step = Math.max(0.5, Math.min(4, endLon / 1500));
  for (let lon = 0; lon <= endLon; lon += step) {
    const lat = (2 * Math.atan(Math.exp((lon * RAD) / t)) - Math.PI / 2) / RAD;
    pts.push([((lon + 180) % 360) - 180, lat]);
  }
  return { type: "LineString" as const, coordinates: pts };
}

const fmtKm = (km: number) => `${(Math.round(km / 10) * 10).toLocaleString("en-US")} km`;

export default function BearingSpiralToThePole({ slug }: { slug: string }) {
  const [heading, setHeading] = useState(45);
  const [zoom, setZoom] = useState(false);
  const [saw80, setSaw80] = useState(false);
  const [level, setLevel] = useState(3); // index into LEVELS
  const lat = LEVELS[level];
  const path = useMemo(() => spiral(heading, lat), [heading, lat]);
  const projection = useMemo(() => {
    const p = geoOrthographic().rotate([0, -90]).clipAngle(90).fitExtent([[6, 6], [W - 6, H - 6]], { type: "Sphere" });
    if (zoom) p.scale(p.scale() * 8);
    return p;
  }, [zoom]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Start on the equator and hold one compass heading, 80° (just north of due east), all the way. How far do you travel to reach the North Pole?",
        options: ["About 10,000 km, the equator-to-pole distance", "About 58,000 km", "You never get there: the path is endless"],
        answer: 1,
      }}
      exploreHint="Choose 80°, zoom in on the pole, then follow the path closer and closer."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            <strong>About {fmtKm(lengthKm(KEY))}.</strong> At 80° you had gone {fmtKm(lengthTo(KEY, 89))} by 89°N. The last degree to the pole adds only{" "}
            {fmtKm(lengthKm(KEY) - lengthTo(KEY, 89))}, though it holds endless turns. The length is finite because each turn is
            shorter than the last.
          </p>
          <p>
            At 80° you head mostly east, so each kilometre gains only about 0.17 km of northing, the same at every turn. The pole is{" "}
            {fmtKm(POLE_KM)} due north, so you travel about 5.8 times that. A constant heading is called a rhumb line: straight on a
            Mercator map, a spiral on the globe.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["heading-80", "zoomed", "closer"]}>
          {(reach) => (
            <div className={s.wrap}>
              <WorldMap
                projection={projection}
                width={W}
                height={H}
                label={`Globe seen from above the North Pole${zoom ? ", zoomed in on the pole" : ""}. Path at a constant heading of ${heading}°.`}
              >
                {({ path: p, projection: proj }) => {
                  const start = proj([0, 0]);
                  const pole = proj([0, 90])!;
                  return (
                    <>
                      <path d={p(path)} className={s.path} />
                      {start && <circle cx={start[0]} cy={start[1]} r={4} className={s.start} />}
                      <circle cx={pole[0]} cy={pole[1]} r={2.5} className={s.pole} />
                      <text x={6} y={12} className={s.lab}>
                        {zoom ? "Zoomed ×8 on the North Pole." : "Seen from above the pole. Rim: the equator."}
                      </text>
                      {start && (
                        <text x={start[0] - 30} y={start[1] - 6} className={s.lab}>
                          start
                        </text>
                      )}
                    </>
                  );
                }}
              </WorldMap>
              <p className={s.note}>Heading (compass angle, 90° is due east):</p>
              <Row>
                {HEADINGS.map((h) => (
                  <Control
                    key={h}
                    disabled={locked}
                    className={heading === h ? "active" : ""}
                    onClick={() => {
                      setHeading(h);
                      if (h === KEY) {
                        reach("heading-80");
                        setSaw80(true);
                      }
                    }}
                  >
                    {h}°
                  </Control>
                ))}
                <Control
                  disabled={locked}
                  className={zoom ? "active" : ""}
                  onClick={() => {
                    setZoom(!zoom);
                    if (!zoom) reach("zoomed");
                  }}
                >
                  {zoom ? "Zoom out" : "Zoom in"}
                </Control>
                <Control
                  disabled={locked}
                  onClick={() => {
                    setLevel((level + 1) % LEVELS.length);
                    if (heading === KEY) reach("closer");
                  }}
                >
                  Closer: {level === 3 ? "89°N" : level === 2 ? "pole" : `${LEVELS[level + 1]}°N`}
                </Control>
              </Row>
              {!locked && <Row>
                <Readout label={`Distance to ${levelName(lat)}`} value={locked ? "?" : fmtKm(lengthTo(heading, lat))} />
                <Readout label="Turns round the pole" value={locked ? "?" : lat >= 90 ? "endless" : turnsBy(heading, lat).toFixed(1)} />
              </Row>}
              {!locked && saw80 && <p className={s.note}>Straight north from the equator: {fmtKm(POLE_KM)}.</p>}
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
