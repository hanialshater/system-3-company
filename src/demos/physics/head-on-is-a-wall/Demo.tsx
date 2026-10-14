"use client";

// Head-on is a wall. Car A (1,500 kg) drives at 25, 50 or 100 km/h into either an identical car
// coming the other way at the same speed, or a rigid immovable wall. Perfectly inelastic, no braking.
// Head-on: total momentum is zero, so the pair stops at the meeting point, which never moves; each
// car stops from its own speed in its own crumple zone, exactly as against a wall. The energy car A's
// crumple zone absorbs is 1/2 m v^2: 145 kJ at 50 km/h (head-on or wall), 579 kJ against a wall at
// 100 km/h (4x). Re-run in artifacts/scratch/cm-physics-r3/check.mjs and in node by demo-builder.
//
// One picture: the road (top view) with a "car A crush energy" bar above it. Every earlier crash
// leaves a dashed outline on the bar, and the three milestone crashes are written under the bar,
// so the reveal's comparison is on screen when it opens.
//
// Each target or speed chip sets the crash up and runs it at once (the brief's separate Crash button
// is folded into the chips: QA presses each control once, so a separate Crash after every chip is not
// reachable). The replay takes 400 ms of wall time.
// Earned reveal (v1): milestones "car-50" (head-on at 50), "wall-50", "wall-100".
// QA path (DOM order): Into a car (crash car 50), Into a wall (wall 50), 25 (wall 25), 50 (wall 50),
// 100 (wall 100). All three milestones.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const M = 1500; // kg
const SPEEDS = [25, 50, 100] as const;
type Speed = (typeof SPEEDS)[number];
type Target = "car" | "wall";
type Config = { target: Target; speed: Speed };
const key = (c: Config) => `${c.target}-${c.speed}`;
const energy = (kmh: number) => 0.5 * M * (kmh / 3.6) ** 2; // J, absorbed by car A's crumple zone (either target)
const kJ = (j: number) => `${(j / 1000).toFixed(0)} kJ`;
const MILESTONES = ["car-50", "wall-50", "wall-100"] as const;
const RUN_MS = 400;

const W = 320;
const H = 176;
const BAR_X = 20;
const BAR_W = 280;
const BAR_MAX = 600000; // J at full bar
const ROAD_Y = 92;
const ROAD_H = 54;
const MID = 160;
const CAR_L = 58;
const CAR_H = 22;
const CRUMPLE = 9;
const START_GAP = 96;

export default function HeadOnIsAWall({ slug }: { slug: string }) {
  const [config, setConfig] = useState<Config>({ target: "car", speed: 50 });
  const [crashed, setCrashed] = useState<string | null>(null);
  const [runs, setRuns] = useState<Record<string, number>>({});

  const seen = (k: string) => runs[k];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Car A crashes head-on into an identical car; both drive at 50 km/h. For car A, that crash is like hitting a solid wall at...",
        options: ["25 km/h", "50 km/h", "100 km/h"],
        answer: 1,
      }}
      exploreHint="Crash into a car at 50 km/h, then into a wall at 50 and at 100."
      minInteractions={3}
      reveal={() => {
        const car = seen("car-50");
        const w50 = seen("wall-50");
        const w100 = seen("wall-100");
        return (
          <>
            <p>
              Your 50 km/h head-on crash filled car A&apos;s crush bar to <strong>{car ? kJ(car) : "?"}</strong>, as high as
              the 50 km/h wall ({w50 ? kJ(w50) : "?"}). The 100 km/h wall filled it to {w100 ? kJ(w100) : "?"}, about{" "}
              {w100 && w50 ? (w100 / w50).toFixed(0) : "?"} times higher.
            </p>
            <p>
              The cars stopped at the meeting point, which never moved, so each stopped from 50 to 0 in its own crumple
              zone, as if the other were a wall. Doubling the closing speed doubles the total energy, but two cars share
              it. Crush energy grows with speed squared.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          config={config}
          setConfig={setConfig}
          crashed={crashed}
          setCrashed={setCrashed}
          runs={runs}
          setRuns={setRuns}
        />
      )}
    </Lesson>
  );
}

