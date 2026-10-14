"use client";

// All lines meet in one mother. Haploid Wright-Fisher traced backward: 50 women per generation; each
// generation back, every distinct maternal line (in order) draws its mother = floor(rand x 50) from
// mulberry32(seed). Lines that draw the same woman join and never split. The stage family is seed 7004
// (chosen: its meeting time, 99 generations, is near the mean; disclosed in claim c1). "Run 1,000
// families" runs seeds 7001-8000 with the same draw rule and shows where this family fell.
// Layout: each line's x is the mean x of its present-day descendants, so lines never cross.
// Milestones: one line left (her generation drawn), the 1,000-run tally, and the same 1,000 seeds
// at 25 and 100 women (v2, wave G r7: "about 2N" is shown, not told: the mean roughly doubles with N).
// v3 (learner r8): tree viewBox 360 × 201 with 12px labels, drawn at its natural height (never squeezed), so
// "common mother", "+ 49 others" and the axis read at about 10.7px on a 390px phone; histogram labels 11.5px.
// At the reveal the rule line, slider and buttons are hidden so the tree sits above the reveal on 390×844.
// The theory sentence (97 exact, 2N(1 − 1/N) = 98) left the reveal (c2 withdrawn; W-184).

import { Lesson } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const N = 50;
const STAGE_SEED = 7004;
const MAX_BACK = 120;
const RUN_SEEDS = { from: 7001, to: 8000 };
const MILESTONES = ["one-line", "thousand", "sizes"] as const;
const OTHER_SIZES = [25, 100] as const;

interface Line {
  x: number; // mean x of present-day descendants
  n: number; // number of present-day descendants
  parent: number; // index of this line's mother line in the next generation back
}

/** Generations until all n lines meet, with the lesson's draw rule (n women per generation). */
export function meetTime(seed: number, cap = 100_000, n = N) {
  const rng = mulberry32(seed);
  let k = n;
  let g = 0;
  while (k > 1 && g < cap) {
    const mothers = new Set<number>();
    for (let i = 0; i < k; i++) mothers.add(Math.floor(rng() * n));
    k = mothers.size;
    g++;
  }
  return g;
}

/** Full family tree for one seed, generations 0..MAX_BACK (identical draws to meetTime). */
export function family(seed: number, x0: number, pitch: number) {
  const rng = mulberry32(seed);
  const gens: Line[][] = [Array.from({ length: N }, (_, i) => ({ x: x0 + i * pitch, n: 1, parent: -1 }))];
  let T = 0;
  for (let g = 0; g < MAX_BACK; g++) {
    const cur = gens[g];
    const next: Line[] = [];
    const byMother = new Map<number, number>();
    for (const line of cur) {
      const m = cur.length > 1 ? Math.floor(rng() * N) : 0;
      let j = byMother.get(m);
      if (j === undefined) {
        j = next.length;
        byMother.set(m, j);
        next.push({ x: 0, n: 0, parent: -1 });
      }
      line.parent = j;
      next[j].x += line.x * line.n;
      next[j].n += line.n;
    }
    for (const l of next) l.x /= l.n;
    gens.push(next);
    if (next.length === 1 && T === 0) T = g + 1;
  }
  return { gens, T };
}

/** Exact expected meeting time for this discrete model (Markov chain on the number of lines). */
export function exactExpectation() {
  const E = new Array<number>(N + 1).fill(0);
  for (let k = 2; k <= N; k++) {
    // occupancy: probability that k draws from N women hit j distinct women
    let p = new Array<number>(k + 1).fill(0);
    p[0] = 1;
    for (let b = 0; b < k; b++) {
      const q = new Array<number>(k + 1).fill(0);
      for (let j = 0; j <= b; j++) {
        q[j] += (p[j] * j) / N;
        q[j + 1] += (p[j] * (N - j)) / N;
      }
      p = q;
    }
    let sum = 1;
    for (let j = 1; j < k; j++) sum += p[j] * E[j];
    E[k] = sum / (1 - p[k]);
  }
  return E[N];
}

// Geometry.
const X0 = 36;
const PITCH = 6.4;
const Y_TODAY = 177;
const H = 157;
const y = (g: number) => Y_TODAY - H * Math.sqrt(g / MAX_BACK);
const TREE = family(STAGE_SEED, X0, PITCH);
export const T = TREE.T;
export const APPROX = 2 * N * (1 - 1 / N);

function runThousand() {
  const times: number[] = [];
  for (let seed = RUN_SEEDS.from; seed <= RUN_SEEDS.to; seed++) times.push(meetTime(seed));
  const mean = times.reduce((a, b) => a + b, 0) / times.length;
  const bins = new Array<number>(20).fill(0);
  for (const t of times) bins[Math.min(19, Math.floor(t / 20))]++;
  return { times, mean, bins, allMet: times.every((t) => t < 100_000) };
}
export { runThousand };

