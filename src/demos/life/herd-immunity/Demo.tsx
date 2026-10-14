"use client";

// Herd immunity in the simplest honest model: a town of 400 where every case
// meets 4 people chosen at random from the whole town (homogeneous mixing).
// Immune people can't catch it or pass it on. The learner sets the immune
// share and steps an outbreak forward generation by generation.
//
// v2 (revision): R0 is named on the stage, with the model label. The immune share is a row of
// chips (50-90%) placed after the run controls; once an outbreak is over, changing the share shows
// the same seeded outbreak's end at the new share, so a learner can compare across the threshold.
// The reveal is gated on two finished outbreaks: one above the 75% threshold and one below it that
// took off. The reveal quotes the runs the learner finished.

import { useEffect, useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const N = 400;
const COLS = 20;
const CELL = 15;
const R0 = 4;
const RUNS = 200;
const THRESHOLD = Math.round((1 - 1 / R0) * 100); // 75
const SHARES = [50, 60, 70, 75, 80, 90];
const START = 80;
/** A finished outbreak "took off" if it reached more than a fifth of the unprotected. */
const TOOK_OFF = 0.2;
const MILESTONES = ["over-above", "took-off-below", "at-threshold"] as const;

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

interface Outbreak {
  immune: boolean[];
  /** gens[t] = people newly infected at step t; gens[0] = [patient zero]. */
  gens: number[][];
  /** links[t] = [infector, infected] pairs that produced gens[t]. */
  links: [number, number][][];
  unprotected: number;
}

function simulate(seed: number, immunePct: number): Outbreak {
  const r = rng(seed * 7919 + 17);
  const idx = Array.from({ length: N }, (_, i) => i);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const nImmune = Math.round((immunePct / 100) * N);
  const immune = Array(N).fill(false);
  for (let k = 0; k < nImmune; k++) immune[idx[k]] = true;
  const infected = Array(N).fill(false);
  const zero = idx[nImmune];
  infected[zero] = true;
  const gens: number[][] = [[zero]];
  const links: [number, number][][] = [[]];
  let current = [zero];
  while (current.length) {
    const next: number[] = [];
    const ln: [number, number][] = [];
    for (const i of current) {
      for (let c = 0; c < R0; c++) {
        // A contact with anyone else in town, chosen at random.
        let j = Math.floor(r() * (N - 1));
        if (j >= i) j++;
        if (!immune[j] && !infected[j]) {
          infected[j] = true;
          next.push(j);
          ln.push([i, j]);
        }
      }
    }
    if (next.length) {
      gens.push(next);
      links.push(ln);
    }
    current = next;
  }
  return { immune, gens, links, unprotected: N - nImmune };
}

function typical(immunePct: number) {
  let total = 0;
  let unprotected = 0;
  for (let k = 1; k <= RUNS; k++) {
    const o = simulate(k, immunePct);
    total += o.gens.reduce((a, g) => a + g.length, 0);
    unprotected = o.unprotected;
  }
  return { mean: total / RUNS, unprotected };
}

const xy = (i: number) => ({ x: (i % COLS) * CELL + CELL / 2, y: Math.floor(i / COLS) * CELL + CELL / 2 });

type Result = { caught: number; of: number };

function Gate({ interact, tried }: { interact: () => void; tried: Record<number, Result> }) {
  const { reach } = useMilestones(interact, MILESTONES);
  useEffect(() => {
    for (const [p, r] of Object.entries(tried)) {
      if (Number(p) > THRESHOLD) reach("over-above");
      if (Number(p) === THRESHOLD) reach("at-threshold");
      if (Number(p) < THRESHOLD && r.caught > TOOK_OFF * r.of) reach("took-off-below");
    }
  });
  return null;
}

export default function HerdImmunity({ slug }: { slug: string }) {
  const [immunePct, setImmunePct] = useState(START);
  const [seed, setSeed] = useState(1);
  const [t, setT] = useState(0);
  const [tried, setTried] = useState<Record<number, Result>>({});

  const ob = useMemo(() => simulate(seed, immunePct), [seed, immunePct]);
  const avg = useMemo(() => typical(immunePct), [immunePct]);
  const last = ob.gens.length; // t >= last means the outbreak is over
  const done = t >= last;
  const caught = ob.gens.slice(0, Math.min(t + 1, last)).reduce((a, g) => a + g.length, 0);
  const totalCaught = ob.gens.reduce((a, g) => a + g.length, 0);

  // Record every outbreak the learner sees to its end, at the share it ran at.
  useEffect(() => {
    if (done) setTried((m) => ({ ...m, [immunePct]: { caught: totalCaught, of: ob.unprotected } }));
  }, [done, immunePct, totalCaught, ob.unprotected]);

  const status = useMemo(() => {
    const st: ("immune" | "open" | "sick" | "had")[] = ob.immune.map((im) => (im ? "immune" : "open"));
    ob.gens.forEach((g, k) => {
      if (k > t) return;
      for (const p of g) st[p] = k === t ? "sick" : "had";
    });
    return st;
  }, [ob, t]);

  const unprotectedShare = 100 - immunePct;
  const reff = R0 * (unprotectedShare / 100);
  const below = immunePct < THRESHOLD;
  const reffNote = reff < 0.995 ? "shrinks" : reff > 1.005 ? "can grow" : "just replaces itself";

  const message = done
    ? below && totalCaught <= TOOK_OFF * ob.unprotected
      ? `Over: ${totalCaught} of ${ob.unprotected}. Fizzled by luck. Try a new one.`
      : `Over. ${totalCaught} of ${ob.unprotected} unprotected caught it.`
    : t === 0
      ? "One unprotected person falls sick."
      : `Step ${t}: ${ob.gens[t].length} new case${ob.gens[t].length === 1 ? "" : "s"}.`;

  // The reveal quotes two of the learner's finished runs: one above the threshold (nearest 80%)
  // and the lowest-share run below it that took off.
  const all = Object.entries(tried).map(([p, r]) => ({ p: Number(p), ...r }));
  const above = all.filter((x) => x.p > THRESHOLD).sort((a, b) => Math.abs(a.p - START) - Math.abs(b.p - START))[0];
  const belowRun = all.filter((x) => x.p < THRESHOLD && x.caught > TOOK_OFF * x.of).sort((a, b) => a.p - b.p)[0];
  const atRun = all.find((x) => x.p === THRESHOLD);
  const seen = [above, atRun, belowRun].filter((x): x is (typeof all)[number] => Boolean(x));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Toy town of 400. With no immunity, each sick person would infect about 4 others (that number is called R0). Here 80% are immune, leaving 80 unprotected. One falls sick. Usually, how many of the 80 catch it?",
        options: ["Nearly all 80", "About 20", "Just a handful"],
        answer: 2,
      }}
      exploreHint="Run the outbreak at 80% to the end. Then try 50%, 70% and 75%, and watch the number under Each case infects."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You saw {seen.map((x) => `${x.caught} of ${x.of} catch it at ${x.p}% immune`).join("; ")}. Each case meets
            R0 = 4 people; at 80% immune only 20% of them can catch it: 4 &times; 0.2 = 0.8 new cases per case, under 1,
            so outbreaks shrink. One run is noisy; the average over many runs is about 4 of the 80.
          </p>
          <p>
            At <strong>{THRESHOLD}% immune</strong> each case infects 4 &times; 0.25 = exactly 1: it only replaces itself.
            That is the threshold (1 &minus; 1/R0). Below {THRESHOLD}% immune a case more than replaces itself and an outbreak can take
            off, though it may still fizzle by luck. Above it, the immune mostly shield people with no immunity.
          </p>
          <p className="muted">
            Toy model: made-up disease, random mixing, perfect immunity (real vaccines are not). Unprotected people who
            cluster together can keep outbreaks going even above the threshold.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <Gate interact={interact} tried={tried} />
          <p className={s.model}>Toy disease. R0 = 4: with no immunity, each case meets and infects 4 random people.</p>
          <svg
            viewBox={`0 0 ${COLS * CELL} ${(N / COLS) * CELL}`}
            className={`stage-svg ${s.svg}`}
            role="img"
            aria-label={`Town of 400: ${immunePct}% immune, ${caught} caught it so far`}
          >
            {!done &&
              ob.links[t].map(([a, b], k) => {
                const p = xy(a);
                const q = xy(b);
                return <line key={k} x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={s.link} />;
              })}
            {status.map((st, i) => {
              const p = xy(i);
              return <circle key={i} cx={p.x} cy={p.y} r={st === "sick" ? 6.2 : 5} className={s[st]} />;
            })}
          </svg>

          <div className={s.legend} aria-hidden>
            <span><i className={s.immune} />immune</span>
            <span><i className={s.open} />unprotected</span>
            <span><i className={s.sick} />sick now</span>
            <span><i className={s.had} />had it</span>
          </div>

          <p className={s.msg} aria-live="polite">{locked ? "Make a prediction to start." : message}</p>

          <Row>
            <Readout label="Each case infects" value={`4 × ${unprotectedShare}% = ${reff.toFixed(1)} (${reffNote})`} />
            <Readout label={`Average, ${RUNS} runs`} value={locked ? "?" : `${Math.round(avg.mean)} of ${avg.unprotected}`} />
          </Row>

          {/* DOM order is Next, Run, shares, New outbreak (so each control pressed once in order
              compares a finished outbreak across shares); CSS order puts New outbreak on the first line. */}
          <div className={s.controls}>
            <Control disabled={locked || done} onClick={() => setT(t + 1)}>
              Next step
            </Control>
            <Control disabled={locked || done} onClick={() => setT(last)}>
              Run to end
            </Control>
            <div className={s.shares} role="group" aria-label="Immune share, percent">
              <span className="muted small">Immune %:</span>
              {SHARES.map((p) => (
                <Control
                  key={p}
                  className={p === immunePct ? "active" : ""}
                  disabled={locked || p === immunePct}
                  aria-pressed={p === immunePct}
                  aria-label={`${p}% immune`}
                  onClick={() => {
                    setImmunePct(p);
                    // An outbreak that was over stays over: show how the same outbreak ends at the new share.
                    setT(done ? Number.MAX_SAFE_INTEGER : 0);
                  }}
                >
                  {p}
                </Control>
              ))}
            </div>
            <Control
              className={s.newRun}
              disabled={locked}
              onClick={() => {
                setSeed((x) => x + 1);
                setT(0);
              }}
            >
              New outbreak
            </Control>
          </div>
        </div>
      )}
    </Lesson>
  );
}
