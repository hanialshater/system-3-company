"use client";

// Where do long links land? Ring of 1,024 people: from any person there are 2 people at each ring
// distance d = 1..511 and 1 at d = 512. A long link lands at distance d with chance ∝ (people at d) × d^-q.
// Distances are grouped in doubling bands: 1, 2–3, 4–7, …, 128–255, 256–512 (9 bands).
// Exact sums (builder, Node, 2026-10-14), % of links per band:
//   q=0: 0.2 0.4 0.8 1.6 3.1 6.3 12.5 25.0 50.1
//   q=1: 14.7 12.2 11.1 10.6 10.4 10.3 10.2 10.2 10.2
//   q=2: 60.9 22.0 9.2 4.2 2.0 1.0 0.5 0.2 0.1
// v2: no rule is selected until the learner picks one (bars show "?"). Rule buttons run Uniform, 1/d², 1/d so the
// QA path ends on the question's rule. Under 1/d a compare line shows the cancellation for the question's two bands:
// distances x average chance per distance (relative to d = 1) -> share. Each rule seen before leaves a dashed outline
// of its tallest bar with its share, so the reveal's 50.1% and 60.9% stay on stage. Milestones q0, q2, q1, band.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const HALF = 512;
const BANDS = Array.from({ length: 9 }, (_, k) => ({ lo: 2 ** k, hi: k === 8 ? HALF : 2 ** (k + 1) - 1 }));
const label = (b: { lo: number; hi: number }) => (b.lo === b.hi ? `${b.lo}` : `${b.lo}–${b.hi}`);
const people = (d: number) => (d === HALF ? 1 : 2);

function shares(q: number): number[] {
  let tot = 0;
  for (let d = 1; d <= HALF; d++) tot += people(d) * Math.pow(d, -q);
  return BANDS.map((b) => {
    let x = 0;
    for (let d = b.lo; d <= b.hi; d++) x += people(d) * Math.pow(d, -q);
    return x / tot;
  });
}

const RULES = [
  { q: 0, name: "Uniform", short: "Uniform" },
  { q: 2, name: "Chance ∝ 1/d²", short: "1/d²" },
  { q: 1, name: "Chance ∝ 1/d", short: "1/d" },
];
const R1 = 2; // index of the 1/d rule (the question's)
const R0 = 0;
const R2 = 1;
/** Sum of d^-q over the distances in a band: how many distances, times their average chance relative to d = 1. */
const weight = (b: { lo: number; hi: number }, q: number) => {
  let x = 0;
  for (let d = b.lo; d <= b.hi; d++) x += Math.pow(d, -q);
  return x;
};
const sig2 = (x: number) => (x >= 0.1 ? x.toFixed(2) : x.toPrecision(2));
const QB = [1, 8]; // the question's bands: 2–3 and 256–512
const SHARES = RULES.map((r) => shares(r.q));
const pct = (x: number) => `${(100 * x).toFixed(1)}%`;
const frac = (n: number) => (n === 1 ? "1" : `1/${n.toLocaleString("en-US")}`);

// chart
const W = 320;
const H = 200;
const L = 10;
const B = 168;
const TOP = 22;
const YMAX = 0.65;
const bw = (W - 2 * L) / BANDS.length;
const yOf = (v: number) => B - ((B - TOP) * v) / YMAX;

