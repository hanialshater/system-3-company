"use client";

// Copying model (E&K ch. 18). Page 0 exists; pages 1..10,000 arrive one at a time and each adds one
// link to an earlier page. With chance c it picks a random earlier page that has a link (pages 1..i-1)
// and copies that link's target; otherwise it links to a uniformly random earlier page (0..i-1).
// Copying lands on page j with chance proportional to j's in-links: rich get richer.
// Generator pinned: mulberry32(seed), seeds 1-3, two draws per page (same draws for every c).
// Builder's node run (2026-10-14), biggest page at 10,000: c=0 -> 12/18/12, c=0.5 -> 160/179/158,
// c=0.9 -> 6278/4537/5122. Top 100 pages' share of links: ~7%, ~26-27%, ~84-86%.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 10000;
const SEEDS = [1, 2, 3] as const;
const SHARES = [0, 0.5, 0.9] as const;
type Run = { max: number[]; top1: number[] }; // snapshot after every 1,000 pages

function simulate(seed: number, c: number): Run {
  const rng = mulberry32(seed);
  const target = new Int32Array(N + 1);
  const deg = new Int32Array(N + 1);
  const max: number[] = [];
  const top1: number[] = [];
  for (let i = 1; i <= N; i++) {
    const r1 = rng();
    const r2 = rng();
    let j: number;
    if (i > 1 && r1 < c) j = target[1 + Math.floor(r2 * (i - 1))];
    else j = Math.floor(r2 * i);
    target[i] = j;
    deg[j]++;
    if (i % 1000 === 0) {
      const sorted = Array.from(deg.subarray(0, i + 1)).sort((a, b) => b - a);
      const k = Math.floor((i + 1) / 100); // top 1% of the i + 1 pages
      let sum = 0;
      for (let q = 0; q < k; q++) sum += sorted[q];
      max.push(sorted[0]);
      top1.push(sum / i);
    }
  }
  return { max, top1 };
}

// all nine runs are computed once; a chip shows its run
const RUNS: Record<number, Run[]> = Object.fromEntries(SEEDS.map((seed) => [seed, SHARES.map((c) => simulate(seed, c))]));

const pct = (c: number) => `${Math.round(c * 100)}%`;
const fmt = (n: number) => n.toLocaleString("en-US");

// drawing
const W = 320;
const X0 = 84;
const X1 = 300;
const AXIS = 7000;
const xOf = (v: number) => X0 + ((X1 - X0) * Math.min(v, AXIS)) / AXIS;

export default function MoreCopyingBiggerStars({ slug }: { slug: string }) {
  const [seed, setSeed] = useState<number>(1);
  const [shown, setShown] = useState<boolean[]>([false, false, false]);
  const [active, setActive] = useState<number | null>(null);
  const [k, setK] = useState(10); // thousands of pages added so far

  const runs = RUNS[seed];
  const at = (si: number) => runs[si].max[k - 1];
  const r0 = RUNS[seed][0].max[9];
  const r90 = RUNS[seed][2].max[9];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "10,000 new pages each add one link. Raise copying (link to what another page links to) from 0% to 90%. The biggest page's links?",
        options: ["About the same", "About double", "Hundreds of times more"],
        answer: 2,
      }}
      exploreHint="Run 0% and 90% copying, then slide back in time to watch the leader grow."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In seed {seed}, the biggest page ended with {fmt(r0)} links with no copying and {fmt(r90)} with 90% copying: about{" "}
            {fmt(Math.round(r90 / r0))} times more. The top 1% of pages went from holding {pct(RUNS[seed][0].top1[9])} of all links to{" "}
            {pct(RUNS[seed][2].top1[9])}.
          </p>
          <p>
            A copier picks a random page and links to whatever that page links to. A page that already has 500 links is 500 times
            more likely to be the one copied than a page with one, so new links flow to the rich in proportion to what they have.
            Without copying, every earlier page has the same chance and no page gets far ahead.
          </p>
          <p>The copying share does not nudge the winner. It decides how big the winners get.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ran-0", "ran-90"]}>
          {(reach) => {
            const run = (si: number) => {
              if (locked) return;
              setShown((v) => v.map((x, i) => (i === si ? true : x)));
              setActive(si);
              if (si === 0) reach("ran-0");
              if (si === 2) reach("ran-90");
            };
            const nextSeed = () => {
              if (locked) return;
              setSeed((v) => (v % 3) + 1);
              setShown([false, false, false]);
              setActive(null);
            };
            return (
              <div className={s.wrap}>
                <p className={s.note}>
                  Seed {seed} · {fmt(k * 1000)} pages so far
                </p>
                <svg viewBox={`0 0 ${W} 150`} className="stage-svg" role="img" aria-label="Links of the biggest page at each copying share">
                  <text x={X0} y={12} className={s.cap}>
                    links to the biggest page
                  </text>
                  {[0, 2000, 4000, 6000].map((t) => (
                    <g key={t}>
                      <line x1={xOf(t)} y1={18} x2={xOf(t)} y2={126} stroke="var(--line)" />
                      <text x={xOf(t)} y={140} textAnchor="middle" className={s.tick}>
                        {t === 0 ? "0" : `${t / 1000}k`}
                      </text>
                    </g>
                  ))}
                  {SHARES.map((c, si) => {
                    const y = 26 + si * 34;
                    const on = shown[si];
                    const v = on ? at(si) : 0;
                    const end = xOf(v);
                    return (
                      <g key={c}>
                        <text x={X0 - 8} y={y + 15} textAnchor="end" className={active === si ? s.labOn : s.lab}>
                          {pct(c)} copy
                        </text>
                        {on ? (
                          <>
                            <rect
                              x={X0}
                              y={y}
                              width={Math.max(2, end - X0)}
                              height={22}
                              rx={3}
                              fill={si === 2 ? "var(--domain)" : si === 1 ? "var(--fg)" : "var(--muted)"}
                              opacity={active === si ? 1 : 0.7}
                            />
                            <text
                              x={end > 240 ? end - 6 : end + 6}
                              y={y + 15}
                              textAnchor={end > 240 ? "end" : "start"}
                              className={end > 240 ? s.valIn : s.val}
                            >
                              {fmt(v)}
                            </text>
                          </>
                        ) : (
                          <text x={X0 + 6} y={y + 15} className={s.tick}>
                            not run
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  {SHARES.map((c, si) => (
                    <Control
                      key={c}
                      className={shown[si] ? "active" : ""}
                      disabled={locked || shown[si]}
                      onClick={() => run(si)}
                    >
                      Run {pct(c)} copying
                    </Control>
                  ))}
                </Row>
                <Slider
                  label="Pages so far"
                  value={k}
                  min={1}
                  max={10}
                  onChange={(v) => {
                    if (!locked) setK(v);
                  }}
                  disabled={locked}
                  format={(v) => fmt(v * 1000)}
                />
                <Row>
                  <Readout label="Top 1% of pages hold" value={active === null ? "–" : pct(runs[active].top1[k - 1])} />
                  <Control disabled={locked} onClick={nextSeed}>
                    Next seed
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
