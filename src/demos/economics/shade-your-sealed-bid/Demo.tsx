"use client";

// First-price sealed bid against one rival. Your value is $80. The rival's value is spread evenly on $0..$100 and
// they bid half of it, so their bid is spread evenly on $0..$50 and a bid b wins with chance min(b, 50) / 50.
// Expected profit = (80 - b) x win chance. The learner moves a bid slider (or taps preset bids); each bid tried leaves a
// dot on the expected-profit chart. Key state: the best bid, $40 (expected $32). After it, the whole curve is drawn.
// Model (a simplification): one rival, values spread evenly, the rival's bidding rule is known, ties ignored.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const VALUE = 80;
const RIVAL_MAX_BID = 50; // half of $100
const winChance = (b: number) => Math.min(b, RIVAL_MAX_BID) / RIVAL_MAX_BID;
const expected = (b: number) => (VALUE - b) * winChance(b);
const BIDS = Array.from({ length: VALUE + 1 }, (_, b) => b);
const BEST = BIDS.reduce((a, b) => (expected(b) > expected(a) ? b : a), 0); // 40
const PRESETS = [80, 60, 50, 40];

// Geometry (viewBox 340 × 210): bid $0..$80 → x 44..324; expected profit $0..$40 → y 180..24.
const X = (b: number) => 44 + (b / VALUE) * 280;
const Y = (v: number) => 180 - (v / 40) * 156;
const money = (v: number) => `$${Number.isInteger(v) ? v : v.toFixed(2)}`;

export default function ShadeYourSealedBid({ slug }: { slug: string }) {
  const [bid, setBid] = useState(VALUE);
  const [tried, setTried] = useState<number[]>([VALUE]);
  const [found, setFound] = useState(false);

  const curve = BIDS.map((b) => `${X(b).toFixed(1)},${Y(expected(b)).toFixed(1)}`).join(" ");
  const ep = expected(bid);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In a sealed-bid auction, the item is worth $80 to you and the winner pays their own bid. Your rival values it anywhere from $0 to $100 and bids half of that. What is your best bid?",
        options: ["$80", "$60", "$40"],
        answer: 2,
      }}
      exploreHint="Try bids and find the one with the highest expected profit."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Bidding your full ${VALUE} wins every time and earns <strong>$0</strong>. From $80 down to ${RIVAL_MAX_BID} you still
            win every time, so each dollar shaved is a dollar kept: {money(expected(RIVAL_MAX_BID))} expected at ${RIVAL_MAX_BID}.
          </p>
          <p>
            Below ${RIVAL_MAX_BID}, each dollar shaved costs 2 points of win chance. The best trade is at <strong>${BEST}</strong>:
            you win {Math.round(winChance(BEST) * 100)}% of the time and keep ${VALUE - BEST}, an expected {money(expected(BEST))}.
          </p>
          <p className="muted">
            A model: one rival, values spread evenly. With two such bidders, bidding half your value is the equilibrium.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["best-bid"]}>
          {(reach) => {
            const choose = (b: number) => {
              if (b === bid) return;
              setBid(b);
              setTried((t) => (t.includes(b) ? t : [...t, b]));
              if (b === BEST) {
                setFound(true);
                reach("best-bid");
              }
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Worth ${VALUE} to you · rival bids half of a $0–100 value</p>
                <svg viewBox="0 0 340 210" className="stage-svg" role="img" aria-label={`Bid $${bid}: expected profit ${money(ep)}`}>
                  {[0, 10, 20, 30, 40].map((t) => (
                    <g key={t}>
                      <line x1={44} x2={324} y1={Y(t)} y2={Y(t)} stroke="var(--line)" strokeWidth={1} />
                      <text x={38} y={Y(t) + 4} textAnchor="end" className={s.axis}>
                        ${t}
                      </text>
                    </g>
                  ))}
                  {[0, 20, 40, 60, 80].map((t) => (
                    <text key={t} x={X(t)} y={196} textAnchor="middle" className={s.axis}>
                      ${t}
                    </text>
                  ))}
                  <text x={324} y={208} textAnchor="end" className={s.axis}>
                    your bid
                  </text>
                  <text x={44} y={14} className={s.axis}>
                    expected profit
                  </text>
                  {found && <polyline points={curve} fill="none" stroke="var(--muted)" strokeWidth={2} strokeDasharray="5 4" />}
                  {tried.map((b) => (
                    <circle key={b} cx={X(b)} cy={Y(expected(b))} r={3.5} fill="var(--muted)" />
                  ))}
                  <line x1={X(bid)} x2={X(bid)} y1={Y(0)} y2={Y(ep)} stroke="var(--domain)" strokeWidth={2} />
                  <circle cx={X(bid)} cy={Y(ep)} r={7} fill="var(--domain)" stroke="var(--fg)" strokeWidth={1.5} />
                  <text
                    x={Math.min(Math.max(X(bid), 70), 300)}
                    y={Y(ep) - 12}
                    textAnchor="middle"
                    className={s.label}
                  >
                    {money(ep)}
                  </text>
                </svg>
                <Row>
                  {PRESETS.map((b) => (
                    <Control
                      key={b}
                      className={`${s.tap} ${b === bid ? "active" : ""}`}
                      disabled={locked || b === bid}
                      onClick={() => choose(b)}
                    >
                      Bid ${b}
                    </Control>
                  ))}
                </Row>
                <Slider label="Your bid" value={bid} min={0} max={VALUE} disabled={locked} onChange={choose} format={(v) => `$${v}`} />
                <Row>
                  <Readout label="Win chance" value={`${Math.round(winChance(bid) * 100)}%`} />
                  <Readout label="Keep if you win" value={`$${VALUE - bid}`} />
                  <Readout label="Expected" value={money(ep)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
