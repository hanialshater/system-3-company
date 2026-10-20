"use client";

// Precision/recall threshold. Ten emails with spam scores; mail at or above the threshold
// is flagged. At 0.50: 4 of 5 spam caught, 1 real email flagged. At 0.25: 5 of 5 caught,
// 3 real flagged. The scores overlap, so no threshold catches all spam and flags no real
// mail: every threshold trades one mistake for the other.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
// Scores in hundredths so comparisons are exact.
const SPAM = [90, 80, 70, 50, 30];
const REAL = [60, 40, 30, 20, 10];

function counts(t: number) {
  const caught = SPAM.filter((x) => x >= t).length;
  const falseFlags = REAL.filter((x) => x >= t).length;
  return { caught, falseFlags, precision: caught + falseFlags ? caught / (caught + falseFlags) : 1, recall: caught / SPAM.length };
}
// MODEL END

const L = 22;
const R = 304;
const px = (h: number) => L + (h / 100) * (R - L);
const SPAM_Y = 52;
const REAL_Y = 112;
const f2 = (h: number) => (h / 100).toFixed(2);

export default function SpamThresholdTradeoff({ slug }: { slug: string }) {
  const [t, setT] = useState(50);
  const c = counts(t);
  const base = counts(50);

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    const dc = c.caught - base.caught;
    const df = c.falseFlags - base.falseFlags;
    if (dc === 0 && df === 0) return "Same as 0.50.";
    if (dc > 0 && df > 0) return "More spam caught, and more real mail flagged.";
    if (dc < 0 && df < 0) return "Fewer false alarms, but more spam gets through.";
    if (dc < 0) return "More spam gets through, no fewer false alarms.";
    return "More false alarms, no extra spam caught.";
  };

  const dot = (h: number, cy: number, spam: boolean, i: number) => {
    const on = h >= t;
    return (
      <g key={`${spam ? "s" : "r"}${i}`} opacity={on ? 1 : 0.4}>
        <circle cx={px(h)} cy={cy} r={11} fill={spam ? "var(--bad)" : "var(--good)"} />
        {on && <circle cx={px(h)} cy={cy} r={14.5} fill="none" stroke="var(--fg)" strokeWidth={2} />}
        <text x={px(h)} y={cy + 4} textAnchor="middle" className={s.dotText} fill="#0d0f14">
          {(h / 100).toFixed(1).replace(/^0/, "")}
        </text>
      </g>
    );
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your inbox filter scores ten emails: spam 0.9, 0.8, 0.7, 0.5, 0.3; real mail 0.6, 0.4, 0.3, 0.2, 0.1. Flagging 0.5 or more catches 4 of 5 spam and flags 1 real email. You lower the threshold to 0.25. How many real emails get flagged?",
        options: ["Still 1", "2", "3"],
        answer: 2,
      }}
      exploreHint="Try 0.25, then 0.65, or drag the slider."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At 0.50: {base.caught} of 5 spam caught, {base.falseFlags} real email flagged. At 0.25:{" "}
            <strong>all {counts(25).caught} spam caught</strong>, but <strong>{counts(25).falseFlags} real emails</strong>{" "}
            flagged. The last spam (0.3) scores below real mail at 0.6 and 0.4 and level with one at 0.3, so you cannot reach it without flagging
            them. Raise the threshold to 0.65 and no real mail is flagged, but 2 spam get through.
          </p>
          <p>
            The scores overlap, so no threshold here is perfect. Each one buys catches with false alarms. Choosing it
            means deciding which mistake costs more, a scam in the inbox or a lost real email.
          </p>
          <p className="muted">
            Recall (spam caught ÷ all spam) went 4/5 → 5/5; precision (spam ÷ all flagged) went 4/5 → 5/8.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["low-0.25", "high-0.65"]}>
        {(reach) => {
          const go = (v: number) => {
            setT(v);
            if (v <= 25) reach("low-0.25");
            if (v >= 65) reach("high-0.65");
          };
          return (
        <div className={s.wrap}>
          <svg viewBox="0 0 320 168" className="stage-svg" role="img" aria-label={`Threshold ${f2(t)}: ${c.caught} spam caught, ${c.falseFlags} real flagged`}>
            <rect x={px(t)} y={18} width={R + 10 - px(t)} height={122} fill="var(--domain)" opacity={0.12} />
            <text x={R + 10} y={14} textAnchor="end" className={s.small} fill="var(--domain)">
              flagged →
            </text>
            <text x={L - 12} y={SPAM_Y - 18} className={s.small} fill="var(--bad)">
              spam
            </text>
            <text x={L - 12} y={REAL_Y - 18} className={s.small} fill="var(--good)">
              real mail
            </text>
            <line x1={L} y1={SPAM_Y} x2={R} y2={SPAM_Y} stroke="var(--line)" />
            <line x1={L} y1={REAL_Y} x2={R} y2={REAL_Y} stroke="var(--line)" />
            <line x1={px(t)} y1={18} x2={px(t)} y2={140} stroke="var(--domain)" strokeWidth={3} />
            {SPAM.map((h, i) => dot(h, SPAM_Y, true, i))}
            {REAL.map((h, i) => dot(h, REAL_Y, false, i))}
            {[0, 50, 100].map((h) => (
              <text key={h} x={px(h)} y={156} textAnchor="middle" className={s.small} fill="var(--muted)">
                {f2(h)}
              </text>
            ))}
            <text x={px(t)} y={156} textAnchor="middle" className={s.small} fill="var(--domain)" opacity={t === 0 || t === 50 || t === 100 ? 0 : 1}>
              {f2(t)}
            </text>
          </svg>
          <p className={s.msg} aria-live="polite">
            {message(locked)}
          </p>
          <Row>
            <Control disabled={locked} onClick={() => go(25)}>
              Try 0.25
            </Control>
            <Control disabled={locked} onClick={() => go(65)}>
              Try 0.65
            </Control>
          </Row>
          <Slider
            label="Flag if score ≥"
            value={t}
            min={0}
            max={100}
            step={5}
            format={f2}
            disabled={locked}
            onChange={go}
          />
          <Row>
            <Readout label="Spam caught" value={`${c.caught} of 5`} />
            <Readout label="Real mail flagged" value={<span className={c.falseFlags ? s.bad : ""}>{`${c.falseFlags} of 5`}</span>} />
          </Row>
        </div>
          );
        }}
        </Milestones>
      )}
    </Lesson>
  );
}
