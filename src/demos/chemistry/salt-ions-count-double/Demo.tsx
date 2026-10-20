"use client";

// One beaker of 1.0 kg of water with its own freezing-point scale. 1 dot = 0.1 mol of dissolved
// particles. Sugar stays whole (1 particle per molecule); salt splits into Na+ and Cl- (2 per
// unit). Ideal model: freezing point falls by Kf × (mol of particles per kg), Kf = 1.86 °C·kg/mol.
// Key state: 1.0 mol of salt dissolved: 20 dots, freezing point about −3.7 °C, twice sugar's
// −1.9 °C. Milestone `salt`; the salt button is last so QA ends on it.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const KF = 1.86; // °C kg/mol, water
const MOL = 1.0; // mol of solute units in 1.0 kg water
const PER_DOT = 0.1; // mol of particles per dot
const SOLUTES = {
  water: { label: "Pure water", grams: 0, split: 0 },
  sugar: { label: "342 g sugar", grams: 342, split: 1 },
  salt: { label: "58 g salt", grams: 58, split: 2 },
} as const;
type Id = keyof typeof SOLUTES;
const drop = (id: Id) => KF * MOL * SOLUTES[id].split;
const SALT_DROP = drop("salt");
const ONE_PARTICLE = KF * MOL;
const NAMES = ["salt"] as const;

const W = 320;
const H = 180;
const BX = 20;
const BY = 20;
const BW = 180;
const BH = 145;
const SX = 270; // scale x
const yOfT = (c: number) => 30 + (-c / 4) * 120; // 0 °C at y 30, −4 °C at y 150

export default function SaltIonsCountDouble({ slug }: { slug: string }) {
  const [id, setId] = useState<Id>("water");
  const sol = SOLUTES[id];
  const particles = Math.round((MOL * sol.split) / PER_DOT);
  const fp = -drop(id);
  const spots = useMemo(() => {
    const r = mulberry32(11);
    // 5 x 4 grid with a little seeded jitter, so dots never overlap.
    return Array.from({ length: 20 }, (_, i) => ({
      x: BX + 22 + (i % 5) * 34 + (r() - 0.5) * 10,
      y: BY + 40 + Math.floor(i / 5) * 26 + (r() - 0.5) * 8,
    }));
  }, []);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Before an icy night, you dissolve 58 g of table salt (NaCl) in 1.0 kg of water. That is ${MOL.toFixed(1)} mol: a fixed count of NaCl units (1 mol = 6.0 × 10²³). About how far does the freezing point fall?`,
        options: [`${ONE_PARTICLE.toFixed(1)} °C`, `${SALT_DROP.toFixed(1)} °C`, "0.5 °C"],
        answer: 1,
      }}
      exploreHint="Dissolve sugar, then salt: count the dots and read the freezing point."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Your salt made {Math.round((MOL * 2) / PER_DOT)} dots, not {Math.round(MOL / PER_DOT)}: each NaCl unit split into
            a sodium ion and a chloride ion. The freezing point fell to about <strong>−{SALT_DROP.toFixed(1)} °C</strong>, twice
            what the same count of sugar molecules does.
          </p>
          <p>
            Freezing point drops with the number of dissolved particles, not their kind: {KF} °C per mole of particles in a
            kilogram of water. Salt counts double.
          </p>
          <p className="muted">Ideal model. Real salt water drops a little less, about 3.4 °C, because ions tug on each other.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const set = (v: Id) => {
              setId(v);
              if (v === "salt") reach("salt");
            };
            const dots = spots.slice(0, particles).map((p, i) => ({
              ...p,
              kind: id === "sugar" ? "sugar" : i % 2 === 0 ? "na" : "cl",
            }));
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${particles} particles, freezes at ${fp.toFixed(1)} °C`}>
                  <path d={`M ${BX} ${BY} V ${BY + BH} H ${BX + BW} V ${BY}`} className={s.beaker} />
                  <rect x={BX + 2} y={BY + 20} width={BW - 4} height={BH - 22} className={s.water} />
                  <text x={BX + BW / 2} y={BY + 12} textAnchor="middle" className={s.small}>
                    1 kg water · 1 dot = {PER_DOT} mol
                  </text>
                  {dots.map((d, i) => (
                    <g key={i}>
                      <circle cx={d.x} cy={d.y} r={7} className={s[d.kind as "sugar" | "na" | "cl"]} />
                      {d.kind !== "sugar" && (
                        <text x={d.x} y={d.y + 3} textAnchor="middle" className={s.ion}>
                          {d.kind === "na" ? "+" : "−"}
                        </text>
                      )}
                    </g>
                  ))}
                  <line x1={SX} x2={SX} y1={yOfT(0)} y2={yOfT(-4)} className={s.scale} />
                  {[0, -1, -2, -3, -4].map((c) => (
                    <g key={c}>
                      <line x1={SX - 4} x2={SX + 4} y1={yOfT(c)} y2={yOfT(c)} className={s.scale} />
                      <text x={SX + 8} y={yOfT(c) + 3} className={s.small}>
                        {c === 0 ? "0" : `−${-c}`}
                      </text>
                    </g>
                  ))}
                  <text x={SX} y={16} textAnchor="middle" className={s.small}>
                    freezes at, °C
                  </text>
                  <path d={`M ${SX - 6} ${yOfT(fp)} l -10 -6 v 12 z`} className={s.marker} />
                  <text x={SX - 18} y={yOfT(fp) + 4} textAnchor="end" className={s.big}>
                    {fp === 0 ? "0" : `−${(-fp).toFixed(1)}`}
                  </text>
                  <text x={BX + BW / 2} y={H - 4} textAnchor="middle" className={s.small}>
                    ideal model: every particle counts the same
                  </text>
                </svg>
                <Row>
                  {(["sugar", "water", "salt"] as Id[]).map((k) => (
                    <Control key={k} onClick={() => set(k)} disabled={locked || id === k} className={id === k ? "active" : ""}>
                      {SOLUTES[k].label}
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
