"use client";

// Angular momentum. With no outside twist, L = I x spin stays fixed. The skater starts at
// 1 turn per second with I = 3.0 kg m^2 (arms out); arm stops give I = 3.0, 2.0, 1.0
// (illustrative values), so spin = 3.0 / I = 1, 1.5, 3 turns per second. Top view; the
// skater turns at real speed (CSS rotation, one turn per 1 / spin seconds).
//
// Earned reveal: milestone "tucked". QA path: the arms slider starts out; two presses go
// to halfway (I = 2.0) and then tucked (I = 1.0), the question's state.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const L = 3.0; // kg m^2 x turns per second, fixed
const STOPS = [
  { I: 3.0, name: "out", reach: 62 },
  { I: 2.0, name: "halfway", reach: 42 },
  { I: 1.0, name: "tucked", reach: 18 },
];
const TUCKED = 2;
const spin = (I: number) => L / I;
const tps = (w: number) => `${Number.isInteger(w) ? w.toFixed(0) : w.toFixed(1)} turns/s`;

const W = 320;
const H = 170;
const CX = 160;
const CY = 88;

export default function SkaterPullsArms({ slug }: { slug: string }) {
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const st = STOPS[idx];
  const w = spin(st.I);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "At the rink, you watch a skater spin at 1 turn per second. Pulling her arms in cuts her moment of inertia (how spread out her mass is around the spin axis) from 3.0 to 1.0 kg·m². How fast does she spin now?",
        options: ["1 turn per second", "3 turns per second", "9 turns per second"],
        answer: 1,
      }}
      exploreHint="Pull her arms in step by step and watch the spin and the product."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Tucked (1.0 kg·m²), she spun <strong>{tps(spin(1))}</strong>, three times as fast as with arms out.
            {seen.includes(1) ? ` Halfway (2.0 kg·m²) gave ${tps(spin(2))}.` : ""} At every step, moment of inertia × spin stayed{" "}
            <strong>{L.toFixed(1)}</strong>.
          </p>
          <p>
            That product is angular momentum. With nothing outside twisting her, it cannot change, so a third of the moment of
            inertia means three times the spin.
          </p>
          <p className="muted">Frictionless ice, no air; the moments of inertia are illustrative.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["tucked"]}>
          {(reach) => (
            <div className={s.wrap}>
              <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Arms ${st.name}, spinning ${tps(w)}`}>
                <text x={4} y={H - 4} className={s.chip}>
                  Top view, real speed. Frictionless ice. Values illustrative.
                </text>
                <circle cx={CX} cy={CY} r={72} className={s.ice} />
                <line x1={CX} y1={CY - 78} x2={CX} y2={CY - 66} className={s.mark} />
                <g className={s.spin} style={{ animationDuration: `${1 / w}s`, transformOrigin: `${CX}px ${CY}px` }}>
                  <line x1={CX - st.reach} y1={CY} x2={CX + st.reach} y2={CY} className={s.arm} />
                  <circle cx={CX - st.reach} cy={CY} r={5} className={s.hand} />
                  <circle cx={CX + st.reach} cy={CY} r={5} className={s.hand} />
                  <ellipse cx={CX} cy={CY} rx={14} ry={10} className={s.body} />
                  <circle cx={CX} cy={CY - 3} r={6} className={s.head} />
                  <path d={`M ${CX} ${CY - 9} L ${CX - 3} ${CY - 14} L ${CX + 3} ${CY - 14} Z`} className={s.nose} />
                </g>
                <text x={W - 4} y={14} textAnchor="end" className={s.label}>
                  I = {st.I.toFixed(1)} kg·m²
                </text>
              </svg>

              <p className={s.caption} aria-live="polite">
                {locked
                  ? "I, moment of inertia: how far her mass sits from the spin axis."
                  : `I × spin = ${st.I.toFixed(1)} × ${w.toFixed(1)} = ${(st.I * w).toFixed(1)}`}
              </p>

              <Row>
                <Slider
                  label="Arms"
                  value={idx}
                  min={0}
                  max={STOPS.length - 1}
                  step={1}
                  format={(i) => STOPS[i].name}
                  disabled={locked}
                  onChange={(i) => {
                    setIdx(i);
                    setSeen((xs) => (xs.includes(i) ? xs : [...xs, i]));
                    if (i === TUCKED) reach("tucked");
                  }}
                />
              </Row>
              <Row>
                <Readout label="Spin" value={locked ? "?" : tps(w)} />
                <Readout label="I × spin" value={locked ? "?" : (st.I * w).toFixed(1)} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
