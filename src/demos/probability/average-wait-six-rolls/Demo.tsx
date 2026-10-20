"use client";

// Geometric waiting. One histogram: how many of 1,000 seeded players needed 1, 2, ... 25+ rolls for
// their first six. A marker splits the bars; bars beyond it are highlighted and counted.
// Key state: rolled, then marker at 6 and at 4. Buttons in DOM order: roll, mark 6, mark 4.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CAP, MEAN, PLAYERS, exactMoreThan, halfDoneBy, histogram, mean, moreThan, waits } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["six", "four"] as const;
const W = waits();
const HIST = histogram(W);
const TOP = Math.max(...HIST);
const AVG = mean(W);
const HALF = halfDoneBy(W);
const MARKS: readonly number[] = [MEAN, HALF];
const n = (v: number) => v.toLocaleString("en-US");
const pct = (p: number) => `${Math.round(p * 100)}%`;

const X0 = 14;
const BW = 11.6;
const GAP = 1;
const BASE = 150;
const H = 126;
const bx = (k: number) => X0 + (k - 1) * (BW + GAP);
const y = (v: number) => BASE - (v / TOP) * H;

function Stage({
  locked,
  interact,
  rolled,
  setRolled,
  mark,
  setMark,
}: {
  locked: boolean;
  interact: () => void;
  rolled: boolean;
  setRolled: (b: boolean) => void;
  mark: number;
  setMark: (k: number) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const beyond = mark ? moreThan(W, mark) : 0;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `Each bar: how many of ${n(PLAYERS)} players needed that many rolls for their first six.`}
      </p>
      <svg viewBox="0 0 340 186" className={`stage-svg ${s.svg}`} role="img" aria-label={rolled ? `Histogram of ${PLAYERS} waits` : "Not rolled yet"}>
        <line x1={X0 - 2} y1={BASE} x2={bx(CAP) + BW + 2} y2={BASE} className={s.axis} />
        {rolled &&
          HIST.map((v, i) => (
            <rect key={i} x={bx(i + 1)} y={y(v)} width={BW} height={BASE - y(v)} rx={1.5} className={mark && i + 1 > mark ? s.beyond : s.bar} />
          ))}
        {[1, 4, 6, 10, 15, 20].map((k) => (
          <text key={k} x={bx(k) + BW / 2} y={BASE + 13} textAnchor="middle" className={s.tick}>
            {k}
          </text>
        ))}
        <text x={bx(CAP) + BW / 2} y={BASE + 13} textAnchor="middle" className={s.tick}>
          {CAP}+
        </text>
        <text x={(X0 + bx(CAP)) / 2} y={BASE + 28} textAnchor="middle" className={s.tick}>
          rolls needed
        </text>
        {rolled && mark > 0 && (
          <>
            <line x1={bx(mark) + BW + GAP / 2} y1={10} x2={bx(mark) + BW + GAP / 2} y2={BASE} className={s.marker} />
            <text x={bx(mark) + BW + 4} y={20} className={s.markLabel}>
              more than {mark}: {n(beyond)}
            </text>
          </>
        )}
      </svg>
      <Row>
        <Control
          className={rolled ? "active" : ""}
          disabled={locked || rolled}
          onClick={() => setRolled(true)}
        >
          Roll for {n(PLAYERS)} players
        </Control>
        {MARKS.map((k, i) => (
          <Control
            key={k}
            className={mark === k ? "active" : ""}
            disabled={locked || !rolled || mark === k}
            onClick={() => {
              setMark(k);
              reach(MILESTONES[i]);
            }}
          >
            Mark {k} rolls
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Average rolls" value={rolled ? AVG.toFixed(1) : "?"} />
        <Readout label={mark ? `More than ${mark}` : "More than …"} value={rolled && mark ? `${n(beyond)} (${pct(beyond / PLAYERS)})` : "?"} />
      </Row>
    </div>
  );
}

export default function AverageWaitSixRolls({ slug }: { slug: string }) {
  const [rolled, setRolled] = useState(false);
  const [mark, setMark] = useState(0);
  const over = moreThan(W, MEAN);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `To start a board game you must roll a six. On average that takes ${MEAN} rolls. What is the chance you still have no six after ${MEAN} rolls?`,
        options: ["about 10%", `about ${pct(exactMoreThan(MEAN))}`, "about 50%"],
        answer: 1,
      }}
      exploreHint={`Roll for everyone, then mark ${MEAN} rolls and ${HALF} rolls.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Of your {n(PLAYERS)} players, {n(over)} ({pct(over / PLAYERS)}) needed more than {MEAN} rolls, close to the exact (5/6)
            <sup>{MEAN}</sup> = <strong>{pct(exactMoreThan(MEAN))}</strong>. Half were done by roll {HALF}, yet their average was{" "}
            {AVG.toFixed(1)} rolls.
          </p>
          <p>
            Most players finish early, but a few wait {CAP} rolls or more (the last bar). Those long waits pull the average above what a
            typical player sees.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} rolled={rolled} setRolled={setRolled} mark={mark} setMark={setMark} />
      )}
    </Lesson>
  );
}
