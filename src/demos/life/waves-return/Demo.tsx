"use client";

// Toy SIRS model: a made-up infection, R0 = 2 (infection 0.4/day, recovery 0.2/day), well mixed,
// no births, deaths or seasons. Immunity fades at rate 1/L per day (L = 100 days on average
// unless the learner changes it). 0.1% sick on day 0. Euler steps of 0.01 day, recorded daily.
// A town of 400 dots, filled row by row: hollow = susceptible, red = sick, solid = immune.
// The dashed outline marks half the town (1/R0). Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BETA = 0.4, GAMMA = 0.2, I0 = 0.001;
const R0 = BETA / GAMMA; // 2
const CX0 = 30, CX1 = 296, CY0 = 6, CY1 = 60;
const cx = (d: number) => CX0 + ((CX1 - CX0) * d) / DAYS;
const cy = (v: number) => CY1 - (CY1 - CY0) * v;
const trace = (a: number[], upTo: number) => a.slice(0, upTo + 1).map((v, d) => `${d ? "L" : "M"}${cx(d).toFixed(1)} ${cy(v).toFixed(1)}`).join(" ");
const DAYS = 900;
const SETTLED = 700;
const LS = [100, 50, 200];
const L_Q = 100;
const TOWN = 400, COLS = 20, GAP = 14;
const MILESTONES = ["a-peak", "settled", "other-immunity"] as const;

interface Run { S: number[]; I: number[]; peaks: number[]; peakS: number[] }

function simulate(L: number): Run {
  const dt = 0.01, per = Math.round(1 / dt);
  let S = 1 - I0, I = I0, R = 0;
  const outS = [S], outI = [I];
  for (let k = 1; k <= DAYS * per; k++) {
    const inf = BETA * S * I * dt, rec = GAMMA * I * dt, wan = (R / L) * dt;
    S += wan - inf;
    I += inf - rec;
    R += rec - wan;
    if (k % per === 0) { outS.push(S); outI.push(I); }
  }
  // Peaks are the daily snapshots the stage shows (a local maximum of the sick share), so the
  // susceptible share quoted at a peak is the same number the stage prints on that day.
  const peaks: number[] = [], peakS: number[] = [];
  for (let d = 1; d < DAYS; d++) {
    if (outI[d] > outI[d - 1] && outI[d] >= outI[d + 1]) { peaks.push(d); peakS.push(outS[d]); }
  }
  return { S: outS, I: outI, peaks, peakS };
}

const RUNS = new Map(LS.map((L) => [L, simulate(L)]));
const pct = (x: number) => `${Math.round(100 * x)}%`;
const pct1 = (x: number) => `${(100 * x).toFixed(1)}%`;
const RQ = RUNS.get(L_Q)!;

function outline(n: number) {
  const full = Math.floor(n / COLS), part = n % COLS, W = COLS * GAP;
  const y1 = full * GAP, y2 = (full + 1) * GAP;
  return part === 0 ? `M0,0 H${W} V${y1} H0 Z` : `M0,0 H${W} V${y1} H${part * GAP} V${y2} H0 Z`;
}

interface Seen { peaks: number[]; settledS: number | null }

