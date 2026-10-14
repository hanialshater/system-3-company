"use client";

// Money multiplier (textbook model). A bank keeps a share of each deposit and lends the rest; the
// borrower spends it and the seller deposits it, and so on. One picture: a single column of deposit
// slabs, each (1 − kept) times the one below, growing toward first deposit ÷ share kept.
// Key state: at 10% kept, enough rounds that total deposits are within 1% of $10,000 (round 44+).
// Model: every loan is spent and redeposited, no one holds cash, a fixed share kept.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FIRST = 1000;
const RATIOS = [10, 20, 50]; // % kept
const Q_RATIO = 10;
const MAX_ROUNDS = 200;
const MILESTONES = ["relend", "near-limit"] as const;

const deposit = (r: number, k: number) => FIRST * (1 - k / 100) ** (r - 1); // the r-th deposit
const total = (r: number, k: number) => (FIRST * (1 - (1 - k / 100) ** r)) / (k / 100);
const limit = (k: number) => FIRST / (k / 100);
const near = (r: number, k: number) => total(r, k) >= 0.99 * limit(k);
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const LIMIT_Q = limit(Q_RATIO); // 10,000

// Geometry (viewBox 320 × 200): the column is $0..$10,000 tall.
const BOT = 186;
const TOPY = 22;
const CX = 70;
const CW = 70;
const py = (v: number) => BOT - (v / LIMIT_Q) * (BOT - TOPY);
const CAP_Y = 58;

export default function BankLendsItAgain({ slug }: { slug: string }) {
  const [rounds, setRounds] = useState(1);
  const [ratio, setRatio] = useState(Q_RATIO);
  const [maxQ, setMaxQ] = useState(1); // most rounds reached at 10%
  const [tried, setTried] = useState<number[]>([]); // other ratios run to their limit

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A bank keeps ${Q_RATIO}% of each deposit and lends the rest; the borrower spends it and the seller deposits it. Starting from one ${usd(FIRST)} deposit and repeating without end, what do total deposits reach?`,
        options: [usd(FIRST * 1.1), usd(limit(50)), usd(LIMIT_Q)],
        answer: 2,
      }}
      exploreHint="Run the rounds until the column stops growing."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Keeping {Q_RATIO}%, round 2 added {usd(deposit(2, Q_RATIO))}, and, as the round caption showed, every round adds 90%
            of the one before.
            After {maxQ} rounds total deposits were <strong>{usd(total(maxQ, Q_RATIO))}</strong>, levelling off toward{" "}
            <strong>{usd(LIMIT_Q)}</strong>: {usd(FIRST)} ÷ 0.{Q_RATIO}.
            {tried.length > 0 && ` Keeping ${tried.map((k) => `${k}% stopped it at ${usd(limit(k))}`).join(", ")}.`}
          </p>
          <p>Each deposit funds the next loan, so the pile grows to the first deposit divided by the share the bank keeps.</p>
          <p className="muted">
            A textbook simplification. Real banks lend when they find borrowers and are limited by capital rules; many central banks,
            the US Federal Reserve among them since March 2020, set no reserve requirement.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (r: number, k: number) => {
              if (k === Q_RATIO) {
                setMaxQ((m) => Math.max(m, r));
                if (r >= 2) reach("relend");
                if (near(r, k)) reach("near-limit");
              } else if (near(r, k)) {
                setTried((t) => (t.includes(k) ? t : [...t, k].sort((a, b) => a - b)));
              }
            };
            const go = (r: number) => {
              const v = Math.max(1, Math.min(MAX_ROUNDS, r));
              setRounds(v);
              check(v, ratio);
            };
            const pick = (k: number) => {
              setRatio(k);
              check(rounds, k);
            };
            const tot = total(rounds, ratio);
            const showLimit = !locked && near(rounds, ratio);
            const slabs: { y: number; h: number }[] = [];
            let acc = 0;
            for (let r = 1; r <= rounds; r++) {
              const d = deposit(r, ratio);
              const h = py(acc) - py(acc + d);
              if (h < 0.4) break;
              slabs.push({ y: py(acc + d), h });
              acc += d;
            }
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Textbook model: every loan is spent and redeposited</p>
                <svg
                  viewBox="0 0 320 200"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "One $1,000 deposit" : `${rounds} rounds, total deposits ${usd(tot)}`}
                >
                  <line x1={CX - 10} y1={BOT} x2={CX + CW + 10} y2={BOT} stroke="var(--line)" />
                  {slabs.map((sl, i) => (
                    <rect
                      key={i}
                      x={CX}
                      y={sl.y}
                      width={CW}
                      height={sl.h}
                      className={i % 2 ? s.soft : s.main}
                      stroke="var(--bg-2)"
                      strokeWidth={sl.h > 2 ? 1 : 0}
                    />
                  ))}
                  {!locked && (
                    <text x={CX - 6} y={py(tot) + 4} textAnchor="end" className={s.value}>
                      {usd(tot)}
                    </text>
                  )}
                  {showLimit && (
                    <>
                      <line x1={CX - 10} y1={py(limit(ratio))} x2={300} y2={py(limit(ratio))} className={s.ghost} />
                      <text x={300} y={py(limit(ratio)) - 6} textAnchor="end" className={s.value}>
                        limit {usd(limit(ratio))} = {usd(FIRST)} ÷ {ratio}%
                      </text>
                    </>
                  )}
                  <text x={CX + CW + 8} y={py(FIRST / 2) + 4} className={s.axis}>
                    first deposit {usd(FIRST)}
                  </text>
                  {/* Round caption sits between the 10% and 20% limit lines (y 22 and 104), clear of every limit label. */}
                  {!locked && rounds > 1 && (
                    <text x={CX + CW + 8} y={CAP_Y} className={s.axis}>
                      <tspan x={CX + CW + 8}>
                        round {rounds} adds {deposit(rounds, ratio) >= 1 ? usd(deposit(rounds, ratio)) : "under $1"}
                      </tspan>
                      {deposit(rounds - 1, ratio) >= 10 && (
                        <tspan x={CX + CW + 8} dy={14}>
                          {Math.round(deposit(rounds, ratio)) * 100 === (100 - ratio) * Math.round(deposit(rounds - 1, ratio)) ? "=" : "≈"}{" "}
                          {100 - ratio}% of round {rounds - 1}&apos;s {usd(deposit(rounds - 1, ratio))}
                        </tspan>
                      )}
                    </text>
                  )}
                </svg>

                <Row>
                  <Control disabled={locked || rounds === 1} onClick={() => go(1)} aria-label="Start over">
                    Back to 1
                  </Control>
                  <Control disabled={locked || rounds >= MAX_ROUNDS} onClick={() => go(rounds + 1)} aria-label="Next round">
                    Next round
                  </Control>
                  <Control disabled={locked || rounds >= MAX_ROUNDS} onClick={() => go(rounds + 10)} aria-label="10 more rounds">
                    +10
                  </Control>
                  <Control disabled={locked || rounds >= MAX_ROUNDS} onClick={() => go(rounds + 50)} aria-label="50 more rounds">
                    +50
                  </Control>
                </Row>
                <Row>
                  <span className={s.rowLabel}>Bank keeps</span>
                  {RATIOS.map((k) => (
                    <Control
                      key={k}
                      className={`${s.tile} ${ratio === k ? "active" : ""}`}
                      disabled={locked || ratio === k}
                      aria-pressed={ratio === k}
                      onClick={() => pick(k)}
                    >
                      {k}%
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Rounds" value={rounds} />
                  <Readout label="Total deposits" value={locked ? "?" : usd(tot)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
