"use client";

// A ruler of fixed length on the screen, drawn as 2,000 km at the equator, slides north on a
// Mercator map. The readout inverts the projection at the ruler's ends and measures the ground
// distance along the parallel (R cos(lat) x difference in longitude). A second bar shows how long
// a true 2,000 km would be drawn at that latitude.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM, geoMercator } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const H = 300;
const BAR_KM = 2000;
const LON_C = 40;
const rad = Math.PI / 180;

function makeProjection() {
  // Longitudes 20°W to 100°E across the width; rows from about 72°N down to about 5°S.
  const sc = W / ((120 * Math.PI) / 180);
  const top = sc * Math.log(Math.tan(Math.PI / 4 + (72 * rad) / 2));
  return geoMercator().rotate([-40, 0]).scale(sc).translate([W / 2, top]).clipExtent([[0, 0], [W, H]]);
}

export default function RulerOnMercator({ slug }: { slug: string }) {
  const [lat, setLat] = useState(0);
  const [reached, setReached] = useState(false);
  const projection = useMemo(makeProjection, []);
  // Screen length of the ruler: 2,000 km along the equator.
  const half = (projection.scale() * (BAR_KM / EARTH_RADIUS_KM)) / 2;
  const [cx, cy] = projection([LON_C, lat])!;
  const x0 = cx - half;
  const x1 = cx + half;
  const a = projection.invert!([x0, cy])!;
  const b = projection.invert!([x1, cy])!;
  const groundKm = EARTH_RADIUS_KM * Math.cos(a[1] * rad) * (b[0] - a[0]) * rad;
  const trueHalf = half / Math.cos(lat * rad);
  const fmt = (km: number) => `${Math.round(km).toLocaleString("en-US")} km`;
  const at60 = BAR_KM * Math.cos(60 * rad);

  const go = (v: number, interact: () => void) => {
    setLat(v);
    if (!reached && v === 60) {
      setReached(true);
      interact();
    }
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On this Mercator map the yellow bar spans ${BAR_KM.toLocaleString("en-US")} km at the equator. Slide the same bar to 60°N. How far does it span on the ground there?`,
        options: ["1,000 km", "2,000 km", "4,000 km"],
        answer: 0,
      }}
      exploreHint="Slide the bar north to 60°N and read the ground distance."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            <strong>{fmt(at60)}</strong>. The bar never changed on the screen, but at 60°N the Mercator map is stretched
            twice as much as at the equator, so the same bar covers half the ground. The green bar showed what a real{" "}
            {BAR_KM.toLocaleString("en-US")} km looks like there: twice as long.
          </p>
          <p>
            Mercator&rsquo;s stretch is 1 / cos(latitude): 2 at 60°, about 2.9 at 70°. It is the same north&ndash;south
            as east&ndash;west, which is why shapes look right while sizes do not. A single scale bar on a world map is
            only true along one line.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <WorldMap projection={projection} width={W} height={H} label={`Mercator map. A fixed-length bar at ${lat}°N spans ${fmt(groundKm)} on the ground.`}>
            {() => (
              <>
                <line x1={cx - trueHalf} x2={cx + trueHalf} y1={cy + 7} y2={cy + 7} className={s.truth} />
                <line x1={x0} x2={x1} y1={cy} y2={cy} className={s.bar} />
                <line x1={x0} x2={x0} y1={cy - 5} y2={cy + 5} className={s.tick} />
                <line x1={x1} x2={x1} y1={cy - 5} y2={cy + 5} className={s.tick} />
              </>
            )}
          </WorldMap>
          <p className="muted tiny">Mercator projection. Yellow: the same bar. Green: a true {BAR_KM.toLocaleString("en-US")} km here.</p>
          <Row>
            <Slider label="Bar latitude" value={lat} min={0} max={70} disabled={locked} format={(v) => (v === 0 ? "equator" : `${v}°N`)} onChange={(v) => go(v, interact)} />
          </Row>
          <div className={s.chips}>
            {[0, 30, 60].map((v) => (
              <Control key={v} disabled={locked || lat === v} onClick={() => go(v, interact)}>
                {v === 0 ? "Equator" : `${v}°N`}
              </Control>
            ))}
          </div>
          <Row>
            <Readout label="Yellow bar on the ground" value={locked ? fmt(BAR_KM) : fmt(groundKm)} />
            <Readout label="Map stretch" value={`${(1 / Math.cos(lat * rad)).toFixed(2)}×`} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
