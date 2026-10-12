"use client";

// Herd immunity in the simplest honest model: a town of 400 where every case
// meets 4 people chosen at random from the whole town (homogeneous mixing).
// Immune people can't catch it or pass it on. The learner sets the immune
// share and steps an outbreak forward generation by generation.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const N = 400;
const COLS = 20;
const CELL = 15;
const R0 = 4;
const RUNS = 200;

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

export default function HerdImmunity({ slug }: { slug: string }) {
  const [immunePct, setImmunePct] = useState(80);
  const [seed, setSeed] = useState(1);
  const [t, setT] = useState(0);
  const [tried, setTried] = useState<Record<number, number>>({});

  const ob = useMemo(() => simulate(seed, immunePct), [seed, immunePct]);
  const avg = useMemo(() => typical(immunePct), [immunePct]);
  const last = ob.gens.length; // t === last means the outbreak is over
  const done = t >= last;
  const caught = ob.gens.slice(0, Math.min(t + 1, last)).reduce((a, g) => a + g.length, 0);
  const totalCaught = ob.gens.reduce((a, g) => a + g.length, 0);

  const status = useMemo(() => {
    const st: ("immune" | "open" | "sick" | "had")[] = ob.immune.map((im) => (im ? "immune" : "open"));
    ob.gens.forEach((g, k) => {
      if (k > t) return;
      for (const p of g) st[p] = k === t ? "sick" : "had";
    });
    return st;
  }, [ob, t]);

  const reff = R0 * (1 - immunePct / 100);
  const finish = (to: number) => {
    setT(to);
    if (to >= last) setTried((m) => ({ ...m, [immunePct]: totalCaught }));
  };

  const message = done
    ? `Over. ${totalCaught} of ${ob.unprotected} unprotected caught it.`
    : t === 0
      ? "One unprotected person falls sick."
      : `Step ${t}: ${ob.gens[t].length} new case${ob.gens[t].length === 1 ? "" : "s"}.`;

  const seen = Object.entries(tried)
    .map(([p, c]) => ({ p: Number(p), c }))
    .sort((a, b) => b.p - a.p);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In a town of 400 with no immunity, each case infects about 4 others. Here 80% are immune, leaving 80 unprotected. One of them falls sick. Usually, how many of the 80 catch it?",
        options: ["Nearly all 80", "About 20", "Just a handful"],
        answer: 2,
      }}
      exploreHint="Step the outbreak forward. Then drop immunity to 50% and run it again."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {seen.length > 0 && `You saw ${seen.map((x) => `${x.c} caught it at ${x.p}% immune`).join("; ")}. `}
            Each case meets 4 people, but at 80% immune only about 0.8 of them can catch it. Every step tends to be
            smaller than the last, so the chain dies: typically about 4 of the 80, counting the first.
          </p>
          <p>
            At 50% each case makes about 2 more, and most of the unprotected catch it. The tipping point is where a case
            replaces itself exactly once: immune share 1 &minus; 1/R0 = <strong>75%</strong> here. Above it, the immune
            shield people who have no immunity at all.
          </p>
          <p className="muted">
            This is a simple model: everyone mixes at random and immunity is perfect. In real towns, unprotected people
            who cluster together can keep an outbreak going even above the threshold.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${COLS * CELL} ${(N / COLS) * CELL}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Town of 400: ${immunePct}% immune, ${caught} caught it so far`}>
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
            <Slider
              label="Immune"
              value={immunePct}
              min={0}
              max={95}
              step={5}
              format={(v) => `${v}%`}
              disabled={locked}
              onChange={(v) => {
                setImmunePct(v);
                setT(0);
                interact();
              }}
            />
          </Row>
          <Row>
            <Control
              disabled={locked || done}
              onClick={() => {
                finish(t + 1);
                interact();
              }}
            >
              Next step
            </Control>
            <Control
              disabled={locked || done}
              onClick={() => {
                finish(last);
                interact();
              }}
            >
              Run to end
            </Control>
            <Control
              disabled={locked}
              onClick={() => {
                setSeed((x) => x + 1);
                setT(0);
                interact();
              }}
            >
              New outbreak
            </Control>
          </Row>
          <Row>
            <Readout label="Each case infects" value={`≈ ${reff.toFixed(1)}`} />
            <Readout label={`Typical, ${RUNS} runs`} value={locked ? "?" : `${Math.round(avg.mean)} of ${avg.unprotected}`} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
