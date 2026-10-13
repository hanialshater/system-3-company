"use client";

// Three shelves: H2 molecules, O2 molecules, and the water made from them. Each reaction step
// takes the recipe's set (2 H2 + 1 O2) and puts 2 H2O on the bottom shelf. With 6 H2 and 4 O2
// the H2 runs out first even though there is more of it: the leftover is an O2.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const H0 = 6;
const O0 = 4;
const MOST = Math.min(H0, 2 * O0); // 6 H2O: each set of 2 H2 + 1 O2 makes 2 H2O
const O_LEFT = O0 - MOST / 2; // 1
const H_MAX = 12;
const O_MAX = 8;

const W = 320;
const H = 196;
const X = (i: number) => 22 + i * 24;

function H2({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={-4} r={5} className={s.h} />
      <circle cx={4} r={5} className={s.h} />
    </g>
  );
}
function O2({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={-4.5} r={6} className={s.o} />
      <circle cx={4.5} r={6} className={s.o} />
    </g>
  );
}
function H2O({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={-6} cy={5} r={4.5} className={s.h} />
      <circle cx={6} cy={5} r={4.5} className={s.h} />
      <circle r={7} className={s.o} />
    </g>
  );
}

export default function WhoRunsOutFirst({ slug }: { slug: string }) {
  const [h2, setH2] = useState(H0);
  const [o2, setO2] = useState(O0);
  const [water, setWater] = useState(0);
  const [fromQuestion, setFromQuestion] = useState(true); // still the 6 + 4 pile

  const ix = useRef(() => {});
  const { reach, reached } = useMilestones(() => ix.current(), ["one-set", "ran-out"]);

  const canReact = h2 >= 2 && o2 >= 1;

  const react = (all: boolean) => {
    const sets = all ? Math.min(Math.floor(h2 / 2), o2) : 1;
    const nh = h2 - 2 * sets;
    const no = o2 - sets;
    setH2(nh);
    setO2(no);
    setWater((w) => w + 2 * sets);
    if (fromQuestion) {
      reach("one-set");
      if (nh < 2 || no < 1) reach("ran-out");
    }
  };

  const left = h2 < 2 || o2 < 1;
  const outOf = h2 < 2 ? "H₂" : "O₂";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `2 H₂ + O₂ makes 2 H₂O. With ${H0} H₂ molecules and ${O0} O₂ molecules, the most H₂O you can make is…`,
        options: [String(O0), String(MOST), String(2 * O0)],
        answer: 1,
      }}
      exploreHint="React one set, then keep going until something runs out."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {reached("ran-out") ? `From ${H0} H₂ and ${O0} O₂ you made` : `From ${H0} H₂ and ${O0} O₂ you get`} <strong>{MOST} H₂O</strong>, with{" "}
            {O_LEFT} O₂ left over. The H₂ ran out first, even though there was more of it.
          </p>
          <p>
            The recipe takes H₂ and O₂ in a 2 to 1 ratio. {H0} H₂ need only {H0 / 2} O₂, and {O0} are on hand, so the H₂
            limits. What decides is which pile runs out when they are matched at the recipe&apos;s ratio, not which pile
            is smaller.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${h2} H2, ${o2} O2 and ${water} H2O`}>
              <text x={W / 2} y={14} textAnchor="middle" className={s.recipe}>
                2 H₂ + O₂ → 2 H₂O
              </text>
              <text x={6} y={38} className={s.small}>H₂</text>
              {Array.from({ length: h2 }, (_, i) => <H2 key={i} x={X(i) + 12} y={52} />)}
              <line x1={6} x2={W - 6} y1={64} y2={64} className={s.shelf} />
              <text x={6} y={86} className={s.small}>O₂</text>
              {Array.from({ length: o2 }, (_, i) => <O2 key={i} x={X(i) + 12} y={100} />)}
              <line x1={6} x2={W - 6} y1={114} y2={114} className={s.shelf} />
              <text x={6} y={136} className={s.small}>H₂O</text>
              {Array.from({ length: water }, (_, i) => <H2O key={i} x={X(i) + 12} y={150} />)}
              <line x1={6} x2={W - 6} y1={166} y2={166} className={s.shelf} />
              {left && water > 0 && (
                <text x={W / 2} y={186} textAnchor="middle" className={s.note}>
                  Out of {outOf}: no full set left
                </text>
              )}
            </svg>
            <Row>
              <Control onClick={() => react(false)} disabled={locked || !canReact}>
                React one set
              </Control>
              <Control onClick={() => react(true)} disabled={locked || !canReact}>
                Until one runs out
              </Control>
              <Control
                onClick={() => {
                  setH2(H0);
                  setO2(O0);
                  setWater(0);
                  setFromQuestion(true);
                }}
                disabled={locked || (fromQuestion && water === 0)}
              >
                Start over
              </Control>
              <Control
                onClick={() => {
                  setH2((n) => n + 1);
                  setFromQuestion(false);
                }}
                disabled={locked || h2 >= H_MAX || water + h2 >= H_MAX}
              >
                +1 H₂
              </Control>
              <Control
                onClick={() => {
                  setO2((n) => n + 1);
                  setFromQuestion(false);
                }}
                disabled={locked || o2 >= O_MAX}
              >
                +1 O₂
              </Control>
            </Row>
            <Row>
              <Readout label="H₂O made" value={water} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
