"use client";

// A feedback loop. Two districts with the same true incident rate; records start A 6, B 5.
// Each round the patrol goes where the records are highest, and only the patrolled district
// logs one new incident. A is always ahead, so A gets every patrol: 26 vs 5 after 20 rounds
// (83.9%). With patrols taking turns, 16 vs 15 (51.6%). The reveal waits for round 20
// under the "most records" rule.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

// MODEL START
type Rule = "most" | "turns";
const START = { a: 6, b: 5 };
const ROUNDS = 20;

/** Records after r rounds, and which district each round patrolled. */
function run(rule: Rule, rounds: number) {
  let a = START.a;
  let b = START.b;
  const patrols: ("A" | "B")[] = [];
  for (let r = 0; r < rounds; r++) {
    const goA = rule === "most" ? a >= b : r % 2 === 0;
    patrols.push(goA ? "A" : "B");
    if (goA) a++;
    else b++;
  }
  const nextA = rule === "most" ? a >= b : rounds % 2 === 0;
  return { a, b, patrols, next: nextA ? "A" : "B", share: a / (a + b) };
}
// MODEL END

// Geometry (viewBox 320 × 246): two columns of record squares, 2 wide.
const SQ = 11;
const BASE = 200;
const COL_X = { A: 80, B: 216 };

function Stack({ x, start, added }: { x: number; start: number; added: number }) {
  return (
    <g>
      {Array.from({ length: start + added }, (_, i) => (
        <rect
          key={i}
          x={x + (i % 2) * (SQ + 2)}
          y={BASE - (Math.floor(i / 2) + 1) * (SQ + 2)}
          width={SQ}
          height={SQ}
          rx={2}
          fill={i < start ? "var(--muted)" : "var(--domain)"}
          opacity={i < start ? 0.6 : 1}
        />
      ))}
    </g>
  );
}

export default function PatrolFeedbackLoop({ slug }: { slug: string }) {
  const [rule, setRule] = useState<Rule>("most");
  const [round, setRound] = useState(0);
  const st = run(rule, round);

  const goTo = (r: number, interact: () => void) => {
    setRound(r);
    if (r === ROUNDS && rule === "most") interact(); // the reveal waits for round 20 under the model's rule
  };

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (round === ROUNDS) return rule === "most" ? "Every patrol went to A." : "Turns: both kept growing.";
    return `Next patrol: district ${st.next} (${rule === "most" ? "more records" : "its turn"}).`;
  };

  const markX = COL_X[st.next as "A" | "B"] + SQ + 1;
  const topOf = (n: number) => BASE - Math.ceil(n / 2) * (SQ + 2);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two districts have identical true incident rates. Records start A = 6, B = 5. Each round the patrol goes to the district with more records, and only a patrolled district logs one new incident. After 20 rounds, A's share of all records is about:",
        options: ["50%", "60%", "84%"],
        answer: 2,
      }}
      exploreHint="Run 20 rounds. Then try patrols that take turns."
      minInteractions={1}
      reveal={() => {
        const most = run("most", ROUNDS);
        const turns = run("turns", ROUNDS);
        return (
          <>
            <p>
              After 20 rounds A held <strong>{most.a} of {most.a + most.b}</strong> records:{" "}
              <strong>{(100 * most.share).toFixed(1)}%</strong>. A was ahead, so it got the patrol, so it logged the
              incident, so it stayed ahead. B&apos;s 5 never grew, though its true rate was the same all along.
            </p>
            <p>
              With patrols taking turns, A ended at {turns.a} of {turns.a + turns.b} ({(100 * turns.share).toFixed(1)}%).
              When a model decides where we look, the data it later learns from reflect its own choices: a one-record
              head start became a “fact”.
            </p>
            <p className="muted">
              This toy is simplified: one log per round, logged only where patrolled. Studies of real predictive
              policing describe the same runaway loop.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox="0 0 320 246" className="stage-svg" role="img" aria-label={`Records: A ${st.a}, B ${st.b}`}>
            <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
              same true incident rate in both
            </text>
            <line x1={30} y1={BASE + 1} x2={290} y2={BASE + 1} stroke="var(--line)" />
            <Stack x={COL_X.A} start={START.a} added={st.a - START.a} />
            <Stack x={COL_X.B} start={START.b} added={st.b - START.b} />
            {(["A", "B"] as const).map((d) => (
              <g key={d}>
                <text x={COL_X[d] + SQ + 1} y={BASE + 18} textAnchor="middle" className={s.label} fill="var(--fg)">
                  District {d}
                </text>
                <text
                  x={COL_X[d] + SQ + 1}
                  y={topOf(d === "A" ? st.a : st.b) - 6}
                  textAnchor="middle"
                  className={s.label}
                  fill="var(--fg)"
                >
                  {d === "A" ? st.a : st.b}
                </text>
              </g>
            ))}
            {!locked && round < ROUNDS && (
              <g>
                <rect x={markX - 34} y={BASE + 25} width={68} height={17} rx={8.5} fill="var(--domain)" />
                <text x={markX} y={BASE + 37} textAnchor="middle" className={s.small} fill="#0d0f14">
                  patrol next
                </text>
              </g>
            )}
          </svg>
          <p className={s.msg} aria-live="polite">
            {message(locked)}
          </p>
          <Row>
            <Control disabled={locked || round >= ROUNDS} onClick={() => goTo(round + 1, interact)}>
              Run 1 round
            </Control>
            <Control disabled={locked || round >= ROUNDS} onClick={() => goTo(ROUNDS, interact)}>
              Run to 20
            </Control>
            <Control disabled={locked || round === 0} onClick={() => setRound(0)}>
              Reset
            </Control>
            <Readout label="Round" value={round} />
            <Readout label="A's share" value={`${(100 * st.share).toFixed(1)}%`} />
          </Row>
          <Row>
            <span className={s.small}>Patrol rule:</span>
            <Control
              className={rule === "most" ? "active" : ""}
              aria-pressed={rule === "most"}
              disabled={locked || rule === "most"}
              onClick={() => {
                setRule("most");
                setRound(0);
              }}
            >
              Most records
            </Control>
            <Control
              className={rule === "turns" ? "active" : ""}
              aria-pressed={rule === "turns"}
              disabled={locked || rule === "turns"}
              onClick={() => {
                setRule("turns");
                setRound(0);
              }}
            >
              Take turns
            </Control>
          </Row>
        </div>
      )}
    </Lesson>
  );
}
