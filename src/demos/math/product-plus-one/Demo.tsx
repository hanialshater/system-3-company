"use client";

// Product plus one. The learner toggles primes (2 to 13) into a list. The stage multiplies the
// list, adds 1 and factors the result by trial division. Every prime factor found is outside
// the list (each listed prime leaves remainder 1), which is Euclid's argument. Product + 1 is
// often prime (3, 7, 31, 211, 2311) but not always (30031 = 59 x 509).
// Key state: a list of at least four primes, and the full list of six (30031 is not prime).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const PRIMES = [2, 3, 5, 7, 11, 13];
const MILESTONES = ["four-primes", "all-six"] as const;

function factor(n: number): number[] {
  const f: number[] = [];
  for (let d = 2; d * d <= n; d++) while (n % d === 0) (f.push(d), (n /= d));
  if (n > 1) f.push(n);
  return f;
}
const ALL = PRIMES.reduce((a, b) => a * b, 1);
const ALL_F = factor(ALL + 1);

export default function ProductPlusOne({ slug }: { slug: string }) {
  const [list, setList] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A classmate claims ${PRIMES.join(", ")} are every prime there is. You multiply them and add 1: ${ALL + 1}. Which is true of that number?`,
        options: ["It is prime", `It divides by one of ${PRIMES[0]} to ${PRIMES[PRIMES.length - 1]}`, "It has a prime factor not in the list"],
        answer: 2,
      }}
      exploreHint="Build lists of primes and watch where product + 1's primes come from."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>
              {ALL + 1} = {ALL_F.join(" × ")}
            </strong>
            , primes not in the list. The list&apos;s product divides by every prime in it, so product + 1 leaves remainder 1
            for each of them. Yet every whole number above 1 breaks into primes, so some prime divides it: one the list missed.
          </p>
          <p>
            That works for any finite list, so no finite list holds every prime: the primes never run out (Euclid). Product + 1 is
            not always prime itself; {ALL + 1} is not.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} list={list} setList={setList} />}
    </Lesson>
  );
}

function Stage({ locked, interact, list, setList }: StageContext & { list: number[]; setList: (v: number[]) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const prod = list.reduce((a, b) => a * b, 1);
  const n = prod + 1;
  const f = factor(n);
  const prime = f.length === 1;

  const toggle = (p: number) => {
    const next = list.includes(p) ? list.filter((x) => x !== p) : [...list, p].sort((a, b) => a - b);
    setList(next);
    if (next.length >= 4) reach("four-primes");
    if (PRIMES.every((q) => next.includes(q))) reach("all-six");
  };

  return (
    <div className={s.wrap}>
      <div className={s.card} aria-live="polite">
        {locked ? (
          <p className={s.hint}>Make a prediction to start.</p>
        ) : list.length === 0 ? (
          <p className={s.hint}>Tap primes below to build a list.</p>
        ) : (
          <>
            <div className={s.line}>
              <span className={s.k}>List</span>
              <span className={s.chips}>
                {list.map((p) => (
                  <span key={p} className={s.inList}>
                    {p}
                  </span>
                ))}
              </span>
            </div>
            <div className={s.line}>
              <span className={s.k}>Product + 1</span>
              <span className={s.big}>
                {prod.toLocaleString("en-US")} + 1 = {n.toLocaleString("en-US")}
              </span>
            </div>
            <div className={s.line}>
              <span className={s.k}>Its primes</span>
              <span className={s.chips}>
                {f.map((p, i) => (
                  <span key={i} className={s.newPrime}>
                    {p}
                  </span>
                ))}
                <span className={s.note}>{prime ? "prime itself, not in the list" : "not prime, and none of its primes are in the list"}</span>
              </span>
            </div>
            <p className={s.hint}>
              Remainder of {n.toLocaleString("en-US")} ÷ each listed prime: {list.map((p) => `${p}→${n % p}`).join("  ")}
            </p>
          </>
        )}
      </div>

      <Row>
        {PRIMES.map((p) => (
          <Control key={p} disabled={locked} className={list.includes(p) ? "active" : ""} aria-pressed={list.includes(p)} aria-label={`${list.includes(p) ? "Remove" : "Add"} ${p}`} onClick={() => toggle(p)}>
            {p}
          </Control>
        ))}
      </Row>
    </div>
  );
}
