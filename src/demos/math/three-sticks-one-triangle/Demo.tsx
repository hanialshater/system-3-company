"use client";

// Three sticks, one triangle? The long stick is the base; the two short sticks are hinged at its ends.
// "Lay them flat" and "Raise them" tilt the 2 cm and 3 cm sticks of the 2, 3, 6 set (both to 0° or 60°;
// they start at 45°); the gap between their free ends is computed live from the angles.
// "Sticks 3, 4, 6" swaps the set: the sticks swing to the angles where they meet and the triangle fills.
// "Sticks 2, 4, 6": they meet only lying flat, so the readout says "height 0".
// Milestones: 2, 3, 6 seen flat with its 1 cm gap; 3, 4, 6 closed. Each tried chip keeps a trace
// (✓ and its gap), so Reset cannot erase what the reveal quotes.
// Brief: company/domains/briefs/math.geometry.md, Wave J, brief 3 (check G3).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const BASE = 6; // cm
const DEG = Math.PI / 180;
const MILESTONES = ["flatGap", "closed"] as const;

type SetKey = "236" | "346" | "246";
type Pose = "start" | "flat" | "raise";
type State = { set: SetKey; pose: Pose };
const START: State = { set: "236", pose: "start" };
const SETS: Record<SetKey, [number, number]> = { "236": [2, 3], "346": [3, 4], "246": [2, 4] };
const POSE_DEG: Record<Pose, number> = { start: 45, flat: 0, raise: 60 };

/** The two short sticks' angles (left, right) above the base, in radians. */
function angles(st: State): [number, number] {
  const [a, b] = SETS[st.set];
  if (st.set === "236") return [POSE_DEG[st.pose] * DEG, POSE_DEG[st.pose] * DEG];
  // 3, 4, 6 and 2, 4, 6: the angles at which the free ends meet (law of cosines; 2, 4, 6 meets at 0°).
  const x = (BASE * BASE + a * a - b * b) / (2 * BASE);
  const y = Math.sqrt(Math.max(0, a * a - x * x));
  return [Math.atan2(y, x), Math.atan2(y, BASE - x)];
}

/** Free ends (cm, y up) and the gap between them. */
function geometry(st: State) {
  const [a, b] = SETS[st.set];
  const [ta, tb] = angles(st);
  const L = [a * Math.cos(ta), a * Math.sin(ta)];
  const R = [BASE - b * Math.cos(tb), b * Math.sin(tb)];
  const gap = Math.hypot(R[0] - L[0], R[1] - L[1]);
  return { a, b, ta, tb, L, R, gap: gap < 1e-9 ? 0 : gap, height: Math.max(L[1], R[1]) };
}
const f1 = (v: number) => v.toFixed(1);

const W = 340;
const H = 200;
const PX = 50; // px per cm: the 6 cm base is 300 px wide
const X0 = 20;
const Y0 = 172; // base line
const sx = (x: number) => X0 + x * PX;
const sy = (y: number) => Y0 - y * PX;

type Seen = { flat: number | null; raise: number | null; closed: boolean; flatOnly: boolean };

