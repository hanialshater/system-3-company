"use client";

// Heterozygote advantage in a made-up species, deterministic (infinite population,
// random mating, one generation at a time). Survival: ww = 0, one w = 100%, no w = 1 - s.
// Next generation's share of w: q' = pq / (p^2 (1 - s) + 2pq). Equilibrium q* = s/(s + 1).
// The chart draws the share of w over generations from two starts (1% and 50%) at once,
// so the learner sees one curve rise and the other fall to the same level.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const GENS = 60;
const STEP = 10;
const RARE = 0.01;
const COMMON = 0.5;
const DEFAULT_NC = 85;
const MILESTONES = ["both-settle", "moved-slider"] as const;

function trajectory(q0: number, sel: number) {
  const out = [q0];
  let q = q0;
  for (let g = 1; g <= GENS; g++) {
    const p = 1 - q;
    q = (p * q) / (p * p * (1 - sel) + 2 * p * q);
    out.push(q);
  }
  return out;
}

const pct = (q: number) => `${Math.round(100 * q)}%`;
const selOf = (nc: number) => 1 - nc / 100;
const eq = (nc: number) => selOf(nc) / (selOf(nc) + 1);

// Numbers in the question and reveal come from the same model as the stage.
const BASE_RARE = trajectory(RARE, selOf(DEFAULT_NC));
const SETTLED_RARE = Math.round(100 * BASE_RARE[GENS]); // 13; the 50% start also rounds to 13 at gen 60
const QSTAR = Math.round(100 * eq(DEFAULT_NC)); // 13

// chart geometry
const X0 = 34, X1 = 290, Y0 = 12, Y1 = 150, YMAX = 0.55;
const px = (g: number) => X0 + ((X1 - X0) * g) / GENS;
const py = (q: number) => Y1 - ((Y1 - Y0) * q) / YMAX;
const line = (tr: number[], gen: number) =>
  tr
    .slice(0, gen + 1)
    .map((q, g) => `${g === 0 ? "M" : "L"}${px(g).toFixed(1)} ${py(q).toFixed(1)}`)
    .join(" ");

