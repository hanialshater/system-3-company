"use client";

// Which way do you face in Seattle for the shortest route to Moscow? The map is azimuthal
// equidistant centred on Seattle: every straight line from Seattle is a great circle (a shortest
// route) and distance from Seattle is true. The learner turns a heading; the stage draws the great
// circle that heading starts and how far it passes from Moscow. Key state: the heading is within
// 2° of the true initial bearing (11.5°), after east has been tried.
// v3: while locked the stage shows the ordinary flat map (Moscow plainly east of Seattle), so the
// Seattle-centred map no longer gives the answer away before the prediction. The gate also needs the
// on-target route viewed on the flat map, so "straight here, bent there" is seen, not told.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { EARTH_RADIUS_KM, WorldMap, geoAzimuthalEquidistant, geoEquirectangular, geoCircle, geoDistance } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const H = 260;
const RAD = Math.PI / 180;
type Pt = [number, number];
const SEATTLE: Pt = [-122.33, 47.61];
const MOSCOW: Pt = [37.62, 55.76];
const ROUTE_KM = 9500;
const ON_TARGET_DEG = 2;

/** Initial great-circle bearing from a to b, degrees clockwise from north. */
function bearing(a: Pt, b: Pt) {
  const [l1, p1] = [a[0] * RAD, a[1] * RAD];
  const [l2, p2] = [b[0] * RAD, b[1] * RAD];
  const y = Math.sin(l2 - l1) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(l2 - l1);
  return ((Math.atan2(y, x) / RAD) + 360) % 360;
}

/** Point reached from `a` after `km` along the great circle starting at `deg`. */
function destination(a: Pt, deg: number, km: number): Pt {
  const d = km / EARTH_RADIUS_KM;
  const t = deg * RAD;
  const p1 = a[1] * RAD;
  const l1 = a[0] * RAD;
  const p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(t));
  const l2 = l1 + Math.atan2(Math.sin(t) * Math.sin(d) * Math.cos(p1), Math.cos(d) - Math.sin(p1) * Math.sin(p2));
  return [((l2 / RAD + 540) % 360) - 180, p2 / RAD];
}

const TRUE_BEARING = bearing(SEATTLE, MOSCOW);
const DIST_KM = geoDistance(SEATTLE, MOSCOW) * EARTH_RADIUS_KM;

/** Closest the drawn route (the first ROUTE_KM of the great circle at `deg`) comes to Moscow, km. */
function missKm(deg: number) {
  let best = Infinity;
  for (let km = 0; km <= ROUTE_KM; km += 10) best = Math.min(best, geoDistance(destination(SEATTLE, deg, km), MOSCOW));
  return best * EARTH_RADIUS_KM;
}

const projection = geoAzimuthalEquidistant()
  .rotate([-SEATTLE[0], -SEATTLE[1]])
  .clipAngle(100)
  .fitExtent([[6, 20], [W - 6, H - 6]], geoCircle().center(SEATTLE).radius(100)());

// Ordinary flat map (equirectangular), centred on 42°W so Seattle and Moscow both show.
const FLAT_SCALE = (W - 12) / (2 * Math.PI);
const flatProjection = geoEquirectangular()
  .rotate([42, 0])
  .scale(FLAT_SCALE)
  .translate([W / 2, H / 2 + FLAT_SCALE * ((52 * Math.PI) / 180)]);

const fmtKm = (km: number) => `${(Math.round(km / 10) * 10).toLocaleString("en-US")} km`;
const fmtDeg = (d: number) => `${d.toFixed(0)}°`;

