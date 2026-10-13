"use client";

// Straight across. Two sliders set a destination east and north of the start (0..500 m in 100 m
// steps). The grid draws the L-route (east then north, dashed) and the straight line; two bars
// compare their lengths. Key state: destination at (300, 400), where the bars read 700 and 500.
// Sliders start at (100, 200) so two arrow presses each (the QA path) land on (300, 400).
// Every number comes from TARGET_E, TARGET_N and the route functions below.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const TARGET_E = 300;
const TARGET_N = 400;
const MAX = 500;
const STEP = 100;
const START_E = 100;
const START_N = 200;
const lRoute = (e: number, n: number) => e + n;
const straight = (e: number, n: number) => Math.round(Math.hypot(e, n));
const saved = (e: number, n: number) => lRoute(e, n) - straight(e, n);
const MILESTONES = ["target"] as const;

const GX = 26;
const GY = 22;
const GS = 170; // px for MAX metres
const PX = GS / MAX;
const BAR_SCALE = GS / (2 * MAX); // px per metre for the bars
const BX = [232, 278];

export default function StraightAcrossSaves({ slug }: { slug: string }) {
  const [e, setE] = useState(START_E);
  const [n, setN] = useState(START_N);
  const tL = lRoute(TARGET_E, TARGET_N);
  const tS = straight(TARGET_E, TARGET_N);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You walk ${TARGET_E} m east then ${TARGET_N} m north. Walking straight across instead, how much shorter?`,
        options: ["100 m", `${saved(TARGET_E, TARGET_N)} m`, "350 m"],
        answer: 1,
      }}
      exploreHint={`Set the destination ${TARGET_E} m east and ${TARGET_N} m north and compare the bars.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {TARGET_E} m east and {TARGET_N} m north the L-route is <strong>{tL} m</strong>. Straight across is √({TARGET_E}² +{" "}
            {TARGET_N}²) = √{TARGET_E ** 2 + TARGET_N ** 2} = <strong>{tS} m</strong>: you save{" "}
            <strong>{saved(TARGET_E, TARGET_N)} m</strong>, about {Math.round((100 * saved(TARGET_E, TARGET_N)) / tL)}% of the walk.
          </p>
          <p>
            The two legs of a right triangle satisfy a² + b² = c² for the straight side c, and c is always shorter than a + b.
            Flat, open ground assumed.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (ee: number, nn: number) => {
              if (ee === TARGET_E && nn === TARGET_N) reach("target");
            };
            const x = GX + e * PX;
            const y = GY + GS - n * PX;
            const L = lRoute(e, n);
            const S = straight(e, n);
            const caption = locked
              ? "Make a prediction to start."
              : "Flat ground. Dashed: east, then north. Solid: straight across.";
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 214" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <rect x={GX} y={GY} width={GS} height={GS} className={s.field} />
                  {Array.from({ length: MAX / STEP + 1 }, (_, i) => (
                    <g key={i}>
                      <line x1={GX + i * STEP * PX} y1={GY} x2={GX + i * STEP * PX} y2={GY + GS} className={s.grid} />
                      <line x1={GX} y1={GY + i * STEP * PX} x2={GX + GS} y2={GY + i * STEP * PX} className={s.grid} />
                    </g>
                  ))}
                  <polyline points={`${GX},${GY + GS} ${x},${GY + GS} ${x},${y}`} className={s.lroute} />
                  <line x1={GX} y1={GY + GS} x2={x} y2={y} className={s.diag} />
                  <circle cx={GX} cy={GY + GS} r={4} className={s.start} />
                  <circle cx={x} cy={y} r={5} className={s.dest} />
                  <text x={GX + GS / 2} y={GY + GS + 14} className={s.axis}>
                    east, 100 m squares
                  </text>
                  <rect x={BX[0] - 14} y={GY + GS - L * BAR_SCALE} width={28} height={L * BAR_SCALE} className={s.barL} />
                  <rect x={BX[1] - 14} y={GY + GS - S * BAR_SCALE} width={28} height={S * BAR_SCALE} className={s.barS} />
                  <text x={BX[0]} y={GY + GS + 14} className={s.axis}>
                    L-route
                  </text>
                  <text x={BX[1]} y={GY + GS + 14} className={s.axis}>
                    Straight
                  </text>
                  <text x={BX[0]} y={GY + GS - L * BAR_SCALE - 4} className={s.val}>
                    {locked ? "" : L}
                  </text>
                  <text x={BX[1]} y={GY + GS - S * BAR_SCALE - 4} className={s.val}>
                    {locked ? "" : S}
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Slider
                  label="East (m)"
                  value={e}
                  min={0}
                  max={MAX}
                  step={STEP}
                  disabled={locked}
                  onChange={(v) => {
                    setE(v);
                    check(v, n);
                  }}
                />
                <Slider
                  label="North (m)"
                  value={n}
                  min={0}
                  max={MAX}
                  step={STEP}
                  disabled={locked}
                  onChange={(v) => {
                    setN(v);
                    check(e, v);
                  }}
                />
                <Row>
                  <Readout label="L-route" value={locked ? "?" : `${L} m`} />
                  <Readout label="Straight" value={locked ? "?" : `${S} m`} />
                  <Readout label="Saved" value={locked ? "?" : `${L - S} m`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
