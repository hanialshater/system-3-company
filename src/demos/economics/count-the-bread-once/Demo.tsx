"use client";

// GDP as value added. Chain: farmer sells wheat $1 -> miller sells flour $3 -> baker sells bread $6.
// Value added = sale price minus what the stage bought: 1, 2, 3, which add to the final $6.
// Key states (milestones): all three stages tapped (slices fill the $6 bread bar) and "count all sales" ($10).
// Model: a three-step chain, no imports, no stocks.

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
            Counting every sale gave <strong>${SALES_TOTAL}</strong>, because the wheat sat inside the flour price and the flour inside the bread price. Count only what each stage
            adds, or you count the wheat three times.
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
                <p className={s.msg}>Value added = sale price minus what the stage bought.</p>
                <svg viewBox="0 0 320 130" className="stage-svg" role="img" aria-label={locked ? "Bread price bar" : `Counted $${allSales ? SALES_TOTAL : counted}`}>
                  <text x={L} y={14} className={s.axis}>
                    bread price ($6) filled by value added
                  </text>
                  <rect x={L} y={20} width={FINAL * UNIT} height={30} rx={3} className={s.ghostFill} />
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
                        every sale added together ($10)
                      </text>
                      {STAGES.map((st) => {
                        const w = st.sale * UNIT;
                        const r = (
                          <g key={st.name}>
                            <rect x={x2} y={80} width={w} height={30} className={s.badFill} stroke="var(--bg-2)" />
                            <text x={x2 + 4} y={100} className={s.small}>
                              ${st.sale}
                            </text>
                          </g>
                        );
                        x2 += w;
                        return r;
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
