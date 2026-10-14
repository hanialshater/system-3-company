"use client";

// Schelling's segregation model, the first Agent-based simulation lesson (spec:
// company/design/specs/mild-preferences-sharp-divides.md; format rules: design-lead decisions
// 2026-10-13 §1). The engine is ./abm.ts (pure, no React). Every run is computed in full from its
// seed, so Step, Run and the chips all show frames of the same deterministic run.

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import { run, unhappy, CAP, SIZE, type Run } from "./abm";
import s from "./styles.module.css";

const CHIPS = [10, 30, 50, 70];
const MAIN = 30;
const MILESTONES = ["settled-30", "other-threshold"] as const;

const cache = new Map<string, Run>();
const key = (seed: number, pct: number) => `${seed}:${pct}`;
function getRun(seed: number, pct: number) {
  const k = key(seed, pct);
  let r = cache.get(k);
  if (!r) cache.set(k, (r = run(seed, pct)));
  return r;
}
const end = (r: Run) => r.frames.length - 1;
const pc = (v: number) => Math.round(v * 100);

/** A run the learner took to its end (settled or capped). `n` orders them. */
interface Done {
  seed: number;
  pct: number;
  ticks: number;
  start: number;
  end: number;
  settled: boolean;
  sad: number;
  n: number;
}
const toDone = (r: Run, n: number): Done => ({
  seed: r.seed,
  pct: r.pct,
  ticks: end(r),
  start: pc(r.like[0]),
  end: pc(r.like[end(r)]),
  settled: r.settled,
  sad: pc(r.sad[end(r)] / r.agents),
  n,
});

function paths(frame: Uint8Array, sad: Set<number>) {
  const d = ["", "", "", ""]; // A filled, A hollow, B filled, B hollow
  for (let i = 0; i < frame.length; i++) {
    const g = frame[i];
    if (!g) continue;
    const x = i % SIZE;
    const y = (i - x) / SIZE;
    const h = sad.has(i);
    if (g === 1) {
      const o = h ? 0.19 : 0.11;
      const w = h ? 0.62 : 0.78;
      d[h ? 1 : 0] += `M${x + o} ${y + o}h${w}v${w}h-${w}z`;
    } else {
      const r = h ? 0.34 : 0.42;
      d[h ? 3 : 2] += `M${x + 0.5 - r} ${y + 0.5}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 -${2 * r} 0`;
    }
  }
  return d;
}

// Chart geometry (viewBox units ~ CSS px at 390 width). Right gutter holds end labels.
const W = 340;
const X0 = 30;
const X1 = 272;
const YT = 5;
const YB = 67;
const cx = (t: number) => X0 + (t / CAP) * (X1 - X0);
const cy = (v: number) => YB - v * (YB - YT);
const line = (like: number[], upTo: number) =>
  like.slice(0, upTo + 1).map((v, t) => `${t ? "L" : "M"}${cx(t).toFixed(1)} ${cy(v).toFixed(1)}`).join("");

/** Spread label y positions at least 11 apart, kept inside the plot. */
function nudge(ys: number[]) {
  const o = ys.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
  for (let k = 1; k < o.length; k++) o[k].y = Math.max(o[k].y, o[k - 1].y + 11);
  const over = o.length ? o[o.length - 1].y - (YB + 3) : 0;
  if (over > 0) o.forEach((p) => (p.y -= over));
  const out: number[] = [];
  o.forEach((p) => (out[p.i] = p.y));
  return out;
}

/** Grid side in px: 288 (7.2 px cells) when the explore stage has room, down to 240 (6 px, the
 * format's floor) on shorter phones so the controls stay on screen without scrolling the stage. */
