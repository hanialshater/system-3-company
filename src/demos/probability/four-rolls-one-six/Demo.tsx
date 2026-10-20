"use client";

// At least once. 1,000 seeded players roll a die four times. Bars show how many still have no six
// after each roll; a dashed line shows what "add 1/6 per roll" would predict. Each roll removes 1/6
// of those left, so the bars shrink by 5/6 and stay above the dashed line.
// Key state: all four rolls done. Roll buttons come first in DOM order, each enabling the next.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { PLAYERS, ROLLS, addingNone, exactNone, players, stillNoSix } from "./model";
import s from "./styles.module.css";

const LEFT = stillNoSix(players());
const MILESTONES = ["four-rolls"] as const;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const pct1 = (p: number) => `${(p * 100).toFixed(1)}%`;
const n = (v: number) => v.toLocaleString("en-US");
const EXACT_ANY = 1 - exactNone(ROLLS);
const X0 = 30;
const BW = 52;
const GAP = 10;
const BASE = 170;
const H = 140;
const barX = (r: number) => X0 + r * (BW + GAP);
const y = (v: number) => BASE - (v / PLAYERS) * H;

function Stage({ locked, interact, rolled, setRolled }: { locked: boolean; interact: () => void; rolled: number; setRolled: (r: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const left = LEFT[rolled];
  const line = Array.from({ length: rolled + 1 }, (_, r) => `${barX(r) + BW / 2},${y(addingNone(r))}`).join(" ");

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked ? "Make a prediction to start." : "Bars: players with no six yet. Dashed: what adding 1/6 per roll predicts."}
      </p>
      <svg viewBox="0 0 340 196" className={`stage-svg ${s.svg}`} role="img" aria-label={`${left} of ${PLAYERS} players have no six after ${rolled} rolls`}>
        <line x1={X0 - 6} y1={BASE} x2={barX(ROLLS) + BW + 4} y2={BASE} className={s.axis} />
        {LEFT.map((v, r) => (
          <g key={r}>
            {r <= rolled && (
              <>
                <rect x={barX(r)} y={y(v)} width={BW} height={BASE - y(v)} rx={4} className={s.bar} />
                <text x={barX(r) + BW / 2} y={y(v) + 14} textAnchor="middle" className={s.barLabel}>
                  {n(v)}
                </text>
              </>
            )}
            <text x={barX(r) + BW / 2} y={BASE + 14} textAnchor="middle" className={s.tick}>
              {r === 0 ? "start" : `roll ${r}`}
            </text>
          </g>
        ))}
        {rolled > 0 && <polyline points={line} className={s.adding} />}
        {rolled > 0 && (
          <text x={barX(rolled) + BW / 2} y={y(addingNone(rolled)) - 5} textAnchor="middle" className={s.addLabel}>
            {n(Math.round(addingNone(rolled)))}
          </text>
        )}
      </svg>
      <Row>
        {Array.from({ length: ROLLS }, (_, i) => i + 1).map((r) => (
          <Control
            key={r}
            className={rolled >= r ? "active" : ""}
            disabled={locked || rolled !== r - 1}
            onClick={() => {
              setRolled(r);
              if (r === ROLLS) reach("four-rolls");
            }}
          >
            Roll {r}
          </Control>
        ))}
        <Control disabled={locked || rolled === 0} onClick={() => setRolled(0)}>
          Start over
        </Control>
      </Row>
      <Row>
        <Readout label="No six yet" value={`${n(left)} (${pct(left / PLAYERS)})`} />
        <Readout label="At least one six" value={`${n(PLAYERS - left)} (${pct((PLAYERS - left) / PLAYERS)})`} />
      </Row>
    </div>
  );
}

export default function FourRollsOneSix({ slug }: { slug: string }) {
  const [rolled, setRolled] = useState(0);
  const last = LEFT[ROLLS];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Roll a die ${ROLLS} times. How likely is at least one six?`,
        options: [`about ${pct(ROLLS / 6)}`, `about ${pct(EXACT_ANY)}`, `about ${pct(2 / 6)}`],
        answer: 1,
      }}
      exploreHint={`Roll all ${ROLLS} times and watch the no-six group.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            After {ROLLS} rolls, {n(last)} of your {n(PLAYERS)} players still had no six, so {n(PLAYERS - last)} (
            {pct((PLAYERS - last) / PLAYERS)}) had at least one. The exact chance is 1 &minus; (5/6)<sup>4</sup> ={" "}
            <strong>{pct1(EXACT_ANY)}</strong>.
          </p>
          <p>
            Each roll removes about 1/6 of the players still left, not 1/6 of everyone: {LEFT.map(n).join(" → ")}. Adding 1/6 per
            roll predicted only {n(Math.round(addingNone(ROLLS)))} left ({pct(ROLLS / 6)} with a six) and would pass 100% by the
            seventh roll.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} rolled={rolled} setRolled={setRolled} />}
    </Lesson>
  );
}
