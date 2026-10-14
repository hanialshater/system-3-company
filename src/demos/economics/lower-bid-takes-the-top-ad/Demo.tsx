"use client";

// Quality-weighted ad ranking. One picture: two ad slots, top and second, with a bar for each ad's
// ranking number (its bid, or its bid × quality). The learner switches the ranking rule and changes
// B's bid; the ads swap slots as the ranking changes. In score mode a dashed line on B's bar marks
// the least bid that keeps B on top (its price under the model's rule).
// Key state: ranked by bid × quality (B on top with the lower bid), and B's bid dropped below
// A's score so A takes the slot back.
// Model (labelled on the card): rank by bid × quality; the top ad pays the least bid that keeps its
// rank (next score ÷ own quality). Not a description of any real search engine.
// v2: the price working is on stage ("B pays A's score 1.0 ÷ B's quality 1.0"), and every B bid tried under
// bid × quality is logged ("$0.80 → A $1.60"); the reveal quotes that log, so it says only what was seen.

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

type Seen = { b: number; top: string; pays: number | null };
/** Who tops under bid × quality at B's bid b, and what the top ad pays (next score ÷ own quality). */
function outcome(b: number): Seen {
  const kA = key(A.bid, A.quality, "score");
  const kB = key(b, B_QUALITY, "score");
  if (kA === kB) return { b, top: "Tie", pays: null };
  return kB > kA ? { b, top: "B", pays: A_SCORE / B_QUALITY } : { b, top: "A", pays: (b * B_QUALITY) / A.quality };
}

export default function LowerBidTakesTheTopAd({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("bid");
  const [bBid, setBBid] = useState(B_START);
  const [seen, setSeen] = useState<Seen[]>([]); // B bids tried under bid × quality, in the order tried
  const lowB = seen.find((x) => x.top === "A");
  const bTops = seen.filter((x) => x.top === "B");
  const sameAt = bTops.slice(1).map((x) => usd(x.b));

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
            Ranked by bid alone, A&apos;s {usd(A.bid)} took the top. By bid × quality, B scored {usd(B_START)} × {num(B_QUALITY)} ={" "}
            <strong>{num(B_START * B_QUALITY)}</strong> against A&apos;s {usd(A.bid)} × {A.quality} = {num(A_SCORE)}, so the lower bid won.
          </p>
          <p>
            The top ad pays the next score ÷ its own quality: {bTops.length ? `at ${usd(bTops[0].b)}, B paid` : "on top, B pays"}{" "}
            {num(A_SCORE)} ÷ {num(B_QUALITY)} = <strong>{usd(B_PRICE)}</strong>, less than A bid
            {sameAt.length ? `, and still ${usd(B_PRICE)} when B bid ${sameAt.join(" and ")}: A's score sets it, not B's bid` : ""}.
            {lowB && lowB.pays !== null
              ? ` At ${usd(lowB.b)}, A took the slot back and paid ${num(lowB.b * B_QUALITY)} ÷ ${A.quality} = ${usd(lowB.pays)}: dividing by A's quality ${A.quality} doubles it.`
              : ""}{" "}
            Quality multiplies the bid, so A, at half B&apos;s quality, would need more than {usd((B_START * B_QUALITY) / A.quality)} to beat B&apos;s {usd(B_START)}.
          </p>
          <p className="muted">A simplified model with invented numbers, not a description of any real search engine.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const apply = (m: Mode, b: number) => {
              if (m === "score") {
                setSeen((xs) => (xs.some((x) => x.b === b) ? xs : [...xs, outcome(b)]));
                reach("score-rank");
              }
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
                <p className={s.chip}>Rule: the top ad pays the least bid that keeps its slot</p>
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
                  {locked
                    ? "Predict first."
                    : mode === "bid"
                      ? "Ranked by bid alone."
                      : tie
                        ? `Tie: both score ${num(A_SCORE)}.`
                        : `Dashed line: A's score ${num(A_SCORE)}. ${top.name} pays ${second.name}'s score ${num(second.bid * second.quality)} ÷ ${top.name}'s quality ${top.quality.toFixed(1)}.`}
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
                <p className={s.log} data-testid="price-log">
                  {seen.length
                    ? `B's bid → top, pays: ${seen.map((x) => `${usd(x.b)} → ${x.top}${x.pays === null ? "" : ` ${usd(x.pays)}`}`).join(" · ")}`
                    : "Bids tried under bid × quality show here."}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
