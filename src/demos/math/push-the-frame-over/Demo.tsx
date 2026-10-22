"use client";

// Push the frame over. A hinged frame with sides 4 and 3 stands on its 4-long base. "Lean to 60°" and
// "Lean to 30°" tilt the 3-long sides; the sides and the perimeter (14) never change, but the vertical
// height (3 sin θ, drawn dashed and labelled "h") and the area (4 × 3 sin θ) fall. "Cut and slide"
// cuts the right triangle under the left slanted side off the frame's inside and slides it 4 to the
// right, so the inside becomes a rectangle 4 wide and h tall; pressing it again puts it back.
// Milestones: a lean (area below 12); cut and slide shown while leaning (its angle, height and area are
// recorded and kept as a trace on the chip, so Reset cannot erase what the reveal quotes).
// Brief: company/domains/briefs/math.geometry.md, Wave J, brief 2 (check G2).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const BASE = 4;
const SIDE = 3;
const DEG = Math.PI / 180;
const MILESTONES = ["leaned", "cutWhileLeaning"] as const;

type Angle = 90 | 60 | 30;
type State = { angle: Angle; cut: boolean };
const START: State = { angle: 90, cut: false };

/** Offset of the top edge (c), height (h), area and perimeter at angle θ. */
function frame(angle: Angle) {
  const t = angle * DEG;
  const c = angle === 90 ? 0 : SIDE * Math.cos(t);
  const h = SIDE * Math.sin(t);
  return { c, h, area: BASE * h, perimeter: 2 * (BASE + SIDE) };
}
const f2 = (v: number) => v.toFixed(2);
const f1 = (v: number) => v.toFixed(1);

const W = 340;
const H = 200;
const PX = 46; // px per unit: the widest shape (4 + 3 cos 30° ≈ 6.6 units) is 304 px
const X0 = 18;
const Y0 = 180; // base line
const sx = (x: number) => X0 + x * PX;
const sy = (y: number) => Y0 - y * PX;
const pts = (p: [number, number][]) => p.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ");

type Seen = { leanArea: number | null; cut: { angle: Angle; h: number; area: number } | null };

export default function PushTheFrameOver({ slug }: { slug: string }) {
  const [state, setState] = useState<State>(START);
  const seen = useRef<Seen>({ leanArea: null, cut: null });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You push a 4 by 3 rectangular frame with hinged corners so that it leans over. Its sides keep their lengths. What happens to the area inside it?",
        options: ["It stays the same", "It shrinks", "It grows"],
        answer: 1,
      }}
      exploreHint="Lean the frame, then cut off the slanted end and slide it across."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const cut = seen.current.cut ?? { h: frame(30).h, area: frame(30).area };
        const h = f2(cut.h);
        return (
          <>
            <p>
              Leaning kept every side and the perimeter at 14, but the height fell to {h} and the area to {f1(cut.area)}.
              Cutting off the slanted end and sliding it across made a rectangle 4 wide and only {h} tall.
            </p>
            <p>
              A parallelogram&apos;s area is base times height, not base times slanted side. Push the frame flat and its
              area goes to nothing while its sides stay the same.
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
  const g = frame(state.angle);
  const leaning = state.angle !== 90;
  const showCut = leaning && state.cut;

  const go = (next: State) => {
    setState(next);
    const ng = frame(next.angle);
    if (next.angle !== 90) {
      if (seen.leanArea === null) seen.leanArea = ng.area;
      reach("leaned");
      if (next.cut) {
        if (seen.cut === null) seen.cut = { angle: next.angle, h: ng.h, area: ng.area };
        reach("cutWhileLeaning");
      }
    }
  };

  // Corners: bottom-left (0,0), bottom-right (4,0), top-right (4+c,h), top-left (c,h).
  const para: [number, number][] = [[0, 0], [BASE, 0], [BASE + g.c, g.h], [g.c, g.h]];
  const triFrom: [number, number][] = [[0, 0], [g.c, 0], [g.c, g.h]];
  const triTo: [number, number][] = [[BASE, 0], [BASE + g.c, 0], [BASE + g.c, g.h]];
  const rect: [number, number][] = [[g.c, 0], [BASE, 0], [BASE, g.h], [g.c, g.h]];

  const line1 = `sides 4 and 3 · perimeter ${g.perimeter}`;
  const line2 = `height ${f2(g.h)} · area ${f1(g.area)}`;

  const chips: { label: string; next: State; on: boolean; trace: string | null; disabled?: boolean }[] = [
    { label: "Lean to 60°", next: { angle: 60, cut: state.cut }, on: state.angle === 60, trace: null },
    { label: "Lean to 30°", next: { angle: 30, cut: state.cut }, on: state.angle === 30, trace: null },
    {
      label: "Cut and slide",
      next: { angle: state.angle, cut: !state.cut },
      on: false,
      disabled: !leaning,
      trace: seen.cut ? `✓ 4 × ${f2(seen.cut.h)} = ${f1(seen.cut.area)}` : null,
    },
    { label: "Upright", next: { angle: 90, cut: false }, on: state.angle === 90, trace: null },
  ];

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`Frame at ${state.angle}°${showCut ? ", cut and slid into a rectangle" : ""}: ${line1}, ${line2}`}
      >
        <text x={8} y={16} className={s.readout}>
          {line1}
        </text>
        <text x={8} y={34} className={s.readout}>
          {line2}
        </text>

        {/* the frame's inside */}
        {showCut ? (
          <>
            <polygon points={pts(rect)} className={s.fill} />
            <polygon points={pts(triFrom)} className={s.ghost} />
            <polygon points={pts(triTo)} className={s.moved} />
          </>
        ) : (
          <polygon points={pts(para)} className={s.fill} />
        )}

        {/* the frame: four hinged sides */}
        <polygon points={pts(para)} className={s.frame} />
        {para.map(([x, y], i) => (
          <circle key={i} cx={sx(x)} cy={sy(y)} r={4} className={s.hinge} />
        ))}

        {/* the vertical height, dashed */}
        <line x1={sx(g.c)} y1={sy(0)} x2={sx(g.c)} y2={sy(g.h)} className={s.height} />
        <text x={sx(g.c) + 6} y={sy(g.h / 2) + 4} className={s.hlabel}>
          h
        </text>

        <text x={sx(BASE / 2)} y={Y0 + 16} textAnchor="middle" className={s.label}>
          4
        </text>
        <text x={sx(g.c / 2) - 7} y={sy(g.h / 2) + 4} textAnchor="end" className={s.label}>
          3
        </text>
      </svg>

      <Row>
        {chips.map((c) => (
          <Control
            key={c.label}
            disabled={locked || c.on || !!c.disabled}
            className={`${s.tap} ${c.on ? "active" : ""}`}
            aria-pressed={c.label === "Cut and slide" ? showCut : c.on}
            onClick={() => go(c.next)}
          >
            <span>{c.label}</span>
            {c.trace && <span className={s.trace}>{c.trace}</span>}
          </Control>
        ))}
        <Control
          disabled={locked || (state.angle === START.angle && state.cut === START.cut)}
          className={s.tap}
          onClick={() => setState(START)}
        >
          Reset
        </Control>
      </Row>
    </div>
  );
}
