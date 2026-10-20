"use client";

// Early-stopping toy. Truth sin(2x) on [-1, 1]; 8 training dots and 200 held-out dots, x uniform,
// noise sd 0.3, all from mulberry32(SEED). A degree-7 polynomial (plain powers of x, all weights
// starting at 0) is trained by full-batch gradient descent on mean squared error, step size 0.1,
// for 20,000 steps. Errors are root-mean-square, recorded at ~log-spaced checkpoints.
// SEED 12 is CHOSEN to show a clear dip (held-out 0.751 at step 0, lowest 0.299 at step 67, 0.693 at
// 20,000; training 0.793 -> 0.170). Spread over seeds 1-500 with the same code: see meta.json c2.

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider, Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const SEED = 12;
const DEG = 7;
const ETA = 0.1;
const N_STEPS = 20000;
const SD = 0.3;
const PRESETS = [0, 100, 1000, N_STEPS];
const truth = (x: number) => Math.sin(2 * x);
const CHECKPOINTS = (() => {
  const set = new Set<number>([0, ...PRESETS]);
  for (let i = 0; i <= 80; i++) set.add(Math.round(Math.pow(10, (i * Math.log10(N_STEPS)) / 80)));
  return [...set].filter((v) => v <= N_STEPS).sort((a, b) => a - b);
})();
const feat = (x: number) => {
  const t = [1];
  for (let k = 1; k <= DEG; k++) t.push(t[k - 1] * x);
  return t;
};
type Pt = [number, number];
function makeData(seed: number) {
  const r = mulberry32(seed);
  const g = () => {
    const u = 1 - r();
    const v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const train: Pt[] = [];
  for (let i = 0; i < 8; i++) {
    const x = -1 + 2 * r();
    train.push([x, truth(x) + SD * g()]);
  }
  const held: Pt[] = [];
  for (let i = 0; i < 200; i++) {
    const x = -1 + 2 * r();
    held.push([x, truth(x) + SD * g()]);
  }
  return { train, held };
}
const predict = (w: number[], x: number) => feat(x).reduce((a, f, k) => a + f * w[k], 0);
const rms = (w: number[], pts: Pt[]) => Math.sqrt(pts.reduce((a, [x, y]) => a + (predict(w, x) - y) ** 2, 0) / pts.length);
type Snap = { t: number; w: number[]; train: number; held: number };
function trainRun(seed: number) {
  const { train, held } = makeData(seed);
  const F = train.map(([x]) => feat(x));
  let w = new Array(DEG + 1).fill(0);
  const snaps: Snap[] = [];
  let c = 0;
  for (let t = 0; t <= N_STEPS; t++) {
    if (t === CHECKPOINTS[c]) {
      snaps.push({ t, w: w.slice(), train: rms(w, train), held: rms(w, held) });
      c++;
    }
    if (t === N_STEPS) break;
    const grad = new Array(DEG + 1).fill(0);
    train.forEach(([, y], i) => {
      const e = F[i].reduce((a, f, k) => a + f * w[k], 0) - y;
      for (let k = 0; k <= DEG; k++) grad[k] += (2 * e * F[i][k]) / train.length;
    });
    w = w.map((v, k) => v - ETA * grad[k]);
  }
  let best = 0;
  snaps.forEach((sn, i) => {
    if (sn.held < snaps[best].held) best = i;
  });
  return { train, held, snaps, best };
}
// MODEL END

let cache: ReturnType<typeof trainRun> | null = null;
const run = () => (cache ??= trainRun(SEED));

const PX = (x: number) => 160 + x * 140;
const PY = (y: number) => 95 - y * 58;
const EX = (i: number) => 10 + (i * 300) / (run().snaps.length - 1);
const EY = (v: number) => 60 - (v / 0.85) * 54;
const f3 = (v: number) => v.toFixed(3);
const fmtStep = (t: number) => t.toLocaleString("en-US");

export default function StopAtEpochSixty({ slug }: { slug: string }) {
  const R = run();
  const clipId = `es${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [idx, setIdx] = useState(0);
  const [visited, setVisited] = useState<number[]>([]);

  const minSnap = R.snaps[R.best];
  const answer = minSnap.t === N_STEPS ? 0 : minSnap.t === 0 ? 2 : 1;
  const sn = R.snaps[idx];
  const curve = Array.from({ length: 81 }, (_, i) => {
    const x = -1 + i / 40;
    return `${i ? "L" : "M"}${PX(x).toFixed(1)},${PY(predict(sn.w, x)).toFixed(1)}`;
  }).join(" ");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You fit a degree-7 curve (a flexible, wiggly line) to 8 noisy dots by gradient descent, checking it on 200 held-out dots it never trains on. In this run, when is held-out error lowest?`,
        options: [`At the end (step ${fmtStep(N_STEPS)})`, "Early, within the first 100 steps", "At step 0, before any training"],
        answer,
      }}
      exploreHint="Train for longer and watch both errors. Where is held-out error lowest?"
      minInteractions={2}
      reveal={() => {
        const seen = visited.map((i) => R.snaps[i]);
        const bestSeen = seen.reduce((a, b) => (b.held < a.held ? b : a), R.snaps[0]);
        const last = seen.reduce((a, b) => (b.t > a.t ? b : a), R.snaps[0]);
        return (
          <>
            <p>
              The lowest held-out error you found was {f3(bestSeen.held)} at step {fmtStep(bestSeen.t)}. By step {fmtStep(last.t)} it
              had climbed to {f3(last.held)}, while training error kept falling, to {f3(last.train)}.
            </p>
            <p>
              Early on, the curve learns the broad shape of the data. Later it bends to pass through the noise in its 8 training
              dots. Training error cannot tell those apart; held-out error can. This curve was picked to show a clear dip. Where the dip
              falls changes from run to run, but in 483 of 500 seeded runs of this toy the lowest held-out error came before the end.
            </p>
            <p>Stop where held-out error is lowest.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["near-dip", "climbing"]}>
          {(reach) => {
            const go = (i: number) => {
              setIdx(i);
              setVisited((v) => [...v, i]);
              const x = R.snaps[i];
              if (x.held <= 1.1 * minSnap.held) reach("near-dip");
              if (x.t > minSnap.t && x.held >= 1.5 * minSnap.held) reach("climbing");
            };
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy · degree-7 curve · seed {SEED} (chosen)</span>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`Step ${sn.t}`}>
                  <defs>
                    <clipPath id={clipId}>
                      <rect x={PX(-1) - 4} y={4} width={PX(1) - PX(-1) + 8} height={182} />
                    </clipPath>
                  </defs>
                  <line x1={PX(-1)} y1={PY(0)} x2={PX(1)} y2={PY(0)} stroke="var(--line)" strokeDasharray="2 3" />
                  {R.held.map(([x, y], i) => (
                    <circle key={`h${i}`} cx={PX(x)} cy={PY(y)} r={1.8} fill="var(--muted)" opacity={0.45} />
                  ))}
                  {!locked && <path d={curve} fill="none" stroke="var(--domain)" strokeWidth={2.5} clipPath={`url(#${clipId})`} />}
                  {R.train.map(([x, y], i) => (
                    <circle key={`t${i}`} cx={PX(x)} cy={PY(y)} r={5} fill="var(--fg)" stroke="var(--bg)" strokeWidth={1.5} />
                  ))}
                </svg>
                <p className={s.caption}>Black: 8 training dots. Grey: 200 held-out dots.</p>
                {!locked && (
                  <svg viewBox="0 0 320 64" className={`stage-svg ${s.chart}`} role="img" aria-label="Error against training steps">
                    {(["train", "held"] as const).map((k) => (
                      <path
                        key={k}
                        d={R.snaps.map((x, i) => `${i ? "L" : "M"}${EX(i).toFixed(1)},${EY(x[k]).toFixed(1)}`).join(" ")}
                        fill="none"
                        stroke={k === "held" ? "var(--bad)" : "var(--fg)"}
                        strokeWidth={1.8}
                        strokeDasharray={k === "held" ? undefined : "4 3"}
                      />
                    ))}
                    <line x1={EX(idx)} y1={4} x2={EX(idx)} y2={60} stroke="var(--muted)" />
                    <circle cx={EX(idx)} cy={EY(sn.held)} r={4} fill="var(--bad)" />
                    <circle cx={EX(idx)} cy={EY(sn.train)} r={4} fill="var(--fg)" />
                    <text x={14} y={12} fontSize={9} fill="var(--bad)">held-out error</text>
                    <text x={14} y={60} fontSize={9} fill="var(--fg)">training error</text>
                  </svg>
                )}
                <Row>
                  {PRESETS.map((p) => {
                    const i = R.snaps.findIndex((x) => x.t === p);
                    return (
                      <Control key={p} className={idx === i ? "active" : ""} disabled={locked || idx === i} onClick={() => go(i)}>
                        {fmtStep(p)}
                      </Control>
                    );
                  })}
                </Row>
                <Slider
                  label="Training steps"
                  value={idx}
                  min={0}
                  max={R.snaps.length - 1}
                  disabled={locked}
                  format={(v) => fmtStep(R.snaps[v].t)}
                  onChange={go}
                />
                <Row>
                  <Readout label="Training error" value={locked ? "–" : f3(sn.train)} />
                  <Readout label="Held-out error" value={locked ? "–" : f3(sn.held)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
