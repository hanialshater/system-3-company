"use client";

// Diagonal escapes the list. The first 8 rows (and first 8 places) of a claimed complete list of
// endless 0-1 strings, drawn from mulberry32(SEED) (arbitrary seed; any list behaves the same).
// The diagonal digits are the controls: tapping the digit at row k, place k writes the opposite
// digit into place k of a new string beneath. Each flipped row is marked as differing at place k.
// Key state: all 8 diagonal digits flipped; the new string differs from every row shown.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import { useState } from "react";
import s from "./styles.module.css";

const SIZE = 8;
const SEED = 1891; // arbitrary, not chosen for the result: the construction works for every list
const MILESTONES = ["all-flipped"] as const;

const LIST: number[][] = (() => {
  const rng = mulberry32(SEED);
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => (rng() < 0.5 ? 0 : 1)));
})();

export default function DiagonalEscapes({ slug }: { slug: string }) {
  const [mine, setMine] = useState<(number | null)[]>(() => Array(SIZE).fill(null));
  const [done, setDone] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Someone claims their list holds every endless string of 0s and 1s. Can you always write a string that is not on the list?",
        options: ["No, the list is complete", "Yes, always", "Only if the list is short"],
        answer: 1,
      }}
      exploreHint="Tap the highlighted digit in each row to build your string."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>Yes, always.</strong>{" "}
            {done
              ? `You flipped place k of row k for all ${SIZE} rows shown, so your string differs from row 1 at place 1, row 2 at place 2, and so on.`
              : "Flip place k of row k and your string differs from row 1 at place 1, row 2 at place 2, and so on."}
          </p>
          <p>
            The same rule keeps going down the endless list. Whichever row someone points to, say row n, your string differs
            from it at place n, so it is not row n. No list of endless 0-1 strings can hold them all. This is Cantor&apos;s
            diagonal argument.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              mine={mine}
              onFlip={(k) => {
                const next = [...mine];
                next[k] = 1 - LIST[k][k];
                setMine(next);
                if (next.every((d) => d !== null)) {
                  setDone(true);
                  reach("all-flipped");
                }
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, mine, onFlip }: { locked: boolean; mine: (number | null)[]; onFlip: (k: number) => void }) {
  const flipped = mine.filter((d) => d !== null).length;
  const caption = locked
    ? "Make a prediction to start."
    : flipped === 0
      ? "Your string takes the opposite of each highlighted digit."
      : flipped < SIZE
        ? `${flipped} of ${SIZE} rows now differ from your string at their highlighted place.`
        : "Your string differs from every row shown at its highlighted place. The rule continues down the endless list.";

  return (
    <div className={s.wrap}>
      <div className={s.grid} role="table" aria-label="The list">
        <span className={s.corner}>row</span>
        {Array.from({ length: SIZE }, (_, j) => (
          <span key={`h${j}`} className={s.head}>
            {j + 1}
          </span>
        ))}
        <span className={s.head} />
        {LIST.map((row, k) => (
          <div key={k} className={s.rowWrap} role="row">
            <span className={`${s.rowNo} ${mine[k] !== null ? s.rowDiff : ""}`}>{k + 1}</span>
            {row.map((d, j) =>
              j === k ? (
                <Control
                  key={j}
                  disabled={locked || mine[k] !== null}
                  className={`${s.cell} ${s.diag} ${mine[k] !== null ? `active ${s.hit}` : ""}`}
                  aria-label={`Row ${k + 1}, place ${k + 1}: ${d}`}
                  onClick={() => onFlip(k)}
                >
                  {d}
                </Control>
              ) : (
                <span key={j} className={s.cell}>
                  {d}
                </span>
              ),
            )}
            <span className={s.more}>…</span>
          </div>
        ))}
        <span className={s.moreRows}>⋮ the list goes on forever</span>
        <div className={`${s.rowWrap} ${s.mine}`} role="row">
          <span className={s.rowNo}>you</span>
          {mine.map((d, j) => (
            <span key={j} className={`${s.cell} ${d !== null ? s.mineCell : s.blank}`}>
              {d === null ? "?" : d}
            </span>
          ))}
          <span className={s.more}>…</span>
        </div>
      </div>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>
      <Row>
        <Readout label="Rows yours differs from" value={locked ? "?" : `${flipped} of ${SIZE} shown`} />
      </Row>
    </div>
  );
}
