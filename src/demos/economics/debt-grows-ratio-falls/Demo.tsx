"use client";

// Debt grows, ratio falls. Start debt $100, GDP $100 (ratio 100%). Each year money GDP grows by g, then
// the year's borrowing, b% of that year's GDP (interest included), adds to the debt. At b = 3, g = 5:
// year 10 debt 139.6, GDP 162.9, ratio 85.7%. Debt rises every year, the ratio falls.
// Picture: the ratio per year as one line (no target or limit lines); debt and GDP as readouts.
// The sliders set both rates for all years; the line is recomputed up to the current year.
// Milestones: "question" (year 10 at 3% / 5%: debt, GDP, ratio recorded) and "climb" (year 10 with the
// ratio above 100%, rates and ratio recorded; the QA path reaches it at 5% / 5%: 101.9%).
// The run button turns into "Back to year 0" at year 10 (the reset), so the sliders can act at year 10.
// The question's path stays as a dashed ghost once recorded; a record row keeps the quoted numbers.
// Model: fixed rates, borrowing includes interest, no recessions; not any real country.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const YEARS = 10;
const Q_B = 3;
const Q_G = 5;
const MILESTONES = ["question", "climb"] as const;

function run(b: number, g: number) {
  const debt = [100];
  const gdp = [100];
  for (let t = 1; t <= YEARS; t++) {
    gdp.push(gdp[t - 1] * (1 + g / 100));
    debt.push(debt[t - 1] + (b / 100) * gdp[t]);
  }
  const ratio = debt.map((d, t) => (100 * d) / gdp[t]);
  return { debt, gdp, ratio };
}
const usd = (v: number) => `$${Math.round(v)}`;
const pct = (v: number) => `${(Math.round(v * 10) / 10).toFixed(1)}%`;
const r1 = (v: number) => Math.round(v * 10) / 10;

// Chart geometry (viewBox 320 × 170).
const XL = 46;
const XR = 262;
const YT = 12;
const YB = 140;
const RMIN = 40;
const RMAX = 160;
const px = (t: number) => XL + (t / YEARS) * (XR - XL);
const py = (r: number) => YB - ((r - RMIN) / (RMAX - RMIN)) * (YB - YT);

type QRec = { debt: number; gdp: number; ratio: number };
type CRec = { b: number; g: number; ratio: number };

