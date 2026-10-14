"use client";

// Percent stacking. One price bar for a $100 coat: tap the 20% and 10% discounts and each takes its
// percentage of the price at that moment. "Swap order" replays them the other way round.
// Key states: both discounts applied ($72, 28% off) and the order swapped (still $72).
// Model: two percentage discounts on one item; numbers are illustrative.
// v3 (r7): Reset cleared every number the reveal quotes. Each finished order is now recorded on a
// "Seen" line under the readouts (cuts, the price each second cut was taken of, final price and
// total %); Reset clears the bar, not the Seen lines, and the reveal quotes the Seen lines.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PRICE = 100;
const OFFS = [20, 10] as const;
const MILESTONES = ["stacked", "swapped"] as const;

/** Apply discounts in order; each takes its percent of the price left at that moment. */
const run = (order: number[]) => {
  let price = PRICE;
  const cuts = order.map((pct) => {
    const base = price;
    const amount = (base * pct) / 100;
    price -= amount;
    return { pct, base, amount };
  });
  return { price, cuts };
};
const FINAL = run([...OFFS]).price; // 72
const TOTAL_PCT = Math.round(((PRICE - FINAL) / PRICE) * 1000) / 10; // 28
const SWAPPED = run([...OFFS].reverse());
const usd = (v: number) => `$${Number.isInteger(v) ? v : v.toFixed(2)}`;

type Run = ReturnType<typeof run>;
const key = (order: number[]) => order.join(">");
const pctOff = (price: number) => Math.round(((PRICE - price) / PRICE) * 1000) / 10;
const seenLine = (r: Run) =>
  `Seen ${r.cuts[0].pct}% then ${r.cuts[1].pct}%: ${usd(r.cuts[0].amount)} off, then ${usd(r.cuts[1].amount)} of ${usd(r.cuts[1].base)} → ${usd(r.price)} (${pctOff(r.price)}% off)`;

const L = 12;
const W = 296;

export default function TwentyThenTenOff({ slug }: { slug: string }) {
  const [order, setOrder] = useState<number[]>([]);
  const [seen, setSeen] = useState<Record<string, Run>>({}); // finished orders; Reset keeps them

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${usd(PRICE)} coat is ${OFFS[0]}% off, then a coupon takes another ${OFFS[1]}% off the sale price. What is the total discount?`,
        options: [`${OFFS[0] + OFFS[1]}%`, `${TOTAL_PCT}%`, "25%"],
        answer: 1,
      }}
      exploreHint="Tap both discounts, then swap their order."
      minInteractions={MILESTONES.length}
      reveal={() => {
        // both orders are on the required path: "swapped" needs one finished order reversed
        const first = seen[key([...OFFS])] ?? run([...OFFS]);
        const other = seen[key([...OFFS].reverse())] ?? SWAPPED;
        return (
          <>
            <p>
              Your Seen lines: {OFFS[0]}% off took {usd(first.cuts[0].amount)}, leaving {usd(first.cuts[0].base - first.cuts[0].amount)}. The next {OFFS[1]}% was
              of that sale price, only {usd(first.cuts[1].amount)}, not $10. The coat ended at <strong>{usd(first.price)}</strong>:{" "}
              <strong>{pctOff(first.price)}% off</strong>.
            </p>
            <p>
              Swapped, the cuts were {usd(other.cuts[0].amount)} then {usd(other.cuts[1].amount)}, and the price was still {usd(other.price)}.
              Percent changes multiply (0.8 x 0.9 = 0.9 x 0.8), so stacked discounts are less than their sum and the order does not matter.
            </p>
            <p className="muted">Illustrative numbers: one item, two percentage discounts.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const { price, cuts } = run(order);
            const both = order.length === OFFS.length;
            const record = (o: number[]) => setSeen((m) => ({ ...m, [key(o)]: run(o) }));
            const add = (pct: number) => {
              const next = [...order, pct];
              setOrder(next);
              if (next.length === OFFS.length) {
                record(next);
                reach("stacked");
              }
            };
            let cx = L + (price / PRICE) * W;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: two % discounts on one $100 coat</p>
                <svg viewBox="0 0 320 130" className="stage-svg" role="img" aria-label={`Price ${usd(price)}`}>
                  <text x={L} y={18} className={s.big}>
                    {usd(price)}
                  </text>
                  <rect x={L} y={28} width={W} height={30} rx={3} className={s.ghostFill} />
                  <rect x={L} y={28} width={(price / PRICE) * W} height={30} className={s.main} />
                  {cuts.map((c, i) => {
                    const w = (c.amount / PRICE) * W;
                    const x = cx;
                    cx += w;
                    return <rect key={i} x={x} y={28} width={w} height={30} className={i === 0 ? s.badFill : s.soft} stroke="var(--bg-2)" />;
                  })}
                  {!locked &&
                    cuts.map((c, i) => (
                      <text key={i} x={L} y={80 + i * 18} className={s.value}>
                        {c.pct}% of {usd(c.base)} = {usd(c.amount)} off
                      </text>
                    ))}
                </svg>
                <Row>
                  <Readout label="Price now" value={usd(price)} />
                  <Readout label="Total discount" value={locked ? "?" : `${pctOff(price)}%`} />
                </Row>
                {[key([...OFFS]), key([...OFFS].reverse())].map((k) =>
                  seen[k] ? (
                    <p key={k} className={s.seen}>
                      {seenLine(seen[k])}
                    </p>
                  ) : null,
                )}
                <Row>
                  {OFFS.map((pct) => (
                    <Control key={pct} disabled={locked || order.includes(pct)} onClick={() => add(pct)}>
                      {pct}% off
                    </Control>
                  ))}
                  <Control
                    disabled={locked || !both}
                    onClick={() => {
                      const next = [...order].reverse();
                      setOrder(next);
                      record(next);
                      reach("swapped");
                    }}
                  >
                    Swap order
                  </Control>
                  <Control disabled={locked || order.length === 0} onClick={() => setOrder([])}>
                    Reset
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
