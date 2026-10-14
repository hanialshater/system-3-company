"use client";

// Generalized second price (GSP) ad auction, two slots with 10 and 4 clicks. Values per click: X $7, Y $6, Z $1.
// Y and Z bid their values; the learner sets X's bid. Bids are ranked high to low; slot k goes to the k-th bid and
// pays the next bid down per click. Ties go to the other bidder (disclosed on the card). X's profit =
// clicks x (value - price). Key states: a bid below the honest $7 and a bid above it.
// Model (a simplification): click counts do not depend on who is in the slot, others' bids are fixed, one round.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const CLICKS = [10, 4];
const VALUE_X = 7;
const OTHERS = [
  { name: "Y", bid: 6 },
  { name: "Z", bid: 1 },
];
const MAX_BID = 10;

type Outcome = { order: { name: string; bid: number }[]; slot: number; price: number; profit: number };
// Rank bids high to low; on a tie the other bidder ranks ahead of X.
function gsp(bx: number): Outcome {
  const order = [{ name: "X", bid: bx }, ...OTHERS].sort((a, b) => b.bid - a.bid || (a.name === "X" ? 1 : b.name === "X" ? -1 : 0));
  const k = order.findIndex((e) => e.name === "X");
  if (k >= CLICKS.length) return { order, slot: 0, price: 0, profit: 0 };
  const price = order[k + 1]?.bid ?? 0;
  return { order, slot: k + 1, price, profit: CLICKS[k] * (VALUE_X - price) };
}
const HONEST = gsp(VALUE_X); // slot 1, $6 a click, profit 10
const AT5 = gsp(5); // slot 2, $1 a click, profit 24
const AT8 = gsp(8); // same as honest
const BIDS = Array.from({ length: MAX_BID + 1 }, (_, b) => b);
const MILESTONES = ["bid-lower", "bid-higher"] as const;

// Geometry (viewBox 340 × 230).
const PX = (b: number) => 40 + b * 27;
const PY = (v: number) => 214 - v * 2.6; // profit $0..$30

export default function HonestBidLosesInGsp({ slug }: { slug: string }) {
  const [bid, setBid] = useState(VALUE_X);
  const [tried, setTried] = useState<number[]>([VALUE_X]);
  const o = gsp(bid);
  const bestTried = tried.reduce((a, b) => (gsp(b).profit > gsp(a).profit ? b : a), VALUE_X);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Slots get 10 and 4 clicks; values per click $7, $6, $1. Each pays the next bid. X bids honestly ($7). Can X do better?",
        options: ["No", "Yes, by bidding $5", "Yes, by bidding $8"],
        answer: 1,
      }}
      exploreHint="Move X's bid below $7 and above it. Watch X's profit."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Bidding honestly, X took slot 1 and paid Y&apos;s ${HONEST.price} a click: {CLICKS[0]} × (${VALUE_X} − ${HONEST.price}) ={" "}
            <strong>${HONEST.profit}</strong>. At $5, X dropped to slot 2 and paid Z&apos;s ${AT5.price}: {CLICKS[1]} × (${VALUE_X} − $
            {AT5.price}) = <strong>${AT5.profit}</strong>. Bidding $8 changed nothing (${AT8.profit}).
            {bestTried !== VALUE_X && gsp(bestTried).profit > HONEST.profit && bestTried !== 5
              ? ` Your best try, $${bestTried}, also gave $${gsp(bestTried).profit}.`
              : ""}
          </p>
          <p>
            Paying the next bid sounds like a second-price auction, but with several slots your bid also picks your slot. Fewer,
            much cheaper clicks can be worth more, so under this rule an honest bid is not always best.
          </p>
          <p className="muted">A model: fixed clicks per slot, the others&apos; bids held still, one round.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const choose = (b: number) => {
              if (b === bid) return;
              setBid(b);
              setTried((t) => (t.includes(b) ? t : [...t, b]));
              if (b < VALUE_X) reach("bid-lower");
              if (b > VALUE_X) reach("bid-higher");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>X values a click at $7 · Y bids $6, Z $1 · ties go to the other</p>
                <svg viewBox="0 0 340 230" className="stage-svg" role="img" aria-label={`X bids $${bid}: profit $${o.profit}`}>
                  {CLICKS.map((c, k) => {
                    const who = o.order[k];
                    const price = o.order[k + 1]?.bid ?? 0;
                    const isX = who.name === "X";
                    return (
                      <g key={k}>
                        <rect x={10 + k * 166} y={6} width={154} height={62} rx={8} className={isX ? s.slotX : s.slot} />
                        <text x={18 + k * 166} y={24} className={s.axis}>
                          Slot {k + 1} · {c} clicks
                        </text>
                        <text x={18 + k * 166} y={44} className={s.label}>
                          {who.name} (bid ${who.bid})
                        </text>
                        <text x={18 + k * 166} y={60} className={s.axis}>
                          pays ${price} a click
                        </text>
                      </g>
                    );
                  })}
                  <text x={10} y={90} className={s.label}>
                    {o.slot
                      ? `X: ${CLICKS[o.slot - 1]} × ($${VALUE_X} − $${o.price}) = $${o.profit}`
                      : "X gets no slot: profit $0"}
                  </text>
                  <text x={10} y={110} className={s.axis}>
                    X&apos;s profit for each bid tried
                  </text>
                  <line x1={30} x2={330} y1={PY(0)} y2={PY(0)} stroke="var(--line)" strokeWidth={1} />
                  {BIDS.map((b) => {
                    const seen = tried.includes(b);
                    const p = gsp(b).profit;
                    return (
                      <g key={b}>
                        {seen && (
                          <>
                            <rect x={PX(b) - 9} y={PY(p)} width={18} height={Math.max(PY(0) - PY(p), 1)} className={b === bid ? s.pbarOn : s.pbar} />
                            <text x={PX(b)} y={PY(p) - 4} textAnchor="middle" className={s.axis}>
                              {p}
                            </text>
                          </>
                        )}
                        <text x={PX(b)} y={228} textAnchor="middle" className={b === bid ? s.label : s.axis}>
                          ${b}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  {[5, 8, VALUE_X].map((b) => (
                    <Control
                      key={b}
                      className={`${s.tap} ${b === bid ? "active" : ""}`}
                      disabled={locked || b === bid}
                      onClick={() => choose(b)}
                    >
                      {b === VALUE_X ? "Honest $7" : `Bid $${b}`}
                    </Control>
                  ))}
                </Row>
                <Slider label="X's bid per click" value={bid} min={0} max={MAX_BID} disabled={locked} onChange={choose} format={(v) => `$${v}`} />
                <Row>
                  <Readout label="X's slot" value={o.slot ? o.slot : "none"} />
                  <Readout label="X's profit" value={`$${o.profit}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
