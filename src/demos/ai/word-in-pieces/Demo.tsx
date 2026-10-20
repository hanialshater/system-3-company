"use client";

// Toy tokenizer: a vocabulary of three multi-letter pieces (un, happi, ness) plus every single
// letter. Greedy longest match from the left: at each position take the longest piece that fits.
// unhappiness -> un | happi | ness (3); with the three pieces off -> 11 letters; zyxxy -> 5 letters.
// Deterministic (no randomness). A record line under the boxes keeps each count the learner
// has seen (11 letters -> 3 tokens, 11 letters -> 11 with no pieces, zyxxy 5 letters -> 5), so the
// common-vs-rare contrast is on the stage; in the reveal the stage returns to the 3-token split.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const PIECES = ["un", "happi", "ness"] as const;
const WORDS = ["unhappiness", "zyxxy"] as const;
/** Greedy longest match; single letters are always in the vocabulary. */
function tokenize(word: string, pieces: readonly string[]) {
  const out: string[] = [];
  let i = 0;
  while (i < word.length) {
    let best = word[i];
    for (const p of pieces) if (p.length > best.length && word.startsWith(p, i)) best = p;
    out.push(best);
    i += best.length;
  }
  return out;
}
const PIECE_ID: Record<string, number> = { un: 412, happi: 7031, ness: 1297 };
// Illustrative ids: made up for the toy. Letters get 1 to 26.
const idOf = (t: string) => PIECE_ID[t] ?? t.charCodeAt(0) - 96;
const Q_ALL = tokenize(WORDS[0], PIECES).length; // 3
const Q_NONE = tokenize(WORDS[0], []).length; // 11
const RARE = tokenize(WORDS[1], PIECES).length; // 5
// MODEL END

export default function WordInPieces({ slug }: { slug: string }) {
  const [on, setOn] = useState<Record<string, boolean>>({ un: true, happi: true, ness: true });
  const [word, setWord] = useState<string>(WORDS[0]);
  const [sawNone, setSawNone] = useState(false);
  const [sawRare, setSawRare] = useState(false);

  const vocab = PIECES.filter((p) => on[p]);
  const tokens = tokenize(word, vocab);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Before a chatbot reads your message, a tokenizer cuts it into tokens: pieces it reads as units. Its list has un, happi, ness and every single letter, and it always takes the longest piece that fits. How many tokens is '${WORDS[0]}'?`,
        options: [String(Q_NONE), String(Q_ALL), "1"],
        answer: 1,
      }}
      exploreHint="Switch pieces off and watch the word re-split. Then try a rare word."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The stage is back to the start: with all three pieces on, &lsquo;{WORDS[0]}&rsquo; splits into{" "}
            {tokenize(WORDS[0], PIECES).join(" | ")}: {Q_ALL} tokens. {sawNone ? `With the pieces off you watched it fall apart into ${Q_NONE} single letters.` : ""}{" "}
            {sawRare ? `'${WORDS[1]}' matched no piece and cost ${RARE}.` : ""}
          </p>
          <p>
            Look at your record under the boxes: {WORDS[0].length} letters cost {Q_ALL} tokens, but {WORDS[1].length}{" "}
            letters of &lsquo;{WORDS[1]}&rsquo; cost {RARE}. A chunk in the list costs one; a string with no piece falls into
            single letters. A model built on a tokenizer like this does not receive the word, only the row of piece numbers. Real tokenizers learn
            their piece lists from large amounts of text, so frequent chunks get pieces.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={["pieces-off", "rare-word"]}>
          {(reach) => {
            const toggle = (p: string) => {
              const next = { ...on, [p]: !on[p] };
              setOn(next);
              const n = tokenize(word, PIECES.filter((q) => next[q])).length;
              if (word === WORDS[0] && n === Q_NONE) {
                setSawNone(true);
                reach("pieces-off");
              }
            };
            const pick = (w: string) => {
              setWord(w);
              if (w === WORDS[1]) {
                setSawRare(true);
                reach("rare-word");
              }
              if (w === WORDS[0] && tokenize(w, vocab).length === Q_NONE) {
                setSawNone(true);
                reach("pieces-off");
              }
            };
            // In the reveal the stage shows the answer state again: unhappiness, all pieces on.
            const done = phase === "reveal";
            const shownWord = done ? WORDS[0] : word;
            const shownTokens = done ? tokenize(WORDS[0], PIECES) : tokens;
            const off = locked || done;
            const W = 300;
            const n = shownTokens.length;
            const gap = 3;
            const unit = (W - gap * (n - 1)) / shownWord.length;
            const record = [
              `${WORDS[0].length} letters, all pieces: ${Q_ALL}`,
              sawNone ? `no pieces: ${Q_NONE}` : null,
              sawRare ? `${WORDS[1]}, ${WORDS[1].length} letters: ${RARE}` : null,
            ].filter(Boolean);
            let x = 10;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy tokenizer · made-up piece numbers</span>
                <p className={s.caption}>Pieces in the list (plus every single letter):</p>
                <Row>
                  {PIECES.map((p) => (
                    <Control
                      key={p}
                      className={done || on[p] ? "active" : ""}
                      aria-pressed={done || on[p]}
                      disabled={off}
                      onClick={() => toggle(p)}
                    >
                      {done || on[p] ? `✓ ${p}` : `✗ ${p}`}
                    </Control>
                  ))}
                </Row>
                <svg viewBox="0 0 320 110" className="stage-svg" role="img" aria-label={locked ? shownWord : `${shownWord}: ${shownTokens.join(" | ")}`}>
                  {locked ? (
                    <text x={160} y={62} textAnchor="middle" className={s.big} fill="var(--fg)">
                      {shownWord}
                    </text>
                  ) : (
                    shownTokens.map((t, i) => {
                      const w = unit * t.length;
                      const x0 = x;
                      x += w + gap;
                      const multi = t.length > 1;
                      return (
                        <g key={`${i}-${t}`}>
                          <rect
                            x={x0}
                            y={32}
                            width={w}
                            height={44}
                            rx={6}
                            fill={multi ? "color-mix(in srgb, var(--domain) 30%, transparent)" : "var(--bg-2)"}
                            stroke={multi ? "var(--domain)" : "var(--line)"}
                            strokeWidth={1.5}
                          />
                          <text x={x0 + w / 2} y={60} textAnchor="middle" className={s.label} fill="var(--fg)">
                            {t}
                          </text>
                          <text x={x0 + w / 2} y={92} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                            #{idOf(t)}
                          </text>
                        </g>
                      );
                    })
                  )}
                </svg>
                <p className={s.caption} aria-live="polite">
                  {locked ? "" : `Tokens seen · ${record.join(" · ")}`}
                </p>
                <Row>
                  {WORDS.map((w) => (
                    <Control key={w} className={shownWord === w ? "active" : ""} disabled={off || word === w} onClick={() => pick(w)}>
                      {w}
                    </Control>
                  ))}
                  <Readout label="Tokens" value={locked ? "–" : n} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
