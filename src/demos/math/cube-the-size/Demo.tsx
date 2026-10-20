"use client";

// Cube the size. A 2-inch solid cube weighs 1 kg. The width slider scales it to k times as wide
// (2, 4, 6, 8 inches) and the stage fills the big cube with k x k x k of the original small cubes,
// drawn isometric at a fixed size so the growth is felt. "Split into layers" lifts the layers
// apart so k layers of k x k can be counted. Every number comes from k.
// Key state: k = 3 (the question's 6-inch cube), 27 small cubes.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const SMALL_IN = 2; // inches
const SMALL_KG = 1;
const TARGET_K = 3; // 6 inches
const MAX_K = 4;
const MILESTONES = ["six-inch"] as const;

const S = 28; // px per small cube edge
const C = S * Math.cos(Math.PI / 6);
const HH = S * Math.sin(Math.PI / 6);
const GAP = 14; // layer separation when split
const PAD = 10;
const W = 2 * MAX_K * C + 2 * PAD + 28; // room for layer counts on the right
const OY = PAD + MAX_K * S + (MAX_K - 1) * GAP; // screen y of the back-bottom corner
const H = OY + MAX_K * S + PAD;
const OX = PAD + MAX_K * C;

const kg = (k: number) => k ** 3 * SMALL_KG;

function pt(x: number, y: number, z: number, lift: number) {
  return `${(OX + (x - y) * C).toFixed(1)},${(OY + (x + y) * HH - z * S - lift).toFixed(1)}`;
}

export default function CubeTheSize({ slug }: { slug: string }) {
  const [k, setK] = useState(1);
  const [split, setSplit] = useState(false);
  const [reached, setReached] = useState(false);
  const big = SMALL_IN * TARGET_K;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your ${SMALL_IN}-inch solid cube paperweight weighs ${SMALL_KG} kg. How much would a ${big}-inch solid cube of the same material weigh?`,
        options: [`${TARGET_K} kg`, `${TARGET_K ** 2} kg`, `${kg(TARGET_K)} kg`],
        answer: 2,
      }}
      exploreHint={`Widen the cube to ${big} inches and count the small cubes inside.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{kg(TARGET_K)} kg.</strong>{" "}
            {reached ? `At ${big} inches you saw` : `At ${big} inches the cube holds`} {TARGET_K} × {TARGET_K} × {TARGET_K} ={" "}
            {TARGET_K ** 3} of the {SMALL_IN}-inch cubes, and each one weighs {SMALL_KG} kg.
          </p>
          <p>
            Making it {TARGET_K} times as wide also makes it {TARGET_K} times as deep and {TARGET_K} times as tall. {TARGET_K} kg
            counts one of those directions; {TARGET_K ** 2} kg counts two, which is how area grows. Weight follows volume, and
            volume multiplies all three.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              k={k}
              split={split}
              onK={(v) => {
                setK(v);
                if (v === TARGET_K) {
                  setReached(true);
                  reach("six-inch");
                }
              }}
              onSplit={() => setSplit(!split)}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  k,
  split,
  onK,
  onSplit,
}: {
  locked: boolean;
  k: number;
  split: boolean;
  onK: (v: number) => void;
  onSplit: () => void;
}) {
  const cubes: { x: number; y: number; z: number }[] = [];
  for (let x = 0; x < k; x++) for (let y = 0; y < k; y++) for (let z = 0; z < k; z++) cubes.push({ x, y, z });
  cubes.sort((a, b) => a.z - b.z || a.x + a.y - (b.x + b.y)); // layer by layer, back to front
  const lift = (z: number) => (split ? z * GAP : 0);
  const n = k ** 3;

  const caption = locked
    ? "Make a prediction to start."
    : k === 1
      ? `One ${SMALL_IN}-inch cube: ${SMALL_KG} kg. Make it wider.`
      : split
        ? `${k} layers of ${k} × ${k} = ${k * k}: ${n} small cubes.`
        : `${k}× as wide, ${k}× as deep, ${k}× as tall.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W.toFixed(0)} ${H.toFixed(0)}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {cubes.map(({ x, y, z }) => {
          const L = lift(z);
          const mark = x === k - 1 && y === k - 1 && z === k - 1;
          return (
            <g key={`${x}-${y}-${z}`} className={mark ? s.mark : s.cube}>
              <polygon className={s.top} points={[pt(x, y, z + 1, L), pt(x + 1, y, z + 1, L), pt(x + 1, y + 1, z + 1, L), pt(x, y + 1, z + 1, L)].join(" ")} />
              <polygon className={s.right} points={[pt(x + 1, y, z, L), pt(x + 1, y + 1, z, L), pt(x + 1, y + 1, z + 1, L), pt(x + 1, y, z + 1, L)].join(" ")} />
              <polygon className={s.left} points={[pt(x, y + 1, z, L), pt(x + 1, y + 1, z, L), pt(x + 1, y + 1, z + 1, L), pt(x, y + 1, z + 1, L)].join(" ")} />
            </g>
          );
        })}
        {split &&
          Array.from({ length: k }, (_, z) => {
            const [sx, sy] = pt(k, 0, z + 0.5, lift(z)).split(",").map(Number);
            return (
              <text key={z} x={sx + 6} y={sy + 4} className={s.label}>
                {k * k}
              </text>
            );
          })}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Slider label="Width" value={k} min={1} max={MAX_K} disabled={locked} format={(v) => `${SMALL_IN * v} inches`} onChange={onK} />
      <Row>
        <Control disabled={locked || k === 1} className={split ? "active" : ""} aria-pressed={split} onClick={onSplit}>
          {split ? "Put the layers back" : "Split into layers"}
        </Control>
        <Readout label="Small cubes" value={locked ? "?" : n} />
        <Readout label="Weight" value={locked ? "?" : `${kg(k)} kg`} />
      </Row>
    </div>
  );
}
