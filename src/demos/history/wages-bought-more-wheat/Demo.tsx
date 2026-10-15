"use client";

// History: Playfair's 1821 wheat and wages, re-drawn. history-data.mjs: wheat, Wheat.csv (columns Year, Wheat
// in shillings per quarter, Wages in shillings per week; wages stop at 1810). Brief:
// company/domains/briefs/history.md #7; numbers: section 7 of history-cycle1-check.mjs.
//
// The rows below are copied from the pinned CSV unchanged. Every number on the stage and in the reveal is
// computed from them with the check script's formulas (first row with a wage = 1565; 1810 = last wage).
// Before: Playfair's layout, wheat price as bars and wages as a line, each on its own axis.
// After: one line, quarters of wheat a week's wage buys (wage / price), which persists into the reveal.
// Locked stage: the wheat bars only (the question already gives the price rise).
// Milestones: `ratio` (the divided line) and `best` (1785 marked: the reveal names it). The "Worst year" view
// keeps the best-year mark, so the state the reveal quotes is on screen when it opens. No Reset.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// [Year, Wheat, Wages] from Wheat.csv; null = NA.
const ROWS: [number, number, number | null][] = [
  [1565, 41, 5], [1570, 45, 5.05], [1575, 42, 5.08], [1580, 49, 5.12], [1585, 41.5, 5.15], [1590, 47, 5.25],
  [1595, 64, 5.54], [1600, 27, 5.61], [1605, 33, 5.69], [1610, 32, 5.78], [1615, 33, 5.94], [1620, 35, 6.01],
  [1625, 33, 6.12], [1630, 45, 6.22], [1635, 33, 6.3], [1640, 39, 6.37], [1645, 53, 6.45], [1650, 42, 6.5],
  [1655, 40.5, 6.6], [1660, 46.5, 6.75], [1665, 32, 6.8], [1670, 37, 6.9], [1675, 43, 7], [1680, 35, 7.3],
  [1685, 27, 7.6], [1690, 40, 8], [1695, 50, 8.5], [1700, 30, 9], [1705, 32, 10], [1710, 44, 11],
  [1715, 33, 11.75], [1720, 29, 12.5], [1725, 39, 13], [1730, 26, 13.3], [1735, 32, 13.6], [1740, 27, 14],
  [1745, 27.5, 14.5], [1750, 31, 15], [1755, 35.5, 15.7], [1760, 31, 16.5], [1765, 43, 17.6], [1770, 47, 18.5],
  [1775, 44, 19.5], [1780, 46, 21], [1785, 42, 23], [1790, 47.5, 25.5], [1795, 76, 27.5], [1800, 79, 28.5],
  [1805, 81, 29.5], [1810, 99, 30], [1815, 78, null], [1820, 54, null], [1821, 54, null],
];
const WAGED = ROWS.filter((r) => r[2] !== null).map(([y, p, w]) => ({ y, p, w: w as number, q: (w as number) / p }));
const A = WAGED[0];
const B = WAGED.find((r) => r.y === 1810)!;
const BEST = WAGED.reduce((m, r) => (r.q > m.q ? r : m));
const WORST = WAGED.reduce((m, r) => (r.q < m.q ? r : m));
const PRICE_X = B.p / A.p;
const WAGE_X = B.w / A.w;
const RATIO_X = B.q / A.q;
const f1 = (x: number) => x.toFixed(1);
const f2 = (x: number) => x.toFixed(2);
const fx = (x: number) => (Math.abs(x - Math.round(x)) < 0.05 ? String(Math.round(x)) : f1(x));

const MILESTONES = ["ratio", "best"] as const;
type View = "price" | "playfair" | "ratio" | "best" | "worst";

