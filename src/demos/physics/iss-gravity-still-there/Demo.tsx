"use client";

// Gravity at the ISS. Earth and orbits drawn to one scale. The learner moves a satellite between
// heights; a bar and a readout show gravity there as a percentage of ground value,
// g(r) / g0 = (R / (R + h))^2 (Newton, spherical Earth; Earth's spin ignored). At 400 km it is 88.5%.
//
// Why astronauts float (free fall) is shown, not told: at ground and ISS height the same picture
// zooms in (still to scale) so the ISS orbit clears the Earth visibly. The learner throws a ball
// sideways from 400 km at 3, 7 or 7.67 km/s (the circular-orbit speed there) and steps time in
// 3-minute steps. The ball's path is integrated under inverse-square gravity (velocity Verlet,
// 1 s steps, no air): slower throws curve into the ground, 7.67 km/s keeps missing it and its path
// is the station's orbit, so ball and station move together.
//
// Earned reveal: "iss" (at 400 km), "far" (20,200 km or more), "fell-short" (a slow throw landed),
// "orbit-throw" (the 7.67 km/s throw).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const R_KM = 6371;
const GM = 398600.4418; // km^3 / s^2
const ISS_H = 400;
const R0 = R_KM + ISS_H;
const VC = Math.sqrt(GM / R0); // 7.67 km/s
const STOPS = [
  { h: 0, label: "0 km", name: "Ground" },
  { h: ISS_H, label: "400 km", name: "ISS height" },
  { h: 6371, label: "6,371 km", name: "One Earth radius up" },
  { h: 20200, label: "20,200 km", name: "GPS satellites" },
  { h: 35786, label: "35,786 km", name: "Geostationary" },
];
const pct = (h: number) => 100 * (R_KM / (R_KM + h)) ** 2;
const fmtPct = (h: number) => `${pct(h).toFixed(1)}%`;

// MODEL START: a ball thrown sideways from 400 km, inverse-square gravity, no air.
const SPEEDS = [3, 7, VC];
const fmtV = (v: number) => (v === VC ? VC.toFixed(2) : String(v));
const STEP_MIN = 3;
const T_MAX = 93; // minutes; one orbit at 400 km takes 92.4
type Flight = { pts: [number, number][]; landMin: number | null; landKm: number };
function fly(v: number): Flight {
  let x = 0;
  let y = R0;
  let vx = v;
  let vy = 0;
  const pts: [number, number][] = [[x, y]];
  const acc = (px: number, py: number) => {
    const r = Math.hypot(px, py);
    const a = -GM / r ** 3;
    return [a * px, a * py];
  };
  for (let t = 1; t <= T_MAX * 60; t++) {
    const [ax, ay] = acc(x, y);
    x += vx + 0.5 * ax;
    y += vy + 0.5 * ay;
    const [bx, by] = acc(x, y);
    vx += 0.5 * (ax + bx);
    vy += 0.5 * (ay + by);
    if (Math.hypot(x, y) <= R_KM) {
      const k = R_KM / Math.hypot(x, y);
      pts.push([x * k, y * k]);
      return { pts, landMin: t / 60, landKm: R_KM * Math.atan2(x, y) };
    }
    if (t % 10 === 0) pts.push([x, y]);
  }
  return { pts, landMin: null, landKm: 0 };
}
const FLIGHTS = SPEEDS.map(fly);
// MODEL END

const W = 320;
const H = 272;
const CX = 160;
const CY = 125;
const RMAX = 112; // px for the outermost radius drawn
const FAR_KPX = RMAX / (R_KM + 35786); // zoomed out: out to geostationary
const NEAR_KPX = RMAX / R0; // zoomed in: out to the ISS orbit
const GAUGE = 150; // px for 100% (ground value)

