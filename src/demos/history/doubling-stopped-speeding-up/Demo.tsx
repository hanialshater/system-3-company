"use client";

// History: world population doublings, 1800-2023. history-data.mjs: gmpop, gapminder-pop-global.csv
// (Gapminder Fast Track, column pop; estimates before 1950). Brief: company/domains/briefs/history.md #15;
// numbers: section 15 of history-cycle2-check.mjs.
//
// POP below is the file's column for 1800..2023 in order, copied unchanged; no year after 2023 is in the array
// (v2, FC39/FC41 c3 and the cm-history ruling: the file's 2024 value is a same-year projection, not a record).
// Every number is computed here: first year at or above 1, 2, 4, 8 billion; yearly growth 100 x (P[y+1] / P[y] - 1),
// labelled by its start year (1963 = 1963 to 1964), so the last rate is 2022 to 2023 (0.88%); peak over 1900-2022.
// Locked stage: axes only (the line would let a learner read off when 8 billion came).
// Doubling spans, once pressed, stay marked in a strip under the year axis in both views, each with its years and
// the people it added (+1, +2, +4 bn), which the reveal's "4 billion people, not 2" quotes.
// v3 (W-990, learner r1): options are half / same / double the 2-to-4 span (24, 48, 96), all built the same way;
// the right one, "About 48", covers 47.
// Milestones: d3 (4 to 8 billion) and rate, as in the brief. No Reset.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FIRST = 1800;
const SHOWN_TO = 2023;
const POP = [
  985083734.9,988518009,991993182,995509576.3,999067549.9,1002667483,1006309768,1009994839,
  1013723142,1017495164,1022935503,1028432388,1034582343,1041401489,1048392002,1055558056,
  1062904018,1070434459,1078154164,1085762043,1093244955,1100353908,1107285721,1114556675,
  1121928309,1129402060,1136978934,1144660456,1152448156,1159787562,1166675351,1173107948,
  1179053710,1184508718,1190024997,1195603662,1201245854,1206952746,1212725543,1218426772,
  1224058418,1229625751,1235130935,1240576195,1246102552,1251711693,1257405291,1263185490,
  1269054017,1274142450,1278456221,1281435587,1283645240,1285093222,1286652188,1288323525,
  1290108648,1292009053,1294026315,1296418024,1299177218,1302306139,1305796770,1309637058,
  1313559841,1317558405,1321632098,1325788657,1330026600,1334846077,1340260288,1346187487,
  1352784067,1359956560,1367199981,1374542917,1381965124,1389436423,1396973859,1405040203,
  1413675365,1422901315,1432720420,1443125655,1453662017,1464387303,1475219751,1486208327,
  1497325898,1508217029,1518897234,1529316173,1539487487,1549414772,1559480011,1569696358,
  1579999192,1590448296,1601022068,1612252364,1624107703,1636583272,1649710331,1663483518,
  1677432134,1691560792,1705875918,1720398255,1735131557,1749280311,1762840847,1775738691,
  1788143254,1799957755,1811966782,1824173992,1836522366,1848986561,1862155373,1876069755,
  1890751739,1906083900,1922074205,1938750246,1955702335,1972916475,1990404348,2008163449,
  2026209747,2044958196,2064454090,2084705401,2105697340,2127386777,2149351915,2171601414,
  2194230902,2217226438,2240632316,2262963926,2284199131,2304364035,2323438259,2341257167,
  2358978018,2377034198,2395728530,2415389220,2435843977,2461763063,2493092848,2536927035,
  2584086339,2634106235,2685894860,2740213792,2795409994,2852618337,2911249671,2965950351,
  3015470894,3064869675,3123374315,3192807828,3264487339,3334533703,3404041125,3473412880,
  3545187251,3619491579,3694683794,3769847865,3844917680,3920805042,3996416096,4070735277,
  4144246377,4217863796,4292097502,4368539528,4447606236,4528777306,4612673421,4697327573,
  4782175519,4868943465,4958072838,5049746397,5141992542,5234431732,5327803110,5418735891,
  5505989816,5591544797,5675551255,5758878982,5842055734,5924787816,6007066690,6089006339,
  6171702993,6254936459,6337730342,6420361634,6503377772,6586970132,6671452015,6757308781,
  6844457662,6932766416,7021732148,7110923765,7201202485,7291793585,7381616244,7470491872,
  7558554526,7645617954,7729902781,7811293698,7887001292,7954448391,8021407192,8091734930
];
const P = (y: number) => POP[y - FIRST];
const YEARS = Array.from({ length: SHOWN_TO - FIRST + 1 }, (_, i) => FIRST + i);
const firstAt = (t: number) => YEARS.find((y) => P(y) >= t)!;
const B1 = firstAt(1e9);
const B2 = firstAt(2e9);
const B4 = firstAt(4e9);
const B8 = firstAt(8e9);
const gr = (y: number) => 100 * (P(y + 1) / P(y) - 1);
const RATE_YEARS = YEARS.filter((y) => y < SHOWN_TO);
const PEAK = RATE_YEARS.filter((y) => y >= 1900).reduce((a, y) => (gr(y) > gr(a) ? y : a), 1900);
const LAST = SHOWN_TO - 1;
const G_LAST = gr(LAST);
const SPANS = [
  { id: "d1", a: 1, b: 2, from: B1, to: B2 },
  { id: "d2", a: 2, b: 4, from: B2, to: B4 },
  { id: "d3", a: 4, b: 8, from: B4, to: B8 },
] as const;
const f2 = (x: number) => x.toFixed(2);

