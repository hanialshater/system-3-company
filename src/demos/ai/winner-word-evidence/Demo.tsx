"use client";

// Naive-Bayes evidence toy: 100 emails. Spam share s (10..50%, step 10). 'winner' appears in 60% of spam
// and 10% of real mail, so with-word counts are 0.6s spam and 0.1(100 - s) real (integers at every step).
// At s = 10: 6 spam and 9 real contain 'winner', P(spam | winner) = 6/15 = 40%. s = 20: 60%, 30: 72%,
// 40: 80%, 50: 85.7%. Rates are invented. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const TOTAL = 100;
const IN_SPAM = 0.6;
const IN_REAL = 0.1;
const SHARE_Q = 10;
const counts = (share: number) => {
  const spam = share;
  const real = TOTAL - share;
  const spamWord = Math.round(IN_SPAM * spam);
  const realWord = Math.round(IN_REAL * real);
  return { spam, real, spamWord, realWord, post: (100 * spamWord) / (spamWord + realWord) };
};
const AT_Q = counts(SHARE_Q); // 6, 9, 40%
// MODEL END

const pc = (v: number) => `${Math.round(v)}%`;

export default function WinnerWordEvidence({ slug }: { slug: string }) {
  const [share, setShare] = useState(SHARE_Q);
  const [seen, setSeen] = useState<number[]>([SHARE_Q]);
  const [hl, setHl] = useState(false);
  const c = counts(share);
  const top = Math.max(...seen);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In your inbox, ${SHARE_Q}% of emails are spam. The word 'winner' appears in ${IN_SPAM * 100}% of spam and ${IN_REAL * 100}% of real mail. A new email contains 'winner'. What is the chance it is spam?`,
        options: [pc(AT_Q.post), `${IN_SPAM * 100}%`, "About 90%"],
        answer: 0,
      }}
      exploreHint="Show the emails with 'winner', then change how much mail is spam."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At {SHARE_Q}% spam, &apos;winner&apos; was in {AT_Q.spamWord} spam and {AT_Q.realWord} real emails: {AT_Q.spamWord} of{" "}
            {AT_Q.spamWord + AT_Q.realWord} = {pc(AT_Q.post)}. The word is {Math.round(IN_SPAM / IN_REAL)} times likelier in spam, but real mail
            outnumbered spam {Math.round(AT_Q.real / AT_Q.spam)} to 1.
          </p>
          {top > SHARE_Q && (
            <p>
              At {top}% spam the same word meant {pc(counts(top).post)}.
            </p>
          )}
          <p>
            A word shifts the odds; how common spam is to begin with still matters. Naive Bayes spam filters combine both this way.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["highlight-at-question", "changed-share"]}>
          {(reach) => {
            // order: spam with word, spam without, real with word, real without
            const kinds = [
              ...Array.from({ length: c.spamWord }, () => ({ spam: true, word: true })),
              ...Array.from({ length: c.spam - c.spamWord }, () => ({ spam: true, word: false })),
              ...Array.from({ length: c.realWord }, () => ({ spam: false, word: true })),
              ...Array.from({ length: c.real - c.realWord }, () => ({ spam: false, word: false })),
            ];
            const show = !locked && hl;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Invented rates · 100 emails</span>
                <p className={s.caption}>Filled dot = spam, hollow = real. Ring = contains &apos;winner&apos;.</p>
                <svg viewBox="58 0 204 196" className="stage-svg" role="img" aria-label={`${share}% spam`}>
                  {kinds.map((k, i) => {
                    const col = i % 10;
                    const row = Math.floor(i / 10);
                    const cx = 70 + col * 19;
                    const cy = 12 + row * 19;
                    const faded = show && !k.word;
                    return (
                      <g key={i} opacity={faded ? 0.18 : 1}>
                        <circle cx={cx} cy={cy} r={6} fill={k.spam ? "var(--bad)" : "var(--bg-2)"} stroke={k.spam ? "var(--bad)" : "var(--muted)"} strokeWidth={1.5} />
                        {show && k.word && <circle cx={cx} cy={cy} r={8.5} fill="none" stroke="var(--fg)" strokeWidth={2} />}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control
                    className={hl ? "active" : ""}
                    disabled={locked}
                    onClick={() => {
                      const on = !hl;
                      setHl(on);
                      if (on && share === SHARE_Q) reach("highlight-at-question");
                    }}
                  >
                    {hl ? "Show all emails" : "Show emails with 'winner'"}
                  </Control>
                </Row>
                <Row>
                  <Slider
                    label="Share of mail that is spam"
                    value={share}
                    min={10}
                    max={50}
                    step={10}
                    disabled={locked}
                    format={(v) => `${v}%`}
                    onChange={(v) => {
                      setShare(v);
                      setSeen((xs) => (xs.includes(v) ? xs : [...xs, v]));
                      reach("changed-share");
                      if (hl && v === SHARE_Q) reach("highlight-at-question");
                    }}
                  />
                </Row>
                <Row>
                  <Readout label="With 'winner'" value={show ? `${c.spamWord} spam, ${c.realWord} real` : "–"} />
                  <Readout label="Chance it's spam" value={show ? pc(c.post) : "–"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
