"use client";

// Newton's mountain. The learner picks a sideways throw speed from a 10 km peak on a
// to-scale Earth with no air; the arc (from model.ts, integrated under 1/r^2 gravity)
// grows until it wraps the planet. Heights above the ground are exaggerated 40x so the
// arc is visible; distances around the planet are to scale. Until v4 the speed number
// stayed hidden until the ball closed the loop; v5 shows it on every throw after the commit
// (learner r7: landings could not be tied to a speed).
//
// Earned reveal (v3): milestones "landed" (the learner moves to a throw that lands) and "loop" (a throw
// comes all the way round). The cause is on the stage: a dashed straight sideways line from the peak,
// a red tick at one minute from that line down to the ball, and a caption comparing how far the ball
// fell below the line in that minute (17.6 km for every throw) with how far the ground curved away
// (13.9 km at 7.0 km/s up to 17.6 km at 7.9 km/s). The lap time is on the readout.
// v4: controls in DOM order are Slower, the slider, Faster (one stop each), so pressing each once from the
// 7.8 start visits 7.6 (lands), 7.8 and 7.85 (land), then 7.9 (the loop). The fastest landing the learner
// moved to stays on stage as a text line (distance and how far the ground curved away in the first minute),
// so the reveal's "your 7.85 km/s throw" is still visible when it opens.
// v5 (learner r7): the speed shows on every throw after the commit (it was "?" until the loop, so landings could
// not be tied to a speed). Two stops past 7.9 km/s (9.0, an oval orbit that leaves the picture; 79, an escape), so
// the slider's top is not the answer. The "loop" milestone is the 7.9 stop only, the slowest that never lands, so
// the reveal's 7.9 numbers are always ones the learner saw. Header moved below the planet, clear of "1 min".
// v6 (FC pass 26, W-248): the reveal says "your {fastest landing} and 7.9 km/s throws both fell 17.6 km" only when
// the fastest landing has a first-minute record with the same fall; a slider jump to 0.79 or 4.0 km/s (which land
// before one minute) now reads "your 7.9 km/s throw fell 17.6 km".

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import { FLIGHTS, R_E, V_CIRC_SURFACE, lineHeight } from "./model";
import s from "./styles.module.css";

const W = 320;
const H = 276;
const CX = 160;
const CY = 140;
const RP = 108; // planet radius, px
const EXAG = 40;
const hPx = (hm: number) => (hm / R_E) * RP * EXAG;
const pt = (ang: number, hm: number) => {
  const r = RP + hPx(hm);
  return [CX + r * Math.sin(ang), CY - r * Math.cos(ang)] as const;
};
const km = (m: number) => Math.round(m / 1000).toLocaleString("en-US");
const kms = (v: number) => `${(v / 1000).toFixed(v < 1000 || v % 100 !== 0 ? 2 : 1)} km/s`;
const km1 = (m: number) => (m / 1000).toFixed(1);
/** The straight sideways line from the peak, drawn out to 900 km. */
const LINE_D = Array.from({ length: 31 }, (_, i) => {
  const ang = Math.atan(((i / 30) * 900_000) / (R_E + 10_000));
  const [x, y] = pt(ang, lineHeight(ang));
  return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
}).join(" ");
const LOOP = FLIGHTS.findIndex((f) => !f.lands); // 7.9 km/s, the slowest stop that never lands
const DEFAULT = LOOP - 2;

