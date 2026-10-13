"use client";

// Shadow height. A 2 m stick casts a 3 m shadow. Its triangle and the tree's are drawn from the
// same shadow tip, so both tops sit on one sun ray. Choosing the tree's shadow (3 to 21 m) draws
// the tree on that ray plus a staircase of stick-sized steps (3 across, 2 up) under the ray,
// so 21 m reads as 7 steps and 14 m. All numbers come from STICK_H, STICK_S and the chip list.
// Key state: the tree's shadow is 21 m (the question's value).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const STICK_H = 2; // m
const STICK_S = 3; // m
const TREE_S = 21; // m, the question's shadow
const TREE_H = (TREE_S / STICK_S) * STICK_H; // 14
const CHIPS = Array.from({ length: TREE_S / STICK_S }, (_, i) => (i + 1) * STICK_S); // 3..21
const MILESTONES = ["tree-at-21"] as const;

const M = 14; // px per metre
const TIP = 18;
const GROUND = 218;
const W = TIP + TREE_S * M + 22;
const H = GROUND + 16;
const X = (m: number) => TIP + m * M;
const Y = (m: number) => GROUND - m * M;
const height = (shadow: number) => (shadow / STICK_S) * STICK_H;

export default function ShadowHeight({ slug }: { slug: string }) {
  const [shadow, setShadow] = useState<number | null>(null);
  const [reached, setReached] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${STICK_H} m stick casts a ${STICK_S} m shadow. At the same moment a tree casts a ${TREE_S} m shadow. How tall is the tree?`,
        options: [`${TREE_H} m`, `${TREE_S - STICK_S + STICK_H} m`, `${(STICK_S / STICK_H) * TREE_S} m`],
        answer: 0,
      }}
      exploreHint={`Give the tree a ${TREE_S} m shadow and count the stick-sized steps.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{TREE_H} m.</strong>{" "}
            {reached
              ? `You gave the tree a ${TREE_S} m shadow and its top landed at ${TREE_H} m.`
              : `A ${TREE_S} m shadow puts the tree's top at ${TREE_H} m.`}{" "}
            {TREE_S} m is {TREE_S / STICK_S} stick shadows of {STICK_S} m, so the tree is {TREE_S / STICK_S} sticks of{" "}
            {STICK_H} m.
          </p>
          <p>
            The sun&apos;s rays arrive almost parallel, so stick and tree meet the ground at the same angle. Same angle, same
            shape: height and shadow grow by the same factor. Adding the extra {TREE_S - STICK_S} m to the stick gives{" "}
            {TREE_S - STICK_S + STICK_H} m, but shapes grow by multiplying, not adding.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              shadow={shadow}
              onPick={(v) => {
                setShadow(v);
                if (v === TREE_S) {
                  setReached(true);
                  reach("tree-at-21");
                }
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, shadow, onPick }: { locked: boolean; shadow: number | null; onPick: (v: number) => void }) {
  const steps = shadow === null ? 0 : shadow / STICK_S;
  const h = shadow === null ? 0 : height(shadow);
  const stair: string[] = [];
  for (let i = 0; i < steps; i++) {
    const x0 = X(i * STICK_S);
    const y0 = Y(i * STICK_H);
    stair.push(`M${x0},${y0} H${X((i + 1) * STICK_S)} V${Y((i + 1) * STICK_H)}`);
  }
  const caption = locked
    ? "Make a prediction to start."
    : shadow === null
      ? `The stick: ${STICK_H} m tall, ${STICK_S} m shadow. Pick the tree's shadow.`
      : `${shadow} m of shadow is ${steps} stick shadow${steps === 1 ? "" : "s"}.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <line x1={X(0)} y1={Y(0)} x2={X(TREE_S + 1)} y2={Y(height(TREE_S + 1))} className={s.ray} />
        <line x1={4} y1={GROUND} x2={W - 4} y2={GROUND} className={s.ground} />
        {shadow !== null && (
          <>
            <path d={stair.join(" ")} className={s.stair} />
            <line x1={X(0)} y1={GROUND} x2={X(shadow)} y2={GROUND} className={s.shadowTree} />
            <line x1={X(shadow)} y1={GROUND} x2={X(shadow)} y2={Y(h)} className={s.tree} />
            <circle cx={X(shadow)} cy={Y(h)} r={5} className={s.treeTop} />
            <text x={X(shadow) - 8} y={Y(h) - 8} textAnchor="end" className={s.treeLabel}>
              {h} m
            </text>
          </>
        )}
        <line x1={X(0)} y1={GROUND} x2={X(STICK_S)} y2={GROUND} className={s.shadowStick} />
        <line x1={X(STICK_S)} y1={GROUND} x2={X(STICK_S)} y2={Y(STICK_H)} className={s.stick} />
        <text x={X(STICK_S) + 5} y={Y(STICK_H / 2) + 4} className={s.small}>
          {STICK_H} m
        </text>
        <text x={X(STICK_S / 2)} y={GROUND + 13} textAnchor="middle" className={s.small}>
          {STICK_S} m
        </text>
        <text
          x={X(10.5)}
          y={Y(7) - 6}
          textAnchor="middle"
          transform={`rotate(${(-Math.atan(STICK_H / STICK_S) * 180) / Math.PI} ${X(10.5)} ${Y(7) - 6})`}
          className={s.small}
        >
          sun ray
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <span className={s.chipLabel}>Tree&apos;s shadow (m)</span>
      <div className={s.chips} role="group" aria-label="Tree's shadow">
        {CHIPS.map((v) => (
          <Control
            key={v}
            disabled={locked}
            className={shadow === v ? "active" : ""}
            aria-pressed={shadow === v}
            aria-label={`Tree's shadow ${v} m`}
            onClick={() => onPick(v)}
          >
            {v}
          </Control>
        ))}
      </div>
      <Row>
        <Readout label="Tree's height" value={locked || shadow === null ? "?" : `${h} m`} />
      </Row>
    </div>
  );
}
