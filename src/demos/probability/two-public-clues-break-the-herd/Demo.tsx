"use client";

// Two public clues break the herd. An information cascade: persons 1 and 2 chose blue on blue clues;
// from person 3 on, a lead of 2 outweighs any single clue, so persons 3-100 followed and their
// choices carry no clue. The learner first counts the clues behind the 100 choices (2 blue), then
// publishes two red clues. With clues right 2 times in 3 and a prior of 1/2,
//   P(blue urn) = 1 / (1 + 2^(red - blue)),
// computed from the chips on the table: 2 blue vs 1 red (yours) = 67%; 2 blue vs 3 red = 33%.
// Milestones: counted, published-after-count (the toggle on while counted, in either order).

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const CROWD = 100;
const INFORMED = 2; // persons 1-2 chose on their own clue; 3-100 followed
const MILESTONES = ["counted", "published-after-count"] as const;

/** Chance the urn is blue given clue counts (clues right 2 times in 3, prior 1/2). */
export const pBlue = (blue: number, red: number) => 1 / (1 + 2 ** (red - blue));
const pct = (p: number) => `${Math.round(100 * p)}%`;
export const BEFORE = pBlue(INFORMED, 1);
export const AFTER = pBlue(INFORMED, 3);

interface View {
  counted: boolean;
  published: boolean;
  log: string | null;
}

export default function TwoPublicCluesBreakTheHerd({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two chose blue, then 98 followed. Now two new private clues are published: both red. Your own clue is red. Choose?",
        options: ["Blue, with the 100", "Red", "Toss-up"],
        answer: 1,
      }}
      exploreHint="Count the clues behind the crowd, then publish the two clues."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The {CROWD - INFORMED} followers chose blue because of the first two choices, not their own clues, so the{" "}
            {CROWD} blue choices held only {INFORMED} clues. With your red clue alone, blue stayed at {pct(BEFORE)}.
          </p>
          <p>
            Two published red clues plus yours make 3 red to {INFORMED} blue: blue falls to {pct(AFTER)}, and red is the
            better choice. A herd built on two clues can be overturned by two more.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}

const PITCH = 20;
const SQ = 14;

function Stage({ locked, reach }: { locked: boolean; reach: (name: string) => void }) {
  const [v, setV] = useState<View>({ counted: false, published: false, log: null });

  const update = (next: View) => {
    const log = next.log ?? (next.counted && next.published ? `Before publishing: ${pct(BEFORE)} blue` : null);
    setV({ ...next, log });
    if (next.counted) reach("counted");
    if (next.counted && next.published) reach("published-after-count");
  };

  const blue = v.counted ? INFORMED : 0;
  const red = v.counted ? 1 + (v.published ? 2 : 0) : 0;
  const p = pBlue(blue, red);
  const best = p > 0.5 ? "blue" : p < 0.5 ? "red" : "either";
  const aria = locked
    ? "100 people, all chose blue. Your clue is red."
    : v.counted
      ? `Clues on the table: ${blue} blue, ${red} red. Chance the urn is blue: ${pct(p)}.`
      : "100 people chose blue. Clues not counted yet.";

  return (
    <div className={s.wrap}>
      <p className={s.rule}>Person 3 on: a lead of 2 wins</p>
      <svg viewBox="0 0 340 236" className={`stage-svg ${s.fit}`} role="img" aria-label={aria}>
        <g>
          {Array.from({ length: CROWD }, (_, i) => {
            const x = 4 + (i % 10) * PITCH;
            const y = 4 + Math.floor(i / 10) * PITCH;
            const follower = v.counted && i >= INFORMED;
            return (
              <g key={i}>
                <rect x={x} y={y} width={SQ} height={SQ} rx={3} className={follower ? s.follower : s.chose} />
                {v.counted && !follower && <circle cx={x + SQ / 2} cy={y + SQ / 2} r={3} className={s.clueDot} />}
              </g>
            );
          })}
        </g>
        <text x={4} y={222} className={s.caption}>
          {v.counted ? "1–2: clues. 3–100: followed." : `Choices: ${CROWD} blue`}
        </text>

        <text x={226} y={18} className={s.sideHead}>
          Your clue
        </text>
        <rect x={226} y={26} width={52} height={24} rx={12} className={s.chipRed} />
        <text x={252} y={42} className={s.chipText}>
          red
        </text>
        <text x={226} y={78} className={s.sideHead}>
          Published
        </text>
        {[0, 1].map((j) => (
          <g key={j}>
            <rect
              x={226 + j * 58}
              y={86}
              width={52}
              height={24}
              rx={12}
              className={v.published ? s.chipRed : s.chipUnknown}
            />
            <text x={252 + j * 58} y={102} className={s.chipText}>
              {v.published ? "red" : "?"}
            </text>
          </g>
        ))}
      </svg>

      <div className={s.table}>
        <div className={`${s.box} ${s.boxBlue}`}>
          <span className={s.boxLabel}>blue</span>
          <div className={s.chips}>
            {v.counted ? (
              Array.from({ length: INFORMED }, (_, j) => (
                <span key={j} className={`${s.chip} ${s.blueChip}`}>
                  {j + 1}
                </span>
              ))
            ) : (
              <span className={s.unknown}>{CROWD} choices?</span>
            )}
          </div>
        </div>
        <div className={`${s.box} ${s.boxRed}`}>
          <span className={s.boxLabel}>red</span>
          <div className={s.chips}>
            {v.counted && <span className={`${s.chip} ${s.redChip} ${s.moved}`}>yours</span>}
            {v.counted &&
              v.published &&
              [0, 1].map((j) => (
                <span key={j} className={`${s.chip} ${s.redChip} ${s.moved}`}>
                  pub
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className={s.readout} aria-live="polite">
        <span>
          Chance the urn is blue: <strong>{v.counted ? pct(p) : "?"}</strong>
        </span>
        {v.counted && <strong className={best === "red" ? s.bestRed : s.bestBlue}>Best: {best}</strong>}
      </div>
      <p className={s.log}>{v.log ?? " "}</p>

      <div className={s.controls}>
        <Control
          className={s.tap}
          disabled={locked || v.counted}
          onClick={() => update({ ...v, counted: true })}
        >
          Count the clues behind them
        </Control>
        <Control
          className={`${s.tap} ${v.published ? "active" : ""}`}
          aria-pressed={v.published}
          disabled={locked}
          onClick={() => update({ ...v, published: !v.published })}
        >
          {v.published ? "Two clues published" : "Publish two clues"}
        </Control>
      </div>
    </div>
  );
}
