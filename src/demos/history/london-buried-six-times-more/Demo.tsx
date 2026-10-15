"use client";

// Brief history.md #8. London's yearly deaths and plague deaths, one bar per year 1629-1710.
// v2 (FC39/FC41 c1): the learner text no longer says these totals are the Bills of Mortality's burial counts; it names
// what the HistData doc supports: yearly records of deaths and plague deaths (Campbell; Creighton, 1965). The stage
// unit is "deaths"; c3 (Great Plague) and c4 (the limit sentence) are verified and unchanged.
// BILLS is copied from the pinned file (history-data.mjs: arbuthnot, Arbuthnot.csv): [Year, Males + Females
// (christenings), Plague, Mortality (burials)]. Every number on the stage and in the reveal is computed here from
// BILLS, as in company/domains/briefs/checks/history-cycle1-check.mjs section 8: 15,453 -> 97,306 (x6.3),
// plague 70%, christenings 9,972 (about 10 burials per christening), 1666: 12,738; 1636: 10,400 of 23,359.
// Locked stage and the "1664" preset show only 1629-1664 on a 0-25,000 axis, so the 1665 bar is not drawn
// before the commit. The "1665" preset draws every year and rescales the axis to 0-100,000 (it stays drawn).
// Presets in DOM order (no Reset): 1664, 1665, Plague's share, 1636, Christenings that year.
// Milestones: y1664, y1665, share, christen (each value the reveal quotes). Each one leaves a label on the chart.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const BILLS: [number, number, number, number][] = [
  [1629, 9901, 0, 8771], [1630, 9315, 1317, 10554], [1631, 8524, 274, 8562], [1632, 9584, 8, 9535],
  [1633, 9997, 0, 8393], [1634, 9855, 1, 10400], [1635, 10034, 0, 10651], [1636, 9522, 10400, 23359],
  [1637, 9160, 3082, 11763], [1638, 10311, 363, 13624], [1639, 10150, 314, 9862], [1640, 10850, 1450, 12771],
  [1641, 10670, 1375, 13142], [1642, 10370, 1274, 13273], [1643, 9410, 996, 13212], [1644, 8104, 1492, 10933],
  [1645, 7966, 1871, 11479], [1646, 7163, 2365, 12780], [1647, 7332, 3597, 14059], [1648, 6544, 611, 9894],
  [1649, 5825, 67, 10566], [1650, 5612, 15, 8754], [1651, 6071, 23, 10827], [1652, 6128, 16, 12569],
  [1653, 6155, 6, 10087], [1654, 6620, 16, 13247], [1655, 7004, 9, 11357], [1656, 7050, 6, 13921],
  [1657, 6685, 4, 12434], [1658, 6170, 14, 14993], [1659, 5990, 36, 14756], [1660, 6971, 13, 12681],
  [1661, 8855, 20, 16665], [1662, 10019, 12, 13664], [1663, 10292, 9, 12741], [1664, 11722, 5, 15453],
  [1665, 9972, 68596, 97306], [1666, 8997, 1998, 12738], [1667, 10938, 35, 15842], [1668, 11633, 14, 17278],
  [1669, 12335, 3, 19432], [1670, 11997, 0, 20198], [1671, 12510, 5, 15729], [1672, 12563, 5, 18230],
  [1673, 11895, 5, 17504], [1674, 11851, 3, 21201], [1675, 11775, 1, 17244], [1676, 12399, 2, 18732],
  [1677, 12626, 2, 19076], [1678, 12601, 5, 20678], [1679, 12288, 2, 21730], [1680, 12847, 0, 21053],
  [1681, 13355, 0, 23951], [1682, 13653, 0, 20691], [1683, 14735, 0, 20587], [1684, 14702, 0, 23202],
  [1685, 14730, 0, 23222], [1686, 14694, 0, 22609], [1687, 14951, 0, 21460], [1688, 14588, 0, 22921],
  [1689, 14771, 0, 23502], [1690, 15211, 0, 21461], [1691, 15054, 0, 22691], [1692, 14918, 0, 20874],
  [1693, 15159, 0, 20959], [1694, 13632, 0, 24109], [1695, 13976, 0, 19047], [1696, 14861, 0, 18638],
  [1697, 15829, 0, 20292], [1698, 16052, 0, 20183], [1699, 15363, 0, 20795], [1700, 14639, 0, 19443],
  [1701, 15616, 0, 20471], [1702, 15687, 0, 19481], [1703, 15448, 0, 20720], [1704, 11851, 0, 22684],
  [1705, 16145, 0, 22097], [1706, 15369, 0, 19847], [1707, 16066, 0, 21600], [1708, 15862, 0, 21291],
  [1709, 15220, 0, 21800], [1710, 14928, 0, 24620],
];
const Y0 = BILLS[0][0];
const Y1 = BILLS[BILLS.length - 1][0];
const row = (y: number) => {
  const r = BILLS[y - Y0];
  return { year: r[0], chr: r[1], plague: r[2], burials: r[3] };
};
const B1664 = row(1664);
const B1665 = row(1665);
const B1666 = row(1666);
const B1636 = row(1636);
const fmt = (n: number) => n.toLocaleString("en-US");
const TIMES = (B1665.burials / B1664.burials).toFixed(1);
const PCT = (r: { plague: number; burials: number }) => Math.round((100 * r.plague) / r.burials);
const PER_CHR = Math.round(B1665.burials / B1665.chr);
const PER_CHR_1 = (B1665.burials / B1665.chr).toFixed(1);

