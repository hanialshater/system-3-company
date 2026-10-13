"use client";

// A toy, not a plate model: South America (its 1:110m country shapes) slides due west, away from
// Africa, at a steady 2.5 cm a year. Time steps add millions of years; the shape is rotated about
// the Earth's axis so that the shift is (rate x time) km measured along 10 degrees S. A dashed
// ghost stays at today's position, so the strip between them is new ocean.
// Map: Equal Earth centred on 30 W.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { EARTH_RADIUS_KM, geoEqualEarth, geoGraticule10, geoPath, geoRotation, mapFeature, world, type CountryFeature } from "@/kit/geo";
import s from "./styles.module.css";

type Pt = [number, number];
const W = 320;
const H = 170;
const RATE_CM_YR = 2.5;
const TARGET_KM = 3000;
const MAX_MYR = 150;
const REF_LAT = 10; // degrees S, where the shift is measured
const STEPS = [100, 20, 5];
const SA = new Set([
  "Argentina", "Chile", "Falkland Is.", "Uruguay", "Brazil", "Bolivia", "Peru", "Colombia",
  "Venezuela", "Guyana", "Suriname", "Ecuador", "Paraguay", "Trinidad and Tobago",
]);
const rad = Math.PI / 180;

// km of new ocean after `myr` million years: cm/yr x years / 100,000 cm per km.
const gapKm = (myr: number) => (RATE_CM_YR * myr * 1e6) / 1e5;
const TARGET_MYR = (TARGET_KM * 1e5) / RATE_CM_YR / 1e6;
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

function southAmerica(): CountryFeature[] {
  const out: CountryFeature[] = [];
  for (const c of world().countries) {
    if (SA.has(c.properties.name)) out.push(c);
    else if (c.properties.name === "France" && c.geometry.type === "MultiPolygon") {
      // French Guiana is the part of the France shape in South America.
      const part = c.geometry.coordinates.filter((p) => p[0][0][0] < -40);
      if (part.length) out.push({ ...c, geometry: { type: "MultiPolygon", coordinates: part } });
    }
  }
  return out;
}

export default function FingernailOcean({ slug }: { slug: string }) {
  const [myr, setMyr] = useState(0);
  const projection = useMemo(() => geoEqualEarth().rotate([30, 0]).fitSize([W, H], { type: "Sphere" }), []);
  const path = useMemo(() => {
    const g = geoPath(projection);
    return (o: Parameters<typeof g>[0]) => g(o) ?? "";
  }, [projection]);
  const sa = useMemo(southAmerica, []);
  const others = useMemo(() => world().countries.filter((c) => !SA.has(c.properties.name)), []);
  const km = gapKm(myr);
  const shiftDeg = km / (EARTH_RADIUS_KM * Math.cos(REF_LAT * rad)) / rad;
  const moved = useMemo(() => {
    const r = geoRotation([-shiftDeg, 0]);
    return sa.map((c) => mapFeature(c, (p) => r(p) as Pt));
  }, [sa, shiftDeg]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Plates move about 2.5 cm a year, the same order as fingernail growth (about 4 cm a year). How long to widen an ocean by 3,000 km?",
        options: ["12 million years", "120 million years", "1.2 billion years"],
        answer: 1,
      }}
      exploreHint="Add time until South America has moved 3,000 km."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            <strong>{fmt(TARGET_MYR)} million years.</strong> 3,000 km is 300 million cm. At {RATE_CM_YR} cm a year that
            takes {fmt(TARGET_MYR)} million years. Each million years adds only {fmt(gapKm(1))} km of new ocean.
          </p>
          <p>
            A speed you could never see in a lifetime, about 2 metres in one, becomes an ocean once geological time
            multiplies it. Real spreading in the Atlantic varies along the ridge and over time, about 2 to 4 cm a year;
            this stage is a toy that slides one continent due west at an average rate.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ocean"]}>
          {(reach) => {
            const go = (v: number) => {
              setMyr(v);
              if (gapKm(v) >= TARGET_KM) reach("ocean");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="stage-svg"
                  role="img"
                  aria-label={`World map, Equal Earth projection. After ${myr} million years South America has moved ${fmt(km)} km west.`}
                >
                  <path d={path({ type: "Sphere" })} className={s.sphere} />
                  <path d={path(geoGraticule10())} className={s.grat} />
                  {others.map((c, i) => (
                    <path key={i} d={path(c)} className={s.land} />
                  ))}
                  {sa.map((c, i) => (
                    <path key={`g${i}`} d={path(c)} className={s.ghost} />
                  ))}
                  {moved.map((c, i) => (
                    <path key={`m${i}`} d={path(c)} className={s.moved} />
                  ))}
                </svg>
                <p className="muted tiny">Equal Earth. Toy: South America slides due west at 2.5 cm a year. Dashed: today.</p>
                <div className={s.chips} role="group" aria-label="Add time">
                  {STEPS.map((st) => (
                    <Control key={st} disabled={locked || myr + st > MAX_MYR} onClick={() => go(myr + st)}>
                      +{st} million years
                    </Control>
                  ))}
                  <Control disabled={locked || myr === 0} onClick={() => go(0)}>
                    Back to today
                  </Control>
                </div>
                <Row>
                  <Readout label="Time" value={`${myr} million years`} />
                  <Readout label="New ocean" value={locked ? "?" : `${fmt(km)} km`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
