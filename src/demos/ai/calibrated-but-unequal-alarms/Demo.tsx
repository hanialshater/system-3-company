"use client";

// Fairness trade-off toy. Two groups of 100. One risk score labels people high risk (ringed) or low.
// In both groups 80% of the ringed and 20% of the others reoffend (calibrated by construction).
// Group A: 50 ringed -> 50 reoffenders; false alarms 10/50 = 20%, misses 10/50 = 20%.
// Group B: h ringed (5..50, step 15; start 20): false alarms 4/68 = 5.9%, misses 16/32 = 50% at 20.
// v2 (r14): the slider is B's base rate. It is labelled "Reoffenders in B" and reads 20 + 0.6h (23/32/41/50 of 100);
// the score's rule stays 80%/20%, so the ringed count h follows. Each grid header says "A: 50 ringed" in words, the
// readout table is reoffend / false alarms / misses (row labels on A's side only, stage budget 25 words), and a key
// under the picture explains both rings.
// The two groups' error rates match only at h = 50, where the base rates match.
// Which dots reoffend is a fixed pattern ((i + row) % 5), exact for every h that is a multiple of 5. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const N = 100;
const A_HIGH = 50;
const B = { min: 5, max: 50, step: 15, start: 20 } as const;
/** Dot i (0..99, row-major, ringed first) reoffends: 4 in 5 of the ringed, 1 in 5 of the others. */
const reoffends = (i: number, high: number) => {
  const row = Math.floor(i / 10);
  return i < high ? (i + row) % 5 !== 4 : (i + row) % 5 === 1;
};
function rates(high: number) {
  let re = 0;
  let fa = 0;
  let miss = 0;
  for (let i = 0; i < N; i++) {
    const r = reoffends(i, high);
    if (r) re++;
    if (i < high && !r) fa++;
    if (i >= high && r) miss++;
  }
  const innocent = N - re;
  return { re, innocent, fa, miss, faPct: (100 * fa) / innocent, missPct: (100 * miss) / re };
}
// MODEL END

const pc = (v: number) => `${Math.round(v)}%`;
const MILESTONES = ["question-case", "rates-equal"] as const;
const CELL = 14;
const GX = [14, 186];
const GY = 20;

function Grid({ x0, high, shown, name, first }: { x0: number; high: number; shown: boolean; name: string; first: boolean }) {
  const r = rates(high);
  const row = (k: number) => GY + 10 * CELL + 14 * (k + 1);
  return (
    <g>
      <text x={x0} y={13} className={s.label} fill="var(--fg)">
        {name}: {high} ringed
      </text>
      {Array.from({ length: N }, (_, i) => {
        const cx = x0 + (i % 10) * CELL + CELL / 2;
        const cy = GY + Math.floor(i / 10) * CELL + CELL / 2;
        const hi = i < high;
        const re = reoffends(i, high);
        const falseAlarm = shown && hi && !re;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={4.3} className={shown ? (re ? s.re : s.innocent) : s.plain} />
            {hi && <circle cx={cx} cy={cy} r={6.2} fill="none" className={falseAlarm ? s.fa : s.ring} />}
          </g>
        );
      })}
      {shown && <circle cx={x0 + 4} cy={row(0) - 4} r={4} className={s.re} aria-hidden="true" />}
      <text x={x0 + (shown ? 12 : 0)} y={row(0)} className={s.small} fill="var(--fg)">
        {r.re}
        {first ? " reoffend" : ""}
      </text>
      <text x={x0} y={row(1)} className={s.small} fill="var(--bad)">
        {shown ? `${first ? "false alarms " : ""}${r.fa}/${r.innocent} = ${pc(r.faPct)}` : ""}
      </text>
      <text x={x0} y={row(2)} className={s.small} fill="var(--fg)">
        {shown ? `${first ? "misses " : ""}${r.miss}/${r.re} = ${pc(r.missPct)}` : ""}
      </text>
    </g>
  );
}

