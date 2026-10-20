"use client";

// The learner moves a pin by latitude and longitude on an equirectangular world map. A fog hides
// the spot where the equator and the prime meridian cross until the pin reaches 0°, 0°.
// "Under the pin" and "nearest land" are computed live from the kit's 1:110m shapes.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM, geoCircle, geoContains, geoDistance, geoEquirectangular, world } from "@/kit/geo";
import s from "./styles.module.css";

type Pt = [number, number];
const W = 320;
const H = 160;
const TARGETS: { name: string; lat: number; lon: number }[] = [
  { name: "Greenwich", lat: 51.5, lon: 0 },
  { name: "Quito", lat: -0.2, lon: -78.5 },
  { name: "Nairobi", lat: -1.3, lon: 36.8 },
  { name: "0°, 0°", lat: 0, lon: 0 },
];
const FOG = geoCircle().center([0, 0]).radius(14)();

// Every country outline vertex, for "nearest land" (1:110m, so a floor on detail).
let VERTS: { p: Pt; name: string }[] | null = null;
function verts() {
  if (!VERTS) {
    VERTS = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const walk = (c: any, name: string) => {
      if (typeof c[0] === "number") VERTS!.push({ p: c as Pt, name });
      else for (const x of c) walk(x, name);
    };
    for (const c of world().countries) {
      const g = c.geometry as { coordinates?: unknown };
      if (g.coordinates) walk(g.coordinates, c.properties.name);
    }
  }
  return VERTS;
}

function lookup(p: Pt) {
  const hit = world().countries.find((c) => geoContains(c, p));
  if (hit) return { land: hit.properties.name, near: null as null | { name: string; km: number } };
  let best = { name: "", d: Infinity };
  for (const v of verts()) {
    const d = geoDistance(p, v.p);
    if (d < best.d) best = { name: v.name, d };
  }
  return { land: null, near: { name: best.name, km: Math.round((best.d * EARTH_RADIUS_KM) / 10) * 10 } };
}

const fmtLat = (v: number) => `${Math.abs(v).toFixed(1)}°${v > 0 ? "N" : v < 0 ? "S" : ""}`;
const fmtLon = (v: number) => `${Math.abs(v).toFixed(1)}°${v > 0 ? "E" : v < 0 ? "W" : ""}`;

export default function NullIsland({ slug }: { slug: string }) {
  const [lat, setLat] = useState(51.5);
  const [lon, setLon] = useState(0);
  const [found, setFound] = useState(false);
  const projection = useMemo(() => geoEquirectangular().fitSize([W, H], { type: "Sphere" }), []);
  const here = useMemo(() => lookup([lon, lat]), [lat, lon]);
  const origin = useMemo(() => lookup([0, 0]), []);
  const pin = projection([lon, lat])!;

  const move = (la: number, lo: number, interact: () => void) => {
    setLat(la);
    setLon(lo);
    if (!found && Math.abs(la) <= 0.5 && Math.abs(lo) <= 0.5) {
      setFound(true);
      interact();
    }
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You type latitude 0, longitude 0 into your map app: the spot where the equator meets the prime meridian. If you went there, what would you find?",
        options: ["The Sahara, in North Africa", "A small island", "Open ocean, in the Gulf of Guinea"],
        answer: 2,
      }}
      exploreHint="Move the pin to the targets, then to 0°, 0°."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            At 0°, 0° there is <strong>open ocean</strong>: the Gulf of Guinea, off West Africa. On this map the nearest
            land is {origin.near?.name}, about {origin.near?.km.toLocaleString("en-US")} km away.
          </p>
          <p>
            Latitude counts degrees north or south of the equator. Longitude counts degrees east or west of the prime
            meridian, the line through Greenwich in London. Quito and Nairobi sit close to latitude 0; Greenwich sits on
            longitude 0. Where the two zero lines cross there is only sea, because coordinates are a grid of angles laid
            over the Earth. The grid does not care what is underneath.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <WorldMap
            projection={projection}
            width={W}
            height={H}
            label={`World map, equirectangular projection. Pin at ${fmtLat(lat)}, ${fmtLon(lon)}: ${here.land ? `land, ${here.land}` : "ocean"}.`}
          >
            {({ path }) => (
              <>
                <path d={path({ type: "LineString", coordinates: Array.from({ length: 37 }, (_, i) => [i * 10 - 180, 0] as Pt) })} className={s.zero} />
                <path d={path({ type: "LineString", coordinates: [[0, -90], [0, 0], [0, 90]] })} className={s.zero} />
                {!found && (
                  <>
                    <path d={path(FOG)} className={s.fog} />
                    <text x={projection([0, 0])![0]} y={projection([0, 0])![1] + 5} className={s.q} textAnchor="middle">
                      ?
                    </text>
                  </>
                )}
                <circle cx={pin[0]} cy={pin[1]} r={4} className={s.pin} />
                <circle cx={pin[0]} cy={pin[1]} r={1.2} className={s.pinDot} />
              </>
            )}
          </WorldMap>
          <p className="muted tiny">Equirectangular projection, 1:110m outlines. Bold lines: the equator and the prime meridian.</p>
          <Row>
            <Slider label="Latitude" value={lat} min={-80} max={80} step={0.1} disabled={locked} format={fmtLat} onChange={(v) => move(v, lon, interact)} />
            <Slider label="Longitude" value={lon} min={-180} max={180} step={0.1} disabled={locked} format={fmtLon} onChange={(v) => move(lat, v, interact)} />
          </Row>
          <div className={s.chips} role="group" aria-label="Jump to a place">
            {TARGETS.map((t) => (
              <Control
                key={t.name}
                disabled={locked || (lat === t.lat && lon === t.lon)}
                onClick={() => move(t.lat, t.lon, interact)}
              >
                {t.name}
              </Control>
            ))}
          </div>
          <Row>
            <Readout label="Under the pin" value={locked ? "?" : here.land ? `Land: ${here.land}` : "Ocean"} />
            {!locked && here.near && (
              <Readout label="Nearest land" value={`${here.near.name}, ${here.near.km.toLocaleString("en-US")} km`} />
            )}
          </Row>
        </div>
      )}
    </Lesson>
  );
}
