"use client";

// Silver chloride crystals in water with NaCl added. While crystals remain, [Ag+][Cl-] = Ksp = 1.8e-10.
// With added chloride c: s = [Ag+] satisfies s (c + s) = Ksp, so s = (-c + sqrt(c² + 4 Ksp)) / 2.
// Two bars on one log scale (1e-10 to 1 mol/L). Key state (milestone `salty`): c = 0.10 mol/L,
// [Ag+] about 1.8e-9 mol/L, about 7,500 times lower than in pure water. Ignores activity and AgCl2-.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
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

export default function CommonIon({ slug }: { slug: string }) {
  const [c, setC] = useState(0);
  const a = ag(c);
  const l = cl(c);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Silver chloride crystals dissolve in pure water until [Ag⁺] is about ${sci(ag(0))} mol/L (brackets mean mol per litre). In water with ${SALTY.toFixed(2)} mol/L of dissolved salt (NaCl), [Ag⁺] is about…`,
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
            The two ions multiply to a ceiling of {sci(KSP)}. Pile in chloride and silver has to drop out as crystals to keep the product at the ceiling:{" "}
            {sci(KSP)} ÷ {SALTY.toFixed(2)} = {sci(ag(SALTY))} mol/L. Solubility is not one fixed number; it shifts when the water already holds one of the ions.
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
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={`added chloride ${c} mol/L, silver ${sci(a)} mol/L`}>
                  <text x={X0} y={14} className={s.small}>
                    Ion product [Ag⁺] × [Cl⁻] stays {sci(KSP)} over crystals.
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
                    log scale, mol/L
                  </text>
                </svg>
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
