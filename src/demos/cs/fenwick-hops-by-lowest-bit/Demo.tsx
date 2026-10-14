"use client";

// Fenwick (binary indexed) tree over 16 numbers, 1-based. Cell i holds the sum of the numbers in
// (i - lowbit(i), i], where lowbit(i) = i & -i. A prefix sum hops down: i -= lowbit(i), so the
// first 13 numbers are cells 13 (13), 12 (9..12), 8 (1..8): 3 reads, one per 1 bit of 1101.
// An update hops up: i += lowbit(i), so changing position 1 touches cells 1, 2, 4, 8, 16.
// Drawn as the classic picture: each cell is a bar over the positions it covers, higher for longer.
//
// v2 (wave E r6): every hop's binary stays on the stage as a trail; finished sums go into a
// history list the reveal reads; the update side is on stage: "Change position 1" marks the 5
// Fenwick cells and a plain running-total row underneath, where all 16 entries change. The read
// button no longer relabels itself.
// v3 (wave G r7): "Change position 1" no longer wipes the read trace; the up hop is written in
// binary on the stage (add the lowest bit); the finished 1–13 sum stays as a "Seen" line with the
// cells, their binary, ranges and stored values (9 + 21 + 31 = 61), so every value the reveal
// quotes is on the stage when it opens, even after Sum 1–15 / 1–7.
// v4 (wave H r8, phone fit): the read trail, the counts (cells read, sum, cells changed) and the up hop are drawn
// inside the picture, so the picture stays on screen at the reveal; the four readouts and the Seen line are gone
// (the finished caption carries 9 + 21 + 31 = 61). The Sum 1–15 / 1–7 targets are removed: they cleared the 1–13
// trace the reveal quotes and zeroed the counts beside it (r8 moderate). The target is always 1–13.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 16;
const V = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3]; // the numbers, positions 1..16
const RUN = V.map((_, k) => V.slice(0, k + 1).reduce((a, b) => a + b, 0)); // plain running totals
const low = (i: number) => i & -i;
const CELL = Array.from({ length: N + 1 }, (_, i) => (i === 0 ? 0 : V.slice(i - low(i), i).reduce((a, b) => a + b, 0)));
const bin = (i: number) => i.toString(2).padStart(4, "0");
const Q = 13; // the question's prefix
const hopsDown = (i: number) => {
  const out: number[] = [];
  for (let j = i; j > 0; j -= low(j)) out.push(j);
  return out;
};
const hopsUp = (i: number) => {
  const out: number[] = [];
  for (let j = i; j <= N; j += low(j)) out.push(j);
  return out;
};
const UP1 = hopsUp(1); // [1, 2, 4, 8, 16]
const bin5 = (i: number) => i.toString(2).padStart(5, "0");
const range = (i: number) => (low(i) === 1 ? `${i}` : `${i - low(i) + 1}–${i}`);

// drawing
const X0 = 16;
const CW = 18;
const level = (i: number) => Math.log2(low(i)); // 0..4
const ROW_H = 15;
const BASE = 96; // y of the lowest bar row
const xL = (p: number) => X0 + (p - 1) * CW; // left edge of position p

type Sum = { start: number; cells: number[]; total: number };

