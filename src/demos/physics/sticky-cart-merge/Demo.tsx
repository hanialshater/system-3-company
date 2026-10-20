"use client";

// Sticky carts on a frictionless track. Cart A (2 kg) rolls at 3 m/s into cart B (mass
// set by the learner, at rest); they stick. Momentum is conserved: 2 x 3 = (2 + m) v.
// One stage: the track, with a single "total momentum" bar above it split into each
// cart's share. The bar's length never changes; its split does.
//
// Time is explicit (t in s): Play runs to the end in real time, Step adds 0.5 s (so one step reaches the moment of contact).
// Positions are analytic, so changing B's mass after the crash redraws the after-state.
// Earned reveal: milestones "crashed" (the collision is seen) and "other-mass" (a second
// mass is seen after a crash).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const MA = 2; // kg
const VA = 3; // m/s
const P = MA * VA; // 6 kg m/s
const CART = 0.5; // cart length, m
const B0 = 2.0; // B's left edge, m (A's left edge starts at 0)
const TC = (B0 - CART) / VA; // 0.5 s
const T_END = 1.5; // s
const STEP = 0.5; // one step lands exactly on the moment of contact

const afterSpeed = (mb: number) => P / (MA + mb);

const W = 320;
const H = 130;
const K = 54; // px per m
const X0 = 10;
const TRACK_Y = 104;
const BAR_X = 20;
const BAR_W = 280; // = 6 kg m/s

function state(t: number, mb: number) {
  if (t < TC) return { xa: VA * t, xb: B0, va: VA, vb: 0, stuck: false };
  const v = afterSpeed(mb);
  const xa = VA * TC + v * (t - TC);
  return { xa, xb: xa + CART, va: v, vb: v, stuck: true };
}

export default function StickyCartMerge({ slug }: { slug: string }) {
  const [mb, setMb] = useState(1);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reachRef = useRef<(n: string) => void>(() => {});
  const mbRef = useRef(mb);
  mbRef.current = mb;
  const seenMasses = useRef(new Set<number>());
  const t0Ref = useRef(0);

  const seeAt = (tt: number, m: number) => {
    if (tt >= TC) {
      reachRef.current("crashed");
      seenMasses.current.add(m);
      if (seenMasses.current.size >= 2) reachRef.current("other-mass");
    }
  };

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let start: number | null = null;
    const t0 = t0Ref.current;
    const tick = (now: number) => {
      if (start === null) start = now;
      const tt = Math.min(T_END, t0 + (now - start) / 1000);
      setT(tt);
      if (tt >= TC) seeAt(tt, mbRef.current);
      if (tt >= T_END) {
        setPlaying(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const st = state(t, mb);
  const v = afterSpeed(mb);
  const pa = MA * st.va;
  const pb = mb * st.vb;
  const keMinus = 0.5 * MA * VA * VA;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "On a frictionless track, you send a 2 kg cart at 3 m/s into a stationary 1 kg cart, and they stick together. How fast do they move afterwards?",
        options: ["3 m/s", "2 m/s", "1.5 m/s"],
        answer: 1,
      }}
      exploreHint="Step to the crash. Then change cart B's mass and watch the bar."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            With the 1 kg cart the pair rolled on at <strong>{afterSpeed(1).toFixed(2)} m/s</strong>
            {mb !== 1 ? (
              <>
                ; with your {mb} kg cart, {v.toFixed(2)} m/s
              </>
            ) : null}
            . The bar never changed length: {P.toFixed(1)} kg·m/s before and after.
          </p>
          <p>
            Mass × speed (momentum) is handed over whole when nothing outside pushes. Shared by more mass, it means less
            speed: 6 ÷ 3 kg = 2 m/s.
          </p>
          <p className="muted">
            Motion energy is not kept: {keMinus.toFixed(0)} J before, {(0.5 * 3 * afterSpeed(1) ** 2).toFixed(0)} J after with
            1 kg. The rest goes into the crunch and heat.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["crashed", "other-mass"]}>
          {(reach) => {
            reachRef.current = reach;
            const ax = X0 + st.xa * K;
            const bx = X0 + st.xb * K;
            const cw = CART * K;
            const hB = 16 + 6 * mb;
            const hA = 16 + 6 * MA;
            const wa = (pa / P) * BAR_W;
            const wb = (pb / P) * BAR_W;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Carts at ${t.toFixed(2)} s`}>
                  <text x={BAR_X} y={14} className={s.label}>
                    Total momentum {locked ? "?" : `${(pa + pb).toFixed(1)} kg·m/s`}
                  </text>
                  {!locked && (
                    <>
                      <rect x={BAR_X} y={20} width={wa} height={14} className={s.barA} />
                      <rect x={BAR_X + wa} y={20} width={wb} height={14} className={s.barB} />
                    </>
                  )}
                  <rect x={BAR_X} y={20} width={BAR_W} height={14} className={s.barFrame} />

                  <line x1={4} y1={TRACK_Y} x2={W - 4} y2={TRACK_Y} className={s.track} />
                  <rect x={ax} y={TRACK_Y - hA} width={cw} height={hA} rx={3} className={s.cartA} />
                  <text x={ax + cw / 2} y={TRACK_Y - hA / 2 + 3} textAnchor="middle" className={s.cartLabel}>
                    2 kg
                  </text>
                  <rect x={bx} y={TRACK_Y - hB} width={cw} height={hB} rx={3} className={s.cartB} />
                  <text x={bx + cw / 2} y={TRACK_Y - hB / 2 + 3} textAnchor="middle" className={s.cartLabel}>
                    {mb} kg
                  </text>
                  <text x={8} y={H - 8} className={s.chip}>
                    Frictionless. Carts stick. t = {t.toFixed(2)} s
                  </text>
                </svg>

                <Row>
                  <Control
                    disabled={locked || playing || t >= T_END}
                    onClick={() => {
                      const tt = Math.min(T_END, t + STEP);
                      setT(tt);
                      seeAt(tt, mb);
                    }}
                  >
                    Step +0.5 s
                  </Control>
                </Row>
                <Slider
                  label="Cart B mass"
                  value={mb}
                  min={0.5}
                  max={4}
                  step={0.5}
                  disabled={locked || playing}
                  format={(m) => `${m} kg`}
                  onChange={(m) => {
                    setMb(m);
                    seeAt(t, m);
                  }}
                />
                <Row>
                  <Control disabled={locked || playing} onClick={() => {
                      t0Ref.current = t >= T_END ? 0 : t;
                      setPlaying(true);
                    }}>
                    {t >= T_END ? "Replay" : "Play"}
                  </Control>
                  <Control disabled={locked || playing || t === 0} onClick={() => setT(0)}>
                    Reset
                  </Control>
                  <Readout label="Speed after" value={locked || !st.stuck ? "?" : `${v.toFixed(2)} m/s`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
