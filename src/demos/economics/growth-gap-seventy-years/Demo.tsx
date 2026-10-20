"use client";

// Growth-rate gap. Two countries start equally rich (income 1); one grows 2% a year, the other
// 2% + gap. One picture: two bars whose heights are income as a multiple of the start, scrubbed by
// year. Key state: gap 1 point at year 70: 7.92 vs 4.00, ratio 1.98.
// Model: steady growth every year, invented rates, no shocks, not a forecast.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BASE = 2; // % a year
const GAPS = [0.5, 1, 2]; // percentage points
const Q_GAP = 1;
const YEARS = 70;
const MILESTONES = ["year-70"] as const;

const income = (rate: number, t: number) => (1 + rate / 100) ** t;
const ratio = (gap: number, t: number) => income(BASE + gap, t) / income(BASE, t);
const A70 = income(BASE + Q_GAP, YEARS); // 7.92
const B70 = income(BASE, YEARS); // 4.00
const R70 = ratio(Q_GAP, YEARS); // 1.98
const pctLabel = (v: number) => `${v % 1 ? v.toFixed(1) : v}%`;

// Geometry (viewBox 320 × 200).
const BOT = 170;
const TOPY = 26;
const W = 70;
const XA = 70;
const XB = 180;

export default function GrowthGapSeventyYears({ slug }: { slug: string }) {
  const [year, setYear] = useState(0);
  const [gap, setGap] = useState(Q_GAP);
  const [seen70, setSeen70] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Two countries start equally rich. One grows ${BASE + Q_GAP}% a year, the other ${BASE}%. After ${YEARS} years, how many times as rich as the second is the first?`,
        options: ["about 1.4 times", `about ${R70.toFixed(0)} times`, "about 3 times"],
        answer: 1,
      }}
      exploreHint={`Run the years out to ${YEARS} and compare the bars.`}
      minInteractions={MILESTONES.length}
      reveal={() => {
        const others = seen70.filter((g) => g !== Q_GAP);
        return (
          <>
            <p>
              By year {YEARS} the {BASE + Q_GAP}% country had grown to <strong>{A70.toFixed(2)}×</strong> its start and the {BASE}% country
              to <strong>{B70.toFixed(2)}×</strong>, so the first was <strong>{R70.toFixed(2)} times</strong> as rich: about double.
              {others.length > 0 &&
                ` With a gap of ${others.map((g) => `${g} point${g === 1 ? "" : "s"} it was ${ratio(g, YEARS).toFixed(2)}×`).join(", ")}.`}
            </p>
            <p>
              Each year&apos;s growth builds on the last, so the gap compounds too: {(1 + (BASE + Q_GAP) / 100).toFixed(2)} ÷{" "}
              {(1 + BASE / 100).toFixed(2)} ≈ {(ratio(Q_GAP, 1)).toFixed(4)} a year, and that to the power {YEARS} is {R70.toFixed(2)}.
            </p>
            <p className="muted">A model: steady growth, invented rates, no shocks. Not any country&apos;s record and not a forecast.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (t: number, g: number) => {
              if (t === YEARS) {
                setSeen70((sn) => (sn.includes(g) ? sn : [...sn, g]));
                if (g === Q_GAP) reach("year-70");
              }
            };
            const setT = (t: number) => {
              setYear(t);
              check(t, gap);
            };
            const pick = (g: number) => {
              setGap(g);
              check(year, g);
            };
            const a = income(BASE + gap, year);
            const b = income(BASE, year);
            const scale = income(BASE + gap, YEARS);
            const h = (v: number) => (v / scale) * (BOT - TOPY);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: steady growth, invented rates</p>
                <svg
                  viewBox="0 0 320 200"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Two equal countries at year 0" : `Year ${year}: ${a.toFixed(2)} vs ${b.toFixed(2)}`}
                >
                  <text x={10} y={14} className={s.axis}>
                    income, start = 1
                  </text>
                  <line x1={40} y1={BOT} x2={280} y2={BOT} stroke="var(--line)" />
                  <rect x={XA} y={BOT - h(a)} width={W} height={h(a)} rx={3} className={s.main} />
                  <rect x={XB} y={BOT - h(b)} width={W} height={h(b)} rx={3} className={s.soft} />
                  {!locked && (
                    <>
                      <text x={XA + W / 2} y={BOT - h(a) - 6} textAnchor="middle" className={s.big}>
                        {a.toFixed(2)}×
                      </text>
                      <text x={XB + W / 2} y={BOT - h(b) - 6} textAnchor="middle" className={s.big}>
                        {b.toFixed(2)}×
                      </text>
                    </>
                  )}
                  <text x={XA + W / 2} y={BOT + 16} textAnchor="middle" className={s.value}>
                    grows {pctLabel(BASE + gap)}
                  </text>
                  <text x={XB + W / 2} y={BOT + 16} textAnchor="middle" className={s.value}>
                    grows {pctLabel(BASE)}
                  </text>
                </svg>

                <Row>
                  <Control disabled={locked || year === YEARS} onClick={() => setT(YEARS)} aria-label={`Jump to year ${YEARS}`}>
                    Year {YEARS}
                  </Control>
                  <Slider label="Year" value={year} min={0} max={YEARS} disabled={locked} onChange={setT} />
                </Row>
                <Row>
                  <span className={s.rowLabel}>Gap</span>
                  {GAPS.map((g) => (
                    <Control
                      key={g}
                      className={`${s.tile} ${gap === g ? "active" : ""}`}
                      disabled={locked || gap === g}
                      aria-pressed={gap === g}
                      onClick={() => pick(g)}
                    >
                      {g} pt
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="First ÷ second" value={locked ? "?" : `${ratio(gap, year).toFixed(2)}×`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
