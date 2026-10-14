"use client";

// The winning bid overpays (common value). A jar holds $100. Each bidder's guess = $100 + a random error
// in [−$20, +$20) from mulberry32(1) (seed 1, not chosen for the result; seeds 7 and 42 give the same
// picture); each bids its guess; the highest bid wins and pays it. Each preset reruns 20 auctions from
// the same seed, drawing guesses auction by auction, bidder by bidder.
// Seed 1: 10 bidders: average guess $99.2, average winning bid $116.5, winner overpaid 20 of 20.
// 2 bidders: $105.4 (12 of 20). 20 bidders: $118.6. Theory: expected top error 20(n − 1)/(n + 1).
// Picture: 20 columns (one per auction): faint dots for guesses, the winner's dot filled, a line at the
// jar's true $100 (drawn locked too: it is the stated value), a dashed line at the average winning bid.
// Controls (DOM order): [Run 20 auctions] (10 bidders), [2 bidders], [20 bidders], then Step (one more
// auction at the current number of bidders, from 0; disabled at 20).
// Milestones: "ten" (20 auctions with 10 bidders: average guess, average win, overpay count recorded) and
// "two" (20 auctions with 2 bidders: average win recorded). The record row keeps both.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const SEED = 1;
const AUCTIONS = 20;
const VALUE = 100;
const ERR = 20;
const MILESTONES = ["ten", "two"] as const;

/** 20 auctions of n bidders from the seed: each auction's guesses. */
function simulate(n: number) {
  const rng = mulberry32(SEED);
  return Array.from({ length: AUCTIONS }, () => Array.from({ length: n }, () => VALUE + (rng() * 2 * ERR - ERR)));
}
const RUNS: Record<number, number[][]> = { 2: simulate(2), 10: simulate(10), 20: simulate(20) };

function stats(n: number, k: number) {
  const a = RUNS[n].slice(0, k);
  const all = a.flat();
  const wins = a.map((g) => Math.max(...g));
  return {
    guess: all.reduce((x, y) => x + y, 0) / Math.max(1, all.length),
    win: wins.reduce((x, y) => x + y, 0) / Math.max(1, wins.length),
    over: wins.filter((w) => w > VALUE).length,
  };
}
const usd1 = (v: number) => `$${(Math.round(v * 10) / 10).toFixed(1)}`;

// Geometry (viewBox 320 × 150).
const XL = 44;
const XR = 312;
const YT = 14;
const YB = 128;
const VMIN = 76;
const VMAX = 124;
const COL = (XR - XL) / AUCTIONS;
const cx = (a: number) => XL + COL * (a + 0.5);
const py = (v: number) => YB - ((v - VMIN) / (VMAX - VMIN)) * (YB - YT);

type TenRec = { guess: number; win: number; over: number };

export default function WinningBidOverpays({ slug }: { slug: string }) {
  const [n, setN] = useState(10);
  const [k, setK] = useState(0);
  const [ten, setTen] = useState<TenRec | null>(null);
  const [two, setTwo] = useState<number | null>(null);
  const st = stats(n, k);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A jar holds $100 in coins. Ten bidders guess its value; guesses are right on average. Each bids its guess; highest wins. The winner usually…",
        options: ["pays about $100", "pays under $100", "pays over $100"],
        answer: 2,
      }}
      exploreHint="Run 20 auctions, then rerun them with 2 bidders."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With 10 bidders the guesses averaged {usd1(ten?.guess ?? 99.17)}, close to $100. The winning bids averaged{" "}
            <strong>{usd1(ten?.win ?? 116.53)}</strong>, and the winner overpaid in {ten?.over ?? 20} of 20 auctions. Winning picks out the
            bidder whose guess was highest, so the error that wins is the biggest one.
          </p>
          <p>
            With 2 bidders the winner paid {usd1(two ?? 105.42)} on average: more rivals, bigger overpayment. A made-up jar with random,
            seeded guesses.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const show = (nn: number, nk: number) => {
              setN(nn);
              setK(nk);
              if (nk !== AUCTIONS) return;
              const r = stats(nn, nk);
              if (nn === 10) {
                setTen((x) => x ?? r);
                reach("ten");
              }
              if (nn === 2) {
                setTwo((x) => x ?? r.win);
                reach("two");
              }
            };
            const on = !locked && k > 0;
            const full = (nn: number) => n === nn && k === AUCTIONS;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Guess = $100 + random error up to ±$20 (seed 1).</p>
                <Row>
                  <Readout label="Bidders" value={n} />
                  <Readout label="Avg guess" value={on ? usd1(st.guess) : "?"} />
                  <Readout label="Avg winning bid" value={on ? usd1(st.win) : "?"} />
                </Row>
                <svg
                  viewBox="0 0 320 150"
                  className="stage-svg"
                  role="img"
                  aria-label={on ? `${k} auctions, ${n} bidders: winning bids average ${usd1(st.win)}` : "Auctions of a $100 jar"}
                >
                  <line x1={XL} y1={YB} x2={XR} y2={YB} className={s.edge} />
                  {[80, 100, 120].map((v) => (
                    <text key={v} x={XL - 5} y={py(v) + 4} textAnchor="end" className={s.axis}>
                      ${v}
                    </text>
                  ))}
                  <line x1={XL} y1={py(VALUE)} x2={XR} y2={py(VALUE)} className={s.truth} />
                  <text x={XR} y={YB + 15} textAnchor="end" className={s.axis}>
                    auctions 1 to 20
                  </text>
                  {on &&
                    RUNS[n].slice(0, k).map((g, a) => {
                      const w = Math.max(...g);
                      return (
                        <g key={a}>
                          {g.map((v, i) => (v === w ? null : <circle key={i} cx={cx(a)} cy={py(v)} r={2.5} className={s.guess} />))}
                          <circle cx={cx(a)} cy={py(w)} r={4.5} className={w > VALUE ? s.winner : s.under} />
                        </g>
                      );
                    })}
                  {on && (
                    <g>
                      <line x1={XL} y1={py(st.win)} x2={XR} y2={py(st.win)} className={s.avgWin} />
                    </g>
                  )}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {locked ? "" : !ten && !two ? "Run the auctions." : null}
                  {!locked && ten && (
                    <span style={{ display: "block" }}>
                      10 bidders: guesses {usd1(ten.guess)}, winners {usd1(ten.win)} ({ten.over}/20 over)
                    </span>
                  )}
                  {!locked && two !== null && <span style={{ display: "block" }}>2 bidders: winners {usd1(two)}</span>}
                </p>
                <Row>
                  <Control className={full(10) ? "active" : ""} disabled={locked || full(10)} onClick={() => show(10, AUCTIONS)}>
                    Run 20 auctions
                  </Control>
                  <Control className={full(2) ? "active" : ""} disabled={locked || full(2)} onClick={() => show(2, AUCTIONS)}>
                    2 bidders
                  </Control>
                  <Control className={full(20) ? "active" : ""} disabled={locked || full(20)} onClick={() => show(20, AUCTIONS)}>
                    20 bidders
                  </Control>
                </Row>
                {phase !== "reveal" && (
                <Row>
                  <Control disabled={locked || k >= AUCTIONS} onClick={() => show(n, k + 1)}>
                    Step: one auction
                  </Control>
                </Row>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
