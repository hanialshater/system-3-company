"use client";

// Savings outlast the division. $500,000 earning g% a year; at the end of each year it grows, then you
// withdraw W. Lasts n = −ln(1 − rP/W) / ln(1 + r) years (P / W at 0%), forever if W ≤ rP.
// At 5%: $40k lasts 20.1 years (20 full withdrawals, part of a 21st); $25k (the interest) keeps the pot
// at $500,000; at 0% growth $40k lasts 12.5 years, the division answer.
// Picture: the balance over 0 to 40 years; the year it hits zero is marked with a dot. Each recorded
// preset stays as a dashed trace with its label, so the reveal's numbers are on the stage at the reveal.
// Controls (DOM order): [$40k a year] [$25k a year] [0% growth] presets, then a withdrawal slider
// ($20k to $60k, steps of $5k; keeps the current growth rate).
// Milestones: "forty" ($40k at 5%), "interest" ($25k at 5%), "zero" ($40k at 0%). The brief marks the third
// optional; it is required here because the reveal names 12.5.
// Model: a steady, made-up 5%; end-of-year withdrawals; no inflation, taxes or fees; not a plan or advice.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const POT = 500; // $ thousands
const YEARS = 40;
const MILESTONES = ["forty", "interest", "zero"] as const;
type Case = { w: number; g: number };
const CASES: Record<(typeof MILESTONES)[number], Case> = {
  forty: { w: 40, g: 5 },
  interest: { w: 25, g: 5 },
  zero: { w: 40, g: 0 },
};

/** Years until the pot is empty (fractional), or Infinity. */
function life(w: number, g: number) {
  const r = g / 100;
  if (r === 0) return POT / w;
  if (w <= r * POT) return Infinity;
  return -Math.log(1 - (r * POT) / w) / Math.log(1 + r);
}
/** Year-end balances until empty, then the zero point. */
function path(w: number, g: number) {
  const n = life(w, g);
  const pts: [number, number][] = [[0, POT]];
  let b = POT;
  for (let t = 1; t <= YEARS && t <= n; t++) {
    b = b * (1 + g / 100) - w;
    pts.push([t, Math.max(0, b)]);
  }
  if (n <= YEARS && pts[pts.length - 1][0] < n) pts.push([n, 0]);
  return { n, pts };
}
const lasts = (n: number) => (n === Infinity ? "never runs out" : `${(Math.round(n * 10) / 10).toFixed(1)} years`);
const one = (n: number) => (Math.round(n * 10) / 10).toFixed(1);
const yr = (n: number) => (n === Infinity ? "never" : `${one(n)} yr`);

// Geometry (viewBox 320 × 170).
const XL = 46;
const XR = 300;
const YT = 12;
const YB = 140;
const BMAX = 600;
const px = (t: number) => XL + (t / YEARS) * (XR - XL);
const py = (b: number) => YB - (Math.min(b, BMAX) / BMAX) * (YB - YT);
const pts = (p: [number, number][]) => p.map(([t, b]) => `${px(t)},${py(b)}`).join(" ");

