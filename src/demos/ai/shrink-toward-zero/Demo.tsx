"use client";

// Bias-variance toy. True value mu = 0.5. Each estimate averages n = 4 readings with noise sd 1,
// so the plain average has sd 0.5. Estimator "factor c" reports c * average.
// Bias = (c - 1) * mu; spread (sd) = c * 0.5; expected squared error = bias^2 + spread^2
// = 0.25 (1 - c)^2 + 0.25 c^2. c = 1: 0.25. c = 0.5: 0.0625 + 0.0625 = 0.125 (the best c,
// mu^2 / (mu^2 + sigma^2/n) = 0.25 / 0.5). c = 0.2: 0.16 + 0.01 = 0.17.
// The 40 dots: mulberry32(1), Box-Muller normals, untuned; they illustrate spread only.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const MU = 0.5;
const SIGMA = 1;
const N_READ = 4;
const SD_AVG = SIGMA / Math.sqrt(N_READ); // 0.5
const bias = (c: number) => (c - 1) * MU;
const spread = (c: number) => c * SD_AVG;
const mse = (c: number) => bias(c) ** 2 + spread(c) ** 2;
const BEST = MU ** 2 / (MU ** 2 + SD_AVG ** 2); // 0.5
const FACTORS = [1, 0.5, 0.2] as const;
const AVERAGES = (() => {
  const r = mulberry32(1);
  const g = () => {
    const u = 1 - r();
    const v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  return Array.from({ length: 40 }, () => {
    let sum = 0;
    for (let i = 0; i < N_READ; i++) sum += MU + SIGMA * g();
    return sum / N_READ;
  });
})();
// MODEL END

const X = (v: number) => 160 + (v - MU) * 90;
const f2 = (v: number) => (Math.abs(v) < 0.005 ? "0.00" : v.toFixed(2));
const f3 = (v: number) => v.toFixed(3);

export default function ShrinkTowardZero({ slug }: { slug: string }) {
  const [c, setC] = useState(1);
  const [seen, setSeen] = useState<Record<string, boolean>>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `The true value is ${MU}. Each estimate averages ${N_READ} noisy readings (noise sd ${SIGMA}). A reports the average. B reports half the average (deliberately biased). Which has the lower average squared error (the miss, squared, averaged over many tries)?`,
        options: ["A, the honest average", "B, the shrunk one", "They are equal"],
        answer: 1,
      }}
      exploreHint="Shrink the estimates toward 0 and watch the error. Then shrink too far."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The plain average was right on average (bias 0) but scattered: spread {f2(spread(1))}, error {f3(mse(1))}. Halving it
            pulled every estimate toward 0: bias {f2(bias(0.5))}, spread {f2(spread(0.5))}, error {f3(mse(0.5))}, half as much.{" "}
            {seen.far ? `At ×0.2 the bias grew to ${f2(bias(0.2))} and the error rose again to ${f3(mse(0.2))}.` : ""}
          </p>
          <p>
            Average squared error is bias² plus spread². Shrinking trades a little bias for a lot less spread, until the bias
            costs more than the spread saves. Here the best factor is exactly {BEST}.
          </p>
          <p>Unbiased is not the same as best: a deliberately biased estimate can miss by less, on average.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["half", "too-far"]}>
          {(reach) => {
            const set = (v: number) => {
              const r = Math.round(v * 100) / 100;
              setC(r);
              if (Math.abs(r - 0.5) < 1e-9) {
                setSeen((x) => ({ ...x, half: true }));
                reach("half");
              }
              if (r <= 0.3) {
                setSeen((x) => ({ ...x, far: true }));
                reach("too-far");
              }
            };
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy · 40 sample estimates</span>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`Factor ${c}: estimates shrunk toward 0`}>
                  <line x1={10} y1={128} x2={310} y2={128} stroke="var(--line)" />
                  {[-1, 0, 0.5, 1, 1.5, 2].map((t) => (
                    <g key={t}>
                      <line x1={X(t)} y1={125} x2={X(t)} y2={131} stroke="var(--muted)" />
                      <text x={X(t)} y={143} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                        {t}
                      </text>
                    </g>
                  ))}
                  <line x1={X(MU)} y1={8} x2={X(MU)} y2={128} stroke="var(--good)" strokeWidth={2} strokeDasharray="5 3" />
                  <text x={X(MU) + 4} y={16} className={s.small} fill="var(--good)">
                    truth
                  </text>
                  {AVERAGES.map((a, i) => {
                    const v = (locked ? 1 : c) * a;
                    return (
                      <circle
                        key={i}
                        cx={Math.max(6, Math.min(314, X(v)))}
                        cy={28 + (i % 10) * 9.5}
                        r={3.6}
                        fill="var(--domain)"
                        opacity={0.8}
                      />
                    );
                  })}
                  {!locked && (
                    <line x1={X(c * MU)} y1={24} x2={X(c * MU)} y2={124} stroke="var(--fg)" strokeWidth={1.5} />
                  )}
                  {!locked && (
                    <text x={X(c * MU) - 4} y={121} textAnchor="end" className={s.tiny} fill="var(--fg)">
                      centre
                    </text>
                  )}
                </svg>
                <p className={s.caption}>Bias: centre minus truth. Spread: how scattered. A (×1) starts here: bias 0.00, spread 0.50, error 0.250.</p>
                <Row>
                  {FACTORS.map((f) => (
                    <Control key={f} className={c === f ? "active" : ""} disabled={locked || c === f} onClick={() => set(f)}>
                      {f === 1 ? "A: ×1" : f === 0.5 ? "B: ×0.5" : "×0.2"}
                    </Control>
                  ))}
                </Row>
                <Slider label="Shrink factor" value={c} min={0} max={1} step={0.05} disabled={locked} format={(v) => `×${v.toFixed(2)}`} onChange={set} />
                <Row>
                  <Readout label="Bias" value={f2(bias(c))} />
                  <Readout label="Spread" value={f2(spread(c))} />
                  <Readout label="Long-run sq. error" value={f3(mse(c))} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
