"use client";

// Revenue equivalence: two bidders, values uniform on $0–100, each bidding optimally for the rule.
//   second-price: bid your value; the winner pays the lower value.
//   first-price:  bid v/2; the winner pays half its own value.
//   all-pay:      bid v²/200; both bidders pay their bids.
// One picture: the seller's running average per rule (bars, theory $100/3 ghosted) and, below it,
// the last auction under the chosen rule (both values and who pays what), which is the "why".
// Seeded: mulberry32(97), auction i uses draws 2i and 2i+1. Seed 97 is the brief's, not chosen for the result.
// 20,000 auctions: 33.395 / 33.303 / 33.302. Key state: all 20,000 run, and the all-pay auction looked at.
// v3: readouts show the running average of the higher and the lower value, so the cancelling is on stage
// (second-price = average lower value; first-price = half the average higher value). The theory line appears only
// after the full run (it hinted "the same" before the commit). The full run is recorded and stays on stage after Reset.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const SEED = 97;
const N = 20000;
const THEORY = 100 / 3;
type Rule = 0 | 1 | 2;
const RULES = ["Second-price", "First-price", "All-pay"] as const;

// Precompute every auction once (deterministic).
const VALUES: [number, number][] = (() => {
  const r = mulberry32(SEED);
  return Array.from({ length: N }, () => [r() * 100, r() * 100] as [number, number]);
})();
/** What each bidder pays under each rule, given the two values. */
function payments(rule: Rule, [a, b]: [number, number]): [number, number] {
  const hi = Math.max(a, b);
  const aWins = a >= b;
  if (rule === 0) return aWins ? [Math.min(a, b), 0] : [0, Math.min(a, b)];
  if (rule === 1) return aWins ? [hi / 2, 0] : [0, hi / 2];
  return [(a * a) / 200, (b * b) / 200];
}
const revenue = (rule: Rule, v: [number, number]) => payments(rule, v)[0] + payments(rule, v)[1];
// Cumulative revenue per rule: CUM[rule][n] = total over the first n auctions.
const CUM: number[][] = ([0, 1, 2] as Rule[]).map((rule) => {
  const c = [0];
  for (let i = 0; i < N; i++) c.push(c[i] + revenue(rule, VALUES[i]));
  return c;
});
const CUM_HI = [0];
const CUM_LO = [0];
for (let i = 0; i < N; i++) {
  CUM_HI.push(CUM_HI[i] + Math.max(...VALUES[i]));
  CUM_LO.push(CUM_LO[i] + Math.min(...VALUES[i]));
}
const MILESTONES = ["all-run", "all-pay-seen"] as const;
type Run = { m: number; avgs: string[]; hi: number; lo: number };
const snapshot = (m: number): Run => ({
  m,
  avgs: ([0, 1, 2] as Rule[]).map((r) => usdOf(CUM[r][m] / m)),
  hi: CUM_HI[m] / m,
  lo: CUM_LO[m] / m,
});

function usdOf(v: number) {
  return `$${v.toFixed(1)}`;
}
const usd = usdOf;

// Geometry (viewBox 320 × 236).
const CH_TOP = 24;
const CH_BOT = 132;
const YMAX = 50;
const y = (v: number) => CH_BOT - (v / YMAX) * (CH_BOT - CH_TOP);
const BAR_X = [40, 130, 220];
const BAR_W = 64;
const LINE_Y = 196;
const lx = (v: number) => 20 + (v / 100) * 280;