export default function SavingsOutlastTheDivision({ slug }: { slug: string }) {
  const [w, setW] = useState(30);
  const [g, setG] = useState(5);
  const [shown, setShown] = useState(false);
  const [seen, setSeen] = useState<Record<string, number>>({});
  const cur = path(w, g);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "$500,000 saved, earning 5% a year. You take out $40,000 at the end of each year. The money runs out after about…",
        options: ["12 years", "20 years", "never"],
        answer: 1,
      }}
      exploreHint="Try all three presets and watch where each line hits zero."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Taking $40,000 a year, the money lasted <strong>{lasts(seen.forty ?? life(40, 5))}</strong>, not {one(seen.zero ?? 12.5)}:
            in year 1 the pot earned $25,000, so it shrank by only $15,000. Each year it earns a little less, so the end speeds up.
          </p>
          <p>
            Taking $25,000, exactly the interest, it never shrank. Division is only right when the money earns nothing. A steady 5% is a
            made-up rate; real returns vary.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (nw: number, ng: number) => {
              setW(nw);
              setG(ng);
              setShown(true);
              for (const name of MILESTONES) {
                const c = CASES[name];
                if (c.w === nw && c.g === ng) {
                  setSeen((x) => (name in x ? x : { ...x, [name]: life(nw, ng) }));
                  reach(name);
                }
              }
            };
            const on = !locked && shown;
            const is = (c: Case) => on && w === c.w && g === c.g;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Grows {g}% a year, then you withdraw.</p>
                <Row>
                  <Readout label="Withdraw" value={on ? `$${w}k a year` : "?"} />
                  <Readout label="Lasts" value={on ? lasts(cur.n) : "?"} />
                </Row>
                <svg
                  viewBox="0 0 320 170"
                  className="stage-svg"
                  role="img"
                  aria-label={on ? `$${w}k a year at ${g}%: lasts ${lasts(cur.n)}` : "Balance over 40 years"}
                >
                  <line x1={XL} y1={YB} x2={XR} y2={YB} className={s.edge} />
                  <line x1={XL} y1={YB} x2={XL} y2={YT} className={s.edge} />
                  {[0, 10, 20, 30, 40].map((t) => (
                    <text key={t} x={px(t)} y={YB + 14} textAnchor="middle" className={s.axis}>
                      {t}
                    </text>
                  ))}
                  <text x={XR} y={YB + 27} textAnchor="end" className={s.axis}>
                    years
                  </text>
                  <clipPath id="sotd-plot">
                    <rect x={XL} y={YT} width={XR - XL} height={YB - YT + 6} />
                  </clipPath>
                  {[0, 250, 500].map((v) => (
                    <g key={v}>
                      {v > 0 && <line x1={XL} y1={py(v)} x2={XR} y2={py(v)} className={s.grid} />}
                      <text x={XL - 5} y={py(v) + 4} textAnchor="end" className={s.axis}>
                        {v === 0 ? "$0" : `$${v}k`}
                      </text>
                    </g>
                  ))}
                  {!locked &&
                    MILESTONES.filter((m) => m in seen).map((m) => {
                      const c = CASES[m];
                      const p = path(c.w, c.g);
                      const end = p.pts[p.pts.length - 1];
                      return (
                        <g key={m}>
                          {!is(c) && <polyline points={pts(p.pts)} className={s.ghost} clipPath="url(#sotd-plot)" />}
                          {p.n === Infinity ? (
                            <text x={XR} y={py(POT) - 6} textAnchor="end" className={s.value}>
                              ${c.w}k: never
                            </text>
                          ) : (
                            <text x={px(end[0]) + 4} y={c.g === 0 ? YB - 6 : YB - 22} className={s.value}>
                              {c.g === 0 ? "0%: " : `$${c.w}k: `}
                              {yr(p.n)}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  {on && (
                    <g>
                      <polyline points={pts(cur.pts)} className={s.line} clipPath="url(#sotd-plot)" />
                      {cur.n <= YEARS && <circle cx={px(cur.n)} cy={YB} r={5} className={s.dot} />}
                    </g>
                  )}
                </svg>
                <Row>
                  <Control className={is(CASES.forty) ? "active" : ""} disabled={locked || is(CASES.forty)} onClick={() => set(40, 5)}>
                    $40k a year
                  </Control>
                  <Control className={is(CASES.interest) ? "active" : ""} disabled={locked || is(CASES.interest)} onClick={() => set(25, 5)}>
                    $25k a year
                  </Control>
                  <Control className={on && g === 0 ? "active" : ""} disabled={locked || is(CASES.zero)} onClick={() => set(40, 0)}>
                    0% growth
                  </Control>
                </Row>
                <Slider
                  label="Withdraw"
                  value={w}
                  min={20}
                  max={60}
                  step={5}
                  format={(v) => `$${v}k`}
                  disabled={locked}
                  onChange={(v) => set(v, g)}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