export default function ThrowItFastEnough({ slug }: { slug: string }) {
  const [k, setK] = useState(DEFAULT);
  const [tried, setTried] = useState<number[]>([]); // landing throws the learner moved to, kept as faint arcs
  const f = FLIGHTS[k];
  const near = FLIGHTS[tried.length ? Math.max(...tried) : DEFAULT];
  const loop = FLIGHTS[LOOP];
  const fastest = tried.length ? FLIGHTS[Math.max(...tried)] : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "From a peak with no air around it, you throw a ball sideways. What is the slowest throw that never lands? (Earth radius 6371 km)",
        options: ["About 790 m/s", "About 7.9 km/s", "About 79 km/s"],
        answer: 1,
      }}
      exploreHint="Throw slower, then faster, step by step. Compare the fall and the ground under the arc."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At <strong>{kms(loop.v)}</strong> your ball never landed: the readout showed it back round at the peak after{" "}
            {Math.round(loop.time / 60)} minutes. Your fastest landing, at {kms(near.v)}, came down {km(near.dist)} km
            away (the line under the readout).
          </p>
          <p>
            The ball was falling the whole time: in the first minute{" "}
            {near.minute && km1(near.minute.fell) === km1(loop.minute!.fell)
              ? `your ${kms(near.v)} and ${kms(loop.v)} throws both fell`
              : `your ${kms(loop.v)} throw fell`}{" "}
            {km1(loop.minute!.fell)} km below the dashed straight line. What changed was the ground.{" "}
            {near.minute
              ? `Under your ${kms(near.v)} throw it curved away ${km1(near.minute.groundAway)} km; under`
              : "Under"}{" "}
            {kms(loop.v)} it curved away {km1(loop.minute!.groundAway)} km, as fast as the ball fell. That is an orbit: about √(gR) = {kms(V_CIRC_SURFACE)} near the ground.
          </p>
          <p className="muted">No air, round non-spinning Earth. The ISS orbits at about 7.7 km/s, 400 km up.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["landed", "loop"]}>
          {(reach) => {
            const d = f.pts.map(([a, h], i) => `${i ? "L" : "M"}${pt(a, h)[0].toFixed(1)},${pt(a, h)[1].toFixed(1)}`).join(" ");
            const end = f.pts[f.pts.length - 1];
            const [ex, ey] = pt(end[0], end[1]);
            const [mx, my] = pt(0, 10_000);
            const m = f.minute;
            const tick = m && !f.escapes ? [pt(m.ang, lineHeight(m.ang)), pt(m.ang, m.h)] : null;
            const go = (v: number) => {
              if (locked || v < 0 || v > FLIGHTS.length - 1) return;
              setK(v);
              if (FLIGHTS[v].lands) {
                setTried((tr) => (tr.includes(v) ? tr : [...tr, v]));
                reach("landed");
              } else if (v === LOOP) {
                reach("loop");
              }
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={locked ? "Planet with a mountain peak" : f.lands ? `Ball lands ${km(f.dist)} km away` : f.escapes ? "Ball flies off into space" : "Ball circles the planet"}>
                  <circle cx={CX} cy={CY} r={RP} className={s.planet} />
                  <polygon points={`${CX - 7},${CY - RP + 1} ${mx},${my - 1} ${CX + 7},${CY - RP + 1}`} className={s.peak} />
                  {!locked && (
                    <>
                      {tried
                        .filter((i) => i !== k)
                        .map((i) => {
                          const g = FLIGHTS[i];
                          const gd = g.pts.map(([a, h], j) => `${j ? "L" : "M"}${pt(a, h)[0].toFixed(1)},${pt(a, h)[1].toFixed(1)}`).join(" ");
                          const ge = g.pts[g.pts.length - 1];
                          const [gx, gy] = pt(ge[0], ge[1]);
                          return (
                            <g key={i}>
                              <path d={gd} className={s.ghost} />
                              <circle cx={gx} cy={gy} r={2.5} className={s.ghostDot} />
                            </g>
                          );
                        })}
                      <path d={LINE_D} className={s.line} />
                      <path d={d} className={f.lands ? s.arc : s.orbit} />
                      {tick && (
                        <>
                          <line x1={tick[0][0]} y1={tick[0][1]} x2={tick[1][0]} y2={tick[1][1]} className={s.fall} />
                          <text x={tick[0][0] + 4} y={tick[0][1] - 3} className={s.chip}>
                            1 min
                          </text>
                        </>
                      )}
                      {f.lands ? (
                        <circle cx={ex} cy={ey} r={4} className={s.land} />
                      ) : f.escapes ? null : (
                        <circle cx={mx} cy={my - 4} r={4} className={s.ball} />
                      )}
                    </>
                  )}
                  <text x={6} y={H - 6} className={s.chip}>
                    No air. 10 km peak. Heights ×40.
                  </text>
                </svg>

                <div className={s.speedRow}>
                  <Control className={s.step} disabled={locked || k === 0} onClick={() => go(k - 1)}>
                    Slower
                  </Control>
                  <Slider
                    label="Throw speed"
                    value={k}
                    min={0}
                    max={FLIGHTS.length - 1}
                    step={1}
                    disabled={locked}
                    format={(v) => (locked ? "?" : kms(FLIGHTS[v].v))}
                    onChange={go}
                  />
                  <Control className={s.step} disabled={locked || k === FLIGHTS.length - 1} onClick={() => go(k + 1)}>
                    Faster
                  </Control>
                </div>
                <p className={s.caption} aria-live="polite">
                  {locked
                    ? "\u00a0"
                    : f.escapes
                      ? "Too fast to stay: it flies off into space."
                      : m
                        ? `First minute: fell ${km1(m.fell)} km below the dashed line; the ground curved away ${km1(m.groundAway)} km.`
                        : "Landed within the first minute."}
                </p>
                <Readout
                  label="Lands"
                  value={
                    locked
                      ? "?"
                      : f.lands
                        ? `${km(f.dist)} km away`
                        : f.escapes
                          ? "never: escapes"
                          : `never: back round in ${Math.round(f.time / 60)} min`
                  }
                />
                <p className={s.caption} data-testid="fastest-landing">
                  {fastest
                    ? `Your fastest landing, ${kms(fastest.v)}: ${km(fastest.dist)} km away${
                        fastest.minute ? `; ground curved away ${km1(fastest.minute.groundAway)} km in 1 min` : ""
                      }.`
                    : "\u00a0"}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
