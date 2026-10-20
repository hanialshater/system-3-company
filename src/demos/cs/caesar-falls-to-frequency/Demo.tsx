"use client";

// Caesar cipher broken by letter counts. The message was shifted forward by 19, so E became X.
// The learner turns a "shift back" dial; the text and its letter-count bars move together.
// When the tallest bar sits on E (shift 19) the message reads. One representation: the bars,
// with the text above them as the payoff.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const PLAIN = "MEET ME AT THE OLD BRIDGE AFTER SEVEN WHEN THE GUARDS CHANGE THEIR SHIFT KEEP THE LETTER HIDDEN UNTIL WE MEET THERE";
const KEY = 19;
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const shiftText = (t: string, k: number) =>
  t.replace(/[A-Z]/g, (ch) => ABC[(((ch.charCodeAt(0) - 65 + k) % 26) + 26) % 26]);
const CIPHER = shiftText(PLAIN, KEY);

function counts(t: string) {
  const c = Array(26).fill(0) as number[];
  for (const ch of t) if (ch >= "A" && ch <= "Z") c[ch.charCodeAt(0) - 65]++;
  return c;
}
const MAXC = Math.max(...counts(CIPHER));
// The shift that puts the cipher's most common letter on E.
const TOP = counts(CIPHER).indexOf(MAXC);
const MATCH = (TOP - 4 + 26) % 26;

const X0 = 7;
const W = 11.8;

export default function CaesarFallsToFrequency({ slug }: { slug: string }) {
  const [back, setBack] = useState(0); // how far the learner has shifted the text back
  const [tried, setTried] = useState<number[]>([]);

  const shown = shiftText(CIPHER, -back);
  const c = counts(shown);
  const read = back === KEY;
  const tallest = c.indexOf(MAXC);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You intercept a long English message encrypted with a Caesar shift (every letter moved the same number of places along the alphabet). Its most common letter is X. What is the shift most likely to be?",
        options: ["3", "19", "23"],
        answer: 1,
      }}
      exploreHint="Shift the letters back until the tallest bar sits on E."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {tried.length > 1 ? `You tried ${tried.length} shifts. ` : ""}
            At shift <strong>19</strong> the tallest bar landed on E and the message read: meet me at the old bridge.
          </p>
          <p>
            Shifting renames letters but keeps how often each appears. E is the most common letter in English, so the
            most common cipher letter is probably E in disguise. X is 19 places after E. There are only 25 shifts to try
            anyway, and the bars point at the right one first.
          </p>
          <p className="muted">Al-Kindi described this attack in the 9th century: a cipher that keeps patterns leaks its key.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (k: number) => {
          if (locked) return;
          const next = ((k % 26) + 26) % 26;
          setBack(next);
          setTried((t) => (t.includes(next) ? t : [...t, next]));
          if (next === KEY) interact();
        };
        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {locked
                ? "Make a prediction to start."
                : read
                  ? "Shift 19: the tallest bar is on E, and it reads."
                  : `Shift back ${back}. Tallest bar: ${ABC[tallest]}.`}
            </p>
            <p className={`${s.text} ${read ? s.good : ""}`} aria-label="The message at this shift">
              {shown}
            </p>
            <svg viewBox="0 0 320 132" className="stage-svg" role="img" aria-label={`Letter counts at shift ${back}`}>
              <rect x={X0 + 4 * W} y={4} width={W} height={112} rx={3} fill="color-mix(in srgb, var(--good) 14%, transparent)" stroke="var(--good)" strokeWidth={1} />
              <text x={X0 + 4 * W + W + 3} y={14} className={s.note}>
                E: most common in English
              </text>
              {c.map((n, i) => {
                const h = (n / MAXC) * 86;
                return (
                  <g key={i}>
                    <rect
                      x={X0 + i * W + 1.5}
                      y={104 - h}
                      width={W - 3}
                      height={h}
                      rx={1.5}
                      fill={n === MAXC ? (i === 4 ? "var(--good)" : "var(--warn)") : "var(--muted)"}
                    />
                    <text x={X0 + i * W + W / 2} y={114} textAnchor="middle" className={s.axis}>
                      {ABC[i]}
                    </text>
                  </g>
                );
              })}
              <text x={X0} y={128} className={s.axis}>
                letter count in the message above
              </text>
            </svg>
            <Row>
              <Control disabled={locked} aria-label="Shift back one less" onClick={() => go(back - 1)}>
                −1
              </Control>
              <Control disabled={locked} aria-label="Shift back one more" onClick={() => go(back + 1)}>
                +1
              </Control>
              <Control className="active" disabled={locked || back === MATCH} onClick={() => go(MATCH)}>
                Tallest bar to E
              </Control>
            </Row>
            <Slider label="Shift back" value={back} min={0} max={25} disabled={locked} onChange={go} />
          </div>
        );
      }}
    </Lesson>
  );
}
