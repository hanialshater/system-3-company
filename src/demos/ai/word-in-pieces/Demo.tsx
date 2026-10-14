"use client";

// Toy tokenizer: a vocabulary of three multi-letter pieces (un, happi, ness) plus every single
// letter. Greedy longest match from the left: at each position take the longest piece that fits.
// unhappiness -> un | happi | ness (3); with the three pieces off -> 11 letters; zyxxy -> 5 letters.
// Deterministic (no randomness).

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
        question: `A token is one piece of text that a model reads as a unit. A tokenizer has the pieces un, happi, ness and every single letter. It always takes the longest piece that fits. How many tokens is '${WORDS[0]}'?`,
        options: [String(Q_NONE), String(Q_ALL), "1"],
        answer: 1,
      }}
      exploreHint="Switch pieces off and watch the word re-split. Then try a rare word."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            With all three pieces on, &lsquo;{WORDS[0]}&rsquo; split into {tokenize(WORDS[0], PIECES).join(" | ")}:{" "}
            {Q_ALL} tokens. {sawNone ? `With the pieces off you watched it fall apart into ${Q_NONE} single letters.` : ""}{" "}
            {sawRare ? `'${WORDS[1]}' matched no piece and cost ${RARE}.` : ""}
          </p>
          <p>
            A model built on a tokenizer like this does not receive the word or its letters. It receives a row of piece
            numbers. A common chunk costs one; a rare string falls into many. Real tokenizers learn their piece lists from
            large amounts of text, so frequent chunks get pieces.
          </p>
          <p>What a model &ldquo;reads&rdquo; depends on its piece list, not on the word you see.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
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
            const W = 300;
            const n = tokens.length;
            const gap = 3;
            const unit = (W - gap * (n - 1)) / word.length;
            let x = 10;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy tokenizer · made-up piece numbers</span>
                <p className={s.caption}>Pieces in the list (plus every single letter):</p>
                <Row>
                  {PIECES.map((p) => (
                    <Control
                      key={p}
                      className={on[p] ? "active" : ""}
                      aria-pressed={on[p]}
                      disabled={locked}
                      onClick={() => toggle(p)}
                    >
                      {on[p] ? `✓ ${p}` : `✗ ${p}`}
                    </Control>
                  ))}
                </Row>
                <svg viewBox="0 0 320 110" className="stage-svg" role="img" aria-label={locked ? word : `${word}: ${tokens.join(" | ")}`}>
                  {locked ? (
                    <text x={160} y={62} textAnchor="middle" className={s.big} fill="var(--fg)">
                      {word}
                    </text>
                  ) : (
                    tokens.map((t, i) => {
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
                <Row>
                  {WORDS.map((w) => (
                    <Control key={w} className={word === w ? "active" : ""} disabled={locked || word === w} onClick={() => pick(w)}>
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
