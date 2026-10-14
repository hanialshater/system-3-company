"use client";

// Essential traders. One picture: two sellers (left), three traders (middle), two buyers (right).
// T1 and T2 both link seller 1 to buyer 1; T3 alone links seller 2 to buyer 2. Tapping a trader
// takes it out of the market (one at a time); the trade count updates, and the trader is tagged
// with how many trades the market lost without it. Key state: a spare trader (T1 or T2) and the
// needed one (T3) have both been taken out.
// Model: each seller has one item worth $0 to them; each buyer values one item at $1; a trade
// needs a trader linked to both sides. Profit itself is not simulated: the reveal states the theorem.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SELLER_VALUE = 0;
const BUYER_VALUE = 1;
type TraderId = 0 | 1 | 2;
const TRADERS: { name: string; seller: number; buyer: number; y: number }[] = [
  { name: "T1", seller: 0, buyer: 0, y: 34 },
  { name: "T2", seller: 0, buyer: 0, y: 96 },
  { name: "T3", seller: 1, buyer: 1, y: 170 },
];
const SIDE_Y = [65, 170];
const NPAIRS = SIDE_Y.length;
const MILESTONES = ["spare-out", "needed-out"] as const;

/** Most trades possible: each seller sells one item, each buyer buys one, each through a present trader. */
function trades(out: TraderId | null): number {
  const present = TRADERS.filter((_, i) => i !== out);
  // Brute force over which seller–buyer pairs trade (2 sellers × 2 buyers: small enough).
  let best = 0;
  const pairs: [number, number][] = [];
  for (let a = 0; a < NPAIRS; a++) for (let b = 0; b < NPAIRS; b++) if (present.some((t) => t.seller === a && t.buyer === b)) pairs.push([a, b]);
  for (let mask = 0; mask < 1 << pairs.length; mask++) {
    const chosen = pairs.filter((_, i) => mask & (1 << i));
    const sellers = new Set(chosen.map((p) => p[0]));
    const buyers = new Set(chosen.map((p) => p[1]));
    if (sellers.size === chosen.length && buyers.size === chosen.length) best = Math.max(best, chosen.length);
  }
  return best;
}

const FULL = trades(null); // 2
const LOST = TRADERS.map((_, i) => FULL - trades(i as TraderId)); // [0, 0, 1]
const usd = (v: number) => `$${v}`;
const SX = 40;
const TX = 160;
const BX = 280;

export default function OnlyTheNeededTraderProfits({ slug }: { slug: string }) {
  const [out, setOut] = useState<TraderId | null>(null);
  const [tested, setTested] = useState<boolean[]>([false, false, false]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Items: sellers value ${usd(SELLER_VALUE)}, buyers ${usd(BUYER_VALUE)}. T1, T2 both link seller 1 to buyer 1; T3 alone links seller 2 to buyer 2. Who profits?`,
        options: ["T1 and T2", "T3", "All three"],
        answer: 1,
      }}
      exploreHint="Take out one trader at a time and watch the trade count."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Without T1, {trades(0)} of {FULL} trades still happened: T2 linked seller 1 to buyer 1. Without T3, only {trades(2)} did:
            nobody else links seller 2 to buyer 2. Every trader had two links; what mattered was whether a trade needed it.
          </p>
          <p>
            T1 and T2 compete for the same trade, so each undercuts the other until neither earns anything. T3 has no rival, so it can
            charge for the trade only it makes. In this model a trader can earn a profit only if removing it loses value for the market.
          </p>
          <p className="muted">A simplified model with invented values. Being needed allows a profit; it does not guarantee one.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const take = (i: TraderId) => {
              setOut(i);
              setTested((t) => t.map((v, j) => v || j === i));
              reach(LOST[i] > 0 ? "needed-out" : "spare-out");
            };
            const live = locked ? null : out;
            const n = trades(live);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: sellers value an item {usd(SELLER_VALUE)}, buyers {usd(BUYER_VALUE)}</p>
                <svg viewBox="0 0 320 214" className="stage-svg" role="img" aria-label="Two sellers, three traders and two buyers, linked through the traders">
                  <text x={SX} y={14} textAnchor="middle" className={s.label}>sellers</text>
                  <text x={TX} y={14} textAnchor="middle" className={s.label}>traders</text>
                  <text x={BX} y={14} textAnchor="middle" className={s.label}>buyers</text>
                  {TRADERS.map((t, i) => {
                    const gone = live === i;
                    // This trader carries a trade if present and it is the first present trader on its route.
                    const carries = !locked && !gone && TRADERS.findIndex((u, j) => j !== live && u.seller === t.seller && u.buyer === t.buyer) === i;
                    const cls = gone ? s.edgeGone : carries ? s.edgeOn : s.edge;
                    return (
                      <g key={t.name}>
                        <line x1={SX + 18} y1={SIDE_Y[t.seller]} x2={TX - 18} y2={t.y} className={cls} />
                        <line x1={TX + 18} y1={t.y} x2={BX - 18} y2={SIDE_Y[t.buyer]} className={cls} />
                      </g>
                    );
                  })}
                  {SIDE_Y.map((y, k) => (
                    <g key={k}>
                      <rect x={SX - 18} y={y - 16} width={36} height={32} rx={6} className={s.node} />
                      <text x={SX} y={y + 5} textAnchor="middle" className={s.name}>S{k + 1}</text>
                      <rect x={BX - 18} y={y - 16} width={36} height={32} rx={6} className={s.node} />
                      <text x={BX} y={y + 5} textAnchor="middle" className={s.name}>B{k + 1}</text>
                    </g>
                  ))}
                  {TRADERS.map((t, i) => {
                    const gone = live === i;
                    return (
                      <g key={t.name}>
                        <circle cx={TX} cy={t.y} r={17} className={gone ? s.gone : s.trader} />
                        <text x={TX} y={t.y + 5} textAnchor="middle" className={s.name} opacity={gone ? 0.5 : 1}>
                          {t.name}
                        </text>
                        {!locked && tested[i] && (
                          <text x={TX} y={t.y + 30} textAnchor="middle" className={LOST[i] > 0 ? s.badText : s.goodText}>
                            −{LOST[i]} trade{LOST[i] === 1 ? "" : "s"}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <p className={s.msg} aria-live="polite">
                  {locked ? "Predict first." : live === null ? "All three traders in." : `${TRADERS[live].name} is out.`}
                </p>
                <Row>
                  {TRADERS.map((t, i) => (
                    <Control
                      key={t.name}
                      className={out === i ? "active" : ""}
                      disabled={locked || out === i}
                      aria-pressed={out === i}
                      onClick={() => take(i as TraderId)}
                    >
                      Take out {t.name}
                    </Control>
                  ))}
                  <Control disabled={locked || out === null} onClick={() => setOut(null)}>
                    All back
                  </Control>
                </Row>
                <Row>
                  <Readout label="Trades made" value={locked ? "?" : `${n} of ${FULL}`} />
                  <Readout label="Value created" value={locked ? "?" : usd(n * (BUYER_VALUE - SELLER_VALUE))} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
