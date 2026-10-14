"use client";

// Schelling on New York: what a sorting model can and cannot say (brief: geography.people-places
// item 1, rulings R1-R10 from company/reviews/schelling-on-new-york/2026-10-14-cultural-review.md).
// The engine is ./engine.ts: the rule of lesson one's abm.ts plus walls outside the city mask
// (check.mjs shows the frames match abm.ts and the brief's check script). Every run is computed
// in full from its seed, so Step, Run and the block buttons all show frames of one run.

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Slider } from "@/kit/controls";
import { run, dissimilarity, MASK, N, CAP, type Run } from "./engine";
import s from "./styles.module.css";

const MAIN = 30;
/** Slider cap (cultural review 2, ruling (a)): above 30% a settled frame can leave one region of
 * the city more than 90% one group. check.mjs scans every tick of every lesson seed at 0 to 30%. */
const MAX = 30;
const KS = [1, 2, 4, 8];
/** Seeds 1 to 50 in order, without 3 and 36 (the two seeds whose settled frame at 30% leaves one
 * region of the city more than 90% one group: an edge artefact, cultural review R2). */
const SEEDS = Array.from({ length: 50 }, (_, i) => i + 1).filter(
  (x) => x !== 3 && x !== 36,
);
const MILESTONES = ["settled-30", "other-unit"] as const;

const cache = new Map<string, Run>();
const key = (seed: number, pct: number) => `${seed}:${pct}`;
function getRun(seed: number, pct: number) {
  const k = key(seed, pct);
  let r = cache.get(k);
  if (!r) cache.set(k, (r = run(seed, pct)));
  return r;
}
const end = (r: Run) => r.frames.length - 1;
const d2 = (v: number) => v.toFixed(2);
const D = (frame: Uint8Array, k: number) => d2(dissimilarity(frame, N, k));

/** A run the learner took to its end. `n` orders them. */
interface Done {
  seed: number;
  pct: number;
  ticks: number;
  settled: boolean;
  n: number;
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

const lattice = (k: number) => {
  if (k < 2) return "";
  let d = "";
  for (let v = k; v < N; v += k) d += `M${v} 0V${N}M0 ${v}H${N}`;
  return d;
};

/** Group A squares, group B circles (shape is the second cue, R5). */
function paths(frame: Uint8Array) {
  let a = "";
  let b = "";
  for (let i = 0; i < frame.length; i++) {
    const g = frame[i];
    if (g !== 1 && g !== 2) continue;
    const x = i % N;
    const y = (i - x) / N;
    if (g === 1) a += `M${x + 0.13} ${y + 0.13}h0.74v0.74h-0.74z`;
    else
      b += `M${x + 0.08} ${y + 0.5}a0.42 0.42 0 1 0 0.84 0a0.42 0.42 0 1 0 -0.84 0`;
  }
  return [a, b];
}

/** Inline SVG legend swatches, drawn like the grid (design-lead ruling: no Unicode glyphs). */
const Swatch = ({ g }: { g: 1 | 2 }) => (
  <svg viewBox="0 0 1 1" className={s.glyph} aria-hidden>
    {g === 1 ? (
      <rect x={0.08} y={0.08} width={0.84} height={0.84} className={s.a} />
    ) : (
      <circle cx={0.5} cy={0.5} r={0.46} className={s.b} />
    )}
  </svg>
);

/** Grid side in px: 300 when the explore stage has room, down to 246 (6 px cells) on shorter
 * phones; below that the stage scrolls. */
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
  useEffect(() => {
    const st = ref.current?.closest('[data-testid="stage"]');
    if (!st || phase !== "explore") return;
    const over = st.scrollHeight - st.clientHeight;
    if (over > 0 && px > FLOOR) setPx(Math.max(FLOOR, px - over));
  });
  return <>{children(ref, px)}</>;
}

