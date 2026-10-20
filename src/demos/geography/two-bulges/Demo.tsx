"use client";

// Not a map: the Earth seen from above the North Pole, a fixed Moon to the right, and an ocean
// with no continents. The learner turns the Earth (hours of one lunar day, 24 h 50 min); a dot on
// the coast rides round, and a gauge shows the water there. Equilibrium tide: the water height
// follows cos(2 x angle from the Moon), i.e. one bulge toward the Moon and one away. Bulges are
// drawn hugely exaggerated, and only after the prediction.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const W = 320;
const H = 210;
const CX = 130;
const CY = 105;
const R_EARTH = 58;
const SEA = 8; // mean water depth drawn, px
const BULGE = 9; // drawn tidal amplitude, px (hugely exaggerated)
const LUNAR_DAY_H = 24 + 50 / 60;
const HALF = LUNAR_DAY_H / 2;
const START = 6;
const rad = Math.PI / 180;

const level = (t: number) => Math.cos(2 * (360 * (t / LUNAR_DAY_H)) * rad); // +1 high, -1 low
const fmtH = (t: number) => {
  const h = Math.floor(t);
  const m = Math.round((t - h) * 60);
  return m === 60 ? `${h + 1} h 00 min` : `${h} h ${String(m).padStart(2, "0")} min`;
};
const word = (l: number) => (l > 0.85 ? "High tide" : l < -0.85 ? "Low tide" : l > 0 ? "Fairly high" : "Fairly low");

export default function TwoBulges({ slug }: { slug: string }) {
  const [t, setT] = useState(START);
  const ang = (360 * t) / LUNAR_DAY_H; // the dot's angle from the Moon direction, anticlockwise
  const lv = level(t);

  // Water outline: polar curve r(theta) = Earth + sea + bulge * cos(2 theta), theta from the Moon line.
  const water = (bulge: number) =>
    Array.from({ length: 121 }, (_, i) => {
      const th = (i / 120) * 2 * Math.PI;
      const r = R_EARTH + SEA + bulge * Math.cos(2 * th);
      return `${(CX + r * Math.cos(th)).toFixed(1)},${(CY - r * Math.sin(th)).toFixed(1)}`;
    }).join(" ");
  const dot = (r: number) => [CX + r * Math.cos(ang * rad), CY - r * Math.sin(ang * rad)] as const;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You spend a whole day on the beach at an ordinary ocean coast, like most coasts. How many high tides roll in before the day is over?",
        options: ["2", "1", "4"],
        answer: 0,
      }}
      exploreHint="Turn the Earth through a lunar day. When is the water high, and when low?"
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            <strong>Two.</strong> The water piles up in two bulges, one facing the Moon and one on the far side. As the
            Earth turns, your coast passes through both: high tides about {fmtH(HALF)} apart, two in each{" "}
            {fmtH(LUNAR_DAY_H)} lunar day.
          </p>
          <p>
            The far bulge is the surprise. The Moon pulls the near-side water a little harder than the Earth&rsquo;s
            centre, and the centre a little harder than the far-side water. What matters is that difference, so the ocean
            is stretched both ways along the Moon line.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["near", "far", "low"]}>
          {(reach) => {
            const go = (v: number) => {
              setT(v);
              const a = ((360 * v) / LUNAR_DAY_H) % 360;
              if (a < 15 || a > 345) reach("near");
              if (Math.abs(a - 180) < 15) reach("far");
              if (level(v) < -0.85) reach("low");
            };
            const [dx, dy] = dot(R_EARTH + SEA + (locked ? 0 : BULGE * lv));
            const [gx, gy] = dot(R_EARTH);
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="stage-svg"
                  role="img"
                  aria-label={`Earth from above the North Pole with the Moon to the right. ${fmtH(t)} into the lunar day.${locked ? "" : ` ${word(lv)} at the dot.`}`}
                >
                  <polygon points={water(locked ? 0 : BULGE)} className={s.water} />
                  <circle cx={CX} cy={CY} r={R_EARTH} className={s.earth} />
                  <text x={CX} y={CY + 3} className={s.small} textAnchor="middle">
                    North Pole
                  </text>
                  <line x1={gx} y1={gy} x2={dx} y2={dy} className={s.gauge} />
                  <circle cx={dx} cy={dy} r={4.5} className={s.dot} />
                  <line x1={CX + R_EARTH + SEA + BULGE + 6} y1={CY} x2={W - 34} y2={CY} className={s.moonLine} />
                  <circle cx={W - 22} cy={CY} r={11} className={s.moon} />
                  <text x={W - 22} y={CY + 26} className={s.small} textAnchor="middle">
                    Moon
                  </text>
                  {!locked &&
                    [40, 0, -40].map((dx0, i) => (
                      <line key={dx0} x1={CX + dx0 - 14} y1={CY + 26} x2={CX + dx0 - 14 + [26, 20, 14][i]} y2={CY + 26} className={s.gauge} markerEnd="url(#tug)" />
                    ))}
                  {!locked && (
                    <text x={CX} y={CY + 42} className={s.small} textAnchor="middle">
                      Moon's attraction: strongest near, weakest far
                    </text>
                  )}
                  <defs>
                    <marker id="tug" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
                      <path d="M0 0 L6 3 L0 6 Z" fill="var(--fg)" />
                    </marker>
                  </defs>
                  <text x={6} y={H - 16} className={s.small}>
                    Toy: no continents, bulges exaggerated. Dot: your coast.
                  </text>
                  <text x={6} y={H - 5} className={s.small}>
                    Lunar day: time until your coast faces the Moon again.
                  </text>
                </svg>
                <div className={s.chips} role="group" aria-label="Turn the Earth to">
                  <Control disabled={locked || t === 0} className={t === 0 ? "active" : ""} onClick={() => go(0)}>
                    Coast faces the Moon
                  </Control>
                  <Control disabled={locked || t === HALF} className={t === HALF ? "active" : ""} onClick={() => go(HALF)}>
                    Coast faces away
                  </Control>
                  <Control disabled={locked || t === LUNAR_DAY_H / 4} className={t === LUNAR_DAY_H / 4 ? "active" : ""} onClick={() => go(LUNAR_DAY_H / 4)}>
                    Quarter turn
                  </Control>
                </div>
                <Row>
                  <Slider label="Time" value={t} min={0} max={+LUNAR_DAY_H.toFixed(2)} step={0.05} disabled={locked} format={fmtH} onChange={go} />
                </Row>
                <Row>
                  <Readout label="Water at your coast" value={locked ? "?" : word(lv)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
