"use client";

// Fifty-one times forty-nine. A 50 x 50 square, drawn to scale. "Move the strip" turns the bottom
// strip (width d) a quarter turn about the square's bottom-right corner, which stands it up along
// the right edge: the block is now (50 + d) wide and (50 - d) tall, and the strip's last d x d piece
// hangs below it. So (50 + d)(50 - d) = 2500 - d². All labels come from A and d.
// Key state: the strip moved at d = 1 (the question's 51 x 49), then at another width.

import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const A = 50;
const KEY_D = 1;
const MAX_D = 10;
const MILESTONES = ["moved-one", "moved-other"] as const;

const U = 4;
const PAD = 24;
const W = (A + MAX_D) * U + 2 * PAD;
const H = A * U + 2 * PAD + 12;

export default function FiftyOne({ slug }: { slug: string }) {
  const [d, setD] = useState(KEY_D);
  const [moved, setMoved] = useState(false);
  const [seen, setSeen] = useState<number[]>([]);

  const note = (dd: number) => setSeen((old) => (old.includes(dd) ? old : [...old, dd]));
  const others = seen.filter((x) => x !== KEY_D).sort((x, y) => x - y);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${A + KEY_D} × ${A - KEY_D} is how far from ${A} × ${A} = ${A * A}?`,
        options: [`Exactly ${KEY_D} less (${A * A - KEY_D})`, "Exactly equal", `100 less (${A * A - 100})`],
        answer: 0,
      }}
      exploreHint="Move the strip, then try a wider strip."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>
              Exactly {KEY_D} less: {A + KEY_D} × {A - KEY_D} = {(A + KEY_D) * (A - KEY_D)}.
            </strong>{" "}
            Moving the 1-wide strip made a {A + KEY_D} by {A - KEY_D} block, with one 1 × 1 square left hanging off.
          </p>
          <p>
            {others.length > 0
              ? `At width ${others.join(", ")} the hanging piece grew to ${others.map((x) => `${x} × ${x} = ${x * x}`).join(", ")}. `
              : ""}
            Nothing is lost when the strip moves, except that its end does not fit: the small square, d × d.
          </p>
          <p>So (a + d)(a − d) = a² − d², always: the near-square product is the square minus a tiny square.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (m: boolean, dd: number) => {
              if (!m) return;
              note(dd);
              reach(dd === KEY_D ? "moved-one" : "moved-other");
            };
            return (
              <Stage
                locked={locked}
                d={d}
                moved={moved}
                onMove={() => {
                  setMoved(!moved);
                  check(!moved, d);
                }}
                onWidth={(v) => {
                  setD(v);
                  check(moved, v);
                }}
              />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  d,
  moved,
  onMove,
  onWidth,
}: {
  locked: boolean;
  d: number;
  moved: boolean;
  onMove: () => void;
  onWidth: (v: number) => void;
}) {
  const X = (u: number) => PAD + u * U;
  const pivot = `${X(A)}px ${X(A)}px`;
  const caption = locked
    ? "Make a prediction to start."
    : moved
      ? `${A + d} × ${A - d} = ${A * A} − ${d * d} = ${(A + d) * (A - d)}`
      : `${A} × ${A} = ${A * A}. The strip at the bottom is ${d} wide.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {/* the part that stays: 50 wide, 50 - d tall */}
        <rect x={X(0)} y={X(0)} width={A * U} height={(A - d) * U} className={s.body} />
        <g className={s.move} style={{ transform: moved ? "rotate(90deg)" : "rotate(0deg)", transformOrigin: pivot, transformBox: "view-box" }}>
          <rect x={X(0)} y={X(A - d)} width={(A - d) * U} height={d * U} className={s.strip} />
          <rect x={X(A - d)} y={X(A - d)} width={d * U} height={d * U} className={moved ? s.hang : s.strip} />
        </g>
        {moved && (
          <>
            <circle cx={X(A + d / 2)} cy={X(A - d / 2)} r={d * U * 0.71 + 7} className={s.ring} />
            <text x={X(A + d / 2)} y={X(A) + d * U * 0.2 + 22} className={s.note}>
              {d} × {d}
            </text>
            <text x={X((A + d) / 2)} y={PAD - 9} className={s.side}>
              {A + d}
            </text>
            <text x={PAD - 12} y={X((A - d) / 2)} className={s.side}>
              {A - d}
            </text>
          </>
        )}
        {!moved && (
          <>
            <text x={X(A / 2)} y={PAD - 9} className={s.side}>
              {A}
            </text>
            <text x={PAD - 12} y={X(A / 2)} className={s.side}>
              {A}
            </text>
          </>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Row>
        <Control disabled={locked} className={moved ? "active" : ""} aria-pressed={moved} onClick={onMove}>
          {moved ? "Put the strip back" : "Move the strip"}
        </Control>
      </Row>
      <Row>
        <Slider label="Strip width" value={d} min={1} max={MAX_D} onChange={onWidth} disabled={locked} />
      </Row>
    </div>
  );
}
