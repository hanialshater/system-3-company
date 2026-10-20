"use client";

// Model collapse, counts only. Ten words; the data is 50 words (zebra and owl 1 each = 2%).
// Each generation the "next model" is just the word frequencies of SAMPLE words drawn from the
// previous generation's frequencies. A word whose count hits 0 can never be drawn again.
// Chance zebra vanishes in one generation of 50 draws: 0.98^50 = 36.4%. With 500 draws: 0.98^500.
// Runs are seeded with mulberry32: run r, generation g uses seed r * 1000 + g (runs 1, 2, 3, ...
// in order, untuned).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const WORDS = ["the", "cat", "sat", "mat", "dog", "ran", "sun", "hat", "owl", "zebra"];
const START = [12, 9, 7, 6, 5, 4, 3, 2, 1, 1]; // out of 50
const BASE = 50;
const RARE = 9; // zebra
const SIZES = [50, 500] as const;

/** Draw `size` words from the frequencies in `counts` (which sum to `total`). */
function nextGen(counts: number[], size: number, seed: number) {
  const total = counts.reduce((a, b) => a + b, 0);
  const rng = mulberry32(seed);
  const out = counts.map(() => 0);
  for (let i = 0; i < size; i++) {
    let u = rng() * total;
    let j = 0;
    while (u >= counts[j] || counts[j] === 0) {
      u -= counts[j];
      j++;
    }
    out[j]++;
  }
  return out;
}
function history(run: number, gens: number, size: number) {
  const h = [START.map((c) => (c * size) / BASE)];
  for (let g = 1; g <= gens; g++) h.push(nextGen(h[g - 1], size, run * 1000 + g));
  return h;
}
const exactLoss = (size: number) => (1 - START[RARE] / BASE) ** size;
// MODEL END

const MAX_GEN = 40;

export default function CopyOfACopy({ slug }: { slug: string }) {
  const [run, setRun] = useState(1);
  const [gen, setGen] = useState(0);
  const [size, setSize] = useState<number>(50);
  const [big, setBig] = useState<{ gen: number; alive: number } | null>(null);
  const [lostSeen, setLostSeen] = useState<{ run: number; gen: number; words: string[] } | null>(null);

  const h = history(run, gen, size);
  const counts = h[gen];
  const alive = counts.filter((c) => c > 0).length;
  const maxC = Math.max(...counts, 1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A word makes up ${(START[RARE] / BASE) * 100}% of your training data. You train the next model on ${BASE} words sampled from that data. What is the chance the word never appears, and so is lost for good?`,
        options: ["About 2%", `About ${Math.round(exactLoss(BASE) * 100)}%`, "About 98%"],
        answer: 1,
      }}
      exploreHint="Run generations and watch the rare words. Then try 500 words per generation."
      minInteractions={2}
      reveal={() => {
        return (
          <>
            <p>
              {lostSeen ? (
                <>
                  In your run {lostSeen.run}, by generation {lostSeen.gen}, <strong>{lostSeen.words.join(", ")}</strong> had hit
                  zero, and nothing brings a zero back.{" "}
                </>
              ) : null}
              Each of the {BASE} draws misses &quot;{WORDS[RARE]}&quot; with chance 0.98, so all {BASE} miss it with 0.98
              <sup>{BASE}</sup> = <strong>{(exactLoss(BASE) * 100).toFixed(1)}%</strong>, about one run in three.
            </p>
            <p>
              In this toy, once a count is zero the next model cannot produce that word, so losses only pile up.{" "}
              {big
                ? `With ${SIZES[1]} words per generation, ${big.alive} of ${WORDS.length} words were left after ${big.gen} generations: bigger samples slow the losing, they do not undo it.`
                : `Bigger samples slow the losing; they do not undo it.`}
            </p>
            <p className="muted">Toy: counts only, no real model. Shumailov et al. (2024, Nature) report rare cases vanishing first when real models are trained on model output.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["lost-for-good", "big-sample"]}>
          {(reach) => {
            const goTo = (g: number) => {
              const n = Math.min(MAX_GEN, g);
              setGen(n);
              const c = history(run, n, size)[n];
              const lost = WORDS.filter((_, i) => c[i] === 0);
              if (lost.length) setLostSeen({ run, gen: n, words: lost });
              if (n >= 3 && lost.length) reach("lost-for-good");
            };
            const W = 30;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy: word counts only · no real model</span>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={`Generation ${gen}: ${alive} words left`}>
                  <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                    {locked ? `Generation 0: ${BASE} words` : `Generation ${gen} · ${size} words drawn each time`}
                  </text>
                  {WORDS.map((w, i) => {
                    const c = counts[i];
                    const hgt = (c / maxC) * 110;
                    const x = 10 + i * W + 2;
                    return (
                      <g key={w}>
                        <rect x={x} y={136 - hgt} width={W - 6} height={hgt} rx={3} fill={i === RARE ? "var(--bad)" : "var(--domain)"} />
                        <text x={x + (W - 6) / 2} y={132 - hgt} textAnchor="middle" className={s.tiny} fill="var(--fg)">
                          {c === 0 ? "gone" : c}
                        </text>
                        <text x={x + (W - 6) / 2} y={152} textAnchor="middle" className={s.tiny} fill={c === 0 ? "var(--muted)" : "var(--fg)"}>
                          {w}
                        </text>
                        {c === 0 && <line x1={x} y1={136} x2={x + W - 6} y2={136} stroke="var(--muted)" strokeWidth={2} />}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control disabled={locked || gen >= MAX_GEN} onClick={() => goTo(gen + 1)}>
                    Next generation
                  </Control>
                  <Control disabled={locked || gen >= MAX_GEN} onClick={() => goTo(gen + 10)}>
                    +10 generations
                  </Control>
                  <Control
                    disabled={locked}
                    onClick={() => {
                      const z = size === SIZES[0] ? SIZES[1] : SIZES[0];
                      setSize(z);
                      setGen(10);
                      if (z === SIZES[1]) {
                        const c = history(run, 10, z)[10];
                        setBig({ gen: 10, alive: c.filter((x) => x > 0).length });
                        reach("big-sample");
                      }
                    }}
                  >
                    {size === SIZES[0] ? `Run 10 generations of ${SIZES[1]} words` : `Back to ${SIZES[0]} words`}
                  </Control>
                  <Control
                    disabled={locked}
                    onClick={() => {
                      setRun((r) => r + 1);
                      setGen(0);
                    }}
                  >
                    New run
                  </Control>
                </Row>
                <Row>
                  <Readout label="Words left" value={locked ? "–" : `${alive} of ${WORDS.length}`} />
                  <Readout label="Run" value={locked ? "–" : run} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
