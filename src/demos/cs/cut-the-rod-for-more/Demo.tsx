"use client";

// Rod cutting: best(n) = max over first-piece length k of price(k) + best(n - k), best(0) = 0.
// Prices $1, $5, $8, $9 for lengths 1..4 give best 1, 5, 8, 10: the length-4 rod is worth more as 2 + 2
// ($10) than whole ($9). The learner fills best(1)..best(4) in order; each fill lists every first cut and
// keeps the largest, reusing the shorter answers already on the stage.
// One representation: four rods, each drawn cut the best way found so far.
// v4 (learner r8): reveal cut to the 90-word budget (the told length-8 example, c5, is gone) and its reuse example
// now names the outlined row, best(2) in "2 + best(2)". Stage compacted: rows 36 apart (viewBox 340 × 152) and the
// rule line shortened to one line, "best(n) = largest of: piece + best(rest)". When the reveal opens after best(4)
// was seen, the table is filled again (Start over pressed last would otherwise hide the outlined row it names).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PRICE = [1, 5, 8, 9]; // price of a piece of length 1..4
const N = PRICE.length;

type Cell = { best: number; first: number; pieces: number[] };

// The same recurrence the stage uses, run once for every length.
function solve(price: number[]) {
  const t: Cell[] = [{ best: 0, first: 0, pieces: [] }];
  for (let n = 1; n <= price.length; n++) {
    let bestK = 1;
    for (let k = 1; k <= n; k++) if (price[k - 1] + t[n - k].best > price[bestK - 1] + t[n - bestK].best) bestK = k;
    t[n] = { best: price[bestK - 1] + t[n - bestK].best, first: bestK, pieces: [bestK, ...t[n - bestK].pieces] };
  }
  return t;
}
const TABLE = solve(PRICE);
const choices = (n: number) =>
  Array.from({ length: n }, (_, i) => i + 1).map((k) => ({ k, piece: PRICE[k - 1], rest: TABLE[n - k].best, total: PRICE[k - 1] + TABLE[n - k].best }));

const UNIT = 52;
const X0 = 86;
const ROW = 36; // v4: was 40 (phone fit)

/** When the reveal opens after best(4) was seen, fill the table again so the outlined row the reveal names is on the stage. */
function SyncOnReveal({ on, sync }: { on: boolean; sync: () => void }) {
  useEffect(() => {
    if (on) sync();
  }, [on]); // only when the reveal opens; afterwards Start over still works
  return null;
}

