"use client";

// Elevator scale. A 70 kg person stands on a force scale in a lift. The scale reads the
// floor's upward push N; Newton's second law for the person gives N - m g = m a (a positive
// upward), so N = m (g + a): 686.7 N steady, 826.7 N accelerating up at 2 m/s^2, 546.7 N
// accelerating down at 2 m/s^2. Gravity's pull (686.7 N) never changes. One picture: the
// lift with the person, two force arrows (0.075 px per N) and the scale's dial (0-1000 N).
//
// Earned reveal: milestones "up" and "down" (the learner has accelerated the lift both ways).
// QA path: "Accelerate up", "Steady", "Accelerate down" come first in the DOM.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const M = 70;
const reading = (a: number) => M * (G + a); // N, a up positive
const n0 = (v: number) => `${v.toFixed(0)} N`;
type Mode = "up" | "steady" | "down";
const SIGN: Record<Mode, number> = { up: 1, steady: 0, down: -1 };

const W = 320;
const H = 200;
const FLOOR = 176;
const PX_PER_N = 0.075;
const DCX = 266;
const DCY = 116;
const DR = 48;
const DMAX = 1000;
const dialPt = (n: number, r: number) => {
  const th = Math.PI - (Math.PI * Math.min(n, DMAX)) / DMAX;
  return { x: DCX + r * Math.cos(th), y: DCY - r * Math.sin(th) };
};

