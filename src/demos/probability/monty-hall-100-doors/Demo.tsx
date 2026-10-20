"use client";

// Monty Hall with 100 doors. The payoff: your first pick was a 1-in-100 guess and the
// host's opening cannot improve it. He knows where the car is, so the one door he
// carefully avoids carries all the rest of the chance. With 100 doors you can feel it.
// Key state: 100 rounds played at 100 doors (stay ~1, switch ~99). The reveal quotes the learner's
// own tallies, kept separately per door count so the 100-door tally survives a visit to 3 doors.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { batch, carFor, guessingBatch, hostLeaves } from "./model";
import s from "./styles.module.css";

type Step = "pick" | "decide" | "done";
interface Tally {
  stayWins: number;
  stayPlays: number;
  swapWins: number;
  swapPlays: number;
  batches: number;
}
interface Guess {
  rounds: number;
  kept: number;
  stay: number;
  swap: number;
}
const SIZES = [100, 10, 3];
const MILESTONES = ["hundred-rounds-at-100-doors"] as const;
const EMPTY: Tally = { stayWins: 0, stayPlays: 0, swapWins: 0, swapPlays: 0, batches: 0 };
const NOGUESS: Guess = { rounds: 0, kept: 0, stay: 0, swap: 0 };
const rate = (w: number, p: number) => (p ? `${w}/${p}` : "—");

export default function MontyHall100({ slug }: { slug: string }) {
  const [doors, setDoors] = useState(100);
  const [round, setRound] = useState(0);
  const [step, setStep] = useState<Step>("pick");
  const [pick, setPick] = useState<number | null>(null);
  const [final, setFinal] = useState<number | null>(null);
  const [tallies, setTallies] = useState<Record<number, Tally>>({});
  const [guesses, setGuesses] = useState<Record<number, Guess>>({});

  const tally = tallies[doors] ?? EMPTY;
  const guess = guesses[doors] ?? NOGUESS;
  const car = carFor(round, doors);
  const other = pick === null ? null : hostLeaves(round, doors, pick);

  const reset = (n: number) => {
    setDoors(n);
    setRound((r) => r + 1);
    setStep("pick");
    setPick(null);
    setFinal(null);
  };

  const tap = (d: number) => {
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
      setTallies((all) => {
        const t = all[doors] ?? EMPTY;
        return {
          ...all,
          [doors]: switched
            ? { ...t, swapPlays: t.swapPlays + 1, swapWins: t.swapWins + (won ? 1 : 0) }
            : { ...t, stayPlays: t.stayPlays + 1, stayWins: t.stayWins + (won ? 1 : 0) },
        };
      });
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

  const mine = SIZES.filter((n) => (tallies[n]?.stayPlays ?? 0) + (tallies[n]?.swapPlays ?? 0) > 0);
  const guessed = SIZES.filter((n) => (guesses[n]?.rounds ?? 0) > 0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You're on a game show with 100 doors and one car. You pick a door. The host, who knows where the car is, opens 98 empty doors, leaving yours and one other. Chance the car is behind that one?",
        options: ["50%", "1%", "99%"],
        answer: 2,
      }}
      exploreHint="Play 100 rounds with 100 doors and compare staying with switching. Then try a host who opens doors at random."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {mine.length > 0 ? (
              <>
                Your rounds, staying vs switching:{" "}
                {mine
                  .map((n) => `${n} doors ${rate(tallies[n].stayWins, tallies[n].stayPlays)} vs ${rate(tallies[n].swapWins, tallies[n].swapPlays)}`)
                  .join("; ")}
                .{" "}
              </>
            ) : null}
            With 100 doors, switching wins <strong>99 times in 100</strong>.
          </p>
          <p>
            Your first pick was a 1-in-100 guess, and it stays one: the host can always open 98 empty doors, whatever
            you picked. The other 99 chances in 100 sat on the doors you did not pick, and the host, who knows where the
            car is, squeezed them all onto the one door he left shut.
          </p>
          <p className="muted">
            {guessed.length > 0
              ? `Your guessing host (opening doors at random, rounds where he hit the car thrown away): ${guessed
                  .map((n) => `${n} doors, kept ${guesses[n].kept} of ${fmtN(guesses[n].rounds)}, stay won ${guesses[n].stay}, switch won ${guesses[n].swap}`)
                  .join("; ")}. Close to even (small counts wobble). `
              : "If he had opened 98 doors at random and simply happened to miss the car, it would be 50/50. "}
            With 3 doors, switching wins 2 times in 3.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <div className={s.wrap}>
              <Row>
                <Control
                  disabled={locked}
                  onClick={() => {
                    const t = tallies[doors] ?? EMPTY;
                    const b = batch(100000 + t.batches * 100, 100, doors);
                    setTallies({
                      ...tallies,
                      [doors]: {
                        stayWins: t.stayWins + b.stay,
                        stayPlays: t.stayPlays + 100,
                        swapWins: t.swapWins + b.swap,
                        swapPlays: t.swapPlays + 100,
                        batches: t.batches + 1,
                      },
                    });
                    if (doors === 100) reach("hundred-rounds-at-100-doors");
                  }}
                >
                  Play 100 rounds
                </Control>
                <Control
                  disabled={locked}
                  onClick={() => {
                    const g = guesses[doors] ?? NOGUESS;
                    const b = guessingBatch(200000 + g.rounds, 1000, doors);
                    setGuesses({
                      ...guesses,
                      [doors]: { rounds: g.rounds + 1000, kept: g.kept + b.kept, stay: g.stay + b.stay, swap: g.swap + b.swap },
                    });
                  }}
                >
                  Guessing host: 1,000 rounds
                </Control>
              </Row>
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
              </Row>

              <Row>
                <Readout label={`Stay won (${doors} doors)`} value={rate(tally.stayWins, tally.stayPlays)} />
                <Readout label="Switch won" value={rate(tally.swapWins, tally.swapPlays)} />
              </Row>
              {guess.rounds > 0 && (
                <Row>
                  <Readout label="Rounds kept (he missed the car)" value={`${guess.kept} of ${fmtN(guess.rounds)}`} />
                  <Readout label="Stay / switch won" value={`${guess.stay} / ${guess.swap}`} />
                </Row>
              )}

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
                      onClick={() => tap(d)}
                    >
                      {step === "done" && d === car ? "car" : d === pick ? "you" : step === "decide" && d === other ? "other" : ""}
                    </Control>
                  );
                })}
              </div>

            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function fmtN(n: number) {
  return n.toLocaleString("en-US");
}
