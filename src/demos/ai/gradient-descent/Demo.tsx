"use client";

// Gradient descent on the simplest valley there is, f(x) = x².
// Each hop moves by (step size × slope), so the position is multiplied by (1 − 2η) every step.
// The payoff: the fastest step size is in the middle. Too small crawls, too big zigzags,
// past 1 it flies off. 0.05 and 0.95 end exactly as far from the bottom after ten steps.
// v2: one-tap 10-hop runs at the four sizes the question names, a record of every finished
// run (so the 0.05 / 0.95 tie can be seen side by side), a live "step × slope" readout,
// and the reveal is gated on having finished a tiny run and a too-big run.

import { useId, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = 4;
const MAX_STEPS = 10;
const XMAX = 6;
const PRESETS = [0.05, 0.45, 0.5, 0.95, 1.05];
const MILESTONES = ["tiny-run", "mid-run", "half-run", "big-run"] as const;
const TINY = 0.1; // a finished run at or below this counts as "tiny"
const BIG = 0.95; // a finished run at or above this counts as "too big"
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
  if (d === 0) return "0";
  if (d < 0.001) return "< 0.001";
  if (d >= 100) return Math.round(d).toLocaleString("en-US");
  return d.toFixed(2);
}

const valley = Array.from({ length: 61 }, (_, i) => {
  const x = -XMAX + (i / 60) * 2 * XMAX;
  return `${i === 0 ? "M" : "L"}${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`;
}).join(" ");

const finalDist = (eta: number) => Math.abs(path(eta, MAX_STEPS)[MAX_STEPS]);
const key = (eta: number) => eta.toFixed(2);

