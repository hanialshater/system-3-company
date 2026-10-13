"use client";

// An Equirectangular world map whose centre longitude the learner moves. Tokyo (Haneda) and Los
// Angeles (LAX) are markers; the readout is their horizontal gap on this map, measured from the
// projected x positions, in degrees of map width (360° = full width). The great-circle distance
// between them is shown too and never changes. Key state: the seam (map edge) lies between them on
// the Atlantic side, so they sit near each other across the Pacific (gap about 102°).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM, geoDistance, geoEquirectangular } from "@/kit/geo";
import s from "./styles.module.css";

type P = [number, number];
const W = 320;
const H = 168;
const MAP_H = 160;
const TOKYO: P = [139.78, 35.55]; // Haneda airport
const LA: P = [-118.41, 33.94]; // LAX airport
const KM = geoDistance(TOKYO, LA) * EARTH_RADIUS_KM;
const PX_PER_DEG = W / 360;

function makeProjection(centre: number) {
  return geoEquirectangular()
    .rotate([-centre, 0])
    .scale(W / (2 * Math.PI))
    .translate([W / 2, MAP_H / 2]);
}

function gapDegrees(centre: number) {
  const p = makeProjection(centre);
  return Math.abs(p(TOKYO)![0] - p(LA)![0]) / PX_PER_DEG;
}

const fmtLon = (v: number) => (v === 0 ? "0° (Greenwich)" : Math.abs(v) === 180 ? "180° (Pacific)" : `${Math.abs(v)}°${v > 0 ? "E" : "W"}`);

export default function CentreMovesTheGap({ slug }: { slug: string }) {
  const [centre, setCentre] = useState(0);
  const projection = useMemo(() => makeProjection(centre), [centre]);
  const gap = gapDegrees(centre);
  const greenwichGap = Math.round(gapDegrees(0));
  const pacificGap = Math.round(gapDegrees(180));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a world map centred on Greenwich, Tokyo and Los Angeles are ${greenwichGap}° of map width apart. Re-centre the map on the Pacific (180°). How far apart are they now?`,
        options: ["The same distance", `About ${Math.round(pacificGap / 10) * 10}°, 2.5 times closer`, "About 180°"],
        answer: 1,
      }}
      exploreHint="Centre the map on the Pacific, then slide the centre around."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            <strong>About {pacificGap}°.</strong> On the Greenwich map the two cities sat at opposite edges, {greenwichGap}° apart. Centred
            on 180° the seam moved to the Atlantic and they became neighbours across the Pacific, {pacificGap}° apart, about{" "}
            {(greenwichGap / pacificGap).toFixed(1)} times closer.
          </p>
          <p>
            Nothing on the Earth moved: the shortest route between them stayed {(Math.round(KM / 10) * 10).toLocaleString("en-US")} km the whole time. A flat world map has to be
            cut somewhere, and where you cut decides which places look far apart. Greenwich in the middle is a convention, not a rule.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["pacific"]}>
          {(reach) => {
            const set = (c: number) => {
              setCentre(c);
              if (gapDegrees(c) < 180) reach("pacific");
            };
            const t = projection(TOKYO)!;
            const l = projection(LA)!;
            const y = MAP_H + 4;
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Equirectangular world map centred on ${fmtLon(centre)}. Tokyo and Los Angeles are ${Math.round(gap)} degrees of map width apart.`}
                >
                  {() => (
                    <>
                      <line x1={Math.min(t[0], l[0])} y1={y} x2={Math.max(t[0], l[0])} y2={y} className={s.gap} />
                      <line x1={t[0]} y1={t[1]} x2={t[0]} y2={y} className={s.tick} />
                      <line x1={l[0]} y1={l[1]} x2={l[0]} y2={y} className={s.tick} />
                      <circle cx={t[0]} cy={t[1]} r={3.5} className={s.city} />
                      <circle cx={l[0]} cy={l[1]} r={3.5} className={s.city} />
                      <text x={t[0]} y={t[1] - 6} className={s.name} textAnchor="middle">
                        Tokyo
                      </text>
                      <text x={l[0]} y={l[1] - 6} className={s.name} textAnchor="middle">
                        Los Angeles
                      </text>
                      <line x1={W / 2} y1={0} x2={W / 2} y2={MAP_H} className={s.centre} />
                      <text x={W / 2 + 3} y={10} className={s.small}>
                        centre {fmtLon(centre)}
                      </text>
                    </>
                  )}
                </WorldMap>
                <p className={s.note}>Equirectangular map: each degree of longitude is equally wide. Its edges are the cut.</p>
                <div className={s.chips}>
                  <Control disabled={locked || centre === 180} className={centre === 180 ? "active" : ""} onClick={() => set(180)}>
                    Centre on the Pacific
                  </Control>
                  <Control disabled={locked || centre === 0} className={centre === 0 ? "active" : ""} onClick={() => set(0)}>
                    Centre on Greenwich
                  </Control>
                </div>
                <Row>
                  <Slider label="Map centre" value={centre} min={-180} max={180} step={10} disabled={locked} format={fmtLon} onChange={set} />
                </Row>
                <Row>
                  <Readout label="Gap across the map" value={`${Math.round(gap)}°`} />
                  <Readout label="Real distance" value={`${(Math.round(KM / 10) * 10).toLocaleString("en-US")} km`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
