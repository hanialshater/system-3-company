"use client";

// Counting sort, done by hand. Ten scores (each a whole number 0 to 5) are tapped into numbered
// buckets: the score is the bucket's address. Then the buckets are read out in order, which writes
// the sorted list. The stage never compares one score with another, and `comparisons` is a counter
// that would be bumped by any such comparison (it never is). Tallies and output are derived from
// the same SCORES array that draws the tiles.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SCORES = [3, 0, 5, 2, 2, 1, 4, 5, 0, 3];
const K = 6; // scores 0..5
const BUCKETS = Array.from({ length: K }, (_, i) => i);
const TALLY = BUCKETS.map((b) => SCORES.filter((x) => x === b).length);
const SORTED = BUCKETS.flatMap((b) => Array<number>(TALLY[b]).fill(b));
const COMPARISONS = 0; // the stage only tallies and writes; no code path compares two scores

export default function SortingWithoutComparing({ slug }: { slug: string }) {
  const [dropped, setDropped] = useState<boolean[]>(SCORES.map(() => false));
  const [read, setRead] = useState(0); // buckets read out so far, in order
  const counts = BUCKETS.map((b) => SCORES.filter((x, i) => x === b && dropped[i]).length);
  const nDropped = dropped.filter(Boolean).length;
  const allDropped = nDropped === SCORES.length;
  const out = BUCKETS.slice(0, read).flatMap((b) => Array<number>(TALLY[b]).fill(b));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Marking ten exams, you get scores, each a whole number from 0 to ${K - 1}. You sort them by tallying how many of each score occur, then writing them out. How many comparisons between scores does that take?`,
        options: ["0", "9", "33"],
        answer: 0,
      }}
      exploreHint="Tap every score into its bucket, then read the buckets out in order."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You dropped {SCORES.length} scores into {K} buckets and read them out: {SORTED.join(" ")}. Comparisons between
            scores: <strong>{COMPARISONS}</strong>.
          </p>
          <p>
            A score&apos;s value was its address: every {SCORES[0]} went to bucket {SCORES[0]}, so nothing needed
            comparing. This works because the scores are whole numbers in a small range, 0 to {K - 1}. With a huge
            range you would need a bucket for every possible value.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["dropped", "read"]}>
          {(reach) => {
            const drop = (i: number) => {
              if (locked || dropped[i]) return;
              const next = dropped.map((d, j) => (j === i ? true : d));
              setDropped(next);
              if (next.every(Boolean)) reach("dropped");
            };
            const readBucket = (b: number) => {
              if (locked || !allDropped || b !== read) return;
              setRead(read + 1);
              if (read + 1 === K) reach("read");
            };
            const msg = locked
              ? "Make a prediction to start."
              : !allDropped
                ? `Tap a score to drop it in the bucket with its number. ${nDropped} of ${SCORES.length} dropped.`
                : read < K
                  ? "Now read the buckets out, 0 first."
                  : "Sorted. No score was compared with another.";
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.tiles}>
                  {SCORES.map((v, i) => (
                    <Control key={i} className={`${s.tile} ${dropped[i] ? s.used : ""}`}
                      aria-label={`Score ${v}, ${dropped[i] ? "dropped" : "tap to drop"}`}
                      disabled={locked || dropped[i]} onClick={() => drop(i)}>
                      {dropped[i] ? "·" : v}
                    </Control>
                  ))}
                </div>
                <div className={s.buckets}>
                  {BUCKETS.map((b) => (
                    <Control key={b} className={`${s.bucket} ${b < read ? s.done : ""}`}
                      aria-label={`Read out bucket ${b}`}
                      disabled={locked || !allDropped || b !== read} onClick={() => readBucket(b)}>
                      <span className={s.addr}>{b}</span>
                      <span className={s.dots}>{locked ? "" : "●".repeat(counts[b])}</span>
                    </Control>
                  ))}
                </div>
                <div className={s.out} aria-label="Sorted output">
                  {SCORES.map((_, i) => (
                    <span key={i} className={`${s.slot} ${i < out.length ? s.full : ""}`}>
                      {i < out.length ? out[i] : ""}
                    </span>
                  ))}
                </div>
                <Row>
                  <Readout label="Comparisons" value={locked ? "–" : COMPARISONS} />
                  <Readout label="Read out" value={locked ? "–" : `${out.length} of ${SCORES.length}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