export default function IssGravityStillThere({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [throwI, setThrowI] = useState<number | null>(null);
  const [t, setT] = useState(0); // minutes since the throw
  const [seen, setSeen] = useState<{ stops: number[]; throws: number[] }>({ stops: [0], throws: [] });
  const h = STOPS[k].h;
  const near = k <= 1;
  const kpx = near ? NEAR_KPX : FAR_KPX;
  const X = (x: number) => CX + x * kpx;
  const Y = (y: number) => CY - y * kpx;
  // The throw is drawn only at ISS height (the stop it is thrown from).
  const flight = throwI === null || k !== 1 ? null : FLIGHTS[throwI];

  // Station on its circular orbit, starting at the top and moving clockwise.
  const th = (VC * t * 60) / R0;
  const station: [number, number] = near ? [R0 * Math.sin(th), R0 * Math.cos(th)] : [(R_KM + h) * Math.SQRT1_2, (R_KM + h) * Math.SQRT1_2];
  const ballIdx = flight ? Math.min(flight.pts.length - 1, Math.round((t * 60) / 10)) : 0;
  const landed = !!flight && flight.landMin !== null && t >= flight.landMin;
  const ball = flight ? (landed ? flight.pts[flight.pts.length - 1] : flight.pts[ballIdx]) : null;
  const ballText = !flight
    ? "–"
    : flight.landMin === null
      ? `${t} min: still missing`
      : landed
        ? `landed ${Math.round(flight.landKm).toLocaleString("en-US")} km away`
        : `${t} min: falling`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "The ISS orbits about 400 km up. Compared with gravity at the ground, gravity up there is about…",
        options: ["0% (none)", "90%", "50%"],
        answer: 1,
      }}
      exploreHint="Move the satellite to the ISS's height, then much further out. Throw a ball from 400 km, slow and at ISS speed, and step time."
      minInteractions={4}
      reveal={() => {
        const slow = seen.throws.filter((i) => SPEEDS[i] !== VC).map((i) => `${fmtV(SPEEDS[i])} km/s`);
        return (
          <>
            <p>
              At 400 km the gravity bar barely shrank: <strong>{fmtPct(ISS_H)}</strong> of its ground value. Only far out did
              it fade: {fmtPct(20200)} at GPS height, {fmtPct(35786)} at geostationary.
            </p>
            <p>
              {seen.stops.includes(2)
                ? `One Earth radius up you were twice as far from Earth's centre, and gravity read ${fmtPct(6371)}: a quarter.`
                : "Twice as far from Earth's centre, gravity is a quarter."}{" "}
              It weakens with the square of that distance, and 400 km adds only 6% to it.
            </p>
            <p>
              {slow.length ? `Your ${slow.join(" and ")} throw curved down into the ground. ` : ""}
              The {fmtV(VC)} km/s throw fell just as hard but kept missing the ground: its path was the station&apos;s orbit. The
              station and astronauts move at that speed, so they fall together, round and round. That is why they float.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["iss", "far", "fell-short", "orbit-throw"]}>
          {(reach) => {
            const goStop = (i: number) => {
              setK(i);
              setSeen((x) => (x.stops.includes(i) ? x : { ...x, stops: [...x.stops, i] }));
              if (STOPS[i].h === ISS_H) reach("iss");
              if (STOPS[i].h >= 20200) reach("far");
            };
            const doThrow = (i: number) => {
              goStop(1);
              setThrowI(i);
              setT(0);
              setSeen((x) => (x.throws.includes(i) ? x : { ...x, throws: [...x.throws, i] }));
              if (FLIGHTS[i].landMin !== null) reach("fell-short");
              else reach("orbit-throw");
            };
            const tracePath = flight
              ? flight.pts.map(([x, y], j) => `${j ? "L" : "M"}${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ")
              : "";
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`Satellite at ${STOPS[k].label}: gravity ${fmtPct(h)} of ground${flight && throwI !== null ? `; ball thrown at ${fmtV(SPEEDS[throwI])} km/s, ${ballText}` : ""}`}
                >
                  {(near ? STOPS.slice(1, 2) : STOPS.slice(1)).map((st) => (
                    <circle key={st.h} cx={CX} cy={CY} r={(R_KM + st.h) * kpx} className={st.h === h ? s.orbitOn : s.orbit} />
                  ))}
                  <circle cx={CX} cy={CY} r={R_KM * kpx} className={s.earth} />
                  {flight && <path d={tracePath} className={s.trace} />}
                  {k === 0 ? (
                    <circle cx={X(0)} cy={Y(R_KM)} r={4} className={s.sat} />
                  ) : (
                    <rect x={X(station[0]) - 5} y={Y(station[1]) - 5} width={10} height={10} className={s.sat} />
                  )}
                  {ball && <circle cx={X(ball[0])} cy={Y(ball[1])} r={3} className={s.ball} />}
                  <text x={W - 6} y={14} textAnchor="end" className={s.name}>
                    {STOPS[k].name}
                  </text>
                  {k === 1 && !locked && (
                    <text x={6} y={14} className={s.key}>
                      ■ station · ● ball
                    </text>
                  )}
                  <rect x={6} y={H - 30} width={GAUGE} height={12} rx={5} className={s.gaugeBg} />
                  {!locked && <rect x={6} y={H - 30} width={(pct(h) / 100) * GAUGE} height={12} rx={5} className={s.gauge} />}
                  <text x={GAUGE + 12} y={H - 20} className={s.name}>
                    gravity {locked ? "?" : fmtPct(h)}
                  </text>
                  <text x={6} y={H - 6} className={s.chip}>
                    {near ? "Zoomed in, to scale. Round Earth, no air." : "To scale. Round Earth, spin ignored."}
                  </text>
                </svg>

                <Row>
                  <span className={s.rowLabel}>Throw from 400 km</span>
                  {SPEEDS.map((v, i) => (
                    <Control
                      key={i}
                      className={throwI === i && k === 1 ? "active" : ""}
                      disabled={locked || (throwI === i && k === 1 && t === 0)}
                      aria-label={`Throw a ball sideways from 400 km at ${fmtV(v)} km/s`}
                      onClick={() => doThrow(i)}
                    >
                      {fmtV(v)} km/s{v === VC ? " (ISS)" : ""}
                    </Control>
                  ))}
                  <Control
                    disabled={locked || !flight || t >= T_MAX || landed}
                    aria-label={`Step time ${STEP_MIN} minutes`}
                    onClick={() => setT((x) => Math.min(T_MAX, x + STEP_MIN))}
                  >
                    +{STEP_MIN} min
                  </Control>
                </Row>
                <Row>
                  {STOPS.map((st, i) => (
                    <Control key={st.h} className={i === k ? "active" : ""} disabled={locked || i === k} onClick={() => goStop(i)}>
                      {st.label}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Gravity vs ground" value={locked ? "?" : fmtPct(h)} />
                  <Readout label="Ball" value={locked ? "–" : ballText} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
