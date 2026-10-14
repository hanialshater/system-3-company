"use client";

// Two lanes, the same 16 reversed cards. Top: plain insertion sort (gap 1), 120 shifts. Bottom: Shell sort with gaps
// 8, 4, 2, 1, one button per pass, 8 shifts each, 32 in all. "Farthest from its place" falls 15, 7, 3, 1, 0 in the
// Shell lane: the far passes do the long carrying, so the last pass (ordinary insertion sort) has little left.
// A shift copies one card one gap over; replays are drawn in the equivalent swap form so no card is shown twice.
// Milestones: plain-sorted, shell-sorted (spec company/design/specs/shell-gaps-shrink-the-shuffles.md).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 16;
const START = Array.from({ length: N }, (_, i) => N - i); // 16 15 ... 1
const GAPS = [8, 4, 2, 1];

type Frame = { arr: number[]; shifts: number; arc?: [number, number]; group?: number[] };

const far = (a: number[]) => Math.max(...a.map((v, i) => Math.abs(i - (v - 1))));

// Plain insertion sort: one frame per insertion (15 insertions).
const PLAIN: Frame[] = (() => {
  const a = [...START];
  let shifts = 0;
  const out: Frame[] = [{ arr: [...a], shifts }];
  for (let i = 1; i < N; i++) {
    const v = a[i];
    let j = i;
    while (j >= 1 && a[j - 1] > v) {
      a[j] = a[j - 1];
      j -= 1;
      shifts++;
    }
    a[j] = v;
    out.push({ arr: [...a], shifts });
  }
  return out;
})();

// Shell sort: one frame per shift, so each shift can be drawn as an arc. PASS_END[p] is the frame count after pass p.
const { SHELL, PASS_END } = (() => {
  const a = [...START];
  let shifts = 0;
  const frames: Frame[] = [{ arr: [...a], shifts }];
  const ends: number[] = [];
  for (const g of GAPS) {
    for (let i = g; i < N; i++) {
      let j = i;
      const group = Array.from({ length: N }, (_, x) => x).filter((x) => x % g === i % g);
      while (j >= g && a[j - g] > a[j]) {
        [a[j - g], a[j]] = [a[j], a[j - g]];
        shifts++;
        frames.push({ arr: [...a], shifts, arc: [j - g, j], group });
        j -= g;
      }
    }
    ends.push(frames.length - 1);
  }
  return { SHELL: frames, PASS_END: ends };
})();

const PLAIN_TOTAL = PLAIN[PLAIN.length - 1].shifts; // 120
const SHELL_TOTAL = SHELL[SHELL.length - 1].shifts; // 32
const PASS_SHIFTS = PASS_END.map((e, p) => SHELL[e].shifts - (p ? SHELL[PASS_END[p - 1]].shifts : 0)); // 8 8 8 8
const PASS_FAR = PASS_END.map((e) => far(SHELL[e].arr)); // 7 3 1 0

const reduced = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function useRun(ms: number) {
  const [k, setK] = useState(0);
  const [target, setTarget] = useState(0);
  useEffect(() => {
    if (k >= target) return;
    const t = setTimeout(() => setK((x) => x + 1), ms);
    return () => clearTimeout(t);
  }, [k, target, ms]);
  const runTo = (n: number) => {
    if (n <= target) return;
    setTarget(n);
    setK(reduced() ? n : k + 1);
  };
  return { k, target, runTo };
}

const CW = 21;
const X0 = 2;

