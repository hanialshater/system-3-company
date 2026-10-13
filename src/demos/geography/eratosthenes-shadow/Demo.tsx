"use client";

// A cross-section of the Earth (not a map). Parallel sunlight falls straight down a well at Syene
// and at a slant on a pole at Alexandria. The learner sets the shadow angle; the same angle opens
// at the Earth's centre, and tick marks count how many such arcs go round the circle. Angles are
// drawn true; the well and the pole are not to scale.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { EARTH_RADIUS_KM, geoDistance } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const H = 236;
const CX = 160;
const CY = 134;
const R = 74;
const POLE = 28;
const rad = Math.PI / 180;

const ACCOUNT = { angle: 7.2, dist: 5000, unit: "stadia" };
// Modern: latitudes Alexandria 31.20 N, 29.92 E and Aswan 24.09 N, 32.90 E.
const ALEX: [number, number] = [29.92, 31.2];
const ASWAN: [number, number] = [32.9, 24.09];
const MODERN = { angle: +(ALEX[1] - ASWAN[1]).toFixed(2), dist: Math.round(geoDistance(ALEX, ASWAN) * EARTH_RADIUS_KM), unit: "km" };
const TRUE_MERIDIAN_KM = 40008;
const START = 20;

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export default function EratosthenesShadow({ slug }: { slug: string }) {
  const [angle, setAngle] = useState(START);
  const [modern, setModern] = useState(false);
  const d = modern ? MODERN : ACCOUNT;
  const arcs = 360 / angle;
  const circ = arcs * d.dist;
  const modernCirc = (360 / MODERN.angle) * MODERN.dist;

  const pt = (deg: number, r: number) => [CX - r * Math.sin(deg * rad), CY - r * Math.cos(deg * rad)] as const;
  const [sx, sy] = pt(0, R);
  const [ax, ay] = pt(angle, R);
  const [px, py] = pt(angle, R + POLE);
  // The shadow tip: the vertical ray through the pole's top meets the ground circle.
  const tip = useMemo(() => {
    const dx = px - CX;
    const yy = CY - Math.sqrt(Math.max(0, R * R - dx * dx));
    return [px, yy] as const;
  }, [px]);
  const ticks = useMemo(() => Array.from({ length: Math.floor(arcs) }, (_, k) => k * angle), [arcs, angle]);
  const arcPath = (r: number, a0: number, a1: number) => {
    const [x0, y0] = pt(a0, r);
    const [x1, y1] = pt(a1, r);
    return `M${x0},${y0} A${r},${r} 0 0 0 ${x1},${y1}`;
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "At noon a well in Syene has no shadow; in Alexandria a pole's shadow makes 7.2°. The Earth's circumference is how many times their distance?",
        options: ["7 times", "50 times", "360 times"],
        answer: 1,
      }}
      exploreHint="Set the shadow to 7.2° and count the arcs. Then try modern numbers."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            <strong>50 times.</strong> The Sun is so far away that its rays arrive parallel, so the shadow&rsquo;s angle in
            Alexandria is also the angle at the Earth&rsquo;s centre between the two cities. 7.2° is 1/50 of 360°, so the
            whole circle is 50 × 5,000 = 250,000 stadia, as the account tells it.
          </p>
          <p>
            Modern numbers give {MODERN.angle}° and {fmt(MODERN.dist)} km, so about {fmt(Math.round(modernCirc / 100) * 100)} km, within{" "}
            {Math.round((modernCirc / TRUE_MERIDIAN_KM - 1) * 100)}% of the true {fmt(TRUE_MERIDIAN_KM)} km. Nobody knows
            the exact length of a stadion, so we cannot say how close Eratosthenes was in km. The method needed only a
            shadow and a distance.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["account"]}>
          {(reach) => {
            const set = (a: number, m: boolean) => {
              setAngle(a);
              setModern(m);
              if (Math.abs(a - ACCOUNT.angle) < 0.05) reach("account");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="stage-svg"
                  role="img"
                  aria-label={`Cross-section of the Earth. Shadow angle ${angle.toFixed(2)} degrees; the same angle at the centre.`}
                >
                  <circle cx={CX} cy={CY} r={R} className={s.earth} />
                  {ticks.map((t, i) => {
                    const [x0, y0] = pt(t, R - 4);
                    const [x1, y1] = pt(t, R + 4);
                    return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} className={s.tick} />;
                  })}
                  <path d={arcPath(R, 0, angle)} className={s.arc} />
                  {/* sunlight */}
                  {[sx, px, CX + 40, CX - 70].map((x, i) => (
                    <line key={i} x1={x} y1={4} x2={x} y2={i === 0 ? sy : i === 1 ? tip[1] : 24} className={s.ray} />
                  ))}
                  <text x={CX + 44} y={16} className={s.small}>
                    Sunlight
                  </text>
                  {/* radii and the centre angle */}
                  <line x1={CX} y1={CY} x2={sx} y2={sy} className={s.radius} />
                  <line x1={CX} y1={CY} x2={ax} y2={ay} className={s.radius} />
                  <path d={arcPath(18, 0, angle)} className={s.angle} />
                  <text x={CX - 6} y={CY - 22} className={s.theta} textAnchor="end">
                    {angle.toFixed(1)}°
                  </text>
                  {/* pole and its shadow angle */}
                  <line x1={ax} y1={ay} x2={px} y2={py} className={s.pole} />
                  <line x1={ax} y1={ay} x2={tip[0]} y2={tip[1]} className={s.shadow} />
                  <text x={px - 4} y={py - 4} className={s.theta} textAnchor="end">
                    {angle.toFixed(1)}°
                  </text>
                  <text x={sx + 4} y={sy - 6} className={s.small}>
                    Syene
                  </text>
                  <text x={px - 8} y={py + 10} className={s.small} textAnchor="end">
                    Alexandria
                  </text>
                  <text x={6} y={H - 6} className={s.small}>
                    Angles true; well and pole not to scale.
                  </text>
                </svg>
                <div className={s.chips} role="group" aria-label="Use numbers from">
                  <Control disabled={locked || (!modern && angle === ACCOUNT.angle)} className={!modern && angle === ACCOUNT.angle ? "active" : ""} onClick={() => set(ACCOUNT.angle, false)}>
                    The account: 7.2°
                  </Control>
                  <Control disabled={locked || modern} className={modern ? "active" : ""} onClick={() => set(MODERN.angle, true)}>
                    Modern: {MODERN.angle}°, {fmt(MODERN.dist)} km
                  </Control>
                </div>
                <Row>
                  <Slider label="Shadow angle" value={angle} min={2} max={30} step={0.01} disabled={locked} format={(v) => `${v.toFixed(2)}°`} onChange={(v) => set(v, modern)} />
                </Row>
                <Row>
                  <Readout label="Arcs round the circle" value={locked ? "?" : (Math.round(arcs * 10) / 10).toString()} />
                  <Readout label="Circumference" value={locked ? "?" : `${fmt(circ)} ${d.unit}`} />
                </Row>
                <p className="muted tiny">
                  Distance Syene to Alexandria: {fmt(d.dist)} {d.unit}.
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