function Stage({
  locked,
  interact,
  noCopy,
  setNoCopy,
}: {
  locked: boolean;
  interact: () => void;
  noCopy: number;
  setNoCopy: (v: number) => void;
}) {
  const [gen, setGen] = useState(0);
  const { reach } = useMilestones(interact, MILESTONES);
  const sel = selOf(noCopy);
  const rare = useMemo(() => trajectory(RARE, sel), [sel]);
  const common = useMemo(() => trajectory(COMMON, sel), [sel]);
  const star = eq(noCopy);

  const run = (g: number, nc: number) => {
    setGen(g);
    setNoCopy(nc);
    if (g === GENS && nc === DEFAULT_NC) reach("both-settle");
    if (g >= 50 && nc !== DEFAULT_NC) reach("moved-slider");
  };

  return (
    <div className={s.wrap}>
      <svg
        viewBox="0 0 300 182"
        className={`stage-svg ${s.svg}`}
        role="img"
        aria-label={`Generation ${gen}: share of w is ${pct(rare[gen])} from a 1% start and ${pct(common[gen])} from a 50% start`}
      >
        <line x1={X0} y1={Y1} x2={X1} y2={Y1} className={s.axis} />
        <line x1={X0} y1={Y0} x2={X0} y2={Y1} className={s.axis} />
        {[0, 0.25, 0.5].map((v) => (
          <text key={v} x={X0 - 4} y={py(v) + 3} textAnchor="end" className={s.tick}>
            {pct(v)}
          </text>
        ))}
        {[0, 30, 60].map((g) => (
          <text key={g} x={px(g)} y={Y1 + 13} textAnchor="middle" className={s.tick}>
            {g}
          </text>
        ))}
        <text x={(X0 + X1) / 2} y={Y1 + 25} textAnchor="middle" className={s.tick}>
          generations
        </text>
        {!locked && (
          <>
            {gen >= GENS && (
              <>
                <line x1={X0} y1={py(star)} x2={X1} y2={py(star)} className={s.eq} />
                <text x={X1} y={py(star) - 4} textAnchor="end" className={s.eqlab}>
                  balance {pct(star)}
                </text>
              </>
            )}
            <path d={line(rare, gen)} className={s.rare} />
            <path d={line(common, gen)} className={s.common} />
            <circle cx={px(gen)} cy={py(rare[gen])} r={4} className={s.dotRare} />
            <circle cx={px(gen)} cy={py(common[gen])} r={4} className={s.dotCommon} />
          </>
        )}
      </svg>

      <div className={s.key} aria-hidden>
        <span>
          <i style={{ background: "var(--bad)" }} />
          starts at 1% w
        </span>
        <span>
          <i style={{ background: "var(--domain)" }} />
          starts at 50% w
        </span>
      </div>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. w = share of all gene copies. Survival: two w 0%, one w 100%, no w 85%."
          : gen === 0
            ? `Generation 0: w is 1% in one population, 50% in the other. Survival with no w: ${noCopy}%.`
            : `Generation ${gen}: w is ${pct(rare[gen])} (from 1%) and ${pct(common[gen])} (from 50%). Survival with no w: ${noCopy}%.`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || gen >= GENS} onClick={() => run(Math.min(GENS, gen + STEP), noCopy)}>
          +{STEP} generations
        </Control>
        <Control className={s.chip} disabled={locked || gen >= GENS} onClick={() => run(GENS, noCopy)}>
          To gen {GENS}
        </Control>
      </Row>
      <Slider label="Survival with no w" value={noCopy} min={70} max={95} step={5} disabled={locked} format={(v) => `${v}%`} onChange={(v) => run(gen, v)} />
      <Row>
        <Readout label="w share now (1% / 50% starts)" value={locked ? "?" : `${pct(rare[gen])} / ${pct(common[gen])}`} />
        <Readout label="Balance" value={locked || gen < GENS ? "?" : pct(star)} />
      </Row>
      <Row>
        <Readout label="Young with 2 w (die)" value={locked ? "?" : `${pct(rare[gen] ** 2)} / ${pct(common[gen] ** 2)}`} />
        <Readout label="Young with 1 w (thrive)" value={locked ? "?" : `${pct(2 * rare[gen] * (1 - rare[gen]))} / ${pct(2 * common[gen] * (1 - common[gen]))}`} />
      </Row>
    </div>
  );
}

export default function KeepingTheBadGene({ slug }: { slug: string }) {
  const [noCopy, setNoCopy] = useState(DEFAULT_NC);
  const diff = noCopy - DEFAULT_NC;
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Made-up species. A gene version (allele) called w is fatal if an animal gets two copies. One copy: all survive. No copies: 85% survive. In the long run, w, as a share of all gene copies…",
        options: ["disappears", "settles at a steady share in between", "takes over"],
        answer: 1,
      }}
      exploreHint="Press +10 generations until 60 and watch both curves and the young-animal rows. Then move the survival slider."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Starting from 1% and from 50%, the curves met at <strong>{SETTLED_RARE} of 100 copies</strong>. Selection did not remove w, even though two copies kill. Look at the two
            young-animal rows: when w is rare almost no young get two copies (nobody dies of it) while some get one, who
            survive best, so w rises. When w is common, a quarter or more of young get two copies and die, so w falls.
            The balance is where the two pulls match: animals with no w lose 15 of 100, animals with two w lose
            100, so 15 &divide; (15 + 100) &asymp; {QSTAR}%.
          </p>
          {diff !== 0 && (
            <p>
              You set no-w survival to {noCopy}%: the one-copy edge became {diff < 0 ? "bigger" : "smaller"}, and the
              balance {diff < 0 ? "rose" : "fell"} to {pct(eq(noCopy))}.
            </p>
          )}
          <p className="muted">
            Made-up species, random mating, huge population. The real classic case is the sickle-cell allele where
            malaria is common, with different numbers.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} noCopy={noCopy} setNoCopy={setNoCopy} />}
    </Lesson>
  );
}
