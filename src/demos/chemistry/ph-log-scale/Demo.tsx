"use client";

// pH as base-ten blocks. One small square = the hydrogen ions in a cup of black coffee
// (about pH 5). Each step down in pH is ten times as many: a rod, a flat, ten flats.
// Each step up is a tenth, until the squares are too small to see.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const REF_PH = 5;
const CELL = 6; // pitch of one small square
const FLAT = CELL * 10;
const GAP = 5;
const TOP = 6;

// Approximate everyday values (see meta.json claims c3–c5). Only label what we can cite.
const LABELS: Record<number, string> = {
  2: "about lemon juice",
  5: "about black coffee",
  7: "pure water (25 °C)",
};

function flatOrigin(f: number) {
  return { x: (f % 5) * (FLAT + GAP), y: TOP + Math.floor(f / 5) * (FLAT + GAP) };
}

function cellXY(k: number) {
  // Fill a flat column by column (so 10 squares make one rod), then the next flat.
  const f = Math.floor(k / 100);
  const within = k % 100;
  const o = flatOrigin(f);
  return { x: o.x + Math.floor(within / 10) * CELL, y: o.y + (within % 10) * CELL };
}

function times(ph: number) {
  const r = Math.pow(10, REF_PH - ph);
  if (r >= 1) return `${Math.round(r).toLocaleString("en-US")}×`;
  return `1/${Math.round(1 / r).toLocaleString("en-US")}`;
}

export default function PhLogScale({ slug }: { slug: string }) {
  const [ph, setPh] = useState(5);
  const [lowest, setLowest] = useState(5); // lowest pH the learner has looked at
  const ratio = Math.pow(10, REF_PH - ph);
  const whole = ratio >= 1 ? Math.round(ratio) : 0;
  const frac = ratio < 1 ? ratio : 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Same-sized cups: black coffee (about pH 5) and lemon juice (about pH 2). How many times more hydrogen ions does the lemon juice have?",
        options: ["About 2.5 times", "3 times", "About 30 times", "About 1,000 times"],
        answer: 3,
      }}
      exploreHint="Slide from coffee at pH 5 down to lemon juice at pH 2, one step at a time."
      reveal={() => (
        <>
          <p>
            {lowest <= 2 ? "You watched" : "Slide down to pH 2 and you see"} one square become a rod of 10, a flat of
            100, then ten flats: <strong>1,000</strong>. Each pH
            step down multiplies the hydrogen ions by 10, and coffee to lemon juice is three steps: 10 × 10 × 10.
          </p>
          <p>
            Going up divides by 10. Pure water at pH 7 has 1/100 of coffee&rsquo;s, a sliver too thin to see. pH
            counts powers of ten, so the gap from pH 0 to 14 is a factor of a hundred trillion.
          </p>
          <p className="muted">Small pH numbers, enormous differences.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const fracW = frac * CELL - 1;
        return (
          <div className={s.wrap}>
            <div className={s.head}>
              <span className={s.big}>{times(ph)}</span>
              <span className="muted small">{ratio >= 1 ? "coffee’s hydrogen ions" : "of coffee’s hydrogen ions"}</span>
            </div>

            <svg
              viewBox={`0 0 ${5 * FLAT + 4 * GAP} ${TOP + 2 * FLAT + GAP + 22}`}
              className="stage-svg"
              role="img"
              aria-label={`At pH ${ph}, ${times(ph)} the hydrogen ions of black coffee. One small square is coffee's amount.`}
            >
              {/* room for 1,000 squares: ten flats of 100 */}
              {Array.from({ length: 10 }, (_, f) => {
                const o = flatOrigin(f);
                return (
                  <rect
                    key={`f${f}`}
                    x={o.x + 0.5}
                    y={o.y + 0.5}
                    width={FLAT - 1}
                    height={FLAT - 1}
                    rx={2}
                    fill="var(--bg-2)"
                    stroke="var(--line)"
                  />
                );
              })}
              {Array.from({ length: whole }, (_, k) => {
                const { x, y } = cellXY(k);
                return (
                  <rect key={k} x={x + 0.5} y={y + 0.5} width={CELL - 1} height={CELL - 1} fill="var(--domain)" />
                );
              })}
              {frac > 0 && (
                <rect x={0.5} y={TOP + 0.5} width={Math.max(fracW, 0.15)} height={CELL - 1} fill="var(--domain)" />
              )}
              {/* coffee's amount: one square, always outlined */}
              <rect
                x={0.5}
                y={TOP + 0.5}
                width={CELL - 1}
                height={CELL - 1}
                fill="none"
                stroke="var(--fg)"
                strokeWidth={0.8}
              />
              <text x={0} y={TOP + 2 * FLAT + GAP + 16} className={s.note}>
                {frac > 0
                  ? `Now ${frac >= 0.1 ? "a tenth" : "a hundredth"} of the outlined square`
                  : "▪ = hydrogen ions in a cup of black coffee"}
              </text>
            </svg>

            <Slider
              label="pH"
              value={ph}
              min={2}
              max={7}
              disabled={locked}
              onChange={(v) => {
                setPh(v);
                setLowest((l) => Math.min(l, v));
                interact();
              }}
            />
            <Row>
              <Readout label="Liquid" value={LABELS[ph] ?? "—"} />
              <Readout label="Steps from coffee" value={Math.abs(ph - REF_PH)} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
