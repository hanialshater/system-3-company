"use client";

// A ring buffer of 4 slots: item i (1, 2, 3, ...) goes into slot (i - 1) mod 4, overwriting the oldest
// once the ring is full. After writing 1..10 the slots read 9, 10, 7, 8 and the next write goes to slot
// 10 mod 4 = 2. Nothing ever shifts: each write touches one slot. One representation: the ring of four
// slots with the write pointer and the faded oldest item; overwritten values stay visible, struck out.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const CAP = 4;
const LAST = 10;

/** Slot history after writing items 1..count: slots[j] lists every value written to slot j, oldest first. */
function history(count: number) {
  const slots: number[][] = Array.from({ length: CAP }, () => []);
  for (let i = 1; i <= count; i++) slots[(i - 1) % CAP].push(i);
  return slots;
}
const FINAL = history(LAST).map((h) => h[h.length - 1]);
const NEXT_AFTER = LAST % CAP;

// slot j sits clockwise from the top
const C = { x: 170, y: 120 };
const R = 70;
const POS = Array.from({ length: CAP }, (_, j) => {
  const a = -Math.PI / 2 + (j * 2 * Math.PI) / CAP;
  return { x: C.x + R * Math.cos(a), y: C.y + R * Math.sin(a) };
});

export default function RingBuffer({ slug }: { slug: string }) {
  const [count, setCount] = useState(0); // items written so far

  const slots = history(count);
  const next = count % CAP; // the write pointer
  const oldestSlot = count < CAP ? 0 : next; // when full, the next write lands on the oldest
  const lastSlot = count > 0 ? (count - 1) % CAP : null;
  const over = lastSlot !== null && slots[lastSlot].length > 1 ? slots[lastSlot][slots[lastSlot].length - 2] : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A buffer holds ${CAP} items. You write 1, 2, 3, ..., ${LAST} in turn, each into the next slot and wrapping from slot 3 back to slot 0, overwriting the oldest. What is in slots 0, 1, 2, 3?`,
        options: ["1, 2, 3, 4", "7, 8, 9, 10", FINAL.join(", ")],
        answer: 2,
      }}
      exploreHint={`Write the numbers one at a time and watch the pointer wrap. Stop at ${LAST}.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You wrote 1 to {LAST}. The pointer went round two and a half times: 5 and 9 landed on slot 0, 6 and 10 on slot 1, so
            the slots read {FINAL.join(", ")}. They hold the newest four, 7 to 10, just not starting at slot 0. The next write
            goes to slot {NEXT_AFTER}, over 7, the oldest.
          </p>
          <p>
            The pointer is (count mod capacity): {LAST} mod {CAP} = {NEXT_AFTER}. Each write touches one slot and nothing
            shifts, so the buffer always holds the latest {CAP} items in the same fixed memory. Logs, audio streams and
            keyboard queues rely on it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["wrapped", "ten"]}>
          {(reach) => {
            const to = (n: number) => {
              setCount(n);
              if (n > CAP) reach("wrapped");
              if (n === LAST) reach("ten");
            };
            const writeOne = () => {
              if (locked || count >= LAST) return;
              to(count + 1);
            };
            const writeAll = () => {
              if (locked || count >= LAST) return;
              to(LAST);
            };
            const restart = () => {
              if (locked || count === 0) return;
              setCount(0);
            };
            const note =
              count === 0
                ? "Empty ring. The arrow is the next slot to write."
                : `Wrote ${count} into slot ${lastSlot}${over !== null ? `, over ${over}` : ""}.`;
            const tip = POS[next];
            const ax = C.x + (tip.x - C.x) * 0.45;
            const ay = C.y + (tip.y - C.y) * 0.45;

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 340 226" className="stage-svg" role="img" aria-label={`Slots ${slots.map((h) => h[h.length - 1] ?? "empty").join(", ")}`}>
                  <circle cx={C.x} cy={C.y} r={R} fill="none" stroke="var(--line)" strokeWidth={2} strokeDasharray="5 5" />
                  <line x1={C.x} y1={C.y} x2={ax} y2={ay} stroke="var(--domain)" strokeWidth={4} strokeLinecap="round" />
                  <circle cx={ax} cy={ay} r={6} fill="var(--domain)" />
                  <circle cx={C.x} cy={C.y} r={4} fill="var(--domain)" />
                  {POS.map((p, j) => {
                    const h = slots[j];
                    const v = h[h.length - 1];
                    const oldest = v !== undefined && j === oldestSlot && count > 1;
                    const fresh = j === lastSlot;
                    const dx = j === 3 ? -62 : 62; // labels beside each slot
                    const dy = 4;
                    return (
                      <g key={j} opacity={oldest ? 0.55 : 1}>
                        <rect
                          x={p.x - 24}
                          y={p.y - 24}
                          width={48}
                          height={48}
                          rx={8}
                          fill={fresh ? "var(--domain)" : "var(--bg-2)"}
                          stroke={j === next ? "var(--domain)" : "var(--fg)"}
                          strokeWidth={j === next ? 3 : 1.5}
                        />
                        <text x={p.x} y={p.y + 8} textAnchor="middle" className={fresh ? s.vOn : s.v}>
                          {v ?? ""}
                        </text>
                        <text x={p.x + dx} y={p.y + dy} textAnchor="middle" className={s.slot}>
                          slot {j}
                        </text>
                        {h.length > 1 && (
                          <text x={p.x + dx} y={p.y + dy + 14} textAnchor="middle" className={s.gone}>
                            {h.slice(0, -1).join(" ")}
                          </text>
                        )}
                        {oldest && (
                          <text x={p.x + dx} y={p.y + dy - 14} textAnchor="middle" className={s.oldest}>
                            oldest
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control className="active" disabled={locked || count >= LAST} onClick={writeOne}>
                    {count >= LAST ? `Wrote ${LAST}` : `Write ${count + 1}`}
                  </Control>
                  <Control disabled={locked || count >= LAST} onClick={writeAll}>
                    Write up to {LAST}
                  </Control>
                  <Control disabled={locked || count === 0} onClick={restart}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Written" value={count} />
                  <Readout label={`Next slot = ${count} mod ${CAP}`} value={next} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
