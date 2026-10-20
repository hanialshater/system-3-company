"use client";

// Symmetry toy. Network: y = v1 tanh(w1 x + b1) + v2 tanh(w2 x + b2), mean squared error on four points
// (x = -1.5, -0.5, 0.5, 1.5; targets 0, 1, 1, 0: a bump), plain gradient descent, learning rate 0.3.
// Both units start at w = 0.5, b = 0, v = 1. Everything is deterministic; no randomness anywhere.
// Identical units receive identical gradients (same arithmetic on equal numbers), so the gap stays exactly 0.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
interface Unit {
  w: number;
  b: number;
  v: number;
}
interface Pt {
  step: number;
  w1: number;
  w2: number;
  loss: number;
}
const XS = [-1.5, -0.5, 0.5, 1.5];
const TS = [0, 1, 1, 0];
const LR = 0.3;
const CHUNK = 200;
const NUDGE = 0.01;
const START: Unit[] = [
  { w: 0.5, b: 0, v: 1 },
  { w: 0.5, b: 0, v: 1 },
];
const predict = (us: Unit[], x: number) => us.reduce((t, u) => t + u.v * Math.tanh(u.w * x + u.b), 0);
const lossOf = (us: Unit[]) => XS.reduce((t, x, i) => t + (predict(us, x) - TS[i]) ** 2, 0) / XS.length;
const point = (step: number, us: Unit[]): Pt => ({ step, w1: us[0].w, w2: us[1].w, loss: lossOf(us) });
function stepOnce(us: Unit[]): Unit[] {
  const g = us.map(() => ({ w: 0, b: 0, v: 0 }));
  XS.forEach((x, i) => {
    const e = ((predict(us, x) - TS[i]) * 2) / XS.length;
    us.forEach((u, j) => {
      const h = Math.tanh(u.w * x + u.b);
      const d = e * u.v * (1 - h * h);
      g[j].v += e * h;
      g[j].w += d * x;
      g[j].b += d;
    });
  });
  return us.map((u, j) => ({ w: u.w - LR * g[j].w, b: u.b - LR * g[j].b, v: u.v - LR * g[j].v }));
}
// MODEL END

interface Run {
  units: Unit[];
  pts: Pt[];
  /** step and index (in pts) of the first nudge point */
  nudgeAt: number | null;
  nudgeIdx: number | null;
}
const FRESH: Run = { units: START, pts: [point(0, START)], nudgeAt: null, nudgeIdx: null };

function train(r: Run, n: number): Run {
  let us = r.units;
  const pts = [...r.pts];
  let step = pts[pts.length - 1].step;
  for (let i = 0; i < n; i++) {
    us = stepOnce(us);
    step += 1;
    pts.push(point(step, us));
  }
  return { ...r, units: us, pts };
}
function nudge(r: Run): Run {
  const us = r.units.map((u, j) => (j === 1 ? { ...u, w: u.w + NUDGE } : u));
  const step = r.pts[r.pts.length - 1].step;
  return {
    units: us,
    pts: [...r.pts, point(step, us)],
    nudgeAt: r.nudgeAt ?? step,
    nudgeIdx: r.nudgeIdx ?? r.pts.length,
  };
}

const gap = (p: Pt) => Math.abs(p.w1 - p.w2);
const fmtGap = (g: number) => (g === 0 ? "0" : g.toFixed(3));
const f3 = (v: number) => v.toFixed(3);

// chart geometry
const L = 38;
const R = 312;
const T = 12;
const B = 196;
const YMAX = 2;

