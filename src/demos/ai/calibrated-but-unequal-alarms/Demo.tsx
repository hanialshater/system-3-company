"use client";

// Fairness trade-off toy. Two groups of 100. One risk score labels people high risk (ringed) or low.
// In both groups 80% of the ringed and 20% of the others reoffend (calibrated by construction).
// Group A: 50 ringed -> 50 reoffenders; false alarms 10/50 = 20%, misses 10/50 = 20%.
// Group B: h ringed (slider 5..50, step 15; start 20): false alarms 4/68 = 5.9%, misses 16/32 = 50% at 20.
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

function Grid({ x0, high, shown, label }: { x0: number; high: number; shown: boolean; label: string }) {
  const r = rates(high);
  return (
    <g>
      <text x={x0} y={13} className={s.label} fill="var(--fg)">
        {label}
      </text>
      {shown && (
        <text x={x0 + 140} y={13} textAnchor="end" className={s.small} fill="var(--fg)">
          {r.re} reoffend
        </text>
      )}
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
      <text x={x0} y={GY + 10 * CELL + 14} className={s.small} fill={shown ? "var(--bad)" : "var(--muted)"}>
        false alarms {shown ? `${r.fa} of ${r.innocent} = ${pc(r.faPct)}` : "–"}
      </text>
      <text x={x0} y={GY + 10 * CELL + 28} className={s.small} fill={shown ? "var(--fg)" : "var(--muted)"}>
        misses {shown ? `${r.miss} of ${r.re} = ${pc(r.missPct)}` : "–"}
      </text>
    </g>
  );
}

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
      exploreHint="Show the outcomes, then change how many of B are ringed."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const atEqual = h === A_HIGH;
        const c = atEqual ? q : b;
        const ch = atEqual ? B.start : h;
        return (
          <>
            <p>
              The score was honest: in A and in B, 8 in 10 ringed dots reoffended. Yet at {ch} ringed in B,{" "}
              {pc(a.faPct)} of A&apos;s innocent people were flagged against {pc(c.faPct)} of B&apos;s, and B&apos;s misses were{" "}
              {pc(c.missPct)} against A&apos;s {pc(a.missPct)}.
            </p>
            <p>
              A has more reoffenders, so more of A is ringed, guilty or not. At {A_HIGH} ringed, B&apos;s base rate{" "}
              {atEqual ? "matches" : "matched"} A&apos;s, and so {atEqual ? "do" : "did"} both errors. Unless base rates match, no
              imperfect score is calibrated and equal on both errors.
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
                ? "Ringed = high risk. 80% of ringed, 20% of the rest reoffend, in A and B."
                : h === A_HIGH && seenCase
                  ? `Seen: B at ${B.start} ringed, false alarms ${pc(q.faPct)}, misses ${pc(q.missPct)}.`
                  : h !== A_HIGH && seenEqual
                    ? `Seen: B at ${A_HIGH} ringed, both errors ${pc(rates(A_HIGH).faPct)}, as in A.`
                    : "Dark = reoffended. Red ring = flagged, did not reoffend.";
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
                  viewBox="0 0 340 190"
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={shown ? `A false alarms ${pc(a.faPct)}, B false alarms ${pc(b.faPct)}` : "Two groups of 100 dots, ringed dots labelled high risk"}
                >
                  <Grid x0={GX[0]} high={A_HIGH} shown={!locked && shown} label="Group A" />
                  <Grid x0={GX[1]} high={h} shown={!locked && shown} label="Group B" />
                </svg>
                <Slider
                  label="Ringed in B"
                  value={h}
                  min={B.min}
                  max={B.max}
                  step={B.step}
                  disabled={locked}
                  format={(v) => `${v} of 100`}
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