export default function FenwickHops({ slug }: { slug: string }) {
  const start = Q;
  const [read, setRead] = useState<number[]>([]);
  const [up, setUp] = useState<number[]>([]);
  const [sums, setSums] = useState<Sum[]>([]); // finished prefix sums, latest per target
  const cur = read.length === 0 ? start : read[read.length - 1] - low(read[read.length - 1]);
  const sum = read.reduce((a, i) => a + CELL[i], 0);

  const lastRead = read[read.length - 1];
  const note =
    read.length === 0
        ? `Cell i covers the last (i & −i) numbers up to i. Add up 1–${start}.`
        : cur === 0
          ? `Cells ${read.join(", ")} cover 1–${start}: ${read.map((i) => CELL[i]).join(" + ")} = ${sum}.`
          : `Cell ${lastRead} covers ${range(lastRead)}. Clear its lowest 1 bit: hop to ${cur}.`;
  const trail = read.length === 0 ? "" : [...read, cur].map((i) => `${i}=${bin(i)}`).join(" → ");

  const qSum = sums.find((x) => x.start === Q);
  const upLine = up.length > 0 ? up.map((i) => `${i}=${bin5(i)}`).join(" → ") : "";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A Fenwick tree over ${N} numbers stores in cell i the sum of the last (i & −i) numbers up to position i. To add up the first ${Q} numbers, how many cells do you read?`,
        options: [String(Q), String(hopsDown(Q).length), "1"],
        answer: 1,
      }}
      exploreHint={`Read cell ${Q} and hop down until 0, then change position 1.`}
      minInteractions={3}
      reveal={() => (
        <>
          {qSum && (
            <p>
              From {Q} = {bin(Q)} you read cells {qSum.cells.join(", ")} ({qSum.cells.map(bin).join(", ")}): each hop cleared one 1
              bit. Their ranges, {qSum.cells.map(range).join(", ")}, tile 1–{Q} with no gaps: {qSum.cells.length} reads for {Q}{" "}
              numbers ({qSum.total}).
            </p>
          )}
          <p>
            An index&apos;s lowest 1 bit is its cell&apos;s range length. Changing position 1 hopped up, {UP1.join(" → ")}:{" "}
            {UP1.length} cells changed, against all {N} in the Σ row. Both ways take about log2 n hops, not n.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["one-hop", "tiled", "update"]}>
          {(reach) => {
            const finish = (cells: number[]) => {
              const total = cells.reduce((a, i) => a + CELL[i], 0);
              setSums((xs) => [...xs.filter((x) => x.start !== start), { start, cells, total }]);
              if (start === Q) reach("tiled");
            };
            const hop = () => {
              if (locked || cur === 0) return;
              const next = [...read, cur];
              setRead(next);
              reach("one-hop");
              if (cur - low(cur) === 0) finish(next);
            };
            const hopAll = () => {
              if (locked || cur === 0) return;
              const next = [...read, ...hopsDown(cur)];
              setRead(next);
              reach("one-hop");
              finish(next);
            };
            const update = () => {
              if (locked) return;
              setUp(UP1);
              reach("update");
            };

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 212" className="stage-svg" role="img" aria-label={`Cells read ${read.join(", ") || "none"}`}>
                  {Array.from({ length: N }, (_, k) => k + 1).map((i) => {
                    const isRead = read.includes(i);
                    const isUp = up.includes(i);
                    const y = BASE - level(i) * ROW_H;
                    const isCur = i === cur && read.length > 0;
                    return (
                      <g key={`c${i}`}>
                        <rect
                          x={xL(i - low(i) + 1) + 1}
                          y={y}
                          width={low(i) * CW - 2}
                          height={ROW_H - 3}
                          rx={3}
                          fill={isRead ? "var(--domain)" : "var(--bg-2)"}
                          stroke={isUp ? "var(--bad)" : isCur || (read.length === 0 && i === start) ? "var(--fg)" : "var(--line)"}
                          strokeWidth={isUp || isCur || (read.length === 0 && i === start) ? 2.5 : 1}
                        />
                        <text x={xL(i) + CW / 2} y={y + 9.5} textAnchor="middle" className={`${s.cell} ${isRead ? s.cellOn : ""}`}>
                          {i}
                        </text>
                      </g>
                    );
                  })}
                  {V.map((v, k) => {
                    const p = k + 1;
                    const covered = read.some((i) => p > i - low(i) && p <= i);
                    const runChanged = up.length > 0;
                    return (
                      <g key={`v${p}`}>
                        <rect x={xL(p) + 1} y={BASE + 18} width={CW - 2} height={16} rx={2} fill={covered ? "var(--domain)" : "none"} opacity={covered ? 0.3 : 1} stroke="var(--line)" />
                        <text x={xL(p) + CW / 2} y={BASE + 30} textAnchor="middle" className={s.v}>
                          {v}
                        </text>
                        <text x={xL(p) + CW / 2} y={BASE + 45} textAnchor="middle" className={s.pos}>
                          {p}
                        </text>
                        <rect
                          x={xL(p) + 1}
                          y={BASE + 52}
                          width={CW - 2}
                          height={16}
                          rx={2}
                          fill="none"
                          stroke={runChanged ? "var(--bad)" : "var(--line)"}
                          strokeWidth={runChanged ? 2 : 1}
                        />
                        <text x={xL(p) + CW / 2} y={BASE + 64} textAnchor="middle" className={s.pos}>
                          {RUN[k]}
                        </text>
                      </g>
                    );
                  })}
                  <text x={X0} y={11} className={s.hdr} data-testid="trail">
                    {trail}
                  </text>
                  <text x={X0} y={26} className={s.lab}>
                    1–{start}: {read.length} {read.length === 1 ? "cell" : "cells"} read, sum {sum}
                  </text>
                  <text x={304} y={26} textAnchor="end" className={up.length ? s.labBad : s.lab}>
                    Fenwick cells changed: {up.length}
                  </text>
                  <text x={X0} y={BASE + 92} className={s.hdrBad}>
                    {upLine && "Change position 1: hop up by adding the lowest 1 bit"}
                  </text>
                  <text x={X0} y={BASE + 106} className={s.hdrBad}>
                    {upLine}
                  </text>
                  <text x={4} y={BASE + 30} className={s.pos}>
                    #
                  </text>
                  <text x={2} y={BASE + 64} className={s.pos}>
                    Σ
                  </text>
                  <text x={X0} y={BASE + 78} className={s.pos}>
                    Σ: plain running totals{up.length > 0 ? ` · changed: ${N}` : ""}
                  </text>
                </svg>
                <Row>
                  <Control className={cur > 0 ? "active" : ""} disabled={locked || cur === 0} onClick={hop}>
                    Read a cell, hop down
                  </Control>
                  <Control disabled={locked || cur === 0} onClick={hopAll}>
                    Hop to 0
                  </Control>
                  <Control disabled={locked || up.length > 0} onClick={update}>
                    Change position 1
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
