"use client";

// Push the swing in time. A swing with a natural period of 2.0 s (rope 0.99 m,
// T = 2 pi sqrt(L/g)) gets 8 equal forward shoves at a steady rhythm, starting from
// rest. Each shove is a short kick to the swing's speed, always forward.
//
// Model: small-angle damped oscillator, theta'' = -w^2 theta - 2 z w theta', w = pi
// rad/s, z = 0.01, kicks of 4 degrees' worth of amplitude each (illustrative values).
// Every 2 s, each kick lands as the swing moves forward through the bottom, so they
// add up (25.5 degrees after 8). Every 1 s or 3 s, every other kick lands as the swing
// comes back, stopping it, so it never gets past one kick's 3.9 degrees.
// v2: the three runs' highest swings sit side by side as readouts; the rope readout is gone; the dot colours are
// explained in the hint; the reveal only quotes rhythms the learner ran.
// Runs play 8x faster than real time (1, 2 or 3 s). The reveal unlocks once a run at
// the natural period has finished.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useMemo, useRef, useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const T0 = 2.0; // natural period, s
const OMEGA = (2 * Math.PI) / T0;
const ZETA = 0.01;
const KICK = (4 * Math.PI) / 180 * OMEGA; // rad/s: one kick from rest gives about 4 degrees
const N_PUSH = 8;
const SPEEDUP = 8;
const DT = 1 / 2400;
const RHYTHMS = [2, 1, 3] as const;

type Run = { period: number; theta: number[]; pushes: ("help" | "fight")[]; maxDeg: number };

function simulate(period: number): Run {
  let x = 0;
  let v = 0;
  let k = 0;
  let mx = 0;
  const theta: number[] = [];
  const pushes: Run["pushes"] = [];
  const steps = Math.round((N_PUSH * period) / DT);
  for (let i = 0; i <= steps; i++) {
    const t = i * DT;
    if (k < N_PUSH && t >= k * period - 1e-9) {
      pushes.push(v > -0.3 * KICK ? "help" : "fight"); // from still or moving forward: the shove adds
      v += KICK;
      k++;
    }
    theta.push(x);
    const a = -OMEGA * OMEGA * x - 2 * ZETA * OMEGA * v;
    v += a * DT;
    x += v * DT;
    mx = Math.max(mx, Math.abs(x));
  }
  return { period, theta, pushes, maxDeg: (mx * 180) / Math.PI };
}

const W = 320;
const H = 190;
const PX = 160;
const PY = 16;
const LEN = 118; // px for the rope

