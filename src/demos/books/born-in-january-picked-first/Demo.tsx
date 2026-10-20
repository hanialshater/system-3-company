"use client";

// Born in January, picked first (Outliers, Gladwell 2008; brief company/domains/briefs/books.md #3).
// The lesson's model (analytic, deterministic, no randomness): births spread evenly over the 12 months;
// a child born k months after the cutoff is 11.5 − k months older than the youngest in the band;
// height = base + 0.5 cm per month of that age + Normal(0, 5.5 cm). Picking the top share is a height
// threshold t (found by bisection) with mean over months of P(height > t) = share. Picks per month are
// proportional to P(height > t | month). Top 10%, 1 January cutoff: Jan–Mar 43.9%, Oct–Dec 10.1%.
// Top 50%: Jan–Mar 32.9%.
// Controls (DOM order): [Pick top 10%] [Pick top 50%], then cutoff months Jan, Apr, Jul, Oct.
// Milestones: "jan10" (top 10% with the 1 January cutoff: the question's case, share recorded),
// "half" (top 50% shown: share recorded), "moved" (a picked chart under a cutoff other than January:
// cutoff and peak month recorded). Record lines keep all three on the stage after later presses.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SD = 5.5;
const GROWTH = 0.5;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CUTOFFS = [0, 3, 6, 9];
const MILESTONES = ["jan10", "half", "moved"] as const;

function erf(x: number) {
  const sg = Math.sign(x);
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return sg * y;
}
const above = (z: number) => 0.5 * (1 - erf(z / Math.SQRT2));

/** Share of picks by months after the cutoff (k = 0..11), for picking the top `top` of the band. */
function picksByK(top: number) {
  const mu = (k: number) => GROWTH * (11.5 - k);
  const frac = (t: number) => MONTHS.reduce((acc, _, k) => acc + above((t - mu(k)) / SD), 0) / 12;
  let lo = -50;
  let hi = 50;
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2;
    if (frac(m) > top) lo = m;
    else hi = m;
  }
  const p = MONTHS.map((_, k) => above((lo - mu(k)) / SD));
  const sum = p.reduce((a, b) => a + b, 0);
  return p.map((x) => x / sum);
}
const PICKS: Record<number, number[]> = { 10: picksByK(0.1), 50: picksByK(0.5) };
/** Share of picks by calendar month (0 = January) for a cutoff month and a top share (0 = nobody picked yet). */
function byMonth(cutoff: number, top: number) {
  if (!top) return MONTHS.map(() => 1 / 12);
  return MONTHS.map((_, cal) => PICKS[top][(cal - cutoff + 12) % 12]);
}
const firstThree = (top: number) => PICKS[top][0] + PICKS[top][1] + PICKS[top][2];
const pct = (v: number) => `${Math.round(v * 100)}%`;

// Geometry (viewBox 320 × 160).
const XL = 30;
const XR = 314;
const YT = 24;
const YB = 112;
const YMAX = 0.18;
const BW = (XR - XL) / 12;
const py = (v: number) => YB - (v / YMAX) * (YB - YT);

type Rec = { jan10?: number; half?: number; moved?: { cutoff: number } };

