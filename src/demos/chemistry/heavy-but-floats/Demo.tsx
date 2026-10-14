"use client";

// Same 500 g, different size. The learner stretches a ball's volume while its mass stays
// fixed; the ball rests on the bottom while it is denser than water and rises to float
// once it is less dense, riding with exactly its density's share under the surface.
// v3: the stage opens at the question's 800 cm³ with the ball held above the water; the
// reveal unlocks after the learner has watched it drop and float at 800 and moved the slider.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const MASS = 500; // g
const RHO_W = 1.0; // g/cm^3, about
const W = 300;
const H = 230;
const SURF = 70;
const BOTTOM = 218;
const PX_PER_CM = 7.5;
const START = 800; // the question's volume
const NAMES = ["saw-float-at-800", "moved-slider"] as const;

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

function Stage({
  locked,
  interact,
  onVol,
}: {
  locked: boolean;
  interact: () => void;
  onVol: (v: number) => void;
}) {
  const [vol, setVol] = useState(START);
  const { reach } = useMilestones(interact, NAMES);
  const reachRef = useRef(reach);
  reachRef.current = reach;
  // Unlocking drops the 800 cm³ ball into the water: the learner watches it float.
  useEffect(() => {
    if (!locked) reachRef.current("saw-float-at-800");
  }, [locked]);

  const rho = MASS / vol;
  const r = radiusCm(vol) * PX_PER_CM;
  const state = rho > RHO_W + 1e-9 ? "sinks" : rho < RHO_W - 1e-9 ? "floats" : "hovers";
  const cy = locked
    ? SURF - r - 10 // held in the hand above the water
    : state === "sinks"
      ? BOTTOM - r
      : state === "hovers"
        ? (SURF + BOTTOM) / 2
        : SURF + (capDepth(rho / RHO_W) - 1) * r;
  const cx = W / 2;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`500 gram ball of ${vol} cubic centimetres ${locked ? "held above the water" : state}`}>
        <rect x={10} y={SURF} width={W - 20} height={BOTTOM - SURF} className={s.water} />
        <line x1={10} x2={W - 10} y1={SURF} y2={SURF} className={s.surface} />
        <text x={16} y={SURF + 14} className={s.waterLabel}>
          water 1.0 g/cm³
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
          onVol(v);
          reach("moved-slider");
        }}
      />
      <Row>
        <Readout label="Mass" value="500 g" />
        <Readout label="Density (mass ÷ volume)" value={locked ? "?" : `${rho.toFixed(rho >= 1 ? 2 : 3).replace(/0$/, "")} g/cm³`} />
        <Readout label="Ball" value={locked ? "held" : state} />
      </Row>
      <Row>
        <Readout label="Under water" value={locked ? "?" : state === "floats" ? `${+((rho / RHO_W) * 100).toFixed(1)}%` : "all of it"} />
      </Row>
    </div>
  );
}

export default function HeavyButFloats({ slug }: { slug: string }) {
  const [minVol, setMinVol] = useState(START);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A 500 g ball has a volume of 800 cm³. Water is about 1.0 g/cm³. Put in water, the ball…",
        options: ["Sinks", "Floats", "Hovers in the middle"],
        answer: 1,
      }}
      exploreHint="The ball drops in at 800 cm³. Now shrink and stretch it, keeping 500 g."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            You watched the 500 g, 800 cm³ ball drop in and float. It is 500 ÷ 800 = <strong>0.625 g/cm³</strong>, less
            than water&rsquo;s 1.0, so it floats with five eighths (62.5%) of itself under the surface.
            {minVol < 500 ? ` You also shrank it to ${minVol} cm³ and saw it sink.` : ""}
          </p>
          <p>
            Its mass never changed. What flips it is mass per volume: below 500 cm³ the ball is denser than water and
            sinks; at exactly 500 cm³ it matches water and hovers; above that it floats.
          </p>
          <p className="muted">Heavy ships float for the same reason: lots of volume for their mass.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} onVol={(v) => setMinVol((m) => Math.min(m, v))} />
      )}
    </Lesson>
  );
}
