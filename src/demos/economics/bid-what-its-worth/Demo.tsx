"use client";

// Second-price auction. One picture: the profit of four bids (the learner's slider bid, then $50, $70, $90)
// against the one rival bid the learner picks. Value $70, ties go to the rival, winner pays the rival's bid.
// Key states (plus: the bid slider moved, so the sweep chart was used): rival $60 seen (bid $50 misses $10 that $70 earns) and rival $75 seen (bid $90 wins, loses $5).
// Model: invented numbers, one rival bid at a time, sealed bids. First-price auctions are not covered here.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const VALUE = 70;
const RIVALS = [40, 60, 75, 90] as const;
const FIXED = [50, 70, 90] as const;
const MILESTONES = ["saw-low-bid-miss", "saw-high-bid-loss", "slid-bid"] as const;
// At the reveal the stage is pinned to the state the text quotes first: rival $60, your bid $50.
const PIN = { rival: 60, mine: 50 };

// The rule of the lesson: the highest bid wins and pays the second-highest bid. A tie goes to the rival.
const wins = (bid: number, rival: number) => bid > rival;
const profit = (bid: number, rival: number) => (wins(bid, rival) ? VALUE - rival : 0);
const money = (n: number) => (n < 0 ? `−$${-n}` : `$${n}`);
const signed = (n: number) => (n > 0 ? `+$${n}` : n < 0 ? `−$${-n}` : "$0");

// Geometry (viewBox 340 × 298): zero line at Y0, 3 px per dollar of profit.
const Y0 = 108;
const K = 3;
const XS = [55, 125, 195, 265];
// Sweep chart: profit of a bid against every rival bid $0 to $120 (x: 2.5 px per $, y: 0.6 px per $ of profit).
const CZ = 250;
const cx = (r: number) => 20 + r * 2.5;
const cy = (p: number) => CZ - p * 0.6;
const sweep = (b: number) => Array.from({ length: 121 }, (_, r) => `${cx(r)},${cy(profit(b, r))}`).join(" ");

export default function BidWhatItsWorth({ slug }: { slug: string }) {
  const [rival, setRival] = useState<number | null>(null);
  const [mine, setMine] = useState(30);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You value a painting at $${VALUE}. Sealed bids: the highest bidder wins and pays the SECOND-highest bid. You do not know the other bids. Which bid is never worse than any other, whatever the others bid?`,
        options: ["$50", "$90", "$70"],
        answer: 2,
      }}
      exploreHint="Try rival bids of $60 and $75, then slide your own bid. Compare profits on the lower chart, which shows every rival bid."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The lower chart shows every rival bid at once; the stage is set to a rival at <strong>$60</strong>. There a $50
            bid lost and earned $0, while $70 won, paid $60 and kept <strong>$10</strong>: the dashed $50 line sits under the
            solid $70 line for every rival from $50 up to just under $70. Against a rival at <strong>$75</strong>, which you
            tried, a $90 bid won, paid $75 for a $70 painting and lost <strong>$5</strong>; $70 lost and kept $0.
          </p>
          <p>
            Your bid only decides whether you win. The price is the rival&apos;s bid, so shading below $70 only throws away wins
            that pay, and bidding above $70 only adds wins that lose or break even. A bid of $70 is never worse than any other bid.
          </p>
          <p className="muted">A model with invented numbers; ties go to the rival here. This is why the second-price format invites honest bids.</p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (r: number) => {
              setRival(r);
              if (r === 60) reach("saw-low-bid-miss");
              if (r === 75) reach("saw-high-bid-loss");
            };
            const slide = (v: number) => {
              setMine(v);
              reach("slid-bid");
            };
            const bids = [mine, ...FIXED];
            const known = rival !== null;
                        return (
              <div className={s.wrap}>
                <PinAtReveal phase={phase} pin={() => { setRival(PIN.rival); setMine(PIN.mine); }} />
                <p className={s.chip}>
                  Highest bid wins and pays the second-highest. Ties go to the rival. Worth ${VALUE} to you.
                </p>
                <svg
                  viewBox="0 0 340 303"
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
                        <text x={x} y={150} textAnchor="middle" className={i === 0 ? s.mine : s.axis}>
                          {i === 0 ? `you $${b}` : `$${b}`}
                        </text>
                        <text x={x} y={164} textAnchor="middle" className={s.axis}>
                          {known ? (w ? "wins" : "loses") : ""}
                        </text>
                        <text x={x} y={178} textAnchor="middle" className={s.axis}>
                          {known ? (w ? `pays $${rival}` : "pays $0") : ""}
                        </text>
                        {i === 0 && <rect x={x - 32} y={136} width={64} height={48} rx={6} className={s.ring} />}
                      </g>
                    );
                  })}
                  {!known && (
                    <text x={170} y={60} textAnchor="middle" className={s.axis}>
                      Pick a rival bid
                    </text>
                  )}
                  {known && (
                    <>
                  <text x={170} y={197} textAnchor="middle" className={s.axis}>
                        Profit against every rival bid, $0 to $120
                      </text>
                      <line x1={cx(0)} x2={cx(120)} y1={CZ} y2={CZ} className={s.zero} />
                      <polyline points={sweep(70)} className={s.line70} />
                      <polyline points={sweep(mine)} className={s.lineMine} />
                      {known && <line x1={cx(rival)} x2={cx(rival)} y1={210} y2={288} className={s.zero} />}
                      <text x={cx(0) + 2} y={299} className={s.axis}>
                        solid: $70 bid · dashed: your ${mine}
                      </text>
                    </>
                  )}
                </svg>

                <Row>
                  {RIVALS.map((r) => (
                    <Control key={r} className={rival === r ? "active" : ""} disabled={locked || rival === r} aria-pressed={rival === r} onClick={() => pick(r)}>
                      Rival ${r}
                    </Control>
                  ))}
                </Row>
                <Slider label="Your bid" value={mine} min={0} max={120} step={5} onChange={slide} disabled={locked} format={(v) => `$${v}`} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function PinAtReveal({ phase, pin }: { phase: string; pin: () => void }) {
  const done = useRef(false);
  useEffect(() => {
    if (phase === "reveal" && !done.current) {
      done.current = true;
      pin();
    }
  });
  return null;
}
