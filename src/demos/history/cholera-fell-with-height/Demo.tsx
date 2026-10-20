"use client";

// Brief history.md #20. Farr's 1849 London cholera table: 38 districts, height above the Thames against deaths.
// DISTRICTS was generated from the pinned file (history-data.mjs: cholera, Cholera.csv: district, cholera_deaths,
// popn, elevation in feet above high water, water supply region). Every number is computed here as in
// company/domains/briefs/checks/history-cycle2-check.mjs section 20: under 20 ft, 16 districts, 91.7 -> 92 per
// 10,000 (pooled: deaths / people); 80 ft and up, 4 districts, 19.8 -> 20; ratio 4.6 -> "about 5"; 11 of the 16
// low districts on the "Thames, between Battersea and Waterloo Bridges" supply; within Battersea, r = -0.68.
// Locked stage: axes only, no dots (the scatter would show the answer).
// x axis: log(feet + 10), ticks 0, 20, 50, 100, 350. Care (brief): dots are districts; no germ, pump or Snow.
// Presets in DOM order (no Reset): Under 20 feet, 80 feet and up, Colour by water company, One company's
// districts only. Milestones: low, high, water. Each leaves its mark (pooled-rate lines, shapes, "11 of 16").

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

type Water = "Battersea" | "New River" | "Kew";
// [district, cholera_deaths, popn, elevation (ft), water]
const DISTRICTS: [string, number, number, number, Water][] = [
  ["Newington", 907, 63074, -2, "Battersea"],
  ["Rotherhithe", 352, 17208, 0, "Battersea"],
  ["Bermondsey", 836, 50900, 0, "Battersea"],
  ["St George Southwark", 734, 45500, 0, "Battersea"],
  ["St Olave", 349, 19278, 2, "Battersea"],
  ["St Saviour", 539, 35227, 2, "Battersea"],
  ["Westminster", 437, 64109, 2, "Battersea"],
  ["Lambeth", 1618, 134768, 3, "Battersea"],
  ["Camberwell", 504, 51704, 4, "Battersea"],
  ["Greenwich", 718, 95954, 8, "New River"],
  ["Poplar", 313, 44103, 10, "New River"],
  ["Chelsea", 247, 53379, 12, "Battersea"],
  ["Hammersmith, Brompton, Kensington and Fulham", 225, 68425, 12, "Kew"],
  ["St George East", 199, 47334, 15, "New River"],
  ["Stepney", 501, 106988, 16, "New River"],
  ["Belgrave", 105, 37918, 19, "Battersea"],
  ["Wandsworth", 484, 48446, 22, "Battersea"],
  ["West London", 278, 28829, 28, "New River"],
  ["Whitechapel", 506, 78590, 28, "New River"],
  ["Lewisham", 96, 32299, 28, "New River"],
  ["St Martin-in-the-Fields", 91, 24557, 35, "New River"],
  ["Bethnal Green", 789, 87263, 36, "New River"],
  ["London City", 213, 55816, 38, "New River"],
  ["East London", 197, 43495, 42, "New River"],
  ["St James Westminster", 57, 36426, 43, "Kew"],
  ["Shoreditch", 789, 104122, 48, "New River"],
  ["St Luke", 183, 53234, 48, "New River"],
  ["Hanover Square & Mayfair", 26, 33196, 49, "Kew"],
  ["Strand", 156, 44254, 50, "New River"],
  ["Holborn", 161, 46134, 53, "New River"],
  ["Hackney", 139, 55152, 55, "New River"],
  ["Clerkenwell", 121, 63499, 63, "New River"],
  ["St Giles", 285, 54062, 68, "New River"],
  ["Paddington", 35, 41267, 76, "Kew"],
  ["St Pancras", 360, 160122, 80, "New River"],
  ["Islington", 187, 86761, 88, "New River"],
  ["Marylebone", 261, 153960, 100, "Kew"],
  ["Hampstead", 9, 11572, 350, "Kew"],
];
const D = DISTRICTS.map(([name, deaths, pop, e, w]) => ({ name, deaths, pop, e, w, rate: Math.round((1e4 * deaths) / pop) }));
const pooled = (rs: typeof D) => (1e4 * rs.reduce((t, x) => t + x.deaths, 0)) / rs.reduce((t, x) => t + x.pop, 0);
const LOW = D.filter((x) => x.e < 20);
const HIGH = D.filter((x) => x.e >= 80);
const R_LOW = Math.round(pooled(LOW));
const R_HIGH = Math.round(pooled(HIGH));
const TIMES = Math.round(pooled(LOW) / pooled(HIGH));
const LOW_B = LOW.filter((x) => x.w === "Battersea").length;
const corr = (a: number[], b: number[]) => {
  const n = a.length, ma = a.reduce((t, x) => t + x, 0) / n, mb = b.reduce((t, x) => t + x, 0) / n;
  let sab = 0, saa = 0, sbb = 0;
  for (let i = 0; i < n; i++) { sab += (a[i] - ma) * (b[i] - mb); saa += (a[i] - ma) ** 2; sbb += (b[i] - mb) ** 2; }
  return sab / Math.sqrt(saa * sbb);
};
const BAT = D.filter((x) => x.w === "Battersea");
// v2 (cm-history ruling, W-868): r is not shown (jargon this lesson never teaches); its sign sets the readout's words,
// and the value (-0.68) stays only in claim c4's derivation support.
const R_BAT = corr(BAT.map((x) => x.e), BAT.map((x) => x.rate));
// v3 (learner r1, W-989): the readout also says that no central-Thames district is high (the highest is 22 ft, Wandsworth),
// so "still falls" is not read as proof that height mattered with the water held fixed.
const BAT_MAX = Math.max(...BAT.map((x) => x.e));
const BAT_HIGH = BAT.filter((x) => x.e >= 80).length;
const ONE_SAYS = `${R_BAT < 0 ? "still falls" : "does not fall"}${BAT_HIGH === 0 ? `, but none is high (max ${BAT_MAX} ft)` : ""}`;

