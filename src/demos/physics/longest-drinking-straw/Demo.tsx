"use client";

// The longest drinking straw. A pump at the top only removes air; the air pressing on the open water
// pushes it up, and holds a column h = (P_atm - P_vapour) / (rho g). At sea level (101,325 Pa, water at
// 20 °C, vapour pressure 2,339 Pa, rho 998 kg/m³, g 9.81) h = 10.11 m; on the summit of Everest
// (about 33,700 Pa) h = 3.20 m. A 5 m straw fills to the top; a 12 m straw stops at 10.1 m.
// Brief: company/domains/briefs/physics.md round 4, #67. Numbers: artifacts/scratch/cm-physics-r4/check.mjs
// (block "65 longest-drinking-straw").
//
// One picture: a glass, a tall straw against a 0-14 m scale, an unlabelled pump at the top, and
// down-arrows of air pressure on the open water (the cause, "air pushes"; thinner on Everest). When the
// column stops short, the space above it is labelled "no air".
// Stage word budget (Ruling r3, closed list): controls 6, scale unit "m" 1, "air pushes" 2, "no air" 2,
// column readout "3.2 m" 1, Seen row 8, caption 4 = 24. No "pump" label, no "Seen:" prefix.
// Earned reveal: milestones "s5", "s12" (the question's case), "everest". QA path (DOM order):
// 5 m straw, 12 m straw, On Everest.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const RHO = 998; // kg/m³, water at 20 °C
const G = 9.81;
const P_VAP = 2339; // Pa, water at 20 °C
const P_SEA = 101325;
const P_EVEREST = 33700;
const hMax = (p: number) => (p - P_VAP) / (RHO * G);

type Mode = "none" | "s5" | "s12" | "everest";
const SETUP: Record<Exclude<Mode, "none">, { L: number; p: number }> = {
  s5: { L: 5, p: P_SEA },
  s12: { L: 12, p: P_SEA },
  everest: { L: 12, p: P_EVEREST },
};
const MILESTONES = ["s5", "s12", "everest"] as const;
const fmt = (h: number) => h.toFixed(1);

const W = 320;
const H = 214;
const Y0 = 194; // water surface in the glass = 0 m
const PX_PER_M = 12.6;
const SX = 160; // straw centre
const SCALE_X = 70;
const yAt = (m: number) => Y0 - m * PX_PER_M;

