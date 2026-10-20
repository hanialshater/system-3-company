"use client";

// Copying model (E&K ch. 18). Page 0 exists; pages 1..10,000 arrive one at a time and each adds one
// link to an earlier page. With chance c it picks a random earlier page that has a link (pages 1..i-1)
// and copies that link's target; otherwise it links to a uniformly random earlier page (0..i-1).
// Copying lands on page j with chance proportional to j's in-links: rich get richer.
// Generator pinned: mulberry32(seed), seeds 1-3, two draws per page (same draws for every c).
// Builder's node run (2026-10-14), biggest page at 10,000: c=0 -> 12/18/12, c=0.5 -> 160/179/158,
// c=0.9 -> 6278/4537/5122. Top 100 pages' share of links: ~7%, ~26-27%, ~84-86%.
// Links that went to the page leading at that moment, among pages 9,001-10,000:
// c=0 -> 0/0/0, c=0.5 -> 9/9/9, c=0.9 -> 576/416/468.
//
// v2 (wave E r6): the bar axis scales to the runs shown (no 0-6k axis on the locked stage); every
// run is kept in a results table (seed, share, biggest page, top 1%, and how many of the last 1,000
// new links went to the leader), which Next seed does not clear; the reveal quotes the latest seed
// in which the learner ran both 0% and 90%. The "links to the leader" column is the cause on stage.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 10000;
const SEEDS = [1, 2, 3] as const;
const SHARES = [0, 0.5, 0.9] as const;
type Run = { max: number[]; top1: number[]; lead: number[] }; // snapshot after every 1,000 pages

function simulate(seed: number, c: number): Run {
  const rng = mulberry32(seed);
  const target = new Int32Array(N + 1);
  const deg = new Int32Array(N + 1);
  const max: number[] = [];
  const top1: number[] = [];
  const lead: number[] = [];
  let leader = 0;
  let toLeader = 0; // links in this block of 1,000 that went to the page leading at that moment
  for (let i = 1; i <= N; i++) {
    const r1 = rng();
    const r2 = rng();
    let j: number;
    if (i > 1 && r1 < c) j = target[1 + Math.floor(r2 * (i - 1))];
    else j = Math.floor(r2 * i);
    target[i] = j;
    deg[j]++;
    if (deg[j] > deg[leader]) leader = j;
    if (j === leader) toLeader++;
    if (i % 1000 === 0) {
      const sorted = Array.from(deg.subarray(0, i + 1)).sort((a, b) => b - a);
      const k = Math.floor((i + 1) / 100); // top 1% of the i + 1 pages
      let sum = 0;
      for (let q = 0; q < k; q++) sum += sorted[q];
      max.push(sorted[0]);
      top1.push(sum / i);
      lead.push(toLeader);
      toLeader = 0;
    }
  }
  return { max, top1, lead };
}

// all nine runs are computed once; a chip shows its run
const RUNS: Record<number, Run[]> = Object.fromEntries(SEEDS.map((seed) => [seed, SHARES.map((c) => simulate(seed, c))]));

const pct = (c: number) => `${Math.round(c * 100)}%`;
const fmt = (n: number) => n.toLocaleString("en-US");

// drawing
const W = 320;
const X0 = 84;
const X1 = 300;
const niceTicks = (axis: number) => {
  const raw = axis / 3;
  const p = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * p).find((v) => v >= raw) ?? 10 * p;
  const out: number[] = [];
  for (let t = 0; t <= axis; t += step) out.push(t);
  return out;
};
const tickLabel = (t: number) => (t >= 1000 ? `${t / 1000}k` : String(t));

type Rec = { seed: number; si: number };

