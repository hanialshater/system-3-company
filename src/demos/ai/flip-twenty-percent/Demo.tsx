"use client";

// Label-noise ceiling toy. 100 test items; the answer key has exactly n of them flipped (noise slider
// 0..40%, step 10). The flipped items are the first n of a fixed shuffle (mulberry32 seed 1, untuned),
// so raising the noise adds flips. A "perfect" model always gives the true answer, so its measured score
// is exactly 100 - n: 80% at 20% noise, 60% at 40%. Which items are flipped does not change the score.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const N = 100;
const NOISE_Q = 20;
const ORDER = (() => {
  const rng = mulberry32(1);
  const a = Array.from({ length: N }, (_, i) => i);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
})();
/** Set of items whose key label is wrong at a given noise percent. */
const flippedAt = (noise: number) => new Set(ORDER.slice(0, Math.round((noise / 100) * N)));
/** The perfect model matches the key wherever the key is right. */
const scoreAt = (noise: number) => (100 * (N - flippedAt(noise).size)) / N;
const SCORE_Q = scoreAt(NOISE_Q); // 80
// MODEL END

export default function FlipTwentyPercent({ slug }: { slug: string }) {
  const [noise, setNoise] = useState(NOISE_Q);
  const [scored, setScored] = useState(false);
  const [seen, setSeen] = useState<number[]>([]);
  const flipped = flippedAt(noise);
  const top = seen.length ? Math.max(...seen) : NOISE_Q;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You grade a model that always knows the true answer on ${N} test questions. In your answer key, ${NOISE_Q} of them (${NOISE_Q}%) were recorded wrong at random. What score does the key give it?`,
        options: ["100%", `${SCORE_Q}%`, `${scoreAt(40)}%`],
        answer: 1,
      }}
      exploreHint="Score the never-wrong model, then change how noisy the key is."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            With {NOISE_Q}% of the key flipped, the never-wrong model scored {SCORE_Q}%. Every one of its {N - SCORE_Q} &quot;misses&quot;
            was the key&apos;s mistake, not the model&apos;s.
          </p>
          {top > NOISE_Q && (
            <p>
              At {top}% flipped it scored {scoreAt(top)}%: the ceiling falls one point for every point of noise.
            </p>
          )}
          <p>
            A score only measures agreement with its labels. Real benchmark test sets contain some wrong labels too, so near the top
            some remaining &quot;errors&quot; may be the key&apos;s.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["scored-at-question", "noise-changed-after-score"]}>
          {(reach) => {
            const show = !locked && scored;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy test set · model never wrong</span>
                <p className={s.caption}>{show ? "Green: model matches key. Red: the key is wrong." : "Each dot is one test question."}</p>
                <svg viewBox="58 0 204 196" className="stage-svg" role="img" aria-label={show ? `${flipped.size} key errors` : "100 test questions"}>
                  {Array.from({ length: N }, (_, i) => {
                    const cx = 70 + (i % 10) * 19;
                    const cy = 12 + Math.floor(i / 10) * 19;
                    const bad = flipped.has(i);
                    return (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r={6.5}
                        fill={show ? (bad ? "var(--bad)" : "var(--good)") : "var(--muted)"}
                        opacity={show ? 1 : 0.5}
                      />
                    );
                  })}
                </svg>
                <Row>
                  <Control
                    disabled={locked || scored}
                    onClick={() => {
                      setScored(true);
                      if (noise === NOISE_Q) reach("scored-at-question");
                    }}
                  >
                    Score the never-wrong model
                  </Control>
                </Row>
                <Row>
                  <Slider
                    label="Answer key flipped"
                    value={noise}
                    min={0}
                    max={40}
                    step={10}
                    disabled={locked}
                    format={(v) => `${v}%`}
                    onChange={(v) => {
                      setNoise(v);
                      if (scored) {
                        setSeen((xs) => (xs.includes(v) ? xs : [...xs, v]));
                        reach("noise-changed-after-score");
                        if (v === NOISE_Q) reach("scored-at-question");
                      }
                    }}
                  />
                </Row>
                <Row>
                  <Readout label="Key errors" value={show ? `${flipped.size} of ${N}` : "–"} />
                  <Readout label="Model's score" value={show ? `${scoreAt(noise)}%` : "–"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
