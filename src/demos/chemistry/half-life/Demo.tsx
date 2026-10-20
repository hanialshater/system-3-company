"use client";

// Half-life as 200 atoms, each with the same 50% chance per half-life, every time.
// The payoff: survivors are not "overdue". The share that decays stays near half at
// every step, however old the survivors are, and a new run keeps different atoms.
//
// v2 (revision): the reveal is gated on watching one run through half-life 4, the question's
// step (the ~25 survivors). Waits are capped at 4, where about a dozen atoms are left; past that
// single steps swing to 0% or 100% by chance. "Wait to half-life 4" makes the key state one press
// (the QA contract presses each control once). The reveal quotes the run that reached 4, and in
// the reveal phase the stage shows that run again, so the text never describes a run not on screen.

import { useEffect, useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const COLS = 20;
const ROWS = 10;
const N = COLS * ROWS;
const KEY_STEP = 4;
const MAX_STEPS = KEY_STEP;
const MILESTONES = ["run-to-half-life-4"] as const;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** For each atom, the half-life during which it decays. Each step is an independent 50% coin. */
function decayStepsFor(run: number): number[] {
  const rnd = mulberry32(1009 + run * 7919);
  return Array.from({ length: N }, () => {
    let k = 1;
    while (rnd() >= 0.5 && k <= 64) k++;
    return k;
  });
}

function historyOf(decayAt: number[], t: number) {
  const aliveAt = (step: number) => decayAt.filter((d) => d > step).length;
  return Array.from({ length: t }, (_, i) => {
    const before = aliveAt(i);
    const gone = before - aliveAt(i + 1);
    return { before, gone, pct: before ? Math.round((100 * gone) / before) : 0 };
  });
}

function Gate({ interact, t, onKey }: { interact: () => void; t: number; onKey: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  useEffect(() => {
    if (t >= KEY_STEP) {
      onKey();
      reach("run-to-half-life-4");
    }
  });
  return null;
}

function PhaseSync({ phase, onPhase }: { phase: string; onPhase: (p: string) => void }) {
  useEffect(() => onPhase(phase), [phase, onPhase]);
  return null;
}

export default function HalfLife({ slug }: { slug: string }) {
  const [run, setRun] = useState(0);
  const [t, setT] = useState(0); // half-lives passed
  const [keyRun, setKeyRun] = useState<number | null>(null); // the latest run watched to half-life 4
  const [phaseNow, setPhaseNow] = useState("predict");

  // In the reveal, the stage shows the run the reveal describes.
  const showRun = phaseNow === "reveal" && keyRun !== null ? keyRun : run;
  const showT = phaseNow === "reveal" && keyRun !== null ? KEY_STEP : t;
  const decayAt = useMemo(() => decayStepsFor(showRun), [showRun]);
  const history = historyOf(decayAt, showT);
  const left = decayAt.filter((d) => d > showT).length;
  const lastStep = history[history.length - 1];
  const keyHistory = useMemo(() => (keyRun === null ? [] : historyOf(decayStepsFor(keyRun), KEY_STEP)), [keyRun]);
  const k4 = keyHistory[KEY_STEP - 1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your lab sample starts with 200 radioactive atoms. A half-life is the time in which about half of them decay; after 3 half-lives about 25 are left. During the 4th, what share of those 25 decays?",
        options: ["About half", "More than half: they're overdue", "Fewer than half: they're the tough ones"],
        answer: 0,
      }}
      exploreHint="Wait through 4 half-lives. Watch the share each time, down to the last survivors."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your atoms: {keyHistory.map((h) => `${h.pct}%`).join(", ")} decayed at half-lives 1 to {KEY_STEP}. In the 4th,{" "}
            {k4?.gone} of the {k4?.before} survivors went. They had already lasted 3 half-lives and still went at about
            the same rate. With only {k4?.before} atoms the share wobbles by chance, but nothing pushes it toward
            &ldquo;overdue&rdquo;.
          </p>
          <p>
            Atoms do not age. Every undecayed atom has the same 50% chance each half-life, however long it has lasted.
            So no one can say which atoms will be left; a new run keeps different ones. The count keeps halving: about a
            quarter left after two half-lives, an eighth after three.
          </p>
          <p className="muted">Carbon-14 does this with a half-life of about 5,700 years.</p>
        </>
      )}
    >
      {({ phase, locked, interact }) => {
        const frozen = locked || phase === "reveal";
        const msg = locked
          ? "Make a prediction to start."
          : !lastStep
            ? run > 0
              ? "Fresh atoms. Different ones will survive this time."
              : "200 atoms. Wait lets one half-life pass."
            : `Half-life ${showT}: ${lastStep.gone} of ${lastStep.before} decayed (${lastStep.pct}%).${
                showT >= MAX_STEPS && phase !== "reveal" ? " Few left now: start a new run." : ""
              }`;

        return (
          <div className={s.wrap}>
            <PhaseSync phase={phase} onPhase={setPhaseNow} />
            <Gate interact={interact} t={t} onKey={() => keyRun !== run && setKeyRun(run)} />
            <svg
              viewBox={`0 0 ${COLS * 16} ${ROWS * 16}`}
              className="stage-svg"
              role="img"
              aria-label={`${left} of ${N} atoms remain after ${showT} half-lives`}
            >
              {decayAt.map((d, i) => {
                const cx = (i % COLS) * 16 + 8;
                const cy = Math.floor(i / COLS) * 16 + 8;
                const alive = d > showT;
                const justNow = !alive && d === showT;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={alive ? 6 : justNow ? 5 : 2.5}
                    fill={alive ? "var(--domain)" : justNow ? "none" : "var(--line)"}
                    stroke={justNow ? "var(--muted)" : "none"}
                    strokeWidth={justNow ? 1.5 : 0}
                    strokeDasharray={justNow ? "2 2" : undefined}
                  />
                );
              })}
            </svg>

            <div className={s.legend}>
              <span>
                <i className={`${s.sw} ${s.swAlive}`} /> not yet decayed
              </span>
              <span>
                <i className={`${s.sw} ${s.swJust}`} /> just decayed
              </span>
            </div>

            <p className={s.msg} aria-live="polite">
              {msg}
            </p>

            <p className={s.cap}>Share decayed each half-life (dashes: 50%). Fewer atoms, more wobble.</p>
            <ol className={s.hist} aria-label="Share decayed at each half-life">
              {Array.from({ length: MAX_STEPS }, (_, i) => {
                const h = history[i];
                return (
                  <li key={i} className={s.histItem}>
                    <span className={s.barTrack}>
                      <span className={s.bar} style={{ height: `${h ? h.pct : 0}%` }} />
                      <span className={s.half} />
                    </span>
                    <span className={s.pct}>{h ? `${h.pct}%` : "·"}</span>
                    <span className={s.step}>of {h ? h.before : "?"}</span>
                  </li>
                );
              })}
            </ol>

            <Row>
              <Control
                className="active"
                disabled={frozen || t >= MAX_STEPS || left === 0}
                onClick={() => setT((x) => x + 1)}
              >
                Wait 1 half-life
              </Control>
              <Control disabled={frozen || t >= MAX_STEPS || left === 0} onClick={() => setT(MAX_STEPS)}>
                Wait to half-life {KEY_STEP}
              </Control>
              <Control
                disabled={frozen || t === 0}
                onClick={() => {
                  setRun((r) => r + 1);
                  setT(0);
                }}
              >
                New run
              </Control>
              <Readout label="Atoms left" value={left} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
