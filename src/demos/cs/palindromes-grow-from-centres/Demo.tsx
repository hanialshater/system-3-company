"use client";

// Counting palindromic substrings by growing each centre outward. A string of n letters has 2n - 1
// centres (n letters, n - 1 gaps). From each, two fingers step outward while the letters under them
// match; every step that matches is one more palindrome. "aaaa": centres give 1, 1, 2, 2, 2, 1, 1 = 10,
// the same as testing all 10 substrings.
//
// v2 (wave E r6): in "aaaa" the mirror never breaks, so the lesson's payoff (a centre stops when the
// letters differ, and a substring whose middle failed is never tested) could only be told. Now each
// centre button grows the same centre in two aligned words: "aaaa" (the question) and "abaa" (one
// letter changed). In "abaa" three centres stop at a red mismatch and the whole word is never
// tested, because its middle "ba" failed. A tested-substrings readout makes that countable. The
// centre buttons keep their labels; per-centre counts are drawn under each word.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const WORD = "aaaa";
const ALT = "abaa"; // one letter changed, same length so the centres line up

type Grown = { spans: [number, number][]; fail: [number, number] | null };

/** Palindromes grown from centre k (0..2n-2): even k is a letter, odd k the gap after letter (k-1)/2. */
function grow(w: string, k: number): Grown {
  let l = Math.floor(k / 2);
  let r = l + (k % 2);
  const spans: [number, number][] = [];
  while (l >= 0 && r < w.length && w[l] === w[r]) {
    spans.push([l, r]);
    l--;
    r++;
  }
  return { spans, fail: l >= 0 && r < w.length ? [l, r] : null };
}
const CENTRES = 2 * WORD.length - 1;
const SUBSTRINGS = (WORD.length * (WORD.length + 1)) / 2;
const PER = Array.from({ length: CENTRES }, (_, k) => grow(WORD, k));
const PER_ALT = Array.from({ length: CENTRES }, (_, k) => grow(ALT, k));
const tested = (g: Grown) => g.spans.length + (g.fail ? 1 : 0); // substrings the fingers looked at
// The whole of ALT is never tested: the candidate centred on its middle failed first.
const MID = WORD.length - 1; // the middle centre (a gap for even n)
const MID_FAIL = PER_ALT[MID].fail; // [1, 2] -> "ba"

const COL = 50; // viewBox column per centre; letters sit on even columns
const cx = (k: number) => COL / 2 + k * COL;
const ROW = 104; // viewBox height per word block

export default function PalindromesFromCentres({ slug }: { slug: string }) {
  const [done, setDone] = useState<number[]>([]); // centres tapped, in order
  const [sel, setSel] = useState<number | null>(null);

  const found = done.reduce((a, k) => a + PER[k].spans.length, 0);
  const foundAlt = done.reduce((a, k) => a + PER_ALT[k].spans.length, 0);
  const testedAlt = done.reduce((a, k) => a + tested(PER_ALT[k]), 0);
  const failsAlt = done.filter((k) => PER_ALT[k].fail).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `How many palindromic substrings (read the same backwards; each start and end position counted separately) does "${WORD}" have?`,
        options: ["4", "7", "10"],
        answer: 2,
      }}
      exploreHint={`Tap each centre, a letter or a gap. It grows in "${WORD}" and in "${ALT}" at once.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You grew all {CENTRES} centres of &quot;{WORD}&quot;: {PER.map((p) => p.spans.length).join(" + ")} ={" "}
            {found}. All {SUBSTRINGS} of its substrings are palindromes, and each was found once, from its own middle.
          </p>
          <p>
            Change one letter and the mirrors break. In &quot;{ALT}&quot; the same {CENTRES} centres found {foundAlt}, and {failsAlt}{" "}
            stopped at a red mismatch. The fingers looked at {testedAlt} of its {SUBSTRINGS} substrings: &quot;{ALT}&quot; itself was
            never tested, because its middle, &quot;{MID_FAIL ? ALT.slice(MID_FAIL[0], MID_FAIL[1] + 1) : ""}&quot;, had already failed.
          </p>
          <p>
            {WORD.length} letters and {WORD.length - 1} gaps give {CENTRES} centres: 2n − 1.
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
            const g = sel === null ? null : PER[sel];
            const ga = sel === null ? null : PER_ALT[sel];
            const note =
              sel === null || !g || !ga
                ? "Tap a centre: a letter or a gap."
                : `${WORD}: ${g.spans.length}, ${g.fail ? "letters differ" : "word ends"}. ${ALT}: ${ga.spans.length}, ${ga.fail ? "letters differ" : "word ends"}.`;

            const block = (w: string, per: Grown[], top: number) => {
              const cur = sel === null ? null : per[sel];
              const inSpan = (i: number) => !!cur && cur.spans.some(([l, r]) => i >= l && i <= r);
              const bracket = (l: number, r: number, j: number, bad: boolean) => {
                const y = top + 56 + j * 13;
                return (
                  <path
                    key={`b${j}`}
                    d={`M${cx(2 * l) - 20} ${y - 7} V${y} H${cx(2 * r) + 20} V${y - 7}`}
                    fill="none"
                    stroke={bad ? "var(--bad)" : "var(--good)"}
                    strokeWidth={2.5}
                    strokeDasharray={bad ? "4 3" : undefined}
                  />
                );
              };
              return (
                <g>
                  {[...w].map((ch, i) => (
                    <g key={i}>
                      <rect
                        x={cx(2 * i) - 20}
                        y={top + 6}
                        width={40}
                        height={40}
                        rx={8}
                        fill={inSpan(i) ? "var(--domain)" : "var(--bg-2)"}
                        stroke={inSpan(i) ? "var(--domain)" : "var(--fg)"}
                        strokeWidth={1.5}
                      />
                      <text x={cx(2 * i)} y={top + 34} textAnchor="middle" className={inSpan(i) ? s.chOn : s.ch}>
                        {ch}
                      </text>
                    </g>
                  ))}
                  {sel !== null && (
                    <line x1={cx(sel)} y1={top + 2} x2={cx(sel)} y2={top + 50} stroke="var(--fg)" strokeWidth={2} strokeDasharray="3 3" />
                  )}
                  {cur && cur.spans.map(([l, r], j) => bracket(l, r, j, false))}
                  {cur && cur.fail && bracket(cur.fail[0], cur.fail[1], cur.spans.length, true)}
                  {done.map((k) => (
                    <text key={`n${k}`} x={cx(k)} y={top + 100} textAnchor="middle" className={per[k].fail ? s.cntBad : s.cnt}>
                      +{per[k].spans.length}
                    </text>
                  ))}
                </g>
              );
            };

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox={`0 0 ${CENTRES * COL} ${2 * ROW + 4}`} className="stage-svg" role="img" aria-label={note}>
                  {block(WORD, PER, 0)}
                  <line x1={0} x2={CENTRES * COL} y1={ROW + 2} y2={ROW + 2} stroke="var(--line)" />
                  {block(ALT, PER_ALT, ROW + 2)}
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
                      {k % 2 ? "|" : "•"}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Readout label="Centres grown" value={`${done.length} / ${CENTRES}`} />
                  <Readout label={`${WORD} found`} value={found} />
                  <Readout label={`${ALT} found`} value={foundAlt} />
                  <Readout label={`${ALT} tested`} value={`${testedAlt} / ${SUBSTRINGS}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

