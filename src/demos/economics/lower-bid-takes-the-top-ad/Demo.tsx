"use client";

// Quality-weighted ad ranking. One picture: two ad slots, top and second, with a bar for each ad's
// ranking number (its bid, or its bid × quality). The learner switches the ranking rule and changes
// B's bid; the ads swap slots as the ranking changes. In score mode a dashed line on B's bar marks
// the least bid that keeps B on top (its price under the model's rule).
// Key state: ranked by bid × quality (B on top with the lower bid), and B's bid dropped below
// A's score so A takes the slot back.
// Model (labelled on the card): rank by bid × quality; the top ad pays the least bid that keeps its
// rank (next score ÷ own quality). Not a description of any real search engine.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const A = { name: "A", bid: 2.0, quality: 0.5 };
const B_QUALITY = 1.0;
const B_START = 1.5;
const B_BIDS = [1.5, 1.2, 1.0, 0.8];
type Mode = "bid" | "score";
const MILESTONES = ["score-rank", "a-retakes"] as const;

const usd = (v: number) => `$${v.toFixed(2)}`;
const num = (v: number) => v.toFixed(1);
// Work in cents to avoid float ties going the wrong way (1.0 × 1.0 vs 2.0 × 0.5).
const key = (bid: number, q: number, mode: Mode) => Math.round((mode === "bid" ? bid : bid * q) * 1000);
const A_SCORE = A.bid * A.quality; // 1.0
const B_PRICE = A_SCORE / B_QUALITY; // $1.00

// Geometry (viewBox 320 × 176).
const BAR_X = 120;
const BAR_W = 180; // ranking number 2.0 fills it
const ROW_H = 70;
const TOP_Y = 18;
const bx = (v: number) => BAR_X + (v / 2) * BAR_W;

export default function LowerBidTakesTheTopAd({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("bid");
  const [bBid, setBBid] = useState(B_START);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A bids ${usd(A.bid)} per click, quality ${A.quality}. B bids ${usd(B_START)}, quality ${num(B_QUALITY)}. Ranked by bid × quality, who gets the top slot?`,
        options: ["Ad A", "Ad B", "A tie"],
        answer: 1,
      }}
      exploreHint="Switch to bid × quality, then lower B's bid until it loses the top slot."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Ranked by bid alone, A&apos;s {usd(A.bid)} took the top. Ranked by bid × quality, B scored {usd(B_START)} × {num(B_QUALITY)} ={" "}
            <strong>{num(B_START * B_QUALITY)}</strong> against A&apos;s {usd(A.bid)} × {A.quality} = {num(A_SCORE)}, so the lower bid won.
          </p>
          <p>
            B only needs a score above A&apos;s {num(A_SCORE)}, so under this rule it pays {num(A_SCORE)} ÷ {num(B_QUALITY)} ={" "}
            <strong>{usd(B_PRICE)}</strong> a click, less than A bid. When you dropped B to {usd(B_BIDS[B_BIDS.length - 1])}, its score
            fell below {num(A_SCORE)} and A took the slot back. A high bid cannot make up for low quality.
          </p>
          <p className="muted">A simplified model with invented numbers, not a description of any real search engine.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const apply = (m: Mode, b: number) => {
              if (m === "score") reach("score-rank");
              if (m === "score" && key(b, B_QUALITY, m) < key(A.bid, A.quality, m)) reach("a-retakes");
            };
            const ads = [
              { ...A, cls: s.bar },
              { name: "B", bid: bBid, quality: B_QUALITY, cls: s.barB },
            ].map((ad) => ({ ...ad, k: key(ad.bid, ad.quality, mode), v: mode === "bid" ? ad.bid : ad.bid * ad.quality }));
            const kA = ads[0].k;
            const kB = ads[1].k;
            const tie = kA === kB;
            const topIdx = kB > kA ? 1 : 0;
            const order = topIdx === 1 ? [1, 0] : [0, 1];
            const top = ads[topIdx];
            const second = ads[1 - topIdx];
            const pays = mode === "score" && !tie ? (second.bid * second.quality) / top.quality : null;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: the top ad pays the least bid that keeps its slot</p>
                <svg viewBox="0 0 320 176" className="stage-svg" role="img" aria-label={`Two ad slots ranked by ${mode === "bid" ? "bid" : "bid times quality"}`}>
                  {[0, 1].map((slot) => (
                    <g key={slot}>
                      <rect x={6} y={TOP_Y + slot * ROW_H} width={308} height={ROW_H - 10} rx={8} className={slot === 0 && !locked ? s.slotTop : s.slot} />
                      <text x={14} y={TOP_Y + slot * ROW_H - 4} className={s.label}>
                        {slot === 0 ? "top slot" : "second slot"}
                      </text>
                    </g>
                  ))}
                  {ads.map((ad, i) => {
                    const slot = locked ? i : order.indexOf(i);
                    const yy = TOP_Y + slot * ROW_H;
                    const shown = !locked;
                    return (
                      <g key={ad.name} className={s.row} style={{ transform: `translateY(${yy}px)` }}>
                        <text x={16} y={24} className={s.name}>
                          Ad {ad.name}
                        </text>
                        <text x={16} y={42} className={s.label}>
                          {usd(ad.bid)} × {ad.quality.toFixed(1)}
                        </text>
                        <rect x={BAR_X} y={14} width={shown ? bx(ad.v) - BAR_X : 0} height={22} rx={4} className={ad.cls} />
                        <text x={BAR_X} y={52} className={s.label}>
                          {locked ? "rank number ?" : `${mode === "bid" ? "bid" : "score"} ${mode === "bid" ? usd(ad.v) : num(ad.v)}`}
                        </text>
                        {shown && mode === "score" && ad.name === "B" && (
                          <line x1={bx(A_SCORE)} y1={8} x2={bx(A_SCORE)} y2={42} className={s.price} />
                        )}
                      </g>
                    );
                  })}
                </svg>
                <p className={s.msg} aria-live="polite">
                  {locked ? "Predict first." : mode === "bid" ? "Ranked by bid alone." : `Dashed line: A's score ${num(A_SCORE)}.`}
                </p>
                <Row>
                  {(["bid", "score"] as const).map((m) => (
                    <Control
                      key={m}
                      className={mode === m ? "active" : ""}
                      disabled={locked || mode === m}
                      aria-pressed={mode === m}
                      onClick={() => {
                        setMode(m);
                        apply(m, bBid);
                      }}
                    >
                      {m === "bid" ? "Rank by bid" : "Rank by bid × quality"}
                    </Control>
                  ))}
                </Row>
                <Row>
                  {B_BIDS.map((b) => (
                    <Control
                      key={b}
                      className={bBid === b ? "active" : ""}
                      disabled={locked || bBid === b}
                      aria-pressed={bBid === b}
                      onClick={() => {
                        setBBid(b);
                        apply(mode, b);
                      }}
                    >
                      B bids {usd(b)}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Top slot" value={locked ? "?" : tie ? "Tie" : `Ad ${top.name}`} />
                  <Readout label="Top ad pays per click" value={locked ? "?" : pays === null ? "—" : usd(pays)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
