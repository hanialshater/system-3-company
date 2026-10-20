"use client";

// Kettle vs bulb. Energy = power x time. Each appliance's energy is drawn as a bar on one
// kWh axis, built from one slice per minute of running: a slice's thickness is the energy
// of one minute at that power (kettle 2000 W: 0.033 kWh per slice; bulb 60 W: 0.001 kWh).
// So power shows as slice thickness and time as the number of slices. Nameplate power is
// held constant for the whole run.
//
// Earned reveal: milestone "bulb-overtakes" when the bulb's bar passes the kettle's.

import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const P_KETTLE = 2000; // W
const P_BULB = 60; // W
const kwh = (w: number, minutes: number) => (w / 1000) * (minutes / 60);
const fmt = (e: number) => `${e.toFixed(2)} kWh`;

const W = 320;
const H = 222;
const BASE = 200;
const KPX = 900; // px per kWh
const AX = 20;
const BARS = [{ x: 70 }, { x: 196 }];
const BW = 70;

export default function KettleVsBulb({ slug }: { slug: string }) {
  const [bulbH, setBulbH] = useState(1);
  const [kettleMin, setKettleMin] = useState(3);
  const [overtook, setOvertook] = useState<{ h: number; m: number } | null>(null);
  const eK = kwh(P_KETTLE, kettleMin);
  const eB = kwh(P_BULB, bulbH * 60);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "This morning your 2000 W kettle runs for 3 minutes, and a 60 W bulb in the hall stays on for 2 hours. Which uses more energy?",
        options: ["The kettle", "The bulb", "Equal"],
        answer: 1,
      }}
      exploreHint="Leave the bulb on longer until its bar passes the kettle's."
      reveal={() => {
        const o = overtook ?? { h: 2, m: 3 };
        return (
          <>
            <p>
              At <strong>{o.h} h</strong> the bulb&apos;s bar passed the kettle&apos;s {o.m} minutes:{" "}
              {fmt(kwh(P_BULB, o.h * 60))} against {fmt(kwh(P_KETTLE, o.m))}. In the question&apos;s case, 2 h of bulb is{" "}
              {fmt(kwh(P_BULB, 120))} and 3 min of kettle {fmt(kwh(P_KETTLE, 3))}.
            </p>
            <p>
              Watts say how fast energy flows: each kettle minute was a thick slice, each bulb minute a thin one. The bill
              counts the whole bar, power × time, in kilowatt-hours. Enough thin slices beat a few thick ones.
            </p>
            <p className="muted">Assumes each appliance draws its label power steadily. 1 kWh = 3.6 million joules.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["bulb-overtakes"]}>
          {(reach) => {
            const check = (h: number, m: number) => {
              if (kwh(P_BULB, h * 60) > kwh(P_KETTLE, m)) {
                if (!overtook) setOvertook({ h, m });
                reach("bulb-overtakes");
              }
            };
            const bar = (x: number, w: number, minutes: number, e: number, cls: string) => {
              const slice = kwh(w, 1) * KPX;
              const n = Math.round(minutes);
              const lines = [];
              const every = slice < 2 ? 10 : 1; // thin slices: mark every 10th so the lines stay visible
              for (let i = every; i < n; i += every) lines.push(<line key={i} x1={x} x2={x + BW} y1={BASE - i * slice} y2={BASE - i * slice} className={s.slice} />);
              return (
                <g>
                  <rect x={x} y={BASE - e * KPX} width={BW} height={e * KPX} className={cls} />
                  {lines}
                </g>
              );
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={locked ? "Two empty energy bars" : `Kettle ${fmt(eK)}, bulb ${fmt(eB)}`}>
                  {[0, 0.05, 0.1, 0.15, 0.2].map((v) => (
                    <line key={v} x1={AX} x2={W - 8} y1={BASE - v * KPX} y2={BASE - v * KPX} className={s.grid} />
                  ))}
                  {!locked && bar(BARS[0].x, P_KETTLE, kettleMin, eK, s.kettle)}
                  {!locked && bar(BARS[1].x, P_BULB, bulbH * 60, eB, s.bulb)}
                  <text x={BARS[0].x + BW / 2} y={BASE + 14} textAnchor="middle" className={s.name}>
                    Kettle 2000 W
                  </text>
                  <text x={BARS[1].x + BW / 2} y={BASE + 14} textAnchor="middle" className={s.name}>
                    Bulb 60 W
                  </text>
                  <text x={W - 8} y={12} textAnchor="end" className={s.tick}>
                    Lines: kettle 1 min, bulb 10 min
                  </text>
                  {!locked && (
                    <>
                      <text x={BARS[0].x + BW / 2} y={BASE - eK * KPX - 4} textAnchor="middle" className={s.value}>
                        {fmt(eK)}
                      </text>
                      <text x={BARS[1].x + BW / 2} y={BASE - eB * KPX - 4} textAnchor="middle" className={s.value}>
                        {fmt(eB)}
                      </text>
                    </>
                  )}
                </svg>

                <Slider
                  label="Bulb on"
                  value={bulbH}
                  min={0.5}
                  max={3}
                  step={0.5}
                  disabled={locked}
                  format={(v) => `${v} h`}
                  onChange={(v) => {
                    setBulbH(v);
                    check(v, kettleMin);
                  }}
                />
                <Slider
                  label="Kettle on"
                  value={kettleMin}
                  min={1}
                  max={6}
                  step={1}
                  disabled={locked}
                  format={(v) => `${v} min`}
                  onChange={(v) => {
                    setKettleMin(v);
                    check(bulbH, v);
                  }}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
