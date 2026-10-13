"use client";

// The shortest London to Los Angeles route, drawn on a gnomonic map (where every great circle is a
// straight line) and on Mercator (where it bows north). A slider flies a marker along the route;
// the readout names what is underneath, from geoContains on the kit's 1:110m country shapes.
// Mercator also shows the straight-on-Mercator (constant bearing) line, dashed, with its length.
// Key states: the marker over Greenland, and the route seen on Mercator.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import {
  WorldMap,
  EARTH_RADIUS_KM,
  geoCircle,
  geoContains,
  geoDistance,
  geoGnomonic,
  geoInterpolate,
  geoMercator,
  world,
} from "@/kit/geo";
import { geoBounds } from "d3-geo";
import s from "./styles.module.css";

type P = [number, number];
type Kind = "gnomonic" | "mercator";
const W = 320;
const H = 250;
const LONDON: P = [-0.1276, 51.5072];
const LA: P = [-118.2437, 34.0522];
const ROUTE_KM = geoDistance(LONDON, LA) * EARTH_RADIUS_KM;
const along = geoInterpolate(LONDON, LA);
const MID = along(0.5) as P;
const ROUTE = { type: "LineString" as const, coordinates: Array.from({ length: 101 }, (_, i) => along(i / 100) as P) };
const START_KM = 2500;
const STEP_KM = 250;
const RAD = Math.PI / 180;

/** Length of the constant-bearing (rhumb) line, which is the straight line on Mercator. */
function rhumbKm(a: P, b: P) {
  const p1 = a[1] * RAD;
  const p2 = b[1] * RAD;
  const dp = p2 - p1;
  const dl = (b[0] - a[0]) * RAD;
  const dpsi = Math.log(Math.tan(Math.PI / 4 + p2 / 2) / Math.tan(Math.PI / 4 + p1 / 2));
  const q = Math.abs(dpsi) > 1e-12 ? dp / dpsi : Math.cos(p1);
  return Math.sqrt(dp * dp + q * q * dl * dl) * EARTH_RADIUS_KM;
}
const RHUMB_KM = rhumbKm(LONDON, LA);

function makeProjection(kind: Kind) {
  if (kind === "gnomonic") {
    const disc = geoCircle().center(MID).radius(46)();
    return geoGnomonic().rotate([-MID[0], -MID[1]]).clipAngle(52).fitExtent([[6, 6], [W - 6, H - 6]], disc);
  }
  return geoMercator()
    .rotate([60, 0])
    .fitExtent([[6, 6], [W - 6, H - 6]], { type: "MultiPoint", coordinates: [[-128, 22], [8, 22], [-128, 74], [8, 74]] })
    .clipExtent([[0, 0], [W, H]]);
}

/** Which country (1:110m) is under a point, or "Sea". */
let bounds: { c: ReturnType<typeof world>["countries"][number]; b: [[number, number], [number, number]] }[] | null = null;
function below(p: P) {
  if (!bounds) bounds = world().countries.map((c) => ({ c, b: geoBounds(c) }));
  for (const { c, b } of bounds) {
    const [[x0, y0], [x1, y1]] = b;
    const inLon = x0 <= x1 ? p[0] >= x0 && p[0] <= x1 : p[0] >= x0 || p[0] <= x1;
    if (!inLon || p[1] < y0 || p[1] > y1) continue;
    if (geoContains(c, p)) return c.properties.name;
  }
  return "Sea";
}
const nice = (n: string) => (n === "United States of America" ? "United States" : n === "United Kingdom" ? "UK" : n);
const fmtKm = (km: number) => (Math.round(km / 10) * 10).toLocaleString("en-US");

export default function LondonLaOverGreenland({ slug }: { slug: string }) {
  const [km, setKm] = useState(START_KM);
  const [kind, setKind] = useState<Kind>("gnomonic");
  const projection = useMemo(() => makeProjection(kind), [kind]);
  const at = along(Math.min(1, km / ROUTE_KM)) as P;
  const under = below(at);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Draw the shortest route from London to Los Angeles. Between Ireland and Canada, what land is under it?",
        options: ["Iceland", "Only open ocean", "Greenland"],
        answer: 2,
      }}
      exploreHint="Fly along the route, then compare with the Mercator map."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>Greenland.</strong> On the gnomonic map the shortest route is a straight line, and you flew it over Greenland&rsquo;s
            southern tip, not Iceland and not open ocean. The whole route is {fmtKm(ROUTE_KM)} km on a round Earth, ignoring winds.
          </p>
          <p>
            A gnomonic map is built so that every <strong>great circle</strong>, the shortest path between two points on a ball, comes out
            straight. On Mercator the same route bows north. The line that looks straight on Mercator is a constant compass bearing:
            it crosses open Atlantic far to the south and is {fmtKm(RHUMB_KM)} km, longer.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["greenland", "mercator"]}>
          {(reach, reached) => {
            const fly = (v: number) => {
              setKm(v);
              if (below(along(Math.min(1, v / ROUTE_KM)) as P) === "Greenland") reach("greenland");
            };
            const swap = () => {
              const next = kind === "gnomonic" ? "mercator" : "gnomonic";
              setKind(next);
              if (next === "mercator") reach("mercator");
            };
            const pa = projection(at);
            const l = projection(LONDON)!;
            const a = projection(LA)!;
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  highlight={locked ? [] : [under]}
                  label={`${kind === "gnomonic" ? "Gnomonic" : "Mercator"} map from London to Los Angeles.${locked ? "" : ` Marker ${Math.round(km)} km out, over ${nice(under)}.`}`}
                >
                  {({ path }) => (
                    <>
                      {!locked && kind === "mercator" && <line x1={l[0]} y1={l[1]} x2={a[0]} y2={a[1]} className={s.rhumb} />}
                      {!locked && <path d={path(ROUTE)} className={s.route} />}
                      {!locked && pa && <circle cx={pa[0]} cy={pa[1]} r={4.5} className={s.plane} />}
                      <circle cx={l[0]} cy={l[1]} r={3.5} className={s.city} />
                      <circle cx={a[0]} cy={a[1]} r={3.5} className={s.city} />
                      <text x={l[0] - 4} y={l[1] + 13} className={s.name} textAnchor="end">
                        London
                      </text>
                      <text x={a[0] + 4} y={a[1] + 13} className={s.name}>
                        Los Angeles
                      </text>
                      <text x={6} y={H - 6} className={s.small}>
                        {kind === "gnomonic"
                          ? "Gnomonic map: straight lines are shortest routes. Shows under half the globe."
                          : "Mercator map. Dashed: straight on this map. No winds."}
                      </text>
                    </>
                  )}
                </WorldMap>
                <Row>
                  <Slider
                    label="Fly from London"
                    value={km}
                    min={0}
                    max={Math.floor(ROUTE_KM / STEP_KM) * STEP_KM}
                    step={STEP_KM}
                    disabled={locked}
                    format={(v) => `${v.toLocaleString("en-US")} km`}
                    onChange={fly}
                  />
                </Row>
                <Row>
                  <Control disabled={locked} className={kind === "mercator" ? "active" : ""} onClick={swap}>
                    {kind === "gnomonic" ? "Show on Mercator" : "Show on gnomonic"}
                  </Control>
                  <Readout label="Below the route" value={locked ? "?" : nice(under)} />
                  {!locked && kind === "mercator" && reached("mercator") && <Readout label="Dashed line" value={`${fmtKm(RHUMB_KM)} km`} />}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
