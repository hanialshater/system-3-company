"use client";

// Schelling on New York, v3: what a sorting model can and cannot say.
// Spec: company/design/specs/schelling-on-new-york-v3.md, with the design review
// company/design/reviews/2026-10-14-design-review-schelling-v3.md (D1-D12) and the cultural ruling
// company/reviews/schelling-on-new-york/2026-10-14-cultural-review-2.md, pass 4, folded in.
// The engine is ./engine.ts (lesson one's rule plus walls outside the city mask; check.mjs shows
// the frames match abm.ts and the brief's check script). Every run is computed in full from its
// seed, so Step, Run and the box chips all show frames of one run.
//
// v3 in one line: the learner runs the same rule on two random mixes, and the reveal pins both
// settled grids side by side, so the picture itself shows the clumps landing in different places.

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import { run, dissimilarity, oneGroupBoxes, MASK, N, CAP, type Run } from "./engine";
import s from "./styles.module.css";

/** The rule's setting. Fixed (design review D5: the slider is removed; the cap stays 30%,
 * cultural review 2 ruling (a)). */
const PCT = 30;
/** Box sizes. 1 x 1 is dropped (spec section 3). */
const KS = [2, 4, 8];
/** Seeds 1 to 50 in order, without 3 and 36 (the two seeds whose settled frame at 30% leaves one
 * region of the city more than 90% one group: an edge artefact, cultural review R2). New mix
 * cycles through this list and wraps; check.mjs scans every frame of every one of them. */
const SEEDS = Array.from({ length: 50 }, (_, i) => i + 1).filter(
  (x) => x !== 3 && x !== 36,
);
const MILESTONES = ["settled-30", "second-mix", "other-box"] as const;

const cache = new Map<number, Run>();
function getRun(seed: number) {
  let r = cache.get(seed);
  if (!r) cache.set(seed, (r = run(seed, PCT)));
  return r;
}
const end = (r: Run) => r.frames.length - 1;
const d2 = (v: number) => v.toFixed(2);
const D = (frame: Uint8Array, k: number) => d2(dissimilarity(frame, N, k));
/** Would move, as a whole percent rounded up: 0% only when nobody would move (spec section 4). */
const movePct = (r: Run, t: number) => Math.ceil((100 * r.movers[t]) / r.agents);

/** One-group boxes and their share of the boxes that hold a household (rounded, as shown). */
function boxes(frame: Uint8Array, k: number) {
  const b = oneGroupBoxes(frame, N, k);
  return { ...b, pct: Math.round((100 * b.one.length) / b.held) };
}

/** Land as row runs, drawn once: the city's shape, no region outlines (R2). */
const LAND = (() => {
  let d = "";
  for (let y = 0; y < N; y++) {
    let x = 0;
    while (x < N) {
      if (!MASK[y * N + x]) {
        x++;
        continue;
      }
      const x0 = x;
      while (x < N && MASK[y * N + x]) x++;
      d += `M${x0} ${y}h${x - x0}v1h-${x - x0}z`;
    }
  }
  return d;
})();

/** Box lattice on the cell boundaries (the gutters between marks). Clipped to land where drawn. */
const lattice = (k: number) => {
  let d = "";
  for (let v = k; v < N; v += k) d += `M${v} 0V${N}M0 ${v}H${N}`;
  return d;
};

/** One square outline per one-group box, inset so it never touches a lattice line and never
 * joins a neighbour (cultural pass 4, ruling 1: per box, never merged, never filled). */
function outlines(frame: Uint8Array, k: number, inset: number) {
  const { one, nb } = boxes(frame, k);
  let d = "";
  const w = k - 2 * inset;
  for (const q of one) {
    const x = (q % nb) * k + inset;
    const y = Math.floor(q / nb) * k + inset;
    d += `M${x} ${y}h${w}v${w}h${-w}z`;
  }
  return d;
}

