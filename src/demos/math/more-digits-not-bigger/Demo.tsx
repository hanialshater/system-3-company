"use client";

// More digits, not bigger. Three bars on one shared 0-to-1 scale (tenth ticks). Each "Build" press adds
// the next digit of one number: a first digit d adds d tenth-blocks, a second digit adds d hundredth-
// slivers (a tenth as wide), a third adds d thousandth-hairlines. Widths are true to scale, so the five
// hairlines of 0.125 are barely visible. Milestone "built" fires when all three numbers are fully built
// (six digit presses, or "Build the rest"). QA path (DOM order): Build 0.3, Build 0.25, Build 0.125,
// Build the rest. Every number comes from NUMS and the built digit counts.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const NUMS = [
  { label: "0.3", digits: [3] },
  { label: "0.25", digits: [2, 5] },
  { label: "0.125", digits: [1, 2, 5] },
] as const;
const MILESTONES = ["built"] as const;
const W = 320;
const H = 188;
const X0 = 62;
const SCALE = 248; // px for 1
const ROW_Y = [26, 78, 130];
const BAR_H = 26;
const PLACE = ["tenth", "hundredth", "thousandth"] as const;

/** Value of the first k digits, in thousandths (integers, so no float noise). */
const thousandths = (digits: readonly number[], k: number) =>
  digits.slice(0, k).reduce((a, d, i) => a + d * 10 ** (2 - i), 0);
const show = (t: number) => (t === 0 ? "0" : String(t / 1000));

export default function MoreDigitsNotBigger({ slug }: { slug: string }) {
  const [built, setBuilt] = useState<number[]>([0, 0, 0]);

  const full = NUMS.map((n) => thousandths(n.digits, n.digits.length));
  const order = [...NUMS.keys()].sort((a, b) => full[b] - full[a]);
  const largest = NUMS[order[0]].label;
  const [b25t, b25h] = NUMS[1].digits;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Which of these is largest: 0.3, 0.25 or 0.125?",
        options: ["0.125", "0.25", "0.3"],
        answer: 2,
      }}
      exploreHint="Build each number digit by digit and compare the bars."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You built the bars digit by digit. {largest} got {NUMS[0].digits[0]} tenth-blocks and is the longest. 0.25 got
            only {b25t}, and its {b25h} hundredth-slivers added {show(b25h * 10)}, less than the one more block it needed.
            0.125 got {NUMS[2].digits[0]} block.
          </p>
          <p>
            Each place is worth a tenth of the one before, so compare from the first digit: extra digits only add smaller
            and smaller pieces.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (next: number[]) => {
              setBuilt(next);
              if (next.every((k, i) => k === NUMS[i].digits.length)) reach("built");
            };
            const step = (i: number) => set(built.map((k, j) => (j === i ? Math.min(NUMS[j].digits.length, k + 1) : k)));
            const all = () => set(NUMS.map((n) => n.digits.length));
            const done = built.every((k, i) => k === NUMS[i].digits.length);
            const caption = locked
              ? "Three numbers on one 0-to-1 scale. Make a prediction to start."
              : "Block = 0.1 · sliver = 0.01 · hairline = 0.001";
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  {/* shared scale */}
                  {Array.from({ length: 11 }, (_, i) => (
                    <line key={i} x1={X0 + (i * SCALE) / 10} y1={14} x2={X0 + (i * SCALE) / 10} y2={170} className={i % 5 ? s.tick : s.tickBig} />
                  ))}
                  {[0, 0.5, 1].map((v) => (
                    <text key={v} x={X0 + v * SCALE} y={184} className={s.axis} textAnchor="middle">
                      {v}
                    </text>
                  ))}

                  {NUMS.map((n, i) => {
                    const y = ROW_Y[i];
                    const k = built[i];
                    const pieces: { x: number; w: number; place: number }[] = [];
                    let x = X0;
                    n.digits.slice(0, k).forEach((d, p) => {
                      const w = SCALE / 10 ** (p + 1);
                      for (let j = 0; j < d; j++) {
                        pieces.push({ x, w, place: p });
                        x += w;
                      }
                    });
                    const t = thousandths(n.digits, k);
                    return (
                      <g key={n.label}>
                        <rect x={X0} y={y} width={SCALE} height={BAR_H} className={s.track} />
                        {pieces.map((pc, j) => (
                          <rect key={j} x={pc.x} y={y} width={pc.w} height={BAR_H} className={s[PLACE[pc.place]]} />
                        ))}
                        <text x={X0 - 8} y={y + BAR_H / 2 + 5} className={s.num} textAnchor="end">
                          0.
                          {n.digits.map((d, p) => (
                            <tspan key={p} className={p < k ? s.digitOn : s.digitOff}>
                              {d}
                            </tspan>
                          ))}
                        </text>
                        {k > 0 && (
                          <text x={x + 6} y={y + BAR_H / 2 + 4} className={s.sofar}>
                            {show(t)}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  {NUMS.map((n, i) => (
                    <Control
                      key={n.label}
                      disabled={locked || built[i] === n.digits.length}
                      onClick={() => step(i)}
                      aria-label={`Build the next digit of ${n.label}`}
                    >
                      Build {n.label}
                    </Control>
                  ))}
                  <Control disabled={locked || done} onClick={all}>
                    Build the rest
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
