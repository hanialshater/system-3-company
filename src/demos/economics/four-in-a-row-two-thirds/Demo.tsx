"use client";

// Balanced outcomes on a 4-path A–B–C–D, deals A–B and C–D, each worth $1.
// One picture: the line of four, a split bar under each deal (the fallback part hatched), and a
// strip of B's share by round. Each round every pair covers both fallbacks, then halves the rest;
// B's fallback is what C would leave B (1 − C's share), and vice versa.
// Round 0: no fallbacks yet, so each pair halves $1. Then 0.75, 0.625, 0.6875 … → 2/3.
// Key state: settled (B within $0.001 of 2/3). Model, not a forecast of any real bargain.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const MAX_ROUND = 14;
const TOL = 0.001;

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
const SETTLED_AT = ROUNDS.findIndex((r) => Math.abs(r.inner - 2 / 3) < TOL); // 9
const MILESTONES = ["stepped", "settled"] as const;

const usd = (v: number) => `$${v.toFixed(3)}`;

// Geometry (viewBox 320 × 230).
const NODE_X = [40, 120, 200, 280];
const NODE_Y = 52;
const BAR_Y = 96;
const BAR_H = 22;
const BAR_W = 120; // $1
const STRIP_Y = 160;
const STRIP_H = 50; // share 0.5 at bottom, 1.0 at top

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
        question: "A–B–C–D in a line; pairs A–B and C–D each split $1. Each pair splits fairly given outside options. What does B get?",
        options: ["$0.50", "About $0.67", "Nearly $1"],
        answer: 1,
      }}
      exploreHint="Step round by round, then run until the split stops moving."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You saw B&apos;s share swing: {usd(ROUNDS[1].inner)}, then {usd(ROUNDS[2].inner)}, then {usd(ROUNDS[3].inner)}, closing in until it
            settled at <strong>$0.667</strong> (two thirds) by round {SETTLED_AT}. A kept $0.333.
          </p>
          <p>
            B&apos;s fallback is a deal with C, worth whatever C would leave B. But C&apos;s fallback is B, so C is never desperate. Each inner
            person&apos;s outside option feeds the other&apos;s, and the split stops where B&apos;s share = 1 − half of C&apos;s: two thirds.
          </p>
          <p>
            In a line of three, the centre&apos;s partners have no other deal, so the centre can take nearly all. Power depends on the whole
            network, not on counting partners.
          </p>
          <p className="muted">A model: the &ldquo;balanced outcome&rdquo; rule, not a forecast of any real negotiation.</p>
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
            const stripX = (r: number) => 30 + (r / MAX_ROUND) * 270;
            const stripY = (v: number) => STRIP_Y + STRIP_H - ((v - 0.5) / 0.5) * STRIP_H;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: each pair covers both fallbacks, then halves the rest</p>
                <svg viewBox="0 0 320 230" className="stage-svg" role="img" aria-label="Line of four people with split bars and B's share by round">
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
                      <text x={ab.x} y={BAR_Y + BAR_H + 13} className={s.axis}>
                        A
                      </text>
                      <text x={ab.x + BAR_W} y={BAR_Y + BAR_H + 13} textAnchor="end" className={s.axis}>
                        B
                      </text>
                      {/* C–D split bar: C on the left, its fallback hatched next to C */}
                      <rect x={cd.x} y={BAR_Y} width={BAR_W * inner} height={BAR_H} className={s.soft} />
                      {fallback > 0 && <rect x={cd.x} y={BAR_Y} width={BAR_W * fallback} height={BAR_H} className={s.hatch} />}
                      <rect x={cd.x + BAR_W * inner} y={BAR_Y} width={BAR_W * outer} height={BAR_H} className={s.cell} />
                      <text x={cd.x} y={BAR_Y + BAR_H + 13} className={s.axis}>
                        C
                      </text>
                      <text x={cd.x + BAR_W} y={BAR_Y + BAR_H + 13} textAnchor="end" className={s.axis}>
                        D
                      </text>
                      <text x={160} y={BAR_Y + BAR_H + 13} textAnchor="middle" className={s.small}>
                        hatched = fallback
                      </text>
                    </g>
                  )}

                  {/* B's share by round */}
                  <line x1={30} y1={stripY(2 / 3)} x2={300} y2={stripY(2 / 3)} className={s.ghost} />
                  <text x={302} y={stripY(2 / 3) + 4} className={s.small}>
                    ⅔
                  </text>
                  <line x1={30} y1={STRIP_Y + STRIP_H} x2={300} y2={STRIP_Y + STRIP_H} stroke="var(--line)" />
                  <text x={30} y={STRIP_Y - 6} className={s.axis}>
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
                <Row>
                  <Readout label="Round" value={locked ? "?" : round} />
                  <Readout label="B's fallback" value={locked ? "?" : usd(fallback)} />
                  <Readout label="B gets" value={locked ? "?" : usd(inner)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
