"use client";

// Heavy-ball momentum on a long thin valley f = 1/2 (x^2 + 25 y^2), start (4, 1),
// step size 0.07, velocity v <- beta * v - 0.07 * grad f, position += v, stop within 0.1 of
// the bottom (0, 0). Steps: beta 0 -> 51, 0.5 -> 21, 0.8 -> 19, 0.9 -> 30. At 0.9 the ball
// overshoots the bottom along the valley three times (furthest to x = -2.17).

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const ETA = 0.07;
const START: [number, number] = [4, 1];
const TOL = 0.1;
const BETAS = [0, 0.5, 0.8, 0.9] as const;

/** Positions visited until within TOL of (0, 0) (start included). */
function descend(beta: number) {
  let [x, y] = START;
  let vx = 0;
  let vy = 0;
  const path: [number, number][] = [[x, y]];
  while (Math.hypot(x, y) >= TOL && path.length < 1000) {
    vx = beta * vx - ETA * x; // df/dx = x
    vy = beta * vy - ETA * 25 * y; // df/dy = 25 y
    x += vx;
    y += vy;
    path.push([x, y]);
  }
  return path;
}
const stepsFor = (beta: number) => descend(beta).length - 1;
// MODEL END

// Plane x in [-2.6, 4.4], y in [-1.25, 1.25], 40 px per unit, origin at (124, 104).
const X = (x: number) => 20 + (x + 2.6) * 40;
const Y = (y: number) => 104 - y * 40;

export default function MomentumSweetSpot({ slug }: { slug: string }) {
  const [beta, setBeta] = useState<number>(0);
  const [tried, setTried] = useState<Record<string, number>>({ "0": stepsFor(0) });
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["saw-0.8", "saw-0.9"]);
  const path = descend(beta);

  const choose = (b: number) => {
    setBeta(b);
    setTried((t) => ({ ...t, [String(b)]: stepsFor(b) }));
    if (b === 0.8) reach("saw-0.8");
    if (b === 0.9) reach("saw-0.9");
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On a long thin valley, plain gradient descent needs 51 steps to get within 0.1 of the bottom. Keeping 80% of the previous step's velocity (momentum 0.8) needs 19. Momentum 0.9 needs:",
        options: ["Fewer than 19", "About 30", "About 51"],
        answer: 1,
      }}
      exploreHint="Try each momentum. Count the steps and watch the path."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Momentum 0.9 took <strong>{stepsFor(0.9)} steps</strong>, more than 0.8&apos;s {stepsFor(0.8)}. With none, the ball
            crept along the valley floor ({stepsFor(0)} steps). Some memory of past steps kept it rolling the long way and
            smoothed the zigzag: 0.5 took {stepsFor(0.5)}, 0.8 took {stepsFor(0.8)}.
          </p>
          <p>
            At 0.9 it carried so much speed that it shot past the bottom, rolled back and overshot again, three times. Momentum
            speeds descent only up to a point; too much and the ball keeps overshooting.
          </p>
          <p className="muted">Toy valley, invented; real loss surfaces are not this shape.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 210" className="stage-svg" role="img" aria-label={`Momentum ${beta}: ${path.length - 1} steps`}>
              <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                Toy valley, seen from above. Bottom at ✕
              </text>
              {[0.5, 2, 4.5, 8, 12.5].map((lvl) => (
                <ellipse
                  key={lvl}
                  cx={X(0)}
                  cy={Y(0)}
                  rx={Math.sqrt(2 * lvl) * 40}
                  ry={Math.sqrt((2 * lvl) / 25) * 40}
                  fill="none"
                  stroke="var(--line)"
                />
              ))}
              <path d={`M${X(0) - 5},${Y(0) - 5} l10,10 m0,-10 l-10,10`} stroke="var(--fg)" strokeWidth={2} />
              <circle cx={X(0)} cy={Y(0)} r={TOL * 40} fill="var(--good)" opacity={0.5} />
              {!locked && (
                <>
                  <polyline points={path.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ")} fill="none" stroke="var(--domain)" strokeWidth={2} />
                  {path.map(([x, y], i) => (
                    <circle key={i} cx={X(x)} cy={Y(y)} r={2.2} fill="var(--domain)" />
                  ))}
                </>
              )}
              <circle cx={X(START[0])} cy={Y(START[1])} r={7} fill="var(--fg)" />
              <text x={X(START[0])} y={Y(START[1]) - 11} textAnchor="middle" className={s.tiny} fill="var(--fg)">
                start
              </text>
              <text x={160} y={196} textAnchor="middle" className={s.label} fill="var(--fg)">
                {locked ? "" : `${path.length - 1} steps to reach the green spot`}
              </text>
            </svg>
            <Row>
              <span className={s.small}>Momentum:</span>
              {BETAS.map((b) => (
                <Control key={b} className={beta === b ? "active" : ""} aria-pressed={beta === b} disabled={locked || beta === b} onClick={() => choose(b)}>
                  {b === 0 ? "0 (none)" : b}
                </Control>
              ))}
            </Row>
            <Row>
              {BETAS.map((b) => (
                <Readout key={b} label={`steps at ${b}`} value={!locked && tried[String(b)] !== undefined ? tried[String(b)] : "–"} />
              ))}
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
