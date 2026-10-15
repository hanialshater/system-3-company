"use client";

// The Dunning-Kruger chart from noise (Big Ideas brief #4, dunning-kruger-artifact). The lesson's model:
// 1,000 people with real percentiles (i + 0.5) / 10; each guesses
//   guess = clamp(w × real + (1 − w) × noise + shift, 0, 100), noise uniform 0-100 from mulberry32(seed),
// with w = how much guesses track skill (0, 0.3, 1) and shift = 0 or +15 ("better than average").
// Grouped by real-score quarter, the chart draws mean real score and mean guess per quarter (the classic chart).
// Seed 42 first (the brief's check seed; it was not picked for its result: seeds 43 and 44 give 51.8 and 50.1).
// Controls (DOM order = QA order): Run (then "New 1,000 people", seed + 1), track 0 / 0.3 / 1, shift toggle.
// QA path: Run (seed 42, w 0: noise), 0 is active (disabled), 0.3, 1 (meet), shift on (shift).
// Milestones: noise (a run with w = 0, shift off: bottom guess recorded), meet (w = 1, shift off), shift (shift on).
// Learner r10 (W-840): a dotted mark for the 1999 study is on the stage, and when the reveal opens the stage shows the noise run with the shift (track 0, +15), which is what the reveal describes.

import { useEffect, useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 1000;
const SHIFT = 15;
const TRACKS = [0, 0.3, 1] as const;
const QNAMES = ["Bottom", "2nd", "3rd", "Top"];

function simulate(seed: number, w: number, shift: number) {
  const rnd = mulberry32(seed);
  const real = [0, 0, 0, 0];
  const guess = [0, 0, 0, 0];
  for (let i = 0; i < N; i++) {
    const r = ((i + 0.5) / N) * 100;
    const g = Math.min(100, Math.max(0, w * r + (1 - w) * rnd() * 100 + shift));
    const q = Math.floor(i / (N / 4));
    real[q] += r / (N / 4);
    guess[q] += g / (N / 4);
  }
  return { real, guess };
}

/** Kruger and Dunning's 1999 bottom quarter (real scores near the 12th percentile) estimated itself at the 62nd
 *  percentile (as reported in PMC3586194). Only this sourced bottom value is drawn, as a dotted mark on the bottom
 *  quarter (a dotted ring); the top quarter's value has no opened source and is not drawn (W-938, FC41). Claim c6. */
const PUBLISHED_BOTTOM = 62;

/** Runs once when the reveal opens. */
function OnReveal({ reveal, run }: { reveal: boolean; run: () => void }) {
  useEffect(() => {
    if (reveal) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reveal]);
  return null;
}

const ord = (n: number) => {
  const t = n % 100;
  const suf = t >= 11 && t <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] ?? "th";
  return `${n}${suf}`;
};

const X0 = 92;
const DX = 74;
const Y0 = 116;
const YH = 104;
const yOf = (v: number) => Y0 - (v / 100) * YH;
const xOf = (q: number) => X0 + q * DX;

