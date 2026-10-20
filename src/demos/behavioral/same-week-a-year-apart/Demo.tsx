"use client";

// Present bias (brief 2, company/domains/briefs/behavioral.md; design note
// company/reviews/same-week-a-year-apart/design.md). One timeline, today to week 53. The pair is two coins,
// $100 at week t and $110 at week t + 1, drawn as a fixed-size callout with a "1 week, +$10" gap bracket
// (the same at every stop) and two leader lines down to weeks t and t + 1 on the axis.
// Controls in DOM order: far choice ($100 at week 52 | $110 at week 53; milestone far, enabled at week 52),
// the start slider (three stops, 52, 13, 0; the value is closeness, so ArrowRight moves the pair toward today
// and two presses land on today; milestone slide at today; enabled after the far choice), near choice
// ($100 today | $110 in a week; milestone near, enabled only at today).
// Under steady (exponential) discounting the later/sooner value ratio is 1.1·d at every start date, so the
// choice is the same at every stop (node company/domains/briefs/checks/behavioral-present-bias-reversal.mjs).
// The strip under the timeline shows the steady-model answer implied by the far choice; it never changes as
// the pair moves. No rate, factor or present value is drawn (E4). Both choices stay marked under the axis.
// At the reveal the controls freeze. No randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Pick = "take" | "wait";

// The one held type (d) sentence L (claim c6), in every branch. It is unverified: if the fact-checker cannot
// open the source, set this to false (ruling 4: L is cut, nothing replaces it, the lesson still names present bias).
const HELD_LINE = false; // W-1244, rule 6: cut until the fact-checker opens a source for it

const MILESTONES = ["far", "slide", "near"] as const;
const STOPS = [52, 13, 0]; // index = closeness; ArrowRight moves toward today
const END = 53;

// Geometry (viewBox 320 x 106).
const X0 = 22;
const X1 = 302;
const AXIS_Y = 84;
const px = (w: number) => X0 + (w / END) * (X1 - X0);
const GLYPH_HALF = 70;
const COIN_DX = 44;
const COIN_Y = 44;
const R = 17;

const weekLabel = (t: number) => (t === 0 ? "today" : `week ${t}`);

// Reveal branches, copied from the check script (all four print there in full).
const G = "Steady discounting judges the pair only by its gap, one week for $10 more, and the gap never changed as the pair moved to today.";
const L = "With real payments, reversals are clearer for effort than for money.";
const S = "Where it stops: imagined money, chosen once each, with your first choice in view.";
const OPEN: Record<string, string> = {
  "wait-wait": "Both a year out and today you waited a week for the $110.",
  "wait-take": "A year out you waited a week for the $110; today you took the $100.",
  "take-wait": "A year out you took the $100; today you waited a week for the $110.",
  "take-take": "Both a year out and today you took the $100.",
};
const SAME =
  "One steady rate fits both of your choices. Waiting, then taking the $100 today, would fit only a model that gives today extra weight, called present bias.";
const VERDICT: Record<string, string> = {
  "wait-wait": SAME,
  "take-take": SAME,
  "wait-take":
    "No steady discount rate fits both of your choices. A model that gives today extra weight does: that departure is called present bias.",
  "take-wait":
    "No steady discount rate fits both of your choices. Yours switched toward patience as the date came closer, the reverse of present bias.",
};

