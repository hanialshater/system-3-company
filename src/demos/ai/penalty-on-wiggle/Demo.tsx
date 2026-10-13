"use client";

// Ridge regularisation. A degree-7 polynomial through 8 noisy training points fits them
// exactly (training miss 0) using huge coefficients. Ridge minimises
//   sum of squared misses + lambda * (sum of squared coefficients, intercept excluded),
// so any lambda > 0 moves off the exact fit and the training miss rises. On held-out points
// (40 more from the same noisy curve) the miss usually falls at a moderate lambda and rises
// again when lambda is too strong. Seed 1 is the first seed, untuned; "New data" steps through
// seeds 2, 3, ... In seeds 1-500 some lambda in 0.0001..1 beats lambda = 0 on held-out in 490.

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const DEG = 7;
const N_TRAIN = 8;
const N_HELD = 40;
const NOISE = 0.3;
const LAMBDAS = [0, 1e-4, 1e-3, 1e-2, 1e-1, 1, 10];
const truth = (x: number) => Math.sin(Math.PI * x * 0.8);
type Pt = [number, number];

function gauss(rng: () => number) {
  const u = Math.max(rng(), 1e-12);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

function makeData(seed: number) {
  const rng = mulberry32(seed);
  const train: Pt[] = [];
  for (let i = 0; i < N_TRAIN; i++) {
    const x = -1 + (2 * i) / (N_TRAIN - 1);
    train.push([x, truth(x) + NOISE * gauss(rng)]);
  }
  const held: Pt[] = [];
  for (let i = 0; i < N_HELD; i++) {
    const x = -1 + (2 * (i + 0.5)) / N_HELD;
    held.push([x, truth(x) + NOISE * gauss(rng)]);
  }
  return { train, held };
}

function solve(A: number[][], b: number[]) {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((r, i) => r[n] / r[i]);
}

/** Ridge fit: minimise sum (p(x) - y)^2 + lambda * sum_{j >= 1} w_j^2. */
function fit(train: Pt[], lambda: number) {
  const P = DEG + 1;
  const A = Array.from({ length: P }, () => Array<number>(P).fill(0));
  const b = Array<number>(P).fill(0);
  for (const [x, y] of train) {
    const f = Array.from({ length: P }, (_, j) => x ** j);
    for (let i = 0; i < P; i++) {
      b[i] += f[i] * y;
      for (let j = 0; j < P; j++) A[i][j] += f[i] * f[j];
    }
  }
  for (let i = 1; i < P; i++) A[i][i] += lambda;
  return solve(A, b);
}

const evalPoly = (w: number[], x: number) => w.reduce((acc, c, j) => acc + c * x ** j, 0);
const rms = (w: number[], pts: Pt[]) => Math.sqrt(pts.reduce((acc, [x, y]) => acc + (evalPoly(w, x) - y) ** 2, 0) / pts.length);

function scores(seed: number, li: number) {
  const { train, held } = makeData(seed);
  const w = fit(train, LAMBDAS[li]);
  return { train, held, w, trainMiss: rms(w, train), heldMiss: rms(w, held) };
}
// MODEL END

const fmtL = (li: number) => (LAMBDAS[li] === 0 ? "0 (none)" : String(LAMBDAS[li]));

// Plot geometry: x in [-1.05, 1.05] -> 14..306, y in [-2, 2] -> 176..20.
const px = (x: number) => 14 + ((x + 1.05) / 2.1) * 292;
const py = (y: number) => 98 - y * 39;

export default function PenaltyOnWiggle({ slug }: { slug: string }) {
  const [li, setLi] = useState(0);
  const [seed, setSeed] = useState(1);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["penalty-on"]);

  const now = useMemo(() => scores(seed, li), [seed, li]);
  const none = useMemo(() => scores(seed, 0), [seed]);
  const path = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const x = -1.05 + (2.1 * i) / 120;
      const y = Math.max(-3, Math.min(3, evalPoly(now.w, x)));
      pts.push(`${i ? "L" : "M"}${px(x).toFixed(1)},${py(y).toFixed(1)}`);
    }
    return pts.join(" ");
  }, [now]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A wiggly degree-7 curve passes through all 8 training dots. You add a penalty on large coefficients (ridge). The miss on the training dots gets:",
        options: ["Larger", "Smaller", "Stays exactly 0"],
        answer: 0,
      }}
      exploreHint="Turn the penalty up. Watch both misses. Then try new data."
      minInteractions={1}
      reveal={() => {
        // Spread over seeds 1-500, from the same model the stage draws.
        let wins = 0;
        for (let sd = 1; sd <= 500; sd++) {
          const d = makeData(sd);
          const h0 = rms(fit(d.train, 0), d.held);
          if (LAMBDAS.slice(1, 6).some((l) => rms(fit(d.train, l), d.held) < h0)) wins++;
        }
        return (
          <>
            <p>
              With no penalty the curve hit every training dot: miss <strong>0</strong>. The penalty charges for big
              coefficients, so the best curve no longer threads every dot. On your data at penalty {fmtL(li)} the training miss
              is <strong>{now.trainMiss.toFixed(2)}</strong>{li === 0 ? " (turn it up to see it rise)" : ""}. Worse on training,
              by design.
            </p>
            <p>
              The held-out dots tell the other story: {none.heldMiss.toFixed(2)} with no penalty, {now.heldMiss.toFixed(2)} now. In{" "}
              {wins} of 500 data sets some moderate penalty (the best of five, 0.0001 to 1) beat none on held-out dots. Push
              to 10 and the curve goes much flatter and usually loses again to no penalty. A worse fit to training can be a better model.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 196" className="stage-svg" role="img" aria-label={`Penalty ${fmtL(li)}`}>
              <defs>
                <clipPath id="pow-clip">
                  <rect x={10} y={18} width={300} height={160} />
                </clipPath>
              </defs>
              <text x={160} y={12} textAnchor="middle" className={s.small} fill="var(--muted)">
                Toy data: ● 8 training dots, ○ 40 held-out dots
              </text>
              <line x1={14} y1={py(0)} x2={306} y2={py(0)} stroke="var(--line)" />
              {now.held.map(([x, y], i) => (
                <circle key={`h${i}`} cx={px(x)} cy={py(y)} r={3} fill="none" stroke="var(--muted)" strokeWidth={1.2} />
              ))}
              <path d={path} fill="none" stroke="var(--domain)" strokeWidth={2.5} clipPath="url(#pow-clip)" />
              {now.train.map(([x, y], i) => (
                <circle key={`t${i}`} cx={px(x)} cy={py(y)} r={5} fill="var(--fg)" />
              ))}
              <text x={306} y={192} textAnchor="end" className={s.tiny} fill="var(--muted)">
                data set {seed}
              </text>
            </svg>
            <Slider label="Penalty λ" value={li} min={0} max={LAMBDAS.length - 1} format={fmtL} disabled={locked} onChange={(v) => {
              setLi(v);
              if (v > 0) reach("penalty-on");
            }} />
            <Row>
              <Readout label="Training miss" value={locked ? "–" : now.trainMiss.toFixed(2)} />
              <Readout label="Held-out miss" value={locked ? "–" : now.heldMiss.toFixed(2)} />
              <Control disabled={locked} onClick={() => setSeed(seed + 1)}>
                New data
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
