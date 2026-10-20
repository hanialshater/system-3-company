"use client";

// Secretary problem with 10 candidates. Rule: reject the first k, then take the first candidate better
// than everyone seen so far (if none, you end with the last one). The learner presses a k; 20 seeded
// rounds are played at once. Round r of batch b uses the same shuffled candidates for every k (paired),
// seed mulberry32(b * 1000 + r + 1), batch 0 is the first seed tried (not tuned). The exact chance is
// (k/n) * sum over j = k+1..n of 1/(j-1), checked against all 10! orders in node (k = 3: 0.3987).
// Key states: played reject-3 and reject-0. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 10, ROUNDS = 20, KS = [0, 1, 2, 3, 4, 5], K_Q = 3;
const MILESTONES = ["played-3", "played-0"] as const;
const FACT10 = 3628800;

const exact = (k: number) => (k === 0 ? 1 / N : (k / N) * Array.from({ length: N - k }, (_, i) => 1 / (k + i)).reduce((a, b) => a + b, 0));
const pct = (p: number) => `${Math.round(p * 100)}%`;
const pct1 = (p: number) => `${(Math.round(p * 1000) / 10).toFixed(1)}%`;

/** Candidate ranks (1 = best) in arrival order for round r of batch b. */
function order(b: number, r: number): number[] {
  const rng = mulberry32(b * 1000 + r + 1);
  const a = Array.from({ length: N }, (_, i) => i + 1);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickIndex(p: number[], k: number): number {
  let best = Infinity;
  for (let i = 0; i < k; i++) best = Math.min(best, p[i]);
  for (let i = k; i < N; i++) if (p[i] < best) return i;
  return N - 1;
}
const batchWins = (b: number, k: number) =>
  Array.from({ length: ROUNDS }, (_, r) => order(b, r)).filter((p) => p[pickIndex(p, k)] === 1).length;

const W0 = batchWins(0, K_Q), W_NONE = batchWins(0, 0);

interface Tally { batches: number; wins: number }

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [tally, setTally] = useState<Record<number, Tally>>({});
  const [cur, setCur] = useState<{ k: number; b: number; w: number } | null>(null);

  const play = (k: number) => {
    const b = tally[k]?.batches ?? 0;
    const w = batchWins(b, k);
    setTally({ ...tally, [k]: { batches: b + 1, wins: (tally[k]?.wins ?? 0) + w } });
    setCur({ k, b, w });
    if (b === 0 && k === K_Q) reach("played-3");
    if (b === 0 && k === 0) reach("played-0");
  };

  const k = cur?.k ?? K_Q;
  const p = cur ? order(cur.b, ROUNDS - 1) : null;
  const pick = p ? pickIndex(p, k) : -1;
  const hit = p ? p[pick] === 1 : false;
  const t = tally[k];
  const msg = locked
    ? "10 candidates in random order, no going back."
    : !cur
      ? "Choose how many to reject first. 20 rounds are played."
      : `Reject ${k}: won ${cur.w} of ${ROUNDS} rounds. Last round: you took #${p![pick]}${hit ? ", the best." : "."}`;
  const BW = 22, GAP = 8;
  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <svg viewBox="0 0 340 120" className={`stage-svg ${s.svg}`} role="img" aria-label={cur ? `Last round, candidate ranks in order: ${p!.join(", ")}` : "No rounds played yet"}>
        {Array.from({ length: N }, (_, i) => {
          const x = 14 + i * (BW + GAP);
          const r = p ? p[i] : null;
          const h = r ? (N + 1 - r) * 8 : 6;
          const cls = r === null ? s.empty : i === pick ? (hit ? s.win : s.lose) : r === 1 ? s.best : i < k ? s.skip : s.pass;
          return (
            <g key={i}>
              {i < k && <rect className={s.zone} x={x - GAP / 2} y={4} width={BW + GAP} height={92} />}
              <rect className={cls} x={x} y={92 - h} width={BW} height={h} rx={2} />
              <text className={s.lab} x={x + BW / 2} y={106}>{r ?? "?"}</text>
              {i === pick && <text className={s.lab} x={x + BW / 2} y={117}>pick</text>}
            </g>
          );
        })}
      </svg>
      <p className={s.tag}>Bars: rank of each arrival (1 = best). Shaded: rejected.</p>
      <Row>
        {KS.map((kk) => (
          <Control key={kk} className={cur?.k === kk ? "active" : ""} disabled={locked} onClick={() => play(kk)}>
            Reject {kk}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label={`Reject ${k}, wins`} value={locked || !t ? "?" : `${t.wins} of ${t.batches * ROUNDS}`} />
        <Readout label="Rounds each" value={ROUNDS} />
      </Row>
    </div>
  );
}

export default function RejectTheFirstThree({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Hiring an assistant, you interview ten candidates in random order, one look each, no call-backs. You turn down the first ${K_Q}, then hire the first one better than all before. Chance you get the very best?`,
        options: [`About ${pct(1 / N)}`, `About ${pct(exact(K_Q))}`, "About 70%"],
        answer: 1,
      }}
      exploreHint={`Try Reject ${K_Q}, then Reject 0 (take the first), on the same 20 rounds.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your first {ROUNDS} rounds, Reject {K_Q} won <strong>{W0}</strong> and Reject 0 won {W_NONE}. That is a small sample. Across all{" "}
            {FACT10.toLocaleString("en-US")} possible orders, Reject {K_Q} wins <strong>{pct1(exact(K_Q))}</strong>; Reject 0 wins {pct1(exact(0))}.
          </p>
          <p>
            The rejected few set a yardstick for the rest. Rejecting 4 does about as well, {pct1(exact(4))}; for long lists the best
            start is about 37% of the way through. Assumes arrivals are in random order and refusals are final.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
