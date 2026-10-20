"use client";

// Balanced outcomes on a 4-path A–B–C–D, deals A–B and C–D, each worth $1.
// One picture: the line of four, a split bar under each deal (the fallback part hatched), and a
// strip of B's share by round. Each round every pair covers both fallbacks, then halves the rest;
// B's fallback is what C would leave B (1 − C's share), and vice versa.
// Round 0: no fallbacks yet, so each pair halves $1. Then 0.75, 0.625, 0.6875 … → 2/3.
// Key state: settled (B within $0.0005 of 2/3, so the 3-decimal readout shows $0.667 / $0.333; round 9). Model, not a forecast of any real bargain.
// v3 (wave E r6): no target line on the strip (ticks 0.50 / 0.75 / 1.00 only); every round's B share
// is printed in a trace row that Reset does not clear, and the reveal quotes that row; the chip shows
// where B's fallback comes from (1 − C's share last round), so the swing is visible; options carry
// the same precision.
// v5 (wave H r8): picture compacted (viewBox 230 -> 158; the A-D labels under the bars dropped, the legend moved beside
// the strip title, ticks on the left), readouts row dropped (the chip now names the round, so after Reset it reads
// 'Round 0' instead of a large B GETS $0.500), reveal trimmed to <= 90 words so the stage top fits on a phone.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const MAX_ROUND = 14;
const TOL = 0.0005; // half a tenth of a cent: the first round whose readout rounds to $0.667

/** B's (= C's, by symmetry) share after each round, round 0 = no fallbacks. */
function shares(): { inner: number; fallback: number }[] {
  const out = [{ inner: 0.5, fallback: 0 }];
  let vB = 0.5;
  let vC = 0.5;
  for (let r = 1; r <= MAX_ROUND; r++) {
    const oB = 1 - vC; // B's deal with C would leave B what C does not keep
    const oC = 1 - vB;
    vB = oB + (1 - oB) / 2; // A's fallback is 0, so the surplus over fallbacks is 1 − oB
    vC = oC + (1 - oC) / 2;
    out.push({ inner: vB, fallback: oB });
  }
  return out;
}
const ROUNDS = shares();
const SETTLED_AT = ROUNDS.findIndex((r) => Math.abs(r.inner - 2 / 3) < TOL); // 9 (round 8 is 0.66602, outside TOL)
const MILESTONES = ["stepped", "settled"] as const;

const usd = (v: number) => `$${v.toFixed(3)}`;

// Geometry (viewBox 320 × 158; v5 compacted from 230 so the stage top fits with the reveal on a phone).
const VIEW_H = 158;
const NODE_X = [40, 120, 200, 280];
const NODE_Y = 38;
const BAR_Y = 64;
const BAR_H = 20;
const BAR_W = 120; // $1
const STRIP_Y = 106;
const STRIP_H = 46; // share 0.5 at bottom, 1.0 at top

