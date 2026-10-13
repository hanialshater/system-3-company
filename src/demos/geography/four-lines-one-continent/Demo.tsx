"use client";

// Geography: which continent is crossed by the equator, both tropics and the prime meridian.
// Each line is walked in 0.1 degree steps through the kit's 1:110m country polygons (crossings()); the
// countries met are assigned to continents by the explicit CONTINENT table below (a convention, and only
// countries that a line actually crosses are listed; the node check confirmed none is missing).
// The counts on the stage and in the reveal come from crossings(). Key state: all six continents checked.

import { useMemo, useState } from "react";
import { geoBounds } from "d3-geo";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { WorldMap, country, geoContains, geoEquirectangular, world } from "@/kit/geo";

const W = 320;
const H = 160;
const TROPIC = 23.4366;
const LINES = ["Equator", "Tropic of Cancer", "Tropic of Capricorn", "Prime meridian"] as const;
type LineName = (typeof LINES)[number];
const SHORT_LINE: Record<LineName, string> = {
  Equator: "equator",
  "Tropic of Cancer": "Cancer",
  "Tropic of Capricorn": "Capricorn",
  "Prime meridian": "prime meridian",
};
const CONTINENTS = ["Africa", "Asia", "Europe", "North America", "South America", "Australia"] as const;
type Continent = (typeof CONTINENTS)[number];
const MILESTONES = ["all-six"] as const;

const CONTINENT: Record<string, Continent | "Antarctica"> = {
  Morocco: "Africa", "W. Sahara": "Africa", Mauritania: "Africa", Mali: "Africa", Algeria: "Africa", Niger: "Africa",
  Libya: "Africa", Egypt: "Africa", Gabon: "Africa", Congo: "Africa", "Dem. Rep. Congo": "Africa", Uganda: "Africa",
  Kenya: "Africa", Somalia: "Africa", Namibia: "Africa", Botswana: "Africa", "South Africa": "Africa",
  Mozambique: "Africa", Madagascar: "Africa", Ghana: "Africa", Togo: "Africa", "Burkina Faso": "Africa",
  "Saudi Arabia": "Asia", "United Arab Emirates": "Asia", Oman: "Asia", India: "Asia", Bangladesh: "Asia",
  Myanmar: "Asia", China: "Asia", Taiwan: "Asia", Indonesia: "Asia",
  Spain: "Europe", France: "Europe", "United Kingdom": "Europe",
  Mexico: "North America",
  Ecuador: "South America", Colombia: "South America", Brazil: "South America", Chile: "South America",
  Argentina: "South America", Paraguay: "South America",
  Australia: "Australia", Antarctica: "Antarctica",
};

type Bounded = { name: string; f: ReturnType<typeof world>["countries"][number]; b: [[number, number], [number, number]] };
let bounded: Bounded[] | null = null;
function countryAt(lon: number, lat: number): string | null {
  if (!bounded) bounded = world().countries.map((f) => ({ name: f.properties.name, f, b: geoBounds(f) as Bounded["b"] }));
  for (const c of bounded) {
    const [[w, s], [e, n]] = c.b;
    if (lat < s || lat > n) continue;
    if (w <= e ? lon < w || lon > e : lon < w && lon > e) continue;
    if (geoContains(c.f, [lon, lat])) return c.name;
  }
  return null;
}

/** For each line, the set of countries it crosses in the 1:110m data. */
function crossings(): Record<LineName, string[]> {
  const out: Record<LineName, string[]> = { Equator: [], "Tropic of Cancer": [], "Tropic of Capricorn": [], "Prime meridian": [] };
  const add = (k: LineName, n: string | null) => {
    if (n && !out[k].includes(n)) out[k].push(n);
  };
  for (let lon = -180; lon <= 180; lon += 0.1) {
    add("Equator", countryAt(lon, 0));
    add("Tropic of Cancer", countryAt(lon, TROPIC));
    add("Tropic of Capricorn", countryAt(lon, -TROPIC));
  }
  for (let lat = -90; lat <= 90; lat += 0.1) add("Prime meridian", countryAt(0, lat));
  return out;
}

/** A parallel as points every 5 degrees (a 2-point line would be drawn as a great-circle arc). */
const parallel = (lat: number) => Array.from({ length: 73 }, (_, i) => [-180 + i * 5, lat] as [number, number]);

