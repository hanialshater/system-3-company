"use client";

// Flat rate costs nearly double. $10,000 at "10% flat" for 2 years: interest 10% × $10,000 × 2 = $2,000,
// repaid as 24 × $500. The true monthly rate solving 10,000 = 500 × (1 − (1 + r)^−24) / r is 1.513%,
// 18.16% a year (12 × r, APR convention). A true 10% APR loan: $461.45 a month, $1,074.78 interest.
// Picture: what you still owe, month by month (a falling staircase, at the loan's own true rate), and
// the interest charged each month as thin bars under it. Flat: bars stay level at $83.33. True: they
// shrink with the balance.
// Controls (DOM order): [Flat 10%] [True 10%] presets, then a term slider (1 to 3 years, starts at 2).
// Milestones: "flat" (Flat 10% at 2 years: interest, true rate, owed at month 12 recorded) and "true"
// (True 10% at 2 years: payment and interest recorded). Once recorded, the flat 2-year picture stays as a
// dashed ghost when anything else is shown.
// Model: a made-up loan, level monthly payments, no fees; not any lender.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LOAN = 10000;
const QUOTE = 0.1;
const Q_YEARS = 2;
const MILESTONES = ["flat", "true"] as const;
type Mode = "flat" | "true";

/** Monthly rate r with LOAN = pay × (1 − (1 + r)^−n) / r, by bisection. */
function solveRate(n: number, pay: number) {
  let lo = 1e-7;
  let hi = 0.1;
  for (let i = 0; i < 200; i++) {
    const r = (lo + hi) / 2;
    const pv = (pay * (1 - (1 + r) ** -n)) / r;
    if (pv > LOAN) lo = r;
    else hi = r;
  }
  return (lo + hi) / 2;
}

/** The loan's months: balance after each payment (at its true rate) and the interest charged each month. */
function loan(mode: Mode, years: number) {
  const n = 12 * years;
  let pay: number;
  let r: number;
  if (mode === "flat") {
    pay = (LOAN + LOAN * QUOTE * years) / n;
    r = solveRate(n, pay);
  } else {
    r = QUOTE / 12;
    pay = (LOAN * r) / (1 - (1 + r) ** -n);
  }
  const bal = [LOAN];
  const charged: number[] = [];
  for (let m = 1; m <= n; m++) {
    charged.push(mode === "flat" ? (LOAN * QUOTE) / 12 : bal[m - 1] * r);
    bal.push(Math.max(0, bal[m - 1] * (1 + r) - pay));
  }
  return { n, pay, apr: 12 * r, interest: pay * n - LOAN, bal, charged };
}

const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const pct = (v: number) => `${(Math.round(v * 1000) / 10).toFixed(1)}%`;

// Geometry (viewBox 320 × 176).
const XL = 40;
const XR = 308;
const YT = 16;
const YB = 96;
const BAR0 = 150; // interest bar baseline
const BARH = 0.36; // px per dollar of monthly interest
const MMAX = 36;
const px = (m: number) => XL + (m / MMAX) * (XR - XL);
const py = (b: number) => YB - (b / LOAN) * (YB - YT);

function stairPath(bal: number[]) {
  let d = `M ${px(0)} ${py(bal[0])}`;
  for (let m = 1; m < bal.length; m++) d += ` H ${px(m)} V ${py(bal[m])}`;
  return d;
}

type FlatRec = { interest: number; apr: number; owed12: number };
type TrueRec = { pay: number; interest: number };

const FLAT_Q = loan("flat", Q_YEARS);

