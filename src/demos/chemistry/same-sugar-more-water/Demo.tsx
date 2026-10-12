"use client";

// Dilution as 20 sugar dots that never change in number. Pouring in water raises the
// level; the same 20 dots spread over more room. A dashed band marks "one 100 mL
// share" at the bottom, so the learner can count how crowded each share is: 20, 10, about 7, 5, 4.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const DOTS = 20;
const SUGAR_MOL = 0.1; // 100 mL of 1.0 mol/L
const MAX_ML = 500;
const W = 220;
const H = 250;
const BX = 40; // beaker left
const BW = 140;
const FLOOR = 236;
const PX_PER_ML = 0.44; // 500 mL -> 220 px

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Stratified heights: dot i sits in the i-th twentieth of the liquid, so any bottom
// share of the liquid holds its fair count of dots (to within one).
const rnd = mulberry32(4242);
const DOT_UV = Array.from({ length: DOTS }, (_, i) => ({ u: 0.08 + 0.84 * rnd(), v: (i + 0.15 + 0.7 * rnd()) / DOTS }));

const conc = (ml: number) => SUGAR_MOL / (ml / 1000);

export default function SameSugarMoreWater({ slug }: { slug: string }) {
  const [ml, setMl] = useState(100);
  const [maxMl, setMaxMl] = useState(100);

  const level = FLOOR - ml * PX_PER_ML;
  const liquidH = ml * PX_PER_ML;
  const bandTop = FLOOR - 100 * PX_PER_ML;
  const inBand = DOT_UV.filter((d) => d.v * ml < 100 + 1e-9).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "100 mL of sugar syrup at 1.0 mol/L is poured into 400 mL of extra water. The mixture is now about…",
        options: ["0.20 mol/L", "0.80 mol/L", "0.25 mol/L"],
        answer: 0,
      }}
      exploreHint="Pour in water all the way to 500 mL. Count the dots in the bottom 100 mL."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {maxMl >= MAX_ML
              ? "You poured all the way to 500 mL."
              : `You poured to ${maxMl} mL; at 500 mL the same thing goes further.`}{" "}
            The jar always held the same <strong>20 dots</strong> (0.10 mol of sugar). Water only gave them more room:
            the bottom 100 mL went from 20 dots to {maxMl >= MAX_ML ? "4" : "fewer and fewer"}.
          </p>
          <p>
            Concentration is amount divided by volume: 0.10 mol ÷ 0.500 L = <strong>0.20 mol/L</strong>, one fifth of
            the start, because the volume grew five times. 0.25 comes from dividing by the 400 mL of water instead of
            the 500 mL of mixture.
          </p>
          <p className="muted">Adding water never removes sugar. It spreads the same amount thinner.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className={`stage-svg ${s.fit}`}
            role="img"
            aria-label={`${ml} mL of liquid holding the same 20 sugar dots; ${inBand} of them in the bottom 100 mL`}
          >
            {/* scale */}
            {[100, 200, 300, 400, 500].map((m) => (
              <g key={m}>
                <line x1={BX - 6} x2={BX} y1={FLOOR - m * PX_PER_ML} y2={FLOOR - m * PX_PER_ML} className={s.tick} />
                <text x={BX - 9} y={FLOOR - m * PX_PER_ML + 3} textAnchor="end" className={s.tickLabel}>
                  {m}
                </text>
              </g>
            ))}
            <text x={BX - 9} y={FLOOR + 12} textAnchor="end" className={s.tickLabel}>
              mL
            </text>
            {/* liquid */}
            <rect x={BX} y={level} width={BW} height={liquidH} className={s.liquid} />
            <line x1={BX} x2={BX + BW} y1={level} y2={level} className={s.surface} />
            {/* the bottom 100 mL share */}
            <rect x={BX + 1} y={bandTop} width={BW - 2} height={FLOOR - bandTop} className={s.band} />
            <text x={BX + BW + 6} y={(bandTop + FLOOR) / 2 - 2} className={s.bandLabel}>
              {inBand}
            </text>
            <text x={BX + BW + 6} y={(bandTop + FLOOR) / 2 + 10} className={s.tickLabel}>
              dots
            </text>
            {/* sugar */}
            {DOT_UV.map((d, i) => (
              <circle
                key={i}
                cx={BX + d.u * BW}
                cy={FLOOR - d.v * liquidH}
                r={4.5}
                className={d.v * ml < 100 + 1e-9 ? s.dotIn : s.dot}
              />
            ))}
            {/* glass */}
            <path d={`M ${BX} 8 L ${BX} ${FLOOR} L ${BX + BW} ${FLOOR} L ${BX + BW} 8`} className={s.glass} />
          </svg>

          <Slider
            label="Mixture volume"
            value={ml}
            min={100}
            max={MAX_ML}
            step={100}
            format={(v) => `${v} mL`}
            disabled={locked}
            onChange={(v) => {
              setMl(v);
              setMaxMl((m) => Math.max(m, v));
              interact();
            }}
          />
          <Row>
            <Readout label="Sugar" value="20 dots = 0.10 mol" />
            <Readout label="Concentration" value={`${conc(ml).toFixed(2)} mol/L`} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
