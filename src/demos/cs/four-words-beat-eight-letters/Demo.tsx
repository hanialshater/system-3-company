"use client";

// Password strength as a count. Two random passwords: L lowercase letters (26 choices each) and
// W words from a 2,048-word list. Each card shows the exact number of possible passwords (BigInt),
// a bar whose length is the number of digits in that count, and how long trying them all takes at
// 10 billion guesses a second. Starts at the question's 8 letters vs 4 words.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LETTERS = 26n;
const WORDS = 2048n;
const L0 = 8;
const W0 = 4;
const RATE = 10_000_000_000n; // guesses per second
const RATE_TEXT = "10 billion";
const MAX_DIGITS = 21;

const count = (pool: bigint, n: number) => pool ** BigInt(n);
const commas = (x: bigint) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const digits = (x: bigint) => x.toString().length;
function timeText(total: bigint) {
  const sec = Number(total) / Number(RATE);
  const units: [number, string][] = [
    [365 * 24 * 3600, "year"],
    [24 * 3600, "day"],
    [3600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];
  for (const [u, name] of units) {
    if (sec >= u) {
      const v = Math.round(sec / u);
      return `${commas(BigInt(v))} ${name}${v === 1 ? "" : "s"}`;
    }
  }
  return "under a second";
}
const START_L = count(LETTERS, L0);
const START_W = count(WORDS, W0);
const RATIO = Math.round(Number(START_W) / Number(START_L)); // 84

export default function FourWordsBeatEightLetters({ slug }: { slug: string }) {
  const [l, setL] = useState(L0);
  const [w, setW] = useState(W0);
  const [overtook, setOvertook] = useState<string | null>(null);
  const cl = count(LETTERS, l);
  const cw = count(WORDS, w);
  const lettersAhead = cl > cw;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Password 1: ${L0} random lowercase letters. Password 2: ${W0} random words from a list of ${commas(WORDS)}. Which has more possible passwords?`,
        options: [`${L0} letters`, `${W0} words`, "They are equal"],
        answer: 1,
      }}
      exploreHint="Slide the lengths. Can you make the other password win?"
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            At the start, {L0} letters gave {commas(START_L)} passwords and {W0} words gave {commas(START_W)}, about{" "}
            <strong>{RATIO} times more</strong>. At {RATE_TEXT} guesses a second that is {timeText(START_L)} against{" "}
            {timeText(START_W)}.{overtook ? ` ${overtook}` : ""}
          </p>
          <p>
            Each extra letter multiplies the count by {String(LETTERS)}, each extra word by {commas(WORDS)}. Strength is the
            number of equally likely passwords, which holds only if every letter or word is picked at random.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["letters", "words", "overtake"]}>
          {(reach) => {
            const check = (nl: number, nw: number) => {
              const a = count(LETTERS, nl);
              const b = count(WORDS, nw);
              if (a > b) {
                reach("overtake");
                if (!overtook) setOvertook(`You made ${nl} letters beat ${nw} words: ${commas(a)} against ${commas(b)}.`);
              } else if (nw < W0) {
                reach("overtake");
                if (!overtook) setOvertook(`At ${nw} words the count fell to ${commas(b)}.`);
              }
            };
            const setLetters = (v: number) => {
              if (locked) return;
              setL(v);
              reach("letters");
              check(v, w);
            };
            const setWords = (v: number) => {
              if (locked) return;
              setW(v);
              reach("words");
              check(l, v);
            };
            const card = (name: string, total: bigint, ahead: boolean) => (
              <div className={`${s.card} ${!locked && ahead ? s.ahead : ""}`}>
                <div className={s.head}>
                  <span className={s.name}>{name}</span>
                  <span className={s.time}>{locked ? "" : `try all: ${timeText(total)}`}</span>
                </div>
                <svg viewBox="0 0 300 14" className={s.bar} aria-hidden>
                  <rect x={0} y={0} width={300} height={14} rx={4} className={s.track} />
                  <rect x={0} y={0} width={locked ? 0 : (300 * digits(total)) / MAX_DIGITS} height={14} rx={4}
                    className={ahead ? s.fillAhead : s.fill} />
                </svg>
                <span className={s.count}>{locked ? "?" : `${commas(total)} passwords`}</span>
              </div>
            );
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {locked ? "Make a prediction to start." : `Bar = number of digits. Guessing ${RATE_TEXT} a second.`}
                </p>
                {card(`${l} letters (26 each)`, cl, lettersAhead)}
                <Slider label="Letters" value={l} min={1} max={12} disabled={locked} onChange={setLetters} />
                {card(`${w} words (2,048 each)`, cw, !lettersAhead && cw !== cl)}
                <Slider label="Words" value={w} min={1} max={6} disabled={locked} onChange={setWords} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
