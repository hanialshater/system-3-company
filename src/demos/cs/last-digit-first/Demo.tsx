"use client";

// Radix sort by hand. Seven three-digit numbers; each pass deals them into buckets 0-9 by ONE digit (in the
// current list order, so ties keep it) and collects buckets 0 to 9. One button per pass. The "Order" button
// flips between last-digit-first and first-digit-first and restarts, keeping what each finished run ended with.
// The reveal quotes only runs the learner finished.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = [329, 457, 657, 839, 436, 720, 355];
type Order = "last" | "first";
const PLACES: Record<Order, number[]> = { last: [0, 1, 2], first: [2, 1, 0] }; // 0 = ones digit
const NAME = ["last", "middle", "first"]; // by place 0,1,2
const dig = (v: number, p: number) => Math.floor(v / 10 ** p) % 10;

type St = {
  order: Order;
  passes: number;
  list: number[];
  buckets: number[][] | null;
  ended: Partial<Record<Order, number[]>>;
};
const INIT: St = { order: "last", passes: 0, list: START, buckets: null, ended: {} };

export default function LastDigitFirst({ slug }: { slug: string }) {
  const [st, setSt] = useState<St>(INIT);
  const { order, passes, list, buckets, ended } = st;
  const place = passes > 0 ? PLACES[order][passes - 1] : -1;

  const deal = (n: number) => {
    const p = PLACES[order][n - 1];
    const b: number[][] = Array.from({ length: 10 }, () => []);
    list.forEach((v) => b[dig(v, p)].push(v));
    const next = b.flat();
    setSt({ ...st, passes: n, list: next, buckets: b, ended: n === 3 ? { ...ended, [order]: next } : ended });
  };
  const flip = () => setSt({ ...INIT, order: order === "last" ? "first" : "last", ended });

  const fmt = (a: number[]) => a.join(" ");
  const label = (n: number) => `Pass ${n}: ${NAME[PLACES[order][n - 1]]} digit`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "329 457 657 839 436 720 355. You sort by the last digit, then the middle digit, then the first digit, each time keeping ties in their current order. At the end the list is:",
        options: ["fully sorted", "sorted by first digit only", "scrambled"],
        answer: 0,
      }}
      exploreHint="Press the three passes in turn, then flip the order and try again."
      minInteractions={1}
      reveal={() => {
        const l = ended.last;
        const f = ended.first;
        return (
          <>
            {l && (
              <p>
                Your last-digit-first run ended <strong>{fmt(l)}</strong>: every neighbour in order. Each pass dealt
                the cards in the order the last pass left them, so cards with the same digit kept the order the
                earlier digits had given them. The first digit, dealt last, has the last word.
              </p>
            )}
            {f && (
              <p>
                Your first-digit-first run ended <strong>{fmt(f)}</strong>
                {fmt(f) === fmt([...START].sort((a, b) => a - b))
                  ? "."
                  : ": ordered by the last digit only. The first pass's work was overwritten."}
              </p>
            )}
            {!f && <p>Flip the order to see the same three passes run first digit first.</p>}
            <p className="muted">Three passes sort three-digit numbers, however many there are.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["third-pass"]}>
          {(reach) => (
            <div className={s.wrap}>
              <p className={s.rule}>Deal by one digit, collect buckets 0 to 9. Ties keep order.</p>
              <svg viewBox="0 0 340 176" className="stage-svg" role="img" aria-label={`After ${passes} of 3 passes: ${fmt(list)}`}>
                <text x={20} y={12} className={s.axis}>
                  {passes === 0 ? "Start" : `After pass ${passes} (${NAME[place]} digit)`}
                </text>
                {list.map((v, c) => (
                  <g key={v}>
                    <rect x={20 + c * 44} y={18} width={36} height={26} rx={5} fill="var(--bg-2)" stroke="var(--line)" />
                    <text x={20 + c * 44 + 18} y={36} textAnchor="middle" className={s.card}>
                      {String(v)
                        .split("")
                        .map((d, k) => (
                          <tspan key={k} className={place >= 0 && 2 - k === place ? s.hi : undefined}>
                            {d}
                          </tspan>
                        ))}
                    </text>
                    {passes > 0 && c < 6 && (
                      <text x={20 + c * 44 + 40} y={36} textAnchor="middle" className={v < list[c + 1] ? s.ok : s.bad}>
                        {v < list[c + 1] ? "<" : ">"}
                      </text>
                    )}
                  </g>
                ))}
                {Array.from({ length: 10 }, (_, d) => (
                  <g key={d}>
                    <rect x={10 + d * 32} y={64} width={30} height={70} rx={4} fill="none" stroke="var(--line)" />
                    <text x={10 + d * 32 + 15} y={78} textAnchor="middle" className={s.axis}>
                      {d}
                    </text>
                    {(buckets?.[d] ?? []).map((v, k) => (
                      <text key={v} x={10 + d * 32 + 15} y={94 + k * 14} textAnchor="middle" className={s.small}>
                        {String(v)
                          .split("")
                          .map((ch, q) => (
                            <tspan key={q} className={2 - q === place ? s.hi : undefined}>
                              {ch}
                            </tspan>
                          ))}
                      </text>
                    ))}
                  </g>
                ))}
                <text x={20} y={156} className={s.axis}>
                  Buckets 0–9 · {order === "last" ? "last" : "first"} digit first
                </text>
                <text x={20} y={170} className={s.axis}>
                  Passes done: {passes} of 3
                </text>
              </svg>
              {(["last", "first"] as Order[]).map(
                (o) =>
                  ended[o] && (
                    <p key={o} className={s.ended}>
                      {o === "last" ? "Last" : "First"} digit first ended: {fmt(ended[o]!)}
                    </p>
                  ),
              )}
              <Row>
                {[1, 2, 3].map((n) => (
                  <Control
                    key={n}
                    className={s.tap}
                    disabled={locked || passes !== n - 1}
                    onClick={() => {
                      deal(n);
                      if (n === 3) reach("third-pass");
                    }}
                  >
                    {label(n)}
                  </Control>
                ))}
                <Control className={s.tap} disabled={locked} onClick={flip}>
                  Order: {order === "last" ? "last digit first" : "first digit first"}
                </Control>
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
