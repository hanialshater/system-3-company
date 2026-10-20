"use client";

// Three pizzas, four plates. Cut each pizza into quarters, then deal each cut pizza one quarter per
// person. Key states: all three pizzas cut ("cut-all") and all three dealt ("dealt-all"), when each
// person holds 3 quarters. Every number comes from PIZZAS, PEOPLE and PARTS below.
// QA path (controls in DOM order): cut 1, cut 2, cut 3, deal 1, deal 2, deal 3 -> both milestones.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const PIZZAS = 3;
const PEOPLE = 4;
const PARTS = PEOPLE; // each pizza is cut into as many equal slices as there are people
const NAMES = ["Ann", "Ben", "Cy", "Di"];
const MILESTONES = ["cut-all", "dealt-all"] as const;
const DEAL_X = [60, 160, 260];
const PLATE_X = [40, 120, 200, 280];
const W = 320;
const H = 214;
const R = 29;

const pt = (cx: number, cy: number, r: number, a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
function wedge(cx: number, cy: number, r: number, i: number) {
  const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / PARTS;
  const a1 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / PARTS;
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  return `M${cx} ${cy}L${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z`;
}

export default function ThreePizzasFourPeople({ slug }: { slug: string }) {
  const [cut, setCut] = useState<boolean[]>(Array(PIZZAS).fill(false));
  const [dealt, setDealt] = useState<boolean[]>(Array(PIZZAS).fill(false));
  const dealtCount = dealt.filter(Boolean).length; // quarters each person holds
  const n = PIZZAS; // quarters each person holds when every pizza is dealt

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On movie night, ${PIZZAS} pizzas are shared equally among ${PEOPLE} people, you included. Each person gets...`,
        options: [`${PIZZAS}/${PEOPLE} of a pizza`, `${PEOPLE}/${PIZZAS} of a pizza`, `1/${PEOPLE} of a pizza`],
        answer: 0,
      }}
      exploreHint="Cut every pizza, then deal each one out."
      minInteractions={MILESTONES.length}
      reveal={({ prediction }) => (
        <>
          <p>
            You cut {PIZZAS} pizzas into {PIZZAS * PARTS} quarters and dealt {n} to each of {PEOPLE} people:{" "}
            <strong>
              {n}/{PARTS} of a pizza
            </strong>{" "}
            each.
          </p>
          <p>
            Sharing {PIZZAS} among {PEOPLE} is {PIZZAS} ÷ {PEOPLE}, and that is the fraction {PIZZAS}/{PEOPLE}. Check:{" "}
            {PIZZAS} ÷ {PEOPLE} = {PIZZAS / PEOPLE}, and {PEOPLE} × {PIZZAS / PEOPLE} = {PIZZAS}.
            {prediction === 1 ? ` ${PEOPLE}/${PIZZAS} is more than a whole pizza each: there was not enough pizza.` : ""}
            {prediction === 2 ? ` 1/${PEOPLE} is one slice; each person held ${n}.` : ""}
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const caption = locked
              ? `${PIZZAS} pizzas, ${PEOPLE} people. Make a prediction to start.`
              : "Cut each pizza into 4 equal slices (quarters), then deal one quarter to each person.";
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  {DEAL_X.map((cx, p) => (
                    <g key={p}>
                      {dealt[p] ? (
                        <circle cx={cx} cy={42} r={R} className={s.gone} />
                      ) : cut[p] ? (
                        Array.from({ length: PARTS }, (_, i) => (
                          <path key={i} d={wedge(cx, 42, R, i)} className={`${s.slice} ${s[`p${p}`]}`} />
                        ))
                      ) : (
                        <circle cx={cx} cy={42} r={R} className={`${s.slice} ${s[`p${p}`]}`} />
                      )}
                      <text x={cx} y={88} className={s.label}>
                        Pizza {p + 1}
                      </text>
                    </g>
                  ))}
                  {PLATE_X.map((cx, i) => (
                    <g key={i}>
                      <circle cx={cx} cy={148} r={33} className={s.plate} />
                      {dealt.map((d, p) =>
                        d ? (
                          <path
                            key={p}
                            d={wedge(0, 0, 15, 0)}
                            transform={`translate(${cx - 7.5 + (dealt.slice(0, p).filter(Boolean).length - (dealtCount - 1) / 2) * 22} 155)`}
                            className={`${s.slice} ${s[`p${p}`]}`}
                          />
                        ) : null,
                      )}
                      <text x={cx} y={198} className={s.label}>
                        {NAMES[i]}
                      </text>
                    </g>
                  ))}
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  {cut.map((c, p) => (
                    <Control
                      key={p}
                      disabled={locked || c}
                      aria-label={`Cut pizza ${p + 1} into ${PARTS}`}
                      onClick={() => {
                        const next = cut.map((v, j) => (j === p ? true : v));
                        setCut(next);
                        if (next.every(Boolean)) reach("cut-all");
                      }}
                    >
                      Cut {p + 1}
                    </Control>
                  ))}
                </Row>
                <Row>
                  {dealt.map((d, p) => (
                    <Control
                      key={p}
                      disabled={locked || !cut[p] || d}
                      aria-label={`Deal the quarters of pizza ${p + 1}`}
                      onClick={() => {
                        const next = dealt.map((v, j) => (j === p ? true : v));
                        setDealt(next);
                        if (next.every(Boolean)) reach("dealt-all");
                      }}
                    >
                      Deal {p + 1}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Quarters cut" value={locked ? "?" : cut.filter(Boolean).length * PARTS} />
                  <Readout label="Each person holds" value={locked ? "?" : `${dealtCount} quarters`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
