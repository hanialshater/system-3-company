"use client";

// Two identical circles on the globe, each 1,000 km in radius (geoCircle), one fixed on the
// equator and one the learner slides north. The readout is the ratio of their drawn areas on this
// map (path.area), so it is exactly what the stage shows. Mercator keeps them round and swells
// the northern one; Equal Earth keeps their areas equal and squashes the northern one.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM, geoCircle, geoEqualEarth, geoMercator, geoPath } from "@/kit/geo";
import type { GeoProjection } from "d3-geo";
import s from "./styles.module.css";

type Kind = "mercator" | "equal";
const W = 320;
const H = 342;
const RADIUS_KM = 1000;
const RADIUS_DEG = (RADIUS_KM / EARTH_RADIUS_KM) * (180 / Math.PI);
const REF_LON = 8;
const MOVE_LON = 70;
const rad = Math.PI / 180;
const circle = (lon: number, lat: number) => geoCircle().center([lon, lat]).radius(RADIUS_DEG).precision(0.5)();

function makeProjection(kind: Kind): GeoProjection {
  if (kind === "mercator") {
    // Longitudes 20°W to 100°E; rows from about 75°N down to about 11°S.
    const sc = W / ((120 * Math.PI) / 180);
    const top = sc * Math.log(Math.tan(Math.PI / 4 + (75 * rad) / 2));
    return geoMercator().rotate([-40, 0]).scale(sc).translate([W / 2, top]).clipExtent([[0, 0], [W, H]]);
  }
  return geoEqualEarth()
    .rotate([-40, 0])
    .fitExtent([[0, 0], [W, H]], { type: "MultiPoint", coordinates: [[-20, -11], [100, -11], [-20, 75], [100, 75], [40, 75], [40, -11]] })
    .clipExtent([[0, 0], [W, H]]);
}

export default function TissotCircles({ slug }: { slug: string }) {
  const [lat, setLat] = useState(0);
  const [kind, setKind] = useState<Kind>("mercator");
  const [seen, setSeen] = useState({ merc60: false, equal: false });
  const projection = useMemo(() => makeProjection(kind), [kind]);
  const path = useMemo(() => geoPath(projection), [projection]);
  const ref = useMemo(() => circle(REF_LON, 0), []);
  const moving = useMemo(() => circle(MOVE_LON, lat), [lat]);
  const ratio = path.area(moving) / path.area(ref);
  const bb = path.bounds(moving);
  const wh = (bb[1][0] - bb[0][0]) / (bb[1][1] - bb[0][1]);
  const merc = useMemo(() => {
    const p = geoPath(makeProjection("mercator"));
    return p.area(circle(MOVE_LON, 60)) / p.area(circle(REF_LON, 0));
  }, []);
  const ee = useMemo(() => {
    const p = geoPath(makeProjection("equal"));
    return p.area(circle(MOVE_LON, 60)) / p.area(circle(REF_LON, 0));
  }, []);

  const update = (nextLat: number, nextKind: Kind, interact: () => void) => {
    setLat(nextLat);
    setKind(nextKind);
    const next = { merc60: seen.merc60 || (nextKind === "mercator" && nextLat === 60), equal: seen.equal || nextKind === "equal" };
    if (next.merc60 !== seen.merc60 || next.equal !== seen.equal) {
      setSeen(next);
      interact();
    }
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two identical circles, each with a 1,000 km radius on the ground, sit at the equator and at 60°N. On this Mercator map (the classic wall map, which keeps shapes true), how big does the 60°N circle look?",
        options: ["About the same as the other", "About twice as big", "About four times as big"],
        answer: 2,
      }}
      exploreHint="Slide the circle to 60°N, then switch to the other map."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About four times</strong>: at 60°N this Mercator map drew it {merc.toFixed(1)}× the equator
            circle&rsquo;s area, yet still round. At 60° Mercator stretches 2× east&ndash;west and 2× north&ndash;south (the
            Stretch readout), and 2 × 2 = 4; a bit more here because the circle&rsquo;s top edge is stretched more.
          </p>
          <p>
            On Equal Earth the two areas matched ({ee.toFixed(2)}×), but the northern circle was squashed. A flat map can
            keep shapes round or keep areas equal, not both everywhere: that is a proven result about spheres, not a flaw
            of one map. Every projection chooses which distortion to accept.
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
            label={`${kind === "mercator" ? "Mercator" : "Equal Earth"} map. A 1,000 km circle at ${lat}°N is drawn ${ratio.toFixed(2)} times the area of the one on the equator.`}
          >
            {({ path: p }) => (
              <>
                <path d={p(ref)} className={s.ref} />
                <path d={p(moving)} className={s.move} />
                {(() => {
                  const c = path.centroid(ref);
                  const d = path.centroid(moving);
                  return (
                    <>
                      <text x={c[0]} y={c[1] + 3} textAnchor="middle" fontSize={9} fill="var(--fg)">
                        fixed
                      </text>
                      <text x={d[0]} y={d[1] + 3} textAnchor="middle" fontSize={9} fill="var(--fg)">
                        slides
                      </text>
                    </>
                  );
                })()}
              </>
            )}
          </WorldMap>
          <p className="muted tiny">
            {kind === "mercator" ? "Mercator" : "Equal Earth"} projection. Both circles: 1,000 km radius on the globe.
          </p>
          <Row>
            <Slider label="Circle latitude" value={lat} min={0} max={60} disabled={locked} format={(v) => (v === 0 ? "equator" : `${v}°N`)} onChange={(v) => update(v, kind, interact)} />
          </Row>
          <Row>
            {[30, 60].map((v) => (
              <Control key={v} disabled={locked || lat === v} onClick={() => update(v, kind, interact)}>
                {v}°N
              </Control>
            ))}
            <Control className={kind === "equal" ? "active" : ""} disabled={locked} onClick={() => update(lat, kind === "mercator" ? "equal" : "mercator", interact)}>
              {kind === "mercator" ? "Show Equal Earth (equal areas)" : "Show Mercator"}
            </Control>
          </Row>
          <Row>
            <Readout label="Drawn area vs fixed circle" value={`${ratio.toFixed(2)}×`} />
            <Readout label="Stretch each way" value={kind === "mercator" ? `${(1 / Math.cos(lat * rad)).toFixed(2)}×` : "–"} />
            <Readout label="Circle width : height" value={wh.toFixed(2)} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
