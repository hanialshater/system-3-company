"use client";

// Self-pollination toy model: 32 made-up plants, all hybrids (Aa) at the start. Each plant
// pollinates itself and leaves one seed. A hybrid's seed is AA, Aa or aa with chances 1/4, 1/2, 1/4;
// pure plants (AA, aa) only make pure seeds. The field shows the expected (average) split, which
// is a whole number of plants up to generation 4: hybrids 32, 16, 8, 4, 2. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 32, COLS = 8, MAX_GEN = 4, Q_GEN = 3;
type G = "AA" | "Aa" | "aa";

function fields(): G[][] {
  const out: G[][] = [Array<G>(N).fill("Aa")];
  for (let g = 1; g <= MAX_GEN; g++) {
    const prev = out[g - 1];
    const next = [...prev];
    const hy = prev.flatMap((x, i) => (x === "Aa" ? [i] : []));
    const q = hy.length / 4;
    hy.forEach((idx, k) => {
      // spread the change through the field: every 4th hybrid goes AA, the next... aa
      if (k % 4 === 0) next[idx] = "AA";
      else if (k % 4 === 3) next[idx] = "aa";
    });
    if (hy.filter((_, k) => k % 4 === 0).length !== q) throw new Error("split not whole");
    out.push(next);
  }
  return out;
}
const FIELDS = fields();
const count = (g: number, t: G) => FIELDS[g].filter((x) => x === t).length;
const HYB = FIELDS.map((_, g) => count(g, "Aa")); // 32, 16, 8, 4, 2
const share = (g: number) => (100 * HYB[g]) / N;
const MILESTONES = ["gen-3"] as const;

function Stage({ locked, gen, onGen }: { locked: boolean; gen: number; onGen: (g: number) => void }) {
  const f = FIELDS[gen];
  const msg = locked
    ? "Toy: each plant pollinates itself and leaves one seed. Shown: the average split."
    : gen === 0
      ? `Start: all ${N} plants are hybrids (Aa).`
      : `Generation ${gen}: ${HYB[gen]} of ${N} still hybrid (${share(gen)}%). Pure: ${count(gen, "AA")} AA, ${count(gen, "aa")} aa.`;
  const GAP = 30;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${COLS * GAP} ${(N / COLS) * GAP}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        <defs>
          <clipPath id="selfing-left"><rect x={-12} y={-12} width={12} height={24} /></clipPath>
        </defs>
        {f.map((x, i) => {
          const cx = (i % COLS) * GAP + GAP / 2, cy = Math.floor(i / COLS) * GAP + GAP / 2;
          return (
            <g key={i} transform={`translate(${cx},${cy})`}>
              <circle r={10} className={x === "AA" ? s.full : s.empty} />
              {x === "Aa" && <circle r={10} className={s.full} clipPath="url(#selfing-left)" />}
            </g>
          );
        })}
      </svg>
      <div className={s.legend} aria-hidden>
        <span><i className={s.lAA} />AA</span>
        <span><i className={s.lAa} />Aa: one of each (hybrid)</span>
        <span><i className={s.laa} />aa</span>
      </div>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {Array.from({ length: MAX_GEN }, (_, k) => k + 1).map((g) => (
          <Control key={g} className={gen === g ? "active" : ""} disabled={locked || gen === g} onClick={() => onGen(g)}>
            Gen {g}
          </Control>
        ))}
        <Control disabled={locked || gen === 0} onClick={() => onGen(0)}>Start</Control>
      </Row>
    </div>
  );
}

export default function SelfingHalvesHets({ slug }: { slug: string }) {
  const [gen, setGen] = useState(0);
  const [seen, setSeen] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You sow ${N} made-up plants, all hybrids (Aa: one copy of each form). Each pollinates itself, and so do their offspring, for ${Q_GEN} generations. What share is still hybrid?`,
        options: ["50%", `${share(Q_GEN)}%`, "0%"],
        answer: 1,
      }}
      exploreHint="Step through the generations and watch the half-filled plants."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const path = [0, ...seen.filter((g) => g > 0).sort((a, b) => a - b)];
        return (
          <>
            <p>
              Hybrids you saw: {path.map((g) => HYB[g]).join(", ")} of {N}. After {Q_GEN} rounds, <strong>{HYB[Q_GEN]} of {N}</strong>,{" "}
              {share(Q_GEN)}%.
            </p>
            <p>
              A hybrid passes on either copy, so its seed is AA, Aa or aa in a 1 : 2 : 1 split: only half its seeds stay hybrid. A pure plant
              only makes pure seeds, so hybrids never come back. Selfing halves them every generation and turns a mixed field into pure lines.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              gen={gen}
              onGen={(g) => {
                setGen(g);
                setSeen((x) => (x.includes(g) ? x : [...x, g]));
                if (g === Q_GEN) reach("gen-3");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
