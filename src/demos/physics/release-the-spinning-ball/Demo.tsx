"use client";

// Release the spinning ball. Top view of a ball whirled anticlockwise on a 0.5 m
// string at 2 m/s on a frictionless table (illustrative values). When the string is
// cut, no horizontal force acts, so the ball keeps the velocity it had at that instant:
// a straight line along the tangent. Cut at the east point (moving north), it goes
// straight north.
//
// The trail is drawn as dots every 0.05 s for 0.4 s after the cut (constant spacing,
// constant speed). Gravity is balanced by the table. The reveal unlocks once the
// learner has cut the string at the east point.

import { Lesson } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const R = 0.5; // m
const V = 2; // m/s
const W = 320;
const H = 230;
const CX = 160;
const CY = 118;
const K = 100; // px per m
const NAMES = ["east", "north-east", "north", "north-west", "west", "south-west", "south", "south-east"];
const DIRS = ["east", "north-east", "north", "north-west", "west", "south-west", "south", "south-east"];

/** Ball position at angle a (degrees, anticlockwise from east), in px. */
const posAt = (a: number) => {
  const r = (a * Math.PI) / 180;
  return { x: CX + R * K * Math.cos(r), y: CY - R * K * Math.sin(r) };
};
/** Trail points after a cut at angle a: velocity is tangent (anticlockwise). */
const trail = (a: number) => {
  const r = (a * Math.PI) / 180;
  const p = posAt(a);
  const vx = -Math.sin(r) * V;
  const vy = Math.cos(r) * V; // north positive
  return Array.from({ length: 9 }, (_, i) => {
    const t = i * 0.05;
    return { x: p.x + vx * t * K, y: p.y - vy * t * K };
  });
};
/** Compass name of the direction of travel after a cut at angle a. */
const goes = (a: number) => DIRS[((a / 45 + 2) % 8 + 8) % 8];

export default function ReleaseTheSpinningBall({ slug }: { slug: string }) {
  const [angle, setAngle] = useState(0);
  const [cut, setCut] = useState(false);
  const [cuts, setCuts] = useState<number[]>([]);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["cut-east"]);
  const ball = posAt(angle);
  const tr = trail(angle);
  const end = tr[tr.length - 1];
  const name = NAMES[angle / 45];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On a frictionless table, you whirl a ball anticlockwise on a string. You cut the string at the east point, while the ball moves north. Which path does it take?",
        options: ["Straight east, away from the centre", "Straight north", "Keeps curving round"],
        answer: 1,
      }}
      exploreHint="Cut the string at the east point. Then cut it at other points."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Cut at the east point, the ball went <strong>straight north</strong>: the direction it was already moving,
            along the edge of the circle, not outward.{" "}
            {cuts.length > 1
              ? `Every other cut you made did the same: the ball left along the circle's edge, in a straight line.`
              : `Every cut point does the same: the ball leaves along the circle's edge, in a straight line.`}
          </p>
          <p>
            While it whirls, the string pulls the ball toward the centre, bending its path round. Nothing ever flings it
            outward. Cut the string and no sideways force is left, so the ball keeps its speed and direction.
          </p>
          <p className="muted">The string only bends the path. Without it, motion goes straight.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : cut
            ? `Cut at ${name}: it went straight ${goes(angle)}.`
            : `Top view, frictionless table. Ball at the ${name} point.`;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
              <circle cx={CX} cy={CY} r={R * K} className={s.orbit} />
              {[45, 135, 225, 315].map((a) => {
                const p = posAt(a);
                const rot = -a - 90; // tangent direction of anticlockwise motion, in screen degrees
                return <path key={a} d="M -4 -3 L 3 0 L -4 3" transform={`translate(${p.x} ${p.y}) rotate(${rot})`} className={s.chev} />;
              })}
              <text x={CX} y={16} textAnchor="middle" className={s.small}>
                N
              </text>
              <text x={W - 34} y={CY + 3} className={s.small}>
                E
              </text>
              <circle cx={CX} cy={CY} r={3} className={s.hub} />
              {cuts
                .filter((a) => !(cut && a === angle))
                .map((a) => {
                  const t2 = trail(a);
                  return (
                    <g key={a}>
                      {t2.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={1.6} className={s.oldDot} />
                      ))}
                    </g>
                  );
                })}
              {cut ? (
                <g>
                  {tr.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={2.2} className={s.dot} />
                  ))}
                  <circle cx={end.x} cy={end.y} r={7} className={s.ball} />
                  <line x1={CX} y1={CY} x2={CX + (ball.x - CX) * 0.45} y2={CY + (ball.y - CY) * 0.45} className={s.string} />
                </g>
              ) : (
                <g>
                  <line x1={CX} y1={CY} x2={ball.x} y2={ball.y} className={s.string} />
                  <circle cx={ball.x} cy={ball.y} r={7} className={s.ball} />
                </g>
              )}
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Control
              disabled={locked || cut}
              onClick={() => {
                setCut(true);
                setCuts((c) => (c.includes(angle) ? c : [...c, angle]));
                if (angle === 0) reach("cut-east");
              }}
            >
              {cut ? "String cut" : "Cut the string"}
            </Control>
            <Slider
              label="Cut at"
              value={angle}
              min={0}
              max={315}
              step={45}
              disabled={locked}
              format={(a) => NAMES[a / 45]}
              onChange={(a) => {
                setAngle(a);
                setCut(false);
              }}
            />
          </div>
        );
      }}
    </Lesson>
  );
}
