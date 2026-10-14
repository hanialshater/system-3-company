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
const H = 262;
const TOP_LAT = 68;
const MAX_LAT = 65;
const BAR_KM = 2000;
const LON_C = 40;
const rad = Math.PI / 180;

function makeProjection() {
  // Longitudes 20°W to 100°E across the width; rows from 68°N down to about 4°S.
  const sc = W / ((120 * Math.PI) / 180);
  const top = sc * Math.log(Math.tan(Math.PI / 4 + (TOP_LAT * rad) / 2));
  return geoMercator().rotate([-40, 0]).scale(sc).translate([W / 2, top]).clipExtent([[0, 0], [W, H]]);
}

export default function RulerOnMercator({ slug }: { slug: string }) {
  const [lat, setLat] = useState(0);
  // Recorded when the 60°N milestone fires: the readouts' own text at that moment.
  const [seen, setSeen] = useState<{ ground: string; stretch: string } | null>(null);
  const projection = useMemo(makeProjection, []);
  // Screen length of the ruler: 2,000 km along the equator.
  const half = (projection.scale() * (BAR_KM / EARTH_RADIUS_KM)) / 2;
  const [cx, cy] = projection([LON_C, lat])!;
  const eqY = projection([LON_C, 0])![1];
  const x0 = cx - half;
  const x1 = cx + half;
  const a = projection.invert!([x0, cy])!;
  const b = projection.invert!([x1, cy])!;
  const groundKm = EARTH_RADIUS_KM * Math.cos(a[1] * rad) * (b[0] - a[0]) * rad;
  const trueHalf = half / Math.cos(lat * rad);
  const fmt = (km: number) => `${Math.round(km).toLocaleString("en-US")} km`;
  const stretchText = (l: number) => `${(1 / Math.cos(l * rad)).toFixed(2)}×`;
  // Ground span of the fixed bar at latitude l (the same inversion the readout uses).
  const groundAt = (l: number) => {
    const [px, py] = projection([LON_C, l])!;
    const p0 = projection.invert!([px - half, py])!;
    const p1 = projection.invert!([px + half, py])!;
    return EARTH_RADIUS_KM * Math.cos(p0[1] * rad) * (p1[0] - p0[0]) * rad;
  };

  const go = (v: number, interact: () => void) => {
    setLat(v);
    if (seen === null && v === 60) {
      setSeen({ ground: fmt(groundAt(60)), stretch: stretchText(60) });
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
            Your Seen line: at 60°N the bar spanned <strong>{seen?.ground ?? fmt(BAR_KM / 2)}</strong>, map stretch{" "}
            {seen?.stretch}. The bar never changed on the screen, but the map there is stretched twice as much as at the
            equator, so the same bar covers half the ground. The green bar, a true {BAR_KM.toLocaleString("en-US")} km there,
            was twice as long.
          </p>
          <p>The stretch grows toward the poles, so one scale bar is true along only one line.</p>
        </>
      )}
    >
      {({ locked, interact, phase }) => {
        const mapH = phase === "reveal" ? Math.ceil(eqY) + 4 : H;
        const low = cy + 19 > mapH - 2; // too near the bottom edge: green bar and label go above
        return (
        <div className={s.wrap}>
          {/* v5: at the reveal the strip south of the equator is not drawn; near the equator the green bar and its
              label move above the yellow bar so both stay on the map. */}
          <WorldMap projection={projection} width={W} height={mapH} label={`Mercator map. A fixed-length bar at ${lat}°N spans ${fmt(groundKm)} on the ground.`}>
            {() => (
              <>
                <line x1={0} x2={W} y1={eqY} y2={eqY} className={s.eq} />
                <text x={4} y={eqY - 4} className={s.eqLabel}>
                  equator
                </text>
                <line x1={cx - trueHalf} x2={cx + trueHalf} y1={low ? cy - 7 : cy + 7} y2={low ? cy - 7 : cy + 7} className={s.truth} />
                <line x1={x0} x2={x1} y1={cy} y2={cy} className={s.barEdge} />
                <line x1={x0} x2={x1} y1={cy} y2={cy} className={s.bar} />
                <line x1={x0} x2={x0} y1={cy - 5} y2={cy + 5} className={s.tick} />
                <line x1={x1} x2={x1} y1={cy - 5} y2={cy + 5} className={s.tick} />
                <text x={x1 + 5} y={cy + 3} className={s.barLabel}>
                  same bar
                </text>
                <text x={cx} y={low ? cy - 13 : cy + 19} className={s.truthLabel} textAnchor="middle">
                  true {BAR_KM.toLocaleString("en-US")} km here
                </text>
              </>
            )}
          </WorldMap>
          {/* v5 (learner r8): the legend repeats the labels drawn on the map, so it steps aside at the reveal. */}
          {phase !== "reveal" && <p className="muted tiny">Mercator projection. Yellow: the same bar. Green dashed: a true {BAR_KM.toLocaleString("en-US")} km here.</p>}
          {/* Fold opt-in (W-330): no Readout in these rows, no reveal sentence reads the slider or the chips (the
              reveal quotes the Seen line), and the bar's latitude stays drawn on the map. */}
          <Row foldAtReveal>
            <Slider label="Bar latitude" value={lat} min={0} max={MAX_LAT} disabled={locked} format={(v) => (v === 0 ? "equator" : `${v}°N`)} onChange={(v) => go(v, interact)} />
          </Row>
          <Row foldAtReveal>
            {[0, 30, 60].map((v) => (
              <Control key={v} disabled={locked || lat === v} onClick={() => go(v, interact)}>
                {v === 0 ? "Equator" : `${v}°N`}
              </Control>
            ))}
          </Row>
          <Row>
            <Readout label="Yellow bar on the ground" value={locked ? fmt(BAR_KM) : fmt(groundKm)} />
            <Readout label="Map stretch" value={stretchText(lat)} />
          </Row>
          <p className="tiny" data-testid="seen">
            Seen: {seen ? `60°N → ${seen.ground} on the ground, stretch ${seen.stretch}` : "nothing yet"}
          </p>
        </div>
        );
      }}
    </Lesson>
  );
}
