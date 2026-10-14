"use client";

// Temperature sampling. Three candidate next words with fixed scores 2, 1, 0.
// p = exp(score / T) / sum. Cooler (T = 0.5) sharpens the odds to 86.7% for the top
// word; hotter flattens them toward a third each. The menu never changes: temperature
// reweights the same three words and can never add a fourth.
// v3: the stage shows score ÷ temperature per word (the cause), each temperature button draws
// 20 words, and the reveal waits for both a cool (0.5) and a hot (4) visit.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const WORDS = [
  { w: "mat", score: 2 },
  { w: "sofa", score: 1 },
  { w: "moon", score: 0 },
];
const TEMPS = [0.5, 1, 4];

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
  const [T, setT] = useState(1);
  const [drawsAt, setDrawsAt] = useState<Record<number, number[]>>({});
  const rand = useRef(rng(31));
  const p = probs(T);
  const draws = drawsAt[T] ?? null;

  // Each temperature button sets T and draws 20 words there, so a cool and a hot draw can be compared.
  const pick = (t: number, reach: (name: string) => void) => {
    setT(t);
    setDrawsAt((d) => ({ ...d, [t]: draw20(probs(t), rand.current) }));
    if (t === 0.5) reach("cool");
    if (t === 4) reach("hot");
  };

  const fmtDraw = (c: number[] | undefined) =>
    c ? WORDS.map(({ w }, i) => `${c[i]} ${w}`).join(", ") : "none";
  const div = (x: number) => String(Math.round((x / T) * 100) / 100);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Three candidate words have scores 2, 1, 0. At temperature 1 the top word has a 66.5% chance. Lower the temperature to 0.5 and its chance becomes:",
        options: ["About 87%", "Still 67%", "About 50%"],
        answer: 0,
      }}
      exploreHint="Press 0.5, then 4. Each press draws 20 words. Watch the score ÷ temperature column."
      minInteractions={TEMPS.length - 1}
      reveal={() => (
        <>
          <p>
            At temperature 1, “mat” had <strong>{pct(probs(1)[0])}</strong>. At 0.5 it rose to{" "}
            <strong>{pct(probs(0.5)[0])}</strong>: dividing by 0.5 turned the scores 2, 1, 0 into 4, 2, 0, doubling
            the gaps, and bigger gaps mean more lopsided odds. At 4 they shrank to 0.5, 0.25, 0, so the odds drifted
            toward a third each ({pct(probs(4)[0])} for mat).
          </p>
          <p>
            Your draws: {fmtDraw(drawsAt[0.5])} at 0.5; {fmtDraw(drawsAt[4])} at 4. The menu never changed: mat, sofa,
            moon every time. A hot model does not learn anything new; it only spreads its choices, picking unlikely
            words more often.
          </p>
          <p className="muted">
            The rule: chance ∝ e^(score ÷ temperature). Real language models use the same setting when they sample text.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["cool", "hot"]}>
          {(reach) => (
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
                        {score}÷{T}={div(score)}
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
                {locked ? "Lock in a guess to start." : draws ? `20 draws at ${T}: ${draws.join(" · ")}` : "Pick a temperature."}
              </p>
              <Row>
                {TEMPS.map((t) => (
                  <Control
                    key={t}
                    disabled={locked}
                    className={t === T ? "active" : ""}
                    onClick={() => pick(t, reach)}
                  >
                    {t === 0.5 ? "Cool 0.5" : t === 1 ? "Warm 1" : "Hot 4"}
                  </Control>
                ))}
                <Readout label="Temperature" value={T} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