type Mode = "low" | "high" | "water" | "one";
const MILESTONES = ["low", "high", "water"] as const;
const PRESETS: { id: Mode; label: string }[] = [
  { id: "low", label: "Under 20 feet" },
  { id: "high", label: "80 feet and up" },
  { id: "water", label: "Colour by water company" },
  { id: "one", label: "One company's districts only" },
];
const SUPPLY: Record<Water, { label: string; cls: string }> = {
  Battersea: { label: "Thames, central", cls: "wB" },
  "New River": { label: "New River", cls: "wN" },
  Kew: { label: "Thames at Kew", cls: "wK" },
};

const LEGEND_X = [0, 112, 196];
const W = 340;
const H = 214;
const PL = 30;
const PR = 334;
const TOP = 34;
const BOT = 180;
const YMAX = 220;
const LMIN = Math.log10(8);
const LMAX = Math.log10(360);
const xOf = (e: number) => PL + ((Math.log10(e + 10) - LMIN) / (LMAX - LMIN)) * (PR - PL);
const yOf = (r: number) => BOT - (r / YMAX) * (BOT - TOP);

function Dot({ x, y, w, shaped, cls }: { x: number; y: number; w: Water; shaped: boolean; cls: string }) {
  if (shaped && w === "New River") return <rect x={x - 3.2} y={y - 3.2} width={6.4} height={6.4} className={cls} />;
  if (shaped && w === "Kew") return <path d={`M${x},${y - 4.2}L${x + 4},${y + 3}L${x - 4},${y + 3}Z`} className={cls} />;
  return <circle cx={x} cy={y} r={3.4} className={cls} />;
}

