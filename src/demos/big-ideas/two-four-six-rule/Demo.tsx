"use client";

// The 2-4-6 task (Big Ideas brief #1, falsification-2-4-6). The secret rule is Wason's: any three strictly
// increasing numbers. The learner's guess is "add 2 each time". The log starts with the question's three +2 tests
// (all fit both rules), then every triple the learner tests, with two marks: does it fit +2 (your guess), does it
// fit the secret rule (the experimenter's answer). A row where the two marks differ is drawn as a split: the test
// that could tell the rules apart. The secret rule is printed on the stage only in the reveal phase.
// Controls (DOM order = QA order): first −/+, second −/+, third −/+, Flip order, Test, Test 1-2-10.
// QA path from 2-4-6: steppers net back to 2-4-6, Flip gives 6-4-2, Test logs it (no fit: milestone no-fit),
// "Test 1-2-10" logs the question's case (breaks +2 and fits: milestone split). Recorded triples are pinned rows.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type T = [number, number, number];
const MIN = 0;
const MAX = 40;
const plus2 = (t: T) => t[1] === t[0] + 2 && t[2] === t[1] + 2;
const secret = (t: T) => t[0] < t[1] && t[1] < t[2];
const str = (t: T) => t.join("-");
const SEEDED: T[] = [
  [8, 10, 12],
  [20, 22, 24],
  [1, 3, 5],
];

type Entry = { id: number; t: T };
const SHOW = 4;

export default function TwoFourSixRule({ slug }: { slug: string }) {
  const [cur, setCur] = useState<T>([2, 4, 6]);
  const [log, setLog] = useState<Entry[]>([]);
  const [splitSeen, setSplitSeen] = useState<Entry | null>(null);
  const [noFitSeen, setNoFitSeen] = useState<Entry | null>(null);

  const split = splitSeen ? str(splitSeen.t) : "1-2-10";
  const noFit = noFitSeen ? str(noFitSeen.t) : "6-4-2";

  // rows shown: the two pinned milestone rows plus the newest others, at most SHOW, oldest first
  const pins = new Set([splitSeen?.id, noFitSeen?.id].filter((x): x is number => x !== undefined));
  const others = log.filter((e) => !pins.has(e.id));
  const shown = [...log.filter((e) => pins.has(e.id)), ...others.slice(Math.max(0, others.length - (SHOW - pins.size)))].sort(
    (a, b) => a.id - b.id,
  );

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "2, 4, 6 fits a secret rule. You guess “add 2 each time” and test 8-10-12, 20-22-24 and 1-3-5: all fit. Will 1-2-10, which breaks “add 2”, fit the secret rule?",
        options: ["No, it breaks the pattern", "Yes, it still fits"],
        answer: 1,
      }}
      exploreHint="Build any three numbers and test them. Try ones your guess says will fail."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your +2 tests all fit, but they fit “any three increasing numbers” just as well, so they couldn’t tell the two rules
            apart. {split} broke your guess and still fit, while {noFit} did not: those tests taught you more than the rest.
          </p>
          <p>Karl Popper argued that a claim is scientific when a test could prove it false.</p>
          <p>
            Where it stops: testing cases that fit is often sensible. It fails here because the true rule is broader than the guess.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={["split", "no-fit"]}>
          {(reach) => {
            const test = (t: T) => {
              if (locked) return;
              const e: Entry = { id: log.length, t };
              setLog([...log, e]);
              if (!plus2(t) && secret(t)) {
                if (!splitSeen) setSplitSeen(e);
                reach("split");
              }
              if (!secret(t)) {
                if (!noFitSeen) setNoFitSeen(e);
                reach("no-fit");
              }
            };
            const bump = (i: number, d: number) => {
              if (locked) return;
              const n = [...cur] as T;
              n[i] = Math.min(MAX, Math.max(MIN, n[i] + d));
              setCur(n);
            };
            const last = log[log.length - 1];
            const msg = locked
              ? "Make a prediction to start."
              : phase === "reveal"
                ? null
                : !last
                  ? "Your guess: add 2 each time. Test any three numbers."
                  : plus2(last.t) === secret(last.t)
                    ? `${str(last.t)}: your guess and the secret rule agree.`
                    : `${str(last.t)}: your guess said no, but it fits!`;
            const mark = (ok: boolean) => <span className={`${s.cell} ${ok ? s.yes : s.no}`}>{ok ? "✓" : "✗"}</span>;
            const names = ["first", "second", "third"];
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {phase === "reveal" ? (
                    <span className={s.rule}>Secret rule: any three increasing numbers (Wason, 1960)</span>
                  ) : (
                    msg
                  )}
                </p>
                <div className={s.log} role="table" aria-label="Tested triples">
                  <span className={s.head}>tested</span>
                  <span className={`${s.head} ${s.cell}`}>fits +2?</span>
                  <span className={`${s.head} ${s.cell}`}>fits secret rule?</span>
                  <span className={s.trip}>{SEEDED.map(str).join(", ")}</span>
                  {mark(true)}
                  {mark(true)}
                  {shown.map((e) => {
                    const a = plus2(e.t);
                    const b = secret(e.t);
                    return (
                      <span key={e.id} style={{ display: "contents" }}>
                        <span className={`${s.trip} ${a !== b ? s.split : ""}`}>
                          {str(e.t)}
                          {a !== b ? " ← differ" : ""}
                        </span>
                        {mark(a)}
                        {mark(b)}
                      </span>
                    );
                  })}
                </div>
                <div className={s.steppers}>
                  {cur.map((v, i) => (
                    <div key={i} className={s.stepper}>
                      <Control aria-label={`${names[i]} number down`} disabled={locked || v <= MIN} onClick={() => bump(i, -1)}>
                        −
                      </Control>
                      <span className={s.val}>{locked ? "?" : v}</span>
                      <Control aria-label={`${names[i]} number up`} disabled={locked || v >= MAX} onClick={() => bump(i, 1)}>
                        +
                      </Control>
                    </div>
                  ))}
                </div>
                <div className={s.controls}>
                  <Control disabled={locked || cur[0] === cur[2]} onClick={() => !locked && setCur([cur[2], cur[1], cur[0]])}>
                    Flip order
                  </Control>
                  <Control disabled={locked} onClick={() => test(cur)}>
                    Test {str(cur)}
                  </Control>
                  <Control
                    disabled={locked}
                    onClick={() => {
                      if (locked) return;
                      setCur([1, 2, 10]);
                      test([1, 2, 10]);
                    }}
                  >
                    Test 1-2-10
                  </Control>
                </div>
                <p className={s.head} style={{ margin: 0, textAlign: "center" }}>
                  Tests run: {log.length}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
