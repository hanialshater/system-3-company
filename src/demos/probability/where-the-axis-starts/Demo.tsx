"use client";

// Truncated axis. Two invented schools: A 52% pass, B 56%. The y-axis runs from the chosen start to 58%, ticks
// every 2 points (labels thinned so they never sit closer than 14 px of the viewBox), with a zig-zag break mark
// when the axis does not start at 0. Apparent ratio = (56 - start) / (52 - start): 0 -> 1.08, 40 -> 1.33, 50 -> 3.00.
// Value ratio 56 / 52 = 1.08 always. Presets in DOM order: Axis from 0%, 40%, 50% (the question's case last).
// Before the first press the axis is drawn from 0 with no readouts. Milestones: axis0, axis50 (the 50% ratio is
// recorded when it fires; the reveal quotes it).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const A = 52;
const B = 56;
const TOPV = 58;
const STARTS = [0, 40, 50] as const;
const MILESTONES = ["axis0", "axis50"] as const;
const ratio = (start: number) => ((B - start) / (A - start)).toFixed(2);
const VALUE_RATIO = (B / A).toFixed(2);

const W = 320;
const H = 196;
const AX = 48;
const TOP = 22;
const BOT = 172;
const BW = 70;
const BX = [AX + 50, AX + 50 + BW + 50];

function Stage({ locked, reach, start, setStart }: {
  locked: boolean;
  reach: (n: string) => void;
  start: number | null;
  setStart: (v: number) => void;
}) {
  const st = locked || start === null ? 0 : start;
  const yOf = (v: number) => BOT - ((v - st) / (TOPV - st)) * (BOT - TOP);
  const per2 = ((BOT - TOP) * 2) / (TOPV - st);
  const labelEvery = [2, 4, 10, 20].find((k) => (per2 * k) / 2 >= 14) ?? 20;
  const ticks: number[] = [];
  for (let v = st; v <= TOPV; v += 2) ticks.push(v);
  const pick = (v: number) => {
    if (locked || v === start) return;
    setStart(v);
    if (v === 0) reach("axis0");
    if (v === 50) reach("axis50");
  };
  const showNums = !locked && start !== null;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "Pass rates at two invented schools."}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Bar chart, axis from ${st}%: School A 52%, School B 56%`}>
        <line x1={AX} x2={AX} y1={TOP - 6} y2={BOT} className={s.axis} />
        <line x1={AX} x2={W - 10} y1={BOT} y2={BOT} className={s.axis} />
        {ticks.map((v) => (
          <g key={v}>
            <line x1={AX - 4} x2={AX} y1={yOf(v)} y2={yOf(v)} className={s.axis} />
            {(v - st) % labelEvery === 0 && (
              <text x={AX - 7} y={yOf(v) + 3.5} textAnchor="end" className={s.tick}>
                {v}%
              </text>
            )}
          </g>
        ))}
        {st > 0 && <path d={`M${AX - 7},${BOT - 12}l4,-3l6,6l4,-3`} className={s.zig} />}
        {[A, B].map((v, k) => (
          <g key={k}>
            <rect x={BX[k]} y={yOf(v)} width={BW} height={BOT - yOf(v)} className={k === 0 ? s.barA : s.barB} />
            <text x={BX[k] + BW / 2} y={yOf(v) - 5} textAnchor="middle" className={s.value}>
              {v}%
            </text>
            <text x={BX[k] + BW / 2} y={BOT + 15} textAnchor="middle" className={s.label}>
              School {k === 0 ? "A" : "B"}
            </text>
          </g>
        ))}
      </svg>
      <Row>
        {STARTS.map((v) => (
          <Control key={v} disabled={locked} className={!locked && start === v ? "active" : ""} aria-pressed={!locked && start === v} onClick={() => pick(v)}>
            Axis from {v}%
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="B's bar vs A's" value={showNums ? `${ratio(st)}× as tall` : "-"} />
        <Readout label="B's value vs A's" value={showNums ? `${VALUE_RATIO}×` : "-"} />
      </Row>
    </div>
  );
}

export default function WhereTheAxisStarts({ slug }: { slug: string }) {
  const [start, setStart] = useState<number | null>(null);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "School A: 52% pass. School B: 56%. On a bar chart whose axis starts at 50%, B's bar is how many times A's height?",
        options: ["About 1.1 times", "About 2 times", "About 3 times"],
        answer: 2,
      }}
      exploreHint="Move the axis start, ending at 50%."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            B&apos;s pass rate is only {VALUE_RATIO} times A&apos;s: 56 against 52. With the axis starting at 50, each bar shows
            only the part above 50, 6 against 2, so B&apos;s bar is {ratio(50)} times as tall.
          </p>
          <p>
            A bar&apos;s length stands for its value only when the bar starts at zero. On a cut axis, read the numbers, not the
            heights.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} start={start} setStart={setStart} />}
        </Milestones>
      )}
    </Lesson>
  );
}
