"use client";

// Coupon collector. The learner rolls a seeded die until all six faces have shown. Six bars
// show how many rolls each new face took: the first few are quick, the last ones slow.
// 1,000 collections then overlay the average wait per face (1, 1.2, 1.5, 2, 3, 6) and total.
// Key state: one complete collection, then the 1,000-collection average.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { FACES, collection, expectedTotal, many, waits } from "./model";
import s from "./styles.module.css";

const MANY = many();
const MILESTONES = ["complete", "thousand"] as const;
const ANSWER = Math.round(expectedTotal); // 15

const W = 340;
const L = 28;
const R = 8;
const BT = 70;
const BB = 182;
const YMAX = 12;
const BW = (W - L - R) / FACES;
const by = (v: number) => BB - (Math.min(v, YMAX) / YMAX) * (BB - BT);

interface State {
  index: number; // which seeded collection
  shown: number; // rolls shown so far
  lastTotal: number | null; // rolls the most recent finished collection took
  many: boolean;
}

function Face({ x, y, v, on }: { x: number; y: number; v: number; on: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={34} height={34} rx={7} className={on ? s.faceOn : s.faceOff} />
      <text x={x + 17} y={y + 23} textAnchor="middle" className={on ? s.faceNum : s.faceNumOff}>
        {v}
      </text>
    </g>
  );
}

function Stage({ locked, interact, st, set }: { locked: boolean; interact: () => void; st: State; set: (s: State) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const rolls = collection(st.index);
  const done = st.shown >= rolls.length;
  const seen = new Set(rolls.slice(0, st.shown));
  const w = waits(rolls, st.shown);
  const lastRoll = st.shown ? rolls[st.shown - 1] : null;

  const roll = (all: boolean) => {
    const shown = all ? rolls.length : st.shown + 1;
    const finished = shown >= rolls.length;
    set({ ...st, shown, lastTotal: finished ? rolls.length : st.lastTotal });
    if (finished) {
      reach("complete");
      if (st.many) reach("thousand");
    }
  };

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} 200`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${st.shown} rolls; ${seen.size} of 6 faces seen`}>
        {[1, 2, 3, 4, 5, 6].map((v, i) => (
          <Face key={v} x={L + i * BW + (BW - 34) / 2} y={4} v={v} on={seen.has(v)} />
        ))}
        <text x={L} y={58} className={s.label}>
          Rolls each new face took
        </text>
        {[0, 6, 12].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={by(t)} y2={by(t)} className={s.grid} />
            <text x={L - 4} y={by(t) + 3.5} textAnchor="end" className={s.tick}>
              {t}
            </text>
          </g>
        ))}
        {Array.from({ length: FACES }, (_, k) => {
          const x = L + k * BW + 6;
          const v = w[k];
          return (
            <g key={k}>
              {v !== undefined && <rect x={x} y={by(v)} width={BW - 12} height={BB - by(v)} rx={3} className={s.bar} />}
              {v !== undefined && (
                <text x={x + (BW - 12) / 2} y={by(v) - 4} textAnchor="middle" className={s.barNum}>
                  {v}
                </text>
              )}
              {st.many && <rect x={x - 2} y={by(MANY.waits[k])} width={BW - 8} height={BB - by(MANY.waits[k])} className={s.avg} />}
              <text x={x + (BW - 12) / 2} y={BB + 13} textAnchor="middle" className={s.tick}>
                {k === 0 ? "1st" : k === 1 ? "2nd" : k === 2 ? "3rd" : `${k + 1}th`}
              </text>
            </g>
          );
        })}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : st.many
            ? `Dashed: average of ${MANY.n.toLocaleString("en-US")} collections, ${MANY.mean.toFixed(1)} rolls in all.`
            : done
              ? `All six faces in ${rolls.length} rolls.`
              : lastRoll
                ? `Rolled a ${lastRoll}. ${FACES - seen.size} faces still missing.`
                : "Roll until every face has shown."}
      </p>
      <Row>
        <Control disabled={locked || done} onClick={() => roll(false)}>
          Roll
        </Control>
        <Control disabled={locked || done} onClick={() => roll(true)}>
          Roll until all six
        </Control>
        <Control
          disabled={locked || st.many}
          onClick={() => {
            set({ ...st, many: true });
            if (st.lastTotal !== null) reach("thousand");
          }}
        >
          Run 1,000 collections
        </Control>
        <Control disabled={locked || st.shown === 0} onClick={() => set({ ...st, index: st.index + 1, shown: 0 })}>
          New collection
        </Control>
      </Row>
      <Row>
        <Readout label="Rolls" value={st.shown} />
        <Readout label="Faces seen" value={`${seen.size} / 6`} />
        <Readout label="Average, 1,000 runs" value={locked || !st.many ? "?" : MANY.mean.toFixed(1)} />
      </Row>
    </div>
  );
}

export default function CollectAllSix({ slug }: { slug: string }) {
  const [st, set] = useState<State>({ index: 0, shown: 0, lastTotal: null, many: false });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "How many rolls of a fair die does it take, on average, to have seen every face at least once?",
        options: ["About 6", "About 9", `About ${ANSWER}`],
        answer: 2,
      }}
      exploreHint="Roll until you have all six faces. Then run 1,000 collections."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {st.lastTotal !== null ? `Your collection took ${st.lastTotal} rolls. ` : ""}Over 1,000 collections the average
            was {MANY.mean.toFixed(1)}; the exact average is <strong>{expectedTotal.toFixed(1)}</strong>, not 6.
          </p>
          <p>
            The first face is free and the second is quick, but with one face missing only 1 roll in 6 helps, so the last
            face alone takes 6 rolls on average. The waits are 6/6, 6/5, 6/4, 6/3, 6/2 and 6/1 rolls, which add up to{" "}
            {expectedTotal.toFixed(1)}.
          </p>
          <p className="muted">Only {MANY.within6} of the 1,000 collections finished in six rolls.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} st={st} set={set} />}
    </Lesson>
  );
}
