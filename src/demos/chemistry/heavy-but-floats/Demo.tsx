"use client";

// Same 500 g, different size. The learner stretches a ball's volume while its mass stays
// fixed; the ball rests on the bottom while it is denser than water and rises to float
// once it is less dense, riding with exactly its density's share under the surface.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const MASS = 500; // g
const RHO_W = 1.0; // g/cm^3, about
const W = 300;
const H = 230;
const SURF = 70;
const BOTTOM = 218;
const PX_PER_CM = 7.5;

const radiusCm = (v: number) => Math.cbrt((3 * v) / (4 * Math.PI));

/** Depth (as a fraction of the radius, 0..2) a floating sphere sinks for a given volume fraction under water. */
function capDepth(fracUnder: number) {
  let lo = 0;
  let hi = 2;
  for (let i = 0; i < 40; i++) {
    const x = (lo + hi) / 2;
    const f = (x * x * (3 - x)) / 4;
    if (f < fracUnder) lo = x;
    else hi = x;
  }
  return (lo + hi) / 2;
}

export default function HeavyButFloats({ slug }: { slug: string }) {
  const [vol, setVol] = useState(400);
  const [maxVol, setMaxVol] = useState(400);

  const rho = MASS / vol;
  const r = radiusCm(vol) * PX_PER_CM;
  const state = rho > RHO_W + 1e-9 ? "sinks" : rho < RHO_W - 1e-9 ? "floats" : "hovers";
  const cy =
    state === "sinks" ? BOTTOM - r : state === "hovers" ? (SURF + BOTTOM) / 2 : SURF + r - capDepth(rho / RHO_W) * r;
  const cx = W / 2;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A 500 g ball has a volume of 800 cm³. Water is about 1.0 g/cm³. Put in water, the ball…",
        options: ["Sinks", "Floats", "Hovers in the middle"],
        answer: 1,
      }}
      exploreHint="Keep the mass at 500 g. Stretch the ball to 800 cm³ and watch where it settles."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {maxVol >= 800 ? "You saw" : "Stretch it to 800 cm³ and you see"} the same 500 g ball rise and float. At
            800 cm³ it is 500 ÷ 800 = <strong>0.625 g/cm³</strong>, less than water&rsquo;s 1.0, so it floats with five
            eighths (62.5%) of itself under the surface.
          </p>
          <p>
            Its mass never changed. What flipped it was mass per volume: below 500 cm³ the ball is denser than water and
            sinks; at exactly 500 cm³ it matches water and hovers; above that it floats.
          </p>
          <p className="muted">Heavy ships float for the same reason: lots of volume for their mass.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`500 gram ball of ${vol} cubic centimetres ${state}`}>
            <rect x={10} y={SURF} width={W - 20} height={BOTTOM - SURF} className={s.water} />
            <line x1={10} x2={W - 10} y1={SURF} y2={SURF} className={s.surface} />
            <text x={16} y={BOTTOM - 8} className={s.waterLabel}>
              water, about 1.0 g/cm³
            </text>
            <g className={s.ball} style={{ transform: `translate(${cx}px, ${cy}px)` }}>
              <circle r={r} className={s.ballBody} />
              <text y={4} textAnchor="middle" className={s.ballLabel}>
                500 g
              </text>
            </g>
            <path d={`M 10 20 L 10 ${BOTTOM} L ${W - 10} ${BOTTOM} L ${W - 10} 20`} className={s.tank} />
          </svg>
          <Slider
            label="Ball volume"
            value={vol}
            min={300}
            max={1000}
            step={50}
            disabled={locked}
            format={(v) => `${v} cm³`}
            onChange={(v) => {
              setVol(v);
              setMaxVol((m) => Math.max(m, v));
              interact();
            }}
          />
          <Row>
            <Readout label="Mass" value="500 g" />
            <Readout label="Density" value={`${rho.toFixed(rho >= 1 ? 2 : 3).replace(/0$/, "")} g/cm³`} />
            <Readout label="Ball" value={locked ? "—" : state} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