export default function MoreCopyingBiggerStars({ slug }: { slug: string }) {
  const [seed, setSeed] = useState<number>(1);
  const [shown, setShown] = useState<boolean[]>([false, false, false]);
  const [active, setActive] = useState<number | null>(null);
  const [k, setK] = useState(10); // thousands of pages added so far
  const [recs, setRecs] = useState<Rec[]>([]); // every run pressed, in order; Next seed keeps them

  const runs = RUNS[seed];
  const at = (si: number) => runs[si].max[k - 1];
  const biggestShown = Math.max(0, ...SHARES.map((_, si) => (shown[si] ? at(si) : 0)));
  const axis = Math.max(20, biggestShown * 1.15);
  const xOf = (v: number) => X0 + ((X1 - X0) * Math.min(v, axis)) / axis;

  // the latest seed in which both 0% and 90% were run
  const pairSeed = [...recs].reverse().find((r) => recs.some((q) => q.seed === r.seed && q.si === 0) && recs.some((q) => q.seed === r.seed && q.si === 2))?.seed;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On a new website, 10,000 pages arrive one by one and each adds one link. Raise the share that copy another page's link from 0% to 90%. What happens to the top page's links?",
        options: ["About the same", "About double", "Hundreds of times more"],
        answer: 2,
      }}
      exploreHint="Run 0% and 90% copying. Then slide back in time to watch the leader grow."
      minInteractions={2}
      reveal={() => {
        if (pairSeed === undefined) return <p>Run both 0% and 90% copying in one world to compare them.</p>;
        const [z, , n] = RUNS[pairSeed];
        return (
          <>
            <p>
              In world {pairSeed} (the table), the biggest page ended with {fmt(z.max[9])} links with no copying and{" "}
              {fmt(n.max[9])} with 90% copying: about {fmt(Math.round(n.max[9] / z.max[9]))} times more. The top 1% of pages went
              from holding {pct(z.top1[9])} of all links to {pct(n.top1[9])}.
            </p>
            <p>
              The last column is why. With 90% copying, {fmt(n.lead[9])} of the last 1,000 new links went to the page already in
              the lead; with none, {fmt(z.lead[9])}. A copier links to whatever a random link points at, so a page with 500 links is
              500 times more likely to be copied than a page with one.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ran-0", "pair"]}>
          {(reach) => {
            const run = (si: number) => {
              if (locked) return;
              setShown((v) => v.map((x, i) => (i === si ? true : x)));
              setActive(si);
              const next = [...recs.filter((r) => !(r.seed === seed && r.si === si)), { seed, si }];
              setRecs(next);
              if (si === 0) reach("ran-0");
              if (next.some((r) => r.seed === seed && r.si === 0) && next.some((r) => r.seed === seed && r.si === 2)) reach("pair");
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
                  World {seed} · {fmt(k * 1000)} pages so far
                </p>
                <svg viewBox={`0 0 ${W} 150`} className="stage-svg" role="img" aria-label="Links of the biggest page at each copying share">
                  <text x={X0} y={12} className={s.cap}>
                    links to the biggest page
                  </text>
                  {biggestShown > 0 &&
                    niceTicks(axis).map((t) => (
                      <g key={t}>
                        <line x1={xOf(t)} y1={18} x2={xOf(t)} y2={126} stroke="var(--line)" />
                        <text x={xOf(t)} y={140} textAnchor="middle" className={s.tick}>
                          {tickLabel(t)}
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
                    <Control key={c} className={shown[si] ? "active" : ""} disabled={locked || shown[si]} onClick={() => run(si)}>
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
                    Next world
                  </Control>
                </Row>
                {recs.length > 0 && (
                  <table className={s.res} aria-label="Your runs at 10,000 pages">
                    <thead>
                      <tr>
                        <th>At 10,000</th>
                        <th>biggest</th>
                        <th>top 1%</th>
                        <th>of last 1,000 links, to the leader</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...recs]
                        .sort((a, b) => a.seed - b.seed || a.si - b.si)
                        .map((r) => {
                          const R = RUNS[r.seed][r.si];
                          return (
                            <tr key={`${r.seed}-${r.si}`}>
                              <th>
                                world {r.seed}, {pct(SHARES[r.si])}
                              </th>
                              <td>{fmt(R.max[9])}</td>
                              <td>{pct(R.top1[9])}</td>
                              <td>{fmt(R.lead[9])}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
