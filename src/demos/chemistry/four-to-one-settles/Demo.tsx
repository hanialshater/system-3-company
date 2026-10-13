"use client";

// A <-> B with 100 molecules. Each time step, every A turns into B with chance 0.20 and every
// B turns back into A with chance 0.05 (seeded). The ratio of the chances is K = 4, so the mix
// settles near 80 B : 20 A from any start. One chart: number of B against time steps; each
// start the learner has run stays as a faint line. A dashed target appears after the first settle.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 100;
const P_FWD = 0.2; // A -> B per step
const P_BACK = 0.05; // B -> A per step
const K = P_FWD / P_BACK; // 4
const B_EQ = Math.round((N * K) / (1 + K)); // 80
const T_MAX = 60;
const SETTLED = 20; // steps; the gap to equilibrium shrinks by 0.75 per step, 0.75^20 ≈ 0.3%
type Start = "A" | "B" | "half";
const STARTS: { id: Start; label: string; b0: number; seed: number }[] = [
  { id: "A", label: "All A", b0: 0, seed: 1 },
  { id: "B", label: "All B", b0: N, seed: 2 },
  { id: "half", label: "Half and half", b0: N / 2, seed: 3 },
];
const NAMES = ["from-A", "from-B"] as const;

function run(b0: number, seed: number) {
  const r = mulberry32(seed);
  let mol = Array.from({ length: N }, (_, i) => i < b0);
  const out = [b0];
  for (let t = 0; t < T_MAX; t++) {
    mol = mol.map((isB) => (isB ? !(r() < P_BACK) : r() < P_FWD));
    out.push(mol.filter(Boolean).length);
  }
  return out;
}

const W = 320;
const H = 190;
const L = 46;
const R = 14;
const TOP = 12;
const BASE = 160;
const X = (t: number) => L + (t / T_MAX) * (W - L - R);
const Y = (b: number) => BASE - (b / N) * (BASE - TOP);
const line = (pts: number[], upTo: number) =>
  pts
    .slice(0, upTo + 1)
    .map((b, t) => `${t ? "L" : "M"} ${X(t).toFixed(1)} ${Y(b).toFixed(1)}`)
    .join(" ");
const avg = (pts: number[], t: number) => {
  const xs = pts.slice(SETTLED, t + 1);
  return xs.reduce((a, b) => a + b, 0) / xs.length;
};

export default function FourToOneSettles({ slug }: { slug: string }) {
  const runs = useMemo(() => Object.fromEntries(STARTS.map((st) => [st.id, run(st.b0, st.seed)])) as Record<Start, number[]>, []);
  const [start, setStart] = useState<Start>("A");
  const [t, setT] = useState(0);
  const [seen, setSeen] = useState<Record<Start, number>>({ A: 0, B: 0, half: 0 });

  const pts = runs[start];
  const b = pts[t];
  const settledOnce = Object.values(seen).some((x) => x >= SETTLED);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `For A ⇌ B at equilibrium, K = [B]/[A] = ${K}. Starting from ${N} A molecules and no B, the settled mix holds about…`,
        options: [`${B_EQ} B`, `${N / 2} B`, `${N / 4} B`],
        answer: 0,
      }}
      exploreHint={`Run time to step ${SETTLED} or more from all A, then start from all B.`}
      minInteractions={NAMES.length}
      reveal={() => {
        const done = STARTS.filter((st) => seen[st.id] >= SETTLED);
        return (
          <>
            <p>
              {done.length
                ? `You ran ${done.map((st) => `${st.label.toLowerCase()} (averaging about ${Math.round(avg(runs[st.id], seen[st.id]))} B once settled)`).join(" and ")}.`
                : "Run it from any start."}{" "}
              Every start settles near <strong>{B_EQ} B and {N - B_EQ} A</strong>, where {B_EQ} ÷ {N - B_EQ} = {K}. The count
              wobbles by a few because each run is chance with only {N} molecules.
            </p>
            <p>
              At equilibrium both reactions keep going, at equal rates: {Math.round(P_FWD * 100)}% of the {N - B_EQ} A turn
              to B each step while {Math.round(P_BACK * 100)}% of the {B_EQ} B turn back, {Math.round(P_FWD * (N - B_EQ))} each
              way. K fixes where the mix ends up, not where it began. Change the temperature and K itself changes.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const mark = (st: Start, time: number) => {
              setSeen((p) => ({ ...p, [st]: Math.max(p[st], time) }));
              if (time >= SETTLED && st === "A") reach("from-A");
              if (time >= SETTLED && st === "B") reach("from-B");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`Starting ${STARTS.find((x) => x.id === start)!.label.toLowerCase()}, after ${t} steps there are ${b} B and ${N - b} A`}
                >
                  {[0, 50, 100].map((g) => (
                    <g key={g}>
                      <line x1={L} x2={W - R} y1={Y(g)} y2={Y(g)} className={s.grid} />
                      <text x={L - 4} y={Y(g) + 3} textAnchor="end" className={s.small}>
                        {g}
                      </text>
                    </g>
                  ))}
                  {[0, 20, 40, 60].map((x) => (
                    <text key={x} x={X(x)} y={BASE + 13} textAnchor="middle" className={s.small}>
                      {x}
                    </text>
                  ))}
                  <text x={(L + W - R) / 2} y={BASE + 26} textAnchor="middle" className={s.small}>
                    time steps · seeded runs, {N} molecules
                  </text>
                  <text x={L - 4} y={TOP + 15} textAnchor="end" className={s.small}>
                    B count
                  </text>
                  {settledOnce && (
                    <>
                      <line x1={L} x2={W - R} y1={Y(B_EQ)} y2={Y(B_EQ)} className={s.target} />
                      <text x={W - R} y={Y(B_EQ) - 4} textAnchor="end" className={s.label}>
                        {B_EQ}
                      </text>
                    </>
                  )}
                  {STARTS.filter((st) => st.id !== start && seen[st.id] > 0).map((st) => (
                    <path key={st.id} d={line(runs[st.id], seen[st.id])} className={s.ghost} />
                  ))}
                  {t > 0 && <path d={line(pts, t)} className={s.trace} />}
                  <circle cx={X(t)} cy={Y(b)} r={5} className={s.dot} />
                </svg>
                <Slider
                  label="Time"
                  value={t}
                  min={0}
                  max={T_MAX}
                  step={10}
                  disabled={locked}
                  format={(v) => `${v} steps`}
                  onChange={(v) => {
                    setT(v);
                    mark(start, v);
                  }}
                />
                <Row>
                  {STARTS.map((st) => (
                    <Control
                      key={st.id}
                      className={start === st.id ? "active" : ""}
                      disabled={locked || start === st.id}
                      onClick={() => {
                        setStart(st.id);
                        mark(st.id, t);
                      }}
                    >
                      {st.label}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="B now" value={b} />
                  <Readout label="A now" value={N - b} />
                  <Readout label={`Avg B, step ${SETTLED}+`} value={t >= SETTLED ? `about ${Math.round(avg(pts, t))}` : "not yet"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
