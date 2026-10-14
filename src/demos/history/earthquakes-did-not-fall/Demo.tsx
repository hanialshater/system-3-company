"use client";

// What did earthquake deaths do? Brief: company/domains/briefs/history.md #19 (check section 19,
// company/domains/briefs/checks/history-cycle2-check.mjs). Data: vega-datasets 3.2.1 disasters.csv (history-data.mjs:
// vega; EM-DAT via Our World in Data per the package description), entities "All natural disasters" and
// "Earthquake", deaths by year 1900-2017; a year with no row counts as zero (1904 for all disasters; 1900,
// 1904, 1911, 1916, 1919, 1921, 1937 for earthquakes). World population: history-data.mjs: gmpop (Gapminder),
// 1900-2017. Care line: no country, place or event is named (the file has none); years only; no imagery.
//
// Side by side: the left half of the stage is 1900-1958, the right half 1959-2017, on one shared axis.
// Presets in DOM order (each sets the whole view; no Reset):
//   "All disasters"              all-disaster and earthquake totals per half (0-30 million); milestone `all`
//   "Earthquakes"                earthquake totals only (0-1.5 million); milestone `quake`
//   "Per million people"         earthquake deaths per million people a year, with each half's mean world
//                                population; milestone `percap`
//   "Three biggest years"        earthquake deaths year by year, the three biggest later years marked; milestone `top3`
// The locked frame shows the two empty halves. The reveal is gated on all four milestones, because it quotes
// a value from each (the brief gated quake and percap only); all four are on the QA path. Preset labels drop
// the brief's ", two halves" (the panel headers say it; the long labels did not fit a 390 px button).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const RAW = {"all":"1267360,200018,46037,6506,0,22758,42970,1325641,75033,1511524,148233,102408,52093,882,289,32167,300,2523507,461113,5500,3204224,1200000,101243,255701,303009,5832,427852,215160,3004895,8377,10572,3706227,73296,34296,21087,272817,5301,12025,2225,563178,23023,10195,1608235,1910322,15906,10376,35490,17647,120131,120370,6728,15042,8965,12956,41872,6026,7737,10603,3950,2013242,39188,17341,17370,37746,12892,1565517,17181,10103,21461,11687,387507,18086,20045,110555,87504,14858,280469,22406,38096,7341,23089,119697,13973,461561,16273,60232,10349,21533,57464,12611,53141,189707,18911,21821,15590,27166,31595,30124,62672,76886,16667,39493,21342,113558,244772,93566,29893,22422,242236,16037,329900,34143,11619,22225,20882,23893,10201,2087","quake":"0,18,6747,6000,0,22500,31966,25641,75000,5146,1762,0,923,150,149,29986,0,19450,10379,0,180000,0,1100,152362,767,5013,12,206142,635,3317,5081,1537,70006,16180,15496,66110,26,0,166,63094,1275,189,7235,4332,14984,5961,5153,633,115618,6486,1833,1554,2432,2717,3344,959,763,6993,227,103,19395,60,12209,1700,335,683,2752,1013,10858,3353,78599,1107,15170,552,24808,12632,276994,3098,25162,2100,7730,4206,2120,2148,57,9853,1181,5160,27049,650,42853,2454,4033,10088,1242,7739,576,3159,9573,21869,217,21348,1639,29617,227290,76241,6692,780,87918,1893,226733,20946,711,1120,774,9550,1311,49","pop":"1624107703,1636583272,1649710331,1663483518,1677432134,1691560792,1705875918,1720398255,1735131557,1749280311,1762840847,1775738691,1788143254,1799957755,1811966782,1824173992,1836522366,1848986561,1862155373,1876069755,1890751739,1906083900,1922074205,1938750246,1955702335,1972916475,1990404348,2008163449,2026209747,2044958196,2064454090,2084705401,2105697340,2127386777,2149351915,2171601414,2194230902,2217226438,2240632316,2262963926,2284199131,2304364035,2323438259,2341257167,2358978018,2377034198,2395728530,2415389220,2435843977,2461763063,2493092848,2536927035,2584086339,2634106235,2685894860,2740213792,2795409994,2852618337,2911249671,2965950351,3015470894,3064869675,3123374315,3192807828,3264487339,3334533703,3404041125,3473412880,3545187251,3619491579,3694683794,3769847865,3844917680,3920805042,3996416096,4070735277,4144246377,4217863796,4292097502,4368539528,4447606236,4528777306,4612673421,4697327573,4782175519,4868943465,4958072838,5049746397,5141992542,5234431732,5327803110,5418735891,5505989816,5591544797,5675551255,5758878982,5842055734,5924787816,6007066690,6089006339,6171702993,6254936459,6337730342,6420361634,6503377772,6586970132,6671452015,6757308781,6844457662,6932766416,7021732148,7110923765,7201202485,7291793585,7381616244,7470491872,7558554526,7645617954"} as Record<string, string>;
const ALLD = RAW.all.split(",").map(Number); // deaths, all natural disasters, 1900..2017
const QUAKE = RAW.quake.split(",").map(Number); // deaths, earthquakes, 1900..2017
const POP = RAW.pop.split(",").map(Number); // world population, 1900..2017
const HALVES = [
  { a: 1900, b: 1958, name: "1900-1958" },
  { a: 1959, b: 2017, name: "1959-2017" },
] as const;
const ix = (y: number) => y - 1900;
const sum = (v: number[], a: number, b: number) => v.slice(ix(a), ix(b) + 1).reduce((t, x) => t + x, 0);
const totals = HALVES.map((h) => {
  const years = h.b - h.a + 1;
  const pop = sum(POP, h.a, h.b) / years;
  const q = sum(QUAKE, h.a, h.b);
  return { all: sum(ALLD, h.a, h.b), quake: q, pop, perM: (q / years / pop) * 1e6 };
});
const LATER = Array.from({ length: 59 }, (_, i) => 1959 + i).sort((x, y) => QUAKE[ix(y)] - QUAKE[ix(x)]).slice(0, 3);
const TOP3 = (100 * LATER.reduce((t, y) => t + QUAKE[ix(y)], 0)) / totals[1].quake;

