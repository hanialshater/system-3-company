"use client";

// The learner drags the date across a year. A dashed line on an equirectangular world map marks
// the latitude where the noon Sun is straight overhead that day (the Sun's declination). Each
// city marker fills in once that line has passed over it. Only cities between the tropics fill.
// Declination model: Kepler orbit, e = 0.0167, perihelion 3 January, obliquity 23.44 degrees
// (the same model as closer-in-winter).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, geoEquirectangular } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const H = 160;
const E = 0.0167;
const PERI_DAY = 3;
const OBL = 23.44;
const L_PERI = 282.94;
const rad = Math.PI / 180;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MLEN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function decl(day: number) {
  const M = (2 * Math.PI * (day - PERI_DAY)) / 365.25;
  let Ea = M;
  for (let i = 0; i < 8; i++) Ea -= (Ea - E * Math.sin(Ea) - M) / (1 - E * Math.cos(Ea));
  const nu = 2 * Math.atan2(Math.sqrt(1 + E) * Math.sin(Ea / 2), Math.sqrt(1 - E) * Math.cos(Ea / 2));
  return Math.asin(Math.sin(OBL * rad) * Math.sin((nu / rad + L_PERI) * rad)) / rad;
}
const DEC = Array.from({ length: 366 }, (_, d) => (d === 0 ? 0 : decl(d)));
const dateLabel = (day: number) => {
  let d = day;
  for (let m = 0; m < 12; m++) {
    if (d <= MLEN[m]) return `${d} ${MONTHS[m]}`;
    d -= MLEN[m];
  }
  return "31 Dec";
};
const dayOf = (m: number, d: number) => MLEN.slice(0, m).reduce((a, b) => a + b, 0) + d;
const fmtLat = (v: number) => `${Math.abs(v).toFixed(1)}°${v >= 0 ? "N" : "S"}`;

const CITIES = [
  { name: "Miami", lat: 25.76, lon: -80.19 },
  { name: "Cairo", lat: 30.04, lon: 31.24 },
  { name: "Honolulu", lat: 21.31, lon: -157.86 },
];
const HNL = CITIES[2];
const PEAK = DEC.reduce((best, v, d) => (d > 0 && v > DEC[best] ? d : best), 1);
const TROPIC = DEC[PEAK];
const START = dayOf(2, 20);
const CHIPS = [dayOf(5, 21), dayOf(11, 21), START];

export default function HonoluluOverhead({ slug }: { slug: string }) {
  const [day, setDay] = useState(START);
  const [swept, setSwept] = useState({ lo: DEC[START], hi: DEC[START] });
  const projection = useMemo(() => geoEquirectangular().fitSize([W, H], { type: "Sphere" }), []);
  const dec = DEC[day];
  const y = (lat: number) => projection([0, lat])![1];
  const x0 = projection([-180, 0])![0];
  const x1 = projection([180, 0])![0];
  const lit = (lat: number) => lat >= swept.lo && lat <= swept.hi;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You want to stand under a noon Sun that is directly overhead, on at least one day of the year. Which of these cities can give you that?",
        options: ["Miami (25.8°N)", "Cairo (30.0°N)", "Honolulu (21.3°N)"],
        answer: 2,
      }}
      exploreHint="Drag the date along the year, or tap a date, and watch the dashed line. Which cities does it pass over?"
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Only <strong>Honolulu</strong>. The line where the noon Sun is overhead never goes farther north than{" "}
            {fmtLat(TROPIC)}, around {dateLabel(PEAK)}. That is farther north than Honolulu, at {fmtLat(HNL.lat)}, so the line
            crossed it. It never reached Miami or Cairo.
          </p>
          <p>
            The limit matches the Earth&rsquo;s tilt, about {OBL.toFixed(1)}°, which the stage showed beside it. Through the year the overhead Sun swings
            between the Tropic of Cancer, {fmtLat(TROPIC)}, and the Tropic of Capricorn, {fmtLat(-TROPIC)}. Outside
            that band, even on the longest summer day, the noon Sun stays a little short of straight up.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["june-peak"]}>
          {(reach) => {
            const go = (d: number) => {
              const a = Math.min(d, day);
              const b = Math.max(d, day);
              let lo = swept.lo;
              let hi = swept.hi;
              for (let k = a; k <= b; k++) {
                lo = Math.min(lo, DEC[k]);
                hi = Math.max(hi, DEC[k]);
              }
              setDay(d);
              setSwept({ lo, hi });
              if (hi >= TROPIC - 0.01) reach("june-peak");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`World map, equirectangular projection. ${dateLabel(day)}: the noon Sun is overhead at ${fmtLat(dec)}.`}
                >
                  {() => (
                    <>
                      {[0, 20, 40].map((l) => (
                        <g key={l}>
                          <line x1={x0} x2={x1} y1={y(l)} y2={y(l)} className={s.grid} />
                          <text x={x0 + 2} y={y(l) - 2} className={s.gridLabel}>
                            {l === 0 ? "equator 0°" : `${l}°N`}
                          </text>
                        </g>
                      ))}
                      {!locked &&
                        [TROPIC, -TROPIC].map((t) => (
                          <g key={t}>
                            <line x1={x0} x2={x1} y1={y(t)} y2={y(t)} className={s.tropic} />
                            <text x={x1 - 2} y={y(t) + (t > 0 ? -2 : 8)} className={s.gridLabel} textAnchor="end">
                              {t > 0 ? "Tropic of Cancer" : "Tropic of Capricorn"}
                            </text>
                          </g>
                        ))}
                      <line x1={x0} x2={x1} y1={y(dec)} y2={y(dec)} className={s.sunLine} />
                      {CITIES.map((c) => {
                        const [px, py] = projection([c.lon, c.lat])!;
                        const on = !locked && lit(c.lat);
                        return (
                          <g key={c.name}>
                            <circle cx={px} cy={py} r={4} className={on ? s.cityOn : s.city} />
                            <text x={px} y={py - 7} className={s.cityLabel} textAnchor="middle">
                              {c.name}
                            </text>
                          </g>
                        );
                      })}
                    </>
                  )}
                </WorldMap>
                <p className="muted tiny">
                  Latitude is how far north or south of the equator a place is. Dashed: the latitude where the noon Sun is overhead on this date.
                  Filled city: the Sun has been overhead there.
                </p>
                <div className={s.chips} role="group" aria-label="Jump to a date">
                  {CHIPS.map((d) => (
                    <Control key={d} disabled={locked || day === d} className={day === d ? "active" : ""} onClick={() => go(d)}>
                      {dateLabel(d)}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Slider label="Date" value={day} min={1} max={365} disabled={locked} format={dateLabel} onChange={go} />
                </Row>
                {!locked && <Row>
                  <Readout label="Noon Sun overhead at" value={fmtLat(dec)} />
                  <Readout label="Farthest north so far" value={locked ? "?" : fmtLat(swept.hi)} />
                </Row>}
                {!locked && <Row>
                  <Readout label="Earth's axis tilt (fixed)" value={`${OBL.toFixed(1)}°`} />
                </Row>}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
