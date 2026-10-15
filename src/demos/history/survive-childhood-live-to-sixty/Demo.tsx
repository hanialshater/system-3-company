"use client";

// Brief history.md #1. Halley's 1693 Breslau life table on one survivor chart.
// SURVIVORS is copied from the pinned file (history-data.mjs: halley, HalleyLifeTable.csv, column `number`,
// ages 1-84), with Halley's 1,238 births a year as age 0 (HistData documentation). Every number on the stage
// and in the reveal is computed here from SURVIVORS with the same trapezoid rule as
// company/domains/briefs/checks/history-cycle1-check.mjs section 1: e0 = 27.87 -> 28, 30 + e30 = 57.7 -> 58,
// 60 + e60 = 72.1 -> 72, died before 5 = 40.9% -> 41%.
// Presets in DOM order (no Reset): birth, under5, at30, at60. Each preset sets the whole state; every preset
// pressed leaves its mark on the chart as a trace, so each value the reveal quotes is still on the stage.
// v2 (cm-history ruling, W-868): the locked frame shows the axes, the "alive, of 1,238 born" label and the message
// only; the survivor curve is drawn from the first preset on (its tail at 70 would hint the answer before the commit).
// Milestones: all four presets (the brief names birth and at30; the reveal also quotes 41% and 72, so those
// two are gated too and recorded in the build note).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const SURVIVORS = [
  1238, 1000, 855, 798, 760, 732, 710, 692, 680, 670, 661, 653, 646, 640, 634, 628, 622, 616, 610, 604, 598, 592,
  586, 579, 573, 567, 560, 553, 546, 539, 531, 523, 515, 507, 499, 490, 481, 472, 463, 454, 445, 436, 427, 417, 407,
  397, 387, 377, 367, 357, 346, 335, 324, 313, 302, 292, 282, 272, 262, 252, 242, 232, 222, 212, 202, 192, 182, 172,
  162, 152, 142, 131, 120, 109, 98, 88, 78, 68, 58, 50, 41, 34, 28, 23, 20,
];
const BORN = SURVIVORS[0];
const MAXAGE = SURVIVORS.length - 1;

/** Average age at death for those alive at age x (x + e_x), trapezoid rule between whole ages. */
function avgDeath(x: number) {
  let yrs = 0;
  for (let k = x; k < MAXAGE; k++) yrs += (SURVIVORS[k] + SURVIVORS[k + 1]) / 2;
  return x + yrs / SURVIVORS[x];
}
const A0 = Math.round(avgDeath(0));
const A30 = Math.round(avgDeath(30));
const A60 = Math.round(avgDeath(60));
const DIED5 = BORN - SURVIVORS[5];
const PCT5 = Math.round((100 * DIED5) / BORN);
const fmt = (n: number) => n.toLocaleString("en-US");

type Mode = "birth" | "under5" | "at30" | "at60";
const MILESTONES = ["birth", "under5", "at30", "at60"] as const;
const PRESETS: { id: Mode; label: string }[] = [
  { id: "birth", label: "Average from birth" },
  { id: "under5", label: "Deaths before age 5" },
  { id: "at30", label: "Average from age 30" },
  { id: "at60", label: "Average from age 60" },
];
const MARKS: { id: Mode; from: number; avg: number; text: string; row: number }[] = [
  { id: "birth", from: 0, avg: A0, text: `from birth: ${A0}`, row: 0 },
  { id: "at30", from: 30, avg: A30, text: `from 30: ${A30}`, row: 1 },
  { id: "at60", from: 60, avg: A60, text: `from 60: ${A60}`, row: 2 },
];

const W = 320;
const H = 198;
const AX = 40;
const RX = 298;
const TOP = 48;
const BOT = 182;
const YMAX = 1250;
const xOf = (age: number) => AX + (age / MAXAGE) * (RX - AX);
const yOf = (n: number) => BOT - (n / YMAX) * (BOT - TOP);
const curve = SURVIVORS.map((n, a) => `${a === 0 ? "M" : "L"}${xOf(a).toFixed(1)},${yOf(n).toFixed(1)}`).join("");
const areaFrom = (x: number) =>
  `M${xOf(x).toFixed(1)},${BOT}` +
  SURVIVORS.slice(x).map((n, i) => `L${xOf(x + i).toFixed(1)},${yOf(n).toFixed(1)}`).join("") +
  `L${xOf(MAXAGE).toFixed(1)},${BOT}Z`;
