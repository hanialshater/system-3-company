"use client";

// Grouping anagrams by a key: sort each word's letters alphabetically and drop the word into the
// bin with that key. Ten words give four keys: eilnst (4 words), eggloo (2), act (3), dgo (1).
// No word is ever compared with another word; each one is handled once.
// One representation: the word chips (each shows its key once tapped) feeding the bins below.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const WORDS = ["listen", "silent", "enlist", "tinsel", "google", "gogole", "cat", "act", "tac", "dog"];
const keyOf = (w: string) => [...w].sort().join("");

// bins in the order their keys first appear, for a given set of placed words (in tap order)
function binsFor(order: number[]) {
  const bins: { key: string; words: string[] }[] = [];
  for (const i of order) {
    const k = keyOf(WORDS[i]);
    const bin = bins.find((b) => b.key === k);
    if (bin) bin.words.push(WORDS[i]);
    else bins.push({ key: k, words: [WORDS[i]] });
  }
  return bins;
}
const ALL = binsFor(WORDS.map((_, i) => i));
const GROUPS = ALL.length; // 4
const PAIRS = (WORDS.length * (WORDS.length - 1)) / 2; // 45
const list = (xs: string[]) => xs.join(", ");

export default function SameLettersSameKey({ slug }: { slug: string }) {
  const [order, setOrder] = useState<number[]>([]);
  const bins = binsFor(order);
  const done = order.length === WORDS.length;
  const lastWord = order.length ? WORDS[order[order.length - 1]] : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Sorting word tiles for a puzzle: ${list(WORDS)}. You use each word's letters in alphabetical order as its key. How many groups do you get?`,
        options: ["3", String(GROUPS), "5"],
        answer: 1,
      }}
      exploreHint="Tap each word. Its letters sort into a key, and the word drops into that key's bin."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Ten words, one key each, {GROUPS} bins: {ALL.map((b) => `${b.key} (${b.words.length})`).join(", ")}. Dog sat alone.
            You never held two words side by side: each word went straight to the bin its key named.
          </p>
          <p>
            Two words are anagrams exactly when their sorted letters match, so the sorted letters are a key that makes the right
            words collide on purpose. Checking every pair would take {PAIRS} comparisons for these ten words; with a hash table
            keyed this way, one pass is enough.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-word", "all-placed"]}>
          {(reach) => {
            const place = (next: number[]) => {
              setOrder(next);
              reach("first-word");
              if (next.length === WORDS.length) reach("all-placed");
            };
            const tap = (i: number) => {
              if (locked || order.includes(i)) return;
              place([...order, i]);
            };
            const rest = () => {
              if (locked || done) return;
              place([...order, ...WORDS.map((_, i) => i).filter((i) => !order.includes(i))]);
            };
            const restart = () => {
              if (locked || order.length === 0) return;
              setOrder([]);
            };

            const note = lastWord
              ? `${lastWord} → ${keyOf(lastWord)}: into the ${keyOf(lastWord)} bin.`
              : "Tap a word to sort its letters into a key.";

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <div className={s.words}>
                  {WORDS.map((w, i) => {
                    const placed = order.includes(i);
                    return (
                      <Control
                        key={w}
                        className={placed ? "active" : ""}
                        disabled={locked || placed}
                        onClick={() => tap(i)}
                        aria-label={placed ? `${w}, key ${keyOf(w)}` : w}
                      >
                        {placed ? (
                          <>
                            <span className={s.faded}>{w}</span> <span className={s.key}>{keyOf(w)}</span>
                          </>
                        ) : (
                          w
                        )}
                      </Control>
                    );
                  })}
                </div>
                <div className={s.bins} aria-label={`${bins.length} bins`}>
                  {bins.length === 0 ? <p className={s.empty}>Bins appear here, one per key.</p> : null}
                  {bins.map((b) => (
                    <div key={b.key} className={`${s.bin} ${lastWord && keyOf(lastWord) === b.key ? s.binHot : ""}`}>
                      <span className={s.binKey}>
                        {b.key} · {b.words.length}
                      </span>
                      <span className={s.binWords}>{list(b.words)}</span>
                    </div>
                  ))}
                </div>
                <Row>
                  <Control disabled={locked || done} onClick={rest}>
                    Drop the rest
                  </Control>
                  <Control disabled={locked || order.length === 0} onClick={restart}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Words placed" value={`${order.length} / ${WORDS.length}`} />
                  <Readout label="Bins" value={bins.length} />
                  <Readout label="Word-to-word checks" value={0} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
