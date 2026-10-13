"use client";

// Cross-validation toy. 20 points at x = 0.025, 0.075, ..., 0.975; the true label is 1 if x > 0.5.
// Exactly 4 labels (20%) are flipped, chosen by mulberry32(seed 1, untuned); the 20 points are then
// shuffled into five folds of 4. A FIXED rule (say 1 if x > 0.5; not trained) is scored on each fold.
// Seed 1 folds: 100, 75, 100, 50, 75 (mean 80). With 4 wrong labels the scores cannot all be equal,
// so the spread is >= 25 points in every seed (1,000 seeds: 25 in 253, 50 in 671, 75 in 76).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const N = 20;
const FLIPS = 4;
const K = 5;
const SEED = 1;
function shuffle(n: number, rng: () => number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const rng = mulberry32(SEED);
const XS = Array.from({ length: N }, (_, i) => (i + 0.5) / N);
const FLIPPED = new Set(shuffle(N, rng).slice(0, FLIPS));
const PERM = shuffle(N, rng);
const TRUTH = XS.map((x) => (x > 0.5 ? 1 : 0));
const KEY = TRUTH.map((t, i) => (FLIPPED.has(i) ? 1 - t : t));
const RULE = (x: number) => (x > 0.5 ? 1 : 0);
const FOLDS = Array.from({ length: K }, (_, k) => PERM.slice(k * (N / K), (k + 1) * (N / K)));
const SCORES = FOLDS.map((f) => (100 * f.filter((i) => RULE(XS[i]) === KEY[i]).length) / f.length);
const MEAN = SCORES.reduce((a, b) => a + b, 0) / K; // 80
const RIGHT_ALL = XS.filter((x, i) => RULE(x) === KEY[i]).length; // 16
// MODEL END

export default function FiveFoldsFiveScores({ slug }: { slug: string }) {
  const [cur, setCur] = useState<number | null>(null);
  const [scored, setScored] = useState<number[]>([]);
  const all = scored.length === K;
  const seenScores = SCORES.filter((_, k) => scored.includes(k));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${N} points, ${FLIPS} of them with wrong labels. A fixed rule (say 1 if x > 0.5) is scored on ${K} held-out groups of ${N / K} points each. Highest group score minus lowest:`,
        options: ["Within 5 points", "About 10 points", "25 points or more"],
        answer: 2,
      }}
      exploreHint="Score all five folds."
      minInteractions={K}
      reveal={() => (
        <>
          <p>
            Your five folds scored {SCORES.join(", ")}%: a spread of {Math.max(...SCORES) - Math.min(...SCORES)} points for one rule
            that never changed. Which {N / K} points landed in the group decided the score.
          </p>
          <p>
            The mean, {MEAN}%, uses every point once and matches the {RIGHT_ALL} of {N} the rule gets right.
          </p>
          <p>
            With {FLIPS} wrong labels in groups of {N / K}, the folds can never all agree: in 1,000 shuffles the spread was 25 points
            or more every time. One held-out slice is one draw.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={FOLDS.map((_, k) => `fold-${k + 1}`)}>
          {(reach) => {
            const x0 = 20;
            const w = 280;
            const X = (x: number) => x0 + x * w;
            const yTop = 60;
            const yBot = 120;
            const inCur = (i: number) => !locked && cur !== null && FOLDS[cur].includes(i);
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy data · fixed rule, not trained</span>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={cur === null ? "20 points" : `Fold ${cur + 1}`}>
                  <rect x={X(0.5)} y={30} width={w / 2} height={110} fill="var(--domain)" opacity={0.1} />
                  <line x1={X(0.5)} y1={26} x2={X(0.5)} y2={144} stroke="var(--domain)" strokeWidth={2} />
                  <text x={X(0.5) + 4} y={24} className={s.small} fill="var(--domain)">
                    rule says 1 →
                  </text>
                  <text x={X(0.5) - 4} y={24} textAnchor="end" className={s.small} fill="var(--muted)">
                    ← rule says 0
                  </text>
                  <text x={4} y={yTop + 4} className={s.tiny} fill="var(--muted)">
                    1
                  </text>
                  <text x={4} y={yBot + 4} className={s.tiny} fill="var(--muted)">
                    0
                  </text>
                  <line x1={x0} y1={yTop} x2={x0 + w} y2={yTop} stroke="var(--line)" />
                  <line x1={x0} y1={yBot} x2={x0 + w} y2={yBot} stroke="var(--line)" />
                  {XS.map((x, i) => {
                    const y = KEY[i] === 1 ? yTop : yBot;
                    const hot = inCur(i);
                    const ok = RULE(x) === KEY[i];
                    return (
                      <g key={i}>
                        <circle cx={X(x)} cy={y} r={hot ? 7 : 4.5} fill={hot ? (ok ? "var(--good)" : "var(--bad)") : "var(--muted)"} opacity={!locked && cur !== null && !hot ? 0.35 : 1} />
                        {hot && (
                          <text x={X(x)} y={y - 11} textAnchor="middle" className={s.small} fill={ok ? "var(--good)" : "var(--bad)"}>
                            {ok ? "✓" : "✗"}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  <text x={x0} y={162} className={s.tiny} fill="var(--muted)">
                    x = 0
                  </text>
                  <text x={x0 + w} y={162} textAnchor="end" className={s.tiny} fill="var(--muted)">
                    x = 1
                  </text>
                  <text x={160} y={162} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                    row = the point&apos;s label (1 or 0)
                  </text>
                </svg>
                <Row>
                  {FOLDS.map((_, k) => (
                    <Control
                      key={k}
                      className={cur === k ? "active" : ""}
                      disabled={locked || cur === k}
                      onClick={() => {
                        setCur(k);
                        setScored((xs) => (xs.includes(k) ? xs : [...xs, k]));
                        reach(`fold-${k + 1}`);
                      }}
                    >
                      {!locked && scored.includes(k) ? `F${k + 1}: ${SCORES[k]}%` : `Fold ${k + 1}`}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Highest − lowest" value={locked || seenScores.length < 2 ? "–" : `${Math.max(...seenScores) - Math.min(...seenScores)} points`} />
                  <Readout label="Mean of 5 folds" value={locked || !all ? "–" : `${MEAN}%`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