const Ring = ({ cls }: { cls: string }) => (
  <svg width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="8" r="6" fill="none" className={cls} />
  </svg>
);

export default function CalibratedButUnequalAlarms({ slug }: { slug: string }) {
  const [shown, setShown] = useState(false);
  const [h, setH] = useState<number>(B.start);
  const [seenEqual, setSeenEqual] = useState(false);
  const [seenCase, setSeenCase] = useState(false);
  const a = rates(A_HIGH);
  const q = rates(B.start);
  const b = rates(h);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A score labels people high risk (80% reoffend) or low (20%), true in both groups. Among A's non-reoffenders, the share flagged is:",
        options: ["The same as B's", "Higher than B's", "Lower than B's"],
        answer: 1,
      }}
      exploreHint="Show the outcomes, then change how many in B reoffend."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const atEqual = h === A_HIGH;
        const c = atEqual ? q : b;
                return (
          <>
            <p>
              The score was honest in both groups: 8 in 10 ringed dots reoffended. Yet with {c.re} reoffenders in B, A&apos;s
              innocent people were flagged {pc(a.faPct)} of the time, B&apos;s {pc(c.faPct)}; B&apos;s misses were {pc(c.missPct)},
              A&apos;s {pc(a.missPct)}.
            </p>
            <p>
              A has more reoffenders, so more of A is ringed, guilty or not. The slider changed B&apos;s people, not the score: at{" "}
              {a.re}, base rates {atEqual ? "match" : "matched"}, and so {atEqual ? "do" : "did"} both errors. Otherwise no score that
              makes mistakes is calibrated with equal errors.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (sh: boolean, v: number) => {
              if (!sh) return;
              if (v === B.start) {
                setSeenCase(true);
                reach("question-case");
              }
              if (v === A_HIGH) {
                setSeenEqual(true);
                reach("rates-equal");
              }
            };
            const msg = locked
              ? "Make a prediction to start."
              : !shown
                ? "Ringed: 80% reoffend. Others: 20%. Same in A and B."
                : h === A_HIGH && seenCase
                  ? `B at ${q.re}: false alarms ${pc(q.faPct)}, misses ${pc(q.missPct)}.`
                  : h !== A_HIGH && seenEqual
                    ? `B at ${rates(A_HIGH).re}: both errors ${pc(rates(A_HIGH).faPct)}.`
                    : "Compare the false alarms.";
            return (
              <div className={s.wrap}>
                <div className={s.top}>
                  <span className={`tag ${s.model}`}>Toy groups of 100</span>
                  <Control
                    className={shown ? "active" : ""}
                    disabled={locked || shown}
                    onClick={() => {
                      setShown(true);
                      check(true, h);
                    }}
                  >
                    Show outcomes
                  </Control>
                </div>
                <p className={s.msg}>{msg}</p>
                <svg
                  viewBox="0 0 340 208"
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={shown ? `A false alarms ${pc(a.faPct)}, B false alarms ${pc(b.faPct)}` : "Two groups of 100 dots, ringed dots labelled high risk"}
                >
                  <Grid x0={GX[0]} high={A_HIGH} shown={!locked && shown} name="A" first />
                  <Grid x0={GX[1]} high={h} shown={!locked && shown} name="B" first={false} />
                </svg>
                <p className={s.key}>
                  <span>
                    <Ring cls={s.ring} /> high risk
                  </span>
                  {!locked && shown && (
                    <span>
                      <Ring cls={s.fa} /> false alarm
                    </span>
                  )}
                </p>
                <Slider
                  label="Reoffenders in B"
                  value={h}
                  min={B.min}
                  max={B.max}
                  step={B.step}
                  disabled={locked}
                  format={(v) => String(rates(v).re)}
                  onChange={(v) => {
                    setH(v);
                    check(shown, v);
                  }}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