export default function SeattleMoscowHeading({ slug }: { slug: string }) {
  const [heading, setHeading] = useState<number | null>(null);
  const [eastMiss, setEastMiss] = useState<number | null>(null);
  const [bestHit, setBestHit] = useState<number | null>(null);
  const [flat, setFlat] = useState(false);
  const [sawFlat, setSawFlat] = useState(false);

  const route = useMemo(() => {
    if (heading === null) return null;
    const pts: Pt[] = [];
    for (let km = 0; km <= ROUTE_KM; km += 250) pts.push(destination(SEATTLE, heading, km));
    return { type: "LineString" as const, coordinates: pts };
  }, [heading]);

  const onTarget = heading !== null && Math.abs(heading - TRUE_BEARING) <= ON_TARGET_DEG;
  const miss = heading === null ? null : missKm(heading);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Standing in Seattle, which way do you face to set off on the shortest route to Moscow?",
        options: ["East", "North-east", "Almost due north"],
        answer: 2,
      }}
      exploreHint="Point east first, turn until the route reaches Moscow, then show that route on the flat map."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            <strong>Almost due north</strong>: the shortest route leaves Seattle {TRUE_BEARING.toFixed(1)}° east of north and runs{" "}
            {fmtKm(DIST_KM)}.{eastMiss !== null && ` Pointing east, the route you saw passed ${fmtKm(eastMiss)} from Moscow.`}
          </p>
          <p>
            Moscow lies far east of Seattle, but both are far north, and on a ball the shortest way between them climbs
            over the top: across Canada, the far north of Greenland and the Arctic Ocean, then down over Norway and Finland.
            {sawFlat
              ? " You saw it both ways: a straight line on the Seattle-centred map, a curve bending north on the flat map."
              : " Show it on a flat map and the same route bends north."}
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["east", "on-target", "flat-hit"]}>
          {(reach) => {
            const turn = (deg: number) => {
              const h = ((Math.round(deg) % 360) + 360) % 360;
              setHeading(h);
              if (h === 90) {
                reach("east");
                setEastMiss(missKm(90));
              }
              if (Math.abs(h - TRUE_BEARING) <= ON_TARGET_DEG) {
                reach("on-target");
                setBestHit(h);
                if (flat) {
                  setSawFlat(true);
                  reach("flat-hit");
                }
              }
            };
            const showFlat = flat || locked; // locked: the ordinary map, where Moscow plainly lies east
            const proj = showFlat ? flatProjection : projection;
            const at = (p: Pt) => proj(p)!;
            const sea = at(SEATTLE);
            const mos = at(MOSCOW);
            const north = at([SEATTLE[0], SEATTLE[1] + 12]);
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={proj}
                  width={W}
                  height={H}
                  label={`${showFlat ? "Ordinary flat map." : "Map centred on Seattle."} ${heading === null ? "No heading yet." : `Heading ${fmtDeg(heading)} from north; the route passes ${fmtKm(miss!)} from Moscow.`}`}
                >
                  {({ path }) => (
                    <>
                      {route && !locked && <path d={path(route)} className={onTarget ? s.hit : s.route} />}
                      {!showFlat && <line x1={sea[0]} y1={sea[1]} x2={north[0]} y2={north[1]} className={s.north} />}
                      {!showFlat && (
                        <text x={north[0] + 3} y={north[1] + 3} className={s.lab}>
                          N
                        </text>
                      )}
                      <circle cx={sea[0]} cy={sea[1]} r={3.5} className={s.city} />
                      <text x={sea[0] + 5} y={sea[1] + 11} className={s.lab}>
                        Seattle
                      </text>
                      <circle cx={mos[0]} cy={mos[1]} r={3.5} className={s.city} />
                      <text x={mos[0] + 5} y={mos[1] + 3} className={s.lab}>
                        Moscow
                      </text>
                      <text x={6} y={12} className={s.lab}>
                        {locked
                          ? "Ordinary flat map."
                          : flat
                            ? "Ordinary flat map: the same route."
                            : "Centred on Seattle: straight lines from it are shortest routes."}
                      </text>
                    </>
                  )}
                </WorldMap>
                <Row>
                  <Control disabled={locked} className={heading === 90 ? "active" : ""} onClick={() => turn(90)}>
                    Face east
                  </Control>
                  <Control disabled={locked} className={heading === 45 ? "active" : ""} onClick={() => turn(45)}>
                    Face north-east
                  </Control>
                  <Control disabled={locked} className={heading === 0 ? "active" : ""} onClick={() => turn(0)}>
                    Face north
                  </Control>
                </Row>
                <Row>
                  <Control disabled={locked || heading === null} onClick={() => turn((heading ?? 0) + 10)}>
                    Turn right 10°
                  </Control>
                  <Control disabled={locked || heading === null} onClick={() => turn((heading ?? 0) + 1)}>
                    Right 1°
                  </Control>
                  <Control disabled={locked || heading === null} onClick={() => turn((heading ?? 0) - 1)}>
                    Left 1°
                  </Control>
                </Row>
                <Row>
                  <Readout label="Heading from north" value={locked || heading === null ? "?" : fmtDeg(heading)} />
                  <Readout
                    label="Route passes Moscow by"
                    value={locked || miss === null ? "?" : onTarget ? `${fmtKm(miss)} (within 2°)` : fmtKm(miss)}
                  />
                </Row>
                <Row>
                  <Control
                    disabled={locked}
                    className={flat ? "active" : ""}
                    onClick={() => {
                      setFlat(!flat);
                      if (!flat && onTarget) {
                        setSawFlat(true);
                        reach("flat-hit");
                      }
                    }}
                  >
                    {flat ? "Back to Seattle-centred map" : "Show on a flat map"}
                  </Control>
                </Row>
                {!locked && bestHit !== null && (
                  <p className={s.note}>
                    Exact: {TRUE_BEARING.toFixed(1)}° from north, {fmtKm(DIST_KM)} to Moscow.
                  </p>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
