"use client";

// UTF-8 is variable width. The learner appends characters from a small palette; each character
// shows the byte boxes UTF-8 stores for it, in hex. c, a, f take one byte each, é takes two
// (C3 A9), 世 three, 😀 four. Spelling café gives 4 characters and 5 bytes. Bytes are computed
// with TextEncoder, the same encoder the browser uses, so the stage and the text cannot disagree.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PALETTE = ["c", "a", "f", "é", "世", "😀"];
const WORD = "café";
const MAX_BYTES = 12;
const enc = new TextEncoder();
const bytesOf = (ch: string) => Array.from(enc.encode(ch));
const hex = (b: number) => b.toString(16).toUpperCase().padStart(2, "0");
const hexOf = (ch: string) => bytesOf(ch).map(hex).join(" ");
const byteCount = (chars: string[]) => chars.reduce((n, ch) => n + bytesOf(ch).length, 0);
const WORD_CHARS = Array.from(WORD);
const WORD_BYTES = byteCount(WORD_CHARS); // 5
const ACCENT = "é";
const CJK = "世";
const EMOJI = "😀";

export default function CafeIsFiveBytes({ slug }: { slug: string }) {
  const [chars, setChars] = useState<string[]>([]);
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const used = byteCount(chars);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `The word ${WORD} has ${WORD_CHARS.length} characters. Stored as UTF-8, a common way to save text, how many bytes does it take?`,
        options: [String(WORD_CHARS.length), String(WORD_BYTES), String(WORD_CHARS.length * 2)],
        answer: 1,
      }}
      exploreHint={`Spell ${WORD}, then add ${CJK} and ${EMOJI}.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You spelled {WORD}: {WORD_CHARS.length} characters, <strong>{WORD_BYTES} bytes</strong>. c, a and f took
            one byte each, the same codes as ASCII. {ACCENT} took two ({hexOf(ACCENT)}).
            {seen[CJK] ? ` ${CJK} took three (${hexOf(CJK)}).` : ""}
            {seen[EMOJI] ? ` ${EMOJI} took four (${hexOf(EMOJI)}).` : ""}
          </p>
          <p>
            UTF-8 gives the plain English letters one byte and other characters two, three or four. So counting bytes
            and counting characters give different answers.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["word", "four-byte"]}>
          {(reach) => {
            const add = (ch: string) => {
              if (locked || used + bytesOf(ch).length > MAX_BYTES) return;
              const next = [...chars, ch];
              setChars(next);
              setSeen((x) => ({ ...x, [ch]: true }));
              if (next.join("") === WORD) reach("word");
              if (bytesOf(ch).length === 4) reach("four-byte");
            };
            const del = () => {
              if (locked || chars.length === 0) return;
              setChars(chars.slice(0, -1));
            };
            const last = chars[chars.length - 1];
            const msg = locked
              ? "Make a prediction to start."
              : chars.length === 0
                ? "Tap characters to spell a word. Each box is one byte."
                : chars.join("") === WORD
                  ? `${WORD}: ${chars.length} characters, ${used} bytes.`
                  : `${last} takes ${bytesOf(last).length} byte${bytesOf(last).length > 1 ? "s" : ""}: ${hexOf(last)}.`;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.text} aria-label={`Text: ${chars.join("") || "empty"}`}>
                  {chars.length === 0 && <span className={s.empty}>empty</span>}
                  {chars.map((ch, i) => (
                    <div key={i} className={`${s.char} ${bytesOf(ch).length > 1 ? s.multi : ""}`}>
                      <span className={s.glyph}>{ch}</span>
                      <span className={s.bytes}>
                        {bytesOf(ch).map((b, j) => (
                          <span key={j} className={s.byte}>{hex(b)}</span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
                <Row>
                  <Readout label="Characters" value={locked ? "–" : chars.length} />
                  <Readout label="Bytes" value={locked ? "–" : `${used} of ${MAX_BYTES}`} />
                </Row>
                <div className={s.pad}>
                  <Control className={s.del} aria-label="Delete last character" disabled={locked || chars.length === 0} onClick={del}>
                    ⌫
                  </Control>
                  {PALETTE.map((ch) => (
                    <Control key={ch} className={s.key} aria-label={`Add ${ch}`}
                      disabled={locked || used + bytesOf(ch).length > MAX_BYTES} onClick={() => add(ch)}>
                      {ch}
                    </Control>
                  ))}
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
