"use client";

// Brief history.md #16. London christenings by sex, 1629-1710: one bar per year, boys minus girls.
// CHRISTENED is copied from the pinned file (history-data.mjs: arbuthnot, Arbuthnot.csv): [Year, Males, Females].
// Every number is computed here as in company/domains/briefs/checks/history-cycle2-check.mjs section 16:
// boys 484,382, girls 453,841, boys more in 82 of 82 years, 107 boys per 100 girls (106.7), closest 1703 (101),
// widest 1661 (116). Locked stage: axes only, no bars (the bars would show the answer).
// Presets in DOM order (no Reset): Boys minus girls each year, Boys per 100 girls, Closest year, Widest year.
// Any preset draws the bars (milestone `bars`); the other three are milestones ratio, closest, widest, and each
// leaves a label on the chart, so every value the reveal quotes is still on the stage when it opens.
// v2 (W-990, learner r1): the cause is shown, not told. The axis title carries the real yearly totals
// (5,612 to 16,145 christened a year, min and max of boys + girls), and "If only 100 a year (simulated)"
// (milestone sim, second in DOM order) redraws the chart as a simulation: 82 years of 100 christenings each,
// each a boy with the file's overall share p = 484,382 / 938,223 = 0.516, drawn from mulberry32(SEED = 1), on a
// scale one tenth of the real one. Seed 1 is the first seed tried, not chosen for its result (over seeds 1-1000,
// girls lead in 14 to 41 years, median 28; seed 1 gives 23). Its count stays as a line in the empty band below zero
// on the real chart, so the reveal can quote it after the learner returns there. Tick labels sit left of the bars.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const CHRISTENED: [number, number, number][] = [
  [1629, 5218, 4683], [1630, 4858, 4457], [1631, 4422, 4102], [1632, 4994, 4590], [1633, 5158, 4839], [1634, 5035, 4820],
  [1635, 5106, 4928], [1636, 4917, 4605], [1637, 4703, 4457], [1638, 5359, 4952], [1639, 5366, 4784], [1640, 5518, 5332],
  [1641, 5470, 5200], [1642, 5460, 4910], [1643, 4793, 4617], [1644, 4107, 3997], [1645, 4047, 3919], [1646, 3768, 3395],
  [1647, 3796, 3536], [1648, 3363, 3181], [1649, 3079, 2746], [1650, 2890, 2722], [1651, 3231, 2840], [1652, 3220, 2908],
  [1653, 3196, 2959], [1654, 3441, 3179], [1655, 3655, 3349], [1656, 3668, 3382], [1657, 3396, 3289], [1658, 3157, 3013],
  [1659, 3209, 2781], [1660, 3724, 3247], [1661, 4748, 4107], [1662, 5216, 4803], [1663, 5411, 4881], [1664, 6041, 5681],
  [1665, 5114, 4858], [1666, 4678, 4319], [1667, 5616, 5322], [1668, 6073, 5560], [1669, 6506, 5829], [1670, 6278, 5719],
  [1671, 6449, 6061], [1672, 6443, 6120], [1673, 6073, 5822], [1674, 6113, 5738], [1675, 6058, 5717], [1676, 6552, 5847],
  [1677, 6423, 6203], [1678, 6568, 6033], [1679, 6247, 6041], [1680, 6548, 6299], [1681, 6822, 6533], [1682, 6909, 6744],
  [1683, 7577, 7158], [1684, 7575, 7127], [1685, 7484, 7246], [1686, 7575, 7119], [1687, 7737, 7214], [1688, 7487, 7101],
  [1689, 7604, 7167], [1690, 7909, 7302], [1691, 7662, 7392], [1692, 7602, 7316], [1693, 7676, 7483], [1694, 6985, 6647],
  [1695, 7263, 6713], [1696, 7632, 7229], [1697, 8062, 7767], [1698, 8426, 7626], [1699, 7911, 7452], [1700, 7578, 7061],
  [1701, 8102, 7514], [1702, 8031, 7656], [1703, 7765, 7683], [1704, 6113, 5738], [1705, 8366, 7779], [1706, 7952, 7417],
  [1707, 8379, 7687], [1708, 8239, 7623], [1709, 7840, 7380], [1710, 7640, 7288],
];
const YEARS = CHRISTENED.map(([y, m, f]) => ({ y, m, f, d: m - f, r: (100 * m) / f }));
const BOYS = YEARS.reduce((t, x) => t + x.m, 0);
const GIRLS = YEARS.reduce((t, x) => t + x.f, 0);
const MORE = YEARS.filter((x) => x.m > x.f).length;
const ALL = Math.round((100 * BOYS) / GIRLS);
const LO = YEARS.reduce((a, x) => (x.r < a.r ? x : a));
const HI = YEARS.reduce((a, x) => (x.r > a.r ? x : a));
const Y0 = YEARS[0].y;
const N = YEARS.length;
const fmt = (n: number) => n.toLocaleString("en-US");
const TOTALS = YEARS.map((x) => x.m + x.f);
const TMIN = Math.min(...TOTALS);
const TMAX = Math.max(...TOTALS);

