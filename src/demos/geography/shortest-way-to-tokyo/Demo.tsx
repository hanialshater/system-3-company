"use client";

// The learner tries routes from New York to Tokyo on a Mercator map: the straight line on the
// map, and great-circle legs through Hawaii, Mexico City or northern Alaska. The readout gives
// each route's length on the globe. The route that looks most bent is the shortest.
// Every number on the stage and in the reveal is computed here from the same coordinates.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM, geoDistance, geoInterpolate, geoMercator } from "@/kit/geo";
import s from "./styles.module.css";

type Pt = [number, number];
const W = 320;
const H = 212;
const JFK: Pt = [-73.779, 40.64];
const HND: Pt = [139.78, 35.549];
const HNL: Pt = [-157.858, 21.307];
const MEX: Pt = [-99.133, 19.433];

// Northernmost point of the great circle, found by sampling it.
const VERTEX: Pt = (() => {
  const ip = geoInterpolate(JFK, HND);
  let best: Pt = JFK;
  for (let i = 0; i <= 2000; i++) {
    const p = ip(i / 2000) as Pt;
    if (p[1] > best[1]) best = p;
  }
  return best;
})();

const rad = Math.PI / 180;
/** Length of the constant-bearing line (a straight line on Mercator), the short way round. */
function rhumbKm(a: Pt, b: Pt) {
  const p1 = a[1] * rad;
  const p2 = b[1] * rad;
  let dl = (b[0] - a[0]) * rad;
  if (Math.abs(dl) > Math.PI) dl = dl > 0 ? dl - 2 * Math.PI : dl + 2 * Math.PI;
  const dpsi = Math.log(Math.tan(Math.PI / 4 + p2 / 2) / Math.tan(Math.PI / 4 + p1 / 2));
  const q = (p2 - p1) / dpsi;
  return Math.sqrt((p2 - p1) ** 2 + q * q * dl * dl) * EARTH_RADIUS_KM;
}
const viaKm = (v: Pt) => (geoDistance(JFK, v) + geoDistance(v, HND)) * EARTH_RADIUS_KM;
const round10 = (km: number) => Math.round(km / 10) * 10;
const fmt = (km: number) => `${round10(km).toLocaleString("en-US")} km`;

type RouteId = "straight" | "hawaii" | "alaska" | "mexico";
const ROUTES: { id: RouteId; label: string; via?: Pt; km: number }[] = [
  { id: "straight", label: "Straight on the map", km: rhumbKm(JFK, HND) },
  { id: "hawaii", label: "Via Hawaii", via: HNL, km: viaKm(HNL) },
  { id: "alaska", label: "Via northern Alaska", via: VERTEX, km: viaKm(VERTEX) },
  { id: "mexico", label: "Via Mexico City", via: MEX, km: viaKm(MEX) },
];
const byId = (id: RouteId) => ROUTES.find((r) => r.id === id)!;

function makeProjection() {
  // Mercator centred on 145°W so the North Pacific is whole; rows from 78°N down to about 10°N.
  const sc = W / Math.PI;
  const top = sc * Math.log(Math.tan(Math.PI / 4 + (78 * rad) / 2));
  return geoMercator().rotate([145, 0]).scale(sc).translate([W / 2, top]).clipExtent([[0, 0], [W, H]]);
}

