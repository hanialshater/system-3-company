"use client";

// Which step to speed. Brief: company/domains/briefs/chemistry.energy-rates.md #15.
// A → B → C, both first order. Closed form (Atkins, consecutive reactions):
//   C(t) = 1 − (k2 e^(−k1 t) − k1 e^(−k2 t)) / (k2 − k1), solved for C = 1/2 by bisection.
//   k1 = 0.1 /s, k2 = 10 /s: 7.03 s · k2 x10: 6.94 s · k1 x10: 0.80 s · both x10: 0.70 s.
// The rate constants are illustrative (claim c4). No randomness, no animation: every curve is
// computed for the current constants and drawn at once.
//
// Picture: two gates in a pipe (opening grows with log k) above one plot of C against time (0-10 s).
// Locked: gates and empty plot. The first press draws the starting curve as a grey dashed ghost.
// "Step 2 x10" widens gate 2 (curve barely moves; kept as a dotted trace), "Step 1 x10" widens gate 1
// (curve jumps left); both are toggles ("Undo step 2/1"). "Only step 1 x10" (the brief's "Undo step 2")
// leaves only step 1 sped up. A legend keeps every half-time reached. Milestones: "step2" (the
// question's case), "step1", "step1-only". QA path: the three buttons once each in DOM order.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const K1 = 0.1;
const K2 = 10;
const C = (t: number, k1: number, k2: number) => 1 - (k2 * Math.exp(-k1 * t) - k1 * Math.exp(-k2 * t)) / (k2 - k1);
const halfTime = (k1: number, k2: number) => {
  let lo = 0;
  let hi = 100;
  for (let i = 0; i < 100; i++) {
    const m = (lo + hi) / 2;
    if (C(m, k1, k2) < 0.5) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
};

type Cfg = "start" | "s2" | "s1" | "both";
const CFGS: Cfg[] = ["start", "s2", "s1", "both"];
const KS: Record<Cfg, [number, number]> = { start: [K1, K2], s2: [K1, K2 * 10], s1: [K1 * 10, K2], both: [K1 * 10, K2 * 10] };
const NAME: Record<Cfg, string> = { start: "start", s2: "step 2 ×10", s1: "step 1 ×10", both: "both ×10" };
const T_HALF: Record<Cfg, number> = Object.fromEntries(CFGS.map((c) => [c, halfTime(...KS[c])])) as Record<Cfg, number>;
const sec = (t: number) => `${t.toFixed(2)} s`;
const cfgOf = (f1: boolean, f2: boolean): Cfg => (f1 ? (f2 ? "both" : "s1") : f2 ? "s2" : "start");

const W = 320;
const H = 196;
const L = 30;
const RR = 310;
const PT = 56;
const PB = 168;
const TMAX = 10;
const X = (t: number) => L + (t / TMAX) * (RR - L);
const Y = (c: number) => PB - c * (PB - PT);
const curve = (cfg: Cfg) => {
  const [k1, k2] = KS[cfg];
  return Array.from({ length: 161 }, (_, i) => {
    const t = (i / 160) * TMAX;
    return `${i ? "L" : "M"} ${X(t).toFixed(1)} ${Y(C(t, k1, k2)).toFixed(1)}`;
  }).join(" ");
};
const PIPE_Y = 22;
const PIPE_H = 18;
const opening = (k: number) => 4 + 3.4 * (Math.log10(k) + 1.5);

export default function WhichStepToSpeed({ slug }: { slug: string }) {
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const [seen, setSeen] = useState<Cfg[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A → B → C. Step 1 is slow; step 2 is 100 times faster. Make step 2 ten times faster still. Half the C appears…",
        options: ["about 10 times sooner", "about 2 times sooner", "almost no sooner"],
        answer: 2,
      }}
      exploreHint="Speed up step 2, then step 1, then only step 1. Watch when half the C appears."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Making the fast step ten times faster moved half-time only from {sec(T_HALF.start)} to{" "}
            <strong>{sec(T_HALF.s2)}</strong>. Making the slow step ten times faster cut it to {sec(T_HALF.s1)}.
          </p>
          <p>
            In a chain, molecules queue at the narrowest gate: the slowest step sets the pace of the whole reaction. That
            step is the rate-determining step, and it is the one a catalyst, or a chemist, has to speed up.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} f1={f1} setF1={setF1} f2={f2} setF2={setF2} seen={seen} setSeen={setSeen} />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  f1,
  setF1,
  f2,
  setF2,
  seen,
  setSeen,
}: {
  locked: boolean;
  interact: () => void;
  f1: boolean;
  setF1: (b: boolean) => void;
  f2: boolean;
  setF2: (b: boolean) => void;
  seen: Cfg[];
  setSeen: (c: Cfg[]) => void;
}) {
  const { reach } = useMilestones(interact, ["step2", "step1", "step1-only"]);
  const started = seen.length > 0;
  const now = cfgOf(f1, f2);

  const go = (n1: boolean, n2: boolean) => {
    const cfg = cfgOf(n1, n2);
    setF1(n1);
    setF2(n2);
    const add = CFGS.filter((c) => c === "start" || c === cfg || seen.includes(c));
    setSeen(add);
    if (cfg === "s2") reach("step2");
    if (n1) reach("step1");
    if (cfg === "s1") reach("step1-only");
  };

  const [k1, k2] = KS[now];
  const gate = (x: number, k: number, hot: boolean, label: string) => {
    const o = opening(k);
    const block = (PIPE_H - o) / 2;
    return (
      <g>
        <rect x={x - 5} y={PIPE_Y} width={10} height={block} className={`${s.gate} ${hot ? s.gateHot : ""}`} />
        <rect x={x - 5} y={PIPE_Y + PIPE_H - block} width={10} height={block} className={`${s.gate} ${hot ? s.gateHot : ""}`} />
        <text x={x} y={PIPE_Y + PIPE_H + 12} textAnchor="middle" className={s.gateLabel}>
          {label}
        </text>
      </g>
    );
  };
  const node = (x: number, t: string) => (
    <g>
      <circle cx={x} cy={PIPE_Y + PIPE_H / 2} r={11} className={s.node} />
      <text x={x} y={PIPE_Y + PIPE_H / 2 + 4} textAnchor="middle" className={s.nodeText}>
        {t}
      </text>
    </g>
  );

  const traceCfgs = started ? CFGS.filter((c) => c !== now && (c === "start" || (c === "s2" && seen.includes("s2")))) : [];
  const styleOf = (c: Cfg) => (c === now ? "now" : c === "start" ? "ghost" : c === "s2" ? "trace" : null);
  const legendRows = CFGS.filter((c) => seen.includes(c));

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`A to B to C through two gates. ${legendRows.map((c) => `${NAME[c]}: half of C at ${sec(T_HALF[c])}`).join(". ")}`}
      >
        <line x1={34} x2={292} y1={PIPE_Y} y2={PIPE_Y} className={s.pipe} />
        <line x1={34} x2={292} y1={PIPE_Y + PIPE_H} y2={PIPE_Y + PIPE_H} className={s.pipe} />
        {gate(102, k1, f1, "step 1")}
        {gate(222, k2, f2, "step 2")}
        {node(30, "A")}
        {node(162, "B")}
        {node(296, "C")}

        {[0, 5, 10].map((t) => (
          <g key={t}>
            <line x1={X(t)} x2={X(t)} y1={PT} y2={PB} className={s.grid} />
            <text x={X(t)} y={PB + 13} textAnchor={t === 0 ? "start" : t === 10 ? "end" : "middle"} className={s.tick}>
              {t === 10 ? "10 s" : t}
            </text>
          </g>
        ))}
        <line x1={L} x2={RR} y1={Y(0.5)} y2={Y(0.5)} className={s.half} />
        <line x1={L} x2={RR} y1={PB} y2={PB} className={s.axis} />
        <line x1={L} x2={L} y1={PT} y2={PB} className={s.axis} />
        <text x={L - 4} y={Y(1) + 4} textAnchor="end" className={s.tick}>
          C
        </text>
        <text x={L - 4} y={Y(0.5) + 4} textAnchor="end" className={s.tick}>
          ½
        </text>

        {traceCfgs.map((c) => (
          <path key={c} d={curve(c)} className={c === "start" ? s.ghost : s.trace} />
        ))}
        {started && <path d={curve(now)} className={s.now} />}
        {started &&
          [...traceCfgs, now].map((c) => (
            <circle
              key={`d-${c}`}
              cx={X(T_HALF[c])}
              cy={Y(0.5)}
              r={c === now ? 4 : 3}
              className={c === now ? s.dotNow : c === "start" ? s.dotGhost : s.dotTrace}
            />
          ))}

        {legendRows.map((c, i) => {
          const y = 131 + i * 11;
          const st = styleOf(c);
          const drawn = st !== null && (c === now || traceCfgs.includes(c));
          return (
            <g key={`l-${c}`}>
              {drawn && <line x1={196} x2={214} y1={y - 3.5} y2={y - 3.5} className={st === "now" ? s.now : st === "ghost" ? s.ghost : s.trace} />}
              <text x={218} y={y} className={s.legend}>
                {NAME[c]}: {sec(T_HALF[c])}
              </text>
            </g>
          );
        })}
      </svg>
      <Row>
        <Control className={f2 ? "active" : ""} aria-pressed={f2} disabled={locked} onClick={() => go(f1, !f2)}>
          {f2 ? "Undo step 2" : "Step 2 ×10"}
        </Control>
        <Control className={f1 ? "active" : ""} aria-pressed={f1} disabled={locked} onClick={() => go(!f1, f2)}>
          {f1 ? "Undo step 1" : "Step 1 ×10"}
        </Control>
      </Row>
      <Row>
        <Control className={now === "s1" ? "active" : ""} disabled={locked || now === "s1"} onClick={() => go(true, false)}>
          Only step 1 ×10
        </Control>
      </Row>
    </div>
  );
}