export default function EveryScaleEquallyLikely({ slug }: { slug: string }) {
  const [rule, setRule] = useState<number | null>(null);
  const [seenRules, setSeenRules] = useState<number[]>([]);
  const [band, setBand] = useState(1);

  const sh = rule === null ? null : SHARES[rule];
  const q = rule === null ? 0 : RULES[rule].q;
  const b = BANDS[band];
  const count = b.hi - b.lo + 1;
  const each = q === 0 ? "same as d = 1" : `${frac(b.lo ** q)} to ${frac(b.hi ** q)} of d = 1`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "On a ring of 1,024, links land at distance d with chance ∝ 1/d. More likely: 2–3 away or 256–512 away?",
        options: ["2–3 away", "256–512 away", "About equal"],
        answer: 2,
      }}
      exploreHint="Try all three rules, then slide across the bands under 1/d."
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            With 1/d links, the band 2–3 got {pct(SHARES[R1][1])} of links and 256–512 got {pct(SHARES[R1][8])}: 2
            distances at about {sig2(weight(BANDS[1], 1) / 2)} each against 257 at about {sig2(weight(BANDS[8], 1) / 257)}{" "}
            each (the compare line). Every band from 2–3 out gets 10–12%.
          </p>
          <p>
            Each band holds twice as many distances as the one before, and each of those distances is half as likely, so
            the two cancel. Uniform links put {pct(SHARES[R0][8])} in the farthest band; 1/d² links put {pct(SHARES[R2][0])}{" "}
            at distance 1 (the dashed outlines).
          </p>
          <p>
            So wherever a message is, a link that halves its remaining distance is about equally likely. That is why 1/d
            links route fast.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["q0", "q2", "q1", "band"]}>
          {(reach) => {
            const pick = (i: number) => {
              if (locked || i === rule) return;
              setRule(i);
              setSeenRules((xs) => (xs.includes(i) ? xs : [...xs, i]));
              reach(`q${RULES[i].q}`);
            };
            const ghosts = seenRules
              .filter((i) => i !== rule && i !== R1)
              .map((i) => {
                const top = SHARES[i].indexOf(Math.max(...SHARES[i]));
                return { i, top, v: SHARES[i][top] };
              });
            return (
              <div className={s.wrap}>
                <p className={s.note}>
                  {locked || rule === null ? "Share of links landing in each band of distances." : `${RULES[rule].name}: share of links per band.`}
                </p>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label="Share of links per distance band">
                  <line x1={L} y1={B} x2={W - L} y2={B} stroke="var(--line)" strokeWidth={1.5} />
                  {BANDS.map((bd, i) => {
                    const x = L + i * bw + 3;
                    const v = sh ? sh[i] : 0;
                    const on = i === band;
                    const ghost = ghosts.find((g) => g.top === i);
                    return (
                      <g key={bd.lo}>
                        {!locked && ghost && (
                          <>
                            <rect
                              x={x - 1}
                              y={yOf(ghost.v)}
                              width={bw - 4}
                              height={B - yOf(ghost.v)}
                              rx={2}
                              fill="none"
                              stroke="var(--fg)"
                              strokeDasharray="3 3"
                            />
                            <text
                              x={i < BANDS.length / 2 ? x : x + bw - 6}
                              y={yOf(ghost.v) - 4}
                              textAnchor={i < BANDS.length / 2 ? "start" : "end"}
                              className={s.tick}
                            >
                              {RULES[ghost.i].short} {pct(ghost.v)}
                            </text>
                          </>
                        )}
                        {!locked && sh && (
                          <>
                            <rect
                              x={x}
                              y={yOf(v)}
                              width={bw - 6}
                              height={Math.max(0.5, B - yOf(v))}
                              rx={2}
                              fill={on ? "var(--domain)" : "var(--muted)"}
                              opacity={on ? 1 : 0.55}
                            />
                            <text x={x + (bw - 6) / 2} y={yOf(v) - 4} textAnchor="middle" className={s.val}>
                              {Math.round(100 * v)}
                            </text>
                          </>
                        )}
                        {(locked || !sh) && (
                          <text x={x + (bw - 6) / 2} y={B - 6} textAnchor="middle" className={s.val}>
                            ?
                          </text>
                        )}
                        <text x={x + (bw - 6) / 2} y={B + 14} textAnchor="middle" className={on ? s.tickOn : s.tick}>
                          {bd.lo}
                        </text>
                      </g>
                    );
                  })}
                  <text x={L} y={12} className={s.tick}>
                    % of links
                  </text>
                  <text x={W - L} y={H - 4} textAnchor="end" className={s.tick}>
                    band: from distance d to 2d (ring of 1,024)
                  </text>
                </svg>
                <Row>
                  {RULES.map((r, i) => (
                    <Control
                      key={r.q}
                      className={`tap ${!locked && rule === i ? "active" : ""}`}
                      disabled={locked || rule === i}
                      onClick={() => pick(i)}
                    >
                      {r.name}
                    </Control>
                  ))}
                </Row>
                <Slider
                  label="Band"
                  value={band}
                  min={0}
                  max={BANDS.length - 1}
                  disabled={locked}
                  format={(v) => label(BANDS[v])}
                  onChange={(v) => {
                    if (locked) return;
                    setBand(v);
                    if (rule === R1) reach("band"); // only under the question's rule
                  }}
                />
                {!locked && rule === R1 && (
                  <p className={s.compare} data-testid="compare">
                    Distances × chance each (d = 1 is 1):{" "}
                    {QB.map((k) => {
                      const bd = BANDS[k];
                      const n = bd.hi - bd.lo + 1;
                      return `${label(bd)}: ${n} × ${sig2(weight(bd, 1) / n)} ≈ ${sig2(weight(bd, 1))} → ${pct(SHARES[R1][k])}`;
                    }).join("  ·  ")}
                  </p>
                )}
                <Row>
                  <Readout label="Distances in band" value={count} />
                  <Readout label="Each distance" value={locked || !sh ? "?" : each} />
                  <Readout label="Band's share" value={locked || !sh ? "?" : pct(sh[band])} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
