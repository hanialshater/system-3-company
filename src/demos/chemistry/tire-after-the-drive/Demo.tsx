"use client";

// A rigid, sealed tyre (fixed volume, ideal gas). One bar shows the air's total (absolute)
// pressure: the grey bottom is the outside air's 101.3 kPa, which the gauge does not count; the
// coloured top is what the gauge reads. At fixed volume, absolute pressure is proportional to
// kelvin temperature: p = P_ABS0 × (T + 273.15) / 293.15.
// Key state: the tyre at 50 °C (323 K): gauge about 253 kPa, a rise of about 15%, nowhere near
// 2.5 times. Milestone `hot`. The 50 °C button is the last control so QA ends on it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const ATM = 101.325; // kPa
const GAUGE0 = 220; // kPa at T0
const T0 = 20; // °C
const HOT = 50; // °C
const K = 273.15;
const P_ABS0 = GAUGE0 + ATM;
const abs = (c: number) => (P_ABS0 * (c + K)) / (T0 + K);
const gauge = (c: number) => abs(c) - ATM;
const HOT_GAUGE = gauge(HOT);
const CELSIUS_WRONG = (GAUGE0 * HOT) / T0;
const NAMES = ["hot"] as const;
const kelvin = (c: number) => Math.round(c + K);

const W = 320;
const H = 190;
const BASE = 175;
const TOPY = 15;
const PMAX = 400;
const yOf = (p: number) => BASE - (p / PMAX) * (BASE - TOPY);

export default function TireAfterTheDrive({ slug }: { slug: string }) {
  const [c, setC] = useState(T0);
  const pa = abs(c);
  const pg = gauge(c);
  const absRise = (abs(HOT) / P_ABS0 - 1) * 100;
  const gaugeRise = (HOT_GAUGE / GAUGE0 - 1) * 100;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Before a long drive, your gauge reads ${GAUGE0} kPa on a rigid, sealed tyre at ${T0} °C. The gauge shows pressure above the outside air's ${Math.round(ATM)} kPa. After the drive the air inside is ${HOT} °C. The gauge now reads about…`,
        options: [`${Math.round(HOT_GAUGE)} kPa`, `${Math.round(CELSIUS_WRONG)} kPa`, `${Math.round(abs(HOT))} kPa`],
        answer: 0,
      }}
      exploreHint={`Warm the tyre and watch the gauge part of the bar. Finish at ${HOT} °C.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            At {HOT} °C your gauge read about <strong>{Math.round(HOT_GAUGE)} kPa</strong>, up {Math.round(gaugeRise)}%, not
            2.5 times.
          </p>
          <p>
            Gas pressure follows temperature counted from absolute zero, in kelvin. {T0} °C to {HOT} °C is {kelvin(T0)} K
            to {kelvin(HOT)} K, only {Math.round(absRise)}% warmer, so the total pressure rose {Math.round(absRise)}%, from{" "}
            {Math.round(P_ABS0)} to {Math.round(abs(HOT))} kPa. The gauge leaves out the outside {Math.round(ATM)} kPa, so its
            {" "}{Math.round(HOT_GAUGE - GAUGE0)} kPa gain is {Math.round(gaugeRise)}% of {GAUGE0}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const set = (v: number) => {
              setC(v);
              if (v === HOT) reach("hot");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${c} °C: gauge ${Math.round(pg)} kPa`}>
                  <rect x={60} y={yOf(ATM)} width={70} height={BASE - yOf(ATM)} className={s.atm} />
                  <rect x={60} y={yOf(pa)} width={70} height={yOf(ATM) - yOf(pa)} className={s.gauge} />
                  <line x1={52} x2={138} y1={yOf(P_ABS0)} y2={yOf(P_ABS0)} className={s.ref} />
                  <text x={50} y={yOf(P_ABS0) + 4} textAnchor="end" className={s.small}>
                    cold
                  </text>
                  <text x={95} y={(BASE + yOf(ATM)) / 2 + 4} textAnchor="middle" className={s.small}>
                    outside air
                  </text>
                  <text x={142} y={(yOf(ATM) + yOf(pa)) / 2 + 5} className={s.big}>
                    gauge {Math.round(pg)} kPa
                  </text>
                  <text x={142} y={yOf(pa) + 4} className={s.small}>
                    total {Math.round(pa)} kPa
                  </text>
                  <line x1={56} x2={134} y1={BASE} y2={BASE} className={s.axis} />
                  <text x={W - 6} y={22} textAnchor="end" className={s.temp}>
                    {c} °C = {kelvin(c)} K
                  </text>
                  <text x={W - 6} y={38} textAnchor="end" className={s.small}>
                    K = °C + 273
                  </text>
                  <text x={W - 6} y={BASE} textAnchor="end" className={s.small}>
                    ideal gas, fixed volume
                  </text>
                </svg>
                <Slider label="Air in tyre (°C)" value={c} min={0} max={60} step={1} onChange={set} disabled={locked} format={(v) => `${v} °C`} />
                <Row>
                  <Control onClick={() => set(T0)} disabled={locked || c === T0}>
                    Parked, {T0} °C
                  </Control>
                  <Control onClick={() => set(HOT)} disabled={locked || c === HOT} className={c === HOT ? "active" : ""}>
                    After the drive, {HOT} °C
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
