"use client";

// A one-word-memory language model (a bigram counter) trained on three sentences.
// The learner writes with it: each tap appends a word that followed the previous word
// in training, either chosen by hand from the count bars or sampled by the model.
// The payoff: "the dog sat on the mat" was never in the training text, yet every
// adjacent pair was, so the counts alone can write it. The reveal unlocks only when a
// sentence the stage marks as new is finished; the finished sentence shows each of its
// pairs with its training count, so the cause (seen pairs, unseen whole) is on the stage.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

// MODEL START
const CORPUS = ["the cat sat on the mat .", "the cat ate the fish .", "the dog sat on the rug ."];

/** next[word] = followers with counts, most frequent first, then alphabetical. */
function countPairs(lines: string[]) {
  const next: Record<string, Record<string, number>> = {};
  for (const line of lines) {
    const w = line.split(" ");
    for (let i = 0; i < w.length - 1; i++) {
      next[w[i]] = next[w[i]] ?? {};
      next[w[i]][w[i + 1]] = (next[w[i]][w[i + 1]] ?? 0) + 1;
    }
  }
  const sorted: Record<string, [string, number][]> = {};
  for (const [w, m] of Object.entries(next)) {
    sorted[w] = Object.entries(m).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }
  return sorted;
}
const NEXT = countPairs(CORPUS);

/** Append a word; a word whose only follower is "." ends the sentence. */
function append(words: string[], w: string) {
  const out = [...words, w];
  const after = NEXT[w] ?? [];
  if (after.length === 1 && after[0][0] === ".") out.push(".");
  return out;
}

// New = not a piece of the training text. A short run like "the mat ." sits inside a
// training sentence, so it is not new even though it is not a whole training sentence.
const isNew = (words: string[]) => {
  const run = " " + words.join(" ") + " ";
  return !CORPUS.some((line) => (" " + line + " ").includes(run));
};
/** Adjacent pairs of a finished sentence with their training counts. */
const pairsOf = (words: string[]) =>
  words.slice(0, -1).map((w, i) => {
    const n = words[i + 1];
    const c = (NEXT[w] ?? []).find(([x]) => x === n)?.[1] ?? 0;
    return { a: w, b: n, c };
  });
const END: [string, number][] = [[".", 1]]; // fallback: end the sentence
// MODEL END

function rng(seed: number) {
  let v = seed >>> 0;
  return () => {
    v = (Math.imul(v, 1664525) + 1013904223) >>> 0;
    return v / 4294967296;
  };
}

function sample(options: [string, number][], r: () => number) {
  const total = options.reduce((a, [, c]) => a + c, 0);
  let x = r() * total;
  for (const [w, c] of options) {
    x -= c;
    if (x < 0) return w;
  }
  return options[options.length - 1][0];
}

export default function NextWordTally({ slug }: { slug: string }) {
  const [words, setWords] = useState<string[]>(["the"]);
  const [made, setMade] = useState<string[]>([]);
  const rand = useRef(rng(7));

  const done = words[words.length - 1] === ".";
  const last = words[words.length - 1];
  const menu = done ? [] : (NEXT[last] ?? []);
  const total = menu.reduce((a, [, c]) => a + c, 0);
  const newOnes = made.filter((m) => isNew(m.split(" ")));
  const firstNew = newOnes[0];

  const finished = (next: string[], interact: () => void) => {
    setWords(next);
    if (next[next.length - 1] === ".") {
      setMade((m) => [...m, next.join(" ")]);
      if (isNew(next)) interact(); // the reveal waits for a finished sentence that is new
    }
  };
  const add = (w: string, interact: () => void) => finished(append(words, w), interact);
  /** The model keeps picking until the sentence ends (capped so a loop cannot run forever). */
  const finish = (interact: () => void) => {
    let next = words;
    for (let k = 0; k < 20 && next[next.length - 1] !== "."; k++) {
      next = append(next, sample(NEXT[next[next.length - 1]] ?? END, rand.current));
    }
    finished(next, interact);
  };

  const shown = words.filter((w) => w !== ".").join(" ");

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A model learns only which word follows which, from: “the cat sat on the mat. the cat ate the fish. the dog sat on the rug.” Can it write “the dog sat on the mat”?",
        options: ["No, it never saw that sentence", "Yes, it can assemble it from the counts", "Only after it sees more sentences"],
        answer: 1,
      }}
      exploreHint="Write a sentence the stage marks New. Try “the dog sat on the mat”."
      reveal={() => (
        <>
          <p>
            {firstNew ? (
              <>
                You made <strong>“{firstNew.replace(" .", ".")}”</strong>. That sentence is not in the training text,
                yet every pair under it on the stage had a count of at least 1.{" "}
              </>
            ) : null}
            Every word you could pick had followed the word before it in training. That is all the model stores: “the”
            was followed by cat twice and by mat, fish, dog and rug once each.
          </p>
          <p>
            “the dog sat on the mat” needs only dog→sat, sat→on, on→the and the→mat. Each pair is in the training
            text; the whole sentence is not. So yes: the counts assemble sentences nobody wrote, and the same counts make
            nonsense like “the cat sat on the cat ate the fish”.
          </p>
          <p className="muted">
            Large language models also write one token at a time, each drawn from probabilities for the next token. They
            look back over thousands of tokens, not one word.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <div className={s.sentence} aria-live="polite">
            <span>{shown}</span>
            {done ? <span className={s.stop}>.</span> : <span className={s.caret} aria-hidden />}
          </div>
          {done ? (
            <>
              <p className={`${s.verdict} ${isNew(words) ? s.fresh : s.copy}`}>
                {isNew(words) ? "New: not in the training text." : "Not new: it is a piece of the training text."}
              </p>
              <p className={s.after}>Pairs in training:</p>
              <ul className={s.pairs} aria-label="pairs in this sentence">
                {pairsOf(words).map((p, i) => (
                  <li key={i} className={s.pair}>
                    {p.a}→{p.b} <span className={s.count}>×{p.c}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className={s.after}>
                After “{last}”, training had:
              </p>
              <div className={s.menu}>
                {menu.map(([w, c]) => (
                  <Control
                    key={w}
                    className={s.bar}
                    disabled={locked}
                    aria-label={`${w}, seen ${c} time${c === 1 ? "" : "s"}`}
                    onClick={() => add(w, interact)}
                  >
                    <span className={s.fill} style={{ width: `${(100 * c) / total}%` }} aria-hidden />
                    <span className={s.word}>{w}</span>
                    <span className={s.count}>×{c}</span>
                  </Control>
                ))}
              </div>
            </>
          )}
          <Row>
            <Control
              disabled={locked || done}
              onClick={() => add(sample(menu, rand.current), interact)}
            >
              Let the model pick
            </Control>
            <Control disabled={locked || done} onClick={() => finish(interact)}>
              Let it finish
            </Control>
            <Control disabled={locked || words.length === 1} onClick={() => setWords(["the"])}>
              Start over
            </Control>
            {newOnes.length > 0 && <span className={s.tally}>new sentences: {newOnes.length}</span>}
          </Row>
        </div>
      )}
    </Lesson>
  );
}
