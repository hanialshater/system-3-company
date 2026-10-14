"use client";

// VCG prices are market-clearing prices. One picture: the 3 × 3 valuation table (buyers x, y, z;
// items a, b, c), the best assignment outlined (x–a, y–c, z–b, total 23), and under each column
// the price at which raising prices cleared this market (a 3, b 1, c 0). Taking a buyer out greys
// its row and outlines the others' best assignment without it; the buyer's harm (the others' best
// without it minus what they get with it) is then written in its cell, above the column price.
// Key state: all three buyers taken out once (harms 3, 0, 1; total 4).
// Everything is computed here: best assignments by enumeration, clearing prices by the ascending
// procedure from prices-sort-the-buyers (raise the prices of a constricted set's items by 1, then
// shift so the lowest price is 0).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BUYERS = ["x", "y", "z"] as const;
const ITEMS = ["a", "b", "c"] as const;
// V[buyer][item]: what the item is worth to the buyer, in dollars.
const V = [
  [12, 4, 2],
  [8, 7, 6],
  [7, 5, 2],
];
const N = 3;
const MILESTONES = ["out-x", "out-y", "out-z"] as const;

/** Best total value over assignments of the given buyers to distinct items, and who gets what. */
function best(buyers: number[]): { total: number; item: (number | null)[] } {
  let total = -1;
  let item: (number | null)[] = [null, null, null];
  const rec = (k: number, used: number, sum: number, cur: (number | null)[]) => {
    if (k === buyers.length) {
      if (sum > total) {
        total = sum;
        item = [...cur];
      }
      return;
    }
    for (let it = 0; it < N; it++)
      if (!(used & (1 << it))) {
        cur[buyers[k]] = it;
        rec(k + 1, used | (1 << it), sum + V[buyers[k]][it], cur);
        cur[buyers[k]] = null;
      }
  };
  rec(0, 0, 0, [null, null, null]);
  return { total, item };
}

const ALL = [0, 1, 2];
const OPT = best(ALL); // total 23: x–a, y–c, z–b
const others = (b: number) => ALL.filter((o) => o !== b);
const WITHOUT = ALL.map((b) => best(others(b))); // 14, 17, 19
const WITH = ALL.map((b) => others(b).reduce((t, o) => t + V[o][OPT.item[o]!], 0)); // 11, 17, 18
const HARM = ALL.map((b) => WITHOUT[b].total - WITH[b]); // 3, 0, 1

/** Ascending-price procedure: raise prices on a constricted set's preferred items until a perfect matching exists. */
function clearingPrices(): number[] {
  let p = [0, 0, 0];
  const prefs = (pr: number[]) =>
    ALL.map((b) => {
      const u = V[b].map((v, i) => v - pr[i]);
      const m = Math.max(...u);
      return ALL.filter((i) => u[i] === m);
    });
  const perfect = (pf: number[][]) => {
    const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
    return perms.some((pm) => pm.every((it, b) => pf[b].includes(it)));
  };
  for (let guard = 0; guard < 100; guard++) {
    const pf = prefs(p);
    if (perfect(pf)) return p;
    let raise: number[] = [];
    let size = 99;
    for (let mask = 1; mask < 8; mask++) {
      const S = ALL.filter((b) => mask & (1 << b));
      const nb = [...new Set(S.flatMap((b) => pf[b]))];
      if (nb.length < S.length && S.length < size) {
        size = S.length;
        raise = nb;
      }
    }
    p = p.map((v, i) => (raise.includes(i) ? v + 1 : v));
    const lo = Math.min(...p);
    p = p.map((v) => v - lo);
  }
  return p;
}
const PRICES = clearingPrices(); // 3, 1, 0
const PRICE_TOTAL = PRICES.reduce((a, b) => a + b, 0); // 4
const HARM_TOTAL = HARM.reduce((a, b) => a + b, 0); // 4
const usd = (v: number) => `$${v}`;

// Geometry (viewBox 320 × 214).
const GX = 56;
const GY = 30;
const CW = 76;
const CH = 44;

