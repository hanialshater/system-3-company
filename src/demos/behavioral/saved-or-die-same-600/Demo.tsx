"use client";

// Gain-loss framing (brief 4, company/domains/briefs/behavioral.md §4; numbers and every reveal branch:
// node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs). One outbreak expected to kill 600,
// two programmes said two ways. Row 1 (saved wording): A | B. Row 2 (die wording): C | D, rendered from the
// start but disabled under the cover "Answer the first wording" until row 1 is answered (QA counts the
// controls once, so all five exist from the first render: A, B, C, D, toggle). The toggle "Say both in the
// same words" swaps C's and D's text, in place, for A's and B's texts word for word (the brief's declared
// restatements); the bars and the learner's marks stay. Each option is one bar of 600 cells per outcome,
// filled = alive. C has exactly A's outcomes and D has B's, so any rule that judges outcomes picks A with C
// or B with D. The toggle is enabled once both rows are answered; turning it on the first time fixes both
// choices (the reveal reads the choices made in the original wordings), after which it toggles freely.
// At the reveal everything freezes and the toggle is forced on, so the "same words" picture is on screen.
// Stage text is only: caption, key, cover, toggle label and the declared stimulus (no option letters, no
// wording headings; bar legends are numerals only). No randomness. No EV, no 50/50 bet, no ratio (B0, B1, P0).

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Saved = "A" | "B";
type Lost = "C" | "D";
type Opt = Saved | Lost;

// The one held type (d) sentence (claim c5). Rule 6 of the brief file: it ships cut until the fact-checker
// opens its source and a dated type (d) statement covers it; it stays in meta.json as unverified.
const HELD_LINE = false;
const HELD = "Re-run in 2020 with 88,181 people in 47 countries, the wording shifted choices; how much varied by country.";

const MILESTONES = ["saved", "die", "same"] as const;

// Declared stimulus, word for word (brief 4, "Stage word budget and declared stimulus").
const TEXT: Record<Opt, string> = {
  A: "200 people will be saved",
  B: "a 1-in-3 chance all 600 are saved, a 2-in-3 chance nobody is",
  C: "400 people will die",
  D: "a 1-in-3 chance nobody dies, a 2-in-3 chance all 600 die",
};
// Toggle restatements, shown in place of C and D (A's and B's texts exactly).
const RESTATE: Record<Lost, string> = { C: TEXT.A, D: TEXT.B };

// Outcomes: one bar per outcome, alive out of 600. Legends are numerals only: in the saved wording the
// bar names its lives ("200", "600"); in the die wording it names its deaths ("400", "600").
interface Bar {
  chance: string | null; // "1/3", "2/3", or null for a sure outcome
  alive: number;
}
const BARS: Record<Opt, Bar[]> = {
  A: [{ chance: null, alive: 200 }],
  B: [
    { chance: "1/3", alive: 600 },
    { chance: "2/3", alive: 0 },
  ],
  C: [{ chance: null, alive: 200 }],
  D: [
    { chance: "1/3", alive: 600 },
    { chance: "2/3", alive: 0 },
  ],
};

// 600 cells: 60 columns of 10, filled column by column, so 200 alive is exactly the first 20 columns.
const COLS = 60;
const ROWS = 10;
const P = 3; // cell pitch in viewBox units
const W = COLS * P;
const H = ROWS * P;

function CellBar({ alive }: { alive: number }) {
  const id = useId().replace(/:/g, "");
  const aliveW = (alive / ROWS) * P;
  return (
    <svg className={s.bar} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={`on${id}`} width={P} height={P} patternUnits="userSpaceOnUse">
          <rect x={0.35} y={0.35} width={P - 0.7} height={P - 0.7} className={s.cellOn} />
        </pattern>
        <pattern id={`off${id}`} width={P} height={P} patternUnits="userSpaceOnUse">
          <rect x={0.6} y={0.6} width={P - 1.2} height={P - 1.2} className={s.cellOff} />
        </pattern>
      </defs>
      {aliveW > 0 && <rect x={0} y={0} width={aliveW} height={H} fill={`url(#on${id})`} />}
      {aliveW < W && <rect x={aliveW} y={0} width={W - aliveW} height={H} fill={`url(#off${id})`} />}
    </svg>
  );
}

function legend(b: Bar, saved: boolean): string {
  if (saved) return b.alive > 0 ? String(b.alive) : "";
  const dead = 600 - b.alive;
  return dead > 0 ? String(dead) : "";
}

function describe(b: Bar) {
  const lead = b.chance ? `${b.chance} chance: ` : "for sure: ";
  return `${lead}${b.alive} of 600 live`;
}

