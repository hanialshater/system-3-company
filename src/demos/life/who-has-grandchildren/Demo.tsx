"use client";

// Fisher's sex-ratio argument as arithmetic. 10 adults, F women and 10 - F men,
// have 40 children. Every child has exactly one mother and one father, so the
// women share 40 children and the men share the same 40. Average per woman 40/F,
// per man 40/(10-F); a son is worth F/(10-F) daughters in grandchildren.
// Equal sharing within each sex is the model's assumption. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const ADULTS = 10;
const KIDS = 40;
const MILESTONES = ["skewed", "even"] as const;
const perWoman = (f: number) => KIDS / f;
const perMan = (f: number) => KIDS / (ADULTS - f);
const fmt = (x: number) => (Number.isInteger(x) ? String(x) : x.toFixed(1));

// Numbers in the question and reveal come from the same arithmetic as the stage.
const F8 = 8;
const RATIO8 = fmt(perMan(F8) / perWoman(F8)); // "4"

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [f, setF] = useState(7);
  const { reach } = useMilestones(interact, MILESTONES);
  const go = (v: number) => {
    setF(v);
    if (v === F8) reach("skewed");
    if (v === 5) reach("even");
  };
  const scale = 100 / KIDS; // bar px per child (max 40 children for one person)

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 300 170" className={`stage-svg ${s.svg}`} role="img" aria-label={`${f} women and ${ADULTS - f} men; ${fmt(perWoman(f))} children per woman, ${fmt(perMan(f))} per man`}>
        <line x1={4} y1={130} x2={296} y2={130} className={s.base} />
        {Array.from({ length: ADULTS }, (_, i) => {
          const woman = i < f;
          const n = woman ? perWoman(f) : perMan(f);
          const x = 10 + i * 29;
          const h = locked ? 0 : n * scale;
          return (
            <g key={i}>
              <rect x={x} y={130 - h} width={22} height={h} rx={2} className={woman ? s.barW : s.barM} />
              {!locked && (
                <text x={x + 11} y={124 - h} textAnchor="middle" className={s.num}>
                  {fmt(n)}
                </text>
              )}
              {woman ? <circle cx={x + 11} cy={146} r={8} className={s.w} /> : <rect x={x + 3} y={138} width={16} height={16} rx={2} className={s.m} />}
            </g>
          );
        })}
        <text x={150} y={168} textAnchor="middle" className={s.small}>
          <tspan className={s.wT}>●</tspan> woman <tspan className={s.mT}>■</tspan> man · bar = average children each
        </text>
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. 10 adults have 40 children; each child has one mother, one father."
          : `${f} women share 40 children; ${ADULTS - f} ${ADULTS - f === 1 ? "man shares" : "men share"} the same 40.`}
      </p>

      <Row>
        <Control className={`${s.chip} ${f === F8 ? "active" : ""}`} disabled={locked || f === F8} onClick={() => go(F8)}>
          8 women, 2 men
        </Control>
        <Control className={`${s.chip} ${f === 5 ? "active" : ""}`} disabled={locked || f === 5} onClick={() => go(5)}>
          5 and 5
        </Control>
      </Row>
      <Slider label="Women among 10 adults" value={f} min={1} max={9} disabled={locked} onChange={go} />
      <Row>
        <Readout label="Per woman" value={locked ? "?" : fmt(perWoman(f))} />
        <Readout label="Per man" value={locked ? "?" : fmt(perMan(f))} />
        <Readout label="Son vs daughter" value={locked ? "?" : `${fmt(perMan(f) / perWoman(f))}×`} />
      </Row>
    </div>
  );
}

export default function WhoHasGrandchildren({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In a made-up village that is 80% female, every child has one mother and one father. On average, a son will have how many times as many children as a daughter?",
        options: ["The same", `${RATIO8} times as many`, "A quarter as many"],
        answer: 1,
      }}
      exploreHint="Set 8 women and 2 men and compare the bars. Then make it 5 and 5."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With 8 women and 2 men, the women shared 40 children (5 each) and the 2 men shared the same 40 (20 each). A son
            had <strong>{RATIO8} times</strong> as many children as a daughter.
          </p>
          <p>
            Every child has one father, so the rarer sex always has more children each. Parents who produce more of the rare
            sex get more grandchildren, which pushes the ratio back toward even. At 5 and 5 the advantage vanished: 8 each.
          </p>
          <p className="muted">
            Model: average shares only, equal cost to raise a son or a daughter, random mating. Exceptions exist, for example
            when brothers compete for the same mates.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
