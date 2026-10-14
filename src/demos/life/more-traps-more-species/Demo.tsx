"use client";

// More traps, more species? (brief: company/domains/briefs/life.ecology-body.md #6, check E6).
// A made-up forest of 40 species; species i makes up a share proportional to 0.88^i (commonest 12.1%, rarest
// 0.08%). Insects are caught one at a time: each draw u = rand() picks the species by walking the shares in
// order, as in the check script. One cumulative catch of 5,000 per seed, from mulberry32(seed).
// Seed 2 is the start, chosen because its 50-insect count (20) is near the average 18.9 (disclosed in claim c1);
// "New forest seed" steps 2 -> 3 -> 1 -> 2 and re-runs the current catch size (seeds 2 and 3 share 34 at 500 and 40
// at 5,000 by coincidence: 20/34/40 and 17/34/40). The reveal returns to seed 2.
// The strip under the chart shows the 40 species from commonest to rarest, filled when found: the commonest
// fill in the first few dozen insects, the rare tail last.
// Milestones: "c500" (500 caught, the question's case) and "c5000". At the reveal the catch is set to 5,000, so
// the 50, 500 and 5,000 counts it quotes are all marked on the curve.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const S = 40;
const RATIO = 0.88;
const MAX = 5000;
const SIZES = [50, 500, 5000] as const;
type Size = (typeof SIZES)[number];
const SEED_CYCLE = [2, 3, 1] as const;
const MILESTONES = ["c500", "c5000"] as const;

const weights = Array.from({ length: S }, (_, i) => Math.pow(RATIO, i));
const total = weights.reduce((a, b) => a + b, 0);
export const SHARES = weights.map((w) => w / total);

export interface Catch {
  seed: number;
  found: number[]; // found[k] = species found after k insects (found[0] = 0)
  firstAt: number[]; // insect number at which species i was first caught (Infinity if never)
}

export function catchInsects(seed: number): Catch {
  const rng = mulberry32(seed);
  const seen = new Set<number>();
  const found = [0];
  const firstAt = new Array<number>(S).fill(Infinity);
  for (let k = 1; k <= MAX; k++) {
    let u = rng();
    let i = 0;
    while (i < S - 1 && u > SHARES[i]) {
      u -= SHARES[i];
      i++;
    }
    if (!seen.has(i)) {
      seen.add(i);
      firstAt[i] = k;
    }
    found.push(seen.size);
  }
  return { seed, found, firstAt };
}

const CATCHES: Record<number, Catch> = { 1: catchInsects(1), 2: catchInsects(2), 3: catchInsects(3) };
const fmt = (n: number) => n.toLocaleString("en-US");

// Chart geometry (linear x from 0 to 5,000; learner r10, W-840: the old log axis drew the slowing as a steady ramp).
const W = 356, H = 178;
const X0 = 34, X1 = 340, Y0 = 10, Y1 = 150;
const YMAX = 50;
const X = (n: number) => X0 + (n / MAX) * (X1 - X0);
const Y = (k: number) => Y1 - (k / YMAX) * (Y1 - Y0);
const samples = (() => {
  const out: number[] = [];
  for (let m = 0; m <= 200; m += 2) out.push(m);
  for (let m = 225; m <= MAX; m += 25) out.push(m);
  return out;
})();
const TICKS = [0, 1000, 2000, 3000, 4000, 5000];

