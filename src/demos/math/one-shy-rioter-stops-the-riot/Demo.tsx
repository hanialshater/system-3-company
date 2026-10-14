"use client";

// Granovetter's threshold crowd. 100 people, everyone sees everyone (complete network). Person i joins
// once at least threshold[i] others have joined. Thresholds 0..99: each round adds exactly one person,
// so all 100 join after 100 rounds. Change the threshold-1 person to 2 and the count stops at 1: after
// the first mover nobody left needs only 1. Re-run in node 2026-10-14 (100 and 1).
// State is (crowd, round t); toggling the crowd keeps t, so after "Run to the end" the toggle is a
// before/after comparison of the two final states.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 100;
const ORIGINAL = Array.from({ length: N }, (_, i) => i);
const CHANGED = ORIGINAL.map((t, i) => (i === 1 ? 2 : t));
const CHANGED_ID = 1;
const END = 1000; // "run to the end": more rounds than any cascade here needs

// round in which each person joins (Infinity = never); synchronous rounds
function joinRounds(th: number[]) {
  const round = th.map(() => Infinity);
  let count = 0;
  for (let r = 1; r <= N + 1; r++) {
    const add = th.map((t, i) => (round[i] === Infinity && t <= count ? i : -1)).filter((i) => i >= 0);
    if (add.length === 0) break;
    for (const i of add) round[i] = r;
    count += add.length;
  }
  return round;
}
const ROUNDS = { original: joinRounds(ORIGINAL), changed: joinRounds(CHANGED) };
const lastRound = (rs: number[]) => Math.max(0, ...rs.filter((r) => r < Infinity));
const mean = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;

const COLS = 10;
const CELL = 29;
const GAP = 1;

export default function OneShyRioterStopsTheRiot({ slug }: { slug: string }) {
  const [crowd, setCrowd] = useState<"original" | "changed">("original");
  const [t, setT] = useState(0);

  const th = crowd === "original" ? ORIGINAL : CHANGED;
  const rounds = ROUNDS[crowd];
  const last = lastRound(rounds);
  const shownT = Math.min(t, last);
  const joined = rounds.filter((r) => r <= t).length;
  const atEnd = t >= last;
  const nextUp = th.map((x, i) => rounds[i] > t && x <= joined);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "100 people: one joins if 0 others have, one if 1, ... one if 99. Change the '1' person to '2'. How many join?",
        options: ["100", "About 50", "1"],
        answer: 2,
      }}
      exploreHint="Run the crowd as given, then make the '1' a '2'. Step to watch who comes next."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            As given, every round brought exactly one more person: once 1 had joined, the person who needs 1 went, then the one who
            needs 2, and so on to all 100.
          </p>
          <p>
            Then you changed one number. The average threshold barely moved, from 49.5 to 49.51, but the riot stopped at 1. The
            first mover went alone, and the stage showed why: everyone left needed at least 2 others, and nobody was a 1.
          </p>
          <p>
            A chain like this needs a next person at every count. The average mood hides that; one missing link stops it. This is
            Granovetter&apos;s threshold model of a crowd.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["full-riot", "stalled"]}>
          {(reach) => {
            const check = (c: "original" | "changed", nt: number) => {
              const rs = ROUNDS[c];
              const l = lastRound(rs);
              if (nt < l) return;
              if (c === "original" && rs.every((r) => r < Infinity)) reach("full-riot");
              if (c === "changed") reach("stalled");
            };
            const run = () => {
              if (locked) return;
              setT(END);
              check(crowd, END);
            };
            const step = () => {
              if (locked || atEnd) return;
              const nt = shownT + 1;
              setT(nt);
              check(crowd, nt);
            };
            const toggle = () => {
              if (locked) return;
              const c = crowd === "original" ? "changed" : "original";
              setCrowd(c);
              check(c, t);
            };
            const reset = () => {
              if (locked) return;
              setT(0);
            };

            const note =
              joined === 0
                ? "Nobody yet. The 0 goes first."
                : atEnd && joined === N
                  ? "All 100 joined, one per round."
                  : atEnd
                    ? `Stuck at ${joined}: everyone left needs more than ${joined}.`
                    : `${joined} joined. Next: anyone needing ${joined} or fewer.`;
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 300 300" className="stage-svg" role="img" aria-label={`${joined} of 100 joined after round ${shownT}`}>
                  {th.map((x, i) => {
                    const r = Math.floor(i / COLS);
                    const c = i % COLS;
                    const isIn = rounds[i] <= t;
                    const changed = crowd === "changed" && i === CHANGED_ID;
                    return (
                      <g key={i}>
                        <rect
                          x={c * (CELL + GAP) + 1}
                          y={r * (CELL + GAP) + 1}
                          width={CELL - 1}
                          height={CELL - 1}
                          rx={5}
                          className={`${isIn ? s.inCell : s.outCell} ${nextUp[i] ? s.next : ""} ${changed ? s.changed : ""}`}
                        />
                        <text
                          x={c * (CELL + GAP) + 1 + CELL / 2}
                          y={r * (CELL + GAP) + 1 + CELL / 2 + 4}
                          textAnchor="middle"
                          className={isIn ? s.labIn : s.lab}
                        >
                          {x}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <p className={s.key}>Number = others needed first.</p>
                <Row>
                  <Control disabled={locked || atEnd} onClick={run}>
                    Run to end
                  </Control>
                  <Control className={crowd === "changed" ? "active" : ""} disabled={locked} onClick={toggle}>
                    {crowd === "original" ? "Make the '1' a '2'" : "Put the '1' back"}
                  </Control>
                  <Control disabled={locked || atEnd} onClick={step}>
                    Step
                  </Control>
                  <Control disabled={locked || t === 0} onClick={reset}>
                    Reset
                  </Control>
                </Row>
                <Row>
                  <Readout label="Joined" value={`${joined} / ${N}`} />
                  <Readout label="Round" value={shownT} />
                  <Readout label="Avg threshold" value={mean(th).toFixed(2)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