export default function SameWeekAYearApart({ slug }: { slug: string }) {
  const [far, setFar] = useState<Pick | null>(null);
  const [near, setNear] = useState<Pick | null>(null);
  const [stop, setStop] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Planning a year ahead, a steady discounter picks $110 at week 53 over $100 at week 52. Today the same person is offered $100 now or $110 in a week. What must they choose?",
        options: ["Wait a week again for the $110", "Take the $100, since today weighs more", "Either, depending on their discount rate"],
        answer: 0,
      }}
      exploreHint="Choose at week 52, slide the pair to today, then choose again."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const key = `${far ?? "wait"}-${near ?? "wait"}`;
        return (
          <>
            <p>
              {OPEN[key]} {G}
            </p>
            <p>
              {VERDICT[key]}
              {HELD_LINE ? ` ${L}` : ""}
            </p>
            <p className="muted">{S}</p>
          </>
        );
      }}
    >
      {({ locked, phase, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const frozen = locked || phase === "reveal";
            const t = STOPS[stop];
            const atFar = stop === 0;
            const atToday = t === 0;
            const shown = atFar ? far : atToday ? near : null; // the choice made at this stop, if any
            const mid = Math.min(Math.max((px(t) + px(t + 1)) / 2, X0 + GLYPH_HALF - 6), X1 - GLYPH_HALF + 6);
            const cA = mid - COIN_DX;
            const cB = mid + COIN_DX;
            const farLabel = ["$100 at week 52", "$110 at week 53"];
            const nearLabel = ["$100 today", "$110 in a week"];
            const choose = (which: "far" | "near", v: Pick) => {
              if (which === "far") {
                setFar(v);
                reach("far");
              } else {
                setNear(v);
                reach("near");
              }
            };
            const coin = (cx: number, amount: string, picked: boolean) => (
              <g>
                <circle cx={cx} cy={COIN_Y} r={R} className={picked ? s.coinPicked : s.coin} />
                <text x={cx} y={COIN_Y + 4} textAnchor="middle" className={s.amount}>
                  {amount}
                </text>
                {picked && (
                  <text x={cx + R - 2} y={COIN_Y - R + 4} textAnchor="middle" className={s.check} aria-hidden="true">
                    ✓
                  </text>
                )}
              </g>
            );
            return (
              <div className={s.wrap}>
                <p className={s.caption}>A simple model: each week counts the same</p>
                <svg
                  viewBox="0 0 320 106"
                  className="stage-svg"
                  role="img"
                  aria-label={`Timeline from today to week ${END}. ${
                    t === 0 ? "The pair: $100 today, $110 in a week." : `The pair: $100 at week ${t}, $110 one week later.`
                  }`}
                >
                  {/* gap bracket: drawn the same at every stop */}
                  <path
                    d={`M${cA} ${COIN_Y - R - 4} V${COIN_Y - R - 10} H${cB} V${COIN_Y - R - 4}`}
                    className={s.bracket}
                  />
                  <text x={mid} y={COIN_Y - R - 14} textAnchor="middle" className={s.gap}>
                    1 week, +$10
                  </text>
                  {/* leader lines to weeks t and t + 1 */}
                  <line x1={cA} y1={COIN_Y + R} x2={px(t)} y2={AXIS_Y} className={s.leader} />
                  <line x1={cB} y1={COIN_Y + R} x2={px(t + 1)} y2={AXIS_Y} className={s.leader} />
                  {coin(cA, "$100", shown === "take")}
                  {coin(cB, "$110", shown === "wait")}
                  {/* timeline */}
                  <line x1={X0} y1={AXIS_Y} x2={X1} y2={AXIS_Y} className={s.axis} />
                  {STOPS.map((w) => (
                    <line key={w} x1={px(w)} y1={AXIS_Y - 4} x2={px(w)} y2={AXIS_Y + 4} className={s.axis} />
                  ))}
                  <circle cx={px(t)} cy={AXIS_Y} r={3.5} className={s.dot} />
                  <circle cx={px(t + 1)} cy={AXIS_Y} r={3.5} className={s.dot} />
                  {/* tick labels (week 13 is named by the slider readout); the learner's two choices stay marked beside them */}
                  <text x={px(0)} y={AXIS_Y + 16} textAnchor="start" className={s.tick}>
                    today
                    {near && <tspan className={s.mark}> ✓ {near === "take" ? "$100" : "$110"}</tspan>}
                  </text>
                  <text x={px(52) + 6} y={AXIS_Y + 16} textAnchor="end" className={s.tick}>
                    {far && <tspan className={s.mark}>✓ {far === "take" ? "$100" : "$110"} </tspan>}
                    week 52
                  </text>
                </svg>
                <p className={s.strip} aria-live="polite">
                  {far ? `Steady model: ${far === "wait" ? "wait" : "take $100"}` : " "}
                </p>
                <Row>
                  {(["take", "wait"] as Pick[]).map((v, i) => (
                    <Control
                      key={v}
                      className={`${s.choice} ${far === v ? "active" : ""}`}
                      disabled={frozen || !atFar}
                      aria-pressed={far === v}
                      onClick={() => choose("far", v)}
                    >
                      {farLabel[i]}
                    </Control>
                  ))}
                </Row>
                <Slider
                  label="Pair starts"
                  value={stop}
                  min={0}
                  max={STOPS.length - 1}
                  step={1}
                  format={(i) => weekLabel(STOPS[i])}
                  disabled={frozen || far === null}
                  onChange={(i) => {
                    setStop(i);
                    if (STOPS[i] === 0) reach("slide");
                  }}
                />
                <Row>
                  {(["take", "wait"] as Pick[]).map((v, i) => (
                    <Control
                      key={v}
                      className={`${s.choice} ${near === v ? "active" : ""}`}
                      disabled={frozen || !atToday}
                      aria-pressed={near === v}
                      onClick={() => choose("near", v)}
                    >
                      {nearLabel[i]}
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
