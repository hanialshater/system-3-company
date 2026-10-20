"use client";

// Square a plus b. A 13 x 13 square drawn on a unit grid, cut at a along both sides into four
// regions: a x a, two a x b strips and b x b. The slider moves the cut; "Only a² + b²" dims the two
// strips, which is what the wrong formula keeps. All labels come from N and the slider value.
// Key state: the cut at 10 and 3 (the question's split), and the strips seen as the missing part.

import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const N = 13;
const KEY_A = 10;
const KEY_B = N - KEY_A;
const START_A = 8; // two slider steps from the question's split
const MILESTONES = ["split-10-3", "strips-missing"] as const;

const U = 16;
const PAD = 22;
const VB = N * U + PAD + 6;

export default function SquareAPlusB({ slug }: { slug: string }) {
  const [a, setA] = useState(START_A);
  const [only, setOnly] = useState(false);
  const [sawKeyMissing, setSawKeyMissing] = useState(false);

  const wrong = KEY_A * KEY_A + KEY_B * KEY_B;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your classmate insists (${KEY_A} + ${KEY_B})² = ${KEY_A}² + ${KEY_B}² = ${wrong}. The true value of ${N} × ${N} is bigger. By how much?`,
        options: ["By 30", `By ${N * N - wrong}`, "By 100"],
        answer: 1,
      }}
      exploreHint={`Move the cut to ${KEY_A} and ${KEY_B}, then try "Only a² + b²".`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>By {N * N - wrong}.</strong> The true {N} × {N} is {N * N}. With the cut at {KEY_A} and {KEY_B} you saw four pieces: {KEY_A * KEY_A} + {KEY_A * KEY_B} +{" "}
            {KEY_A * KEY_B} + {KEY_B * KEY_B} = {N * N}.
          </p>
          <p>
            {sawKeyMissing
              ? `"Only a² + b²" kept just the two corner squares, ${wrong}, and left two strips of ${KEY_A * KEY_B} uncovered.`
              : `The two corner squares make only ${wrong}; the two strips of ${KEY_A * KEY_B} are left uncovered.`}{" "}
            Those strips are the 2ab that (a + b)² = a² + b² forgets.
          </p>
          <p>Wherever you cut, the square is a² + 2ab + b²: two squares and two equal strips.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const move = (v: number) => {
              setA(v);
              if (v === KEY_A) reach("split-10-3");
              if (only && v === KEY_A) setSawKeyMissing(true);
            };
            const toggle = () => {
              setOnly(!only);
              if (!only) {
                reach("strips-missing");
                if (a === KEY_A) setSawKeyMissing(true);
              }
            };
            return <Stage locked={locked} a={a} only={only} onMove={move} onToggle={toggle} />;
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  a,
  only,
  onMove,
  onToggle,
}: {
  locked: boolean;
  a: number;
  only: boolean;
  onMove: (v: number) => void;
  onToggle: () => void;
}) {
  const b = N - a;
  const X = (u: number) => PAD + u * U;
  const regions = [
    { x: 0, y: 0, w: a, h: a, cls: s.sqA, strip: false },
    { x: a, y: 0, w: b, h: a, cls: s.strip, strip: true },
    { x: 0, y: a, w: a, h: b, cls: s.strip, strip: true },
    { x: a, y: a, w: b, h: b, cls: s.sqB, strip: false },
  ];
  const caption = locked
    ? "Make a prediction to start."
    : only
      ? `${a * a} + ${b * b} = ${a * a + b * b}. Two strips of ${a * b} are uncovered.`
      : `${a * a} + ${a * b} + ${a * b} + ${b * b} = ${N * N}`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${VB} ${VB}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {regions.map((r, i) => (
          <g key={i} className={only && r.strip ? s.dim : ""}>
            <rect x={X(r.x)} y={X(r.y)} width={r.w * U} height={r.h * U} className={r.cls} />
            {!locked && (
              <text x={X(r.x + r.w / 2)} y={X(r.y + r.h / 2)} className={s.area} style={{ fontSize: Math.min(18, Math.max(9, Math.min(r.w, r.h) * U * 0.7)) }}>
                {r.w * r.h}
              </text>
            )}
          </g>
        ))}
        {Array.from({ length: N - 1 }, (_, i) => (
          <g key={i} className={s.grid}>
            <line x1={X(i + 1)} y1={X(0)} x2={X(i + 1)} y2={X(N)} />
            <line x1={X(0)} y1={X(i + 1)} x2={X(N)} y2={X(i + 1)} />
          </g>
        ))}
        <rect x={X(0)} y={X(0)} width={N * U} height={N * U} className={s.outline} />
        <line x1={X(a)} y1={X(0) - 6} x2={X(a)} y2={X(N)} className={s.cut} />
        <line x1={X(0) - 6} y1={X(a)} x2={X(N)} y2={X(a)} className={s.cut} />
        <text x={X(a / 2)} y={PAD - 8} className={s.side}>{a}</text>
        <text x={X(a + b / 2)} y={PAD - 8} className={s.side}>{b}</text>
        <text x={PAD - 10} y={X(a / 2)} className={s.side}>{a}</text>
        <text x={PAD - 10} y={X(a + b / 2)} className={s.side}>{b}</text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Row>
        <Slider label="Cut at" value={a} min={1} max={N - 1} onChange={onMove} disabled={locked} format={(v) => `${v} + ${N - v}`} />
      </Row>
      <Row>
        <Control disabled={locked} className={only ? "active" : ""} aria-pressed={only} onClick={onToggle}>
          {only ? "Show all four pieces" : "Only a² + b²"}
        </Control>
      </Row>
    </div>
  );
}