const under5 =
  `M${xOf(0)},${yOf(BORN).toFixed(1)}` +
  SURVIVORS.slice(0, 6).map((n, a) => `L${xOf(a).toFixed(1)},${yOf(n).toFixed(1)}`).join("") +
  `L${xOf(5).toFixed(1)},${yOf(BORN).toFixed(1)}Z`;

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
  const cur = MARKS.find((m) => m.id === mode);
  const drawn = !locked && seen.size > 0;
  const readout =
    mode === null
      ? { label: "Average age at death", value: "-" }
      : mode === "under5"
        ? { label: "Died before age 5", value: `${PCT5}% (${fmt(DIED5)} of ${fmt(BORN)})` }
        : { label: `Average age at death from ${cur!.from === 0 ? "birth" : cur!.from}`, value: String(cur!.avg) };

  return (
    <div className={s.wrap}>
      {locked && <p className={s.msg}>Make a prediction to start.</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={drawn
          ? `Survivor curve: of ${fmt(BORN)} born, how many were alive at each age from 0 to ${MAXAGE}`
          : `Axes for a survivor curve: of ${fmt(BORN)} born, how many were alive at each age. The curve appears on the first preset.`}>
        {cur && <path d={areaFrom(cur.from)} className={s.counted} />}
        {!locked && seen.has("under5") && <path d={under5} className={mode === "under5" ? s.lostNow : s.lost} />}
        {[0, 500, 1000].map((v) => (
          <g key={v}>
            <line x1={AX - 4} x2={RX} y1={yOf(v)} y2={yOf(v)} className={v === 0 ? s.axis : s.grid} />
            <text x={AX - 6} y={yOf(v) + 4} textAnchor="end" className={s.tick}>{fmt(v)}</text>
          </g>
        ))}
        <line x1={AX} x2={AX} y1={TOP - 4} y2={BOT} className={s.axis} />
        {[0, 10, 20, 30, 40, 50, 60, 70, 80].map((a) => (
          <g key={a}>
            <line x1={xOf(a)} x2={xOf(a)} y1={BOT} y2={BOT + 4} className={s.axis} />
            <text x={xOf(a)} y={BOT + 15} textAnchor="middle" className={s.tick}>{a}</text>
          </g>
        ))}
        <text x={W - 1} y={BOT + 15} textAnchor="end" className={s.axisTitle}>age</text>
        <text x={RX} y={yOf(1150)} textAnchor="end" className={`${s.axisTitle} ${s.halo}`}>alive, of {fmt(BORN)} born</text>
        {drawn && <path d={curve} className={s.curve} />}
        {!locked && seen.has("under5") && (
          <text x={xOf(6) + 3} y={yOf(850)} className={`${s.note} ${s.halo}`}>{PCT5}% died before 5</text>
        )}
        {!locked && MARKS.filter((m) => seen.has(m.id)).map((m) => {
          const now = m.id === mode;
          const ly = 12 + m.row * 12.5;
          return (
            <g key={m.id} className={now ? s.markNow : s.mark}>
              <circle cx={xOf(m.from)} cy={yOf(SURVIVORS[m.from])} r={3.2} />
              <line x1={xOf(m.avg)} x2={xOf(m.avg)} y1={ly + 3} y2={BOT} />
              <text x={Math.min(xOf(m.avg), RX - 34)} y={ly} textAnchor="middle" className={`${s.markText} ${s.halo}`}>{m.text}</text>
            </g>
          );
        })}
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

export default function SurviveChildhoodLiveToSixty({ slug }: { slug: string }) {
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
          "Halley's 1693 Breslau table gives a newborn a life expectancy of about 28 years. Someone who reached 30 died, on average, at about what age?",
        options: ["About 58", "About 45", "About 31"],
        answer: 0,
      }}
      exploreHint="Press each preset, left to right, and watch where the average lands."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Of {fmt(BORN)} babies born in a year, about {PCT5}% died before age 5, and that pulled the average from birth down
            to {A0}. People who got through childhood usually lived much longer: from 30, the average death came at about{" "}
            {A30}, and from 60 at about {A60}.
          </p>
          <p>
            Life expectancy at birth averages over everyone, infants included, so a low number does not mean adults died
            young.
          </p>
          <p>Where it stops: this is one city&apos;s records over five years.</p>
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
