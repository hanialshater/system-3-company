"use client";

// Tax now or tax later. $10,000, a made-up flat tax of 25% today. Account A is taxed at the start and
// then grows untaxed; account B grows untaxed and is taxed on withdrawal at the "later" rate.
// A = 10,000 × (1 − 0.25) × G, B = 10,000 × G × (1 − later). Equal rates tie for any growth G
// (multiplication commutes); only a different later rate separates them.
// Picture: two groups of two bars on one axis (start, end). The tax slice is hatched on the bar where it
// is taken: A's on its start bar, B's on its end bar.
// The stage opens at ×2 growth so the question's case (×4, 25% later) is one press away.
// Milestones: "question" (×4 growth, later rate 25%: both $30,000) and "rate" (later rate moved off 25%,
// the latest such state recorded). Records stay in a row under the chart.
// Model: fictional flat tax, no contribution limits, fees or penalties.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SAVE = 10000;
const NOW = 25; // today's rate, %
const Q_GROWTH = 4;
const MILESTONES = ["question", "rate"] as const;

const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const accA = (g: number) => (SAVE * (100 - NOW) * g) / 100;
const accB = (g: number, later: number) => (SAVE * g * (100 - later)) / 100;

// Geometry (viewBox 320 × 206). VMAX maps to YT.
const YB = 166;
const YT = 44;
const VMAX = 40000;
const BW = 46;
const h = (v: number) => (v / VMAX) * (YB - YT);
const GROUPS = [
  { key: "A", cx: 92, label: "A: tax, then grows" },
  { key: "B", cx: 236, label: "B: grows, then tax" },
] as const;

type Rec = { later: number; g: number; a: number; b: number };

export default function TaxNowOrLater({ slug }: { slug: string }) {
  const [growth, setGrowth] = useState(2);
  const [later, setLater] = useState(NOW);
  const [q, setQ] = useState<number | null>(null); // both values at the question's case, recorded
  const [rec, setRec] = useState<Rec | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "$10,000 to save. A: taxed 25% now, then grows untaxed. B: grows untaxed, taxed 25% on withdrawal. Both grow 4×. Which ends bigger?",
        options: ["Account A", "Account B", "They tie"],
        answer: 2,
      }}
      exploreHint="Set growth to ×4, then move the later tax rate."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Both ended at <strong>{usd(q ?? accA(Q_GROWTH))}</strong>. A paid $2,500 tax up front, and its $7,500 grew to {usd(accA(Q_GROWTH))}. B grew
            $10,000 to $40,000, then handed a quarter back. Both are $10,000 × 0.75 × 4, multiplied in a different order.
          </p>
          <p>
            Only a change of rate decides it: at ×{rec?.g ?? Q_GROWTH} and a {rec?.later ?? 35}% later rate, B ended at <strong>{usd(rec?.b ?? 26000)}</strong> against A’s{" "}
            {usd(rec?.a ?? 30000)}. Not advice about any real account.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const apply = (g: number, l: number) => {
              setGrowth(g);
              setLater(l);
              if (g === Q_GROWTH && l === NOW) {
                setQ(accA(g));
                reach("question");
              }
              if (l !== NOW) {
                setRec({ later: l, g, a: accA(g), b: accB(g, l) });
                reach("rate");
              }
            };
            const a = accA(growth);
            const b = accB(growth, later);
            const taxA = (SAVE * NOW) / 100;
            const taxB = SAVE * growth - b;
            const bar = (x: number, total: number, taxTop: number, top: string, sub: string | null) => {
              const y0 = YB - h(total);
              return (
                <g>
                  {locked ? (
                    <rect x={x} y={YB - h(SAVE)} width={BW} height={h(SAVE)} className={s.frame} />
                  ) : (
                    <>
                      <rect x={x} y={y0 + h(taxTop)} width={BW} height={h(total - taxTop)} className={s.kept} />
                      {taxTop > 0 && <rect x={x} y={y0} width={BW} height={h(taxTop)} className={s.tax} />}
                      <text x={x + BW / 2} y={y0 - (sub ? 19 : 5)} textAnchor="middle" className={s.value}>
                        {top}
                      </text>
                      {sub && (
                        <text x={x + BW / 2} y={y0 - 5} textAnchor="middle" className={s.taxText}>
                          {sub}
                        </text>
                      )}
                    </>
                  )}
                </g>
              );
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: made-up flat tax. Today {NOW}%. Later: slider.</p>
                <svg
                  viewBox="0 0 320 206"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Two accounts, start and end" : `A ends at ${usd(a)}, B ends at ${usd(b)}`}
                >
                  <line x1={8} y1={YB} x2={312} y2={YB} className={s.edge} />
                  {GROUPS.map((gr) => (
                    <g key={gr.key}>
                      <text x={gr.cx - 32} y={YB + 15} textAnchor="middle" className={s.axis}>
                        start
                      </text>
                      <text x={gr.cx + 32} y={YB + 15} textAnchor="middle" className={s.axis}>
                        {locked ? "end" : `end (×${growth})`}
                      </text>
                      <text x={gr.cx} y={YB + 33} textAnchor="middle" className={s.value}>
                        {gr.label}
                      </text>
                    </g>
                  ))}
                  {bar(GROUPS[0].cx - 32 - BW / 2, SAVE, taxA, usd(SAVE - taxA), `−${usd(taxA)} tax`)}
                  {bar(GROUPS[0].cx + 32 - BW / 2, a, 0, usd(a), null)}
                  {bar(GROUPS[1].cx - 32 - BW / 2, SAVE, 0, usd(SAVE), null)}
                  {bar(GROUPS[1].cx + 32 - BW / 2, SAVE * growth, taxB, usd(b), `−${usd(taxB)} tax`)}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {locked ? "" : q === null && !rec ? "Try the question’s case: ×4." : null}
                  {!locked && q !== null && <span style={{ display: "block" }}>25% later, ×4: A {usd(q)} · B {usd(q)}</span>}
                  {!locked && rec && (
                    <span style={{ display: "block" }}>
                      {rec.later}% later, ×{rec.g}: A {usd(rec.a)} · B {usd(rec.b)}
                    </span>
                  )}
                </p>
                <Row>
                  {[2, 4].map((g) => (
                    <Control key={g} className={growth === g ? "active" : ""} disabled={locked || growth === g} onClick={() => apply(g, later)}>
                      Grows ×{g}
                    </Control>
                  ))}
                </Row>
                <Slider label="Tax rate later" value={later} min={10} max={40} step={5} format={(v) => `${v}%`} disabled={locked} onChange={(v) => apply(growth, v)} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
