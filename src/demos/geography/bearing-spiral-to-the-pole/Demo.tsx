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
const NEAR_POLE = 89.9;
const psi = (latDeg: number) => Math.log(Math.tan(Math.PI / 4 + (latDeg * RAD) / 2));

/** Length from the equator to the pole along a constant heading, km. */
const lengthKm = (h: number) => (EARTH_RADIUS_KM * (Math.PI / 2)) / Math.cos(h * RAD);
/** Turns around the pole made by the time the path reaches `lat`. */
const turnsBy = (h: number, lat: number) => (Math.tan(h * RAD) * psi(lat)) / (2 * Math.PI);
const POLE_KM = (EARTH_RADIUS_KM * Math.PI) / 2;

function spiral(h: number) {
  const t = Math.tan(h * RAD);
  const endLon = t * psi(89.99) / RAD; // degrees of longitude travelled
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
  const path = useMemo(() => spiral(heading), [heading]);
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
      exploreHint="Choose 80°, read the length and turns, then zoom in on the pole."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About {fmtKm(lengthKm(KEY))}.</strong> At 80° your path circled the pole {turnsBy(KEY, NEAR_POLE).toFixed(1)} times by{" "}
            {NEAR_POLE}°N, and closer in it keeps circling, tighter and tighter, without end. Yet the length is finite,
            because each turn is shorter than the last.
          </p>
          <p>
            Every kilometre gains the same bit of northing, so the length is the straight-north distance ({fmtKm(POLE_KM)}) divided by
            cos 80°. A constant heading is called a rhumb line: straight on a Mercator map, a spiral on the globe.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["heading-80", "zoomed"]}>
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
                        {zoom ? "Zoomed ×8 on the North Pole." : "Seen from above the North Pole. Rim: the equator."}
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
                    Heading {h}°
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
                  {zoom ? "Whole hemisphere" : "Zoom on the pole"}
                </Control>
              </Row>
              <Row>
                <Readout label="Length to the pole" value={locked ? "?" : fmtKm(lengthKm(heading))} />
                <Readout label={`Turns by ${NEAR_POLE}°N`} value={locked ? "?" : turnsBy(heading, NEAR_POLE).toFixed(1)} />
              </Row>
              {!locked && saw80 && <p className={s.note}>Straight north from the equator: {fmtKm(POLE_KM)}.</p>}
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
