"use client";

// Break-even. One picture: the day's $300 fixed cost as an empty bar. Each cup sold drops in what it
// leaves after its own $1 cost (price − $1). The bar fills; past $300 the extra is profit (green).
// Key state: the bar covered exactly at the $3 price (cup 150).
// Model: constant price and per-cup cost, every cup made is sold, no waste.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FIXED = 300;
const UNIT_COST = 1;
const Q_PRICE = 3;
const PRICES = [2, 3, 4];
const MAX_CUPS = 400;
const STEPS = [100, 50, 10, 1]; // QA presses these in order: 0 → 100 → 150 (break-even at $3)
const MILESTONES = ["break-even"] as const;

const margin = (price: number) => price - UNIT_COST;
const breakEven = (price: number) => FIXED / margin(price);
const ANSWER = breakEven(Q_PRICE); // 150

// Geometry (viewBox 320 × 130): dollars $0..$600 across.
const L = 12;
const R = 308;
const SCALE = 600;
const px = (v: number) => L + (Math.min(v, SCALE) / SCALE) * (R - L);
const BY = 46;
const BH = 40;

export default function BreakEvenCups({ slug }: { slug: string }) {
  const [cups, setCups] = useState(0);
  const [price, setPrice] = useState(Q_PRICE);
  const [seen, setSeen] = useState<number[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A lemonade stand costs $${FIXED} a day to run. Each cup costs $${UNIT_COST} to make and sells for $${Q_PRICE}. How many cups to break even?`,
        options: [String(FIXED / Q_PRICE), String(ANSWER), String(FIXED)],
        answer: 1,
      }}
      exploreHint={`Sell cups until the $${FIXED} bar is exactly full.`}
      minInteractions={MILESTONES.length}
      reveal={() => {
        const others = seen.filter((p) => p !== Q_PRICE);
        return (
          <>
            <p>
              At ${Q_PRICE} a cup, the bar filled exactly at <strong>cup {ANSWER}</strong>. Each cup left ${margin(Q_PRICE)} after
              its own ${UNIT_COST}, and {FIXED} / {margin(Q_PRICE)} = {ANSWER}.
              {others.length > 0 && ` You also broke even at ${others.map((p) => `$${p} (${breakEven(p)} cups)`).join(" and ")}.`}
            </p>
            <p>
              Those {ANSWER} cups brought in ${ANSWER * Q_PRICE}, not ${FIXED}: ${ANSWER * UNIT_COST} paid for the cups themselves
              and ${FIXED} for the day. Break-even is the fixed cost divided by what each unit leaves after its own cost.
            </p>
            <p className="muted">A model: the same price and cost for every cup, and every cup made is sold.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const m = margin(price);
            const covered = cups * m;
            const profit = covered - FIXED;
            const check = (c: number, p: number) => {
              if (c * margin(p) === FIXED) {
                setSeen((sn) => (sn.includes(p) ? sn : [...sn, p]));
                if (p === Q_PRICE) reach("break-even");
              }
            };
            const sell = (k: number) => {
              const c = Math.max(0, Math.min(MAX_CUPS, cups + k));
              setCups(c);
              check(c, price);
            };
            const pick = (p: number) => {
              setPrice(p);
              check(cups, p);
            };
            const blocks = Array.from({ length: Math.floor(cups / 10) }, (_, i) => (i + 1) * 10 * m).filter((v) => v < SCALE);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: steady price, $1 a cup to make</p>
                <svg
                  viewBox="0 0 320 130"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Empty $300 bar" : `${cups} cups cover $${covered} of $${FIXED}`}
                >
                  <text x={L} y={BY - 10} className={s.value}>
                    ${FIXED} a day to run
                  </text>
                  <rect x={px(0)} y={BY} width={px(FIXED) - px(0)} height={BH} rx={4} className={s.ghostFill} />
                  {!locked && covered > 0 && (
                    <>
                      <rect x={px(0)} y={BY} width={px(Math.min(covered, FIXED)) - px(0)} height={BH} className={s.soft} />
                      {covered > FIXED && (
                        <rect x={px(FIXED)} y={BY} width={px(covered) - px(FIXED)} height={BH} className={s.goodFill} />
                      )}
                      {blocks.map((v) => (
                        <line key={v} x1={px(v)} y1={BY} x2={px(v)} y2={BY + BH} stroke="var(--bg-3)" strokeWidth={1} />
                      ))}
                    </>
                  )}
                  <line x1={px(FIXED)} y1={BY - 4} x2={px(FIXED)} y2={BY + BH + 4} stroke="var(--fg)" strokeWidth={2.5} />
                  {!locked && (
                    <text
                      x={px(Math.min(covered, SCALE))}
                      y={BY + BH + 20}
                      textAnchor={covered < 60 ? "start" : covered > 520 ? "end" : "middle"}
                      className={profit === 0 ? s.big : s.value}
                    >
                      {profit < 0 ? `gap $${-profit}` : profit === 0 ? "covered exactly" : `profit $${profit}`}
                    </text>
                  )}
                </svg>

                <Row>
                  <Readout label="Cups sold" value={cups} />
                  <Readout label="Each cup leaves" value={locked ? "?" : `$${m}`} />
                </Row>
                <Row>
                  {STEPS.map((k) => (
                    <Control key={k} disabled={locked || cups >= MAX_CUPS} onClick={() => sell(k)} aria-label={`Sell ${k} more`}>
                      +{k}
                    </Control>
                  ))}
                  <Control disabled={locked || cups < 10} onClick={() => sell(-10)} aria-label="Take back 10">
                    −10
                  </Control>
                  <Control disabled={locked || cups < 1} onClick={() => sell(-1)} aria-label="Take back 1">
                    −1
                  </Control>
                </Row>
                <Row>
                  <span className={s.rowLabel}>Price</span>
                  {PRICES.map((p) => (
                    <Control
                      key={p}
                      className={price === p ? "active" : ""}
                      disabled={locked || price === p}
                      aria-pressed={price === p}
                      aria-label={`Price $${p}`}
                      onClick={() => pick(p)}
                    >
                      ${p}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
