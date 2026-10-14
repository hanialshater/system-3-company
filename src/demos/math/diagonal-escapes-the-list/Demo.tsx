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
  const [probed, setProbed] = useState(false);

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
              ? `You chose the opposite of place k in row k for all ${SIZE} rows shown, so your string differs from every one of them.`
              : "Choose the opposite of place k in row k and your string differs from row 1 at place 1, row 2 at place 2, and so on."}
          </p>
          <p>
            {probed ? "You checked row 1,000,000: it differs at place 1,000,000. " : ""}
            Whichever row n someone points to, your string differs from it at place n. So no list of endless 0-1 strings
            holds them all: Cantor&apos;s diagonal argument.
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
                // first tap writes the opposite digit; later taps toggle between copying and flipping
                const next = [...mine];
                next[k] = mine[k] === null || mine[k] === LIST[k][k] ? 1 - LIST[k][k] : LIST[k][k];
                setMine(next);
                const all = next.every((d, j) => d !== null && d !== LIST[j][j]);
                setDone(all);
                if (all) reach("all-flipped");
              }}
              done={done}
              probed={probed}
              onProbe={() => setProbed(true)}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  mine,
  onFlip,
  done,
  probed,
  onProbe,
}: {
  locked: boolean;
  mine: (number | null)[];
  onFlip: (k: number) => void;
  done: boolean;
  probed: boolean;
  onProbe: () => void;
}) {
  const flipped = mine.filter((d, k) => d !== null && d !== LIST[k][k]).length;
  const copied = mine.findIndex((d, k) => d !== null && d === LIST[k][k]);
  const caption = locked
    ? "Make a prediction to start."
    : probed
      ? "Row 1,000,000: your string has the opposite digit at place 1,000,000, so it differs. The same goes for any row n."
      : copied >= 0
        ? `Row ${copied + 1} has your digit at place ${copied + 1}: your string is not escaping it. Tap again to flip.`
        : flipped === 0
          ? "Tap a highlighted digit: your string gets its opposite. Tap again to copy it instead."
          : flipped < SIZE
            ? `Flipped: ${flipped} of ${SIZE} rows now differ from your string at their highlighted place.`
            : "Your string differs from every row shown at its highlighted place. Now try row 1,000,000.";

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
            <span className={`${s.rowNo} ${mine[k] === null ? "" : mine[k] === LIST[k][k] ? s.rowSame : s.rowDiff}`}>{k + 1}</span>
            {row.map((d, j) =>
              j === k ? (
                <Control
                  key={j}
                  disabled={locked}
                  className={`${s.cell} ${s.diag} ${mine[k] === null ? "" : mine[k] === d ? s.same : `active ${s.hit}`}`}
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
        <Control disabled={locked || !done} className={probed ? "active" : ""} onClick={onProbe}>
          Try row 1,000,000
        </Control>
      </Row>
    </div>
  );
}