// Simulation (labelled as one on the stage): 100 christenings a year, each a boy with the record's overall share.
const SEED = 1;
const PER_YEAR = 100;
const P_BOY = BOYS / (BOYS + GIRLS);
const SIM = (() => {
  const rng = mulberry32(SEED);
  return YEARS.map(({ y }) => {
    let b = 0;
    for (let k = 0; k < PER_YEAR; k++) if (rng() < P_BOY) b++;
    return { y, d: b - (PER_YEAR - b) };
  });
})();
const SIM_GIRLS = SIM.filter((x) => x.d < 0).length;
const SIM_SCALE = 10; // the simulation's chart reads one tenth of the real one

type Mode = "bars" | "sim" | "ratio" | "closest" | "widest";
const MILESTONES = ["bars", "sim", "ratio", "closest", "widest"] as const;
const PRESETS: { id: Mode; label: string }[] = [
  { id: "bars", label: "Boys minus girls, each year" },
  { id: "sim", label: "If only 100 a year (simulated)" },
  { id: "ratio", label: "Boys per 100 girls" },
  { id: "closest", label: "Closest year" },
  { id: "widest", label: "Widest year" },
];

const W = 340;
const H = 202;
const PL = 34;
const PR = 336;
const TOP = 40;
const LABEL_Y = 50;
const BOT = 180;
const DMIN = -400;
const DMAX = 1000;
const SLOT = (PR - PL) / N;
const xOf = (y: number) => PL + (y - Y0) * SLOT;
const xc = (y: number) => xOf(y) + SLOT / 2;
const yOf = (d: number) => BOT - ((d - DMIN) / (DMAX - DMIN)) * (BOT - TOP);
const Y0LINE = yOf(0);

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
    if (m !== "sim") reach("bars");
    reach(m);
  };
  const sim = !locked && mode === "sim";
  const shown = !locked && seen.size > 0 && (sim || [...seen].some((m) => m !== "sim"));
  const k = sim ? SIM_SCALE : 1;
  const readout = (() => {
    switch (mode) {
      case "bars": return { label: "Years with more boys", value: `${MORE} of ${N}` };
      case "sim": return { label: `Simulated, ${PER_YEAR} a year`, value: `girls ahead ${SIM_GIRLS} of ${N}` };
      case "ratio": return { label: `All ${N} years`, value: `${ALL} boys per 100 girls` };
      case "closest": return { label: `Closest year, ${LO.y}`, value: `${Math.round(LO.r)} boys per 100 girls` };
      case "widest": return { label: `Widest year, ${HI.y}`, value: `${Math.round(HI.r)} boys per 100 girls` };
      default: return { label: "Years with more boys", value: "-" };
    }
  })();
  const mark = (x: typeof LO, name: string, now: boolean, anchor: "start" | "end") => (
    <g className={now ? s.markNow : s.mark}>
      <line x1={xc(x.y)} x2={xc(x.y)} y1={yOf(x.d) - 2} y2={LABEL_Y + 3} />
      <text x={xc(x.y) + (anchor === "start" ? -2 : 2)} y={LABEL_Y - 12} textAnchor={anchor} className={s.tick}>
        {name}
      </text>
      <text x={xc(x.y) + (anchor === "start" ? -2 : 2)} y={LABEL_Y} textAnchor={anchor} className={s.note}>
        {x.y}: {Math.round(x.r)} per 100
      </text>
    </g>
  );

  return (
    <div className={s.wrap}>
      {locked && <p className={s.msg}>Make a prediction to start.</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={sim
          ? `Simulation, not data: boys minus girls if only ${PER_YEAR} babies a year were christened, ${N} years; girls ahead in ${SIM_GIRLS}`
          : shown ? `Boys minus girls christened in London each year, ${Y0} to ${YEARS[N - 1].y}, out of ${fmt(TMIN)} to ${fmt(TMAX)} a year` : "Empty chart of boys minus girls christened each year"}>
        <text x={4} y={12} className={s.axisTitle}>
          {sim ? `simulated: boys minus girls of ${PER_YEAR} a year` : `boys minus girls, of ${fmt(TMIN)}–${fmt(TMAX)} a year`}
        </text>
        {shown && (
          <text x={4} y={27} className={s.headline}>
            {sim
              ? `simulation: girls ahead in ${SIM_GIRLS} of ${N} years`
              : `${MORE} of ${N} years above zero${seen.has("ratio") ? ` · overall ${ALL} per 100` : ""}`}
          </text>
        )}
        {[-400, 400, 800].map((v) => (
          <line key={v} x1={PL} x2={PR} y1={yOf(v)} y2={yOf(v)} className={s.grid} />
        ))}
        {shown && !sim && YEARS.map((x) => (
          <rect key={x.y} x={xOf(x.y) + 0.4} width={SLOT - 0.8} y={yOf(x.d)} height={Y0LINE - yOf(x.d)}
            className={(mode === "closest" && x === LO) || (mode === "widest" && x === HI) ? s.barNow : s.bar} />
        ))}
        {sim && SIM.map((x) => (
          <rect key={x.y} x={xOf(x.y) + 0.4} width={SLOT - 0.8} y={Math.min(yOf(x.d * k), Y0LINE)}
            height={Math.abs(Y0LINE - yOf(x.d * k))} className={x.d < 0 ? s.barGirl : s.bar} />
        ))}
        <line x1={PL} x2={PR} y1={Y0LINE} y2={Y0LINE} className={s.zero} />
        <line x1={PL} x2={PR} y1={BOT} y2={BOT} className={s.grid} />
        {[-400, 0, 400, 800].map((v) => (
          <text key={v} x={PL - 3} y={yOf(v) + 4} textAnchor="end" className={s.tick}>
            {v > 0 ? `+${v / k}` : v < 0 ? `−${-v / k}` : "0"}
          </text>
        ))}
        <text x={PR} y={BOT - 4} textAnchor="end" className={s.tick}>below 0: more girls</text>
        {shown && !sim && seen.has("sim") && (
          <text x={PR} y={Y0LINE + 16} textAnchor="end" className={`${s.note} ${s.halo}`}>
            simulated, {PER_YEAR} a year: girls ahead {SIM_GIRLS} of {N}
          </text>
        )}
        {[1630, 1650, 1670, 1690, 1710].map((y) => (
          <g key={y}>
            <line x1={xc(y)} x2={xc(y)} y1={BOT} y2={BOT + 4} className={s.zero} />
            <text x={Math.max(14, Math.min(xc(y), W - 14))} y={BOT + 16} textAnchor="middle" className={s.tick}>{y}</text>
          </g>
        ))}
        {shown && !sim && seen.has("closest") && mark(LO, "closest year", mode === "closest", "end")}
        {shown && !sim && seen.has("widest") && mark(HI, "widest year", mode === "widest", "end")}
      </svg>
      <Row foldAtReveal>
        {PRESETS.map((p) => (
          <Control key={p.id} disabled={locked} className={!locked && mode === p.id ? "active" : ""}
            aria-pressed={!locked && mode === p.id} onClick={() => press(p.id)}>
            {p.label}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label={readout.label} value={readout.value} />
      </Row>
    </div>
  );
}

export default function MoreBoysChristened({ slug }: { slug: string }) {
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
        question: `London christened ${fmt(BOYS)} boys and ${fmt(GIRLS)} girls from 1629 to 1710. In how many of those ${N} years were boys more?`,
        options: ["41 of 82", "60 of 82", "82 of 82"],
        answer: 2,
      }}
      exploreHint="Press the presets left to right and watch the zero line."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Boys outnumbered girls at christening in all {MORE} years, by about {ALL} to 100 overall. Even the closest year,{" "}
            {LO.y}, had {Math.round(LO.r)} boys for every 100 girls, and the widest, {HI.y}, had {Math.round(HI.r)}.
          </p>
          <p>
            London christened {fmt(TMIN)} to {fmt(TMAX)} babies a year, so the small surplus showed every year. Simulated
            with only {PER_YEAR} a year and the same split, girls led in {SIM_GIRLS} of {N} years.
          </p>
          <p>Where it stops: these are christenings in London, not births, so babies who were never christened are missing.</p>
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
