"use client";

// Conditional probability. A 6 x 6 grid of two-dice outcomes; cells with a six are outlined.
// A clue about the total greys out the cells it rules out; the chance of a six is the share left.
// Key state: "Total is 8" applied (2 of 5), plus one other clue for contrast.
// "Total is 8" is first in DOM order; "No clue" (the start state) is last.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CELLS, CLUES, CLUE_LABEL, type Clue, hasSix, keeps, share } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["eight", "other"] as const;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const E = share("eight");
const N = share("none");
const SZ = 40;
const X0 = 30;
const Y0 = 24;

function Stage({
  locked,
  interact,
  clue,
  setClue,
  seen,
  setSeen,
}: {
  locked: boolean;
  interact: () => void;
  clue: Clue;
  setClue: (c: Clue) => void;
  seen: Clue[];
  setSeen: (c: Clue[]) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const sh = share(clue);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "Each cell: one way two dice land. Outlined: a die shows a six."}</p>
      <svg viewBox="0 0 280 274" className={`stage-svg ${s.svg}`} role="img" aria-label={`${sh.left} cells left, ${sh.six} with a six`}>
        <text x={X0 + 3 * SZ} y={12} textAnchor="middle" className={s.axis}>
          second die
        </text>
        <text x={10} y={Y0 + 3 * SZ} textAnchor="middle" transform={`rotate(-90 10 ${Y0 + 3 * SZ})`} className={s.axis}>
          first die
        </text>
        {CELLS.map(([a, b]) => {
          const on = keeps[clue](a, b);
          const six = hasSix(a, b);
          const x = X0 + (b - 1) * SZ;
          const y = Y0 + (a - 1) * SZ;
          return (
            <g key={`${a}${b}`} className={on ? "" : s.out}>
              <rect x={x + 2} y={y + 2} width={SZ - 4} height={SZ - 4} rx={6} className={six ? s.cellSix : s.cell} />
              <text x={x + SZ / 2} y={y + SZ / 2 + 4} textAnchor="middle" className={s.cellText}>
                {a}+{b}
              </text>
            </g>
          );
        })}
      </svg>
      <Row>
        {CLUES.map((c) => (
          <Control
            key={c}
            className={c === clue ? "active" : ""}
            aria-pressed={c === clue}
            disabled={locked || c === clue}
            onClick={() => {
              setClue(c);
              if (!seen.includes(c)) setSeen([...seen, c]);
              if (c === "eight") reach("eight");
              if (c === "seven" || c === "tenUp") reach("other");
            }}
          >
            {CLUE_LABEL[c]}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Cells left" value={sh.left} />
        <Readout label="With a six" value={`${sh.six} of ${sh.left} (${pct(sh.six / sh.left)})`} />
      </Row>
    </div>
  );
}

export default function ToldTheSumIsEight({ slug }: { slug: string }) {
  const [clue, setClue] = useState<Clue>("none");
  const [seen, setSeen] = useState<Clue[]>(["none"]);
  const others = (["seven", "tenUp"] as Clue[]).filter((c) => seen.includes(c));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You roll two dice and are told only that the total is 8. How likely is it that at least one die shows a six?",
        options: [`${pct(N.six / N.left)}`, pct(E.six / E.left), "50%"],
        answer: 1,
      }}
      exploreHint="Give the clue “Total is 8”. Then try another clue."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            &ldquo;Total is 8&rdquo; left {E.left} of 36 cells: 2+6, 3+5, 4+4, 5+3, 6+2. {E.six} of them contain a six:{" "}
            <strong>
              {E.six}/{E.left} = {pct(E.six / E.left)}
            </strong>
            . With no clue it was {N.six} of {N.left} ({pct(N.six / N.left)}).
          </p>
          <p>
            {others.map((c) => `With “${CLUE_LABEL[c].toLowerCase()}” you saw ${share(c).six} of ${share(c).left}. `).join("")}A clue
            shrinks the list of possible outcomes; the chance is the share of what is left.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} clue={clue} setClue={setClue} seen={seen} setSeen={setSeen} />}
    </Lesson>
  );
}