const MILESTONES = ["d3", "rate"] as const;
type View = "none" | "d1" | "d2" | "d3" | "rate";

const W = 340;
const H = 193;
const L = 34;
const R = 326;
const T = 26;
const B = 140;
const xs = (y: number) => L + ((y - FIRST) / (SHOWN_TO - FIRST)) * (R - L);
const yPop = (p: number) => B - (p / 8.5e9) * (B - T);
const yRate = (g: number) => B - (g / 2.5) * (B - T);
const popPath = YEARS.map((y, i) => `${i ? "L" : "M"}${xs(y).toFixed(1)} ${yPop(P(y)).toFixed(1)}`).join(" ");
const ratePath = RATE_YEARS.map((y, i) => `${i ? "L" : "M"}${xs(y).toFixed(1)} ${yRate(gr(y)).toFixed(1)}`).join(" ");

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [view, setView] = useState<View>("none");
  const [spans, setSpans] = useState<string[]>([]);
  const rate = view === "rate";
  const go = (v: View) => {
    setView(v);
    if (v !== "rate" && v !== "none") setSpans((m) => (m.includes(v) ? m : [...m, v]));
    if (v === "d3") reach("d3");
    if (v === "rate") reach("rate");
  };
  const cur = SPANS.find((d) => d.id === view);
  const readLabel = rate ? "Growth per year" : "Doubling";
  const readValue =
    locked || view === "none"
      ? "?"
      : rate
        ? `peak ${f2(gr(PEAK))}% in ${PEAK}; ${f2(G_LAST)}%, ${LAST} to ${SHOWN_TO}`
        : `${cur!.a} to ${cur!.b} billion: ${cur!.to - cur!.from} years`;
  const label = locked
    ? "Axes for world population, billions, 1800 to 2023. The line appears after you predict."
    : (rate
        ? `Line of world population growth per year, percent, 1800 to 2023, peaking at ${f2(gr(PEAK))} in ${PEAK}.`
        : "Line of world population, billions, 1800 to 2023.") +
      SPANS.filter((d) => spans.includes(d.id)).map((d) => ` ${d.a} to ${d.b} billion took ${d.to - d.from} years and added ${d.b - d.a} billion people.`).join("");

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={label}>
        <text x={4} y={11} className={s.title}>
          {rate ? "world population growth, % a year" : "world population, billions"}
        </text>
        <line x1={L} y1={B} x2={R} y2={B} className={s.axis} />
        <line x1={L} y1={T} x2={L} y2={B} className={s.axis} />
        {(rate ? [0, 1, 2] : [0, 2, 4, 6, 8]).map((v) => (
          <text key={v} x={L - 4} y={(rate ? yRate(v) : yPop(v * 1e9)) + 4} className={s.tick} textAnchor="end">
            {rate ? `${v}%` : v}
          </text>
        ))}
        {[1800, 1850, 1900, 1950, 2000].map((y) => (
          <g key={y}>
            <line x1={xs(y)} y1={B} x2={xs(y)} y2={B + 4} className={s.axis} />
            <text x={xs(y)} y={B + 16} className={s.tick} textAnchor="middle">
              {y}
            </text>
          </g>
        ))}
        {!locked && (
          <>
            {!rate &&
              SPANS.filter((d) => spans.includes(d.id)).map((d) => (
                <g key={d.id}>
                  <line x1={L} y1={yPop(d.b * 1e9)} x2={xs(d.to)} y2={yPop(d.b * 1e9)} className={s.guide} />
                  <circle cx={xs(d.from)} cy={yPop(P(d.from))} r={3} className={s.dot} />
                  <circle cx={xs(d.to)} cy={yPop(P(d.to))} r={view === d.id ? 5 : 3.5} className={view === d.id ? s.on : s.dot} />
                </g>
              ))}
            <path d={rate ? ratePath : popPath} className={s.line} />
            {rate && (
              <>
                <circle cx={xs(PEAK)} cy={yRate(gr(PEAK))} r={5} className={s.on} />
                <text x={xs(PEAK) - 8} y={yRate(gr(PEAK)) + 2} className={s.lab} textAnchor="end">
                  peak {PEAK}: {f2(gr(PEAK))}%
                </text>
                <circle cx={xs(LAST)} cy={yRate(G_LAST)} r={3.5} className={s.dot} />
                <text x={xs(LAST) - 4} y={yRate(G_LAST) + 16} className={s.lab} textAnchor="end">
                  {LAST} to {SHOWN_TO}: {f2(G_LAST)}%
                </text>
              </>
            )}
            {/* doubling spans, kept in both views */}
            {SPANS.filter((d) => spans.includes(d.id)).map((d) => (
              <g key={d.id}>
                <rect x={xs(d.from)} y={B + 21} width={xs(d.to) - xs(d.from)} height={6} rx={2} className={view === d.id ? s.spanOn : s.span} />
                <text x={(xs(d.from) + xs(d.to)) / 2} y={B + 37} className={s.lab} textAnchor="middle">
                  {d.id === "d1" ? `${d.a} to ${d.b} bn: ` : ""}{d.to - d.from} yrs
                </text>
                <text x={(xs(d.from) + xs(d.to)) / 2} y={B + 49} className={s.lab} textAnchor="middle">
                  +{d.b - d.a} bn
                </text>
              </g>
            ))}
          </>
        )}
        {locked && (
          <text x={(L + R) / 2} y={(T + B) / 2} className={s.tick} textAnchor="middle">
            The line appears after you predict.
          </text>
        )}
      </svg>
      <Row foldAtReveal>
        <Control disabled={locked} className={view === "d1" ? "active" : ""} onClick={() => go("d1")}>
          1 to 2 billion
        </Control>
        <Control disabled={locked} className={view === "d2" ? "active" : ""} onClick={() => go("d2")}>
          2 to 4 billion
        </Control>
        <Control disabled={locked} className={view === "d3" ? "active" : ""} onClick={() => go("d3")}>
          4 to 8 billion
        </Control>
        <Control disabled={locked} className={view === "rate" ? "active" : ""} onClick={() => go("rate")}>
          Growth per year
        </Control>
      </Row>
      <Readout label={readLabel} value={readValue} />
    </div>
  );
}

export default function DoublingStoppedSpeedingUp({ slug }: { slug: string }) {
  const [d1, d2, d3] = SPANS.map((d) => d.to - d.from);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `World population took ${d1} years to go from 1 to 2 billion, and ${d2} years to reach 4 billion. How long to reach 8?`,
        options: [`About ${d2 / 2} years`, `About ${d2} years`, `About ${d2 * 2} years`],
        answer: 1,
      }}
      exploreHint="Press each doubling, then look at growth per year."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The doublings took {d1} years, then {d2}, then {d3}: the last was about as fast as the one before. Growth per
            year peaked at {f2(gr(PEAK))}% in {PEAK} and was {f2(G_LAST)}% from {LAST} to {SHOWN_TO}.
          </p>
          <p>
            It added {SPANS[2].b - SPANS[2].a} billion people, not {SPANS[1].b - SPANS[1].a}, only because it started from
            twice as many; as a share of those alive, growth is slowing.
          </p>
          <p>
            Where it stops: early totals are the least certain, and the chart stops at the present; any later number is a
            projection, not a record.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
