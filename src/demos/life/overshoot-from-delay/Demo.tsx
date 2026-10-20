"use client";

// Hutchinson delayed logistic: N'(t) = r N(t) (1 - N(t - tau) / K), N in units of the food limit K = 1.
// The population starts at 0.5 (half the limit) and its history before time 0 is held at 0.5.
// The trace is integrated by Euler steps (dt = 0.01 years) over 60 years from the same function the
// readouts, question and reveal use. Swings are sustained once r x tau > pi/2 (about 1.57).
// Key states: r = 0.5 with a 4-year delay (swings), then r = 0.2 with the same delay (settles). Deterministic.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DT = 0.01, T = 60, LATE = 30, START = 0.5, R_HIGH = 0.5, R_LOW = 0.2, TAU_Q = 4, TAU0 = 1;
const MILESTONES = ["swings", "settles"] as const;

function sim(r: number, tau: number): number[] {
  const nd = Math.round(tau / DT), n = Math.round(T / DT);
  const N = new Array<number>(nd + n + 1).fill(START);
  for (let i = nd; i < nd + n; i++) N[i + 1] = N[i] + DT * r * N[i] * (1 - N[i - nd]);
  return N.slice(nd);
}
function stats(N: number[]) {
  const late = N.slice(Math.round(LATE / DT));
  return { hi: Math.max(...late), lo: Math.min(...late) };
}
const x1 = (v: number) => (Math.round(v * 10) / 10).toFixed(1);
const x2 = (v: number) => (Math.round(v * 100) / 100).toFixed(2);

const SWING = stats(sim(R_HIGH, TAU_Q));
const SETTLE = stats(sim(R_LOW, TAU_Q));

const X0 = 30, X1 = 332, Y0 = 118, Y1 = 8, YMAX = 3.2;
const px = (t: number) => X0 + (t / T) * (X1 - X0);
const py = (v: number) => Y0 - (Math.min(v, YMAX) / YMAX) * (Y0 - Y1);

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [r, setR] = useState(R_HIGH);
  const [tau, setTau] = useState(TAU0);
  const N = useMemo(() => sim(r, tau), [r, tau]);
  const st = useMemo(() => stats(N), [N]);
  const d = useMemo(() => N.filter((_, i) => i % 10 === 0).map((v, i) => `${i === 0 ? "M" : "L"}${px(i * 10 * DT).toFixed(1)},${py(v).toFixed(1)}`).join(" "), [N]);
  const go = (nr: number, nt: number) => {
    setR(nr);
    setTau(nt);
    if (nt === TAU_Q && nr === R_HIGH) reach("swings");
    if (nt === TAU_Q && nr === R_LOW) reach("settles");
  };
  const calm = st.hi - st.lo < 0.1;
  const msg = locked
    ? "Toy: population as a share of its food limit, food counted late."
    : calm
      ? `Growth ${r}, delay ${tau} years: it settles near the limit.`
      : `Growth ${r}, delay ${tau} years: it keeps swinging around the limit.`;
  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <svg viewBox="0 0 340 140" className={`stage-svg ${s.svg}`} role="img" aria-label={`Population over ${T} years, highest ${x1(st.hi)} times the limit, lowest ${x2(st.lo)}`}>
        <line className={s.axis} x1={X0} x2={X1} y1={Y0} y2={Y0} />
        <line className={s.axis} x1={X0} x2={X0} y1={Y1} y2={Y0} />
        <line className={s.limit} x1={X0} x2={X1} y1={py(1)} y2={py(1)} />
        <text className={s.tickR} x={X0 - 3} y={py(1) + 3}>limit</text>
        <text className={s.tickR} x={X0 - 3} y={py(0) + 3}>0</text>
        <text className={s.tickR} x={X0 - 3} y={py(3) + 3}>3x</text>
        {[0, 20, 40, 60].map((t) => <text key={t} className={s.tick} x={px(t)} y={Y0 + 11}>{t}</text>)}
        <text className={s.tick} x={(X0 + X1) / 2} y={Y0 + 22}>years</text>
        <path className={s.trace} d={d} />
      </svg>
      <Row>
        <Control className={tau === 2 ? "active" : ""} disabled={locked || tau === 2} onClick={() => go(r, 2)}>Delay 2 years</Control>
        <Control className={tau === TAU_Q ? "active" : ""} disabled={locked || tau === TAU_Q} onClick={() => go(r, TAU_Q)}>Delay {TAU_Q} years</Control>
      </Row>
      <Row>
        <Control className={r === R_HIGH ? "active" : ""} disabled={locked || r === R_HIGH} onClick={() => go(R_HIGH, tau)}>Fast growth {R_HIGH}</Control>
        <Control className={r === R_LOW ? "active" : ""} disabled={locked || r === R_LOW} onClick={() => go(R_LOW, tau)}>Slow growth {R_LOW}</Control>
      </Row>
      <Slider label="Delay" value={tau} min={0} max={5} step={0.5} disabled={locked} onChange={(v) => go(r, v)} format={(v) => `${v} years`} />
      <Row>
        <Readout label="Highest, years 30-60" value={locked ? "?" : `${x1(st.hi)}x limit`} />
        <Readout label="Lowest" value={locked ? "?" : `${x2(st.lo)}x limit`} />
      </Row>
    </div>
  );
}

export default function OvershootFromDelay({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Deer on a toy island grow at ${R_HIGH} a year, but they respond to food that was counted ${TAU_Q} years ago. In the long run, what does the herd do?`,
        options: ["Settles at the food limit", "Swings far above and below the limit, again and again", "Dies out"],
        answer: 1,
      }}
      exploreHint={`Set the delay to ${TAU_Q} years, then slow the growth to ${R_LOW}.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With growth {R_HIGH} and a {TAU_Q}-year delay you saw it climb to <strong>{x1(SWING.hi)} times</strong> the limit and crash to {x2(SWING.lo)} times,
            again and again. With growth {R_LOW} and the same delay it settled at the limit.
          </p>
          <p>
            The population reacts to old food, so it overshoots before the signal arrives. Swings start once growth × delay passes about 1.6:
            here {R_HIGH} × {TAU_Q} = {R_HIGH * TAU_Q}, against {R_LOW * TAU_Q}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
