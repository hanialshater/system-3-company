"use client";

// An Equirectangular map with the ground track of an idealised circular orbit (three laps, the Earth
// turning 23° under each). The learner sets the orbit's tilt (inclination). The track's highest
// latitude equals the tilt, drawn as a dashed line, and three cities are marked as in or out of range.
// Key state: the tilt has been set to the ISS's 51.6° (London inside, Moscow outside) and then raised
// until the track reaches Moscow.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, geoEquirectangular } from "@/kit/geo";
import s from "./styles.module.css";

type P = [number, number];
const W = 320;
const H = 160;
const ISS_TILT = 51.6;
const CITIES: { name: string; at: P }[] = [
  { name: "Rome", at: [12.4964, 41.9028] },
  { name: "London", at: [-0.1278, 51.5074] },
  { name: "Moscow", at: [37.6173, 55.7558] },
];
const MOSCOW_LAT = CITIES[2].at[1];
const LAPS = 3;
const SHIFT = 23; // degrees the Earth turns during one lap (about 92 min of 24 h)
const rad = Math.PI / 180;

/** Ground track as pixel segments, broken where it wraps around the map edge. */
function track(tilt: number, proj: (p: P) => P | null): string {
  const inc = tilt * rad;
  const steps = 360;
  const segs: string[] = [];
  let cur: P[] = [];
  let prev: P | null = null;
  for (let k = 0; k <= steps; k++) {
    const u = (k / steps) * LAPS * 2 * Math.PI;
    const lat = Math.asin(Math.sin(inc) * Math.sin(u)) / rad;
    let lon = Math.atan2(Math.cos(inc) * Math.sin(u), Math.cos(u)) / rad - 140 - (SHIFT * u) / (2 * Math.PI);
    lon = ((((lon + 180) % 360) + 360) % 360) - 180;
    const p = proj([lon, lat]);
    if (!p) continue;
    if (prev && Math.abs(p[0] - prev[0]) > W / 2) {
      segs.push(cur.map((q, i) => `${i ? "L" : "M"}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(""));
      cur = [];
    }
    cur.push(p);
    prev = p;
  }
  segs.push(cur.map((q, i) => `${i ? "L" : "M"}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(""));
  return segs.join("");
}

export default function IssNeverOverMoscow({ slug }: { slug: string }) {
  const [tilt, setTilt] = useState(30);
  const projection = useMemo(
    () => geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]),
    [],
  );
  const beyond = Math.round(((MOSCOW_LAT - ISS_TILT) * 111.2) / 10) * 10; // km north of 51.6°N

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "The ISS orbit is tilted 51.6° to the equator. Which of these cities can it never pass directly over?",
        options: ["Rome", "London", "Moscow"],
        answer: 2,
      }}
      exploreHint="Set the ISS tilt, then raise it until the track reaches Moscow."
      minInteractions={2}
      reveal={() => (
        <p>
          Moscow. A circular orbit tilted {ISS_TILT}° carries the satellite to {ISS_TILT}°N and {ISS_TILT}°S and no
          farther, then it turns back. London ({CITIES[1].at[1].toFixed(1)}°N) sits just inside that limit; Moscow (
          {MOSCOW_LAT.toFixed(1)}°N), about {beyond} km farther north, is outside it. You needed a tilt near{" "}
          {Math.ceil(MOSCOW_LAT)}° to reach it. Reaching a latitude is not the same as passing over a city on a given
          day: that also depends on timing.
        </p>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["iss", "past"]}>
          {(reach) => {
            const set = (v: number) => {
              setTilt(v);
              if (Math.abs(v - ISS_TILT) < 0.05) reach("iss");
              if (v >= MOSCOW_LAT) reach("past");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Equirectangular world map. Ground track of an orbit tilted ${tilt.toFixed(1)} degrees, reaching ${tilt.toFixed(1)} degrees north and south.`}
                >
                  {({ projection: proj }) => {
                    const yN = proj([0, tilt])![1];
                    const yS = proj([0, -tilt])![1];
                    return (
                      <>
                        {!locked && (
                          <>
                            <line x1={0} x2={W} y1={yN} y2={yN} className={s.limit} />
                            <line x1={0} x2={W} y1={yS} y2={yS} className={s.limit} />
                          </>
                        )}
                        <path d={track(tilt, proj as (p: P) => P | null)} className={s.track} />
                        {CITIES.map((c) => {
                          const p = proj(c.at)!;
                          const inRange = c.at[1] <= tilt;
                          return (
                            <g key={c.name}>
                              <circle
                                cx={p[0]}
                                cy={p[1]}
                                r={3.5}
                                className={locked ? s.city : inRange ? s.cityIn : s.cityOut}
                              />
                              <text
                                x={p[0] + (c.name === "London" ? -5 : c.name === "Moscow" ? 5 : 5)}
                                y={p[1] + (c.name === "Rome" ? 11 : c.name === "London" ? -4 : -4)}
                                textAnchor={c.name === "London" ? "end" : "start"}
                                className={s.name}
                              >
                                {c.name}
                              </text>
                            </g>
                          );
                        })}
                      </>
                    );
                  }}
                </WorldMap>
                <p className={s.note}>Idealised circular orbit, three laps. Dashed: highest latitude it reaches.</p>
                <div className={s.chips}>
                  <Control disabled={locked || tilt === ISS_TILT} onClick={() => set(ISS_TILT)}>
                    ISS tilt: {ISS_TILT}°
                  </Control>
                  <Control disabled={locked || tilt === 90} onClick={() => set(90)}>
                    Polar orbit: 90°
                  </Control>
                </div>
                <Row>
                  <Slider
                    label="Orbit tilt"
                    value={tilt}
                    min={0}
                    max={90}
                    step={0.1}
                    disabled={locked}
                    format={(v) => `${v.toFixed(1)}°`}
                    onChange={set}
                  />
                </Row>
                <Row>
                  {CITIES.map((c) => (
                    <Readout
                      key={c.name}
                      label={`${c.name} ${c.at[1].toFixed(1)}°N`}
                      value={locked ? "?" : c.at[1] <= tilt ? "in reach" : "out of reach"}
                    />
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
