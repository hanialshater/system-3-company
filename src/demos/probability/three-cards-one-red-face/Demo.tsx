"use client";

// Three cards: red/red, red/blue, blue/blue, each drawn as its two sides. Step 1 keeps only the red
// faces (3 of the 6). Step 2 turns each red face over: 2 of the 3 backs are red. Then seeded draws
// (a random card, a random side up) tally how often a red face hides a red back.
// Key state: both steps done. The step buttons come first in DOM order, each enabling the next.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { DRAW_STEP, FACES, MAX_DRAWS, draws, exact, tally, type Color } from "./model";
import s from "./styles.module.css";

const DRAWS = draws();
const EX = exact();
const MILESTONES = ["red-faces", "turned-over"] as const;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const frac = `${EX.redBacks}/${EX.redFaces}`;
const CARD_W = 92;
const FACE_H = 46;
const X0 = 16;
const GAPX = 22;
const Y0 = 22;
const cardX = (c: number) => X0 + c * (CARD_W + GAPX);
const RED_FACES = FACES.filter((f) => f.up === "red");

function Stage({
  locked,
  interact,
  step,
  setStep,
  n,
  setN,
}: {
  locked: boolean;
  interact: () => void;
  step: number;
  setStep: (v: number) => void;
  n: number;
  setN: (v: number) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const t = tally(DRAWS, n);
  const fill = (c: Color) => (c === "red" ? s.red : s.blue);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : step === 0
            ? "Three cards, both sides shown. Drawn at random, any of the six faces can land up."
            : step === 1
              ? "You see red, so one of these three faces is up."
              : "Each red face, turned over."}
      </p>
      <svg viewBox="0 0 352 222" className={`stage-svg ${s.svg}`} role="img" aria-label={step >= 2 ? `${EX.redBacks} of ${EX.redFaces} red faces have a red back` : "Three cards"}>
        {[0, 1, 2].map((c) => (
          <text key={c} x={cardX(c) + CARD_W / 2} y={14} textAnchor="middle" className={s.label}>
            card {c + 1}
          </text>
        ))}
        {FACES.map((f, i) => {
          const dim = step >= 1 && f.up !== "red";
          return (
            <g key={i} className={dim ? s.dim : ""}>
              <rect x={cardX(f.card)} y={Y0 + f.side * (FACE_H + 4)} width={CARD_W} height={FACE_H} rx={8} className={`${fill(f.up)} ${step >= 1 && f.up === "red" ? s.picked : ""}`} />
              <text x={cardX(f.card) + 8} y={Y0 + f.side * (FACE_H + 4) + 16} className={s.faceLabel}>
                side {f.side + 1}: {f.up}
              </text>
            </g>
          );
        })}
        {step >= 2 &&
          RED_FACES.map((f, j) => {
            const y = 148 + j * 24;
            return (
              <g key={j}>
                <rect x={40} y={y} width={92} height={18} rx={4} className={s.red} />
                <text x={86} y={y + 13} textAnchor="middle" className={s.chipText}>
                  card {f.card + 1}, side {f.side + 1}
                </text>
                <text x={158} y={y + 13} textAnchor="middle" className={s.label}>
                  back:
                </text>
                <rect x={184} y={y} width={60} height={18} rx={4} className={fill(f.back)} />
                <text x={214} y={y + 13} textAnchor="middle" className={s.chipText}>
                  {f.back}
                </text>
              </g>
            );
          })}
      </svg>
      <Row>
        <Control
          className={step >= 1 ? "active" : ""}
          disabled={locked || step >= 1}
          onClick={() => {
            setStep(1);
            reach("red-faces");
          }}
        >
          Keep the red faces
        </Control>
        <Control
          className={step >= 2 ? "active" : ""}
          disabled={locked || step !== 1}
          onClick={() => {
            setStep(2);
            reach("turned-over");
          }}
        >
          Turn them over
        </Control>
        <Control disabled={locked || n >= MAX_DRAWS} onClick={() => setN(Math.min(MAX_DRAWS, n + DRAW_STEP))}>
          Draw {DRAW_STEP} cards
        </Control>
      </Row>
      <Row>
        <Readout label="Red backs" value={step >= 2 ? `${EX.redBacks} of ${EX.redFaces}` : "?"} />
        <Readout label="Draws: red up" value={n === 0 ? "-" : t.red} />
        <Readout label="Of those, red back" value={n === 0 ? "-" : `${t.redBack} (${pct(t.redBack / Math.max(1, t.red))})`} />
      </Row>
    </div>
  );
}

export default function ThreeCards({ slug }: { slug: string }) {
  const [step, setStep] = useState(0);
  const [n, setN] = useState(0);
  const t = tally(DRAWS, n);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A hat holds three cards: red on both sides, blue on both sides, and red on one side and blue on the other. You draw one at random and see a red face. How likely is the hidden side red?",
        options: ["1/2", frac, "1/3"],
        answer: 1,
      }}
      exploreHint="Keep the red faces, turn them over, then draw some cards."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{frac}.</strong> &ldquo;Red/red or red/blue card, so 1/2&rdquo; counts cards, but the clue is about a face. Of
            the {EX.redFaces} red faces, each equally likely, {EX.redBacks} turned over to red, because the red/red card owns
            two of them.
          </p>
          {n > 0 && (
            <p>
              {`Your ${n} draws showed red ${t.red} times, and the back was red ${t.redBack} of those (${pct(t.redBack / Math.max(1, t.red))}). Short runs wobble around ${frac}.`}
            </p>
          )}
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} step={step} setStep={setStep} n={n} setN={setN} />}
    </Lesson>
  );
}