function Gate({
  interact,
  done,
  seen,
  phase,
  pin,
}: {
  interact: () => void;
  done: Done[];
  seen: number[];
  phase: string;
  pin: () => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  useEffect(() => {
    if (phase !== "explore") return;
    if (done.some((d) => d.pct === MAIN && d.settled)) reach("settled-30");
    if (seen.some((k) => k !== 2)) reach("other-unit");
  });
  const pinned = useRef(false);
  useEffect(() => {
    if (phase === "reveal" && !pinned.current) {
      pinned.current = true;
      pin();
    }
  });
  return null;
}

export default function SchellingOnNewYork({ slug }: { slug: string }) {
  const [seedIx, setSeedIx] = useState(0);
  const seed = SEEDS[seedIx];
  const [pct, setPct] = useState(MAIN);
  const [t, setT] = useState(0);
  const [k, setK] = useState(2);
  const [seen, setSeen] = useState<number[]>([2]);
  const [done, setDone] = useState<Done[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stop, []);

  const cur = getRun(seed, pct);
  const last = end(cur);
  const tt = Math.min(t, last);
  const record = (r: Run) =>
    setDone((ds) => [
      ...ds.filter((d) => key(d.seed, d.pct) !== key(r.seed, r.pct)),
      {
        seed: r.seed,
        pct: r.pct,
        ticks: end(r),
        settled: r.settled,
        n: ds.length + 1,
      },
    ]);
  const isDone = (sd: number, p: number) =>
    done.some((d) => d.seed === sd && d.pct === p);
  const pinRun = [...done]
    .filter((d) => d.pct === MAIN && d.settled)
    .sort((a, b) => b.n - a.n)[0];

  const step = () => {
    stop();
    const nt = tt + 1;
    setT(nt);
    if (nt === last) record(cur);
  };
  const play = () => {
    stop();
    record(cur); // milestones fire on press, from the computed result
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const jump = Math.max(1, Math.ceil((last - tt) / 8));
    if (reduce || last - tt <= 1) return setT(last);
    let q = tt;
    timer.current = setInterval(() => {
      q = Math.min(last, q + jump);
      setT(q);
      if (q >= last) stop();
    }, 45);
  };
  const reset = () => {
    stop();
    setT(0);
  };
  const newMix = () => {
    stop();
    setSeedIx((i) => (i + 1) % SEEDS.length);
    setT(0);
  };
  const choose = (p: number) => {
    stop();
    setPct(p);
    // After a finished run, show the same starting mix's end at the new setting.
    if (isDone(seed, pct) && tt === last) {
      const r = getRun(seed, p);
      setT(end(r));
      record(r);
    } else setT(0);
  };
  const unit = (q: number) => {
    setK(q);
    setSeen((ks) => (ks.includes(q) ? ks : [...ks, q]));
  };
  const pin = () => {
    if (!pinRun) return;
    stop();
    setSeedIx(SEEDS.indexOf(pinRun.seed));
    setPct(MAIN);
    setT(pinRun.ticks);
    setK(2);
  };

  const frame = cur.frames[tt];
  const [pa, pb] = paths(frame);
  // Integer floor: 100% only when no square would move (fact-check c6).
  const stay = Math.floor((100 * (cur.agents - cur.movers[tt])) / cur.agents);
  const ranOnce = done.length > 0;
  const capped = tt === last && !cur.settled;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two made-up groups, equal in number, are placed at random on a grid shaped like New York City. Before anyone moves, how unevenly are they spread, measured on blocks of 2 × 2 cells (0 even, 1 fully apart)?",
        options: ["About 0 to 0.1", "About 0.4 to 0.5", "About 0.9 to 1"],
        answer: 1,
      }}
      exploreHint="Read the start, run the rule at 30%, then measure the same grid on other block sizes."
      minInteractions={MILESTONES.length}
      reveal={() => <Reveal pinRun={pinRun} seen={seen} />}
    >
      {({ locked, interact, phase }) => {
        const rv = phase === "reveal";
        return (
          <Fit phase={phase}>
            {(fitRef, px) => (
              <div className={s.wrap} ref={fitRef}>
                <Gate
                  interact={interact}
                  done={done}
                  seen={seen}
                  phase={phase}
                  pin={pin}
                />
                <p className={s.line}>
                  Made-up equal groups, <Swatch g={1} /> A and <Swatch g={2} /> B.
                  Not New York&apos;s population.
                </p>
                <svg
                  viewBox={`-0.5 -0.5 ${N + 1} ${N + 1}`}
                  className={`stage-svg ${s.grid}`}
                  style={{ width: px }}
                  role="img"
                  aria-label={`A grid shaped like New York City. Tick ${tt}: ${cur.agents} squares in two equal groups, ${stay}% would stay${
                    locked
                      ? ""
                      : `; spread on ${k} by ${k} blocks ${D(frame, k)}`
                  }.`}
                >
                  <path d={LAND} className={s.land} />
                  <path d={pa} className={s.a} />
                  <path d={pb} className={s.b} />
                  <clipPath id="nyc-land">
                    <path d={LAND} />
                  </clipPath>
                  <path
                    d={lattice(k)}
                    className={s.lattice}
                    clipPath="url(#nyc-land)"
                  />
                </svg>
                <div className={s.head} aria-live="polite">
                  <span>
                    Tick <b>{tt}</b>
                    {capped ? ` of ${CAP}` : ""}
                  </span>
                  <span>
                    would stay <b>{stay}%</b>
                  </span>
                  <span>seed {seed}</span>
                </div>
                {!rv && (
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
                      disabled={locked || tt === 0}
                      onClick={reset}
                    >
                      Reset
                    </Control>
                    <Control
                      className={s.tap}
                      disabled={locked}
                      onClick={newMix}
                    >
                      New mix
                    </Control>
                  </div>
                )}
                <p className={s.line}>
                  Spread (0 even, 1 apart):
                </p>
                <div
                  className={s.blocks}
                  role="group"
                  aria-label="Measure on blocks of"
                >
                  {KS.map((q) => {
                    const show = !locked && seen.includes(q);
                    const val =
                      locked && q === 2
                        ? "?"
                        : show
                          ? tt
                            ? `${D(cur.frames[0], q)}→${D(frame, q)}`
                            : D(frame, q)
                          : "\u00a0";
                    if (rv)
                      return (
                        <span
                          key={q}
                          className={`${s.block} ${s.still} ${q === k ? s.on : ""}`}
                        >
                          <span>
                            {q}×{q}
                          </span>
                          <small>{val}</small>
                        </span>
                      );
                    return (
                      <Control
                        key={q}
                        className={`${s.tap} ${s.block} ${q === k ? "active" : ""}`}
                        disabled={locked || q === k}
                        aria-pressed={q === k}
                        aria-label={`Blocks of ${q} by ${q} cells`}
                        onClick={() => unit(q)}
                      >
                        <span>
                          {q}×{q}
                        </span>
                        <small>{val}</small>
                      </Control>
                    );
                  })}
                </div>
                <p className={s.line}>
                  A setting, not a measure of anyone.
                </p>
                {rv ? (
                  <p className={s.line}>
                    Move if fewer than <b>{pct}% of neighbours are like them</b>
                  </p>
                ) : (
                  <div className={s.slider}>
                    <Slider
                      label="Move if fewer than"
                      value={pct}
                      min={0}
                      max={MAX}
                      step={5}
                      disabled={locked}
                      onChange={choose}
                      format={(v) => `${v}% of neighbours are like them`}
                    />
                  </div>
                )}
                {ranOnce && (
                  <p className={s.left}>
                    Not modelled: money, prices, jobs, history, who could live
                    where.
                  </p>
                )}
              </div>
            )}
          </Fit>
        );
      }}
    </Lesson>
  );
}

