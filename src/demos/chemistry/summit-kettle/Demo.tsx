"use client";

// One chart: water's vapour pressure against temperature, with a dashed line for the air
// pressure at the chosen altitude. Water boils where the curve meets the line. Climbing lowers
// the line, so the meeting point (the boiling point) slides left: about 69 °C on Everest.
// Model: standard atmosphere for air pressure; Clausius-Clapeyron with a constant 40.7 kJ/mol.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const R = 8.314; // J/(mol K)
const DH = 40700; // J/mol, water at 100 °C
const T0 = 373.15; // K, boils at 1 atm
const SUMMIT = 8850; // m, Everest summit, about
// Air pressure (atm) from the ICAO standard atmosphere (troposphere formula).
const air = (h: number) => Math.pow(1 - 2.25577e-5 * h, 5.25588);
// Water's vapour pressure (atm) at t °C, and the temperature where it equals p.
const vap = (t: number) => Math.exp((-DH / R) * (1 / (t + 273.15) - 1 / T0));
const boil = (p: number) => 1 / (1 / T0 - (R / DH) * Math.log(p)) - 273.15;

const P_SUM = air(SUMMIT);
const B_SUM = boil(P_SUM);
const B_SAY = Math.round(B_SUM / 5) * 5; // said as "about 70 °C": measured summit boiling points span 68 to 71 °C

const W = 320;
const H = 200;
const L = 40;
const RM = 14;
const TOP = 12;
const BASE = 166;
const TMIN = 20;
const TMAX = 105;
const PMAX = 1.1;
const X = (t: number) => L + ((t - TMIN) / (TMAX - TMIN)) * (W - L - RM);
const Y = (p: number) => BASE - (p / PMAX) * (BASE - TOP);
const curve = Array.from({ length: 60 }, (_, i) => {
  const t = TMIN + (i / 59) * (TMAX - TMIN);
  return `${i ? "L" : "M"} ${X(t).toFixed(1)} ${Y(Math.min(vap(t), PMAX)).toFixed(1)}`;
}).join(" ");
const m = (h: number) => `${h.toLocaleString("en-US")} m`;
const NAMES = ["summit"] as const;

export default function SummitKettle({ slug }: { slug: string }) {
  const [h, setH] = useState(0);
  const [top, setTop] = useState(0);
  const p = air(h);
  const b = boil(p);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Air pressure on the summit of Mount Everest is about ${P_SUM.toFixed(1)} atm (sea level: 1 atm). Water there boils at about…`,
        options: ["100 °C", `${B_SAY} °C`, "40 °C"],
        answer: 1,
      }}
      exploreHint="Climb to the summit and watch where the two lines meet."
      reveal={() => (
        <>
          <p>
            {top >= SUMMIT ? "At the summit you saw" : "At the summit"} the air line drop to about {P_SUM.toFixed(1)} atm,
            and the meeting point slide to about <strong>{B_SAY} °C</strong>.
          </p>
          <p>
            Water boils when its own vapour pressure, the push of molecules escaping as bubbles, matches the air
            pressing down on it. At sea level that takes 100 °C. Thinner air is matched at a lower temperature, so on
            the summit the water boils cooler, and food in it cooks more slowly.
          </p>
          <p className="muted">Model: standard atmosphere, constant heat of vaporisation (40.7 kJ/mol).</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const go = (v: number) => {
              setH(v);
              setTop((x) => Math.max(x, v));
              if (v >= SUMMIT) reach("summit");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`At ${m(h)} the air pressure is ${p.toFixed(2)} atm and water boils at ${Math.round(b)} °C`}
                >
                  {[0, 0.5, 1].map((g) => (
                    <g key={g}>
                      <line x1={L} x2={W - RM} y1={Y(g)} y2={Y(g)} className={s.grid} />
                      <text x={L - 4} y={Y(g) + 3} textAnchor="end" className={s.small}>
                        {g === 0 ? "0" : `${g} atm`}
                      </text>
                    </g>
                  ))}
                  {[20, 40, 60, 80, 100].map((t) => (
                    <text key={t} x={X(t)} y={BASE + 13} textAnchor="middle" className={s.small}>
                      {t} °C
                    </text>
                  ))}
                  <path d={curve} className={s.curve} />
                  <text x={X(22)} y={Y(0.42)} className={s.curveLabel}>
                    water&apos;s vapour pressure
                  </text>
                  <line x1={L} x2={W - RM} y1={Y(p)} y2={Y(p)} className={s.air} />
                  <text x={L + 4} y={Y(p) - 5} className={s.label}>
                    air pressure
                  </text>
                  <line x1={X(b)} x2={X(b)} y1={Y(p)} y2={BASE} className={s.drop} />
                  <circle cx={X(b)} cy={Y(p)} r={5.5} className={s.dot} />
                  <text x={X(b)} y={BASE - 4} textAnchor="end" dx={-4} className={s.label}>
                    boils
                  </text>
                  <text x={W / 2} y={H - 4} textAnchor="middle" className={s.small}>
                    Model: standard atmosphere
                  </text>
                </svg>
                <Row>
                  <Control onClick={() => go(SUMMIT)} disabled={locked || h >= SUMMIT}>
                    Climb to the summit
                  </Control>
                  <Control onClick={() => go(0)} disabled={locked || h === 0}>
                    Sea level
                  </Control>
                </Row>
                <Slider label="Altitude" value={h} min={0} max={SUMMIT} step={50} disabled={locked} format={m} onChange={go} />
                <Row>
                  <Readout label="Air pressure" value={`${p.toFixed(2)} atm`} />
                  <Readout label="Boils at" value={`about ${b.toFixed(0)} °C`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