/** Group A squares, group B circles (shape is the second cue, R5). */
function paths(frame: Uint8Array, dx = 0) {
  let a = "";
  let b = "";
  for (let i = 0; i < frame.length; i++) {
    const g = frame[i];
    if (g !== 1 && g !== 2) continue;
    const x = (i % N) + dx;
    const y = (i - (i % N)) / N;
    if (g === 1) a += `M${x + 0.13} ${y + 0.13}h0.74v0.74h-0.74z`;
    else
      b += `M${x + 0.08} ${y + 0.5}a0.42 0.42 0 1 0 0.84 0a0.42 0.42 0 1 0 -0.84 0`;
  }
  return [a, b];
}

/** Inline SVG legend swatches, drawn by the same mark code as the grid (design review D8). */
const Swatch = ({ g }: { g: 1 | 2 }) => {
  const [a, b] = paths(Uint8Array.of(g));
  return (
    <svg viewBox="0 0 1 1" className={s.glyph} aria-hidden>
      <path d={g === 1 ? a : b} className={g === 1 ? s.a : s.b} />
    </svg>
  );
};

const S1 = (
  <>
    Made-up model: each <Swatch g={1} /> A or <Swatch g={2} /> B is one
    household. Not New York&apos;s people.
  </>
);
const S4 = "Not modelled: money, prices, history, who was allowed to live where.";

