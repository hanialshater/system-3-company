"use client";

// A toy dish. A culture of N cells has never met a drug; 1 in 100 million cells
// already carries a resistance mutation, so it holds N / 10^8 resistant cells
// (the expected number, rounded; no random draw of the count). The drug kills
// every other cell; survivors regrow. The lawn is a texture, not one dot per cell.
// Resistant cells sit at positions from an untuned seed (mulberry32(3)).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const RATE = 1e8; // 1 resistant cell in 100 million
const SIZES = [1e10, 1e9, 1e8, 1e7];
const MILESTONES = ["drug", "were-there"] as const;
type View = "before" | "drug" | "regrown";

const name = (n: number) =>
  n >= 1e9 ? `${n / 1e9} billion` : `${n / 1e6} million`;
const expected = (n: number) => n / RATE;

const SPOTS = (() => {
  const rng = mulberry32(3);
  const out: [number, number][] = [];
  while (out.length < 100) {
    const x = rng() * 2 - 1, y = rng() * 2 - 1;
    if (x * x + y * y < 0.85) out.push([150 + x * 125, 150 + y * 125]);
  }
  return out;
})();

// Numbers in the question and reveal come from the same function as the stage.
const BIG = SIZES[0];
const BIG_RES = Math.round(expected(BIG)); // 100

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [n, setN] = useState(BIG);
  const [view, setView] = useState<View>("before");
  const [seen, setSeen] = useState(false);
  const { reach } = useMilestones(interact, MILESTONES);
  const res = Math.round(expected(n));
  const spots = SPOTS.slice(0, res);

  const drug = () => {
    setView("drug");
    setSeen(true);
    if (n === BIG) reach("drug");
  };
  const before = () => {
    setView("before");
    if (seen && n === BIG) reach("were-there");
  };
  const size = (v: number) => {
    setN(v);
    setView("before");
    setSeen(false);
  };

  let msg: string;
  if (locked) msg = "Make a prediction to start. Toy dish: 1 in 100 million cells carries resistance.";
  else if (view === "before")
    msg = seen
      ? `Before the drug: ${res === 0 ? "no resistant cell was" : `the same ${res} ${res === 1 ? "was" : "were"}`} already here (ringed).`
      : `${name(n)} cells, never met a drug. Resistant ones look like the rest.`;
  else if (view === "drug")
    msg = res === 0 ? `Drug added: no cell survives. ${expected(n)} resistant expected: usually none.` : `Drug added: ${res} ${res === 1 ? "cell survives" : "cells survive"}.`;
  else msg = res === 0 ? "Nothing to regrow: the dish stays empty." : "The survivors regrow the dish. Now every cell is resistant.";

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 300 300" className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        <defs>
          <pattern id="abx-lawn" width={6} height={6} patternUnits="userSpaceOnUse">
            <circle cx={3} cy={3} r={1.6} className={s.cell} />
          </pattern>
          <clipPath id="abx-dish">
            <circle cx={150} cy={150} r={136} />
          </clipPath>
        </defs>
        <circle cx={150} cy={150} r={140} className={s.dish} />
        {view === "before" && <circle cx={150} cy={150} r={136} fill="url(#abx-lawn)" />}
        {view === "drug" && <circle cx={150} cy={150} r={136} className={s.drug} />}
        <g clipPath="url(#abx-dish)">
          {!locked &&
            spots.map(([x, y], i) =>
              view === "regrown" ? (
                <circle key={i} cx={x} cy={y} r={res >= 100 ? 26 : res >= 10 ? 48 : 120} className={s.colony} />
              ) : view === "drug" ? (
                <circle key={i} cx={x} cy={y} r={3.2} className={s.res} />
              ) : seen ? (
                <circle key={i} cx={x} cy={y} r={6} className={s.ring} />
              ) : null,
            )}
        </g>
      </svg>

      <p className={s.msg} aria-live="polite">
        {msg}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || view === "drug"} onClick={drug}>
          Add drug
        </Control>
        <Control className={s.chip} disabled={locked || view !== "drug"} onClick={() => setView("regrown")}>
          Let survivors regrow
        </Control>
        <Control className={s.chip} disabled={locked || view === "before"} onClick={before}>
          Back to before the drug
        </Control>
      </Row>
      <Row>
        {SIZES.map((v) => (
          <Control key={v} className={`${s.chip} ${n === v ? "active" : ""}`} aria-pressed={n === v} disabled={locked || n === v} onClick={() => size(v)}>
            {name(v)}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Cells" value={name(n)} />
        <Readout label="Resistant" value={locked || !seen ? "?" : res} />
      </Row>
    </div>
  );
}

export default function AntibioticAlreadyThere({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A culture of ${name(BIG)} bacteria has never met a drug. If 1 in 100 million cells carries a resistance mutation, about how many resistant cells are already there?`,
        options: ["None", `About ${BIG_RES}`, "About 10 million"],
        answer: 1,
      }}
      exploreHint="Add the drug, then go back to before the drug and look where the survivors were."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {name(BIG)} &times; 1 in 100 million = <strong>{BIG_RES} resistant cells</strong>, there before any drug. The
            drug killed the rest and the {BIG_RES} survived. Going back, the survivors were at the same spots all along.
          </p>
          <p>
            The drug did not create resistance; it removed everything else, so the resistant cells took over the regrown
            dish. Big populations almost always hold a few rare mutants. In a dish of 10 million, expecting 0.1, the drug would usually win.
          </p>
          <p className="muted">
            Model: 1 in 100 million is an illustration; real mutation frequencies vary widely. Counts are expected
            values. Not medical advice.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
