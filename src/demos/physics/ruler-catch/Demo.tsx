"use client";

// Ruler catch. A simulated catcher (seed 1) has a reaction time of 0.20 s plus a small seeded
// spread (sd about 0.025 s). The ruler falls from rest, d = g t^2 / 2, no air drag, and is caught
// at that mark. The stage shows the distance on a cm ruler and a time scale beside it (the same
// formula, so no equation is shown). The stage clock is simulated: it does not time the learner.
// Key state: five catches seen, clustered near 20 cm. QA path: "Drop once" (1), "Drop 5 times" (6).
// Every number comes from TRIALS (computed once from the seed) and fallCm/timeFor.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import { useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const MEAN_T = 0.2;
const SPREAD = 0.05;
const SEED = 1;
const N_TRIALS = 30;
const FIVE = 5;
const fallCm = (t: number) => 50 * G * t * t; // 100 * g t^2 / 2
const timeFor = (cm: number) => Math.sqrt((2 * cm) / 100 / G);
const rng = mulberry32(SEED);
const TRIALS = Array.from({ length: N_TRIALS }, () => {
  const t = MEAN_T + SPREAD * (rng() + rng() + rng() - 1.5);
  return Math.round(fallCm(t) * 10) / 10;
});
const ASKED_CM = 20;
const MILESTONES = ["five"] as const;

const RULER_TOP = 18;
const PX = 4; // px per cm
const RULER_BOTTOM = RULER_TOP + 45 * PX;
const yOf = (cm: number) => RULER_BOTTOM - cm * PX;
const TIME_TICKS = [0.1, 0.15, 0.2, 0.25, 0.3];

export default function RulerCatch({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [seen, setSeen] = useState(0); // most catches on the ruler at once; Clear does not erase what was seen
  const caught = TRIALS.slice(0, n);
  const last = caught[caught.length - 1];
  const everCaught = TRIALS.slice(0, Math.max(seen, 1));
  const lo = Math.min(...everCaught);
  const hi = Math.max(...everCaught);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ruler dropped without warning is caught at the ${ASKED_CM} cm mark. The catcher's reaction time was about...`,
        options: ["0.02 s", `${timeFor(ASKED_CM).toFixed(1)} s`, "2 s"],
        answer: 1,
      }}
      exploreHint="Drop the ruler a few times and watch where the fingers close."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your {Math.max(seen, 1)} catches closed between <strong>{lo.toFixed(1)}</strong> and <strong>{hi.toFixed(1)} cm</strong>, which is{" "}
            {timeFor(lo).toFixed(2)} to {timeFor(hi).toFixed(2)} s on the scale. A catch at {ASKED_CM} cm means{" "}
            <strong>{timeFor(ASKED_CM).toFixed(2)} s</strong>.
          </p>
          <p>
            The ruler falls from rest, so the distance grows with the square of the time. That makes a few centimetres a fine
            clock: near {ASKED_CM} cm, each extra centimetre is about {Math.round((timeFor(ASKED_CM + 1) - timeFor(ASKED_CM)) * 1000)} thousandths of a second.
            No air drag; the catcher here is simulated.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const drop = (k: number) => {
              const next = Math.min(N_TRIALS, n + k);
              setN(next);
              setSeen((x) => Math.max(x, next));
              if (next >= FIVE) reach("five");
            };
            const caption = locked
              ? "Make a prediction to start."
              : "Simulated catcher, not your reflex. The ruler falls from rest and is caught at a mark.";
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 212" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <rect x={100} y={RULER_TOP} width={40} height={45 * PX} className={s.ruler} />
                  {Array.from({ length: 10 }, (_, i) => (
                    <g key={i}>
                      <line x1={100} y1={yOf(i * 5)} x2={i % 2 === 0 ? 118 : 110} y2={yOf(i * 5)} className={s.tick} />
                      {i % 2 === 0 && (
                        <text x={96} y={yOf(i * 5) + 3.5} className={s.num}>
                          {i * 5}
                        </text>
                      )}
                    </g>
                  ))}
                  <text x={120} y={RULER_TOP - 5} className={s.unit}>
                    cm fallen
                  </text>
                  {caught.map((c, i) => (
                    <circle key={i} cx={128} cy={yOf(c)} r={2.6} className={i === caught.length - 1 ? s.dotNow : s.dot} />
                  ))}
                  {last !== undefined && (
                    <>
                      <line x1={70} y1={yOf(last)} x2={146} y2={yOf(last)} className={s.catch} />
                      <text x={4} y={yOf(last) + 4} className={s.now}>
                        {last.toFixed(1)} cm
                      </text>
                    </>
                  )}
                  <line x1={172} y1={yOf(0)} x2={172} y2={yOf(45)} className={s.tscale} />
                  {TIME_TICKS.map((t) => (
                    <g key={t}>
                      <line x1={172} y1={yOf(fallCm(t))} x2={182} y2={yOf(fallCm(t))} className={s.tscale} />
                      <text x={186} y={yOf(fallCm(t)) + 3.5} className={s.tlab}>
                        {t.toFixed(2)} s
                      </text>
                    </g>
                  ))}
                  <text x={166} y={RULER_TOP - 5} className={s.unit}>
                    time scale
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  <Control disabled={locked || n >= N_TRIALS} onClick={() => drop(1)}>
                    Drop once
                  </Control>
                  <Control disabled={locked || n >= N_TRIALS} onClick={() => drop(FIVE)}>
                    Drop {FIVE} times
                  </Control>
                  <Control disabled={locked || n === 0} onClick={() => setN(0)}>
                    Clear
                  </Control>
                </Row>
                <Row>
                  <Readout label="Catches" value={locked ? "?" : n} />
                  <Readout label="Last catch" value={locked || last === undefined ? "?" : `${last.toFixed(1)} cm = ${timeFor(last).toFixed(2)} s`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
