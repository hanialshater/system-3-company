"use client";

// Open rising-price (English) auction for one lamp. Three bidders with private values $70, $55, $40 each stay in
// while the price is at or below their value and quit the moment it goes above. The price rises $1 per tap
// (or $5, or straight to the end). Key state: the auction is over, which happens when the $55 bidder quits at $56.
// Model (a simplification): values are private and known to each bidder, nobody bids above their value, and the
// auctioneer raises in whole dollars.
// v2: neutral hook (the old one said she pays less than $70). Reset is off once the auction is over, so the end
// state the reveal quotes is still on the stage when the reveal opens.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BIDDERS = [
  { name: "Ana", value: 70 },
  { name: "Ben", value: 55 },
  { name: "Cal", value: 40 },
] as const;
const START = 30;
const STEP = 1;

// A bidder is still in at price p if p <= value. The auction stops once at most one is left.
const inAt = (p: number) => BIDDERS.filter((b) => p <= b.value);
const over = (p: number) => inAt(p).length <= 1;
// Final price by the same rule the stage uses: raise $1 until only one bidder is left.
const FINAL = (() => {
  let p = START;
  while (!over(p)) p += STEP;
  return p;
})(); // 56
const WINNER = inAt(FINAL)[0]; // Ana, $70
const RUNNER_UP = [...BIDDERS].sort((a, b) => b.value - a.value)[1]; // Ben, $55

// Geometry (viewBox 340 × 230): price $0..$80 maps to y 206..30.
const Y = (p: number) => 206 - p * 2.2;
const BX = [46, 120, 194]; // bars end at x 254, leaving the right edge for the price label
const BW = 60;

export default function RisingPriceStopsAtSecond({ slug }: { slug: string }) {
  const [price, setPrice] = useState(START);

  const done = over(price);
  const left = inAt(price);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Bidders value a lamp at $70, $55, $40. Price rises $1 at a time; each quits above their value. What does the winner pay?",
        options: ["$70", "$56", "$41"],
        answer: 1,
      }}
      exploreHint="Raise the price until only one bidder is left."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            The price stopped at <strong>${FINAL}</strong>, the moment {RUNNER_UP.name} (worth ${RUNNER_UP.value}) quit.{" "}
            {WINNER.name} won and paid ${FINAL}, keeping ${WINNER.value - FINAL} of her ${WINNER.value} value. Her own value
            decided who won; the runner-up&apos;s value set the price.
          </p>
          <p>
            Any price above ${RUNNER_UP.value} and up to ${WINNER.value} leaves exactly one willing buyer. Rising a dollar at a
            time, the auction stops at the first such price. A sealed second-price auction would charge ${RUNNER_UP.value}:
            nearly the same.
          </p>
          <p className="muted">A model: each bidder knows their own value and quits the moment the price passes it.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["auction-over"]}>
          {(reach) => {
            const raiseTo = (p: number) => {
              const next = Math.min(p, FINAL);
              if (next === price) return;
              setPrice(next);
              if (over(next)) reach("auction-over");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>One lamp · rising price</p>
                <svg viewBox="0 0 340 230" className="stage-svg" role="img" aria-label={`Price $${price}, ${left.length} still bidding`}>
                  {[0, 20, 40, 60, 80].map((t) => (
                    <g key={t}>
                      <line x1={36} x2={330} y1={Y(t)} y2={Y(t)} stroke="var(--line)" strokeWidth={1} />
                      <text x={30} y={Y(t) + 4} textAnchor="end" className={s.axis}>
                        ${t}
                      </text>
                    </g>
                  ))}
                  {BIDDERS.map((b, i) => {
                    const isIn = price <= b.value;
                    const won = done && isIn;
                    return (
                      <g key={b.name}>
                        <rect
                          x={BX[i]}
                          y={Y(b.value)}
                          width={BW}
                          height={Y(0) - Y(b.value)}
                          rx={4}
                          className={isIn ? s.bar : s.barOut}
                        />
                        <text x={BX[i] + BW / 2} y={Y(b.value) - 6} textAnchor="middle" className={s.label}>
                          {b.name} ${b.value}
                        </text>
                        <text x={BX[i] + BW / 2} y={222} textAnchor="middle" className={won ? s.win : isIn ? s.axis : s.out}>
                          {won ? `wins at $${price}` : isIn ? "still in" : `quit at $${b.value + 1}`}
                        </text>
                      </g>
                    );
                  })}
                  <line x1={36} x2={330} y1={Y(price)} y2={Y(price)} className={s.price} />
                  <text x={334} y={Y(price) - 5} textAnchor="end" className={s.priceText}>
                    price ${price}
                  </text>
                </svg>
                <p className={s.msg} aria-live="polite">
                  {done ? `Only ${WINNER.name} is left. She pays $${price}.` : `${left.length} still bidding at $${price}.`}
                </p>
                <Row>
                  <Control className={s.tap} disabled={locked || done} onClick={() => raiseTo(price + STEP)}>
                    Raise $1
                  </Control>
                  <Control className={s.tap} disabled={locked || done} onClick={() => raiseTo(price + 5 * STEP)}>
                    Raise $5
                  </Control>
                  <Control className={s.tap} disabled={locked || done} onClick={() => raiseTo(FINAL)}>
                    Run to the end
                  </Control>
                  <Control className={s.tap} disabled={locked || done || price === START} onClick={() => setPrice(START)}>
                    Reset
                  </Control>
                </Row>
                <Row>
                  <Readout label="Price" value={`$${price}`} />
                  <Readout label="Still bidding" value={left.length} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
