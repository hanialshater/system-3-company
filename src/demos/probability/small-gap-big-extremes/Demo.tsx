"use client";

// Tail ratios. Two exact bell curves (sd 10 cm; A mean 100, B mean 105), equal batch sizes. A cutoff
// slider (100-140 cm) shades both tails; a count line gives plants above the cutoff per 100,000 in each
// batch, and a bar splits the plants above the cutoff into B and A. Every cutoff visited leaves a tick
// on that bar, so the reveal's 130 cm and 140 cm values stay on stage. Key state: cutoff 130 and 140.
// v3 (learner r1, cm-probability r5 A3): the at-130 milestone counts only when the learner lets go of the
// slider at 130 (pointer up, touch end or key up), so a drag that sweeps past 130 to 140 does not open the reveal.
// The reveal drops the overlap figure and gives "falls away faster" its per-100,000 numbers.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Readout, Row, Slider } from "@/kit/controls";
import { CUT, MEAN_A, MEAN_B, PER, density, ratio, shareB, tailA, tailB } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["at-130", "at-140"] as const;
const LO = 60;
const HI = 150;
const XL = 15;
const XW = 310;
const BASE = 118;
const PEAK = 96;
const x = (cm: number) => XL + ((cm - LO) / (HI - LO)) * XW;
const PMAX = density(0, 0);
const y = (d: number) => BASE - (d / PMAX) * PEAK;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const r1 = (v: number) => v.toFixed(1);
const fmt = (v: number) => Math.round(v).toLocaleString("en-US");
const BAR_Y = 156;
const BAR_H = 18;

function curve(mean: number, from = LO) {
  const pts: string[] = [];
  for (let cm = from; cm <= HI; cm += 0.5) pts.push(`${x(cm).toFixed(1)},${y(density(cm, mean)).toFixed(1)}`);
  return pts;
}
const tailPath = (mean: number, c: number) => `M${x(c)},${BASE} L${curve(mean, c).join(" L")} L${x(HI)},${BASE} Z`;

function Stage({ locked, reach, cut, setCut, seen, setSeen }: {
  locked: boolean;
  reach: (n: string) => void;
  cut: number;
  setCut: (v: number) => void;
  seen: number[];
  setSeen: (v: number[]) => void;
}) {
  const sb = shareB(cut);
  const right = cut >= 130;
  // The reveal's answer value must be set, not swept past: count 130 only where the learner lets go.
  const settle = (e: { target: EventTarget }) => {
    const el = e.target as HTMLInputElement;
    if (!locked && el.type === "range" && Number(el.value) === 130) reach("at-130");
  };
  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "Slide the cutoff. Shaded: plants taller than it."}</p>
      <svg viewBox="0 0 340 196" className={`stage-svg ${s.svg}`} role="img" aria-label={`cutoff ${cut} cm; B is ${pct(sb)} of plants above it`}>
        <path d={tailPath(MEAN_A, cut)} className={s.tailA} />
        <path d={tailPath(MEAN_B, cut)} className={s.tailB} />
        <polyline points={curve(MEAN_A).join(" ")} className={s.curveA} />
        <polyline points={curve(MEAN_B).join(" ")} className={s.curveB} />
        <line x1={x(MEAN_A)} y1={BASE} x2={x(MEAN_A)} y2={BASE - PEAK} className={s.mean} />
        <line x1={x(MEAN_B)} y1={BASE} x2={x(MEAN_B)} y2={BASE - PEAK} className={s.mean} />
        <text x={x(MEAN_A) - 3} y={14} textAnchor="end" className={s.labelA}>A: {MEAN_A} cm</text>
        <text x={x(MEAN_B) + 3} y={14} className={s.labelB}>B: {MEAN_B} cm</text>
        <line x1={XL} y1={BASE} x2={XL + XW} y2={BASE} className={s.axis} />
        <line x1={x(cut)} y1={30} x2={x(cut)} y2={BASE + 2} className={s.cut} />
        <text x={right ? x(cut) - 3 : x(cut) + 3} y={40} textAnchor={right ? "end" : "start"} className={s.cutText}>
          cutoff {cut} cm
        </text>
        {[60, 80, 100, 120, 140].map((t) => (
          <text key={t} x={x(t)} y={BASE + 12} textAnchor="middle" className={s.tick}>{t}</text>
        ))}
        {!locked && (
          <>
            <text x={170} y={146} textAnchor="middle" className={s.count}>
              Taller than {cut} cm, per 100,000: A {fmt(tailA(cut) * PER)}, B {fmt(tailB(cut) * PER)}
            </text>
            <rect x={XL} y={BAR_Y} width={XW * sb} height={BAR_H} className={s.barB} />
            <rect x={XL + XW * sb} y={BAR_Y} width={XW * (1 - sb)} height={BAR_H} className={s.barA} />
            <text x={XL + 5} y={BAR_Y + 13} className={s.barText}>B {pct(sb)}</text>
            <text x={XL + XW - 5} y={BAR_Y + 13} textAnchor="end" className={s.barText}>A {pct(1 - sb)}</text>
            {seen.filter((c) => c !== cut).map((c) => (
              <g key={c}>
                <line x1={XL + XW * shareB(c)} y1={BAR_Y - 2} x2={XL + XW * shareB(c)} y2={BAR_Y + BAR_H + 3} className={s.seenTick} />
                <text x={XL + XW * shareB(c)} y={BAR_Y + BAR_H + 14} textAnchor="middle" className={s.tick}>{c}</text>
              </g>
            ))}
          </>
        )}
      </svg>
      <div
        className="row"
        onPointerUp={settle}
        onTouchEnd={settle}
        onKeyUp={settle}
      >
        <Slider
          label="Cutoff"
          value={cut}
          min={CUT.min}
          max={CUT.max}
          step={CUT.step}
          disabled={locked}
          format={(v) => `${v} cm`}
          onChange={(v) => {
            setCut(v);
            if (!seen.includes(v)) setSeen([...seen, v].sort((a, b) => a - b));
            if (v === 140) reach("at-140");
          }}
        />
      </div>
      <Row>
        <Readout label="B's share above cutoff" value={locked ? "-" : `${pct(sb)} (${r1(ratio(cut))} to 1)`} />
      </Row>
    </div>
  );
}

export default function SmallGapBigExtremes({ slug }: { slug: string }) {
  const [cut, setCut] = useState(CUT.start);
  const [seen, setSeen] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Two seed batches, same spread (10 cm). Batch B averages 5 cm taller. Of plants over 130 cm, what share are from B?",
        options: ["About 50%", "About 65%", "About 80%"],
        answer: 2,
      }}
      exploreHint="Slide the cutoff to 130 cm, then to 140 cm."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The two curves mostly overlap: B is only 5 cm taller. But above 130 cm, B made up {pct(shareB(130))} of the plants,
            about {r1(ratio(130))} to 1.
          </p>
          <p>
            Per 100,000 plants, {fmt(tailA(130) * PER)} of A&apos;s and {fmt(tailB(130) * PER)} of B&apos;s were taller than 130 cm. By
            140 cm A&apos;s count fell to {fmt(tailA(140) * PER)}, B&apos;s only to {fmt(tailB(140) * PER)}, so B&apos;s share kept
            growing: {pct(shareB(140))}, about {r1(ratio(140))} to 1.
            {cut < 130 && ` At your cutoff of ${cut} cm it is ${pct(shareB(cut))}.`}
          </p>
          <p>A small gap between averages says little about the middle and a lot about the extremes.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} cut={cut} setCut={setCut} seen={seen} setSeen={setSeen} />}
        </Milestones>
      )}
    </Lesson>
  );
}
