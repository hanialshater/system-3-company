"use client";

// Simpson's paradox as a mosaic: each treatment is a bar 350 patients wide, split into
// small and large stones; width = how many patients, fill height = share cured.
// The payoff: the overall rate is a width-weighted average, so whoever got the hard
// (large-stone) cases looks worse overall even while winning inside both groups.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { EVEN_K, REAL_K, TOTAL_LARGE, arms, flipK, overall, type Arm } from "./model";
import s from "./styles.module.css";

// Key state: groups combined AND A's overall rate above B's, reached by changing only who got the hard cases.
const MILESTONES = ["combined", "a-ahead-overall"] as const;

const X0 = 34;
const BAR_H = 70;
const pct = (v: number) => `${Math.round(v * 100)}%`;
const pct1 = (v: number) => `${(v * 100).toFixed(1)}%`;

function Bar({ arm, y, name, combined }: { arm: Arm; y: number; name: string; combined: boolean }) {
  const top = y + 16;
  const fill = (w: number, rate: number, x: number, cls: string, key: string) =>
    w > 0 ? (
      <g key={key}>
        <rect x={x} y={top} width={w} height={BAR_H} className={s.fail} />
        <rect x={x} y={top + BAR_H * (1 - rate)} width={w} height={BAR_H * rate} className={cls} />
      </g>
    ) : null;
  const sRate = arm.small ? arm.smallWins / arm.small : 0;
  const lRate = arm.large ? arm.largeWins / arm.large : 0;
  const all = overall(arm);
  return (
    <g>
      <text x={4} y={top + BAR_H / 2 + 6} className={s.name}>
        {name}
      </text>
      <g className={combined ? s.faded : ""}>
        {fill(arm.small, sRate, X0, s.curedSmall, "s")}
        {fill(arm.large, lRate, X0 + arm.small, s.curedLarge, "l")}
        <line x1={X0 + arm.small} x2={X0 + arm.small} y1={top - 2} y2={top + BAR_H + 2} className={s.divider} />
      </g>
      {combined ? (
        <>
          <line x1={X0} x2={X0 + 350} y1={top + BAR_H * (1 - all)} y2={top + BAR_H * (1 - all)} className={s.level} />
          <text x={X0 + 175} y={y + 11} textAnchor="middle" className={s.seg}>
            all {arm.small + arm.large} patients: {pct(all)}
          </text>
        </>
      ) : (
        <>
          {arm.small >= 44 && (
            <text x={X0 + arm.small / 2} y={y + 11} textAnchor="middle" className={s.seg}>
              small {pct(sRate)}
            </text>
          )}
          {arm.large >= 44 && (
            <text x={X0 + arm.small + arm.large / 2} y={y + 11} textAnchor="middle" className={s.seg}>
              large {pct(lRate)}
            </text>
          )}
        </>
      )}
    </g>
  );
}

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [k, setK] = useState(REAL_K);
  const [combined, setCombined] = useState(false);
  const { A, B } = arms(k);
  const check = (kk: number, comb: boolean) => {
    const x = arms(kk);
    if (comb && overall(x.A) > overall(x.B)) reach("a-ahead-overall");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 390 210" className={`stage-svg ${s.svg}`} role="img" aria-label="Two bars of 350 patients each, split by stone size, filled by the share cured">
        <Bar arm={A} y={0} name="A" combined={combined} />
        <Bar arm={B} y={106} name="B" combined={combined} />
      </svg>
      <p className={s.key}>
        Width: patients. Filled height: cured. A gets {k} of the {TOTAL_LARGE} large-stone patients, B gets{" "}
        {TOTAL_LARGE - k}.
      </p>
      <Row>
        <Control
          className={combined ? "active" : ""}
          disabled={locked}
          onClick={() => {
            const c = !combined;
            setCombined(c);
            reach("combined");
            check(k, c);
          }}
        >
          {combined ? "Split by stone size" : "Combine groups"}
        </Control>
        <Control
          disabled={locked || k === EVEN_K}
          onClick={() => {
            setK(EVEN_K);
            check(EVEN_K, combined);
          }}
        >
          Share hard cases evenly
        </Control>
      </Row>
      <Row>
        <Readout label="A overall" value={locked ? "?" : pct1(overall(A))} />
        <Readout label="B overall" value={locked ? "?" : pct1(overall(B))} />
      </Row>
      <Row>
        <Slider
          label="Large-stone patients given A"
          value={k}
          min={0}
          max={TOTAL_LARGE}
          disabled={locked}
          format={(v) => `${v} of ${TOTAL_LARGE}`}
          onChange={(v) => {
            setK(v);
            check(v, combined);
          }}
        />
      </Row>
    </div>
  );
}

export default function SimpsonsStones({ slug }: { slug: string }) {
  const flip = flipK();

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Kidney stones: treatment A beats B for small stones (93% vs 87% cured) and for large stones (73% vs 69%). Overall, which cures a higher share?",
        options: ["A", "B", "They tie"],
        answer: 1,
      }}
      exploreHint="Combine the groups, then share the hard cases evenly."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In the real data <strong>B</strong> cured {pct1(289 / 350)} overall and A {pct1(273 / 350)}, though A won
            inside both groups. Look at the widths: {REAL_K} of A&rsquo;s 350 patients had large stones, the hard cases;
            B got mostly easy small ones.
          </p>
          <p>
            An overall rate is a <em>weighted</em> average of the group rates: a bigger group counts for more. Give A{" "}
            {flip} or fewer of the {TOTAL_LARGE} hard cases and A comes out ahead overall, with no change to how well
            either treatment works.
          </p>
          <p className="muted">
            Real data (1986): A was open surgery, B keyhole surgery. Which is better in practice is a medical question;
            this lesson is about the arithmetic.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
