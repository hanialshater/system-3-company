"use client";

// Empty ponds still left (brief: company/domains/briefs/life.ecology-body.md #3, check E3).
// 100 ponds; ponds 0-59 start with frogs. Drained ponds: index i with (i x 37) mod 100 below the drain count
// (37 is coprime with 100, so exactly that many are drained, mixing occupied and empty ponds).
// Each year, with n = ponds with frogs at the start of the year, in pond order: drained ponds stay empty
// (no draw); an occupied pond keeps its frogs if rand > 0.2; an empty good pond gains frogs if
// rand < 1 - 0.995^n. One mulberry32(seed) stream per run, as in the check script.
// Seed 1 is the start (shown); "New seed" steps to the next seed (1-12, cycling) and re-runs every drain the
// learner has tried, so the run log always shows one seed. In seeds 1-12, drain 70 always dies out by
// year 100 and drain 30 never does (claim c2, disclosed).
// Milestones: "smaller" (drain 30 or 50 seen) and "d70" (drain 70 seen, the question's case).
// Learner r10 (W-839): the refill formula moved off the stage (claim c5 source); the reveal's 60% line is now the
// average-model line, with drain 50's chance extinctions said (about half of runs die out).

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const PONDS = 100;
const START_OCC = 60;
const YEARS = 100;
const DIE = 0.2;
const COL = 0.005;
const SEEDS = 12;
const DRAINS = [30, 50, 70] as const;
type Drain = (typeof DRAINS)[number];
const MILESTONES = ["smaller", "d70"] as const;

const drainedAt = (drain: number) => (i: number) => (i * 37) % 100 < drain;

export interface PondRun {
  drain: number;
  seed: number;
  years: boolean[][]; // years[y][i]: frogs in pond i at year y
  start: number;
  end: number;
  extinctYear: number | null;
}

export function runPonds(drain: number, seed: number): PondRun {
  const rng = mulberry32(seed);
  const drained = drainedAt(drain);
  let occ = Array.from({ length: PONDS }, (_, i) => i < START_OCC && !drained(i));
  const years = [occ];
  let n = occ.filter(Boolean).length;
  const start = n;
  let extinctYear: number | null = null;
  for (let y = 1; y <= YEARS; y++) {
    const pcol = 1 - Math.pow(1 - COL, n);
    occ = occ.map((o, i) => (drained(i) ? false : o ? rng() > DIE : rng() < pcol));
    years.push(occ);
    n = occ.filter(Boolean).length;
    if (n === 0 && extinctYear === null) extinctYear = y;
  }
  return { drain, seed, years, start, end: n, extinctYear };
}

const result = (r: PondRun) => (r.extinctYear === null ? `${r.end} ponds` : `gone, year ${r.extinctYear}`);
const refill = (n: number) => Math.round((1 - Math.pow(1 - COL, n)) * 100);

// Grid geometry: 10 x 10 cells.
const CELL = 23;
const G = CELL * 10;

