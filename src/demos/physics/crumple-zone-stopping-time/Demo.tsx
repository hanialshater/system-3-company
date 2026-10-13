"use client";

// Crumple zone. A 1000 kg car hits a wall at 15 m/s and stops. Whatever the car is
// made of, the wall must remove the same momentum, 15,000 kg m/s. The average force
// is that momentum divided by the stopping time: 150 kN in 0.10 s, 75 kN in 0.20 s.
//
// Drawn as a force-versus-time rectangle whose area (impulse) stays 15,000 N s.
// Constant (average) force assumed; real crash forces peak and vary. At constant force,
// stopping in t from 15 m/s crushes d = v t / 2 (0.75 m at 0.10 s, 1.5 m at 0.20 s).
// Values are illustrative. The reveal unlocks once the stop takes 0.20 s.
// v2: "momentum" is shown as mass x speed on the stage before the reveal names it; the force
// is also given in car-weights; a crush-distance readout (v t / 2) shows that more time needs
// more crushing; the question says "short crush" vs "longer crush" (fact-check route 1).

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const M = 1000; // kg
const V = 15; // m/s
const P = M * V; // 15,000 kg m/s
const force = (ms: number) => P / (ms / 1000); // N
const kN = (n: number) => `${Math.round(n / 1000)} kN`;
const G = 9.81;
const carWeights = (n: number) => (n / (M * G)).toFixed(1);
const crush = (ms: number) => (V * (ms / 1000)) / 2; // m, steady force

const W = 320;
const H = 184;
const GX0 = 40;
const GX1 = 306;
const GY0 = 158;
const GY1 = 14;
const T_MAX = 320; // ms
const F_MAX = 320_000; // N
const xOf = (ms: number) => GX0 + (ms / T_MAX) * (GX1 - GX0);
const yOf = (n: number) => GY0 - (n / F_MAX) * (GY0 - GY1);

export default function CrumpleZone({ slug }: { slug: string }) {
  const [ms, setMs] = useState(100);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["doubled-time"]);
  const F = force(ms);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A 1000 kg car hits a wall at 15 m/s. A short crush stops it in 0.10 s; a longer crush takes 0.20 s. In the longer stop, the average force is…",
        options: ["the same", "half as big", "twice as big"],
        answer: 1,
      }}
      exploreHint="Stretch the stopping time to 0.20 s. Watch the force bar's height and width."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            In 0.10 s the wall pushed with <strong>{kN(force(100))}</strong>; in 0.20 s, <strong>{kN(force(200))}</strong>
            , half as much ({carWeights(force(100))} to {carWeights(force(200))} car-weights). The bar got twice as wide and
            half as tall; its area stayed 1000 kg × 15 m/s.
          </p>
          <p>
            Mass times speed is the car&apos;s momentum. Stopping means removing all of it, however long it takes, so
            spreading the stop over more time shrinks the force. The people inside stop in the same time, so the push on
            them halves too. The price is distance: {crush(100).toFixed(2)} m of crush became {crush(200).toFixed(2)} m.
          </p>
          <p className="muted">Steady-force model. Real crash forces rise and fall; real 56 km/h tests crush about 0.5 to 0.9 m and last roughly 0.1 s, close to the shorter case.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : `Bar area = force × time. It always equals mass × speed: 1000 kg × 15 m/s.`;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Stopping in ${ms / 1000} s takes an average force of ${kN(F)}`}>
              {[0, 100, 200, 300].map((f) => (
                <g key={f}>
                  <line x1={GX0} y1={yOf(f * 1000)} x2={GX1} y2={yOf(f * 1000)} className={s.grid} />
                  <text x={GX0 - 4} y={yOf(f * 1000) + 3} textAnchor="end" className={s.small}>
                    {f}
                  </text>
                </g>
              ))}
              <text x={GX0 - 4} y={GY1 - 4} textAnchor="end" className={s.small}>
                kN
              </text>
              {[0, 100, 200, 300].map((t) => (
                <text key={t} x={xOf(t)} y={GY0 + 12} textAnchor="middle" className={s.small}>
                  {t / 1000} s
                </text>
              ))}
              {/* the stiff 0.10 s stop, for comparison */}
              {ms !== 100 && (
                <rect x={xOf(0)} y={yOf(force(100))} width={xOf(100) - xOf(0)} height={GY0 - yOf(force(100))} className={s.ghost} />
              )}
              <rect x={xOf(0)} y={yOf(F)} width={xOf(ms) - xOf(0)} height={GY0 - yOf(F)} className={s.bar} />
              {!locked && (
                <text x={Math.max(GX0 + 18, xOf(ms / 2))} y={yOf(F) - 4} textAnchor="middle" className={s.label}>
                  {kN(F)}
                </text>
              )}
              {ms !== 100 && (
                <text x={xOf(100) + 4} y={yOf(force(100)) + 10} className={s.small}>
                  0.10 s stop
                </text>
              )}
              <text x={xOf(ms / 2)} y={GY0 - 6} textAnchor="middle" className={s.area}>
                {ms >= 150 ? "1000 kg × 15 m/s" : "1000 × 15"}
              </text>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Stopping time"
              value={ms}
              min={50}
              max={300}
              step={50}
              disabled={locked}
              format={(v) => `${(v / 1000).toFixed(2)} s`}
              onChange={(v) => {
                setMs(v);
                if (v === 200) reach("doubled-time");
              }}
            />
            <Row>
              <Readout label="Average force" value={locked ? "?" : `${kN(F)} = ${carWeights(F)} car-weights`} />
              <Readout label="Crush needed" value={locked ? "?" : `${crush(ms).toFixed(2)} m`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
