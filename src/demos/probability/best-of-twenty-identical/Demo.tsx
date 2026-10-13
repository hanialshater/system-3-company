"use client";

// Winner's curse. 20 bars: heads in 20 flips for each of 20 fair coins (seeded). The tallest is the
// winner; "Flip the winner again" adds its re-flip bar; "Run 100 more contests" draws the average
// winner and average re-flip over all contests as lines. Key state: re-flip seen and 101 contests run.
// Buttons in DOM order: flip all, flip the winner again, run 100 more.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { COINS, FLIPS, MORE, contests, exactMax, mean } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["again", "many"] as const;
const ALL = contests();
const FIRST = ALL[0];
const WIN = FIRST.counts[FIRST.winner];
const AVG_WIN = mean(ALL.map((c) => c.counts[c.winner]));
const AVG_AGAIN = mean(ALL.map((c) => c.again));
const one = (v: number) => v.toFixed(1);

const X0 = 22;
const BW = 12;
const GAP = 2.5;
const BASE = 160;
const H = 140;
const bx = (i: number) => X0 + i * (BW + GAP);
const y = (v: number) => BASE - (v / FLIPS) * H;
const AGAIN_X = bx(COINS) + 6;

function Stage({ locked, interact, step, setStep }: { locked: boolean; interact: () => void; step: number; setStep: (n: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const flipped = step >= 1;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : `Bars: heads in ${FLIPS} flips for each of ${COINS} fair coins. Gold: the winner (the first, on a tie).`}</p>
      <svg viewBox="0 0 340 186" className={`stage-svg ${s.svg}`} role="img" aria-label={flipped ? `Winner got ${WIN} heads` : "Coins not flipped yet"}>
        {[0, 10, 20].map((v) => (
          <g key={v}>
            <line x1={X0 - 2} y1={y(v)} x2={AGAIN_X + BW + 4} y2={y(v)} className={s.grid} />
            <text x={X0 - 5} y={y(v) + 3.5} textAnchor="end" className={s.tick}>
              {v}
            </text>
          </g>
        ))}
        {flipped &&
          FIRST.counts.map((c, i) => (
            <rect key={i} x={bx(i)} y={y(c)} width={BW} height={BASE - y(c)} rx={2} className={i === FIRST.winner ? s.win : s.bar} />
          ))}
        {flipped && (
          <text x={bx(FIRST.winner) + BW / 2} y={y(WIN) - 4} textAnchor="middle" className={s.label}>
            {WIN}
          </text>
        )}
        {step >= 2 && (
          <>
            <rect x={AGAIN_X} y={y(FIRST.again)} width={BW} height={BASE - y(FIRST.again)} rx={2} className={s.again} />
            <text x={AGAIN_X + BW / 2} y={y(FIRST.again) - 4} textAnchor="middle" className={s.label}>
              {FIRST.again}
            </text>
          </>
        )}
        <text x={AGAIN_X + BW / 2} y={BASE + 13} textAnchor="middle" className={s.tick}>
          again
        </text>
        <text x={(X0 + bx(COINS)) / 2} y={BASE + 13} textAnchor="middle" className={s.tick}>
          {COINS} coins
        </text>
        {step >= 3 && (
          <>
            <line x1={X0} y1={y(AVG_WIN)} x2={AGAIN_X + BW + 4} y2={y(AVG_WIN)} className={s.avgWin} />
            <line x1={X0} y1={y(AVG_AGAIN)} x2={AGAIN_X + BW + 4} y2={y(AVG_AGAIN)} className={s.avgAgain} />
            <text x={X0 + 2} y={y(AVG_WIN) - 3} className={s.avgLabel}>
              winners&apos; average {one(AVG_WIN)}
            </text>
            <text x={X0 + 2} y={y(AVG_AGAIN) + 11} className={s.avgLabel}>
              re-flips&apos; average {one(AVG_AGAIN)}
            </text>
          </>
        )}
      </svg>
      <Row>
        <Control className={step >= 1 ? "active" : ""} disabled={locked || step >= 1} onClick={() => setStep(1)}>
          Flip all {COINS} coins
        </Control>
        <Control
          className={step >= 2 ? "active" : ""}
          disabled={locked || step !== 1}
          onClick={() => {
            setStep(2);
            reach("again");
          }}
        >
          Flip the winner again
        </Control>
        <Control
          className={step >= 3 ? "active" : ""}
          disabled={locked || step !== 2}
          onClick={() => {
            setStep(3);
            reach("many");
          }}
        >
          Run {MORE} more contests
        </Control>
      </Row>
      <Row>
        <Readout label="Winner" value={flipped ? `${WIN} heads` : "?"} />
        <Readout label="Flipped again" value={step >= 2 ? `${FIRST.again} heads` : "?"} />
        <Readout label="Contests" value={step >= 3 ? 1 + MORE : flipped ? 1 : 0} />
      </Row>
    </div>
  );
}

export default function BestOfTwentyIdentical({ slug }: { slug: string }) {
  const [step, setStep] = useState(0);
  const exact = Math.round(exactMax());

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${COINS} fair coins are each flipped ${FLIPS} times, and the coin with the most heads wins. Over many contests, about how many heads does the winner get on average?`,
        options: [String(FLIPS / 2), String(FLIPS / 2 + 2), String(exact)],
        answer: 2,
      }}
      exploreHint="Flip the coins, re-flip the winner, then run more contests."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your first winner got {WIN} heads; flipped again it got {FIRST.again}. Over your {1 + MORE} contests the winners averaged{" "}
            <strong>{one(AVG_WIN)} heads</strong>, and the same coins flipped again averaged {one(AVG_AGAIN)}, close to the{" "}
            {FLIPS / 2} any fair coin gives.
          </p>
          <p>
            Picking the top of {COINS} noisy scores picks the luckiest, not the best. Its next result falls back toward the truth: the
            winner&apos;s curse.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} step={step} setStep={setStep} />}
    </Lesson>
  );
}