type Mode = "y1664" | "y1665" | "share" | "y1636" | "christen";
const MILESTONES = ["y1664", "y1665", "share", "christen"] as const;
const PRESETS: { id: Mode; label: string }[] = [
  { id: "y1664", label: "1664" },
  { id: "y1665", label: "1665" },
  { id: "share", label: "Plague's share" },
  { id: "y1636", label: "1636, an earlier outbreak" },
  { id: "christen", label: "Christenings that year" },
];
const FOCUS: Record<Mode, number> = { y1664: 1664, y1665: 1665, share: 1665, y1636: 1636, christen: 1665 };

const W = 340;
const H = 188;
const PL = 4;
const PR = 336;
const TOP = 34;
const BOT = 166;
const SLOT = (PR - PL) / BILLS.length;
const xOf = (year: number) => PL + (year - Y0) * SLOT;

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
  const all = !locked && seen.has("y1665");
  const ymax = all ? 100000 : 25000;
  const ticks = all ? [0, 50000, 100000] : [0, 10000, 20000];
  const yOf = (n: number) => BOT - (n / ymax) * (BOT - TOP);
  const focus = mode ? FOCUS[mode] : null;
  const drawn = BILLS.filter((r) => all || r[0] <= 1664);
  const xc = (y: number) => xOf(y) + SLOT / 2;

  const readout = (() => {
    switch (mode) {
      case "y1664": return { label: "Deaths, 1664", value: fmt(B1664.burials) };
      case "y1665": return { label: "Deaths, 1665", value: `${fmt(B1665.burials)} (${TIMES}× 1664)` };
      case "share": return { label: "Put down to plague, 1665", value: `${fmt(B1665.plague)} (${PCT(B1665)}%)` };
      case "y1636": return { label: "Put down to plague, 1636", value: `${fmt(B1636.plague)} of ${fmt(B1636.burials)} (${PCT(B1636)}%)` };
      case "christen": return { label: "Deaths per christening, 1665", value: PER_CHR_1 };
      default: return { label: "Deaths", value: "-" };
    }
  })();

  return (
    <div className={s.wrap}>
      {locked && <p className={s.msg}>Make a prediction to start.</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={`Deaths recorded in London each year, ${Y0} to ${all ? Y1 : 1664}, with the part put down to plague`}>
        <g aria-hidden="true">
          <rect x={W - 148} y={5} width={9} height={9} className={s.other} />
          <rect x={W - 58} y={5} width={9} height={9} className={s.plague} />
        </g>
        <text x={W - 136} y={13} className={s.legend}>other deaths</text>
        <text x={W - 46} y={13} className={s.legend}>plague</text>
        {ticks.map((v) => (
          <line key={v} x1={PL} x2={PR} y1={yOf(v)} y2={yOf(v)} className={v === 0 ? s.axis : s.grid} />
        ))}
        {drawn.map(([y, , pl, m]) => (
          <g key={y} className={y === focus ? s.focus : undefined}>
            <rect x={xOf(y) + 0.3} width={SLOT - 0.6} y={yOf(m)} height={BOT - yOf(m)} className={s.other} />
            <rect x={xOf(y) + 0.3} width={SLOT - 0.6} y={yOf(pl)} height={BOT - yOf(pl)} className={s.plague} />
          </g>
        ))}
        {ticks.filter((v) => v > 0).map((v) => (
          <text key={v} x={PL + 2} y={yOf(v) - 3} className={`${s.tick} ${s.halo}`}>{fmt(v)}</text>
        ))}
        {[1630, 1650, 1670, 1690, 1710].map((y) => (
          <g key={y}>
            <line x1={xc(y)} x2={xc(y)} y1={BOT} y2={BOT + 4} className={s.axis} />
            <text x={Math.max(14, Math.min(xc(y), W - 14))} y={BOT + 16} textAnchor="middle" className={s.tick}>{y}</text>
          </g>
        ))}
        {!locked && seen.has("y1664") && (
          all ? (
            <text x={xOf(1664) - 4} y={yOf(42000)} textAnchor="end" className={`${s.note} ${s.halo}`}>1664: {fmt(B1664.burials)}</text>
          ) : (
            <text x={xc(1664)} y={yOf(B1664.burials) - 5} textAnchor="end" className={`${s.note} ${s.halo}`}>1664: {fmt(B1664.burials)}</text>
          )
        )}
        {all && (
          <>
            <text x={xc(1665)} y={yOf(B1665.burials) - 5} textAnchor="middle" className={`${s.noteBig} ${s.halo}`}>
              1665: {fmt(B1665.burials)}, {TIMES}×
            </text>
            <text x={xOf(1667) + 2} y={yOf(30000)} className={`${s.note} ${s.halo}`}>1666: {fmt(B1666.burials)}</text>
          </>
        )}
        {all && seen.has("share") && (
          <text x={xOf(1667) + 2} y={yOf(62000)} className={`${s.notePlague} ${s.halo}`}>{PCT(B1665)}% plague</text>
        )}
        {all && seen.has("christen") && (
          <>
            <line x1={xOf(1665) - 3} x2={xOf(1666) + 3} y1={yOf(B1665.chr)} y2={yOf(B1665.chr)} className={s.chrLine} />
            <line x1={xOf(1665) - 3} x2={xOf(1665) - 3} y1={yOf(B1665.chr)} y2={yOf(20000)} className={s.chrLead} />
            <text x={xOf(1665) - 5} y={yOf(22000)} textAnchor="end" className={`${s.noteChr} ${s.halo}`}>
              christened: {fmt(B1665.chr)}
            </text>
          </>
        )}
      </svg>
      <div className={s.presets}>
        {PRESETS.map((p) => (
          <Control key={p.id} disabled={locked} className={!locked && mode === p.id ? "active" : ""}
            aria-pressed={!locked && mode === p.id} onClick={() => press(p.id)}>
            {p.label}
          </Control>
        ))}
      </div>
      <Row>
        <Readout label={readout.label} value={readout.value} />
      </Row>
    </div>
  );
}

export default function LondonBuriedSixTimesMore({ slug }: { slug: string }) {
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
        question:
          `London's yearly records of deaths (compiled by Creighton, 1965) show ${fmt(B1664.burials)} in 1664. In 1665, the year of the Great Plague, about how many?`,
        options: ["About 30,000", "About 100,000", "About 300,000"],
        answer: 1,
      }}
      exploreHint="Press the presets left to right and read the bars."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            London recorded {fmt(B1665.burials)} deaths in 1665, {TIMES} times the year before, and {PCT(B1665)}% were put
            down to plague. Christenings that year were {fmt(B1665.chr)}, so there were about {PER_CHR} deaths for every
            child christened. A year later, deaths were back to {fmt(B1666.burials)}.
          </p>
          <p>
            Where it stops: these are recorded burials and recorded causes, not a count of every death or a doctor&apos;s
            diagnosis.
          </p>
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
