"use client";

// Powers of two plus one. Blocks of 1, 2, 4 ... 128 cells are packed into a 16 x 16 grid by
// repeated halving (layout() below), which leaves exactly one cell empty. "Add one more unit" fills
// it; then the learner joins the pile to each block in turn: 1+1 = 2, 2+2 = 4 ... 128+128 = 256.
// Every rectangle and number on the stage comes from layout() and SIZES.
// Key state: the pile has joined every block and fills the whole square.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const COUNT = 8;
const SIZES = Array.from({ length: COUNT }, (_, k) => 2 ** k); // 1 .. 128
const TOTAL = SIZES.reduce((a, b) => a + b, 0); // 255
const SIDE = 2 ** (COUNT / 2); // 16
const MILESTONES = ["full-square"] as const;

type R = { x: number; y: number; w: number; h: number };

/** Halve the square again and again: block k takes half of what is left. */
function layout() {
  const block: R[] = new Array(COUNT);
  const rest: R[] = new Array(COUNT + 1);
  let r: R = { x: 0, y: 0, w: SIDE, h: SIDE };
  rest[COUNT] = r;
  for (let k = COUNT - 1; k >= 0; k--) {
    if (r.w >= r.h) {
      block[k] = { x: r.x, y: r.y, w: r.w / 2, h: r.h };
      r = { x: r.x + r.w / 2, y: r.y, w: r.w / 2, h: r.h };
    } else {
      block[k] = { x: r.x, y: r.y, w: r.w, h: r.h / 2 };
      r = { x: r.x, y: r.y + r.h / 2, w: r.w, h: r.h / 2 };
    }
    rest[k] = r; // what is left after block k: holds blocks < k and the empty cell
  }
  return { block, rest };
}
const { block: BLOCK, rest: REST } = layout();

const CELL = 15;
const PAD = 4;
const VB = SIDE * CELL + 2 * PAD;

export default function PowersOfTwo({ slug }: { slug: string }) {
  const [extra, setExtra] = useState(false);
  const [joined, setJoined] = useState(0);
  const [reachedFull, setReachedFull] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Add ${SIZES.join(" + ")}. What is the total?`,
        options: [String(TOTAL), String(TOTAL + 1), String(TOTAL - 1)],
        answer: 0,
      }}
      exploreHint="Add one more unit, then join it to each block in turn."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{TOTAL}.</strong>{" "}
            {reachedFull
              ? `You added one unit and it joined every block in turn: ${SIZES.map((x) => 2 * x).join(", ")}. The blocks plus that one unit filled all ${SIDE * SIDE} cells.`
              : `The blocks plus one unit fill all ${SIDE * SIDE} cells.`}
          </p>
          <p>
            So the blocks alone are {SIDE * SIDE} − 1 = {TOTAL}. Each join doubles the pile to exactly the size of the next
            block, so the pile is always one short of the next doubling.
          </p>
          <p>The same holds for any run of doublings: 1 + 2 + … + 2ⁿ⁻¹ = 2ⁿ − 1.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const join = (k: number) => {
              setJoined(k + 1);
              if (k + 1 === COUNT) {
                setReachedFull(true);
                reach("full-square");
              }
            };
            const reset = () => {
              setExtra(false);
              setJoined(0);
            };
            return <Stage locked={locked} extra={extra} joined={joined} onAdd={() => setExtra(true)} onJoin={join} onReset={reset} />;
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  extra,
  joined,
  onAdd,
  onJoin,
  onReset,
}: {
  locked: boolean;
  extra: boolean;
  joined: number;
  onAdd: () => void;
  onJoin: (k: number) => void;
  onReset: () => void;
}) {
  const pile = extra ? REST[joined] : null;
  const pileSize = 2 ** joined;
  const at = (r: R) => ({ x: PAD + r.x * CELL, y: PAD + r.y * CELL, width: r.w * CELL, height: r.h * CELL });
  const full = extra && joined === COUNT;

  let caption = "Make a prediction to start.";
  if (!locked && !extra) caption = `Blocks ${SIZES[0]} to ${SIZES[COUNT - 1]}, packed into a square. One cell is empty.`;
  if (extra && joined === 0) caption = "One more unit fills the gap. Join it to the 1.";
  if (extra && joined > 0 && !full) caption = `The pile is ${pileSize}, the same as the next block. Join it.`;
  if (full) caption = `The pile fills the whole square: ${SIDE} × ${SIDE} = ${SIDE * SIDE}.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${VB} ${VB}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <rect x={PAD} y={PAD} width={SIDE * CELL} height={SIDE * CELL} className={s.frame} />
        {SIZES.map((v, k) =>
          k < joined && extra ? null : (
            <g key={k}>
              <rect {...at(BLOCK[k])} className={`${s.block} ${extra && k === joined ? s.next : ""}`} />
              {v >= 4 && (
                <text
                  x={PAD + (BLOCK[k].x + BLOCK[k].w / 2) * CELL}
                  y={PAD + (BLOCK[k].y + BLOCK[k].h / 2) * CELL}
                  className={s.label}
                  style={{ fontSize: v >= 16 ? 16 : 10 }}
                >
                  {v}
                </text>
              )}
            </g>
          ),
        )}
        {!extra && <rect {...at(REST[0])} className={s.hole} />}
        {pile && (
          <g>
            <rect {...at(pile)} className={s.pile} />
            {pileSize >= 4 && (
              <text x={PAD + (pile.x + pile.w / 2) * CELL} y={PAD + (pile.y + pile.h / 2) * CELL} className={s.label} style={{ fontSize: pileSize >= 16 ? 18 : 10 }}>
                {pileSize}
              </text>
            )}
          </g>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Row>
        <Control disabled={locked || extra} className={extra ? "active" : ""} aria-pressed={extra} onClick={onAdd}>
          Add one more unit
        </Control>
        <Readout label="Pile" value={extra ? pileSize : "–"} />
      </Row>
      <div className={s.chips} role="group" aria-label="Join the pile to a block">
        {SIZES.map((v, k) => (
          <Control
            key={v}
            disabled={locked || !extra || joined !== k}
            className={`${s.chip} ${extra && k < joined ? "active" : ""}`}
            aria-label={`Join block ${v}`}
            onClick={() => onJoin(k)}
          >
            {v}
          </Control>
        ))}
      </div>
      <Row>
        <Control disabled={locked || !extra} onClick={onReset}>
          Start over
        </Control>
      </Row>
    </div>
  );
}