const W = 340;
const H = 196;
const L = 34;
const R = 306;
const T = 26;
const BOT = 164;
const Y0 = 1565;
const Y1 = 1821;
const xs = (y: number) => L + ((y - Y0) / (Y1 - Y0)) * (R - L);
const P_MAX = 100;
const W_MAX = 30;
const Q_MAX = 0.6;
const yP = (p: number) => BOT - (p / P_MAX) * (BOT - T);
const yW = (w: number) => BOT - (w / W_MAX) * (BOT - T);
const yQ = (q: number) => BOT - (q / Q_MAX) * (BOT - T);
const BAR = ((R - L) / (Y1 - Y0)) * 5 * 0.7;

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [view, setView] = useState<View>("price");
  const ratio = view === "ratio" || view === "best" || view === "worst";
  const go = (v: View) => {
    setView(v);
    if (v === "ratio" || v === "best" || v === "worst") reach("ratio");
    if (v === "best" || v === "worst") reach("best");
  };
  const showBest = view === "best" || view === "worst";
  const wagePath = WAGED.map((r, i) => `${i ? "L" : "M"}${xs(r.y).toFixed(1)} ${yW(r.w).toFixed(1)}`).join(" ");
  const ratioPath = WAGED.map((r, i) => `${i ? "L" : "M"}${xs(r.y).toFixed(1)} ${yQ(r.q).toFixed(1)}`).join(" ");
  const label = ratio
    ? `One line: quarters of wheat a week's wage bought, from ${f2(A.q)} in ${A.y} to ${f2(B.q)} in ${B.y}.` +
      (showBest ? ` Best year ${BEST.y}, ${f2(BEST.q)}.` : "") +
      (view === "worst" ? ` Worst year ${WORST.y}, ${f2(WORST.q)}.` : "")
    : `Bars: price of wheat, shillings a quarter, ${A.y} to 1821.` +
      (view === "playfair" ? ` Line on a second axis: a mechanic's weekly wage, ${A.w} to ${B.w} shillings, ending ${B.y}.` : "");

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={label}>
        {/* year axis */}
        <line x1={L} y1={BOT} x2={R} y2={BOT} className={s.axis} />
        {[1600, 1650, 1700, 1750, 1800].map((y) => (
          <g key={y}>
            <line x1={xs(y)} y1={BOT} x2={xs(y)} y2={BOT + 4} className={s.axis} />
            <text x={xs(y)} y={BOT + 16} className={s.tick} textAnchor="middle">
              {y}
            </text>
          </g>
        ))}

        {!ratio && (
          <>
            <text x={4} y={12} className={s.titleP}>
              wheat, shillings a quarter
            </text>
            <line x1={L} y1={T} x2={L} y2={BOT} className={s.axis} />
            {[0, 50, 100].map((p) => (
              <text key={p} x={L - 4} y={yP(p) + 4} className={s.tick} textAnchor="end">
                {p}
              </text>
            ))}
            {ROWS.map(([y, p]) => (
              <rect key={y} x={xs(y) - BAR / 2} y={yP(p)} width={BAR} height={BOT - yP(p)} className={s.bar} />
            ))}
          </>
        )}

        {view === "playfair" && (
          <>
            <text x={W - 4} y={12} className={s.titleW} textAnchor="end">
              wage, shillings a week
            </text>
            <line x1={R} y1={T} x2={R} y2={BOT} className={s.axisW} />
            {[0, 15, 30].map((w) => (
              <text key={w} x={R + 4} y={yW(w) + 4} className={s.tickW}>
                {w}
              </text>
            ))}
            <path d={wagePath} className={s.wage} />
          </>
        )}

        {ratio && !locked && (
          <>
            <text x={4} y={12} className={s.titleQ}>
              quarters of wheat a week&rsquo;s wage buys
            </text>
            <line x1={L} y1={T} x2={L} y2={BOT} className={s.axis} />
            {[0, 0.2, 0.4, 0.6].map((q) => (
              <text key={q} x={L - 4} y={yQ(q) + 4} className={s.tick} textAnchor="end">
                {q === 0 ? "0" : q.toFixed(1)}
              </text>
            ))}
            <path d={ratioPath} className={s.ratio} />
            <circle cx={xs(A.y)} cy={yQ(A.q)} r={3.5} className={s.end} />
            <circle cx={xs(B.y)} cy={yQ(B.q)} r={3.5} className={s.end} />
            {showBest && (
              <>
                <circle cx={xs(BEST.y)} cy={yQ(BEST.q)} r={5} className={s.best} />
                <text x={xs(BEST.y) + 6} y={yQ(BEST.q) - 9} className={s.lab} textAnchor="end">
                  best year {BEST.y}: {f2(BEST.q)} quarters
                </text>
              </>
            )}
            {view === "worst" && (
              <>
                <circle cx={xs(WORST.y)} cy={yQ(WORST.q)} r={5} className={s.worst} />
                <line x1={xs(WORST.y)} y1={yQ(WORST.q) - 5} x2={xs(WORST.y)} y2={yQ(0.4) + 4} className={s.leader} />
                <text x={xs(WORST.y) - 4} y={yQ(0.4)} className={s.lab}>
                  worst year {WORST.y}: {f2(WORST.q)}
                </text>
              </>
            )}
          </>
        )}
      </svg>
      <Row foldAtReveal>
        <Control disabled={locked} className={view === "playfair" ? "active" : ""} onClick={() => go("playfair")}>
          Playfair&rsquo;s chart
        </Control>
        <Control disabled={locked} className={view === "ratio" ? "active" : ""} onClick={() => go("ratio")}>
          Wages divided by price
        </Control>
        <Control disabled={locked} className={view === "best" ? "active" : ""} onClick={() => go("best")}>
          Mark the best year
        </Control>
        <Control disabled={locked} className={view === "worst" ? "active" : ""} onClick={() => go("worst")}>
          Mark the worst year
        </Control>
      </Row>
      <Readout
        label={`${A.y} to ${B.y}`}
        value={
          locked || view === "price"
            ? `wheat ×${f1(PRICE_X)}`
            : ratio
              ? `wheat ×${f1(PRICE_X)}, wage ×${fx(WAGE_X)}: buys ×${f1(RATIO_X)}`
              : `wheat ×${f1(PRICE_X)}, wage ×${fx(WAGE_X)}`
        }
      />
    </div>
  );
}

export default function WagesBoughtMoreWheat({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `From ${A.y} to ${B.y} the price of wheat rose about ${f1(PRICE_X)} times. Did a mechanic's weekly wage buy more or less wheat in ${B.y}?`,
        options: ["Less: under half as much", "About the same", "More: over twice as much"],
        answer: 2,
      }}
      exploreHint="Open Playfair's chart, then divide wages by price."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Wheat cost {f1(PRICE_X)} times as much in {B.y}, but wages rose {fx(WAGE_X)} times, so a week&rsquo;s pay bought{" "}
            {f1(RATIO_X)} times as much wheat.
          </p>
          <p>
            Playfair drew price and wages on two scales, which hides this ratio; dividing one by the other shows it as one
            line. On his figures the best year was {BEST.y}, not the last.
          </p>
          <p>Where it stops: this is one trade&rsquo;s wage and one food, not a cost of living.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
