"use client";

// Two right angles never meet. A fixed base (one "base" = BASE px) with a square left corner and a
// vertical left side. The learner sets the right corner B (60° to 90°). The right side rises at B, so the
// two sides meet at height tan(B) bases, and the top corner is 90° − B. From about 66° the meeting point is
// off the top of the card (arrowheads; the readout says how far up); at 90° the sides are parallel and never meet.
// Milestones: "near" (B in 85..89°, the largest such B is recorded and left as a dashed trace) and
// "ninety" (B = 90°, a dashed vertical trace stays). QA path (DOM order): slider (60 → 62), "89°", "90°".
// Every number comes from meet(B).

import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const MIN = 60;
const MAX = 90;
const START = 60;
const NEAR_LO = 85;
const MILESTONES = ["near", "ninety"] as const;
const W = 320;
const H = 200;
const BASE = 80;
const BX0 = 120;
const BX1 = BX0 + BASE;
const BY = 186;
const TOP = 26;
const RX = W - 6; // readouts drawn in the picture, right-anchored so "57.3 bases up" stays inside at 390 px (v2, M3a)

const rad = (d: number) => (d * Math.PI) / 180;
/** Height in bases where the two sides meet; null when they are parallel (B = 90°). */
const meet = (b: number) => (b >= 90 ? null : Math.tan(rad(b)));
const fmtH = (h: number) => (h < 10 ? h.toFixed(2) : h < 100 ? h.toFixed(1) : String(Math.round(h)));

/** Right side from (BX1, BY) at interior angle b, clipped at the top of the picture. */
function rightSide(b: number) {
  const h = meet(b);
  const room = (BY - TOP) / BASE;
  if (h !== null && h <= room) return { x: BX0, y: BY - h * BASE, met: true };
  const dy = BY - TOP;
  const dx = b >= 90 ? 0 : dy / Math.tan(rad(b));
  return { x: BX1 - dx, y: TOP, met: false };
}

export default function TwoRightAnglesNeverMeet({ slug }: { slug: string }) {
  const [b, setB] = useState(START);
  const [near, setNear] = useState<number | null>(null);
  const [saw90, setSaw90] = useState(false);

  const nearH = near === null ? "" : fmtH(meet(near) as number);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "On a flat page, can a triangle have two right angles?",
        options: ["Yes, if it is tall enough", "Yes, if its base is short enough", "No, never"],
        answer: 2,
      }}
      exploreHint="Turn the right corner toward 90° and watch where the sides meet."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Assume a triangle had two right angles. Those two corners already use all 180°, leaving 0° for the third.
          </p>
          <p>
            You watched it happen: at {near}° the sides met {nearH} bases up with a {90 - (near ?? 0)}° tip.{" "}
            Setting 90° was that assumption, and the sides stood parallel and never met.
          </p>
          <p>
            The assumption leads to an impossible triangle, so it is false. That is proof by contradiction: assume it, follow
            it, hit a wall.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (v: number) => {
              const next = Math.min(MAX, Math.max(MIN, v));
              setB(next);
              if (next >= NEAR_LO && next < 90) {
                setNear((n) => (n === null ? next : Math.max(n, next)));
                reach("near");
              }
              if (next === 90) {
                setSaw90(true);
                reach("ninety");
              }
            };
            const side = rightSide(b);
            const h = meet(b);
            const ghost = near === null ? null : rightSide(near);
            const caption = locked
              ? "On a flat page. Make a prediction to start."
              : "Flat page. The left corner stays square. Turn the right one.";
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  {/* traces of milestones */}
                  {ghost && (
                    <>
                      <line x1={BX1} y1={BY} x2={ghost.x} y2={ghost.y} className={s.ghost} />
                      <text x={ghost.x - 4} y={TOP - 10} className={s.ghostLab} textAnchor="end">
                        {near}° → {nearH} up
                      </text>
                    </>
                  )}
                  {saw90 && (
                    <>
                      <line x1={BX1} y1={BY} x2={BX1} y2={TOP} className={s.ghost} />
                      <text x={BX1 + 6} y={TOP - 10} className={s.ghostLab}>
                        90° → never
                      </text>
                    </>
                  )}

                  {/* the triangle (or the two sides) */}
                  {side.met && <polygon points={`${BX0},${BY} ${BX1},${BY} ${side.x},${side.y}`} className={s.fill} />}
                  <line x1={BX0 - 30} y1={BY} x2={BX1 + 30} y2={BY} className={s.ground} />
                  <line x1={BX0} y1={BY} x2={BX1} y2={BY} className={s.base} />
                  <line x1={BX0} y1={BY} x2={BX0} y2={side.met ? side.y : TOP} className={s.side} />
                  <line x1={BX1} y1={BY} x2={side.x} y2={side.y} className={s.side} />

                  {/* square left corner */}
                  <path d={`M${BX0} ${BY - 12} h12 v12`} className={s.mark} />
                  <text x={BX0 - 6} y={BY - 4} className={s.lab} textAnchor="end">
                    90°
                  </text>
                  {/* right corner */}
                  {b < 90 ? (
                    <path
                      d={`M${BX1 - 16} ${BY} A16 16 0 0 1 ${BX1 - 16 * Math.cos(rad(b))} ${BY - 16 * Math.sin(rad(b))}`}
                      className={s.mark}
                    />
                  ) : (
                    <path d={`M${BX1 - 12} ${BY} v-12 h12`} className={s.mark} />
                  )}
                  <text x={BX1 + 6} y={BY - 4} className={s.labStrong}>
                    {b}°
                  </text>
                  <text x={(BX0 + BX1) / 2} y={BY + 12} className={s.small} textAnchor="middle">
                    1 base
                  </text>

                  {/* where the sides meet */}
                  {side.met ? (
                    <text x={side.x - 6} y={side.y + 4} className={s.lab} textAnchor="end">
                      {locked ? "top ?" : `top ${90 - b}°`}
                    </text>
                  ) : (
                    <>
                      <path d={`M${BX0 - 5} ${TOP + 7} L${BX0} ${TOP} L${BX0 + 5} ${TOP + 7}`} className={s.mark} />
                      <path d={`M${side.x - 5} ${TOP + 7} L${side.x} ${TOP} L${side.x + 5} ${TOP + 7}`} className={s.mark} />
                    </>
                  )}
                  {/* readouts, folded into the picture */}
                  <text x={RX} y={92} textAnchor="end" className={s.small}>
                    sides meet
                  </text>
                  <text x={RX} y={110} textAnchor="end" className={s.value}>
                    {locked ? "?" : h === null ? "never" : `${fmtH(h)} bases up`}
                  </text>
                  <text x={RX} y={136} textAnchor="end" className={s.small}>
                    top corner
                  </text>
                  <text x={RX} y={154} textAnchor="end" className={s.value}>
                    {locked ? "?" : `${90 - b}°`}
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Slider
                  label="Right corner"
                  value={b}
                  min={MIN}
                  max={MAX}
                  step={1}
                  disabled={locked}
                  format={(v) => `${v}°`}
                  onChange={go}
                />
                <Row>
                  <Control disabled={locked || b === 89} onClick={() => go(89)}>
                    Set 89°
                  </Control>
                  <Control disabled={locked || b === 90} onClick={() => go(90)}>
                    Set 90°
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
