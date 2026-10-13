"use client";

// Repeat testing. 1,000 people as dots, 10 of them sick (red). "Test everyone" rings the 98 who test
// positive (9 sick); "Test the positives again" keeps only the 16 flagged twice (8 sick).
// Key state: the second round reached, where the flagged group is half sick.
// The two test buttons come first in DOM order and each enables the next, so QA reaches round 2.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { COLS, FACTOR, FALSE_POS, PREVALENCE, SENSITIVITY, counts, people, shareSick } from "./model";
import s from "./styles.module.css";

const PEOPLE = people();
const MILESTONES = ["first-test", "second-test"] as const;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const C0 = counts(0);
const C1 = counts(1);
const C2 = counts(2);
const GAP = 10;

function Stage({ locked, interact, round, setRound }: { locked: boolean; interact: () => void; round: number; setRound: (r: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const c = counts(round);
  const flagged = c.sick + c.healthy;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : round === 0
            ? `Red: has the condition (${pct(PREVALENCE)} of people). Test everyone.`
            : "Red: has the condition. Ring: tested positive every time so far."}
      </p>
      <svg viewBox="0 0 400 250" className={`stage-svg ${s.svg}`} role="img" aria-label={`${flagged} flagged, ${c.sick} of them sick`}>
        {PEOPLE.map((p, i) => {
          const on = round === 0 || p.flaggedThrough >= round;
          const cx = GAP / 2 + (i % COLS) * GAP;
          const cy = GAP / 2 + Math.floor(i / COLS) * GAP;
          return (
            <g key={i} className={on ? "" : s.faded}>
              <circle cx={cx} cy={cy} r={p.sick ? 3.6 : 2.6} className={p.sick ? s.sick : s.healthy} />
              {round > 0 && on && <circle cx={cx} cy={cy} r={4.6} className={s.ring} />}
            </g>
          );
        })}
      </svg>
      <Row>
        <Control
          className={round >= 1 ? "active" : ""}
          disabled={locked || round >= 1}
          onClick={() => {
            setRound(1);
            reach("first-test");
          }}
        >
          Test everyone
        </Control>
        <Control
          className={round >= 2 ? "active" : ""}
          disabled={locked || round !== 1}
          onClick={() => {
            setRound(2);
            reach("second-test");
          }}
        >
          Test the positives again
        </Control>
        <Control disabled={locked || round === 0} onClick={() => setRound(0)}>
          Start over
        </Control>
      </Row>
      <Row>
        <Readout label={round === 0 ? "People" : "Positive"} value={flagged.toLocaleString("en-US")} />
        <Readout label={round === 0 ? "Sick" : "Of those, sick"} value={round === 0 ? `${c.sick}` : `${c.sick} (${pct(shareSick(c))})`} />
        <Readout label="Sick : healthy" value={`${c.sick} : ${c.healthy}`} />
      </Row>
    </div>
  );
}

export default function SecondPositiveTest({ slug }: { slug: string }) {
  const [round, setRound] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A condition affects ${pct(PREVALENCE)} of people. The test catches ${pct(SENSITIVITY)} of cases and wrongly flags ${pct(FALSE_POS)} of healthy people. After one positive, the chance of being sick is about ${pct(shareSick(C1))}. After a second, independent positive, it is about:`,
        options: ["19%", pct(shareSick(C2)), pct(SENSITIVITY * SENSITIVITY)],
        answer: 1,
      }}
      exploreHint="Test everyone, then test the positives again."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            One test flagged {C1.sick + C1.healthy} people and {C1.sick} were sick: {pct(shareSick(C1))}. Testing those{" "}
            {C1.sick + C1.healthy} again left {C2.sick + C2.healthy}, and {C2.sick} were sick: <strong>{pct(shareSick(C2))}</strong>.
          </p>
          <p>
            The sick-to-healthy ratio went {C0.sick} : {C0.healthy} (1 to {Math.round(C0.healthy / C0.sick)}), then {C1.sick} :{" "}
            {C1.healthy} (about 1 to {Math.round(C1.healthy / C1.sick)}), then {C2.sick} : {C2.healthy}. Each positive multiplies it by
            about {FACTOR} ({pct(SENSITIVITY)} &divide; {pct(FALSE_POS)}): a modest test gets convincing when repeated.
          </p>
          <p className="muted">
            This assumes the two tests err independently. A test that is fooled the same way twice by the same person helps less.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} round={round} setRound={setRound} />}
    </Lesson>
  );
}
