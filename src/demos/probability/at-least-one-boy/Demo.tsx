"use client";

// Two-children problem. 1,000 seeded families sit in a 2 x 2 grid: older child by row,
// younger child by column. A clue greys out the cells it rules out. "At least one is a boy"
// removes only girl-girl, so boy-boy is 1 cell of 3 left. "The older is a boy" removes a row: 1 of 2.
// Key state: the at-least-one clue applied, then the older-boy clue for contrast.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CELLS, type Cell, type Clue, count, exact, families, keeps, share } from "./model";
import s from "./styles.module.css";

const FAMS = families();
const COUNT = count(FAMS);
const MILESTONES = ["at-least-one", "older-boy"] as const;
const CLUES: { id: Clue; label: string }[] = [
  { id: "atLeastOne", label: "Clue: at least one boy" },
  { id: "olderBoy", label: "Clue: the older is a boy" },
  { id: "none", label: "No clue" },
];
const RULE: Record<Clue, string> = {
  none: "All 1,000 families.",
  atLeastOne: "You learn only: at least one is a boy.",
  olderBoy: "You learn only: the older child is a boy.",
};
const frac = (c: Clue) => `${exact(c).both}/${exact(c).of}`;
const pct = (p: number) => `${Math.round(p * 100)}%`;

const CW = 160;
const CH = 112;
const X0 = 18;
const Y0 = 24;
const COLS = 20;
const NAME: Record<string, string> = { B: "boy", G: "girl" };

function cellXY(c: Cell) {
  const row = c[0] === "B" ? 0 : 1;
  const col = c[1] === "B" ? 0 : 1;
  return { x: X0 + col * (CW + 4), y: Y0 + row * (CH + 4) };
}

function Stage({ locked, interact, clue, setClue }: { locked: boolean; interact: () => void; clue: Clue; setClue: (c: Clue) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const sh = share(COUNT, clue);
  const dots = useMemo(() => {
    const seen: Record<Cell, number> = { BB: 0, BG: 0, GB: 0, GG: 0 };
    return FAMS.map((f) => {
      const i = seen[f]++;
      const { x, y } = cellXY(f);
      return { f, x: x + 8 + (i % COLS) * 7.5, y: y + 22 + Math.floor(i / COLS) * 6 };
    });
  }, []);

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 346 262" className={`stage-svg ${s.svg}`} role="img" aria-label={`${RULE[clue]} Both boys: ${sh.both} of ${sh.left}`}>
        <text x={X0 + CW / 2} y={12} textAnchor="middle" className={s.axis}>
          younger: boy
        </text>
        <text x={X0 + CW + 4 + CW / 2} y={12} textAnchor="middle" className={s.axis}>
          younger: girl
        </text>
        <text x={10} y={Y0 + CH / 2} textAnchor="middle" transform={`rotate(-90 10 ${Y0 + CH / 2})`} className={s.axis}>
          older: boy
        </text>
        <text x={10} y={Y0 + CH + 4 + CH / 2} textAnchor="middle" transform={`rotate(-90 10 ${Y0 + CH + 4 + CH / 2})`} className={s.axis}>
          older: girl
        </text>
        {CELLS.map((c) => {
          const { x, y } = cellXY(c);
          const on = keeps[clue](c);
          return (
            <g key={c} className={on ? "" : s.out}>
              <rect x={x} y={y} width={CW} height={CH} rx={8} className={c === "BB" ? s.cellBB : s.cell} />
              <text x={x + 8} y={y + 15} className={s.cellLabel}>
                {NAME[c[0]]} + {NAME[c[1]]}: {COUNT[c]}
              </text>
            </g>
          );
        })}
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={2.2} className={keeps[clue](d.f) ? (d.f === "BB" ? s.dotBB : s.dot) : s.dotOut} />
        ))}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked ? "Make a prediction to start." : RULE[clue]}
      </p>
      <Row>
        {CLUES.map((c) => (
          <Control
            key={c.id}
            className={c.id === clue ? "active" : ""}
            aria-pressed={c.id === clue}
            disabled={locked || c.id === clue}
            onClick={() => {
              setClue(c.id);
              if (c.id === "atLeastOne") reach("at-least-one");
              if (c.id === "olderBoy") reach("older-boy");
            }}
          >
            {c.label}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Families left" value={sh.left.toLocaleString("en-US")} />
        <Readout label="Both boys" value={locked || clue === "none" ? "?" : `${sh.both} of ${sh.left} (${pct(sh.p)})`} />
      </Row>
    </div>
  );
}

export default function AtLeastOneBoy({ slug }: { slug: string }) {
  const [clue, setClue] = useState<Clue>("none");
  const a = share(COUNT, "atLeastOne");
  const o = share(COUNT, "olderBoy");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You ask a new neighbour with two children, \"Is at least one a boy?\" She says yes. That is all you know. How likely is it that both are boys?",
        options: ["1/2", frac("atLeastOne"), "1/4"],
        answer: 1,
      }}
      exploreHint="Apply the at-least-one clue. Then try the older-child clue."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            &ldquo;At least one boy&rdquo; rules out only girl + girl. Three kinds of family are left, equally common, and
            just one is boy + boy: <strong>{frac("atLeastOne")}</strong>. Your 1,000 families agreed: {a.both} of {a.left} ({pct(a.p)}).
          </p>
          <p>
            &ldquo;The older is a boy&rdquo; is a different clue. It removes a whole row, leaving two kinds of family, so
            the answer is {frac("olderBoy")} ({o.both} of {o.left} on the stage). A clue greys out whole boxes of families.
          </p>
          <p className="muted">The answer depends on how you learned it; here you learn only the clue itself.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} clue={clue} setClue={setClue} />}
    </Lesson>
  );
}
