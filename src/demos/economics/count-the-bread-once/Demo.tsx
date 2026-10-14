"use client";

// GDP as value added. Chain: farmer sells wheat $1 -> miller sells flour $3 -> baker sells bread $6.
// Value added = sale price minus what the stage bought: 1, 2, 3, which add to the final $6.
// Key states (milestones): all three stages tapped (slices fill the $6 bread bar) and "count all sales" ($10).
// Model: a three-step chain, no imports, no stocks.
// v2: each segment of the all-sales bar is drawn as the value-added slices it contains, in the same colours
// (the $3 flour = $1 wheat + $2 milling; the $6 bread = $1 + $2 + $3), so the wheat visibly appears three
// times. The locked stage no longer labels the $6 bar or the value-added rule.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const STAGES = [
  { name: "Farmer", sale: 1, cls: "main" },
  { name: "Miller", sale: 3, cls: "soft" },
  { name: "Baker", sale: 6, cls: "goodFill" },
] as const;
const added = (i: number) => STAGES[i].sale - (i === 0 ? 0 : STAGES[i - 1].sale);
const SALES_TOTAL = STAGES.reduce((a, st) => a + st.sale, 0); // 10
const FINAL = STAGES[2].sale; // 6
const MILESTONES = ["slices", "allsales"] as const;

const L = 12;
const UNIT = 29; // px per dollar; 10 dollars = 290

export default function CountBreadOnce({ slug }: { slug: string }) {
  const [done, setDone] = useState<boolean[]>([false, false, false]);
  const [allSales, setAllSales] = useState(false);
  const counted = done.reduce((a, d, i) => a + (d ? added(i) : 0), 0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A farmer sells wheat for $${STAGES[0].sale} to a miller, who sells flour for $${STAGES[1].sale} to a baker, who sells bread for $${STAGES[2].sale} to a family. Sales total $${SALES_TOTAL}. How much does this chain produce (GDP)?`,
        options: [`$${SALES_TOTAL}`, `$${FINAL}`, `$${added(1)}`],
        answer: 1,
      }}
      exploreHint="Tap each stage to see what it adds, then switch to counting all sales."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Each stage added its sale minus what it bought: ${added(0)}, ${added(1)} and ${added(2)}. Together they fill the <strong>${FINAL}</strong> bread bar.
          </p>
          <p>
            Counting every sale gave <strong>${SALES_TOTAL}</strong>. Look inside the lower bar: the wheat&apos;s ${added(0)} slice appears three
            times and the milling&apos;s ${added(1)} slice twice, because the wheat sat inside the flour price and the flour inside the bread
            price. Count only what each stage adds, or you count the wheat three times.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const tap = (i: number) => {
              const next = done.map((d, j) => (j === i ? true : d));
              setDone(next);
              if (next.every(Boolean)) reach("slices");
            };
            const toggle = () => {
              const next = !allSales;
              setAllSales(next);
              if (next) reach("allsales");
            };
            let x = L;
            let x2 = L;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: a three-step chain, nothing imported</p>
                <p className={s.msg}>{locked ? "Wheat → flour → bread" : "Value added = sale price minus what the stage bought."}</p>
                <svg viewBox="0 0 320 130" className="stage-svg" role="img" aria-label={locked ? "Empty chart" : `Counted $${allSales ? SALES_TOTAL : counted}`}>
                  {!locked && (
                    <>
                      <text x={L} y={14} className={s.axis}>
                        bread price (${FINAL}) filled by value added
                      </text>
                      <rect x={L} y={20} width={FINAL * UNIT} height={30} rx={3} className={s.ghostFill} />
                    </>
                  )}
                  {STAGES.map((st, i) => {
                    const w = added(i) * UNIT;
                    const r = done[i] ? (
                      <g key={st.name}>
                        <rect x={x} y={20} width={w} height={30} className={s[st.cls]} />
                        <text x={x + 4} y={40} className={s.small}>
                          +${added(i)}
                        </text>
                      </g>
                    ) : null;
                    x += w;
                    return r;
                  })}
                  {allSales && (
                    <g>
                      <text x={L} y={74} className={s.axis}>
                        all sales (${SALES_TOTAL}): wheat counted 3 times
                      </text>
                      {STAGES.map((st, i) => {
                        const w = st.sale * UNIT;
                        const x0 = x2;
                        // A sale price is made of the value-added slices of every stage up to this one.
                        let xs = x0;
                        const parts = STAGES.slice(0, i + 1).map((inner, j) => {
                          const pw = added(j) * UNIT;
                          const el = (
                            <g key={inner.name}>
                              <rect x={xs} y={80} width={pw} height={30} className={s[inner.cls]} />
                              <text x={xs + pw / 2} y={99} textAnchor="middle" className={s.small}>
                                ${added(j)}
                              </text>
                            </g>
                          );
                          xs += pw;
                          return el;
                        });
                        x2 += w;
                        return (
                          <g key={st.name}>
                            {parts}
                            <rect x={x0} y={80} width={w} height={30} fill="none" stroke="var(--bad)" strokeWidth={2.5} />
                            <text x={x0 + w / 2} y={124} textAnchor="middle" className={s.small}>
                              {`${["wheat", "flour", "bread"][i]} $${st.sale}`}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  )}
                </svg>
                <Row>
                  <Readout label={allSales ? "Sum of all sales" : "Value added so far"} value={locked ? "?" : `$${allSales ? SALES_TOTAL : counted}`} />
                </Row>
                <Row>
                  {STAGES.map((st, i) => (
                    <Control key={st.name} disabled={locked || done[i]} onClick={() => tap(i)}>
                      {st.name}: add its slice
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Control className={allSales ? "active" : ""} disabled={locked} onClick={toggle}>
                    {allSales ? "Count only value added" : "Count all sales"}
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