function Stage({
  locked,
  atReveal,
  drain,
  seed,
  log,
  onDrain,
  onSeed,
}: {
  locked: boolean;
  atReveal: boolean;
  drain: Drain | null;
  seed: number;
  log: Partial<Record<Drain, PondRun>>;
  onDrain: (d: Drain) => void;
  onSeed: () => void;
}) {
  const run = drain === null ? null : log[drain] ?? null;
  const [year, setYear] = useState(0);
  const anim = useRef<number | null>(null);
  useEffect(() => {
    if (anim.current !== null) cancelAnimationFrame(anim.current);
    if (!run) {
      setYear(0);
      return;
    }
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setYear(YEARS);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const f = Math.max(0, Math.min(1, (now - t0) / 350));
      setYear(Math.round(YEARS * f));
      anim.current = f < 1 ? requestAnimationFrame(tick) : null;
    };
    setYear(0);
    anim.current = requestAnimationFrame(tick);
    return () => {
      if (anim.current !== null) cancelAnimationFrame(anim.current);
    };
  }, [run]);

  const drained = drainedAt(drain ?? 0);
  const occ = run ? run.years[Math.max(0, Math.min(YEARS, year))] : Array.from({ length: PONDS }, (_, i) => i < START_OCC);
  const count = occ.filter(Boolean).length;
  const good = PONDS - (drain ?? 0);
  const done = run !== null && year === YEARS;

  const head = locked || !run
    ? `${count} of ${PONDS} ponds have frogs`
    : `year ${year}: ${count} ${count === 1 ? "pond" : "ponds"} with frogs, ${good} good ponds`;
  const logLine = DRAINS.filter((d) => log[d]).map((d, i) => `${d}${i ? "" : " drained"}: ${result(log[d]!)}`).join(" · ");

  return (
    <div className={s.wrap}>
      {!atReveal && (
        <p className={s.msg}>
          {locked
            ? "100 ponds. Each year frogs die out in some ponds, and frogs from occupied ponds settle empty ones."
            : "Each year a frog pond empties with chance 20%; an empty pond refills more often when more ponds have frogs."}
        </p>
      )}
      {!atReveal && <p className={s.head} data-testid="pond-head">{head}</p>}
      <svg viewBox={`0 0 ${G} ${G + 14}`} className={`stage-svg ${s.grid}`} role="img"
        aria-label={`${head}. ${drain ? `${drain} ponds drained.` : "No ponds drained."} Seed ${seed}.`}>
        {occ.map((o, i) => {
          const x = (i % 10) * CELL;
          const y = Math.floor(i / 10) * CELL;
          if (drained(i))
            return (
              <g key={i}>
                <rect x={x + 2} y={y + 2} width={CELL - 4} height={CELL - 4} rx={4} className={s.drained} />
                <path d={`M${x + 7},${y + 7}L${x + CELL - 7},${y + CELL - 7}M${x + CELL - 7},${y + 7}L${x + 7},${y + CELL - 7}`} className={s.cross} />
              </g>
            );
          return <circle key={i} cx={x + CELL / 2} cy={y + CELL / 2} r={CELL / 2 - 3} className={o ? s.frogs : s.empty} />;
        })}
        <text x={0} y={G + 12} className={s.key}>● frogs ○ empty ⊠ drained</text>
        <text x={G} y={G + 12} textAnchor="end" className={s.key}>seed {seed}</text>
      </svg>
      {logLine && <p className={s.log} data-testid="pond-log">{logLine}</p>}
      {run && done && !atReveal && (
        <p className={s.log}>
          Start: {run.start} frog ponds, refill chance {refill(run.start)}% a year
        </p>
      )}
      <div className={s.buttons}>
        {DRAINS.map((d) => (
          <Control key={d} className={drain === d ? "active" : ""} disabled={locked || drain === d} onClick={() => onDrain(d)}>
            Drain {d}
          </Control>
        ))}
        <Control disabled={locked || drain === null} onClick={onSeed}>
          New seed
        </Control>
      </div>
    </div>
  );
}

export default function EmptyPondsStillLeft({ slug }: { slug: string }) {
  const [drain, setDrain] = useState<Drain | null>(null);
  const [seed, setSeed] = useState(1);
  const [log, setLog] = useState<Partial<Record<Drain, PondRun>>>({});
  const r70 = log[70];
  const small = log[30] ?? log[50];
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "We drain 70 ponds. 30 good ponds are left, 19 with frogs. After 100 years, how many ponds have frogs?",
        options: ["19 or more", "About 10", "None"],
        answer: 2,
      }}
      exploreHint="Drain 30, 50 and 70 ponds and watch 100 years run."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          {r70 && small && (
            <p>
              With 70 ponds drained, the frogs were gone by year {r70.extinctYear ?? YEARS}, though 30 good ponds were still
              there. Draining {small.drain} left{" "}
              {small.extinctYear === null ? `frogs in ${small.end} ponds` : `frogs until year ${small.extinctYear}`}.
            </p>
          )}
          <p>
            Ponds lose their frogs now and then, and only other ponds&apos; frogs refill them: with few frog ponds, refills
            come too slowly. Averaged out, frogs vanish once 60% are drained, the share that had them. Short of that, bad luck can
            still end them: drained 50, half the runs die out. Habitat can outlast its
            species. Toy model.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              atReveal={phase === "reveal"}
              drain={drain}
              seed={seed}
              log={log}
              onDrain={(d) => {
                setDrain(d);
                setLog((l) => ({ ...l, [d]: runPonds(d, seed) }));
                reach(d === 70 ? "d70" : "smaller");
              }}
              onSeed={() => {
                const next = (seed % SEEDS) + 1;
                setSeed(next);
                setLog((l) => {
                  const out: Partial<Record<Drain, PondRun>> = {};
                  for (const d of DRAINS) if (l[d]) out[d] = runPonds(d, next);
                  return out;
                });
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