export default function CutTheRod({ slug }: { slug: string }) {
  const [filled, setFilled] = useState(0); // best(1)..best(filled) are known
  const [seen, setSeen] = useState(false); // best(4) was reached once; survives Start over

  const best4 = TABLE[N];
  const opts = ["$9, sell it whole", "$10", "$13"];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You have a rod of length 4 to sell. Whole, it fetches $${PRICE[3]}. Pieces fetch $${PRICE[0]} (length 1), $${PRICE[1]} (length 2), $${PRICE[2]} (length 3). Cutting is allowed. What is the most you can get for it?`,
        options: opts,
        answer: 1,
      }}
      exploreHint="Fill the best price for length 1, then 2, 3 and 4. Each one reuses the shorter ones."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You filled best(1) to best(4): ${TABLE[1].best}, ${TABLE[2].best}, ${TABLE[3].best}, ${best4.best}. For length 4,
            two pieces of length 2 (${PRICE[1]} + ${PRICE[1]}) beat selling it whole for ${PRICE[3]}, and beat cutting off
            the most expensive piece (length 3, ${PRICE[2]}) and selling the leftover for ${PRICE[0]}.
          </p>
          <p>
            The best price of a rod is the best over first-cut sizes of (piece price + best price of the rest). Each
            cut line read a filled row, like best(2) in &quot;2 + best(2)&quot; (the outlined row): each shorter rod is solved
            once and reused.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={["first-fill", "best-4"]}>
          {(reach) => {
            const fill = () => {
              if (locked || filled >= N) return;
              const n = filled + 1;
              setFilled(n);
              reach("first-fill");
              if (n === N) {
                reach("best-4");
                setSeen(true);
              }
            };
            const fillRest = () => {
              if (locked || filled >= N) return;
              setFilled(N);
              reach("first-fill");
              reach("best-4");
              setSeen(true);
            };
            const restart = () => {
              if (locked || filled === 0) return;
              setFilled(0);
            };
            const n = filled; // the length whose choices are listed
            const list: ReturnType<typeof choices> = n > 0 ? choices(n) : [];
            const top = n > 0 ? TABLE[n].first : 0;
            const reused = n > 1 && top < n ? n - top : 0; // the shorter row the kept cut reads

            return (
              <div className={s.wrap}>
                <SyncOnReveal on={phase === "reveal" && seen} sync={() => setFilled(N)} />
                <p className={s.note}>
                  {n === 0
                    ? "Prices: length 1 $1, 2 $5, 3 $8, 4 $9."
                    : `best(${n}) = largest of: piece + best(rest)`}
                </p>
                <svg viewBox="0 0 340 152" className="stage-svg" role="img" aria-label={`Best prices filled up to length ${filled}`}>
                  {Array.from({ length: N }, (_, i) => i + 1).map((len) => {
                    const y = 10 + (len - 1) * ROW;
                    const known = len <= filled;
                    let x = X0;
                    return (
                      <g key={len}>
                        {len === reused && (
                          <rect x={2} y={y} width={336} height={30} rx={6} fill="none" stroke="var(--good)" strokeWidth={2} strokeDasharray="5 3" />
                        )}
                        <text x={8} y={y + 20} className={s.lab}>
                          length {len}
                        </text>
                        {known ? (
                          TABLE[len].pieces.map((p, j) => {
                            const g = (
                              <g key={j}>
                                <rect
                                  x={x + 1}
                                  y={y + 4}
                                  width={p * UNIT - 2}
                                  height={22}
                                  rx={4}
                                  fill={len === n ? "var(--domain)" : "var(--bg-2)"}
                                  stroke={len === n ? "var(--domain)" : "var(--fg)"}
                                  strokeWidth={1.5}
                                />
                                <text x={x + (p * UNIT) / 2} y={y + 20} textAnchor="middle" className={len === n ? s.pieceOn : s.piece}>
                                  {p} · ${PRICE[p - 1]}
                                </text>
                              </g>
                            );
                            x += p * UNIT;
                            return g;
                          })
                        ) : (
                          <rect x={X0 + 1} y={y + 4} width={len * UNIT - 2} height={22} rx={4} fill="none" stroke="var(--line)" strokeDasharray="4 3" />
                        )}
                        <text x={334} y={y + 20} textAnchor="end" className={known ? s.best : s.unknown}>
                          {known ? `$${TABLE[len].best}` : "?"}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <ul className={s.choices} aria-label="choices for the last length filled">
                  {list.map((c) => (
                    <li key={c.k} className={c.k === top ? s.win : ""}>
                      {c.k < n ? `${c.k} + best(${n - c.k})` : `whole ${c.k}`}: ${c.piece} + ${c.rest} = ${c.total}
                    </li>
                  ))}
                </ul>
                {/* Start over comes first in DOM order: it is disabled on an empty table, so one press per
                    control (Fill next, Fill the rest) ends with best(4) still on the stage. */}
                <Row>
                  <Control disabled={locked || filled === 0} onClick={restart}>
                    Start over
                  </Control>
                  <Control className="active" disabled={locked || filled >= N} onClick={fill}>
                    {filled >= N ? "All filled" : `Fill best(${filled + 1})`}
                  </Control>
                  <Control disabled={locked || filled >= N} onClick={fillRest}>
                    Fill the rest
                  </Control>
                </Row>
                <Row>
                  <Readout label="Whole rod" value={`$${PRICE[3]}`} />
                  <Readout
                    label="Seen: best(1..4)"
                    value={seen ? `$${TABLE[1].best}, $${TABLE[2].best}, $${TABLE[3].best}, $${best4.best}` : "?"}
                  />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
