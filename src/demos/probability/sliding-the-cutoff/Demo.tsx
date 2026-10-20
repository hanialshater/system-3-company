"use client";

// Sensitivity vs specificity as a moving cutoff. Two overlapping score curves (healthy mean 0, sick mean 2,
// spread 1). The learner moves the cutoff and reads the two error shares from the same function that draws
// the shaded tails. Key state: cutoff raised to 1.5 and lowered to 0.5 (both tails seen trading), plus a better test.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { BETTER, BETTER_HEALTHY, HIGH_CUT, LOW_CUT, SICK, START_CUT, errors, pct1, pdf } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["raised", "lowered", "better"] as const;
const X0 = -3;
const X1 = 6.5;
const W = 320;
const H = 120;
const px = (x: number) => ((x - X0) / (X1 - X0)) * W;
const py = (y: number) => H - 14 - y * 150;

function area(mean: number, from: number, to: number) {
  const pts: string[] = [];
  for (let x = from; x <= to + 1e-9; x += 0.05) pts.push(`${px(x).toFixed(1)},${py(pdf(x, mean)).toFixed(1)}`);
  return `M${px(from).toFixed(1)},${py(0)} L${pts.join(" L")} L${px(to).toFixed(1)},${py(0)} Z`;
}
function line(mean: number) {
  const pts: string[] = [];
  for (let x = X0; x <= X1 + 1e-9; x += 0.05) pts.push(`${px(x).toFixed(1)},${py(pdf(x, mean)).toFixed(1)}`);
  return `M${pts.join(" L")}`;
}

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [cut, setCut] = useState(START_CUT);
  const [better, setBetter] = useState(false);
  const mean = better ? BETTER : SICK;
  const hmean = better ? BETTER_HEALTHY : 0;
  const e = errors(cut, mean, hmean);
  const old = errors(cut, SICK, 0);
  const move = (c: number) => {
    setCut(c);
    if (c >= HIGH_CUT) reach("raised");
    if (c <= LOW_CUT) reach("lowered");
  };
  const show = (v: string) => (locked ? "?" : v);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : "Flagged = score above the line. Missed: sick below it. False alarm: healthy above it."}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Cutoff ${cut.toFixed(1)}`}>
        <path d={area(hmean, cut, X1)} className={s.fa} />
        <path d={area(mean, X0, cut)} className={s.miss} />
        <path d={line(hmean)} className={s.healthy} fill="none" />
        <path d={line(mean)} className={s.sick} fill="none" />
        <rect x={4} y={4} width={8} height={8} className={s.miss} />
        <text x={15} y={11} className={s.lab}>missed sick</text>
        <rect x={4} y={16} width={8} height={8} className={s.fa} />
        <text x={15} y={23} className={s.lab}>false alarm</text>
        <line x1={px(cut)} x2={px(cut)} y1={6} y2={H - 14} className={s.cut} />
        <text x={px(hmean)} y={H - 2} textAnchor="middle" className={s.lab}>healthy</text>
        <text x={px(mean)} y={H - 2} textAnchor="middle" className={s.lab}>sick</text>
      </svg>
      <Row>
        <Control disabled={locked} onClick={() => move(HIGH_CUT)}>Raise to {HIGH_CUT}</Control>
        <Control disabled={locked} onClick={() => move(LOW_CUT)}>Lower to {LOW_CUT}</Control>
        <Control
          className={better ? "active" : ""}
          disabled={locked}
          onClick={() => {
            setBetter(!better);
            if (!better) reach("better");
          }}
        >
          {better ? "Back to old test" : "Better test"}
        </Control>
      </Row>
      <Row>
        <Slider label="Cutoff" value={Math.round(cut * 10)} min={-5} max={30} disabled={locked} format={(v) => (v / 10).toFixed(1)} onChange={(v) => move(v / 10)} />
      </Row>
      <Row>
        <Readout label="Sick people missed" value={show(better ? `${pct1(e.missed)} (old test ${pct1(old.missed)})` : pct1(e.missed))} />
        <Readout label="Healthy false alarms" value={show(better ? `${pct1(e.falseAlarms)} (old test ${pct1(old.falseAlarms)})` : pct1(e.falseAlarms))} />
      </Row>
    </div>
  );
}

const A = errors(START_CUT, SICK);
const HI = errors(HIGH_CUT, SICK);
const LO = errors(LOW_CUT, SICK);

export default function SlidingTheCutoff({ slug }: { slug: string }) {
  const opts = [Math.round(HI.falseAlarms * 100), Math.round(A.missed * 100), Math.round(HI.missed * 100)];
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your clinic's blood test scores healthy people around 0 and sick people around 2, both spread 1. At cutoff ${START_CUT} it misses ${pct1(A.missed)} of sick patients. Raise the cutoff to ${HIGH_CUT}: it misses`,
        options: opts.map((o) => `about ${o}%`),
        answer: 2,
      }}
      exploreHint={`Raise the cutoff to ${HIGH_CUT}, lower it to ${LOW_CUT}, then try the better test.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {HIGH_CUT} you saw {pct1(HI.missed)} of sick people missed, while false alarms fell to {pct1(HI.falseAlarms)}. At {LOW_CUT} it flipped:{" "}
            {pct1(LO.missed)} missed, {pct1(LO.falseAlarms)} false alarms.
          </p>
          <p>
            Moving the line trades one mistake for the other. Only pulling the curves apart, as the better test did, shrinks both at once, at the same cutoff.
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
