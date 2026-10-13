"use client";

// Wrench throw. An 80 kg astronaut at rest in space throws a wrench of mass m at speed v (both
// measured in the frame where the astronaut started). No outside force, so momentum is conserved:
// m v = M u and the astronaut drifts the other way at u = m v / M. The stage shows both bodies 1 s
// after the throw (4.5 px per m) and two momentum bars. Controls in DOM order: Throw, wrench mass
// slider (1..5 kg), throw speed slider (4..24 m/s, step 2). While thrown, a slider re-throws live.
// Defaults 2 kg and 10 m/s are the question's numbers, so the first Throw on the QA path shows them.
// Milestones: "thrown" (first throw) and "varied" (a second, different throw).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const ASTRONAUT = 80;
const MASS0 = 2;
const SPEED0 = 10;
const MILESTONES = ["thrown", "varied"] as const;
const mom = (m: number, v: number) => m * v;
const drift = (m: number, v: number) => mom(m, v) / ASTRONAUT;
const r3 = (x: number) => Number(x.toFixed(3));
const PX = 4.5; // px per metre after 1 s
const BAR = 1.2; // px per kg m/s
const CX = 160;

export default function WrenchThrowRecoil({ slug }: { slug: string }) {
  const [m, setM] = useState(MASS0);
  const [v, setV] = useState(SPEED0);
  const [thrown, setThrown] = useState(false);
  const [throws, setThrows] = useState<[number, number][]>([]);

  const record = (mm: number, vv: number) =>
    setThrows((t) => (t.some(([a, b]) => a === mm && b === vv) ? t : [...t, [mm, vv]]));
  const first = throws[0];
  const last = throws[throws.length - 1];
  const line = (t: [number, number]) =>
    `${t[0]} kg at ${t[1]} m/s: ${mom(t[0], t[1])} kg·m/s for the wrench, so ${mom(t[0], t[1])} ÷ ${ASTRONAUT} = ${r3(drift(t[0], t[1]))} m/s the other way`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `An ${ASTRONAUT} kg astronaut floating at rest throws a ${MASS0} kg wrench at ${SPEED0} m/s. The astronaut then moves...`,
        options: ["Not at all", `${r3(drift(MASS0, SPEED0))} m/s the other way`, `${SPEED0} m/s the other way`],
        answer: 1,
      }}
      exploreHint="Throw the wrench, then change its mass and speed."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {first ? `Your first throw, ${line(first)}.` : ""}
            {last && last !== first ? ` Your last, ${line(last)}.` : ""}
          </p>
          <p>
            The wrench and astronaut always carried equal and opposite momentum, so the total stayed 0. You do not need
            anything to push on, only something to push away. Speeds are from the starting frame.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const u = drift(m, v);
            const p = mom(m, v);
            const after = (mm: number, vv: number) => {
              record(mm, vv);
              reach("thrown");
              if (mm !== MASS0 || vv !== SPEED0) reach("varied");
            };
            const caption = locked
              ? "Make a prediction to start."
              : "An 80 kg astronaut at rest throws a wrench. Shown 1\u00a0s later.";
            const wx = 188 + v * PX;
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 210" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <text x={316} y={14} className={`${s.chip} ${s.chipR}`}>
                    No outside force. Speeds from the start frame.
                  </text>
                  <g transform={`translate(${thrown ? -u * PX : 0} 0)`}>
                    <circle cx={150} cy={42} r={11} className={s.head} />
                    <rect x={138} y={55} width={24} height={30} rx={6} className={s.body} />
                    <text x={150} y={100} className={s.lab}>
                      {ASTRONAUT} kg
                    </text>
                  </g>
                  <rect
                    x={thrown ? wx : 180}
                    y={66 - (4 + m * 1.5)}
                    width={8 + m * 3}
                    height={8 + m * 3}
                    rx={2}
                    className={s.wrench}
                  />
                  <text x={thrown ? wx + 4 + m * 1.5 : 184 + m * 1.5} y={86} className={s.lab}>
                    {m} kg
                  </text>
                  <line x1={CX} y1={134} x2={CX} y2={176} className={s.axis} />
                  <text x={CX - 4} y={146} className={s.axisL}>
                    Astronaut
                  </text>
                  <text x={CX + 4} y={146} className={s.axisR}>
                    Wrench
                  </text>
                  {thrown && !locked && (
                    <>
                      <rect x={CX - p * BAR} y={154} width={p * BAR} height={16} className={s.barA} />
                      <rect x={CX} y={154} width={p * BAR} height={16} className={s.barW} />
                      <text x={CX - p * BAR - 4} y={166} className={s.valL}>
                        −{p}
                      </text>
                      <text x={CX + p * BAR + 4} y={166} className={s.valR}>
                        +{p}
                      </text>
                      <text x={CX} y={196} className={s.lab}>
                        Total momentum 0 (kg·m/s)
                      </text>
                    </>
                  )}
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  <Control
                    disabled={locked}
                    onClick={() => {
                      const t = !thrown;
                      setThrown(t);
                      if (t) after(m, v);
                    }}
                  >
                    {thrown ? "Back to rest" : "Throw the wrench"}
                  </Control>
                </Row>
                <Slider
                  label="Wrench mass (kg)"
                  value={m}
                  min={1}
                  max={5}
                  disabled={locked}
                  onChange={(x) => {
                    setM(x);
                    if (thrown) after(x, v);
                  }}
                />
                <Slider
                  label="Throw speed (m/s)"
                  value={v}
                  min={4}
                  max={24}
                  step={2}
                  disabled={locked}
                  onChange={(x) => {
                    setV(x);
                    if (thrown) after(m, x);
                  }}
                />
                <Row>
                  <Readout label="Astronaut drifts" value={locked || !thrown ? "?" : `${r3(u)} m/s`} />
                  <Readout label="Each way" value={locked || !thrown ? "?" : `${p} kg·m/s`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
