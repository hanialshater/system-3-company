"use client";

// A 10° x 10° box on an orthographic globe follows a latitude slider. Its sides run along
// meridians and parallels. The readout gives one degree of longitude along the box's middle
// parallel: pi R cos(lat) / 180, on a sphere of R = 6,371.0088 km.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM, geoOrthographic } from "@/kit/geo";
import type { Polygon } from "geojson";
import s from "./styles.module.css";

type Pt = [number, number];
const W = 300;
const H = 300;
const LON0 = 10;
const LON1 = 20;
const PER_DEG = (Math.PI * EARTH_RADIUS_KM) / 180; // km per degree of arc
const degLonKm = (lat: number) => PER_DEG * Math.cos((lat * Math.PI) / 180);
const CITIES: { name: string; p: Pt; left?: boolean }[] = [
  { name: "Oslo", p: [10.75, 59.91], left: true },
  { name: "Helsinki", p: [24.94, 60.17] },
];

function box(lat: number): Polygon {
  const s0 = lat - 5;
  const n0 = lat + 5;
  // Clockwise in (lon, lat), as d3-geo expects for an exterior ring; parallels densified.
  const ring: Pt[] = [];
  for (let lon = LON0; lon <= LON1; lon++) ring.push([lon, n0]);
  for (let lon = LON1; lon >= LON0; lon--) ring.push([lon, s0]);
  ring.push([LON0, n0]);
  return { type: "Polygon", coordinates: [ring] };
}

export default function ShrinkingDegree({ slug }: { slug: string }) {
  const [lat, setLat] = useState(0);
  // Recorded when the learner stops at 60°N (the milestone) and at 80°N: the readout's own text.
  const [seen, setSeen] = useState<Record<number, string>>({});
  // The globe tilts to follow the box and is zoomed 1.4x (clipped), so the box stays near the centre.
  const projection = useMemo(() => {
    const g = geoOrthographic().rotate([-15, -lat * 0.6]).fitExtent([[6, 6], [W - 6, H - 6]], { type: "Sphere" });
    return g.scale(g.scale() * 1.4).clipExtent([[0, 0], [W, H]]);
  }, [lat]);
  const km = degLonKm(lat);

  const go = (v: number, interact: () => void) => {
    setLat(v);
    if ((v === 60 || v === 80) && !(v in seen)) setSeen((a) => ({ ...a, [v]: degLonKm(v).toFixed(1) }));
    if (v === 60) interact();
  };
  const fmtLat = (l: number) => (l === 0 ? "the equator" : `${l}°N`);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "One degree of longitude is about 111 km wide at the equator. How wide is it at 60°N, the latitude of Oslo and Helsinki?",
        options: ["111 km", "56 km", "28 km"],
        answer: 1,
      }}
      exploreHint="Slide the box north to 60°N and read its width."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            About <strong>{Math.round(degLonKm(60))} km</strong>. Your Seen line: at 60°N one degree of longitude read{" "}
            {seen[60] ?? degLonKm(60).toFixed(1)} km, half of the {degLonKm(0).toFixed(1)} km at the equator. The box
            narrowed as it went north, while its north&ndash;south size on the ground stayed the same.
          </p>
          <p>
            The thin lines running up the globe are lines of longitude, and they all meet at the poles, so the gap
            between them shrinks with latitude
            {seen[80] ? `: you saw ${seen[80]} km at 80°N` : ""}
            {lat !== 60 && lat !== 80 ? `${seen[80] ? ", and" : ":"} ${km.toFixed(1)} km where the box is now, at ${fmtLat(lat)}` : ""}
            . A degree of latitude stays {PER_DEG.toFixed(0)} km. So &ldquo;one degree&rdquo; east&ndash;west is not a
            fixed distance.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <WorldMap projection={projection} width={W} height={H} label={`Globe, orthographic projection. A 10 by 10 degree box centred at ${lat}°N; one degree of longitude there is ${km.toFixed(1)} km.`}>
            {({ path }) => (
              <>
                <path d={path({ type: "LineString", coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, 0] as Pt) })} className={s.equator} />
                {lat > 0 && <path d={path(box(0))} className={s.ghost} />}
                <path d={path(box(lat))} className={s.box} />
                {CITIES.map((c) => {
                  const q = projection(c.p)!;
                  return (
                    <g key={c.name}>
                      <circle cx={q[0]} cy={q[1]} r={2.2} className={s.city} />
                      <text x={q[0] + (c.left ? -4 : 4)} y={q[1] - 3} className={s.label} textAnchor={c.left ? "end" : "start"}>
                        {c.name}
                      </text>
                    </g>
                  );
                })}
              </>
            )}
          </WorldMap>
          <p className="muted tiny">A globe. Box: 10° by 10°. Dashed: the same box at the equator. Thin lines: longitude, latitude.</p>
          <Row>
            <Slider label="Box latitude" value={lat} min={0} max={80} disabled={locked} format={(v) => (v === 0 ? "equator" : `${v}°N`)} onChange={(v) => go(v, interact)} />
          </Row>
          <div className={s.chips}>
            {[0, 60, 80].map((v) => (
              <Control key={v} disabled={locked || lat === v} onClick={() => go(v, interact)}>
                {v === 0 ? "Equator" : `${v}°N`}
              </Control>
            ))}
          </div>
          <Row>
            <Readout label="1° of longitude here" value={`${km.toFixed(1)} km`} />
            <Readout label="1° of latitude" value={`${PER_DEG.toFixed(0)} km`} />
          </Row>
          <Row>
            <Readout label="Box width, 10° of longitude" value={`${Math.round(10 * km).toLocaleString("en-US")} km`} />
          </Row>
          <p className="tiny" data-testid="seen">
            Seen:{" "}
            {Object.keys(seen).length
              ? [60, 80].filter((v) => v in seen).map((v) => `1° of longitude at ${v}°N = ${seen[v]} km`).join(" · ")
              : "nothing yet"}
          </p>
        </div>
      )}
    </Lesson>
  );
}