function Fit({ phase, children }: { phase: string; children: (r: RefObject<HTMLDivElement | null>, px: number) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [px, setPx] = useState(288);
  useEffect(() => {
    const st = ref.current?.closest('[data-testid="stage"]');
    if (!st || phase !== "explore") return;
    const over = st.scrollHeight - st.clientHeight;
    if (over > 0 && px > 240) setPx(Math.max(240, px - over));
  });
  return <>{children(ref, px)}</>;
}

function Gate({ interact, done, phase, pin }: { interact: () => void; done: Done[]; phase: string; pin: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  useEffect(() => {
    for (const d of done) {
      if (d.pct === MAIN && d.settled) reach("settled-30");
      if (d.pct !== MAIN) reach("other-threshold");
    }
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

export default function MildPreferences({ slug }: { slug: string }) {
  const [seed, setSeed] = useState(1);
  const [pct, setPct] = useState(MAIN);
  const [t, setT] = useState(0);
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
    setDone((ds) => [...ds.filter((d) => key(d.seed, d.pct) !== key(r.seed, r.pct)), toDone(r, ds.length + 1)]);
  const isDone = (sd: number, p: number) => done.some((d) => d.seed === sd && d.pct === p);
  const pinRun = [...done].filter((d) => d.pct === MAIN && d.settled).sort((a, b) => b.n - a.n)[0];

  const step = () => {
    stop();
    const nt = tt + 1;
    setT(nt);
    if (nt === last) record(cur);
  };
  const play = () => {
    stop();
    record(cur); // milestones fire on press, from the computed result
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const jump = Math.max(1, Math.ceil((last - tt) / 15));
    if (reduce || last - tt <= 1) return setT(last);
    let k = tt;
    timer.current = setInterval(() => {
      k = Math.min(last, k + jump);
      setT(k);
      if (k >= last) stop();
    }, 25);
  };
  const choose = (p: number) => {
    stop();
    setPct(p);
    // After a finished run, show the same starting mix's end at the new threshold.
    if (isDone(seed, pct)) {
      const r = getRun(seed, p);
      setT(end(r));
      record(r);
    } else setT(0);
  };
  const newMix = () => {
    stop();
    setSeed((x) => x + 1);
    setT(0);
  };
  const pin = () => {
    if (!pinRun) return;
    stop();
    setSeed(pinRun.seed);
    setPct(MAIN);
    setT(pinRun.ticks);
  };

  const frame = cur.frames[tt];
  const sadNow = unhappy(frame, SIZE, pct);
  const d = paths(frame, new Set(sadNow));
  const like = pc(cur.like[tt]);
  const happy = pc(1 - sadNow.length / cur.agents);
  const finished = tt === last && isDone(seed, pct);
  const isPin = !!pinRun && seed === pinRun.seed && pct === MAIN && tt === pinRun.ticks;

  const others = done.filter((x) => x.seed === seed && x.pct !== pct);
  const labels = others.map((o) => ({ p: o.pct, v: getRun(seed, o.pct).like[o.ticks], t: o.ticks, cur: false }));
  if (finished) labels.push({ p: pct, v: cur.like[last], t: last, cur: true });
  const ly = nudge(labels.map((l) => cy(l.v)));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A city grid holds two groups in equal numbers, mixed at random, with some empty homes. A household moves if under 30% of its neighbours are like it, so it is happy as a minority on a street that is 70% the other group. Once nobody wants to move, what share of a typical household's neighbours are like it?",
        options: ["About 30%", "About 50% (no change from the start)", "About 75%"],
        answer: 2,
      }}
      exploreHint="Run it at 30% until nobody wants to move, then try another threshold."
      minInteractions={MILESTONES.length}
      reveal={() => <Reveal done={done} pinRun={pinRun} />}
    >
      {({ locked, interact, phase }) => (
        <Fit phase={phase}>{(fitRef, px) => (
        <div className={s.wrap} ref={fitRef}>
          <Gate interact={interact} done={done} phase={phase} pin={pin} />
          <p className={s.rule}>
            Toy model. Hollow households have under {pct}% like neighbours; they move to a random empty home.
          </p>
          <div className={s.seedRow}>
            <span>40×40 · 8 nearby cells · 10% empty · seed {seed}</span>
            <Control className={s.tap} disabled={locked} onClick={newMix}>
              New mix
            </Control>
          </div>
          <svg
            viewBox={`-0.5 -0.5 ${SIZE + 1} ${SIZE + 1}`}
            className={`stage-svg ${s.grid}`}
            style={{ width: px }}
            role="img"
            aria-label={`Tick ${tt}: ${like}% like neighbours${
              locked ? "" : sadNow.length ? `, ${100 - happy}% unhappy` : ", everyone happy"
            }`}
          >
            <rect x={-0.3} y={-0.3} width={SIZE + 0.6} height={SIZE + 0.6} className={s.frame} />
            <path d={d[0]} className={s.a} />
            <path d={d[1]} className={`${s.a} ${s.hollow}`} />
            <path d={d[2]} className={s.b} />
            <path d={d[3]} className={`${s.b} ${s.hollow}`} />
          </svg>
          <div className={s.head}>
            <span>Like neighbours</span>
            <span className={s.readout} aria-live="polite">
              {isPin && phase === "reveal"
                ? `Your ${MAIN}% run · tick ${tt} · Like ${like}%`
                : !locked && tt === last && !cur.settled
                  ? `Tick ${tt} · Like ${like}% · ${100 - happy}% still unhappy`
                  : `Tick ${tt} · Happy ${locked ? "?" : `${happy}%`} · Like ${like}%`}
            </span>
          </div>
          <svg viewBox={`0 0 ${W} 81`} className={`stage-svg ${s.chart}`} aria-hidden>
            {[0, 0.5, 1].map((v) => (
              <text key={v} x={X0 - 4} y={cy(v) + 3.5} textAnchor="end" className={s.tick}>
                {v * 100}%
              </text>
            ))}
            <line x1={X0} x2={X0} y1={YT} y2={YB} className={s.axisLine} />
            <line x1={X0} x2={X1} y1={YB} y2={YB} className={s.axisLine} />
            <line x1={X0} x2={X1} y1={cy(0.5)} y2={cy(0.5)} className={s.ghost} />
            <text x={X0} y={78} textAnchor="middle" className={s.tick}>0</text>
            <text x={(X0 + X1) / 2} y={78} textAnchor="middle" className={s.tick}>Ticks</text>
            <text x={X1} y={78} textAnchor="middle" className={s.tick}>{CAP}</text>
            {others.map((o) => (
              <path key={o.pct} d={line(getRun(seed, o.pct).like, o.ticks)} className={s.old} />
            ))}
            <path d={line(cur.like, tt)} className={s.now} />
            <circle cx={cx(tt)} cy={cy(cur.like[tt])} r={2.5} className={s.dot} />
            {locked && (
              <text x={X1 + 8} y={cy(0.5) + 3.5} className={s.end}>end ?</text>
            )}
            {labels.map((l, i) => (
              <g key={l.p}>
                <text x={X1 + 8} y={ly[i] + 3.5} className={l.cur ? s.endNow : s.end}>
                  {l.p}%: {pc(l.v)}%
                </text>
              </g>
            ))}
          </svg>
          <div className={s.controls}>
            <Control className={s.tap} disabled={locked || tt >= last} onClick={step}>
              Step
            </Control>
            <Control className={s.tap} disabled={locked || tt >= last} onClick={play}>
              Run
            </Control>
            <span className={s.chips} role="group" aria-label="Moves if like neighbours under">
              {CHIPS.map((p) => (
                <Control
                  key={p}
                  className={`${s.tap} ${s.chip} ${p === pct ? "active" : ""}`}
                  disabled={locked || p === pct}
                  aria-pressed={p === pct}
                  onClick={() => choose(p)}
                >
                  {p}%
                </Control>
              ))}
            </span>
          </div>
        </div>
        )}</Fit>
      )}
    </Lesson>
  );
}

function Reveal({ done, pinRun }: { done: Done[]; pinRun?: Done }) {
  const others = done
    .filter((d) => d.pct !== MAIN)
    .sort((a, b) => Number(b.seed === pinRun?.seed) - Number(a.seed === pinRun?.seed) || a.pct - b.pct)
    .filter((d, i, a) => a.findIndex((x) => x.pct === d.pct) === i);
  const say = (d: Done) =>
    `${d.end}% at ${d.pct}%${pinRun && d.seed !== pinRun.seed ? ` (seed ${d.seed})` : ""}${
      d.settled ? "" : ` (still ${d.sad}% unhappy at tick ${d.ticks})`
    }`;
  return (
    <>
      <p>
        {pinRun
          ? `Your ${MAIN}% run went from ${pinRun.start}% to ${pinRun.end}% like neighbours, everyone happy by tick ${pinRun.ticks}.`
          : "You did not finish a 30% run."}
        {others.length ? ` Other runs: ${others.map(say).join(", ")}.` : ""}
      </p>
      <p>
        At 30%, a household accepts a street up to 70% the other group; nobody asks for a majority. Yet each
        move changes other streets, unsettling happy households, and the grid sorts into blocks. Mild preferences can
        add up to sharp divides (Schelling, 1971).
      </p>
      <p className="muted">A toy model: it shows what can happen, not what causes any real city&apos;s pattern.</p>
    </>
  );
}
