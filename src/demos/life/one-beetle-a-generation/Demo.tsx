"use client";

// Gene-flow toy: two groups of 50 made-up beetles, colour neutral (red or not), each starts half
// red. Each generation: m beetles picked at random from each group swap places, then each group's
// 50 young each copy the colour of one random parent in the group (Wright-Fisher drift, no sex).
// After 200 generations we ask: do the two red shares differ by more than half?
// 200 runs per setting, seeds 1..200 (mulberry32), the same seeds for every setting, not chosen.
// Re-run in artifacts/scratch/w4life/beetle.mjs: 2,000 seeds give 49.5%, 2.3%, 0.1%.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 50, GENS = 200, RUNS = 200;
const SWAPS = [0, 1, 5] as const;
type Swap = (typeof SWAPS)[number];
const MILESTONES = ["alone", "one-swap"] as const;

function run(seed: number, m: number): [number, number] {
  const rng = mulberry32(seed);
  let a = N / 2, b = N / 2;
  for (let g = 0; g < GENS; g++) {
    let outA = 0, outB = 0, ra = a, rb = b;
    for (let k = 0; k < m; k++) if (rng() < ra / (N - k)) { outA++; ra--; }
    for (let k = 0; k < m; k++) if (rng() < rb / (N - k)) { outB++; rb--; }
    a += outB - outA;
    b += outA - outB;
    const pa = a / N, pb = b / N;
    let na = 0, nb = 0;
    for (let i = 0; i < N; i++) {
      if (rng() < pa) na++;
      if (rng() < pb) nb++;
    }
    a = na;
    b = nb;
  }
  return [a / N, b / N];
}

const cache = new Map<number, [number, number][]>();
function runs(m: number) {
  let r = cache.get(m);
  if (!r) {
    r = Array.from({ length: RUNS }, (_, i) => run(i + 1, m));
    cache.set(m, r);
  }
  return r;
}
const far = (p: [number, number]) => Math.abs(p[0] - p[1]) > 0.5;
const farCount = (m: number) => runs(m).filter(far).length;
const label = (m: Swap) => (m === 0 ? "Alone" : `${m} swap${m > 1 ? "s" : ""} each way`);

const S = 200, PAD = 22;
const sx = (v: number) => PAD + v * S;
const sy = (v: number) => PAD + (1 - v) * S;

function Stage({ locked, m, onM }: { locked: boolean; m: Swap | null; onM: (m: Swap) => void }) {
  const pts = m === null ? [] : runs(m);
  const k = m === null ? 0 : farCount(m);
  const msg = locked
    ? "Toy beetles: colour is pure chance. Each dot will be one run after 200 generations."
    : m === null
      ? "Pick a setting to run it 200 times."
      : `${label(m)}: in ${k} of ${RUNS} runs (${((100 * k) / RUNS).toFixed(1)}%) the groups differ by more than half.`;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${S + PAD + 8} ${S + PAD + 16}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        <rect x={sx(0)} y={sy(1)} width={S} height={S} className={s.box} />
        <path d={`M${sx(0)},${sy(0.5)} L${sx(0)},${sy(1)} L${sx(0.5)},${sy(1)} Z M${sx(0.5)},${sy(0)} L${sx(1)},${sy(0)} L${sx(1)},${sy(0.5)} Z`} className={s.zone} />
        <text x={sx(0.04)} y={sy(0.9)} className={s.small}>differ by</text>
        <text x={sx(0.04)} y={sy(0.83)} className={s.small}>over half</text>
        <text x={sx(0.5)} y={S + PAD + 14} textAnchor="middle" className={s.axis}>group 1: share red</text>
        <text x={8} y={sy(0.5)} textAnchor="middle" transform={`rotate(-90 8 ${sy(0.5)})`} className={s.axis}>group 2: share red</text>
        {pts.map((p, i) => {
          const a = i * 2.39996, r = 0.018 * Math.sqrt((i % 7) / 7);
          return <circle key={i} cx={sx(p[0]) + S * r * Math.cos(a)} cy={sy(p[1]) + S * r * Math.sin(a)} r={2.6} className={far(p) ? s.bad : s.on} />;
        })}
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {SWAPS.map((v) => (
          <Control key={v} className={m === v ? "active" : ""} disabled={locked || m === v} onClick={() => onM(v)}>{label(v)}</Control>
        ))}
      </Row>
    </div>
  );
}

export default function OneBeetleAGeneration({ slug }: { slug: string }) {
  const [m, setM] = useState<Swap | null>(null);
  const [tried, setTried] = useState<Swap[]>([]);
  const pc = (v: Swap) => `${((100 * farCount(v)) / RUNS).toFixed(1)}%`;
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two groups of 50 made-up beetles, half red at first; colour is pure chance. Alone for 200 generations, their red shares end up over half apart in about half of runs. With one beetle swapped each way per generation, how often?",
        options: ["Still about half the time", "About 1 run in 4", "Rarely: a few runs in 100"],
        answer: 2,
      }}
      exploreHint="Run them alone, then with one swap. Watch the shaded corners."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Alone, {farCount(0)} of {RUNS} runs ({pc(0)}) ended far apart, most with one group all red and the other none. With one swap each
            way, <strong>{farCount(1)} of {RUNS}</strong> ({pc(1)}).
            {tried.includes(5) ? ` With five swaps, ${farCount(5)}.` : ""}
          </p>
          <p>
            Chance pushes each small group toward one colour, but a newcomer every generation keeps bringing the other colour back, so the two
            groups wander together. About one migrant per generation is enough to stop small groups drifting apart.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              m={m}
              onM={(v) => {
                setM(v);
                setTried((t) => (t.includes(v) ? t : [...t, v]));
                if (v === 0) reach("alone");
                if (v === 1) reach("one-swap");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
