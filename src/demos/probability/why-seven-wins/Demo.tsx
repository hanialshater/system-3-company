"use client";

// Dice sums. The learner builds the distribution: each button drops the six pairs that share
// a first die (1+1 ... 1+6) into their total columns. Each drop is a row of six shifted one
// column right, so stacking all six builds the triangle with 7 tallest. Then 1,000 rolls overlay it.
// Key state: all 36 pairs placed, then the 1,000 rolls.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { PAIRS, TOTALS, rolls, ways } from "./model";
import s from "./styles.module.css";

const ROLLS = rolls();
const N_ROLLS = 1000;
const MILESTONES = ["all-36", "rolled"] as const;
const RATIO = ways(7) / ways(3); // 3

const W = 340;
const L = 6;
const CW = (W - 2 * L) / TOTALS.length;
const TH = 20;
const BASE = 168;
const cx = (t: number) => L + (t - 2) * CW;

function Stage({ locked, interact, drop, setDrop, rolled, setRolled }: {
  locked: boolean;
  interact: () => void;
  drop: boolean[];
  setDrop: (d: boolean[]) => void;
  rolled: boolean;
  setRolled: (r: boolean) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const placed = PAIRS.filter(([a]) => drop[a - 1]);
  const height: Record<number, number> = {};
  for (const t of TOTALS) height[t] = 0;
  const tiles = placed.map(([a, b]) => ({ a, b, t: a + b, level: height[a + b]++ }));
  const n = placed.length;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} 190`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${n} of 36 pairs placed`}>
        {TOTALS.map((t) => (
          <g key={t}>
            <line x1={cx(t) + 1} x2={cx(t) + CW - 1} y1={BASE} y2={BASE} className={s.base} />
            <text x={cx(t) + CW / 2} y={BASE + 15} textAnchor="middle" className={t === 7 || t === 3 ? s.totalKey : s.total}>
              {t}
            </text>
          </g>
        ))}
        {rolled &&
          TOTALS.map((t) => {
            const h = (ROLLS[t] / N_ROLLS) * 36 * TH;
            return <line key={`r${t}`} x1={cx(t) + 1} x2={cx(t) + CW - 1} y1={BASE - h} y2={BASE - h} className={s.roll} />;
          })}
        {tiles.map(({ a, b, t, level }) => (
          <g key={`${a}-${b}`}>
            <rect x={cx(t) + 1.5} y={BASE - (level + 1) * TH} width={CW - 3} height={TH - 2} rx={3} className={s[`d${a}`]} />
            <text x={cx(t) + CW / 2} y={BASE - level * TH - 6} textAnchor="middle" className={a >= 5 ? s.tileTextLight : s.tileText}>
              {a}+{b}
            </text>
          </g>
        ))}
        {rolled && (
          <text x={W - L} y={12} textAnchor="end" className={s.legend}>
            line: {N_ROLLS.toLocaleString("en-US")} real rolls, scaled to 36
          </text>
        )}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked ? "Make a prediction to start." : n < 36 ? "Drop each first die's six pairs." : "All 36 pairs placed."}
      </p>
      <Row>
        {[1, 2, 3, 4, 5, 6].map((a) => (
          <Control
            key={a}
            className={drop[a - 1] ? "active" : ""}
            aria-pressed={drop[a - 1]}
            aria-label={`Drop the pairs ${a}+1 to ${a}+6`}
            disabled={locked || drop[a - 1]}
            onClick={() => {
              const next = drop.map((d, i) => d || i === a - 1);
              setDrop(next);
              if (next.every(Boolean)) {
                reach("all-36");
                if (rolled) reach("rolled");
              }
            }}
          >
            {a}+?
          </Control>
        ))}
        <Control
          disabled={locked || rolled}
          onClick={() => {
            setRolled(true);
            if (n === 36) reach("rolled");
          }}
        >
          Roll {N_ROLLS.toLocaleString("en-US")}
        </Control>
      </Row>
      <Row>
        <Readout label="Pairs placed" value={`${n} / 36`} />
        <Readout label="Ways: 7 vs 3" value={locked ? "?" : `${height[7]} vs ${height[3]}`} />
        {rolled && <Readout label="Rolls: 7 vs 3" value={`${ROLLS[7]} vs ${ROLLS[3]}`} />}
      </Row>
    </div>
  );
}

export default function WhySevenWins({ slug }: { slug: string }) {
  const [drop, setDrop] = useState<boolean[]>(() => Array(6).fill(false));
  const [rolled, setRolled] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Roll two fair dice. A total of 7 is how many times as likely as a total of 3?",
        options: ["Equally likely", `${RATIO} times`, `${2 * RATIO} times`],
        answer: 1,
      }}
      exploreHint="Drop all six rows of pairs, then roll 1,000 times."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Of the 36 equally likely pairs, {ways(7)} make 7 (1+6, 2+5, 3+4, 4+3, 5+2, 6+1) and only {ways(3)} make 3 (1+2,
            2+1). So 7 is <strong>{RATIO} times</strong> as likely: {ways(7)}/36 against {ways(3)}/36.
          </p>
          <p>
            Every total is possible, but totals are not equally likely: the middle can be made in the most ways. Your{" "}
            {N_ROLLS.toLocaleString("en-US")} rolls gave {ROLLS[7]} sevens and {ROLLS[3]} threes, close to {RATIO} to 1 but
            not exact; rolls wobble, the 36 ways do not.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} drop={drop} setDrop={setDrop} rolled={rolled} setRolled={setRolled} />
      )}
    </Lesson>
  );
}
