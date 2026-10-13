"use client";

// Bayesian updating. A bag holds a fair coin and a two-headed coin. The learner flips the
// mystery coin one flip at a time and watches the chance it is two-headed climb:
// 50%, 67%, 80%, 89%... One tails drops it to 0. Then 1,000 pulls check the 89% by counting.
// Key state: three heads in a row on one coin, then the 1,000-pull count.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { MAX_FLIPS, afterHeads, belief, pulls, test } from "./model";
import s from "./styles.module.css";

const COINS = pulls();
const TEST = test();
const K = 3;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const ANSWER = pct(afterHeads(K)); // 89%
const TEST_SHARE = pct(TEST.twoHeaded / TEST.allHeads);
const MILESTONES = ["three-heads", "tested"] as const;

const W = 340;
const L = 34;
const R = 12;
const CT = 66;
const CB = 182;
const sx = (k: number) => L + (k / MAX_FLIPS) * (W - L - R);
const sy = (p: number) => CB - p * (CB - CT);

interface State {
  coin: number;
  shown: number;
  tested: boolean;
}

function Stage({ locked, interact, st, set }: { locked: boolean; interact: () => void; st: State; set: (s: State) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const { coin, shown, tested } = st;
  const flips = COINS[coin].flips.slice(0, shown);
  const trail = useMemo(() => Array.from({ length: shown + 1 }, (_, k) => belief(COINS[coin].flips.slice(0, k))), [coin, shown]);
  const now = trail[trail.length - 1];
  const sawTails = flips.some((f) => !f);

  const flip = (k: number) => {
    const next = Math.min(MAX_FLIPS, shown + k);
    set({ ...st, shown: next });
    if (next >= K && COINS[coin].flips.slice(0, K).every(Boolean)) reach("three-heads");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} 200`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Coin ${coin + 1}: ${flips.length} flips, chance two-headed ${pct(now)}`}>
        <text x={4} y={12} className={s.label}>
          Coin {coin + 1} from the bag
        </text>
        {Array.from({ length: MAX_FLIPS }, (_, i) => {
          const f = flips[i];
          const x = sx(i + 1);
          return (
            <g key={i}>
              <circle cx={x} cy={32} r={11} className={f === undefined ? s.slot : f ? s.head : s.tail} />
              {f !== undefined && (
                <text x={x} y={36.5} textAnchor="middle" className={s.coinLetter}>
                  {f ? "H" : "T"}
                </text>
              )}
            </g>
          );
        })}
        <text x={L} y={CT - 9} className={s.label}>
          Chance it is two-headed
        </text>
        {[0, 0.5, 1].map((p) => (
          <g key={p}>
            <line x1={L} x2={W - R} y1={sy(p)} y2={sy(p)} className={p === 0.5 ? s.prior : s.grid} />
            <text x={L - 5} y={sy(p) + 4} textAnchor="end" className={s.tick}>
              {p * 100}%
            </text>
          </g>
        ))}
        <text x={L} y={CB + 15} className={s.tick}>
          start
        </text>
        <text x={W - R} y={CB + 15} textAnchor="end" className={s.tick}>
          flip {MAX_FLIPS}
        </text>
        <polyline points={trail.map((p, k) => `${sx(k)},${sy(p)}`).join(" ")} className={s.trail} />
        {trail.map((p, k) => (
          <g key={k}>
            <circle cx={sx(k)} cy={sy(p)} r={4.5} className={p === 0 ? s.dotZero : s.dot} />
            {!locked && k > 0 && k <= 4 && p > 0 && (
              <text x={sx(k)} y={sy(p) + 17} textAnchor="middle" className={s.ptLabel}>
                {pct(p)}
              </text>
            )}
          </g>
        ))}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : tested
            ? `1,000 pulls: ${TEST.allHeads} showed HHH; ${TEST.twoHeaded} of those were two-headed (${TEST_SHARE}).`
            : sawTails
              ? "Tails: this coin is the fair one."
              : "Flip and watch the line."}
      </p>
      <Row>
        <Control disabled={locked || shown >= MAX_FLIPS} onClick={() => flip(1)}>
          Flip
        </Control>
        <Control disabled={locked || shown >= MAX_FLIPS} onClick={() => flip(3)}>
          Flip 3 times
        </Control>
        <Control
          disabled={locked || tested}
          onClick={() => {
            set({ ...st, tested: true });
            reach("tested");
          }}
        >
          Test 1,000 pulls
        </Control>
        <Control disabled={locked || coin >= COINS.length - 1} onClick={() => set({ ...st, coin: coin + 1, shown: 0 })}>
          Pull again
        </Control>
      </Row>
      <Row>
        <Readout label="Flips" value={sawTails ? `${flips.length}, tails seen` : `${flips.length} heads`} />
        <Readout label="Two-headed?" value={locked ? "?" : pct(now)} />
      </Row>
    </div>
  );
}

export default function WhichCoin({ slug }: { slug: string }) {
  const [st, set] = useState<State>({ coin: 0, shown: 0, tested: false });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A bag holds one fair coin and one two-headed coin. You pull one at random and flip it ${K} times: ${K} heads. Chance it is the two-headed coin?`,
        options: ["50%", "75%", ANSWER],
        answer: 2,
      }}
      exploreHint="Flip until you see three heads in a row. Then test 1,000 pulls."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Three heads took the chance from 50% to <strong>{ANSWER}</strong>. Heads is certain for the two-headed
            coin but only a half chance for the fair one, so each head doubles the odds: 1 to 1, then 2 to 1, 4 to 1, 8
            to 1. Eight to one is 8 out of 9.
          </p>
          <p>
            The 1,000 pulls agreed: {TEST.allHeads} showed three heads, and {TEST.twoHeaded} of those ({TEST_SHARE})
            were the two-headed coin.
          </p>
          <p className="muted">A single tails ends it at 0: a two-headed coin can never show tails.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} st={st} set={set} />}
    </Lesson>
  );
}
