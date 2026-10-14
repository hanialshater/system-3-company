"use client";

// One chart. The curve is the most water vapour that can stay vapour at each temperature
// (saturation vapour pressure, Magnus formula, Alduchov & Eskridge 1996). The flat line is this
// air's actual water vapour: half of the 30 °C maximum (50% relative humidity). The learner cools
// the air; the marker slides left along the flat line until it meets the curve (the dew point),
// then rides down the curve while the excess condenses as dew.
// Key state: cooled to the dew point or below (18.4 °C): fullness 100%, dew forming.
// Milestone `dew-point`; the "15 °C" step button (or the slider) reaches it. No button names the answer.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const es = (t: number) => 0.61094 * Math.exp((17.625 * t) / (t + 243.04)); // kPa
const T0 = 30;
const RH0 = 0.5;
const E = RH0 * es(T0); // kPa of water vapour in this air
const L = Math.log(E / 0.61094);
const TD = (243.04 * L) / (17.625 - L); // dew point, °C
const PRESETS = [25, 20, 15]; // steps down; none of them is the answer
const pastDew = (t: number) => t <= TD; // the key state: cooled until dew forms
const NAMES = ["dew-point"] as const;

const W = 320;
const H = 180;
const X0 = 34;
const X1 = 310;
const Y0 = 150;
const Y1 = 12;
const TLO = 5;
const THI = 32;
const PHI = 5;
const xOf = (t: number) => X0 + ((t - TLO) / (THI - TLO)) * (X1 - X0);
const yOf = (p: number) => Y0 - (p / PHI) * (Y0 - Y1);

// The curve is drawn only from the coldest temperature tried up to 32 °C, so the crossing is not there to read in advance.
const curveFrom = (lo: number) =>
  Array.from({ length: 55 }, (_, i) => lo + (i * (THI - lo)) / 54)
    .map((t, i) => `${i ? "L" : "M"} ${xOf(t).toFixed(1)} ${yOf(es(t)).toFixed(1)}`)
    .join(" ");

export default function WhereTheDewForms({ slug }: { slug: string }) {
  const [t, setT] = useState(T0);
  const [lowest, setLowest] = useState(T0 - 0.01); // coldest temperature tried
  const full = es(t);
  const vapour = Math.min(E, full);
  const fullness = Math.min(1, E / full);
  const dew = Math.max(0, E - full); // kPa worth condensed
  const drops = Math.min(12, Math.ceil(dew / 0.08));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Air at ${T0} °C is ${Math.round(RH0 * 100)}% full of water vapour (relative humidity ${Math.round(RH0 * 100)}%). You cool it, keeping its water. Dew first forms at about…`,
        options: PRESETS.map((p) => `${p} °C`),
        answer: 1,
      }}
      exploreHint="Cool the air until dew forms, and watch where the line meets the curve."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Until the dew point, cooling never changed your air&apos;s water. It lowered the ceiling. At about{" "}
            <strong>{TD.toFixed(0)} °C</strong> the curve came down to meet your line: 100% full, and the first dew.
          </p>
          <p>
            Relative humidity compares the water in the air with the most that can stay vapour at that temperature,
            and warm air allows far more. Half of the {T0} °C maximum, {E.toFixed(2)} kPa, is the whole maximum at about{" "}
            {TD.toFixed(0)} °C: the dew point. Below it, the extra water condenses.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const set = (v: number) => {
              setT(v);
              setLowest((l) => Math.min(l, v));
              if (pastDew(v)) reach("dew-point");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${t} °C, ${Math.round(fullness * 100)}% full`}>
                  <line x1={X0} x2={X1} y1={Y0} y2={Y0} className={s.axis} />
                  <line x1={X0} x2={X0} y1={Y0} y2={Y1} className={s.axis} />
                  {[10, 20, 30].map((v) => (
                    <text key={v} x={xOf(v)} y={Y0 + 13} textAnchor="middle" className={s.small}>
                      {v} °C
                    </text>
                  ))}
                  {[0, 2, 4].map((v) => (
                    <text key={v} x={X0 - 4} y={yOf(v) + 3} textAnchor="end" className={s.small}>
                      {v}
                    </text>
                  ))}
                  <text x={X0 + 4} y={Y1 + 2} className={s.small}>
                    water vapour (as pressure), kPa
                  </text>
                  <path d={curveFrom(lowest)} className={s.curve} />
                  <text x={xOf(27)} y={yOf(es(31)) + 2} className={s.curveLabel}>
                    full
                  </text>
                  {!locked && (
                    <>
                      <line x1={xOf(TLO)} x2={xOf(THI)} y1={yOf(E)} y2={yOf(E)} className={s.line} />
                      <text x={xOf(THI) - 2} y={yOf(E) + 13} textAnchor="end" className={s.lineLabel}>
                        your air
                      </text>
                    </>
                  )}
                  {drops > 0 && (
                    <text x={xOf(t) + 10} y={yOf(vapour) - 8} className={s.lineLabel}>
                      extra water leaves as dew
                    </text>
                  )}
                  {Array.from({ length: drops }, (_, i) => (
                    <path
                      key={i}
                      d={`M ${xOf(t) - 30 + (i % 6) * 12} ${Y0 - 8 - Math.floor(i / 6) * 12} q 4 -8 0 -10 q -4 2 0 10 z`}
                      className={s.drop}
                    />
                  ))}
                  <circle cx={xOf(t)} cy={yOf(vapour)} r={6} className={fullness >= 1 ? s.markFull : s.mark} />
                </svg>
                <Row>
                  <Readout label="Fullness" value={`${Math.round(fullness * 100)}%`} />
                  <Readout label="Dew" value={drops ? "forming" : "none"} />
                </Row>
                <Row>
                  {PRESETS.map((p) => (
                    <Control key={p} onClick={() => set(p)} disabled={locked || t === p} className={t === p ? "active" : ""}>
                      {p} °C
                    </Control>
                  ))}
                </Row>
                <Slider label="Cool the air" value={t} min={TLO} max={T0} step={0.5} onChange={set} disabled={locked} format={(v) => `${v} °C`} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
