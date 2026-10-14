"use client";

// Toy SIR model: a made-up disease, R0 = 3 (infection 0.6/day, recovery 0.2/day), well mixed,
// nobody immune, 0.1% sick on day 0, Euler steps of 0.01 day to day 200. On the chosen day, 20%
// of the town is vaccinated at once, all of them people never infected so far (instant, perfect
// protection). The town of 400 shows the final outcome: red = ever infected, blue-green =
// vaccinated, hollow = never infected. Dashed outline: ever infected with no vaccination.
// Deterministic. If doses went to random people instead, the peak result is much smaller
// (simulate(day, true); no longer stated in the reveal since v5).
// v4 (r7): the reveal's arithmetic used decimals the stage never shows (18.4 of 23.8 points, 78%).
// It now works from the stage's whole percents (94 - 76 = 18 of 94 - 70 = 24 points, 75%). A "Seen"
// row keeps every final the reveal quotes (none, day 0, the peak, the last other date) and the
// peak's "not yet infected" share, so moving on does not erase them. When fewer than 20% are left
// to vaccinate (from day 23 on), the stage line says the dose was capped.
// v5 (learner r8, phone fit): reveal 118 -> about 80 words (the "other date" sentence and the random-doses 29%
// clause cut); the town is 40 x 10 dots instead of 20 x 20, so it fits beside the reveal at full size instead of
// being shrunk to a strip; the Seen row keeps day 40 once visited, as well as the last other date.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BETA = 0.6, GAMMA = 0.2, I0 = 0.001;
const R0 = Math.round((BETA / GAMMA) * 100) / 100; // 3 (rounded: 0.6/0.2 is 2.9999999999999996 in floats)
const DOSE = 0.2;
const END = 200;
const MAX_DAY = 60;
const TOWN = 400, COLS = 40, GAP = 14; // v5: 40 x 10 (was 20 x 20), so the town fits beside the reveal
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
const pct = (x: number) => `${Math.round(100 * x)}%`;
const whole = (x: number) => Math.round(100 * x); // the stage's rounding, in points
// Reveal arithmetic in the stage's rounding: 94 - 76 = 18 of 94 - 70 = 24 points -> 75%
const SAVED_P = whole(NONE.ever) - whole(DP.ever);
const SAVED_0 = whole(NONE.ever) - whole(D0.ever);
const FRAC_SHOWN = Math.round((100 * SAVED_P) / SAVED_0);

type Seen = { d0: boolean; peak: boolean; d40: boolean; other: number | null };

function outline(n: number) {
  const full = Math.floor(n / COLS), part = n % COLS, W = COLS * GAP;
  const y1 = full * GAP, y2 = (full + 1) * GAP;
  return part === 0 ? `M0,0 H${W} V${y1} H0 Z` : `M0,0 H${W} V${y1} H${part * GAP} V${y2} H0 Z`;
}

function Stage({ locked, v, setV, seen }: { locked: boolean; v: number | null; setV: (d: number | null) => void; seen: Seen }) {
  const out = v === null ? NONE : RUNS[v];
  const nInf = Math.round(TOWN * out.ever);
  const nVax = Math.round(TOWN * out.vax);
  const when = v === null ? "" : v === PEAK_DAY ? ` (the peak)` : v < PEAK_DAY ? " (before the peak)" : " (after the peak)";
  const msg = locked
    ? `Make a prediction to start. Toy: R0 ${R0}, 20% vaccinated at once, all not yet infected.`
    : v === null
      ? `No vaccination: ${pct(NONE.ever)} infected in the end.`
      : out.vax < DOSE - 1e-9
        ? `Day ${v}${when}: only ${pct(out.sAtV)} not yet infected, so only ${pct(out.vax)} vaccinated. Final: ${pct(out.ever)} infected.`
        : `Day ${v}${when}: ${pct(out.sAtV)} not yet infected. Final: ${pct(out.ever)} infected (none: ${pct(NONE.ever)}).`;
  const finals = [
    `none ${pct(NONE.ever)}`,
    ...(seen.d0 ? [`day 0 ${pct(D0.ever)}`] : []),
    ...(seen.peak ? [`day ${PEAK_DAY} ${pct(DP.ever)}`] : []),
    ...(seen.d40 ? [`day 40 ${pct(RUNS[40].ever)}`] : []),
    ...(seen.other !== null ? [`day ${seen.other} ${pct(RUNS[seen.other].ever)}`] : []),
  ];

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
      {!locked && (seen.d0 || seen.peak || seen.d40 || seen.other !== null) && (
        <p className={s.seen}>
          Seen, infected in the end: {finals.join(" · ")}
          {seen.peak ? `. Day ${PEAK_DAY}: ${pct(DP.sAtV)} not yet infected.` : ""}
        </p>
      )}

      <Row>
        <Control className={v === 0 ? "active" : ""} disabled={locked || v === 0} onClick={() => setV(0)}>Day 0</Control>
        <Control className={v === PEAK_DAY ? "active" : ""} disabled={locked || v === PEAK_DAY} onClick={() => setV(PEAK_DAY)}>Peak</Control>
        <Control className={v === 40 ? "active" : ""} disabled={locked || v === 40} onClick={() => setV(40)}>Day 40</Control>
        <Control className={v === null ? "active" : ""} disabled={locked || v === null} onClick={() => setV(null)}>Never</Control>
      </Row>
      <Slider label="Vaccinate on day" value={v ?? 0} min={0} max={MAX_DAY} disabled={locked} format={(d) => (v === null ? "none" : `day ${d}`)} onChange={setV} />
    </div>
  );
}

export default function VaccinateAtThePeak({ slug }: { slug: string }) {
  const [v, setVState] = useState<number | null>(null);
  const [seen, setSeen] = useState<Seen>({ d0: false, peak: false, d40: false, other: null });
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy epidemic: each sick person infects ${R0} others (R0 = ${R0}), nobody immune. 20% of the town, all not yet infected, is vaccinated at once: on day 0, or at the peak (day ${PEAK_DAY}). At the peak, how much of the day-0 benefit is left?`,
        options: ["Almost none of it", "About half of it", "About three quarters of it"],
        answer: 2,
      }}
      exploreHint="Try day 0, the peak and one more date. Compare the red with the dashed outline."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your Seen row: with no vaccine {pct(NONE.ever)} are infected in the end; day 0 brings that to {pct(D0.ever)}, the peak to{" "}
            {pct(DP.ever)}. So the peak saves {SAVED_P} of the {SAVED_0} points day 0 saves: <strong>about {FRAC_SHOWN}%</strong> of the
            benefit.
          </p>
          <p>
            The peak is not the end: on day {PEAK_DAY}, {pct(DP.sAtV)} had never been infected. Protecting them still cuts the tail; by day
            40 little is left to stop.
          </p>
          <p className="muted">Model, not guidance: instant, perfect protection.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              v={v}
              seen={seen}
              setV={(d) => {
                setVState(d);
                setSeen((p) =>
                  d === 0
                    ? { ...p, d0: true }
                    : d === PEAK_DAY
                      ? { ...p, peak: true }
                      : d === 40
                        ? { ...p, d40: true }
                        : d === null
                          ? p
                          : { ...p, other: d },
                );
                if (d === 0) reach("day-0");
                else if (d === PEAK_DAY) reach("peak");
                else {
                  reach("another-day");
                }
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
