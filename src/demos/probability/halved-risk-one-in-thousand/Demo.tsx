"use client";

// Relative versus absolute risk. 1,000 people as dots. The baseline risk picks how many get the
// condition (red); the pill halves the risk, and the people it spares turn into green rings.
// Key state: the pill on at 2 in 1,000 (spares 1), then on at 200 in 1,000 (spares 100).
// The pill toggle comes first in DOM order so the QA path reaches both states.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { BASELINES, COLS, cases, fates, order, spared } from "./model";
import s from "./styles.module.css";

const ORDER = order();
const MILESTONES = ["pill-at-2", "pill-at-200"] as const;
const LOW = BASELINES[0];
const HIGH = BASELINES[BASELINES.length - 1];
const n = (v: number) => v.toLocaleString("en-US");
const GAP = 10;

function Stage({
  locked,
  interact,
  base,
  setBase,
  pill,
  setPill,
}: {
  locked: boolean;
  interact: () => void;
  base: number;
  setBase: (b: number) => void;
  pill: boolean;
  setPill: (p: boolean) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const f = useMemo(() => fates(base, pill, ORDER), [base, pill]);
  const check = (b: number, p: boolean) => {
    if (p && b === LOW) reach("pill-at-2");
    if (p && b === HIGH) reach("pill-at-200");
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked ? "Make a prediction to start." : "Each dot: a person. Red: gets the condition. Green ring: spared by the pill."}
      </p>
      <svg viewBox="0 0 400 250" className={`stage-svg ${s.svg}`} role="img" aria-label={`${n(cases(base, pill))} cases among 1,000 people`}>
        {f.map((fate, i) => (
          <circle
            key={i}
            cx={GAP / 2 + (i % COLS) * GAP}
            cy={GAP / 2 + Math.floor(i / COLS) * GAP}
            r={fate === "fine" ? 2.6 : 4}
            className={fate === "case" ? s.case : fate === "spared" ? s.spared : s.fine}
          />
        ))}
      </svg>
      <Row>
        <Control
          className={pill ? "active" : ""}
          aria-pressed={pill}
          disabled={locked}
          onClick={() => {
            setPill(!pill);
            check(base, !pill);
          }}
        >
          {pill ? "Remove the pill" : "Give the pill"}
        </Control>
      </Row>
      <Row>
        <span className={s.label}>Risk per 1,000:</span>
        {BASELINES.map((b) => (
          <Control
            key={b}
            className={b === base ? "active" : ""}
            aria-pressed={b === base}
            aria-label={`Risk ${b} in 1,000`}
            disabled={locked || b === base}
            onClick={() => {
              setBase(b);
              check(b, pill);
            }}
          >
            {b}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Cases" value={n(cases(base, pill))} />
        <Readout label="Spared by the pill" value={pill ? n(spared(base)) : "pill off"} />
      </Row>
    </div>
  );
}

export default function HalvedRisk({ slug }: { slug: string }) {
  const [base, setBase] = useState<number>(LOW);
  const [pill, setPill] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A pill halves the risk of a rare condition, from ${LOW} in 1,000 to ${cases(LOW, true)} in 1,000. Of 1,000 people who take it, how many avoid the condition who would otherwise have had it?`,
        options: [n(spared(LOW)), n(spared(20)), n(1000 / 2)],
        answer: 0,
      }}
      exploreHint={`Give the pill at ${LOW} in 1,000. Then raise the risk to ${HIGH} in 1,000.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {LOW} in 1,000 the pill took cases from {cases(LOW, false)} to {cases(LOW, true)}: it spared{" "}
            <strong>{spared(LOW)} person</strong> of 1,000. &ldquo;Halves your risk&rdquo; was true, yet the risk fell by
            only {spared(LOW)} in 1,000, so 1,000 people take it for one to be spared.
          </p>
          <p>
            At {HIGH} in 1,000 the same halving spared {spared(HIGH)}. A relative cut is a share of the starting risk.
          </p>
          <p className="muted">The pill is made up; the arithmetic is the same for any treatment.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} base={base} setBase={setBase} pill={pill} setPill={setPill} />
      )}
    </Lesson>
  );
}
