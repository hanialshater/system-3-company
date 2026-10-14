"use client";

// Fenwick (binary indexed) tree over 16 numbers, 1-based. Cell i holds the sum of the numbers in
// (i - lowbit(i), i], where lowbit(i) = i & -i. A prefix sum hops down: i -= lowbit(i), so the
// first 13 numbers are cells 13 (13), 12 (9..12), 8 (1..8): 3 reads, one per 1 bit of 1101.
// An update hops up: i += lowbit(i), so changing position 1 touches cells 1, 2, 4, 8, 16.
// Drawn as the classic picture: each cell is a bar over the positions it covers, higher for longer.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 16;
const V = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3]; // the numbers, positions 1..16
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
const Q_CELLS = hopsDown(Q); // [13, 12, 8]
const Q_SUM = V.slice(0, Q).reduce((a, b) => a + b, 0); // 61
const UP1 = hopsUp(1); // [1, 2, 4, 8, 16]

// drawing
const X0 = 16;
const CW = 18;
const level = (i: number) => Math.log2(low(i)); // 0..4
const ROW_H = 15;
const BASE = 96; // y of the lowest bar row
const xL = (p: number) => X0 + (p - 1) * CW; // left edge of position p

export default function FenwickHops({ slug }: { slug: string }) {
  const [start, setStart] = useState(Q);
  const [read, setRead] = useState<number[]>([]);
  const [up, setUp] = useState<number[]>([]);
  const cur = read.length === 0 ? start : read[read.length - 1] - low(read[read.length - 1]);
  const sum = read.reduce((a, i) => a + CELL[i], 0);

  const lastRead = read[read.length - 1];
  const note =
    up.length > 0
      ? up.length < UP1.length
        ? `Position 1 is inside cell ${up[up.length - 1]}. Hop up: ${up[up.length - 1]} + ${low(up[up.length - 1])} = ${up[up.length - 1] + low(up[up.length - 1])}.`
        : `Position 1 is inside cells ${UP1.join(", ")}: ${UP1.length} updates.`
      : read.length === 0
        ? `Cell i covers the last (i & −i) numbers up to i. Add up 1–${start}.`
        : cur === 0
          ? `Cells ${read.join(", ")} cover 1–${start}: sum ${sum}.`
          : `Cell ${lastRead} = ${bin(lastRead)} covers ${lastRead - low(lastRead) + 1}–${lastRead}. Hop to ${cur} = ${bin(cur)}.`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A Fenwick tree over ${N} numbers stores in cell i the sum of the last (i & −i) numbers up to position i. To add up the first ${Q} numbers, how many cells do you read?`,
        options: [String(Q), String(Q_CELLS.length), "1"],
        answer: 1,
      }}
      exploreHint={`Read cell ${Q}, then hop down by its lowest 1 bit until you reach 0.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            From {Q} = {bin(Q)} you read cells {Q_CELLS.join(", ")}: one per 1 bit. Their ranges, 13, 9–12 and 1–8, tile 1–{Q} with
            no gaps, so {Q_CELLS.length} reads add up {Q} numbers (sum {Q_SUM}).
          </p>
          <p>
            The lowest 1 bit of an index is the length of the range its cell covers. Hopping down by it clears one 1 bit per read.
            Hopping up by it ({UP1.join(", ")}) reaches every cell holding a changed number: {UP1.length} cells. A plain running-total
            table would rewrite all {N}. Both hops take about log2 n steps.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["one-hop", "tiled"]}>
          {(reach) => {
            const hop = () => {
              if (locked || cur === 0) return;
              const next = [...read, cur];
              setRead(next);
              setUp([]);
              reach("one-hop");
              if (cur - low(cur) === 0 && start === Q) reach("tiled");
            };
            const hopAll = () => {
              if (locked || cur === 0) return;
              setRead([...read, ...hopsDown(cur)]);
              setUp([]);
              reach("one-hop");
              if (start === Q) reach("tiled");
            };
            const choose = (q: number) => {
              if (locked) return;
              setStart(q);
              setRead([]);
              setUp([]);
            };
            const upOnce = () => {
              if (locked) return;
              const next = up.length === 0 ? [1] : up.length >= UP1.length ? [1] : [...up, UP1[up.length]];
              setUp(next);
              setRead([]);
            };

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`Cells read ${read.join(", ") || "none"}`}>
                  {Array.from({ length: N }, (_, k) => k + 1).map((i) => {
                    const isRead = read.includes(i);
                    const isUp = up.includes(i);
                    const y = BASE - level(i) * ROW_H;
                    return (
                      <g key={`c${i}`}>
                        <rect
                          x={xL(i - low(i) + 1) + 1}
                          y={y}
                          width={low(i) * CW - 2}
                          height={ROW_H - 3}
                          rx={3}
                          fill={isRead ? "var(--domain)" : "var(--bg-2)"}
                          stroke={isUp ? "var(--bad)" : i === cur && up.length === 0 ? "var(--fg)" : "var(--line)"}
                          strokeWidth={isUp || (i === cur && up.length === 0) ? 2.5 : 1}
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
                    return (
                      <g key={`v${p}`}>
                        <rect x={xL(p) + 1} y={BASE + 18} width={CW - 2} height={16} rx={2} fill={covered ? "var(--domain)" : "none"} opacity={covered ? 0.3 : 1} stroke="var(--line)" />
                        <text x={xL(p) + CW / 2} y={BASE + 30} textAnchor="middle" className={s.v}>
                          {v}
                        </text>
                        <text x={xL(p) + CW / 2} y={BASE + 47} textAnchor="middle" className={s.pos}>
                          {p}
                        </text>
                      </g>
                    );
                  })}
                  <text x={4} y={BASE + 30} className={s.pos}>
                    #
                  </text>
                </svg>
                <Row>
                  <Control className={cur > 0 ? "active" : ""} disabled={locked || cur === 0} onClick={hop}>
                    Read cell {cur > 0 ? cur : ""}, hop down
                  </Control>
                  <Control disabled={locked || cur === 0} onClick={hopAll}>
                    Hop to 0
                  </Control>
                </Row>
                <Row>
                  {[13, 15, 7].map((q) => (
                    <Control key={`q${q}`} className={start === q ? "active" : ""} disabled={locked} onClick={() => choose(q)}>
                      Sum 1–{q}
                    </Control>
                  ))}
                  <Control disabled={locked} onClick={upOnce}>
                    Change position 1: hop up
                  </Control>
                </Row>
                <Row>
                  <Readout label="Cells read" value={read.length} />
                  <Readout label="Sum" value={sum} />
                  <Readout label="Cells to update" value={up.length} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
