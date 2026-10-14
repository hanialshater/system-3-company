"use client";

// Offspring distribution for 100 cases with mean R = 2 new infections each.
// Even spread = Poisson(2). Uneven spread = negative binomial with dispersion k.
// The 100 cases are the distribution's expected shape, not a random run: case i
// gets the mean number infected over the i-th 1% slice of the distribution,
// rounded. Only where each case sits in the grid is shuffled (untuned seed,
// mulberry32(11)). Circle area = people that case infected.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const R = 2;
const CASES = 100;
const MILESTONES = ["uneven", "even"] as const;
type Mode = "k0.1" | "k1" | "even";
const MODES: { id: Mode; label: string; k: number }[] = [
  { id: "even", label: "Even", k: Infinity },
  { id: "k1", label: "Uneven", k: 1 },
  { id: "k0.1", label: "Very uneven", k: 0.1 },
];

function pmf(k: number, x: number) {
  if (k === Infinity) {
    let p = Math.exp(-R);
    for (let i = 1; i <= x; i++) p *= R / i;
    return p;
  }
  let p = Math.pow(k / (k + R), k);
  for (let i = 1; i <= x; i++) p *= ((i - 1 + k) / i) * (R / (k + R));
  return p;
}

/** Expected-shape allocation: mean of each 1% slice, rounded. */
function cases(k: number) {
  const P: number[] = [];
  for (let x = 0; x < 3000; x++) P.push(pmf(k, x));
  const out: number[] = [];
  let x = 0, left = P[0];
  for (let i = 0; i < CASES; i++) {
    let need = 1 / CASES, m = 0;
    while (need > 1e-15 && x < P.length) {
      const take = Math.min(need, left);
      m += take * x;
      need -= take;
      left -= take;
      if (left <= 1e-15) {
        x++;
        left = P[x] ?? 0;
      }
    }
    out.push(Math.round(m * CASES));
  }
  return out;
}

function summary(c: number[]) {
  const sorted = [...c].sort((a, b) => b - a);
  const total = c.reduce((a, b) => a + b, 0);
  return { zeros: c.filter((v) => v === 0).length, total, top10: sorted.slice(0, 10).reduce((a, b) => a + b, 0) };
}

const DATA = new Map(MODES.map((m) => [m.id, cases(m.k)]));
const SPOT = (() => {
  const rng = mulberry32(11);
  const idx = Array.from({ length: CASES }, (_, i) => i);
  for (let i = CASES - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
})();
// Numbers in the question and reveal come from the same allocation as the stage.
const U = summary(DATA.get("k0.1")!);
const E = summary(DATA.get("even")!);
const M = summary(DATA.get("k1")!);
const E_MAX = Math.max(...DATA.get("even")!);
const P0 = (k: number) => `${Math.round(100 * pmf(k, 0))}%`;

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [mode, setMode] = useState<Mode>("k1");
  const { reach } = useMilestones(interact, MILESTONES);
  const c = DATA.get(mode)!;
  const biggest = Math.max(...c);
  const sum = useMemo(() => summary(c), [c]);
  const go = (m: Mode) => {
    setMode(m);
    if (m === "k0.1") reach("uneven");
    if (m === "even") reach("even");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 300 300" className={`stage-svg ${s.svg}`} role="img" aria-label={locked ? "100 cases" : `${sum.zeros} of 100 cases infected no one`}>
        {c.map((n, i) => {
          const spot = SPOT[i];
          const x = (spot % 10) * 30 + 15, y = Math.floor(spot / 10) * 30 + 15;
          if (locked) return <circle key={i} cx={x} cy={y} r={3} className={s.zero} />;
          return (
            <g key={i}>
              {n === 0 ? <circle cx={x} cy={y} r={3} className={s.zero} /> : <circle cx={x} cy={y} r={2.1 * Math.sqrt(n)} className={s.case} />}
              {(n >= 10 || (n === biggest && n > 0)) && (
                <text x={x} y={y + 4} textAnchor="middle" className={s.num}>
                  {n}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. 100 cases (infected people), averaging 2 new infections each. Toy model."
          : mode === "even"
            ? `${sum.zeros} of 100 infected no one, even though spread is even: each case is a random draw around 2, not exactly 2. Area = people infected.`
            : `${sum.zeros} of 100 cases infected no one. Circle area = people infected.`}
      </p>

      <Row>
        {MODES.map((m) => (
          <Control key={m.id} className={`${s.chip} ${mode === m.id ? "active" : ""}`} aria-pressed={mode === m.id} disabled={locked || mode === m.id} onClick={() => go(m.id)}>
            {m.label}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Infected no one" value={locked ? "?" : sum.zeros} />
        <Readout label="Top 10 caused" value={locked ? "?" : `${Math.round((100 * sum.top10) / sum.total)}%`} />
        <Readout label="Average" value={(sum.total / CASES).toFixed(1)} />
      </Row>
    </div>
  );
}

export default function SpreadersAreRare({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "An outbreak averages 2 new infections per case, but spread is very uneven: a few people infect many, most infect few. What share of cases infect no one at all? (Even spread would be: everyone infects about 2, by chance.)",
        options: [`About ${P0(Infinity)}`, "About 40%", `About ${P0(0.1)}`],
        answer: 2,
      }}
      exploreHint="Switch to very uneven spread and count the empty circles. Then try even spread."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With very uneven spread, <strong>{U.zeros} of 100 cases infected no one</strong>, yet the average was still 2: the
            top 10 cases caused {Math.round((100 * U.top10) / U.total)}% of the infections. With even spread only {E.zeros} infected no one (the
            14% option was the even-spread number), and no case in this picture infected more than {E_MAX}. In between, {M.zeros} infected no one.
          </p>
          <p>An average of 2 does not mean each case infects 2: a few big spreaders cause most infections.</p>
          <p className="muted">
            &ldquo;Very uneven&rdquo; is an illustration, not a measured value for any disease. The 100 cases are an expected
            shape, rounded (totals 199 to 201), not one random outbreak.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
