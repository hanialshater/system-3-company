"use client";

// Beauty contest against a simulated crowd (brief 3, company/domains/briefs/behavioral.md; every number from
// node company/domains/briefs/checks/behavioral-beauty-contest-level-k.mjs). One 0-100 number line.
// The crowd: 100 simulated players, drawn in order with mulberry32 from seed 2: 30 uniform on 0-100, 40 on 30-36,
// 30 on 19-25 (sum 3,463). The learner is player 101: the average and the target (two thirds of it) include the
// learner's guess. The simulated players do not react to each other; nothing is re-rolled; there are no ticks.
// Controls in DOM order: guess slider (milestone guess), "Show the crowd" (draws the dots, marks the average and the
// target, locks the guess; milestone crowd; enabled once the guess has moved), toggle "Mark the 0 guess" (adds the
// 0 player's miss beside the learner's; milestone zero; enabled once the crowd is shown).
// The stage never derives 33 or 22 and shows no ceiling (E8 (3)); "one step" / "two steps" link to
// two-thirds-of-the-average. Picture labels are numerals only; the rule line's words "Target" and "average" are the
// key (same colour and line style as their markers). At the reveal the guess, target and 0 mark stay on the line.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32, randInt } from "@/kit/random";
import s from "./styles.module.css";

// The one held type (d) sentence (claim c6). It is unverified: if the fact-checker cannot open the source, set
// this to false (brief 3: cut, nothing replaces it; the lesson teaches fully without it).
const HELD_LINE = true;

const MILESTONES = ["guess", "crowd", "zero"] as const;

// ---------- The crowd (type c), exactly as the check script draws it ----------
const SEED = 2;
const RULE = [
  { share: 30, lo: 0, hi: 100 }, // "30% guess at random"
  { share: 40, lo: 30, hi: 36 }, // "40% near 33 (one step)"
  { share: 30, lo: 19, hi: 25 }, // "30% near 22 (two steps)"
];
const CROWD: number[] = (() => {
  const r = mulberry32(SEED);
  const g: number[] = [];
  for (const k of RULE) for (let i = 0; i < k.share; i++) g.push(randInt(r, k.lo, k.hi));
  return g;
})();
const N = CROWD.length; // 100
const SUM = CROWD.reduce((a, b) => a + b, 0); // 3,463

const avg = (g: number) => (SUM + g) / (N + 1);
const target = (g: number) => (2 / 3) * avg(g);
const miss = (g: number) => Math.abs(g - target(g));
const closer = (g: number) => CROWD.filter((c) => Math.abs(c - target(g)) < miss(g)).length;
const r1 = (x: number) => (Math.round(x * 10) / 10).toFixed(1);

// Stack position of each simulated guess in its column (dot plot).
const STACK: number[] = (() => {
  const seen: Record<number, number> = {};
  return CROWD.map((c) => {
    seen[c] = (seen[c] ?? 0) + 1;
    return seen[c] - 1;
  });
})();

// ---------- Reveal text, copied from the check script ----------
const LESSON =
  "Against a crowd that stops after one or two steps, the winning guess sits near two thirds of the crowd's actual average, not at 0.";
const HELD = "In one online sample of 250 real players, first guesses averaged 36.4, far above 0.";
const STOPS = "Where it stops: a simulated crowd with a stated rule, not real players.";
const closerText = (k: number) =>
  k === 0 ? "no simulated guess was closer" : k === 1 ? "1 simulated guess was closer" : `${k} simulated guesses were closer`;
const lead = (g: number) => `With your ${g} in, this simulated crowd averaged ${r1(avg(g))}, so the target was ${r1(target(g))}.`;
const you = (g: number) =>
  g === 0
    ? `0 is the equilibrium guess, and it missed by ${r1(miss(0))}; ${closerText(closer(0))}.`
    : `Your guess missed by ${r1(miss(g))}; ${closerText(closer(g))}. Had you guessed 0, the equilibrium, you would have missed by ${r1(miss(0))}.`;

// ---------- Geometry (viewBox 320 x 124) ----------
const X0 = 14;
const X1 = 306;
const px = (v: number) => X0 + (v / 100) * (X1 - X0);
const AXIS_Y = 62;
const DOT_R = 1.35;
const DOT_PITCH = 3.1;
const MARK_TOP = 14;
const GUESS_Y = 64; // tip of the learner's triangle
const MY_BRACKET_Y = 92;
const ZERO_BRACKET_Y = 110;

const LINK = "/d/two-thirds-of-the-average";

