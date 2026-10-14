"use client";

// Seesaw. A light, rigid 10 m plank pivoted at its middle, 1.0 m above the ground. A 40 kg
// child sits 2.0 m left of the pivot (torque 40 x 9.81 x 2.0 = 784.8 N m); the learner
// slides a 20 kg child along the right side (0.5-5.0 m). Torques about the pivot decide:
// a weightless plank with unequal torques tips all the way until one end hits the ground
// (11.5 deg here); it rests level only when 20 x 9.81 x d = 784.8 N m, i.e. d = 4.0 m.
// Two torque bars under the seesaw (weight x distance) show the comparison. 28 px per m.
//
// Earned reveal: milestones "tried-other" (a distance other than 4.0 m) and "balanced"
// (4.0 m). QA path: slider starts at 3.0 m; two presses give 3.5 m then 4.0 m.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const M_HEAVY = 40;
const D_HEAVY = 2.0;
const M_LIGHT = 20;
const HALF = 5; // m
const PIVOT_H = 1.0; // m
const T_HEAVY = M_HEAVY * G * D_HEAVY; // 784.8 N m
const D_BAL = T_HEAVY / (M_LIGHT * G); // 4.0 m
const MAX_TILT = Math.asin(PIVOT_H / HALF); // rad
const tq = (d: number) => M_LIGHT * G * d;
const nm = (v: number) => `${v.toFixed(0)} N·m`;

const W = 320;
const H = 196;
const K = 28;
const PX = 160;
const PY = 104;
const GROUND = PY + PIVOT_H * K;
const BAR_K = 0.14; // px per N m

export default function SeesawSitCloser({ slug }: { slug: string }) {
  const [d, setD] = useState(3);
  const [other, setOther] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${M_HEAVY} kg child sits ${D_HEAVY.toFixed(1)} m from the middle of a seesaw. Where must a ${M_LIGHT} kg child sit on the other side to balance it?`,
        options: ["4.0 m from the middle", "2.0 m from the middle", "1.0 m from the middle"],
        answer: 0,
      }}
      exploreHint="Slide the 20 kg child until the plank sits level."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The plank sat level only at <strong>{D_BAL.toFixed(1)} m</strong>: 20 kg at {D_BAL.toFixed(1)} m turns the
            plank as hard as 40 kg at {D_HEAVY.toFixed(1)} m, {nm(T_HEAVY)} each way.
            {other !== null
              ? ` At ${other.toFixed(1)} m the bars were unequal and the ${other < D_BAL ? "40 kg" : "20 kg"} side went down.`
              : ""}
          </p>
          <p>
            What turns a seesaw is weight times distance from the pivot (torque), not weight alone. Half the weight at twice
            the distance gives the same turning effect, so the lighter child balances by sitting further out.
          </p>
          <p className="muted">Model: a light rigid plank pivoted at its middle; children as single weights.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["tried-other", "balanced"]}>
          {(reach) => {
            const net = tq(d) - T_HEAVY; // positive: right side down
            // Locked: only the 40 kg child is aboard, so that side is down; no balance is shown before the guess.
            const tilt = locked ? -MAX_TILT : Math.abs(net) < 1e-6 ? 0 : Math.sign(net) * MAX_TILT;
            const at = (x: number, up: number) => ({
              x: PX + x * K * Math.cos(tilt) + up * Math.sin(tilt),
              y: PY + x * K * Math.sin(tilt) - up * Math.cos(tilt),
            });
            const a = at(-HALF, 0);
            const b = at(HALF, 0);
            const heavy = at(-D_HEAVY, 13);
            const light = at(d, 10);
            const lb = locked ? null : tq(d);
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={locked ? "40 kg child alone on a seesaw; its side is down" : `20 kg child at ${d} m; ${tilt === 0 ? "level" : "tipped"}`}>
                  <line x1={4} y1={GROUND} x2={W - 4} y2={GROUND} className={s.ground} />
                  <path d={`M${PX},${PY + 2} L${PX - 10},${GROUND} L${PX + 10},${GROUND} z`} className={s.pivot} />
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={s.plank} />
                  {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((m) => {
                    const p = at(m, 0);
                    const q = at(m, -5);
                    return <line key={m} x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={s.tick} />;
                  })}
                  {[-4, -2, 2, 4].map((m) => {
                    const p = at(m, -13);
                    return (
                      <text key={m} x={p.x} y={p.y + 3} textAnchor="middle" className={s.tickLabel}>
                        {Math.abs(m)} m
                      </text>
                    );
                  })}
                  <circle cx={heavy.x} cy={heavy.y} r={13} className={s.heavy} />
                  <text x={heavy.x} y={heavy.y + 3} textAnchor="middle" className={s.kid}>
                    40
                  </text>
                  {locked ? (
                    <>
                      <circle cx={W - 22} cy={GROUND - 10} r={10} className={s.light} />
                      <text x={W - 22} y={GROUND - 7} textAnchor="middle" className={s.kid}>
                        20
                      </text>
                    </>
                  ) : (
                    <>
                      <circle cx={light.x} cy={light.y} r={10} className={s.light} />
                      <text x={light.x} y={light.y + 3} textAnchor="middle" className={s.kid}>
                        20
                      </text>
                    </>
                  )}
                  {/* torque bars: weight x distance */}
                  <text x={PX} y={GROUND + 14} textAnchor="middle" className={s.chip}>
                    turning effect (weight × distance)
                  </text>
                  <rect x={PX - T_HEAVY * BAR_K} y={GROUND + 20} width={T_HEAVY * BAR_K} height={10} className={s.barHeavy} />
                  <text x={PX - T_HEAVY * BAR_K} y={GROUND + 42} className={s.barLabel}>
                    {nm(T_HEAVY)}
                  </text>
                  {lb !== null && (
                    <>
                      <rect x={PX} y={GROUND + 20} width={lb * BAR_K} height={10} className={s.barLight} />
                      <text x={PX + lb * BAR_K} y={GROUND + 42} textAnchor="end" className={s.barLabel}>
                        {nm(lb)}
                      </text>
                    </>
                  )}
                  <line x1={PX} y1={GROUND + 17} x2={PX} y2={GROUND + 33} className={s.mid} />
                  <text x={4} y={12} className={s.chip}>
                    Light plank, pivot in the middle. Kids in kg.
                  </text>
                </svg>

                <Slider
                  label="20 kg child, from the middle"
                  value={d}
                  min={0.5}
                  max={5}
                  step={0.5}
                  disabled={locked}
                  format={(v) => `${v.toFixed(1)} m`}
                  onChange={(v) => {
                    setD(v);
                    if (Math.abs(v - D_BAL) < 1e-9) reach("balanced");
                    else {
                      setOther(v);
                      reach("tried-other");
                    }
                  }}
                />
                <Row>
                  <Readout label="40 kg side" value={nm(T_HEAVY)} />
                  <Readout label="20 kg side" value={locked ? "?" : nm(tq(d))} />
                  <Readout label="Plank" value={locked ? "?" : tilt === 0 ? "level" : "tips"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
