"use client";

// Fall distance grows as t squared. A stone is dropped from rest beside an 80 m cliff,
// no air. The learner sets how many whole seconds it has fallen; each second appears as
// its own strip beside the cliff: 4.9, 14.7, 24.5, 34.3 m (ratios 1 : 3 : 5 : 7), and the
// total is g t^2 / 2 = 4.9, 19.6, 44.1, 78.5 m. "Watch it fall" replays the drop in real
// time with the strips appearing as each second passes. One scale: 2.2 px per metre.
//
// v2: strips read 'second 2: +14.7 m (total 19.6)' so they are not mistaken for totals; the reveal states
// the 3 s values without claiming what the stage shows mid-replay.
//
// Earned reveal: milestone "three-seconds" when the stack reaches 3 s (44.1 m) or more.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const fallen = (t: number) => (G * t * t) / 2;
const strip = (n: number) => fallen(n) - fallen(n - 1); // distance in second n
const m1 = (x: number) => `${x.toFixed(1)} m`;

const W = 320;
const H = 206;
const TOP = 14;
const KY = 2.2; // px per m
const CLIFF_X = 96;
const SX = 104; // strip x
const SW = 46;

export default function FallDistanceSquares({ slug }: { slug: string }) {
  const [secs, setSecs] = useState(1);
  const [anim, setAnim] = useState<number | null>(null); // real-time replay clock, s
  const [playing, setPlaying] = useState(false);
  const secsRef = useRef(secs);
  secsRef.current = secs;

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const tt = (now - start) / 1000;
      if (tt >= secsRef.current) {
        setAnim(null);
        setPlaying(false);
        return;
      }
      setAnim(tt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const tShown = anim ?? secs;
  const whole = anim === null ? secs : Math.floor(anim);
  const y = fallen(tShown);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "From a tall cliff top you drop a stone. Ignoring air, it falls 4.9 m in its first second. How far has it fallen after 3 s?",
        options: ["14.7 m", "29.4 m", "44.1 m"],
        answer: 2,
      }}
      exploreHint="Add seconds one at a time. Each strip is the distance fallen during that second."
      reveal={() => (
        <>
          <p>
            By 3 s the stone has fallen <strong>{m1(fallen(3))}</strong>: strips of {m1(strip(1))}, {m1(strip(2))} and{" "}
            {m1(strip(3))}, one for each second. Each second covered more ground than the last, in the ratio 1 : 3 : 5.
          </p>
          <p>
            The stone gains 9.81 m/s of speed every second, so each second it is moving faster and falls further. The
            total grows with time squared: 3 s is 3² = 9 times the first second&apos;s 4.9 m, not 3 times.
          </p>
          <p className="muted">No air resistance. A real stone falls a little less by 3 s.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["three-seconds"]}>
          {(reach) => {
            const stoneY = TOP + y * KY;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${tShown.toFixed(1)} s: fallen ${m1(y)}`}>
                  <rect x={10} y={TOP} width={CLIFF_X - 10} height={80 * KY} className={s.cliff} />
                  {[0, 20, 40, 60, 80].map((m) => (
                    <g key={m}>
                      <line x1={CLIFF_X - 6} y1={TOP + m * KY} x2={CLIFF_X} y2={TOP + m * KY} className={s.tick} />
                      <text x={CLIFF_X - 9} y={TOP + m * KY + 3} textAnchor="end" className={s.tickLabel}>
                        {m}
                      </text>
                    </g>
                  ))}
                  {!locked &&
                    Array.from({ length: whole }, (_, i) => i + 1).map((n) => (
                      <g key={n}>
                        <rect x={SX} y={TOP + fallen(n - 1) * KY} width={SW} height={strip(n) * KY} className={n % 2 ? s.stripA : s.stripB} />
                        <text x={SX + SW + 6} y={TOP + (fallen(n - 1) + strip(n) / 2) * KY + 3} className={s.stripLabel}>
                          second {n}: +{strip(n).toFixed(1)} m (total {fallen(n).toFixed(1)})
                        </text>
                      </g>
                    ))}
                  <circle cx={SX + SW / 2} cy={locked ? TOP : stoneY} r={5} className={s.stone} />
                  <text x={10} y={H - 4} className={s.chip}>
                    No air. Dropped from rest. Metres down.
                  </text>
                </svg>

                <Slider
                  label="Time falling"
                  value={secs}
                  min={1}
                  max={4}
                  step={1}
                  disabled={locked || anim !== null}
                  format={(v) => `${v} s`}
                  onChange={(v) => {
                    setSecs(v);
                    if (v >= 3) reach("three-seconds");
                  }}
                />
                <Row>
                  <Control disabled={locked || anim !== null} onClick={() => {
                      setAnim(0);
                      setPlaying(true);
                    }}>
                    Watch it fall
                  </Control>
                  <Readout label="Total fallen" value={locked ? "?" : m1(y)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
