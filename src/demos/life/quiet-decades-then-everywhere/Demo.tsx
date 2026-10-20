"use client";

// Toy invasion: 100 plants grow 20% a year, N(y) = 100 x 1.2^y, until the region's cap of
// 1,000,000 (reached at year 50.5). The map is 400 squares of 2,500 plants each: full squares are
// filled, the next square shows its partial fill as a smaller dot. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = 100, GROWTH = 0.2, CAP = 1_000_000, SQUARES = 400, COLS = 20;
const PER = CAP / SQUARES; // 2,500
const FULL_AT = Math.log(CAP / START) / Math.log(1 + GROWTH); // 50.5
const HALF = Math.round(FULL_AT / 2); // 25
const FULL_YEAR = Math.ceil(FULL_AT); // 51
const YEARS = [10, HALF, 40, 45, FULL_YEAR] as const;
const MILESTONES = ["halfway", "late"] as const;
const plants = (y: number) => Math.min(CAP, Math.round(START * Math.pow(1 + GROWTH, y)));
const share = (y: number) => plants(y) / CAP;
const fmt = (n: number) => n.toLocaleString("en-US");
const pct = (x: number) => (x < 0.1 ? `${(100 * x).toFixed(2)}%` : `${Math.round(100 * x)}%`);
// fill squares in a scattered but fixed order, so growth spreads across the map
const ORDER = Array.from({ length: SQUARES }, (_, i) => (i * 173 + 211) % SQUARES);
const RANK = new Map(ORDER.map((sq, k) => [sq, k]));

function Stage({ locked, year, onYear }: { locked: boolean; year: number; onYear: (y: number) => void }) {
  const n = plants(year);
  const full = Math.floor(n / PER), part = n / PER - full;
  const msg = locked
    ? `Toy region: each square holds ${fmt(PER)} plants. Full: ${fmt(CAP)}.`
    : `Year ${year}: ${fmt(n)} plants, ${pct(share(year))} of the final ${fmt(CAP)}.`;
  const G = 14;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${COLS * G} ${(SQUARES / COLS) * G}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {Array.from({ length: SQUARES }, (_, i) => {
          const k = RANK.get(i)!;
          const x = (i % COLS) * G, y = Math.floor(i / COLS) * G;
          return (
            <g key={i}>
              <rect x={x + 0.5} y={y + 0.5} width={G - 1} height={G - 1} className={k < full ? s.full : s.empty} />
              {k === full && part > 0 && <circle cx={x + G / 2} cy={y + G / 2} r={Math.max(1.2, (G / 2 - 1) * Math.sqrt(part))} className={s.on} />}
            </g>
          );
        })}
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {YEARS.map((y) => (
          <Control key={y} className={year === y ? "active" : ""} disabled={locked || year === y} onClick={() => onYear(y)}>
            Year {y}{y === HALF ? " (half)" : ""}
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function QuietDecadesThenEverywhere({ slug }: { slug: string }) {
  const [year, setYear] = useState(0);
  const [seen, setSeen] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${START} invasive plants take root in your valley (a toy region) and grow ${Math.round(100 * GROWTH)}% a year until it holds ${fmt(CAP)}, about ${Math.round(FULL_AT)} years later. At year ${HALF}, what share of that final number is there?`,
        options: ["About 1%", "About 25%", "About 50%"],
        answer: 0,
      }}
      exploreHint="Jump to the halfway year, then later years. Watch the map."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const late = seen.filter((y) => y > HALF).sort((a, b) => a - b);
        return (
          <>
            <p>
              At year {HALF}, halfway in time, there were {fmt(plants(HALF))} plants: <strong>{pct(share(HALF))}</strong> of the final{" "}
              {fmt(CAP)}, under four squares of the map.
              {late.length ? ` Then: ${late.map((y) => `year ${y}, ${pct(share(y))}`).join("; ")}.` : ""}
            </p>
            <p>
              Growing {Math.round(100 * GROWTH)}% a year doubles the count about every {(Math.log(2) / Math.log(1 + GROWTH)).toFixed(1)} years,
              so each doubling adds as many plants as all the years before it together. Almost all of the filling happens in the last few doublings.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              year={year}
              onYear={(y) => {
                setYear(y);
                setSeen((x) => (x.includes(y) ? x : [...x, y]));
                if (y === HALF) reach("halfway");
                if (y >= 45) reach("late");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