export default function HarmPricesClearTheMarket({ slug }: { slug: string }) {
  const [out, setOut] = useState<number | null>(null);
  const [tested, setTested] = useState<boolean[]>([false, false, false]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Three buyers, three items; raising prices clears at prices totalling ${usd(PRICE_TOTAL)}. Charge each buyer the harm they cause others. Payments total?`,
        options: [`Less than ${usd(PRICE_TOTAL)}`, `Exactly ${usd(PRICE_TOTAL)}`, `More than ${usd(PRICE_TOTAL)}`],
        answer: HARM_TOTAL < PRICE_TOTAL ? 0 : HARM_TOTAL === PRICE_TOTAL ? 1 : 2,
      }}
      exploreHint="Take each buyer out in turn and see what the others gain without it."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            x&apos;s presence cost the others {WITHOUT[0].total} − {WITH[0]} = <strong>{HARM[0]}</strong>, z&apos;s cost {WITHOUT[2].total} −{" "}
            {WITH[2]} = <strong>{HARM[2]}</strong>, y&apos;s cost {WITHOUT[1].total} − {WITH[1]} = <strong>{HARM[1]}</strong>. Harm
            payments total {usd(HARM_TOTAL)}.
          </p>
          <p>
            And not just the total: each buyer&apos;s harm sat right above the price of the item it gets, a {usd(PRICES[0])}, b{" "}
            {usd(PRICES[1])}, c {usd(PRICES[2])}. A rule about fairness (pay for the harm you do) and a rule about supply and demand
            (raise prices until nobody is left out) gave the same prices.
          </p>
          <p className="muted">
            Invented values. In matching markets like this, harm prices always clear the market, and are the lowest prices that do.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const take = (b: number) => {
              setOut(b);
              setTested((t) => t.map((v, j) => v || j === b));
              reach(MILESTONES[b]);
            };
            const live = locked ? null : out;
            const alt = live === null ? null : WITHOUT[live].item;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {locked
                    ? "Value of each item to each buyer, in dollars."
                    : live === null
                      ? `Best assignment outlined: total ${OPT.total}.`
                      : `Without ${BUYERS[live]}, the others' best is ${WITHOUT[live].total}; with it they get ${WITH[live]}.`}
                </p>
                <svg viewBox="0 0 320 214" className="stage-svg" role="img" aria-label="Valuation table: buyers x, y, z by items a, b, c">
                  {ITEMS.map((it, c) => (
                    <text key={it} x={GX + c * CW + CW / 2} y={GY - 10} textAnchor="middle" className={s.name}>
                      {it}
                    </text>
                  ))}
                  {V.map((row, r) => (
                    <g key={r} opacity={live === r ? 0.3 : 1}>
                      <text x={GX - 14} y={GY + r * CH + CH / 2 + 5} textAnchor="end" className={s.name}>
                        {BUYERS[r]}
                      </text>
                      {row.map((v, c) => {
                        const inOpt = !locked && live === null && OPT.item[r] === c;
                        const inAlt = !locked && alt !== null && alt[r] === c;
                        const mine = !locked && OPT.item[r] === c;
                        const cx = GX + c * CW;
                        const cy = GY + r * CH;
                        return (
                          <g key={c}>
                            <rect x={cx + 3} y={cy + 3} width={CW - 6} height={CH - 6} rx={6} className={inAlt ? s.cellAlt : inOpt ? s.cellOn : s.cell} />
                            <text x={cx + CW / 2} y={cy + CH / 2 + (mine && tested[r] ? 0 : 5)} textAnchor="middle" className={s.big}>
                              {v}
                            </text>
                            {mine && tested[r] && (
                              <text x={cx + CW / 2} y={cy + CH / 2 + 14} textAnchor="middle" className={s.pays}>
                                harm {usd(HARM[r])}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  ))}
                  <text x={GX - 14} y={GY + N * CH + 22} textAnchor="end" className={s.label}>
                    price
                  </text>
                  {ITEMS.map((it, c) => (
                    <text key={it} x={GX + c * CW + CW / 2} y={GY + N * CH + 22} textAnchor="middle" className={s.price}>
                      {locked ? "?" : usd(PRICES[c])}
                    </text>
                  ))}
                  <text x={GX + (N * CW) / 2} y={GY + N * CH + 40} textAnchor="middle" className={s.label}>
                    prices where raising prices cleared the market
                  </text>
                </svg>
                <Row>
                  {BUYERS.map((b, i) => (
                    <Control
                      key={b}
                      className={out === i ? "active" : ""}
                      disabled={locked || out === i}
                      aria-pressed={out === i}
                      onClick={() => take(i)}
                    >
                      Without {b}
                    </Control>
                  ))}
                  <Control disabled={locked || out === null} onClick={() => setOut(null)}>
                    Everyone in
                  </Control>
                </Row>
                <Row>
                  <Readout label="Harm" value={locked ? "?" : live === null ? "—" : usd(HARM[live])} />
                  <Readout
                    label="Harm payments found"
                    value={locked ? "?" : `${usd(HARM.reduce((t, h, i) => t + (tested[i] ? h : 0), 0))} (${tested.filter(Boolean).length} of ${N})`}
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
