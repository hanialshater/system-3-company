"use client";

// Silver chloride crystals in water with NaCl added. While crystals remain, [Ag+][Cl-] = Ksp = 1.8e-10.
// With added chloride c: s = [Ag+] satisfies s (c + s) = Ksp, so s = (-c + sqrt(c² + 4 Ksp)) / 2.
// Two bars on one log scale (1e-10 to 1 mol/L). Key state (milestone `salty`): c = 0.10 mol/L,
// [Ag+] about 1.8e-9 mol/L, about 7,500 times lower than in pure water. Ignores activity and AgCl2-.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const KSP = 1.8e-10;
const ag = (c: number) => (-c + Math.sqrt(c * c + 4 * KSP)) / 2;
const cl = (c: number) => c + ag(c);
const SALTY = 0.1;
const LEVELS = [0, 0.001, 0.01, SALTY];
const NAMES = ["salty"] as const;

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sci = (x: number) => {
  const e = Math.floor(Math.log10(x));
  const m = x / 10 ** e;
  const exp = String(e).split("").map((ch) => SUP[ch]).join("");
  return `${m.toFixed(1)} × 10${exp}`;
};
const LO = -10;
const SPAN = 10; // decades
const X0 = 24;
const W = 270;
const wOf = (x: number) => ((Math.log10(x) - LO) / SPAN) * W;
const RATIO = Math.round(ag(0) / ag(SALTY) / 100) * 100;
const lower = (x: number) => {
  const r = ag(0) / x;
  return r >= 1000 ? Math.round(r / 100) * 100 : Math.round(r);
};
const backToCrystal = (x: number) => (1 - x / ag(0)) * 100; // % of the silver dissolved in pure water that returns to crystals

export default function CommonIon({ slug }: { slug: string }) {
  const [c, setC] = useState(0);
  const a = ag(c);
  const l = cl(c);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Silver chloride is a salt that barely dissolves. Crystals in pure water give a silver ion (Ag⁺) concentration [Ag⁺] of about ${sci(ag(0))} mol/L (brackets mean mol per litre). Now put the crystals in water that already holds ${SALTY.toFixed(2)} mol/L of dissolved NaCl, which supplies chloride (Cl⁻), the other ion in silver chloride. [Ag⁺] is then about…`,
        options: [`${sci(ag(0))} mol/L, the same`, `${sci(ag(SALTY))} mol/L`, `${SALTY.toFixed(2)} mol/L`],
        answer: 1,
      }}
      exploreHint={`Add NaCl in steps up to ${SALTY.toFixed(2)} mol/L and watch the silver bar.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            At {SALTY.toFixed(2)} mol/L of chloride, [Ag⁺] fell to about <strong>{sci(ag(SALTY))} mol/L</strong>, about {RATIO.toLocaleString("en-US")} times lower than in pure water.
          </p>
          <p>
            The product readout stayed at {sci(KSP)}: while crystals remain, the two ion concentrations multiplied have a ceiling. Pile in chloride and silver has to drop out as crystals to keep the product at the ceiling:{" "}
            {sci(KSP)} ÷ {SALTY.toFixed(2)} = {sci(ag(SALTY))} mol/L, so {backToCrystal(ag(SALTY)).toFixed(2)}% of the silver that dissolves in pure water returned to the crystals. Solubility is not one fixed number; it shifts when the water already holds one of the ions.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const set = (v: number) => {
              setC(v);
              if (v === SALTY) reach("salty");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 184" className="stage-svg" role="img" aria-label={`added chloride ${c} mol/L, silver ${sci(a)} mol/L`}>
                  <text x={X0} y={14} className={s.small}>
                    {locked ? "" : "Crystals stay in the water; silver that leaves the water joins them."}
                  </text>
                  <text x={X0} y={44} className={s.lab}>
                    Ag⁺ {sci(a)} mol/L
                  </text>
                  <rect x={X0} y={50} width={wOf(a)} height={18} className={s.ag} />
                  <text x={X0} y={96} className={s.lab}>
                    Cl⁻ {sci(l)} mol/L
                  </text>
                  <rect x={X0} y={102} width={wOf(l)} height={18} className={s.cl} />
                  <line x1={X0} x2={X0 + W} y1={132} y2={132} className={s.axis} />
                  {[-10, -8, -6, -4, -2, 0].map((e) => (
                    <text key={e} x={X0 + ((e - LO) / SPAN) * W} y={146} textAnchor="middle" className={s.small}>
                      10{String(e).split("").map((ch) => SUP[ch]).join("")}
                    </text>
                  ))}
                  <text x={X0 + W} y={164} textAnchor="end" className={s.small}>
                    log scale, mol/L: each tick is 100 times the last
                  </text>
                  <text x={X0} y={178} className={s.small}>
                    simple model: ignores AgCl₂⁻ complexes
                  </text>
                </svg>
                <Row>
                  <Readout label="Ag⁺ × Cl⁻" value={locked ? "?" : sci(a * l)} />
                  <Readout label="Ag⁺ lower than pure water" value={locked ? "?" : `${lower(a).toLocaleString("en-US")}×`} />
                  <Readout label="Silver back in crystals" value={locked ? "?" : `${backToCrystal(a).toFixed(2)}%`} />
                </Row>
                <Row>
                  {LEVELS.map((v) => (
                    <Control key={v} onClick={() => set(v)} disabled={locked || c === v} className={c === v ? "active" : ""}>
                      {v === 0 ? "Pure water" : `NaCl ${v.toFixed(v < 0.01 ? 3 : 2)} mol/L`}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
