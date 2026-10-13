"use client";

// Mark-recapture toy lake: 1000 fish, 100 already marked and mixed in. Each net takes 50 fish
// without replacement (seeded). Estimate = marked x caught / marked-in-net (Lincoln-Petersen).
// Sample seeds [11, 4, 15, 2, 20]: seed 11 was chosen so sample 1 has 5 marked (the question's
// numbers); the other four are the next untuned picks from a short list. Marked in nets: 5, 4, 7, 9, 3.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 1000, M = 100, C = 50;
const SEEDS = [11, 4, 15, 2, 20];
const W = 320, H = 130;

function netSample(seed: number): number[] {
  const r = mulberry32(seed);
  const idx = Array.from({ length: N }, (_, i) => i);
  for (let k = 0; k < C; k++) {
    const j = k + Math.floor(r() * (N - k));
    [idx[k], idx[j]] = [idx[j], idx[k]];
  }
  return idx.slice(0, C);
}
const SAMPLES = SEEDS.map(netSample);
const MARKED = SAMPLES.map((x) => x.filter((i) => i < M).length);
const EST = MARKED.map((r) => Math.round((M * C) / r));
const fmt = (n: number) => n.toLocaleString("en-US");

function pond() {
  const r = mulberry32(7);
  const pts: { x: number; y: number }[] = [];
  while (pts.length < N) {
    const x = r() * 2 - 1, y = r() * 2 - 1;
    if (x * x + y * y <= 1) pts.push({ x: W / 2 + x * (W / 2 - 6), y: H / 2 + y * (H / 2 - 6) });
  }
  return pts;
}

function Stage({ locked, n, setN, onSecond }: { locked: boolean; n: number; setN: (n: number) => void; onSecond: () => void }) {
  const pts = useMemo(pond, []);
  const cur = n > 0 ? SAMPLES[n - 1] : [];
  const inNet = new Set(cur);
  const msg = locked
    ? `Toy lake: ${M} fish are marked (orange) and mixed in. Nets take ${C} fish.`
    : n === 0
      ? `Net a sample of ${C} fish.`
      : `Net ${n}: ${MARKED[n - 1]} of ${C} marked. ${M} × ${C} ÷ ${MARKED[n - 1]} = ${fmt(EST[n - 1])} fish.`;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        <ellipse cx={W / 2} cy={H / 2} rx={W / 2 - 2} ry={H / 2 - 2} className={s.water} />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={inNet.has(i) ? 2.6 : 1.5} className={i < M ? s.marked : s.plain}
            data-net={inNet.has(i) ? 1 : 0} />
        ))}
        {cur.map((i) => (
          <circle key={`n${i}`} cx={pts[i].x} cy={pts[i].y} r={4.2} className={s.ring} />
        ))}
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      {!locked && n > 0 && (
        <p className={s.tag}>
          Estimates so far: {EST.slice(0, n).map(fmt).join(", ")}
          {n >= 2 ? `. Lake truth in this toy: ${fmt(N)}.` : ""}
        </p>
      )}
      <Row>
        <Control disabled={locked || n >= 1} onClick={() => setN(1)}>Net a sample</Control>
        <Control disabled={locked || n >= SEEDS.length || n === 0} onClick={() => { setN(SEEDS.length); onSecond(); }}>Net 4 more</Control>
        <Control disabled={locked || n === 0} onClick={() => setN(0)}>Throw all back</Control>
      </Row>
    </div>
  );
}

export default function CountTheMarkedFish({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [maxN, setMaxN] = useState(0);
  const shown = Math.max(maxN, n);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy lake. ${M} fish are caught, marked and let go. Later ${C} fish are caught and ${MARKED[0]} are marked. About how many fish are in the lake?`,
        options: ["About 500", "About 1,000", "About 2,000"],
        answer: 1,
      }}
      exploreHint="Net one sample, then net more and compare the estimates."
      minInteractions={1}
      reveal={() => {
        const m = MARKED.slice(0, shown), e = EST.slice(0, shown);
        return (
          <>
            <p>
              Your nets held {m.join(", ")} marked fish of {C}, giving estimates of {e.map(fmt).join(", ")}. The {C} fish you net are a probe, not the lake.
            </p>
            <p>
              If {M} marked fish are mixed into the lake and {MARKED[0]} of {C} netted fish are marked, the marked share is 1 in {C / MARKED[0]}. So the lake holds about {M} × {C / MARKED[0]} = <strong>{fmt((M * C) / MARKED[0])}</strong>. Nets wobble, so one estimate is a guess; several cluster near the true {fmt(N)}.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["two-nets"]}>
          {(reach) => (
            <Stage
              locked={locked}
              n={n}
              setN={(v) => { setN(v); if (v > 0) setMaxN((m) => Math.max(m, v)); }}
              onSecond={() => reach("two-nets")}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
