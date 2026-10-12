"use client";

// The back button as a stack. History is a pile: Back steps down it, and visiting a
// new page after going back throws away everything above you. The payoff is that
// discard: after Back, Back, visit E, the old C and D are gone, so Back lands on B.
// One representation: the history pile.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const START = ["A", "B", "C", "D"];
const LETTERS = "ABCDEFGHIJKL";
const MAX = 8;

export default function BackButtonStack({ slug }: { slug: string }) {
  const [pages, setPages] = useState<string[]>(START); // the history pile, bottom first
  const [at, setAt] = useState(START.length - 1); // where you are in it
  const [made, setMade] = useState(START.length); // letters used so far
  const [gone, setGone] = useState<string[]>([]); // pages thrown away by the last visit
  const [note, setNote] = useState("");

  const fresh = at === START.length - 1 && pages.length === START.length && made === START.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You visit pages A, B, C, D in that order. You press Back twice, then visit a new page E. You press Back once. Where are you?",
        options: ["C", "B", "D"],
        answer: 1,
      }}
      exploreHint="Try the puzzle: Back, Back, visit a new page, Back."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            History is a pile of pages. Back steps down the pile; C and D wait above you in case you press Forward. But
            visiting E from B throws everything above B away and puts E on top: the pile is now A, B, E. So Back goes
            to <strong>B</strong>.
          </p>
          <p>
            A pile where the last thing added is the first you get back is a stack (last in, first out). A queue is
            the opposite, like a line at a till: first in, first out.
          </p>
          <p className="muted">Back means &quot;one step down the pile&quot;, not &quot;the page you saw before this one&quot;.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const back = () => {
          if (locked || at === 0) return;
          setAt(at - 1);
          setGone([]);
          setNote(`Back: now on ${pages[at - 1]}.`);
        };
        const visit = () => {
          if (locked || made >= LETTERS.length || at + 1 >= MAX) return;
          const p = LETTERS[made];
          const dropped = pages.slice(at + 1);
          setPages([...pages.slice(0, at + 1), p]);
          setAt(at + 1);
          setMade(made + 1);
          setGone(dropped);
          setNote(dropped.length ? `Visited ${p}. ${dropped.join(" and ")} thrown away.` : `Visited ${p}.`);
          if (dropped.length) interact();
        };
        const reset = () => {
          if (locked) return;
          setPages(START);
          setAt(START.length - 1);
          setMade(START.length);
          setGone([]);
          setNote("");
        };

        const msg = locked ? "Make a prediction to start." : note || `You are on ${pages[at]}.`;
        const slots = Array.from({ length: Math.max(pages.length, 4) }, (_, i) => i);

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>

            <div className={s.pile} aria-label={`History pile, bottom to top: ${pages.join(", ")}. You are on ${pages[at]}.`}>
              {slots
                .slice()
                .reverse()
                .map((i) => {
                  const p = pages[i];
                  if (!p) return <span key={`e${i}`} className={s.empty} />;
                  const state = i === at ? s.here : i > at ? s.ahead : s.below;
                  return (
                    <span key={p} className={`${s.page} ${state ?? ""}`}>
                      <b>{p}</b>
                      <span className={s.tag}>{i === at ? "you are here" : i > at ? "forward" : ""}</span>
                    </span>
                  );
                })}
            </div>

            <div className={s.gone} aria-live="polite">
              {gone.length ? (
                <>
                  <span className="muted small">Thrown away:</span>
                  {gone.map((g) => (
                    <span key={g} className={s.dead}>
                      {g}
                    </span>
                  ))}
                </>
              ) : (
                <span className="muted small">&nbsp;</span>
              )}
            </div>

            <Row>
              <Control className="active" disabled={locked || at === 0} onClick={back}>
                ◀ Back
              </Control>
              <Control disabled={locked || made >= LETTERS.length || at + 1 >= MAX} onClick={visit}>
                Visit new page {LETTERS[made] ?? ""}
              </Control>
              <Control disabled={locked || fresh} onClick={reset}>
                Start over
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