export default function ShortestWayToTokyo({ slug }: { slug: string }) {
  const [route, setRoute] = useState<RouteId>("straight");
  const [seen, setSeen] = useState<RouteId[]>([]);
  const projection = useMemo(makeProjection, []);
  const cur = byId(route);
  const straight = byId("straight");
  const shortest = ROUTES.reduce((m, r) => (r.km < m.km ? r : m));
  const allSeen = seen.length >= 3;

  const a = projection(JFK)!;
  const b = projection(HND)!;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A flight from New York (JFK) to Tokyo (Haneda) takes the shortest path over the globe. Which place does it pass closest to?",
        options: ["Hawaii", "Northern Alaska", "Mexico"],
        answer: 1,
      }}
      exploreHint="Try each route and compare the lengths."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            The route through northern Alaska was the shortest you tried: <strong>{fmt(byId("alaska").km)}</strong>,
            against {fmt(straight.km)} for the straight line on the map. The Hawaii and Mexico detours were longer still.
          </p>
          <p>
            On a ball, the shortest path between two points is a <strong>great circle</strong>: the line a string takes
            when pulled tight across a globe. From New York to Tokyo it bows north, up to about{" "}
            {Math.round(VERTEX[1])}°N. This Mercator map stretches the north, so the shortest path looks bent and long,
            while its straight line holds one compass bearing and is about{" "}
            {Math.round((straight.km / byId("alaska").km - 1) * 100)}% longer.
          </p>
          <p className="muted">Real flights also bend for winds and airspace. This lesson ignores them.</p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <div className={s.wrap}>
          <WorldMap
            projection={projection}
            width={W}
            height={H}
            label={`Mercator map of the North Pacific. Route from New York to Tokyo: ${cur.label}, ${fmt(cur.km)}.`}
          >
            {({ path }) => (
              <>
                <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={route === "straight" ? s.route : s.ghost} />
                {cur.via && <path d={path({ type: "LineString", coordinates: [JFK, cur.via, HND] })} className={s.route} />}
                {phase === "reveal" && route !== "alaska" && (
                  <path d={path({ type: "LineString", coordinates: [JFK, VERTEX, HND] })} className={s.best} />
                )}
                {[
                  { p: HNL, t: "Hawaii", dx: 4, dy: 10 },
                  { p: MEX, t: "Mexico City", dx: -2, dy: 10 },
                  { p: VERTEX, t: "N. Alaska", dx: 4, dy: -4 },
                ].map(({ p, t, dx, dy }) => {
                  const q = projection(p)!;
                  return (
                    <g key={t}>
                      <circle cx={q[0]} cy={q[1]} r={2.2} className={s.place} />
                      <text x={q[0] + dx} y={q[1] + dy} className={s.label} textAnchor={dx < 0 ? "end" : "start"}>
                        {t}
                      </text>
                    </g>
                  );
                })}
                <circle cx={a[0]} cy={a[1]} r={3} className={s.end} />
                <text x={a[0] - 4} y={a[1] + 11} className={s.label} textAnchor="end">
                  New York
                </text>
                <circle cx={b[0]} cy={b[1]} r={3} className={s.end} />
                <text x={b[0] + 2} y={b[1] + 11} className={s.label}>
                  Tokyo
                </text>
              </>
            )}
          </WorldMap>
          <p className="muted tiny">
            Mercator projection. Lengths measured over the globe.
            {phase === "reveal" && route !== "alaska" && " Green dashes: the shortest path."}
          </p>
          <div className={s.chips} role="group" aria-label="Choose a route">
            {ROUTES.map((r) => (
              <Control
                key={r.id}
                className={route === r.id ? "active" : ""}
                aria-pressed={route === r.id}
                disabled={locked || route === r.id}
                onClick={() => {
                  setRoute(r.id);
                  if (r.id !== "straight" && !seen.includes(r.id)) {
                    setSeen([...seen, r.id]);
                    interact();
                  }
                }}
              >
                {r.label}
              </Control>
            ))}
          </div>
          <Row>
            <Readout label="This route" value={fmt(cur.km)} />
            <Readout
              label="vs straight line"
              value={route === "straight" ? "—" : `${cur.km < straight.km ? "−" : "+"}${fmt(Math.abs(cur.km - straight.km))}`}
            />
          </Row>
          {allSeen && (
            <p className={s.msg}>
              Shortest you tried: {shortest.label.replace("Via ", "via ")}.
            </p>
          )}
        </div>
      )}
    </Lesson>
  );
}