function Stage({ locked, size, seed, onSize, onSeed }: { locked: boolean; size: Size | null; seed: number; onSize: (n: Size) => void; onSeed: () => void }) {
  const c = CATCHES[seed];
  const n = size ?? 0;
  const k = c.found[n];
  const pts = samples.filter((m) => m <= n);
  if (n && pts[pts.length - 1] !== n) pts.push(n);
  const d = pts.map((m, i) => `${i ? "L" : "M"}${X(m).toFixed(1)},${Y(c.found[m]).toFixed(1)}`).join(" ");
  const cellW = (X1 - X0) / S;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Team A catches 50 insects in a forest and finds 20 species. Team B catches 500 in the same forest."
          : "A made-up forest: a few common species, many rare ones. Insects caught one at a time at random."}
      </p>
      <p className={s.readout} data-testid="caught">
        {size === null ? "caught: 0 · species found: 0" : `caught: ${fmt(n)} · species found: ${k}`}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
        aria-label={size === null ? "Empty chart: species found against insects caught" : `Seed ${seed}: ${fmt(n)} insects caught, ${k} species found`}>
        {[0, 10, 20, 30, 40, 50].map((v) => (
          <g key={v}>
            <line x1={X0} x2={X1} y1={Y(v)} y2={Y(v)} className={s.grid} />
            <text x={X0 - 4} y={Y(v) + 4} textAnchor="end" className={s.tick}>{v}</text>
          </g>
        ))}
        {TICKS.map((m) => (
          <g key={m}>
            <line x1={X(m)} x2={X(m)} y1={Y1} y2={Y1 + 4} className={s.axis} />
            <text x={X(m)} y={Y1 + 15} textAnchor={m === MAX ? "end" : m === 0 ? "start" : "middle"} className={s.tick}>{fmt(m)}</text>
          </g>
        ))}
        <text x={X(2500)} y={Y1 + 27.5} textAnchor="middle" className={s.tick}>insects caught</text>
        {size !== null && <path d={d} className={s.curve} />}
        {size !== null &&
          SIZES.filter((m) => m <= n).map((m) => (
            <g key={m}>
              <circle cx={X(m)} cy={Y(c.found[m])} r={3.5} className={s.dot} />
              <text x={X(m) + (m === MAX ? -6 : 6)} y={Y(c.found[m]) + (m === 50 ? 4 : m === 500 ? 15 : -7)} textAnchor={m === MAX ? "end" : "start"} className={s.count}>
                {m === MAX ? c.found[m] : `${c.found[m]} at ${fmt(m)}`}
              </text>
            </g>
          ))}
      </svg>
      <svg viewBox={`0 0 ${W} 30`} className={`stage-svg ${s.strip}`} role="img"
        aria-label={`${k} of the forest's species found so far, commonest first`}>
        {Array.from({ length: S }, (_, i) => (
          <rect key={i} x={X0 + i * cellW + 0.6} y={2} width={cellW - 1.2} height={11} rx={1.5}
            className={size !== null && c.firstAt[i] <= n ? s.found : s.missing} />
        ))}
        <text x={X0} y={26} className={s.tick}>commonest species</text>
        <text x={X1} y={26} textAnchor="end" className={s.tick}>rarest</text>
      </svg>
      <Row>
        {SIZES.map((m) => (
          <Control key={m} className={size === m ? "active" : ""} disabled={locked || size === m} onClick={() => onSize(m)}>
            Catch {fmt(m)}
          </Control>
        ))}
      </Row>
      <Row>
        <Control disabled={locked || size === null} onClick={onSeed}>
          New forest seed (now {seed})
        </Control>
      </Row>
    </div>
  );
}

export default function MoreTrapsMoreSpecies({ slug }: { slug: string }) {
  const [size, setSize] = useState<Size | null>(null);
  const [seed, setSeed] = useState<number>(2);
  const c = CATCHES[seed];
  const k50 = c.found[50], k500 = c.found[500], k5000 = c.found[5000];
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "How many species does Team B find?",
        options: ["About 200", "About 35", "About 20"],
        answer: 1,
      }}
      exploreHint="Catch 50, then 500, then 5,000. Watch the curve and the species strip."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Ten times the catch found {k500} species, not 200: {k500 < 2 * k50 ? "under" : "about"} twice the {k50} at 50.
            Common species turn up in the first few dozen insects. After that most of the catch is repeats, and each new
            species is a rarer one. {fmt(MAX)} insects found {k5000 === S ? `all ${S}` : `${k5000} of ${S}`}.
          </p>
          <p>
            So a species count depends on how hard you looked: compare two places only at the same catch size. A made-up
            forest.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <RevealSync atReveal={phase === "reveal"} onOpen={() => { setSize(5000); setSeed(2); }}>
              <Stage
                locked={locked}
                size={size}
                seed={seed}
                onSize={(m) => {
                  setSize(m);
                  if (m === 500) reach("c500");
                  if (m === 5000) reach("c5000");
                }}
                onSeed={() => setSeed((v) => SEED_CYCLE[(SEED_CYCLE.indexOf(v as 2 | 3 | 1) + 1) % SEED_CYCLE.length])}
              />
            </RevealSync>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

/** When the reveal opens, show the full 5,000 catch of the question's forest (seed 2: 20 at 50, as the question
 *  says) so every count the reveal quotes is marked and matches the question (learner r10, W-840). */
function RevealSync({ atReveal, onOpen, children }: { atReveal: boolean; onOpen: () => void; children: ReactNode }) {
  const open = useRef(onOpen);
  open.current = onOpen;
  useEffect(() => {
    if (atReveal) open.current();
  }, [atReveal]);
  return <>{children}</>;
}
