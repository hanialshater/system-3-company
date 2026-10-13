"use client";

// Scramble the digits. 7254 as four digit tiles in the thousands, hundreds, tens and ones places.
// Tap one tile, then another, to swap them. Under each place its value is split into nines plus 1
// (1000 = 999 + 1 ...), so each digit leaves exactly itself as leftover ones; the leftovers are
// drawn as dots and totalled. The quotient by 9 is computed from the number on screen.
// Key state: two swaps made, and the leftovers still 18 each time.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const START = [7, 2, 5, 4];
const PLACES = [1000, 100, 10, 1];
const MILESTONES = ["swap-1", "swap-2"] as const;
const value = (ds: number[]) => ds.reduce((a, d, i) => a + d * PLACES[i], 0);
const digitSum = (ds: number[]) => ds.reduce((a, b) => a + b, 0);

export default function ScrambleDigits({ slug }: { slug: string }) {
  const [digits, setDigits] = useState<number[]>(START);
  const [picked, setPicked] = useState<number | null>(null);
  const [made, setMade] = useState<number[]>([]);

  const n0 = value(START);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${n0} is divisible by 9. Scramble its four digits any way you like. Is the new number still divisible by 9?`,
        options: ["Always", "Never", "Sometimes"],
        answer: 0,
      }}
      exploreHint="Tap two digits to swap them. Do it at least twice."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>Always.</strong> You made {made.length > 0 ? made.join(", ") : "new numbers"}: each one divided by 9 exactly,
            and the leftovers stayed at {digitSum(START)} every time.
          </p>
          <p>
            1000 is 999 + 1, 100 is 99 + 1, 10 is 9 + 1. The 999s, 99s and 9s are all multiples of 9, so each digit leaves
            just itself over. A number&apos;s remainder by 9 is its digit sum&apos;s.
          </p>
          <p>
            Swapping digits moves them between places but never changes their sum, {START.join(" + ")} = {digitSum(START)}, a
            multiple of 9.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const tap = (i: number) => {
              if (picked === null) return setPicked(i);
              if (picked === i) return setPicked(null);
              const d = [...digits];
              [d[picked], d[i]] = [d[i], d[picked]];
              setDigits(d);
              setPicked(null);
              const v = value(d);
              const next = made.includes(v) || v === n0 ? made : [...made, v];
              setMade(next);
              if (next.length >= 1) reach("swap-1");
              if (next.length >= 2) reach("swap-2");
            };
            return <Stage locked={locked} digits={digits} picked={picked} onTap={tap} />;
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, digits, picked, onTap }: { locked: boolean; digits: number[]; picked: number | null; onTap: (i: number) => void }) {
  const n = value(digits);
  const left = digitSum(digits);
  const caption = locked
    ? "Make a prediction to start."
    : picked === null
      ? "Tap a digit, then the digit to swap it with."
      : `Where should the ${digits[picked]} go? Tap another digit.`;

  return (
    <div className={s.wrap}>
      <p className={s.caption} aria-live="polite">
        {caption}
      </p>
      <div className={s.places}>
        {digits.map((d, i) => (
          <div key={i} className={s.place}>
            <Control
              disabled={locked}
              className={`${s.tile} ${picked === i ? "active" : ""}`}
              aria-pressed={picked === i}
              aria-label={`Digit ${d} in the ${PLACES[i]}s place`}
              onClick={() => onTap(i)}
            >
              {d}
            </Control>
            <span className={s.split}>
              <b>{PLACES[i]}s</b>
              {PLACES[i] === 1 ? "1" : `= ${PLACES[i] - 1} + 1`}
            </span>
            <span className={s.dots} aria-label={`${d} leftover`}>
              {Array.from({ length: d }, (_, k) => (
                <span key={k} className={s.dot} />
              ))}
            </span>
          </div>
        ))}
      </div>
      <Row>
        <Readout label="Leftover ones" value={locked ? "?" : `${digits.join("+")} = ${left}`} />
        <Readout label="÷ 9" value={locked ? "?" : n % 9 === 0 ? `${n} = 9 × ${n / 9}` : `remainder ${n % 9}`} />
      </Row>
    </div>
  );
}
