"use client";

// Pari-mutuel odds as a wealth-weighted average. Two bettors each split ALL their money between
// outcomes A and B in proportion to their beliefs. The pool bar shows the money on A (from each
// bettor) and on B; the A/B boundary is the market's implied chance for A. A dashed marker shows
// the simple average of the two beliefs.
// Start: bettor 1 $300 at 80%, bettor 2 $100 at 40%: $280 of $400 on A = 70% (simple average 60%).
// Key states: equal money (the odds land on the simple average) and bettor 2 richer (odds move
// toward bettor 2's belief).
// Model: two bettors, no house cut, everyone bets all their money by belief.
// v3 (wave G r7): the "Seen" rows carry every number the reveal quotes (start: $240 + $40 = $280 of
// $400, 70%; equal and richer runs with their money, odds and average), so slider play afterwards
// cannot leave the reveal quoting a state that is gone. Simple-average readout hidden until the
// commit. Bar segment labels on two lines so the $40 sliver is readable.
// v4 (r8): fits beside the reveal on a phone. The four sliders are gone: the three preset buttons
// are the explore (and the last one, "Start values", leaves the picture on the state the reveal's
// first paragraph quotes). The readout row is gone (the picture's own "odds" and "simple average"
// labels carry it). The picture is 110 px tall instead of 150, the Seen rows are two lines, and the
// model note lives only on the stage chip.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = { w1: 300, p1: 80, w2: 100, p2: 40 };
const MILESTONES = ["equal", "richer2", "start"] as const;
type Rec = { w1: number; p1: number; w2: number; p2: number; implied: number; simple: number };

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
  // Recorded when each milestone is reached, so the reveal quotes what the learner saw.
  const [eq, setEq] = useState<Rec | null>(null);
  const [rich, setRich] = useState<Rec | null>(null);
  const [seenStart, setSeenStart] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Bettor 1 ($${START.w1}) thinks A wins ${START.p1}%; bettor 2 ($${START.w2}) thinks ${START.p2}%. Each splits all their money by belief. Implied chance for A?`,
        options: ["60%", "70%", "80%"],
        answer: 1,
      }}
      exploreHint="Give both bettors equal money, make bettor 2 the richer one, then go back to the start."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          {seenStart && (
            <p>
              {usd(START.w1)} × {START.p1}% = {usd(st.a1)} and {usd(START.w2)} × {START.p2}% = {usd(st.a2)} put <strong>{usd(st.onA)} of the {usd(st.total)} pool</strong> on A, so the odds said{" "}
              {pct(st.implied)}, not the simple average of {pct(st.simple)}.
            </p>
          )}
          <p>
            {eq ? `With equal money the solid line sat on the dashed one (${pct(eq.implied)}). ` : ""}
            {rich
              ? `With bettor 2 richer (${usd(rich.w2)} to ${usd(rich.w1)}), the odds slid to ${pct(rich.implied)}, toward bettor 2's ${rich.p2}%, while the dashed average stayed at ${pct(rich.simple)}. `
              : ""}
            Each opinion counts in proportion to the money behind it: the implied chance is the wealth-weighted average belief.
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
              const r = pool(v.w1, v.p1, v.w2, v.p2);
              const rec: Rec = { ...v, implied: r.implied, simple: r.simple };
              if (v.w1 === v.w2) {
                setEq((o) => o ?? rec);
                reach("equal");
              }
              if (v.w2 > v.w1) {
                setRich((o) => o ?? rec);
                reach("richer2");
              }
              if (v.w1 === START.w1 && v.p1 === START.p1 && v.w2 === START.w2 && v.p2 === START.p2) {
                setSeenStart(true);
                reach("start");
              }
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
                  viewBox="0 0 320 110"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "The betting pool on A and B" : `${usd(q.onA)} of ${usd(q.total)} on A: implied ${pct(q.implied)}`}
                >
                  <text x={X0} y={13} className={s.value}>
                    {locked ? "On A" : `On A: ${usd(q.onA)}`}
                  </text>
                  <text x={X0 + W} y={13} className={s.value} textAnchor="end">
                    {locked ? "On B" : `On B: ${usd(q.total - q.onA)}`}
                  </text>
                  <rect x={X0} y={20} width={W} height={36} rx={4} className={s.track} />
                  {!locked &&
                    segs.map((g, i) => {
                      const w = px(g.v);
                      const r = (
                        <g key={i}>
                          <rect x={x} y={20} width={w} height={36} className={g.cls} />
                          {w > 22 && (
                            <text x={x + w / 2} y={34} className={s.small} textAnchor="middle">
                              <tspan x={x + w / 2}>{g.label}</tspan>
                              <tspan x={x + w / 2} dy={12}>
                                {usd(g.v)}
                              </tspan>
                            </text>
                          )}
                        </g>
                      );
                      x += w;
                      return r;
                    })}
                  {!locked && (
                    <g>
                      <line x1={cut} y1={16} x2={cut} y2={70} stroke="var(--fg)" strokeWidth={3} />
                      <text x={clamp(cut)} y={83} className={s.big} textAnchor="middle">
                        odds {pct(q.implied)}
                      </text>
                      <line x1={avgX} y1={20} x2={avgX} y2={92} className={s.ghost} />
                      <text x={clamp(avgX)} y={105} className={s.axis} textAnchor="middle">
                        simple average {pct(q.simple)}
                      </text>
                    </g>
                  )}
                </svg>
                <p className={s.key}>
                  <span className={s.swatch1} /> bettor 1&apos;s money <span className={s.swatch2} /> bettor 2&apos;s · left of the line: on A
                </p>
                <div className={s.key} data-testid="seen">
                  {eq || rich || seenStart ? (
                    <>
                      {seenStart && (
                        <div>
                          Seen, start: {usd(st.a1)} + {usd(st.a2)} = {usd(st.onA)} of {usd(st.total)} on A, odds {pct(st.implied)}, average {pct(st.simple)}
                        </div>
                      )}
                      {(eq || rich) && (
                        <div>
                          {eq ? `Equal ${usd(eq.w1)} each: ${pct(eq.implied)} (avg ${pct(eq.simple)})` : ""}
                          {eq && rich ? " · " : ""}
                          {rich ? `2 richer, ${usd(rich.w2)} at ${rich.p2}% vs ${usd(rich.w1)}: ${pct(rich.implied)} (avg ${pct(rich.simple)})` : ""}
                        </div>
                      )}
                    </>
                  ) : (
                    "Seen: nothing yet"
                  )}
                </div>
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
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
