"use client";

// Sieve of Eratosthenes on 2..30. Tapping a number crosses out its multiples (2x, 3x, ...).
// After 2, 3 and 5 every non-prime is gone, because a non-prime up to 30 has a factor of at most 5
// (6 x 6 = 36 > 30). Tapping 7 or more crosses out nothing new, and the stage says so.
// One picture: the grid. Crossed-out numbers are disabled; every enabled tap changes the grid.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const MAX = 30;
const NUMS = Array.from({ length: MAX - 1 }, (_, i) => i + 2);
const multiples = (n: number) => NUMS.filter((m) => m > n && m % n === 0);
const isPrime = (n: number) => n >= 2 && NUMS.every((d) => d >= n || d * d > n || n % d !== 0);
const PRIMES = NUMS.filter(isPrime);
const COMPOSITES = NUMS.filter((n) => !isPrime(n));
// Largest number you ever need to tap: the largest prime p with p * p <= MAX.
const LAST_NEEDED = Math.max(...PRIMES.filter((p) => p * p <= MAX)); // 5
const NEEDED = PRIMES.filter((p) => p <= LAST_NEEDED); // 2, 3, 5
const SQ = LAST_NEEDED + 1; // 6: 6 x 6 = 36 > 30

export default function SieveStopsAtFive({ slug }: { slug: string }) {
  const [crossed, setCrossed] = useState<number[]>([]);
  const [tapped, setTapped] = useState<number[]>([]);
  const [last, setLast] = useState<{ n: number; fresh: number[]; already: number[] } | null>(null);
  const [emptyTaps, setEmptyTaps] = useState<{ n: number; already: number[] }[]>([]);

  const left = COMPOSITES.filter((c) => !crossed.includes(c)).length;
  const clean = left === 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Hunting primes on a grid of 2 to ${MAX}, you tap a number to cross out its multiples (twice it, three times it, …). Whatever survives is prime. What is the largest number you ever need to tap?`,
        options: [String(PRIMES[PRIMES.length - 1]), String(MAX / 2), String(LAST_NEEDED)],
        answer: 2,
      }}
      exploreHint="Tap numbers in order from 2. Watch the counter, and keep going past it."
      minInteractions={2}
      reveal={() => {
        const e = emptyTaps[0];
        return (
          <>
            <p>
              After {NEEDED.join(", ")}, the counter of non-primes left hit 0.
              {e ? ` Tapping ${e.n} crossed out nothing new: ${e.already.join(", ")} were already gone.` : ""} So{" "}
              <strong>{LAST_NEEDED}</strong> is the last tap you need.
            </p>
            <p>
              Every non-prime up to {MAX} has a factor of {LAST_NEEDED} or less: if both factors were {SQ} or more, it
              would be at least {SQ} × {SQ} = {SQ * SQ}. So you only sieve up to the number that, times itself, reaches {MAX} (its square root). The {PRIMES.length}{" "}
              left are the primes. This is the sieve of Eratosthenes, an ancient method.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["clean", "nothing-new"]}>
          {(reach) => {
            const tap = (n: number) => {
              if (locked || crossed.includes(n) || tapped.includes(n)) return;
              const ms = multiples(n);
              const fresh = ms.filter((m) => !crossed.includes(m));
              const already = ms.filter((m) => crossed.includes(m));
              const nextCrossed = [...crossed, ...fresh];
              setCrossed(nextCrossed);
              setTapped([...tapped, n]);
              setLast({ n, fresh, already });
              const nowClean = COMPOSITES.every((c) => nextCrossed.includes(c));
              if (nowClean) reach("clean");
              if (fresh.length === 0 && clean) {
                setEmptyTaps([...emptyTaps, { n, already }]);
                reach("nothing-new");
              }
            };
            const msg = locked
              ? "Make a prediction to start."
              : !last
                ? "Tap a number to cross out its multiples."
                : last.fresh.length
                  ? `${last.n}: crossed out ${last.fresh.length} more.`
                  : last.already.length
                    ? `${last.n}: ${last.already.join(", ")} already crossed. Nothing new.`
                    : `${last.n}: no multiples up to ${MAX}.`;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.grid}>
                  {NUMS.map((n) => {
                    const x = crossed.includes(n);
                    const t = tapped.includes(n);
                    const prime = !locked && clean && !x;
                    return (
                      <Control key={n} disabled={locked || x || t}
                        className={`${s.cell} ${x ? s.crossed : ""} ${t ? `active ${s.tapped}` : ""} ${prime ? s.prime : ""} ${last?.n === n ? s.now : ""}`}
                        aria-label={x ? `${n}, crossed out` : `Tap ${n}`} onClick={() => tap(n)}>
                        {n}
                      </Control>
                    );
                  })}
                </div>
                <Row>
                  <Readout label="Non-primes not crossed" value={locked ? "–" : left} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
