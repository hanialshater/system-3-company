"use client";

// Monty Hall with 100 doors. The payoff: your first pick was a 1-in-100 guess and the
// host's opening cannot improve it. He knows where the car is, so the one door he
// carefully avoids carries all the rest of the chance. With 100 doors you can feel it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { batch, carFor, hostLeaves } from "./model";
import s from "./styles.module.css";

type Step = "pick" | "decide" | "done";
const SIZES = [100, 10, 3];

export default function MontyHall100({ slug }: { slug: string }) {
  const [doors, setDoors] = useState(100);
  const [round, setRound] = useState(0);
  const [step, setStep] = useState<Step>("pick");
  const [pick, setPick] = useState<number | null>(null);
  const [final, setFinal] = useState<number | null>(null);
  const [tally, setTally] = useState({ stayWins: 0, stayPlays: 0, swapWins: 0, swapPlays: 0 });
  const [batches, setBatches] = useState(0);

  const car = carFor(round, doors);
  const other = pick === null ? null : hostLeaves(round, doors, pick);

  const reset = (n: number) => {
    setDoors(n);
    setRound((r) => r + 1);
    setStep("pick");
    setPick(null);
    setFinal(null);
    setTally({ stayWins: 0, stayPlays: 0, swapWins: 0, swapPlays: 0 });
    setBatches(0);
  };

  const tap = (d: number, interact: () => void) => {
    if (step === "done") {
      setRound((r) => r + 1);
      setPick(d);
      setFinal(null);
      setStep("decide");
      return;
    }
    if (step === "pick") {
      setPick(d);
      setStep("decide");
      return;
    }
    if (step === "decide" && pick !== null && (d === pick || d === other)) {
      const switched = d !== pick;
      const won = d === car;
      setFinal(d);
      setStep("done");
      setTally((t) =>
        switched
          ? { ...t, swapPlays: t.swapPlays + 1, swapWins: t.swapWins + (won ? 1 : 0) }
          : { ...t, stayPlays: t.stayPlays + 1, stayWins: t.stayWins + (won ? 1 : 0) },
      );
      interact();
    }
  };

  const message = (() => {
    if (step === "pick") return "Pick a door.";
    if (step === "decide") return `The host opened ${doors - 2} empty ${doors - 2 === 1 ? "door" : "doors"}. Tap yours to stay, or the other to switch.`;
    const switched = final !== pick;
    return `${switched ? "You switched" : "You stayed"} and ${final === car ? "won the car" : "lost"}. Tap any door to play again.`;
  })();

  const cls = (d: number) => {
    const opened = step !== "pick" && d !== pick && d !== other;
    const parts = [s.door];
    if (opened) parts.push(s.open);
    if (d === pick) parts.push(s.mine);
    if (step === "decide" && d === other) parts.push(s.offer);
    if (step === "done" && d === car) parts.push(s.car);
    return parts.join(" ");
  };

  const rate = (w: number, p: number) => (p ? `${w}/${p}` : "—");

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "100 doors, one car. You pick a door. The host, who knows where the car is, opens 98 empty doors, leaving yours and one other. Chance the car is behind the other one?",
        options: ["50%", "1%", "99%"],
        answer: 2,
      }}
      exploreHint="Play a round with 100 doors, then play 100 rounds and compare staying with switching."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {tally.swapPlays + tally.stayPlays > 0
              ? `Your ${doors}-door rounds: staying won ${rate(tally.stayWins, tally.stayPlays)}, switching won ${rate(tally.swapWins, tally.swapPlays)}. `
              : ""}
            With 100 doors, switching wins <strong>99 times in 100</strong>.
          </p>
          <p>
            Your first pick was a 1-in-100 guess, and it stays one: the host can always open 98 empty doors, whatever
            you picked. The other 99 chances in 100 sat on the doors you did not pick, and the host, who knows where the
            car is, squeezed them all onto the one door he left shut.
          </p>
          <p className="muted">
            His knowledge is the point. If he had opened 98 doors at random and simply happened to miss the car, it
            would be 50/50. With 3 doors, switching wins 2 times in 3.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <Row>
            <span className="muted small">Doors</span>
            {SIZES.map((n) => (
              <Control
                key={n}
                className={n === doors ? "active" : ""}
                aria-pressed={n === doors}
                disabled={locked || n === doors}
                aria-label={`${n} doors`}
                onClick={() => reset(n)}
              >
                {n}
              </Control>
            ))}
            <Control
              disabled={locked}
              onClick={() => {
                const b = batch(100000 + batches * 100, 100, doors);
                setBatches((k) => k + 1);
                setTally((t) => ({
                  stayWins: t.stayWins + b.stay,
                  stayPlays: t.stayPlays + 100,
                  swapWins: t.swapWins + b.swap,
                  swapPlays: t.swapPlays + 100,
                }));
                interact();
              }}
            >
              Play 100 rounds
            </Control>
          </Row>

          <p className={s.msg} aria-live="polite">
            {locked ? "Make a prediction to start." : message}
          </p>

          <div
            className={s.grid}
            style={{ gridTemplateColumns: `repeat(${doors === 100 ? 10 : doors === 10 ? 5 : 3}, 1fr)` }}
            data-doors={doors}
          >
            {Array.from({ length: doors }, (_, d) => {
              const enabled = !locked && (step !== "decide" || d === pick || d === other);
              return (
                <Control
                  key={`${doors}-${d}`}
                  className={cls(d)}
                  disabled={!enabled}
                  aria-label={`Door ${d + 1}${d === pick ? ", your pick" : ""}`}
                  onClick={() => tap(d, interact)}
                >
                  {step === "done" && d === car ? "car" : d === pick ? "you" : step === "decide" && d === other ? "other" : ""}
                </Control>
              );
            })}
          </div>

          <Row>
            <Readout label="Stay won" value={rate(tally.stayWins, tally.stayPlays)} />
            <Readout label="Switch won" value={rate(tally.swapWins, tally.swapPlays)} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
