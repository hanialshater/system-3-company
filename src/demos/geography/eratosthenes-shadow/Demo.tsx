"use client";

// A cross-section of the Earth (not a map). Parallel sunlight falls straight down a well at Syene
// and at a slant on a pole at Alexandria. The learner sets the shadow angle; the same angle opens
// at the Earth's centre, and tick marks count how many such arcs go round the circle. Angles are
// drawn true; the well and the pole are not to scale.
// v3 (FC pass 26, W-249): Syene (24.09 N) is north of the Tropic, so "Sun overhead" is framed as the account's,
// in the question (now with the summer solstice), the Syene label and the reveal.

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
// The stage's own rounding for the arcs readout (one decimal, trailing .0 dropped).
const arcsText = (a: number) => (Math.round((360 / a) * 10) / 10).toString();
const SEEN_ACCOUNT = `${ACCOUNT.angle}° → ${arcsText(ACCOUNT.angle)} arcs, ${fmt((360 / ACCOUNT.angle) * ACCOUNT.dist)} stadia`;
const SEEN_MODERN = `${MODERN.angle}° → ${arcsText(MODERN.angle)} arcs, ${fmt((360 / MODERN.angle) * MODERN.dist)} km`;

export default function EratosthenesShadow({ slug }: { slug: string }) {
  const [angle, setAngle] = useState(START);
  const [modern, setModern] = useState(false);
  // Recorded when each milestone fires; the stage keeps them on a "Seen:" line and the reveal quotes them.
  const [seen, setSeen] = useState<{ account: boolean; modern: boolean }>({ account: false, modern: false });
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
          "In the account, at noon on the summer solstice a well in Syene has no shadow; in Alexandria a pole's shadow makes 7.2°. The Earth's circumference is how many times their distance?",
        options: ["7 times", "50 times", "360 times"],
        answer: 1,
      }}
      exploreHint="Set the shadow to 7.2° and count the arcs. Then try modern numbers."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>50 times.</strong> The Sun is so far away that its rays arrive parallel (the dashed lines), so the
            shadow&rsquo;s angle in Alexandria is also the angle at the Earth&rsquo;s centre. In the account, the Sun stood
            straight overhead at Syene at noon on the summer solstice, so the well had no shadow. You saw {SEEN_ACCOUNT}: 50 × 5,000 stadia, as the account tells it.
          </p>
          <p>
            With modern numbers you saw {SEEN_MODERN}, within {Math.round((modernCirc / TRUE_MERIDIAN_KM - 1) * 100)}% of
            the true {fmt(TRUE_MERIDIAN_KM)} km. Nobody knows the exact length of a stadion, so we cannot say how close
            Eratosthenes was in km. The method needed only a shadow and a distance.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["account", "modern"]}>
          {(reach) => {
            const set = (a: number, m: boolean) => {
              setAngle(a);
              setModern(m);
              // Exact matches only, so the readout showed the recorded values (50 arcs, 50.6 arcs).
              if (!m && Math.abs(a - ACCOUNT.angle) < 0.005) {
                setSeen((v) => ({ ...v, account: true }));
                reach("account");
              }
              if (m && Math.abs(a - MODERN.angle) < 0.005) {
                setSeen((v) => ({ ...v, modern: true }));
                reach("modern");
              }
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
                  <path d={arcPath(30, 0, angle)} className={s.angle} />
                  <text x={CX - 4} y={CY - 34} className={s.theta} textAnchor="end">
                    {angle.toFixed(1)}°
                  </text>
                  {/* pole and its shadow angle */}
                  <line x1={ax} y1={ay} x2={px} y2={py} className={s.pole} />
                  <line x1={ax} y1={ay} x2={tip[0]} y2={tip[1]} className={s.shadow} />
                  <text x={px - 4} y={py - 4} className={s.theta} textAnchor="end">
                    {angle.toFixed(1)}°
                  </text>
                  <text x={sx + 4} y={sy - 16} className={s.small}>
                    Syene, in the account:
                  </text>
                  <text x={sx + 4} y={sy - 6} className={s.small}>
                    Sun overhead, no shadow
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
                <p className="tiny" data-testid="seen">
                  Seen: {[seen.account ? SEEN_ACCOUNT : null, seen.modern ? SEEN_MODERN : null].filter(Boolean).join(" · ") || "nothing yet"}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
