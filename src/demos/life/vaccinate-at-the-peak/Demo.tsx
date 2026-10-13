"use client";

// Toy SIR model: a made-up disease, R0 = 3 (infection 0.6/day, recovery 0.2/day), well mixed,
// nobody immune, 0.1% sick on day 0, Euler steps of 0.01 day to day 200. On the chosen day, 20%
// of the town is vaccinated at once, all of them people never infected so far (instant, perfect
// protection). The town of 400 shows the final outcome: red = ever infected, blue-green =
// vaccinated, hollow = never infected. Dashed outline: ever infected with no vaccination.
// Deterministic. If doses went to random people instead, the peak result is much smaller
// (see RANDOM below; stated in the reveal).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BETA = 0.6, GAMMA = 0.2, I0 = 0.001;
const R0 = BETA / GAMMA; // 3
const DOSE = 0.2;
const END = 200;
const MAX_DAY = 60;
const TOWN = 400, COLS = 20, GAP = 14;
const MILESTONES = ["day-0", "peak", "another-day"] as const;

interface Out { ever: number; vax: number; sAtV: number; peakT: number }

function simulate(vday: number | null, random = false): Out {
  const dt = 0.01, per = Math.round(1 / dt);
  let S = 1 - I0, I = I0, V = 0, done = vday === null, sAtV = 0, pk = 0, peakT = 0;
  for (let k = 0; k <= END * per; k++) {
    const t = k / per;
    if (!done && vday !== null && t >= vday) {
      sAtV = S;
      const v = random ? DOSE * S : Math.min(DOSE, S);
      S -= v;
      V += v;
      done = true;
    }
    const inf = BETA * S * I * dt, rec = GAMMA * I * dt;
    S -= inf;
    I += inf - rec;
    if (I > pk) { pk = I; peakT = t; }
  }
  return { ever: 1 - S - V, vax: V, sAtV, peakT };
}

const NONE = simulate(null);
const PEAK_DAY = Math.round(NONE.peakT); // 19
const RUNS = Array.from({ length: MAX_DAY + 1 }, (_, d) => simulate(d));
const D0 = RUNS[0], DP = RUNS[PEAK_DAY];
const FRAC = (NONE.ever - DP.ever) / (NONE.ever - D0.ever); // ~0.77
const RANDOM_FRAC = (NONE.ever - simulate(PEAK_DAY, true).ever) / (NONE.ever - simulate(0, true).ever); // ~0.29
const pct = (x: number) => `${Math.round(100 * x)}%`;

function outline(n: number) {
  const full = Math.floor(n / COLS), part = n % COLS, W = COLS * GAP;
  const y1 = full * GAP, y2 = (full + 1) * GAP;
  return part === 0 ? `M0,0 H${W} V${y1} H0 Z` : `M0,0 H${W} V${y1} H${part * GAP} V${y2} H0 Z`;
}

function Stage({ locked, v, setV }: { locked: boolean; v: number | null; setV: (d: number | null) => void }) {
  const out = v === null ? NONE : RUNS[v];
  const nInf = Math.round(TOWN * out.ever);
  const nVax = Math.round(TOWN * out.vax);
  const when = v === null ? "" : v === PEAK_DAY ? ` (the peak)` : v < PEAK_DAY ? " (before the peak)" : " (after the peak)";
  const msg = locked
    ? `Make a prediction to start. Toy: R0 ${R0}, 20% vaccinated at once, all not yet infected.`
    : v === null
      ? `No vaccination: ${pct(NONE.ever)} infected in the end.`
      : `Day ${v}${when}: ${pct(out.sAtV)} not yet infected. Final: ${pct(out.ever)} infected (none: ${pct(NONE.ever)}).`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`-4 -4 ${COLS * GAP + 8} ${(TOWN / COLS) * GAP + 8}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {Array.from({ length: TOWN }, (_, i) => {
          const st = locked ? "never" : i < nInf ? "inf" : i < nInf + nVax ? "vax" : "never";
          return <circle key={i} cx={(i % COLS) * GAP + GAP / 2} cy={Math.floor(i / COLS) * GAP + GAP / 2} r={4.6} className={s[st]} />;
        })}
        {!locked && v !== null && <path d={outline(Math.round(TOWN * NONE.ever))} className={s.none} />}
      </svg>

      <div className={s.legend} aria-hidden>
        <span><i className={s.inf} />infected</span>
        <span><i className={s.vax} />vaccinated</span>
        <span><i className={s.never} />never</span>
        <span><i className={s.dash} />no vaccine</span>
      </div>

      <p className={s.msg} aria-live="polite">{msg}</p>

      <Row>
        <Control className={v === 0 ? "active" : ""} disabled={locked || v === 0} onClick={() => setV(0)}>Day 0</Control>
        <Control className={v === PEAK_DAY ? "active" : ""} disabled={locked || v === PEAK_DAY} onClick={() => setV(PEAK_DAY)}>Peak (day {PEAK_DAY})</Control>
        <Control className={v === 40 ? "active" : ""} disabled={locked || v === 40} onClick={() => setV(40)}>Day 40</Control>
        <Control className={v === null ? "active" : ""} disabled={locked || v === null} onClick={() => setV(null)}>Never</Control>
      </Row>
      <Slider label="Vaccinate on day" value={v ?? 0} min={0} max={MAX_DAY} disabled={locked} format={(d) => (v === null ? "none" : `day ${d}`)} onChange={setV} />
    </div>
  );
}

export default function VaccinateAtThePeak({ slug }: { slug: string }) {
  const [v, setVState] = useState<number | null>(null);
  const [days, setDays] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy epidemic, R0 = ${R0}, nobody immune. 20% of the town, all not yet infected, is vaccinated at once: on day 0, or at the peak (day ${PEAK_DAY}). At the peak, how much of the day-0 benefit is left?`,
        options: ["Almost none", "About half", `Most (about ${pct(FRAC)})`],
        answer: 2,
      }}
      exploreHint="Try day 0, the peak and one more date. Compare the red with the dashed outline."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With no vaccine {pct(NONE.ever)} are infected in the end. Day 0 brings that to {pct(D0.ever)}; the peak, to {pct(DP.ever)}. So the
            peak saves {(100 * (NONE.ever - DP.ever)).toFixed(1)} of the {(100 * (NONE.ever - D0.ever)).toFixed(1)} points day 0 saves: <strong>{pct(FRAC)}</strong>{" "}
            of the benefit.
            {days.length ? ` You also tried ${days.map((d) => `day ${d} (${pct(RUNS[d].ever)})`).join(", ")}.` : ""}
          </p>
          <p>
            The peak is not the end of the epidemic: on day {PEAK_DAY}, {pct(DP.sAtV)} of the town had never been infected.
            Protecting people then still removes a lot of the tail; by day 40 little is left to stop.
          </p>
          <p className="muted">
            Model, not guidance: instant, perfect protection, and doses only to people not yet infected. Given to random people instead, the
            peak keeps about {pct(RANDOM_FRAC)}.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              v={v}
              setV={(d) => {
                setVState(d);
                if (d === 0) reach("day-0");
                else if (d === PEAK_DAY) reach("peak");
                else {
                  reach("another-day");
                  if (d !== null) setDays((x) => (x.includes(d) ? x : [...x, d].slice(-3)));
                }
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
