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
//
// v3: zoomed-in view keeps Earth's radius and each point's direction from Earth's centre true but stretches height
// above the ground about 6x (v4: no longer says 'every angle': a path's angle to the ground is drawn steeper)
// (disclosed on stage), so the 400 km gap is 30 px and paths are visible on a phone. Every throw stays drawn,
// slow ones end at a "x" and the readout says when they hit the ground. Height buttons come before the throws in
// DOM order, so the QA path ends on the ISS picture with all paths; a "Seen:" row keeps the far stops' values.

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
const FAR_KPX = RMAX / (R_KM + 35786); // zoomed out: out to geostationary, one true scale
// Zoomed in (ground and ISS height): Earth's radius to scale, height above the ground stretched so the
// 400 km gap is 30 px. Each point's direction from Earth's centre is true, so every path lands where it
// really lands; a path's angle to the ground is not true (drawn about 6x steeper).
const E_PX = 82;
const HPX = (RMAX - E_PX) / ISS_H; // px per km of height
const STRETCH = Math.round(HPX / (E_PX / R_KM)); // about 6
const GAUGE = 150; // px for 100% (ground value)

export default function IssGravityStillThere({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [throwI, setThrowI] = useState<number | null>(null);
  const [t, setT] = useState(0); // minutes since the throw
  const [seen, setSeen] = useState<{ stops: number[]; throws: number[] }>({ stops: [0], throws: [] });
  const h = STOPS[k].h;
  const near = k <= 1;
  // Map a point (km, Earth's centre at 0,0) to the picture.
  const P = (x: number, y: number): [number, number] => {
    if (!near) return [CX + x * FAR_KPX, CY - y * FAR_KPX];
    const r = Math.hypot(x, y);
    const a = Math.atan2(x, y);
    const rp = E_PX + (r - R_KM) * HPX;
    return [CX + rp * Math.sin(a), CY - rp * Math.cos(a)];
  };
  const ringPx = (hh: number) => (near ? E_PX + hh * HPX : (R_KM + hh) * FAR_KPX);
  // Throws are drawn only at ISS height (the stop they are thrown from). Every throw made stays drawn.
  const atIss = k === 1;
  const flight = throwI === null || !atIss ? null : FLIGHTS[throwI];

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
        ? `hit the ground ${Math.round(flight.landKm).toLocaleString("en-US")} km away`
        : `${t} min: falling, hits ground at ${flight.landMin.toFixed(1)} min`;
  const farSeen = seen.stops.filter((i) => i >= 2);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You watch astronauts float on the ISS, which orbits about 400 km up. Compared with gravity at the ground, how strong is gravity up there?",
        options: ["0% (none)", "90%", "50%"],
        answer: 1,
      }}
      exploreHint="Visit each height, then throw a ball from 400 km, slow and at ISS speed, and step time."
      minInteractions={4}
      reveal={() => {
        const slow = seen.throws.filter((i) => SPEEDS[i] !== VC).map((i) => `${fmtV(SPEEDS[i])} km/s`);
        const fade = farSeen.filter((i) => i >= 3).map((i) => `${fmtPct(STOPS[i].h)} at ${i === 3 ? "GPS height" : "geostationary"}`);
        return (
          <>
            <p>
              At 400 km the gravity bar barely shrank: <strong>{fmtPct(ISS_H)}</strong> of its ground value.
              {fade.length ? ` Only far out did it fade: ${fade.join(", ")}.` : ""}
            </p>
            <p>
              {seen.stops.includes(2)
                ? `One Earth radius up you were twice as far from Earth's centre, and gravity read ${fmtPct(6371)}: a quarter.`
                : "Twice as far from Earth's centre, gravity is a quarter."}{" "}
              It weakens with the square of that distance, and 400 km adds only 6% to it.
            </p>
            <p>
              {slow.length ? `Your ${slow.join(" and ")} ${slow.length > 1 ? "throws" : "throw"} curved down and hit the ground (the × marks). ` : ""}
              The {fmtV(VC)} km/s throw fell just as hard but kept missing the ground, on the station&apos;s orbit. Station and
              astronauts move at that speed, so they fall together. That is why they float.
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
            const pathOf = (f: Flight) =>
              f.pts
                .map(([x, y], j) => {
                  const [px, py] = P(x, y);
                  return `${j ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`;
                })
                .join(" ");
            const [sx, sy] = P(station[0], station[1]);
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`Satellite at ${STOPS[k].label}: gravity ${fmtPct(h)} of ground${flight && throwI !== null ? `; ball thrown at ${fmtV(SPEEDS[throwI])} km/s, ${ballText}` : ""}`}
                >
                  {(near ? STOPS.slice(1, 2) : STOPS.slice(1)).map((st) => (
                    <circle key={st.h} cx={CX} cy={CY} r={ringPx(st.h)} className={st.h === h ? s.orbitOn : s.orbit} />
                  ))}
                  <circle cx={CX} cy={CY} r={near ? E_PX : R_KM * FAR_KPX} className={s.earth} />
                  {atIss &&
                    seen.throws.map((i) => {
                      const f = FLIGHTS[i];
                      const end = f.pts[f.pts.length - 1];
                      const [ex, ey] = P(end[0], end[1]);
                      return (
                        <g key={i} opacity={i === throwI ? 1 : 0.45}>
                          <path d={pathOf(f)} className={s.trace} />
                          {f.landMin !== null && (
                            <text x={ex} y={ey + 4} textAnchor="middle" className={s.hit}>
                              ×
                            </text>
                          )}
                        </g>
                      );
                    })}
                  {k === 0 ? (
                    <circle cx={P(0, R_KM)[0]} cy={P(0, R_KM)[1]} r={4} className={s.sat} />
                  ) : (
                    <rect x={sx - 7} y={sy - 7} width={14} height={14} className={s.station} />
                  )}
                  {ball &&
                    (() => {
                      const [bx, by] = P(ball[0], ball[1]);
                      return <circle cx={bx} cy={by} r={3.5} className={s.ball} />;
                    })()}
                  <text x={W - 6} y={14} textAnchor="end" className={s.name}>
                    {STOPS[k].name}
                  </text>
                  {atIss && !locked && (
                    <text x={6} y={14} className={s.key}>
                      □ station · ● ball · × hit ground
                    </text>
                  )}
                  <rect x={6} y={H - 30} width={GAUGE} height={12} rx={5} className={s.gaugeBg} />
                  {!locked && <rect x={6} y={H - 30} width={(pct(h) / 100) * GAUGE} height={12} rx={5} className={s.gauge} />}
                  <text x={GAUGE + 12} y={H - 20} className={s.name}>
                    gravity {locked ? "?" : fmtPct(h)}
                  </text>
                  <text x={6} y={H - 6} className={s.chip}>
                    {near ? `Heights stretched ${STRETCH}×. Round Earth, no air.` : "To scale. Round Earth, spin ignored."}
                  </text>
                </svg>

                <Row>
                  {STOPS.map((st, i) => (
                    <Control key={st.h} className={i === k ? "active" : ""} disabled={locked || i === k} onClick={() => goStop(i)}>
                      {st.label}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <span className={s.rowLabel}>Throw from 400 km</span>
                  {SPEEDS.map((v, i) => (
                    <Control
                      key={i}
                      className={throwI === i && atIss ? "active" : ""}
                      disabled={locked || (throwI === i && atIss && t === 0)}
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
                  <Readout label="Gravity vs ground" value={locked ? "?" : fmtPct(h)} />
                  <Readout label="Ball" value={locked ? "–" : ballText} />
                </Row>
                {!locked && farSeen.length > 0 && (
                  <p className={s.seen}>Seen: {farSeen.map((i) => `${STOPS[i].label} ${fmtPct(STOPS[i].h)}`).join(" · ")}</p>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
