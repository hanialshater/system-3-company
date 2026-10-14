"use client";

// Side of the square. A square floor on a 1 m grid (0-11 m shown), starting at side 5 (25 m²).
// Chips set the side to 25, 10, 8, 7, 7.1 and 7.07 m; the area readout is side × side, and the
// dashed outline is the 50 m² target (side √50), drawn only after the prediction.
// The 25 m square is clipped by the frame; its area still reads 625 m².
// Key states: both 7 m (49) and 8 m (64) seen, and 7.07 m (49.98, just under 50).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const TARGET = 50;
const SIDES = [25, 12.5, 10, 8, 7, 7.1, 7.07];
// Only 25 m and 12.5 m (the halving and divide-by-4 guesses) show before the prediction. Each later chip
// appears once the one before it has been tried, so the finer sides never cue the answer. Hidden chips stay
// in the DOM (visibility: hidden), so the order of controls never changes.
const OPEN = 2;
const START = 5;
const MILESTONES = ["bracketed", "close"] as const;
const area = (x: number) => Number((x * x).toFixed(2));
const ROOT = Math.sqrt(TARGET);
const LO = Math.floor(ROOT);
const HI = LO + 1;

const U = 24;
const MAXM = 11;
const PAD = 22;
const F = MAXM * U;
const W = F + PAD * 2;
const H = F + PAD + 26;

export default function SideOfTheSquare({ slug }: { slug: string }) {
  const [side, setSide] = useState(START);
  const [seen, setSeen] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A square floor has area ${TARGET} square metres. Its side is closest to...`,
        options: [`${TARGET / 2} m`, "7.07 m", "10 m", `${TARGET / 4} m`],
        answer: 1,
      }}
      exploreHint="Try the sides in turn; each one opens the next. Stop when the square covers the dashed 50 m² outline."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The square root of {TARGET} is the side whose square is {TARGET}: about {ROOT.toFixed(2)} m, not a whole number.
          </p>
          <p>
            {seen.includes(TARGET / 2) ? `A ${TARGET / 2} m side gave ${area(TARGET / 2)} m², far too much: halving 50 does not find the side. ` : ""}
            {seen.includes(TARGET / 4) ? `Nor does dividing by 4: ${TARGET / 4} m gave ${area(TARGET / 4)} m². ` : ""}
            {LO} m gave {area(LO)} m² and {HI} m gave {area(HI)}, so the side lies between them. 7.07 m gave {area(7.07)} m², just
            under {TARGET}. Whole sides skip right over {TARGET}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              side={side}
              seen={seen}
              onSide={(x) => {
                const next = seen.includes(x) ? seen : [...seen, x];
                setSide(x);
                setSeen(next);
                if (next.includes(LO) && next.includes(HI)) reach("bracketed");
                if (x === 7.07) reach("close");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, side, seen, onSide }: { locked: boolean; side: number; seen: number[]; onSide: (x: number) => void }) {
  const a = area(side);
  const verdict = a > TARGET ? (a - TARGET < 1 ? `just over ${TARGET}` : "too big") : a === TARGET ? "exactly 50" : TARGET - a < 0.1 ? `just under ${TARGET}` : "too small";
  const caption = locked
    ? "Make a prediction to start."
    : side === START
      ? `Area = side × side: ${START} × ${START} = ${a} m². Which side covers ${TARGET} m²?`
      : `${side} × ${side} = ${a} m²: ${verdict}${verdict === "too big" ? ` (${Number((a / TARGET).toFixed(1))}× the target)` : ""}.`;
  const shown = Math.min(side, MAXM + 0.6);
  const y0 = PAD + F;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <defs>
          <clipPath id="sots-frame">
            <rect x={PAD} y={PAD - 6} width={F + 8} height={F + 6} />
          </clipPath>
        </defs>
        {Array.from({ length: MAXM + 1 }, (_, i) => (
          <g key={i}>
            <line x1={PAD + i * U} y1={PAD} x2={PAD + i * U} y2={y0} className={s.grid} />
            <line x1={PAD} y1={y0 - i * U} x2={PAD + F} y2={y0 - i * U} className={s.grid} />
            {i % 2 === 1 || i === 0 ? null : (
              <text x={PAD + i * U} y={y0 + 16} className={s.tick}>
                {i}
              </text>
            )}
          </g>
        ))}
        <g clipPath="url(#sots-frame)">
          <rect x={PAD} y={y0 - shown * U} width={shown * U} height={shown * U} className={a > TARGET ? s.over : s.sq} />
        </g>
        {!locked && <rect x={PAD} y={y0 - ROOT * U} width={ROOT * U} height={ROOT * U} className={s.target} />}
        {!locked && (
          <text x={PAD + ROOT * U - 4} y={y0 - ROOT * U - 5} className={s.targetLab}>
            {TARGET} m²
          </text>
        )}
        {!locked && side > MAXM && (
          <text x={PAD + F / 2} y={PAD + 14} className={s.targetLab} textAnchor="middle">
            runs off the grid
          </text>
        )}
        <text x={PAD + (Math.min(shown, MAXM) * U) / 2} y={y0 - (Math.min(shown, MAXM) * U) / 2 + 6} className={s.inside}>
          {locked ? "?" : `${a} m²`}
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Pick the side">
        {SIDES.map((x, i) => {
          const open = i < OPEN || seen.includes(SIDES[i - 1]);
          return (
            <Control
              key={x}
              disabled={locked || x === side || !open}
              className={`${x === side ? "active" : ""} ${open ? "" : s.hidden}`}
              aria-hidden={!open}
              aria-label={`Make the side ${x} metres`}
              onClick={() => onSide(x)}
            >
              {x} m
            </Control>
          );
        })}
      </div>
      <Row>
        <Readout label="Side" value={`${side} m`} />
        <Readout label="Area" value={locked ? "?" : `${a} m²`} />
      </Row>
    </div>
  );
}