export default function ElevatorScale({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("steady");
  const [mag, setMag] = useState(2);
  const [seen, setSeen] = useState<{ up?: number; down?: number }>({});
  const a = SIGN[mode] * mag;
  const N = reading(a);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Riding a lift, you (${M} kg) stand on a force scale. At rest it reads ${n0(reading(0))}. The lift starts accelerating upward at 2 m/s². What does the scale read now?`,
        options: [n0(reading(-2)), n0(reading(2)), n0(reading(0))],
        answer: 1,
      }}
      exploreHint="Accelerate the lift up, then down, and watch the needle."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Accelerating up{seen.up !== undefined ? ` at ${seen.up} m/s²` : ""} the scale read{" "}
            <strong>{n0(reading(seen.up ?? 2))}</strong>; accelerating down
            {seen.down !== undefined ? ` at ${seen.down} m/s²` : ""} it read {n0(reading(-(seen.down ?? 2)))}. Gravity&apos;s
            pull stayed {n0(reading(0))} the whole time.
          </p>
          <p>
            A scale measures how hard the floor pushes on you. To speed you upward the floor must push harder than gravity
            pulls: N = m(g + a) = {M} × (9.81 + 2) = {n0(reading(2))}. Accelerating down, it pushes less.
          </p>
          <p className="muted">
            &quot;Accelerating up&quot; includes braking on the way down. A steady ride reads the same as standing still.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["up", "down"]}>
          {(reach) => {
            const pick = (m: Mode) => {
              setMode(m);
              if (m === "up") {
                setSeen((x) => ({ ...x, up: mag }));
                reach("up");
              }
              if (m === "down") {
                setSeen((x) => ({ ...x, down: mag }));
                reach("down");
              }
            };
            const wLen = reading(0) * PX_PER_N;
            const nLen = N * PX_PER_N;
            const px = 92; // person centre x
            const needle = dialPt(locked ? 0 : N, DR - 8);
            const rest = [dialPt(reading(0), DR - 2), dialPt(reading(0), DR + 6)];
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Lift ${mode}; scale ${locked ? "hidden" : n0(N)}`}>
                  <defs>
                    {[
                      ["el-w", s.headW],
                      ["el-n", s.headN],
                      ["el-a", s.headA],
                    ].map(([id, cls]) => (
                      <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" className={cls} />
                      </marker>
                    ))}
                  </defs>
                  {/* lift car */}
                  <rect x={20} y={18} width={142} height={FLOOR - 18 + 6} className={s.car} />
                  <line x1={92} y1={2} x2={92} y2={18} className={s.cable} />
                  {/* scale and person */}
                  <rect x={70} y={FLOOR - 8} width={44} height={8} className={s.scale} />
                  <rect x={px - 9} y={FLOOR - 8 - 74} width={18} height={60} rx={8} className={s.body} />
                  <circle cx={px} cy={FLOOR - 8 - 84} r={10} className={s.body} />
                  {/* forces on the person */}
                  <line x1={px - 22} y1={FLOOR - 92} x2={px - 22} y2={FLOOR - 92 + wLen} className={s.weight} markerEnd="url(#el-w)" />
                  <text x={px - 26} y={FLOOR - 96} textAnchor="end" className={s.labW}>
                    gravity
                  </text>
                  {!locked && (
                    <>
                      <line x1={px + 22} y1={FLOOR - 10} x2={px + 22} y2={FLOOR - 10 - nLen} className={s.push} markerEnd="url(#el-n)" />
                      <text x={px + 27} y={FLOOR - 16 - nLen} className={s.labN}>
                        <tspan x={px + 27}>floor</tspan>
                        <tspan x={px + 27} dy={10}>push</tspan>
                      </text>
                    </>
                  )}
                  {/* lift acceleration */}
                  {mode !== "steady" && !locked && (
                    <>
                      <line
                        x1={188}
                        y1={mode === "up" ? 120 : 60}
                        x2={188}
                        y2={mode === "up" ? 120 - mag * 12 : 60 + mag * 12}
                        className={s.acc}
                        markerEnd="url(#el-a)"
                      />
                      <text x={188} textAnchor="middle" y={mode === "up" ? 134 : 52} className={s.labA}>
                        a = {mag} m/s²
                      </text>
                    </>
                  )}
                  {/* dial */}
                  <path d={`M${DCX - DR},${DCY} A${DR},${DR} 0 0 1 ${DCX + DR},${DCY}`} className={s.dial} />
                  {[0, 250, 500, 750, 1000].map((v) => {
                    const p1 = dialPt(v, DR);
                    const p2 = dialPt(v, DR - 6);
                    const pl = dialPt(v, DR - 15);
                    return (
                      <g key={v}>
                        <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className={s.tick} />
                        <text x={pl.x} y={pl.y + 3} textAnchor="middle" className={s.tickLabel}>
                          {v}
                        </text>
                      </g>
                    );
                  })}
                  <line x1={rest[0].x} y1={rest[0].y} x2={rest[1].x} y2={rest[1].y} className={s.restMark} />
                  <line x1={DCX} y1={DCY} x2={needle.x} y2={needle.y} className={s.needle} />
                  <circle cx={DCX} cy={DCY} r={3} className={s.hub} />
                  <text x={DCX} y={DCY + 22} textAnchor="middle" className={s.big}>
                    {locked ? "? N" : n0(N)}
                  </text>
                  <text x={W - 4} y={DCY + 36} textAnchor="end" className={s.chip}>
                    Red mark: at rest. {M} kg rider.
                  </text>
                </svg>

                <Row>
                  {(["up", "steady", "down"] as Mode[]).map((m) => (
                    <Control key={m} className={mode === m ? "active" : ""} disabled={locked || mode === m} onClick={() => pick(m)}>
                      {m === "up" ? "Accelerate up" : m === "down" ? "Accelerate down" : "Steady"}
                    </Control>
                  ))}
                </Row>
                <Slider
                  label="Acceleration"
                  value={mag}
                  min={0.5}
                  max={4}
                  step={0.5}
                  disabled={locked || mode === "steady"}
                  format={(v) => `${v} m/s²`}
                  onChange={(v) => {
                    setMag(v);
                    if (mode === "up") setSeen((x) => ({ ...x, up: v }));
                    if (mode === "down") setSeen((x) => ({ ...x, down: v }));
                  }}
                />
                <Row>
                  <Readout label="Gravity's pull" value={n0(reading(0))} />
                  <Readout label="Floor push (scale)" value={locked ? "?" : n0(N)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
