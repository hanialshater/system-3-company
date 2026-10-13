"use client";

// Hamming(7,4). The sent word 0110011 passes three even-parity checks over positions
// {1,3,5,7}, {2,3,6,7}, {4,5,6,7}, worth 1, 2 and 4. The learner flips one bit "in transit"
// (tapping another bit moves the flip; tapping the flipped bit undoes it) and watches which
// checks fail. The weights of the failing checks always add up to the flipped position.
// One picture: a 7-column grid, bits on top, a row of dots per check, a light at the end.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SENT = "0110011";
const POS = [1, 2, 3, 4, 5, 6, 7];
const CHECKS = [
  { name: "Check 1", weight: 1, covers: [1, 3, 5, 7] },
  { name: "Check 2", weight: 2, covers: [2, 3, 6, 7] },
  { name: "Check 3", weight: 4, covers: [4, 5, 6, 7] },
];
const TARGET = 6;

const received = (flip: number | null) =>
  SENT.split("").map((b, i) => (flip === i + 1 ? (b === "1" ? "0" : "1") : b));
const fails = (word: string[]) =>
  CHECKS.map((c) => c.covers.reduce((n, p) => n + (word[p - 1] === "1" ? 1 : 0), 0) % 2 === 1);
const failSum = (f: boolean[]) => f.reduce((n, x, i) => n + (x ? CHECKS[i].weight : 0), 0);
const failNames = (f: boolean[]) => CHECKS.filter((_, i) => f[i]).map((c) => c.name.toLowerCase().replace("check ", ""));
const passNames = (f: boolean[]) => CHECKS.filter((_, i) => !f[i]).map((c) => c.name.toLowerCase().replace("check ", ""));
const join = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const weightsText = (f: boolean[]) => CHECKS.filter((_, i) => f[i]).map((c) => c.weight).join(" + ");

const TARGET_FAILS = fails(received(TARGET)); // checks 2 and 3 fail
const TARGET_SUM = failSum(TARGET_FAILS); // 6

export default function HammingPointsAtTheBug({ slug }: { slug: string }) {
  const [flip, setFlip] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  const word = received(flip);
  const f = fails(word);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A 7-bit word has three checks, over positions {${CHECKS.map((c) => c.covers.join(",")).join("}, {")}}. One bit flipped. Checks ${join(failNames(TARGET_FAILS))} fail; check ${join(passNames(TARGET_FAILS))} passes. Which position flipped?`,
        options: ["2", String(TARGET_SUM), "7"],
        answer: 1,
      }}
      exploreHint="Flip different bits and watch which checks fail. Try bit 6."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You flipped {tried.length} different bits, and each failed a different set of checks. Bit {TARGET} failed
            checks {join(failNames(TARGET_FAILS))} only: <strong>{weightsText(TARGET_FAILS)} = {TARGET_SUM}</strong>, its
            own position.
            {flip !== null && flip !== TARGET ? ` On the stage now, bit ${flip}: ${weightsText(f)} = ${failSum(f)}.` : ""}
          </p>
          <p>
            Every position sits in its own mix of checks, so the failing checks spell out where the error is. Flip that
            bit back and the word is repaired, not just flagged. Richard Hamming published this code in 1950.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["three-bits", "bit-six"]}>
          {(reach) => {
            const tap = (p: number) => {
              if (locked) return;
              const next = flip === p ? null : p;
              setFlip(next);
              if (next === null) return;
              const t = tried.includes(p) ? tried : [...tried, p];
              setTried(t);
              if (t.length >= 3) reach("three-bits");
              if (p === TARGET) reach("bit-six");
            };
            const msg = locked
              ? "Make a prediction to start."
              : flip === null
                ? "Sent word: every check passes. Tap a bit to flip it."
                : f.some(Boolean)
                  ? `Bit ${flip} flipped. Failing checks add up to ${failSum(f)}.`
                  : "All checks pass.";
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.grid}>
                  <span className={s.corner}>bit</span>
                  {POS.map((p) => (
                    <Control key={p} aria-label={`Flip bit ${p}`} disabled={locked}
                      className={`${s.bit} ${flip === p ? s.flipped : ""}`} onClick={() => tap(p)}>
                      {word[p - 1]}
                    </Control>
                  ))}
                  <span />
                  <span className={s.corner}>pos</span>
                  {POS.map((p) => (
                    <span key={p} className={s.pos}>{p}</span>
                  ))}
                  <span />
                  {CHECKS.map((c, ci) => (
                    <div key={c.name} className={s.checkRow}>
                      <span className={`${s.corner} ${s.worth} ${!locked && f[ci] ? s.worthBad : ""}`}>+{c.weight}</span>
                      {POS.map((p) => (
                        <span key={p} className={s.cell}>
                          {c.covers.includes(p) ? <span className={`${s.dot} ${!locked && f[ci] ? s.dotBad : ""}`} /> : null}
                        </span>
                      ))}
                      <span className={`${s.light} ${locked ? "" : f[ci] ? s.fail : s.pass}`}>
                        {locked ? "–" : f[ci] ? "fail" : "ok"}
                      </span>
                    </div>
                  ))}
                </div>
                <p className={s.key}>A check fails when its dotted bits hold an odd number of 1s.</p>
                <Row>
                  <Readout label="Failing checks add to" value={locked || flip === null ? "–" : failSum(f)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
