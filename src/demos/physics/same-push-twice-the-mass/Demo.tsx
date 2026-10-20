"use client";

// Same push, twice the mass. A steady force pushes a cart from rest on a
// frictionless track for 2 s. The speed-versus-time line shows speed climbing
// steadily (a constant force gives constant acceleration, not constant speed);
// the dashed ghost is the 10 N, 2 kg cart from the question.
//
// Physics: Newton's second law a = F / m, from rest, v(t) = a t. Frictionless,
// constant force, no air. The reveal unlocks once the learner has set the
// question's case (10 N on 4 kg) and read its speed.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useState } from "react";
import s from "./styles.module.css";

const T_END = 2; // s
const V_MAX = 20; // m/s, top of the graph
const GHOST = { F: 10, m: 2 };

const W = 314;
const H = 190;
const X0 = 34;
const Y0 = 166;
const X1 = 226; // labels sit to the right of the 2 s line
const Y1 = 16;
const sx = (t: number) => X0 + (t / T_END) * (X1 - X0);
const sy = (v: number) => Y0 - (Math.min(v, V_MAX) / V_MAX) * (Y0 - Y1);

/** End point of v = a t, clipped where it leaves the top of the graph. */
function line(a: number) {
  const tEnd = a * T_END > V_MAX ? V_MAX / a : T_END;
  return { x: sx(tEnd), y: sy(a * tEnd), clipped: tEnd < T_END };
}

export default function SamePushTwiceTheMass({ slug }: { slug: string }) {
  const [mass, setMass] = useState(2);
  const [force, setForce] = useState(10);
  const [seenCase, setSeenCase] = useState(false);
  const [seenMore, setSeenMore] = useState(false);

  const a = force / mass;
  const v2 = a * T_END;
  const ghostA = GHOST.F / GHOST.m;
  const me = line(a);
  const ghost = line(ghostA);
  const isGhost = mass === GHOST.m && force === GHOST.F;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In the school lab, a steady 10 N push moves a 2 kg cart from rest on a frictionless track. After 2 s it moves at 10 m/s. You give a 4 kg cart the same 10 N push. Its speed after 2 s?",
        options: ["10 m/s", "5 m/s", "2.5 m/s"],
        answer: 1,
      }}
      exploreHint="Set the cart to 4 kg and read its speed at 2 s. Then try a bigger push."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            A steady push does not give a steady speed: speed keeps climbing while the push lasts. With the 10 N push, the 4 kg cart reached <strong>5 m/s</strong> after 2 s, half the 2 kg cart&rsquo;s 10 m/s. The same push
            speeds up twice the mass half as fast: acceleration is force divided by mass, 10 N / 4 kg = 2.5 m/s every
            second.
          </p>
          <p>
            Notice the lines: a bigger push made the line steeper, because acceleration (speed gained each second) grows
            with the push.
          </p>
          <p className="muted">Newton&rsquo;s second law: a = F / m, with a the acceleration, F the push in newtons and m the mass in kg.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const change = (m: number, F: number) => {
          // Two steps: the question's case (10 N on 4 kg), then a bigger push on any cart.
          if (!seenCase) {
            if (m === 4 && F === 10) {
              setSeenCase(true);
              interact();
            }
          } else if (!seenMore && F > 10) {
            setSeenMore(true);
            interact();
          }
        };
        const caption = locked
          ? "Make a prediction to start."
          : mass === 4 && force === 10
            ? "Same 10 N, twice the mass."
            : isGhost
              ? "A steady push: speed climbs steadily."
              : `${force} N on ${mass} kg.`;

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Speed against time for ${force} newtons on ${mass} kilograms`}>
              {[0, 5, 10, 15, 20].map((v) => (
                <g key={v}>
                  <line x1={X0} y1={sy(v)} x2={X1} y2={sy(v)} className={s.grid} />
                  <text x={X0 - 5} y={sy(v) + 3} textAnchor="end" className={s.tick}>
                    {v}
                  </text>
                </g>
              ))}
              {[0, 1, 2].map((t) => (
                <text key={t} x={sx(t)} y={Y0 + 14} textAnchor="middle" className={s.tick}>
                  {t} s
                </text>
              ))}
              <text x={X0 + 4} y={Y1 + 2} className={s.axis}>
                m/s
              </text>
              <line x1={X0} y1={Y0} x2={X1} y2={Y0} className={s.axisLine} />
              <line x1={X0} y1={Y0} x2={X0} y2={Y1} className={s.axisLine} />

              {/* ghost: 10 N on 2 kg */}
              <line x1={sx(0)} y1={sy(0)} x2={ghost.x} y2={ghost.y} className={s.ghost} />
              <text x={ghost.x + 7} y={ghost.y + 4 + (!isGhost && !me.clipped && Math.abs(me.y - ghost.y) < 14 ? (me.y > ghost.y ? -7 : 7) : 0)} className={s.ghostLabel}>
                2 kg
              </text>

              {/* yours */}
              {!isGhost && (
                <>
                  <line x1={sx(0)} y1={sy(0)} x2={me.x} y2={me.y} className={s.mine} />
                  {!me.clipped && (
                    <>
                      <circle cx={me.x} cy={me.y} r={4.5} className={s.dot} />
                      <text x={me.x + 7} y={me.y + 4 + (Math.abs(me.y - ghost.y) < 14 ? (me.y > ghost.y ? 7 : -7) : 0)} className={s.mineLabel}>
                        {mass} kg: {v2 % 1 === 0 ? v2 : v2.toFixed(1)} m/s
                      </text>
                    </>
                  )}
                </>
              )}
              <circle cx={ghost.x} cy={ghost.y} r={3.5} className={s.ghostDot} />
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              <Slider
                label="Cart mass"
                value={mass}
                min={1}
                max={8}
                step={1}
                disabled={locked}
                format={(v) => `${v} kg`}
                onChange={(v) => {
                  setMass(v);
                  change(v, force);
                }}
              />
              <Slider
                label="Push"
                value={force}
                min={0}
                max={20}
                step={1}
                disabled={locked}
                format={(v) => `${v} N`}
                onChange={(v) => {
                  setForce(v);
                  change(mass, v);
                }}
              />
            </Row>
            <Row>
              <Readout label="Speed at 2 s" value={v2 > V_MAX ? `${v2.toFixed(0)} m/s (off the top)` : `${v2 % 1 === 0 ? v2 : v2.toFixed(2)} m/s`} />
              <Readout label="Acceleration" value={`${a % 1 === 0 ? a : a.toFixed(2)} m/s each second (speed gained)`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