function Stage(p: {
  locked: boolean;
  interact: () => void;
  config: Config;
  setConfig: (c: Config) => void;
  crashed: string | null;
  setCrashed: (k: string | null) => void;
  runs: Record<string, number>;
  setRuns: (r: Record<string, number>) => void;
}) {
  const { locked, config, crashed, runs } = p;
  const { reach } = useMilestones(p.interact, MILESTONES);
  const [t, setT] = useState(0); // 0 = start positions, 1 = stopped
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const crash = (c: Config) => {
    const k = key(c);
    p.setConfig(c);
    p.setCrashed(k);
    p.setRuns({ ...runs, [k]: energy(c.speed) });
    if ((MILESTONES as readonly string[]).includes(k)) reach(k);
    cancelAnimationFrame(raf.current);
    setT(0);
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const tt = Math.min(1, (now - start) / RUN_MS);
      setT(tt);
      if (tt < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const done = crashed === key(config) && t >= 1;
  const running = crashed === key(config) && t < 1;
  // Cars close at constant speed over the replay, then stop at the meeting point (crumple drawn at the end).
  const travel = crashed === key(config) ? t : 0;
  const frontA = MID - START_GAP * (1 - travel);
  const crumple = done ? CRUMPLE : 0;
  const carY = ROAD_Y + (ROAD_H - CAR_H) / 2;
  const liveE = crashed === key(config) ? energy(config.speed) * t : 0;
  const barW = (j: number) => (j / BAR_MAX) * BAR_W;
  const chip = (c: Config) => key(c) === crashed && !running;

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`Car A at ${config.speed} km/h ${config.target === "car" ? "heading into an identical car" : "heading into a wall"}${done ? ", stopped" : ""}`}
      >
        {/* crush energy bar */}
        <text x={BAR_X} y={13} className={s.label}>
          car A crush energy{done ? `: ${kJ(energy(config.speed))}` : ""}
        </text>
        <rect x={BAR_X} y={19} width={BAR_W} height={14} className={s.barFrame} />
        {!locked && <rect x={BAR_X} y={19} width={barW(liveE)} height={14} className={s.bar} />}
        {!locked &&
          Object.entries(runs)
            .filter(([k]) => !(k === crashed))
            .map(([k, j]) => <rect key={k} x={BAR_X} y={17} width={barW(j)} height={18} className={s.trace} />)}
        {/* the three milestone crashes, written under the bar once seen */}
        {!locked &&
          MILESTONES.map((k, i) =>
            runs[k] !== undefined ? (
              <text key={k} x={BAR_X + i * 96 + (i === 2 ? 4 : 0)} y={50} className={s.seen}>
                {k.replace("-", " ")}: {kJ(runs[k])}
              </text>
            ) : null,
          )}

        {/* road */}
        <rect x={0} y={ROAD_Y} width={W} height={ROAD_H} className={s.road} />
        <line x1={0} y1={ROAD_Y + 4} x2={W} y2={ROAD_Y + 4} className={s.laneLine} />
        <line x1={0} y1={ROAD_Y + ROAD_H - 4} x2={W} y2={ROAD_Y + ROAD_H - 4} className={s.laneLine} />

        {/* meeting point / wall at the middle */}
        {config.target === "wall" ? (
          <>
            <rect x={MID} y={ROAD_Y - 6} width={12} height={ROAD_H + 12} className={s.wall} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={MID} y1={ROAD_Y - 2 + i * 11} x2={MID + 12} y2={ROAD_Y + 6 + i * 11} className={s.hatch} />
            ))}
          </>
        ) : (
          <>
            {/* car B, mirrored, same speed: its front meets car A's at MID */}
            <rect x={2 * MID - frontA} y={carY} width={CAR_L - crumple} height={CAR_H} rx={4} className={s.carB} />
            <text x={2 * MID - frontA + (CAR_L - crumple) / 2} y={carY + CAR_H / 2 + 4} textAnchor="middle" className={s.carLabel}>
              B
            </text>
            {done && (
              <>
                <line x1={MID} y1={ROAD_Y - 8} x2={MID} y2={ROAD_Y + ROAD_H + 4} className={s.mid} />
                <text x={MID} y={ROAD_Y - 11} textAnchor="middle" className={s.midLabel}>
                  meeting point
                </text>
              </>
            )}
          </>
        )}
        <rect x={frontA - CAR_L + crumple} y={carY} width={CAR_L - crumple} height={CAR_H} rx={4} className={s.carA} />
        <text x={frontA - (CAR_L - crumple) / 2} y={carY + CAR_H / 2 + 4} textAnchor="middle" className={s.carLabel}>
          A
        </text>
        <text x={8} y={ROAD_Y + ROAD_H + 18} className={s.speed}>
          {locked ? "car A 50 km/h" : done ? `car A ${config.speed} → 0 km/h` : `car A ${config.speed} km/h`}
        </text>
        <text x={W - 8} y={ROAD_Y + ROAD_H + 18} textAnchor="end" className={s.chip}>
          1,500 kg cars, rigid wall
        </text>
      </svg>

      <Row>
        {(["car", "wall"] as Target[]).map((tg) => {
          const c = { target: tg, speed: config.speed };
          return (
            <Control key={tg} className={config.target === tg ? "active" : ""} disabled={locked || chip(c)} onClick={() => crash(c)}>
              {tg === "car" ? "Into a car" : "Into a wall"}
            </Control>
          );
        })}
      </Row>
      <Row>
        {SPEEDS.map((v) => {
          const c = { target: config.target, speed: v };
          return (
            <Control key={v} className={config.speed === v ? "active" : ""} disabled={locked || chip(c)} onClick={() => crash(c)}>
              {v} km/h
            </Control>
          );
        })}
      </Row>
    </div>
  );
}
