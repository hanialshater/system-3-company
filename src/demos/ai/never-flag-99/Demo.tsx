"use client";

// The accuracy paradox. 1,000 card payments, 10 of them fraud (an invented 1% rate).
// At "flag 0" the model approves everything: 99.0% accurate, 0 of 10 caught. Dragging
// the slider flags the riskiest payments first (an invented, seeded ranking). Flagging
// 20 catches 8 of 10 frauds yet scores 98.6%, lower than doing nothing. Accuracy
// rewards ignoring the rare class.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

// MODEL START
const TOTAL = 1000;
const FRAUD_RANKS = [0, 1, 3, 5, 8, 11, 15, 19, 28, 44]; // where the 10 frauds sit in the risk ranking

function score(flagged: number) {
  const caught = FRAUD_RANKS.filter((r) => r < flagged).length;
  const falseAlarms = flagged - caught;
  const genuine = TOTAL - FRAUD_RANKS.length;
  const correct = caught + (genuine - falseAlarms);
  return { caught, falseAlarms, accuracy: correct / TOTAL };
}
// MODEL END

const COLS = 40;
const CELL = 10;

/** Seeded permutation: rank in the risk ranking → cell in the grid. */
function cellOrder(seed: number) {
  const idx = Array.from({ length: TOTAL }, (_, i) => i);
  let x = seed;
  for (let i = idx.length - 1; i > 0; i--) {
    x = (x * 48271) % 2147483647;
    const j = x % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}
const CELL_OF_RANK = cellOrder(99001);
const RANK_OF_CELL: number[] = [];
CELL_OF_RANK.forEach((cell, rank) => (RANK_OF_CELL[cell] = rank));
const FRAUD = new Set(FRAUD_RANKS);

const pct = (a: number) => `${(100 * a).toFixed(1)}%`;

export default function NeverFlag99({ slug }: { slug: string }) {
  const [flagged, setFlagged] = useState(0);
  const sc = score(flagged);
  const base = score(0);

  // The reveal waits for the key moment: catching fraud while accuracy drops below "approve all".
  const set = (v: number, interact: () => void) => {
    setFlagged(v);
    if (score(v).accuracy < base.accuracy) interact();
  };

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (flagged === 0) return "Every payment approved.";
    if (sc.accuracy < base.accuracy) return "More fraud caught, yet accuracy fell.";
    return "Riskiest first. Keep going.";
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "1,000 card payments, 10 of them fraud. A model approves every payment without looking. What is its accuracy?",
        options: ["About 1%", "About 50%", "About 99%"],
        answer: 2,
      }}
      exploreHint="Check “approve all”, then flag the riskiest payments."
      reveal={() => (
        <>
          <p>
            Approving everything scored <strong>{pct(base.accuracy)}</strong>: right on all 990 genuine payments, wrong
            on all 10 frauds. It caught <strong>0</strong>.
          </p>
          <p>
            Flagging the riskiest 20 caught <strong>{score(20).caught} of 10</strong>, yet scored{" "}
            <strong>{pct(score(20).accuracy)}</strong>, lower than doing nothing, because {score(20).falseAlarms}{" "}
            genuine payments were flagged too. When one class is rare, accuracy rewards ignoring it. Ask instead how
            many of the cases you care about it catches.
          </p>
          <p className="muted">
            The 1% fraud rate and the risk ranking here are invented. Real card-fraud data can be far more lopsided:
            one public set has 492 frauds in 284,807 payments.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <div className={s.wrap}>
          <svg
            viewBox={`0 0 ${COLS * CELL} ${(TOTAL / COLS) * CELL}`}
            className="stage-svg"
            role="img"
            aria-label={`1,000 payments; ${flagged} flagged, ${sc.caught} of them fraud`}
          >
            {Array.from({ length: TOTAL }, (_, cell) => {
              const rank = RANK_OF_CELL[cell];
              const isFlagged = rank < flagged;
              const fraud = FRAUD.has(rank);
              const cls = isFlagged ? (fraud ? s.caught : s.alarm) : fraud && phase === "reveal" ? s.missed : s.ok;
              return (
                <rect
                  key={cell}
                  x={(cell % COLS) * CELL + 1}
                  y={Math.floor(cell / COLS) * CELL + 1}
                  width={CELL - 2}
                  height={CELL - 2}
                  rx={2}
                  className={cls}
                />
              );
            })}
          </svg>
          <div className={s.legend} aria-hidden>
            <span>
              <i className={s.ok} />
              approved
            </span>
            <span>
              <i className={s.caught} />
              caught fraud
            </span>
            <span>
              <i className={s.alarm} />
              false alarm
            </span>
          </div>
          <p className={s.msg} aria-live="polite">
            {message(locked)}
          </p>
          <Slider
            label="Flag the riskiest"
            value={flagged}
            min={0}
            max={50}
            disabled={locked}
            onChange={(v) => set(v, interact)}
          />
          <Row>
            <Control disabled={locked || flagged === 0} onClick={() => set(0, interact)}>
              Approve all
            </Control>
            <Control disabled={locked || flagged === 20} onClick={() => set(20, interact)}>
              Flag 20
            </Control>
            <Readout label="Accuracy" value={locked ? "?" : pct(sc.accuracy)} />
            <Readout label="Fraud caught" value={locked ? "?" : `${sc.caught} of 10`} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
