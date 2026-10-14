"use client";

// One lap around the world along a parallel near the North Pole. Map: azimuthal equidistant
// centred on the pole (distances from the pole are true) at ONE fixed scale (v2), so the chosen
// parallel visibly shrinks against the equator ring. Lap length 2πR cos φ on a sphere of radius
// 6,371.0088 km. Key state: a big lap seen first, then the 89°N lap (under 1,000 km).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { EARTH_RADIUS_KM, WorldMap, geoAzimuthalEquidistant, geoCircle } from "@/kit/geo";
import s from "./styles.module.css";

const W = 300;
const H = 280;
const RAD = Math.PI / 180;
const KM_PER_PX = 80; // fixed map scale: the equator ring is about 125 px in radius
const KEY = 89;
const PRESETS = [0, 60, 85, KEY];
const lapKm = (lat: number) => 2 * Math.PI * EARTH_RADIUS_KM * Math.cos(lat * RAD);
const fromPoleKm = (lat: number) => (90 - lat) * RAD * EARTH_RADIUS_KM;
const r10 = (x: number) => (Math.round(x / 10) * 10).toLocaleString("en-US");
const latName = (lat: number) => (lat === 0 ? "the equator" : `${lat}°N`);

/** A round scale-bar length near `target` km. */
function niceKm(target: number) {
  const p = Math.pow(10, Math.floor(Math.log10(target)));
  for (const m of [5, 2, 1]) if (m * p <= target) return m * p;
  return p;
}

export default function LapAt89North({ slug }: { slug: string }) {
  const [lat, setLat] = useState(45);
  const [seen, setSeen] = useState<number[]>([]);
  const kmPerPx = KM_PER_PX;
  const projection = useMemo(
    () =>
      geoAzimuthalEquidistant()
        .rotate([0, -90])
        .clipAngle(91)
        .scale(EARTH_RADIUS_KM / kmPerPx)
        .translate([W / 2, H / 2 + 4]),
    [kmPerPx],
  );
  const bar = niceKm(kmPerPx * 40);
  const barPx = bar / kmPerPx;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You walk once around the world along the 89°N parallel (line of latitude). How far is that?",
        options: [`About ${r10(lapKm(KEY))} km`, "About 7,000 km", "About 40,000 km"],
        answer: 0,
      }}
      exploreHint="Start at the equator, then move north to 89°N."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About {r10(lapKm(KEY))} km</strong>, under 2% of the {r10(lapKm(0))} km round the equator.
            {seen.includes(85) && ` At 85°N you saw ${r10(lapKm(85))} km.`} On the same map, the ring shrank from the whole width to a speck.
          </p>
          <p>
            Circles of latitude get smaller toward the pole. At 89°N the circle is only 1.7% as wide as at the equator: one degree from the
            pole, the &ldquo;world&rdquo; you walk around is a circle about {r10(2 * fromPoleKm(KEY))} km across.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["big-lap", "at-89"]}>
          {(reach) => {
            const go = (l: number) => {
              setLat(l);
              if (!seen.includes(l)) setSeen([...seen, l]);
              if (l <= 60) reach("big-lap");
              if (l >= KEY) reach("at-89");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Map centred on the North Pole showing the parallel at ${latName(lat)}${locked ? "" : `, ${r10(lapKm(lat))} km round`}.`}
                >
                  {({ path, projection: proj }) => {
                    const pole = proj([0, 90])!;
                    return (
                      <>
                        <path d={path(geoCircle().center([0, 90]).radius(90)())} className={s.ref} />
                        <path d={path(geoCircle().center([0, 90]).radius(90 - lat)())} className={s.lap} />
                        <circle cx={pole[0]} cy={pole[1]} r={2.5} className={s.pole} />
                        <text x={pole[0] + 4} y={pole[1] - 4} className={s.lab}>
                          North Pole
                        </text>
                        <line x1={8} y1={H - 10} x2={8 + barPx} y2={H - 10} className={s.bar} />
                        <text x={8} y={H - 14} className={s.lab}>
                          {bar.toLocaleString("en-US")} km
                        </text>
                        <text x={4} y={12} className={s.lab}>
                          Centred on the North Pole. Yellow: {latName(lat)}. Dashed: equator.
                        </text>
                      </>
                    );
                  }}
                </WorldMap>
                <Row>
                  {PRESETS.map((p) => (
                    <Control key={p} disabled={locked} className={lat === p ? "active" : ""} onClick={() => go(p)}>
                      {p === 0 ? "Equator" : `${p}°N`}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Slider label="Latitude" value={lat} min={0} max={89.9} step={0.1} disabled={locked} format={(v) => `${v}°N`} onChange={go} />
                </Row>
                <Row>
                  <Readout label="Once around" value={locked ? "?" : `${r10(lapKm(lat))} km`} />
                  <Readout label="Across the circle" value={locked ? "?" : `${r10(2 * fromPoleKm(lat))} km`} />
                </Row>
                {!locked && lapKm(lat) < 1000 && <p className={s.note}>A bit more than London to Edinburgh by road (about 650 km).</p>}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
