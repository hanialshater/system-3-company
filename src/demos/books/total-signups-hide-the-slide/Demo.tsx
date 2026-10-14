"use client";

// Total sign-ups hide the slide (The Lean Startup, Ries 2011, ch. 7, unconfirmed; brief
// company/domains/briefs/books.md #8; numbers checked in company/domains/briefs/checks/books-cycle1-check.mjs #8).
// Model (deterministic): 1,000 visitors a month for six months.
//   getting worse:  10, 9, 8, 7, 6, 5% -> new 100, 90, 80, 70, 60, 50 -> total 100, 190, 270, 340, 400, 450
//   getting better:  5, 6, 7, 8, 9, 10% -> new 50, 60, 70, 80, 90, 100 -> total 50, 110, 180, 260, 350, 450
// Presets (DOM order, each sets the full state, no Reset): "Total: getting worse", "Each month: getting worse",
// "Total: getting better". Milestones: cohort-seen (month-6 rate recorded), better-total-seen (final total
// recorded). The worse total is recorded too (Seen row) but does not gate. Once the worse total has been
// seen, it stays on the chart as a dashed trace under the better total, so both lines end at 450 at the reveal.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const VISITORS = 1000;
const RATES = {
  worse: [10, 9, 8, 7, 6, 5],
  better: [5, 6, 7, 8, 9, 10],
} as const;
type Case = keyof typeof RATES;
const added = (c: Case) => RATES[c].map((r) => (VISITORS * r) / 100);
const cumulative = (c: Case) => {
  let t = 0;
  return added(c).map((n) => (t += n));
};
const TOTAL = { worse: cumulative("worse"), better: cumulative("better") };
const MILESTONES = ["cohort-seen", "better-total-seen"] as const;

type View = "none" | "worseTotal" | "worseCohort" | "betterTotal";

// Geometry (viewBox 320 x 190).
const XL = 40;
const XR = 312;
const YT = 30;
const YB = 156;
const STEP = (XR - XL) / 6;
const mx = (i: number) => XL + (i + 0.5) * STEP;
const yTot = (v: number) => YB - (v / 500) * (YB - YT);
const yPct = (p: number) => YB - (p / 12) * (YB - YT);
const path = (vals: readonly number[]) => vals.map((v, i) => `${i ? "L" : "M"}${mx(i).toFixed(1)},${yTot(v).toFixed(1)}`).join(" ");

