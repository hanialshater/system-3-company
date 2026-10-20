"use client";

// Skydiver speed limit. A skydiver falls from rest; air pushes back with quadratic
// drag F = 1/2 rho C_d A v^2. Speed climbs fast at first, then levels off where drag
// equals weight: v_t = sqrt(2 m g / (rho C_d A)) = 43.2 m/s belly-down
// (80 kg, C_d A = 0.7 m^2) and 66.0 m/s head-down (C_d A = 0.3 m^2).
//
// Integrated with RK4 at 0.01 s. Constant air density 1.2 kg/m^3 (sea level; real
// jumps start in thinner air, so early speeds run a little higher). C_d A values are
// typical estimates, labelled as such. The reveal unlocks once the speed is within 3%
// of its limit on the graph.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useMemo, useRef, useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const RHO = 1.2;
const CDA = { belly: 0.7, head: 0.3 } as const;
type Pose = keyof typeof CDA;
const T_MAX = 40;
const DT = 0.01;

const vTerm = (m: number, pose: Pose) => Math.sqrt((2 * m * G) / (RHO * CDA[pose]));

/** Speed samples every DT from rest. */
function curve(m: number, pose: Pose): number[] {
  const k = (0.5 * RHO * CDA[pose]) / m;
  const f = (v: number) => G - k * v * v;
  const out = [0];
  let v = 0;
  for (let i = 0; i < T_MAX / DT; i++) {
    const k1 = f(v), k2 = f(v + (k1 * DT) / 2), k3 = f(v + (k2 * DT) / 2), k4 = f(v + k3 * DT);
    v += (DT / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    out.push(v);
  }
  return out;
}
const at = (c: number[], t: number) => c[Math.round(t / DT)];

const W = 320;
const H = 190;
const GX0 = 34;
const GX1 = 236;
const GY0 = 166; // v = 0
const GY1 = 14; // v = V_MAX
const V_MAX = 80;
const xOf = (t: number) => GX0 + (t / T_MAX) * (GX1 - GX0);
const yOf = (v: number) => GY0 - (v / V_MAX) * (GY0 - GY1);

function pathOf(c: number[], tEnd: number) {
  let d = "";
  for (let t = 0; t <= tEnd + 1e-9; t += 0.25) d += `${d ? "L" : "M"} ${xOf(t).toFixed(1)} ${yOf(at(c, t)).toFixed(1)} `;
  return d;
}

export default function SkydiverSpeedLimit({ slug }: { slug: string }) {
  const [t, setT] = useState(0);
  const [pose, setPose] = useState<Pose>("belly");
  const mass = 80;
  const [ghost, setGhost] = useState<{ pose: Pose; mass: number } | null>(null);
  const [sawHead, setSawHead] = useState(false);
  const [seen, setSeen] = useState<{ pose: Pose; mass: number; v: number; t: number } | null>(null);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["levelled"]);

  const c = useMemo(() => curve(mass, pose), [mass, pose]);
  const gc = useMemo(() => (ghost ? curve(ghost.mass, ghost.pose) : null), [ghost]);
  const v = at(c, t);
  const vt = vTerm(mass, pose);
  const levelled = v >= 0.97 * vt;

  const check = (tt: number, pp: Pose, mm: number) => {
    const vv = at(curve(mm, pp), tt);
    if (vv >= 0.97 * vTerm(mm, pp)) {
      if (!seen) setSeen({ pose: pp, mass: mm, v: vv, t: tt });
      if (pp === "head") setSawHead(true);
      reach("levelled");
    }
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On your first skydive, you jump from the plane and fall belly-down (80 kg, drag area about 0.7 m²). After a long fall, what does your speed do?",
        options: ["keeps climbing without limit", "levels off near 43 m/s (155 km/h)", "levels off near 150 m/s (540 km/h)"],
        answer: 1,
      }}
      exploreHint="Move time forward and watch the speed and the two forces. Then switch pose."
      minInteractions={1}
      reveal={() => {
        const sv = seen ?? { pose: "belly" as Pose, mass: 80, v: at(curve(80, "belly"), 10), t: 10 };
        return (
          <>
            <p>
              At {sv.t} s you saw her at <strong>{sv.v.toFixed(1)} m/s</strong>, close to her limit of{" "}
              {vTerm(sv.mass, sv.pose).toFixed(1)} m/s ({sv.pose === "belly" ? "belly-down" : "head-down"}). In this model, belly-down
              at 80 kg, the limit is {vTerm(80, "belly").toFixed(1)} m/s, about {Math.round(vTerm(80, "belly") * 3.6)} km/h.
            </p>
            <p>
              Air pushes back harder the faster she goes: twice the speed, four times the push. Once that push equals her
              weight, the forces cancel and her speed stops growing.{" "}
              {sawHead
                ? `Head-down she meets less air, so the limit is higher: ${vTerm(80, "head").toFixed(0)} m/s.`
                : "Try the pose button: head-down she meets less air, so the limit is higher."}
            </p>
            <p className="muted">Model: steady sea-level air, typical drag areas.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : t === 0
            ? "Jump: speed 0. Model with sea-level air."
            : levelled
              ? "Drag now matches weight: speed has levelled off."
              : "Speed still climbing; drag growing.";
        const weight = mass * G;
        const drag = 0.5 * RHO * CDA[pose] * v * v;
        const FK = 36 / 800; // px per N
        const ax = 284;
        const ay = 92;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Speed ${v.toFixed(1)} metres per second after ${t} seconds`}>
              {[0, 20, 40, 60, 80].map((vv) => (
                <g key={vv}>
                  <line x1={GX0} y1={yOf(vv)} x2={GX1} y2={yOf(vv)} className={s.grid} />
                  <text x={GX0 - 4} y={yOf(vv) + 3} textAnchor="end" className={s.small}>
                    {vv}
                  </text>
                </g>
              ))}
              {[0, 10, 20, 30, 40].map((tt) => (
                <text key={tt} x={xOf(tt)} y={GY0 + 12} textAnchor="middle" className={s.small}>
                  {tt} s
                </text>
              ))}
              <text x={GX0 + 4} y={GY1 - 4} className={s.small}>
                m/s
              </text>
              {gc && <path d={pathOf(gc, t)} className={s.ghost} />}
              {gc && (
                <text x={GX1 - 4} y={GY1 + 8} textAnchor="end" className={s.small}>
                  dashed: previous pose
                </text>
              )}
              {levelled && <line x1={GX0} y1={yOf(vt)} x2={GX1} y2={yOf(vt)} className={s.limit} />}
              <path d={pathOf(c, t)} className={s.curve} />
              <circle cx={xOf(t)} cy={yOf(v)} r={4} className={s.dot} />

              {/* forces on her */}
              <text x={ax} y={14} textAnchor="middle" className={s.small}>
                forces
              </text>
              <ellipse cx={ax} cy={ay} rx={pose === "belly" ? 14 : 5} ry={pose === "belly" ? 5 : 13} className={s.body} />
              <line x1={ax} y1={ay + 8} x2={ax} y2={ay + 8 + weight * FK} className={s.weight} markerEnd="url(#skyArrowW)" />
              {drag > 1 && (
                <line x1={ax} y1={ay - 8} x2={ax} y2={ay - 8 - drag * FK} className={s.drag} markerEnd="url(#skyArrowD)" />
              )}
              <text x={ax + 8} y={ay + 8 + weight * FK} className={s.small}>
                weight
              </text>
              <text x={ax + 8} y={ay - 12} className={s.small}>
                drag
              </text>
              <defs>
                <marker id="skyArrowW" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" className={s.headW} />
                </marker>
                <marker id="skyArrowD" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" className={s.headD} />
                </marker>
              </defs>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Time after jump"
              value={t}
              min={0}
              max={T_MAX}
              step={5}
              disabled={locked}
              format={(x) => `${x} s`}
              onChange={(x) => {
                setT(x);
                check(x, pose, mass);
              }}
            />
            <Row>
              <Control
                disabled={locked}
                onClick={() => {
                  const np: Pose = pose === "belly" ? "head" : "belly";
                  setGhost({ pose, mass });
                  setPose(np);
                  check(t, np, mass);
                }}
              >
                {pose === "belly" ? "Pose: belly-down" : "Pose: head-down"}
              </Control>
              <Readout label="Speed" value={locked ? "?" : `${v.toFixed(1)} m/s`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
