"use client";

// Learning-rate overshoot on f(x) = x^2 from x = 1. Each step: x <- x - eta * 2x = (1 - 2 eta) x,
// so the distance from the bottom is multiplied by |1 - 2 eta| every step.
// eta 0.1: x0.8 per step; 0.4: x0.2; 0.5: lands on 0 in one step; 1.0: bounces 1, -1, 1, ...;
// 1.1: -1.2, 1.44, -1.728, 2.074, -2.488 (|x| = 1.2^5 = 2.49 after 5 steps). Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const X0 = 1;
const ETAS = [0.1, 0.4, 0.5, 1.0, 1.1] as const;
const Q_ETA = 1.1;
const Q_STEPS = 5;
const MAX_STEPS = 6;
const f = (x: number) => x * x;
/** Positions x_0 .. x_n under x <- x - eta * f'(x). */
function path(eta: number, n: number) {
  const xs = [X0];
  for (let i = 0; i < n; i++) xs.push(xs[i] - eta * 2 * xs[i]);
  return xs;
}
const factor = (eta: number) => Math.abs(1 - 2 * eta);
// MODEL END

const X = (x: number) => 160 + x * 48;
const Y = (y: number) => 156 - y * 14.5;
const curve = Array.from({ length: 61 }, (_, i) => {
  const x = -3 + i * 0.1;
  return `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`;
}).join(" ");
const fmt = (v: number) => (Math.abs(v) < 0.001 && v !== 0 ? v.toExponential(1) : v.toFixed(Math.abs(v) < 0.1 ? 4 : 3));

export default function StepTooLong({ slug }: { slug: string }) {
  const [eta, setEta] = useState<number>(ETAS[0]);
  const [steps, setSteps] = useState(0);
  const [seenQ, setSeenQ] = useState<number | null>(null); // furthest step count seen at Q_ETA

  const xs = path(eta, steps);
  const x = xs[xs.length - 1];
  const qDist = Math.abs(path(Q_ETA, Q_STEPS)[Q_STEPS]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You run gradient descent down the bowl f(x) = x², starting at x = 1. Each step does x ← x − η·2x, with step size η = ${Q_ETA}. After ${Q_STEPS} steps, how far is x from the bottom?`,
        options: ["Under 0.1", "About 1 (circling)", `About ${qDist.toFixed(1)}`],
        answer: 2,
      }}
      exploreHint="Pick a step size, then step. Find the fastest size and the one that breaks."
      minInteractions={1}
      reveal={() => {
        const p = path(Q_ETA, Q_STEPS);
        return (
          <>
            <p>
              At η = {Q_ETA} each step jumped clean over the bottom and landed higher on the far wall:{" "}
              {p
                .slice(1)
                .map((v) => v.toFixed(2))
                .join(", ")}
              .{" "}
              {seenQ !== null && seenQ >= Q_STEPS
                ? `You watched it reach ${Math.abs(path(Q_ETA, seenQ)[seenQ]).toFixed(2)} from the bottom.`
                : `After ${Q_STEPS} steps it is ${qDist.toFixed(2)} away.`}
            </p>
            <p>
              Each step multiplies the distance by |1 − 2η|: {factor(0.4).toFixed(1)} at η = 0.4, exactly 0 at 0.5 (one step
              lands on the bottom), 1 at η = 1 (bouncing forever), {factor(Q_ETA).toFixed(1)} at {Q_ETA}. Past η = 1 every step
              makes things worse.
            </p>
            <p>A bigger step is not a faster trip: past a limit set by the slope&apos;s steepness, it never arrives.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["widening-zigzag"]}>
          {(reach) => {
            const pick = (e: number) => {
              setEta(e);
              setSteps(0);
            };
            const goTo = (n: number) => {
              const m = Math.min(MAX_STEPS, n);
              setSteps(m);
              if (eta > 1 && m >= 2) reach("widening-zigzag");
              if (eta === Q_ETA) setSeenQ((v) => Math.max(v ?? 0, m));
            };
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy loss f(x) = x² · start x = 1</span>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={`Step size ${eta}, after ${steps} steps`}>
                  <path d={curve} fill="none" stroke="var(--line)" strokeWidth={2.5} />
                  <line x1={X(0)} y1={Y(0) + 4} x2={X(0)} y2={Y(0) + 10} stroke="var(--muted)" />
                  <text x={X(0)} y={168} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                    bottom
                  </text>
                  {!locked &&
                    xs.slice(1).map((v, i) => (
                      <line
                        key={`m${i}`}
                        x1={X(xs[i])}
                        y1={Y(f(xs[i]))}
                        x2={X(v)}
                        y2={Y(f(v))}
                        stroke="var(--domain)"
                        strokeWidth={1.5}
                        strokeDasharray="4 3"
                      />
                    ))}
                  {!locked &&
                    xs.slice(0, -1).map((v, i) => (
                      <circle key={`p${i}`} cx={X(v)} cy={Y(f(v))} r={3.5} fill="var(--muted)" />
                    ))}
                  <circle cx={X(locked ? X0 : x)} cy={Y(f(locked ? X0 : x)) - 7} r={7} fill="var(--domain)" stroke="var(--fg)" strokeWidth={1.5} />
                  <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                    {locked ? "Ball starts at x = 1" : `η = ${eta} · step ${steps}`}
                  </text>
                </svg>
                <Row>
                  {ETAS.map((e) => (
                    <Control
                      key={e}
                      className={eta === e ? "active" : ""}
                      disabled={locked || (eta === e && steps === 0)}
                      onClick={() => pick(e)}
                    >
                      η {e.toFixed(1)}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Control disabled={locked || steps >= MAX_STEPS} onClick={() => goTo(steps + 1)}>
                    Step
                  </Control>
                  <Control disabled={locked || steps >= Q_STEPS} onClick={() => goTo(Q_STEPS)}>
                    To step {Q_STEPS}
                  </Control>
                  <Readout label="Distance from bottom" value={locked ? "–" : fmt(Math.abs(x))} />
                  <Readout label="Per-step factor" value={locked ? "–" : `× ${factor(eta).toFixed(1)}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