const m1 = (x: number) => (x / 1e6).toFixed(1);
const m2 = (x: number) => (x / 1e6).toFixed(2);
const one = (x: number) => x.toFixed(1);

type View = "none" | "all" | "quake" | "percap" | "top3";
type Rec = { all?: [number, number]; quake?: [number, number]; perM?: [number, number]; top3?: number };

const W = 320;
const H = 170;
const L = 40;
const T = 32;
const B = 144;
const PANELS = [
  { x0: 46, x1: 178 },
  { x0: 186, x1: 318 },
];

export default function EarthquakesDidNotFall({ slug }: { slug: string }) {
  const [view, setView] = useState<View>("none");
  const [rec, setRec] = useState<Rec>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Recorded deaths from all natural disasters fell about 70% from 1900-1958 to 1959-2017. What happened to earthquake deaths?",
        options: ["Fell about 70%", "Fell about 95%", "Rose about 15%"],
        answer: 2,
      }}
      exploreHint="Press each preset in turn and compare the two halves."
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            Recorded deaths from all disasters fell from {rec.all ? m1(rec.all[0]) : "?"} million in 1900-1958 to{" "}
            {rec.all ? m1(rec.all[1]) : "?"} million in 1959-2017, but earthquake deaths{" "}
            <strong>
              rose, from {rec.quake ? m2(rec.quake[0]) : "?"} to {rec.quake ? m2(rec.quake[1]) : "?"} million
            </strong>
            . The world&apos;s population more than doubled, so per person the yearly risk still fell, from{" "}
            {rec.perM ? one(rec.perM[0]) : "?"} to {rec.perM ? one(rec.perM[1]) : "?"} per million. Just three years made
            up {rec.top3 !== undefined ? Math.round(rec.top3) : "?"}% of the later earthquake deaths.
          </p>
          <p>
            Where it stops: a single year can change a half-century&apos;s total, so a trend in earthquake deaths is hard
            to read.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} view={view} setView={setView} rec={rec} setRec={setRec} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  view,
  setView,
  rec,
  setRec,
}: {
  locked: boolean;
  interact: () => void;
  view: View;
  setView: (v: View) => void;
  rec: Rec;
  setRec: (f: (r: Rec) => Rec) => void;
}) {
  const { reach } = useMilestones(interact, ["all", "quake", "percap", "top3"]);

  const go = (v: View) => {
    setView(v);
    if (v === "all") setRec((r) => (r.all ? r : { ...r, all: [totals[0].all, totals[1].all] }));
    if (v === "quake") setRec((r) => (r.quake ? r : { ...r, quake: [totals[0].quake, totals[1].quake] }));
    if (v === "percap") setRec((r) => (r.perM ? r : { ...r, perM: [totals[0].perM, totals[1].perM] }));
    if (v === "top3") setRec((r) => (r.top3 !== undefined ? r : { ...r, top3: TOP3 }));
    if (v !== "none") reach(v);
  };

  const scale =
    view === "all"
      ? { max: 30e6, ticks: [0, 10e6, 20e6, 30e6], fmt: (t: number) => (t ? `${t / 1e6}M` : "0") }
      : view === "quake"
        ? { max: 1.5e6, ticks: [0, 0.5e6, 1e6, 1.5e6], fmt: (t: number) => (t ? `${t / 1e6}M` : "0") }
        : view === "percap"
          ? { max: 12, ticks: [0, 4, 8, 12], fmt: (t: number) => String(t) }
          : view === "top3"
            ? { max: 300e3, ticks: [0, 100e3, 200e3, 300e3], fmt: (t: number) => (t ? `${t / 1e3}k` : "0") }
            : { max: 1, ticks: [] as number[], fmt: (t: number) => String(t) };
  const yv = (v: number) => B - (Math.min(v, scale.max) / scale.max) * (B - T);
  const title =
    view === "all"
      ? "Recorded deaths in each half"
      : view === "quake"
        ? "Recorded earthquake deaths in each half"
        : view === "percap"
          ? "Earthquake deaths per million people a year"
          : view === "top3"
            ? "Earthquake deaths, year by year"
            : "Recorded disaster deaths, two halves of the record";

  const bar = (key: string, x: number, w: number, v: number, cls: string, label: string, name?: string) => (
    <g key={key}>
      <rect x={x} y={yv(v)} width={w} height={B - yv(v)} className={cls} />
      <text x={x + w / 2} y={yv(v) - 4} textAnchor="middle" className={s.val}>
        {label}
      </text>
      {name && (
        <text x={x + w / 2} y={B + 13} textAnchor="middle" className={s.name}>
          {name}
        </text>
      )}
    </g>
  );

  const presets: [View, string][] = [
    ["all", "All disasters"],
    ["quake", "Earthquakes"],
    ["percap", "Per million people"],
    ["top3", "Three biggest years"],
  ];

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={title}>
        <text x={4} y={11} className={s.title}>
          {title}
        </text>
        {scale.ticks.map((t) => (
          <g key={t}>
            <line x1={L + 2} x2={W - 2} y1={yv(t)} y2={yv(t)} className={s.grid} />
            <text x={L - 2} y={yv(t) + 3.5} textAnchor="end" className={s.tick}>
              {scale.fmt(t)}
            </text>
          </g>
        ))}
        {PANELS.map((p, i) => (
          <g key={i}>
            <rect x={p.x0} y={T - 12} width={p.x1 - p.x0} height={B - T + 12} className={s.panel} />
            <text x={(p.x0 + p.x1) / 2} y={T - 2} textAnchor="middle" className={s.half}>
              {HALVES[i].name}
            </text>
            <line x1={p.x0} x2={p.x1} y1={B} y2={B} className={s.axis} />
            {view === "all" && (
              <>
                {bar(`a${i}`, p.x0 + 16, 44, totals[i].all, s.allBar, `${m1(totals[i].all)}M`, "All")}
                {bar(`q${i}`, p.x0 + 72, 44, totals[i].quake, s.quakeBar, `${m2(totals[i].quake)}M`, "Quakes")}
              </>
            )}
            {view === "quake" && bar(`q${i}`, p.x0 + 36, 60, totals[i].quake, s.quakeBar, `${m2(totals[i].quake)}M`, "Quakes")}
            {view === "percap" && (
              <>
                {bar(`p${i}`, p.x0 + 36, 60, totals[i].perM, s.quakeBar, one(totals[i].perM), `Quakes · world ${(totals[i].pop / 1e9).toFixed(2)} bn`)}
              </>
            )}
            {view === "top3" &&
              Array.from({ length: 59 }, (_, k) => HALVES[i].a + k).map((y, k) => {
                const top = i === 1 && LATER.includes(y);
                const w = (p.x1 - p.x0 - 4) / 59;
                const v = QUAKE[ix(y)];
                return (
                  <rect
                    key={y}
                    x={p.x0 + 2 + k * w}
                    y={yv(v)}
                    width={Math.max(w - 0.4, 0.8)}
                    height={B - yv(v)}
                    className={top ? s.topBar : s.yearBar}
                  />
                );
              })}
            {view === "top3" && i === 1 && (
              <text x={(p.x0 + p.x1) / 2} y={B + 13} textAnchor="middle" className={s.topNote}>
                {[...LATER].sort((x, y) => x - y).join(", ")}: {Math.round(TOP3)}%
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className={s.presets}>
        <Row>
          {presets.map(([v, name]) => (
            <Control
              key={v}
              className={view === v ? "active" : ""}
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
        <Readout label="All disasters" value={rec.all ? `${m1(rec.all[0])}M → ${m1(rec.all[1])}M` : "–"} />
        <Readout label="Earthquakes" value={rec.quake ? `${m2(rec.quake[0])}M → ${m2(rec.quake[1])}M` : "–"} />
      </Row>
      <Row>
        <Readout label="Per million a year" value={rec.perM ? `${one(rec.perM[0])} → ${one(rec.perM[1])}` : "–"} />
        <Readout label="Top 3 later years" value={rec.top3 !== undefined ? `${Math.round(rec.top3)}%` : "–"} />
      </Row>
    </div>
  );
}
