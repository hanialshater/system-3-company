"use client";

// Triangle is half. A triangle with base 6 and height 4 sits on a square grid inside a dashed
// 6 × 4 box. Chips move the tip along the dashed line 4 squares above the base, from 6 squares left of
// the base to 6 squares past its right end. Three lines across the triangle (at heights 1, 2, 3) keep
// their lengths as it slides. The area readout is the shoelace area of the drawn corners.
// Key states: the tip past an end of the base, and far off (6 squares past an end).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const B = 6;
const HT = 4;
const TIPS = [-6, -3, 0, 3, 6, 9, 12];
const START = 3;
const MILESTONES = ["past-an-end", "far-off"] as const;

type P = [number, number];
const corners = (x: number): P[] => [[0, 0], [B, 0], [x, HT]];
const shoelace = (p: P[]) =>
  Math.abs(p.reduce((acc, [x, y], i) => { const [a, b] = p[(i + 1) % p.length]; return acc + x * b - a * y; }, 0)) / 2;
const beyond = (x: number) => (x < 0 ? -x : x > B ? x - B : 0);

const U = 18;
const XMIN = -6;
const XMAX = 12;
const PAD = 12;
const W = (XMAX - XMIN) * U + PAD * 2;
const H = HT * U + PAD * 2 + 30;
const sx = (x: number) => PAD + (x - XMIN) * U;
const sy = (y: number) => PAD + 14 + (HT - y) * U;

export default function TriangleIsHalf({ slug }: { slug: string }) {
  const [tip, setTip] = useState(START);
  const [farthest, setFarthest] = useState(0);
  const AREA = shoelace(corners(tip));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On grid paper you draw a triangle with base ${B} and height ${HT}, then drag its top corner far off to one side. What is its area?`,
        options: [`${B * HT}`, `${shoelace(corners(12))}`, "10"],
        answer: 1,
      }}
      exploreHint="Slide the tip past the end of the base and watch the area."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The area stayed {AREA} at every tip you tried, even {farthest} squares past the end of the base. With the tip over
            the base, its drop line cut the {B} × {HT} box in two, and the triangle was half of each part: half of {B * HT}.
          </p>
          <p>
            Sliding the tip keeps the base {B} and the height {HT}. Each line across the triangle kept its length and only
            shifted sideways, so the total cannot change. Any triangle is base × height ÷ 2.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              tip={tip}
              onTip={(x) => {
                setTip(x);
                setFarthest((f) => Math.max(f, beyond(x)));
                if (beyond(x) > 0) reach("past-an-end");
                if (beyond(x) >= B) reach("far-off");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, tip, onTip }: { locked: boolean; tip: number; onTip: (x: number) => void }) {
  const pts = corners(tip);
  const area = shoelace(pts);
  const d = beyond(tip);
  const caption = locked
    ? "Make a prediction to start."
    : d === 0
      ? `The tip's drop line cuts the ${B} × ${HT} box in two. The triangle is half of each part.`
      : `Tip ${d} squares past the end. Still base ${B}, height ${HT}. Lines across it keep their length.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {Array.from({ length: XMAX - XMIN + 1 }, (_, i) => (
          <line key={`v${i}`} x1={sx(XMIN + i)} y1={sy(HT)} x2={sx(XMIN + i)} y2={sy(0)} className={s.grid} />
        ))}
        {Array.from({ length: HT + 1 }, (_, j) => (
          <line key={`h${j}`} x1={sx(XMIN)} y1={sy(j)} x2={sx(XMAX)} y2={sy(j)} className={s.grid} />
        ))}
        <rect x={sx(0)} y={sy(HT)} width={B * U} height={HT * U} className={s.box} />
        <line x1={sx(XMIN)} y1={sy(HT)} x2={sx(XMAX)} y2={sy(HT)} className={s.track} />
        <polygon points={pts.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ")} className={s.tri} />
        {[1, 2, 3].map((y) => {
          const t = y / HT;
          const left = 0 + (tip - 0) * t;
          const right = B + (tip - B) * t;
          return <line key={y} x1={sx(left)} y1={sy(y)} x2={sx(right)} y2={sy(y)} className={s.strip} />;
        })}
        {d === 0 && <line x1={sx(tip)} y1={sy(HT)} x2={sx(tip)} y2={sy(0)} className={s.drop} />}
        <circle cx={sx(tip)} cy={sy(HT)} r={5} className={s.tip} />
        <text x={sx(B / 2)} y={sy(0) + 16} className={s.lab}>
          base {B}
        </text>
        <text x={tip >= 0 ? sx(0) - 4 : sx(B) + 4} y={sy(HT / 2) + 4} className={tip >= 0 ? s.labR : s.labL}>
          height {HT}
        </text>
        {TIPS.map((x) => (
          <text key={x} x={sx(x)} y={sy(HT) - 8} className={x === tip && !locked ? s.tickOn : s.tick}>
            {x}
          </text>
        ))}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Move the tip">
        {TIPS.map((x) => (
          <Control
            key={x}
            disabled={locked || x === tip}
            className={x === tip ? "active" : ""}
            aria-label={`Move the tip to ${x}`}
            onClick={() => onTip(x)}
          >
            {x}
          </Control>
        ))}
      </div>
      <Row>
        <Readout label="Box" value={`${B} × ${HT} = ${B * HT}`} />
        <Readout label="Triangle area" value={locked ? "?" : `${area} squares`} />
      </Row>
    </div>
  );
}
