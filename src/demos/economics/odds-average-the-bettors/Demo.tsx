"use client";

// Pari-mutuel odds as a wealth-weighted average. Two bettors each split ALL their money between
// outcomes A and B in proportion to their beliefs. The pool bar shows the money on A (from each
// bettor) and on B; the A/B boundary is the market's implied chance for A. A dashed marker shows
// the simple average of the two beliefs.
// Start: bettor 1 $300 at 80%, bettor 2 $100 at 40%: $280 of $400 on A = 70% (simple average 60%).
// Key states: equal money (the odds land on the simple average) and bettor 2 richer (odds move
// toward bettor 2's belief).
// Model: two bettors, no house cut, everyone bets all their money by belief.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = { w1: 300, p1: 80, w2: 100, p2: 40 };
const MILESTONES = ["equal", "richer2"] as const;

function pool(w1: number, p1: number, w2: number, p2: number) {
  const a1 = (w1 * p1) / 100;
  const a2 = (w2 * p2) / 100;
  const b1 = w1 - a1;
  const b2 = w2 - a2;
  const total = w1 + w2;
  return { a1, a2, b1, b2, total, onA: a1 + a2, implied: (a1 + a2) / total, simple: (p1 + p2) / 200 };
}
const usd = (v: number) => `$${Math.round(v)}`;
const pct = (v: number) => `${Math.round(v * 100)}%`;

const X0 = 16;
const W = 288;

export default function OddsAverage({ slug }: { slug: string }) {
  const [w1, setW1] = useState(START.w1);
  const [p1, setP1] = useState(START.p1);
  const [w2, setW2] = useState(START.w2);
  const [p2, setP2] = useState(START.p2);
  const q = pool(w1, p1, w2, p2);
  const st = pool(START.w1, START.p1, START.w2, START.p2);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Bettor 1 ($${START.w1}) thinks A wins ${START.p1}%; bettor 2 ($${START.w2}) thinks ${START.p2}%. Each splits all their money by belief. Implied chance for A?`,
        options: ["60%", "70%", "80%"],
        answer: 1,
      }}
      exploreHint="Give both bettors equal money, then make bettor 2 the richer one."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            $300 × 80% = $240 and $100 × 40% = $40 put <strong>{usd(st.onA)} of the {usd(st.total)} pool</strong> on A, so the odds said{" "}
            {pct(st.implied)}, not the simple average of {pct(st.simple)}.
          </p>
          <p>
            With equal money the odds landed on the simple average; when bettor 2 held more, they slid toward bettor 2&apos;s 40%. Each
            opinion counts in proportion to the money behind it: the implied chance is the wealth-weighted average belief.
          </p>
          <p className="muted">
            A simplified model: no house cut, each bettor splits all their money by belief, as a bettor maximising the logarithm of their
            wealth would.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const apply = (n: { w1?: number; p1?: number; w2?: number; p2?: number }) => {
              const v = { w1, p1, w2, p2, ...n };
              if (n.w1 !== undefined) setW1(n.w1);
              if (n.p1 !== undefined) setP1(n.p1);
              if (n.w2 !== undefined) setW2(n.w2);
              if (n.p2 !== undefined) setP2(n.p2);
              if (v.w1 === v.w2) reach("equal");
              if (v.w2 > v.w1) reach("richer2");
            };
            const px = (v: number) => (v / q.total) * W;
            const segs = [
              { v: q.a1, label: "1", cls: s.soft },
              { v: q.a2, label: "2", cls: s.mutedFill },
              { v: q.b1, label: "1", cls: s.soft },
              { v: q.b2, label: "2", cls: s.mutedFill },
            ];
            let x = X0;
            const cut = X0 + px(q.onA);
            const clamp = (v: number) => Math.min(X0 + W - 60, Math.max(X0 + 60, v));
            const avgX = X0 + q.simple * W;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: no house cut; all money bet by belief</p>
                <svg
                  viewBox="0 0 320 150"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "The betting pool on A and B" : `${usd(q.onA)} of ${usd(q.total)} on A: implied ${pct(q.implied)}`}
                >
                  <text x={X0} y={22} className={s.value}>
                    {locked ? "On A" : `On A: ${usd(q.onA)}`}
                  </text>
                  <text x={X0 + W} y={22} className={s.value} textAnchor="end">
                    {locked ? "On B" : `On B: ${usd(q.total - q.onA)}`}
                  </text>
                  <rect x={X0} y={34} width={W} height={44} rx={4} className={s.track} />
                  {!locked &&
                    segs.map((g, i) => {
                      const w = px(g.v);
                      const r = (
                        <g key={i}>
                          <rect x={x} y={34} width={w} height={44} className={g.cls} />
                          {w > 26 && (
                            <text x={x + w / 2} y={60} className={s.small} textAnchor="middle">
                              {g.label}: {usd(g.v)}
                            </text>
                          )}
                        </g>
                      );
                      x += w;
                      return r;
                    })}
                  {!locked && (
                    <g>
                      <line x1={cut} y1={28} x2={cut} y2={96} stroke="var(--fg)" strokeWidth={3} />
                      <text x={clamp(cut)} y={110} className={s.big} textAnchor="middle">
                        odds {pct(q.implied)}
                      </text>
                      <line x1={avgX} y1={34} x2={avgX} y2={124} className={s.ghost} />
                      <text x={clamp(avgX)} y={138} className={s.axis} textAnchor="middle">
                        simple average {pct(q.simple)}
                      </text>
                    </g>
                  )}
                </svg>
                <Row>
                  <Readout label="Implied chance of A" value={locked ? "?" : pct(q.implied)} />
                  <Readout label="Simple average" value={locked ? "?" : pct(q.simple)} />
                </Row>
                <Row>
                  <Control className={w1 === 200 && w2 === 200 ? "active" : ""} disabled={locked || (w1 === 200 && w2 === 200)} onClick={() => apply({ w1: 200, w2: 200 })}>
                    Equal money
                  </Control>
                  <Control className={w1 === 100 && w2 === 300 ? "active" : ""} disabled={locked || (w1 === 100 && w2 === 300)} onClick={() => apply({ w1: 100, w2: 300 })}>
                    Bettor 2 richer
                  </Control>
                  <Control
                    disabled={locked || (w1 === START.w1 && p1 === START.p1 && w2 === START.w2 && p2 === START.p2)}
                    onClick={() => apply({ ...START })}
                  >
                    Start values
                  </Control>
                </Row>
                <Row>
                  <Slider label="Bettor 1 money" value={w1} min={50} max={400} step={50} format={usd} disabled={locked} onChange={(v) => apply({ w1: v })} />
                  <Slider label="Bettor 1 belief" value={p1} min={0} max={100} step={10} format={(v) => `${v}%`} disabled={locked} onChange={(v) => apply({ p1: v })} />
                </Row>
                <Row>
                  <Slider label="Bettor 2 money" value={w2} min={50} max={400} step={50} format={usd} disabled={locked} onChange={(v) => apply({ w2: v })} />
                  <Slider label="Bettor 2 belief" value={p2} min={0} max={100} step={10} format={(v) => `${v}%`} disabled={locked} onChange={(v) => apply({ p2: v })} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
