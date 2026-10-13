"use client";

// Euclid square cutting. A 48 x 18 floor drawn to scale. Each "Cut" chip cuts the biggest square
// that fits off the rectangle that is left (euclid() below), until what is left is itself a
// square: 18, 18, 12, 6, leaving 6 x 6. Then "Tile with 6s" lays that square over the whole floor.
// Only the next chip is enabled, so the cuts happen in order. All numbers come from euclid().
// Key state: the leftover is a square.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const FW = 48;
const FH = 18;
const MILESTONES = ["square-left"] as const;

type Rect = { x: number; y: number; w: number; h: number };
/** Cut the biggest square off the rectangle until a square is left. */
function euclid(w: number, h: number) {
  const cuts: Rect[] = [];
  const left: Rect[] = [{ x: 0, y: 0, w, h }];
  let r = left[0];
  while (r.w !== r.h) {
    const side = Math.min(r.w, r.h);
    cuts.push({ x: r.x, y: r.y, w: side, h: side });
    r = r.w > r.h ? { x: r.x + side, y: r.y, w: r.w - side, h: r.h } : { x: r.x, y: r.y + side, w: r.w, h: r.h - side };
    left.push(r);
  }
  return { cuts, left, tile: r.w };
}
const { cuts: CUTS, left: LEFT, tile: TILE } = euclid(FW, FH);
const STEPS = CUTS.length;

const U = 6;
const PAD = 10;
const W = FW * U + 2 * PAD;
const H = FH * U + 2 * PAD;

export default function EuclidSquares({ slug }: { slug: string }) {
  const [done, setDone] = useState(0);
  const [tiled, setTiled] = useState(false);
  const [finished, setFinished] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${FW} by ${FH} floor is covered with identical square tiles, no cutting. What is the biggest tile side?`,
        options: [String(TILE), "9", "12"],
        answer: 0,
      }}
      exploreHint="Keep cutting off the biggest square until a square is left."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{TILE}.</strong>{" "}
            {finished
              ? `You cut squares of ${CUTS.map((c) => c.w).join(", ")} and were left with a ${TILE} × ${TILE} square.`
              : `The cuts are ${CUTS.map((c) => c.w).join(", ")}, leaving a ${TILE} × ${TILE} square.`}
          </p>
          <p>
            A tile that fits the floor exactly also fits each piece you cut off, so it must fit what is left, all the way down.
            The last square fits every piece going back up, so it fits the floor: {FW / TILE} by {FH / TILE} = {(FW / TILE) * (FH / TILE)} tiles.
          </p>
          <p>No guessing or listing factors: cutting squares finds the biggest shared tile. This is Euclid&apos;s method.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              done={done}
              tiled={tiled}
              onCut={(k) => {
                setDone(k + 1);
                if (k + 1 === STEPS) {
                  setFinished(true);
                  reach("square-left");
                }
              }}
              onTile={() => setTiled(!tiled)}
              onReset={() => {
                setDone(0);
                setTiled(false);
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  done,
  tiled,
  onCut,
  onTile,
  onReset,
}: {
  locked: boolean;
  done: number;
  tiled: boolean;
  onCut: (k: number) => void;
  onTile: () => void;
  onReset: () => void;
}) {
  const r = LEFT[done];
  const end = done === STEPS;
  const X = (u: number) => PAD + u * U;
  let caption = "Make a prediction to start.";
  if (!locked && done === 0) caption = `A ${FW} × ${FH} floor. Cut off the biggest square that fits.`;
  if (done > 0 && !end) caption = `Left: ${r.w} × ${r.h}. Cut again.`;
  if (end) caption = tiled ? `${FW / TILE} × ${FH / TILE} tiles of ${TILE} cover the floor exactly.` : `Left: ${TILE} × ${TILE}, a square. Nothing more to cut.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {CUTS.slice(0, done).map((c, i) => (
          <g key={i}>
            <rect x={X(c.x)} y={X(c.y)} width={c.w * U} height={c.h * U} className={i % 2 ? s.cutB : s.cutA} />
            <text x={X(c.x + c.w / 2)} y={X(c.y + c.h / 2)} className={s.label} style={{ fontSize: c.w >= 12 ? 16 : 11 }}>
              {c.w}
            </text>
          </g>
        ))}
        <rect x={X(r.x)} y={X(r.y)} width={r.w * U} height={r.h * U} className={end ? s.square : s.rest} />
        {end && (
          <text x={X(r.x + r.w / 2)} y={X(r.y + r.h / 2)} className={s.label} style={{ fontSize: 11 }}>
            {TILE}
          </text>
        )}
        {tiled &&
          Array.from({ length: (FW / TILE) * (FH / TILE) }, (_, i) => (
            <rect
              key={i}
              x={X((i % (FW / TILE)) * TILE)}
              y={X(Math.floor(i / (FW / TILE)) * TILE)}
              width={TILE * U}
              height={TILE * U}
              className={s.tile}
            />
          ))}
        <rect x={X(0)} y={X(0)} width={FW * U} height={FH * U} className={s.outline} />
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Cuts">
        {CUTS.map((c, k) => (
          <Control
            key={k}
            disabled={locked || done !== k}
            className={k < done ? "active" : ""}
            aria-label={k < done ? `Cut ${k + 1}: square of ${c.w}` : `Cut ${k + 1}`}
            onClick={() => onCut(k)}
          >
            {k < done ? `${c.w} × ${c.w}` : k === done ? "Cut" : "·"}
          </Control>
        ))}
      </div>
      <Row>
        <Control disabled={locked || !end} className={tiled ? "active" : ""} aria-pressed={tiled} onClick={onTile}>
          {tiled ? "Hide the tiles" : "Tile with the last square"}
        </Control>
        <Control disabled={locked || done === 0} onClick={onReset}>
          Start over
        </Control>
      </Row>
    </div>
  );
}