export default function ZeroLosesToThisCrowd({ slug }: { slug: string }) {
  const [guess, setGuess] = useState(50);
  const [moved, setMoved] = useState(false);
  const [shown, setShown] = useState(false);
  const [zeroOn, setZeroOn] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Against this simulated crowd, which guess lands closest to two thirds of the average, your guess included?",
        options: ["0, the equilibrium guess", "About 23", "About 35, the crowd's average"],
        answer: 1,
      }}
      exploreHint="Set your guess, show the crowd, then mark the 0 guess."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const g = guess;
        return (
          <>
            <p>
              {lead(g)} {you(g)}
            </p>
            <p>
              {LESSON}
              {HELD_LINE ? ` ${HELD}` : ""}
            </p>
            <p className="muted">{STOPS}</p>
          </>
        );
      }}
    >
      {({ locked, phase, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const frozen = locked || phase === "reveal";
            const t = target(guess);
            const a = avg(guess);
            const showZero = shown && (zeroOn || phase === "reveal");
            const xg = px(guess);
            const xt = px(t);
            const xa = px(a);
            const tri = (x: number, y: number, hollow: boolean, key: string) => (
              <path
                key={key}
                d={`M${x} ${y} L${x - 4.5} ${y + 8} L${x + 4.5} ${y + 8} Z`}
                className={hollow ? s.zeroMark : s.guessMark}
              />
            );
            const bracket = (from: number, to: number, y: number, cls: string, label: string) => {
              const lo = Math.min(from, to);
              const hi = Math.max(from, to);
              const mid = Math.min(Math.max((lo + hi) / 2, X0 + 10), X1 - 10);
              return (
                <g>
                  <path d={`M${lo} ${y - 4} V${y} H${hi} V${y - 4}`} className={cls} />
                  <text x={mid} y={y + 11} textAnchor="middle" className={s.missLabel}>
                    {label}
                  </text>
                </g>
              );
            };
            return (
              <div className={s.wrap}>
                <p className={s.rule}>
                  Simulated crowd, seed {SEED}: 30% guess at random, 40% near 33 (
                  <a href={LINK} target="_blank" rel="noopener" className={s.link}>
                    one step
                  </a>
                  ), 30% near 22 (
                  <a href={LINK} target="_blank" rel="noopener" className={s.link}>
                    two steps
                  </a>
                  ). <span className={s.keyTarget}>Target</span>: two thirds of everyone&apos;s{" "}
                  <span className={s.keyAvg}>average</span>.
                </p>
                <svg
                  viewBox="0 0 320 124"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    shown
                      ? `Number line 0 to 100 with 100 simulated guesses. With your guess of ${guess} included, the average is ${r1(a)} and the target is ${r1(t)}.`
                      : `Number line 0 to 100. Your guess: ${guess}.`
                  }
                >
                  {/* the crowd: one dot per simulated guess, stacked by value */}
                  {shown &&
                    CROWD.map((c, i) => (
                      <circle
                        key={i}
                        cx={px(c)}
                        cy={AXIS_Y - 3 - STACK[i] * DOT_PITCH}
                        r={DOT_R}
                        className={s.dot}
                      />
                    ))}
                  {/* average (dashed) and target (solid), both with the learner's guess included */}
                  {shown && (
                    <g>
                      <line x1={xa} y1={MARK_TOP} x2={xa} y2={AXIS_Y} className={s.avgLine} />
                      <text x={xa + 3} y={MARK_TOP - 2} textAnchor="start" className={s.avgLabel}>
                        {r1(a)}
                      </text>
                      <line x1={xt} y1={MARK_TOP} x2={xt} y2={AXIS_Y} className={s.targetLine} />
                      <text x={xt - 3} y={MARK_TOP - 2} textAnchor="end" className={s.targetLabel}>
                        {r1(t)}
                      </text>
                    </g>
                  )}
                  {/* the number line */}
                  <line x1={X0} y1={AXIS_Y} x2={X1} y2={AXIS_Y} className={s.axis} />
                  <line x1={X0} y1={AXIS_Y - 3} x2={X0} y2={AXIS_Y + 3} className={s.axis} />
                  <line x1={X1} y1={AXIS_Y - 3} x2={X1} y2={AXIS_Y + 3} className={s.axis} />
                  <text x={X0} y={AXIS_Y + 22} textAnchor="middle" className={s.tick} aria-hidden="true">
                    {showZero || guess < 8 ? "" : "0"}
                  </text>
                  <text x={X1} y={AXIS_Y + 22} textAnchor="middle" className={s.tick} aria-hidden="true">
                    {guess > 92 ? "" : "100"}
                  </text>
                  {/* the 0 player (hollow) and the learner (filled), each with its miss to the target */}
                  {showZero && (
                    <g>
                      {tri(px(0), GUESS_Y, true, "zero")}
                      <text x={px(0)} y={GUESS_Y + 20} textAnchor="middle" className={s.zeroLabel}>
                        0
                      </text>
                      {bracket(px(0), xt, ZERO_BRACKET_Y, s.zeroBracket, r1(miss(0)))}
                    </g>
                  )}
                  {!locked && (
                    <g>
                      {tri(xg, GUESS_Y, false, "guess")}
                      <text x={xg} y={GUESS_Y + 20} textAnchor="middle" className={s.guessLabel}>
                        {guess}
                      </text>
                      {shown && bracket(xg, xt, MY_BRACKET_Y, s.myBracket, r1(miss(guess)))}
                    </g>
                  )}
                </svg>
                <Slider
                  label="Guess"
                  value={guess}
                  min={0}
                  max={100}
                  step={1}
                  disabled={frozen || shown}
                  onChange={(v) => {
                    setGuess(v);
                    setMoved(true);
                    reach("guess");
                  }}
                />
                <Row>
                  <Control
                    className={`${s.btn} ${shown ? "active" : ""}`}
                    disabled={frozen || shown || !moved}
                    aria-pressed={shown}
                    onClick={() => {
                      setShown(true);
                      reach("crowd");
                    }}
                  >
                    Show the crowd
                  </Control>
                  <Control
                    className={`${s.btn} ${zeroOn ? "active" : ""}`}
                    disabled={frozen || !shown}
                    aria-pressed={zeroOn}
                    onClick={() => {
                      setZeroOn(!zeroOn);
                      reach("zero");
                    }}
                  >
                    Mark the 0 guess
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
