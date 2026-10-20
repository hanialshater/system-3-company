"use client";

// Kleiber's rule as a toy: resting energy use = (mass)^0.75, measured against a
// 20 g mouse. The animal is drawn NOT to scale (its size grows with log mass);
// its glow is the energy burned per gram, relative to the mouse (mass^-0.25).
// A faint full-glow mouse sits in the corner for comparison. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const EXP = 0.75;
/** Mass as a multiple of a 20 g mouse. The last step is the lesson's elephant (3,200 kg). */
const RATIOS = [1, 10, 100, 1000, 10000, 160000];
const LAST = RATIOS.length - 1;
const MILESTONES = ["elephant", "between"] as const;

const massLabel = (r: number) => {
  const g = 20 * r;
  return g < 1000 ? `${g} g` : `${(g / 1000).toLocaleString("en-US")} kg`;
};
const total = (r: number) => r ** EXP;
const perGram = (r: number) => r ** (EXP - 1);
const fmt = (x: number) => (x < 10 ? x.toFixed(1).replace(/\.0$/, "") : Math.round(x).toLocaleString("en-US"));
const fmtPerGram = (r: number) => (r === 1 ? "1" : `1/${fmt(1 / perGram(r))}`);

// Numbers quoted in the question and reveal come from the same functions as the stage.
const BIG = RATIOS[LAST];
const BIG_TOTAL = fmt(total(BIG)); // "8,000"
const BIG_PER_GRAM = fmtPerGram(BIG); // "1/20"

function Animal({ x, y, k, glow, className }: { x: number; y: number; k: number; glow: number; className: string }) {
  // A simple four-legged silhouette, scaled by k around (x, y) = feet line centre.
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${k.toFixed(3)})`} className={className} style={{ fillOpacity: glow }}>
      <ellipse cx={0} cy={-34} rx={34} ry={20} />
      <circle cx={34} cy={-46} r={13} />
      <rect x={-26} y={-20} width={9} height={20} rx={3} />
      <rect x={-8} y={-20} width={9} height={20} rx={3} />
      <rect x={10} y={-20} width={9} height={20} rx={3} />
      <rect x={24} y={-20} width={9} height={20} rx={3} />
    </g>
  );
}

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [i, setI] = useState(0);
  const { reach } = useMilestones(interact, MILESTONES);
  const r = RATIOS[i];
  const go = (v: number) => {
    setI(v);
    if (v === LAST) reach("elephant");
    if (v > 0 && v < LAST) reach("between");
  };
  const k = 0.55 + (1.75 * Math.log10(r)) / Math.log10(BIG);
  const glow = 0.1 + 0.9 * perGram(r);

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 300 190" className={`stage-svg ${s.svg}`} role="img" aria-label={`${massLabel(r)} animal, burning ${fmtPerGram(r)} as much per gram as a mouse`}>
        <line x1={6} y1={176} x2={294} y2={176} className={s.ground} />
        <Animal x={150} y={176} k={k} glow={glow} className={s.body} />
        {i > 0 && <Animal x={22} y={176} k={0.3} glow={1} className={s.body} />}
        {i > 0 && (
          <text x={8} y={140} className={s.tag}>
            mouse
          </text>
        )}
        <text x={292} y={16} textAnchor="end" className={s.tag}>
          not to scale · glow = burn per gram
        </text>
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. Rule of thumb: resting energy grows as mass to the ¾ power."
          : `${massLabel(r)}, ${fmt(r)}× a mouse's mass: ${fmt(total(r))}× its energy in total, ${fmtPerGram(r)} per gram.`}
      </p>

      <Row>
        <Control className={`${s.chip} ${i === LAST ? "active" : ""}`} disabled={locked || i === LAST} onClick={() => go(LAST)}>
          Elephant (3,200 kg)
        </Control>
        <Control className={`${s.chip} ${i === 0 ? "active" : ""}`} disabled={locked || i === 0} onClick={() => go(0)}>
          Mouse (20 g)
        </Control>
      </Row>
      <Slider label="Body mass" value={i} min={0} max={LAST} disabled={locked} format={(v) => massLabel(RATIOS[v])} onChange={go} />
      <Row>
        <Readout label="Mass" value={`${fmt(r)}×`} />
        <Readout label="Total energy" value={locked ? "?" : `${fmt(total(r))}×`} />
        <Readout label="Per gram" value={locked ? "?" : fmtPerGram(r)} />
      </Row>
    </div>
  );
}

export default function MouseVsElephant({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `At the zoo, an elephant and a mouse both lie resting. The elephant is about ${BIG.toLocaleString("en-US")} times heavier. With the rough ¾-power rule for resting energy, how many times more energy does it use in total?`,
        options: [`About ${BIG.toLocaleString("en-US")} times`, `About ${BIG_TOTAL} times`, "About 400 times"],
        answer: 1,
      }}
      exploreHint="Jump to the elephant, then slide through the sizes in between and watch the glow per gram."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The elephant, {BIG.toLocaleString("en-US")} times the mass, used about <strong>{BIG_TOTAL} times</strong> the
            energy, not {BIG.toLocaleString("en-US")}. So each gram of elephant burned only {BIG_PER_GRAM} as much as a gram
            of mouse: that is why its glow faded as you slid up.
          </p>
          <p>
            Energy use grows as mass to the ¾ power, so per gram it falls as mass to the &minus;¼ power. Each tenfold step in
            mass multiplied the total by about 5.6, not 10. Big animals run slower per gram.
          </p>
          <p className="muted">
            Model: a rough rule of thumb across mammals. The exponent is still debated (some studies find nearer ⅔), and
            single species sit above or below the line.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
