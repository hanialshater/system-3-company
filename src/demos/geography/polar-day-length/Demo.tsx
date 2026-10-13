"use client";

// Geography: how long the Sun stays above the horizon at the North Pole. Earth's orbit is a Kepler
// ellipse (e = 0.016709, perihelion at ecliptic longitude 283 deg); the Sun's declination follows from its
// longitude, and the pole is in daylight while the declination is above 0 (geometric, no refraction).
// The day counts, the drawn terminator and the reveal's numbers all come from the same solar() model.
// Key state: the learner has run from the March equinox to the September equinox and on to the next March.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { WorldMap, geoCircle, geoOrthographic } from "@/kit/geo";

const W = 320;
const H = 200;
const RAD = Math.PI / 180;
const ECC = 0.016709;
const YEAR = 365.2564;
const PERI = 283 * RAD;
const EPS = 23.44 * RAD;
const MILESTONES = ["sunlit-half", "whole-year"] as const;

/** Sun's ecliptic longitude (radians, unwrapped) t days after perihelion. */
function sunLon(t: number) {
  const M = (2 * Math.PI * t) / YEAR;
  const k = Math.floor(M / (2 * Math.PI));
  const Mw = M - 2 * Math.PI * k;
  let E = Mw;
  for (let i = 0; i < 12; i++) E = Mw + ECC * Math.sin(E);
  let nu = 2 * Math.atan2(Math.sqrt(1 + ECC) * Math.sin(E / 2), Math.sqrt(1 - ECC) * Math.cos(E / 2));
  if (nu < 0) nu += 2 * Math.PI;
  return nu + 2 * Math.PI * k + PERI;
}
function crossing(target: number) {
  const goal = target + 2 * Math.PI * Math.max(0, Math.ceil((sunLon(0) - target) / (2 * Math.PI)));
  let lo = 0;
  let hi = YEAR * 2;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (sunLon(mid) < goal) lo = mid;
    else hi = mid;
  }
  return lo;
}
const T_MARCH = crossing(0);
const T_SEPT = crossing(Math.PI);
/** Days from the March equinox to the September equinox (the Sun is north of the equator). */
const NORTH_DAYS = T_SEPT - T_MARCH;
const SOUTH_DAYS = YEAR - NORTH_DAYS;
const declination = (tau: number) => Math.asin(Math.sin(EPS) * Math.sin(sunLon(T_MARCH + tau))) / RAD;

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [tau, setTau] = useState(0);
  const projection = useMemo(() => geoOrthographic().rotate([0, -90]).scale(86).translate([W / 2, H / 2]).clipAngle(90), []);
  const dec = declination(tau);
  const night = useMemo(() => geoCircle().center([180, -dec]).radius(90)(), [dec]);
  const sunlit = Math.min(tau, NORTH_DAYS);
  const dark = Math.max(0, tau - NORTH_DAYS);
  const go = (v: number) => {
    setTau(v);
    if (v >= NORTH_DAYS - 0.5) reach("sunlit-half");
    if (v >= YEAR - 1) reach("whole-year");
  };
  const poleLit = dec > 0;
  return (
    <div>
      <WorldMap
        projection={projection}
        width={W}
        height={H}
        label={`North Pole seen from above, ${Math.round(tau)} days after the March equinox. The Sun's declination is ${dec.toFixed(1)} degrees, so the pole is ${poleLit ? "in daylight" : "in darkness"}.`}
      >
        {({ path }) => {
          const pole = projection([0, 90]);
          return (
            <>
              <path d={path(night)} fill="#0b1d3a" fillOpacity={0.6} stroke="none" />
              {pole && <circle cx={pole[0]} cy={pole[1]} r={3.5} fill={poleLit ? "#f5b301" : "var(--bad)"} stroke="var(--fg)" strokeWidth={0.8} />}
            </>
          );
        }}
      </WorldMap>
      <p className="muted tiny">North Pole seen from above, with day-length model. Shaded: night. Dot: the pole.</p>
      <Row>
        <Control disabled={locked} onClick={() => go(NORTH_DAYS)}>
          Run to September equinox
        </Control>
        <Control disabled={locked} onClick={() => go(YEAR)}>
          Run to next March equinox
        </Control>
      </Row>
      <Row>
        <Slider label="Days since March equinox" value={Math.round(tau)} min={0} max={365} disabled={locked} onChange={go} />
      </Row>
      <Row>
        <Readout label="Days of Sun at the pole" value={locked ? "?" : Math.round(sunlit)} />
        <Readout label="Days of dark" value={locked ? "?" : Math.round(dark)} />
      </Row>
    </div>
  );
}

export default function PolarDayLength({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "At the North Pole the Sun rises once a year and sets once a year. Is it above the horizon for exactly half the year?",
        options: ["A few days less than half", "Exactly half the year", "A few days more than half"],
        answer: 2,
      }}
      exploreHint="Run to the September equinox, then on to the next March equinox."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            A few days more. The Sun stayed up {Math.round(NORTH_DAYS)} days and was down {Math.round(SOUTH_DAYS)}: the
            summer half is {(NORTH_DAYS - SOUTH_DAYS).toFixed(1)} days longer.
          </p>
          <p>
            Earth is farthest from the Sun in early July and moves slowest there, so the March-to-September half takes
            longer. Counting light bent by air and the Sun&rsquo;s width, the polar day is about 190 days.
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
