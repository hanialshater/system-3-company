"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type CaseId = "rest" | "desk";
type Answer = "seen" | "not-seen";
type Result = { id: CaseId; answer: Answer };

// Authored examples. The target's membership is computed from the same words shown to the learner.
export const CASES: Record<CaseId, { label: string; words: readonly string[]; probe: string }> = {
  rest: { label: "Rest", words: ["bed", "rest", "awake", "dream", "night"], probe: "sleep" },
  desk: { label: "Desk", words: ["paper", "pencil", "ruler", "eraser", "pen"], probe: "pencil" },
};
export const present = (id: CaseId) => CASES[id].words.includes(CASES[id].probe);
const MILESTONES = ["checked"] as const;

export default function WasThatWordOnTheList({ slug }: { slug: string }) {
  const [current, setCurrent] = useState<CaseId>("rest");
  const [covered, setCovered] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const data = CASES[current];
  const thisResult = results.find((r) => r.id === current);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A word feels familiar after you study a list. Does that feeling alone establish that the word appeared on the list?",
        options: ["Yes, familiarity proves it appeared", "No, check the original list", "Only if the word is short"],
        answer: 1,
      }}
      exploreHint="Study the words, cover them, then choose whether the probe was on the list. Try the other list too."
      minInteractions={1}
      reveal={() => (
        <>
          <p>Compare each probe with its original list. A word can fit the theme without appearing in that list.</p>
          <p>Familiarity and a trace of where you saw something are different kinds of information. This short activity is an illustration, not a test of your memory.</p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const switchCase = (id: CaseId) => { setCurrent(id); setCovered(false); };
            const answer = (choice: Answer) => {
              setResults((previous) => [...previous.filter((r) => r.id !== current), { id: current, answer: choice }]);
              setCovered(false);
              reach("checked");
            };
            const readOnly = locked || phase === "reveal";
            return (
              <div className={s.stage}>
                <p className={s.caption}>{locked ? "A word list and a probe" : `${data.label} list`}</p>
                <div className={s.paper} aria-live="polite">
                  {locked ? <p>Make a prediction to open the exercise.</p> : covered ? <p>List covered. Was <strong>{data.probe}</strong> in it?</p> : <p>{data.words.join(" · ")}</p>}
                </div>
                {!locked && thisResult && !covered && (
                  <p className={s.result} aria-live="polite">
                    <strong>{data.probe}</strong> {present(current) ? "was on" : "was not on"} the {data.label} list. You chose {thisResult.answer === "seen" ? "on the list" : "not on the list"}.
                  </p>
                )}
                {!locked && results.length > 0 && (
                  <div className={s.seen} aria-label="Checked lists">
                    {results.map((result) => (
                      <span key={result.id}>{CASES[result.id].label}: {CASES[result.id].words.join(", ")}. Probe: {CASES[result.id].probe} ({present(result.id) ? "on list" : "not on list"}).</span>
                    ))}
                  </div>
                )}
                <div className={s.controls}>
                  <Control disabled={readOnly || covered} onClick={() => setCovered(true)}>Cover list</Control>
                  <Control disabled={readOnly || !covered} onClick={() => answer("seen")}>On the list</Control>
                  <Control disabled={readOnly || !covered} onClick={() => answer("not-seen")}>Not on the list</Control>
                  <Control disabled={readOnly} onClick={() => switchCase(current === "rest" ? "desk" : "rest")}>Try {current === "rest" ? "Desk" : "Rest"} list</Control>
                  <Control disabled={readOnly || (current === "rest" && !covered)} onClick={() => switchCase("rest")}>Reset</Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
