"use client";

// Ramp, same work. A 50 kg crate is pushed at steady speed up a frictionless ramp to a
// fixed height of 1.0 m. The push along the ramp is m g sin(theta) = m g h / L, so a
// longer ramp needs a smaller push, over a longer path; the work F x L = m g h = 490.5 J
// whatever the length. L = 1 m is a straight lift. Side view, one scale for both axes.
//
// Earned reveal: milestones "long-ramp" (ramp at 4 m or more, push readout at 123 N or
// less) and "pushed-up" (a full push on such a ramp, the work counter reaching 490 J).
// v3: the prediction asks about work (the title's question), not the push; the locked picture
// description no longer gives the push; the log shows the push to 0.1 N so the product checks.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const M = 50; // kg
const HT = 1; // m
const force = (L: number) => (M * G * HT) / L;
const WORK = M * G * HT; // 490.5 J
const PUSH_MS = 350;

const W = 320;
const H = 150;
const K = 34; // px per m
const X0 = 30;
const GY = 120;
const CRATE = 0.5; // m

export default function RampSameWork({ slug }: { slug: string }) {
  const [L, setL] = useState(2);
  const [d, setD] = useState(0); // distance pushed along the ramp, m
  const [pushing, setPushing] = useState(false);
  const [fulls, setFulls] = useState<number[]>([]); // ramp lengths of finished pushes
  const reachRef = useRef<(n: string) => void>(() => {});
  const lRef = useRef(L);
  lRef.current = L;

  useEffect(() => {
    if (!pushing) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const f = Math.min(1, (now - start) / PUSH_MS);
      setD(f * lRef.current);
      if (f >= 1) {
        setPushing(false);
        const done = lRef.current;
        setFulls((xs) => (xs.includes(done) ? xs : [...xs, done]));
        if (done >= 4) reachRef.current("pushed-up");
        if (done === 1) reachRef.current("lifted-straight");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pushing]);

  const F = force(L);
  const base = Math.sqrt(Math.max(0, L * L - HT * HT));
  const sin = HT / L;
  const cos = base / L;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A 50 kg crate weighs about 490 N. You raise it 1.0 m by pushing it up a frictionless 4 m ramp at steady speed. Compared with lifting it straight up, the work you do is…",
        options: ["Less", "The same", "More"],
        answer: 1,
      }}
      exploreHint="Push the crate up a 4 m ramp, then lift it straight up, and compare the work."
      minInteractions={3}
      reveal={() => {
        const Ls = [...fulls].reverse().find((x) => x >= 4) ?? 4;
        return (
          <>
            <p>
              <strong>The same work.</strong> On your {Ls} m ramp the push was <strong>{force(Ls).toFixed(1)} N</strong>, and the work counter still finished
              at {WORK.toFixed(1)} J ≈ {force(Ls).toFixed(1)} N × {Ls} m (the push is rounded). A straight lift:{" "}
              {force(1).toFixed(1)} N × 1 m, the same {WORK.toFixed(1)} J.
            </p>
            <p>
              A ramp only has to hold back the part of the weight that points down the slope: weight × height ÷ length.
              The price is distance. Work is force × distance, so a smaller push over a longer path gives the same work,
              m × g × h.
            </p>
            <p className="muted">Real ramps add friction, so they cost a little more work, not less.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["long-ramp", "pushed-up", "lifted-straight"]}>
          {(reach) => {
            reachRef.current = reach;
            const topX = X0 + base * K;
            const topY = GY - HT * K;
            // crate centre along the slope, from the bottom
            const along = (d * (L - CRATE)) / L;
            const cx = X0 + (along + CRATE / 2) * cos * K - (CRATE / 2) * sin * K;
            const cy = GY - (along + CRATE / 2) * sin * K - (CRATE / 2) * cos * K;
            const ang = (-Math.atan2(HT, base) * 180) / Math.PI;
            const arrow = (F / (M * G)) * 70; // px; 490 N = 70 px
            const work = F * d;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={locked ? "A crate at the foot of a ramp up to a 1 m ledge" : `Ramp ${L} m long, push ${F.toFixed(1)} N`}>
                  <line x1={4} y1={GY} x2={W - 4} y2={GY} className={s.ground} />
                  <polygon points={`${X0},${GY} ${topX},${GY} ${topX},${topY}`} className={s.ramp} />
                  <rect x={topX} y={topY} width={W - 4 - topX} height={GY - topY} className={s.ledge} />
                  <text x={topX + 6} y={(GY + topY) / 2 + 3} className={s.dim}>
                    1 m
                  </text>
                  <g transform={`translate(${cx} ${cy}) rotate(${ang})`}>
                    <rect x={(-CRATE / 2) * K} y={(-CRATE / 2) * K} width={CRATE * K} height={CRATE * K} className={s.crate} />
                    {!locked && (
                      <line x1={(-CRATE / 2) * K - arrow - 2} y1={0} x2={(-CRATE / 2) * K - 2} y2={0} className={s.push} markerEnd="url(#rampArrow)" />
                    )}
                  </g>
                  <defs>
                    <marker id="rampArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" className={s.head} />
                    </marker>
                  </defs>
                  <text x={8} y={14} className={s.chip}>
                    Frictionless. Steady push. 50 kg crate.
                  </text>
                </svg>

                <Slider
                  label="Ramp length"
                  value={L}
                  min={1}
                  max={8}
                  step={1}
                  disabled={locked || pushing}
                  format={(v) => `${v} m`}
                  onChange={(v) => {
                    setL(v);
                    setD(0);
                    if (v >= 4) reach("long-ramp");
                  }}
                />
                <p className={s.log} aria-live="polite">
                  {locked || fulls.length === 0
                    ? "Finished pushes appear here."
                    : fulls.map((x) => `${x} m: ${force(x).toFixed(1)} N × ${x} m ≈ ${(force(x) * x).toFixed(1)} J`).join("  ·  ")}
                </p>
                <Row>
                  <Control disabled={locked || pushing} onClick={() => setPushing(true)}>
                    {d > 0 ? "Push again" : "Push it up"}
                  </Control>
                  <Control
                    disabled={locked || pushing}
                    onClick={() => {
                      setL(1);
                      setD(0);
                      lRef.current = 1;
                      setPushing(true);
                    }}
                  >
                    Lift straight up
                  </Control>
                </Row>
                <Row>
                  <Readout label="Push" value={locked ? "?" : `${F.toFixed(1)} N`} />
                  <Readout label="Work done" value={locked ? "?" : `${work.toFixed(1)} J`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
