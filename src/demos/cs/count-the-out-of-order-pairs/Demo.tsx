"use client";

// Counting inversions while merging. 2 4 1 3 5 splits into the sorted halves [2 4] and [1 3 5] (each half has no
// out-of-order pair inside it). Merge: take the smaller front card. When a right-half card is taken, it was smaller
// than every card still waiting on the left, so each of those forms one out-of-order pair with it: add that many.
// 1 jumps 2 and 4 (+2), 3 jumps 4 (+1), 5 jumps nothing: 3 pairs, found in 5 takes instead of 10 pair checks.
// v2: "Check every pair" shows the 10 checks on stage; the jump log keeps every jump visible; the full merge is
// recorded so the reveal quotes it after Start over.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LIST = [2, 4, 1, 3, 5];
const LEFT = LIST.slice(0, 2);
const RIGHT = LIST.slice(2);
const N = LIST.length;
const ALL_PAIRS = (N * (N - 1)) / 2; // 10

// Brute force, for the reveal: every (earlier, later) pair where the earlier is bigger.
const BRUTE: [number, number][] = [];
for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (LIST[i] > LIST[j]) BRUTE.push([LIST[i], LIST[j]]);

type Step = { card: number; side: "L" | "R"; jumped: number[] };
// The whole merge, precomputed with the same rule the stage shows.
const STEPS: Step[] = (() => {
  const out: Step[] = [];
  let i = 0;
  let j = 0;
  while (i < LEFT.length || j < RIGHT.length) {
    if (j >= RIGHT.length || (i < LEFT.length && LEFT[i] <= RIGHT[j])) out.push({ card: LEFT[i++], side: "L", jumped: [] });
    else out.push({ card: RIGHT[j++], side: "R", jumped: LEFT.slice(i) });
  }
  return out;
})();
const TOTAL = STEPS.reduce((a, st) => a + st.jumped.length, 0);

const CW = 46;
const GAP = 8;
const rowX = (k: number, n: number) => 160 - (n * CW + (n - 1) * GAP) / 2 + k * (CW + GAP);
const Y_L = 34;
const Y_R = 104;
const Y_OUT = 186;

type MergeRecord = { count: number; takes: number; log: string };

const logOf = (steps: Step[]) =>
  steps
    .filter((st) => st.jumped.length > 0)
    .map((st) => `${st.card} jumped ${st.jumped.join(" ")}: +${st.jumped.length}`)
    .join(" · ");

