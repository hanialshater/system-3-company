"use client";

// History: world child mortality, 1800-2020. history-data.mjs: gmu5, gapminder-u5mr-global.csv (Gapminder
// Fast Track, column child_mortality_0_5_year_olds_dying_per_1000_born; estimates before 1950). Brief:
// company/domains/briefs/history.md #13; numbers: section 13 of history-cycle2-check.mjs.
//
// U5 below is the file's column for 1800..2020 in order, copied unchanged (221 values, one a year). Every
// number on the stage and in the reveal is read from it or computed from it with the check script's formulas.
// Locked stage: the axes and the line from 1800 to 1900 only (the question gives 1900); the line after 1900
// is drawn up to the latest year the learner has pressed. Each year preset marks its year, and the marks stay.
// v2 (cm-history ruling, W-868): the 1800 mark is drawn from the commit onward, so the reveal's "from 430" is always
// on the stage, whichever presets were pressed.
// Milestones: y1900, y2020 (the brief's gate). No Reset.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FIRST = 1800;
const U5 = [
  430,430,429,429,429,428,428,428,428,427,427,426,426,426,425,425,424,424,424,424,424,424,424,423,
  424,423,423,423,424,424,424,424,425,424,425,424,424,425,425,424,424,424,425,423,423,423,426,425,
  426,425,423,426,431,434,439,443,444,444,440,440,432,431,428,427,425,426,423,422,427,423,421,425,
  423,420,419,417,416,414,418,413,418,413,418,416,414,414,413,413,412,414,417,415,419,414,414,415,
  413,412,414,411,411,410,403,397,391,390,383,376,374,368,366,362,357,353,356,354,353,355,378,359,
  345,344,334,332,333,326,329,321,320,322,318,315,308,307,308,297,293,289,288,280,280,279,280,278,
  274,267,258,255,249,249,246,242,238,232,225,222,211,204,196,197,199,186,168,160,154,150,149,150,
  148,144,142,141,135,133,131,128,126,124,121,118,117,114,112,108,105,103,100,98,96,95,93,92,91,90
  ,88,87,85,83,81,78,76,73,70,68,65,63,60,58,55,53,51,49,47,46,44,43,41,40,39,38,37
];
const at = (y: number) => U5[y - FIRST];
const LAST = FIRST + U5.length - 1;
const TIMES = Math.round(at(1900) / at(2020));
const AFTER50 = Math.round((100 * (at(1950) - at(2020))) / (at(1900) - at(2020)));
const per100 = (y: number) => Math.round(at(y) / 10);

const MILESTONES = ["y1900", "y2020"] as const;
const YEARS = [1800, 1900, 1950, 2020] as const;
type View = "none" | (typeof YEARS)[number] | "per100";

const W = 340;
const H = 184;
const L = 34;
const R = 326;
const T = 26;
const B = 154;
const MAX = 500;
const xs = (y: number) => L + ((y - FIRST) / (LAST - FIRST)) * (R - L);
const ys = (v: number) => B - (v / MAX) * (B - T);
const path = (to: number) =>
  U5.slice(0, to - FIRST + 1)
    .map((v, i) => `${i ? "L" : "M"}${xs(FIRST + i).toFixed(1)} ${ys(v).toFixed(1)}`)
    .join(" ");

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [view, setView] = useState<View>("none");
  const [marked, setMarked] = useState<number[]>([]);
  const furthest = Math.max(1900, ...marked);
  const shown = locked ? [] : [1800, ...marked.filter((y) => y !== 1800)];
  const go = (v: View) => {
    setView(v);
    if (v !== "per100" && v !== "none") {
      setMarked((m) => (m.includes(v) ? m : [...m, v]));
      if (v === 1900) reach("y1900");
      if (v === 2020) reach("y2020");
    }
  };
  const label = locked
    ? "Line chart of children dying before age 5 per 1,000 born, worldwide, drawn from 1800 to 1900."
    : `Line chart of children dying before age 5 per 1,000 born, worldwide, drawn from 1800 to ${furthest}.` +
      shown.map((y) => ` ${y}: ${at(y)}.`).join("");
  const readLabel = view === "per100" ? "Out of 100 children" : typeof view === "number" ? `In ${view}` : "Pick a year";
  const readValue =
    locked || view === "none"
      ? "?"
      : view === "per100"
        ? `1900: ${per100(1900)} in 100 · 2020: ${per100(2020)} in 100`
        : `${at(view)} of every 1,000 died before age 5`;
  const showFall = marked.includes(2020) && marked.includes(1900);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={label}>
        <text x={4} y={10} className={s.title}>
          children dying before age 5, per 1,000 born (world)
        </text>
        <line x1={L} y1={B} x2={R} y2={B} className={s.axis} />
        <line x1={L} y1={T} x2={L} y2={B} className={s.axis} />
        {[0, 100, 200, 300, 400, 500].map((v) => (
          <text key={v} x={L - 4} y={ys(v) + 4} className={s.tick} textAnchor="end">
            {v}
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
        <path d={path(locked ? 1900 : furthest)} className={s.line} />
        {!locked &&
          shown.map((y) => {
            const right = y === 2020;
            return (
              <g key={y}>
                <line x1={xs(y)} y1={ys(at(y))} x2={xs(y)} y2={B} className={s.drop} />
                <circle cx={xs(y)} cy={ys(at(y))} r={view === y ? 5 : 3.5} className={view === y ? s.on : s.dot} />
                <text
                  x={xs(y) + (right ? -6 : y === 1800 ? 4 : 0)}
                  y={ys(at(y)) - 8}
                  className={s.lab}
                  textAnchor={right ? "end" : y === 1800 ? "start" : "middle"}
                >
                  {y}: {at(y)}
                </text>
              </g>
            );
          })}
      </svg>
      <Row foldAtReveal>
        {YEARS.map((y) => (
          <Control key={y} disabled={locked} className={view === y ? "active" : ""} onClick={() => go(y)}>
            {y}
          </Control>
        ))}
        <Control disabled={locked} className={view === "per100" ? "active" : ""} onClick={() => go("per100")}>
          Out of 100 children
        </Control>
      </Row>
      <Readout label={readLabel} value={readValue} />
      {!locked && showFall && (
        <p className={`muted ${s.note}`}>
          1900 to 2020: {TIMES} times fewer; {AFTER50}% of that fall came after 1950.
        </p>
      )}
    </div>
  );
}

export default function ChildrenDyingBeforeFive({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Gapminder's world estimate: in 1900, ${at(1900)} of every 1,000 children died before age 5. About how many in 2020?`,
        options: ["About 250", "About 100", "About 35"],
        answer: 2,
      }}
      exploreHint="Press the years in order and watch the line."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In 1900 about {at(1900)} of every 1,000 children died before age 5; in 2020, {at(2020)}: about {TIMES} times
            fewer. In the century before 1900 the figure barely moved, from {at(1800)}. More than half of the fall since
            1900, {AFTER50}%, came after 1950.
          </p>
          <p>
            Where it stops: this is one source&rsquo;s world figure, and some of its early values are guesses or
            modelled, not counted.
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
