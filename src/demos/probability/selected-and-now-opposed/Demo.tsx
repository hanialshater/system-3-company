"use client";

// Berkson's paradox. 1,500 seeded people with independent talent and looks are drawn as dots; the learner sets a
// cut on talent + looks. Admitted dots are coloured, the rest grey, and the correlation is computed from the admitted
// dots. Key state: cut at 0 (about half admitted) and at 1.5 (about 14% admitted). One slider plus two buttons.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { ALL_CUT, HALF_CUT, N, PEOPLE, TOP_CUT, fmtR, stats } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["half", "top"] as const;
const R = 3.6;
const SZ = 220;
const px = (v: number) => ((v + R) / (2 * R)) * SZ;
const py = (v: number) => SZ - ((v + R) / (2 * R)) * SZ;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const ALL = stats(ALL_CUT);
const HALF = stats(HALF_CUT);
const TOP = stats(TOP_CUT);

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [cut, setCut] = useState(ALL_CUT);
  const st = stats(cut);
  const set = (c: number) => {
    setCut(c);
    if (Math.abs(c - HALF_CUT) < 0.05) reach("half");
    if (Math.abs(c - TOP_CUT) < 0.05) reach("top");
  };
  // The cut line x + y = cut, clipped to the plot.
  const x0 = Math.max(-R, cut - R);
  const x1 = Math.min(R, cut + R);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : "Each dot: talent across, looks up. Admitted if the sum clears the line; others grey. r: 0 unrelated, negative opposed."}
      </p>
      <svg viewBox={`0 0 ${SZ} ${SZ}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${st.count} of ${N} admitted`}>
        <rect x={0} y={0} width={SZ} height={SZ} className={s.frame} />
        {PEOPLE.map((p, i) => {
          const on = p.talent + p.looks > cut;
          return <circle key={i} cx={px(p.talent)} cy={py(p.looks)} r={1.7} className={on ? s.on : s.off} />;
        })}
        {cut > ALL_CUT && cut < 2 * R && <line x1={px(x0)} y1={py(cut - x0)} x2={px(x1)} y2={py(cut - x1)} className={s.cut} />}
      </svg>
      <Row>
        <Control disabled={locked} onClick={() => set(HALF_CUT)}>Admit top half</Control>
        <Control disabled={locked} onClick={() => set(TOP_CUT)}>Admit top {pct(TOP.share)}</Control>
      </Row>
      <Row>
        <Slider label="Cut on talent + looks" value={Math.round(cut * 10)} min={-60} max={40} disabled={locked} format={(v) => (v <= -60 ? "everyone" : (v / 10).toFixed(1))} onChange={(v) => set(v / 10)} />
      </Row>
      <Row>
        <Readout label="Admitted" value={locked ? "?" : pct(st.share)} />
        <Readout label="Correlation r" value={locked ? "?" : fmtR(st.r)} />
      </Row>
    </div>
  );
}

export default function SelectedAndNowOpposed({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Talent and looks are unrelated in a crowd. A show admits only people whose talent plus looks is high (the top ${pct(TOP.share)}). Among those admitted, talent and looks are`,
        options: ["positively related", "not related", "negatively related"],
        answer: 2,
      }}
      exploreHint="Admit the top half, then the top few, and watch r."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            For everyone, r was {fmtR(ALL.r)}: unrelated. Admitting the top half gave r = {fmtR(HALF.r)}, and the top {pct(TOP.share)} gave {fmtR(TOP.r)}: negative.
          </p>
          <p>
            To clear a high bar on the sum, anyone weak in one trait must be strong in the other, so inside the admitted group the traits pull against each other. Selecting on the sum creates the link; it was not there before.
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
