"use client";

// Breeder's-equation toy: 40 made-up plants with heights at the 40 evenly spaced quantiles of a
// normal curve (mean 100 cm, spread 10 cm), no randomness. The tallest 15 are kept for breeding
// (their mean is 110.0 cm). With heritability h2 (the share of height differences due to genes)
// the offspring mean is 100 + h2 x (kept mean - 100): R = h2 S (additive genes, random crossing
// among the kept plants). Offspring are drawn with the same spread as the parents, for illustration.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const MEAN = 100, SD = 10, N = 40, KEEP = 15, Q_H = 0.4;
const HS = [0.4, 0, 1] as const;
const MILESTONES = ["h-40", "other-h"] as const;

// inverse normal CDF (Acklam's rational approximation; error < 1.2e-9)
function qnorm(p: number): number {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const lo = 0.02425;
  if (p < lo) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - lo) return -qnorm(1 - p);
  const q = p - 0.5, r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
const Z = Array.from({ length: N }, (_, i) => qnorm((i + 0.5) / N));
const PARENTS = Z.map((z) => MEAN + SD * z);
const KEPT_MEAN = PARENTS.slice(N - KEEP).reduce((a, x) => a + x, 0) / KEEP; // 110.04
const S_DIFF = KEPT_MEAN - MEAN;
const offMean = (h: number) => MEAN + h * S_DIFF;
const cm = (x: number) => `${Math.round(x)} cm`;

const X0 = 66, X1 = 134, W = 320;
const px = (h: number) => 10 + ((h - X0) / (X1 - X0)) * (W - 20);

function Stage({ locked, h, onH }: { locked: boolean; h: number | null; onH: (h: number) => void }) {
  const msg = locked
    ? "Toy plants: height is part genes, part soil and luck. Filled dots: the plants kept for breeding."
    : h === null
      ? `Kept plants average ${cm(KEPT_MEAN)}; the field averages ${cm(MEAN)}. Pick how much is inherited.`
      : `${Math.round(100 * h)}% inherited: offspring average ${cm(offMean(h))}.`;
  const tick = (x: number, y: number, label: string, cls: string) => (
    <g>
      <line x1={px(x)} x2={px(x)} y1={y - 16} y2={y + 16} className={cls} />
      <text x={px(x)} y={y - 20} textAnchor="middle" className={s.small}>{label}</text>
    </g>
  );
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} 190`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        <text x={10} y={14} className={s.small}>parents</text>
        {PARENTS.map((x, i) => (
          <circle key={i} cx={px(x)} cy={58 + ((i % 3) - 1) * 7} r={3.4} className={i >= N - KEEP ? s.on : s.hollow} />
        ))}
        {tick(MEAN, 58, "100", s.mark)}
        {tick(KEPT_MEAN, 58, `kept ${Math.round(KEPT_MEAN)}`, s.keep)}
        <text x={10} y={108} className={s.small}>offspring</text>
        {h !== null && Z.map((z, i) => <circle key={i} cx={px(offMean(h) + SD * z)} cy={150 + ((i % 3) - 1) * 7} r={3.4} className={s.half} />)}
        {tick(MEAN, 150, "100", s.mark)}
        {h !== null && tick(offMean(h), 150, `${Math.round(offMean(h))}`, s.keep)}
        <line x1={10} x2={W - 10} y1={182} y2={182} className={s.line} />
        {[70, 85, 100, 115, 130].map((v) => (
          <text key={v} x={px(v)} y={190} textAnchor="middle" className={s.axis}>{v} cm</text>
        ))}
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {HS.map((v) => (
          <Control key={v} className={h === v ? "active" : ""} disabled={locked || h === v} onClick={() => onH(v)}>
            {Math.round(100 * v)}% inherited
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function OffspringRegress({ slug }: { slug: string }) {
  const [h, setH] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Made-up plants average ${cm(MEAN)}. Only the tallest, averaging ${cm(KEPT_MEAN)}, are crossed. ${Math.round(100 * Q_H)}% of the height differences are inherited; the rest is soil, sun and luck. Their offspring average about:`,
        options: [cm(KEPT_MEAN), cm(offMean(Q_H)), cm(MEAN)],
        answer: 1,
      }}
      exploreHint="Try 40% inherited, then 0% or 100%. Watch where the offspring land."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const others = tried.filter((v) => v !== Q_H);
        return (
          <>
            <p>
              The kept plants stood {Math.round(S_DIFF)} cm above the field. At {Math.round(100 * Q_H)}% inherited their offspring averaged{" "}
              <strong>{cm(offMean(Q_H))}</strong>
              {others.length ? `; at ${others.map((v) => `${Math.round(100 * v)}%, ${cm(offMean(v))}`).join("; at ")}` : ""}.
            </p>
            <p>
              Part of the parents' extra height was good soil and luck, which seeds do not inherit. Only the inherited share of the gap passes
              on: {Math.round(100 * Q_H)}% of {Math.round(S_DIFF)} cm is {Math.round(Q_H * S_DIFF)} cm. Breeders write it as response =
              heritability x selection.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              h={h}
              onH={(v) => {
                setH(v);
                setTried((t) => (t.includes(v) ? t : [...t, v]));
                reach(v === Q_H ? "h-40" : "other-h");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
