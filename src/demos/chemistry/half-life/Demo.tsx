"use client";

// Half-life as 200 atoms, each with the same 50% chance per half-life, every time.
// The payoff: survivors are not "overdue". The share that decays stays near half at
// every step, however old the survivors are, and a new run keeps different atoms.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const COLS = 20;
const ROWS = 10;
const N = COLS * ROWS;
const MAX_STEPS = 8;

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

export default function HalfLife({ slug }: { slug: string }) {
  const [run, setRun] = useState(0);
  const [t, setT] = useState(0); // half-lives passed
  const [prevShares, setPrevShares] = useState<number[]>([]); // the previous run's shares, kept for the reveal
  const decayAt = useMemo(() => decayStepsFor(run), [run]);

  const aliveAt = (step: number) => decayAt.filter((d) => d > step).length;
  const left = aliveAt(t);
  const history = Array.from({ length: t }, (_, i) => {
    const before = aliveAt(i);
    const after = aliveAt(i + 1);
    return { before, gone: before - after };
  });
  const lastStep = history[history.length - 1];
  const shares = history.map((h) => Math.round((100 * h.gone) / h.before));
  const seen = shares.length ? shares : prevShares;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "200 radioactive atoms. After 3 half-lives about 25 are left. During the 4th half-life, what share of those 25 survivors decays?",
        options: ["About half", "More than half: they're overdue", "Fewer than half: they're the tough ones"],
        answer: 0,
      }}
      exploreHint="Tap Wait four times. Compare the share that decays at each step."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {seen.length ? `Your run, step by step: ${seen.map((x) => `${x}%`).join(", ")} decayed. ` : ""}
            Each half-life, roughly <strong>half</strong> of whatever was left decays, even the long survivors. With so
            few atoms the share wanders by chance, but nothing pushes it toward &ldquo;overdue&rdquo;.
          </p>
          <p>
            Atoms do not age. Every undecayed atom has the same 50% chance each half-life, however long it has lasted.
            So no one can say which atoms will be left; a new run keeps different ones. And the count halves to a
            quarter, an eighth, instead of running out after two half-lives.
          </p>
          <p className="muted">Carbon-14 does this with a half-life of about 5,700 years.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const wait = () => {
          if (locked || t >= MAX_STEPS || left === 0) return;
          interact();
          setT((x) => x + 1);
        };
        const newRun = () => {
          if (locked) return;
          interact();
          setPrevShares(shares);
          setRun((r) => r + 1);
          setT(0);
        };

        const msg = locked
          ? "Make a prediction to start."
          : !lastStep
            ? run > 0
              ? "Fresh atoms. Different ones will survive this time."
              : "200 atoms. Tap Wait to let one half-life pass."
            : `This half-life: ${lastStep.gone} of ${lastStep.before} decayed (${Math.round(
                (100 * lastStep.gone) / lastStep.before,
              )}%).`;

        return (
          <div className={s.wrap}>
            <svg
              viewBox={`0 0 ${COLS * 16} ${ROWS * 16}`}
              className="stage-svg"
              role="img"
              aria-label={`${left} of ${N} atoms remain after ${t} half-lives`}
            >
              {decayAt.map((d, i) => {
                const cx = (i % COLS) * 16 + 8;
                const cy = Math.floor(i / COLS) * 16 + 8;
                const alive = d > t;
                const justNow = !alive && d === t;
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

            <p className={s.cap}>Share decayed in each half-life (dashes mark 50%)</p>
            <ol className={s.hist} aria-label="Share decayed at each half-life">
              {Array.from({ length: Math.max(4, history.length) }, (_, i) => {
                const h = history[i];
                const pct = h ? Math.round((100 * h.gone) / h.before) : null;
                return (
                  <li key={i} className={s.histItem}>
                    <span className={s.barTrack}>
                      <span className={s.bar} style={{ height: `${pct ?? 0}%` }} />
                      <span className={s.half} />
                    </span>
                    <span className={s.pct}>{pct === null ? "·" : `${pct}%`}</span>
                    <span className={s.step}>{i + 1}</span>
                  </li>
                );
              })}
            </ol>

            <Row>
              <Control className="active" disabled={locked || t >= MAX_STEPS || left === 0} onClick={wait}>
                Wait 1 half-life
              </Control>
              <Control disabled={locked || t === 0} onClick={newRun}>
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
