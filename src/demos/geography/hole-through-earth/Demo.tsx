"use client";

// The learner moves a pin (chips or latitude/longitude sliders) on an equirectangular world map.
// Its antipode, the point straight through the Earth's centre, is drawn on the same map and both
// ends are looked up live in the kit's 1:110m country shapes. The other end is hidden while locked.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, geoContains, geoEquirectangular, world } from "@/kit/geo";
import s from "./styles.module.css";

type Pt = [number, number];
const W = 320;
const H = 160;
const PLACES: { name: string; lat: number; lon: number }[] = [
  { name: "Madrid", lat: 40.42, lon: -3.7 },
  { name: "Beijing", lat: 39.9, lon: 116.4 },
  { name: "Buenos Aires", lat: -34.6, lon: -58.38 },
  { name: "New York", lat: 40.71, lon: -74.0 },
];
const START = PLACES[3];
const MADRID = PLACES[0];

const antipode = (lat: number, lon: number): Pt => [lon > 0 ? lon - 180 : lon + 180, -lat];
const at = (p: Pt) => world().countries.find((c) => geoContains(c, p))?.properties.name ?? null;
const fmtLat = (v: number) => `${Math.abs(v).toFixed(1)}°${v > 0 ? "N" : v < 0 ? "S" : ""}`;
const fmtLon = (v: number) => `${Math.abs(v).toFixed(1)}°${v > 0 ? "E" : v < 0 ? "W" : ""}`;
const where = (name: string | null) => (name ? `Land: ${name}` : "Ocean");

export default function HoleThroughEarth({ slug }: { slug: string }) {
  const [lat, setLat] = useState(START.lat);
  const [lon, setLon] = useState(START.lon);
  const projection = useMemo(() => geoEquirectangular().fitSize([W, H], { type: "Sphere" }), []);
  const anti = antipode(lat, lon);
  const here = useMemo(() => at([lon, lat]), [lat, lon]);
  const there = useMemo(() => at(anti), [anti[0], anti[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const madridAnti = useMemo(() => at(antipode(MADRID.lat, MADRID.lon)), []);
  const pin = projection([lon, lat])!;
  const apin = projection(anti)!;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You dig straight through the Earth's centre from Madrid, Spain. Where do you come out?",
        options: ["Australia", "New Zealand", "The Indian Ocean"],
        answer: 1,
      }}
      exploreHint="Tap Madrid, then try another place. Watch the ring."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            From Madrid you come out in <strong>{madridAnti ?? "the ocean"}</strong>. The opposite point keeps the same
            number of degrees but flips north to south, and moves 180° of longitude: {fmtLat(MADRID.lat)},{" "}
            {fmtLon(MADRID.lon)} becomes {fmtLat(-MADRID.lat)}, {fmtLon(antipode(MADRID.lat, MADRID.lon)[0])}.
          </p>
          <p>
            Madrid is the lucky case. Most land has ocean on the other side: on this map only about 13% of the land
            sits opposite other land. Almost all of the United States is opposite open ocean, mostly the Indian Ocean, and about
            three-quarters of China is opposite ocean too; the rest is opposite Argentina and Chile.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["madrid", "another"]}>
          {(reach) => {
            const move = (la: number, lo: number) => {
              setLat(la);
              setLon(lo);
              if (Math.abs(la - MADRID.lat) < 0.6 && Math.abs(lo - MADRID.lon) < 0.6) reach("madrid");
              else reach("another");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`World map, equirectangular projection. Pin at ${fmtLat(lat)}, ${fmtLon(lon)}: ${where(here)}.${
                    locked ? "" : ` Opposite point ${fmtLat(anti[1])}, ${fmtLon(anti[0])}: ${where(there)}.`
                  }`}
                >
                  {() => (
                    <>
                      <circle cx={pin[0]} cy={pin[1]} r={4} className={s.pin} />
                      {!locked && (
                        <>
                          <circle cx={apin[0]} cy={apin[1]} r={6} className={s.ring} />
                          <circle cx={apin[0]} cy={apin[1]} r={1.5} className={s.ringDot} />
                        </>
                      )}
                    </>
                  )}
                </WorldMap>
                <p className="muted tiny">Equirectangular projection, 1:110m outlines. Dot: you. Ring: the other end.</p>
                <div className={s.chips} role="group" aria-label="Dig from">
                  {PLACES.map((p) => (
                    <Control
                      key={p.name}
                      disabled={locked || (lat === p.lat && lon === p.lon)}
                      className={lat === p.lat && lon === p.lon ? "active" : ""}
                      onClick={() => move(p.lat, p.lon)}
                    >
                      {p.name}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Slider label="Latitude" value={lat} min={-80} max={80} step={0.1} disabled={locked} format={fmtLat} onChange={(v) => move(v, lon)} />
                  <Slider label="Longitude" value={lon} min={-180} max={180} step={0.1} disabled={locked} format={fmtLon} onChange={(v) => move(lat, v)} />
                </Row>
                <Row>
                  <Readout label="Your end" value={where(here)} />
                  <Readout label="Other end" value={locked ? "?" : where(there)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
