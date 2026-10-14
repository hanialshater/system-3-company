"use client";

// Decentralised (greedy) search on a ring. 2,000 people sit on a ring; each knows the two ring
// neighbours and has ONE long link whose ring distance d (1..1000) is drawn with chance ∝ (number of
// people at distance d) × d^-q, direction left/right at random. A message moves to whichever of the
// holder's three contacts is closest (ring distance) to the target, until it arrives.
// One run of a rule = 5 seeded networks (mulberry32 seeds 1-5) × 200 source/target pairs (mulberry32(100 + seed),
// the same pairs for every rule). Builder ran this code in Node (2026-10-14): q=0 → 38.3 mean steps, q=1 → 28.5, q=2 → 212.6.
// With no long links the mean ring distance is 1,000,000 / 1,999 ≈ 500.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 2000;
const HALF = N / 2;
const SEEDS = [1, 2, 3, 4, 5];
const PAIRS = 200;
const TOTAL = SEEDS.length * PAIRS; // 1,000 messages per rule
const PAIR_SEED_OFFSET = 100; // pairs for network s come from mulberry32(100 + s)

const ringDist = (a: number, b: number) => {
  const d = Math.abs(a - b) % N;
  return Math.min(d, N - d);
};

function cdfFor(q: number): number[] {
  const w: number[] = [];
  let sum = 0;
  for (let d = 1; d <= HALF; d++) {
    sum += (d === HALF ? 1 : 2) * Math.pow(d, -q);
    w.push(sum);
  }
  return w.map((x) => x / sum);
}

function build(q: number, rng: () => number): Int32Array {
  const cdf = cdfFor(q);
  const link = new Int32Array(N);
  for (let i = 0; i < N; i++) {
    const u = rng();
    let lo = 0;
    let hi = HALF - 1;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (cdf[m] < u) lo = m + 1;
      else hi = m;
    }
    const d = lo + 1;
    const dir = d === HALF || rng() < 0.5 ? 1 : -1;
    link[i] = (((i + dir * d) % N) + N) % N;
  }
  return link;
}

function route(link: Int32Array, from: number, to: number): number[] {
  let cur = from;
  const path = [from];
  while (cur !== to) {
    const opts = [(cur + 1) % N, (cur + N - 1) % N, link[cur]];
    let best = opts[0];
    for (const o of opts) if (ringDist(o, to) < ringDist(best, to)) best = o;
    cur = best;
    path.push(cur);
  }
  return path;
}

type Run = { nets: Int32Array[]; pairs: [number, number][]; steps: number[]; mean: number };

const cache = new Map<number, Run>();
function runRule(q: number): Run {
  const hit = cache.get(q);
  if (hit) return hit;
  const nets: Int32Array[] = [];
  const pairs: [number, number][] = [];
  const steps: number[] = [];
  for (const seed of SEEDS) {
    const link = build(q, mulberry32(seed));
    nets.push(link);
    const pick = mulberry32(PAIR_SEED_OFFSET + seed); // same 200 pairs for every rule
    for (let k = 0; k < PAIRS; k++) {
      const a = Math.floor(pick() * N);
      let b = Math.floor(pick() * (N - 1));
      if (b >= a) b++;
      pairs.push([a, b]);
      steps.push(route(link, a, b).length - 1);
    }
  }
  const run = { nets, pairs, steps, mean: steps.reduce((x, y) => x + y, 0) / steps.length };
  cache.set(q, run);
  return run;
}

const RULES = [
  { q: 0, label: "Uniform", long: "uniform links" },
  { q: 1, label: "Chance ∝ 1/d", long: "1/d links" },
  { q: 2, label: "Chance ∝ 1/d²", long: "1/d² links" },
];
const RING_ONLY = Math.round(1000000 / 1999); // 500

// drawing
const CX = 160;
const CY = 132;
const R = 118;
const pt = (i: number) => {
  const a = (2 * Math.PI * i) / N - Math.PI / 2;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)] as const;
};
const SAMPLE_EVERY = 40; // draw the long link of every 40th person (50 chords)

