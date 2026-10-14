"use client";

// Text encoding (brief cs #56): each character is stored as a number code, and every capital's code is smaller
// than every small letter's, so sorting by the stored numbers is not dictionary order.
// Stage: three word tiles (Zebra, apple, Banana). Tap a tile to read its first letter's code. "Sort by code"
// orders the tiles by those codes (Banana, Zebra, apple). "Ignore case" re-sorts on lowercased letters
// (apple, Banana, Zebra); the order not shown in the tiles stays as a faint row, so both orders are on the stage.
// Codes come from String.charCodeAt; orders come from the same compare functions the stage draws.
// Milestones: codes-read (all three codes shown), sorted-by-code, case-ignored.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const WORDS = ["Zebra", "apple", "Banana"];
const code = (w: string) => w.charCodeAt(0);
const byCode = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0); // UTF-16 code units, like Array.sort()
const byLower = (a: string, b: string) => byCode(a.toLowerCase(), b.toLowerCase());
const CODE_ORDER = [...WORDS].sort(byCode); // Banana, Zebra, apple
const CASE_ORDER = [...WORDS].sort(byLower); // apple, Banana, Zebra
const RULER = `A ${code("A")} … Z ${code("Z")} · a ${code("a")} … z ${code("z")}`;
const GAP = code("a") - code("A"); // 32

export default function ZebraSortsBeforeApple({ slug }: { slug: string }) {
  const [read, setRead] = useState<string[]>([]);
  const [sorted, setSorted] = useState(false);
  const [ignore, setIgnore] = useState(false);
  const [sawCase, setSawCase] = useState(false);

  const order = !sorted ? WORDS : ignore ? CASE_ORDER : CODE_ORDER;
  const faint = !sorted ? null : ignore ? { label: "By code", words: CODE_ORDER } : sawCase ? { label: "Ignoring case", words: CASE_ORDER } : null;
  const ahead = CODE_ORDER.filter((w) => code(w) < code("apple")); // words sorted before apple by code

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A computer sorts apple, Banana and Zebra by each letter's stored number. Where does apple land?",
        options: ["First", "Second", "Last"],
        answer: 2,
      }}
      exploreHint="Tap each word to see its first letter's number, then sort by code."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            You read the codes: B is {code("B")}, Z is {code("Z")}, a is {code("a")}. A computer stores each letter as a
            number, and every capital ({code("A")} to {code("Z")}) comes before every small letter ({code("a")} to {code("z")}).
          </p>
          <p>
            So sorting by code put {ahead.join(" and ")} ahead of apple. With case ignored, {CASE_ORDER[0]} came first. Each
            small letter is its capital plus {GAP}. To list words for people, a program can sort with language rules instead, which put apple first.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["codes-read", "sorted-by-code", "case-ignored"]}>
          {(reach) => {
            const tap = (w: string) => {
              if (locked || read.includes(w)) return;
              const next = [...read, w];
              setRead(next);
              if (next.length === WORDS.length) reach("codes-read");
            };
            const sort = () => {
              if (locked || sorted) return;
              setSorted(true);
              reach("sorted-by-code");
            };
            const toggle = () => {
              if (locked || !sorted) return;
              const on = !ignore;
              setIgnore(on);
              if (on) {
                setSawCase(true);
                reach("case-ignored");
              }
            };
            const msg = locked
              ? "Make a prediction to start."
              : !sorted
                ? read.length < WORDS.length
                  ? "Tap each word to see its first letter's stored number."
                  : "Now sort the words by those numbers."
                : ignore
                  ? "Case ignored: a and A count as the same letter."
                  : "Sorted by code: smallest number first.";
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <p className={s.ruler}>{locked ? " " : RULER}</p>
                <div className={s.line}>
                  <span className={s.rl}>{locked ? "" : "first"}</span>
                  <div className={s.tiles}>
                    {order.map((w) => {
                      const shown = !locked && read.includes(w);
                      return (
                        <Control
                          key={w}
                          className={`${s.tile} ${shown ? "active" : ""}`}
                          disabled={locked || shown}
                          aria-label={shown ? `${w}: ${w[0]} is ${code(w)}` : `Show the code of ${w[0]} in ${w}`}
                          onClick={() => tap(w)}
                        >
                          <span className={s.word}>{w}</span>
                          <span className={s.code}>{shown ? `${w[0]} = ${code(w)}` : "tap"}</span>
                        </Control>
                      );
                    })}
                  </div>
                  <span className={s.rl}>{locked ? "" : "last"}</span>
                </div>
                <p className={s.faint} aria-label={faint ? `${faint.label}: ${faint.words.join(", ")}` : undefined}>
                  {faint ? (
                    <>
                      <span className={s.fl}>{faint.label}:</span> {faint.words.join(" · ")}
                    </>
                  ) : (
                    " "
                  )}
                </p>
                <div className={s.controls}>
                  <Control className={sorted ? "active" : ""} disabled={locked || sorted} onClick={sort}>
                    {sorted ? "Sorted by code" : "Sort by code"}
                  </Control>
                  <Control
                    className={ignore ? "active" : ""}
                    disabled={locked || !sorted}
                    aria-pressed={ignore}
                    onClick={toggle}
                  >
                    Ignore case: {ignore ? "on" : "off"}
                  </Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
