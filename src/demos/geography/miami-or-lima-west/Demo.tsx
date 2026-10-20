"use client";

// Geography: which of Miami and Lima is further west. A meridian (north-south line of longitude) is
// placed on an equirectangular map of the Americas; the countries it crosses are found by walking it in
// 0.1 degree steps through the kit's 1:110m polygons (crossed()). The longitudes in the question,
// the line and the reveal all come from the CITY constants below.
// Key state: the meridian has been put through Miami and through Lima.

import { useMemo, useState } from "react";
import { geoBounds } from "d3-geo";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { WorldMap, geoContains, geoEquirectangular, world } from "@/kit/geo";

const W = 320;
const H = 190;
const MIAMI = { name: "Miami", lon: -80.1918, lat: 25.7617 };
const LIMA = { name: "Lima", lon: -77.0428, lat: -12.0464 };
const MILESTONES = ["miami", "lima"] as const;

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
const SHORT: Record<string, string> = { "United States of America": "the United States" };
/** Countries met, north to south, between 30°N and 18°S along a meridian. */
function crossed(lon: number): string[] {
  const out: string[] = [];
  for (let lat = 30; lat >= -18; lat -= 0.1) {
    const n = countryAt(lon, lat);
    if (n) {
      const s = SHORT[n] ?? n;
      if (!out.includes(s)) out.push(s);
    }
  }
  return out;
}
const west = (lon: number) => `${Math.abs(lon).toFixed(1)}°${lon < 0 ? "W" : "E"}`;

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [lon, setLon] = useState<number | null>(null);
  const projection = useMemo(() => geoEquirectangular().scale(250).center([-73, 6]).translate([W / 2, H / 2]), []);
  const list = useMemo(() => (lon === null ? [] : crossed(lon)), [lon]);
  const set = (v: number) => {
    setLon(v);
    if (Math.abs(v - MIAMI.lon) < 0.06) reach("miami");
    if (Math.abs(v - LIMA.lon) < 0.06) reach("lima");
  };
  return (
    <div>
      <WorldMap
        projection={projection}
        width={W}
        height={H}
        label={lon === null ? locked ? "Equirectangular map of the Americas." : "Equirectangular map of the Americas with Miami and Lima marked." : `Equirectangular map of the Americas. The meridian ${west(lon)} crosses ${list.join(", ")}.`}
      >
        {({ projection: proj }) => {
          const m = proj([MIAMI.lon, MIAMI.lat]);
          const l = proj([LIMA.lon, LIMA.lat]);
          const x = lon === null ? null : proj([lon, 0]);
          return (
            <>
              {x && <line x1={x[0]} y1={0} x2={x[0]} y2={H} stroke="var(--bad)" strokeWidth={1.6} />}
              {m && !locked && (
                <g>
                  <circle cx={m[0]} cy={m[1]} r={3.5} fill="var(--fg)" />
                  <text x={m[0] - 6} y={m[1] + 3} textAnchor="end" fontSize={9.5} fill="var(--fg)">
                    Miami
                  </text>
                </g>
              )}
              {l && !locked && (
                <g>
                  <circle cx={l[0]} cy={l[1]} r={3.5} fill="var(--fg)" />
                  <text x={l[0] + 6} y={l[1] + 3} fontSize={9.5} fill="var(--fg)">
                    Lima
                  </text>
                </g>
              )}
            </>
          );
        }}
      </WorldMap>
      <p className="muted tiny">Equirectangular map. Red line: a meridian, one longitude, running north to south.</p>
      <Row>
        <Control disabled={locked} className={lon !== null && Math.abs(lon - MIAMI.lon) < 0.06 ? "active" : ""} onClick={() => set(MIAMI.lon)}>
          Line through Miami
        </Control>
        <Control disabled={locked} className={lon !== null && Math.abs(lon - LIMA.lon) < 0.06 ? "active" : ""} onClick={() => set(LIMA.lon)}>
          Line through Lima
        </Control>
      </Row>
      <Row>
        <Slider label="Longitude of the line" value={lon ?? -75} min={-90} max={-65} step={0.1} disabled={locked} format={(v) => west(v)} onChange={set} />
      </Row>
      <Row>
        <Readout label="Line crosses, north to south" value={locked || lon === null ? "?" : list.join(", ")} />
      </Row>
    </div>
  );
}

export default function MiamiOrLimaWest({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Booking a flight from Miami to Lima, you recall that Peru faces the Pacific and Florida faces the Atlantic. Which city is further west, Miami or Lima?",
        options: ["Lima", "Miami", "They share a meridian"],
        answer: 1,
      }}
      exploreHint="Put the line through Miami, then through Lima, and see which side Lima falls on."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Miami, by {(Math.abs(MIAMI.lon) - Math.abs(LIMA.lon)).toFixed(1)}°: it sits at {west(MIAMI.lon)} and Lima at{" "}
            {west(LIMA.lon)}. Miami&rsquo;s line runs south through {crossed(MIAMI.lon).slice(1).join(", ")}, well west of
            Lima.
          </p>
          <p>
            Apart from the coastal tips of Ecuador and Peru, South America lies east of Miami&rsquo;s line, so that line meets it on its Pacific side.
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
