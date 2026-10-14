"use client";

// Edge detection on one pixel row: slide a 3-pixel window and compute right neighbour minus left
// neighbour (the filter [-1 0 +1]). Row 200 200 200 10 10 10: inner pixels 2..5 give 0, -190, -190, 0.
// Flat patches give 0 whatever their brightness; only the two windows straddling the step are nonzero.
// The swap toggle reverses the step (10 10 10 200 200 200: 0, 190, 190, 0): the sign shows the direction.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const ROW_A = [200, 200, 200, 10, 10, 10];
const ROW_B = [10, 10, 10, 200, 200, 200];
const FIRST = 2; // inner pixels, 1-based
const LAST = ROW_A.length - 1; // 5
const filt = (row: number[], p: number) => row[p] - row[p - 2]; // right minus left, p is 1-based
const OUT_A = Array.from({ length: LAST - FIRST + 1 }, (_, k) => filt(ROW_A, FIRST + k)); // 0 -190 -190 0
const NONZERO_A = OUT_A.filter((v) => v !== 0).length; // 2
const signed = (v: number) => (v > 0 ? `+${v}` : v < 0 ? `−${-v}` : "0");

// drawing
const PW = 44;
const GAP = 6;
const X0 = (320 - (ROW_A.length * PW + (ROW_A.length - 1) * GAP)) / 2;
const px = (p: number) => X0 + (p - 1) * (PW + GAP); // left edge of pixel p (1-based)
const PY = 34;

export default function EdgesAreDifferences({ slug }: { slug: string }) {
  const [swapped, setSwapped] = useState(false);
  const [pos, setPos] = useState(FIRST);
  const [seen, setSeen] = useState<number[]>([]); // window centres visited, this row
  const row = swapped ? ROW_B : ROW_A;
  const here = filt(row, pos);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A row of pixel brightness values is ${ROW_A.join(" ")}. For each of the four inner pixels, compute right neighbour minus left neighbour. How many of the four answers are not zero?`,
        options: ["0", String(NONZERO_A), "4"],
        answer: 1,
      }}
      exploreHint="Slide the window across every inner pixel and watch which answers are not zero."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The window gave {OUT_A.map(signed).join(", ")}. At pixel 2 everything nearby was bright and at pixel 5 everything was dark,
            yet both gave 0. Only the two windows that straddle the step gave a big number.
          </p>
          <p>
            A flat patch gives zero whatever its brightness; only a change does not. Swapping bright and dark flips the sign, so the
            sign tells which way the brightness steps. Sliding a tiny filter like [−1 0 +1] along every row of a photo is a
            convolution, a basic building block of image processing.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["step-found", "all-four"]}>
          {(reach) => {
            const visit = (next: number[], r: number[]) => {
              const uniq = Array.from(new Set(next)).sort((a, b) => a - b);
              setSeen(uniq);
              if (uniq.some((p) => filt(r, p) !== 0)) reach("step-found");
              if (uniq.length === LAST - FIRST + 1) reach("all-four");
            };
            const moveTo = (p: number) => {
              if (locked || p === pos) return;
              setPos(p);
              const lo = Math.min(p, pos);
              const hi = Math.max(p, pos);
              visit([...seen, ...Array.from({ length: hi - lo + 1 }, (_, k) => lo + k)], row);
            };
            const next = () => moveTo(pos < LAST ? pos + 1 : FIRST);
            const toEnd = () => {
              if (locked) return;
              setPos(LAST);
              visit(Array.from({ length: LAST - FIRST + 1 }, (_, k) => FIRST + k), row);
            };
            const swap = () => {
              if (locked) return;
              const r = swapped ? ROW_A : ROW_B;
              setSwapped(!swapped);
              visit([pos], r);
            };

            return (
              <div className={s.wrap}>
                <p className={s.note}>
                  {locked
                    ? "Window: right neighbour minus left neighbour."
                    : `Pixel ${pos}: ${row[pos]} − ${row[pos - 2]} = ${signed(here)}${here === 0 ? " (flat)" : " (a step!)"}`}
                </p>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`Row ${row.join(" ")}, window at pixel ${pos}`}>
                  {[-1, 0, 1].map((w) => (
                    <text key={`w${w}`} x={px(pos + w) + PW / 2} y={PY - 10} textAnchor="middle" className={s.weight}>
                      {w === -1 ? "−1" : w === 0 ? "0" : "+1"}
                    </text>
                  ))}
                  {row.map((v, k) => (
                    <g key={`p${k}`}>
                      <rect x={px(k + 1)} y={PY} width={PW} height={PW} rx={4} fill={`rgb(${v},${v},${v})`} stroke="var(--line)" strokeWidth={1.5} />
                      <text x={px(k + 1) + PW / 2} y={PY + PW / 2 + 5} textAnchor="middle" className={s.val} fill={v > 127 ? "#111" : "#f4f4f4"}>
                        {v}
                      </text>
                      <text x={px(k + 1) + PW / 2} y={PY + PW + 13} textAnchor="middle" className={s.idx}>
                        {k + 1}
                      </text>
                    </g>
                  ))}
                  <rect
                    x={px(pos - 1) - 4}
                    y={PY - 4}
                    width={3 * PW + 2 * GAP + 8}
                    height={PW + 8}
                    rx={7}
                    fill="none"
                    stroke="var(--domain)"
                    strokeWidth={3.5}
                    className={s.win}
                  />
                  {Array.from({ length: LAST - FIRST + 1 }, (_, k) => FIRST + k).map((p) => {
                    const on = seen.includes(p);
                    const v = filt(row, p);
                    return (
                      <g key={`o${p}`}>
                        <rect
                          x={px(p) + 2}
                          y={PY + PW + 22}
                          width={PW - 4}
                          height={28}
                          rx={5}
                          fill={on && v !== 0 ? "var(--domain)" : "var(--bg-2)"}
                          stroke={p === pos ? "var(--fg)" : "var(--line)"}
                        />
                        <text x={px(p) + PW / 2} y={PY + PW + 41} textAnchor="middle" className={`${s.out} ${on && v !== 0 ? s.outOn : ""}`}>
                          {on ? signed(v) : "?"}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control className="active" disabled={locked} onClick={next}>
                    {pos < LAST ? "Next pixel" : "Back to pixel 2"}
                  </Control>
                  <Control disabled={locked || (pos === LAST && seen.length === LAST - FIRST + 1)} onClick={toEnd}>
                    Slide to the end
                  </Control>
                  <Control disabled={locked} onClick={swap}>
                    {swapped ? "Unswap" : "Swap bright and dark"}
                  </Control>
                </Row>
                <Slider label="Window centre (pixel)" value={pos} min={FIRST} max={LAST} onChange={moveTo} disabled={locked} />
                <Row>
                  <Readout label="Answers not zero" value={seen.filter((p) => filt(row, p) !== 0).length} />
                  <Readout label="Pixels done" value={`${seen.length} / ${LAST - FIRST + 1}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