export default function NoiseDrawsDunningKruger({ slug }: { slug: string }) {
  const [seed, setSeed] = useState<number | null>(null);
  const [w, setW] = useState<number>(0);
  const [shift, setShift] = useState(false);
  const [noiseSeen, setNoiseSeen] = useState<{ seed: number; g: number } | null>(null);
  const [meetSeen, setMeetSeen] = useState(false);

  const data = useMemo(() => (seed === null ? null : simulate(seed, w, shift ? SHIFT : 0)), [seed, w, shift]);
  const g = noiseSeen?.g ?? Math.round(simulate(42, 0, 0).guess[0]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "1,000 people take a test, then guess their percentile. Their guesses are pure random noise, unrelated to their scores. Grouped by real score, what does the bottom quarter guess on average?",
        options: ["About the 12th percentile, like their scores", "About the 50th percentile", "About the 88th percentile"],
        answer: 1,
      }}
      exploreHint="Run the noise, then let guesses track skill, then add the shift."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            With pure-noise guesses, the bottom quarter still guessed the {ord(g)} percentile on average: the famous pattern from
            randomness alone. When guesses matched skill, the lines met.
          </p>
          <p>
            Add a better-than-average shift and the bottom quarter now guessed the{" "}
            {ord(Math.round(simulate(seed ?? 42, 0, SHIFT).guess[0]))}, near the dotted {ord(PUBLISHED_BOTTOM)} that Kruger and
            Dunning&rsquo;s 1999 bottom quarter gave itself: looking even more overconfident.
          </p>
          <p>
            Where it stops: noise drawing the shape doesn’t prove there is no effect. Some analyses call it mostly a statistical
            artefact; others find a smaller real effect.
          </p>
        </>
      )}
    >
      {({ locked, phase, interact }) => (
        <Milestones interact={interact} names={["noise", "meet", "shift"]}>
          {(reach) => {
            const apply = (nSeed: number | null, nW: number, nShift: boolean) => {
              if (locked) return;
              setSeed(nSeed);
              setW(nW);
              setShift(nShift);
              if (nSeed === null) return;
              if (nW === 0 && !nShift) {
                if (!noiseSeen) setNoiseSeen({ seed: nSeed, g: Math.round(simulate(nSeed, 0, 0).guess[0]) });
                reach("noise");
              }
              if (nW === 1 && !nShift) {
                setMeetSeen(true);
                reach("meet");
              }
              if (nShift) reach("shift");
            };
            const line = (vals: number[]) => vals.map((v, q) => `${q ? "L" : "M"} ${xOf(q)} ${yOf(v)}`).join(" ");
            const msg = locked
              ? "Make a prediction to start."
              : seed === null
                ? "Guesses are pure noise. Run 1,000 people."
                : `Seed ${seed} · guesses track skill ${w} · shift ${shift ? `+${SHIFT}` : "off"}`;
            return (
              <div className={s.wrap}>
                <OnReveal
                  reveal={phase === "reveal"}
                  run={() => {
                    // Learner r10 (W-840): the reveal describes the noise run with the shift, so show that run.
                    setW(0);
                    setShift(true);
                    if (seed === null) setSeed(42);
                  }}
                />
                <p className={s.msg} aria-live="polite">
                  {msg}
                </p>
                <svg viewBox="0 0 360 136" className="stage-svg" role="img" aria-label="Mean real score and mean guess by quarter">
                  {[0, 50, 100].map((v) => (
                    <g key={v}>
                      <line x1={X0 - 12} y1={yOf(v)} x2={xOf(3) + 10} y2={yOf(v)} stroke="var(--line)" strokeWidth={1} />
                      <text x={xOf(3) + 14} y={yOf(v) + 4} className={s.lab}>
                        {v ? `${v}th` : v}
                      </text>
                    </g>
                  ))}
                  {QNAMES.map((n, q) => (
                    <text key={n} x={xOf(q)} y={Y0 + 15} textAnchor="middle" className={s.lab}>
                      {n} ¼
                    </text>
                  ))}
                  {data && !locked ? (
                    <>
                      <circle cx={xOf(0)} cy={yOf(PUBLISHED_BOTTOM)} r={10} fill="none" stroke="var(--muted)" strokeWidth={2} strokeDasharray="2 3" strokeLinecap="round" />
                      <text x={xOf(0) - 8} y={yOf(76)} textAnchor="start" className={s.lab}>
                        1999 study: {ord(PUBLISHED_BOTTOM)}
                      </text>
                      <path d={line(data.real)} fill="none" stroke="var(--fg)" strokeWidth={2.5} strokeDasharray="6 4" />
                      <path d={line(data.guess)} fill="none" stroke="var(--domain)" strokeWidth={3.5} />
                      {data.real.map((v, q) => (
                        <circle key={`r${q}`} cx={xOf(q)} cy={yOf(v)} r={4} fill="var(--fg)" />
                      ))}
                      {data.guess.map((v, q) => (
                        <circle key={`g${q}`} cx={xOf(q)} cy={yOf(v)} r={5} fill="var(--domain)" />
                      ))}
                      <text x={X0 - 12} y={Math.min(yOf(data.guess[0]), yOf(data.real[0]) - 16) + 4} textAnchor="end" className={s.val}>
                        guess {Math.round(data.guess[0])}
                      </text>
                      <text x={X0 - 12} y={Math.max(yOf(data.real[0]), yOf(data.guess[0]) + 16) + 4} textAnchor="end" className={s.real}>
                        real {data.real[0].toFixed(1)}
                      </text>
                    </>
                  ) : null}
                </svg>
                <p className={s.trace}>
                  {noiseSeen ? (
                    <>
                      Noise (seed {noiseSeen.seed}): bottom ¼ guessed <strong>{noiseSeen.g}</strong>
                    </>
                  ) : null}
                  {noiseSeen && meetSeen ? " · " : null}
                  {meetSeen ? "Tracking 1: lines met" : null}
                  {!noiseSeen && !meetSeen ? " " : null}
                </p>
                <div className={s.controls}>
                  <Control disabled={locked} onClick={() => apply(seed === null ? 42 : seed + 1, w, shift)}>
                    {seed === null ? "Run" : "New run"}
                  </Control>
                  {TRACKS.map((t) => (
                    <Control
                      key={t}
                      aria-label={`Guesses track skill ${t}`}
                      className={w === t ? "active" : ""}
                      aria-pressed={w === t}
                      disabled={locked || w === t}
                      onClick={() => apply(seed ?? 42, t, shift)}
                    >
                      track {t}
                    </Control>
                  ))}
                  <Control
                    aria-label={`Better-than-average shift +${SHIFT}`}
                    className={shift ? "active" : ""}
                    aria-pressed={shift}
                    disabled={locked}
                    onClick={() => apply(seed ?? 42, w, !shift)}
                  >
                    +{SHIFT}
                  </Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