export default function TwinsNeverSplit({ slug }: { slug: string }) {
  const [run, setRun] = useState<Run>(FRESH);
  const last = run.pts[run.pts.length - 1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You build a network whose two hidden units start identical (weight 0.5, output weight 1, bias 0), then train it by gradient descent on four varied data points. After ${CHUNK} steps, how much do their weights differ?`,
        options: ["By a little", "They stay exactly equal", "By a lot"],
        answer: 1,
      }}
      exploreHint="Train the twins, then nudge one by a hair and train on."
      minInteractions={2}
      reveal={() => {
        const pre = run.nudgeIdx === null ? run.pts : run.pts.slice(0, run.nudgeIdx);
        const preLast = pre[pre.length - 1];
        const preMax = Math.max(...pre.map(gap));
        const nudged = run.nudgeAt !== null;
        const atNudge = run.nudgeIdx === null ? undefined : run.pts[run.nudgeIdx];
        return (
          <>
            {preLast.step > 0 && (
              <p>
                The twins trained to step {preLast.step} with w1 = w2 = {f3(preLast.w1)}; their largest gap on the way was{" "}
                {fmtGap(preMax)}. Equal units get equal updates, so nothing in the data can pull them apart.
              </p>
            )}
            {nudged && last.step > (run.nudgeAt ?? 0) && (
              <p>
                A nudge of {NUDGE} on unit 2 grew into a gap of {fmtGap(gap(last))} by step {last.step}
                {atNudge ? `, and the loss fell from ${f3(atNudge.loss)} to ${f3(last.loss)}` : ""}.
              </p>
            )}
            <p>That is why networks start from random weights: units that begin alike stay alike and cannot specialise.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["trained", "nudged"]}>
          {(reach) => {
            const xmax = Math.max(2 * CHUNK, last.step);
            const X = (st: number) => L + ((R - L) * st) / xmax;
            const Y = (w: number) => (T + B) / 2 - ((B - T) / 2) * (Math.max(-YMAX, Math.min(YMAX, w)) / YMAX);
            const path = (k: "w1" | "w2") => run.pts.map((p, i) => `${i ? "L" : "M"}${X(p.step).toFixed(1)},${Y(p[k]).toFixed(1)}`).join("");
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy: 2 units, 4 data points</span>
                <p className={s.caption}>Solid and dashed lines: each unit&apos;s input weight, step by step.</p>
                <svg viewBox="0 0 320 222" className="stage-svg" role="img" aria-label={`Weights of two units over ${last.step} steps`}>
                  <line x1={L} y1={T} x2={L} y2={B} stroke="var(--line)" strokeWidth={1.5} />
                  <line x1={L} y1={Y(0)} x2={R} y2={Y(0)} stroke="var(--line)" strokeWidth={1.5} />
                  {[-1, 1].map((t) => (
                    <g key={t}>
                      <line x1={L} y1={Y(t)} x2={R} y2={Y(t)} stroke="var(--line)" strokeWidth={0.7} strokeDasharray="2 4" />
                      <text x={L - 5} y={Y(t) + 3} textAnchor="end" className={s.tiny} fill="var(--muted)">
                        {t}
                      </text>
                    </g>
                  ))}
                  <text x={L - 5} y={Y(0) + 3} textAnchor="end" className={s.tiny} fill="var(--muted)">
                    0
                  </text>
                  <text x={R} y={B + 14} textAnchor="end" className={s.tiny} fill="var(--muted)">
                    step {Math.round(xmax)}
                  </text>
                  <text x={L} y={B + 14} className={s.tiny} fill="var(--muted)">
                    0
                  </text>
                  {!locked && run.pts.length > 1 && (
                    <>
                      {run.nudgeAt !== null && (
                        <>
                          <line x1={X(run.nudgeAt)} y1={T} x2={X(run.nudgeAt)} y2={B} stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 3" />
                          <text x={X(run.nudgeAt) + 3} y={T + 9} className={s.tiny} fill="var(--muted)">
                            nudge +{NUDGE}
                          </text>
                        </>
                      )}
                      <path d={path("w1")} fill="none" stroke="var(--domain)" strokeWidth={5} strokeLinejoin="round" />
                      <path d={path("w2")} fill="none" stroke="var(--fg)" strokeWidth={2} strokeDasharray="5 4" strokeLinejoin="round" />
                    </>
                  )}
                  {!locked && (
                    <>
                      <circle cx={X(last.step)} cy={Y(last.w1)} r={5} fill="var(--domain)" />
                      <circle cx={X(last.step)} cy={Y(last.w2)} r={2.5} fill="var(--fg)" />
                    </>
                  )}
                </svg>
                <Row>
                  <Readout label="Step" value={locked ? "–" : last.step} />
                  <Readout label="w1 · w2" value={locked ? "–" : `${f3(last.w1)} · ${f3(last.w2)}`} />
                  <Readout label="Gap" value={locked ? "–" : fmtGap(gap(last))} />
                  <Readout label="Loss" value={locked ? "–" : f3(last.loss)} />
                </Row>
                <Row>
                  <Control
                    disabled={locked}
                    onClick={() => {
                      setRun(train(run, CHUNK));
                      reach("trained");
                    }}
                  >
                    Train {CHUNK} steps
                  </Control>
                  <Control
                    disabled={locked}
                    onClick={() => {
                      setRun(train(nudge(run), CHUNK));
                      reach("nudged");
                    }}
                  >
                    Nudge unit 2, train {CHUNK}
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
