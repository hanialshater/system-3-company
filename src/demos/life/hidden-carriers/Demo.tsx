"use client";

// Hardy-Weinberg for a made-up recessive trait in a town of 10,000.
// Affected share q^2 is chosen by the learner; then q = sqrt(affected share),
// carriers = 2pq. Counts are the model's expected counts (no sampling); only the
// positions of people in the town are shuffled, with an untuned seed (mulberry32(7)).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const TOWN = 10000;
const SIDE = 100;
const CELL = 3;
/** "1 in N" people show the trait. Key state first. */
const RATES = [10000, 2500, 400, 100];
const START = 100;
const MILESTONES = ["rare", "compare"] as const;

function counts(oneIn: number) {
  const q = Math.sqrt(1 / oneIn);
  const affected = Math.round(TOWN * q * q);
  const carriers = Math.round(TOWN * 2 * q * (1 - q));
  return { q, affected, carriers };
}

const RARE = counts(10000); // 1 affected, 198 carriers
const RARE_ONE_IN = Math.round(TOWN / RARE.carriers); // 50

const ORDER = (() => {
  const rng = mulberry32(7);
  const idx = Array.from({ length: TOWN }, (_, i) => i);
  for (let i = TOWN - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
})();

const pos = (spot: number) => [(spot % SIDE) * CELL + CELL / 2, Math.floor(spot / SIDE) * CELL + CELL / 2];

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [oneIn, setOneIn] = useState(START);
  const { reach } = useMilestones(interact, MILESTONES);
  const c = counts(oneIn);
  const go = (v: number) => {
    setOneIn(v);
    if (v === 10000) reach("rare");
    else if (v !== START) reach("compare");
  };
  const carrierSpots = useMemo(() => ORDER.slice(c.affected, c.affected + c.carriers), [c.affected, c.carriers]);
  const affectedSpots = ORDER.slice(0, c.affected);

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${SIDE * CELL} ${SIDE * CELL}`} className={`stage-svg ${s.svg}`} role="img" aria-label={locked ? "A town of 10,000 people" : `${c.affected} affected and ${c.carriers} carriers among 10,000`}>
        <defs>
          <pattern id="hc-person" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <circle cx={CELL / 2} cy={CELL / 2} r={0.75} className={s.person} />
          </pattern>
        </defs>
        <rect x={0} y={0} width={SIDE * CELL} height={SIDE * CELL} fill="url(#hc-person)" />
        {!locked &&
          carrierSpots.map((spot) => {
            const [x, y] = pos(spot);
            return <circle key={spot} cx={x} cy={y} r={1.35} className={s.carrier} />;
          })}
        {!locked &&
          affectedSpots.map((spot) => {
            const [x, y] = pos(spot);
            return (
              <g key={`a${spot}`}>
                <circle cx={x} cy={y} r={7} className={s.ring} />
                <circle cx={x} cy={y} r={2.6} className={s.affected} />
              </g>
            );
          })}
      </svg>

      <div className={s.legend} aria-hidden>
        <span><i className={s.affected} />shows trait (2 copies)</span>
        <span><i className={s.carrier} />carrier (1 copy)</span>
      </div>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. Toy town of 10,000: random mating, no selection."
          : `1 in ${oneIn.toLocaleString("en-US")} show it: ${c.affected} ${c.affected === 1 ? "person" : "people"}. ${c.carriers.toLocaleString("en-US")} carry one hidden copy.`}
      </p>

      <Row>
        {RATES.map((v) => (
          <Control key={v} className={`${s.chip} ${oneIn === v ? "active" : ""}`} aria-pressed={oneIn === v} disabled={locked || oneIn === v} onClick={() => go(v)}>
            1 in {v.toLocaleString("en-US")}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Show trait" value={locked ? "?" : c.affected} />
        <Readout label="Carriers" value={locked ? "?" : c.carriers.toLocaleString("en-US")} />
        <Readout label="Carriers each" value={locked ? "?" : Math.round(c.carriers / c.affected)} />
      </Row>
    </div>
  );
}

export default function HiddenCarriers({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In a well-mixed population, 1 in 10,000 shows a made-up recessive trait (it needs two copies). About how many carry one copy and look normal?",
        options: ["About 1 in 100", `About 1 in ${RARE_ONE_IN}`, "About 1 in 10,000"],
        answer: 1,
      }}
      exploreHint="Set the trait to 1 in 10,000 and find the one person who shows it. Then try a commoner trait."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At 1 in 10,000, one person showed the trait, but <strong>{RARE.carriers} carried a hidden copy</strong>: about
            1 in {RARE_ONE_IN}. For every person who shows it, {RARE.carriers} others carry it.
          </p>
          <p>
            Two copies are needed to show it, so the affected share is the copy share squared: 1 in 10,000 means 1 copy in
            100. One copy is much likelier than two, so most copies hide in carriers. The rarer the trait, the bigger the
            hidden share: at 1 in 100 it was only 18 carriers per person showing it.
          </p>
          <p className="muted">Model (Hardy-Weinberg): random mating, no selection, migration or new mutations, large population. The trait is made up.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
