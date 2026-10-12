"use client";

// The lesson contract every demo follows (company/product/demo-standard.md):
//
//   1. Hook      one line that makes a question worth sixty seconds
//   2. Predict   the learner commits before anything is shown (scaffold, don't substitute)
//   3. Explore   the stage unlocks; the learner acts and the world answers
//   4. Reveal    compare the prediction with what happened, then say why
//
// Recall happens later, in a spaced revisit card, without the stage.
//
// The test ids below are part of the QA contract. Do not rename them without a
// constitutional amendment: tests/qa depends on them.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { track, updateProgress } from "./progress";

export type Phase = "predict" | "explore" | "reveal";

export interface StageContext {
  phase: Phase;
  prediction: number | null;
  /** Stage controls should be disabled while locked (before the prediction). */
  locked: boolean;
  /** Call on every meaningful learner action. Unlocks the reveal after `minInteractions`. */
  interact: () => void;
  interactions: number;
}

export interface LessonProps {
  slug: string;
  predict: { question: string; options: string[]; answer: number };
  /** What the learner should take away. Receives whether their prediction was right. */
  reveal: (ctx: { prediction: number; correct: boolean }) => ReactNode;
  children: (ctx: StageContext) => ReactNode;
  minInteractions?: number;
  /** Optional nudge shown in the explore phase. */
  exploreHint?: string;
}

export function Lesson({ slug, predict, reveal, children, minInteractions = 1, exploreHint }: LessonProps) {
  const [phase, setPhase] = useState<Phase>("predict");
  const [choice, setChoice] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [interactions, setInteractions] = useState(0);
  const started = useRef(Date.now());
  const interactedOnce = useRef(false);

  useEffect(() => {
    track({ type: "view", slug });
  }, [slug]);

  const commit = () => {
    if (choice === null) return;
    setPrediction(choice);
    setPhase("explore");
    track({ type: "predict", slug, option: choice, correct: choice === predict.answer });
  };

  const interact = () => {
    if (phase === "predict") return;
    if (!interactedOnce.current) {
      interactedOnce.current = true;
      track({ type: "interact", slug });
    }
    setInteractions((n) => n + 1);
  };

  const showReveal = () => {
    setPhase("reveal");
    track({ type: "reveal", slug });
    const correct = prediction === predict.answer;
    updateProgress(slug, (p) => ({ ...p, completedAt: p.completedAt ?? Date.now(), predictedCorrectly: correct }));
    track({ type: "complete", slug, dwellMs: Date.now() - started.current });
  };

  const canReveal = phase === "explore" && interactions >= minInteractions;

  return (
    <div className="lesson" data-testid="lesson" data-phase={phase}>
      <div className="stage" data-testid="stage" aria-disabled={phase === "predict"}>
        {children({ phase, prediction, locked: phase === "predict", interact, interactions })}
      </div>

      <div className="panel">
        {phase === "predict" && (
          <div className="predict" role="group" aria-label="Make a prediction">
            <p className="panel-q">{predict.question}</p>
            <div className="options">
              {predict.options.map((o, i) => (
                <button
                  key={i}
                  type="button"
                  className={`option ${choice === i ? "selected" : ""}`}
                  aria-pressed={choice === i}
                  data-testid="predict-option"
                  onClick={() => setChoice(i)}
                >
                  {o}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="primary"
              data-testid="commit-prediction"
              disabled={choice === null}
              onClick={commit}
            >
              Lock it in
            </button>
          </div>
        )}

        {phase === "explore" && (
          <div className="explore">
            <p className="panel-q">
              You said <strong>{predict.options[prediction ?? 0]}</strong>. {exploreHint ?? "Now try it and see."}
            </p>
            <button
              type="button"
              className="primary"
              data-testid="reveal-button"
              disabled={!canReveal}
              onClick={showReveal}
            >
              {canReveal ? "Show me why" : "Try it first"}
            </button>
          </div>
        )}

        {phase === "reveal" && prediction !== null && (
          <div className="reveal" data-testid="reveal">
            <p className={`verdict ${prediction === predict.answer ? "right" : "wrong"}`}>
              {prediction === predict.answer
                ? "Your prediction held."
                : `Not quite: it was “${predict.options[predict.answer]}”.`}
            </p>
            <div className="why">{reveal({ prediction, correct: prediction === predict.answer })}</div>
          </div>
        )}
      </div>
    </div>
  );
}
