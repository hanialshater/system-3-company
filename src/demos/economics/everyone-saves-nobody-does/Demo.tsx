"use client";

// Paradox of thrift, toy Keynesian cross, round by round. Before the cut: income $1,000, spending
// $100 + 80% of last round's income = $900, investment fixed at $100. Every household cuts spending by
// $20 (spending = $80 + 80% of last round's income). Each round: spending from last income, income =
// spending + investment, saving = last income − spending. Round 1: spending 880, income 980, saving 120;
// it settles at income 900, saving 100 (= investment). Readouts round to whole dollars.
// Milestones: "round1" (saving $120 shown at the $20 cut) and "settled" (round 24+, income reads $900
// and saving $100 at the $20 cut). Both are recorded in a row under the chart that Reset does not clear.
// Optional $40 cut: settles at income $800, saving still $100.
// Model: fixed prices, fixed investment, no government or trade.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Y0 = 1000;
const INVEST = 100;
const MPC = 0.8;
const BASE = 100; // autonomous spending before the cut
const Q_CUT = 20;
const ROUNDS = 40;
const SETTLE = 24; // first round where income rounds to $900 at the $20 cut
const MILESTONES = ["round1", "settled"] as const;

const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

// Saving and income per round for a cut, from round 0 (before the cut).
function series(cut: number) {
  const inc = [Y0];
  const sav = [Y0 - (BASE + MPC * Y0)];
  for (let t = 1; t <= ROUNDS; t++) {
    const c = BASE - cut + MPC * inc[t - 1];
    sav.push(inc[t - 1] - c);
    inc.push(c + INVEST);
  }
  return { inc, sav };
}
const SERIES: Record<number, ReturnType<typeof series>> = { 20: series(20), 40: series(40) };

// Chart geometry (viewBox 320 × 170).
const XL = 46;
const XR = 306;
const YT = 26;
const YB = 142;
const SMAX = 150;
const px = (t: number) => XL + (t / ROUNDS) * (XR - XL);
const py = (v: number) => YB - (v / SMAX) * (YB - YT);

type Rec = { peak?: number; settled?: number; income?: number };

export default function EveryoneSaves({ slug }: { slug: string }) {
  const [cut, setCut] = useState(Q_CUT);
  const [round, setRound] = useState(0);
  const [rec, setRec] = useState<Rec>({});
  const { inc, sav } = SERIES[cut];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In a toy economy, income is $1,000: households spend $900 and businesses invest $100. Every household, yours included, cuts spending by $20 to save more. Once incomes settle, what is total saving?",
        options: ["$120", "$100", "$80"],
        answer: 1,
      }}
      exploreHint="Press Next round once, then Run to let incomes settle."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Saving first jumped to <strong>{usd(rec.peak ?? 120)}</strong>, then fell back to <strong>{usd(rec.settled ?? 100)}</strong> as income settled at{" "}
            {usd(rec.income ?? 900)}. Each $20 not spent was someone else’s lost income, so incomes fell until people could save only what businesses
            invest: $100.
          </p>
          <p>
            Everyone tried to save more; together they earned {usd(Y0 - (rec.income ?? 900))} less and saved the same. That is a paradox, shown in
            a toy model. If extra saving funded extra investment, the answer would change.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (t: number) => {
              setRound(t);
              if (cut !== Q_CUT) return;
              if (t >= 1) {
                setRec((r) => (r.peak === undefined ? { ...r, peak: sav[1] } : r));
                reach("round1");
              }
              if (t >= SETTLE) {
                setRec((r) => (r.settled === undefined ? { ...r, peak: r.peak ?? sav[1], settled: sav[t], income: inc[t] } : r));
                reach("settled");
              }
            };
            const pickCut = (c: number) => {
              setCut(c);
              setRound(0);
            };
            const shown = sav.slice(0, round + 1);
            const pts = shown.map((v, t) => `${px(t)},${py(v)}`).join(" ");
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: spending = ${BASE - cut} + 80% of last round’s income; investment fixed at $100; fixed prices</p>
                <svg viewBox="0 0 320 172" className="stage-svg" role="img" aria-label={locked ? "Total saving per round" : `Round ${round}: saving ${usd(sav[round])}`}>
                  <line x1={XL} y1={YB} x2={XR} y2={YB} className={s.edge} />
                  <line x1={XL} y1={YB} x2={XL} y2={YT} className={s.edge} />
                  <text x={XR} y={14} textAnchor="end" className={s.value}>
                    {locked ? "round ? · income ?" : `round ${round} · income ${usd(inc[round])}`}
                  </text>
                  {[0, 10, 20, 30, 40].map((t) => (
                    <text key={t} x={px(t)} y={YB + 15} textAnchor="middle" className={s.axis}>
                      {t}
                    </text>
                  ))}
                  <text x={(XL + XR) / 2} y={YB + 29} textAnchor="middle" className={s.axis}>
                    round
                  </text>
                  {!locked && (
                    <g>
                      {[50, 100, 150].map((v) => (
                        <g key={v}>
                          <line x1={XL} y1={py(v)} x2={XR} y2={py(v)} className={s.grid} />
                          <text x={XL - 5} y={py(v) + 4} textAnchor="end" className={s.axis}>
                            ${v}
                          </text>
                        </g>
                      ))}
                      <polyline points={pts} className={s.line} />
                      {shown.map((v, t) => (t <= 3 || t === round ? <circle key={t} cx={px(t)} cy={py(v)} r={t === round ? 5 : 3.5} className={s.dot} /> : null))}
                      <text x={Math.min(px(round) + 8, XR - 4)} y={py(sav[round]) - 9} textAnchor={round > 30 ? "end" : "start"} className={s.value}>
                        saving {usd(sav[round])}
                      </text>
                    </g>
                  )}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {locked
                    ? ""
                    : rec.peak === undefined
                      ? `Cut: $${cut} a household. Press Next round.`
                      : `$20 cut: round 1 saving ${usd(rec.peak)}` + (rec.settled !== undefined ? ` · settled ${usd(rec.settled)}, income ${usd(rec.income ?? 0)}` : "")}
                </p>
                <Row>
                  <Control disabled={locked || round >= ROUNDS} onClick={() => go(round + 1)}>
                    Next round
                  </Control>
                  <Control disabled={locked || round >= ROUNDS} onClick={() => go(ROUNDS)}>
                    Run
                  </Control>
                  <Control disabled={locked || round === 0} onClick={() => setRound(0)}>
                    Reset
                  </Control>
                  {phase !== "reveal" && [20, 40].map((c) => (
                    <Control key={c} className={cut === c ? "active" : ""} disabled={locked || cut === c} onClick={() => pickCut(c)}>
                      Cut ${c}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
