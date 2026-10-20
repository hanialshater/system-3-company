"use client";

// Adversarial nudges on a linear classifier. 100 pixels, each weight 1; "cat" if the sum is
// above 50. The image sums to 50.5. Lowering n pixels by eps each lowers the sum by n * eps,
// so 100 pixels at 0.01 lower it by 1.0 and the label flips (49.5). The smallest flipping
// nudge with all 100 pixels is 0.5 / 100 = 0.005 (sum exactly 50, which is not above 50).
// All arithmetic is in thousandths so comparisons are exact.

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32, randInt } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const N = 100; // pixels
const START_SUM = 50500; // thousandths: 50.5
const THRESHOLD = 50000; // "cat" if sum > 50.0
const SEED = 7; // untuned: only sets the grey pattern; the sum is fixed to 50.5 below

/** Pixel values in thousandths (0..1000), seeded, adjusted so they sum to exactly 50.5. */
function makeImage(): number[] {
  const rng = mulberry32(SEED);
  const v = Array.from({ length: N }, () => randInt(rng, 200, 800));
  let diff = START_SUM - v.reduce((a, b) => a + b, 0);
  for (let i = 0; diff !== 0; i = (i + 1) % N) {
    const step = Math.sign(diff) * Math.min(Math.abs(diff), 20);
    v[i] += step;
    diff -= step;
  }
  return v;
}

/** Sum after lowering the first `count` pixels by `eps` thousandths each. */
const sumAfter = (count: number, eps: number) => START_SUM - count * eps;
const isCat = (sum: number) => sum > THRESHOLD;
// MODEL END

const f2 = (thousandths: number) => (thousandths / 1000).toFixed(2);
const pct = (eps: number) => `${(eps / 10).toFixed(1)}%`;

// Meter geometry: sums 49.0 .. 51.0 across x = 30 .. 290.
const MX0 = 30;
const MX1 = 290;
const mx = (sum: number) => MX0 + ((Math.min(51000, Math.max(49000, sum)) - 49000) / 2000) * (MX1 - MX0);

export default function PixelNudgesAddUp({ slug }: { slug: string }) {
  const image = useMemo(makeImage, []);
  const [eps, setEps] = useState(0); // thousandths per pixel, 0..10 (0% .. 1%)
  const [count, setCount] = useState(N);
  const sum = sumAfter(count, eps);
  const cat = isCat(sum);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["flipped"]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A toy classifier adds up 100 pixel values and says 'cat' if the sum is above 50. Your photo sums to 50.5. You darken every pixel by 0.01 (1% of its range), too little to see. What happens to the label?",
        options: ["Stays 'cat'", "Flips", "Becomes undefined"],
        answer: 1,
      }}
      exploreHint="Nudge every pixel 1%, then hunt for the smallest nudge that still flips it."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Each pixel moved 1%, about 2.5 grey levels out of 255: hard to spot. But the classifier adds them all,
            so the sum fell by 100 × 0.01 = <strong>1.0</strong>, twice the 0.5 margin, to {f2(sumAfter(N, 10))}. Not above
            50: <strong>not cat</strong>.
          </p>
          <p>
            With all 100 pixels, 0.5% each (0.005) is already enough. With 50 pixels it takes 1%. The more inputs, the less
            each one has to move: a 224 × 224 colour image has 150,528 inputs, and the same 0.5 margin would need about
            0.000003 each.
          </p>
          <p className="muted">
            Toy model, one weight per pixel. Real image classifiers are not this simple, but researchers have fooled them
            with changes too small to see, and this adding-up is one explanation offered.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const update = (e: number, c: number) => {
          setEps(e);
          setCount(c);
          if (!isCat(sumAfter(c, e))) reach("flipped");
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 214" className="stage-svg" role="img" aria-label={`Pixel sum ${f2(sum)}: ${cat ? "cat" : "not cat"}`}>
              <text x={160} y={13} textAnchor="middle" className={s.small} fill="var(--muted)">
                Toy model: cat if the 100 pixels add up to more than 50
              </text>
              {image.map((v, i) => {
                const nudged = i < count ? v - eps : v;
                const g = Math.round((nudged / 1000) * 255);
                return (
                  <rect
                    key={i}
                    x={22 + (i % 10) * 14}
                    y={24 + Math.floor(i / 10) * 14}
                    width={13}
                    height={13}
                    fill={`rgb(${g},${g},${g})`}
                  />
                );
              })}
              <text x={242} y={140} textAnchor="middle" className={s.small} fill="var(--muted)">
                {count} pixels darkened {pct(eps)}
              </text>
              <g>
                <rect x={180} y={64} width={124} height={56} rx={12} fill={cat ? "var(--good)" : "var(--bad)"} opacity={0.2} />
                <text x={242} y={92} textAnchor="middle" className={s.big} fill={cat ? "var(--good)" : "var(--bad)"}>
                  {cat ? "cat" : "not cat"}
                </text>
                <text x={242} y={110} textAnchor="middle" className={s.small} fill="var(--fg)">
                  sum {f2(sum)}
                </text>
              </g>
              <line x1={MX0} y1={196} x2={MX1} y2={196} stroke="var(--line)" strokeWidth={6} strokeLinecap="round" />
              <line x1={mx(THRESHOLD)} y1={186} x2={mx(THRESHOLD)} y2={206} stroke="var(--fg)" strokeWidth={2} />
              <text x={mx(THRESHOLD)} y={184} textAnchor="middle" className={s.tiny} fill="var(--fg)">
                50
              </text>
              <text x={MX0} y={212} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                49
              </text>
              <text x={MX1} y={212} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                51
              </text>
              <circle cx={mx(sum)} cy={196} r={7} fill={cat ? "var(--good)" : "var(--bad)"} stroke="var(--fg)" strokeWidth={1.5} />
            </svg>
            <Row>
              <Control disabled={locked || (eps === 10 && count === N)} onClick={() => update(10, N)}>
                Darken all 100 by 1%
              </Control>
              <Readout label="Total change" value={f2(count * eps)} />
            </Row>
            <Slider label="Darken each by" value={eps} min={0} max={10} format={pct} disabled={locked} onChange={(v) => update(v, count)} />
            <Slider label="Pixels darkened" value={count} min={0} max={N} disabled={locked} onChange={(v) => update(eps, v)} />
          </div>
        );
      }}
    </Lesson>
  );
}
