"use client";

// Base rates. The learner fills a town of 1,000 people, then tests everyone.
// The payoff: the 1% of healthy people the test gets wrong is a slice of a
// huge group, so it outnumbers the true cases when the disease is rare.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const TOTAL = 1000;
const COLS = 40;
const CELL = 10;
const RATES = [
  { label: "1 in 1,000", per: 1000 },
  { label: "1 in 100", per: 100 },
  { label: "1 in 10", per: 10 },
];

/** Seeded permutation of 0..999 so who is sick and who gets a false alarm is reproducible. */
function permutation(seed: number): number[] {
  const idx = Array.from({ length: TOTAL }, (_, i) => i);
  let x = seed;
  for (let i = idx.length - 1; i > 0; i--) {
    x = (x * 48271) % 2147483647;
    const j = x % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}
const ORDER = permutation(20240611);

type Kind = "healthy" | "falsePos" | "truePos" | "falseNeg";

function town(per: number): Kind[] {
  const sick = TOTAL / per;
  const truePos = Math.round(sick * 0.99);
  const falsePos = Math.round((TOTAL - sick) * 0.01);
  const kinds: Kind[] = Array(TOTAL).fill("healthy");
  ORDER.forEach((person, rank) => {
    if (rank < truePos) kinds[person] = "truePos";
    else if (rank < sick) kinds[person] = "falseNeg";
    else if (rank < sick + falsePos) kinds[person] = "falsePos";
  });
  return kinds;
}

export default function BaseRates({ slug }: { slug: string }) {
  const [filled, setFilled] = useState(0);
  const [tested, setTested] = useState(false);
  const [rate, setRate] = useState(0);
  const kinds = useMemo(() => town(RATES[rate].per), [rate]);

  const present = kinds.slice(0, filled);
  const sick = present.filter((k) => k === "truePos" || k === "falseNeg").length;
  const truePos = present.filter((k) => k === "truePos").length;
  const positives = truePos + present.filter((k) => k === "falsePos").length;

  const cls = (k: Kind, i: number) => {
    if (i >= filled) return s.empty;
    if (!tested) return k === "healthy" || k === "falsePos" ? s.healthy : s.sick;
    if (k === "truePos") return s.truePos;
    if (k === "falsePos") return s.falsePos;
    if (k === "falseNeg") return s.missed;
    return s.negative;
  };

  const message = (() => {
    if (filled === 0) return `Add people. About ${TOTAL / RATES[rate].per} in 1,000 will be sick.`;
    if (!tested) return `${filled} people. ${sick} ${sick === 1 ? "is" : "are"} sick. Now test them.`;
    if (positives === 0) return "Nobody tested positive yet. Add more people.";
    return `${positives} tested positive. ${truePos} of them ${truePos === 1 ? "is" : "are"} actually sick.`;
  })();

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A disease affects 1 in 1,000 people. A test catches 99% of sick people and clears 99% of healthy ones. You test positive. What is the chance you have it?",
        options: ["About 99%", "About 90%", "About 50%", "About 9%"],
        answer: 3,
      }}
      exploreHint="Fill the town to 1,000, test everyone, and count the positives."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In 1,000 people, about <strong>1</strong> is sick and tests positive. But 999 are healthy, and the test
            wrongly flags 1% of them: about <strong>10</strong> false alarms. So of 11 positives, 1 is sick: about{" "}
            <strong>9%</strong>.
          </p>
          <p>
            &ldquo;99% accurate&rdquo; describes the test. Your chance also depends on how rare the disease is. Make it
            1 in 100 and a positive means about 50%; 1 in 10, about 92%.
          </p>
          <p className="muted">
            Medical staff fall for this too: in a 1978 Harvard study, the most common answer to a similar question was 95%.
            The right answer was about 2%.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <div className={s.rates} role="group" aria-label="How common is the disease?">
            <span className="muted small">Disease:</span>
            {RATES.map((r, i) => (
              <Control
                key={r.per}
                className={i === rate ? "active" : ""}
                disabled={locked || i === rate}
                aria-pressed={i === rate}
                onClick={() => {
                  setRate(i);
                  interact();
                }}
              >
                {r.label}
              </Control>
            ))}
          </div>

          <svg
            viewBox={`0 0 ${COLS * CELL} ${(TOTAL / COLS) * CELL}`}
            className={`stage-svg ${s.svg}`}
            role="img"
            aria-label={`A town of ${filled} people; ${positives} tested positive, ${truePos} of them sick`}
          >
            {kinds.map((k, i) => (
              <rect
                key={i}
                x={(i % COLS) * CELL + 1}
                y={Math.floor(i / COLS) * CELL + 1}
                width={CELL - 2}
                height={CELL - 2}
                rx={1.5}
                className={cls(k, i)}
              />
            ))}
          </svg>

          <div className={s.legend} aria-hidden>
            {tested ? (
              <>
                <span><i className={s.truePos} />sick, positive</span>
                <span><i className={s.falsePos} />healthy, positive</span>
                <span><i className={s.negative} />negative</span>
                {present.includes("falseNeg") && <span><i className={s.missed} />sick, missed</span>}
              </>
            ) : (
              <>
                <span><i className={s.sick} />sick</span>
                <span><i className={s.healthy} />healthy</span>
              </>
            )}
          </div>

          <p className={s.msg} aria-live="polite">
            {locked ? "Make a prediction to start." : message}
          </p>

          <Row>
            <Control
              disabled={locked || filled >= TOTAL}
              aria-label="Add 100 people"
              onClick={() => {
                setFilled((f) => Math.min(TOTAL, f + 100));
                interact();
              }}
            >
              +100
            </Control>
            <Control
              disabled={locked || filled >= TOTAL}
              onClick={() => {
                setFilled(TOTAL);
                interact();
              }}
            >
              Fill to 1,000
            </Control>
            <Control
              className={tested ? "active" : ""}
              disabled={locked || filled === 0}
              onClick={() => {
                setTested((t) => !t);
                interact();
              }}
            >
              {tested ? "Hide results" : "Test all"}
            </Control>
            <Readout label="People" value={filled} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
