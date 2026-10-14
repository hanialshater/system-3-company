"use client";

// El Farol / minority game. 100 people; each goes only if they expect 60 or fewer.
// A shared forecast at or below 60 sends all 100; above 60 sends none. Randomising (each goes with
// probability 0.6, independently) averages 60 but is crowded (more than 60) on about 46.2% of nights.
// One picture: attendance night by night (last 40 nights), the 60 line, crowded nights in the bad colour.
// Seeded: mulberry32(1) for the random nights, 100 draws per night; seed 1 was the first tried, not chosen.
// Key state: both forecasts tried, and 100+ random nights run.
// v2 (r6): the forecast results and the longest random run are recorded when they happen and shown in a
// "Your runs" row that Reset does not clear; the reveal quotes those records (never "your 0 nights").
// v3 (wave G r7): title no longer assumes the forecast fails ("Will the forecast come true?"); "1 night" grammar.
// A zero-attendance night gets a "0" mark. Options are all bare numbers.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const PEOPLE = 100;
const OK = 60;
const P_GO = 0.6;
const SEED = 1;
const MAX_MIXED = 500;
const SHOWN = 40;
const MILESTONES = ["forecast-low", "forecast-high", "mixed-100"] as const;

/** Everyone trusts the same forecast: all go if it says OK or fewer, none if more. */
const attendanceFor = (forecast: number) => (forecast <= OK ? PEOPLE : 0);
/** Random nights, precomputed from one seeded stream. */
const MIXED: number[] = (() => {
  const r = mulberry32(SEED);
  return Array.from({ length: MAX_MIXED }, () => {
    let k = 0;
    for (let i = 0; i < PEOPLE; i++) if (r() < P_GO) k++;
    return k;
  });
})();

type Night = { kind: "forecast" | "mixed"; count: number; label: string };

// Geometry (viewBox 320 × 200).
const TOP = 20;
const BOT = 170;
const LEFT = 30;
const RIGHT = 310;
const yy = (v: number) => BOT - (v / PEOPLE) * (BOT - TOP);
const slotW = (RIGHT - LEFT) / SHOWN;

