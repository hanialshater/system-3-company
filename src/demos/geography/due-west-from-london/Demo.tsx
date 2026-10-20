"use client";

// Geography: which land lies across the Atlantic from London, Madrid, Lisbon and New York along the
// same parallel. The landfall is found by walking the parallel in 0.1 degree steps through the kit's
// 1:110m country polygons (landfall()); the line, the dot and the readout all use that one result.
// Key state: London, Madrid and New York have each been tried (so the learner has compared them).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { WorldMap, geoContains, geoEquirectangular, world } from "@/kit/geo";
import { geoBounds } from "d3-geo";

const W = 320;
const H = 132;
const MILESTONES = ["london", "madrid", "newyork"] as const;

const CITIES = [
  { id: "london", name: "London", lon: -0.1276, lat: 51.5072, dir: -1 },
  { id: "madrid", name: "Madrid", lon: -3.7038, lat: 40.4168, dir: -1 },
  { id: "newyork", name: "New York", lon: -74.006, lat: 40.7128, dir: 1 },
  { id: "lisbon", name: "Lisbon", lon: -9.1393, lat: 38.7223, dir: -1 },
] as const;
type City = (typeof CITIES)[number];

type Bounded = { name: string; f: ReturnType<typeof world>["countries"][number]; b: [[number, number], [number, number]] };
let bounded: Bounded[] | null = null;
function countryAt(lon: number, lat: number): string | null {
  if (!bounded) bounded = world().countries.map((f) => ({ name: f.properties.name, f, b: geoBounds(f) as Bounded["b"] }));
  for (const c of bounded) {
    const [[w, s], [e, n]] = c.b;
    if (lat < s || lat > n) continue;
    if (w <= e ? lon < w || lon > e : lon < w && lon > e) continue; // bbox (antimeridian-wrapping boxes have w > e)
    if (geoContains(c.f, [lon, lat])) return c.name;
  }
  return null;
}

/** Walk the city's parallel across the ocean; return the first country met after open sea. */
function landfall(c: City): { name: string; lon: number } | null {
  let seenSea = false;
  for (let i = 0; i <= 1800; i++) {
    const lon = c.lon + c.dir * i * 0.1;
    if (lon < -180 || lon > 180) return null;
    const n = countryAt(lon, c.lat);
    if (n === null) seenSea = true;
    else if (seenSea) return { name: n, lon };
  }
  return null;
}

const shortName = (n: string) => (n === "United States of America" ? "the United States" : n);
const lonLabel = (lon: number) => `${Math.abs(lon).toFixed(0)}°${lon < 0 ? "W" : "E"}`;

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [sel, setSel] = useState<City | null>(null);
  const projection = useMemo(
    () => geoEquirectangular().scale(204).center([-35, 46]).translate([W / 2, H / 2]),
    [],
  );
  const lands = useMemo(() => Object.fromEntries(CITIES.map((c) => [c.id, landfall(c)])), []);
  const hit = sel ? lands[sel.id] : null;
  return (
    <div>
      <WorldMap
        projection={projection}
        width={W}
        height={H}
        label={
          sel && hit
            ? `Equirectangular map of the North Atlantic. The parallel of ${sel.name}, ${sel.lat.toFixed(1)} degrees, first meets ${hit.name} across the ocean.`
            : "Equirectangular map of the North Atlantic with four cities marked."
        }
      >
        {({ projection: proj }) => (
          <>
            {sel && hit && (() => {
              const a = proj([sel.lon, sel.lat]);
              const b = proj([hit.lon, sel.lat]);
              return a && b ? (
                <>
                  <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="var(--bad)" strokeWidth={1.4} strokeDasharray="4 2" />
                  <circle cx={b[0]} cy={b[1]} r={3.5} fill="var(--bad)" stroke="var(--fg)" strokeWidth={0.8} />
                </>
              ) : null;
            })()}
            {CITIES.map((c) => {
              const p = proj([c.lon, c.lat]);
              if (!p) return null;
              return (
                <g key={c.id}>
                  <circle cx={p[0]} cy={p[1]} r={sel?.id === c.id ? 3.6 : 2.6} fill="var(--fg)" />
                  <text x={p[0] + 5} y={p[1] + (c.id === "lisbon" || c.id === "newyork" ? 11 : -4)} fontSize={8.5} fill="var(--fg)">
                    {c.name}
                  </text>
                </g>
              );
            })}
          </>
        )}
      </WorldMap>
      <p className="muted tiny">Equirectangular map: each city&rsquo;s latitude is a level line. Pick a city.</p>
      <Row>
        {CITIES.map((c) => (
          <Control
            key={c.id}
            disabled={locked}
            className={sel?.id === c.id ? "active" : ""}
            onClick={() => {
              setSel(c);
              reach(c.id);
            }}
          >
            {c.name}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout
          label={sel ? `${sel.name} ${sel.lat.toFixed(1)}°N, across the Atlantic` : "Across the Atlantic"}
          value={locked || !sel || !hit ? "?" : `${shortName(hit.name)}, ${lonLabel(hit.lon)}`}
        />
      </Row>
    </div>
  );
}

export default function DueWestFromLondon({ slug }: { slug: string }) {
  const london = CITIES[0];
  const lands = useMemo(() => Object.fromEntries(CITIES.map((c) => [c.id, landfall(c)])), []);
  const L = lands.london?.name ?? "";
  const M = lands.madrid?.name ?? "";
  const N = lands.newyork?.name ?? "";
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a flight from London (${london.lat.toFixed(1)}°N), the pilot holds due west along its latitude across the whole Atlantic. Which country's coast do you reach on the far side?`,
        options: ["The United States", "Canada", "Greenland"],
        answer: 1,
      }}
      exploreHint="Try London, Madrid and New York, and see where each latitude line lands."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            London&rsquo;s line reaches {L}. Madrid&rsquo;s reaches {shortName(M)}, and New York&rsquo;s, run eastward,
            reaches {N}. So London lines up with Canada, and the big American cities line up with Spain and Portugal.
          </p>
          <p>
            Europe sits much further north than it feels. (On this coarse map the line from London clears Britain
            and then meets open sea; real Ireland touches that latitude, so the stage skips it.)
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