/** Grid side in px: 300 when the explore stage has room, down to 246 (6 px cells, ABM rule 1). */
const FLOOR = 6 * (N + 1);
function Fit({
  phase,
  children,
}: {
  phase: string;
  children: (r: RefObject<HTMLDivElement | null>, px: number) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [px, setPx] = useState(300);
  // The explore stage is taller than the predict one (the question panel shrinks): start again
  // from 300 px when the phase changes, then shrink to fit.
  const [was, setWas] = useState(phase);
  if (was !== phase) {
    setWas(phase);
    setPx(300);
  }
  useEffect(() => {
    const st = ref.current?.closest('[data-testid="stage"]');
    if (!st || phase === "reveal") return;
    const over = st.scrollHeight - st.clientHeight;
    if (over > 0 && px > FLOOR) setPx(Math.max(FLOOR, px - over));
  });
  return <>{children(ref, px)}</>;
}

/** What the learner has done. Records only grow, so Reset never changes what the reveal quotes. */
interface Rec {
  /** Seeds with a finished (settled) 30% run, with the order in which each was last recorded. */
  settled: Map<number, number>;
  /** (seed, k) pairs that were on the stage in explore, with the order of the latest look. */
  looked: Map<string, number>;
  seq: number;
}
const lk = (seed: number, k: number) => `${seed}:${k}`;

interface Pins {
  p: number;
  q: number;
  kStar: number;
}
/** P: the most recent mix with a settled run and a look at a box size other than 2 x 2.
 * k*: the largest such box size looked at on P. Q: the most recent other settled mix
 * (spec section 7; the milestones guarantee all three exist). */
function pinsOf(rec: Rec): Pins | null {
  let p = -1;
  let pAt = -1;
  for (const [seed, at] of rec.settled) {
    let other = -1;
    for (const k of KS)
      if (k !== 2) other = Math.max(other, rec.looked.get(lk(seed, k)) ?? -1);
    if (other < 0) continue;
    const t = Math.max(at, other);
    if (t > pAt) {
      pAt = t;
      p = seed;
    }
  }
  if (p < 0) return null;
  let q = -1;
  let qAt = -1;
  for (const [seed, at] of rec.settled)
    if (seed !== p && at > qAt) {
      qAt = at;
      q = seed;
    }
  if (q < 0) return null;
  const kStar = Math.max(...KS.filter((k) => k !== 2 && rec.looked.has(lk(p, k))));
  return { p, q, kStar };
}

function Gate({
  interact,
  rec,
  phase,
  here,
  onLook,
  moved,
  onMoved,
}: {
  interact: () => void;
  rec: Rec;
  phase: string;
  /** The (seed, k, round) on the stage now. */
  here: [number, number, number];
  onLook: (seed: number, k: number) => void;
  moved: boolean;
  onMoved: () => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [seed, k, round] = here;
  useEffect(() => {
    if (phase !== "explore") return;
    if (round > 0 && !moved) onMoved();
    if (!rec.looked.has(lk(seed, k))) onLook(seed, k);
    if (rec.settled.size >= 1) reach("settled-30");
    if (rec.settled.size >= 2) reach("second-mix");
    for (const sd of rec.settled.keys())
      if (KS.some((q) => q !== 2 && rec.looked.has(lk(sd, q)))) reach("other-box");
  });
  return null;
}

export default function SchellingOnNewYork({ slug }: { slug: string }) {
  const [seedIx, setSeedIx] = useState(0);
  const seed = SEEDS[seedIx];
  const [t, setT] = useState(0);
  const [k, setK] = useState(2);
  const [rec, setRec] = useState<Rec>({
    settled: new Map(),
    looked: new Map(),
    seq: 0,
  });
  /** The grid has moved at least once (any mix): S4 shows from then on (cultural pass 4, 5.3). */
  const [moved, setMoved] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stop, []);

  const cur = getRun(seed);
  const last = end(cur);
  const tt = Math.min(t, last);

  const record = (sd: number) =>
    setRec((r) => ({
      ...r,
      settled: new Map(r.settled).set(sd, r.seq + 1),
      seq: r.seq + 1,
    }));
  const look = (sd: number, q: number) =>
    setRec((r) => ({
      ...r,
      looked: new Map(r.looked).set(lk(sd, q), r.seq + 1),
      seq: r.seq + 1,
    }));

  /** Replay from `from` to the run's end in at most 8 jumps of 45 ms (ABM rule: ≤ 400 ms). */
  const animate = (r: Run, from: number) => {
    const to = end(r);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || to - from <= 1) return setT(to);
    const jump = Math.max(1, Math.ceil((to - from) / 8));
    let q = from;
    setT(from);
    timer.current = setInterval(() => {
      q = Math.min(to, q + jump);
      setT(q);
      if (q >= to) stop();
    }, 45);
  };

  const step = () => {
    stop();
    const nt = tt + 1;
    setT(nt);
    if (nt === last) record(seed);
  };
  const play = () => {
    stop();
    record(seed); // milestones fire on press, from the computed result
    animate(cur, tt);
  };
  /** Keeps the moment: at round 0 a new random start; later, the next mix run to its end. */
  const newMix = () => {
    stop();
    const ni = (seedIx + 1) % SEEDS.length;
    const ns = SEEDS[ni];
    setSeedIx(ni);
    if (tt === 0) return setT(0);
    record(ns);
    animate(getRun(ns), 0);
  };
  const reset = () => {
    stop();
    setT(0);
  };
  const box = (q: number) => {
    setK(q);
    look(seed, q);
  };

  const pins = pinsOf(rec);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two made-up groups of households, equal in number, are placed at random on a grid shaped like New York City. Before anything moves, how unevenly are they spread over the 2 × 2 boxes drawn on it (a segregation index: 0 even, 1 fully apart)?",
        options: ["About 0 to 0.1", "About 0.4 to 0.5", "About 0.9 to 1"],
        answer: 1,
      }}
      exploreHint="Run the rule at 30%, press New mix, then measure the same grid in bigger boxes."
      minInteractions={MILESTONES.length}
      reveal={() => <Reveal pins={pins} />}
    >
      {({ locked, interact, phase }) => {
        if (phase === "reveal")
          return (
            <div className={s.wrap}>
              <Pair pins={pins} />
            </div>
          );
        const frame = cur.frames[tt];
        const [pa, pb] = paths(frame);
        const mv = movePct(cur, tt);
        const bx = boxes(frame, k);
        const bx0 = boxes(cur.frames[0], k);
        const capped = tt === last && !cur.settled;
        return (
          <Fit phase={phase}>
            {(fitRef, px) => {
              // Outline inset: 1 px clear of the lattice line plus half the 1.25 px stroke (D7).
              const inset = (1.6 * (N + 1)) / px;
              return (
                <div className={s.wrap} ref={fitRef}>
                  <Gate
                    interact={interact}
                    rec={rec}
                    phase={phase}
                    here={[seed, k, tt]}
                    onLook={look}
                    moved={moved}
                    onMoved={() => setMoved(true)}
                  />
                  <div className={s.map} style={{ width: px, height: px }}>
                    <svg
                      viewBox={`-0.5 -0.5 ${N + 1} ${N + 1}`}
                      className={`stage-svg ${s.grid}`}
                      style={{ width: px, height: px }}
                      role="img"
                      aria-label={`A grid shaped like New York City with made-up households, mix ${seed}. Round ${tt}: ${cur.agents} households in two equal made-up groups, ${mv}% would move${
                        locked
                          ? ""
                          : `; spread in ${k} by ${k} boxes ${D(frame, k)}; one-group boxes ${bx.pct}%`
                      }.`}
                    >
                      <clipPath id="nyc-land">
                        <path d={LAND} />
                      </clipPath>
                      <path d={LAND} className={s.land} />
                      <path
                        d={lattice(k)}
                        className={s.lattice}
                        clipPath="url(#nyc-land)"
                      />
                      <path d={pa} className={s.a} />
                      <path d={pb} className={s.b} />
                      {!locked && (
                        <path
                          d={outlines(frame, k, inset)}
                          className={s.outline}
                          clipPath="url(#nyc-land)"
                          data-testid="one-group-outlines"
                        />
                      )}
                    </svg>
                    {/* Captions in the water, outside role="img" so screen readers read them. */}
                    <div className={s.corner}>
                      <p className={s.s1}>{S1}</p>
                      {moved && <p className={s.s4}>{S4}</p>}
                    </div>
                  </div>
                  <div className={s.head} aria-live="polite">
                    <span>
                      Round <b>{tt}</b>
                      {capped ? ` of ${CAP}` : ""}
                    </span>
                    <span>
                      would move <b>{mv}%</b>
                    </span>
                    <span>
                      mix <b>{seed}</b>
                    </span>
                    {!locked && (
                      <span>
                        one-group boxes{" "}
                        <b>{tt ? `${bx0.pct}%→${bx.pct}%` : `${bx.pct}%`}</b>
                      </span>
                    )}
                  </div>
                  <div className={s.controls}>
                    <Control
                      className={s.tap}
                      disabled={locked || tt >= last}
                      onClick={step}
                    >
                      Step
                    </Control>
                    <Control
                      className={s.tap}
                      disabled={locked || tt >= last}
                      onClick={play}
                    >
                      Run
                    </Control>
                    <Control
                      className={s.tap}
                      disabled={locked}
                      onClick={newMix}
                    >
                      New mix
                    </Control>
                    <Control
                      className={s.tap}
                      disabled={locked || tt === 0}
                      onClick={reset}
                    >
                      Reset
                    </Control>
                  </div>
                  <p className={s.line}>Spread in boxes (0 even, 1 apart):</p>
                  <div
                    className={s.blocks}
                    role="group"
                    aria-label="Measure in boxes of"
                  >
                    {KS.map((q) => {
                      const show =
                        !locked &&
                        (q === 2 ||
                          [...rec.looked.keys()].some((x) => x.endsWith(`:${q}`)));
                      const val =
                        locked && q === 2
                          ? "?"
                          : show
                            ? tt
                              ? `${D(cur.frames[0], q)}→${D(frame, q)}`
                              : D(frame, q)
                            : " ";
                      return (
                        <Control
                          key={q}
                          className={`${s.tap} ${s.block} ${q === k ? "active" : ""}`}
                          disabled={locked || q === k}
                          aria-pressed={q === k}
                          aria-label={`Boxes of ${q} by ${q} cells`}
                          onClick={() => box(q)}
                        >
                          <span>
                            {q}×{q}
                          </span>
                          <small>{val}</small>
                        </Control>
                      );
                    })}
                  </div>
                  <p className={s.line}>A setting, not a measure of anyone.</p>
                  <p className={s.rule}>
                    Move if fewer than <b>{PCT}% of neighbours are like them</b>
                  </p>
                </div>
              );
            }}
          </Fit>
        );
      }}
    </Lesson>
  );
}

