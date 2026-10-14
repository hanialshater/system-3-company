"use client";

// Maximum sustainable yield. Logistic lake with a fixed yearly catch H:
// dN/dt = 0.5 N (1 - N/1000) - H, N(0) = 1000 (full), Euler step 0.001 year, years 0 to 60.
// Growth 0.5 N (1 - N/1000) peaks at 125 a year when N = 500, so any catch above 125 empties the lake.
// The quota slider draws each catch's curve at once; every catch tried stays as a faint trace.
// Key state: a catch of 130 (empties, the question's case) and a catch of 120 or less (settles).
// Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const K = 1000;
const R = 0.5;
const YEARS = 60;
const Q = 130; // the question's catch
const QUOTA = { min: 80, max: 150, step: 10, start: 110 };
const MAX_GROWTH = (R * K) / 4; // 125, at N = K/2
const MILESTONES = ["settled", "q130"] as const;

type Run = { pts: [number, number][]; end: number; emptyYear: number | null };

function simulate(h: number): Run {
  const dt = 0.001;
  let n = K;
  const pts: [number, number][] = [[0, n]];
  for (let i = 1; i <= YEARS / dt; i++) {
    n += dt * (R * n * (1 - n / K) - h);
    const t = i * dt;
    if (n <= 0) {
      pts.push([t, 0]);
      return { pts, end: 0, emptyYear: t };
    }
    if (i % 250 === 0) pts.push([t, n]);
  }
  return { pts, end: n, emptyYear: null };
}

const RUNS: Record<number, Run> = {};
for (let h = QUOTA.min; h <= QUOTA.max; h += QUOTA.step) RUNS[h] = simulate(h);
const yr = (t: number) => Math.ceil(t); // "empty in year 55" for t = 54.9
const left = (h: number) => Math.round(RUNS[h].end);
const endText = (h: number) => (RUNS[h].emptyYear === null ? `${left(h)} fish` : `empty, year ${yr(RUNS[h].emptyYear!)}`);

const W = 340, H = 196;
const X0 = 36, X1 = 284, Y0 = 34, Y1 = 176;
const X = (t: number) => X0 + (t / YEARS) * (X1 - X0);
const Y = (n: number) => Y1 - (n / K) * (Y1 - Y0);
const path = (r: Run) => r.pts.map(([t, n], i) => `${i ? "L" : "M"}${X(t).toFixed(1)},${Y(n).toFixed(1)}`).join(" ");

function Stage({ locked, interact, quota, setQuota, tried, setTried, settleQ, setSettleQ }: {
  locked: boolean;
  interact: () => void;
  quota: number;
  setQuota: (v: number) => void;
  tried: number[];
  setTried: (v: number[]) => void;
  settleQ: number | null;
  setSettleQ: (v: number) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const run = RUNS[quota];
  const fish = locked ? K : left(quota);
  const dots = Math.round(fish / 10);
  const labelled = new Set([quota, ...(tried.includes(Q) ? [Q] : []), ...(settleQ !== null ? [settleQ] : [])]);

  const go = (v: number) => {
    setQuota(v);
    if (!tried.includes(v)) setTried([...tried, v]);
    if (v === Q) reach("q130");
    if (v <= 120 && settleQ === null) {
      setSettleQ(v);
      reach("settled");
    }
  };

  const msg = locked
    ? "A lake holds at most 1,000 fish and starts full. A few fish multiply fast; a crowded lake barely grows."
    : "Toy lake: no weather, no luck. Faint lines: catches you tried.";

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{msg}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={locked ? "A full lake of 1,000 fish and an empty chart" : `Catch ${quota} a year: after 60 years, ${endText(quota)}`}>
        {/* the lake at year 60: 1 dot = 10 fish */}
        {Array.from({ length: 100 }, (_, i) => (
          <circle key={i} cx={X0 + 3 + (i % 50) * 4.8} cy={8 + Math.floor(i / 50) * 7} r={2.1} className={i < dots ? s.fish : s.gone} />
        ))}
        <text x={W - 4} y={11} textAnchor="end" className={s.tick}>{locked ? "start" : "year 60"}</text>
        <text x={W - 4} y={22} textAnchor="end" className={s.tick}>• = 10 fish</text>

        {[0, K].map((v) => (
          <g key={v}>
            <line x1={X0} x2={X1} y1={Y(v)} y2={Y(v)} className={s.grid} />
            <text x={X0 - 4} y={Y(v) + 3} textAnchor="end" className={s.tick}>{v.toLocaleString("en-US")}</text>
          </g>
        ))}
        {[0, 20, 40, 60].map((t) => (
          <text key={t} x={X(t)} y={H - 6} textAnchor="middle" className={s.tick}>{t === 60 ? "60 yr" : t}</text>
        ))}

        {!locked && (
          <>
            <line x1={X0} x2={X1} y1={Y(K / 2)} y2={Y(K / 2)} className={s.half} />
            {tried.filter((h) => h !== quota).map((h) => (
              <path key={h} d={path(RUNS[h])} className={s.trace} />
            ))}
            <path d={path(run)} className={s.curve} />
            <text x={X0 + 4} y={Y(K / 2) + 12} className={s.halfText}>half full: grows fastest, {MAX_GROWTH} a year</text>
            {[...labelled].map((h) => {
              const r = RUNS[h];
              const ex = r.emptyYear === null ? X1 : X(r.emptyYear);
              const ey = Y(r.end);
              return (
                <g key={`l${h}`}>
                  <circle cx={ex} cy={ey} r={h === quota ? 3.5 : 2.5} className={h === quota ? s.endDot : s.traceDot} />
                  <text x={r.emptyYear === null ? X1 + 3 : ex} y={r.emptyYear === null ? ey + 3 : ey - 6}
                    textAnchor={r.emptyYear === null ? "start" : "middle"} className={h === quota ? s.endText : s.traceText}>
                    {r.emptyYear === null ? `${left(h)} (${h})` : `${h}: empty`}
                  </text>
                </g>
              );
            })}
          </>
        )}
      </svg>
      <Row>
        <Slider label="Catch per year" value={quota} min={QUOTA.min} max={QUOTA.max} step={QUOTA.step} disabled={locked}
          format={(v) => `${v} fish`} onChange={go} />
      </Row>
      <Row>
        <Readout label="After 60 years" value={locked ? "?" : endText(quota)} />
      </Row>
    </div>
  );
}

export default function SteadyCatchFromALake({ slug }: { slug: string }) {
  const [quota, setQuota] = useState(QUOTA.start);
  const [tried, setTried] = useState<number[]>([QUOTA.start]);
  const [settleQ, setSettleQ] = useState<number | null>(null);
  const q = settleQ ?? 120;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You catch ${Q} fish every year. After 60 years, how many fish are left?`,
        options: ["About 870", "About 600", "About 0"],
        answer: 2,
      }}
      exploreHint={`Set the catch to ${Q}, and to 120 or less. Compare the endings.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your run, a catch of {Q} a year emptied the lake in year {yr(RUNS[Q].emptyYear!)}: slowly for decades, then
            fast. A catch of {q} settled near {left(q)} fish. {Q - q} fewer fish a year changed the ending.
          </p>
          <p>
            This lake adds the most fish, {MAX_GROWTH} a year, when it is half full (the dashed line). Any catch above{" "}
            {MAX_GROWTH} takes more than the lake can ever replace, so it empties.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} quota={quota} setQuota={setQuota} tried={tried} setTried={setTried}
          settleQ={settleQ} setSettleQ={setSettleQ} />
      )}
    </Lesson>
  );
}
