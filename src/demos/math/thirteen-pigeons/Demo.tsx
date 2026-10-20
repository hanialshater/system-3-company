"use client";

// Thirteen pigeons. Twelve month boxes are the controls. The learner seats people one at a
// time, one per month while any month is empty (filled months lock), trying to avoid a
// shared month. After twelve, every month is full and person 13 can only join someone.
// Key state: twelve people in twelve different months, with person 13 still waiting.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const N = MONTHS.length;
const MILESTONES = ["all-months-apart"] as const;

export default function ThirteenPigeons({ slug }: { slug: string }) {
  const [seats, setSeats] = useState<number[]>([]); // month index of each seated person, in order

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "At your party, how many guests must be in the room for you to be certain that two of them share a birth month?",
        options: [String(N), String(N + 1), String(2 * N)],
        answer: 1,
      }}
      exploreHint="Tap month tiles to seat one person in each of the 12 months."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{N + 1}.</strong> You seated {N} people in {N} different months, and then every month was taken.
            Person {N + 1} had nowhere new to go.
          </p>
          <p>
            No luck is involved. With {N} people nobody has to share (you just showed it), but any {N + 1} people must
            include two with the same month, whoever they are. More people than months forces a month with two: the
            pigeonhole principle, certainty from counting alone.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} seats={seats} setSeats={setSeats} />}
    </Lesson>
  );
}

function Stage({ locked, interact, seats, setSeats }: StageContext & { seats: number[]; setSeats: (v: number[]) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const count = seats.length;
  const filled = new Set(seats);
  const anyEmpty = filled.size < N;
  const done = count > N;

  const seat = (m: number) => {
    const next = [...seats, m];
    setSeats(next);
    if (new Set(next).size === N && next.length === N) reach("all-months-apart");
  };

  const shared = done ? seats[N] : -1;

  return (
    <div className={s.wrap}>
      <div className={s.queue} aria-live="polite">
        {locked ? (
          "Make a prediction to start."
        ) : done ? (
          <>
            Person {N + 1} joins {MONTHS[shared]}: two share a month.
          </>
        ) : count === N ? (
          <>
            All {N} months taken. <strong>Person {N + 1}</strong> must share. Pick one.
          </>
        ) : count === 0 ? (
          <>
            <strong>Person 1</strong> is waiting. Tap a month tile to seat them there.
          </>
        ) : (
          <>
            <strong>Person {count + 1}</strong> waiting. {N - filled.size} empty month{N - filled.size === 1 ? "" : "s"} left (numbers show who sits where).
          </>
        )}
      </div>

      <div className={s.grid}>
        {MONTHS.map((name, m) => {
          const here = seats.map((x, i) => (x === m ? i + 1 : 0)).filter(Boolean);
          const blocked = locked || done || (anyEmpty && filled.has(m));
          return (
            <Control
              key={name}
              disabled={blocked}
              className={`${s.month} ${here.length > 1 ? s.double : here.length === 1 ? s.one : ""}`}
              aria-label={`${name}: ${here.length} seated`}
              onClick={() => seat(m)}
            >
              <span className={s.name}>{name}</span>
              <span className={s.people}>
                {here.map((p) => (
                  <span key={p} className={s.person}>
                    {p}
                  </span>
                ))}
              </span>
            </Control>
          );
        })}
      </div>

      <Row>
        <Readout label="Seated" value={locked ? "?" : count} />
        <Readout label="Months used" value={locked ? "?" : `${filled.size} of ${N}`} />
        <Control disabled={locked || count === 0} onClick={() => setSeats([])}>
          Start over
        </Control>
      </Row>
    </div>
  );
}