/** The reveal stage: P and Q settled, side by side in one SVG with one viewBox (design review
 * D1), identical neutral frames (cultural pass 4, ruling 4.1), no lattice and no outlines
 * (ruling 1.4). S1 above and S4 below, in the same container, so a crop carries both. */
const GAP = 2;
function Pair({ pins }: { pins: Pins | null }) {
  if (!pins) return null;
  const P = getRun(pins.p);
  const Q = getRun(pins.q);
  const pe = P.frames[end(P)];
  const qe = Q.frames[end(Q)];
  const [pa, pb] = paths(pe);
  const [qa, qb] = paths(qe, N + GAP);
  const W = 2 * N + GAP;
  const one0 = boxes(P.frames[0], 2).pct;
  const oneE = boxes(pe, 2).pct;
  const qOne0 = boxes(Q.frames[0], 2).pct;
  const qOneE = boxes(qe, 2).pct;
  const ks = `${pins.kStar}×${pins.kStar}`;
  return (
    <>
      <p className={s.s1r}>{S1}</p>
      <svg
        viewBox={`-0.5 -0.5 ${W + 1} ${N + 1}`}
        className={`stage-svg ${s.pair}`}
        role="img"
        aria-label={`Two settled grids of made-up households, shaped like New York City, mix ${pins.p} and mix ${pins.q}, same rule at ${PCT}%: the clumps are in different places. Mix ${pins.p} in 2 by 2 boxes: ${D(P.frames[0], 2)} at the start, ${D(pe, 2)} settled. Mix ${pins.q}: ${D(Q.frames[0], 2)} to ${D(qe, 2)}.`}
      >
        <path d={LAND} className={s.land} />
        <path d={LAND} className={s.land} transform={`translate(${N + GAP} 0)`} />
        <path d={pa} className={s.a} />
        <path d={pb} className={s.b} />
        <path d={qa} className={s.a} />
        <path d={qb} className={s.b} />
        <rect x={-0.5} y={-0.5} width={N + 1} height={N + 1} className={s.frame} />
        <rect
          x={N + GAP - 0.5}
          y={-0.5}
          width={N + 1}
          height={N + 1}
          className={s.frame}
        />
      </svg>
      <div className={s.caps}>
        <p>
          <b>mix {pins.p}</b> · 2×2 {D(P.frames[0], 2)}→{D(pe, 2)}
          <br />
          one-group {one0}%→{oneE}%
          <br />
          {ks} {D(P.frames[0], pins.kStar)}→{D(pe, pins.kStar)}
        </p>
        <p>
          <b>mix {pins.q}</b> · 2×2 {D(Q.frames[0], 2)}→{D(qe, 2)}
          <br />
          one-group {qOne0}%→{qOneE}%
        </p>
      </div>
      <p className={s.s4r}>{S4}</p>
    </>
  );
}

/** Every number comes from P (the learner's own settled mix with a bigger box looked at) and is on
 * the reveal stage's captions, with the stage's rounding (spec section 7). */
function Reveal({ pins }: { pins: Pins | null }) {
  if (!pins) return <p>Run two mixes to the end first.</p>;
  const P = getRun(pins.p);
  const f0 = P.frames[0];
  const ks = `${pins.kStar}×${pins.kStar}`;
  return (
    <>
      <p>
        Mix {pins.p} began at {D(f0, 2)} in 2×2 boxes (at most 4 households
        each); chance alone left {boxes(f0, 2).pct}% one group. {ks}:{" "}
        {D(f0, pins.kStar)}. A segregation number needs its unit; a census
        tract holds thousands of people.
      </p>
      <p>
        The rule sorted your mixes into clumps in different places: this model
        does not show why real cities look as they do. In US cities, households
        did not all have the same choices: the documented history includes
        housing and lending discrimination by race, widening wealth gaps, and
        late-1930s government maps grading neighbourhoods for lending risk. The
        grades are associated with later home values and ownership; research is
        mixed on whether the maps caused this or recorded earlier practice.
      </p>
    </>
  );
}
