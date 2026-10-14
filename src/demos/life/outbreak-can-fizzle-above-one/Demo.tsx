"use client";

// Branching-process extinction. One case arrives; every case infects a Poisson-distributed number
// of others with mean R. A chain dies out when a generation has no new cases; a chain that passes
// 2,000 cases is counted as taking off. Each R has its own seeded stream (mulberry32 seed 218 + 10R),
// so outbreak n at a given R is the same whatever order the learner pressed things in.
// One representation: the latest outbreak's generations as rows of dots, with tallies below.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const RS = [0.9, 1.5, 2, 3];
const MAIN = 1.5;
const CAP = 2000;
const MAX_RUNS = 1000;
const seedFor = (r: number) => 218 + Math.round(r * 10);

type Outbreak = { died: boolean; first: number; gens: number[]; total: number };

function poisson(rng: () => number, mean: number) {
  const L = Math.exp(-mean);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= rng();
  } while (p > L);
  return k - 1;
}

function outbreak(rng: () => number, r: number): Outbreak {
  let active = 1;
  let total = 1;
  let first = -1;
  const gens = [1];
  while (active > 0 && total <= CAP) {
    let next = 0;
    for (let i = 0; i < active; i++) next += poisson(rng, r);
    if (first < 0) first = next;
    total += next;
    active = next;
    gens.push(next);
  }
  return { died: active === 0, first, gens, total };
}

const DOT_ROWS = 7;
const DOTS_PER_ROW = 18;
const pct = (a: number, n: number) => (n ? `${Math.round((100 * a) / n)}%` : "–");

export default function OutbreakCanFizzleAboveOne({ slug }: { slug: string }) {
  const streams = useRef(new Map<number, { rng: () => number; runs: Outbreak[] }>());
  const [r, setR] = useState(MAIN);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const runsFor = (rr: number, n: number) => {
    let st = streams.current.get(rr);
    if (!st) {
      st = { rng: mulberry32(seedFor(rr)), runs: [] };
      streams.current.set(rr, st);
    }
    while (st.runs.length < n) st.runs.push(outbreak(st.rng, rr));
    return st.runs.slice(0, n);
  };

  const n = counts[String(r)] ?? 0;
  const runs = runsFor(r, n);
  const died = runs.filter((o) => o.died).length;
  const lowFirst = runs.filter((o) => o.first <= 1).length;
  const last = runs[n - 1];
  const nMain = counts[String(MAIN)] ?? 0;
  const mainRuns = runsFor(MAIN, nMain);
  const mainDied = mainRuns.filter((o) => o.died).length;
  const mainLow = mainRuns.filter((o) => o.first <= 1).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Each case infects a random number of others, 1.5 on average. One case arrives. How often does the chain die out by itself?",
        options: ["Never", "About 4 in 10", "About 9 in 10"],
        answer: 1,
      }}
      exploreHint="Start one outbreak at a time, then run 100 and read the tally."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Of your {nMain} outbreaks at R = 1.5, {mainDied} died out by themselves ({pct(mainDied, nMain)}). The first case
            infected 0 or 1 people in {mainLow} of them ({pct(mainLow, nMain)}): a chain that starts that thin is easily cut by
            luck. Worked out exactly, 41.7% of chains die out.
          </p>
          <p>
            R above 1 means growth is possible, not certain. At R = 2 about 20% still fizzle, at R = 3 about 6%; below 1 every
            chain ends.
          </p>
          <p>
            This assumes Poisson spread, with every case equally infectious. Real spread is more uneven, which makes dying out
            even more likely.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-outbreak", "hundred-at-main"]}>
          {(hit) => {
            const run = (k: number) => {
              if (locked) return;
              const next = Math.min(MAX_RUNS, n + k);
              if (next === n) return;
              setCounts((c) => ({ ...c, [String(r)]: next }));
              hit("first-outbreak");
              if (r === MAIN && next >= 100) hit("hundred-at-main");
            };
            const pick = (rr: number) => {
              if (locked || rr === r) return;
              setR(rr);
            };
            const note = !last
              ? `Poisson spread: each case infects a random number, mean ${r}. Start an outbreak.`
              : last.died
                ? `Outbreak ${n}: died out after ${last.total} case${last.total === 1 ? "" : "s"}.`
                : `Outbreak ${n}: took off (over ${CAP.toLocaleString("en-US")} cases).`;
            const rows = last ? last.gens.slice(0, DOT_ROWS) : [1];
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 340 200" className="stage-svg" role="img" aria-label={`R ${r}: ${died} of ${n} outbreaks died out`}>
                  {rows.map((g, i) => {
                    const y = 18 + i * 26;
                    const shown = Math.min(g, DOTS_PER_ROW);
                    return (
                      <g key={i}>
                        <text x={6} y={y + 4} className={i === 1 ? s.genOn : s.gen}>
                          {i === 0 ? "start" : `gen ${i}`}
                        </text>
                        {g === 0 ? (
                          <text x={70} y={y + 4} className={s.zero}>
                            0: chain ends
                          </text>
                        ) : (
                          Array.from({ length: shown }, (_, j) => (
                            <circle
                              key={j}
                              cx={74 + j * 13}
                              cy={y}
                              r={5}
                              fill={last && !last.died ? "var(--bad)" : "var(--domain)"}
                              stroke="var(--fg)"
                              strokeWidth={i === 1 ? 1.5 : 0.5}
                            />
                          ))
                        )}
                        {g > DOTS_PER_ROW ? (
                          <text x={74 + DOTS_PER_ROW * 13 - 4} y={y + 4} className={s.more}>
                            +{g - DOTS_PER_ROW}
                          </text>
                        ) : null}
                      </g>
                    );
                  })}
                  {last && last.gens.length > DOT_ROWS ? (
                    <text x={170} y={194} textAnchor="middle" className={s.gen}>
                      … {last.gens.length - DOT_ROWS} more generations
                    </text>
                  ) : null}
                </svg>
                <Row>
                  <Control disabled={locked || n >= MAX_RUNS} onClick={() => run(1)}>
                    1 outbreak
                  </Control>
                  <Control disabled={locked || n >= MAX_RUNS} onClick={() => run(100)}>
                    +100 outbreaks
                  </Control>
                </Row>
                <Row>
                  {RS.map((rr) => (
                    <Control key={rr} className={rr === r ? "active" : ""} disabled={locked || rr === r} onClick={() => pick(rr)}>
                      R = {rr}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Outbreaks" value={n} />
                  <Readout label="Died out" value={n ? `${died} (${pct(died, n)})` : "–"} />
                  <Readout label="First case infected 0 or 1" value={n ? `${lowFirst} (${pct(lowFirst, n)})` : "–"} />
                </Row>
                <p className={s.seed}>Seed {seedFor(r)}. Over 2,000 cases counts as taking off.</p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
