"use client";

// Why appending to a growable list is cheap on average. The list starts with room for 1.
// When it is full the learner must Grow: every item is copied into a block twice the size,
// and the copy counter jumps. Copies so far read 1 + 2 + 4 + 8 = 15 after 16 appends, less
// than one copy per append. One representation: the row of slots.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const TARGET = 16;
const MAX = 32;

/** Copies made by doubling from room-for-1 while appending n items: one entry per grow. */
function grows(n: number) {
  const out: number[] = [];
  for (let cap = 1, len = 0; len < n; len++) {
    if (len === cap) {
      out.push(len);
      cap *= 2;
    }
  }
  return out;
}
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

const PER_ROW = 16;
const W = 18.5;

export default function ListDoublingCopies({ slug }: { slug: string }) {
  const [len, setLen] = useState(0);
  const [cap, setCap] = useState(1);
  const [log, setLog] = useState<number[]>([]); // items copied at each grow
  const [fresh, setFresh] = useState(0); // items copied by the latest grow (highlighted)

  const copies = sum(log);
  const full = len === cap;
  const answer = sum(grows(TARGET));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A list is a row of boxes a program fills one item at a time (an append). When the row is full, the program builds a row twice as long and copies every item across. Starting with room for 1, after ${TARGET} appends, how many item-copies did all those resizes do in total?`,
        options: [String(answer), String(2 * answer), String((TARGET * (TARGET - 1)) / 2)],
        answer: 0,
      }}
      exploreHint={`Append until it is full and grow it once. Then step through each doubling up to ${TARGET}.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {len >= TARGET || log.length
              ? `Your list reached ${Math.max(len, 1)} item${len === 1 ? "" : "s"} with ${copies} copies. `
              : ""}
            Each grow copies everything, but the list doubles, so the copies run {grows(TARGET).join(" + ")} ={" "}
            <strong>{answer}</strong> for {TARGET} appends. That is less than one copy per append.
          </p>
          <p>
            Each big copy buys as many free appends as it cost: after copying 8 items there is room for 8 more. For any
            power of two, n appends cost n − 1 copies in total, so appending stays cheap on average even though a single
            grow is slow.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["grew", "reached-target"]}>
          {(reach) => {
            const append = () => {
              if (locked || full || len >= MAX) return;
              setLen(len + 1);
              setFresh(0);
              if (len + 1 >= TARGET) reach("reached-target");
            };
            const grow = () => {
              if (locked || !full || len >= MAX) return;
              setCap(cap * 2);
              setLog([...log, len]);
              setFresh(len);
              reach("grew");
            };
            const fill = () => {
              if (locked || len >= TARGET) return;
              let c = cap;
              const l = [...log];
              let last = 0;
              for (let n = len; n < TARGET; n++) {
                if (n === c) {
                  l.push(n);
                  last = n;
                  c *= 2;
                }
              }
              setLen(TARGET);
              setCap(c);
              setLog(l);
              setFresh(last);
              reach("reached-target");
            };
            const nextDoubling = () => {
              if (locked || len >= TARGET) return;
              let c = cap;
              const l = [...log];
              let last = 0;
              let n = len;
              if (n < c) n = c; // fill the current row
              if (n < TARGET) {
                l.push(n);
                last = n;
                c *= 2;
              } else n = TARGET;
              setLen(n);
              setCap(c);
              setLog(l);
              setFresh(last);
              if (l.length > log.length) reach("grew");
              if (n >= TARGET) reach("reached-target");
            };
            const restart = () => {
              if (locked) return;
              setLen(0);
              setCap(1);
              setLog([]);
              setFresh(0);
            };

            const msg = locked
              ? "Make a prediction to start."
              : fresh
                ? `Copied ${fresh} item${fresh === 1 ? "" : "s"} into room for ${cap}.`
                : full && len < MAX
                  ? `Full at ${len}. Grow to append more.`
                  : len === 0
                    ? "Room for 1. Append an item."
                    : `${len} item${len === 1 ? "" : "s"}, room for ${cap}.`;

            const rows = Math.ceil(Math.max(cap, 1) / PER_ROW);

            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {msg}
                </p>
                <svg viewBox="0 0 320 88" className="stage-svg" role="img" aria-label={`${len} items in room for ${cap}`}>
                  {Array.from({ length: cap }, (_, i) => {
                    const x = (320 - Math.min(cap, PER_ROW) * W) / 2 + (i % PER_ROW) * W;
                    const y = 6 + Math.floor(i / PER_ROW) * 40 + (rows === 1 ? 18 : 0);
                    const filled = i < len;
                    const copied = i < fresh;
                    return (
                      <g key={i}>
                        <rect
                          x={x}
                          y={y}
                          width={W - 3}
                          height={30}
                          rx={3}
                          fill={copied ? "var(--domain)" : filled ? "var(--muted)" : "var(--bg-2)"}
                          stroke={copied ? "var(--domain)" : "var(--line)"}
                          strokeWidth={1.5}
                        />
                        {filled && (
                          <text x={x + (W - 3) / 2} y={y + 20} textAnchor="middle" className={s.n}>
                            {i + 1}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <p className={s.sum}>{log.length ? `Copies: ${log.join(" + ")} = ${copies}` : "Copies: none yet"}</p>

                <Row>
                  <Readout label="Appends" value={len} />
                  <Readout label="Copies" value={copies} />
                  <Readout label="Copies per append" value={len ? (copies / len).toFixed(2) : "–"} />
                </Row>
                <Row>
                  <Control className="active" disabled={locked || full || len >= MAX} onClick={append}>
                    Append
                  </Control>
                  <Control disabled={locked || !full || len >= MAX} onClick={grow}>
                    {full ? `Grow: copy ${len} into ${cap * 2}` : "Grow"}
                  </Control>
                  <Control disabled={locked || len >= TARGET} onClick={nextDoubling}>
                    Fill, then double
                  </Control>
                  <Control disabled={locked || len >= TARGET} onClick={fill}>
                    Run to {TARGET}
                  </Control>
                  <Control disabled={locked || len === 0} onClick={restart}>
                    Start over
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
