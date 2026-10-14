"use client";

// Same songs, different hits: 8 songs (appeal 1.0..1.7, song 8 best) in 8 separate worlds
// (world k = mulberry32(k)). 1,000 listeners arrive one at a time; each draws ONE u and picks the
// first song whose cumulative interval holds u x sum(w), with w = appeal x (1 + picks so far)
// (copying on) or w = appeal (copying off). Both modes use the same seeds and the same draws.
// Spec: company/design/specs/same-songs-different-hits.md + design review
// company/design/reviews/2026-10-14-design-review-ncm-specs.md §3 (the review wins).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const APPEAL = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7];
const WORLDS = 8;
const TOTAL = 1000;
const STEP = 100;
const MILESTONES = ["copy-1000", "nocopy-1000"] as const;

/** picks[checkpoint][song] for checkpoints 0, 100, ..., 1000 listeners. */
function simulate(seed: number, copy: boolean): number[][] {
  const r = mulberry32(seed);
  const p = new Array(8).fill(0);
  const out: number[][] = [p.slice()];
  for (let k = 1; k <= TOTAL; k++) {
    const u = r();
    const w = APPEAL.map((a, i) => (copy ? a * (1 + p[i]) : a));
    let x = u * w.reduce((a, b) => a + b, 0);
    let i = 0;
    while (i < 7 && x >= w[i]) {
      x -= w[i];
      i++;
    }
    p[i]++;
    if (k % STEP === 0) out.push(p.slice());
  }
  return out;
}

const RUNS = {
  on: Array.from({ length: WORLDS }, (_, k) => simulate(k + 1, true)),
  off: Array.from({ length: WORLDS }, (_, k) => simulate(k + 1, false)),
};
type Mode = keyof typeof RUNS;

const finish = (p: number[]) => 1 + p.filter((v) => v > p[7]).length;
const ord = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;
const span = (a: number, b: number) => (a === b ? ord(a) : `${ord(a)}–${ord(b)}`);
const pct = (v: number) => Math.round(v * 100);

function stats(mode: Mode, n: number) {
  const c = n / STEP;
  const fin = RUNS[mode].map((w) => finish(w[c]));
  const top = RUNS[mode].map((w) => Math.max(...w[c]) / n);
  const low = Math.max(...fin);
  const first = fin.filter((f) => f === 1).length;
  return { fin, top, low, first, high: Math.min(...fin), lowWorlds: fin.flatMap((f, k) => (f === low ? [k + 1] : [])) };
}

// Panel geometry (viewBox units ~ CSS px at 390 px): 80 x 70 panels, 9 px gutters.
const PW = 80, PH = 70, GAP = 9, ROW = 96;
const BASE = 58, BAR_H = 42; // bar area y 16..58 = 0..50% share
const PITCH = 8.6, BW = 6.5, X0 = 6.6;

/** The best-song mark: drawn on the stage and in the legend swatch from the same code. */
const Tri = ({ cx, y }: { cx: number; y: number }) => (
  <path d={`M${cx} ${y} l3.6 6.2 h-7.2z`} className={s.tri} />
);

export default function SameSongsDifferentHits({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [mode, setMode] = useState<Mode>("on");
  const [done, setDone] = useState<Record<Mode, boolean>>({ on: false, off: false });

  useEffect(() => {
    if (n === TOTAL) setDone((d) => (d[mode] ? d : { ...d, [mode]: true }));
  }, [n, mode]);

  const on = stats("on", TOTAL);
  const off = stats("off", TOTAL);
  const range = (t: number[]) => `${Math.min(...t.map(pct))}–${Math.max(...t.map(pct))}%`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "8 songs, all about as good (the best only 70% more appealing than the worst). 1,000 people in each of 8 separate worlds pick one, each person more likely to pick songs already picked by others. In the worst of the 8 worlds, the best song finishes:",
        options: ["2nd of 8", "4th of 8", "7th of 8"],
        answer: 2,
      }}
      exploreHint="Add listeners, run all 1,000, then switch copying off and compare the 8 worlds."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With copying on, the best song finished anywhere from {span(on.high, on.low).replace("–", " to ")} across the 8 worlds (lowest in
            world {on.lowWorlds.join(", ")}). With copying off, same songs and same listeners, only {span(off.high, off.low).replace("–", " to ")}.
            Copying did not stop the best song winning as often: {on.first} of 8 worlds with copying on and {off.first} of 8
            with it off. It made the result unpredictable: the top song in each world took {range(on.top)} of the
            picks, against at most {Math.max(...off.top.map(pct))}% with copying off.
          </p>
          <p>
            Each early pick makes that song more likely to be picked again, so early luck compounds. Quality still
            tilts the odds, but it does not decide the hit.
          </p>
          <p className="muted">A toy model with made-up appeal numbers, not a measurement of any real market.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} n={locked ? 0 : n} mode={mode} done={done} setN={setN} setMode={setMode} />
      )}
    </Lesson>
  );
}