export default function LongestDrinkingStraw({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("none");
  const [seen, setSeen] = useState<{ s5?: boolean; s12?: number; everest?: number }>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A perfect pump sucks on a very tall straw standing in water at sea level. Water can rise up the straw by at most...",
        options: ["About 1 m", "About 10 m", "Any height, with enough pull"],
        answer: 1,
      }}
      exploreHint="Try each straw and watch where the water stops."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your 5 m straw the water reached the top, but in the 12 m straw it stopped at{" "}
            <strong>{seen.s12 !== undefined ? fmt(seen.s12) : "?"} m</strong>, with empty space above, however hard the pump
            worked.
          </p>
          <p>
            Suction does not pull water. The pump only removes air from the straw; the air pressing on the water in the glass
            pushes it up, and that push can hold up only about 10 m of water. On Everest, under thinner air, it held just{" "}
            {seen.everest !== undefined ? fmt(seen.everest) : "?"} m.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (m: Exclude<Mode, "none">) => {
              setMode(m);
              const { L, p } = SETUP[m];
              const h = Math.min(L, hMax(p));
              if (m === "s5") setSeen((x) => ({ ...x, s5: true }));
              if (m === "s12") setSeen((x) => ({ ...x, s12: x.s12 ?? h }));
              if (m === "everest") setSeen((x) => ({ ...x, everest: x.everest ?? h }));
              reach(m);
            };
            const set = mode === "none" ? null : SETUP[mode];
            const col = set ? Math.min(set.L, hMax(set.p)) : 0;
            const full = set ? col >= set.L : false;
            const strawTop = set ? yAt(set.L) : 0;
            const colTop = yAt(col);
            const thin = mode === "everest";
            const arrowW = thin ? 1.4 : 3;
            const arrowLen = thin ? 12 : 22;
            const seenText = [
              `5 m: ${seen.s5 ? "top" : "–"}`,
              `12 m: ${seen.s12 !== undefined ? `stops at ${fmt(seen.s12)} m` : "–"}`,
              `Everest: ${seen.everest !== undefined ? `${fmt(seen.everest)} m` : "–"}`,
            ].join(" · ");
            const alt = locked
              ? "A glass of water with air-pressure arrows pressing on its surface, beside a height scale from 0 to 14 metres. No straw yet."
              : !set
                ? "Pick a straw."
                : `A ${set.L} metre straw${thin ? " on Everest" : ""}. The water rises ${fmt(col)} metres${full ? ", to the top" : ", with empty space above it"}.`;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={alt}>
                  <defs>
                    <marker id="ls-air" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" className={s.headAir} />
                    </marker>
                  </defs>

                  {/* height scale: numerals, and the unit once */}
                  <line x1={SCALE_X} y1={yAt(0)} x2={SCALE_X} y2={yAt(14)} className={s.axis} />
                  {[0, 2, 4, 6, 8, 10, 12, 14].map((m) => (
                    <g key={m}>
                      <line x1={SCALE_X - 4} y1={yAt(m)} x2={SCALE_X} y2={yAt(m)} className={s.axis} />
                      <text x={SCALE_X - 7} y={yAt(m) + 3.5} textAnchor="end" className={s.tick}>
                        {m}
                      </text>
                    </g>
                  ))}
                  <text x={SCALE_X + 5} y={yAt(14) + 4} className={s.tick}>
                    m
                  </text>

                  {/* glass and water */}
                  <rect x={118} y={Y0 - 1} width={84} height={18} className={s.water} />
                  <path d={`M116,${Y0 - 12} L118,${Y0 + 18} L202,${Y0 + 18} L204,${Y0 - 12}`} className={s.glass} />

                  {/* air pushes on the open water (the cause) */}
                  {[128, 192].map((x) => (
                    <line key={x} x1={x} y1={Y0 - 4 - arrowLen} x2={x} y2={Y0 - 4} className={s.air} style={{ strokeWidth: arrowW }} markerEnd="url(#ls-air)" />
                  ))}
                  <text x={210} y={Y0 - 12} className={s.lab}>
                    air pushes
                  </text>

                  {/* straw, column, pump */}
                  {set && (
                    <g>
                      <rect x={SX - 4} y={colTop} width={8} height={Y0 + 10 - colTop} className={s.column} />
                      {!full && (
                        <>
                          <rect x={SX - 4} y={strawTop} width={8} height={colTop - strawTop} className={s.gap} />
                          <text x={SX + 10} y={(strawTop + colTop) / 2 + 4} className={s.lab}>
                            no air
                          </text>
                        </>
                      )}
                      <rect x={SX - 4} y={strawTop} width={8} height={Y0 + 10 - strawTop} className={s.straw} />
                      <line x1={SCALE_X} y1={colTop} x2={SX - 6} y2={colTop} className={s.level} />
                      <text x={SX - 8} y={colTop - 3} textAnchor="end" className={s.labCol}>
                        {fmt(col)} m
                      </text>
                      {/* pump, drawn but not labelled */}
                      <rect x={SX - 11} y={strawTop - 13} width={22} height={13} rx={3} className={s.pump} />
                      <line x1={SX} y1={strawTop - 13} x2={SX} y2={strawTop - 19} className={s.pumpRod} />
                      <line x1={SX - 6} y1={strawTop - 19} x2={SX + 6} y2={strawTop - 19} className={s.pumpRod} />
                    </g>
                  )}
                </svg>

                <p className={s.caption}>Perfect pump, 20 °C water.</p>
                <p className={s.seen}>{seenText}</p>

                <Row>
                  <Control className={mode === "s5" ? "active" : ""} disabled={locked || mode === "s5"} onClick={() => pick("s5")}>
                    5 m straw
                  </Control>
                  <Control className={mode === "s12" ? "active" : ""} disabled={locked || mode === "s12"} onClick={() => pick("s12")}>
                    12 m straw
                  </Control>
                  <Control className={mode === "everest" ? "active" : ""} disabled={locked || mode === "everest"} onClick={() => pick("everest")}>
                    On Everest
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
