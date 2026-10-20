"use client";

// Base rates. The learner fills a town of 1,000 people, then tests everyone.
// The payoff: the 1% of healthy people the test gets wrong is a slice of a
// huge group, so it outnumbers the true cases when the disease is rare.
//
// v2 (revision): the reveal is earned. The key state is a full town of 1,000 tested at the
// question's own setting, 1 in 1,000. Until then the other diseases are locked, and the reveal
// quotes the counts the learner saw, computed by the same town() that draws the grid.

import { useEffect, useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
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

/** Whole-town counts for one setting: what the learner sees after "Test all" at 1,000 people. */
function counts(per: number) {
  const k = town(per);
  const truePos = k.filter((x) => x === "truePos").length;
  const falsePos = k.filter((x) => x === "falsePos").length;
  return { truePos, falsePos, positives: truePos + falsePos };
}
const KEY = counts(1000);
const MID = counts(100);
const HIGH = counts(10);
const MILESTONES = ["tested-1-in-1000"] as const;

/** Reaches the one milestone when a full town is tested at the question's setting. */
function KeyCase({ interact, per, filled, tested }: { interact: () => void; per: number; filled: number; tested: boolean }) {
  const { reach } = useMilestones(interact, MILESTONES);
  useEffect(() => {
    if (per === 1000 && filled === TOTAL && tested) reach("tested-1-in-1000");
  });
  return null;
}

/** Lifts the kit's phase so the reveal can show the town it describes (1 in 1,000, tested). */
function PhaseSync({ phase, onPhase }: { phase: string; onPhase: (p: string) => void }) {
  useEffect(() => onPhase(phase), [phase, onPhase]);
  return null;
}

export default function BaseRates({ slug }: { slug: string }) {
  const [filledSet, setFilled] = useState(0);
  const [testedSet, setTested] = useState(false);
  const [rateSet, setRate] = useState(0);
  const [phaseNow, setPhaseNow] = useState("predict");
  // In the reveal the stage returns to the case the reveal describes.
  const inReveal = phaseNow === "reveal";
  const filled = inReveal ? TOTAL : filledSet;
  const tested = inReveal ? true : testedSet;
  const rate = inReveal ? 0 : rateSet;
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
    const tail = filled < TOTAL && RATES[rate].per === 1000 ? " Fill to 1,000." : "";
    return `${positives} tested positive. ${truePos} of them ${truePos === 1 ? "is" : "are"} actually sick.${tail}`;
  })();

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "At your check-up, you test positive for a disease that affects 1 in 1,000 people. The test flags 99% of sick people and wrongly flags 1% of healthy ones. Chance you have it?",
        options: ["About 99%", "About 90%", "About 50%", "About 9%"],
        answer: 3,
      }}
      exploreHint="At 1 in 1,000, fill the town, test everyone and count the positives. Then compare other rates."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You saw it at 1 in 1,000: <strong>{KEY.positives}</strong> people tested positive, and only{" "}
            <strong>{KEY.truePos}</strong> of them was sick. The other {KEY.falsePos} were false alarms: 1% of the 999
            healthy people. So a positive means about <strong>9%</strong>.
          </p>
          <p>
            &ldquo;99% accurate&rdquo; describes the test. Your chance also depends on how rare the disease is. At 1 in
            100 it is {MID.truePos} sick of {MID.positives} positives (about 50%); at 1 in 10, {HIGH.truePos} of{" "}
            {HIGH.positives} (about 92%).
          </p>
          <p className="muted">
            Medical staff fall for this too. In a 1978 Harvard study (a test that wrongly flagged 5% of healthy
            people), the most common answer was 95%. The right answer, if the test catches every case, was about 2%.
          </p>
        </>
      )}
    >
      {({ phase, locked, interact, interactions }) => {
        const unlocked = interactions >= MILESTONES.length;
        return (
          <div className={s.wrap}>
            <PhaseSync phase={phase} onPhase={setPhaseNow} />
            <KeyCase interact={interact} per={RATES[rate].per} filled={filled} tested={tested} />
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
              {tested &&
                truePos <= 10 &&
                kinds.map((k, i) =>
                  k === "truePos" && i < filled ? (
                    <circle
                      key={`ring-${i}`}
                      cx={(i % COLS) * CELL + CELL / 2}
                      cy={Math.floor(i / COLS) * CELL + CELL / 2}
                      r={CELL * 0.95}
                      className={s.ring}
                    />
                  ) : null,
                )}
            </svg>

            <div className={s.legend} aria-hidden>
              {tested ? (
                <>
                  <span><i className={s.truePos} />sick, positive</span>
                  <span><i className={s.falsePos} />healthy, positive</span>
                  <span><i className={s.negative} />negative</span>
                  {present.includes("falseNeg") && <span><i className={s.missed} />sick, tested negative</span>}
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
                disabled={locked || inReveal || filled >= TOTAL}
                aria-label="Add 100 people"
                onClick={() => setFilled((f) => Math.min(TOTAL, f + 100))}
              >
                +100
              </Control>
              <Control disabled={locked || inReveal || filled >= TOTAL} onClick={() => setFilled(TOTAL)}>
                Fill to 1,000
              </Control>
              <Control
                className={tested ? "active" : ""}
                disabled={locked || inReveal || filled === 0}
                onClick={() => setTested((t) => !t)}
              >
                {tested ? "Hide results" : "Test all"}
              </Control>
              <Readout label="People" value={filled} />
            </Row>

            <div className={s.rates} role="group" aria-label="How common is the disease?">
              <span className="muted small">{unlocked ? "Now compare:" : "Disease:"}</span>
              {RATES.map((r, i) => (
                <Control
                  key={r.per}
                  className={i === rate ? "active" : ""}
                  disabled={locked || inReveal || i === rate || !unlocked}
                  aria-pressed={i === rate}
                  onClick={() => setRate(i)}
                >
                  {r.label}
                </Control>
              ))}
            </div>
          </div>
        );
      }}
    </Lesson>
  );
}
