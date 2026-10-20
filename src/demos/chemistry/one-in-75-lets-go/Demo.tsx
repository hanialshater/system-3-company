"use client";

// Two beakers, each holding 75 drawn acid molecules (standing for 0.10 mol/L). Dissolving lets
// each molecule give up its H+ or keep it. HCl is a strong acid: all split. Acetic acid is weak:
// the share that splits comes from Ka = 1.8e-5 (exact quadratic, x² / (c − x) = Ka), about 1.3%,
// which is 1 of the 75. pH = −log10[H+].
// Key state: both acids dissolved at the same 0.10 mol/L: 75 of 75 split (pH 1.0) beside 1 of 75
// (pH 2.9). Two milestones, one per acid, so dissolving only HCl cannot unlock the reveal.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const C = 0.1; // mol/L
const KA = 1.8e-5; // acetic acid, 25 °C
const N = 75; // drawn molecules per beaker
const X_ACETIC = (-KA + Math.sqrt(KA * KA + 4 * KA * C)) / 2; // mol/L of H+
const FRAC = X_ACETIC / C;
const PH_HCL = -Math.log10(C);
const PH_ACETIC = -Math.log10(X_ACETIC);
const SPLIT_ACETIC = Math.round(FRAC * N);
const ONE_IN = Math.round(1 / FRAC);
const NAMES = ["hcl", "acetic"] as const;
type Id = (typeof NAMES)[number];
const ACIDS: Record<Id, { label: string; formula: string; split: number; pH: number }> = {
  hcl: { label: "hydrochloric", formula: "HCl", split: N, pH: PH_HCL },
  acetic: { label: "acetic (vinegar)", formula: "CH₃COOH", split: SPLIT_ACETIC, pH: PH_ACETIC },
};

const W = 320;
const H = 175;
const COLS = 9;
const BW = 146;
const BXS = [6, 168];
const TOP = 34;

// Which acetic molecules split: spread across the beaker (the middle one for a single split).
const splitSet = (n: number) => new Set(Array.from({ length: n }, (_, j) => Math.floor(((j + 0.5) * N) / n)));

export default function OneIn75LetsGo({ slug }: { slug: string }) {
  const [done, setDone] = useState<Record<Id, boolean>>({ hcl: false, acetic: false });

  const beaker = (id: Id, j: number) => {
    const a = ACIDS[id];
    const x0 = BXS[j];
    const split = done[id] ? splitSet(a.split) : new Set<number>();
    return (
      <g key={id}>
        <path d={`M ${x0} ${TOP} V ${H - 6} H ${x0 + BW} V ${TOP}`} className={s.beaker} />
        <text x={x0 + BW / 2} y={12} textAnchor="middle" className={s.name}>
          {a.label}
        </text>
        <text x={x0 + BW / 2} y={26} textAnchor="middle" className={s.small}>
          {done[id] ? `${a.split} of ${N} split · pH ${a.pH.toFixed(1)}` : `${N} molecules, not yet in water`}
        </text>
        {Array.from({ length: N }, (_, i) => {
          const cx = x0 + 12 + (i % COLS) * 15.5;
          const cy = TOP + 10 + Math.floor(i / COLS) * 14.5;
          const off = split.has(i);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={4.2} className={off ? s.anion : s.acid} />
              <circle cx={off ? cx + 6 : cx + 3.5} cy={off ? cy - 6 : cy - 2.5} r={2.4} className={off ? s.hFree : s.h} />
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Two bottles on your shelf hold acids at the same ${C.toFixed(2)} mol/L (the same number of acid molecules per litre). The hydrochloric acid reads pH ${PH_HCL.toFixed(1)}. About what pH does the acetic acid, vinegar's acid, read?`,
        options: [PH_HCL.toFixed(1), PH_ACETIC.toFixed(1), "4.8"],
        answer: 1,
      }}
      exploreHint="Put both acids in water and count the freed H⁺ dots."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            In your beakers all {N} hydrochloric acid molecules let go of their H⁺, but only {SPLIT_ACETIC} of {N} acetic acid
            molecules did: about 1 in {ONE_IN}. Fewer free H⁺ means a higher pH: about{" "}
            <strong>{PH_ACETIC.toFixed(1)}</strong>, not {PH_HCL.toFixed(1)}.
          </p>
          <p>
            An acid&apos;s strength is the share of its molecules that give up H⁺, not how much acid is in the bottle.
            Hydrochloric acid is strong; acetic acid is weak and keeps most of its H⁺.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => (
            <div className={s.wrap}>
              <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label="Two beakers of acid">
                {beaker("hcl", 0)}
                {beaker("acetic", 1)}
              </svg>
              <p className={s.caption}>
                <span className={`${s.dot} ${s.hFree}`} aria-hidden /> free H⁺ · pH 1 = 0.1 mol/L free H⁺; +1 pH = 10× fewer
              </p>
              <Row>
                {NAMES.map((id) => (
                  <Control
                    key={id}
                    className={done[id] ? "active" : ""}
                    disabled={locked || done[id]}
                    onClick={() => {
                      setDone((d) => ({ ...d, [id]: true }));
                      reach(id);
                    }}
                  >
                    Dissolve {ACIDS[id].formula}
                  </Control>
                ))}
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
