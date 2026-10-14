"use client";

// When did the world's life expectancy rise? Brief: company/domains/briefs/history.md #14 (check section 14,
// company/domains/briefs/checks/history-cycle2-check.mjs). Data: Gapminder Fast Track world life expectancy at
// birth (history-data.mjs: gmlex, gapminder-lex-global.csv, column lex), one point every 25 years 1800-2000
// plus 2023, exactly the ten points the check script lists. Care line: single-year falls are not drawn or
// labelled; the caption says one point every 25 years.
//
// Presets in DOM order (each sets the whole view; no Reset):
//   "1800 to 1900"  points 1800-1900 on a 0-40 axis, the span shaded; milestone `c19` records +2.8
//   "1900 to 2000"  the line extends to 2000 on a 0-80 axis; milestone `c20` records +34.7
//   "2000 to 2023"  the line extends to 2023; milestone `now` records 74.0 (quoted by the reveal)
//   "Years gained per century"  three bars of years gained (2.8, 34.7, 5.8), each with its start and end
// The locked frame draws only 1800-1900 (the question's given part) on the 0-40 axis, with no values, so
// nothing after 1900 shows before the commit. The reveal is gated on c19, c20 and now (the brief gated
// c19 and c20; the reveal also quotes 2023, so `now` is gated too; it is press 3 of 4).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

// history-data.mjs: gmlex, gapminder-lex-global.csv, rows "world", column lex.
const PTS: [number, number][] = [
  [1800, 30.64173],
  [1825, 31.1282],
  [1850, 31.37632],
  [1875, 32.41882],
  [1900, 33.48469],
  [1925, 39.25925],
  [1950, 51.78991],
  [1975, 60.77333],
  [2000, 68.20445],
  [2023, 74.04122],
];
const lex = (y: number) => PTS.find((p) => p[0] === y)![1];
const one = (x: number) => x.toFixed(1);
const SPANS = [
  { a: 1800, b: 1900, name: "1800 to 1900" },
  { a: 1900, b: 2000, name: "1900 to 2000" },
  { a: 2000, b: 2023, name: "2000 to 2023" },
] as const;
const gain = (a: number, b: number) => lex(b) - lex(a);

type View = "none" | "c19" | "c20" | "now" | "bars";

const W = 320;
const H = 186;
const L = 30;
const R = 300;
const T = 22;
const B = 152;
const X = (y: number) => L + ((y - 1800) / (2023 - 1800)) * (R - L);

