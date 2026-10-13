"use client";

// Wire resistance. R = rho L / A with A = pi d^2 / 4, so for one metal at one temperature
// R scales as L / d^2. Reference wire: 1 m long, 1 mm across, 1.0 ohm (an illustrative
// metal; copper this size would be about 0.02 ohm). Twice as long and half the diameter:
// x2 for length, x4 for a quarter of the area, 8.0 ohm. Side view of the wire (80 px per m
// of length, 20 px per mm of thickness, so thickness is exaggerated) with the 1 m x 1 mm
// reference drawn dashed behind, and its cross-section (dashed: reference) at the right.
//
// Earned reveal: milestones "length" and "diameter" (both changed). QA path: length slider
// first (1 -> 2 m), then the diameter slider, which starts at its maximum (1.0 -> 0.5 mm).

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const R0 = 1; // ohm for 1 m, 1 mm
const res = (L: number, d: number) => (R0 * L) / (d * d);
const fmtR = (r: number) => `${r < 10 ? r.toFixed(1) : r.toFixed(0)} Ω`;
const times = (x: number) => `×${x < 1 ? x.toFixed(x < 0.1 ? 3 : 2) : Number.isInteger(x) ? x : x.toFixed(2)}`;

const W = 320;
const H = 120;
const X0 = 14;
const KL = 76; // px per m
const KD = 20; // px per mm (thickness)
const WY = 64;
const SX = 286;

export default function WireEightTimes({ slug }: { slug: string }) {
  const [L, setL] = useState(1);
  const [d, setD] = useState(1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A wire 1 m long and 1 mm across has a resistance of 1.0 Ω. A wire of the same metal, twice as long and half as wide (0.5 mm), has…",
        options: ["8 Ω", "4 Ω", "2 Ω"],
        answer: 0,
      }}
      exploreHint="Make the wire longer, then thinner, and watch the resistance."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your wire, {L} m long and {d} mm across, measured <strong>{fmtR(res(L, d))}</strong>. Length {times(L)} gave
            resistance {times(L)}; the diameter {times(d)} made the cross-section {times(d * d)}, and resistance {times(1 / (d * d))}.
          </p>
          <p>
            Resistance grows with length and shrinks with cross-section area: R = ρL/A. Area goes with the diameter squared,
            so half the width leaves a quarter of the area and four times the resistance. Twice as long and half as wide:
            2 × 4 = 8 Ω.
          </p>
          <p className="muted">Same metal at the same temperature. The 1.0 Ω wire is illustrative; copper this size is about 0.02 Ω.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["length", "diameter"]}>
          {(reach) => {
            const len = L * KL;
            const th = d * KD;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Wire ${L} m by ${d} mm`}>
                  <text x={4} y={12} className={s.chip}>
                    Same metal. Dashed: 1 m, 1 mm, 1.0 Ω. Thickness exaggerated.
                  </text>
                  <rect x={X0} y={WY - KD / 2} width={KL} height={KD} rx={3} className={s.ref} />
                  <rect x={X0} y={WY - th / 2} width={len} height={th} rx={Math.min(3, th / 2)} className={s.wire} />
                  <text x={X0 + len / 2} y={WY + Math.max(th, KD) / 2 + 12} textAnchor="middle" className={s.label}>
                    {L} m
                  </text>
                  {/* cross-section */}
                  <circle cx={SX} cy={WY} r={KD / 2} className={s.ref} />
                  <circle cx={SX} cy={WY} r={th / 2} className={s.wire} />
                  <text x={SX} y={WY + KD / 2 + 12} textAnchor="middle" className={s.label}>
                    {d} mm
                  </text>
                  <text x={SX} y={WY - KD / 2 - 6} textAnchor="middle" className={s.chip}>
                    end-on
                  </text>
                  <text x={X0} y={H - 6} className={s.big}>
                    {locked ? "R = ?" : `R = ${fmtR(res(L, d))}`}
                  </text>
                </svg>

                <Slider
                  label="Length"
                  value={L}
                  min={0.5}
                  max={3}
                  step={0.5}
                  disabled={locked}
                  format={(v) => `${v} m`}
                  onChange={(v) => {
                    setL(v);
                    reach("length");
                  }}
                />
                <Slider
                  label="Diameter"
                  value={d}
                  min={0.25}
                  max={1}
                  step={0.25}
                  disabled={locked}
                  format={(v) => `${v} mm`}
                  onChange={(v) => {
                    setD(v);
                    reach("diameter");
                  }}
                />
                <Row>
                  <Readout label="Length" value={times(L)} />
                  <Readout label="Area" value={times(d * d)} />
                  <Readout label="Resistance" value={locked ? "?" : fmtR(res(L, d))} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
