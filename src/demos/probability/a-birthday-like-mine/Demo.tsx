"use client";

// Specific match vs any match. For a crowd of n other people, two bars: "someone shares YOUR birthday"
// (n comparisons) and "some two share one" (n(n-1)/2 pairs). Key state: crowd of 23 (pair bar leaps, your bar is
// small) and crowd of 253 (your bar reaches even odds). All numbers come from model.ts.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { ANSWER, MID, SMALL, START, pAny, pMe, pairs, pct1 } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["crowd-23", "crowd-183", "crowd-253"] as const;
const BX = 8;
const BW = 304;

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [n, setN] = useState(START);
  const go = (v: number) => {
    setN(v);
    if (v === SMALL) reach("crowd-23");
    if (v === MID) reach("crowd-183");
    if (v >= ANSWER) reach("crowd-253");
  };
  const me = pMe(n);
  const any = pAny(n);
  const val = (p: number) => (locked ? "?" : pct1(p));

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `${n} other people in the room. Bars show the chance of a match; the dashed line is even odds (50%).`}
      </p>
      <svg viewBox="0 0 320 120" className={`stage-svg ${s.svg}`} role="img" aria-label={`Crowd of ${n}: match with you ${pct1(me)}, any match ${pct1(any)}`}>
        <text x={BX} y={12} className={s.lab}>Someone shares YOUR birthday</text>
        <rect x={BX} y={16} width={BW} height={20} rx={4} className={s.track} />
        <rect x={BX} y={16} width={BW * me} height={20} rx={4} className={s.me} />
        <text x={BX} y={48} className={s.sub}>{n} comparisons (you against each person)</text>
        <text x={BX} y={72} className={s.lab}>Some two people share a birthday</text>
        <rect x={BX} y={76} width={BW} height={20} rx={4} className={s.track} />
        <rect x={BX} y={76} width={BW * any} height={20} rx={4} className={s.any} />
        <text x={BX} y={108} className={s.sub}>{pairs(n)} pairs (every person against every other)</text>
        <line x1={BX + BW / 2} x2={BX + BW / 2} y1={16} y2={36} className={s.half} />
        <line x1={BX + BW / 2} x2={BX + BW / 2} y1={76} y2={96} className={s.half} />
      </svg>
      <Row>
        <Control disabled={locked} onClick={() => go(SMALL)}>{SMALL} people</Control>
        <Control disabled={locked} onClick={() => go(ANSWER)}>{ANSWER} people</Control>
        <Control disabled={locked} onClick={() => go(MID)}>{MID} people</Control>
      </Row>
      <Row>
        <Slider label="Other people" value={n} min={1} max={300} disabled={locked} onChange={go} />
      </Row>
      <Row>
        <Readout label="Matches you" value={val(me)} />
        <Readout label="Nobody matches you" value={val(1 - me)} />
        <Readout label="Any two match" value={val(any)} />
      </Row>
    </div>
  );
}

export default function ABirthdayLikeMine({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `At a party of ${SMALL}, two guests share a birthday about half the time. How many other guests must the party have before the chance one shares YOUR birthday reaches 50%?`,
        options: [`${SMALL}`, `${MID}`, `${ANSWER}`],
        answer: 2,
      }}
      exploreHint={`Try ${SMALL}, ${MID} and ${ANSWER} people.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {SMALL} people some two matched {pct1(pAny(SMALL))} of the time, but you matched only {pct1(pMe(SMALL))}. At {MID} people you were still at{" "}
            {pct1(pMe(MID))}; at {ANSWER} you reached {pct1(pMe(ANSWER))}.
          </p>
          <p>
            {SMALL} other people make {pairs(SMALL)} pairs among themselves, but you take part in only {SMALL} comparisons, and each matches with chance 1 in 365. Each person misses your birthday with chance 364/365, and these misses multiply: after {ANSWER} people the chance that nobody matches you is {pct1(1 - pMe(ANSWER))}, so a match is even odds. (That {ANSWER} is also the number of pairs among {SMALL} people, but only by coincidence.)
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
