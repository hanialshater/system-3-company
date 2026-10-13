"use client";

// Heterozygote advantage in a made-up species, deterministic (infinite population,
// random mating, one generation at a time). Survival: AA = 1 - s, Aw = 1, ww = 0.
// Next generation's share of w: q' = pq / (p^2 (1 - s) + 2pq). Equilibrium q* = s/(s + 1).
// The ring shows 100 gene copies, round(100 q) of them w. Which ring spots are w
// follows a fixed shuffled order (untuned seed, mulberry32(5)), so dots only switch, never jump.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const GENS = 60;
const SETTLED = 50;
const STARTS = { rare: 0.01, common: 0.5 } as const;
type Start = keyof typeof STARTS;
const MILESTONES = ["settled-from-rare", "settled-from-common"] as const;

function trajectory(q0: number, sel: number) {
  const out = [q0];
  let q = q0;
  for (let g = 1; g <= GENS; g++) {
    const p = 1 - q;
    q = (p * q) / (p * p * (1 - sel) + 2 * p * q);
    out.push(q);
  }
  return out;
}

const RANK = (() => {
  const rng = mulberry32(5);
  const idx = Array.from({ length: 100 }, (_, i) => i);
  for (let i = 99; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const r = Array(100).fill(0);
  idx.forEach((spot, k) => (r[spot] = k));
  return r;
})();

// Numbers in the question and reveal come from the same model as the stage.
const SEL = 0.15;
const QSTAR = Math.round((100 * SEL) / (SEL + 1)); // 13
const pct = (q: number) => `${Math.round(100 * q)}%`;

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [gen, setGen] = useState(0);
  const [start, setStart] = useState<Start>("rare");
  const [noCopy, setNoCopy] = useState(85);
  const { reach } = useMilestones(interact, MILESTONES);
  const sel = 1 - noCopy / 100;
  const traj = useMemo(() => trajectory(STARTS[start], sel), [start, sel]);
  const q = traj[gen];
  const nw = Math.round(100 * q);
  const go = (g: number, st: Start, nc: number) => {
    setGen(g);
    setStart(st);
    setNoCopy(nc);
    if (g >= SETTLED && nc === 85) reach(st === "rare" ? "settled-from-rare" : "settled-from-common");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 300 220" className={`stage-svg ${s.svg}`} role="img" aria-label={`Generation ${gen}: ${nw} of 100 gene copies are w`}>
        {RANK.map((rk, i) => {
          const a = (i / 100) * 2 * Math.PI - Math.PI / 2;
          const x = 150 + 92 * Math.cos(a), y = 110 + 92 * Math.sin(a);
          const isW = !locked && rk < nw;
          return isW ? <rect key={i} x={x - 4} y={y - 4} width={8} height={8} rx={1.5} className={s.w} /> : <circle key={i} cx={x} cy={y} r={3.8} className={s.a} />;
        })}
        <text x={150} y={106} textAnchor="middle" className={s.big}>
          {locked ? "?" : `${nw} w`}
        </text>
        <text x={150} y={128} textAnchor="middle" className={s.small}>
          of 100 gene copies
        </text>
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. Survival: no w 85%, one w 100%, two w 0%."
          : `Generation ${gen}, started at ${pct(STARTS[start])} w. Survival with no w: ${noCopy}%.`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || gen === GENS} onClick={() => go(GENS, start, noCopy)}>
          To gen {GENS}
        </Control>
        <Control className={`${s.chip} ${start === "common" ? "active" : ""}`} aria-pressed={start === "common"} disabled={locked || start === "common"} onClick={() => go(gen, "common", noCopy)}>
          Start at 50% w
        </Control>
        <Control className={`${s.chip} ${start === "rare" ? "active" : ""}`} aria-pressed={start === "rare"} disabled={locked || start === "rare"} onClick={() => go(gen, "rare", noCopy)}>
          Start at 1% w
        </Control>
      </Row>
      <Row>
        <Slider label="Generation" value={gen} min={0} max={GENS} disabled={locked} onChange={(v) => go(v, start, noCopy)} />
        <Slider label="Survival with no w" value={noCopy} min={70} max={95} step={5} disabled={locked} format={(v) => `${v}%`} onChange={(v) => go(gen, start, v)} />
      </Row>
      <Row>
        <Readout label="w share" value={locked ? "?" : pct(q)} />
        <Readout label="Settles at" value={locked ? "?" : pct(sel / (sel + 1))} />
      </Row>
    </div>
  );
}

export default function KeepingTheBadGene({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Made-up species. Two copies of allele w: always fatal. One copy: all survive. No copies: 85% survive. In the long run, w…",
        options: ["disappears", `settles near ${QSTAR}% of copies`, "takes over"],
        answer: 1,
      }}
      exploreHint="Run to generation 60 from 1% w. Then switch the start to 50% w."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            From 1% w and from 50% w, the ring ended at the same place: <strong>{QSTAR} of 100 copies</strong>. Selection did
            not remove w, even though two copies kill.
          </p>
          <p>
            When w is rare, it sits almost only in carriers, who survive best, so it spreads. When it is common, more babies
            get two copies and die, so it falls. It settles where those balance: 0.15 &divide; 1.15 &asymp; {QSTAR}%. A
            bigger one-copy advantage holds w higher.
          </p>
          <p className="muted">
            Model: made-up species, random mating, huge population. The real classic case is the sickle-cell allele where
            malaria is common, with different numbers.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