export default function ThreeSticksOneTriangle({ slug }: { slug: string }) {
  const [state, setState] = useState<State>(START);
  const seen = useRef<Seen>({ flat: null, raise: null, closed: false, flatOnly: false });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You have three sticks, 2 cm, 3 cm and 6 cm long. You join them end to end, tilting them any way you like. Can they make a triangle?",
        options: ["Yes, tilted the right way", "Only lying flat", "No, never"],
        answer: 2,
      }}
      exploreHint="Lay the short sticks flat, raise them, then try the other two sets."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const sn = seen.current;
        const gap = f1(sn.flat ?? 1);
        return (
          <>
            <p>
              Even lying flat along the 6 cm stick, the 2 and 3 cm sticks reached only 5 cm and left a {gap} cm gap
              {sn.raise !== null ? `; raising them only widened it, to ${f1(sn.raise)} cm` : ""}.
            </p>
            <p>
              The two shorter sides must add to more than the longest. 3 + 4 = 7 beats 6, and that set closed
              {sn.flatOnly ? "; 2 + 4 = 6 met only lying flat" : ""}. A straight line is the shortest way between two
              points, so the detour must be longer.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} state={state} setState={setState} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  state,
  setState,
  seen,
}: StageContext & { state: State; setState: (v: State) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const g = geometry(state);
  const meets = g.gap === 0;
  const flatMeet = meets && g.height < 1e-9;

  const go = (next: State) => {
    setState(next);
    const ng = geometry(next);
    if (next.set === "236" && next.pose === "flat") {
      if (seen.flat === null) seen.flat = ng.gap;
      reach("flatGap");
    } else if (next.set === "236" && next.pose === "raise") {
      if (seen.raise === null) seen.raise = ng.gap;
    } else if (next.set === "346") {
      seen.closed = true;
      reach("closed");
    } else if (next.set === "246") {
      seen.flatOnly = true;
    }
  };

  const readout = flatMeet ? "height 0" : `gap ${f1(g.gap)} cm`;
  const lx = sx(g.L[0]);
  const ly = sy(g.L[1]);
  const rx = sx(g.R[0]);
  const ry = sy(g.R[1]);
  const lift = (t: number) => (t < 1e-9 ? 0 : 1); // flat sticks lie on the base: put their labels above it

  const chips: { label: string; next: State; on: boolean; trace: string | null }[] = [
    { label: "Lay them flat", next: { set: "236", pose: "flat" }, on: state.set === "236" && state.pose === "flat", trace: seen.flat !== null ? `✓ ${f1(seen.flat)} cm` : null },
    { label: "Raise them", next: { set: "236", pose: "raise" }, on: state.set === "236" && state.pose === "raise", trace: seen.raise !== null ? `✓ ${f1(seen.raise)} cm` : null },
    { label: "Sticks 3, 4, 6", next: { set: "346", pose: "start" }, on: state.set === "346", trace: seen.closed ? "✓ △" : null },
    { label: "Sticks 2, 4, 6", next: { set: "246", pose: "start" }, on: state.set === "246", trace: seen.flatOnly ? "✓ height 0" : null },
  ];

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Sticks ${g.a}, ${g.b} and 6 cm: ${readout}`}>
        {meets && !flatMeet && (
          <polygon points={`${sx(0)},${Y0} ${sx(BASE)},${Y0} ${lx},${ly}`} className={s.fill} />
        )}
        {/* the long stick: the base */}
        <line x1={sx(0)} y1={Y0} x2={sx(BASE)} y2={Y0} className={s.base} />
        <text x={sx(BASE / 2)} y={Y0 + 20} textAnchor="middle" className={s.label}>
          6 cm
        </text>
        {/* the two short sticks, hinged at the base's ends */}
        <line x1={sx(0)} y1={Y0} x2={lx} y2={ly} className={s.stickA} />
        <line x1={sx(BASE)} y1={Y0} x2={rx} y2={ry} className={s.stickB} />
        <text
          x={(sx(0) + lx) / 2 - 10 * Math.sin(g.ta) * 1}
          y={(Y0 + ly) / 2 - 8 - 6 * lift(g.ta)}
          textAnchor={g.ta < 1e-9 ? "middle" : "end"}
          className={s.label}
        >
          {g.a} cm
        </text>
        <text
          x={(sx(BASE) + rx) / 2 + 10 * Math.sin(g.tb)}
          y={(Y0 + ry) / 2 - 8 - 6 * lift(g.tb)}
          textAnchor={g.tb < 1e-9 ? "middle" : "start"}
          className={s.label}
        >
          {g.b} cm
        </text>
        <circle cx={sx(0)} cy={Y0} r={4} className={s.hinge} />
        <circle cx={sx(BASE)} cy={Y0} r={4} className={s.hinge} />
        {/* the gap between the free ends */}
        {!meets && <line x1={lx} y1={ly} x2={rx} y2={ry} className={s.gap} />}
        <circle cx={lx} cy={ly} r={3.5} className={meets ? s.endMet : s.end} />
        <circle cx={rx} cy={ry} r={3.5} className={meets ? s.endMet : s.end} />
        <text x={W / 2} y={18} textAnchor="middle" className={s.readout}>
          {readout}
        </text>
      </svg>

      <Row>
        {chips.map((c) => (
          <Control
            key={c.label}
            disabled={locked || c.on}
            className={`${s.tap} ${c.on ? "active" : ""}`}
            aria-pressed={c.on}
            onClick={() => go(c.next)}
          >
            <span>{c.label}</span>
            {c.trace && <span className={s.trace}>{c.trace}</span>}
          </Control>
        ))}
        <Control
          disabled={locked || (state.set === START.set && state.pose === START.pose)}
          className={s.tap}
          onClick={() => setState(START)}
        >
          Reset
        </Control>
      </Row>
    </div>
  );
}
