"use client";

// A top-down view of Earth's orbit, drawn to scale (it is almost a circle). The learner drags the
// date; readouts give the Sun's distance and where the noon Sun is overhead. Distance bottoms out
// in early January, northern winter, so distance cannot be what makes the seasons.
// Model: Kepler ellipse, a = 149.598 million km, e = 0.0167, perihelion on 3 January; obliquity 23.44°.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const A = 149.598; // million km (1 AU)
const E = 0.0167;
const PERI_DAY = 3; // 3 January
const OBL = 23.44;
const L_PERI = 282.94; // Sun's ecliptic longitude at perihelion, degrees
const rad = Math.PI / 180;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MLEN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function dateOf(day: number) {
  let d = day;
  for (let m = 0; m < 12; m++) {
    if (d <= MLEN[m]) return { m, d };
    d -= MLEN[m];
  }
  return { m: 11, d: 31 };
}
const dayOf = (m: number, d: number) => MLEN.slice(0, m).reduce((x, y) => x + y, 0) + d;
const label = (day: number) => {
  const { m, d } = dateOf(day);
  return `${d} ${MONTHS[m]}`;
};

function orbit(day: number) {
  const M = (2 * Math.PI * (day - PERI_DAY)) / 365.25;
  let Ea = M;
  for (let i = 0; i < 8; i++) Ea -= (Ea - E * Math.sin(Ea) - M) / (1 - E * Math.cos(Ea));
  const r = A * (1 - E * Math.cos(Ea));
  const nu = 2 * Math.atan2(Math.sqrt(1 + E) * Math.sin(Ea / 2), Math.sqrt(1 - E) * Math.cos(Ea / 2));
  const sunLon = nu / rad + L_PERI; // Sun's ecliptic longitude seen from Earth
  const dec = Math.asin(Math.sin(OBL * rad) * Math.sin(sunLon * rad)) / rad;
  return { r, earthLon: sunLon + 180, dec };
}

const DAYS = Array.from({ length: 365 }, (_, i) => i + 1);
const EXT = (() => {
  let min = { r: Infinity, day: 1 };
  let max = { r: 0, day: 1 };
  for (const d of DAYS) {
    const { r } = orbit(d);
    if (r < min.r) min = { r, day: d };
    if (r > max.r) max = { r, day: d };
  }
  return { min, max };
})();

function season(day: number, north: boolean) {
  // Everyday (meteorological) seasons, whole months: Mar-May spring, Jun-Aug summer, Sep-Nov autumn, Dec-Feb winter.
  const m = dateOf(day).m;
  const n = m >= 2 && m <= 4 ? "spring" : m >= 5 && m <= 7 ? "summer" : m >= 8 && m <= 10 ? "autumn" : "winter";
  if (north) return n;
  return { spring: "autumn", summer: "winter", autumn: "spring", winter: "summer" }[n];
}

const W = 320;
const H = 268;
const CX = 160;
const CY = 122;
const K = 100 / A; // px per million km: the orbit is drawn to scale

const pos = (day: number) => {
  const o = orbit(day);
  return [CX + o.r * K * Math.cos(o.earthLon * rad), CY - o.r * K * Math.sin(o.earthLon * rad)] as const;
};

export default function CloserInWinter({ slug }: { slug: string }) {
  const [day, setDay] = useState(dayOf(2, 21));
  const [seen, setSeen] = useState({ jan: false, jul: false });
  const o = orbit(day);
  const [ex, ey] = pos(day);
  const ring = useMemo(() => DAYS.map((d) => pos(d).map((v) => v.toFixed(1)).join(",")).join(" "), []);
  const fmtMkm = (r: number) => `${r.toFixed(1)} million km`;

  const go = (d: number, interact: () => void) => {
    setDay(d);
    const m = dateOf(d).m;
    const next = { jan: seen.jan || m === 0, jul: seen.jul || m === 6 };
    if (next.jan !== seen.jan || next.jul !== seen.jul) {
      setSeen(next);
      interact();
    }
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In which month is the Earth closest to the Sun?",
        options: ["January", "June", "September"],
        answer: 0,
      }}
      exploreHint="Tap 1 Jan, 1 Jun, 1 Jul and 1 Sep, or drag the date. Watch the distance, the lean and the seasons."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The Earth is closest in <strong>early January</strong> ({fmtMkm(EXT.min.r)}) and farthest in early July (
            {fmtMkm(EXT.max.r)}). That is only about{" "}
            {Math.round(((EXT.max.r - EXT.min.r) / A) * 100)}% different, and the closest point falls in northern winter
            and southern summer.
          </p>
          <p>
            So distance cannot make the seasons: the two hemispheres have opposite seasons at the same distance. The cause
            is the <strong>tilt</strong> of about {OBL.toFixed(1)}°. In June the north leans toward the Sun, as the arrow
            showed, and the noon Sun is overhead far north of the equator. In December it is the south&rsquo;s turn.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`Earth's orbit seen from above the north pole, to scale. ${label(day)}: ${fmtMkm(o.r)} from the Sun.`}>
            <polygon points={ring} className={s.orbit} />
            <circle cx={CX} cy={CY} r={11} className={s.sun} />
            <text x={CX} y={CY + 24} className={s.label} textAnchor="middle">
              Sun
            </text>
            <line x1={CX} y1={CY} x2={ex} y2={ey} className={s.ray} />
            <circle cx={ex} cy={ey} r={6} className={s.earth} />
            <line x1={ex} y1={ey} x2={ex} y2={ey - 24} className={s.axis} markerEnd="url(#cw-arrow)" />
            <text x={6} y={H - 17} className={s.small}>
              Arrow: the north pole leans up the page all year.
            </text>
            <defs>
              <marker id="cw-arrow" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,0 L6,3 L0,6 z" className={s.head} />
              </marker>
            </defs>
            <text x={6} y={H - 6} className={s.small}>
              Orbit drawn to scale. Earth not to scale.
            </text>
          </svg>
          <Row>
            <Slider
              label="Date"
              value={day}
              min={1}
              max={365}
              disabled={locked}
              format={label}
              onChange={(v) => go(v, interact)}
            />
          </Row>
          <div className={s.chips} role="group" aria-label="Jump to a month">
            {[0, 5, 6, 8].map((m) => (
              <Control key={m} disabled={locked || dateOf(day).m === m && dateOf(day).d === 1} onClick={() => go(dayOf(m, 1), interact)}>
                1 {MONTHS[m]}
              </Control>
            ))}
          </div>
          <Row>
            <Readout label="Sun distance" value={fmtMkm(o.r)} />
            <Readout label="vs closest day" value={`+${(((o.r - EXT.min.r) / EXT.min.r) * 100).toFixed(1)}%`} />
          </Row>
          <Row>
            <Readout label="Noon Sun straight overhead" value={`${Math.abs(o.dec).toFixed(1)}° ${o.dec >= 0 ? "north" : "south"} of the equator`} />
          </Row>
          <p className={s.msg}>
            North: {season(day, true)} · South: {season(day, false)}
          </p>
          <p className={s.small2}>{o.dec > 5 ? "The north leans toward the Sun." : o.dec < -5 ? "The south leans toward the Sun." : "Neither half leans toward the Sun."}</p>
        </div>
      )}
    </Lesson>
  );
}