export default function BornInJanuaryPickedFirst({ slug }: { slug: string }) {
  const [cutoff, setCutoff] = useState(0);
  const [top, setTop] = useState(0);
  const [rec, setRec] = useState<Rec>({});
  const shares = byMonth(cutoff, top);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your local league picks the tallest 10% of its 9-year-olds for the top team. The age cutoff is 1 January. About what share of the picks were born January to March?",
        options: ["About 25%", "About 45%", "About 75%"],
        answer: 1,
      }}
      exploreHint="Pick the top 10%, then the top 50%, then move the cutoff."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{pct(rec.jan10 ?? 0.439)}</strong> of the picks were born in the first three months after the cutoff, where a fair
            split would give 25%. Picking the top half shrank that to {pct(rec.half ?? 0.329)}. When you moved the cutoff, the peak moved
            with it, so it is the calendar doing the picking, not talent.
          </p>
          <p>
            <em>Outliers</em> argues that this is how Canadian hockey&apos;s elite came to skew toward early-year birthdays. Does it hold
            up? Yes: the relative age effect is one of sport science&apos;s best-replicated findings.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const show = (c: number, t: number) => {
              setCutoff(c);
              setTop(t);
              if (!t) return;
              if (c === 0 && t === 10) {
                setRec((x) => (x.jan10 === undefined ? { ...x, jan10: firstThree(10) } : x));
                reach("jan10");
              }
              if (t === 50) {
                setRec((x) => (x.half === undefined ? { ...x, half: firstThree(50) } : x));
                reach("half");
              }
              if (c !== 0) {
                setRec((x) => (x.moved === undefined ? { ...x, moved: { cutoff: c } } : x));
                reach("moved");
              }
            };
            const share3 = top ? firstThree(top) : 0.25;
            const after3 = [0, 1, 2].map((k) => MONTHS[(cutoff + k) % 12]);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: +0.5 cm per month older, ±5.5 cm spread</p>
                <svg
                  viewBox="0 0 320 142"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    locked || !top
                      ? "Birth months of all children in the band: equal"
                      : `Birth months of the top ${top}% with a 1 ${MONTHS[cutoff]} cutoff`
                  }
                >
                  <line x1={XL} y1={YB} x2={XR} y2={YB} className={s.edge} />
                  {[0.05, 0.1, 0.15].map((v) => (
                    <text key={v} x={XL - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                      {Math.round(v * 100)}%
                    </text>
                  ))}
                  {!locked &&
                    after3.map((_, k) => (
                      <rect
                        key={`h${k}`}
                        x={XL + ((cutoff + k) % 12) * BW}
                        y={YT - 2}
                        width={BW}
                        height={YB - YT + 2}
                        className={s.band}
                      />
                    ))}
                  {shares.map((v, cal) => (
                    <g key={cal}>
                      <rect
                        x={XL + cal * BW + 2}
                        y={py(v)}
                        width={BW - 4}
                        height={YB - py(v)}
                        className={!locked && top && [0, 1, 2].includes((cal - cutoff + 12) % 12) ? s.barHot : s.bar}
                      />
                      <text x={XL + cal * BW + BW / 2} y={YB + 13} textAnchor="middle" className={s.axis}>
                        {MONTHS[cal][0]}
                      </text>
                    </g>
                  ))}
                  <line x1={XL} y1={py(1 / 12)} x2={XR} y2={py(1 / 12)} className={s.fair} />
                  <text x={XL} y={YB + 27} className={s.axis}>
                    birth months
                  </text>
                  <line x1={XR - 92} y1={YB + 23} x2={XR - 72} y2={YB + 23} className={s.fair} />
                  <text x={XR} y={YB + 27} textAnchor="end" className={s.axis}>
                    equal share
                  </text>
                  {!locked && top > 0 && (
                    <text
                      x={cutoff === 9 ? XR : cutoff === 0 ? XL : XL + (cutoff + 1.5) * BW}
                      y={YT - 8}
                      textAnchor={cutoff === 9 ? "end" : cutoff === 0 ? "start" : "middle"}
                      className={s.share}
                    >
                      {pct(share3)} born {after3[0]}–{after3[2]}
                    </text>
                  )}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {!locked && rec.jan10 !== undefined && <span>1 Jan, top 10%: {pct(rec.jan10)} born Jan–Mar</span>}
                  {!locked && rec.jan10 !== undefined && rec.half !== undefined && " · "}
                  {!locked && rec.half !== undefined && <span>top 50%: {pct(rec.half)}</span>}
                </p>
                <Row>
                  <Control className={top === 10 ? "active" : ""} disabled={locked || top === 10} onClick={() => show(cutoff, 10)}>
                    Pick top 10%
                  </Control>
                  <Control className={top === 50 ? "active" : ""} disabled={locked || top === 50} onClick={() => show(cutoff, 50)}>
                    Pick top 50%
                  </Control>
                </Row>
                <Row>
                  {CUTOFFS.map((c) => (
                    <Control
                      key={c}
                      aria-label={`Cutoff 1 ${MONTHS[c]}`}
                      className={cutoff === c ? "active" : ""}
                      disabled={locked || cutoff === c}
                      onClick={() => show(c, top)}
                    >
                      1 {MONTHS[c]}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
