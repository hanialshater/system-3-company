"use client";

// Simple SIR model, well mixed, no interventions, a made-up disease.
// Infectious for 5 days on average (recovery rate 1/5 per day), transmission R0/5
// per day, 0.1% infected on day 0. Euler steps of 0.01 day. Deterministic.
// A town of 400 dots fills in the order people were infected (row by row):
// solid = has had it, red = sick now, hollow = never infected. The dashed outline
// marks the herd threshold 1 - 1/R0.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const TOWN = 400;
const COLS = 20;
const GAP = 14;
const DAYS = 100;
const D = 5;
const I0 = 0.001;
const R0S = [2, 3, 4];
const MILESTONES = ["peak", "end"] as const;

interface Run {
  S: number[];
  I: number[];
  peakDay: number;
}

function simulate(r0: number): Run {
  const beta = r0 / D, gamma = 1 / D, dt = 0.01, per = Math.round(1 / dt);
  let S = 1 - I0, I = I0, peak = 0, peakT = 0;
  const outS = [S], outI = [I];
  for (let step = 1; step <= DAYS * per; step++) {
    const inf = beta * S * I * dt, rec = gamma * I * dt;
    S -= inf;
    I += inf - rec;
    if (I > peak) {
      peak = I;
      peakT = step * dt;
    }
    if (step % per === 0) {
      outS.push(S);
      outI.push(I);
    }
  }
  return { S: outS, I: outI, peakDay: Math.round(peakT) };
}

const RUNS = new Map(R0S.map((r) => [r, simulate(r)]));
const pct = (x: number) => `${Math.round(100 * x)}%`;
// Numbers in the question and reveal come from the same run as the stage.
const R3 = RUNS.get(3)!;
const FINAL3 = pct(1 - R3.S[DAYS]); // "94%"
const THR3 = pct(1 - 1 / 3); // "67%"
const AT_PEAK3 = pct(1 - R3.S[R3.peakDay]);

/** Stepped outline around the first n dots (filled row by row). */
function outline(n: number) {
  const full = Math.floor(n / COLS), part = n % COLS, W = COLS * GAP;
  const y1 = full * GAP, y2 = (full + 1) * GAP;
  return part === 0 ? `M0,0 H${W} V${y1} H0 Z` : `M0,0 H${W} V${y1} H${part * GAP} V${y2} H0 Z`;
}

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [r0, setR0] = useState(3);
  const [day, setDay] = useState(0);
  const { reach } = useMilestones(interact, MILESTONES);
  const run = RUNS.get(r0)!;
  const go = (d: number, r: number) => {
    const dd = Math.max(0, Math.min(DAYS, d));
    setDay(dd);
    setR0(r);
    const rr = RUNS.get(r)!;
    if (r === 3 && Math.abs(dd - rr.peakDay) <= 1) reach("peak");
    if (r === 3 && dd >= 80) reach("end");
  };
  const ever = 1 - run.S[day];
  const sick = run.I[day];
  const nEver = Math.round(TOWN * ever);
  const nSick = Math.min(nEver, Math.round(TOWN * sick));
  const thr = 1 - 1 / r0;
  const nThr = Math.round(TOWN * thr);
  const dots = useMemo(() => Array.from({ length: TOWN }, (_, i) => i), []);
  const label = day === run.peakDay ? " (peak)" : "";

  return (
    <div className={s.wrap}>
      <svg viewBox={`-4 -4 ${COLS * GAP + 8} ${(TOWN / COLS) * GAP + 8}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Day ${day}: ${pct(ever)} have had it`}>
        {dots.map((i) => {
          const st = locked ? "never" : i < nEver - nSick ? "had" : i < nEver ? "sick" : "never";
          return <circle key={i} cx={(i % COLS) * GAP + GAP / 2} cy={Math.floor(i / COLS) * GAP + GAP / 2} r={4.6} className={s[st]} />;
        })}
        <path d={outline(nThr)} className={s.thr} />
      </svg>

      <div className={s.legend} aria-hidden>
        <span><i className={s.had} />had it</span>
        <span><i className={s.sick} />sick now</span>
        <span><i className={s.dash} />threshold {pct(thr)}</span>
      </div>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. Toy model: well mixed, no one immune, no interventions."
          : `R0 ${r0}, day ${day}${label}: ${pct(ever)} have had it, ${pct(sick)} sick now.`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || (r0 === 3 && day === run.peakDay)} onClick={() => go(RUNS.get(3)!.peakDay, 3)}>
          Peak (R0 3)
        </Control>
        <Control className={s.chip} disabled={locked || (r0 === 3 && day === DAYS)} onClick={() => go(DAYS, 3)}>
          Day {DAYS} (R0 3)
        </Control>
      </Row>
      <Slider label="Day" value={day} min={0} max={DAYS} disabled={locked} onChange={(v) => go(v, r0)} />
      <Row>
        {R0S.map((r) => (
          <Control key={r} className={`${s.chip} ${r0 === r ? "active" : ""}`} aria-pressed={r0 === r} disabled={locked || r0 === r} onClick={() => go(day, r)}>
            R0 {r}
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function EpidemicOvershoot({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Made-up disease, R0 = 3, no one immune, simple well-mixed model. Herd immunity needs ${THR3} immune. Roughly what share is eventually infected?`,
        options: [`About ${THR3}`, `About ${FINAL3}`, "100%"],
        answer: 1,
      }}
      exploreHint="Jump to the peak and look at the dashed threshold. Then jump to the end."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At the peak (day {R3.peakDay}), {AT_PEAK3} had had it, just about the {THR3} threshold (the peak comes exactly when it is crossed). But {pct(R3.I[R3.peakDay])} were
            still sick, and each went on infecting others. By day {DAYS}, <strong>{FINAL3}</strong> had been infected.
          </p>
          <p>
            The threshold is where each case starts infecting fewer than one new person, so cases begin to fall. It is not
            where infection stops. The people sick at that moment still pass it on, so the epidemic overshoots. The higher
            R0, the less is left uninfected.
          </p>
          <p className="muted">
            Model: a made-up disease, random mixing, lasting immunity, no behaviour change, vaccines or treatment. Real
            epidemics differ.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
