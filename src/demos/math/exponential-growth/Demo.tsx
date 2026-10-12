"use client";

// Exponential growth, felt backwards. The pond is full on day 30 and the algae
// doubles daily, so every day earlier halves it. The learner drags time back and
// watches the "nearly full" pond turn out to be nearly empty five days earlier.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useId, useState } from "react";
import s from "./styles.module.css";

const FULL_DAY = 30;
const POND = 288; // px, the pond is POND x POND
const PAD = 16;
const GRID = 32; // 32 x 32 = 1024 cells: one cell is the pond on day 20

/** Rectangle covering (1/2)^m of the pond: halve alternately across and down. */
function patch(m: number) {
  const across = Math.ceil(m / 2);
  const down = Math.floor(m / 2);
  return { w: POND / 2 ** across, h: POND / 2 ** down };
}

function percent(f: number) {
  const p = f * 100;
  if (p >= 10) return `${Number(p.toFixed(1))}%`;
  if (p >= 0.01) return `${Number(p.toPrecision(3))}%`;
  return "< 0.01%";
}

export default function ExponentialGrowth({ slug }: { slug: string }) {
  const [day, setDay] = useState(FULL_DAY);
  const gridId = useId().replace(/:/g, "");

  const m = FULL_DAY - day; // halvings back from full
  const f = 1 / 2 ** m;
  const { w, h } = patch(m);
  const tiny = w < 8;
  const frac = `1/${(2 ** m).toLocaleString("en-US")}`;

  const caption =
    m === 0
      ? "Day 30: the pond is full."
      : m === 1
        ? "Day 29: half the pond is still open water."
        : f >= 0.01
          ? `Day ${day}: ${frac} covered. ${percent(1 - f)} is still open water.`
          : tiny
            ? `Day ${day}: ${frac} covered, too small to see. The circle marks it.`
            : `Day ${day}: ${frac} covered. Easy to miss.`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Algae doubles its area every day. On day 30 it covers the whole pond. How much of the pond did it cover on day 25?",
        options: ["About 83% (25 of 30 days)", "About half", "About 3%"],
        answer: 2,
      }}
      exploreHint="Drag the days back from 30 and watch the algae."
      reveal={() => (
        <>
          <p>
            On day 25 the algae covered <strong>1/32</strong> of the pond, about 3%. Each day back halves it: day 29 is
            half, day 28 a quarter, day 25 a sliver in the corner. On day 20 it was one tiny square out of 1,024.
          </p>
          <p>
            Doubling hides at first and then arrives all at once. Most of the pond fills in the last two days, so a
            pond that looks 97% clear is five days from full.
          </p>
          <p className="muted">Doubling 30 times multiplies by more than a billion.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (d: number) => {
          if (locked) return;
          const next = Math.max(0, Math.min(FULL_DAY, d));
          if (next === day) return;
          interact();
          setDay(next);
        };
        const step = POND / GRID;
        return (
          <div className={s.wrap}>
            <svg
              viewBox={`0 0 ${POND + PAD * 2} ${POND + PAD * 2}`}
              className={`stage-svg ${s.fit}`}
              role="img"
              aria-label={`Pond on day ${day}: ${percent(f)} covered`}
            >
              <defs>
                <pattern id={gridId} width={step} height={step} patternUnits="userSpaceOnUse" x={PAD} y={PAD}>
                  <path d={`M ${step} 0 L 0 0 0 ${step}`} className={s.gridLine} />
                </pattern>
              </defs>
              <rect x={PAD} y={PAD} width={POND} height={POND} rx={4} className={s.water} />
              <rect x={PAD} y={PAD} width={POND} height={POND} fill={`url(#${gridId})`} />
              <rect x={PAD} y={PAD} width={w} height={h} className={s.algae} />
              {tiny && <circle cx={PAD} cy={PAD} r={12} className={s.marker} />}
              <rect x={PAD} y={PAD} width={POND} height={POND} rx={4} className={s.edge} />
            </svg>

            <p className={s.caption} aria-live="polite">
              {locked ? "Make a prediction to start. Each small square is 1/1024 of the pond." : caption}
            </p>

            <Slider
              label="Day"
              value={day}
              min={0}
              max={FULL_DAY}
              disabled={locked}
              onChange={go}
              format={(v) => `day ${v}`}
            />
            <Row>
              <Control disabled={locked || day <= 0} onClick={() => go(day - 1)} aria-label="One day earlier">
                − 1 day
              </Control>
              <Control disabled={locked || day >= FULL_DAY} onClick={() => go(day + 1)} aria-label="One day later">
                + 1 day
              </Control>
              <Readout label="Covered" value={percent(f)} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
