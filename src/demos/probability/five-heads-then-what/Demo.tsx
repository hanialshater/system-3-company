"use client";

// Gambler's fallacy. The learner flips a seeded fair coin and the stage catches every
// moment that follows five heads in a row, then shows what the very next flip was.
// The payoff: the column of "next flips" comes out about half heads. The coin has no memory.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { MAX_FLIPS, makeFlips, streakCases, tally } from "./model";
import s from "./styles.module.css";

const FLIPS = makeFlips();
const CASES = streakCases(FLIPS);
const NEED = 20; // runs of five heads the learner must catch before the reveal unlocks
const STRIP = 30;
const SHOW_CASES = 40;

export default function FiveHeads({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);
  const t = useMemo(() => tally(FLIPS, CASES, count), [count]);
  const recent = FLIPS.slice(Math.max(0, count - STRIP), count);
  const shownCases = useMemo(() => CASES.filter((i) => i < count).slice(-SHOW_CASES), [count]);
  let run = 0;
  for (let i = count - 1; i >= 0 && FLIPS[i]; i--) run++;

  const flip = (k: number, interact: () => void) => {
    const next = Math.min(MAX_FLIPS, count + k);
    setCount(next);
    if (tally(FLIPS, CASES, next).total >= NEED) interact();
  };

  const share = t.total ? Math.round((100 * t.heads) / t.total) : null;
  const status =
    count === 0
      ? "Flip the coin."
      : run >= 5
        ? `${run} heads in a row. The next flip counts.`
        : t.total < NEED
          ? `Runs of five heads caught: ${t.total} of ${NEED}.`
          : "After five heads, what came next?";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A friend's fair coin has just landed heads five times in a row, and they are about to flip again. How likely is heads on flip six?",
        options: ["Below 50%", "About 50%", "Above 50%"],
        answer: 1,
      }}
      exploreHint={`Flip until you have caught ${NEED} runs of five heads. Look at what came next.`}
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            In your {count.toLocaleString("en-US")} flips, five heads in a row happened {t.total} times. The next flip
            was heads {t.heads} times and tails {t.tails} times{share !== null ? ` (${share}% heads)` : ""}: about{" "}
            <strong>half</strong>, as it is for every flip.
          </p>
          <p>
            Each flip is a fresh 50/50, so a streak is never &ldquo;due&rdquo;
            to end. Your share sits off 50% only by chance, and it wobbles less the more runs you catch.
          </p>
          <p className="muted">
            Long runs still even out, but by dilution: thousands of new flips swamp five extra heads. Nothing pushes
            back.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox="0 0 360 214" className={`stage-svg ${s.svg}`} role="img" aria-label={`${count} flips; ${t.total} runs of five heads caught`}>
            <text x={4} y={12} className={s.label}>Last {STRIP} flips</text>
            {Array.from({ length: STRIP }, (_, i) => {
              const f = recent[i - (STRIP - recent.length)];
              const has = i >= STRIP - recent.length;
              const inRun = has && i >= STRIP - Math.min(run, STRIP);
              return (
                <g key={i}>
                  <circle cx={6 + i * 11.9} cy={30} r={5.3} className={!has ? s.slot : f ? (inRun ? s.headRun : s.head) : s.tail} />
                  {has && (
                    <text x={6 + i * 11.9} y={33} textAnchor="middle" className={`${s.stripLetter} ${f ? s.onHead : ""}`}>
                      {f ? "H" : "T"}
                    </text>
                  )}
                </g>
              );
            })}
            <text x={4} y={62} className={s.label}>Every run of five heads, and the flip after it</text>
            {Array.from({ length: SHOW_CASES }, (_, k) => {
              const i = shownCases[k];
              const col = k % 20;
              const rowY = k < 20 ? 74 : 146;
              const x = 9 + col * 17.8;
              if (i === undefined)
                return <rect key={k} x={x - 6} y={rowY} width={12} height={62} rx={3} className={s.emptyCase} />;
              const nextH = FLIPS[i];
              return (
                <g key={k}>
                  {[0, 1, 2, 3, 4].map((j) => (
                    <circle key={j} cx={x} cy={rowY + 4 + j * 8} r={3.2} className={s.head} />
                  ))}
                  <circle cx={x} cy={rowY + 54} r={6.5} className={nextH ? s.nextHead : s.nextTail} />
                  <text x={x} y={rowY + 57.5} textAnchor="middle" className={`${s.coinLetter} ${nextH ? s.onHead : ""}`}>
                    {nextH ? "H" : "T"}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className={s.msg} aria-live="polite">
            {locked ? "Make a prediction to start." : status}
          </p>

          <Row>
            <Control disabled={locked || count >= MAX_FLIPS} onClick={() => flip(1, interact)}>
              Flip 1
            </Control>
            <Control disabled={locked || count >= MAX_FLIPS} onClick={() => flip(100, interact)}>
              Flip 100
            </Control>
            <Control disabled={locked || count >= MAX_FLIPS} onClick={() => flip(1000, interact)}>
              Flip 1,000
            </Control>
            <Control disabled={locked || count >= MAX_FLIPS} onClick={() => flip(10000, interact)}>
              Flip 10,000
            </Control>
          </Row>
          <Row>
            <Readout label="Flips" value={count.toLocaleString("en-US")} />
            <Readout label="Next flip: heads" value={t.total ? `${t.heads}/${t.total}` : "—"} />
            <Readout label="Heads share" value={share === null ? "—" : `${share}%`} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
