"use client";

// River crossing. Top view of a 90 m river with a uniform current u (0-6 m/s) flowing to
// the right. The boat always points straight across and moves at 3 m/s relative to the
// water, so its position is x = u t (downstream), y = 3 t (across). It reaches the far bank
// at t = 90 / 3 = 30 s whatever u is; it lands u x 30 m downstream. Dots every 10 s on the
// path sit on the same across-lines as the dots of a no-current crossing (dashed ghost).
// One scale: 1.5 px per metre in both directions.
//
// Earned reveal: milestone "faster-current" when the learner sets a current faster than the
// boat (u > 3 m/s). QA path: the slider starts at 2 m/s, two presses reach 4 m/s.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const WIDTH_M = 90;
const BOAT = 3; // m/s across, relative to the water
const T_CROSS = WIDTH_M / BOAT; // 30 s
const W = 320;
const H = 196;
const K = 1.5; // px per m
const X0 = 18;
const FAR_Y = 26;
const NEAR_Y = FAR_Y + WIDTH_M * K;
const pos = (u: number, t: number) => ({ x: X0 + u * t * K, y: NEAR_Y - BOAT * t * K });

export default function RiverCrossingTime({ slug }: { slug: string }) {
  const [u, setU] = useState(2);
  const [t, setT] = useState(T_CROSS);
  const [maxU, setMaxU] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You point your boat straight across a ${WIDTH_M} m river and paddle at ${BOAT} m/s (relative to the water). The current runs at 4 m/s. How long until you reach the far bank?`,
        options: ["18 s", "30 s", "Never: the current is faster"],
        answer: 1,
      }}
      exploreHint="Make the current faster than the boat and watch the clock."
      reveal={() => (
        <>
          <p>
            At a {maxU} m/s current, faster than the boat, it still reached the far bank in{" "}
            <strong>{T_CROSS} s</strong>, landing {maxU * T_CROSS} m downstream. Every 10 s it was {BOAT * 10} m further
            across, exactly like the no-current crossing.
          </p>
          <p>
            The current pushes along the river, never across it. So the boat&apos;s {BOAT} m/s across is untouched:{" "}
            {WIDTH_M} m ÷ {BOAT} m/s = {T_CROSS} s. The current only decides where you land, not when.
          </p>
          <p className="muted">Model: the same current everywhere; real rivers run slower near the banks.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["faster-current"]}>
          {(reach) => {
            const end = pos(u, T_CROSS);
            const boat = pos(u, t);
            const dots = [10, 20, 30];
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Current ${u} m/s; boat at ${t} s`}>
                  <rect x={0} y={FAR_Y} width={W} height={NEAR_Y - FAR_Y} className={s.water} />
                  <line x1={0} y1={FAR_Y} x2={W} y2={FAR_Y} className={s.bank} />
                  <line x1={0} y1={NEAR_Y} x2={W} y2={NEAR_Y} className={s.bank} />
                  <text x={4} y={FAR_Y - 6} className={s.chip}>
                    Far bank, {WIDTH_M} m across
                  </text>
                  {/* current arrows, length proportional to u */}
                  {u > 0 &&
                    [0.25, 0.75].map((f) =>
                      [60, 180].map((cx) => (
                        <line
                          key={`${f}-${cx}`}
                          x1={cx}
                          y1={FAR_Y + f * (NEAR_Y - FAR_Y)}
                          x2={cx + u * 6}
                          y2={FAR_Y + f * (NEAR_Y - FAR_Y)}
                          className={s.flow}
                          markerEnd="url(#rv-head)"
                        />
                      )),
                    )}
                  <defs>
                    <marker id="rv-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" className={s.flowHead} />
                    </marker>
                  </defs>
                  {/* across-lines every 10 s */}
                  {dots.map((d) => (
                    <line key={d} x1={0} y1={pos(0, d).y} x2={W} y2={pos(0, d).y} className={s.guide} />
                  ))}
                  {/* no-current ghost */}
                  <line x1={X0} y1={NEAR_Y} x2={X0} y2={FAR_Y} className={s.ghost} />
                  {!locked && (
                    <>
                      <line x1={X0} y1={NEAR_Y} x2={end.x} y2={end.y} className={s.path} />
                      {dots.map((d) => (
                        <circle key={d} cx={pos(u, d).x} cy={pos(u, d).y} r={3} className={s.dot} />
                      ))}
                      <text x={Math.min(end.x, W - 4)} y={FAR_Y - 6} textAnchor={end.x > W - 80 ? "end" : "middle"} className={s.land}>
                        lands {u * T_CROSS} m down
                      </text>
                    </>
                  )}
                  <g transform={`translate(${locked ? X0 : boat.x},${locked ? NEAR_Y : boat.y})`}>
                    <path d="M0,-8 L5,5 L-5,5 z" className={s.boat} />
                  </g>
                  <text x={4} y={H - 4} className={s.chip}>
                    Top view. Boat aims straight across. Uniform current.
                  </text>
                </svg>

                <Slider
                  label="Current"
                  value={u}
                  min={0}
                  max={6}
                  step={1}
                  disabled={locked}
                  format={(v) => `${v} m/s`}
                  onChange={(v) => {
                    setU(v);
                    setMaxU((m) => Math.max(m, v));
                    if (v > BOAT) reach("faster-current");
                  }}
                />
                <Row>
                  <Control disabled={locked || t === 0} onClick={() => setT(0)}>
                    Start over
                  </Control>
                  <Control disabled={locked || t >= T_CROSS} onClick={() => setT((x) => Math.min(T_CROSS, x + 10))}>
                    +10 s
                  </Control>
                </Row>
                <Row>
                  <Readout label="Clock" value={locked ? "?" : `${t} s`} />
                  <Readout label="Across" value={locked ? "?" : `${BOAT * t} m`} />
                  <Readout label="Downstream" value={locked ? "?" : `${u * t} m`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
