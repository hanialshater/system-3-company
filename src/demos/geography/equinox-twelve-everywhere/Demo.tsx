"use client";

// Day and night on an Equirectangular world map at the moment it is noon at Greenwich. The Sun is
// overhead at latitude = declination (the date) and longitude 0. A chosen parallel (line of latitude)
// is drawn lit where the Sun is above the horizon, so the lit share of the line is the share of the
// day spent in daylight: hours = 2 acos(-tan(lat) tan(dec)) / 15°. Geometric day (Sun's centre,
// no refraction). Key state: the equinox, with at least two latitudes looked at, each half lit.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, geoEquirectangular } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const MAP_H = 160;
const H = 184;
const RAD = Math.PI / 180;
const TILT = 23.44;
const SUN_LON = 0;
// Five dates, 1/8 of a year apart. Simple model: declination = -23.44° cos(angle round the orbit).
const DATES = ["21 Dec", "early Feb", "20 Mar (equinox)", "early May", "21 Jun"];
const EQUINOX = 2;
const declination = (i: number) => {
  const d = -TILT * Math.cos(((i * 45) * Math.PI) / 180);
  return Math.abs(d) < 1e-9 ? 0 : d;
};
const KEY_LAT = 60;
const LAT_START = KEY_LAT; // the latitude the question asks about; the stage opens on 21 Dec so there is a "before"

/** Half the daylight arc in degrees of longitude (0 = polar night, 180 = midnight Sun). */
function halfArc(lat: number, dec: number) {
  const x = -Math.tan(lat * RAD) * Math.tan(dec * RAD);
  if (x <= -1) return 180;
  if (x >= 1) return 0;
  return Math.acos(x) / RAD;
}
const dayHours = (lat: number, dec: number) => (2 * halfArc(lat, dec)) / 15;

const projection = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, MAP_H / 2]);
const xy = (lon: number, lat: number) => projection([lon, lat])!;

/** Night region(s) as screen polygons. */
function nightPolygons(dec: number): string[] {
  const pts = (arr: [number, number][]) => arr.map(([lo, la]) => xy(lo, la).map((v) => v.toFixed(1)).join(",")).join(" ");
  if (dec === 0) {
    return [
      pts([[-180, 90], [SUN_LON - 90, 90], [SUN_LON - 90, -90], [-180, -90]]),
      pts([[SUN_LON + 90, 90], [180, 90], [180, -90], [SUN_LON + 90, -90]]),
    ];
  }
  const curve: [number, number][] = [];
  for (let lon = -180; lon <= 180; lon += 2) {
    curve.push([lon, Math.atan(-Math.cos((lon - SUN_LON) * RAD) / Math.tan(dec * RAD)) / RAD]);
  }
  const edge = dec < 0 ? 90 : -90;
  return [pts([...curve, [180, edge], [-180, edge]])];
}

const fmtH = (h: number) => `${h.toFixed(1)} h`;

export default function EquinoxTwelveEverywhere({ slug }: { slug: string }) {
  const [date, setDate] = useState(0);
  const [lat, setLat] = useState(LAT_START);
  const [seenAtEquinox, setSeenAtEquinox] = useState<number[]>([]);
  const [junKey, setJunKey] = useState(false);
  const dec = declination(date);
  const night = useMemo(() => nightPolygons(dec), [dec]);
  const half = halfArc(lat, dec);
  const hours = dayHours(lat, dec);
  const y = xy(0, lat)[1];
  const sun = xy(SUN_LON, dec);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On the March equinox, how many hours is the Sun above the horizon at ${KEY_LAT}°N (Oslo, Helsinki)?`,
        options: ["About 8 h", "About 10 h", `About ${Math.round(dayHours(KEY_LAT, 0))} h`],
        answer: 2,
      }}
      exploreHint="Move the date to the March equinox, then try other latitudes. Watch the day length."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About {Math.round(dayHours(KEY_LAT, 0))} hours</strong>, the same as at the equator. At the equinox the line between day
            and night ran straight from pole to pole, so every line of latitude you tried (
            {seenAtEquinox.map((l) => `${l}°N`).join(", ")}) was exactly half lit: {fmtH(dayHours(KEY_LAT, 0))} of daylight.
          </p>
          <p>
            That happens because the Sun is overhead at the equator on that day. On any other date the Earth&rsquo;s tilt puts the Sun north
            or south of it, the day-night line tilts too, and day length starts to depend on latitude
            {junKey ? `: on 21 June you saw ${fmtH(dayHours(KEY_LAT, TILT))} at ${KEY_LAT}°N` : ""}. Real equinox days run a few minutes
            over 12 hours, because air bends sunlight and the Sun is a disc, not a point.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["equinox", "two-latitudes"]}>
          {(reach) => {
            const update = (nextDate: number, nextLat: number) => {
              setDate(nextDate);
              setLat(nextLat);
              if (nextDate === 4 && nextLat === KEY_LAT) setJunKey(true);
              if (nextDate === EQUINOX) {
                reach("equinox");
                const next = seenAtEquinox.includes(nextLat) ? seenAtEquinox : [...seenAtEquinox, nextLat].sort((a, b) => a - b);
                setSeenAtEquinox(next);
                if (next.length >= 2) reach("two-latitudes");
              }
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`World map at noon in Greenwich on ${DATES[date]}. The Sun is overhead at ${Math.abs(dec).toFixed(1)}°${dec < 0 ? "S" : "N"}. At ${lat}°N the day is ${fmtH(hours)}.`}
                >
                  {() => (
                    <>
                      {night.map((p, i) => (
                        <polygon key={i} points={p} className={s.night} />
                      ))}
                      <line x1={0} y1={y} x2={W} y2={y} className={s.dark} />
                      {half > 0 && <line x1={xy(SUN_LON - half, lat)[0]} y1={y} x2={xy(SUN_LON + half, lat)[0]} y2={y} className={s.lit} />}
                      <circle cx={sun[0]} cy={sun[1]} r={5} className={s.sun} />
                      <text x={sun[0] + 7} y={sun[1] + 3} className={s.small}>
                        Sun overhead
                      </text>
                      <text x={4} y={H - 13} className={s.small}>
                        Shaded: night. Yellow: daylit part of your latitude.
                      </text>
                      <text x={4} y={H - 2} className={s.small}>
                        Noon at Greenwich. Day length here ignores the bending of light by air.
                      </text>
                    </>
                  )}
                </WorldMap>
                <Row>
                  <Slider label="Date" value={date} min={0} max={4} disabled={locked} format={(v) => DATES[v]} onChange={(v) => update(v, lat)} />
                </Row>
                <Row>
                  <Slider label="Latitude" value={lat} min={0} max={80} step={10} disabled={locked} format={(v) => `${v}°N`} onChange={(v) => update(date, v)} />
                </Row>
                <Row>
                  <Readout label={`Daylight at ${lat}°N`} value={fmtH(hours)} />
                  <Readout label="Share of the day in sunlight" value={`${Math.round((hours / 24) * 100)}%`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
