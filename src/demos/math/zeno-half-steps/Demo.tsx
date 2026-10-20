"use client";

// Zeno half-steps. A unit square; each step shades half of the white that is left, alternately
// splitting the width and the height. After k steps the shaded part is (2^k - 1)/2^k and the white
// is 1/2^k. Key state: six halves shaded, white sliver 1/64 (SIX). QA path (DOM order): "next half"
// (1), "5 more halves" (6), "start over". Every number comes from pieces(k) and frac(k).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const SIX = 6;
const MAX = 10;
const MORE = 5;
const MILESTONES = ["six"] as const;
const SIDE = 196;
const OX = (320 - SIDE) / 2;
const OY = 8;
const den = (k: number) => 2 ** k;
const shaded = (k: number) => `${den(k) - 1}/${den(k)}`;
const white = (k: number) => `1/${den(k)}`;

interface Piece { x: number; y: number; w: number; h: number }
function pieces(k: number) {
  const out: Piece[] = [];
  let x = 0, y = 0, w = 1, h = 1;
  for (let j = 1; j <= k; j++) {
    if (j % 2 === 1) {
      out.push({ x, y, w: w / 2, h });
      x += w / 2;
      w /= 2;
    } else {
      out.push({ x, y, w, h: h / 2 });
      y += h / 2;
      h /= 2;
    }
  }
  return { out, rest: { x, y, w, h } };
}

export default function ZenoHalfSteps({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [best, setBest] = useState(0);
  const { out, rest } = pieces(k);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "On a calculator you keep adding 1/2 + 1/4 + 1/8 + 1/16 + ..., each piece half the one before, and you never stop. What total do the pieces add up to?",
        options: ["Grows without limit", "Exactly 1", "Exactly 2"],
        answer: 1,
      }}
      exploreHint="Shade half of what is left, again and again."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You shaded {best} halves: 1/2 + 1/4 + 1/8 + … = <strong>{shaded(best)}</strong> of the square, with a white sliver of{" "}
            {white(best)} left.
          </p>
          <p>
            Each piece is half of what was left, so the white never vanishes, and the pieces never leave the square, which has
            area 1. The total can never pass 1. Forever, it is exactly 1: the white shrinks toward nothing.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (n: number) => {
              const next = Math.min(MAX, Math.max(0, n));
              setK(next);
              setBest((b) => Math.max(b, next));
              if (next >= SIX) reach("six");
            };
            const caption = locked
              ? "A square of area 1. Make a prediction to start."
              : "Each step shades half of the white that is left. The square has area 1.";
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 212" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <rect x={OX} y={OY} width={SIDE} height={SIDE} className={s.white} />
                  {out.map((p, i) => (
                    <g key={i}>
                      <rect x={OX + p.x * SIDE} y={OY + p.y * SIDE} width={p.w * SIDE} height={p.h * SIDE} className={i % 2 ? s.shadeB : s.shadeA} />
                      {i < 4 && (
                        <text x={OX + (p.x + p.w / 2) * SIDE} y={OY + (p.y + p.h / 2) * SIDE + 4} className={s.lab}>
                          1/{den(i + 1)}
                        </text>
                      )}
                    </g>
                  ))}
                  <rect x={OX + rest.x * SIDE} y={OY + rest.y * SIDE} width={rest.w * SIDE} height={rest.h * SIDE} className={s.rest} />
                  <rect x={OX} y={OY} width={SIDE} height={SIDE} className={s.frame} />
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  <Control disabled={locked || k >= MAX} onClick={() => go(k + 1)}>
                    Shade the next half
                  </Control>
                  <Control disabled={locked || k >= MAX} onClick={() => go(k + MORE)}>
                    Shade {MORE} more
                  </Control>
                  <Control disabled={locked || k === 0} onClick={() => go(0)}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Shaded" value={locked ? "?" : k === 0 ? "0" : shaded(k)} />
                  <Readout label="White left" value={locked ? "?" : k === 0 ? "1" : white(k)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
