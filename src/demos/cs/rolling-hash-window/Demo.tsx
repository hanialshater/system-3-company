"use client";

// A window of 5 letters slides along a text. The window hash is the sum of letter values (A=1 ... F=6). Each slide
// updates it by one subtraction and one addition instead of adding all 5 letters again. A window whose sum equals the
// pattern's is only a flag: the letters still have to be checked (EBCDA is a false flag; ABCDE is the match).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const TEXT = "EBCDAFFABCDE";
const PATTERN = "ABCDE";
const K = PATTERN.length;
const W = TEXT.length - K + 1; // 8 windows
const val = (c: string) => c.charCodeAt(0) - 64;
const sumOf = (t: string) => [...t].reduce((a, c) => a + val(c), 0);
const PSUM = sumOf(PATTERN);
const SUMS = Array.from({ length: W }, (_, i) => sumOf(TEXT.slice(i, i + K)));
const win = (i: number) => TEXT.slice(i, i + K);

type Checks = Record<number, { ok: boolean; at: number }>;

const TX = 14;
const TW = 26;
const xOf = (c: number) => TX + c * TW;

export default function RollingHashWindow({ slug }: { slug: string }) {
  const [i, setI] = useState(0);
  const [checks, setChecks] = useState<Checks>({});

  const rolling = K + 2 * i;
  const readd = K * (i + 1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Window hash = sum of letter values (A = 1, B = 2 …). The window is 5 letters wide. Sliding it one letter along, how many letters must you add up again?",
        options: ["All 5 in the window", "None: subtract the one that left, add the one that arrived", "About half of them"],
        answer: 1,
      }}
      exploreHint="Check the flagged window, then slide the window to the end of the text."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You slid the window {i} times. Each slide touched two letters: one out, one in. Sliding read <strong>{rolling}</strong>{" "}
            letters in all; adding every window up again would have read <strong>{readd}</strong>.
          </p>
          <p>
            {checks[0] && !checks[0].ok ? <>EBCDA summed to 15 too, but checking the letters caught it (E is not A). </> : null}
            {checks[i]?.ok ? <>ABCDE flagged at the end, and checking its letters confirmed the match. </> : <>ABCDE flagged at the end. </>}
            The sum cannot tell one order of letters from another, so equal sums still need a check.
          </p>
          <p className="muted">An updatable hash makes each slide cost the same, however long the pattern is.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["false-flag-checked", "second-flag"]}>
          {(reach) => {
            const sum = SUMS[i];
            const flagged = sum === PSUM;
            const chk = checks[i];
            const atEnd = i === W - 1;
            const blocked = flagged && !chk; // a flag must be checked before moving on
            const leave = i > 0 ? TEXT[i - 1] : null;
            const arrive = i > 0 ? TEXT[i + K - 1] : null;

            const check = () => {
              if (locked || !flagged || chk) return;
              const w = win(i);
              let m = 0;
              while (m < K && w[m] === PATTERN[m]) m++;
              const ok = m === K;
              setChecks({ ...checks, [i]: { ok, at: ok ? K : m + 1 } });
              if (!ok) reach("false-flag-checked");
            };
            const slide = () => {
              if (locked || atEnd || blocked) return;
              setI(i + 1);
              if (i + 1 === W - 1) reach("second-flag");
            };
            const toEnd = () => {
              if (locked || atEnd || blocked) return;
              setI(W - 1);
              reach("second-flag");
            };

            const msg = locked
              ? `Window ${win(0)}: sum ${SUMS[0]} · pattern ${PSUM}`
              : i === 0
                ? `Window ${win(0)}: sum ${sum} · pattern ${PSUM}`
                : `${SUMS[i - 1]} − ${val(leave!)} + ${val(arrive!)} = ${sum}`;
            const flagMsg = !flagged
              ? "No flag: the sum differs from the pattern's."
              : !chk
                ? `Flag: the sum equals ${PSUM}. Check the letters.`
                : chk.ok
                  ? `${win(i)} = ${PATTERN}: all ${K} letters match.`
                  : `${win(i)[chk.at - 1]} ≠ ${PATTERN[chk.at - 1]} at letter ${chk.at}: false flag.`;

            return (
              <div className={s.wrap}>
                <p className={s.model}>Toy hash: A=1 B=2 … F=6. Window hash = sum. Pattern ABCDE = 15.</p>
                <p className={`${s.msg} ${chk?.ok ? s.good : ""}`} aria-live="polite">
                  {msg}
                </p>
                <svg
                  viewBox="0 0 340 74"
                  className="stage-svg"
                  role="img"
                  aria-label={`Window ${win(i)}, sum ${sum}${flagged ? (chk ? (chk.ok ? ", match" : ", false flag") : ", flag") : ""}`}
                >
                  {[...TEXT].map((c, k) => {
                    const inside = k >= i && k < i + K;
                    return (
                      <g key={k}>
                        <rect
                          x={xOf(k) + 1}
                          y={20}
                          width={TW - 2}
                          height={26}
                          rx={4}
                          fill={inside ? "var(--bg-2)" : "none"}
                          stroke="var(--line)"
                          opacity={inside ? 1 : 0.55}
                        />
                        <text x={xOf(k) + TW / 2} y={38} textAnchor="middle" className={s.letter} opacity={inside ? 1 : 0.55}>
                          {c}
                        </text>
                        <text x={xOf(k) + TW / 2} y={59} textAnchor="middle" className={s.val}>
                          {val(c)}
                        </text>
                      </g>
                    );
                  })}
                  <rect
                    x={xOf(i)}
                    y={17}
                    width={K * TW}
                    height={32}
                    rx={5}
                    fill="none"
                    stroke={chk ? (chk.ok ? "var(--good)" : "var(--bad)") : "var(--fg)"}
                    strokeWidth={3}
                  />
                  {!locked && leave && (
                    <text x={xOf(i - 1) + TW / 2} y={12} textAnchor="middle" className={s.chipOut}>
                      −{val(leave)}
                    </text>
                  )}
                  {!locked && arrive && (
                    <text x={xOf(i + K - 1) + TW / 2} y={12} textAnchor="middle" className={s.chipIn}>
                      +{val(arrive)}
                    </text>
                  )}
                </svg>
                <p className={s.hist}>Sums: {SUMS.map((v, k) => (k <= i ? v : "·")).join(" ")}</p>
                <p className={`${s.flag} ${chk ? (chk.ok ? s.good : s.bad) : ""}`}>{locked ? "" : flagMsg}</p>
                <Row>
                  <Control className={s.btn} disabled={locked || !flagged || !!chk} onClick={check}>
                    Check letters
                  </Control>
                  <Control className={s.btn} disabled={locked || atEnd || blocked} onClick={slide}>
                    Slide
                  </Control>
                  <Control className={s.btn} disabled={locked || atEnd || blocked} onClick={toEnd}>
                    Slide to end
                  </Control>
                </Row>
                <p className={s.count}>
                  Letters added up: sliding {rolling} · adding each window again {readd}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