function Stage({
  locked, interact, n, mode, done, setN, setMode,
}: {
  locked: boolean;
  interact: () => void;
  n: number;
  mode: Mode;
  done: Record<Mode, boolean>;
  setN: (n: number) => void;
  setMode: (m: Mode) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  // interact() is called only through reach(): the reveal is earned by the two 1,000-listener
  // states, not by any two presses (minInteractions = 2).
  const go = (nn: number, m: Mode) => {
    if (nn === TOTAL) reach(m === "on" ? "copy-1000" : "nocopy-1000");
  };
  const st = n > 0 ? stats(mode, n) : null;
  const summary = (m: Mode) => {
    if (!done[m]) return "?";
    const x = stats(m, TOTAL);
    return span(x.high, x.low);
  };
  const label = st
    ? `Copying ${mode}, ${n.toLocaleString("en")} listeners: best song finishes ${st.fin.join(", ")}`
    : "8 empty worlds, no listeners yet";

  return (
    <div className={s.wrap}>
      <p className={s.rule}>
        {mode === "on" ? "Pick weight = appeal × (1 + earlier picks)" : "Pick weight = appeal only"} · appeal 1.0–1.7
      </p>
      <svg viewBox={`0 0 ${4 * PW + 3 * GAP} ${ROW + PH + 20}`} className={`stage-svg ${s.svg}`} role="img" aria-label={label}>
        {RUNS[mode].map((w, k) => {
          const px = (k % 4) * (PW + GAP);
          const py = Math.floor(k / 4) * ROW;
          const p = w[n / STEP];
          const f = st?.fin[k];
          const lowest = st !== null && f === st.low;
          return (
            <g key={k} transform={`translate(${px} ${py})`} role="img"
              aria-label={st ? `World ${k + 1}: best song ${ord(f!)} of 8, top song ${pct(st.top[k])}%` : `World ${k + 1}: empty`}>
              <rect x={0.75} y={0.75} width={PW - 1.5} height={PH - 1.5} rx={4} className={lowest ? s.frameLow : s.frame} />
              <text x={5} y={12} className={s.world}>{k + 1}</text>
              {p.map((v, i) => (
                  <rect key={i} x={X0 + i * PITCH} y={BASE - BAR_H} width={BW} height={BAR_H}
                    className={i === 7 ? s.best : s.bar}
                    style={{ transform: `scaleY(${n ? Math.min(v / n / 0.5, 1) : 0})` }} />
                ))}
              <line x1={X0 - 1} x2={X0 + 7 * PITCH + BW + 1} y1={BASE + 0.5} y2={BASE + 0.5} className={s.base} />
              <Tri cx={X0 + 7 * PITCH + BW / 2} y={BASE + 3} />
              <text x={PW / 2} y={PH + 15} className={lowest ? s.finLow : s.fin}>{f ? ord(f) : "?"}</text>
            </g>
          );
        })}
      </svg>
      <div className={s.legend}>
        <span>
          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden>
            <Tri cx={7} y={4} />
          </svg>{" "}
          best song
        </span>
        <span>Listeners {n.toLocaleString("en")} / 1,000</span>
      </div>
      <p className={s.summary} aria-live="polite">
        Best song finishes: on {summary("on")} · off {summary("off")}
      </p>
      <div className={s.controls}>
        <Control className={s.tap} disabled={locked || n >= TOTAL}
          onClick={() => { const nn = n + STEP; setN(nn); go(nn, mode); }}>
          +100 listeners
        </Control>
        <Control className={s.tap} disabled={locked || n >= TOTAL}
          onClick={() => { setN(TOTAL); go(TOTAL, mode); }}>
          All 1,000
        </Control>
      </div>
      <div className={s.controls} role="group" aria-label="Copy others">
        <span className={s.groupLabel}>Copy others</span>
        {(["on", "off"] as const).map((m) => (
          <Control key={m} className={`${s.tap} ${s.chip} ${m === mode ? "active" : ""}`}
            disabled={locked || m === mode} aria-pressed={m === mode} aria-label={`Copying ${m}`}
            onClick={() => { setMode(m); go(n, m); }}>
            {m === "on" ? "On" : "Off"}
          </Control>
        ))}
      </div>
    </div>
  );
}