export default function DebtGrowsRatioFalls({ slug }: { slug: string }) {
  const [b, setB] = useState(Q_B);
  const [g, setG] = useState(Q_G);
  const [year, setYear] = useState(0);
  const [qr, setQr] = useState<QRec | null>(null);
  const [cr, setCr] = useState<CRec | null>(null);
  const cur = run(b, g);
  const ghost = run(Q_B, Q_G);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Debt equals a year’s GDP (100%). Each year the government borrows 3% of GDP more; GDP grows 5% a year. After 10 years, debt-to-GDP is…",
        options: ["Above 100%", "Still 100%", "Below 100%"],
        answer: 2,
      }}
      exploreHint="Run to year 10, then raise borrowing and watch the line."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Debt rose every year, from $100 to <strong>{usd(qr?.debt ?? 139.6)}</strong>, yet the ratio fell to <strong>{pct(qr?.ratio ?? 85.7)}</strong>,
            because GDP grew from $100 to {usd(qr?.gdp ?? 162.9)}. The ratio is a fraction: borrowing adds to the top, growth enlarges the bottom.
          </p>
          <p>
            At {cr?.b ?? 5}% borrowing and {cr?.g ?? 5}% growth, your ratio climbed to {pct(cr?.ratio ?? 101.9)}. A toy model with fixed rates, not any
            real country.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (nb: number, ng: number, ny: number) => {
              if (ny !== YEARS) return;
              const r = run(nb, ng);
              if (nb === Q_B && ng === Q_G) {
                setQr((x) => x ?? { debt: r.debt[YEARS], gdp: r.gdp[YEARS], ratio: r.ratio[YEARS] });
                reach("question");
              }
              if (r1(r.ratio[YEARS]) > 100) {
                setCr((x) => x ?? { b: nb, g: ng, ratio: r.ratio[YEARS] });
                reach("climb");
              }
            };
            const toYear = (ny: number) => {
              setYear(ny);
              check(b, g, ny);
            };
            const setBorrow = (v: number) => {
              setB(v);
              check(v, g, year);
            };
            const setGrowth = (v: number) => {
              setG(v);
              check(b, v, year);
            };
            const line = (r: number[], n: number) =>
              r
                .slice(0, n + 1)
                .map((v, t) => `${px(t)},${py(Math.max(RMIN, Math.min(RMAX, v)))}`)
                .join(" ");
            const showGhost = qr !== null && (b !== Q_B || g !== Q_G);
            const rNow = cur.ratio[year];
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: start debt $100, GDP $100. Each year GDP grows, then borrowing adds a % of it.</p>
                <Row>
                  <Readout label="Year" value={locked ? "?" : year} />
                  <Readout label="Debt" value={locked ? "?" : usd(cur.debt[year])} />
                  <Readout label="GDP" value={locked ? "?" : usd(cur.gdp[year])} />
                  <Readout label="Ratio" value={locked ? "?" : pct(rNow)} />
                </Row>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={locked ? "Debt-to-GDP by year" : `Year ${year}: debt-to-GDP ${pct(rNow)}`}>
                  <line x1={XL} y1={YB} x2={XR} y2={YB} className={s.edge} />
                  <line x1={XL} y1={YB} x2={XL} y2={YT} className={s.edge} />
                  {[0, 2, 4, 6, 8, 10].map((t) => (
                    <text key={t} x={px(t)} y={YB + 15} textAnchor="middle" className={s.axis}>
                      {t}
                    </text>
                  ))}
                  <text x={(XL + XR) / 2} y={YB + 29} textAnchor="middle" className={s.axis}>
                    year
                  </text>
                  {!locked && (
                    <g>
                      {[50, 100, 150].map((v) => (
                        <g key={v}>
                          <line x1={XL} y1={py(v)} x2={XR} y2={py(v)} className={s.grid} />
                          <text x={XL - 5} y={py(v) + 4} textAnchor="end" className={s.axis}>
                            {v}%
                          </text>
                        </g>
                      ))}
                      {showGhost && <polyline points={line(ghost.ratio, YEARS)} className={s.ghost} />}
                      {showGhost && (
                        <text x={XR + 3} y={py(ghost.ratio[YEARS]) + 4} className={s.valueMuted}>
                          3%, 5%
                        </text>
                      )}
                      <polyline points={line(cur.ratio, year)} className={s.line} />
                      <circle cx={px(year)} cy={py(Math.max(RMIN, Math.min(RMAX, rNow)))} r={5} className={s.dot} />
                      <text
                        x={px(year) + (year > 6 ? -8 : 8)}
                        y={py(Math.max(RMIN, Math.min(RMAX, rNow))) + (rNow > ghost.ratio[year] || !showGhost ? -9 : 18)}
                        textAnchor={year > 6 ? "end" : "start"}
                        className={s.value}
                      >
                        {pct(rNow)}
                      </text>
                    </g>
                  )}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {locked ? "" : !qr && !cr ? "Press Next year or Run to year 10." : null}
                  {!locked && qr && (
                    <span style={{ display: "block" }}>
                      Year 10, borrow 3%, grow 5%: debt {usd(qr.debt)}, GDP {usd(qr.gdp)}, {pct(qr.ratio)}
                    </span>
                  )}
                  {!locked && cr && (
                    <span style={{ display: "block" }}>
                      Year 10, borrow {cr.b}%, grow {cr.g}%: {pct(cr.ratio)}
                    </span>
                  )}
                </p>
                {phase !== "reveal" && (
                <Row>
                  <Control disabled={locked || year >= YEARS} onClick={() => toYear(year + 1)}>
                    Next year
                  </Control>
                  <Control disabled={locked} onClick={() => toYear(year >= YEARS ? 0 : YEARS)}>
                    {year >= YEARS ? "Back to year 0" : "Run to year 10"}
                  </Control>
                </Row>
                )}
                <div className={s.pair}>
                  <Slider label="Borrowing" value={b} min={0} max={6} step={1} format={(v) => `${v}%`} disabled={locked} onChange={setBorrow} />
                  <Slider label="Growth" value={g} min={0} max={8} step={1} format={(v) => `${v}%`} disabled={locked} onChange={setGrowth} />
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
