"use client";

// Four cards, one rule: "if a card shows a vowel, its back is even". Cards E, K, 4, 7.
// Every card has a letter on one side and a number on the other; the possible backs are 4 or 7 for a
// letter card and A or K for a number card (brief check D1). Tapping a card shows both possible backs
// under it, each tagged "breaks" (red outline plus the word) or "fine".
// Milestones: the 4 inspected (the tempting card, no back breaks it), and all four inspected.
// Inspected cards keep a tick and the readout keeps the cards that could break the rule, so Reset (which
// hides the backs) cannot erase what the reveal quotes.
// Brief: company/domains/briefs/math.discrete.md, Wave J, brief 1 (check D1).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const CARDS = ["E", "K", "4", "7"] as const; // DOM order from the brief
type Face = (typeof CARDS)[number];
const MILESTONES = ["four", "all"] as const;

const isLetter = (x: string) => /[A-Z]/.test(x);
const isVowel = (x: string) => "AEIOU".includes(x);
const isEven = (x: string) => Number(x) % 2 === 0;
/** The two backs a card could have: a number for a letter card, a letter for a number card. */
const backsOf = (f: string) => (isLetter(f) ? ["4", "7"] : ["A", "K"]);
/** A card breaks "if vowel, then even" only if it has a vowel on one side and an odd number on the other. */
const breaks = (front: string, back: string) => {
  const letter = isLetter(front) ? front : back;
  const num = isLetter(front) ? back : front;
  return isVowel(letter) && !isEven(num);
};
const canBreak = (f: string) => backsOf(f).some((b) => breaks(f, b));

type Seen = { inspected: Face[] };

export default function FourCardsOneRule({ slug }: { slug: string }) {
  const [open, setOpen] = useState<Face[]>([]);
  const seen = useRef<Seen>({ inspected: [] });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You're handed four cards. Each has a letter on one side and a number on the other. Rule: if a card shows a vowel, its back is even. You see E, K, 4, 7. Which must you turn to test it?",
        options: ["E and 4", "E and 7", "E only", "All four"],
        answer: 1,
      }}
      exploreHint="Tap each card to see what could be on its back."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Only two cards could hide a back that breaks the rule: E, with a 7 behind it, and 7, with a vowel behind
            it. The 4 could not break it whatever its back, because the rule never says even numbers need vowels;
            turning it can only agree.
          </p>
          <p>
            A rule &lsquo;if P then Q&rsquo; fails only when P is true and Q is false, so you test it by looking for
            that case.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} open={open} setOpen={setOpen} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({
  phase,
  locked,
  interact,
  open,
  setOpen,
  seen,
}: StageContext & { open: Face[]; setOpen: (v: Face[]) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);

  const inspect = (f: Face) => {
    setOpen([...open, f]);
    if (!seen.inspected.includes(f)) seen.inspected.push(f);
    if (f === "4") reach("four");
    if (CARDS.every((c) => seen.inspected.includes(c))) reach("all");
  };

  // At the reveal, every card the learner inspected shows its backs again, so the cards the reveal names
  // (E with a 7 behind it, 7 with a vowel behind it, the 4) are on the stage even after Reset.
  const shown = phase === "reveal" ? seen.inspected : open;
  const breakers = CARDS.filter((c) => seen.inspected.includes(c) && canBreak(c));
  const readout = `Could break the rule: ${breakers.length ? breakers.join(", ") : "?"}`;

  return (
    <div className={s.wrap}>
      <p className={s.readout} aria-live="polite">
        {readout}
      </p>
      <div className={s.grid}>
        {CARDS.map((f) => {
          const isOpen = shown.includes(f);
          const was = seen.inspected.includes(f);
          return (
            <div key={f} className={s.col}>
              <Control
                disabled={locked || isOpen}
                className={`${s.card} ${isOpen ? "active" : ""}`}
                aria-pressed={isOpen}
                aria-label={`Card ${f}`}
                onClick={() => inspect(f)}
              >
                <span className={s.face}>{f}</span>
                <span className={s.tick} aria-hidden>
                  {was ? "✓" : " "}
                </span>
              </Control>
              <div className={s.backs}>
                {isOpen &&
                  backsOf(f).map((b) => {
                    const br = breaks(f, b);
                    return (
                      <div key={b} className={`${s.back} ${br ? s.bad : ""}`}>
                        <span className={s.backFace}>{b}</span>
                        <span className={s.tag}>{br ? "breaks" : "fine"}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      <Row>
        <Control disabled={locked || open.length === 0 || phase === "reveal"} className={s.tap} onClick={() => setOpen([])}>
          Reset
        </Control>
      </Row>
    </div>
  );
}
