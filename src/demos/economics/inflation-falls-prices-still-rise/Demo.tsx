"use client";

// Inflation falls, prices still rise. A $100 basket; each year's rate applies to last year's price:
// 8%, 6%, 4%, 3%, 2% gives 100 → 108.00 → 114.48 → 119.06 → 122.63 → 125.08. A sixth year at 0% leaves
// it at 125.08; only a sixth year at −1% lowers it (123.83).
// Picture: the basket's price as bars by year, with that year's rate printed above each bar: the rate
// numbers shrink while the bars keep growing. Prices are printed on year 0, year 5 and year 6 (inside its bar).
// Controls (DOM order): [Five years] [Year 6 at 0%] [Year 6 at −1%] presets, then Step (one year at a
// time from year 0; disabled once year 5 is shown).
// Milestones: "five" (year 5 shown: 125.08), "zero" (year 6 at 0%), "negative" (year 6 at −1%). The brief
// marks the third optional; it is required here so the "only below zero" sentence is always shown.
// Model: made-up rates, not any country's data, not a forecast.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const RATES = [8, 6, 4, 3, 2];
const MILESTONES = ["five", "zero", "negative"] as const;
type Y6 = null | 0 | -1;

const PATH = RATES.reduce<number[]>((p, r) => [...p, p[p.length - 1] * (1 + r / 100)], [100]);
const P5 = PATH[5];
const y6Price = (r: number) => P5 * (1 + r / 100);

const money = (v: number) => (Math.round(v * 100) / 100).toFixed(2);
const rateText = (r: number) => (r < 0 ? `−${-r}%` : `${r}%`);

// Geometry (viewBox 320 × 180): 7 slots for years 0 to 6.
const XL = 50;
const XR = 316;
const SLOT = (XR - XL) / 7;
const BASE = 150;
const SCALE = 0.84; // px per dollar
const BW = SLOT - 10;
const sx = (y: number) => XL + y * SLOT + 5;

export default function InflationFallsPricesStillRise({ slug }: { slug: string }) {
  const [k, setK] = useState(0); // years of the five-year path shown
  const [y6, setY6] = useState<Y6>(null);
  const [seenZero, setSeenZero] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A $100 basket. Inflation falls every year: 8%, 6%, 4%, 3%, 2%. After those five years, the basket costs…",
        options: ["less than $100", "about $108", "more than $120"],
        answer: 2,
      }}
      exploreHint="Show the five years, then try a sixth year at 0% and at −1%."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Inflation fell every year, from 8% to 2%, and the basket still went from $100 to <strong>${money(P5)}</strong>. Inflation is how
            fast prices rise, not how high they are, so a falling rate means slower rises.
          </p>
          <p>
            At 0% the price stayed at ${money(y6Price(0))}; it did not go back. At −1% it fell, to <strong>${money(y6Price(-1))}</strong>:
            prices fall only when the rate goes below zero. Made-up rates, not a forecast.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const toYears = (n: number) => {
              setK(n);
              setY6(null);
              if (n === 5) reach("five");
            };
            const sixth = (r: 0 | -1) => {
              setK(5);
              setY6(r);
              reach("five");
              if (r === 0) {
                setSeenZero(true);
                reach("zero");
              } else reach("negative");
            };
            const years = y6 === null ? k : 6;
            const priceAt = (y: number) => (y <= 5 ? PATH[y] : y6Price(y6 ?? 0));
            const rateAt = (y: number) => (y <= 5 ? RATES[y - 1] : (y6 ?? 0));
            const labelled = (y: number) => y === 0 || y === 5 || y === 6 || y === years;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Each year&apos;s rate applies to last year&apos;s price.</p>
                <svg
                  viewBox="0 0 320 180"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "A $100 basket, year 0" : `Year ${years}: basket $${money(priceAt(years))}`}
                >
                  <text x={XL - 4} y={18} textAnchor="end" className={s.axis}>
                    rate
                  </text>
                  <text x={XL - 4} y={BASE - 100 * SCALE + 4} textAnchor="end" className={s.axis}>
                    price $
                  </text>
                  <line x1={XL} y1={BASE} x2={XR} y2={BASE} className={s.edge} />
                  {[0, 1, 2, 3, 4, 5, 6].map((y) => (
                    <text key={y} x={sx(y) + BW / 2} y={BASE + 14} textAnchor="middle" className={s.axis}>
                      {y}
                    </text>
                  ))}
                  <text x={XL - 4} y={BASE + 14} textAnchor="end" className={s.axis}>
                    year
                  </text>
                  {Array.from({ length: (locked ? 0 : years) + 1 }, (_, y) => {
                    const p = priceAt(y);
                    const h = p * SCALE;
                    return (
                      <g key={y}>
                        <rect x={sx(y)} y={BASE - h} width={BW} height={h} className={y === years && y > 0 ? s.barNew : s.bar} />
                        {y > 0 && (
                          <text x={sx(y) + BW / 2} y={18} textAnchor="middle" className={s.rate}>
                            {rateText(rateAt(y))}
                          </text>
                        )}
                        {labelled(y) && (
                          <text x={sx(y) + BW / 2} y={y === 6 ? BASE - h + 15 : BASE - h - 5} textAnchor="middle" className={s.value}>
                            {money(p)}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  {!locked && y6 === -1 && seenZero && (
                    <rect x={sx(6)} y={BASE - y6Price(0) * SCALE} width={BW} height={y6Price(0) * SCALE} className={s.ghost} />
                  )}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {locked ? "" : seenZero ? `Year 6 at 0%: $${money(y6Price(0))}, no change` : "Show the years."}
                </p>
                <Row>
                  <Control className={k === 5 && y6 === null ? "active" : ""} disabled={locked || (k === 5 && y6 === null)} onClick={() => toYears(5)}>
                    Five years
                  </Control>
                  <Control className={y6 === 0 ? "active" : ""} disabled={locked || y6 === 0} onClick={() => sixth(0)}>
                    Year 6 at 0%
                  </Control>
                  <Control className={y6 === -1 ? "active" : ""} disabled={locked || y6 === -1} onClick={() => sixth(-1)}>
                    Year 6 at −1%
                  </Control>
                </Row>
                <Row>
                  <Control disabled={locked || y6 !== null || k >= 5} onClick={() => toYears(k + 1)}>
                    Step one year
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