function Stage({ locked, reach, mode, seen, pick }: {
  locked: boolean;
  reach: (n: string) => void;
  mode: Mode | null;
  seen: Set<Mode>;
  pick: (m: Mode) => void;
}) {
  const press = (m: Mode) => {
    if (locked || m === mode) return;
    pick(m);
    reach(m);
  };
  const on = (m: Mode) => !locked && seen.has(m);
  const shaped = on("water");
  const readout = (() => {
    switch (mode) {
      case "low": return { label: `${LOW.length} districts under 20 ft`, value: `${R_LOW} per 10,000` };
      case "high": return { label: `${HIGH.length} districts at 80 ft and up`, value: `${R_HIGH} per 10,000` };
      case "water": return { label: "Low districts on central Thames water", value: `${LOW_B} of ${LOW.length}` };
      case "one": return { label: "Central Thames only", value: ONE_SAYS };
      default: return { label: "Cholera deaths", value: "-" };
    }
  })();
  const cls = (x: (typeof D)[number]) => {
    const base = shaped ? s[SUPPLY[x.w].cls] : s.dot;
    const dim =
      (mode === "low" && x.e >= 20) || (mode === "high" && x.e < 80) || (mode === "one" && x.w !== "Battersea");
    return `${base} ${dim ? s.dim : ""}`;
  };

  return (
    <div className={s.wrap}>
      {locked && <p className={s.msg}>Make a prediction to start.</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label="Scatter of 38 London districts in 1849: height above the Thames against cholera deaths per 10,000">
        <text x={PL - 26} y={12} className={s.axisTitle}>cholera deaths per 10,000 people, 1849</text>
        {shaped && (
          <g>
            {(Object.keys(SUPPLY) as Water[]).map((w, i) => (
              <g key={w}>
                <Dot x={PL + 6 + LEGEND_X[i]} y={23} w={w} shaped cls={s[SUPPLY[w].cls]} />
                <text x={PL + 13 + LEGEND_X[i]} y={27} className={s.legend}>{SUPPLY[w].label}</text>
              </g>
            ))}
          </g>
        )}
        {[0, 50, 100, 150, 200].map((v) => (
          <g key={v}>
            <line x1={PL} x2={PR} y1={yOf(v)} y2={yOf(v)} className={v === 0 ? s.axis : s.grid} />
            <text x={PL - 4} y={yOf(v) + 4} textAnchor="end" className={s.tick}>{v}</text>
          </g>
        ))}
        {[0, 20, 50, 100, 350].map((e) => (
          <g key={e}>
            <line x1={xOf(e)} x2={xOf(e)} y1={BOT} y2={BOT + 4} className={s.axis} />
            <text x={e === 350 ? xOf(e) + 4 : xOf(e)} y={BOT + 15} textAnchor={e === 350 ? "end" : "middle"} className={s.tick}>{e}</text>
          </g>
        ))}
        <text x={PR} y={BOT + 29} textAnchor="end" className={s.axisTitle}>feet above the Thames (high water)</text>
        {on("low") && (
          <g className={s.pool}>
            <line x1={xOf(-2) - 4} x2={xOf(19) + 4} y1={yOf(R_LOW)} y2={yOf(R_LOW)} />
            <text x={PR} y={yOf(192)} textAnchor="end" className={`${s.poolText} ${s.halo}`}>under 20 ft: {R_LOW} per 10,000</text>
          </g>
        )}
        {on("high") && (
          <g className={s.pool}>
            <line x1={xOf(80) - 4} x2={xOf(350) + 2} y1={yOf(R_HIGH)} y2={yOf(R_HIGH)} />
            <text x={PR} y={yOf(172)} textAnchor="end" className={`${s.poolText} ${s.halo}`}>
              80 ft+: {R_HIGH}; low/high ratio ≈{TIMES}
            </text>
          </g>
        )}
        {shaped && (
          <text x={PR} y={yOf(152)} textAnchor="end" className={`${s.noteB} ${s.halo}`}>
            {LOW_B} of {LOW.length} low: central Thames
          </text>
        )}
        {!locked && D.map((x) => (
          <Dot key={x.name} x={xOf(x.e)} y={yOf(x.rate)} w={x.w} shaped={shaped} cls={cls(x)} />
        ))}
      </svg>
      {/* v3 (W-989): the presets fold at the reveal; the reveal quotes no control, and each preset's state stays in the
          picture (pooled-rate lines and labels, colours, "11 of 16 low", dimmed dots); the Readout is outside the row. */}
      <Row foldAtReveal>
      <div className={s.presets}>
        {PRESETS.map((p) => (
          <Control key={p.id} disabled={locked} className={!locked && mode === p.id ? "active" : ""}
            aria-pressed={!locked && mode === p.id} onClick={() => press(p.id)}>
            {p.label}
          </Control>
        ))}
      </div>
      </Row>
      <Row>
        <Readout label={readout.label} value={readout.value} />
      </Row>
    </div>
  );
}

export default function CholeraFellWithHeight({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [seen, setSeen] = useState<Set<Mode>>(() => new Set());
  const pick = (m: Mode) => {
    setMode(m);
    setSeen((prev) => new Set(prev).add(m));
  };
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In London's 1849 cholera, districts under 20 feet above the Thames lost ${R_LOW} people per 10,000. What about districts 80 feet up or more?`,
        options: ["About the same", "About a fifth as many", "About half as many"],
        answer: 1,
      }}
      exploreHint="Press the presets left to right; each dot is one district."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The {LOW.length} districts under 20 ft lost {R_LOW} per 10,000; the {HIGH.length} at 80 ft or more lost{" "}
            {R_HIGH}, a rate about {TIMES} times lower. The pattern in Farr&apos;s table is real.
          </p>
          <p>
            But {LOW_B} of those {LOW.length} low districts drew their water from the Thames between Battersea and Waterloo,
            and none on that water was high, so height and water went together, and this table alone cannot say which mattered.
          </p>
          <p>Where it stops: these are deaths registered in one year, district by district.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} mode={mode} seen={seen} pick={pick} />}
        </Milestones>
      )}
    </Lesson>
  );
}