export default function PushTheSwing({ slug }: { slug: string }) {
  const runs = useMemo(() => Object.fromEntries(RHYTHMS.map((p) => [p, simulate(p)])) as Record<number, Run>, []);
  const [period, setPeriod] = useState<number | null>(null);
  const [t, setT] = useState(0); // simulated seconds
  const [playing, setPlaying] = useState(false);
  const [best, setBest] = useState<Record<number, number>>({});
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["resonant-run"]);
  const reachRef = useRef(reach);
  reachRef.current = reach;

  const run = period ? runs[period] : null;
  const tEnd = run ? N_PUSH * run.period : 0;

  useEffect(() => {
    if (!playing || !run) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const tt = Math.min(tEnd, ((now - start) / 1000) * SPEEDUP);
      setT(tt);
      if (tt >= tEnd) {
        setPlaying(false);
        setBest((b) => ({ ...b, [run.period]: run.maxDeg }));
        if (run.period === T0) reachRef.current("resonant-run");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, run, tEnd]);

  const idx = run ? Math.min(run.theta.length - 1, Math.round(t / DT)) : 0;
  const theta = run ? run.theta[idx] : 0;
  let soFar = 0;
  if (run) for (let i = 0; i <= idx; i += 24) soFar = Math.max(soFar, Math.abs(run.theta[i]));
  const soFarDeg = (soFar * 180) / Math.PI;
  const pushesDone = run ? Math.min(N_PUSH, Math.floor(t / run.period + 1e-9) + 1) : 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "At the playground, the swing you are pushing takes 2 s to go out and back. You have 8 equal shoves to give. Which rhythm builds the biggest swing?",
        options: ["A shove every 2 s", "A shove every 1 s", "A shove every 3 s"],
        answer: 0,
      }}
      exploreHint="Try each rhythm. Green dot: the shove added to the swing. Red dot: it met the swing coming back."
      minInteractions={1}
      reveal={() => {
        const b2 = (best[2] ?? runs[2].maxDeg).toFixed(0);
        const others = [1, 3].filter((p) => best[p] !== undefined);
        return (
          <>
            <p>
              Shoving every 2 s took the swing to <strong>{b2}°</strong>: every shove met it moving forward, so each one
              added.{" "}
              {others.length
                ? `Every ${others.join(" s or every ")} s it never passed ${Math.round(best[others[0]])}°: every other shove hit it coming back and stopped it.`
                : "You did not try the other rhythms. In this model, with them every other shove hits the swing coming back and stops it."}
            </p>
            <p>
              A swing has its own rhythm, set by its length. Shoves in step with it pile up; shoves out of step undo each
              other. More shoves is not more swing.
            </p>
            <p className="muted">Model: small swings, light friction, equal shoves. This is resonance.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : !run
            ? "Swing takes 2 s out and back. Each button starts a new run from rest, played 8× fast."
            : playing
              ? `Every ${run.period} s: shove ${pushesDone} of ${N_PUSH}. Highest so far ${soFarDeg.toFixed(0)}°.`
              : `Every ${run.period} s: highest swing ${run.maxDeg.toFixed(0)}°.`;
        const bx = PX + LEN * Math.sin(theta);
        const by = PY + LEN * Math.cos(theta);
        const arc = (deg: number) => {
          const r = (deg * Math.PI) / 180;
          return `M ${PX - LEN * Math.sin(r)} ${PY + LEN * Math.cos(r)} A ${LEN} ${LEN} 0 0 0 ${PX + LEN * Math.sin(r)} ${PY + LEN * Math.cos(r)}`;
        };
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
              <line x1={PX - 40} y1={PY} x2={PX + 40} y2={PY} className={s.beam} />
              <path d={arc(40)} className={s.track} />
              {soFarDeg > 0.5 && <path d={arc(soFarDeg)} className={s.reach} />}
              <line x1={PX} y1={PY} x2={bx} y2={by} className={s.rope} />
              <g transform={`translate(${bx} ${by}) rotate(${(-theta * 180) / Math.PI})`}>
                <rect x={-12} y={-2} width={24} height={6} rx={2} className={s.seat} />
              </g>
              <text x={PX - LEN * Math.sin(0.7) - 6} y={PY + LEN * Math.cos(0.7)} textAnchor="end" className={s.small}>
                40°
              </text>
              <text x={PX + 60} y={PY + LEN + 18} className={s.small}>
                shoves forward →
              </text>
              {/* one dot per shove: green added to the swing, red met it coming back */}
              {run &&
                run.pushes.slice(0, pushesDone).map((p, i) => (
                  <circle key={i} cx={PX - 70 + i * 20} cy={H - 14} r={6} className={p === "help" ? s.help : s.fight} />
                ))}
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              {RHYTHMS.map((p) => (
                <Control
                  key={p}
                  className={period === p ? "active" : ""}
                  disabled={locked || playing}
                  onClick={() => {
                    setPeriod(p);
                    setT(0);
                    setPlaying(true);
                  }}
                >
                  Every {p} s
                </Control>
              ))}
            </Row>
            <Row>
              {RHYTHMS.map((p) => (
                <Readout key={p} label={`Every ${p} s`} value={best[p] !== undefined ? `${best[p].toFixed(0)}° high` : period === p ? "swinging…" : "not tried"} />
              ))}
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
