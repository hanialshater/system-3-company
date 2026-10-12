"use client";

// Temperature sampling. Three candidate next words with fixed scores 2, 1, 0.
// p = exp(score / T) / sum. Cooler (T = 0.5) sharpens the odds to 86.7% for the top
// word; hotter flattens them toward a third each. The menu never changes: temperature
// reweights the same three words and can never add a fourth.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

// MODEL START
const WORDS = [
  { w: "mat", score: 2 },
  { w: "sofa", score: 1 },
  { w: "moon", score: 0 },
];
const TEMPS = [0.25, 0.5, 1, 2, 4];

function probs(T: number) {
  const e = WORDS.map(({ score }) => Math.exp(score / T));
  const z = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / z);
}
// MODEL END

function rng(seed: number) {
  let v = seed >>> 0;
  return () => {
    v = (Math.imul(v, 1664525) + 1013904223) >>> 0;
    return v / 4294967296;
  };
}

function draw20(p: number[], r: () => number) {
  const counts = p.map(() => 0);
  for (let k = 0; k < 20; k++) {
    let x = r();
    let i = 0;
    while (i < p.length - 1 && x >= p[i]) x -= p[i++];
    counts[i]++;
  }
  return counts;
}

const pct = (x: number) => (x < 0.0005 ? "<0.1%" : `${(100 * x).toFixed(1)}%`);
const COLORS = ["var(--domain)", "var(--warn)", "var(--bad)"];

// Bar geometry (viewBox 320 × 150).
const BL = 64;
const BR = 250;

export default function TemperatureReshapes({ slug }: { slug: string }) {
  const [ti, setTi] = useState(2); // T = 1
  const [draws, setDraws] = useState<number[] | null>(null);
  const rand = useRef(rng(31));
  const T = TEMPS[ti];
  const p = probs(T);

  const setTemp = (i: number, interact: () => void) => {
    setTi(i);
    setDraws(null);
    if (TEMPS[i] === 0.5) interact(); // the reveal waits for the temperature in the question
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Three candidate words have scores 2, 1, 0. At temperature 1 the top word has a 66.5% chance. Lower the temperature to 0.5 and its chance becomes:",
        options: ["About 87%", "Still 67%", "About 50%"],
        answer: 0,
      }}
      exploreHint="Go cooler to 0.5, then hotter. Draw 20 words at each."
      reveal={() => (
        <>
          <p>
            At temperature 1, “mat” had <strong>{pct(probs(1)[0])}</strong>. At 0.5 it rose to{" "}
            <strong>{pct(probs(0.5)[0])}</strong>. Dividing the scores by 0.5 doubles the gaps between them, and bigger
            gaps mean more lopsided odds. At 4 the three words drift toward a third each ({pct(probs(4)[0])} for mat).
          </p>
          <p>
            The menu never changed: mat, sofa, moon, at every temperature. Temperature only sets how strongly the model
            favours its top choice. A hot model is not more inventive; it just picks unlikely words more often.
          </p>
          <p className="muted">
            The rule: chance ∝ e^(score ÷ temperature). Real language models use the same setting when they sample text.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <p className={s.prompt}>
            The cat sat on the <span className={s.blank}>…</span>
          </p>
          <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label="Chance of each next word">
            {WORDS.map(({ w, score }, i) => {
              const y = 14 + i * 46;
              return (
                <g key={w}>
                  <text x={BL - 8} y={y + 15} textAnchor="end" className={s.word} fill="var(--fg)">
                    {w}
                  </text>
                  <text x={BL - 8} y={y + 29} textAnchor="end" className={s.small} fill="var(--muted)">
                    score {score}
                  </text>
                  <rect x={BL} y={y} width={BR - BL} height={26} rx={5} fill="var(--bg-2)" />
                  <rect x={BL} y={y} width={(BR - BL) * p[i]} height={26} rx={5} fill={COLORS[i]} />
                  <text x={BR + 6} y={y + 18} className={s.word} fill="var(--fg)">
                    {pct(p[i])}
                  </text>
                  {draws && (
                    <g>
                      {Array.from({ length: draws[i] }, (_, k) => (
                        <circle key={k} cx={BL + 5 + k * 9} cy={y + 34} r={3} fill={COLORS[i]} />
                      ))}
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          <p className={s.msg} aria-live="polite">
            {locked ? "Lock in a guess to start." : draws ? `20 draws: ${draws.join(" · ")}` : " "}
          </p>
          <Row>
            <Control disabled={locked || ti === 0} onClick={() => setTemp(ti - 1, interact)}>
              Cooler
            </Control>
            <Readout label="Temperature" value={T} />
            <Control disabled={locked || ti === TEMPS.length - 1} onClick={() => setTemp(ti + 1, interact)}>
              Hotter
            </Control>
            <Control disabled={locked} onClick={() => setDraws(draw20(p, rand.current))}>
              Draw 20
            </Control>
          </Row>
        </div>
      )}
    </Lesson>
  );
}
