"use client";

// Prosecutor's fallacy. A trace matches 1 in a million innocent people. Search a small
// database and the one match is probably the culprit; search 5 million and the culprit is
// one ring among six. The payoff: "1 in a million" is P(match | innocent), not P(innocent | match).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { GUILTY_AT, MAX_PEOPLE, SEED, innocentMatches } from "./model";
import s from "./styles.module.css";

const SIZES = [1_000, 10_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 2_000_000, 3_000_000, 4_000_000, 5_000_000];
const PER_DOT = 1000;
const COLS = 100;
const ROWS = MAX_PEOPLE / PER_DOT / COLS; // 50
const CELL = 4;
const MATCHES = innocentMatches(SEED);

const fmt = (n: number) => n.toLocaleString("en-US");

export default function OneInAMillion({ slug }: { slug: string }) {
  const [idx, setIdx] = useState(0);
  const people = SIZES[idx];
  const dots = people / PER_DOT;
  const innocent = useMemo(() => MATCHES.filter((p) => p < people), [people]);
  const rings = [GUILTY_AT, ...innocent].map((p) => Math.floor(p / PER_DOT));
  const total = innocent.length + 1;

  const go = (i: number, interact: () => void) => {
    setIdx(i);
    if (SIZES[i] === MAX_PEOPLE) interact();
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On a jury, you hear the crime-scene trace matches only 1 in 1,000,000 innocent people by chance. Police searched a database of 5,000,000 people. About how many innocent people match?",
        options: ["Almost surely none", "About 5", "About 5,000"],
        answer: 1,
      }}
      exploreHint="Grow the database to all 5,000,000 people and count the matches."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Searching 5,000,000 people, about <strong>5 innocent people</strong> match by chance (5,000,000 ÷
            1,000,000), plus the one who left the trace. Your search found {MATCHES.length} innocent matches. A match
            alone makes someone about <strong>1 in 6</strong> likely to be the culprit, not a million to one.
          </p>
          <p>
            &ldquo;1 in a million&rdquo; is the chance an <em>innocent</em> person matches. It is not the chance a
            person who matches is innocent. Swapping the two is the prosecutor&rsquo;s fallacy.
          </p>
          <p className="muted">
            This assumes the culprit is in the database and always matches. Search a small database and the 1-in-6
            becomes much higher.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg
            viewBox={`-8 -8 ${COLS * CELL + 16} ${ROWS * CELL + 16}`}
            className={`stage-svg ${s.svg}`}
            role="img"
            aria-label={`${fmt(people)} people searched; ${locked ? "" : `${total} match`}`}
          >
            {Array.from({ length: COLS * ROWS }, (_, i) => (
              <rect
                key={i}
                x={(i % COLS) * CELL + 0.5}
                y={Math.floor(i / COLS) * CELL + 0.5}
                width={CELL - 1}
                height={CELL - 1}
                className={i < dots ? s.in : s.out}
              />
            ))}
            {rings.map((d, k) => (
              <circle
                key={k}
                cx={(d % COLS) * CELL + CELL / 2}
                cy={Math.floor(d / COLS) * CELL + CELL / 2}
                r={7}
                className={s.ring}
              />
            ))}
          </svg>
          <p className={s.key}>Each square is 1,000 people. Rings: someone in it matches.</p>

          <p className={s.msg} aria-live="polite">
            {locked
              ? "Make a prediction to start."
              : `${fmt(people)} searched: ${total} ${total === 1 ? "match" : "matches"}. Only one left the trace.`}
          </p>

          <Row>
            <Slider
              label="People in the database"
              value={idx}
              min={0}
              max={SIZES.length - 1}
              format={(i) => fmt(SIZES[i])}
              disabled={locked}
              onChange={(i) => go(i, interact)}
            />
          </Row>
          <Row>
            <Control disabled={locked || idx === SIZES.length - 1} onClick={() => go(SIZES.length - 1, interact)}>
              Search all 5,000,000
            </Control>
          </Row>
          <Row>
            <Readout label="Innocent matches" value={locked ? "?" : innocent.length} />
            <Readout label="Chance a match is guilty" value={locked ? "?" : `1 in ${total}`} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