export default function NearAndFarLinksFindTheWay({ slug }: { slug: string }) {
  const [rule, setRule] = useState<number | null>(null);
  const [msg, setMsg] = useState(0);
  const [means, setMeans] = useState<(number | null)[]>([null, null, null]);

  const run = rule === null ? null : runRule(RULES[rule].q);
  const net = run ? run.nets[Math.floor(msg / PAIRS)] : null;
  const pair = run ? run.pairs[msg] : null;
  const path = run && net && pair ? route(net, pair[0], pair[1]) : null;
  const pathD = path ? path.map((p, i) => `${i ? "L" : "M"}${pt(p)[0].toFixed(1)},${pt(p)[1].toFixed(1)}`).join(" ") : "";

  const fmt = (m: number | null) => (m === null ? "–" : m.toFixed(1));
  const note =
    rule === null
      ? "Pick a rule for the long links. Each run sends 1,000 messages."
      : `${RULES[rule].long}, message ${msg + 1} of ${TOTAL.toLocaleString("en-US")}: ${path!.length - 1} steps.`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "2,000 people on a ring, each with one long link. Messages go to whoever is closest to the target. Which long links route fastest?",
        options: ["Uniformly random", "Chance ∝ 1/distance", "Chance ∝ 1/distance²"],
        answer: 1,
      }}
      exploreHint="Run all three rules, then step through single messages to see how each one travels."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Over your 1,000 messages per rule, uniform links averaged {fmt(means[0] ?? runRule(0).mean)} steps, 1/d links{" "}
            {fmt(means[1] ?? runRule(1).mean)} and 1/d² links {fmt(means[2] ?? runRule(2).mean)}. With no long links at all
            it would be about {RING_ONLY}.
          </p>
          <p>
            Uniform links are mostly huge jumps, so near the target they rarely help and the last stretch crawls along the
            ring. 1/d² links almost never jump far. 1/d links come at every scale, so wherever the message is, some
            contact can cut the remaining distance a lot.
          </p>
          <p>On large networks, Kleinberg proved greedy search is fast only when the exponent matches the dimension: 1 for a ring.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["q0", "q1", "q2"]}>
          {(reach) => {
            const pick = (i: number) => {
              if (locked) return;
              const r = runRule(RULES[i].q);
              setRule(i);
              setMsg(0);
              setMeans((m) => m.map((v, j) => (j === i ? r.mean : v)));
              reach(`q${RULES[i].q}`);
            };
            const next = () => {
              if (locked || rule === null) return;
              setMsg((m) => (m + 1) % TOTAL);
            };
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 264" className="stage-svg" role="img" aria-label={note}>
                  <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--line)" strokeWidth={3} />
                  {net &&
                    Array.from({ length: N / SAMPLE_EVERY }, (_, k) => {
                      const i = k * SAMPLE_EVERY;
                      const [x1, y1] = pt(i);
                      const [x2, y2] = pt(net[i]);
                      return (
                        <line
                          key={`l${i}`}
                          x1={x1.toFixed(1)}
                          y1={y1.toFixed(1)}
                          x2={x2.toFixed(1)}
                          y2={y2.toFixed(1)}
                          stroke="var(--muted)"
                          strokeWidth={1}
                          opacity={0.45}
                        />
                      );
                    })}
                  {path && (
                    <path d={pathD} fill="none" stroke="var(--domain)" strokeWidth={2.5} strokeLinejoin="round" />
                  )}
                  {pair && (
                    <>
                      <circle cx={pt(pair[0])[0]} cy={pt(pair[0])[1]} r={6} fill="var(--domain)" />
                      <circle cx={pt(pair[1])[0]} cy={pt(pair[1])[1]} r={6} fill="var(--good)" />
                    </>
                  )}
                  <text x={CX} y={CY - 4} textAnchor="middle" className={s.big}>
                    {path ? path.length - 1 : "?"}
                  </text>
                  <text x={CX} y={CY + 14} textAnchor="middle" className={s.small}>
                    steps
                  </text>
                  <g className={s.legend}>
                    <circle cx={16} cy={258} r={4} fill="var(--domain)" />
                    <text x={24} y={261}>
                      start
                    </text>
                    <circle cx={66} cy={258} r={4} fill="var(--good)" />
                    <text x={74} y={261}>
                      target
                    </text>
                    <line x1={124} y1={258} x2={140} y2={258} stroke="var(--muted)" />
                    <text x={144} y={261}>
                      some long links (seeded)
                    </text>
                  </g>
                </svg>
                <Row>
                  {RULES.map((r, i) => (
                    <Control key={r.q} className={`tap ${rule === i ? "active" : ""}`} disabled={locked} onClick={() => pick(i)}>
                      {r.label}
                    </Control>
                  ))}
                  <Control className="tap" disabled={locked || rule === null} onClick={next}>
                    Next message
                  </Control>
                </Row>
                <Row>
                  <Readout label="Uniform: mean" value={fmt(means[0])} />
                  <Readout label="1/d: mean" value={fmt(means[1])} />
                  <Readout label="1/d²: mean" value={fmt(means[2])} />
                  <Readout label="Ring only" value={RING_ONLY} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
