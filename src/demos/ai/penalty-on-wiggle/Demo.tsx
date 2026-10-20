"use client";

// Ridge regularisation. A degree-7 polynomial through 8 noisy training points fits them
// exactly (training miss 0) using huge coefficients. Ridge minimises
//   sum of squared misses + lambda * (sum of squared coefficients, intercept excluded),
// so any lambda > 0 moves off the exact fit and the training miss rises. On held-out points
// (40 more from the same noisy curve) the miss usually falls at a moderate lambda and rises
// again when lambda is too strong. Seed 1 is the first seed, untuned; "New data" steps through
// seeds 2, 3, ... In seeds 1-500 some lambda in 0.0001..1 beats lambda = 0 on held-out in 490.
// v7 (learner r8, phone fit): reveal cut to <= 90 words (the 490-of-500 sentence is gone); the held-out readouts are
// one ("Held-out (no penalty)": now and with none); the buttons have their own row; the plot is 28 units shorter.

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

// Plot geometry: x in [-1.05, 1.05] -> 14..306, y in [-2, 2] -> 150..22.
const px = (x: number) => 14 + ((x + 1.05) / 2.1) * 292;
const py = (y: number) => 86 - y * 32;

export default function PenaltyOnWiggle({ slug }: { slug: string }) {
  const [li, setLi] = useState(0);
  const [seed, setSeed] = useState(1);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["penalty-on", "too-much"]);
  // What the learner saw at the strongest penalty (lambda 10): the reveal quotes only this.
  const [big, setBig] = useState<{ seed: number; held: number; none: number } | null>(null);
  // The last moderate penalty (0.0001..1) the learner stopped on. Shown on the stage as a "Seen" line,
  // so a value that flashed past for one arrow press is overwritten by the one that sat on screen.
  const [mod, setMod] = useState<{ seed: number; li: number; held: number; none: number } | null>(null);
  const visit = (nextLi: number, nextSeed: number) => {
    if (nextLi > 0) reach("penalty-on");
    if (nextLi > 0 && nextLi < LAMBDAS.length - 1) {
      const d = makeData(nextSeed);
      const seen = { seed: nextSeed, li: nextLi, held: rms(fit(d.train, LAMBDAS[nextLi]), d.held), none: rms(fit(d.train, 0), d.held) };
      setMod(seen);
    }
    if (nextLi === LAMBDAS.length - 1) {
      const d = makeData(nextSeed);
      setBig({ seed: nextSeed, held: rms(fit(d.train, LAMBDAS[nextLi]), d.held), none: rms(fit(d.train, 0), d.held) });
      reach("too-much");
    }
  };

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

  const ghost = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const x = -1.05 + (2.1 * i) / 120;
      const y = Math.max(-3, Math.min(3, evalPoly(none.w, x)));
      pts.push(`${i ? "L" : "M"}${px(x).toFixed(1)},${py(y).toFixed(1)}`);
    }
    return pts.join(" ");
  }, [none]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A wiggly curve passes through all 8 training dots (miss 0). Now add a penalty that discourages wild bends (ridge: it charges for big coefficients, the numbers that set how sharply the curve bends). The miss on the training dots gets:",
        options: ["Larger", "Stays exactly 0", "Larger on some data, 0 on others"],
        answer: 0,
      }}
      exploreHint="Turn the penalty up a little, then all the way to 10. Watch both misses."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            With no penalty the curve hit every training dot: miss <strong>0</strong>. The penalty charges for big coefficients,
            so the curve stops threading the dots: at penalty {fmtL(li)} your training miss is{" "}
            <strong>{now.trainMiss.toFixed(2)}</strong>
            {li === 0 ? " (turn it up to see it rise)" : ", worse by design"}.
          </p>
          <p>
            Held-out dots tell the other story:{" "}
            {mod
              ? `at ${fmtL(mod.li)} on set ${mod.seed} you saw ${mod.held.toFixed(2)} vs ${mod.none.toFixed(2)} with none${mod.held < mod.none ? "" : " (that one did not win)"}.`
              : (() => {
                  // No moderate penalty visited (e.g. a jump straight to 10): quote the best moderate one on this data set.
                  const d = makeData(seed);
                  const h0 = rms(fit(d.train, 0), d.held);
                  let bi = 1;
                  for (let i = 2; i < LAMBDAS.length - 1; i++)
                    if (rms(fit(d.train, LAMBDAS[i]), d.held) < rms(fit(d.train, LAMBDAS[bi]), d.held)) bi = i;
                  const hb = rms(fit(d.train, LAMBDAS[bi]), d.held);
                  return `on data set ${seed} the best moderate penalty, ${fmtL(bi)}, gives ${hb.toFixed(2)} vs ${h0.toFixed(2)} with none.`;
                })()}{" "}
            At 10 the curve goes much flatter
            {big
              ? `, and on set ${big.seed} held-out was ${big.held.toFixed(2)} vs ${big.none.toFixed(2)}: too much penalty ${big.held > big.none ? "lost again" : "still won here, though it usually loses"}.`
              : " and usually loses again."}
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 168" className="stage-svg" role="img" aria-label={`Penalty ${fmtL(li)}`}>
              <defs>
                <clipPath id="pow-clip">
                  <rect x={10} y={18} width={300} height={136} />
                </clipPath>
              </defs>
              <text x={160} y={12} textAnchor="middle" className={s.small} fill="var(--muted)">
                ● 8 training dots, ○ 40 held-out dots{li > 0 ? ", dashed = no penalty" : ""}
              </text>
              <line x1={14} y1={py(0)} x2={306} y2={py(0)} stroke="var(--line)" />
              {now.held.map(([x, y], i) => (
                <circle key={`h${i}`} cx={px(x)} cy={py(y)} r={3} fill="none" stroke="var(--muted)" strokeWidth={1.2} />
              ))}
              {li > 0 && (
                <path d={ghost} fill="none" stroke="var(--muted)" strokeWidth={1.5} strokeDasharray="4 3" clipPath="url(#pow-clip)" />
              )}
              <path d={path} fill="none" stroke="var(--domain)" strokeWidth={2.5} clipPath="url(#pow-clip)" />
              {now.train.map(([x, y], i) => (
                <circle key={`t${i}`} cx={px(x)} cy={py(y)} r={5} fill="var(--fg)" />
              ))}
              <text x={306} y={164} textAnchor="end" className={s.tiny} fill="var(--muted)">
                data set {seed}
              </text>
            </svg>
            <Slider label="Penalty λ" value={li} min={0} max={LAMBDAS.length - 1} format={fmtL} disabled={locked} onChange={(v) => {
              setLi(v);
              visit(v, seed);
            }} />
            <Row>
              <Readout label="Training miss" value={locked ? "–" : now.trainMiss.toFixed(2)} />
              <Readout label="Held-out (no penalty)" value={`${locked ? "–" : now.heldMiss.toFixed(2)} (${none.heldMiss.toFixed(2)})`} />
            </Row>
            <Row>
              <Control
                disabled={locked || li === LAMBDAS.length - 1}
                onClick={() => {
                  setLi(LAMBDAS.length - 1);
                  visit(LAMBDAS.length - 1, seed);
                }}
              >
                Penalty 10
              </Control>
              <Control
                disabled={locked}
                onClick={() => {
                  setSeed(seed + 1);
                  visit(li, seed + 1);
                }}
              >
                New data
              </Control>
            </Row>
            {!locked && (mod || big) && (
              <p className={s.msg} data-testid="seen">
                Seen held-out (vs none):
                {mod ? ` λ ${fmtL(mod.li)}, set ${mod.seed}: ${mod.held.toFixed(2)} vs ${mod.none.toFixed(2)}.` : ""}
                {big ? ` λ 10, set ${big.seed}: ${big.held.toFixed(2)} vs ${big.none.toFixed(2)}.` : ""}
              </p>
            )}
          </div>
        );
      }}
    </Lesson>
  );
}