/** Mean meeting time over the same 1,000 seeds for another population size. */
export function meanFor(n: number) {
  let sum = 0;
  for (let seed = RUN_SEEDS.from; seed <= RUN_SEEDS.to; seed++) sum += meetTime(seed, 100_000, n);
  return sum / (RUN_SEEDS.to - RUN_SEEDS.from + 1);
}
type Sizes = { n: number; mean: number }[];

type Runs = ReturnType<typeof runThousand>;

export default function AllLinesMeetInOneMother({ slug }: { slug: string }) {
  const [runs, setRuns] = useState<Runs | null>(null);
  const [sizes, setSizes] = useState<Sizes | null>(null);
  const mean = runs ? Math.round(runs.mean) : null;
  const sz = (n: number) => Math.round(sizes?.find((x) => x.n === n)?.mean ?? 0);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "50 women; each woman's mother is a random woman of the previous generation. Trace all 50 lines back. What happens?",
        options: ["They never all meet", "All meet in one woman", "They shrink to about half, then stop"],
        answer: 1,
      }}
      exploreHint="Step back and watch lines join where two women share a mother."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Every step back, some lines pick the same mother and join; joined lines never split. With only {N} women to
            choose from, joins continue until one line is left.
          </p>
          {mean !== null && (
            <p>
              Your lines met in one woman {T} generations back; 1,000 families of {N} averaged {mean}.
              {sizes
                ? ` With 25 women, ${sz(25)}; with 100, ${sz(100)}: double the women, roughly double the wait, about 2N generations.`
                : ""}
            </p>
          )}
          <p>She was not alone: {N - 1} other women lived beside her, but their lines did not reach today.</p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              atReveal={phase === "reveal"}
              runs={runs}
              sizes={sizes}
              onRun={() => {
                setRuns(runThousand());
                reach("thousand");
              }}
              onSizes={() => {
                setSizes(OTHER_SIZES.map((n) => ({ n, mean: meanFor(n) })));
                reach("sizes");
              }}
              onOneLine={() => reach("one-line")}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  atReveal,
  runs,
  sizes,
  onRun,
  onSizes,
  onOneLine,
}: {
  locked: boolean;
  atReveal: boolean;
  runs: Runs | null;
  sizes: Sizes | null;
  onRun: () => void;
  onSizes: () => void;
  onOneLine: () => void;
}) {
  const [backState, setBack] = useState(0);
  // v3: at the reveal the tree shows at least her generation, so the row the reveal quotes is on the stage.
  const back = atReveal ? Math.max(backState, T) : backState;
  const anim = useRef<number | null>(null);
  useEffect(() => () => {
    if (anim.current !== null) cancelAnimationFrame(anim.current);
  }, []);

  const go = (g: number) => {
    if (anim.current !== null) cancelAnimationFrame(anim.current);
    anim.current = null;
    const v = Math.max(0, Math.min(MAX_BACK, g));
    setBack(v);
    if (v >= T) onOneLine();
  };
  const climbToOne = () => {
    onOneLine();
    const from = back;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || from === T) {
      go(T);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const f = Math.min(1, (now - start) / 380);
      setBack(Math.round(from + (T - from) * f));
      anim.current = f < 1 ? requestAnimationFrame(tick) : null;
    };
    anim.current = requestAnimationFrame(tick);
  };

  const gens = TREE.gens;
  const linesNow = gens[back].length;
  const met = back >= T;
  const finalX = gens[T][0].x;

  // Segments and join dots up to `back`.
  const segs: [number, number, number, number][] = [];
  const joins: [number, number][] = [];
  for (let g = 0; g < back; g++) {
    const kids = new Array<number>(gens[g + 1].length).fill(0);
    for (const l of gens[g]) {
      const p = gens[g + 1][l.parent];
      segs.push([l.x, y(g), p.x, y(g + 1)]);
      kids[l.parent]++;
    }
    kids.forEach((c, j) => c >= 2 && joins.push([gens[g + 1][j].x, y(g + 1)]));
  }
  const firstJoin = gens[1].findIndex((_, j) => gens[0].filter((l) => l.parent === j).length >= 2);
  const showSameMother = !locked && back >= 1 && back <= 2 && firstJoin >= 0;

  const aria = locked
    ? "Today's 50 women. No lines traced yet."
    : met
      ? `All 50 lines meet in one woman ${T} generations back; she lived among ${N - 1} other women.` +
        (runs ? ` 1,000 runs: mean ${Math.round(runs.mean)} generations.` : "")
      : `${back} generations back: ${linesNow} lines.`;

  return (
    <div className={s.wrap}>
      {!atReveal && <p className={s.rule}>50 women per generation; each has a random mother from the one before.</p>}
      <svg viewBox="0 0 360 201" className={`stage-svg ${s.fit}`} role="img" aria-label={aria}>
        <line x1={14} y1={y(0)} x2={14} y2={y(MAX_BACK)} className={s.axis} />
        {[0, 5, 20, 50].map((g) => (
          <g key={g}>
            <line x1={11} y1={y(g)} x2={17} y2={y(g)} className={s.axis} />
            <text x={20} y={y(g) + 3} className={s.tick}>
              {g}
            </text>
          </g>
        ))}
        <text x={2} y={y(MAX_BACK) - 6} className={s.tick}>
          √ scale
        </text>

        {segs.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={s.lineage} />
        ))}
        {joins.map(([x, yy], i) => (
          <circle key={i} cx={x} cy={yy} r={1.8} className={s.join} />
        ))}
        {showSameMother && (
          <text x={gens[1][firstJoin].x} y={y(1) - 5} className={s.label}>
            same mother
          </text>
        )}

        {met && (
          <g>
            {Array.from({ length: N }, (_, i) => X0 + i * PITCH)
              .filter((x) => Math.abs(x - finalX) > PITCH / 2)
              .map((x, i) => (
                <circle key={i} cx={x} cy={y(T)} r={2.2} className={s.other} />
              ))}
            <circle cx={finalX} cy={y(T)} r={4.2} className={s.mother} />
            <text x={finalX} y={y(T) - 8} className={s.label}>
              common mother
            </text>
            <text x={X0 + (N - 1) * PITCH} y={y(T) + 16} className={s.labelEnd}>
              + {N - 1} others
            </text>
          </g>
        )}

        {gens[0].map((l, i) => (
          <circle key={i} cx={l.x} cy={y(0)} r={2.6} className={s.today} />
        ))}
        <text x={X0} y={196} className={s.tick}>
          today: 50 women
        </text>
      </svg>

      <div className={s.readout} aria-live="polite">
        <strong>
          {back} back: {linesNow} {linesNow === 1 ? "line" : "lines"}
        </strong>
        <span className={s.seed}>seed {STAGE_SEED}</span>
      </div>

      {runs && <Strip runs={runs} sizes={sizes} />}

      {!atReveal && (
        <>
      <div className={s.sliderWrap}>
        <Slider label="Generations back" value={back} min={0} max={MAX_BACK} disabled={locked} onChange={go} />
      </div>
      <div className={s.controls}>
        <Control className={s.tap} disabled={locked || back >= MAX_BACK} onClick={() => go(back + 10)}>
          Back 10
        </Control>
        <Control className={s.tap} disabled={locked || back === T} onClick={climbToOne}>
          Back to one line
        </Control>
        <Control className={s.tap} disabled={locked || runs !== null} onClick={onRun}>
          Run 1,000 families
        </Control>
        <Control className={s.tap} disabled={locked || runs === null || sizes !== null} onClick={onSizes}>
          25 and 100 women
        </Control>
      </div>
        </>
      )}
    </div>
  );
}

