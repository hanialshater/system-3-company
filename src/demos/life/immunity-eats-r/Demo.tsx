"use client";

// Toy town: well mixed, perfect immunity, R0 = 4. Ten new cases each meet 4 people they would
// infect if those people were susceptible (40 contacts). Immunity is spread at random over the
// town (a fixed shuffle, seed 24, layout only). The 40 contacts are spread evenly across that
// shuffle, so the share of contacts who are immune equals the town's immune share at every
// 5% step: the picture shows the average case, R = R0 x susceptible share, not one noisy draw.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const R0 = 4;
const SIDE = 20;
const GAP = 15;
const CASES = 10;
const CONTACTS = CASES * R0; // 40
const IM_Q = 60; // the question's immune %
const THRESHOLD = Math.round(100 * (1 - 1 / R0)); // 75
const MILESTONES = ["question-state", "threshold"] as const;

const rEff = (im: number) => R0 * (1 - im / 100);

// Case cells: two rows of five, spread over the town. Each case's 4 contacts are the cells
// two steps left, right, up and down from it (no overlaps).
const CASE_XY = [
  [3, 4], [7, 3], [11, 4], [15, 3], [17, 6],
  [2, 14], [6, 16], [10, 15], [14, 16], [17, 14],
];
const CASE_CELLS = CASE_XY.map(([x, y]) => y * SIDE + x);
const OFFSETS = [[2, 0], [-2, 0], [0, 2], [0, -2]];

const LAYOUT = (() => {
  const rng = mulberry32(24);
  const shuffle = <T,>(a: T[]) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const links = CASE_XY.flatMap(([x, y], k) =>
    OFFSETS.map(([dx, dy]) => ({ from: CASE_CELLS[k], to: (y + dy) * SIDE + (x + dx) })),
  );
  const contactCells = links.map((l) => l.to);
  const others = Array.from({ length: SIDE * SIDE }, (_, i) => i).filter(
    (i) => !CASE_CELLS.includes(i) && !contactCells.includes(i),
  );
  const N = SIDE * SIDE - CASES; // 390 people who can be immune
  // Immunity order: a random shuffle of everyone, except that the 40 contacts (in shuffled
  // order) sit at evenly spaced places in it, so their immune share tracks the town's exactly.
  const contactRanks = Array.from({ length: CONTACTS }, (_, j) => Math.floor(((j + 0.5) * N) / CONTACTS));
  const rank = new Map<number, number>();
  shuffle([...contactCells]).forEach((cell, j) => rank.set(cell, contactRanks[j]));
  const taken = new Set(contactRanks);
  const freeRanks = Array.from({ length: N }, (_, r) => r).filter((r) => !taken.has(r));
  shuffle(others).forEach((cell, i) => rank.set(cell, freeRanks[i]));
  const xy = (c: number) => [(c % SIDE) * GAP + GAP / 2, Math.floor(c / SIDE) * GAP + GAP / 2];
  return { N, rank, links, xy };
})();

function Stage({ locked, im, setIm }: { locked: boolean; im: number; setIm: (v: number) => void }) {
  const { N, rank, links, xy } = LAYOUT;
  const cut = (N * im) / 100;
  const isImmune = (cell: number) => (rank.get(cell) ?? Infinity) < cut;
  const contactSet = useMemo(() => new Set(links.map((l) => l.to)), [links]);
  const blocked = links.filter((l) => isImmune(l.to)).length;
  const infected = CONTACTS - blocked;
  const r = rEff(im);

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${SIDE * GAP} ${SIDE * GAP}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${im}% immune, R ${r.toFixed(1)}`}>
        {!locked &&
          links.map((l, i) => {
            const [x1, y1] = xy(l.from), [x2, y2] = xy(l.to);
            return <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} className={isImmune(l.to) ? s.blockedLine : s.hitLine} />;
          })}
        {Array.from({ length: SIDE * SIDE }, (_, cell) => {
          const [x, y] = xy(cell);
          const isCase = CASE_CELLS.includes(cell);
          const cls = isCase
            ? s.case
            : locked
              ? s.sus
              : isImmune(cell)
                ? s.immune
                : contactSet.has(cell)
                  ? s.newCase
                  : s.sus;
          return <circle key={cell} cx={x} cy={y} r={isCase ? 5.5 : 4.2} className={cls} />;
        })}
      </svg>

      <div className={s.legend} aria-hidden>
        <span><i className={s.case} />case</span>
        <span><i className={s.sus} />susceptible</span>
        <span><i className={s.immune} />immune</span>
        <span><i className={s.newCase} />newly infected</span>
      </div>

      <p className={s.msg} aria-live="polite">
        {locked
          ? `Make a prediction to start. Toy town, R0 = ${R0}: each case meets ${R0} people it could infect.`
          : `${im}% immune: ${blocked} of ${CONTACTS} contacts immune, ${infected} infected. R = ${infected}/${CASES} = ${r.toFixed(1)}.`}
      </p>

      <Row>
        {[IM_Q, THRESHOLD].map((v) => (
          <Control key={v} className={im === v ? "active" : ""} aria-pressed={im === v} disabled={locked || im === v} onClick={() => setIm(v)}>
            {v}% immune
          </Control>
        ))}
      </Row>
      <Slider label="Immune" value={im} min={0} max={90} step={5} disabled={locked} format={(v) => `${v}%`} onChange={setIm} />
    </div>
  );
}

export default function ImmunityEatsR({ slug }: { slug: string }) {
  const [im, setImState] = useState(0);
  const [maxSeen, setMaxSeen] = useState(0);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A made-up disease with R0 = ${R0} (counted in a town with no immunity) reaches your well-mixed town, where ${IM_Q}% are immune. At first, how many people does an average new case infect?`,
        options: [`About ${R0}`, `About ${rEff(IM_Q).toFixed(1)}`, "Fewer than 1"],
        answer: 1,
      }}
      exploreHint={`Set ${IM_Q}% immune, then ${THRESHOLD}%. Watch which contacts still turn red.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {IM_Q}% immune, your 10 cases met {CONTACTS} people and {Math.round((CONTACTS * IM_Q) / 100)} were immune, so{" "}
            {CONTACTS - Math.round((CONTACTS * IM_Q) / 100)} were infected: <strong>{rEff(IM_Q).toFixed(1)}</strong> each. That is R0 &times;
            the susceptible share, {R0} &times; {((100 - IM_Q) / 100).toFixed(1)}.
          </p>
          <p>
            Every immune person cancels some of a case&rsquo;s chances, so R falls smoothly as immunity rises. At {THRESHOLD}% it
            reaches 1: that is the herd-immunity threshold, the point where R drops below 1, not the point where immunity
            starts to help. You went up to {maxSeen}% immune.
          </p>
          <p className="muted">Toy model: random mixing, perfect immunity, a made-up disease. The picture shows the average case.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              im={im}
              setIm={(v) => {
                setImState(v);
                setMaxSeen((m) => Math.max(m, v));
                if (v === IM_Q) reach("question-state");
                if (v === THRESHOLD) reach("threshold");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
