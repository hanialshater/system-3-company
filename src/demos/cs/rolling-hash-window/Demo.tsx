"use client";

// A window of 5 letters slides along a text. The window hash is the sum of letter values (A=1 ... F=6). Each slide
// updates it by one subtraction and one addition instead of adding all 5 letters again. A window whose sum equals the
// pattern's is only a flag: the letters still have to be checked (EBCDA is a false flag; ABCDE is the match).
// v3: the text starts FEBCD (no flag), so the first action is a slide; the false flag EBCDA is window 2. The four
// letters both windows share are bracketed "kept" on a slide, so "only the ends change" is on the stage. The
// letter counter is hidden until the prediction is locked, and "Slide to end" reports the per-slide cost.
// v4 (W-1353): the long slide is "Slide to next flag". It stops at the next flagged window that has not been checked
// (window 2 from the start, then window 9), as a rolling-hash search does; before this it skipped the false flag and the
// reveal could never unlock.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const TEXT = "FEBCDAFFABCDE";
const PATTERN = "ABCDE";
const K = PATTERN.length;
const W = TEXT.length - K + 1; // 9 windows
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
  const [jump, setJump] = useState(0); // slides taken by the last "Slide to next flag"

  const rolling = K + 2 * i;
  const readd = K * (i + 1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Window hash = sum of letter values (A = 1, B = 2 …). The window is 5 letters wide. Sliding it one letter along, how many letter values must you use to get the new sum?",
        options: ["All 5", "Just 2", "About 3"],
        answer: 1,
      }}
      exploreHint="Slide the window one letter, check the window it flags, then slide to the end."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You slid the window {i} times. Each slide used two letters, the one marked − and the one marked +; the {K - 1} letters
            marked &quot;kept&quot; were already in the sum. Sliding read <strong>{rolling}</strong> letters in all; adding every window up
            again would have read <strong>{readd}</strong>.
          </p>
          <p>
            {checks[1] && !checks[1].ok ? <>EBCDA summed to 15 too, but checking the letters caught it (E is not A). </> : null}
            {checks[i]?.ok ? <>ABCDE flagged at the end, and checking its letters confirmed the match. </> : <>ABCDE flagged at the end. </>}
            The sum cannot tell one order of letters from another, so equal sums still need a check.
          </p>
          <p className="muted">
            Only the two end letters change, so a wider window would still cost 2 per slide: an updatable hash makes each slide cost
            the same, however long the pattern is.
          </p>
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
              setJump(0);
              setI(i + 1);
              if (i + 1 === W - 1) reach("second-flag");
            };
            // Slide to the next window that is flagged and not yet checked (the last window if none is).
            const toNextFlag = () => {
              if (locked || atEnd || blocked) return;
              let j = i + 1;
              while (j < W - 1 && !(SUMS[j] === PSUM && !checks[j])) j++;
              setJump(j - i);
              setI(j);
              if (j === W - 1) reach("second-flag");
            };

            const msg = locked
              ? `Window ${win(0)}: sum ${SUMS[0]} · pattern ${PSUM}`
              : i === 0
                ? `Window ${win(0)}: sum ${sum} · pattern ${PSUM}`
                : jump > 1
                  ? `${jump} slides × 2 letters. Last: ${SUMS[i - 1]} − ${val(leave!)} + ${val(arrive!)} = ${sum}`
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
                  viewBox="0 0 360 86"
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
                  {!locked && i > 0 && (
                    <g>
                      <path
                        d={`M ${xOf(i) + 3} 66 v 4 H ${xOf(i + K - 1) - 3} v -4`}
                        fill="none"
                        stroke="var(--muted)"
                        strokeWidth={1.5}
                      />
                      <text x={(xOf(i) + xOf(i + K - 1)) / 2} y={82} textAnchor="middle" className={s.val}>
                        kept: already in the sum
                      </text>
                    </g>
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
                  <Control className={s.btn} disabled={locked || atEnd || blocked} onClick={slide}>
                    Slide
                  </Control>
                  <Control className={s.btn} disabled={locked || !flagged || !!chk} onClick={check}>
                    Check letters
                  </Control>
                  <Control className={s.btn} disabled={locked || atEnd || blocked} onClick={toNextFlag}>
                    Slide to next flag
                  </Control>
                </Row>
                <p className={s.count}>{locked ? "" : `Letters used: sliding ${rolling} · adding each window again ${readd}`}</p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