export default function GradientDescent({ slug }: { slug: string }) {
  const [eta, setEta] = useState(0.25);
  const [steps, setSteps] = useState(0);
  const [runs, setRuns] = useState<Record<string, number>>({}); // finished 10-hop runs: size → distance
  const clip = useId().replace(/:/g, "");
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), MILESTONES);

  const xs = path(eta, steps);
  const x = xs[xs.length - 1];
  const dist = Math.abs(x);
  const factor = 1 - 2 * eta;
  const off = dist > XMAX;
  const lastOn = [...xs].reverse().find((v) => Math.abs(v) <= XMAX) ?? START;
  const slope = 2 * x;

  // Called whenever a run reaches 10 hops: record it and check the milestones.
  const finish = (e: number) => {
    setRuns((r) => ({ ...r, [key(e)]: finalDist(e) }));
    if (e <= TINY) reach("tiny-run");
    if (e === 0.45) reach("mid-run");
    if (e === 0.5) reach("half-run");
    if (e >= BIG) reach("big-run");
  };

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (steps === 0) return "Tap Step, or tap a size to run 10 hops.";
    if (Math.abs(factor) > 1) return "Each hop lands farther from the bottom.";
    if (Math.abs(factor) === 1) return "Bouncing between the same two spots forever.";
    if (factor === 0) return "Landed on the bottom in one hop.";
    if (dist < 0.05) return "Now within 0.05 of the bottom.";
    if (factor < 0) return "Overshooting: it zigzags across the valley.";
    if (factor > 0.6) return "Slow: each hop covers under 40% of the distance left.";
    return "Heading down; each hop is shorter than the last.";
  };

  const runList = Object.keys(runs)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => `${k}: ${fmtDist(runs[k])}`);

  const tinyKey = Object.keys(runs)
    .filter((k) => Number(k) <= TINY)
    .sort((a, b) => Number(a) - Number(b))[0];
  const bigKey = Object.keys(runs)
    .filter((k) => Number(k) >= BIG)
    .sort((a, b) => Number(a) - Number(b))[0];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A ball hops down this valley. Each hop = step size × slope (how steep it is under the ball). After 10 hops, which step size ends closest to the bottom?",
        options: ["0.05", "0.45", "0.95"],
        answer: 1,
      }}
      exploreHint="Tap each step size to run 10 hops and compare how far from the bottom each ends."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {tinyKey ? (
              <>
                At <strong>{tinyKey}</strong> the ball crawled and ended <strong>{fmtDist(runs[tinyKey])}</strong> from
                the bottom.{" "}
              </>
            ) : null}
            {bigKey && Number(bigKey) > 1 ? (
              <>
                At <strong>{bigKey}</strong> every hop landed farther away: it ended {fmtDist(runs[bigKey])} out.{" "}
              </>
            ) : bigKey ? (
              <>
                At <strong>{bigKey}</strong> it leapt past the bottom, zigzagged, and ended{" "}
                <strong>{fmtDist(runs[bigKey])}</strong> away
                {tinyKey === "0.05" && bigKey === "0.95" ? ": exactly as far as 0.05." : "."}{" "}
              </>
            ) : null}
            At <strong>0.45</strong> it ended {runs["0.45"] !== undefined ? fmtDist(runs["0.45"]) : "right at"} from the bottom,
            and <strong>0.50</strong> landed on it in one hop.
          </p>
          <p>
            On this valley each hop multiplies the distance by (1 − 2 × step size): 0.9 at 0.05, 0.1 at 0.45, 0 at 0.50
            (so it lands at once), −0.9 at 0.95. Past 1 it drops below −1, so every hop lands farther out.
          </p>
          <p className="muted">
            Training a neural network uses the same rule on millions of numbers at once. Its step size is called the
            learning rate, and it is often the most important setting to tune.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const runAt = (e: number) => {
          setEta(e);
          setSteps(MAX_STEPS);
          finish(e);
        };
        return (
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

              <line x1={px(0)} y1={BOT + 9} x2={px(START)} y2={BOT + 9} stroke="var(--muted)" strokeWidth={2} strokeDasharray="2 3" />
              {!locked && (
                <line
                  x1={px(0)}
                  y1={BOT + 9}
                  x2={Math.max(L, Math.min(R, px(x)))}
                  y2={BOT + 9}
                  stroke={off ? "var(--bad)" : "var(--domain)"}
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              )}

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
            {!locked && (
              <p className={s.rule}>
                {off
                  ? "Off the valley."
                  : `Next hop = ${eta.toFixed(2)} × slope ${slope.toFixed(slope === 0 || Math.abs(slope) >= 10 ? 1 : 2)} = ${fmtDist(Math.abs(eta * slope))}. Distance × ${factor.toFixed(2).replace("-", "−")} per hop.`}
              </p>
            )}

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
              }}
            />
            <Row>
              <span className="muted small">Run 10 at</span>
              {PRESETS.map((p) => (
                <Control
                  key={p}
                  className={eta === p && steps === MAX_STEPS ? "active" : ""}
                  disabled={locked || (eta === p && steps === MAX_STEPS)}
                  onClick={() => runAt(p)}
                  aria-label={`Run 10 hops at step size ${p.toFixed(2)}`}
                >
                  {p.toFixed(2)}
                </Control>
              ))}
            </Row>
            <Row>
              <Control
                disabled={locked || steps >= MAX_STEPS}
                onClick={() => {
                  const n = Math.min(MAX_STEPS, steps + 1);
                  setSteps(n);
                  if (n === MAX_STEPS) finish(eta);
                }}
              >
                Step
              </Control>
              <Control disabled={locked || steps >= MAX_STEPS} onClick={() => runAt(eta)}>
                Run 10
              </Control>
              <Control disabled={locked || steps === 0} onClick={() => setSteps(0)}>
                Reset
              </Control>
              <span className={s.stats}>
                <Readout label="Hops" value={`${steps}/${MAX_STEPS}`} />
                <Readout label="From bottom" value={fmtDist(dist)} />
              </span>
            </Row>
            {runList.length > 0 && <p className={s.runs}>Distance from bottom after 10 hops, by step size · {runList.join(" · ")}</p>}
          </div>
        );
      }}
    </Lesson>
  );
}