function Stage({
  locked,
  reach,
  onSeen,
}: {
  locked: boolean;
  reach: (n: string) => void;
  onSeen: (f: (x: Seen) => Seen) => void;
}) {
  const [day, setDay] = useState(0);
  const [L, setL] = useState(L_Q);
  const run = RUNS.get(L)!;

  const go = (d: number, l: number) => {
    const dd = Math.max(0, Math.min(DAYS, Math.round(d)));
    setDay(dd);
    setL(l);
    const rr = RUNS.get(l)!;
    const k = rr.peaks.indexOf(dd);
    if (k >= 0) {
      reach("a-peak");
      if (l === L_Q) onSeen((x) => (x.peaks.includes(k + 1) ? x : { ...x, peaks: [...x.peaks, k + 1].sort((a, b) => a - b) }));
    }
    if (dd >= SETTLED && l !== L_Q) reach("other-immunity");
    if (dd >= SETTLED) {
      reach("settled");
      if (l === L_Q) onSeen((x) => ({ ...x, settledS: rr.S[dd] }));
    }
  };

  const S = run.S[day], I = run.I[day];
  const nS = Math.round(TOWN * S);
  const nI = Math.round(TOWN * I);
  const k = run.peaks.indexOf(day);
  const next = run.peaks.find((p) => p > day);
  const msg = locked
    ? `Make a prediction to start. Toy: R0 ${R0}, immunity fades after about ${L_Q} days.`
    : `Day ${day}: ${pct1(S)} susceptible, ${pct1(I)} sick${k >= 0 ? ` (peak of wave ${k + 1})` : ""}.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`-4 -4 ${COLS * GAP + 8} ${(TOWN / COLS) * GAP + 8}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {Array.from({ length: TOWN }, (_, i) => {
          const st = locked ? "sus" : i < nS ? "sus" : i < nS + nI ? "sick" : "imm";
          return <circle key={i} cx={(i % COLS) * GAP + GAP / 2} cy={Math.floor(i / COLS) * GAP + GAP / 2} r={4.6} className={s[st]} />;
        })}
        <path d={outline(TOWN / R0)} className={s.half} />
      </svg>

      <svg viewBox="0 0 300 76" className={`stage-svg ${s.chart}`} role="img" aria-label={`Share susceptible and share sick over ${DAYS} days; day ${day}`}>
        {[0, 0.5, 1].map((v) => (
          <g key={v}>
            <line x1={CX0} x2={CX1} y1={cy(v)} y2={cy(v)} className={v === 0.5 ? s.chartHalf : s.chartGrid} />
            <text x={CX0 - 4} y={cy(v) + 3} textAnchor="end" className={s.tick}>{pct(v)}</text>
          </g>
        ))}
        <text x={CX1} y={73} textAnchor="end" className={s.tick}>day {DAYS}</text>
        {!locked && (
          <>
            <path d={trace(run.S, day)} className={s.lineS} />
            <path d={trace(run.I, day)} className={s.lineI} />
            <line x1={cx(day)} x2={cx(day)} y1={CY0} y2={CY1} className={s.cursor} />
          </>
        )}
      </svg>

      <div className={s.legend} aria-hidden>
        <span><i className={s.sus} />susceptible (can catch it)</span>
        <span><i className={s.sick} />sick</span>
        <span><i className={s.imm} />immune</span>
        <span><i className={s.dash} />half the town</span>
        <span>grey: susceptible share; red: sick</span>
      </div>

      <p className={s.msg} aria-live="polite">{msg}</p>

      <Row>
        <Control disabled={locked || next === undefined} onClick={() => next !== undefined && go(next, L)}>Next wave peak</Control>
        <Control disabled={locked || day === DAYS} onClick={() => go(DAYS, L)}>Day {DAYS}</Control>
      </Row>
      <Slider label="Day" value={day} min={0} max={DAYS} step={5} disabled={locked} onChange={(v) => go(v, L)} />
      <Row>
        {LS.map((l) => (
          <Control key={l} className={L === l ? "active" : ""} aria-pressed={L === l} disabled={locked || L === l} onClick={() => go(day, l)}>
            Immunity {l} d
          </Control>
        ))}
      </Row>
    </div>
  );
}

export default function WavesReturn({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<Seen>({ peaks: [], settledS: null });
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A made-up infection: each sick person infects ${R0} others when everyone can catch it (R0 = ${R0}). Recovered people are immune, but immunity fades after about ${L_Q} days. After many waves the pattern settles. What share of the town can catch it then?`,
        options: ["Almost none", "About half", "Almost everyone"],
        answer: 1,
      }}
      exploreHint="Jump to a wave peak, then to day 900, then try another immunity length. Watch the grey line against the dashed half."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {seen.peaks.length
              ? `You saw wave ${seen.peaks[0]} peak with ${pct1(RQ.peakS[seen.peaks[0] - 1])} susceptible. `
              : ""}
            Each wave peaks when about half the town is susceptible, and by day {DAYS} the town settled at{" "}
            <strong>{pct1(RQ.S[DAYS])}</strong> susceptible, {pct1(RQ.I[DAYS])} sick.
          </p>
          <p>
            Above half, cases grow and use up susceptibles; below half, cases shrink while fading immunity refills them
            (the grey line). The infection holds the town at 1/R0 = {pct(1 / R0)}, whatever the immunity length: that only
            changes how many are sick and how far apart the waves are.
          </p>
          <p className="muted">Toy model: no births, deaths, seasons or vaccines. Numbers are made up.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} onSeen={setSeen} />}
        </Milestones>
      )}
    </Lesson>
  );
}
