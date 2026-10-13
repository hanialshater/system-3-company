"use client";

// A 10-bit Bloom filter. Each word always points at the same 3 bits (a fixed table here, standing in
// for the hash functions). Adding a word lights its bits; asking about a word checks them: any dark
// bit means "No" (certain), all lit means "Maybe". eel was never added, but cat and dog lit all of
// its bits, so the filter says Maybe. One picture: the strip of 10 bits, each marked with who lit it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const M = 10;
const BITS: Record<string, number[]> = {
  cat: [1, 4, 7],
  dog: [2, 4, 8],
  eel: [1, 2, 7],
  fox: [0, 4, 9],
};
const ADDABLE = ["cat", "dog"];
// Query order on the stage: a true member, a word with a dark bit, then the question's eel (key state last).
const ASKABLE = ["cat", "fox", "eel"];
const lit = (added: string[]) => new Set(added.flatMap((w) => BITS[w]));
const answer = (added: string[], w: string) => (BITS[w].every((b) => lit(added).has(b)) ? "Maybe" : "No");
const EEL_FULL = answer(ADDABLE, "eel"); // "Maybe"
const FOX_FULL = answer(ADDABLE, "fox"); // "No"
const FOX_DARK = BITS.fox.filter((b) => !lit(ADDABLE).has(b));
const whoLit = (b: number, added: string[]) => added.filter((w) => BITS[w].includes(b));
const list = (xs: number[]) => xs.join(", ");
const bitsWord = (xs: number[]) => (xs.length === 1 ? `bit ${xs[0]} was` : `bits ${list(xs)} were`);

export default function BloomMaybeYes({ slug }: { slug: string }) {
  const [added, setAdded] = useState<string[]>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [seenFox, setSeenFox] = useState(false);

  const on = lit(added);
  const q = query ? { w: query, bits: BITS[query], says: answer(added, query) } : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${M}-bit filter. Adding 'cat' lights bits ${list(BITS.cat)}; adding 'dog' lights ${list(
          BITS.dog,
        )}. 'eel' was never added; it would use bits ${list(BITS.eel)}. Asked about eel, what does the filter say?`,
        options: ["Definitely not added", "Maybe added", "Definitely added"],
        answer: EEL_FULL === "Maybe" ? 1 : 0,
      }}
      exploreHint="Add both words, then ask about each word and watch which bits it checks."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Eel was never added, yet its bits {list(BITS.eel)} were all lit: {list(BITS.eel.filter((b) => BITS.cat.includes(b)))}{" "}
            by cat, {list(BITS.eel.filter((b) => !BITS.cat.includes(b)))} by dog. The filter only sees lit bits, so it said{" "}
            <strong>{EEL_FULL}</strong>.
            {seenFox
              ? ` Fox's ${bitsWord(FOX_DARK)} dark, and a dark bit means no added word ever lit it, so that ${FOX_FULL} was certain.`
              : ""}
          </p>
          <p>
            A No is always certain; a Maybe can be wrong. That one-sided doubt is the price of remembering many words in
            a few bits. This is a Bloom filter.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["eel-maybe", "seen-no"]}>
          {(reach) => {
            const add = (w: string) => {
              if (locked || added.includes(w)) return;
              setAdded([...added, w]);
              setQuery(null);
            };
            const ask = (w: string) => {
              if (locked) return;
              setQuery(w);
              const says = answer(added, w);
              if (w === "fox") setSeenFox(says === "No");
              if (w === "eel" && says === "Maybe" && added.length > 0) reach("eel-maybe");
              if (says === "No" && added.length > 0) reach("seen-no");
            };
            const msg = locked
              ? "Make a prediction to start."
              : q
                ? q.says === "Maybe"
                  ? `${q.w}? Bits ${list(q.bits)} all lit: Maybe.`
                  : `${q.w}? ${q.bits.filter((b) => !on.has(b)).length === 1 ? "Bit" : "Bits"} ${list(q.bits.filter((b) => !on.has(b)))} dark: No.`
                : "Each word always points at the same 3 bits.";
            return (
              <div className={s.wrap}>
                <p className={`${s.msg} ${q?.says === "No" ? s.no : ""}`} aria-live="polite">
                  {msg}
                </p>
                <div className={s.strip} aria-label={`Lit bits: ${[...on].sort((a, b) => a - b).join(", ") || "none"}`}>
                  {Array.from({ length: M }, (_, b) => {
                    const checked = !!q && q.bits.includes(b);
                    return (
                      <div key={b} className={`${s.bit} ${on.has(b) ? s.on : ""} ${checked ? (on.has(b) ? s.hit : s.miss) : ""}`}>
                        <span className={s.val}>{on.has(b) ? 1 : 0}</span>
                        <span className={s.idx}>{b}</span>
                        <span className={s.who}>
                          {whoLit(b, added).map((w) => (
                            <span key={w}>{w}</span>
                          ))}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Row>
                  {ADDABLE.map((w) => (
                    <Control key={w} disabled={locked || added.includes(w)} className={added.includes(w) ? "active" : ""} onClick={() => add(w)}>
                      {added.includes(w) ? `Added ${w}` : `Add ${w}`}
                    </Control>
                  ))}
                </Row>
                <Row>
                  {ASKABLE.map((w) => (
                    <Control key={w} disabled={locked || query === w} className={query === w ? "active" : ""} onClick={() => ask(w)}>
                      Ask {w}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