function Cards({ y, arr, raised }: { y: number; arr: number[]; raised?: number[] }) {
  return (
    <g>
      {arr.map((v, i) => {
        const p = Math.round(8 + ((v - 1) / (N - 1)) * 77);
        const up = raised?.includes(i) ? 4 : 0;
        return (
          <g key={i}>
            <rect
              x={X0 + i * CW}
              y={y - up}
              width={CW - 1}
              height={30}
              fill={`color-mix(in srgb, var(--fg) ${p}%, var(--bg-2))`}
              stroke="var(--line)"
            />
            <text
              x={X0 + i * CW + (CW - 1) / 2}
              y={y - up + 19}
              textAnchor="middle"
              className={s.card}
              style={{ fill: p > 45 ? "var(--bg)" : "var(--fg)" }}
            >
              {v}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Stage({
  locked,
  interact,
  plain,
  shell,
}: {
  locked: boolean;
  interact: () => void;
  plain: ReturnType<typeof useRun>;
  shell: ReturnType<typeof useRun>;
}) {
  const { reach } = useMilestones(interact, ["plain-sorted", "shell-sorted"]);
  const pf = PLAIN[plain.k];
  const sf = SHELL[shell.k];
  const plainDone = plain.k >= PLAIN.length - 1;
  const shellDone = shell.k >= SHELL.length - 1;
  useEffect(() => {
    if (plainDone) reach("plain-sorted");
  }, [plainDone]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (shellDone) reach("shell-sorted");
  }, [shellDone]); // eslint-disable-line react-hooks/exhaustive-deps

  // Passes finished, and the pass the latest frame belongs to.
  const passesDone = PASS_END.filter((e) => shell.k >= e).length;
  const running = shell.k < shell.target;
  const curPass = PASS_END.findIndex((e) => shell.k <= e && shell.k > 0);
  const passStart = curPass > 0 ? PASS_END[curPass - 1] : 0;
  const arcs = shell.k > 0 ? SHELL.slice(passStart + 1, shell.k + 1).map((f) => f.arc!) : [];
  const raised = running ? sf.group : undefined;

  const tally = GAPS.map((g, p) => `${g} apart: ${passesDone > p ? PASS_SHIFTS[p] : "?"}`).join(" · ");
  const total = passesDone === GAPS.length ? String(SHELL_TOTAL) : "?";

  const press = (p: number) => shell.runTo(PASS_END[p]);
  const cx = (i: number) => X0 + i * CW + (CW - 1) / 2;

  return (
    <div className={s.wrap}>
      <p className={s.rule}>A shift copies one card one gap to the right. Gap 1 is ordinary insertion sort.</p>
      <svg
        viewBox="0 0 340 172"
        className="stage-svg"
        role="img"
        aria-label={`Plain lane: ${pf.shifts} shifts, farthest card ${far(pf.arr)} places from home. Shell lane: ${sf.shifts} shifts, farthest card ${far(sf.arr)} places from home`}
      >
        <text x={X0} y={12} className={s.title}>
          Plain insertion
        </text>
        <text x={338} y={12} textAnchor="end" className={s.read}>
          Shifts: {pf.shifts} · Farthest from its place: {far(pf.arr)}
        </text>
        <Cards y={20} arr={pf.arr} />

        <text x={X0} y={78} className={s.title}>
          Shell: 8, 4, 2, 1 apart
        </text>
        <text x={338} y={78} textAnchor="end" className={s.read}>
          Shifts: {sf.shifts} · Farthest from its place: {far(sf.arr)}
        </text>
        <Cards y={90} arr={sf.arr} raised={raised} />
        {arcs.map(([a, b], i) => {
          const d = Math.min(26, 6 + (b - a) * 2.4);
          return (
            <path
              key={`${passStart}-${i}`}
              d={`M${cx(a)},123 Q${(cx(a) + cx(b)) / 2},${123 + d} ${cx(b)},123`}
              fill="none"
              stroke="var(--fg)"
              strokeWidth={1}
            />
          );
        })}
        <text x={X0} y={166} className={passesDone === GAPS.length ? s.tallyDone : s.tally}>
          {tally} · total {total}
        </text>
      </svg>
      <Row>
        <Control
          className={s.tap}
          disabled={locked || plain.target >= PLAIN.length - 1}
          onClick={() => plain.runTo(PLAIN.length - 1)}
        >
          Plain insertion sort
        </Control>
      </Row>
      <Row>
        {GAPS.map((g, p) => {
          const ready = p === 0 ? shell.target === 0 : shell.k >= PASS_END[p - 1] && shell.target === PASS_END[p - 1];
          return (
            <Control key={g} className={s.tap} disabled={locked || !ready} onClick={() => press(p)}>
              Sort {g} apart
            </Control>
          );
        })}
      </Row>
    </div>
  );
}

export default function ShellGapsShrinkTheShuffles({ slug }: { slug: string }) {
  const plain = useRun(20);
  const shell = useRun(35);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "16 cards are in exact reverse order. Insertion sort needs 120 shifts (a shift copies one card one place over). Shell sort first insertion-sorts cards 8 apart, then 4 apart, then 2, then 1 (ordinary insertion sort); a shift there copies a card one gap over. How many shifts in total?",
        options: ["120, the same", "About 60", "32"],
        answer: 2,
      }}
      exploreHint="Run plain insertion, then the four Shell passes."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Plain insertion made <strong>{PLAIN_TOTAL}</strong> shifts: the 1 had to walk {N - 1} places, one at a time.
            Shell sort made {PASS_SHIFTS[0]} per pass, <strong>{SHELL_TOTAL}</strong> in all.
          </p>
          <p>
            Watch &ldquo;farthest from its place&rdquo;: {far(START)}, then {PASS_FAR.slice(0, 3).join(", ")}. When the
            gap reached 1, every card was a step from home, so ordinary insertion sort had only {PASS_SHIFTS[3]} swaps
            left. The far passes did the long carrying in big jumps.
          </p>
          <p className="muted">The last pass is plain insertion sort, so the result is sorted whatever came before.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} plain={plain} shell={shell} />}
    </Lesson>
  );
}
