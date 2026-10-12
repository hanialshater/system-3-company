"use client";

// Gradient descent on the simplest valley there is, f(x) = x².
// Each hop moves by (step size × slope), so the position is multiplied by (1 − 2η) every step.
// The payoff: the fastest step size is in the middle. Too small crawls, too big zigzags,
// past 1 it flies off. 0.05 and 0.95 end exactly as far from the bottom after ten steps.

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const START = 4;
const MAX_STEPS = 10;
const XMAX = 6;
const f = (x: number) => x * x;

// Plot geometry (viewBox 320 × 200).
const L = 16;
const R = 304;
const TOP = 14;
const BOT = 178;
const px = (x: number) => L + ((x + XMAX) / (2 * XMAX)) * (R - L);
const py = (y: number) => BOT - (y / (XMAX * XMAX)) * (BOT - TOP);

function path(eta: number, steps: number): number[] {
  const xs = [START];
  for (let i = 0; i < steps; i++) {
    const x = xs[xs.length - 1];
    xs.push(x - eta * 2 * x); // x − η·f′(x), with f′(x) = 2x
  }
  return xs;
}

function fmtDist(d: number) {
  if (d < 0.001) return "< 0.001";
  if (d >= 100) return Math.round(d).toLocaleString("en-US");
  return d.toFixed(2);
}

const valley = Array.from({ length: 61 }, (_, i) => {
  const x = -XMAX + (i / 60) * 2 * XMAX;
  return `${i === 0 ? "M" : "L"}${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`;
}).join(" ");

export default function GradientDescent({ slug }: { slug: string }) {
  const [eta, setEta] = useState(0.05);
  const [steps, setSteps] = useState(0);
  const clip = useId().replace(/:/g, "");

  const xs = path(eta, steps);
  const x = xs[xs.length - 1];
  const dist = Math.abs(x);
  const factor = 1 - 2 * eta;
  const off = dist > XMAX;
  const lastOn = [...xs].reverse().find((v) => Math.abs(v) <= XMAX) ?? START;

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (steps === 0) return "Tap Step. Each hop = step size × slope.";
    if (Math.abs(factor) > 1) return "Each hop lands farther from the bottom.";
    if (Math.abs(factor) === 1) return "Bouncing between the same two spots forever.";
    if (factor === 0) return "Landed on the bottom in one hop.";
    if (factor < 0) return "Overshooting: it zigzags across the valley.";
    if (factor > 0.6) return "Crawling: the hops are tiny.";
    return "Close to the bottom in a few hops.";
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A ball hops down this valley. Each hop = step size × slope. After 10 hops, which step size ends closest to the bottom?",
        options: ["0.05", "0.45", "0.95"],
        answer: 1,
      }}
      exploreHint="Try 0.05, 0.45, 0.95 and 1.05. Run 10 hops each."
      reveal={() => (
        <>
          <p>
            At <strong>0.05</strong> the ball crawls, and at <strong>0.95</strong> it leaps past the bottom and
            zigzags. After 10 hops both end <strong>1.39</strong> from the bottom, exactly the same. At{" "}
            <strong>0.45</strong> it is within 0.04 of the bottom after two hops. Past <strong>1</strong>, every hop lands farther away.
          </p>
          <p>
            On this valley each hop multiplies the distance by (1 − 2 × step size). Big steps are not fast steps:
            fast is where that number is near zero.
          </p>
          <p className="muted">
            Training a neural network uses the same rule on millions of numbers at once. The step size, called the
            learning rate, is often the most important setting to tune.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.gd}>
          <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="A ball hopping down a valley">
            <defs>
              <clipPath id={clip}>
                <rect x={L} y={0} width={R - L} height={BOT + 4} />
              </clipPath>
            </defs>
            <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
            <path d={valley} fill="none" stroke="var(--fg)" strokeWidth={2.5} opacity={0.8} />
            <line x1={px(0)} y1={BOT} x2={px(0)} y2={BOT + 6} stroke="var(--good)" strokeWidth={2} />
            <text x={px(0)} y={BOT + 18} textAnchor="middle" className={s.label} fill="var(--good)">
              bottom
            </text>
            <text x={px(START)} y={BOT + 18} textAnchor="middle" className={s.label} fill="var(--muted)">
              start
            </text>

            <g clipPath={`url(#${clip})`}>
              {xs.slice(1).map((b, i) => {
                const a = xs[i];
                const x1 = px(a);
                const y1 = py(f(a));
                const x2 = px(b);
                const y2 = py(f(b));
                const lift = Math.min(40, 10 + Math.abs(x2 - x1) * 0.25);
                const cx = (x1 + x2) / 2;
                const cy = Math.min(y1, y2) - lift;
                return (
                  <path
                    key={i}
                    d={`M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`}
                    fill="none"
                    stroke="var(--domain)"
                    strokeWidth={1.6}
                    strokeDasharray="4 3"
                    opacity={0.35 + (0.65 * (i + 1)) / xs.length}
                  />
                );
              })}
              {xs.slice(0, -1).map((v, i) => (
                <circle key={i} cx={px(v)} cy={py(f(v))} r={2.5} fill="var(--domain)" opacity={0.5} />
              ))}
            </g>

            {off ? (
              <text
                x={x > 0 ? R - 2 : L + 2}
                y={TOP + 10}
                textAnchor={x > 0 ? "end" : "start"}
                className={s.warn}
                fill="var(--bad)"
              >
                {x > 0 ? "flew off →" : "← flew off"}
              </text>
            ) : null}
            <circle
              cx={px(off ? lastOn : x)}
              cy={py(f(off ? lastOn : x))}
              r={8}
              fill={off ? "var(--bad)" : "var(--domain)"}
              stroke="var(--bg-2)"
              strokeWidth={2}
              opacity={off ? 0.4 : 1}
            />
          </svg>

          <p className={s.msg} aria-live="polite">
            {message(locked)}
          </p>

          <Slider
            label="Step size"
            value={eta}
            min={0.05}
            max={1.05}
            step={0.05}
            disabled={locked}
            format={(v) => v.toFixed(2)}
            onChange={(v) => {
              setEta(Math.round(v * 100) / 100);
              setSteps(0);
              interact();
            }}
          />
          <Row>
            <Control
              disabled={locked || steps >= MAX_STEPS}
              onClick={() => {
                setSteps((n) => Math.min(MAX_STEPS, n + 1));
                interact();
              }}
            >
              Step
            </Control>
            <Control
              disabled={locked || steps >= MAX_STEPS}
              onClick={() => {
                setSteps(MAX_STEPS);
                interact();
              }}
            >
              Run 10
            </Control>
            <Control
              disabled={locked || steps === 0}
              onClick={() => {
                setSteps(0);
                interact();
              }}
            >
              Reset
            </Control>
            <span className={s.stats}>
              <Readout label="Hops" value={`${steps}/${MAX_STEPS}`} />
              <Readout label="From bottom" value={fmtDist(dist)} />
            </span>
          </Row>
        </div>
      )}
    </Lesson>
  );
}
