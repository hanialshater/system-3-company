"use client";

// Average purchase cost. Three columns of shares, one per month, each bought with the same $100.
// The middle month's price is the learner's lever; the readouts compare the plain average of the
// three prices with the cost per share actually paid.
// Key state: middle month at $5: 10 + 20 + 10 = 40 shares for $300, $7.50 a share.
// Model: three monthly buys of equal dollars at invented prices; arithmetic only, no returns.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DOLLARS = 100;
const OUTER = 10;
const Q_MID = 5;
const MILESTONES = ["low-month"] as const;

const shares = (price: number) => DOLLARS / price;
const prices = (mid: number) => [OUTER, mid, OUTER];
const totalShares = (mid: number) => prices(mid).reduce((t, p) => t + shares(p), 0);
const avgPrice = (mid: number) => prices(mid).reduce((t, p) => t + p, 0) / 3;
const avgCost = (mid: number) => (3 * DOLLARS) / totalShares(mid);
const usd = (v: number) => `$${v.toFixed(2)}`;
const sh = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

const L = 20;
const COL = 80;
const GAP = 20;
const BASE = 118;
const SCALE = 1.6; // px per share

export default function SameDollarsMoreShares({ slug }: { slug: string }) {
  const [mid, setMid] = useState(OUTER);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You put $${DOLLARS} into a fund at $${OUTER} a share, then at $${Q_MID}, then at $${OUTER}. What is your average cost per share?`,
        options: [usd(avgPrice(Q_MID)), usd(avgCost(Q_MID)), usd(Q_MID)],
        answer: 1,
      }}
      exploreHint={`Set the middle month's price to $${Q_MID} and read the two averages.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At ${Q_MID} the middle $100 bought <strong>{sh(shares(Q_MID))}</strong> shares, twice the {sh(shares(OUTER))} bought at ${OUTER}. In
            all, {sh(totalShares(Q_MID))} shares cost ${3 * DOLLARS}: <strong>{usd(avgCost(Q_MID))}</strong> a share, below the plain
            average price of {usd(avgPrice(Q_MID))}.
          </p>
          <p>Equal dollars buy more shares when the price is low, so the low month counts for more and pulls the cost down.</p>
          <p className="muted">A model: three equal buys at invented prices. Arithmetic only, no claim about returns or what to buy.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setMid(v);
              if (v === Q_MID) reach("low-month");
            };
            const ps = prices(mid);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: $100 a month at invented prices</p>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`Shares bought each month for $${DOLLARS}`}>
                  <line x1={L - 6} y1={BASE} x2={310} y2={BASE} stroke="var(--line)" strokeWidth={1.5} />
                  {ps.map((p, i) => {
                    const x = L + i * (COL + GAP);
                    const h = Math.min(shares(p) * SCALE, BASE - 16);
                    return (
                      <g key={i}>
                        <rect x={x} y={BASE - h} width={COL} height={h} className={i === 1 ? s.goodFill : s.main} />
                        <text x={x + COL / 2} y={BASE - h - 4} textAnchor="middle" className={s.small}>
                          {sh(shares(p))} shares
                        </text>
                        <text x={x + COL / 2} y={BASE + 14} textAnchor="middle" className={s.small}>
                          Month {i + 1}: ${p}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Readout label="Average price" value={locked ? "?" : usd(avgPrice(mid))} />
                  <Readout label="Cost per share" value={locked ? "?" : usd(avgCost(mid))} />
                  <Readout label="Shares" value={locked ? "?" : sh(totalShares(mid))} />
                </Row>
                <Row>
                  {[Q_MID, OUTER, 20].map((v) => (
                    <Control key={v} className={mid === v ? "active" : ""} disabled={locked || mid === v} onClick={() => set(v)}>
                      Month 2 at ${v}
                    </Control>
                  ))}
                </Row>
                <Slider label="Month 2 price" value={mid} min={2} max={20} step={1} format={(v) => `$${v}`} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
