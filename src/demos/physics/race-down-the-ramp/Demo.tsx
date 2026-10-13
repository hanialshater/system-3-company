"use client";

// Rolling race. Rolling without slipping on a 30 deg ramp: a = g sin(30) / (1 + k),
// k = I / (m r^2) = 1/2 (solid disc) or 1 (thin hoop); mass cancels. Down 2 m from rest:
// x = a t^2 / 2, so the disc takes 1.11 s and the hoop 1.28 s. Two lanes, side view; the race
// plays at a third of real speed (the clock shows real time, marked slow-mo).
//
// Controls in DOM order: hoop mass toggle (1 kg / 2 kg; resets the race), Release, Jump to
// finish (step button). Earned reveal: milestones "mass" (hoop mass changed) and "finished"
// (both reached the bottom). QA path: mass -> 2 kg, Release, Jump to finish.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const ANGLE = 30;
const LEN = 2; // m
const SIN = Math.sin((ANGLE * Math.PI) / 180);
const COS = Math.cos((ANGLE * Math.PI) / 180);
const SHAPES = [
  { name: "Disc", k: 0.5 },
  { name: "Hoop", k: 1 },
];
const accel = (k: number) => (G * SIN) / (1 + k);
const finish = (k: number) => Math.sqrt((2 * LEN) / accel(k));
const T_DISC = finish(SHAPES[0].k);
const T_HOOP = finish(SHAPES[1].k);
const SLOW = 1 / 3;

const W = 320;
const H = 176;
const K = 105; // px per m along the ramp
const R = 10; // px, drawn radius
const LANES = [
  { x0: 66, y0: 26 },
  { x0: 66, y0: 62 },
];

export default function RaceDownTheRamp({ slug }: { slug: string }) {
  const [hoopKg, setHoopKg] = useState(1);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const [raced, setRaced] = useState<number[]>([]);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["mass", "finished"]);
  const reachRef = useRef(reach);
  reachRef.current = reach;
  const kgRef = useRef(hoopKg);
  kgRef.current = hoopKg;

  const done = (kg: number) => {
    setRaced((xs) => (xs.includes(kg) ? xs : [...xs, kg]));
    reachRef.current("finished");
  };
  const doneRef = useRef(done);
  doneRef.current = done;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const tt = Math.min(T_HOOP, (SLOW * (now - start)) / 1000);
      setT(tt);
      if (tt >= T_HOOP) {
        setRunning(false);
        doneRef.current(kgRef.current);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const finished = !running && t >= T_HOOP;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A solid disc and a thin hoop, same mass and same radius, roll from rest down the same 30° ramp. Which reaches the bottom first?",
        options: ["The solid disc", "The thin hoop", "They tie"],
        answer: 0,
      }}
      exploreHint="Change the hoop's mass, then race them. Jump to the finish if you like."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The disc reached the bottom in <strong>{T_DISC.toFixed(2)} s</strong>, the hoop in{" "}
            <strong>{T_HOOP.toFixed(2)} s</strong>
            {raced.length > 1 ? `, whether the hoop was ${[...raced].sort().join(" kg or ")} kg` : raced.length ? `, with the hoop at ${raced[0]} kg` : ""}.
          </p>
          <p>
            Rolling shares the energy between moving along and spinning. The hoop has all its mass at the rim, so half its
            energy goes into spin; the disc, with mass near the middle, needs only a third. Shape decides, not mass: a heavier
            hoop is pulled harder but is just as hard to spin up.
          </p>
          <p className="muted">No slipping, no air drag.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const toggleMass = () => {
          if (locked || running) return;
          setHoopKg((m) => (m === 1 ? 2 : 1));
          setT(0);
          reach("mass");
        };
        const release = () => {
          if (locked || running) return;
          setT(0);
          setRunning(true);
        };
        const jump = () => {
          if (locked || finished) return;
          setRunning(false);
          setT(T_HOOP);
          done(hoopKg);
        };
        const caption = locked
          ? "No slipping, no air drag. Same radius; the disc is 1 kg."
          : finished
            ? `Disc ${T_DISC.toFixed(2)} s, hoop ${T_HOOP.toFixed(2)} s (hoop ${hoopKg} kg).`
            : running
              ? "Racing (slow-mo)…"
              : `Hoop is ${hoopKg} kg, disc 1 kg. Release them together.`;

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label="Two lanes on a 30 degree ramp, a disc and a hoop">
              {SHAPES.map((sh, i) => {
                const lane = LANES[i];
                const x1 = lane.x0 + LEN * K * COS;
                const y1 = lane.y0 + LEN * K * SIN;
                const tt = Math.min(t, finish(sh.k));
                const dist = Math.min(LEN, 0.5 * accel(sh.k) * tt * tt);
                const cx = lane.x0 + dist * K * COS + R * SIN;
                const cy = lane.y0 + dist * K * SIN - R * COS;
                const rot = ((dist * K) / R) * (180 / Math.PI);
                const arrived = t >= finish(sh.k) - 1e-9 && t > 0;
                return (
                  <g key={sh.name}>
                    <line x1={lane.x0} y1={lane.y0} x2={x1} y2={y1} className={s.ramp} />
                    <line x1={x1 - 4 * SIN} y1={y1 - 18} x2={x1} y2={y1 + 4} className={s.finish} />
                    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
                      {sh.k === 1 ? (
                        <circle r={R - 1.5} className={s.hoop} />
                      ) : (
                        <circle r={R} className={s.disc} />
                      )}
                      <line x1={0} y1={0} x2={R - 2} y2={0} className={s.spoke} />
                    </g>
                    <text x={4} y={lane.y0 + 3} className={s.label}>
                      {sh.name} {sh.k === 1 ? `${hoopKg} kg` : "1 kg"}
                    </text>
                    {arrived && !locked && (
                      <text x={x1 + 16} y={y1 - 4} className={s.time}>
                        {finish(sh.k).toFixed(2)} s
                      </text>
                    )}
                  </g>
                );
              })}
              <text x={W - 4} y={14} textAnchor="end" className={s.clock}>
                {locked ? "" : `t = ${t.toFixed(2)} s${running ? " (slow-mo)" : ""}`}
              </text>
              <text x={4} y={14} className={s.chip}>
                30° ramp, 2 m long
              </text>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              <Control disabled={locked || running} onClick={toggleMass}>
                Make hoop {hoopKg === 1 ? 2 : 1} kg
              </Control>
              <Control disabled={locked || running} onClick={release}>
                {finished ? "Race again" : "Release"}
              </Control>
              <Control disabled={locked || finished} onClick={jump}>
                Jump to finish
              </Control>
            </Row>
            <Row>
              <Readout label="Disc time" value={finished || (t >= T_DISC && t > 0) ? `${T_DISC.toFixed(2)} s` : "?"} />
              <Readout label="Hoop time" value={finished ? `${T_HOOP.toFixed(2)} s` : "?"} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