// Reveal branches, copied from the check script (all four print there in full).
const CHOSE_SAVED: Record<Saved, string> = { A: "the sure 200 saved", B: "the 1-in-3 chance to save all 600" };
const CHOSE_LOST: Record<Lost, string> = { C: "the sure 400 die", D: "the 1-in-3 chance that nobody dies" };
const SAME = "In the same words, 400 sure to die is 200 sure to be saved, and the two chances are one chance.";
const FITS = "You answered the same offer the same way twice: a model that judges outcomes fits both of your choices.";
const AD =
  "No model that judges only outcomes fits both of your choices: the wording moved you. Sure for gains, gamble for losses: that pattern is called a framing effect.";
const BC =
  "No model that judges only outcomes fits both of your choices: the wording moved you, the reverse of the pattern called a framing effect.";
const STOPS = "Where it stops: you saw both wordings back to back.";

function revealParas(a: Saved, b: Lost): [string, string] {
  const first = `You chose ${CHOSE_SAVED[a]}, then ${CHOSE_LOST[b]}. ${SAME}`;
  const consistent = (a === "A" && b === "C") || (a === "B" && b === "D");
  let second = consistent ? FITS : a === "A" ? AD : BC;
  if (HELD_LINE) second += ` ${HELD}`;
  return [first, second];
}

export default function SavedOrDieSame600({ slug }: { slug: string }) {
  const [saved, setSaved] = useState<Saved | null>(null);
  const [lost, setLost] = useState<Lost | null>(null);
  const [same, setSame] = useState(false);
  const [fixed, setFixed] = useState(false); // choices fixed once the toggle has been turned on

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Judged by outcomes, not wording: someone picks the sure 200 saved. In the 'die' wording, which must they pick?",
        options: ["The sure 400 die", "The 1-in-3 chance nobody dies", "Either: the two wordings are different offers"],
        answer: 0,
      }}
      exploreHint="Pick one in each wording, then say both in the same words."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const [p1, p2] = revealParas(saved ?? "A", lost ?? "C");
        return (
          <>
            <p>{p1}</p>
            <p>{p2}</p>
            <p className="muted">{STOPS}</p>
          </>
        );
      }}
    >
      {({ locked, phase, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const frozen = locked || phase === "reveal";
            const on = same || phase === "reveal";
            const covered = saved === null;

            const option = (o: Opt) => {
              const isSaved = o === "A" || o === "B";
              const chosen = isSaved ? saved === o : lost === o;
              const restated = !isSaved && on;
              const text = restated ? RESTATE[o as Lost] : TEXT[o];
              const sayAsSaved = isSaved || restated;
              const hidden = !isSaved && covered;
              const disabled = frozen || fixed || hidden;
              return (
                <Control
                  key={o}
                  className={`${s.opt} ${chosen ? `active ${s.chosen}` : ""} ${hidden ? s.hidden : ""}`}
                  disabled={disabled}
                  aria-pressed={chosen}
                  aria-label={hidden ? "Hidden until the first wording is answered" : `${text}. ${BARS[o].map(describe).join("; ")}`}
                  onClick={() => {
                    if (isSaved) {
                      setSaved(o as Saved);
                      reach("saved");
                    } else {
                      setLost(o as Lost);
                      reach("die");
                    }
                  }}
                >
                  <span className={s.optHead}>
                    <span className={s.optText}>{text}</span>
                    <span className={s.tick} aria-hidden="true">
                      {chosen ? "✓" : ""}
                    </span>
                  </span>
                  <span className={s.bars}>
                    {BARS[o].map((b, i) => (
                      <span key={i} className={s.barRow}>
                        {b.chance && <span className={s.chance}>{b.chance}</span>}
                        <CellBar alive={b.alive} />
                        <span className={`${s.count} ${sayAsSaved ? s.countSaved : s.countDie}`}>{legend(b, sayAsSaved)}</span>
                      </span>
                    ))}
                  </span>
                </Control>
              );
            };

            return (
              <div className={s.wrap}>
                <p className={s.caption}>
                  An outbreak is expected to kill 600 people. Pick a programme.{" "}
                  <span className={s.key}>
                    <span className={s.keySw} aria-hidden="true" /> = alive
                  </span>
                </p>
                <div className={s.row} role="group" aria-label="First wording">
                  {option("A")}
                  {option("B")}
                </div>
                <div className={`${s.row} ${s.row2}`} role="group" aria-label="Second wording">
                  {option("C")}
                  {option("D")}
                  {covered && <p className={s.cover}>Answer the first wording</p>}
                </div>
                <Control
                  className={`${s.toggle} ${on ? "active" : ""}`}
                  disabled={frozen || saved === null || lost === null}
                  aria-pressed={on}
                  onClick={() => {
                    const next = !same;
                    setSame(next);
                    if (next) {
                      setFixed(true);
                      reach("same");
                    }
                  }}
                >
                  {on ? "✓ " : ""}Say both in the same words
                </Control>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
