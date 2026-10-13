"use client";

// Geography toy (labelled on the stage): what the last decimal place of a latitude means on the ground.
// One degree of latitude = EARTH_RADIUS_KM * pi / 180 = 111.195 km on the kit's sphere. A step of the
// last digit at d decimals is 111,195 m / 10^d. It is drawn to scale next to a 105 x 68 m pitch
// (2.4 px per metre); the question, bar and readout come from the same stepMetres().
// Key state: the learner has looked at 4, 5 and 6 decimals.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { EARTH_RADIUS_KM } from "@/kit/geo";

const W = 320;
const H = 190;
const PX_PER_M = 2.4;
const PITCH_L = 105;
const PITCH_W = 68;
const START = 3;
const DECIMALS = [1, 2, 3, 4, 5, 6];
const MILESTONES = ["d4", "d5", "d6"] as const;
const M_PER_DEG = (EARTH_RADIUS_KM * 1000 * Math.PI) / 180;

/** Metres moved north when the last digit of a latitude with d decimals goes up by one. */
const stepMetres = (d: number) => M_PER_DEG / 10 ** d;
function fmt(m: number) {
  if (m >= 1000) return `${(m / 1000).toPrecision(3)} km`;
  if (m >= 100) return `${m.toFixed(0)} m`;
  if (m >= 10) return `${m.toPrecision(3)} m`;
  if (m >= 1) return `${m.toPrecision(3)} m`;
  return `${m.toPrecision(3)} m`;
}
const lat = (d: number) => (51.5074).toFixed(Math.min(d, 4)) + (d > 4 ? "0".repeat(d - 4) : "");

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [d, setD] = useState(START);
  const step = stepMetres(d);
  const len = step * PX_PER_M;
  const px = (PITCH_L / 2) * PX_PER_M;
  const py = (PITCH_W / 2) * PX_PER_M;
  const cx = W / 2;
  const cy = H / 2 - 4;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`Football pitch 105 by 68 metres drawn to scale. ${locked ? "A red bar marks one step of the last decimal place." : `One step of the last decimal place at ${d} decimals is ${fmt(step)} north.`}`}>
        <rect x={cx - px} y={cy - py} width={2 * px} height={2 * py} fill="var(--good)" fillOpacity={0.25} stroke="var(--fg)" strokeWidth={1} />
        <line x1={cx} y1={cy - py} x2={cx} y2={cy + py} stroke="var(--fg)" strokeWidth={0.6} opacity={0.6} />
        <circle cx={cx} cy={cy} r={9.15 * PX_PER_M} fill="none" stroke="var(--fg)" strokeWidth={0.6} opacity={0.6} />
        <text x={cx - px + 4} y={cy - py + 11} fontSize={9} fill="var(--fg)">
          Football pitch 105 × 68 m
        </text>
        <line x1={cx + px - 30} y1={cy + py} x2={cx + px - 30} y2={cy + py - Math.max(len, 1.5)} stroke="var(--bad)" strokeWidth={3} />
        <text x={cx + px - 36} y={cy + py - 4} fontSize={9} fill="var(--fg)" textAnchor="end">
          one step north: {locked ? "?" : fmt(step)}
        </text>
      </svg>
      <p className="muted tiny">Toy: schematic, to scale on a sphere. Red bar: the last digit goes up by one.</p>
      <Row>
        <span className="muted tiny">Decimal places in 51.5074:</span>
      </Row>
      <Row>
        {DECIMALS.map((n) => (
          <Control
            key={n}
            disabled={locked}
            className={n === d ? "active" : ""}
            onClick={() => {
              setD(n);
              if (n >= 4) reach(`d${n}`);
            }}
          >
            {n}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Latitude shown" value={`${lat(d)}°N`} />
        <Readout label="Last-digit step" value={locked ? "?" : fmt(step)} />
      </Row>
    </div>
  );
}

export default function FourDecimals({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A phone shows latitude 51.5074° N. If the last digit changes by one, how far north have you moved?",
        options: ["1 kilometre", "11 metres", "1 centimetre"],
        answer: 1,
      }}
      exploreHint="Try 4, 5 and 6 decimal places and compare the red bar with the pitch."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At 4 decimals the last digit is worth {fmt(stepMetres(4))}: about a tenth of the pitch&rsquo;s length. Each extra
            decimal is ten times finer: {fmt(stepMetres(5))} at 5, {fmt(stepMetres(6))} at 6. A degree of latitude is about{" "}
            {(M_PER_DEG / 1000).toFixed(0)} km on a sphere.
          </p>
          <p>
            Phone GPS is typically good to a few metres in the open, so digits past the fifth mostly record noise, not
            position.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