export default function FlatRateCostsNearlyDouble({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [years, setYears] = useState(Q_YEARS);
  const [fr, setFr] = useState<FlatRec | null>(null);
  const [tr, setTr] = useState<TrueRec | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Borrow $10,000 at '10% flat' for 2 years: $2,000 interest, 24 payments of $500. The true yearly rate on what you owe is about…",
        options: ["10%", "14%", "18%"],
        answer: 2,
      }}
      exploreHint="Show the flat loan, then a true 10% loan, and compare the interest bars."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            A flat 10% charged <strong>{usd(fr?.interest ?? 2000)}</strong>: 10% of the full $10,000, both years. But you repaid as you went:
            by month 12 you owed {usd(fr?.owed12 ?? 5449)}, yet the interest bars stayed at $83 a month, as if you still owed $10,000. On
            what you actually owed, that is <strong>{pct(fr?.apr ?? 0.1816)}</strong> a year.
          </p>
          <p>
            A true 10% loan, charged on what is left, cost {usd(tr?.interest ?? 1075)} in interest: about half. A made-up loan with level
            payments and no fees.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const show = (nm: Mode | null, ny: number) => {
              setMode(nm);
              setYears(ny);
              if (ny !== Q_YEARS || nm === null) return;
              const l = loan(nm, ny);
              if (nm === "flat") {
                setFr((x) => x ?? { interest: l.interest, apr: l.apr, owed12: l.bal[12] });
                reach("flat");
              } else {
                setTr((x) => x ?? { pay: l.pay, interest: l.interest });
                reach("true");
              }
            };
            const cur = mode ? loan(mode, years) : null;
            const isQFlat = mode === "flat" && years === Q_YEARS;
            const ghost = fr !== null && !isQFlat;
            const bw = Math.max(1, (XR - XL) / MMAX - 2);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Flat: interest on the full $10,000, every month.</p>
                <Row>
                  <Readout label="Payment" value={locked || !cur ? "?" : usd(cur.pay)} />
                  <Readout label="Interest" value={locked || !cur ? "?" : usd(cur.interest)} />
                  <Readout label="True rate" value={locked || !cur ? "?" : pct(cur.apr)} />
                </Row>
                <svg
                  viewBox="0 0 320 176"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    locked || !cur
                      ? "What you owe each month, and the interest charged"
                      : `${mode === "flat" ? "Flat 10%" : "True 10%"}, ${years} years: true rate ${pct(cur.apr)}`
                  }
                >
                  <line x1={XL} y1={YB} x2={XR} y2={YB} className={s.edge} />
                  <line x1={XL} y1={BAR0} x2={XR} y2={BAR0} className={s.edge} />
                  <text x={XL - 4} y={py(LOAN) + 4} textAnchor="end" className={s.axis}>
                    $10k
                  </text>
                  <text x={XL - 4} y={YB + 4} textAnchor="end" className={s.axis}>
                    $0
                  </text>
                  <text x={XL} y={YT - 4} className={s.axis}>
                    owed
                  </text>
                  <text x={XL} y={YB + 18} className={s.axis}>
                    interest each month
                  </text>
                  {[0, 12, 24, 36].map((m) => (
                    <text key={m} x={px(m)} y={BAR0 + 15} textAnchor="middle" className={s.axis}>
                      {m}
                    </text>
                  ))}
                  <text x={XR} y={BAR0 + 26} textAnchor="end" className={s.axis}>
                    month
                  </text>

                  {!locked && ghost && (
                    <g>
                      <path d={stairPath(FLAT_Q.bal)} className={s.ghost} />
                      {FLAT_Q.charged.map((c, i) => (
                        <rect key={i} x={px(i) + 1} y={BAR0 - c * BARH} width={bw} height={c * BARH} className={s.ghostBar} />
                      ))}
                    </g>
                  )}
                  {!locked && cur && (
                    <g>
                      <path d={stairPath(cur.bal)} className={s.stair} />
                      {cur.charged.map((c, i) => (
                        <rect key={i} x={px(i) + 1} y={BAR0 - c * BARH} width={bw} height={c * BARH} className={s.bar} />
                      ))}
                    </g>
                  )}
                  {!locked && fr && (
                    <g>
                      <circle cx={px(12)} cy={py(fr.owed12)} r={4} className={s.dot} />
                      <text x={px(12) + 7} y={py(fr.owed12) - 7} className={s.value}>
                        {usd(fr.owed12)}
                      </text>
                      <text x={XR} y={BAR0 - 83.33 * BARH - 4} textAnchor="end" className={s.valueBad}>
                        flat: $83 a month
                      </text>
                    </g>
                  )}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {!locked && !fr && !tr ? "Pick a loan." : null}
                  {!locked && fr && (
                    <span style={{ display: "block" }}>
                      Flat, 2 yr: {usd(fr.interest)} interest, true {pct(fr.apr)}
                    </span>
                  )}
                  {!locked && tr && (
                    <span style={{ display: "block" }}>
                      True 10%, 2 yr: {usd(tr.interest)} interest
                    </span>
                  )}
                </p>
                <Row>
                  <Control className={mode === "flat" ? "active" : ""} disabled={locked || mode === "flat"} onClick={() => show("flat", years)}>
                    Flat 10%
                  </Control>
                  <Control className={mode === "true" ? "active" : ""} disabled={locked || mode === "true"} onClick={() => show("true", years)}>
                    True 10%
                  </Control>
                </Row>
                <Slider
                  label="Term"
                  value={years}
                  min={1}
                  max={3}
                  step={1}
                  format={(v) => `${v} yr`}
                  disabled={locked}
                  onChange={(v) => show(mode, v)}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
