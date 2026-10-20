"use client";

// Euclid's algorithm as cutting squares. From a 48 by 18 floor, cut the biggest square that fits
// (side = the shorter side of what is left), again and again. 18, 18, 12, 6, 6: the last strip,
// 12 by 6, splits into exactly two 6-squares, so 6 is the largest square tile for the whole floor.
// One picture: the rectangle, with every cut square kept on it and labelled with its side.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const W0 = 48;
const H0 = 18;
type Sq = { x: number; y: number; side: number; left: { w: number; h: number } };
/** Every cut, in order, with the rectangle left after it. */
function cuts(): Sq[] {
  const out: Sq[] = [];
  let r = { x: 0, y: 0, w: W0, h: H0 };
  while (r.w > 0 && r.h > 0) {
    const side = Math.min(r.w, r.h);
    const sq = { x: r.x, y: r.y, side };
    r = r.w >= r.h ? { x: r.x + side, y: r.y, w: r.w - side, h: r.h } : { x: r.x, y: r.y + side, w: r.w, h: r.h - side };
    out.push({ ...sq, left: { w: r.w, h: r.h } });
  }
  return out;
}
const CUTS = cuts();
const TILE = CUTS[CUTS.length - 1].side; // 6
const SIDES = CUTS.map((c) => c.side); // 18, 18, 12, 6, 6
const STRIP = CUTS.length >= 3 ? CUTS[CUTS.length - 3].left : { w: TILE, h: TILE }; // the 12 x 6 strip
const ACROSS = W0 / TILE;
const DOWN = H0 / TILE;

const SC = 6.6; // px per unit
const OX = 4;
const OY = 22;

export default function EuclidLeftoverRectangle({ slug }: { slug: string }) {
  const [n, setN] = useState(0); // cuts made
  const [overlay, setOverlay] = useState(false);
  const done = n === CUTS.length;
  const left = n === 0 ? { w: W0, h: H0 } : CUTS[n - 1].left;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your ${W0} by ${H0} kitchen floor needs the largest identical square tiles that fit exactly, with none cut. How big is each square?`,
        options: ["3 by 3", `${TILE} by ${TILE}`, "9 by 9"],
        answer: 1,
      }}
      exploreHint="Cut the biggest square that fits, again and again, until nothing is left."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You cut squares of {SIDES.join(", ")}. The last strip, {STRIP.w} by {STRIP.h}, split into exactly two{" "}
            {TILE}-squares, and that {TILE}-square tiles the whole floor: {ACROSS} across, {DOWN} down.
          </p>
          <p>
            Cutting off a square never changes which tiles fit: a tile that fits the floor and the square also fits
            what is left. So the leftover keeps shrinking, and the size that finally fits exactly is the biggest
            common tile. {CUTS.length} cuts, instead of testing every size up to {H0}. This is Euclid&apos;s algorithm.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["tiled", "whole-floor"]}>
          {(reach) => {
            const cutTo = (k: number) => {
              if (locked || n >= CUTS.length) return;
              setN(k);
              if (k === CUTS.length) reach("tiled");
            };
            const tile = () => {
              if (locked || !done) return;
              setOverlay(true);
              reach("whole-floor");
            };
            const msg = locked
              ? "Make a prediction to start."
              : overlay
                ? `${TILE}-squares: ${ACROSS} across × ${DOWN} down = ${ACROSS * DOWN} tiles.`
                : done
                  ? `Nothing left over. Last square: ${TILE}.`
                  : `Left: ${left.w} × ${left.h}. Cut the biggest square that fits.`;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <svg viewBox="0 0 326 150" className="stage-svg" role="img"
                  aria-label={`A ${W0} by ${H0} rectangle; ${n} squares cut: ${SIDES.slice(0, n).join(", ") || "none"}.`}>
                  <rect x={OX} y={OY} width={W0 * SC} height={H0 * SC} className={s.floor} />
                  {CUTS.slice(0, n).map((c, i) => (
                    <g key={i}>
                      <rect x={OX + c.x * SC} y={OY + c.y * SC} width={c.side * SC} height={c.side * SC}
                        className={`${s.sq} ${i === n - 1 ? s.last : ""}`} />
                      <text x={OX + (c.x + c.side / 2) * SC} y={OY + (c.y + c.side / 2) * SC + 5} className={s.side}>{c.side}</text>
                    </g>
                  ))}
                  {overlay &&
                    Array.from({ length: ACROSS * DOWN }, (_, i) => (
                      <rect key={`t${i}`} x={OX + (i % ACROSS) * TILE * SC} y={OY + Math.floor(i / ACROSS) * TILE * SC}
                        width={TILE * SC} height={TILE * SC} className={s.tile} />
                    ))}
                  <text x={OX + (W0 * SC) / 2} y={14} className={s.dim}>floor {W0} × {H0}</text>
                </svg>
                <Row>
                  <Readout label="Cuts" value={locked ? "–" : n} />
                  <Readout label="Left over" value={locked ? "–" : done ? "none" : `${left.w} × ${left.h}`} />
                </Row>
                <Row>
                  <Control disabled={locked || done} onClick={() => cutTo(n + 1)}>Cut one square</Control>
                  <Control disabled={locked || done} onClick={() => cutTo(CUTS.length)}>Cut until none left</Control>
                  <Control disabled={locked || !done || overlay} onClick={tile}>Tile the floor with the last square</Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
