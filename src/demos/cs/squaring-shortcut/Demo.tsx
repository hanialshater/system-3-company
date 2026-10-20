"use client";

// Powers of 3 on an exponent line 1..16 (3^k means k threes multiplied together). Two ways to climb
// from 3 to 3^16, drawn on the same line: square what you have (the exponent doubles: 1, 2, 4, 8, 16,
// arcs above the line) or multiply by 3 each time (the exponent goes up by 1, arcs below). Squaring
// needs 4 multiplications, one at a time needs 15. Each arc is one multiplication and stays drawn.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const GOAL = 16;
const SQ_STEPS = Math.log2(GOAL); // 4
const ONE_STEPS = GOAL - 1; // 15
const sqChain = (k: number) => Array.from({ length: k + 1 }, (_, i) => 2 ** i); // exponents held
const fmt = (n: number) => n.toLocaleString("en-US");

// geometry
const X0 = 14;
const DX = 19.4;
const ex = (e: number) => X0 + (e - 1) * DX;
const LY = 92;

export default function SquaringShortcut({ slug }: { slug: string }) {
  const [sq, setSq] = useState(0); // squarings done
  const [one, setOne] = useState(0); // x3 steps done

  const sqTop = 2 ** sq;
  const oneTop = 1 + one;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your calculator starts with just 3, and you may multiply any two numbers you already have. What is the fewest multiplications that reach 3^${GOAL} (${GOAL} threes multiplied together)?`,
        options: [String(SQ_STEPS), String(GOAL / 2), String(ONE_STEPS)],
        answer: 0,
      }}
      exploreHint="Square what you have until 3^16. Then try climbing by ×3 instead."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Squaring took you through 3^{sqChain(SQ_STEPS).slice(1).join(", 3^")}: <strong>{SQ_STEPS} multiplications</strong>.
            {one === ONE_STEPS ? ` Multiplying by 3 each time took ${ONE_STEPS}.` : ""} Each squaring doubles the
            exponent, and no step can do more than double it, so 3 steps reach at most 3^{2 ** (SQ_STEPS - 1)}.
          </p>
          <p>
            To reach 3^n this way takes about as many squarings as times you can halve n, plus a few extra multiplies when n is not a power of
            2. For a power in the millions that is a few dozen steps instead of millions.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["squared-to-goal", "climbed-by-three"]}>
          {(reach) => {
            const square = (to: number) => {
              if (locked || sq >= SQ_STEPS) return;
              setSq(to);
              if (to === SQ_STEPS) reach("squared-to-goal");
            };
            const times3 = (to: number) => {
              if (locked || one >= ONE_STEPS) return;
              setOne(to);
              if (to === ONE_STEPS) reach("climbed-by-three");
            };
            const msg = locked
              ? `3^k means k threes multiplied together.`
              : sq === SQ_STEPS && one === ONE_STEPS
                ? `Both at 3^${GOAL}: ${SQ_STEPS} steps versus ${ONE_STEPS}.`
                : sq > 0
                  ? `3^${sqTop / 2} × 3^${sqTop / 2} = 3^${sqTop} = ${fmt(3 ** sqTop)}`
                  : `3^k means k threes multiplied together.`;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img"
                  aria-label={`Exponent line 1 to ${GOAL}. Squaring reached 3^${sqTop} in ${sq} steps; times 3 reached 3^${oneTop} in ${one} steps.`}>
                  <line x1={ex(1)} y1={LY} x2={ex(GOAL)} y2={LY} className={s.axis} />
                  {Array.from({ length: GOAL }, (_, i) => i + 1).map((e) => (
                    <g key={e}>
                      <line x1={ex(e)} y1={LY - 4} x2={ex(e)} y2={LY + 4} className={s.tick} />
                      <text x={ex(e)} y={LY + 18} className={`${s.num} ${e === GOAL ? s.goal : ""}`}>{e}</text>
                    </g>
                  ))}
                  {/* squaring arcs above */}
                  {sqChain(sq).slice(1).map((e, i) => {
                    const a = ex(e / 2);
                    const b = ex(e);
                    const h = Math.min(70, 14 + (b - a) * 0.45);
                    return (
                      <g key={`s${e}`}>
                        <path d={`M ${a} ${LY - 6} Q ${(a + b) / 2} ${LY - 6 - 2 * h} ${b} ${LY - 6}`} className={s.sqArc} />
                        <text x={(a + b) / 2} y={LY - 8 - h} className={s.stepNum}>{i + 1}</text>
                      </g>
                    );
                  })}
                  {sqChain(sq).map((e) => (
                    <circle key={`h${e}`} cx={ex(e)} cy={LY - 6} r={4.5} className={s.sqDot} />
                  ))}
                  {/* x3 arcs below */}
                  {Array.from({ length: one }, (_, i) => i + 1).map((e) => (
                    <path key={`o${e}`} d={`M ${ex(e)} ${LY + 26} Q ${(ex(e) + ex(e + 1)) / 2} ${LY + 44} ${ex(e + 1)} ${LY + 26}`} className={s.oneArc} />
                  ))}
                  {!locked && <circle cx={ex(oneTop)} cy={LY + 26} r={4.5} className={s.oneDot} />}
                  <text x={4} y={LY + 64} className={s.lane}>×3 steps below the line</text>
                </svg>
                <Row>
                  <Readout label="Squarings" value={locked ? "–" : `${sq} · at 3^${sqTop}`} />
                  <Readout label="×3 steps" value={locked ? "–" : `${one} · at 3^${oneTop}`} />
                </Row>
                <Row>
                  <Control disabled={locked || sq >= SQ_STEPS} onClick={() => square(sq + 1)}>Square it</Control>
                  <Control disabled={locked || sq >= SQ_STEPS} onClick={() => square(SQ_STEPS)}>Square to 3^{GOAL}</Control>
                  <Control disabled={locked || one >= ONE_STEPS} onClick={() => times3(one + 1)}>×3 once</Control>
                  <Control disabled={locked || one >= ONE_STEPS} onClick={() => times3(ONE_STEPS)}>×3 to 3^{GOAL}</Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