function Stage({
  locked,
  reach,
  record,
  setRecord,
  checked,
  setChecked,
}: {
  locked: boolean;
  reach: (n: string) => void;
  record: MergeRecord | null;
  setRecord: (r: MergeRecord) => void;
  checked: boolean;
  setChecked: (b: boolean) => void;
}) {
  const [t, setT] = useState(0); // cards taken

  const go = (m: number) => {
    if (locked) return;
    const next = Math.min(STEPS.length, m);
    if (STEPS.slice(0, next).some((st) => st.jumped.length > 0)) reach("jump");
    if (next === STEPS.length) {
      const done = STEPS.slice(0, next);
      setRecord({ count: done.reduce((a, st) => a + st.jumped.length, 0), takes: next, log: logOf(done) });
      reach("merged");
    }
    setT(next);
  };

  const checkAll = () => {
    if (locked) return;
    setChecked(true);
    reach("brute");
  };

  const taken = STEPS.slice(0, t);
  const count = taken.reduce((a, st) => a + st.jumped.length, 0);
  const leftWait = LEFT.filter((v) => !taken.some((st) => st.side === "L" && st.card === v));
  const rightWait = RIGHT.filter((v) => !taken.some((st) => st.side === "R" && st.card === v));
  const lastStep = t > 0 ? STEPS[t - 1] : null;
  const log = t > 0 ? logOf(taken) : record ? `Last merge: ${record.log}` : "";

  const msg = locked
    ? "Predict first, then merge the two halves."
    : t === 0
      ? "Each half is already in order. Take the smaller front card."
      : lastStep!.side === "L"
        ? `${lastStep!.card} from the left: it jumps nobody, +0.`
        : lastStep!.jumped.length
          ? `${lastStep!.card} from the right jumps ${lastStep!.jumped.join(" and ")} still waiting: +${lastStep!.jumped.length}.`
          : `${lastStep!.card} from the right: nobody waits on the left, +0.`;

  // Where each original card is drawn now.
  const place = (v: number, side: "L" | "R") => {
    const k = taken.findIndex((st) => st.card === v && st.side === side);
    if (k >= 0) return { x: rowX(k, N), y: Y_OUT, out: true };
    const wait = side === "L" ? leftWait : rightWait;
    return { x: rowX(wait.indexOf(v), side === "L" ? LEFT.length : RIGHT.length), y: side === "L" ? Y_L : Y_R, out: false };
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">
        {msg}
      </p>
      <svg viewBox="0 0 320 236" className="stage-svg" role="img" aria-label={`Merge, ${t} of ${N} cards taken, ${count} out-of-order pairs`}>
        <text x={8} y={Y_L + 28} className={s.lab}>left</text>
        <text x={8} y={Y_R + 28} className={s.lab}>right</text>
        <text x={8} y={Y_OUT + 28} className={s.lab}>out</text>
        <line x1={20} x2={300} y1={Y_OUT - 16} y2={Y_OUT - 16} stroke="var(--line)" strokeDasharray="4 4" />
        {lastStep && lastStep.side === "R" &&
          lastStep.jumped.map((l) => {
            const a = place(l, "L");
            const b = place(lastStep.card, "R");
            return (
              <path
                key={`j${l}`}
                d={`M ${b.x + CW / 2} ${b.y} Q ${(a.x + b.x) / 2 + CW / 2} ${Y_L + 70} ${a.x + CW / 2} ${a.y + 44}`}
                fill="none"
                stroke="var(--bad)"
                strokeWidth={2.5}
              />
            );
          })}
        {(["L", "R"] as const).flatMap((side) =>
          (side === "L" ? LEFT : RIGHT).map((v) => {
            const p = place(v, side);
            const jumpedNow = !!lastStep && lastStep.side === "R" && lastStep.jumped.includes(v) && side === "L";
            const isLast = !!lastStep && lastStep.card === v && lastStep.side === side;
            return (
              <g key={`${side}${v}`} transform={`translate(${p.x} ${p.y})`}>
                <rect
                  width={CW}
                  height={42}
                  rx={7}
                  fill={isLast ? "var(--domain)" : "var(--bg-2)"}
                  fillOpacity={isLast ? 0.5 : 1}
                  stroke={jumpedNow ? "var(--bad)" : side === "L" ? "var(--fg)" : "var(--muted)"}
                  strokeWidth={jumpedNow ? 3 : 1.5}
                  strokeDasharray={side === "R" ? "5 3" : undefined}
                />
                <text x={CW / 2} y={28} textAnchor="middle" className={s.v}>
                  {v}
                </text>
              </g>
            );
          }),
        )}
      </svg>
      <p className={s.pairs} data-testid="jump-log">{log || "Jumps: none yet"}</p>
      <Row>
        <Control className={`${s.tap} active`} disabled={locked || t >= N} onClick={() => go(t + 1)}>
          Take next
        </Control>
        <Control className={s.tap} disabled={locked || t >= N} onClick={() => go(N)}>
          Finish the merge
        </Control>
        <Control className={s.tap} disabled={locked || checked} onClick={checkAll}>
          Check every pair
        </Control>
        <Control className={s.tap} disabled={locked || t === 0} onClick={() => go(0)}>
          Start over
        </Control>
      </Row>
      <Row>
        <Readout label="Merge: pairs" value={count} />
        <Readout label="Merge: takes" value={`${t} of ${N}`} />
        <Readout label="Every pair: checks" value={checked ? `${ALL_PAIRS}, ${BRUTE.length} found` : "not run"} />
      </Row>
    </div>
  );
}

export default function CountTheOutOfOrderPairs({ slug }: { slug: string }) {
  const [record, setRecord] = useState<MergeRecord | null>(null);
  const [checked, setChecked] = useState(false);
  const rec = record ?? { count: TOTAL, takes: N, log: logOf(STEPS) };
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your shuffled playlist plays tracks ${LIST.join(" ")}. How many pairs (earlier, later) are out of order, meaning the earlier one is bigger?`,
        options: ["2", "3", "5"],
        answer: 1,
      }}
      exploreHint="Merge the halves, then check every pair, and compare the counts."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Your merge counted <strong>{rec.count}</strong>: {rec.log}. When 1 left the right half ahead of 2 and 4, it
            jumped both, and each jump is one out-of-order pair. 3 jumped only 4.
          </p>
          <p>
            Checking every pair took {ALL_PAIRS} checks to find the same {BRUTE.length}:{" "}
            {BRUTE.map(([a, b]) => `(${a},${b})`).join(", ")}. The merge found them in {rec.takes} takes. Merge sort
            repeats this merge at every level, so counting this way costs O(n log n) in total, not n².
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["jump", "merged", "brute"]}>
          {(reach) => (
            <Stage
              locked={locked}
              reach={reach}
              record={record}
              setRecord={setRecord}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