/** Quotes only the learner's own pinned 30% run (the stage shows it when the reveal opens) and the
 * block sizes the learner measured; every value is computed from that run's frames. */
function Reveal({ pinRun, seen }: { pinRun?: Done; seen: number[] }) {
  if (!pinRun) return <p>You did not finish a 30% run.</p>;
  const r = getRun(pinRun.seed, MAIN);
  const f0 = r.frames[0];
  const fe = r.frames[end(r)];
  const other = [8, 4, 1].find((q) => seen.includes(q));
  return (
    <>
      <p>
        Your start: {D(f0, 2)} on 2×2 blocks
        {other ? `, ${D(f0, other)} on ${other}×${other}` : ""}. A segregation
        number needs its unit. A census tract holds thousands of people; a 2×2
        block here, at most 4 squares.
      </p>
      <p>
        In this model, a moving rule sorted the grid to {D(fe, 2)}. Without
        money or history, the model does not show why any real city looks as it
        does. In US cities, households did not all have the
        same choices: the documented history includes housing and lending
        discrimination, widening wealth gaps, and late-1930s government maps
        grading neighbourhoods for lending risk. The grades are associated with
        later home values and ownership; research is mixed on whether the maps
        caused this or recorded earlier practice.
      </p>
    </>
  );
}