export default function TheBarNobodyCanForecast({ slug }: { slug: string }) {
  const [nights, setNights] = useState<Night[]>([]);
  const [mixedUsed, setMixedUsed] = useState(0);
  const [total, setTotal] = useState(0);
  const [fc, setFc] = useState<Record<number, number>>({});
  const [best, setBest] = useState<{ n: number; avg: number; pct: number } | null>(null);
  const mixed = MIXED.slice(0, mixedUsed);
  const crowded = mixed.filter((k) => k > OK).length;
  const avg = mixedUsed ? mixed.reduce((a, b) => a + b, 0) / mixedUsed : 0;
  const last = nights[nights.length - 1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "100 people go to a bar only if they expect 60 or fewer. All trust one forecast: 50 will come. How many come?",
        options: ["50", "60", "100"],
        answer: [50, 60, 100].indexOf(attendanceFor(50)),
      }}
      exploreHint="Try both forecasts, then let everyone flip a 60% coin for 100+ nights."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The forecast of 50 sent all <strong>{fc[50] ?? attendanceFor(50)}</strong>: everyone expected room, so everyone went. The forecast of 70 sent{" "}
            <strong>{fc[70] ?? attendanceFor(70)}</strong>. Any forecast everyone believes makes itself wrong.
          </p>
          {best && (
            <p>
              When each went 60% of the time, your {best.n} random nights averaged <strong>{best.avg.toFixed(1)}</strong>, yet{" "}
              <strong>{best.pct}%</strong> were crowded (46.2% in the long run): the average sits right at the limit, so nearly half
              the nights land above it.
            </p>
          )}
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const forecast = (f: number) => {
              const count = attendanceFor(f);
              setNights((ns) => [...ns, { kind: "forecast" as const, count, label: `forecast ${f}` }].slice(-SHOWN));
              setTotal((t) => t + 1);
              setFc((m) => ({ ...m, [f]: count }));
              reach(f <= OK ? "forecast-low" : "forecast-high");
            };
            const runMixed = (k: number) => {
              const to = Math.min(MAX_MIXED, mixedUsed + k);
              const added: Night[] = MIXED.slice(mixedUsed, to).map((count) => ({ kind: "mixed" as const, count, label: "60% coin" }));
              setNights((ns) => [...ns, ...added].slice(-SHOWN));
              setMixedUsed(to);
              setTotal((t) => t + (to - mixedUsed));
              const run = MIXED.slice(0, to);
              if (!best || to > best.n)
                setBest({
                  n: to,
                  avg: run.reduce((a, b) => a + b, 0) / to,
                  pct: Math.round((100 * run.filter((x) => x > OK).length) / to),
                });
              if (to >= 100) reach("mixed-100");
            };
            const reset = () => {
              setNights([]);
              setMixedUsed(0);
              setTotal(0);
            };
            // v4 (r8): if Reset emptied the chart, the reveal redraws the last nights of the longest run, so its
            // sentence about the average and the crowded nights points at bars that are on screen.
            const replay = phase === "reveal" && nights.length === 0 && best !== null;
            const shown: Night[] = locked
              ? []
              : replay
                ? MIXED.slice(Math.max(0, best.n - SHOWN), best.n).map((count) => ({ kind: "mixed" as const, count, label: "60% coin" }))
                : nights.slice(-SHOWN);
            const full = mixedUsed >= MAX_MIXED;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: 100 people · fine up to 60 · seed {SEED}</p>
                <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="Attendance night by night, with the 60-person limit">
                  <text x={LEFT} y={12} className={s.axis}>
                    attendance by night
                  </text>
                  <line x1={LEFT} y1={BOT} x2={RIGHT} y2={BOT} stroke="var(--line)" />
                  {[0, 50, 100].map((v) => (
                    <text key={v} x={LEFT - 4} y={yy(v) + 4} textAnchor="end" className={s.small}>
                      {v}
                    </text>
                  ))}
                  {shown.map((nt, i) => (
                    <rect
                      key={i}
                      x={LEFT + i * slotW + 1}
                      y={yy(nt.count)}
                      width={Math.max(1, slotW - 2)}
                      height={Math.max(1, BOT - yy(nt.count))}
                      className={nt.count > OK ? s.badFill : s.goodFill}
                      stroke={nt.kind === "forecast" ? "var(--fg)" : "none"}
                      strokeWidth={nt.kind === "forecast" ? 1.5 : 0}
                    />
                  ))}
                  {shown.map((nt, i) =>
                    nt.count === 0 ? (
                      <text key={`z${i}`} x={LEFT + i * slotW + slotW / 2} y={BOT - 4} textAnchor="middle" className={s.small}>
                        0
                      </text>
                    ) : null,
                  )}
                  <line x1={LEFT} y1={yy(OK)} x2={RIGHT} y2={yy(OK)} className={s.ghost} />
                  <text x={RIGHT} y={yy(OK) - 4} textAnchor="end" className={s.value}>
                    60: crowded above
                  </text>
                  {replay && (
                    <text x={RIGHT} y={BOT + 18} textAnchor="end" className={s.value}>
                      your {best.n}-night run, last {shown.length} nights
                    </text>
                  )}
                  {!locked && !replay && last && (
                    <text x={RIGHT} y={BOT + 18} textAnchor="end" className={s.value}>
                      night {total} ({last.label}): {last.count} came
                    </text>
                  )}
                </svg>

                <Row foldAtReveal>
                  <Control disabled={locked} onClick={() => forecast(50)}>
                    Forecast says 50
                  </Control>
                  <Control disabled={locked} onClick={() => forecast(70)}>
                    Forecast says 70
                  </Control>
                </Row>
                <Row foldAtReveal>
                  <span className={s.rowLabel}>Each goes 60%:</span>
                  <Control disabled={locked || full} onClick={() => runMixed(1)}>
                    1 night
                  </Control>
                  <Control disabled={locked || full} onClick={() => runMixed(10)}>
                    +10
                  </Control>
                  <Control disabled={locked || full} onClick={() => runMixed(100)}>
                    +100
                  </Control>
                  <Control disabled={locked || nights.length === 0} onClick={reset}>
                    Reset
                  </Control>
                </Row>
                {/* At the reveal the record row below carries these numbers (v4, phone fit). */}
                {phase !== "reveal" && (
                <Row>
                  <Readout label="Random nights" value={locked ? "?" : mixedUsed} />
                  <Readout label="Average" value={locked || !mixedUsed ? "?" : avg.toFixed(1)} />
                  <Readout label="Crowded" value={locked || !mixedUsed ? "?" : `${Math.round((100 * crowded) / mixedUsed)}%`} />
                </Row>
                )}
                <p className={s.rowLabel}>
                  {locked
                    ? ""
                    : [
                        ...Object.entries(fc).map(([f, c]) => `forecast ${f} → ${c} came`),
                        ...(best ? [`longest run: ${best.n} night${best.n === 1 ? "" : "s"}, avg ${best.avg.toFixed(1)}, ${best.pct}% crowded`] : []),
                      ].join(" · ")}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