export default function TotalSignupsHideTheSlide({ slug }: { slug: string }) {
  const [view, setView] = useState<View>("none");
  const [rec, setRec] = useState<{ worseTotal?: number; conv?: number; betterTotal?: number }>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Total customers rose every month for six months. Visitors were the same each month. What happened to each month's share of visitors who became customers?",
        options: ["It rose", "It stayed the same", "It fell", "The total can't tell you"],
        answer: 3,
      }}
      exploreHint="Press the three views in order: the total, each month, then the other total."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your total kept climbing while each month converted worse, down to <strong>{rec.conv ?? 5}%</strong> by month six. When
            months got better instead, the total still ended at <strong>{rec.betterTotal ?? 450}</strong>. A running total
            can&apos;t fall, so it can&apos;t tell you which way you are going.
          </p>
          <p>
            <em>The Lean Startup</em> calls numbers like this vanity metrics and argues for watching each month&apos;s group.
          </p>
          <p>
            <strong>Does it hold up?</strong> Holds up, as arithmetic. One trial with 116 startups found teams taught to test ideas
            this way earned more.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (v: View) => {
              setView(v);
              if (v === "worseTotal") setRec((r) => (r.worseTotal === undefined ? { ...r, worseTotal: TOTAL.worse[5] } : r));
              if (v === "worseCohort") {
                setRec((r) => (r.conv === undefined ? { ...r, conv: RATES.worse[5] } : r));
                reach("cohort-seen");
              }
              if (v === "betterTotal") {
                setRec((r) => (r.betterTotal === undefined ? { ...r, betterTotal: TOTAL.better[5] } : r));
                reach("better-total-seen");
              }
            };
            const on = !locked;
            const cohort = on && view === "worseCohort";
            const totalCase: Case | null = !on ? null : view === "worseTotal" ? "worse" : view === "betterTotal" ? "better" : null;
            const showTrace = totalCase === "better" && rec.worseTotal !== undefined;
            const seen: string[] = [];
            if (rec.worseTotal !== undefined || rec.conv !== undefined) {
              const bits = [rec.worseTotal !== undefined ? `total ${rec.worseTotal}` : null, rec.conv !== undefined ? `month 6 at ${rec.conv}%` : null];
              seen.push(`Worse: ${bits.filter(Boolean).join(", ")}`);
            }
            if (rec.betterTotal !== undefined) seen.push(`Better: total ${rec.betterTotal}`);
            const readout =
              !on || view === "none"
                ? ""
                : view === "worseCohort"
                  ? `Month 6: ${RATES.worse[5]}% of visitors joined`
                  : `Total after month 6: ${TOTAL[totalCase ?? "worse"][5]} customers`;

            return (
              <div className={s.wrap}>
                <svg
                  viewBox="0 0 320 190"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    cohort
                      ? "Share of each month's visitors who joined: 10, 9, 8, 7, 6 and 5 percent"
                      : totalCase
                        ? `Total customers by month, ${totalCase === "worse" ? "getting worse" : "getting better"}: ends at ${TOTAL[totalCase][5]}`
                        : "Total customers, rising every month for six months"
                  }
                >
                  <text x={XL - 34} y={14} className={s.axisTitle}>
                    {cohort ? "joined that month" : "total customers"}
                  </text>
                  <text x={XR} y={14} textAnchor="end" className={s.axisTitle}>
                    1,000 visitors a month
                  </text>
                  {(cohort ? [0, 5, 10] : [0, 250, 500]).map((t) => {
                    const y = cohort ? yPct(t) : yTot(t);
                    return (
                      <g key={`${cohort ? "p" : "t"}${t}`}>
                        {t > 0 && <line x1={XL} y1={y} x2={XR} y2={y} className={s.grid} />}
                        <text x={XL - 5} y={y + 4} textAnchor="end" className={s.axis}>
                          {cohort ? `${t}%` : t}
                        </text>
                      </g>
                    );
                  })}
                  <line x1={XL} y1={YB} x2={XR} y2={YB} className={s.edge} />
                  {RATES.worse.map((_, i) => (
                    <text key={i} x={mx(i)} y={YB + 15} textAnchor="middle" className={s.axis}>
                      {i + 1}
                    </text>
                  ))}
                  <text x={XL - 5} y={YB + 15} textAnchor="end" className={s.axis}>
                    month
                  </text>

                  {cohort &&
                    RATES.worse.map((r, i) => (
                      <g key={i}>
                        <rect x={mx(i) - STEP * 0.3} y={yPct(r)} width={STEP * 0.6} height={YB - yPct(r)} rx={2} className={s.bar} />
                        <text x={mx(i)} y={yPct(r) - 4} textAnchor="middle" className={s.barLabel}>
                          {r}%
                        </text>
                      </g>
                    ))}

                  {!cohort && !totalCase && <path d={path(TOTAL.worse)} className={s.idleLine} />}

                  {showTrace && (
                    <g>
                      <path d={path(TOTAL.worse)} className={s.trace} />
                      {TOTAL.worse.map((v, i) => (
                        <circle key={i} cx={mx(i)} cy={yTot(v)} r={2.5} className={s.traceDot} />
                      ))}
                      <text x={mx(1) - 6} y={yTot(TOTAL.worse[1]) - 8} textAnchor="middle" className={`${s.tag} ${s.tagWorse}`}>
                        worse
                      </text>
                    </g>
                  )}

                  {totalCase && (
                    <g>
                      <path d={path(TOTAL[totalCase])} className={s.line} />
                      {TOTAL[totalCase].map((v, i) => (
                        <circle key={i} cx={mx(i)} cy={yTot(v)} r={3.5} className={s.dot} />
                      ))}
                      <text x={mx(5)} y={yTot(TOTAL[totalCase][5]) - 9} textAnchor="middle" className={s.endLabel}>
                        {TOTAL[totalCase][5]}
                      </text>
                      {showTrace && (
                        <text x={mx(1) + 8} y={yTot(TOTAL.better[1]) + 16} textAnchor="middle" className={`${s.tag} ${s.tagBetter}`}>
                          better
                        </text>
                      )}
                    </g>
                  )}
                </svg>
                <p className={s.readout} aria-live="polite">
                  {readout}
                </p>
                <p className={s.seen}>{on && seen.length > 0 ? `Seen: ${seen.join(" · ")}` : ""}</p>
                <Row foldAtReveal>
                  <Control className={view === "worseTotal" ? "active" : ""} disabled={locked || view === "worseTotal"} onClick={() => go("worseTotal")}>
                    Total: getting worse
                  </Control>
                  <Control className={view === "worseCohort" ? "active" : ""} disabled={locked || view === "worseCohort"} onClick={() => go("worseCohort")}>
                    Each month: getting worse
                  </Control>
                  <Control className={view === "betterTotal" ? "active" : ""} disabled={locked || view === "betterTotal"} onClick={() => go("betterTotal")}>
                    Total: getting better
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
