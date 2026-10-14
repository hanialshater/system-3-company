"use client";

// Counting palindromic substrings by growing each centre outward. A string of n letters has 2n - 1
// centres (n letters, n - 1 gaps). From each, two fingers step outward while the letters under them
// match; every step that matches is one more palindrome. "aaaa": centres give 1, 1, 2, 2, 2, 1, 1 = 10,
// the same as testing all 10 substrings. One representation: the word, with one bracket per palindrome
// found from the chosen centre.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const WORD = "aaaa";

/** Palindromes grown from centre k (0..2n-2): even k is a letter, odd k the gap after letter (k-1)/2. */
function grow(w: string, k: number) {
  let l = Math.floor(k / 2);
  let r = l + (k % 2);
  const spans: [number, number][] = [];
  while (l >= 0 && r < w.length && w[l] === w[r]) {
    spans.push([l, r]);
    l--;
    r++;
  }
  return spans;
}
const brute = (w: string) => {
  let c = 0;
  for (let i = 0; i < w.length; i++) for (let j = i + 1; j <= w.length; j++) if ([...w.slice(i, j)].reverse().join("") === w.slice(i, j)) c++;
  return c;
};
const CENTRES = 2 * WORD.length - 1;
const PER = Array.from({ length: CENTRES }, (_, k) => grow(WORD, k));
const TOTAL = PER.reduce((a, p) => a + p.length, 0);
const SUBSTRINGS = (WORD.length * (WORD.length + 1)) / 2;
const RACECAR = { n: 7, subs: 28, pal: brute("racecar") };

const COL = 50; // viewBox column per centre; letters sit on even columns
const cx = (k: number) => COL / 2 + k * COL;

export default function PalindromesFromCentres({ slug }: { slug: string }) {
  const [done, setDone] = useState<number[]>([]); // centres tapped, in order
  const [sel, setSel] = useState<number | null>(null);

  const found = done.reduce((a, k) => a + PER[k].length, 0);
  const spans: [number, number][] = sel === null ? [] : PER[sel];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `How many palindromic substrings (read the same backwards; each start and end position counted separately) does "${WORD}" have?`,
        options: ["4", "7", "10"],
        answer: 2,
      }}
      exploreHint="Tap each centre, a letter or a gap between two letters, and watch it grow."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You grew all {CENTRES} centres: {PER.map((p) => p.length).join(" + ")} = {TOTAL}. Every one of the {SUBSTRINGS}{" "}
            substrings of &quot;{WORD}&quot; is a palindrome, and each was found exactly once, from its own middle.
          </p>
          <p>
            A palindrome is a mirrored stretch around a centre. A string of n letters has 2n − 1 centres (n letters and n − 1
            gaps), and each grows until the letters stop matching or the word ends, so you never test a substring whose middle already failed.
            &quot;racecar&quot; has {RACECAR.subs} substrings but only {RACECAR.pal} palindromes. Manacher&apos;s algorithm reuses the
            mirror to make the whole count linear.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-centre", "all-centres"]}>
          {(reach) => {
            const tap = (k: number) => {
              if (locked) return;
              setSel(k);
              if (!done.includes(k)) {
                const next = [...done, k];
                setDone(next);
                reach("first-centre");
                if (next.length === CENTRES) reach("all-centres");
              }
            };
            const last = spans[spans.length - 1];
            const hitEnd = !last || last[0] === 0 || last[1] === WORD.length - 1;
            const note =
              sel === null
                ? "Tap a centre: a letter or a gap."
                : `${sel % 2 ? "Gap" : "Letter"} centre: ${spans.length} palindrome${spans.length === 1 ? "" : "s"}, then ${hitEnd ? "the word ends" : "the letters differ"}.`;
            const H = 70 + Math.max(...PER.map((p) => p.length)) * 18;

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox={`0 0 ${CENTRES * COL} ${H}`} className="stage-svg" role="img" aria-label={note}>
                  {[...WORD].map((ch, i) => {
                    const inSpan = spans.some(([l, r]) => i >= l && i <= r);
                    return (
                      <g key={i}>
                        <rect
                          x={cx(2 * i) - 22}
                          y={10}
                          width={44}
                          height={44}
                          rx={8}
                          fill={inSpan ? "var(--domain)" : "var(--bg-2)"}
                          stroke={inSpan ? "var(--domain)" : "var(--fg)"}
                          strokeWidth={1.5}
                        />
                        <text x={cx(2 * i)} y={40} textAnchor="middle" className={inSpan ? s.chOn : s.ch}>
                          {ch}
                        </text>
                      </g>
                    );
                  })}
                  {sel !== null && <line x1={cx(sel)} y1={4} x2={cx(sel)} y2={60} stroke="var(--fg)" strokeWidth={2} strokeDasharray="3 3" />}
                  {spans.map(([l, r], j) => {
                    const y = 70 + j * 18;
                    const x1 = cx(2 * l) - 20;
                    const x2 = cx(2 * r) + 20;
                    return (
                      <g key={j}>
                        <path d={`M${x1} ${y - 8} V${y} H${x2} V${y - 8}`} fill="none" stroke="var(--good)" strokeWidth={2.5} />
                      </g>
                    );
                  })}
                </svg>
                <div className={s.centres} style={{ gridTemplateColumns: `repeat(${CENTRES}, minmax(0, 1fr))` }}>
                  {Array.from({ length: CENTRES }, (_, k) => (
                    <Control
                      key={k}
                      disabled={locked}
                      onClick={() => tap(k)}
                      className={`${s.centre} ${k === sel ? "active" : ""}`}
                      aria-label={k % 2 ? `Gap between letters ${(k + 1) / 2} and ${(k + 3) / 2}` : `Letter ${k / 2 + 1}`}
                    >
                      {done.includes(k) ? `+${PER[k].length}` : k % 2 ? "|" : WORD[k / 2]}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Readout label="Centres grown" value={`${done.length} / ${CENTRES}`} />
                  <Readout label="Palindromes found" value={found} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