function summarise(c: Continent, cr: Record<LineName, string[]>) {
  const lines = LINES.filter((l) => cr[l].some((n) => CONTINENT[n] === c));
  const countries = Array.from(new Set(LINES.flatMap((l) => cr[l]).filter((n) => CONTINENT[n] === c)));
  return { lines, countries };
}

function Stage({ locked, reach, cr }: { locked: boolean; reach: (n: string) => void; cr: Record<LineName, string[]> }) {
  const [sel, setSel] = useState<Continent | null>(null);
  const [seen, setSeen] = useState<Continent[]>([]);
  const projection = useMemo(() => geoEquirectangular().fitSize([W, H], { type: "Sphere" }), []);
  const info = sel ? summarise(sel, cr) : null;
  const press = (c: Continent) => {
    setSel(c);
    const next = seen.includes(c) ? seen : [...seen, c];
    setSeen(next);
    if (next.length === CONTINENTS.length) reach("all-six");
  };
  const marks: [string, [number, number][], number, number][] = [
    ["Equator", parallel(0), 3, -3],
    ["Tropic of Cancer", parallel(TROPIC), 3, -3],
    ["Tropic of Capricorn", parallel(-TROPIC), 3, 9],
  ];
  return (
    <div>
      <WorldMap
        projection={projection}
        width={W}
        height={H}
        label={sel && info ? `World map, equirectangular. ${sel} is crossed by ${info.lines.length} of the four lines: ${info.lines.join(", ") || "none"}.` : "World map, equirectangular, with the equator, both tropics and the prime meridian drawn."}
      >
        {({ path, projection: proj }) => (
          <>
            {info &&
              info.countries.map((n) => {
                const f = country(n);
                return f ? <path key={n} d={path(f)} fill="var(--domain)" fillOpacity={0.95} stroke="var(--fg)" strokeWidth={0.4} /> : null;
              })}
            {marks.map(([name, pts]) => (
              <path key={name} d={path({ type: "LineString", coordinates: pts })} fill="none" stroke="var(--bad)" strokeWidth={0.9} />
            ))}
            <path d={path({ type: "LineString", coordinates: Array.from({ length: 37 }, (_, i) => [0, -90 + i * 5] as [number, number]) })} fill="none" stroke="var(--bad)" strokeWidth={0.9} />
            {marks.map(([name, pts, dx, dy]) => {
              const p = proj(pts[0]);
              return p ? (
                <text key={name} x={p[0] + dx} y={p[1] + dy} fontSize={7.5} fill="var(--fg)">
                  {name}
                </text>
              ) : null;
            })}
            {(() => {
              const p = proj([0, 84]);
              return p ? (
                <text x={p[0] + 3} y={p[1]} fontSize={7.5} fill="var(--fg)">
                  Prime meridian
                </text>
              ) : null;
            })()}
          </>
        )}
      </WorldMap>
      <p className="muted tiny">Equirectangular map. Red: the four lines. Tap a continent to light up the countries on them.</p>
      <Row>
        {CONTINENTS.map((c) => (
          <Control key={c} disabled={locked} className={sel === c ? "active" : ""} onClick={() => press(c)}>
            {c}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout
          label={sel ? `${sel}: lines crossed` : "Lines crossed"}
          value={locked || !info ? "?" : `${info.lines.length} of 4${info.lines.length ? ": " + info.lines.map((l) => SHORT_LINE[l]).join(", ") : ""}`}
        />
      </Row>
    </div>
  );
}

export default function FourLinesOneContinent({ slug }: { slug: string }) {
  const cr = useMemo(() => crossings(), []);
  const counts = CONTINENTS.map((c) => ({ c, n: summarise(c, cr).lines.length }));
  const africa = counts.find((x) => x.c === "Africa")!.n;
  const two = counts.filter((x) => x.n === 2).map((x) => x.c);
  const one = counts.filter((x) => x.n === 1).map((x) => x.c);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "The equator, the Tropic of Cancer, the Tropic of Capricorn and the prime meridian: which continent do all four cross?",
        options: ["Asia", "Africa", "South America"],
        answer: 1,
      }}
      exploreHint="Tap each continent and count which red lines run through its countries."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Africa: {africa} of 4. {two.join(" and ")} meet two each; {one.join(", ")} meet one. Of these six, only Africa lies
            across the equator, both tropics and the prime meridian.
          </p>
          <p>
            Continents here follow the lesson&rsquo;s own country list, a convention, and the lines are tested against a coarse
            map.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} cr={cr} />}
        </Milestones>
      )}
    </Lesson>
  );
}
