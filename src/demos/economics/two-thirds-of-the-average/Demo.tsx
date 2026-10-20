"use client";

// Guess 2/3 of the average. Everyone picks any real number from 0 to 100 (decimals allowed, as the brief requires:
// with whole numbers only, 1 would survive). One tap = one round of reasoning: if every guess left is at most B,
// the average is at most B, so the target is at most (2/3)B and any guess above it always does worse than (2/3)B.
// Ceiling after k rounds: 100 x (2/3)^k (66.7, 44.4, 29.6, ...; under 1 after 12 rounds, never exactly 0).
// Key state: the ceiling drops below 33, the "two thirds of 50" guess (round 3).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const MAX_ROUNDS = 20;
const ceiling = (k: number) => 100 * (2 / 3) ** k;
const PAST_33 = Array.from({ length: MAX_ROUNDS + 1 }, (_, k) => k).find((k) => ceiling(k) < 33) ?? MAX_ROUNDS; // 3
const UNDER_1 = Array.from({ length: MAX_ROUNDS + 1 }, (_, k) => k).find((k) => ceiling(k) < 1) ?? MAX_ROUNDS; // 12
const fmt = (v: number) => (v >= 10 ? v.toFixed(1) : v >= 1 ? v.toFixed(2) : v.toFixed(3));

// Geometry (viewBox 340 × 170): guesses 0..100 → x 20..320.
const X = (v: number) => 20 + v * 3;
const MARKS = [
  { v: 33, label: "33" },
  { v: 22, label: "22" },
];

export default function TwoThirdsOfTheAverage({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [maxK, setMaxK] = useState(0);
  const b = ceiling(k);
  const prev = k > 0 ? ceiling(k - 1) : 100;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In a class contest, everyone picks any number from 0 to 100, and whoever is closest to 2/3 of the average wins. All are rational and know it. What does everyone pick?",
        options: ["33", "22", "0"],
        answer: 2,
      }}
      exploreHint="Run rounds of reasoning and watch the highest sensible guess."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Round 1 cut everything above <strong>66.7</strong>: the average is at most 100, so the target is at most 66.7.
            Round 2 cut above 44.4, and round {PAST_33} cut 33 itself (ceiling {fmt(ceiling(PAST_33))}). You ran {maxK} rounds;
            the ceiling reached {fmt(ceiling(maxK))}
            {maxK >= UNDER_1 ? `, under 1 from round ${UNDER_1} on` : ""}.
          </p>
          <p>
            Each round multiplies the ceiling by 2/3, so it heads toward 0 and never stops shrinking. With any number allowed,
            the only guess that survives every round is <strong>0</strong>. That needs everyone to be rational and to know
            everyone else is, round after round; drop that, and the best guess changes.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["past-33"]}>
          {(reach) => {
            const go = (to: number) => {
              const next = Math.max(0, Math.min(MAX_ROUNDS, to));
              if (next === k) return;
              setK(next);
              setMaxK((m) => Math.max(m, next));
              if (next >= PAST_33) reach("past-33");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Any number 0–100, decimals allowed · target = 2/3 × average</p>
                <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={`Round ${k}: highest sensible guess ${fmt(b)}`}>
                  <rect x={X(0)} y={70} width={X(100) - X(0)} height={26} rx={4} fill="var(--bg-2)" stroke="var(--line)" />
                  <rect x={X(0)} y={70} width={Math.max(X(b) - X(0), 1.5)} height={26} rx={4} className={s.bar} />
                  {Array.from({ length: k }, (_, r) => r + 1).map((r) => (
                    <line key={r} x1={X(ceiling(r))} x2={X(ceiling(r))} y1={66} y2={100} stroke="var(--muted)" strokeWidth={1} />
                  ))}
                  {MARKS.map((m) => {
                    const gone = m.v > b;
                    return (
                      <g key={m.v}>
                        <line x1={X(m.v)} x2={X(m.v)} y1={100} y2={114} stroke={gone ? "var(--bad)" : "var(--fg)"} strokeWidth={2} />
                        <text x={X(m.v)} y={128} textAnchor="middle" className={gone ? s.out : s.label}>
                          {gone ? `${m.label} ✗` : m.label}
                        </text>
                      </g>
                    );
                  })}
                  {[0, 50, 100].map((t) => (
                    <text key={t} x={X(t)} y={150} textAnchor="middle" className={s.axis}>
                      {t}
                    </text>
                  ))}
                  <line x1={X(b)} x2={X(b)} y1={40} y2={96} className={s.price} />
                  <text x={Math.min(Math.max(X(b), 60), 300)} y={34} textAnchor="middle" className={s.priceText}>
                    ceiling {fmt(b)}
                  </text>
                </svg>
                <p className={s.msg} aria-live="polite">
                  {k === 0
                    ? "Round 0: any guess from 0 to 100 is still possible."
                    : `Round ${k}: if all guesses are ≤ ${fmt(prev)}, the target is ≤ ${fmt(b)}. Guessing above it always does worse.`}
                </p>
                <Row>
                  <Control className={s.tap} disabled={locked || k >= MAX_ROUNDS} onClick={() => go(k + 1)}>
                    Next round
                  </Control>
                  <Control className={s.tap} disabled={locked || k >= MAX_ROUNDS} onClick={() => go(k + 4)}>
                    4 more rounds
                  </Control>
                  <Control className={s.tap} disabled={locked || k === 0} onClick={() => go(0)}>
                    Reset
                  </Control>
                </Row>
                <Row>
                  <Readout label="Round" value={k} />
                  <Readout label="Highest sensible guess" value={fmt(b)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
