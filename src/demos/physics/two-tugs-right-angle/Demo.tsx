"use client";

// Two tugs. A crate (seen from above) is pulled by 3 N east and 4 N at an angle theta
// from east (90 deg = north, as in the question). The single force with the same effect is
// the vector sum, drawn head-to-tail: R = sqrt(3^2 + 4^2 + 2*3*4 cos theta), 5 N at 90 deg,
// 7 N only when both point the same way, 1 N when opposed. A dashed ruler marks 7 N (the
// "just add the numbers" answer). "Swap order" draws the 4 N pull first: same resultant.
// One scale: 22 px per newton.
//
// Earned reveal: milestone "other-angle" (the learner turns the 4 N pull away from north
// and sees the single force change with direction alone). QA: two slider presses, 90 -> 120.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const A = 3; // N, east
const B = 4; // N, at theta
const K = 22; // px per N
const W = 320;
const H = 172;
const CX = 62;
const CY = 140;
const rad = (d: number) => (d * Math.PI) / 180;
const sum = (th: number) => {
  const x = A + B * Math.cos(rad(th));
  const y = B * Math.sin(rad(th));
  return { x, y, r: Math.hypot(x, y), dir: (Math.atan2(y, x) * 180) / Math.PI };
};
const n1 = (v: number) => v.toFixed(1);

function Arrow({ x1, y1, x2, y2, cls, head }: { x1: number; y1: number; x2: number; y2: number; cls: string; head: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className={cls} markerEnd={`url(#${head})`} />;
}

type P = [number, number];
/** Label position for a triangle side p->q, pushed outward (away from the opposite corner). */
function side(p: P, q: P, opp: P, tier: number) {
  const mx = (p[0] + q[0]) / 2;
  const my = (p[1] + q[1]) / 2;
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len;
  let ny = dx / len;
  const cross = (q[0] - p[0]) * (opp[1] - p[1]) - (q[1] - p[1]) * (opp[0] - p[0]);
  const d = 12;
  if (Math.abs(cross) < 40) {
    // collinear (0 or 180 degrees): stack the three labels above the line
    nx = 0;
    ny = -1;
    return { x: mx, y: my + ny * tier * d + 3, textAnchor: "middle" as const };
  }
  if (nx * (mx - opp[0]) + ny * (my - opp[1]) < 0) {
    nx = -nx;
    ny = -ny;
  }
  const textAnchor = nx > 0.35 ? ("start" as const) : nx < -0.35 ? ("end" as const) : ("middle" as const);
  return { x: mx + nx * d, y: my + ny * d + 3, textAnchor };
}

export default function TwoTugsRightAngle({ slug }: { slug: string }) {
  const [th, setTh] = useState(90);
  const [swap, setSwap] = useState(false);
  const [other, setOther] = useState<number | null>(null);
  const right = sum(90);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Moving a crate across ice, you pull it 3 N east while your neighbour pulls 4 N north at the same time. How big is the single force with the same effect?",
        options: ["5 N", "7 N", "1 N"],
        answer: 0,
      }}
      exploreHint="Read the single force at 90°, then turn the 4 N pull."
      reveal={() => {
        const o = other === null ? null : sum(other);
        return (
          <>
            <p>
              At a right angle the single force was <strong>{n1(right.r)} N</strong>, pointing {Math.round(right.dir)}°
              north of east. With the 4 N pull at {other}° from east it became {o ? n1(o.r) : "?"} N: same two pulls, different
              direction, different total.
            </p>
            <p>
              Forces add as arrows, tip to tail. At 90° the arrows make a right triangle, so the total is √(3² + 4²) = 5 N.
              You only get 7 N when both pull the same way, and 1 N when they pull against each other.
            </p>
            <p className="muted">Seen from above, on frictionless ice; only the two pulls act along the ice.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["other-angle"]}>
          {(reach) => {
            const v = sum(th);
            const ax = A * K;
            const bx = B * K * Math.cos(rad(th));
            const by = -B * K * Math.sin(rad(th));
            // head-to-tail: first arrow from the crate, second from its tip
            const first = swap ? { dx: bx, dy: by, cls: s.pullB, head: "tt-b" } : { dx: ax, dy: 0, cls: s.pullA, head: "tt-a" };
            const second = swap ? { dx: ax, dy: 0, cls: s.pullA, head: "tt-a" } : { dx: bx, dy: by, cls: s.pullB, head: "tt-b" };
            const tipX = CX + v.x * K;
            const tipY = CY - v.y * K;
            const vx = CX + first.dx;
            const vy = CY + first.dy;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`4 N pull at ${th} degrees from east`}>
                  <defs>
                    {[
                      ["tt-a", s.headA],
                      ["tt-b", s.headB],
                      ["tt-r", s.headR],
                    ].map(([id, cls]) => (
                      <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" className={cls} />
                      </marker>
                    ))}
                  </defs>
                  {/* 7 N ruler: what simply adding the numbers would give */}
                  <line x1={CX} y1={CY + 16} x2={CX + 7 * K} y2={CY + 16} className={s.ruler} />
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <line key={n} x1={CX + n * K} y1={CY + 13} x2={CX + n * K} y2={CY + 19} className={s.tick} />
                  ))}
                  <text x={CX + 7 * K + 4} y={CY + 19} className={s.chip}>
                    7 N
                  </text>
                  <rect x={CX - 9} y={CY - 9} width={18} height={18} className={s.crate} />
                  <Arrow x1={CX} y1={CY} x2={CX + first.dx} y2={CY + first.dy} cls={first.cls} head={first.head} />
                  <Arrow
                    x1={CX + first.dx}
                    y1={CY + first.dy}
                    x2={CX + first.dx + second.dx}
                    y2={CY + first.dy + second.dy}
                    cls={second.cls}
                    head={second.head}
                  />
                  <text {...side([CX, CY], [vx, vy], [tipX, tipY], 1)} className={swap ? s.labB : s.labA}>
                    {swap ? "4 N" : "3 N"}
                  </text>
                  <text {...side([vx, vy], [tipX, tipY], [CX, CY], 2)} className={swap ? s.labA : s.labB}>
                    {swap ? "3 N" : "4 N"}
                  </text>
                  {!locked && (
                    <>
                      <Arrow x1={CX} y1={CY} x2={tipX} y2={tipY} cls={s.result} head="tt-r" />
                      <text {...side([CX, CY], [tipX, tipY], [vx, vy], 3)} className={s.labR}>
                        {n1(v.r)} N
                      </text>
                    </>
                  )}
                  <text x={6} y={14} className={s.chip}>
                    {swap ? "Order swapped: same single force." : "Top view, on ice. North is up."}
                  </text>
                </svg>

                <Slider
                  label="4 N pull, from east"
                  value={th}
                  min={0}
                  max={180}
                  step={15}
                  disabled={locked}
                  format={(d) => `${d}°`}
                  onChange={(d) => {
                    setTh(d);
                    if (d !== 90) {
                      setOther(d);
                      reach("other-angle");
                    }
                  }}
                />
                <Row>
                  <Control disabled={locked} onClick={() => setSwap((x) => !x)}>
                    Swap order
                  </Control>
                  <Readout label="Single force" value={locked ? "?" : `${n1(v.r)} N`} />
                  <Readout label="Direction" value={locked ? "?" : `${Math.round(v.dir)}° from E`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
