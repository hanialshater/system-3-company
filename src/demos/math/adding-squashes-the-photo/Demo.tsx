"use client";

// Adding squashes the photo. A 4 by 6 photo anchored at its bottom-left corner, a dashed ray from
// that corner through its top-right corner. Each chip draws an enlargement over it; its corner dot
// lands on the ray (same shape) or off it (distorted, the face inside stretches).
// Milestones: an added enlargement seen off the ray; x1.5 seen on the ray at 6 by 9 (the question).
// Tried frames stay as faint outlines with their ratio, so Reset cannot erase what the reveal quotes.
// Brief: company/domains/briefs/math.algebra.md, Wave J, brief 2 (check A2).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const W0 = 4;
const H0 = 6;
const RATIO0 = H0 / W0; // 1.5
type Op = { id: string; label: string; kind: "add" | "mul"; k: number };
const OPS: Op[] = [
  { id: "add2", label: "+2 each side", kind: "add", k: 2 },
  { id: "mul15", label: "×1.5 each side", kind: "mul", k: 1.5 },
  { id: "add4", label: "+4 each side", kind: "add", k: 4 },
  { id: "mul2", label: "×2 each side", kind: "mul", k: 2 },
];
const MILESTONES = ["added-off", "times-on"] as const;

const dims = (o: Op) => (o.kind === "add" ? [W0 + o.k, H0 + o.k] : [W0 * o.k, H0 * o.k]);
const r2 = (x: number) => String(Number(x.toFixed(2)));
const onRay = (w: number, h: number) => Math.abs(h / w - RATIO0) < 1e-9;

const U = 17; // px per unit; the 8 by 12 frame is 204 px tall
const X0 = 22;
const Y0 = 214;
const VW = 270;
const VH = 222;
const px = (x: number) => X0 + x * U;
const py = (y: number) => Y0 - y * U;

type Seen = { added: { d: number; w: number; h: number } | null; tried: string[] };

function Face({ w, h, cls }: { w: number; h: number; cls: string }) {
  // Drawn in a unit box and stretched to w by h, so a changed ratio distorts the face.
  return (
    <g transform={`translate(${px(0)} ${py(h)}) scale(${w * U} ${h * U})`} className={cls}>
      <ellipse cx={0.5} cy={0.52} rx={0.32} ry={0.27} vectorEffect="non-scaling-stroke" />
      <ellipse cx={0.39} cy={0.46} rx={0.035} ry={0.025} className={s.eye} />
      <ellipse cx={0.61} cy={0.46} rx={0.035} ry={0.025} className={s.eye} />
      <path d="M0.38 0.6 Q0.5 0.68 0.62 0.6" vectorEffect="non-scaling-stroke" fill="none" />
    </g>
  );
}

export default function AddingSquashesThePhoto({ slug }: { slug: string }) {
  const [op, setOp] = useState<string | null>(null);
  const seen = useRef<Seen>({ added: null, tried: [] });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A 4 by 6 photo is enlarged so its short side is 6. To keep the same shape, its long side must be…",
        options: ["8", "9", "12"],
        answer: 1,
      }}
      exploreHint="Try an adding enlargement and a multiplying one."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const a = seen.current.added ?? { d: 2, w: 6, h: 8 };
        return (
          <>
            <p>
              Adding {a.d} to each side gave {a.w} by {a.h}: the corner left the dashed line, because {a.h} ÷ {a.w} is{" "}
              {r2(a.h / a.w)}, not 1.5. Multiplying each side by 1.5 gave 6 by 9, and the corner stayed on the line.
            </p>
            <p>
              A shape is kept by its ratio, so every side is multiplied by the same number. Adding the same amount grows
              the short side by a bigger share.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} op={op} setOp={setOp} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({ locked, interact, op, setOp, seen }: StageContext & { op: string | null; setOp: (v: string | null) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const cur = OPS.find((o) => o.id === op) ?? null;
  const [w, h] = cur ? dims(cur) : [W0, H0];

  const pick = (o: Op) => {
    const [ow, oh] = dims(o);
    setOp(o.id);
    if (!seen.tried.includes(o.id)) seen.tried.push(o.id);
    if (o.kind === "add") {
      if (!seen.added) seen.added = { d: o.k, w: ow, h: oh };
      reach("added-off");
    } else if (ow === H0 && onRay(ow, oh)) reach("times-on");
  };

  const rayTop = 12.6;
  const ghosts = seen.tried.filter((id) => id !== op).map((id) => OPS.find((o) => o.id === id)!);

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${VW} ${VH}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Photo ${w} by ${h}`}>
        <line x1={px(0)} y1={py(0)} x2={px(8)} y2={py(0)} className={s.axis} />
        {!locked && <line x1={px(0)} y1={py(0)} x2={px(rayTop / RATIO0)} y2={py(rayTop)} className={s.ray} />}

        {ghosts.map((o) => {
          const [gw, gh] = dims(o);
          return (
            <g key={o.id}>
              <rect x={px(0)} y={py(gh)} width={gw * U} height={gh * U} className={s.ghost} />
              <circle cx={px(gw)} cy={py(gh)} r={3.5} className={onRay(gw, gh) ? s.dotOn : s.dotOff} />
              <text x={px(gw) + 6} y={py(gh) + 4} className={s.tag}>{r2(gh / gw)}</text>
            </g>
          );
        })}

        <rect x={px(0)} y={py(H0)} width={W0 * U} height={H0 * U} className={s.photo} />
        {!cur && <Face w={W0} h={H0} cls={s.face} />}

        {cur && (
          <g>
            <rect x={px(0)} y={py(h)} width={w * U} height={h * U} className={s.frame} />
            <Face w={w} h={h} cls={s.face} />
            <circle cx={px(w)} cy={py(h)} r={5} className={onRay(w, h) ? s.dotOn : s.dotOff} />
            <text x={px(w) + 8} y={py(h) + 4} className={s.tagNow}>{r2(h / w)}</text>
          </g>
        )}
        <circle cx={px(0)} cy={py(0)} r={3} className={s.anchor} />
      </svg>

      <p className={s.readout} aria-live="polite">
        {locked ? "4 by 6 photo" : `${w} by ${h} · long ÷ short = ${r2(h / w)}`}
      </p>

      <Row>
        {OPS.map((o) => (
          <Control
            key={o.id}
            disabled={locked || op === o.id}
            className={`${s.tap} ${op === o.id ? "active" : ""}`}
            aria-pressed={op === o.id}
            onClick={() => pick(o)}
          >
            {o.label}
          </Control>
        ))}
        <Control disabled={locked || op === null} className={s.tap} onClick={() => setOp(null)}>
          Reset
        </Control>
      </Row>
    </div>
  );
}
