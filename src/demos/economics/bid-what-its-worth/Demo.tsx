"use client";

// Second-price auction. One picture: the profit of four bids (the learner's slider bid, then $50, $70, $90)
// against the one rival bid the learner picks. Value $70, ties go to the rival, winner pays the rival's bid.
// Key states: rival $60 seen (bid $50 misses $10 that $70 earns) and rival $75 seen (bid $90 wins, loses $5).
// Model: invented numbers, one rival bid at a time, sealed bids. First-price auctions are not covered here.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const VALUE = 70;
const RIVALS = [40, 60, 75, 90] as const;
const FIXED = [50, 70, 90] as const;
const MILESTONES = ["saw-low-bid-miss", "saw-high-bid-loss"] as const;

// The rule of the lesson: the highest bid wins and pays the second-highest bid. A tie goes to the rival.
const wins = (bid: number, rival: number) => bid > rival;
const profit = (bid: number, rival: number) => (wins(bid, rival) ? VALUE - rival : 0);
const money = (n: number) => (n < 0 ? `−$${-n}` : `$${n}`);
const signed = (n: number) => (n > 0 ? `+$${n}` : n < 0 ? `−$${-n}` : "$0");

// Geometry (viewBox 340 × 200): zero line at Y0, 3 px per dollar of profit.
const Y0 = 112;
const K = 3;
const XS = [55, 125, 195, 265];

export default function BidWhatItsWorth({ slug }: { slug: string }) {
  const [rival, setRival] = useState<number | null>(null);
  const [mine, setMine] = useState(30);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You value a painting at $${VALUE}. Sealed bids: the highest bidder wins and pays the SECOND-highest bid. You do not know the other bids. Which bid is never worse than any other, whatever the others bid?`,
        options: ["$50", "$70", "$90"],
        answer: 1,
      }}
      exploreHint="Pick each rival bid, then slide your own bid and watch the profit bars."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Against a rival at <strong>$60</strong>, a $50 bid lost and earned $0, while $70 won, paid $60 and kept{" "}
            <strong>$10</strong>. Against a rival at <strong>$75</strong>, a $90 bid won, paid $75 for a $70 painting and lost{" "}
            <strong>$5</strong>; $70 lost and kept $0.
          </p>
          <p>
            Your bid only decides whether you win. The price is the rival&apos;s bid, so shading below $70 only throws away wins
            that pay, and bidding above $70 only adds wins that lose. A bid of $70 is never worse than any other bid.
          </p>
          <p className="muted">A model with invented numbers; ties go to the rival here. It is why this format invites honest bids.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (r: number) => {
              setRival(r);
              if (r === 60) reach("saw-low-bid-miss");
              if (r === 75) reach("saw-high-bid-loss");
            };
            const bids = [mine, ...FIXED];
            const known = rival !== null;
            const pay = known && wins(mine, rival) ? rival : 0;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>
                  Highest bid wins and pays the second-highest. Ties go to the rival. Worth ${VALUE} to you.
                </p>
                <svg
                  viewBox="0 0 340 204"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    known
                      ? `Profit against a rival bid of $${rival}: ${bids.map((b) => `bid $${b} ${wins(b, rival) ? "wins" : "loses"}, profit ${money(profit(b, rival))}`).join("; ")}`
                      : "Profit bars; pick a rival bid"
                  }
                >
                  <line x1={14} x2={326} y1={Y0} y2={Y0} className={s.zero} />
                  {bids.map((b, i) => {
                    const x = XS[i];
                    const p = known ? profit(b, rival) : 0;
                    const w = known ? wins(b, rival) : false;
                    const h = Math.abs(p) * K;
                    const y = p >= 0 ? Y0 - h : Y0;
                    return (
                      <g key={i}>
                        {known && h > 0 && <rect x={x - 22} y={y} width={44} height={h} className={p > 0 ? s.gain : s.loss} />}
                        <text x={x} y={p < 0 ? Y0 + h + 14 : Y0 - h - 6} textAnchor="middle" className={s.value}>
                          {known ? signed(p) : "?"}
                        </text>
                        <text x={x} y={162} textAnchor="middle" className={i === 0 ? s.mine : s.axis}>
                          {i === 0 ? `you $${b}` : `$${b}`}
                        </text>
                        <text x={x} y={177} textAnchor="middle" className={s.axis}>
                          {known ? (w ? "wins" : "loses") : ""}
                        </text>
                        {i === 0 && <rect x={x - 30} y={148} width={60} height={36} rx={6} className={s.ring} />}
                      </g>
                    );
                  })}
                  <text x={170} y={197} textAnchor="middle" className={s.axis}>
                    {known ? `You pay ${money(pay)}` : "Pick a rival bid"}
                  </text>
                </svg>

                <Row>
                  {RIVALS.map((r) => (
                    <Control key={r} className={rival === r ? "active" : ""} disabled={locked || rival === r} aria-pressed={rival === r} onClick={() => pick(r)}>
                      Rival ${r}
                    </Control>
                  ))}
                </Row>
                <Slider label="Your bid" value={mine} min={0} max={120} step={5} onChange={setMine} disabled={locked} format={(v) => `$${v}`} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
