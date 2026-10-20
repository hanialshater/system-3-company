"use client";

// Arithmetic model of new (de novo) changes in a child: two genome copies of 3.1 billion letters,
// each letter miscopied with probability RATE per generation. The stage draws 2 x 31 squares of
// 100 million letters. New changes are placed as a Poisson process: for child k, unit-rate
// exponential gaps come from mulberry32(k) (seeds 1, 2, 3... in order, not chosen), and are
// stretched by the rate, so halving the rate keeps the same child but about half the ticks.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const LETTERS = 3.1e9; // per copy
const SQUARE = 1e8; // letters per square
const PER_COPY = Math.round(LETTERS / SQUARE); // 31
const SQUARES = 2 * PER_COPY; // 62
const REAL = 1.2; // per 100 million letters
const RATES = [REAL, REAL / 2, REAL * 2] as const;
const EXPECTED = (2 * LETTERS * REAL) / SQUARE; // 74.4
const MILESTONES = ["child-real-rate", "other-rate"] as const;
const COLS = 8, W = 32, H = 16, GX = 2, GY = 4;

function gaps(child: number): number[] {
  const rng = mulberry32(child);
  const out: number[] = [];
  let t = 0;
  while (t < SQUARES * REAL * 2 * 1.6) {
    t += -Math.log(1 - rng());
    out.push(t);
  }
  return out;
}
/** Positions (in squares) of new changes for a child at a rate per square. */
function changes(child: number, rate: number): number[] {
  return gaps(child).map((t) => t / rate).filter((x) => x < SQUARES);
}

function cellXY(sq: number) {
  const copy = sq < PER_COPY ? 0 : 1;
  const j = sq - copy * PER_COPY;
  return { x: (j % COLS) * (W + GX), y: copy * (4 * (H + GY) + 16) + 12 + Math.floor(j / COLS) * (H + GY) };
}

function Stage({ locked, child, rate, onChild, onRate }: {
  locked: boolean; child: number; rate: number; onChild: () => void; onRate: (r: number) => void;
}) {
  const pos = child > 0 ? changes(child, rate) : [];
  const msg = locked
    ? "Each square: 100 million letters. Two copies, one from each parent."
    : child === 0
      ? `Rate: ${rate} per 100 million letters. Make a child.`
      : `Child ${child}: ${pos.length} new changes at ${rate} per 100 million letters.`;
  const top = cellXY(0).y - 4, bottom = cellXY(PER_COPY).y - 4;
  return (
    <div className={s.wrap}>
      <svg viewBox={`-2 -2 ${COLS * (W + GX) + 2} ${cellXY(SQUARES - 1).y + H + 4}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        <text x={0} y={top} className={s.small}>copy from mother</text>
        <text x={0} y={bottom} className={s.small}>copy from father</text>
        {Array.from({ length: SQUARES }, (_, i) => {
          const { x, y } = cellXY(i);
          return <rect key={i} x={x} y={y} width={W} height={H} rx={2} className={s.cell} />;
        })}
        {pos.map((p, i) => {
          const sq = Math.floor(p), f = p - sq;
          const { x, y } = cellXY(sq);
          return <line key={i} x1={x + 2 + f * (W - 4)} x2={x + 2 + f * (W - 4)} y1={y + 2} y2={y + H - 2} className={s.tick} />;
        })}
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        <Control disabled={locked} onClick={onChild}>{child === 0 ? "Make a child" : "Another child"}</Control>
      </Row>
      <Row>
        <Control className={rate === REAL ? "active" : ""} disabled={locked || rate === REAL} onClick={() => onRate(REAL)}>Real rate {REAL}</Control>
        <Control className={rate === RATES[1] ? "active" : ""} disabled={locked || rate === RATES[1]} onClick={() => onRate(RATES[1])}>Half: {RATES[1]}</Control>
        <Control className={rate === RATES[2] ? "active" : ""} disabled={locked || rate === RATES[2]} onClick={() => onRate(RATES[2])}>Double: {RATES[2]}</Control>
      </Row>
    </div>
  );
}

export default function ChildrenNewMutations({ slug }: { slug: string }) {
  const [child, setChild] = useState(0);
  const [rate, setRateState] = useState<number>(REAL);
  const [real, setReal] = useState<Record<number, number>>({});
  const atReal = Object.values(real).slice(-3);
  const [other, setOther] = useState<{ rate: number; n: number; c: number } | null>(null);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A baby is born with two copies of a genome, ${LETTERS / 1e9} billion letters each. A copying error hits about ${REAL} letters in every 100 million per generation. About how many brand-new changes does the baby carry?`,
        options: ["About 7", "About 70", "About 7,000"],
        answer: 1,
      }}
      exploreHint="Make a child or two, then halve or double the rate."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {atReal.length ? `At the real rate your ${atReal.length > 1 ? "children" : "child"} carried ${atReal.join(", ")} new changes. ` : ""}
            The arithmetic: {(2 * LETTERS) / 1e9} billion letters times {REAL} in 100 million is about <strong>{Math.round(EXPECTED)}</strong>{" "}
            per child, give or take chance.
            {other ? ` At ${other.rate} per 100 million, child ${other.c} had ${other.n}: the count follows the rate.` : ""}
          </p>
          <p>
            Studies that read parents' and children's genomes find
            about 60 to 70 new changes per child.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const show = (c: number, r: number) => {
              const n = changes(c, r).length;
              if (r === REAL) { reach("child-real-rate"); setReal((a) => ({ ...a, [c]: n })); }
              else { reach("other-rate"); setOther({ rate: r, n, c }); }
            };
            return (
              <Stage
                locked={locked}
                child={child}
                rate={rate}
                onChild={() => { const c = child + 1; setChild(c); show(c, rate); }}
                onRate={(r) => { setRateState(r); const c = child || 1; setChild(c); show(c, r); }}
              />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
