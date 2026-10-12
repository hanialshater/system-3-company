"use client";

// Fee drag. One chart: $10,000 over 30 years at 7% (dashed, no fee) and the same money
// net of a yearly fee. The shaded gap is what the fee took. The learner drags the fee up
// and watches a "small" rate become a quarter of the outcome.
// Model: steady 7% gross return, fee subtracted from the return each year (1% fee → net 6%),
// no deposits, withdrawals or taxes. Real returns vary year to year.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const DEPOSIT = 10000;
const GROSS = 0.07;
const YEARS = 30;
const YMAX = 80000;

const gross = (t: number) => DEPOSIT * (1 + GROSS) ** t;
const net = (t: number, fee: number) => DEPOSIT * (1 + GROSS - fee / 100) ** t;

// Plot geometry (viewBox 320 × 200).
const L = 38;
const R = 306;
const TOP = 14;
const BOT = 172;
const px = (t: number) => L + (t / YEARS) * (R - L);
const py = (v: number) => BOT - (Math.min(v, YMAX) / YMAX) * (BOT - TOP);

const money = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const ys = Array.from({ length: YEARS + 1 }, (_, i) => i);
const pts = (f: (t: number) => number) => ys.map((t) => `${px(t).toFixed(1)},${py(f(t)).toFixed(1)}`);

export default function FeeDragGap({ slug }: { slug: string }) {
  const [fee, setFee] = useState(0);

  const top = gross(YEARS);
  const end = net(YEARS, fee);
  const lost = top - end;
  const share = (lost / top) * 100;
  const gapPath = `M${pts(gross).join(" L")} L${pts((t) => net(t, fee)).reverse().join(" L")} Z`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "$10,000 grows at 7% a year for 30 years. A fund charges 1% a year (so you net 6%). What share of the final balance do the fees cost?",
        options: ["About 1%", "About 10%", "About 25%"],
        answer: 2,
      }}
      exploreHint="Slide the fee up to 1% and watch the red gap."
      reveal={() => (
        <>
          <p>
            With no fee, $10,000 grows to <strong>$76,123</strong>. Net of a 1% fee it reaches <strong>$57,435</strong>.
            The red gap is <strong>$18,688</strong>: about <strong>24.5%</strong> of what you would have had, not 1%.
          </p>
          <p>
            A fee is a rate, so it compounds against you. Each year it takes a slice of a bigger balance, and every
            dollar it takes stops earning for the rest of the 30 years. That is why the gap widens fastest at the end.
          </p>
          <p className="muted">
            A model: a steady 7% with the fee subtracted from it, no deposits or taxes. Real returns vary. Not advice.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const set = (v: number) => {
          const f = Math.max(0, Math.min(2, Math.round(v * 4) / 4));
          setFee(f);
          if (f >= 1) interact(); // the reveal is earned at the brief's 1% fee
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="Balance over 30 years with and without a fee">
              {[20000, 40000, 60000, 80000].map((v) => (
                <g key={v}>
                  <line x1={L} y1={py(v)} x2={R} y2={py(v)} stroke="var(--line)" strokeDasharray="2 4" />
                  <text x={L - 4} y={py(v) + 4} textAnchor="end" className={s.axis}>
                    ${v / 1000}k
                  </text>
                </g>
              ))}
              <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
              {[0, 10, 20, 30].map((t) => (
                <text key={t} x={px(t)} y={BOT + 14} textAnchor={t === 0 ? "start" : t === 30 ? "end" : "middle"} className={s.axis}>
                  {t === 30 ? "30 yrs" : t}
                </text>
              ))}

              {fee > 0 && <path d={gapPath} className={s.gap} />}
              <polyline points={pts(gross).join(" ")} className={s.ghost} />
              <polyline points={pts((t) => net(t, fee)).join(" ")} className={s.net} />
              <text x={px(YEARS) - 4} y={py(top) - 6} textAnchor="end" className={s.value} fill="var(--muted)">
                no fee {money(top)}
              </text>
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked ? "Lock in a guess to start." : fee === 0 ? "No fee yet: the lines match." : `A ${fee}% fee a year.`}
            </p>

            <Row>
              <Readout label="You end with" value={locked ? "?" : money(end)} />
              <Readout label="Fees took" value={locked ? "?" : <span className={s.bad}>{money(lost)}</span>} />
              <Readout label="Share lost" value={locked ? "?" : `${share.toFixed(1)}%`} />
            </Row>
            <Row>
              <Slider label="Yearly fee" value={fee} min={0} max={2} step={0.25} disabled={locked} format={(v) => `${v.toFixed(2)}%`} onChange={set} />
              <Control disabled={locked || fee === 1} onClick={() => set(1)}>
                1% fee
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
