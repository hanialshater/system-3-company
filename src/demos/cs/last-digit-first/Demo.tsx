"use client";

// Radix sort by hand. Seven three-digit numbers; each pass deals them into buckets 0-9 by ONE digit (in the
// current list order, so ties keep it) and collects buckets 0 to 9. One button per pass, one row per order
// (last digit first, first digit first); each row keeps its own run and what it ended with.
// The reveal quotes only runs the learner finished, and names the tie bucket and an out-of-order pair
// from the run state (v4), so it is true whichever run the stage shows last.
// v3: two rows of pass buttons, one per order, each with its own run; the stage shows the run last
// touched. The gate needs both runs finished, so the learner sees first-digit-first fail before the
// reveal. On a third pass the first bucket holding two cards is ringed and captioned: the tie kept
// the order the earlier passes gave it (stability, shown).

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

type Run = { passes: number; list: number[]; buckets: number[][] | null };
type St = { order: Order; runs: Record<Order, Run>; ended: Partial<Record<Order, number[]>> };
const FRESH: Run = { passes: 0, list: START, buckets: null };
const INIT: St = { order: "last", runs: { last: FRESH, first: FRESH }, ended: {} };

export default function LastDigitFirst({ slug }: { slug: string }) {
  const [st, setSt] = useState<St>(INIT);
  const { order, runs, ended } = st;
  const { passes, list, buckets } = runs[order];
  const place = passes > 0 ? PLACES[order][passes - 1] : -1;
  // On the third pass, the first bucket holding two cards: a tie the earlier passes already ordered.
  const tie = passes === 3 && buckets ? buckets.findIndex((b) => b.length >= 2) : -1;

  const deal = (o: Order, n: number) => {
    const p = PLACES[o][n - 1];
    const b: number[][] = Array.from({ length: 10 }, () => []);
    runs[o].list.forEach((v) => b[dig(v, p)].push(v));
    const next = b.flat();
    setSt({
      order: o,
      runs: { ...runs, [o]: { passes: n, list: next, buckets: b } },
      ended: n === 3 ? { ...ended, [o]: next } : ended,
    });
  };

  const fmt = (a: number[]) => a.join(" ");
  const label = (o: Order, n: number) => `Pass ${n}: ${NAME[PLACES[o][n - 1]]} digit`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "329 457 657 839 436 720 355. You sort by the last digit, then the middle digit, then the first digit, each time keeping ties in their current order. At the end the list is:",
        options: ["fully sorted", "sorted by first digit only", "scrambled"],
        answer: 0,
      }}
      exploreHint="Run the three passes last digit first, then run them first digit first. Compare the endings."
      minInteractions={2}
      reveal={() => {
        const l = ended.last;
        const f = ended.first;
        // Name the tie and the out-of-order pair from the learner's own runs, so the text holds whichever run is on stage.
        const lb = runs.last.passes === 3 ? runs.last.buckets : null;
        const lt = lb ? lb.findIndex((b) => b.length >= 2) : -1;
        const fBad = f ? f.findIndex((v, i) => i < f.length - 1 && v > f[i + 1]) : -1;
        return (
          <>
            {l && (
              <p>
                Your last-digit-first run ended <strong>{fmt(l)}</strong>: every neighbour in order.
                {lt >= 0 && lb
                  ? ` On its pass 3, bucket ${lt} held ${lb[lt].join(" then ")}: they tied on the first digit, and they kept the order the earlier passes had given them.`
                  : ""}{" "}
                So the earlier digits settle ties, and the first digit, dealt last, has the last word.
              </p>
            )}
            {f && (
              <p>
                Your first-digit-first run ended <strong>{fmt(f)}</strong>
                {fBad < 0
                  ? "."
                  : `: ordered by the last digit only (${f[fBad]} comes before ${f[fBad + 1]}). The first digit went first, so the later passes overwrote its work.`}
              </p>
            )}
            <p className="muted">Three passes sort three-digit numbers, however many there are.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["last-done", "first-done"]}>
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
                    {d === tie && (
                      <rect x={10 + d * 32 - 1} y={63} width={32} height={72} rx={5} fill="none" stroke="var(--domain)" strokeWidth={2.5} />
                    )}
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
                  {tie >= 0
                    ? `Tie in bucket ${tie}: kept the order earlier passes gave it`
                    : `Buckets 0–9 · ${order === "last" ? "last" : "first"} digit first`}
                </text>
                <text x={20} y={170} className={s.axis}>
                  {order === "last" ? "Last" : "First"} digit first · passes done: {passes} of 3
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
              {(["last", "first"] as Order[]).map((o) => (
                <Row key={o}>
                  {[1, 2, 3].map((n) => (
                    <Control
                      key={n}
                      className={s.tap}
                      disabled={locked || runs[o].passes !== n - 1}
                      aria-label={`${o === "last" ? "Last" : "First"} digit first, pass ${n}`}
                      onClick={() => {
                        deal(o, n);
                        if (n === 3) reach(o === "last" ? "last-done" : "first-done");
                      }}
                    >
                      {n === 1 ? `${o === "last" ? "Last" : "First"} first · ${label(o, n)}` : label(o, n)}
                    </Control>
                  ))}
                </Row>
              ))}
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
