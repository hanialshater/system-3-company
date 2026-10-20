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
const START = 400;
const MILESTONES = ["rare", "common"] as const;

function counts(oneIn: number) {
  const q = Math.sqrt(1 / oneIn);
  const affected = Math.round(TOWN * q * q);
  const carriers = Math.round(TOWN * 2 * q * (1 - q));
  return { q, affected, carriers };
}

const RARE = counts(10000); // 1 affected, 198 carriers
const RARE_ONE_IN = Math.floor(TOWN / RARE.carriers); // 10,000 / 198 = 50.5: "about 1 in 50"
const COMMON = counts(100);
const COMMON_EACH = Math.round(COMMON.carriers / COMMON.affected); // 18
const copyIn = (q: number) => Math.round(1 / q);

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
    else if (v === 100) reach("common");
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
                <circle cx={x} cy={y} r={9} className={s.ring} />
                <circle cx={x} cy={y} r={3.4} className={s.affected} />
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
          : `1 in ${oneIn.toLocaleString("en-US")} show it: ${c.affected} ${c.affected === 1 ? "person" : "people"}. ${c.carriers.toLocaleString("en-US")} carry one hidden copy. Variant = 1 of every ${copyIn(c.q)} gene copies; ${copyIn(c.q)} × ${copyIn(c.q)} = ${oneIn.toLocaleString("en-US")}.`}
      </p>

      <Row>
        {RATES.map((v) => (
          <Control key={v} className={`${s.chip} ${!locked && oneIn === v ? "active" : ""}`} aria-pressed={!locked && oneIn === v} disabled={locked || oneIn === v} onClick={() => go(v)}>
            1 in {v.toLocaleString("en-US")}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Show trait" value={locked ? "?" : c.affected} />
        <Readout label="Carriers" value={locked ? "?" : c.carriers.toLocaleString("en-US")} />
        <Readout label="Carriers per person showing it" value={locked ? "?" : Math.round(c.carriers / c.affected)} />
        <Readout label="Variant copies in town" value={locked ? "?" : `${(2 * TOWN * c.q).toFixed(0)} of ${(2 * TOWN).toLocaleString("en-US")}`} />
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
          "In a town with random mating, 1 in 10,000 people shows a made-up recessive trait: it appears only with two copies of a gene variant, one from each parent. About how many people carry just one copy without showing the trait?",
        options: ["About 1 in 100", `About 1 in ${RARE_ONE_IN}`, "About 1 in 10,000"],
        answer: 1,
      }}
      exploreHint="Set the trait to 1 in 10,000 and find the one ringed person who shows it. Count the variant copies. Then set 1 in 100."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At 1 in 10,000, one person showed the trait but <strong>{RARE.carriers} carried a hidden copy</strong>: about 1
            in {RARE_ONE_IN}. Everyone has two copies, so the town holds 20,000 gene copies; 1 in {copyIn(RARE.q)} are the variant, 200
            copies. The one person who shows it holds 2 of them; the other {RARE.carriers} sit one each in
            carriers. Both copies together: {copyIn(RARE.q)} &times; {copyIn(RARE.q)} = 10,000 to 1, so two copies are
            rare, one copy is not.
          </p>
          <p>
            The commoner the trait, the fewer hidden: at 1 in 100 there were {COMMON_EACH} carriers per person showing it.
          </p>
          <p className="muted">Model: random mating, no selection, migration or new mutations, large population. The trait is made up.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
