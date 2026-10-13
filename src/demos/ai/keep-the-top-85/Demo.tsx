"use client";

// Top-p (nucleus) sampling toy. Invented next-word odds after "I ate": pizza 45, rice 30, soup 15,
// cake 6, glue 4 (percent). Top-p keeps the fewest top words whose odds add to at least p, then
// rescales the survivors to total 100%. At p = 85: 45 + 30 + 15 = 90 >= 85, three kept, pizza 45/90 = 50%.
// "Draw 20" samples from the kept words with mulberry32(seed = draw number), untuned.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const WORDS = [
  { word: "pizza", p: 45 },
  { word: "rice", p: 30 },
  { word: "soup", p: 15 },
  { word: "cake", p: 6 },
  { word: "glue", p: 4 },
];
const P_Q = 85; // the question's p
const P_START = 75;
/** Number of top words kept at threshold p (percent). */
function keptCount(p: number) {
  let sum = 0;
  for (let k = 0; k < WORDS.length; k++) {
    sum += WORDS[k].p;
    if (sum >= p) return k + 1;
  }
  return WORDS.length;
}
const keptSum = (k: number) => WORDS.slice(0, k).reduce((a, w) => a + w.p, 0);
/** Rescaled share (percent) of word i when k words are kept. */
const share = (i: number, k: number) => (i < k ? (100 * WORDS[i].p) / keptSum(k) : 0);
function draw20(k: number, seed: number) {
  const rng = mulberry32(seed);
  const counts = WORDS.map(() => 0);
  const total = keptSum(k);
  for (let n = 0; n < 20; n++) {
    let r = rng() * total;
    let i = 0;
    while (i < k - 1 && r >= WORDS[i].p) {
      r -= WORDS[i].p;
      i++;
    }
    counts[i]++;
  }
  return counts;
}
const K_Q = keptCount(P_Q); // 3
const SUM_Q = keptSum(K_Q); // 90
const TOP_Q = share(0, K_Q); // 50
// MODEL END

const r0 = (v: number) => `${Math.round(v)}%`;

export default function KeepTheTop85({ slug }: { slug: string }) {
  const [p, setP] = useState(P_START);
  const [draws, setDraws] = useState(0);
  const [drawn, setDrawn] = useState<{ p: number; counts: number[] } | null>(null);
  const k = keptCount(p);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `After "I ate", invented odds: ${WORDS.map((w) => `${w.word} ${w.p}%`).join(", ")}. Keep the fewest top words that add up to at least ${P_Q}%, then rescale them to 100%. Pizza's chance becomes:`,
        options: [`Still ${WORDS[0].p}%`, `${r0(TOP_Q)}`, `${P_Q}%`],
        answer: 1,
      }}
      exploreHint={`Slide p to ${P_Q}%, then draw 20 words.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At p = {P_Q}%, the top {K_Q} words add to {WORDS.slice(0, K_Q).map((w) => w.p).join(" + ")} = {SUM_Q}%, so{" "}
            {WORDS.slice(K_Q).map((w) => w.word).join(" and ")} were cut. Rescaling divides by {SUM_Q}: pizza became {WORDS[0].p}/{SUM_Q} ={" "}
            {r0(TOP_Q)}.
          </p>
          {drawn && keptCount(drawn.p) < WORDS.length && (
            <p>
              In your 20 draws at p = {drawn.p}%, the cut words came up{" "}
              {drawn.counts.slice(keptCount(drawn.p)).reduce((a, b) => a + b, 0)} times. Cut words cannot come up at all.
            </p>
          )}
          <p>
            Some real text generators use this, called top-p or nucleus sampling: the unlikely tail is removed and its chance is
            shared among the words that stay.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["p-question", "drew-with-cut"]}>
          {(reach) => {
            const kk = locked ? WORDS.length : k;
            const barW = 44;
            const gap = 14;
            const x0 = 16;
            const base = 150;
            const scale = 1.3; // px per percent
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Invented odds</span>
                <p className={s.caption}>Top-p: keep top words until they add to p; rescale to 100%.</p>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`Top ${kk} words kept`}>
                  <line x1={8} y1={base} x2={312} y2={base} stroke="var(--line)" />
                  {WORDS.map((w, i) => {
                    const x = x0 + i * (barW + gap) + 2;
                    const kept = i < kk;
                    const now = locked ? w.p : share(i, kk);
                    const hOrig = w.p * scale;
                    const hNow = now * scale;
                    const count = !locked && drawn && drawn.p === p ? drawn.counts[i] : null;
                    return (
                      <g key={w.word}>
                        <rect x={x} y={base - hOrig} width={barW} height={hOrig} fill="none" stroke="var(--muted)" strokeDasharray="3 3" />
                        {kept && <rect x={x} y={base - hNow} width={barW} height={hNow} fill="var(--domain)" opacity={0.85} />}
                        <text x={x + barW / 2} y={base - Math.max(hNow, hOrig) - 4} textAnchor="middle" className={s.small} fill={kept ? "var(--fg)" : "var(--muted)"}>
                          {kept ? r0(now) : "cut"}
                        </text>
                        <text x={x + barW / 2} y={base + 14} textAnchor="middle" className={s.label} fill={kept ? "var(--fg)" : "var(--muted)"}>
                          {w.word}
                        </text>
                        {count !== null && (
                          <text x={x + barW / 2} y={base + 30} textAnchor="middle" className={s.small} fill={count > 0 ? "var(--good)" : "var(--muted)"}>
                            drawn {count}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  {!locked && draws > 0 && (
                    <text x={312} y={14} textAnchor="end" className={s.tiny} fill="var(--muted)">
                      draw set {draws}
                    </text>
                  )}
                </svg>
                <Row>
                  <Slider
                    label="p (keep until total ≥ p)"
                    value={p}
                    min={40}
                    max={100}
                    step={5}
                    disabled={locked}
                    format={(v) => `${v}%`}
                    onChange={(v) => {
                      setP(v);
                      if (v === P_Q) reach("p-question");
                    }}
                  />
                </Row>
                <Row>
                  <Control
                    disabled={locked}
                    onClick={() => {
                      const n = draws + 1;
                      setDraws(n);
                      setDrawn({ p, counts: draw20(k, n) });
                      if (k < WORDS.length) reach("drew-with-cut");
                    }}
                  >
                    Draw 20 words
                  </Control>
                  <Readout label="Words kept" value={locked ? "–" : `${k} of ${WORDS.length}`} />
                  <Readout label="Pizza now" value={locked ? "–" : r0(share(0, k))} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
