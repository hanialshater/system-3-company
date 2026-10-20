"use client";

// Marginal tax rate. One picture: pay laid out dollar by dollar along a line. Every dollar is split
// into what you keep (green) and tax (red): a 10% slice for dollars up to $20,000, a 30% slice for
// dollars above. A raise past the line only adds 30%-taxed dollars; the earlier ones do not change.
// Key state: pay moved from $19,000 to $21,000 (take-home $17,100 → $18,700).
// Model: invented brackets, not any country's; no credits, no other taxes.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LINE = 20000;
const LOW = 0.1;
const HIGH = 0.3;
const Q_FROM = 19000;
const Q_TO = 21000;
const MIN = 10000;
const MAX = 40000;
const STEP = 1000;
const MILESTONES = ["crossed"] as const;

const tax = (pay: number) => LOW * Math.min(pay, LINE) + HIGH * Math.max(0, pay - LINE);
const takeHome = (pay: number) => pay - tax(pay);
const usd = (v: number) => `$${Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
const signedUsd = (v: number) => (v >= 0 ? `+${usd(v)}` : `−${usd(-v)}`);
const CHANGE = takeHome(Q_TO) - takeHome(Q_FROM); // 1600

// Geometry (viewBox 320 × 170): pay $0..$40,000 across.
const L = 12;
const R = 308;
const TOP = 26;
const H = 100;
const px = (d: number) => L + (d / MAX) * (R - L);

export default function RaiseIntoNewBracket({ slug }: { slug: string }) {
  const [pay, setPay] = useState(Q_FROM);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Under a made-up tax, you pay ${LOW * 100}% on the first ${usd(LINE)} you earn and ${HIGH * 100}% on every dollar above. Your pay rises from ${usd(Q_FROM)} to ${usd(Q_TO)}. How does your take-home pay change?`,
        options: ["It falls", `It rises by about ${usd(CHANGE)}`, "It stays the same"],
        answer: CHANGE < 0 ? 0 : CHANGE === 0 ? 2 : 1,
      }}
      exploreHint={`Move pay from ${usd(Q_FROM)} past the line to ${usd(Q_TO)}.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Going from {usd(Q_FROM)} to {usd(Q_TO)}, take-home went from {usd(takeHome(Q_FROM))} to{" "}
            <strong>{usd(takeHome(Q_TO))}</strong>: up <strong>{usd(CHANGE)}</strong>. Tax rose from {usd(tax(Q_FROM))} to{" "}
            {usd(tax(Q_TO))}, because only the {usd(Q_TO - LINE)} above the line paid {HIGH * 100}%.
          </p>
          <p>
            The {HIGH * 100}% rate applies to the dollars above {usd(LINE)}, not to all of your pay. The dollars below the line
            are taxed just as before. So in this system more pay always means more take-home; each extra dollar keeps{" "}
            {Math.round((1 - HIGH) * 100)} cents.
          </p>
          <p className="muted">A model: invented brackets, not any country&apos;s; no credits or other taxes.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              const k = Math.max(MIN, Math.min(MAX, v));
              setPay(k);
              if (k === Q_TO) reach("crossed");
            };
            const lowEnd = Math.min(pay, LINE);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Made-up tax: 10% up to $20,000, 30% above</p>
                <svg
                  viewBox="0 0 320 170"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Pay split into kept and tax" : `Pay ${usd(pay)}: tax ${usd(tax(pay))}, take-home ${usd(takeHome(pay))}`}
                >
                  <rect x={px(0)} y={TOP} width={px(lowEnd) - px(0)} height={H * (1 - LOW)} className={s.goodFill} />
                  <rect x={px(0)} y={TOP + H * (1 - LOW)} width={px(lowEnd) - px(0)} height={H * LOW} className={s.badFill} />
                  {pay > LINE && (
                    <>
                      <rect x={px(LINE)} y={TOP} width={px(pay) - px(LINE)} height={H * (1 - HIGH)} className={s.goodFill} />
                      <rect x={px(LINE)} y={TOP + H * (1 - HIGH)} width={px(pay) - px(LINE)} height={H * HIGH} className={s.badFill} />
                    </>
                  )}
                  <line x1={px(LINE)} y1={TOP - 8} x2={px(LINE)} y2={TOP + H + 6} stroke="var(--fg)" strokeWidth={2} strokeDasharray="5 3" />
                  <text x={px(LINE)} y={TOP - 12} textAnchor="middle" className={s.axis}>
                    {usd(LINE)}
                  </text>
                  <text x={px(lowEnd / 2)} y={TOP + H * (1 - LOW) - 8} textAnchor="middle" className={s.value}>
                    keep 90%
                  </text>
                  {pay > LINE + 2500 && (
                    <text x={px((LINE + pay) / 2)} y={TOP + H * (1 - HIGH) - 8} textAnchor="middle" className={s.value}>
                      keep 70%
                    </text>
                  )}
                  {pay > LINE && pay <= 32000 && (
                    <text x={px(pay) + 6} y={TOP + H * (1 - HIGH / 2) + 4} className={s.value} fill="var(--bad)">
                      ← {HIGH * 100}% only here
                    </text>
                  )}
                  {pay > 32000 && (
                    <text x={px((LINE + pay) / 2)} y={TOP + H * (1 - HIGH / 2) + 4} textAnchor="middle" className={s.value}>
                      tax {HIGH * 100}%
                    </text>
                  )}
                  <line x1={px(0)} y1={TOP + H} x2={px(MAX)} y2={TOP + H} stroke="var(--line)" />
                  <text x={px(pay)} y={TOP + H + 20} textAnchor={pay > 34000 ? "end" : "middle"} className={s.value}>
                    pay {usd(pay)}
                  </text>
                </svg>

                <Row>
                  <Readout label="Take-home" value={locked ? "?" : usd(takeHome(pay))} />
                  <Readout label={`vs ${usd(Q_FROM)} pay`} value={locked ? "?" : signedUsd(takeHome(pay) - takeHome(Q_FROM))} />
                  <Readout label="Average tax" value={locked ? "?" : `${((tax(pay) / pay) * 100).toFixed(1)}%`} />
                </Row>
                <Row>
                  <Slider label="Pay" value={pay} min={MIN} max={MAX} step={STEP} disabled={locked} format={usd} onChange={set} />
                  <Control disabled={locked || pay >= MAX} onClick={() => set(pay + STEP)} aria-label="Raise pay by $1,000">
                    +$1k
                  </Control>
                  <Control disabled={locked || pay <= MIN} onClick={() => set(pay - STEP)} aria-label="Cut pay by $1,000">
                    −$1k
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
