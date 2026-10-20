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
const MAX_MYR = 300;
const REF_LAT = 10; // degrees S, where the shift is measured
// Powers of ten, so no single press or pair of presses lands on one option more than another.
const STEPS = [1, 10, 100];
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
  // Recorded when the 3,000 km milestone fires; Reset ("Back to today") does not clear it.
  const [seen, setSeen] = useState<{ myr: number; km: number } | null>(null);
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
        question: "Check your fingernails, then think of the ground under you. Plates move about 2.5 cm a year, the same order as fingernail growth (about 4 cm a year). How long to widen an ocean by 3,000 km?",
        options: ["12 million years", "120 million years", "1.2 billion years"],
        answer: 1,
      }}
      exploreHint="Run time until South America has moved exactly 3,000 km, then add or reset."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            <strong>{fmt(TARGET_MYR)} million years.</strong> You saw it, and the Seen line keeps it: {fmt(seen?.myr ?? TARGET_MYR)} million years made{" "}
            {fmt(seen?.km ?? TARGET_KM)} km of new ocean. 3,000 km is 300 million cm, and at {RATE_CM_YR} cm a year each
            million years adds only {fmt(gapKm(1))} km, the rate under the map.
          </p>
          <p>
            A speed you could never see in a lifetime, about 2 metres in one, becomes an ocean once geological time
            multiplies it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ocean"]}>
          {(reach) => {
            const go = (v: number) => {
              setMyr(v);
              // Exactly the question's case, so the readout showed the recorded 3,000 km.
              if (v === TARGET_MYR) {
                setSeen({ myr: v, km: gapKm(v) });
                reach("ocean");
              }
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
                <p className="muted tiny">
                  {/* r8: the km-per-million-years conversion is the step the question tests, so it appears only after the commit. */}
                  Toy: South America rides its plate west at {RATE_CM_YR} cm a year
                  {locked ? "" : ` = ${fmt(gapKm(1))} km per million years`}. Dashed: today.
                </p>
                <div className={s.chips} role="group" aria-label="Add time">
                  <Control disabled={locked || myr === TARGET_MYR} onClick={() => go(TARGET_MYR)}>
                    Run to {fmt(TARGET_KM)} km
                  </Control>
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
                <p className="tiny" data-testid="seen">
                  Seen: {seen ? `${fmt(seen.myr)} million years → ${fmt(seen.km)} km of new ocean` : "nothing yet"}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
