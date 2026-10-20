"use client";

// Fluctuation test (Luria-Delbruck), toy version. 20 identical cultures each double 20 times from one cell
// (2^20 = 1,048,576 cells). Rule "Random, while growing": at each division round g (0..19) the number of
// new resistant daughters is Poisson(non-mutant cells x 2^-20), and each one becomes 2^(19-g) resistant
// cells by the end. Rule "Made by the drug": no mutations during growth; on the plate each cell turns
// resistant with chance 10/2^20, so each plate is Poisson(10). Both rules average about 10 per plate.
// Seeded mulberry32 (seed shown); the seed button is enabled once a rule has run. Key state: both rules run.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const PLATES = 20;
const GENS = 20;
const CELLS = 2 ** GENS;
const DRUG_MEAN = 10;
const MILESTONES = ["growing", "drug"] as const;
type Rule = (typeof MILESTONES)[number];

const poisson = (rng: () => number, lambda: number) => {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= rng();
  } while (p > L);
  return k - 1;
};

type Plate = { count: number; firstGen: number | null };

function runGrowing(seed: number): Plate[] {
  const rng = mulberry32(seed);
  return Array.from({ length: PLATES }, () => {
    let res = 0;
    let firstGen: number | null = null;
    for (let g = 0; g < GENS; g++) {
      const non = 2 ** g - res;
      res *= 2;
      const k = poisson(rng, non / CELLS);
      if (k > 0 && firstGen === null) firstGen = g;
      res += k;
    }
    return { count: res, firstGen };
  });
}
function runDrug(seed: number): Plate[] {
  const rng = mulberry32(seed);
  return Array.from({ length: PLATES }, () => ({ count: poisson(rng, DRUG_MEAN), firstGen: null }));
}

const stats = (p: Plate[]) => {
  const c = p.map((x) => x.count);
  const max = Math.max(...c);
  const top = p.find((x) => x.count === max)!;
  return { none: c.filter((x) => x === 0).length, min: Math.min(...c), max, topGen: top.firstGen };
};

const W = 360, H = 184;
const X0 = 11, BW = 14, GAP = 3;
const AXIS = 40, BAR_H = 46;
const ROW_Y = { growing: 86, drug: 170 } as const; // baselines

function Bars({ plates, base, locked }: { plates: Plate[] | null; base: number; locked: boolean }) {
  return (
    <g>
      <line x1={X0 - 2} x2={X0 + PLATES * (BW + GAP)} y1={base} y2={base} className={s.axis} />
      <text x={W - 2} y={base - BAR_H + 3} textAnchor="end" className={s.tick}>{AXIS}</text>
      {Array.from({ length: PLATES }, (_, i) => {
        const x = X0 + i * (BW + GAP);
        const n = plates?.[i].count ?? 0;
        const broken = n > AXIS;
        const h = locked || !plates ? 0 : (Math.min(n, AXIS) / AXIS) * BAR_H;
        return (
          <g key={i}>
            <ellipse cx={x + BW / 2} cy={base + 6} rx={BW / 2} ry={3.5} className={s.plate} />
            {h > 0 && <rect x={x} y={base - h} width={BW} height={h} className={broken ? s.barBig : s.bar} />}
            {broken && (
              <>
                <line x1={x - 1} x2={x + BW + 1} y1={base - h + 14} y2={base - h + 10} className={s.cut} />
                <line x1={x - 1} x2={x + BW + 1} y1={base - h + 18} y2={base - h + 14} className={s.cut} />
                <text x={x + BW / 2} y={base - h - 3} textAnchor="middle" className={s.big}>{n}</text>
              </>
            )}
          </g>
        );
      })}
    </g>
  );
}

type Ran = Record<Rule, boolean>;

function Stage({ locked, interact, seed, setSeed, ran, setRan }: {
  locked: boolean;
  interact: () => void;
  seed: number;
  setSeed: (v: number) => void;
  ran: Ran;
  setRan: (v: Ran) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const grow = ran.growing ? runGrowing(seed) : null;
  const drug = ran.drug ? runDrug(seed) : null;
  const g = grow && stats(grow);
  const d = drug && stats(drug);

  const run = (r: Rule) => {
    setRan({ ...ran, [r]: true });
    reach(r);
  };

  const msg = locked
    ? "20 identical cultures each grow from one cell to about a million. Resistance mutations strike at random during divisions, about once per million."
    : "Bars: resistant colonies on each drug plate.";

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{msg}</p>
      <Row>
        <Control disabled={locked || (!ran.growing && !ran.drug)} onClick={() => setSeed(seed + 1)}>
          New seed (now {seed})
        </Control>
      </Row>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={locked ? "20 empty plates in each of two rows" : `seed ${seed}`}>
        {!locked && (
          <text x={X0 - 2} y={12} className={s.rowTitle}>
            Random, while growing{g ? `: ${g.none} empty, max ${g.max}` : ""}
          </text>
        )}
        {g && g.topGen !== null && g.max > AXIS && (
          <text x={X0 - 2} y={24} className={s.note}>{`${g.max}: one mutation at division ${g.topGen + 1}, copied`}</text>
        )}
        <Bars plates={grow} base={ROW_Y.growing} locked={locked} />
        {!locked && (
          <text x={X0 - 2} y={ROW_Y.growing + 24} className={s.rowTitle}>
            Made by the drug{d ? `: ${d.none} empty, ${d.min} to ${d.max}` : ""}
          </text>
        )}
        <Bars plates={drug} base={ROW_Y.drug} locked={locked} />
      </svg>
      <Row>
        <Control className={ran.growing ? "active" : ""} disabled={locked || ran.growing} onClick={() => run("growing")}>
          Random, while growing
        </Control>
        <Control className={ran.drug ? "active" : ""} disabled={locked || ran.drug} onClick={() => run("drug")}>
          Made by the drug
        </Control>
      </Row>
    </div>
  );
}

export default function TwentyCulturesTwentyPlates({ slug }: { slug: string }) {
  const [seed, setSeed] = useState(1);
  const [ran, setRan] = useState<Ran>({ growing: false, drug: false });
  const g = stats(runGrowing(seed));
  const d = stats(runDrug(seed));
  const jackpot = g.max >= 2 * d.max;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In your lab, 20 identical cultures each grow from one cell to about a million, with resistance mutations striking at random about once per million divisions. Each goes on a drug plate. How do the 20 counts of resistant colonies compare?",
        options: [
          "About the same on every plate",
          "Most plates have few or none, one or two have many",
          "About half have none, the rest about the same",
        ],
        answer: 1,
      }}
      exploreHint="Run both rules and compare the two rows of plates."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {jackpot
              ? `Here, ${g.none} plates had none and one had ${g.max}. A mutation early in growth was copied into every descendant: a jackpot.`
              : `Here, ${g.none} plates had none and the largest had ${g.max}: uneven, but no big jackpot this time. An early mutation, copied into every descendant, makes one.`}{" "}
            When the drug made the mutations, every plate got a similar count ({d.min} to {d.max}).
          </p>
          <p>
            Luria and Delbrück found jackpots like these in 1943, with a virus instead of a drug: evidence that resistance
            mutations arise at random before the threat, not in answer to it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} seed={seed} setSeed={setSeed} ran={ran} setRan={setRan} />
      )}
    </Lesson>
  );
}
