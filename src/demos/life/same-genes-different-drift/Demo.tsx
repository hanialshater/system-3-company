"use client";

// Neutral genetic drift (haploid Wright-Fisher). Five separate populations of
// N beetles start half red, half green. Each generation, every new beetle
// copies the colour of a parent drawn at random from the previous generation.
// Neither colour is better. Seeded: the same runs every time until "New runs".

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const LANES = 5;
const GENS = 100;
const LANE_H = 50;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** reds[lane][gen] = number of red beetles; rank[lane][spot] decides which spots are red. */
function simulate(seed: number, n: number) {
  const reds: number[][] = [];
  const rank: number[][] = [];
  for (let l = 0; l < LANES; l++) {
    const r = rng(seed * 7919 + n * 31 + l * 1013);
    const row = [n / 2];
    for (let g = 1; g <= GENS; g++) {
      const p = row[g - 1] / n;
      let c = 0;
      for (let i = 0; i < n; i++) if (r() < p) c++;
      row.push(c);
    }
    reds.push(row);
    const idx = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    const rk = Array(n).fill(0);
    idx.forEach((spot, k) => (rk[spot] = k));
    rank.push(rk);
  }
  return { reds, rank };
}

export default function GeneticDrift({ slug }: { slug: string }) {
  const [n, setN] = useState(20);
  const [gen, setGen] = useState(0);
  const [seed, setSeed] = useState(1);
  const hit = useRef(new Set<string>());
  const sim = useMemo(() => simulate(seed, n), [seed, n]);

  const cols = n === 20 ? 10 : 50;
  const rows = n / cols;
  const dx = 222 / cols;
  const dy = (LANE_H - 12) / rows;
  const rad = n === 20 ? 6.5 : 2.1;
  const counts = sim.reds.map((row) => row[gen]);
  const fixed = counts.filter((c) => c === 0 || c === n).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your jar holds 20 beetles, half red and half green; neither colour is better. Each generation, 20 young copy parents picked at random. After many generations, what will the jar most likely hold?",
        options: ["still about half and half", "all one colour (either)", "always all red"],
        answer: 1,
      }}
      exploreHint="Run the 20-beetle populations to generation 100. Then switch to 200 beetles."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            With 20 beetles, most populations ended up <strong>all one colour</strong>, some red and some green, often
            within a few dozen generations. No colour was better. Each generation is a random draw from the last, so the mix wanders,
            and a lost colour never comes back.
          </p>
          <p>
            With 200 beetles the mix wandered far more slowly; after 100 generations most were still mixed. Chance
            matters most in small populations. Each colour takes over with chance equal to its starting share, here 1 in
            2.
          </p>
          <p className="muted">Model: no mutation, no selection, no beetles arriving from elsewhere.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (g: number, nn: number) => {
          const gg = Math.max(0, Math.min(GENS, g));
          setGen(gg);
          setN(nn);
          const mark = (k: string) => {
            if (!hit.current.has(k)) {
              hit.current.add(k);
              interact();
            }
          };
          if (gg >= 60 && nn === 20) mark("small");
          if (gg >= 60 && nn === 200) mark("big");
        };
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 300 ${LANES * LANE_H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Generation ${gen}: ${fixed} of 5 populations are one colour`}>
              {sim.rank.map((rk, l) => {
                const c = counts[l];
                const y0 = l * LANE_H + 6;
                return (
                  <g key={l}>
                    <rect x={2} y={l * LANE_H + 2} width={296} height={LANE_H - 4} rx={6} className={s.lane} />
                    {rk.map((rank, spot) => {
                      const x = 10 + (spot % cols) * dx + dx / 2;
                      const y = y0 + Math.floor(spot / cols) * dy + dy / 2;
                      const red = rank < c;
                      return red ? (
                        <circle key={spot} cx={x} cy={y} r={rad} className={s.red} />
                      ) : (
                        <rect key={spot} x={x - rad} y={y - rad} width={rad * 2} height={rad * 2} rx={rad * 0.35} className={s.green} />
                      );
                    })}
                    <text x={292} y={l * LANE_H + LANE_H / 2 + 4} textAnchor="end" className={s.tag}>
                      {locked ? "" : c === n ? "all red" : c === 0 ? "all green" : `${Math.round((100 * c) / n)}% red`}
                    </text>
                  </g>
                );
              })}
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked
                ? "Make a prediction to start. Five separate populations, each starting half and half."
                : `Generation ${gen}. ${fixed} of 5 populations are all one colour.`}
            </p>

            <Slider label="Generation" value={gen} min={0} max={GENS} disabled={locked} onChange={(v) => go(v, n)} />
            <Row>
              <Control disabled={locked || gen >= GENS} onClick={() => go(gen + 10, n)}>
                +10 gens
              </Control>
              <Control disabled={locked || gen >= GENS} onClick={() => go(GENS, n)}>
                To gen 100
              </Control>
              <Control disabled={locked} onClick={() => setSeed((x) => x + 1)}>
                New runs
              </Control>
            </Row>
            <Row>
              <Control className={`${s.chip} ${n === 20 ? "active" : ""}`} aria-pressed={n === 20} disabled={locked || n === 20} onClick={() => go(gen, 20)}>
                20 beetles each
              </Control>
              <Control className={`${s.chip} ${n === 200 ? "active" : ""}`} aria-pressed={n === 200} disabled={locked || n === 200} onClick={() => go(gen, 200)}>
                200 beetles each
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