function Strip({ runs, sizes }: { runs: Runs; sizes: Sizes | null }) {
  const bx = (t: number) => 10 + (t / 400) * 340;
  const top = Math.max(...runs.bins);
  return (
    <div>
      <p className={s.stripHead}>
        1,000 runs: {runs.allMet ? "all met" : "not all met"}, mean {Math.round(runs.mean)}
      </p>
      {sizes && (
        <p className={s.stripHead} data-testid="sizes">
          Mean wait: {[...sizes.filter((x) => x.n < N), { n: N, mean: runs.mean }, ...sizes.filter((x) => x.n > N)]
            .map((x, i) => `${x.n}${i === 0 ? " women" : ""}: ${Math.round(x.mean)}`)
            .join(" · ")}
        </p>
      )}
      <svg viewBox="0 0 360 64" className={s.strip} role="img" aria-label={`Histogram of 1,000 meeting times; mean ${Math.round(runs.mean)}, yours ${T}`}>
        {runs.bins.map((c, i) => {
          const h = (c / top) * 30;
          return <rect key={i} x={bx(i * 20) + 1} y={32 - h} width={(20 / 400) * 340 - 2} height={h} className={s.bin} />;
        })}
        <line x1={bx(0)} y1={32} x2={bx(400)} y2={32} className={s.axis} />
        {[0, 100, 200, 300, 400].map((t) => (
          <text key={t} x={bx(t)} y={46} className={s.binTick}>
            {t}
          </text>
        ))}
        <line x1={bx(runs.mean)} y1={0} x2={bx(runs.mean)} y2={34} className={s.meanTick} />
        <line x1={bx(T)} y1={0} x2={bx(T)} y2={34} className={s.yoursTick} />
        <text x={bx(T) + 4} y={61} className={s.yours}>
          yours
        </text>
      </svg>
    </div>
  );
}
