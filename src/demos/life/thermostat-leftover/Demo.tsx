"use client";

// Toy incubator: target 37, room 32, starts at room temperature. dT/dt = (ROOM - T) + gain * (TARGET - T)
// (heat leaks to the room at rate 1; heater power is proportional to the shortfall). Euler, dt 0.02,
// 250 steps (5 time units). Steady value (ROOM + gain*TARGET) / (1 + gain); gap = (TARGET-ROOM)/(1+gain).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const TARGET = 37, ROOM = 32, Q_GAIN = 4, STEPS = 250, DT = 0.02;
const PRESETS = [4, 9, 19, 0];
const steady = (g: number) => (ROOM + g * TARGET) / (1 + g);
const gap = (g: number) => TARGET - steady(g);
const f1 = (x: number) => x.toFixed(2).replace(/0$/, "");
function trace(g: number) {
  const out = [ROOM];
  let T = ROOM;
  for (let i = 0; i < STEPS; i++) {
    T += DT * ((ROOM - T) + g * (TARGET - T));
    out.push(T);
  }
  return out;
}

const W = 320, H = 150, L = 30, R = 10, T0 = 10, B = 22, YMIN = 31, YMAX = 38;
const px = (i: number) => L + ((W - L - R) * i) / STEPS;
const py = (t: number) => T0 + (H - T0 - B) * (1 - (t - YMIN) / (YMAX - YMIN));

function Stage({ locked, gain, setGain }: { locked: boolean; gain: number; setGain: (g: number) => void }) {
  const tr = trace(gain);
  const msg = locked
    ? `Toy incubator: target ${TARGET}, room ${ROOM}. Heater power = gain × how far below ${TARGET}.`
    : gain === 0
      ? `Gain 0: heater off. It stays at room temperature, ${ROOM}.`
      : `Gain ${gain}: settles at ${f1(steady(gain))}, ${f1(gap(gain))} below the target of ${TARGET}.`;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {[32, 34, 36, 37].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={py(t)} y2={py(t)} className={t === TARGET ? s.target : s.grid} />
            <text x={L - 4} y={py(t) + 3} textAnchor="end" className={s.axis}>{t}</text>
          </g>
        ))}
        <text x={W - R} y={H - 6} textAnchor="end" className={s.axis}>time →</text>
        {!locked && (
          <polyline points={tr.map((t, i) => `${px(i).toFixed(1)},${py(t).toFixed(1)}`).join(" ")} className={s.trace} />
        )}
        {!locked && <circle cx={px(STEPS)} cy={py(tr[STEPS])} r={4} className={s.dot} />}
        {locked && <circle cx={px(0)} cy={py(ROOM)} r={4} className={s.dot} />}
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {PRESETS.map((p) => (
          <Control key={p} className={gain === p ? "active" : ""} disabled={locked || gain === p} onClick={() => setGain(p)}>
            Gain {p}
          </Control>
        ))}
      </Row>
      <Slider label="Heater gain" value={gain} min={0} max={20} step={1} disabled={locked} onChange={setGain} />
    </div>
  );
}

export default function ThermostatLeftover({ slug }: { slug: string }) {
  const [gain, setGain] = useState(0);
  const [seen, setSeen] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You set a made-up egg incubator to ${TARGET}. The room is ${TARGET - ROOM} colder (${ROOM}). Its heater adds heat in proportion to how far below ${TARGET} it is, with gain ${Q_GAIN}. Where does the temperature settle?`,
        options: [`${TARGET}`, String(steady(Q_GAIN)), `${ROOM}`],
        answer: 1,
      }}
      exploreHint={`Try gain ${Q_GAIN}, then raise it.`}
      minInteractions={2}
      reveal={() => {
        const shown = seen.filter((g) => g > 0).sort((a, b) => a - b);
        return (
          <>
            <p>
              You saw gain {Q_GAIN} settle at <strong>{f1(steady(Q_GAIN))}</strong>, {f1(gap(Q_GAIN))} short.
              {shown.length > 1 ? ` Others: ${shown.filter((g) => g !== Q_GAIN).map((g) => `gain ${g} left ${f1(gap(g))}`).join("; ")}.` : ""} Never zero.
            </p>
            <p>
              The heater only works while there is a gap, so it needs one to keep running. Heat leaking to the room balances heater power when the gap is {TARGET - ROOM} ÷ (1 + gain). Stronger feedback shrinks the gap but a proportional rule cannot erase it. Toy model, one loop, no delay.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["gain-4", "higher-gain"]}>
          {(reach) => (
            <Stage
              locked={locked}
              gain={gain}
              setGain={(g) => {
                setGain(g);
                setSeen((x) => (x.includes(g) ? x : [...x, g]));
                if (g === Q_GAIN) reach("gain-4");
                if (g > Q_GAIN) reach("higher-gain");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