export default function LifeExpectancyGainedLate({ slug }: { slug: string }) {
  const [view, setView] = useState<View>("none");
  const [g19, setG19] = useState<number | null>(null);
  const [g20, setG20] = useState<number | null>(null);
  const [l2023, setL2023] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Gapminder's world life expectancy rose from 30.6 to 33.5 years between 1800 and 1900. How much did it rise from 1900 to 2000?",
        options: ["About 35 years", "About 15 years", "About 5 years"],
        answer: 0,
      }}
      exploreHint="Press each span in turn, then compare the years gained per century."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Over the 1800s world life expectancy rose <strong>{g19 !== null ? one(g19) : "?"} years</strong>, from{" "}
            {one(lex(1800))} to {one(lex(1900))}. Over the 1900s it rose{" "}
            <strong>{g20 !== null ? one(g20) : "?"} years</strong>, to {one(lex(2000))}: about{" "}
            {g19 !== null && g20 !== null ? Math.round(g20 / g19) : "?"} times as much in one century as in the one
            before. By 2023 it was {l2023 !== null ? one(l2023) : "?"}.
          </p>
          <p>
            Where it stops: these are one source&apos;s world figures; the chart shows one year in every 25, and single
            years, such as epidemic years, fell sharply.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          view={view}
          setView={setView}
          g19={g19}
          g20={g20}
          l2023={l2023}
          rec={{ setG19, setG20, setL2023 }}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  view,
  setView,
  g19,
  g20,
  l2023,
  rec,
}: {
  locked: boolean;
  interact: () => void;
  view: View;
  setView: (v: View) => void;
  g19: number | null;
  g20: number | null;
  l2023: number | null;
  rec: { setG19: (v: number) => void; setG20: (v: number) => void; setL2023: (v: number) => void };
}) {
  const { reach } = useMilestones(interact, ["c19", "c20", "now"]);

  const go = (v: View) => {
    setView(v);
    if (v === "c19") {
      if (g19 === null) rec.setG19(gain(1800, 1900));
      reach("c19");
    }
    if (v === "c20") {
      if (g20 === null) rec.setG20(gain(1900, 2000));
      reach("c20");
    }
    if (v === "now") {
      if (l2023 === null) rec.setL2023(lex(2023));
      reach("now");
    }
  };

  const end = view === "c20" ? 2000 : view === "now" ? 2023 : 1900;
  const max = view === "none" || view === "c19" ? 40 : 80;
  const yv = (v: number) => B - (v / max) * (B - T);
  const ticks = max === 40 ? [0, 10, 20, 30, 40] : [0, 20, 40, 60, 80];
  const drawn = PTS.filter((p) => p[0] <= end);
  const span = view === "c19" ? SPANS[0] : view === "c20" ? SPANS[1] : view === "now" ? SPANS[2] : null;
  const labelled = view === "none" ? [] : [1800, 1900, 2000, 2023].filter((y) => y <= end);

  const presets: [View, string][] = [
    ["c19", "1800 to 1900"],
    ["c20", "1900 to 2000"],
    ["now", "2000 to 2023"],
    ["bars", "Years gained per century"],
  ];

  return (
    <div className={s.wrap}>
      {view === "bars" ? (
        <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label="Years of life expectancy gained in each span">
          <text x={4} y={11} className={s.title}>
            Years of life expectancy gained
          </text>
          {SPANS.map((sp, i) => {
            const g = gain(sp.a, sp.b);
            const y = 34 + i * 46;
            const w = (g / 40) * 200;
            return (
              <g key={sp.name}>
                <text x={4} y={y} className={s.barName}>
                  {sp.name}
                </text>
                <rect x={4} y={y + 6} width={w} height={18} className={i === 1 ? s.barBig : s.bar} />
                <text x={w + 10} y={y + 19} className={s.barVal}>
                  +{one(g)} ({one(lex(sp.a))} → {one(lex(sp.b))})
                </text>
              </g>
            );
          })}
        </svg>
      ) : (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={`stage-svg ${s.fit}`}
          role="img"
          aria-label={`World life expectancy at birth, 1800 to ${end}, one point every 25 years`}
        >
          <text x={4} y={11} className={s.title}>
            World life expectancy at birth, years
          </text>
          {span && <rect x={X(span.a)} y={T} width={X(span.b) - X(span.a)} height={B - T} className={s.band} />}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={L} x2={R} y1={yv(t)} y2={yv(t)} className={s.grid} />
              <text x={L - 4} y={yv(t) + 3.5} textAnchor="end" className={s.tick}>
                {t}
              </text>
            </g>
          ))}
          {[1800, 1850, 1900, 1950, 2000].map((y) => (
            <text key={y} x={X(y)} y={B + 14} textAnchor="middle" className={s.tick}>
              {y}
            </text>
          ))}
          <line x1={L} x2={L} y1={T} y2={B} className={s.axis} />
          <line x1={L} x2={R} y1={B} y2={B} className={s.axis} />
          <path d={drawn.map((p, i) => `${i ? "L" : "M"}${X(p[0]).toFixed(1)},${yv(p[1]).toFixed(1)}`).join("")} className={s.line} />
          {drawn.map((p) => (
            <circle key={p[0]} cx={X(p[0])} cy={yv(p[1])} r={2.6} className={s.dot} />
          ))}
          {labelled.map((y) => (
            <text
              key={y}
              x={X(y) + (y === 2023 ? -2 : y === 1800 ? 2 : y === 2000 && end === 2023 ? 4 : 0)}
              y={y === 2000 && end === 2023 ? yv(lex(y)) + 15 : yv(lex(y)) - 7}
              textAnchor={y === 2023 ? "end" : y === 1800 ? "start" : "middle"}
              className={s.val}
            >
              {one(lex(y))}
            </text>
          ))}
          <text x={R} y={B + 28} textAnchor="end" className={s.caption}>
            one point every 25 years
          </text>
        </svg>
      )}
      <div className={s.presets}>
        <Row>
          {presets.map(([v, name]) => (
            <Control
              key={v}
              className={`${view === v ? "active" : ""} ${v === "bars" ? s.wide : ""}`}
              aria-pressed={view === v}
              disabled={locked || view === v}
              onClick={() => go(v)}
            >
              {name}
            </Control>
          ))}
        </Row>
      </div>
      <Row>
        <Readout label="1800 to 1900" value={g19 !== null ? `+${one(g19)} yrs` : "–"} />
        <Readout label="1900 to 2000" value={g20 !== null ? `+${one(g20)} yrs` : "–"} />
        <Readout label="In 2023" value={l2023 !== null ? `${one(l2023)} yrs` : "–"} />
      </Row>
    </div>
  );
}
