"use client";

// Newton's mountain. The learner picks a sideways throw speed from a 10 km peak on a
// to-scale Earth with no air; the arc (from model.ts, integrated under 1/r^2 gravity)
// grows until it wraps the planet. Heights above the ground are exaggerated 40x so the
// arc is visible; distances around the planet are to scale. The speed number stays
// hidden until the ball closes the loop (the brief's unusual format), so the slider
// is felt, not read.
//
// Earned reveal: milestone "loop" when a throw comes all the way round without landing.

import { Lesson } from "@/kit/Lesson";
import { Readout, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import { FLIGHTS, R_E, V_CIRC_SURFACE } from "./model";
import s from "./styles.module.css";

const W = 320;
const H = 262;
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
const kms = (v: number) => `${(v / 1000).toFixed(v < 1000 ? 2 : 1)} km/s`;
const LOOP = FLIGHTS.findIndex((f) => !f.lands);
const DEFAULT = LOOP - 2;

export default function ThrowItFastEnough({ slug }: { slug: string }) {
  const [k, setK] = useState(DEFAULT);
  const [looped, setLooped] = useState(false);
  const [bestLanding, setBestLanding] = useState(DEFAULT);
  const [tried, setTried] = useState<number[]>([DEFAULT]); // landing throws seen, kept on screen as faint arcs
  const f = FLIGHTS[k];
  const near = FLIGHTS[bestLanding];
  const loop = FLIGHTS[LOOP];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "From a peak with no air around it, you throw a ball sideways. What is the slowest throw that never lands? (Earth radius 6371 km)",
        options: ["About 790 m/s", "About 7.9 km/s", "About 79 km/s"],
        answer: 1,
      }}
      exploreHint="Throw faster, step by step. Faint arcs show your earlier landings."
      reveal={() => (
        <>
          <p>
            At <strong>{kms(loop.v)}</strong> your ball never landed: it came back round to the peak after{" "}
            {Math.round(loop.time / 60)} minutes. Just a little slower, at {kms(near.v)}, it came down {km(near.dist)} km
            away.
          </p>
          <p>
            The ball was falling the whole time. But Earth&apos;s surface curves away about 5 m for every 8 km you go,
            and a dropped ball falls about 5 m in its first second. Go 8 km sideways each second (√(gR) ={" "}
            {kms(V_CIRC_SURFACE)}) and the ground drops away as fast as you fall. That is an orbit.
          </p>
          <p className="muted">No air, round non-spinning Earth. The ISS orbits at about 7.7 km/s, 400 km up.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["loop"]}>
          {(reach) => {
            const d = f.pts.map(([a, h], i) => `${i ? "L" : "M"}${pt(a, h)[0].toFixed(1)},${pt(a, h)[1].toFixed(1)}`).join(" ");
            const end = f.pts[f.pts.length - 1];
            const [ex, ey] = pt(end[0], end[1]);
            const [mx, my] = pt(0, 10_000);
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={locked ? "Planet with a mountain peak" : f.lands ? `Ball lands ${km(f.dist)} km away` : "Ball circles the planet"}>
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
                      <path d={d} className={f.lands ? s.arc : s.orbit} />
                      {f.lands ? <circle cx={ex} cy={ey} r={4} className={s.land} /> : <circle cx={mx} cy={my - 4} r={4} className={s.ball} />}
                    </>
                  )}
                  <text x={6} y={12} className={s.chip}>
                    No air. 10 km peak. Heights ×40.
                  </text>
                </svg>

                <Slider
                  label="Throw speed"
                  value={k}
                  min={0}
                  max={FLIGHTS.length - 1}
                  step={1}
                  disabled={locked}
                  format={(v) => (looped ? kms(FLIGHTS[v].v) : "?")}
                  onChange={(v) => {
                    setK(v);
                    if (FLIGHTS[v].lands) {
                      if (v > bestLanding) setBestLanding(v);
                      setTried((tr) => (tr.includes(v) ? tr : [...tr, v]));
                    } else {
                      setLooped(true);
                      // Earn the loop: at least two landing throws must have been seen first.
                      if (tried.length >= 2) reach("loop");
                    }
                  }}
                />
                <Readout label="Lands" value={locked ? "?" : f.lands ? `${km(f.dist)} km away` : "never"} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