export default function FourInARowTwoThirds({ slug }: { slug: string }) {
  const [round, setRound] = useState(0);
  const [maxSeen, setMaxSeen] = useState(0);
  const { inner, fallback } = ROUNDS[round];
  const outer = 1 - inner;
  const settled = round >= SETTLED_AT;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Four people stand in a line, A–B–C–D, and only neighbours can deal. A pairs with B and C with D; each pair splits $1 fairly given outside options. What does B get?",
        options: ["About $0.50", "About $0.67", "About $0.90"],
        answer: 1,
      }}
      exploreHint="Step round by round, then run until the split stops moving."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The trace rows show B&apos;s share swing: {ROUNDS.slice(1, 4).map((r) => usd(r.inner)).join(", ")}, then settle at{" "}
            <strong>{usd(ROUNDS[SETTLED_AT].inner)}</strong> (two thirds) by round {SETTLED_AT}. A kept {usd(1 - ROUNDS[SETTLED_AT].inner)}.
          </p>
          <p>
            B&apos;s fallback is $1 minus C&apos;s last share, and C&apos;s mirrors B&apos;s: C got {usd(ROUNDS[1].inner)} in round 1, so
            B&apos;s fallback was {usd(ROUNDS[2].fallback)} in round 2.
          </p>
          <p>Each inner person&apos;s option feeds the other&apos;s, so neither takes all: power depends on the network.</p>
          <p className="muted">A model, not a forecast of real bargains.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (r: number) => {
              setRound(r);
              setMaxSeen((m) => Math.max(m, r));
              if (r >= 1) reach("stepped");
              if (r >= SETTLED_AT) reach("settled");
            };
            const show = !locked;
            // Split bars: A–B bar has A on the left, B on the right (B's fallback hatched next to B).
            const ab = { x: NODE_X[0] - 20, a: outer, b: inner, fb: fallback };
            const cd = { x: NODE_X[2] - 20 };
            const stripX = (r: number) => 40 + (r / MAX_ROUND) * 270; // 40..310; tick labels end at x 33
            const stripY = (v: number) => STRIP_Y + STRIP_H - ((v - 0.5) / 0.5) * STRIP_H;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>
                  {locked
                    ? "Each pair covers both fallbacks, then halves the rest"
                    : round === 0
                      ? "Round 0: no fallbacks yet, each pair halves $1"
                      : `Round ${round}: B's fallback = $1 − C's last share ${usd(ROUNDS[round - 1].inner)} = ${usd(fallback)}`}
                </p>
                <svg viewBox={`0 0 320 ${VIEW_H}`} className="stage-svg" role="img" aria-label="Line of four people with split bars and B's share by round">
                  {/* edges */}
                  <line x1={NODE_X[0]} y1={NODE_Y} x2={NODE_X[1]} y2={NODE_Y} className={s.deal} />
                  <line x1={NODE_X[2]} y1={NODE_Y} x2={NODE_X[3]} y2={NODE_Y} className={s.deal} />
                  <line x1={NODE_X[1]} y1={NODE_Y} x2={NODE_X[2]} y2={NODE_Y} className={s.ghost} />
                  <text x={160} y={NODE_Y - 10} textAnchor="middle" className={s.axis}>
                    fallback
                  </text>
                  {["A", "B", "C", "D"].map((n, i) => {
                    const v = i === 0 || i === 3 ? outer : inner;
                    return (
                      <g key={n}>
                        <circle cx={NODE_X[i]} cy={NODE_Y} r={15} className={i === 1 || i === 2 ? s.cellOn : s.cell} />
                        <text x={NODE_X[i]} y={NODE_Y + 5} textAnchor="middle" className={s.big}>
                          {n}
                        </text>
                        <text x={NODE_X[i]} y={NODE_Y - 22} textAnchor="middle" className={s.value}>
                          {show ? usd(v) : "?"}
                        </text>
                      </g>
                    );
                  })}

                  {/* A–B split bar */}
                  {show && (
                    <g>
                      <rect x={ab.x} y={BAR_Y} width={BAR_W * ab.a} height={BAR_H} className={s.cell} />
                      <rect x={ab.x + BAR_W * ab.a} y={BAR_Y} width={BAR_W * ab.b} height={BAR_H} className={s.soft} />
                      {ab.fb > 0 && <rect x={ab.x + BAR_W * (1 - ab.fb)} y={BAR_Y} width={BAR_W * ab.fb} height={BAR_H} className={s.hatch} />}
                      {/* C–D split bar: C on the left, its fallback hatched next to C */}
                      <rect x={cd.x} y={BAR_Y} width={BAR_W * inner} height={BAR_H} className={s.soft} />
                      {fallback > 0 && <rect x={cd.x} y={BAR_Y} width={BAR_W * fallback} height={BAR_H} className={s.hatch} />}
                      <rect x={cd.x + BAR_W * inner} y={BAR_Y} width={BAR_W * outer} height={BAR_H} className={s.cell} />
                      <text x={318} y={STRIP_Y - 6} textAnchor="end" className={s.small}>
                        hatched = fallback
                      </text>
                    </g>
                  )}

                  {/* B's share by round */}
                  {[0.5, 0.75, 1].map((v) => (
                    <text key={v} x={33} y={stripY(v) + 4} textAnchor="end" className={s.small}>
                      {v.toFixed(2)}
                    </text>
                  ))}
                  <line x1={40} y1={STRIP_Y + STRIP_H} x2={310} y2={STRIP_Y + STRIP_H} stroke="var(--line)" />
                  <text x={40} y={STRIP_Y - 6} className={s.axis}>
                    B&apos;s share by round
                  </text>
                  {show && (
                    <polyline
                      points={ROUNDS.slice(0, maxSeen + 1)
                        .map((r, i) => `${stripX(i)},${stripY(r.inner)}`)
                        .join(" ")}
                      className={s.line}
                    />
                  )}
                  {show &&
                    ROUNDS.slice(0, maxSeen + 1).map((r, i) => (
                      <circle key={i} cx={stripX(i)} cy={stripY(r.inner)} r={i === round ? 5 : 2.5} className={i === round ? s.main : s.dot} />
                    ))}
                </svg>

                <Row>
                  <Control disabled={locked || round >= MAX_ROUND} onClick={() => go(round + 1)}>
                    Next round
                  </Control>
                  <Control disabled={locked || settled} onClick={() => go(Math.max(round, SETTLED_AT))}>
                    Run until settled
                  </Control>
                  <Control disabled={locked || round === 0} onClick={() => go(0)}>
                    Reset
                  </Control>
                </Row>
                <p className={s.msg}>
                  {maxSeen > 0 ? `B gets: ${ROUNDS.slice(0, maxSeen + 1).map((r) => r.inner.toFixed(3).slice(1)).join(" ")}` : ""}
                </p>
                <p className={s.msg}>
                  {maxSeen > 0 ? `B's fallback: ${ROUNDS.slice(0, maxSeen + 1).map((r) => r.fallback.toFixed(3).slice(1)).join(" ")}` : ""}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
