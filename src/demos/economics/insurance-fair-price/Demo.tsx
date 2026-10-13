"use client";

// Insurance and the average loss. One picture: 100 insured houses, each with an independent
// 1-in-100 chance a year of a $10,000 loss (seeded, mulberry32). Run a year or a century and
// watch the insurer's average payout per customer settle near 0.01 × $10,000 = $100, below the
// $120 premium. Key state: one year seen (a single big loss), then 50+ years (the average).
// Seed 1 is chosen: its first year has exactly one loss, as in the brief (disclosed in claim c4).
// Model: independent risks, no fraud, one premium; not advice about buying cover.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { mulberry32 } from "@/kit/random";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const HOUSES = 100;
const CHANCE = 0.01;
const LOSS = 10_000;
const PREMIUM = 120;
const EXPECTED = CHANCE * LOSS; // 100
const SEED = 1; // chosen: first year has exactly one loss
const MAX_YEARS = 1001;
const MANY = 50;
const MILESTONES = ["one-year", "many-years"] as const;

/** Which houses lose in each year, for the whole seeded run. */
const HISTORY: number[][] = (() => {
  const rng = mulberry32(SEED);
  return Array.from({ length: MAX_YEARS }, () => {
    const hit: number[] = [];
    for (let i = 0; i < HOUSES; i++) if (rng() < CHANCE) hit.push(i);
    return hit;
  });
})();
const lossesUpTo = (y: number) => HISTORY.slice(0, y).reduce((a, h) => a + h.length, 0);
/** Average payout per customer per year over the first y years. */
const avgPayout = (y: number) => (y === 0 ? 0 : (lossesUpTo(y) * LOSS) / (HOUSES * y));

// Grid geometry (viewBox 320 × 200): 10 × 10 houses.
const CELL = 17;
const GX = (320 - CELL * 10) / 2;
const GY = 8;

function House({ i, hit, dim }: { i: number; hit: boolean; dim: boolean }) {
  const x = GX + (i % 10) * CELL + 2;
  const y = GY + Math.floor(i / 10) * CELL + 3;
  const w = CELL - 4;
  return (
    <path
      d={`M${x},${y + w * 0.45} L${x + w / 2},${y} L${x + w},${y + w * 0.45} V${y + w} H${x} Z`}
      fill={hit ? "var(--bad)" : dim ? "var(--bg-2)" : "color-mix(in srgb, var(--domain) 45%, transparent)"}
      stroke={hit ? "var(--bad)" : "var(--line)"}
      strokeWidth={1}
    />
  );
}

function Stage({ ctx, years, setYears }: { ctx: StageContext; years: number; setYears: (y: number) => void }) {
  const { locked, interact } = ctx;
  const { reach } = useMilestones(interact, MILESTONES);
  const run = (y: number) => {
    const k = Math.min(MAX_YEARS, y);
    setYears(k);
    if (k >= 1) reach("one-year");
    if (k >= MANY) reach("many-years");
  };
  const latest = years > 0 ? HISTORY[years - 1] : [];
  const avg = avgPayout(years);

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Model: independent 1-in-100 risks</p>
      <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={locked ? "100 insured houses" : `Year ${years}: ${latest.length} houses lost $10,000`}>
        {Array.from({ length: HOUSES }, (_, i) => (
          <House key={i} i={i} hit={!locked && latest.includes(i)} dim={locked || years === 0} />
        ))}
        <text x={160} y={GY + CELL * 10 + 18} textAnchor="middle" className={s.value}>
          {locked || years === 0 ? "Each pays $120 a year" : `Year ${years}: paid $${(latest.length * LOSS).toLocaleString("en-US")}`}
        </text>
      </svg>

      <Row>
        <Readout label="Years run" value={locked ? "?" : years} />
        <Readout label="Avg payout per customer" value={locked || years === 0 ? "?" : `$${Math.round(avg)}`} />
      </Row>
      <Row>
        <Control className={s.tile} disabled={locked || years >= MAX_YEARS} onClick={() => run(years + 1)}>
          +1 year
        </Control>
        <Control className={s.tile} disabled={locked || years >= MAX_YEARS} onClick={() => run(years + 100)}>
          +100 years
        </Control>
        <Control className={s.tile} disabled={locked || years === 0} onClick={() => setYears(0)}>
          Reset
        </Control>
      </Row>
    </div>
  );
}

export default function InsuranceFairPrice({ slug }: { slug: string }) {
  const [years, setYearsRaw] = useState(0);
  const [longest, setLongest] = useState(0);
  const setYears = (y: number) => {
    setYearsRaw(y);
    setLongest((m) => Math.max(m, y));
  };
  const shown = Math.round(avgPayout(longest));
  const zeroYears = HISTORY.slice(0, longest).filter((h) => h.length === 0).length;
  const bigYears = HISTORY.slice(0, longest).filter((h) => h.length >= 2).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A house has a 1-in-100 chance a year of a $10,000 loss. An insurer charges $${PREMIUM} a year to cover it. On average, how much does it pay out per customer a year?`,
        options: [`$${PREMIUM}`, `$${EXPECTED}`, "$0"],
        answer: 1,
      }}
      exploreHint="Run one year, then 100 more, and watch the average payout."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Over your {longest} years the insurer paid an average of <strong>${shown}</strong> per customer a year, close
            to 1/100 × $10,000 = <strong>${EXPECTED}</strong>. Single years were lumpy: {zeroYears} had no loss and{" "}
            {bigYears} had two or more.
          </p>
          <p>
            So the ${PREMIUM} premium is ${PREMIUM - EXPECTED} above the average loss; in this model that covers the
            insurer's costs. Paying more than the average can still make sense: you swap a small sure cost for protection
            from a rare $10,000 one, and the insurer can carry it because it pools many houses.
          </p>
          <p className="muted">A model: independent risks, no fraud, one seeded run. Not advice about buying cover.</p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} years={years} setYears={setYears} />}
    </Lesson>
  );
}