export default function SameRevenueAnyRule({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [rule, setRule] = useState<Rule>(0);
  const avg = (r: Rule) => (n === 0 ? 0 : CUM[r][n] / n);
  const last = n > 0 ? VALUES[n - 1] : null;
  const pay = last ? payments(rule, last) : null;
  const [full, setFull] = useState<Run | null>(null); // recorded when all 20,000 have run

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Two bidders, values random $0–100, each bidding optimally. Which rule earns the seller most on average?",
        options: ["First-price", "Second-price", "About the same"],
        answer: 2,
      }}
      exploreHint="Run all 20,000 auctions, then look at who pays what under each rule."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const run = full ?? snapshot(N);
        const one = last ? [revenue(0, last), revenue(1, last)] : null;
        return (
          <>
            <p>
              Over your {run.m.toLocaleString("en-US")} auctions the seller averaged <strong>{run.avgs[0]}</strong> (second-price),{" "}
              <strong>{run.avgs[1]}</strong> (first-price) and <strong>{run.avgs[2]}</strong> (all-pay). Theory says $33.3 for all three.
            </p>
            <p>
              {one ? `In one auction either rule can charge more (your last: second-price ${usd(one[0])}, first-price ${usd(one[1])}). ` : ""}On
              average they match. Second-price charges the lower value, which averaged {usd(run.lo)}. First-price charges half
              the winner&apos;s value, and the higher value averaged {usd(run.hi)}, so half is {usd(run.hi / 2)}. All-pay
              charges both bidders, but each bids only a little. Each rule changes the bids, and the changes cancel.
            </p>
            <p className="muted">A model: two bidders, values independent and uniform, everyone bidding optimally.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const run = (to: number) => {
              setN(to);
              if (to >= N) {
                setFull(snapshot(N));
                reach("all-run");
              }
            };
            const pick = (r: Rule) => {
              setRule(r);
              if (r === 2) reach("all-pay-seen");
            };
            const show = !locked && n > 0;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: 2 bidders · values random $0–100 · seed {SEED}</p>
                <svg viewBox="0 0 320 236" className="stage-svg" role="img" aria-label="Seller's average revenue under three auction rules, and the last auction">
                  <text x={20} y={14} className={s.axis}>
                    {full ? "seller's average per auction · dashed: theory $33.3" : "seller's average per auction"}
                  </text>
                  <line x1={20} y1={CH_BOT} x2={300} y2={CH_BOT} stroke="var(--line)" />
                  {RULES.map((name, i) => {
                    const v = avg(i as Rule);
                    return (
                      <g key={name}>
                        {show && <rect x={BAR_X[i]} y={y(v)} width={BAR_W} height={CH_BOT - y(v)} className={rule === i ? s.main : s.soft} />}
                        <text x={BAR_X[i] + BAR_W / 2} y={show ? y(v) - 5 : CH_BOT - 5} textAnchor="middle" className={s.value}>
                          {show ? usd(v) : "?"}
                        </text>
                        <text x={BAR_X[i] + BAR_W / 2} y={CH_BOT + 14} textAnchor="middle" className={rule === i && !locked ? s.value : s.axis}>
                          {name}
                        </text>
                      </g>
                    );
                  })}
                  {full && <line x1={20} y1={y(THEORY)} x2={300} y2={y(THEORY)} className={s.ghost} />}

                  {/* the last auction under the chosen rule */}
                  <text x={20} y={LINE_Y - 30} className={s.axis}>
                    {show ? `last auction, ${RULES[rule].toLowerCase()}` : "last auction"}
                  </text>
                  <line x1={lx(0)} y1={LINE_Y} x2={lx(100)} y2={LINE_Y} stroke="var(--line)" strokeWidth={2} />
                  <text x={lx(0)} y={LINE_Y + 14} className={s.small}>
                    $0
                  </text>
                  <text x={lx(100)} y={LINE_Y + 14} textAnchor="end" className={s.small}>
                    $100
                  </text>
                  {show &&
                    last &&
                    pay &&
                    last.map((v, i) => (
                      <g key={i}>
                        <circle cx={lx(v)} cy={LINE_Y} r={6} className={s.dot} />
                        <text x={lx(v)} y={LINE_Y - 10} textAnchor="middle" className={s.small}>
                          {i === 0 ? "A" : "B"} {usd(v)}
                        </text>
                        {pay[i] > 0 && (
                          <g>
                            <rect x={lx(0)} y={LINE_Y + 18 + i * 9} width={Math.max(1, lx(pay[i]) - lx(0))} height={6} className={s.main} />
                            <text x={lx(pay[i]) + 4} y={LINE_Y + 24 + i * 9} className={s.small}>
                              {i === 0 ? "A" : "B"} pays {usd(pay[i])}
                            </text>
                          </g>
                        )}
                      </g>
                    ))}
                </svg>

                <Row>
                  <Control disabled={locked || n >= N} onClick={() => run(n + 1)}>
                    1 auction
                  </Control>
                  <Control disabled={locked || n >= N} onClick={() => run(Math.min(N, n + 1000))}>
                    +1,000
                  </Control>
                  <Control disabled={locked || n >= N} onClick={() => run(N)}>
                    All 20,000
                  </Control>
                </Row>
                <Row>
                  {RULES.map((name, i) => (
                    <Control
                      key={name}
                      className={rule === i ? "active" : ""}
                      disabled={locked || rule === i || n === 0}
                      aria-pressed={rule === i}
                      onClick={() => pick(i as Rule)}
                    >
                      {name}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Avg higher value" value={show ? usd(CUM_HI[n] / n) : "?"} />
                  <Readout label="Avg lower value" value={show ? usd(CUM_LO[n] / n) : "?"} />
                </Row>
                {full && n < N && (
                  <p className={s.chip}>
                    Your 20,000 run: {full.avgs.join(" / ")}; higher {usd(full.hi)}, lower {usd(full.lo)}
                  </p>
                )}
                <Row>
                  <Readout label="Auctions" value={locked ? "?" : n.toLocaleString("en-US")} />
                  <Control disabled={locked || n === 0} onClick={() => run(0)}>
                    Reset
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
