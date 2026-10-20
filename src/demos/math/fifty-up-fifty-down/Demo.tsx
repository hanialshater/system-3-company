"use client";

// Up p%, then down p%. The start price is a unit square (100). The rise stretches the
// width to 1 + p; the fall cuts the height to 1 - p. Final price = area = 1 - p^2.
// The dashed square is where you started; the corner p x p piece is what you never
// get back, because the fall is a percentage of the bigger, risen price.
//   p = 25%: 125 -> 93.75   p = 50%: 150 -> 75   p = 75%: 175 -> 43.75

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const S = 120; // px for the start price (100)
const X0 = 22;
const Y0 = 196; // bottom edge
const W = 260;
const H = 212;

const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(2).replace(/0$/, ""));

export default function FiftyUpFiftyDown({ slug }: { slug: string }) {
  const [pct, setPct] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A jacket you want costs 100. Its price rises 50%, then a week later falls 50%. What does it cost now?",
        options: ["100", "75", "125"],
        answer: 1,
      }}
      exploreHint="Slide to 50% and compare the shape with the dashed start."
      reveal={() => (
        <>
          <p>
            It ends at <strong>75</strong>. The rise was 50% of 100, so +50, up to 150. The fall was 50% of 150, so −75.
            Same percentage, bigger base.
          </p>
          <p>
            In the picture the fall cut a band off the top, across the whole risen width. It cut 75, not 50, because 50%
            of 150 is more than 50% of 100. The extra 25 is the corner you never get back, and some corner is always
            lost: even 10% up then 10% down ends at 99.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} pct={pct} setPct={setPct} />}
    </Lesson>
  );
}

function Stage({ locked, interact, pct, setPct }: StageContext & { pct: number; setPct: (n: number) => void }) {
  const fired = useRef(false);
  useEffect(() => {
    if (!locked && pct === 50 && !fired.current) {
      fired.current = true;
      interact();
    }
  }, [locked, pct, interact]);

  const p = pct / 100;
  const risen = 100 * (1 + p);
  const final = 100 * (1 - p) * (1 + p);
  const w = S * (1 + p);
  const h = S * (1 - p);
  const top = Y0 - S;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Price after up ${pct}% then down ${pct}%: ${fmt(final)}`}>
        {/* the fall: a band of height p across the risen width */}
        {pct > 0 && <rect x={X0} y={top} width={w} height={S - h} className={s.cut} />}
        {/* final price */}
        <rect x={X0} y={Y0 - h} width={w} height={h} className={s.final} />
        {/* the corner you never get back */}
        {pct > 0 && <rect x={X0 + S} y={top} width={w - S} height={S - h} className={s.corner} />}
        {/* where you started */}
        <rect x={X0} y={top} width={S} height={S} className={s.start} />

        <text x={X0 + S / 2} y={Y0 - h / 2} textAnchor="middle" dominantBaseline="middle" className={s.big}>
          ends {fmt(final)}
        </text>
        {pct >= 25 && (
          <>
            {/* the rise: the strip added on the right */}
            <text x={X0 + S + (w - S) / 2} y={Y0 - h / 2 - 7} textAnchor="middle" dominantBaseline="middle" className={s.gainLabel}>
              rise
            </text>
            <text x={X0 + S + (w - S) / 2} y={Y0 - h / 2 + 6} textAnchor="middle" dominantBaseline="middle" className={s.gainLabel}>
              +{fmt(100 * p)}
            </text>
            {/* the fall: the band cut off the top, across the risen width */}
            <text x={X0 + S / 2} y={top + (S - h) / 2} textAnchor="middle" dominantBaseline="middle" className={s.cutLabel}>
              fall −{fmt(risen - final)}
            </text>
            <text x={X0 + S + (w - S) / 2} y={top - 6} textAnchor="middle" className={s.cornerLabel}>
              lost {fmt(100 * p * p)}
            </text>
          </>
        )}
        <text x={X0} y={top - 6} className={s.startLabel}>
          start 100
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : pct === 0
            ? "Start at 100. Slide to raise, then cut, by the same %."
            : `Up ${pct}%: ${fmt(risen)}. Down ${pct}% of ${fmt(risen)}: ${fmt(final)}.`}
      </p>

      <Slider
        label="Up, then down, by"
        value={pct}
        min={0}
        max={75}
        step={25}
        disabled={locked}
        format={(v) => `${v}%`}
        onChange={setPct}
      />
    </div>
  );
}
