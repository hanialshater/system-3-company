"use client";

// Scoops in three cups. A tank of CUPS cups drawn as CUPS columns; a scoop-size choice
// (1, 1/2, 1/3, 1/4, 1/5 cup) re-slices every column into n scoops and numbers them in order,
// so the count CUPS x n is something the learner can read off the picture. The question's
// numbers (3 cups, 1/4-cup scoop, 12) come from the same constants.
// Key state: the 1/4-cup scoop on stage, plus one other fraction to see the pattern.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const CUPS = 3;
const ASKED = 4; // the question's scoop is 1/ASKED cup
const SIZES = [1, 2, 3, 4, 5];
const MILESTONES = ["quarter", "another-fraction"] as const;

const W = 320;
const H = 200;
const COL_W = 74;
const GAP = 22;
const TOP = 14;
const BOT = 26;
const COL_H = H - TOP - BOT;

const frac = (n: number) => (n === 1 ? "1" : `1/${n}`);

export default function ScoopsInThreeCups({ slug }: { slug: string }) {
  const [n, setN] = useState(1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Cooking dinner, you measure out ${CUPS} cups of rice with a ${frac(ASKED)}-cup scoop. How many scoops fit in those ${CUPS} cups?`,
        options: [String(CUPS * ASKED), `${CUPS}/${ASKED}`, String(CUPS + ASKED)],
        answer: 0,
      }}
      exploreHint={`Change the scoop size. Try the ${frac(ASKED)} cup.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{CUPS * ASKED}.</strong> Each cup held {ASKED} of the {frac(ASKED)}-cup scoops, and there are {CUPS}{" "}
            cups: {CUPS} ÷ {frac(ASKED)} = {CUPS} × {ASKED} = {CUPS * ASKED}.
          </p>
          <p>
            Division asks “how many of these fit?” When the piece is smaller than 1, more of them fit than the number you
            started with, so the answer is bigger. Dividing by 1/n is the same as multiplying by n.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} n={n} setN={setN} />}
    </Lesson>
  );
}

function Stage({ locked, interact, n, setN }: StageContext & { n: number; setN: (v: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const x0 = (W - (CUPS * COL_W + (CUPS - 1) * GAP)) / 2;
  const h = COL_H / n;

  const pick = (v: number) => {
    setN(v);
    if (v === ASKED) reach("quarter");
    else if (v !== 1) reach("another-fraction");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${CUPS} cups cut into ${frac(n)}-cup scoops`}>
        {Array.from({ length: CUPS }, (_, c) => {
          const x = x0 + c * (COL_W + GAP);
          return (
            <g key={c}>
              {Array.from({ length: n }, (_, j) => {
                const idx = c * n + j + 1;
                const y = TOP + COL_H - (j + 1) * h;
                return (
                  <g key={j}>
                    <rect x={x} y={y} width={COL_W} height={h} className={idx % 2 ? s.scoopA : s.scoopB} />
                    <text x={x + COL_W / 2} y={y + h / 2 + 4.5} textAnchor="middle" className={s.num}>
                      {idx}
                    </text>
                  </g>
                );
              })}
              <rect x={x} y={TOP} width={COL_W} height={COL_H} className={s.cup} />
              <text x={x + COL_W / 2} y={H - 8} textAnchor="middle" className={s.label}>
                cup {c + 1}
              </text>
            </g>
          );
        })}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : n === 1
            ? `1-cup scoop: 1 per cup, ${CUPS} scoops. Pick a smaller scoop.`
            : `${frac(n)}-cup scoop: ${n} per cup × ${CUPS} cups = ${CUPS * n} scoops.`}
      </p>

      <Row>
        {SIZES.map((v) => (
          <Control key={v} disabled={locked || v === n} className={v === n ? "active" : ""} aria-pressed={v === n} aria-label={`Scoop of ${frac(v)} cup`} onClick={() => pick(v)}>
            {v === 1 ? "1 cup" : frac(v)}
          </Control>
        ))}
        <Readout label="Scoops" value={locked ? "?" : CUPS * n} />
      </Row>
    </div>
  );
}
