"use client";

// Stock and flow. Debt is the water level (a stock); the monthly gap between spending and income is the tap (a flow).
// Start: owe $1,000. Each month adds the gap. Debt cannot go below $0 in this toy (savings are not drawn).
// Key states (milestones): month 6 with a +$200 gap every month ($2,200), and a month of saving that lowers the level.
// Model: no interest. Interest would make the tap grow.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = 1000;
const Q_GAP = 200;
const Q_MONTHS = 6;
const MAX_MONTHS = 12;
const TUB_MAX = START + MAX_MONTHS * 300; // 4,600
const MILESTONES = ["six", "fall"] as const;

const usd = (v: number) => `$${v.toLocaleString("en-US")}`;
const signed = (v: number) => (v > 0 ? `+${usd(v)}` : v < 0 ? `-${usd(-v)}` : "$0");
const levelAfter = (gaps: number[]) => gaps.reduce((lvl, g) => Math.max(0, lvl + g), START);

const TX = 90;
const TW = 140;
const TY = 14;
const TH = 120;

export default function Bathtub({ slug }: { slug: string }) {
  const [gaps, setGaps] = useState<number[]>([]);
  const [gap, setGap] = useState(Q_GAP);
  const level = levelAfter(gaps);
  const month = gaps.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You owe ${usd(START)}. For ${Q_MONTHS} months you spend ${usd(Q_GAP)} more than you earn each month. What do you owe after ${Q_MONTHS} months (ignore interest)?`,
        options: [usd(Q_GAP), usd(START), usd(START + Q_MONTHS * Q_GAP)],
        answer: 2,
      }}
      exploreHint="Run to month 6 with the tap at +$200, then try saving."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Month by month the tap added {usd(Q_GAP)}, so after {Q_MONTHS} months the tub held <strong>{usd(START + Q_MONTHS * Q_GAP)}</strong> ({usd(START)} + {Q_MONTHS} × {usd(Q_GAP)}).
            The {usd(Q_GAP)} is the deficit, a flow per month. The {usd(START + Q_MONTHS * Q_GAP)} is the debt, a stock.
          </p>
          <p>A month of saving drained the tub: debt falls only when the gap turns negative. Here interest is ignored; interest would make the tap grow.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const apply = (add: number[]) => {
              const next = [...gaps, ...add];
              setGaps(next);
              if (next.length === Q_MONTHS && next.every((g) => g === Q_GAP)) reach("six");
              if (add.some((g) => g < 0) && levelAfter(next) < levelAfter(gaps)) reach("fall");
            };
            const toSix = () => apply(Array(Math.max(0, Q_MONTHS - month)).fill(gap));
            const saving = () => apply([-Q_GAP, -Q_GAP]);
            const frac = level / TUB_MAX;
            const wh = TH * frac;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: no interest; the tap is spending minus income</p>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={locked ? "Bathtub of debt" : `Debt ${usd(level)} after ${month} months`}>
                  <rect x={TX} y={TY} width={TW} height={TH} rx={6} fill="none" stroke="var(--muted)" strokeWidth={2} />
                  <rect x={TX + 1} y={TY + TH - wh} width={TW - 2} height={wh} className={s.badFill} />
                  <text x={TX + TW / 2} y={TY + TH - wh / 2 + 5} textAnchor="middle" className={s.big}>
                    {locked ? "" : usd(level)}
                  </text>
                  <text x={TX + TW + 8} y={TY + 12} className={s.axis}>
                    debt (stock)
                  </text>
                  <text x={8} y={TY + 14} className={s.axis}>
                    tap (flow)
                  </text>
                  <text x={8} y={TY + 34} className={s.small}>
                    {locked ? "?" : `${signed(gap)} / month`}
                  </text>
                  <line x1={40} x2={TX} y1={TY + 44} y2={TY + 44} stroke={gap > 0 ? "var(--bad)" : gap < 0 ? "var(--good)" : "var(--muted)"} strokeWidth={Math.abs(gap) / 40 + 1} />
                </svg>
                <Row>
                  <Readout label="Month" value={month} />
                  <Readout label="Debt" value={locked ? "?" : usd(level)} />
                </Row>
                <Row>
                  <Control disabled={locked || month >= MAX_MONTHS} onClick={() => apply([gap])}>
                    Next month
                  </Control>
                  <Control disabled={locked || month >= Q_MONTHS} onClick={toSix}>
                    Run to month 6
                  </Control>
                  <Control disabled={locked || month + 2 > MAX_MONTHS} onClick={saving}>
                    Save {usd(Q_GAP)} for 2 months
                  </Control>
                </Row>
                <Slider label="Monthly gap" value={gap} min={-300} max={300} step={100} format={signed} disabled={locked} onChange={setGap} />
                <Row>
                  <Control disabled={locked || month === 0} onClick={() => setGaps([])}>
                    Start over
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
