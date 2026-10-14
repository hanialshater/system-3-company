"use client";

// The back button as a stack. History is a pile: Back steps down it, and visiting a
// new page after going back throws away everything above you. The payoff is that
// discard: after Back, visit D, the old C is gone, so Back lands on B. One Back is enough, so
// the question's own sequence is reachable by one tap per control (QA contract).
// One representation: the history pile.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = ["A", "B", "C"];
const LETTERS = "ABCDEFGHIJKL";
const MAX = 8;

export default function BackButtonStack({ slug }: { slug: string }) {
  const [pages, setPages] = useState<string[]>(START); // the history pile, bottom first
  const [at, setAt] = useState(START.length - 1); // where you are in it
  const [made, setMade] = useState(START.length); // letters used so far
  const [gone, setGone] = useState<string[]>([]); // pages thrown away by the last visit
  const [note, setNote] = useState("");
  // the last visit that threw pages away; Back from the new page goes to `from`
  const [rec, setRec] = useState<{ from: string; page: string; dropped: string[] } | null>(null);

  const fresh = at === START.length - 1 && pages.length === START.length && made === START.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You visit pages A, B, C in that order. You press Back once, then visit a new page D. You press Back once more. Where are you?",
        options: ["C", "B", "A"],
        answer: 1,
      }}
      exploreHint="Try the puzzle: Back once, visit a new page, then look at where Back goes."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            History is a pile of pages. Back steps down the pile; pages above you stay, marked ahead, until you visit
            something new. {rec ? (
              <>
                You visited {rec.page} from {rec.from}, so {rec.dropped.join(" and ")} {rec.dropped.length === 1 ? "was" : "were"}{" "}
                thrown away, and Back from {rec.page} goes to <strong>{rec.from}</strong>.
              </>
            ) : null}
          </p>
          <p>
            The question works the same way. Back once leaves you on B, visiting D throws away C, and the pile
            is A, B, D. So Back goes to <strong>B</strong>. A pile where the last page added is the first one you get
            back is called a stack.
          </p>
          <p className="muted">Back means &quot;one step down the pile&quot;, not &quot;the page you saw before this one&quot;.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["discard"]}>
          {(reach) => {
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
          setRec(dropped.length ? { from: pages[at], page: p, dropped } : null);
          if (dropped.length) reach("discard");
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
                      <span className={s.tag}>{i === at ? "you are here" : i > at ? "ahead" : i === at - 1 && !locked ? "Back goes here" : ""}</span>
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
        </Milestones>
      )}
    </Lesson>
  );
}
